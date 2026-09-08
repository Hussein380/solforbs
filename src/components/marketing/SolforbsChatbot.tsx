/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  X,
  Send,
  RotateCcw,
  ArrowUpRight,
  GraduationCap,
  CalendarCheck,
  PhoneCall,
  Bot,
  User,
  ShieldCheck,
} from "lucide-react";

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
  isTyping?: boolean;
}

const QUICK_PROMPTS = [
  {
    icon: GraduationCap,
    label: "Education OS Capabilities",
    query: "What features are included in the Solforbs School Management Platform?",
  },
  {
    icon: CalendarCheck,
    label: "Deployment & Onboarding",
    query: "How long does deployment take and how do you train our school staff?",
  },
  {
    icon: ArrowUpRight,
    label: "Pricing Structure",
    query: "How does pricing work for Solforbs platforms?",
  },
  {
    icon: PhoneCall,
    label: "Book a Live Walkthrough",
    query: "How can I schedule a live demo or speak with your executive team?",
  },
];

/**
 * Formats bold text, bullet lines, and markdown links into clean clickable elements
 */
function FormattedMessage({ content, isTyping }: { content: string; isTyping?: boolean }) {
  const lines = content.split("\n");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13.5, lineHeight: 1.6 }}>
      {lines.map((line, lineIdx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={lineIdx} style={{ height: 4 }} />;
        }

        const isBullet = trimmed.startsWith("•") || trimmed.startsWith("-") || trimmed.startsWith("* ");
        const textContent = isBullet ? trimmed.replace(/^[•\-*]\s*/, "") : trimmed;

        // Parse markdown links [text](url) and bold **text**
        const parts = [];
        const regex = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(textContent)) !== null) {
          if (match.index > lastIndex) {
            parts.push(textContent.substring(lastIndex, match.index));
          }

          if (match[1] && match[2]) {
            // Link
            parts.push(
              <a
                key={`link-${match.index}`}
                href={match[2]}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--brand-mid, #0066FF)",
                  fontWeight: 600,
                  textDecoration: "underline",
                  wordBreak: "break-word",
                }}
              >
                {match[1]}
              </a>
            );
          } else if (match[3]) {
            // Bold
            parts.push(
              <strong key={`bold-${match.index}`} style={{ fontWeight: 700, color: "#0F172A" }}>
                {match[3]}
              </strong>
            );
          }

          lastIndex = regex.lastIndex;
        }

        if (lastIndex < textContent.length) {
          parts.push(textContent.substring(lastIndex));
        }

        if (isBullet) {
          return (
            <div key={lineIdx} style={{ display: "flex", alignItems: "flex-start", gap: 8, paddingLeft: 4 }}>
              <span style={{ color: "var(--brand-mid, #0066FF)", fontWeight: 700 }}>•</span>
              <div style={{ flex: 1 }}>{parts}</div>
            </div>
          );
        }

        return <div key={lineIdx}>{parts}</div>;
      })}
      {isTyping && (
        <span
          style={{
            display: "inline-block",
            width: 4,
            height: 14,
            background: "var(--brand-mid, #0066FF)",
            marginLeft: 2,
            animation: "pulse 0.8s infinite",
          }}
        />
      )}
    </div>
  );
}

