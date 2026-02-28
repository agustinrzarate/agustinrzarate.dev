const MAX_NAME = 200;
const MAX_EMAIL = 320;
const MAX_MESSAGE = 5000;
const MIN_MESSAGE = 10;
const MAX_LINKS = 3;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LINK_REGEX = /https?:\/\/[^\s]+/gi;

export type ValidationResult =
  | { ok: true }
  | { ok: false; error: string };

export function validateContactPayload(body: {
  name?: unknown;
  email?: unknown;
  message?: unknown;
}): ValidationResult {
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !email || !message) {
    return { ok: false, error: "Name, email, and message are required" };
  }

  if (name.length > MAX_NAME) {
    return { ok: false, error: "Name is too long" };
  }
  if (email.length > MAX_EMAIL) {
    return { ok: false, error: "Email is too long" };
  }
  if (!EMAIL_REGEX.test(email)) {
    return { ok: false, error: "Please enter a valid email address" };
  }
  if (message.length < MIN_MESSAGE) {
    return { ok: false, error: "Message is too short" };
  }
  if (message.length > MAX_MESSAGE) {
    return { ok: false, error: "Message is too long" };
  }

  const linkCount = (message.match(LINK_REGEX) ?? []).length;
  if (linkCount > MAX_LINKS) {
    return { ok: false, error: "Message contains too many links" };
  }

  return { ok: true };
}
