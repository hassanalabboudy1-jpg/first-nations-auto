/**
 * Notifications: SMS (Twilio) + Email alerts when a new lead comes in.
 */

const TWILIO_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_FROM = process.env.TWILIO_PHONE_NUMBER;
const NOTIFY_PHONE = process.env.NOTIFY_PHONE_NUMBER;
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL; // sam's email for lead alerts

interface LeadAlert {
  leadId: string;
  firstName: string;
  lastName?: string;
  phone: string;
  community?: string;
  vehicleType?: string;
  budgetRange?: string;
  hasStatusCard?: boolean;
  source?: string;
}

export async function notifyNewLead(lead: LeadAlert) {
  // Always send email alert
  await emailNewLead(lead);

  // SMS alert (only if Twilio is configured)
  if (!TWILIO_SID || !TWILIO_TOKEN || !TWILIO_FROM || !NOTIFY_PHONE) {
    return;
  }

  const statusCard = lead.hasStatusCard ? "Yes" : "No";
  const message = [
    `🚗 NEW LEAD — Call within 1 hour!`,
    `Name: ${lead.firstName}${lead.lastName ? " " + lead.lastName : ""}`,
    `Phone: ${lead.phone}`,
    lead.community ? `Community: ${lead.community}` : null,
    lead.vehicleType ? `Vehicle: ${lead.vehicleType}` : null,
    lead.budgetRange ? `Budget: ${lead.budgetRange}` : null,
    `Status Card: ${statusCard}`,
    lead.source ? `Source: ${lead.source}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization:
          "Basic " + Buffer.from(`${TWILIO_SID}:${TWILIO_TOKEN}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        From: TWILIO_FROM,
        To: NOTIFY_PHONE,
        Body: message,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Twilio SMS error:", res.status, err);
    }
  } catch (err) {
    console.error("SMS notification failed:", err);
  }
}

/**
 * Email notification when a new lead comes in.
 * Uses Resend API (free: 100 emails/day). Falls back silently if not configured.
 * Sign up at resend.com, get API key, add RESEND_API_KEY to env vars.
 */
async function emailNewLead(lead: LeadAlert) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !NOTIFY_EMAIL) {
    console.warn("Email not configured — skipping email notification");
    return;
  }

  const statusCard = lead.hasStatusCard ? "Yes" : "No";
  const html = `
    <h2>🚗 New Lead — Call Within 1 Hour!</h2>
    <table style="border-collapse:collapse;font-family:sans-serif;">
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Name:</td><td>${lead.firstName}${lead.lastName ? " " + lead.lastName : ""}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Phone:</td><td><a href="tel:${lead.phone}">${lead.phone}</a></td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Community:</td><td>${lead.community || "Not specified"}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Vehicle:</td><td>${lead.vehicleType || "Not specified"}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Budget:</td><td>${lead.budgetRange || "Not specified"}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Status Card:</td><td>${statusCard}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Source:</td><td>${lead.source || "website"}</td></tr>
    </table>
    <br>
    <p><strong>⏰ Call them within 1 hour!</strong></p>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "First Nation Auto <onboarding@resend.dev>",
        to: NOTIFY_EMAIL,
        subject: `🚗 New Lead: ${lead.firstName} — ${lead.community || "Website"} — CALL WITHIN 1 HR`,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Email notification error:", res.status, err);
    }
  } catch (err) {
    console.error("Email notification failed:", err);
  }
}

/**
 * Auto-reply SMS to the lead immediately after they apply.
 * This confirms their application and sets the 1-hour callback expectation.
 */
export async function sendLeadAutoReply(lead: { firstName: string; phone: string }) {
  if (!TWILIO_SID || !TWILIO_TOKEN || !TWILIO_FROM) {
    console.warn("Twilio not configured — skipping auto-reply SMS");
    return;
  }

  const message = [
    `Hi ${lead.firstName}! Thanks for your application with First Nation Auto Financing.`,
    ``,
    `Your pre-approval is being processed. Expect a call from our team within 1 hour.`,
    ``,
    `- $0 down payment`,
    `- Tax-exempt on-reserve delivery`,
    `- All credit welcome`,
    ``,
    `Questions? Reply to this text anytime.`,
    `- First Nation Auto Financing`,
  ].join("\n");

  try {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization:
          "Basic " + Buffer.from(`${TWILIO_SID}:${TWILIO_TOKEN}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        From: TWILIO_FROM,
        To: lead.phone,
        Body: message,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Twilio auto-reply error:", res.status, err);
    }
  } catch (err) {
    console.error("Auto-reply SMS failed:", err);
  }
}
