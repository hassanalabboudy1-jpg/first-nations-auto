/**
 * Client-side conversion tracking for Facebook Pixel and Google Ads.
 * Call these after a successful lead form submission.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

interface LeadEventData {
  community?: string;
  vehicleType?: string;
  province?: string;
}

/** Fire Lead conversion on both Facebook and Google */
export function trackLeadConversion(data?: LeadEventData) {
  // Facebook Pixel — Lead event
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Lead", {
      content_name: data?.community || "website_form",
      content_category: data?.vehicleType || "vehicle",
      value: 1,
      currency: "CAD",
    });
  }

  // Google Ads — Conversion event
  if (typeof window !== "undefined" && window.gtag) {
    const conversionId = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;
    if (conversionId) {
      window.gtag("event", "conversion", {
        send_to: conversionId,
        value: 1.0,
        currency: "CAD",
      });
    }
  }
}

/** Track community page view (for retargeting) */
export function trackCommunityView(community: string, province: string) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "ViewContent", {
      content_name: community,
      content_category: province,
    });
  }
}
