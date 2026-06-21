// ponytail: simple in-memory rate limiter for admin APIs
// upgrade to Redis if throughput scales beyond single-instance deployment

const requests = new Map<string, number[]>();
const WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 100; // per minute

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const times = requests.get(ip) || [];
  const recent = times.filter((t) => now - t < WINDOW);

  if (recent.length >= MAX_REQUESTS) {
    return false;
  }

  recent.push(now);
  requests.set(ip, recent);
  return true;
}
