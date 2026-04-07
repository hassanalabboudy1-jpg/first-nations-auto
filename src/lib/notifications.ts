/**
 * SMS notification via Twilio when a new lead comes in.
 * Sends an alert to the business phone so you can call back within 1 hour.
 */

const TWILIO_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_FROM = process.env.TWILIO_PHONE_NUMBER;
const NOTIFY_PHONE = process.env.NOTIFY_PHONE_NUMBER; // your personal phone

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
  if (!TWILIO_SID || !TWILIO_TOKEN || !TWILIO_FROM || !NOTIFY_PHONE) {
    console.warn("Twilio not configured — skipping SMS notification");
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
    // Never let notification failure break lead submission
    console.error("SMS notification failed:", err);
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
    `Hi ${lead.firstName}! Thanks for your application with First Nations Auto Financing.`,
    ``,
    `Your pre-approval is being processed. Expect a call from our team within 1 hour.`,
    ``,
    `- $0 down payment`,
    `- Tax-exempt on-reserve delivery`,
    `- All credit welcome`,
    ``,
    `Questions? Reply to this text anytime.`,
    `- First Nations Auto`,
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
