import path from "path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

const root = path.dirname(fileURLToPath(import.meta.url));

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
        if (pathname !== "/api/contact" || req.method !== "POST") return next();

        const chunks: Buffer[] = [];
        req.on("data", (chunk: Buffer) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
        req.on("end", async () => {
          res.setHeader("Content-Type", "application/json");
          const rawBody = chunks.length ? Buffer.concat(chunks).toString("utf-8") : "";
          let payload: unknown;
          try {
            payload = rawBody ? JSON.parse(rawBody) : {};
          } catch {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: "Invalid JSON body" }));
            return;
          }
          try {
            const mod = await server.ssrLoadModule(
              pathToFileURL(path.resolve(root, "src/lib/sendContactEmail.ts")).href
            ) as { sendContactEmail: (body: unknown) => Promise<{ success: boolean; id?: string; error?: string }> };
            const result = await mod.sendContactEmail(payload);
            const status = result.success
              ? 200
              : result.error === "Email service is not configured"
                ? 503
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
