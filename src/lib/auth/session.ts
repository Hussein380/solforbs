import { cookies } from "next/headers";
import crypto from "crypto";

export const SESSION_COOKIE_NAME = "solforbs_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getSecretKey(): string {
  return process.env.ADMIN_SESSION_SECRET || process.env.RESEND_API_KEY || "solforbs-super-secure-admin-key-salt";
}

/**
 * Creates a tamper-proof signed session token: base64(payload).signature
 */
export function signToken(payload: { email: string; createdAt: number }): string {
  const secret = getSecretKey();
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto.createHmac("sha256", secret).update(data).digest("base64url");
  return `${data}.${signature}`;
}

/**
 * Verifies the token signature and expiration.
 */
export function verifyToken(token: string): { email: string; createdAt: number } | null {
  if (!token || !token.includes(".")) return null;
  const [data, signature] = token.split(".");
  if (!data || !signature) return null;

  const secret = getSecretKey();
  const expectedSignature = crypto.createHmac("sha256", secret).update(data).digest("base64url");

  // Constant-time comparison to prevent timing attacks
  if (signature.length !== expectedSignature.length) return null;
  const valid = crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
  if (!valid) return null;

  try {
    const payload = JSON.parse(Buffer.from(data, "base64url").toString("utf-8"));
    if (Date.now() - payload.createdAt > SESSION_MAX_AGE * 1000) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

/**
 * Creates the admin session and sets the httpOnly cookie.
 */
export async function createAdminSession(email: string) {
  const token = signToken({ email: email.toLowerCase().trim(), createdAt: Date.now() });
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
}

/**
 * Returns the current authenticated admin session or null.
 */
export async function getAdminSession(): Promise<{ email: string } | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(SESSION_COOKIE_NAME);
  if (!cookie?.value) return null;

  const payload = verifyToken(cookie.value);
  if (!payload?.email) return null;

  return { email: payload.email };
}

/**
 * Clears the admin session cookie.
 */
export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

/**
 * Protects server actions or server components. Throws an error if not authorized.
 */
export async function requireAdmin(): Promise<{ email: string }> {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("Unauthorized: Admin credentials required.");
  }
  return session;
}
