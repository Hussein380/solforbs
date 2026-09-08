"use server";

import crypto from "crypto";
import connectToDatabase from "@/lib/db";
import AdminOtp from "@/models/AdminOtp";
import AdminUser from "@/models/AdminUser";
import { createAdminSession, clearAdminSession } from "@/lib/auth/session";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Checks if an email is authorized to access the admin portal.
 */
async function isEmailAuthorized(email: string): Promise<boolean> {
  const normalized = email.toLowerCase().trim();

  // 1. Check environment variable whitelist (comma-separated)
  const envEmails = (process.env.ADMIN_EMAILS || "")
    .toLowerCase()
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);

  // If no env is set yet, default allow solforbs@gmail.com
  if (envEmails.length === 0) {
    if (normalized === "solforbs@gmail.com") return true;
  } else if (envEmails.includes(normalized)) {
    return true;
  }

  // 2. Check MongoDB AdminUser collection
  try {
    await connectToDatabase();
    const user = await AdminUser.findOne({ email: normalized }).lean();
    if (user) return true;
  } catch (err) {
    console.warn("Could not check AdminUser collection:", err);
  }

  return false;
}

/**
 * Sends a 6-digit OTP code to the requested email if authorized.
 */
export async function requestLoginOtp(rawEmail: string) {
  try {
    const email = rawEmail.toLowerCase().trim();
    if (!email || !email.includes("@")) {
      return { success: false, error: "Please enter a valid email address." };
    }

    const authorized = await isEmailAuthorized(email);
    if (!authorized) {
      return {
        success: false,
        error: "This email is not authorized for Solforbs Admin access. Contact the administrator.",
      };
    }

    await connectToDatabase();

    // Generate 6-digit numeric code
    const code = crypto.randomInt(100000, 999999).toString();
    const codeHash = crypto.createHash("sha256").update(code).digest("hex");

    // Remove any previous active OTPs for this email
    await AdminOtp.deleteMany({ email });

    // Store new OTP
    await AdminOtp.create({
      email,
      codeHash,
      attempts: 0,
    });

    // Always log code in development / server stdout for instant debugging
    console.log(`\n========================================\n[SOLFORBS ADMIN OTP] Code for ${email}: ${code}\n========================================\n`);

    // Send email via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: "Solforbs Security <info@solforbs.com>",
          to: email,
          subject: `${code} is your Solforbs Admin login code`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 500px; margin: 0 auto; padding: 32px 24px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px;">
              <div style="margin-bottom: 24px;">
                <span style="font-size: 18px; font-weight: 800; color: #0F172A; letter-spacing: -0.02em;">Solforbs</span>
                <span style="font-size: 11px; font-weight: 700; color: #0E5BFF; text-transform: uppercase; margin-left: 8px; background: rgba(14,91,255,0.08); padding: 3px 8px; borderRadius: 6px;">Security</span>
              </div>
              <h2 style="font-size: 20px; font-weight: 700; color: #0F172A; margin: 0 0 8px 0;">Admin Portal Verification</h2>
              <p style="font-size: 14px; color: #475569; line-height: 1.5; margin: 0 0 24px 0;">
                Use the one-time authentication code below to log into the Solforbs Admin dashboard.
              </p>
              <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px; padding: 20px; text-align: center; margin-bottom: 24px;">
                <span style="font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #0E5BFF; font-family: monospace;">${code}</span>
              </div>
              <p style="font-size: 12px; color: #94A3B8; line-height: 1.5; margin: 0;">
                This code will expire in 10 minutes. If you did not request this login, you can safely ignore this email.
              </p>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error("Failed to send OTP email via Resend:", emailErr);
        // Note: Code is still logged above in server output
      }
    }

    return { success: true };
  } catch (error) {
    console.error("Error in requestLoginOtp:", error);
    return { success: false, error: "Failed to generate security code. Please try again." };
  }
}

/**
 * Verifies the 6-digit OTP code and creates the admin session.
 */
export async function verifyLoginOtp(rawEmail: string, rawCode: string) {
  try {
    const email = rawEmail.toLowerCase().trim();
    const code = rawCode.trim();

    if (!email || !code) {
      return { success: false, error: "Email and code are required." };
    }

    await connectToDatabase();

    const record = await AdminOtp.findOne({ email }).sort({ createdAt: -1 });
    if (!record) {
      return { success: false, error: "Code expired or not found. Please request a new one." };
    }

    if (record.attempts >= 5) {
      await AdminOtp.deleteMany({ email });
      return { success: false, error: "Too many failed attempts. Please request a new code." };
    }

    const inputHash = crypto.createHash("sha256").update(code).digest("hex");

    if (inputHash !== record.codeHash) {
      await AdminOtp.updateOne({ _id: record._id }, { $inc: { attempts: 1 } });
      return { success: false, error: "Invalid verification code. Please check and try again." };
    }

    // Success: delete OTP so it cannot be reused
    await AdminOtp.deleteMany({ email });

    // Establish encrypted session cookie
    await createAdminSession(email);

    return { success: true };
  } catch (error) {
    console.error("Error in verifyLoginOtp:", error);
    return { success: false, error: "Verification failed. Please try again." };
  }
}

/**
 * Direct password login fallback (for offline or local dev convenience).
 */
export async function loginWithPassword(rawEmail: string, password: string) {
  try {
    const email = rawEmail.toLowerCase().trim();
    const masterPassword = process.env.ADMIN_PASSWORD || "!2026@solforbs";

    if (!password || password !== masterPassword) {
      return { success: false, error: "Incorrect admin password." };
    }

    const authorized = await isEmailAuthorized(email);
    if (!authorized) {
      return { success: false, error: "This email is not authorized for Solforbs Admin access." };
    }

    await createAdminSession(email);
    return { success: true };
  } catch (error) {
    console.error("Error in loginWithPassword:", error);
    return { success: false, error: "Authentication error." };
  }
}

/**
 * Clears the admin session.
 */
export async function logoutAdminAction() {
  await clearAdminSession();
  return { success: true };
}
