/// <reference types="node" />
import { Resend } from "resend";

const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

const CONTACT_TO = import.meta.env.VITE_CONTACT_TO ?? "agustinrzarate@gmail.com";
const CONTACT_FROM =
  import.meta.env.VITE_CONTACT_FROM ?? "Contact <onboarding@resend.dev>";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export type SendContactEmailResult =
  | { success: true; id?: string }
  | { success: false; error: string };

export async function sendContactEmail(body: {
  name?: string;
  email?: string;
  message?: string;
}): Promise<SendContactEmailResult> {
  if (!import.meta.env.VITE_RESEND_API_KEY) {
    return { success: false, error: "Email service is not configured" };
  }

  const nameStr = typeof body.name === "string" ? body.name.trim() : "";
  const emailStr = typeof body.email === "string" ? body.email.trim() : "";
  const messageStr =
    typeof body.message === "string" ? body.message.trim() : "";

  if (!nameStr || !emailStr || !messageStr) {
    return {
      success: false,
      error: "Name, email, and message are required",
    };
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
    return { success: false, error: error.message ?? "Failed to send email" };
  }

  return { success: true, id: data?.id };
}
