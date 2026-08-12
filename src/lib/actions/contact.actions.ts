/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const emailStyles = `
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F7F9FC; margin: 0; padding: 0; }
  .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
  .header { background: #ffffff; padding: 32px 40px; text-align: center; border-bottom: 2px solid #f1f5f9; }
  .content { padding: 40px; }
  .title { font-size: 22px; font-weight: 700; color: #0F172A; margin-top: 0; margin-bottom: 24px; }
  .data-table { width: 100%; border-collapse: collapse; margin-bottom: 32px; }
  .data-table td { padding: 16px 0; border-bottom: 1px solid #f1f5f9; font-size: 15px; }
  .data-label { color: #64748B; font-weight: 600; width: 130px; text-transform: uppercase; font-size: 12px; letter-spacing: 0.05em; }
  .data-value { color: #0F172A; font-weight: 500; }
  .message-box { background: #F8FAFC; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; color: #334155; font-size: 15px; line-height: 1.6; }
  .footer { background: #F8FAFC; padding: 32px 40px; text-align: center; border-top: 1px solid #e2e8f0; }
  .footer-title { font-size: 14px; font-weight: 700; color: #0F172A; margin-bottom: 16px; margin-top: 0; }
  .footer-contact { font-size: 14px; color: #64748B; margin-bottom: 8px; line-height: 1.5; }
  .footer-link { color: #0E5BFF; text-decoration: none; font-weight: 600; }
`;

export async function submitContactForm(data: {
  name: string;
  email: string;
  organization: string;
  message: string;
}) {
  try {
    const { name, email, organization, message } = data;

    // 1. Send an email alert to the Solforbs info address (Internal)
    const internalResponse = await resend.emails.send({
      from: "Solforbs Website <info@solforbs.com>",
      to: "info@solforbs.com",
      replyTo: email,
      subject: `New Lead: ${name} from ${organization}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head><style>${emailStyles}</style></head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://res.cloudinary.com/heoitq4h/image/upload/v1786471407/solforbs_logo.png" alt="Solforbs" style="height: 68px; width: auto; object-fit: contain;" />
            </div>
            <div class="content">
              <h2 class="title">New Demo Request</h2>
              <table class="data-table">
                <tr><td class="data-label">Name</td><td class="data-value">${name}</td></tr>
                <tr><td class="data-label">Email</td><td class="data-value"><a href="mailto:${email}" style="color: #0E5BFF; text-decoration: none;">${email}</a></td></tr>
                <tr><td class="data-label">Organization</td><td class="data-value">${organization}</td></tr>
              </table>
              <div class="data-label" style="margin-bottom: 12px;">Message</div>
              <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
            </div>
            <div class="footer">
              <h3 class="footer-title">Solforbs Internal System</h3>
              <div class="footer-contact">
                Support: <a href="mailto:support@solforbs.com" class="footer-link">support@solforbs.com</a> &nbsp;|&nbsp; 
                Info: <a href="mailto:info@solforbs.com" class="footer-link">info@solforbs.com</a>
              </div>
              <div class="footer-contact" style="margin-bottom: 0;">Phone: +254 725 996 394 &nbsp;|&nbsp; +254 759 900 802</div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (internalResponse.error) {
      console.error("Resend API Error (Internal):", internalResponse.error);
      return { success: false, error: internalResponse.error.message };
    }

    // 2. Send an auto-reply confirmation to the customer (External)
    await resend.emails.send({
      from: "Solforbs <info@solforbs.com>",
      to: email,
      subject: "We received your request - Solforbs",
      html: `
        <!DOCTYPE html>
        <html>
        <head><style>${emailStyles}</style></head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://res.cloudinary.com/heoitq4h/image/upload/v1786471407/solforbs_logo.png" alt="Solforbs" style="height: 68px; width: auto; object-fit: contain;" />
            </div>
            <div class="content">
              <h2 class="title">Hi ${name},</h2>
              <div style="color: #334155; font-size: 16px; line-height: 1.7;">
                <p>Thank you for reaching out to Solforbs.</p>
                <p>We have received your request and our team is currently reviewing your requirements for <strong>${organization}</strong>.</p>
                <p>One of our specialists will be in touch with you shortly to schedule a live demonstration and discuss how our platforms can streamline your operations.</p>
                <p style="margin-top: 32px; color: #0F172A;">
                  Best regards,<br>
                  <strong>The Solforbs Team</strong>
                </p>
              </div>
            </div>
            <div class="footer">
              <div class="footer-contact">
                Support: <a href="mailto:support@solforbs.com" class="footer-link">support@solforbs.com</a> &nbsp;|&nbsp; 
                Info: <a href="mailto:info@solforbs.com" class="footer-link">info@solforbs.com</a>
              </div>
              <div class="footer-contact" style="margin-bottom: 0;">Phone: +254 725 996 394 &nbsp;|&nbsp; +254 759 900 802</div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return { success: true };
  } catch (error: any) {
    console.error("Server Action Error:", error);
    return { success: false, error: error.message || "Failed to send email" };
  }
}
