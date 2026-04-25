# Facebook Ads — Launch Plan

Budget: $20–30/day to start. Scale winners to $50–100/day after 7 days of data.

## Account setup checklist

1. Create Facebook Business Manager → add Ad Account, Page, Pixel
2. Pixel ID → add to Vercel as `NEXT_PUBLIC_FB_PIXEL_ID` (already in `TrackingPixels.tsx`)
3. Verify domain `firstnationautofinancing.ca` in Business Manager
4. Connect WhatsApp Business (optional click-to-chat)
5. Create custom conversion: `Lead` event firing on `/apply` thank-you state (already wired in lead form submit success)

## Audience structure (4 ad sets to start)

### Ad Set 1 — Broad Indigenous interest (cold)
- **Geography:** ON, QC, MB, NB, NS, NL — Canada
- **Age:** 21–60
- **Detailed targeting (Interests):** First Nations in Canada, Indigenous peoples in Canada, Status Card, Powwow, AFN (Assembly of First Nations), APTN, CFWE Radio, Indigenous Tourism, Tribal Council
- **Behaviors:** None (keep broad)
- **Exclusions:** Already converted (custom audience from Pixel `Lead` event)
- **Placement:** Facebook Feed + Instagram Feed only (cut Audience Network — bad lead quality)

### Ad Set 2 — Community-specific lookalike (warm)
- **Source:** 1% lookalike of website visitors past 30 days (build after 100+ visitors)
- **Geography:** Canada
- **Age:** 21–55

### Ad Set 3 — Reserve-area geo (cold)
- **Geography:** Pin-drop targeting around Six Nations, Akwesasne, Tyendinaga, Curve Lake, Wikwemikong, Sagkeeng, Long Plain, Eel Ground, Eskasoni, Membertou, Conne River, Sheshatshiu (radius 25km on each)
- **Detailed targeting:** None (geo does the work)

### Ad Set 4 — Retargeting (warm/hot)
- **Audience:** Website visitors past 30 days who did NOT submit lead
- **Goal:** Drive return + form completion
- **Frequency cap:** 3/week

## Ad creative — 5 variants

### Variant A — "Status Card = Tax-Free" (best hook)

**Primary text:**
> Did you know your Status Card means you pay $0 tax on a new vehicle when it's delivered to your reserve?
>
> That's $5,000–$10,000 you keep. We finance, deliver, and handle every form.
>
> ✅ 98.9% approval — all credit welcome
> ✅ $0 down payment
> ✅ Free delivery to 325+ communities across 6 provinces
> ✅ 1-hour callback, no pressure
>
> Apply in 3 minutes 👇

**Headline:** Save Thousands With Tax-Free Vehicle Delivery
**Description:** Status Card tax exemption. $0 down. All credit welcome.
**CTA:** Apply Now
**Creative:** Photo of a clean truck/SUV with subtle Indigenous-friendly design — no clichéd imagery (no headdresses, no eagle feathers in graphic design). Best: real delivery photo of a vehicle to a community.

### Variant B — "Bad credit OK" (high-intent)

**Primary text:**
> Bad credit? Bankruptcy? Consumer proposal? You can still get approved.
>
> We work with 50+ lenders who specialize in financing for First Nations buyers — including those rebuilding credit. 98.9% of applicants get approved.
>
> No down payment. Free on-reserve delivery. 100% tax savings with your Status Card.
>
> Takes 3 minutes. We call you within 1 hour.

**Headline:** Approved Even With Bad Credit
**CTA:** Apply Now

### Variant C — Specific community (use $5/day micro-budget per community)

Run for top-population communities (Six Nations, Akwesasne, Curve Lake, Tyendinaga, Conne River, Membertou, Eskasoni, Sagkeeng, Long Plain).

**Primary text:**
> [Six Nations] members — get a new vehicle delivered to your community with $0 tax.
>
> Your Status Card means you pay no HST. We deliver right to the reserve, handle every form, and finance with $0 down.
>
> 98.9% approval, even with bad credit. Apply in 3 minutes 👇

**Headline:** [Community] — Tax-Free Vehicle Delivery
**Landing page:** `/community/[slug]` (already built — they get a community-specific page)

### Variant D — Trade-in angle

**Primary text:**
> Trading in your vehicle? We'll factor it into your new financing — no down payment needed.
>
> First Nation Auto Financing delivers tax-free to 325+ communities across 6 provinces. Status Card = $0 sales tax. We work with 50+ lenders so even bad credit gets approved.
>
> Apply in 3 minutes. Specialist calls within 1 hour.

**Headline:** Trade Your Old Vehicle, Drive a New One
**CTA:** Apply Now

### Variant E — Video / carousel (highest engagement)

15-second video showing:
1. (0–3s) Text overlay: "Tax-free vehicle delivery. Real."
2. (3–8s) B-roll of vehicle being driven onto a reserve, family receiving keys
3. (8–13s) Text: "$0 down · 98.9% approval · Free delivery"
4. (13–15s) "Apply in 3 minutes — firstnationautofinancing.ca"

## Daily budget allocation

| Ad Set | Day 1–7 | Day 8–14 |
|---|---|---|
| Broad Indigenous interest | $10/day | Scale winners |
| Geo (reserve pin-drops) | $10/day | $15/day |
| Lookalike | (off — needs data) | $10/day |
| Retargeting | $5/day | $10/day |

**Total Week 1:** ~$25/day = $175 for 7 days
**Target CPL (cost per lead):** under $25 in Week 1, under $15 once optimized

## Compliance / sensitivity guardrails

- No "guaranteed approval" — use "98.9% approval rate" (factual)
- No headdress, eagle feather, or generic stock "Native" imagery
- No "no credit check" claims — we DO run credit (soft pull)
- Land Acknowledgement statement on the landing page (already on /about)
- Don't use Indigenous greetings (Boozhoo, Kwe, etc.) in ad copy unless ad set is targeted to that specific nation — feels performative when broadcast

## Optimization milestones

- **Day 3:** kill any ad set with CPL > $40
- **Day 7:** if CPL < $20, double the budget on the winning ad set
- **Day 14:** build lookalike from website visitors + leads, launch Ad Set 2
- **Day 21:** test new creative against winning variant (A/B)

## Reporting columns to add in Ads Manager

Cost per result · CPL · CPM · CTR (link click) · Frequency · Lead form completion rate
