/**
 * Client-side authenticated fetch utility for Electra Solar Admin Panel.
 * Automatically injects the stored HMAC bearer token and includes cookies
 * for resilient operation across Vercel, localhost, and custom domains.
 */
export function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = typeof window !== "undefined" ? localStorage.getItem("electra_admin_token") : null;
  const headers = new Headers(options.headers || {});

  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });
}
