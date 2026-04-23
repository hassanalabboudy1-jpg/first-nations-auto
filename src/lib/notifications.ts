/**
 * Notifications: SMS (Twilio) + Email alerts when a new lead comes in.
 */

const TWILIO_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_FROM = process.env.TWILIO_PHONE_NUMBER;
const NOTIFY_PHONE = process.env.NOTIFY_PHONE_NUMBER;
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL;

interface LeadAlert {
  leadId: string;
  firstName: string;
  lastName?: string;
  phone: string;
  community?: string;
  vehicleType?: string;
  budgetRange?: string;
  hasStatusCard?: boolean;
  employmentStatus?: string;
  monthlyIncome?: string;
  creditRange?: string;
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
    lead.employmentStatus ? `Employment: ${lead.employmentStatus}` : null,
    lead.monthlyIncome ? `Income: ${lead.monthlyIncome}` : null,
    lead.creditRange ? `Credit: ${lead.creditRange}` : null,
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
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 16px 6px 0;font-weight:bold;color:#333;">${label}</td><td style="padding:6px 0;color:#555;">${value}</td></tr>`;

  const html = `
    <div style="font-family:sans-serif;max-width:500px;">
      <h2 style="color:#b91c1c;margin-bottom:4px;">🚗 NEW LEAD — Call Within 1 Hour!</h2>
      <p style="color:#666;font-size:13px;margin-top:0;">Submitted just now from the website.</p>
      <table style="border-collapse:collapse;width:100%;margin:16px 0;">
        ${row("Name", `${lead.firstName}${lead.lastName ? " " + lead.lastName : ""}`)}
        ${row("Phone", `<a href="tel:${lead.phone}" style="color:#b91c1c;font-weight:bold;">${lead.phone}</a>`)}
        ${row("Community", lead.community || "Not specified")}
        ${row("Vehicle", lead.vehicleType || "Not specified")}
        ${row("Budget", lead.budgetRange || "Not specified")}
        ${row("Employment", lead.employmentStatus || "Not specified")}
        ${row("Monthly Income", lead.monthlyIncome || "Not specified")}
        ${row("Credit", lead.creditRange || "Not specified")}
        ${row("Status Card", statusCard)}
        ${row("Source", lead.source || "website")}
      </table>
      <p style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:12px;text-align:center;">
        <strong style="color:#b91c1c;">⏰ Call them within 1 hour!</strong>
      </p>
    </div>
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
