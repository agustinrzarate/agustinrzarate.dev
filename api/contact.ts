/// <reference types="node" />
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const CONTACT_TO = process.env.CONTACT_TO ?? "agustinrzarate@gmail.com";
const CONTACT_FROM =
  process.env.CONTACT_FROM ?? "Contact <onboarding@resend.dev>";

export async function POST(request: Request) {
  if (request.method !== "POST") {
    return Response.json(
      { error: "Method not allowed" },
      { status: 405, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set");
    return Response.json(
      { error: "Email service is not configured" },
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  let body: { name?: string; email?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "Invalid JSON body" },
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const { name, email, message } = body;
  const nameStr = typeof name === "string" ? name.trim() : "";
  const emailStr = typeof email === "string" ? email.trim() : "";
  const messageStr = typeof message === "string" ? message.trim() : "";

  if (!nameStr || !emailStr || !messageStr) {
    return Response.json(
      { error: "Name, email, and message are required" },
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const { data, error } = await resend.emails.send({
    from: CONTACT_FROM,
    to: [CONTACT_TO],
    replyTo: [emailStr],
    subject: `Contact from ${nameStr} (${emailStr})`,
    html: `
      <p><strong>From:</strong> ${escapeHtml(nameStr)} &lt;${escapeHtml(emailStr)}&gt;</p>
      <p><strong>Message:</strong></p>
      <pre style="white-space: pre-wrap; font-family: inherit;">${escapeHtml(messageStr)}</pre>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return Response.json(
      { error: error.message ?? "Failed to send email" },
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }

  return Response.json(
    { success: true, id: data?.id },
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
