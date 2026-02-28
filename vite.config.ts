import path from "path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

const root = path.dirname(fileURLToPath(import.meta.url));

// Load .env into process.env so api middleware and ssrLoadModule see RESEND_API_KEY etc.
const env = loadEnv(process.env.NODE_ENV ?? "development", root, "");
Object.assign(process.env, env);

function contactApiDevPlugin() {
  return {
    name: "contact-api-dev",
    configureServer(server: import("vite").ViteDevServer) {
      const handler = (
        req: import("node:http").IncomingMessage & { url?: string; method?: string },
        res: import("node:http").ServerResponse,
        next: () => void
      ) => {
        const pathname = req.url?.split("?")[0];

        if (pathname === "/api/contact-token" && req.method === "GET") {
          res.setHeader("Content-Type", "application/json");
          server.ssrLoadModule(pathToFileURL(path.resolve(root, "src/lib/contactToken.ts")).href)
            .then((mod) => {
              const m = mod as { createToken: () => string };
              res.end(JSON.stringify({ token: m.createToken() }));
            })
            .catch((err: unknown) => {
              console.error("[contact-token]", err);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: "Something went wrong" }));
            });
          return;
        }

        if (pathname !== "/api/contact" || req.method !== "POST") return next();

        const chunks: Buffer[] = [];
        req.on("data", (chunk: Buffer) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
        req.on("end", async () => {
          res.setHeader("Content-Type", "application/json");
          const rawBody = chunks.length ? Buffer.concat(chunks).toString("utf-8") : "";
          let payload: Record<string, unknown>;
          try {
            payload = rawBody ? JSON.parse(rawBody) : {};
          } catch {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: "Invalid JSON body" }));
            return;
          }
          try {
            const tokenMod = await server.ssrLoadModule(
              pathToFileURL(path.resolve(root, "src/lib/contactToken.ts")).href
            ) as { consumeToken: (t: string) => boolean };
            const token = typeof payload._token === "string" ? payload._token : "";
            if (!tokenMod.consumeToken(token)) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: "Invalid or expired token. Please refresh the page." }));
              return;
            }
            const formReadyAt = typeof payload._formReadyAt === "number" ? payload._formReadyAt : 0;
            const now = Date.now();
            if (formReadyAt <= 0 || now - formReadyAt < 3000) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: "Please wait a moment before sending." }));
              return;
            }
            if (now - formReadyAt > 60 * 60 * 1000) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: "Form expired. Please refresh the page." }));
              return;
            }
            const clientIp = req.socket?.remoteAddress ?? "";
            const mod = await server.ssrLoadModule(
              pathToFileURL(path.resolve(root, "src/lib/sendContactEmail.ts")).href
            ) as { sendContactEmail: (body: unknown, ip?: string) => Promise<{ success: boolean; id?: string; error?: string }> };
            const result = await mod.sendContactEmail(payload, clientIp);
            const status = result.success
              ? 200
              : result.error === "Email service is not configured"
                ? 503
                : result.error === "Too many requests. Please try again later."
                  ? 429
                  : 400;
            res.statusCode = status;
            res.end(
              JSON.stringify(
                result.success
                  ? { success: true, id: result.id }
                  : { error: result.error }
              )
            );
          } catch (err) {
            console.error("[contact-api-dev]", err);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: "Something went wrong" }));
          }
        });
        req.on("error", () => {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Request error" }));
        });
      };
      server.middlewares.use(handler);
    },
  };
}

export default defineConfig({
  envDir: root,
  plugins: [contactApiDevPlugin(), react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(root, "./src"),
    },
  },
});
