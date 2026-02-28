/// <reference types="node" />
import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Signed one-time tokens for contact form (no server-side store; works in serverless).
 * Token is signed with HMAC; POST validates signature and expiry.
 */

const TOKEN_TTL_MS = 10 * 60 * 1000; // 10 minutes

function getSecret(): string {
  return process.env.CONTACT_TOKEN_SECRET ?? "contact-form-dev-secret";
}

function base64UrlEncode(data: string): string {
  return Buffer.from(data, "utf-8").toString("base64url");
}

function base64UrlDecode(str: string): string {
  return Buffer.from(str, "base64url").toString("utf-8");
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function verify(payload: string, signature: string, secret: string): boolean {
  const expected = sign(payload, secret);
  try {
    return timingSafeEqual(Buffer.from(signature, "utf-8"), Buffer.from(expected, "utf-8"));
  } catch {
    return false;
  }
}

export function createToken(): string {
  const payload = JSON.stringify({
    t: Date.now(),
    r: crypto.randomUUID(),
  });
  const secret = getSecret();
  const encoded = base64UrlEncode(payload);
  const signature = sign(payload, secret);
  return `${encoded}.${signature}`;
}

export function consumeToken(token: string): boolean {
  if (!token || typeof token !== "string") return false;
  const dot = token.indexOf(".");
  if (dot === -1) return false;
  const encoded = token.slice(0, dot);
  const signature = token.slice(dot + 1);
  let payload: { t?: number };
  try {
    payload = JSON.parse(base64UrlDecode(encoded));
  } catch {
    return false;
  }
  const secret = getSecret();
  if (!verify(JSON.stringify(payload), signature, secret)) return false;
  const t = payload.t;
  if (typeof t !== "number") return false;
  const now = Date.now();
  if (now < t || now - t > TOKEN_TTL_MS) return false;
  return true;
}
