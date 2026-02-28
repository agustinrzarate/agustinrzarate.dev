/// <reference types="node" />
import { Resend } from "resend";
import { checkRateLimit } from "./rateLimit";
import { validateContactPayload } from "./contactValidation";

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

export async function sendContactEmail(
  body: {
    name?: string;
    email?: string;
    message?: string;
    fax?: string;
    _token?: string;
    _formReadyAt?: number;
  },
  clientIp?: string
): Promise<SendContactEmailResult> {
  if (clientIp && !checkRateLimit(clientIp).allowed) {
    return { success: false, error: "Too many requests. Please try again later." };
  }

  const honeypot = typeof body.fax === "string" ? body.fax.trim() : "";
  if (honeypot) {
    return { success: false, error: "Invalid submission" };
  }

  const validation = validateContactPayload(body);
  if (!validation.ok) {
    return { success: false, error: validation.error };
  }

  const apiKey =
    process.env.RESEND_API_KEY?.trim() ||
    process.env.VITE_RESEND_API_KEY?.trim();
  if (!apiKey) {
    return { success: false, error: "Email service is not configured" };
  }

  const nameStr = (body.name ?? "").trim();
  const emailStr = (body.email ?? "").trim();
  const messageStr = (body.message ?? "").trim();

  const resend = new Resend(apiKey);
  const contactTo =
    process.env.CONTACT_TO?.trim() ||
    process.env.VITE_CONTACT_TO?.trim() ||
    "agustinrzarate@gmail.com";
  const contactFrom =
    process.env.CONTACT_FROM?.trim() ||
    process.env.VITE_CONTACT_FROM?.trim() ||
    "Contact <onboarding@resend.dev>";

  const { data, error } = await resend.emails.send({
    from: contactFrom,
    to: [contactTo],
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
