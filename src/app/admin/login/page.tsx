"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  requestLoginOtp, 
  verifyLoginOtp, 
  loginWithPassword 
} from "@/lib/actions/adminAuth.actions";
import { ShieldCheck, Mail, KeyRound, ArrowRight, RefreshCw, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [usePasswordMode, setUsePasswordMode] = useState(false);

  // Step 1 = enter email, Step 2 = enter 6-digit code
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  // Handle Requesting OTP Code
  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError(null);
    setInfoMessage(null);

    const res = await requestLoginOtp(email);
    setLoading(false);

    if (res.success) {
      setStep(2);
      setInfoMessage(`Security code sent to ${email}. Check your inbox.`);
    } else {
      setError(res.error || "Failed to send code.");
    }
  };

  // Handle Verifying OTP Code
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || code.length < 6) {
      setError("Please enter the complete 6-digit code.");
      return;
    }

    setLoading(true);
    setError(null);

    const res = await verifyLoginOtp(email, code);
    if (res.success) {
      router.push("/admin/projects");
      router.refresh();
    } else {
      setLoading(false);
      setError(res.error || "Invalid code.");
    }
  };

  // Handle Password Sign-In
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    setError(null);

    const res = await loginWithPassword(email, password);
    if (res.success) {
      router.push("/admin/projects");
      router.refresh();
    } else {
      setLoading(false);
      setError(res.error || "Login failed.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(ellipse at top, #F1F5F9 0%, #E2E8F0 100%)",
        padding: "24px 16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 440,
          background: "#FFFFFF",
          borderRadius: 20,
          padding: "36px 32px",
          boxShadow: "0 20px 48px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
            <Image src="/logo.png" alt="Solforbs" width={120} height={34} style={{ height: 32, width: "auto", objectFit: "contain" }} />
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(14, 91, 255, 0.07)", padding: "4px 10px", borderRadius: 100, marginBottom: 8 }}>
            <ShieldCheck size={14} color="#0E5BFF" />
            <span style={{ fontSize: 11, fontWeight: 700, color: "#0E5BFF", letterSpacing: "0.04em", textTransform: "uppercase" }}>
              Authorized Portal
            </span>
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0F172A", margin: 0 }}>
            Solforbs Operations
          </h1>
          <p style={{ fontSize: 13.5, color: "#64748B", marginTop: 6, marginBottom: 0 }}>
            {usePasswordMode 
              ? "Sign in with your master credentials" 
              : step === 1 
              ? "Enter your approved admin email" 
              : "Enter the verification code sent to your inbox"}
          </p>
        </div>

        {/* Error / Info Alerts */}
        {error && (
          <div
            style={{
              padding: "12px 14px",
              borderRadius: 10,
              background: "#FEF2F2",
              border: "1px solid #FCA5A5",
              color: "#991B1B",
              fontSize: 13,
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 20,
            }}
          >
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {infoMessage && (
          <div
            style={{
              padding: "12px 14px",
              borderRadius: 10,
              background: "#F0FDF4",
              border: "1px solid #BBF7D0",
              color: "#166534",
              fontSize: 13,
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 20,
            }}
          >
            <ShieldCheck size={16} style={{ flexShrink: 0 }} />
            <span>{infoMessage}</span>
          </div>
        )}

        {/* Mode: Master Password */}
        {usePasswordMode ? (
          <form onSubmit={handlePasswordSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: "#475569", marginBottom: 6 }}>
                Admin Email
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="email"
                  required
                  placeholder="name@solforbs.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px 12px 38px",
                    borderRadius: 10,
                    border: "1px solid #CBD5E1",
                    fontSize: 14,
                    color: "#0F172A",
                    outline: "none",
                  }}
                />
                <Mail size={16} color="#94A3B8" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: "#475569", marginBottom: 6 }}>
                Master Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px 12px 38px",
                    borderRadius: 10,
                    border: "1px solid #CBD5E1",
                    fontSize: 14,
                    color: "#0F172A",
                    outline: "none",
                  }}
                />
                <KeyRound size={16} color="#94A3B8" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px 20px",
                background: "var(--gradient-cta, #0E5BFF)",
                color: "#FFFFFF",
                border: "none",
                borderRadius: 10,
                fontSize: 14.5,
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                marginTop: 4,
              }}
            >
              {loading ? <RefreshCw size={16} className="animate-spin" /> : <><span>Sign In</span> <ArrowRight size={16} /></>}
            </button>
          </form>
        ) : (
          /* Mode: Passwordless Email OTP */
          <>
            {step === 1 ? (
              <form onSubmit={handleSendCode} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: "#475569", marginBottom: 6 }}>
                    Authorized Email Address
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="email"
                      required
                      placeholder="info@solforbs.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "12px 14px 12px 38px",
                        borderRadius: 10,
                        border: "1px solid #CBD5E1",
                        fontSize: 14,
                        color: "#0F172A",
                        outline: "none",
                      }}
                    />
                    <Mail size={16} color="#94A3B8" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "12px 20px",
                    background: "var(--gradient-cta, #0E5BFF)",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: 10,
                    fontSize: 14.5,
                    fontWeight: 700,
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.7 : 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    marginTop: 4,
                  }}
                >
                  {loading ? <RefreshCw size={16} className="animate-spin" /> : <><span>Send Security Code</span> <ArrowRight size={16} /></>}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyCode} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <label style={{ fontSize: 12.5, fontWeight: 700, color: "#475569" }}>
                      6-Digit Security Code
                    </label>
                    <button
                      type="button"
                      onClick={() => { setStep(1); setCode(""); }}
                      style={{ background: "none", border: "none", color: "#0E5BFF", fontSize: 12, fontWeight: 600, cursor: "pointer", padding: 0 }}
                    >
                      Change Email
                    </button>
                  </div>
                  <input
                    type="text"
                    maxLength={6}
                    autoFocus
                    placeholder="123456"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      borderRadius: 10,
                      border: "2px solid #0E5BFF",
                      fontSize: 24,
                      fontWeight: 800,
                      letterSpacing: "8px",
                      textAlign: "center",
                      fontFamily: "monospace",
                      color: "#0F172A",
                      outline: "none",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "12px 20px",
                    background: "var(--gradient-cta, #0E5BFF)",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: 10,
                    fontSize: 14.5,
                    fontWeight: 700,
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.7 : 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    marginTop: 4,
                  }}
                >
                  {loading ? <RefreshCw size={16} className="animate-spin" /> : <><span>Verify & Access Admin</span> <ArrowRight size={16} /></>}
                </button>
              </form>
            )}
          </>
        )}

        {/* Toggle between OTP and Password */}
        <div style={{ marginTop: 24, paddingTop: 18, borderTop: "1px solid #F1F5F9", textAlign: "center" }}>
          <button
            type="button"
            onClick={() => {
              setUsePasswordMode(!usePasswordMode);
              setError(null);
              setInfoMessage(null);
              setStep(1);
            }}
            style={{
              background: "none",
              border: "none",
              color: "#64748B",
              fontSize: 12.5,
              fontWeight: 600,
              cursor: "pointer",
              padding: "4px 8px",
            }}
          >
            {usePasswordMode ? "← Switch back to Email Code (OTP)" : "Prefer Master Password sign-in?"}
          </button>
        </div>
      </div>
    </div>
  );
}
