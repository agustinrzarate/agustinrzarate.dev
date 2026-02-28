/// <reference types="node" />
import { Resend } from "resend";
import { consumeToken } from "../src/lib/contactToken";
import { validateContactPayload } from "../src/lib/contactValidation";

const resend = new Resend(process.env.RESEND_API_KEY);

const CONTACT_TO = process.env.CONTACT_TO ?? "agustinrzarate@gmail.com";
const CONTACT_FROM =
  process.env.CONTACT_FROM ?? "Contact <onboarding@resend.dev>";

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const MIN_FORM_TIME_MS = 3000;
const MAX_FORM_TIME_MS = 60 * 60 * 1000;

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "";
}

function checkRateLimit(ip: string): { allowed: boolean } {
  if (!ip) return { allowed: true };
  const now = Date.now();
  const entry = rateLimitStore.get(ip);
  if (!entry) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }
  if (now >= entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }
  entry.count += 1;
  return { allowed: entry.count <= RATE_LIMIT_MAX };
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  if (request.method !== "POST") {
    return Response.json(
      { error: "Method not allowed" },
      { status: 405, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!process.env.RESEND_API_KEY) {
    return Response.json(
      { error: "Email service is not configured" },
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  const ip = getClientIp(request);
  if (!checkRateLimit(ip).allowed) {
    return Response.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  let body: {
    name?: string;
    email?: string;
    message?: string;
    fax?: string;
    _token?: string;
    _formReadyAt?: number;
  };
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "Invalid JSON body" },
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const token = typeof body._token === "string" ? body._token : "";
  if (!consumeToken(token)) {
    return Response.json(
      { error: "Invalid or expired token. Please refresh the page." },
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const formReadyAt = typeof body._formReadyAt === "number" ? body._formReadyAt : 0;
  const now = Date.now();
  if (formReadyAt <= 0 || now - formReadyAt < MIN_FORM_TIME_MS) {
    return Response.json(
      { error: "Please wait a moment before sending." },
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
  if (now - formReadyAt > MAX_FORM_TIME_MS) {
    return Response.json(
      { error: "Form expired. Please refresh the page." },
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const honeypot = typeof body.fax === "string" ? body.fax.trim() : "";
  if (honeypot) {
    return Response.json(
      { error: "Invalid submission" },
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const validation = validateContactPayload(body);
  if (!validation.ok) {
    return Response.json(
      { error: validation.error },
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const nameStr = (body.name ?? "").trim();
  const emailStr = (body.email ?? "").trim();
  const messageStr = (body.message ?? "").trim();

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
