# Google Ads — Launch Plan

Budget: $20–30/day to start. Bias toward Search (high-intent) over Performance Max for Week 1–2.

## Account setup checklist

1. Create Google Ads account at ads.google.com
2. Conversion: import `Lead` event from Google Tag Manager OR set up directly
   - Lead form submit success page fires conversion (already wired via `NEXT_PUBLIC_GOOGLE_ADS_ID` + `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL`)
3. Link Search Console (after sitemap is submitted)
4. Link Google Analytics 4 (optional but recommended)
5. Add negative keyword list (see below) at account level

## Campaign structure

### Campaign 1 — Search: High-intent terms ($15/day)

**Keywords (Phrase Match — broad enough to catch variants):**

| Keyword | Why |
|---|---|
| "first nations car financing" | direct competitor query — high intent |
| "first nation auto loan" | direct intent |
| "indigenous auto financing" | broader |
| "status card car tax exemption" | research-mode, high quality |
| "tax free car delivery reserve" | exact use case |
| "first nations bad credit auto loan" | conversion-ready |
| "auto loan reserve" | low-volume but cheap |
| "section 87 vehicle exemption" | educated buyer |
| "car loan with status card" | high intent |
| "indigenous bad credit car loan" | high intent |

**Match types:** Phrase + Exact. Avoid Broad Match for Week 1 — wastes budget.

**Negative keywords (account-wide):**
```
free
cheapest
$1
sample
template
job
career
employment
vacancy
hiring
salary
wikipedia
definition
meaning
history
treaty
land claim
casino
cannabis
weed
gas station
```

**Geo targeting:** Canada → exclude territories with no road access (Nunavut). Include all 10 provinces (some non-First-Nations searchers in QC/AB still convert if they have a Status Card).

**Schedule:** 7am–11pm local time, all days

### Campaign 2 — Search: Community-name long-tail ($5/day, expand to $10 after 14 days)

For each top-population community, one ad group with these keywords:
- `[community] auto financing`
- `[community] car loan`
- `car delivery [community]`

Top 10 communities to start:
1. Six Nations of the Grand River
2. Akwesasne
3. Tyendinaga Mohawk
4. Curve Lake
5. Wikwemikong
6. Sagkeeng
7. Long Plain
8. Eskasoni
9. Membertou
10. Miawpukek (Conne River)

**Landing page:** the matching `/community/[slug]` page (already SEO-optimized, has FinancialService schema)

### Campaign 3 — Performance Max ($10/day, after Day 14)

Wait until you have 30+ conversions in the account before turning this on — Pmax needs data to optimize. Feed it:
- All landing pages
- 5 image variants
- 5 video variants
- Lead conversion goal

## Responsive Search Ad — Headlines (use 12+ for variety)

### Headlines (max 30 chars each)
1. First Nations Auto Financing
2. $0 Down. Tax-Free Delivery
3. 98.9% Approval Rate
4. Bad Credit? Approved Anyway
5. Free On-Reserve Delivery
6. Status Card = $0 Sales Tax
7. Save $5,000-$10,000 in Tax
8. Apply in 3 Minutes
9. 1-Hour Callback Guaranteed
10. 50+ Lenders, 1 Application
11. Trucks · SUVs · Cars
12. Serving 325+ Communities
13. Tax-Free Vehicle Delivery
14. Indigenous-Owned Network
15. No Credit? No Problem

### Descriptions (max 90 chars each)
1. Get pre-approved in 3 minutes. $0 down, all credit welcome. Free on-reserve delivery.
2. Use your Status Card for 100% tax savings. Save $5,000+ on your next vehicle.
3. Bad credit, bankruptcy, consumer proposal — we have lenders for every situation.
4. Free delivery to 325+ First Nations communities across 6 provinces. Apply now.
5. 98.9% approval rate. 50+ lenders. We call you within 1 hour. No obligation.

### Site link extensions
- Apply Now → `/apply`
- Payment Calculator → `/#calculator`
- How It Works → `/#how-it-works`
- Communities We Serve → `/#communities`
- About Us → `/about`
- Blog · Tax Savings Guide → `/blog`

### Callout extensions
✓ 98.9% Approval · ✓ $0 Down · ✓ Free Delivery · ✓ Tax-Free with Status Card · ✓ All Credit Welcome · ✓ 1-Hour Callback · ✓ 50+ Lenders · ✓ No Hidden Fees

### Call extension
613-302-8872 (only show during business hours)

### Structured snippet
- Service catalog: Auto Financing, On-Reserve Delivery, Bad Credit Loans, Trade-In Valuation, Status Card Tax Exemption

## Bidding

- **Week 1:** Manual CPC, max $1.50 — cap costs while learning
- **Week 2:** Switch to Maximize Conversions (no target — let it learn)
- **Week 3+:** Target CPA = $25 once you have 30+ conversions

## Daily monitoring

1. Search terms report — add irrelevant queries as negatives daily
2. Quality Score — anything < 6 needs ad copy or landing page tweaks
3. Conversion path — verify the conversion is firing (check Conversions tab)
4. Geo report — kill regions with high spend / zero conversions

## Quality Score boosters (already done on landing page)
- ✅ Mobile-fast load (Next.js static)
- ✅ Match keywords in H1 + meta title
- ✅ Phone number in HTML
- ✅ Visible privacy policy / consent
- ✅ HTTPS
- ✅ Fast time-to-interactive
- ✅ Schema.org markup (just added)

## Estimated metrics (industry benchmarks for auto finance niche)

| Metric | Conservative | Realistic | Optimistic |
|---|---|---|---|
| CPC | $2.50 | $1.50 | $0.80 |
| CTR | 4% | 7% | 12% |
| Landing page CVR | 8% | 15% | 25% |
| CPL | $35 | $18 | $7 |

The niche is *not* yet saturated for "first nations auto financing" specifically — most competitors don't bid on the long-tail community-name terms. That's the cheap-traffic opportunity.

## Watch out for

- **Trademark restrictions:** Don't use bank names (CIBC, RBC, TD, etc.) in ad copy — Google will disapprove unless you're an authorized partner
- **Sensitive category limits:** Auto loans are a "limited" category — Google may restrict certain personalization. You'll see a notice in the campaign.
- **Phone number changes:** Make sure 613-302-8872 stays consistent everywhere (NAP for local SEO)