export default function SolforbsChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      role: "assistant",
      content:
        "Hello! I am **Solforbs Intelligence**, your dedicated enterprise solutions specialist.\n\nAsk me about our **School Management Platform**, key operational modules (admissions, CBC grading, automated tuition billing, conflict-free scheduling), deployment models, or request an executive demonstration!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll on message updates
  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, loading]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Clean up typing timer on unmount
  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, []);

  /**
   * Human-like typewriter effect that reveals the response progressively
   */
  const streamResponse = (fullText: string, messageId: string) => {
    let currentIdx = 0;
    const chunkSize = 10; // Reveal 10 characters per tick for snappy, responsive human flow
    const speedMs = 12;   // Smooth natural speed without lag

    // Create placeholder assistant message
    setMessages((prev) => [
      ...prev,
      {
        id: messageId,
        role: "assistant",
        content: "",
        isTyping: true,
      },
    ]);

    if (typingTimerRef.current) clearInterval(typingTimerRef.current);

    typingTimerRef.current = setInterval(() => {
      currentIdx += chunkSize;
      if (currentIdx >= fullText.length) {
        if (typingTimerRef.current) clearInterval(typingTimerRef.current);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === messageId ? { ...m, content: fullText, isTyping: false } : m
          )
        );
      } else {
        const partial = fullText.slice(0, currentIdx);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === messageId ? { ...m, content: partial, isTyping: true } : m
          )
        );
      }
    }, speedMs);
  };

  const handleSend = async (textToSend?: string) => {
    const prompt = (textToSend || input).trim();
    if (!prompt || loading) return;

    const userMessageId = `u-${Date.now()}`;
    const newMessages: Message[] = [...messages, { id: userMessageId, role: "user", content: prompt }];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const history = newMessages.slice(-6).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: prompt, history }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok && data.reply) {
        streamResponse(data.reply, `a-${Date.now()}`);
      } else {
        const fallback =
          data.reply ||
          "I encountered a temporary connection issue. You can speak directly with our team on WhatsApp: [+254 725 996 394](https://wa.me/254725996394) or email [info@solforbs.com](mailto:info@solforbs.com).";
        streamResponse(fallback, `a-${Date.now()}`);
      }
    } catch (err) {
      setLoading(false);
      streamResponse(
        "Network error communicating with the advisor. Please reach our Executive line directly on WhatsApp at [+254 725 996 394](https://wa.me/254725996394) or email [info@solforbs.com](mailto:info@solforbs.com).",
        `a-${Date.now()}`
      );
    }
  };

  const handleReset = () => {
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: "assistant",
        content:
          "Conversation restarted. How can I assist you with Solforbs platforms, features, or deployment models today?",
      },
    ]);
  };

  return (
    <>
      {/* ── Chat Modal Window ─────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="chatbot-window"
            style={{
              background: "#FFFFFF",
              zIndex: 10000,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                background: "linear-gradient(135deg, #0B132B 0%, #1C2D5A 100%)",
                padding: "16px 20px",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                flexShrink: 0,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 12,
                    background: "linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 14px rgba(37, 99, 235, 0.35)",
                    position: "relative",
                  }}
                >
                  <Sparkles size={19} color="#FFFFFF" />
                  <span
                    style={{
                      position: "absolute",
                      bottom: -2,
                      right: -2,
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: "#10B981",
                      border: "2px solid #0B132B",
                    }}
                  />
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.01em" }}>
                      Solforbs Intelligence
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                    <span style={{ fontSize: 11, color: "rgba(255, 255, 255, 0.75)", fontWeight: 500 }}>
                      Proprietary Enterprise Advisor · Online
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <button
                  onClick={handleReset}
                  title="Reset conversation"
                  aria-label="Reset conversation"
                  style={{
                    background: "rgba(255, 255, 255, 0.12)",
                    border: "none",
                    borderRadius: "50%",
                    width: 30,
                    height: 30,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFFFF",
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                >
                  <RotateCcw size={14} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                  style={{
                    background: "rgba(255, 255, 255, 0.12)",
                    border: "none",
                    borderRadius: "50%",
                    width: 30,
                    height: 30,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFFFF",
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div
              style={{
                flex: 1,
                padding: "16px",
                overflowY: "auto",
                background: "#F8FAFC",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              {messages.map((m) => {
                const isAssistant = m.role === "assistant";
                return (
                  <div
                    key={m.id}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      alignSelf: isAssistant ? "flex-start" : "flex-end",
                      maxWidth: "88%",
                    }}
                  >
                    {isAssistant && (
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          background: "#0B132B",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#38BDF8",
                          flexShrink: 0,
                          marginTop: 2,
                        }}
                      >
                        <Bot size={15} />
                      </div>
                    )}

                    <div
                      style={{
                        background: isAssistant ? "#FFFFFF" : "var(--brand-mid, #0066FF)",
                        color: isAssistant ? "#1E293B" : "#FFFFFF",
                        padding: "12px 16px",
                        borderRadius: isAssistant ? "4px 18px 18px 18px" : "18px 4px 18px 18px",
                        boxShadow: isAssistant ? "0 2px 8px rgba(0, 0, 0, 0.04)" : "0 3px 10px rgba(0, 102, 255, 0.2)",
                        border: isAssistant ? "1px solid rgba(0, 0, 0, 0.06)" : "none",
                      }}
                    >
                      {isAssistant ? (
                        <FormattedMessage content={m.content} isTyping={m.isTyping} />
                      ) : (
                        <span style={{ fontSize: 13.5, lineHeight: 1.5 }}>{m.content}</span>
                      )}
                    </div>

                    {!isAssistant && (
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          background: "#E2E8F0",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#475569",
                          flexShrink: 0,
                          marginTop: 2,
                        }}
                      >
                        <User size={15} />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Typing indicator (while awaiting server) */}
              {loading && (
                <div style={{ display: "flex", alignItems: "center", gap: 10, alignSelf: "flex-start" }}>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "#0B132B",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#38BDF8",
                    }}
                  >
                    <Bot size={15} />
                  </div>
                  <div
                    style={{
                      background: "#FFFFFF",
                      padding: "12px 18px",
                      borderRadius: "4px 18px 18px 18px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                      border: "1px solid rgba(0, 0, 0, 0.06)",
                      display: "flex",
                      gap: 5,
                      alignItems: "center",
                    }}
                  >
                    {[0, 1, 2].map((dot) => (
                      <motion.div
                        key={dot}
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
                        transition={{ duration: 0.7, repeat: Infinity, delay: dot * 0.18 }}
                        style={{ width: 6, height: 6, borderRadius: "50%", background: "#2563EB" }}
                      />
                    ))}
                    <span style={{ fontSize: 12, color: "#64748B", marginLeft: 6, fontWeight: 500 }}>
                      Solforbs Advisor is preparing response...
                    </span>
                  </div>
                </div>
              )}

              {/* Quick suggestion pills (shown if 2 or fewer messages) */}
              {messages.length <= 2 && !loading && (
                <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#94A3B8" }}>
                    Suggested Questions:
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {QUICK_PROMPTS.map((qp, i) => {
                      const Icon = qp.icon;
                      return (
                        <button
                          key={i}
                          onClick={() => handleSend(qp.query)}
                          disabled={loading}
                          style={{
                            background: "#FFFFFF",
                            border: "1px solid rgba(0, 0, 0, 0.08)",
                            borderRadius: 16,
                            padding: "7px 13px",
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            fontSize: 12,
                            fontWeight: 600,
                            color: "#334155",
                            cursor: "pointer",
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "#2563EB";
                            e.currentTarget.style.background = "#EFF6FF";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)";
                            e.currentTarget.style.background = "#FFFFFF";
                          }}
                        >
                          <Icon size={13} color="#2563EB" />
                          <span>{qp.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Input Bar */}
            <div
              style={{
                padding: "12px 16px",
                background: "#FFFFFF",
                borderTop: "1px solid rgba(0, 0, 0, 0.06)",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                flexShrink: 0,
              }}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                style={{ display: "flex", alignItems: "center", gap: 8 }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about school software, features, or deployment..."
                  disabled={loading}
                  style={{
                    flex: 1,
                    padding: "12px 16px",
                    borderRadius: 14,
                    border: "1px solid #E2E8F0",
                    background: "#F8FAFC",
                    fontSize: 13.5,
                    outline: "none",
                    color: "#0F172A",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#2563EB")}
                  onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  aria-label="Send message"
                  style={{
                    background: input.trim() && !loading ? "var(--brand-mid, #0066FF)" : "#E2E8F0",
                    color: input.trim() && !loading ? "#FFFFFF" : "#94A3B8",
                    border: "none",
                    borderRadius: 14,
                    width: 44,
                    height: 44,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                    transition: "background 0.2s, transform 0.1s",
                  }}
                >
                  <Send size={16} />
                </button>
              </form>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 11, color: "#94A3B8" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <ShieldCheck size={12} color="#10B981" /> Verified Solforbs Solutions
                </span>
                <span>Press Enter to send</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Launcher Trigger ─────────────────────────────── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open Solforbs Intelligence Advisor"
            className="chatbot-launcher-btn"
            style={{
              position: "fixed",
              bottom: 92,
              right: 24,
              zIndex: 90,
              background: "linear-gradient(135deg, #0B132B 0%, #1E3A8A 100%)",
              color: "#FFFFFF",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: 30,
              padding: "10px 18px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              boxShadow: "0 10px 25px -4px rgba(11, 19, 43, 0.35), 0 0 0 1px rgba(0, 0, 0, 0.08)",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Sparkles size={14} color="#FFFFFF" />
            </div>
            <div className="chatbot-text-desktop" style={{ textAlign: "left" }}>
              <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.2 }}>
                Ask Solforbs AI
              </div>
              <div style={{ fontSize: 10, color: "rgba(255, 255, 255, 0.75)", fontWeight: 500 }}>
                Enterprise Solutions Advisor
              </div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
