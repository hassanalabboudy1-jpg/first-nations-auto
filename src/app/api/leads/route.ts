import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { z } from "zod";
import { notifyNewLead, sendLeadAutoReply } from "@/lib/notifications";

const leadSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().optional(),
  phone: z.string().min(7),
  email: z.string().email().optional().or(z.literal("")),
  communitySlug: z.string().optional(),
  vehicleType: z.string().optional(),
  budgetRange: z.string().optional(),
  tradeIn: z.boolean().optional(),
  employmentStatus: z.string().optional(),
  hasStatusCard: z.boolean().optional(),
  referralCode: z.string().optional(),
  source: z.string().optional(),
  landingPage: z.string().optional(),
  utmSource: z.string().nullable().optional(),
  utmMedium: z.string().nullable().optional(),
  utmCampaign: z.string().nullable().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = leadSchema.parse(body);

    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll() {},
        },
      }
    );

    // Look up community ID if slug provided
    let communityId = null;
    if (data.communitySlug && data.communitySlug !== "other") {
      const { data: community } = await supabase
        .from("communities")
        .select("id")
        .eq("slug", data.communitySlug)
        .single();
      communityId = community?.id || null;
    }

    // Insert the lead
    const { data: lead, error } = await supabase
      .from("leads")
      .insert({
        first_name: data.firstName,
        last_name: data.lastName || null,
        phone: data.phone,
        email: data.email || null,
        community_id: communityId,
        community_name: data.communitySlug || null,
        vehicle_type: data.vehicleType || null,
        budget_range: data.budgetRange || null,
        trade_in: data.tradeIn || false,
        employment_status: data.employmentStatus || null,
        has_status_card: data.hasStatusCard || false,
        source: (data.source as string) || "website_form",
        landing_page: data.landingPage || null,
        utm_source: data.utmSource || null,
        utm_medium: data.utmMedium || null,
        utm_campaign: data.utmCampaign || null,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Lead insert error:", error);
      return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    }

    // Log the activity
    await supabase.from("lead_activities").insert({
      lead_id: lead.id,
      activity: "form_submitted",
      title: "Application submitted",
      description: `${data.firstName} applied from ${data.landingPage || "homepage"}`,
      metadata: {
        source: data.source,
        community: data.communitySlug,
        vehicleType: data.vehicleType,
      },
    });

    // SMS alerts — fire and forget, don't block the response
    notifyNewLead({
      leadId: lead.id,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      community: data.communitySlug,
      vehicleType: data.vehicleType,
      budgetRange: data.budgetRange,
      hasStatusCard: data.hasStatusCard,
      source: data.source,
    });

    // Auto-reply to the lead — confirms their application instantly
    sendLeadAutoReply({
      firstName: data.firstName,
      phone: data.phone,
    });

    // Check referral code
    if (data.referralCode) {
      await supabase
        .from("referrals")
        .update({ referred_lead_id: lead.id })
        .eq("referral_code", data.referralCode);
    }

    return NextResponse.json({ success: true, leadId: lead.id });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: err.errors },
        { status: 400 }
      );
    }
    console.error("Lead API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
