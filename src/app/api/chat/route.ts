import { NextRequest, NextResponse } from "next/server";
import { getProjects } from "@/lib/actions/project.actions";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Optimized model hierarchy: fastest models first (780ms) with fallback to full preview models
const MODEL_CANDIDATES = [
  "gemini-flash-lite-latest",
  "gemini-3.5-flash-lite",
  "gemini-3.5-flash",
  "gemini-3-flash-preview",
  "gemini-flash-latest",
];

export async function POST(req: NextRequest) {
  try {
    const { message, history = [] } = await req.json();

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    if (!GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY environment variable is not set.");
      return NextResponse.json({
        reply: "Thank you for reaching out to Solforbs. Our advisory desk is directly available via WhatsApp at [+254 725 996 394](https://wa.me/254725996394) or email at [info@solforbs.com](mailto:info@solforbs.com).",
      });
    }

    // Fetch live projects from MongoDB
    const liveProjects = await getProjects();

    const projectsSummary = liveProjects.length > 0
      ? liveProjects.map((p) => {
          const featList = p.features && p.features.length > 0
            ? p.features.map((f: any) => `  - ${f.title}: ${f.desc}`).join("\n")
            : "  - Core operational modules";
          const link = p.subdomain ? `https://${p.subdomain}` : p.liveUrl || "Available on request";
          return `• Project: "${p.name}" (Industry: ${p.industry}, Status: ${p.status.toUpperCase()})
  Summary: ${p.summary}
  Live/Access URL: ${link}
  Key Capabilities:
${featList}`;
        }).join("\n\n")
      : "• Education Management Platform (Live): Admissions, real-time attendance, tuition fee management, parent SMS notifications, automated reports.";

    const systemPrompt = `You are Solforbs Intelligence, the official proprietary AI solutions specialist and enterprise advisor engineered by Solforbs (https://solforbs.com).

PROPRIETARY IDENTITY GUIDELINES:
• You are powered entirely by Solforbs' in-house proprietary intelligence engine.
• NEVER mention or acknowledge any third-party tech, models, or vendors such as Gemini, Google, OpenAI, ChatGPT, Anthropic, MongoDB, or third-party databases. If asked what technology or AI you run on, state that you are "Solforbs Intelligence, the proprietary enterprise advisory system developed by Solforbs."

COMPANY OVERVIEW:
Solforbs engineers cloud-native operational software specifically designed for the growth and compliance demands of African organizations and primary economic sectors.

ENTERPRISE PLATFORM CATALOG:
${projectsSummary}

UPCOMING PLANNED INDUSTRIES:
• Hospitality: Front-desk reservations, POS, billing, and housekeeping.
• Real Estate: Tenant leasing, maintenance, and automated rent tracking.
• Agriculture: Supply chain tracking, harvest yield reporting, and compliance.
• Healthcare: Clinic scheduling, patient digital records, and medical billing.
• Retail & Manufacturing: Inventory sync, multi-branch POS, and production tracking.

IMPLEMENTATION & ONBOARDING MODEL:
1. Consultation & Discovery: Analyze current bottlenecks and data migration needs.
2. Customization & Setup: Tailor modules, roles, and localized payment gateways (including M-Pesa).
3. On-Site Deployment & Staff Training: Hands-on staff onboarding.
4. 24/7 Dedicated Support: Ongoing SLA support and regular feature upgrades.

OFFICIAL CONTACT & ESCALATION CHANNELS:
• Official Corporate Email: info@solforbs.com (Always use [info@solforbs.com](mailto:info@solforbs.com) for official, partnership, or general inquiries. Never use personal or gmail addresses.)
• Executive & Enterprise Inquiries (Demos & Partnerships): +254 725 996 394 (WhatsApp: https://wa.me/254725996394)
• Client Support & Operations: +254 759 900 802 (WhatsApp: https://wa.me/254759900802)
• Alternate Direct Line: 0723 543 460
• Headquarters: Upperhill, Masaba Road 10, Nairobi, Kenya
• Official Website: https://solforbs.com

BEHAVIORAL GUIDELINES:
1. Tone: Warm, executive, articulate, tech-forward, and trustworthy.
2. Conciseness: Keep responses crisp and punchy (1-3 brief paragraphs or bullet points). Avoid fluff or overly lengthy essays.
3. Pricing Inquiries: Clarify that pricing is customized to institutional scale/student headcount, and proactively provide direct links to reach the Executive team on WhatsApp (+254 725 996 394) or book an online walkthrough.
4. Product Details: Use real details from our Solforbs platform catalog above. Mention specific capabilities (e.g., student admissions, fee reconciliation, timetabling, report cards).
5. Links: When referencing contact channels or live products, format them in clean markdown links so the user can click directly.
6. Guardrails: If asked questions totally unrelated to Solforbs or enterprise software (e.g., general trivia, personal advice, unrelated coding), politely decline and steer the conversation back to how Solforbs can digitize their operations.`;

    // Format conversation history for Gemini API
    const contents: any[] = [];

    // Include last 6 turns of history for context
    const recentHistory = Array.isArray(history) ? history.slice(-6) : [];
    for (const turn of recentHistory) {
      if (turn.role === "user" || turn.role === "assistant") {
        contents.push({
          role: turn.role === "user" ? "user" : "model",
          parts: [{ text: turn.content }],
        });
      }
    }

    // Add current user prompt
    contents.push({
      role: "user",
      parts: [{ text: message.trim() }],
    });

    // Attempt generation with automatic model fallback
    let replyText = "";
    let lastError: any = null;

    for (const model of MODEL_CANDIDATES) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout per candidate

        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            contents,
            systemInstruction: {
              parts: [{ text: systemPrompt }],
            },
            generationConfig: {
              temperature: 0.25,
              maxOutputTokens: 380,
            },
          }),
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidateText) {
            replyText = candidateText;
            break;
          }
        } else {
          const errData = await response.json().catch(() => ({}));
          lastError = { status: response.status, message: errData?.error?.message };
          console.warn(`Model ${model} failed:`, response.status, errData?.error?.message);
        }
      } catch (err: any) {
        lastError = { message: err.message };
        console.warn(`Error calling model ${model}:`, err.message);
      }
    }

    if (!replyText) {
      console.error("All AI models in fallback chain failed. Last error:", lastError);
      return NextResponse.json({
        reply: "Thank you for reaching out to Solforbs. Our advisory service is momentarily handling high volume, but our Executive team is directly available on WhatsApp at [+254 725 996 394](https://wa.me/254725996394) or via email at [info@solforbs.com](mailto:info@solforbs.com). How can we assist your institution?",
      });
    }

    return NextResponse.json({
      reply: replyText,
    });
  } catch (error: any) {
    console.error("Chat route error:", error);
    return NextResponse.json(
      { error: "Internal chat error", details: error?.message },
      { status: 500 }
    );
  }
}
