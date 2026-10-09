import { cookies, headers } from "next/headers";
import crypto from "crypto";

const SESSION_COOKIE_NAME = "electra_admin_session";
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || "electra_solar_secure_admin_jwt_salt_2026_xyz!";

export interface AdminUser {
  username: string;
  role: "superadmin" | "editor";
  loginAt: string;
}

// Generate an HMAC signature
function signData(data: string): string {
  return crypto.createHmac("sha256", SESSION_SECRET).update(data).digest("hex");
}

// Create secure token string: base64(payload).signature
export function createSessionToken(user: AdminUser): string {
  const payload = Buffer.from(JSON.stringify(user)).toString("base64");
  const signature = signData(payload);
  return `${payload}.${signature}`;
}

// Verify secure token
export function verifySessionToken(token: string): AdminUser | null {
  if (!token || !token.includes(".")) return null;
  const [payload, signature] = token.split(".");
  const expectedSig = signData(payload);
  if (signature !== expectedSig) return null;

  try {
    const raw = Buffer.from(payload, "base64").toString("utf-8");
    const user = JSON.parse(raw) as AdminUser;
    return user;
  } catch (err) {
    return null;
  }
}

// Check session in Server Components or API routes
export function getAuthenticatedAdmin(): AdminUser | null {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (token) {
      const verified = verifySessionToken(token);
      if (verified) return verified;
    }
  } catch (e) {
    // ignore
  }

  try {
    const headerList = headers();
    const authHeader = headerList.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      return verifySessionToken(authHeader.substring(7));
    }
  } catch (e) {
    // ignore
  }

  return null;
}

// Cookie name exported for API handlers
export { SESSION_COOKIE_NAME };
