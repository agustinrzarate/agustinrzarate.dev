import { createToken } from "../src/lib/contactToken";

export async function GET() {
  const token = createToken();
  return Response.json({ token }, { headers: { "Content-Type": "application/json" } });
}
