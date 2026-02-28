import { createToken } from "./_contactToken.js";

export async function GET() {
  const token = createToken();
  return Response.json(
    { token },
    { headers: { "Content-Type": "application/json" } }
  );
}
