const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;

const store = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(ip: string): { allowed: boolean } {
  if (!ip) return { allowed: true };
  const now = Date.now();
  const entry = store.get(ip);
  if (!entry) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true };
  }
  if (now >= entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true };
  }
  entry.count += 1;
  return { allowed: entry.count <= MAX_REQUESTS };
}
