# Launch Readiness Report

**Date:** 2026-04-25
**Domain:** https://www.firstnationautofinancing.ca
**Status:** 🟡 **READY FOR LAUNCH** with 1 manual blocker (tracking pixel IDs)

---

## ✅ What was tested and passed

### Build & code quality
- ✅ TypeScript: 0 errors (`tsc --noEmit`)
- ✅ Production build: 345 pages, 102 KB shared First Load JS, 86 KB middleware
- ✅ All 326 community pages + 5 blog posts statically generated

### Database
- ✅ Supabase reachable via pooler (`aws-1-ca-central-1.pooler.supabase.com`)
- ✅ All 326 communities seeded across 6 provinces (124 ON, 38 QC, 57 MB, 15 NB, 13 NS, 79 NL)
- ✅ RLS enabled on all tables; SELECT/INSERT/UPDATE/DELETE policies present on `leads`
- ✅ Single source of truth: `src/data/communities.ts` → `supabase/seed.ts`

### Lead form (the critical conversion path)
- ✅ Live API test: POST to `/api/leads` returned `200 + leadId` UUID
- ✅ Database insert verified
- ✅ 9-step form, auto-advance, validation, honeypot, timestamp check, rate limit
- ✅ Email field is required
- ✅ PIPEDA consent checkbox now links to `/privacy`
- ✅ Bot protection: hidden honeypot, 3-second min submit time, 5/hr per IP
- ✅ Input font 16px (no iOS auto-zoom)

### SEO
- ✅ Sitemap.xml: 336 URLs (all 326 communities + 5 blog + statics)
- ✅ robots.txt: blocks /admin, /login, /api; sitemap reference correct
- ✅ Canonicals: every page now correctly canonicalizes to its own www URL (was previously broken — all pages were canonicalizing to homepage)
- ✅ Apex → www redirect is now **308 Permanent** (was 307 Temporary)
- ✅ Per-page meta titles + descriptions, all unique
- ✅ JSON-LD on all page types — 10 schemas across 5 page types pass validation:
  - Organization (FinancialService) site-wide
  - FAQPage on homepage
  - FinancialService + BreadcrumbList on community pages
  - BlogPosting on blog posts
- ✅ Validator script: `node scripts/validate-schema.mjs` (re-run anytime)

### Security
- ✅ Middleware blocks `/admin`, `/admin/*`, `/api/agents/debate`
- ✅ Auth required on `DELETE /api/leads/[id]` and debate API
- ✅ Headers: X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy, HSTS (2 years)
- ✅ No hardcoded secrets in src/
- ✅ Service role key only used server-side; never sent to client
- ✅ Open-redirect protection in /login
- ✅ Zod validation on lead API; phone/email regex; error messages sanitized

### Copy consistency
- ✅ No "Sam" anywhere
- ✅ No "no credit check" / "guaranteed approval" claims
- ✅ Phone 613-302-8872 consistent across 15+ locations
- ✅ "325+ communities across 6 provinces" everywhere
- ✅ "Bank of Nova Scotia" (not "Scotiabank")
- ✅ Domain consistent (www.firstnationautofinancing.ca)
- ✅ No TODO/FIXME/placeholder text in user-facing code

### Performance
- ✅ Static prerendering: 345 of 350+ routes are pre-rendered HTML
- ✅ First Load JS shared = 102 KB (excellent — under 200 KB target)
- ✅ Largest page (admin) = 170 KB First Load
- ✅ Images use `next/image` with optimized variants
- ✅ Fonts via Google Fonts CDN with display=swap

### Accessibility / UX
- ✅ /privacy page added (PIPEDA-compliant)
- ✅ Branded /not-found 404 page
- ✅ Form inputs ≥16px (no iOS zoom)
- ✅ Phone numbers are tel: links
- ✅ Form has consent checkbox with link

---

## ❌ Blockers — must fix before paid traffic

### 1. **Tracking pixel IDs not configured** (BLOCKER for ads)
Tracking is wired in code but the env vars are empty in Vercel — pixels don't fire. Without these, you cannot:
- Measure ad conversion
- Build retargeting audiences
- Optimize Facebook campaigns by Pixel events

**Fix (manual, ~10 minutes):**
1. Create Facebook Business Manager → Events Manager → create Pixel → copy ID
2. Create Google Ads account → Tools → Conversions → create "Lead" conversion → copy `AW-XXX` ID and label
3. In Vercel project → Settings → Environment Variables, add:
   - `NEXT_PUBLIC_FB_PIXEL_ID` = your pixel ID
   - `NEXT_PUBLIC_GOOGLE_ADS_ID` = `AW-XXXXXXXXX`
   - `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL` = `AW-XXXXXXXXX/XXXXX`
4. Redeploy (or trigger via empty commit)

### 2. **Manual launch tasks** (not blockers — but needed for ad campaigns to work)
- [ ] Create Facebook Business Page (separate from ad account)
- [ ] Submit `https://www.firstnationautofinancing.ca/sitemap.xml` to Google Search Console
- [ ] Get toll-free number (optional but increases trust)
- [ ] Set up `info@firstnationautofinancing.ca` (Google Workspace or Resend for receiving)
- [ ] Create Google Business Profile (for local SEO)

---

## 🟡 Non-blocking improvements (post-launch)

### Tech debt
- Form accessibility could be improved: explicit `<label htmlFor>`, `aria-describedby` on errors. Won't break for sighted users.
- Rate limiter is in-memory only; resets on Vercel cold start. Fine for low volume; switch to Vercel KV/Upstash if abuse appears.
- Add CSP header in `next.config.ts` for defense-in-depth.
- Consider `aggregateRating` in JSON-LD once you have real Google Business Profile reviews (was removed because it claimed 127 reviews when only 3 testimonials are visible).

### Conversion optimization
- Hero form step 1 asks for 4 fields (name, last, phone, email). For paid ad traffic, dropping last name may lift completion ~5%.
- Add live phone-call tracking (CallRail or similar) so you know which campaigns drove inbound calls vs. form fills.

### SEO
- Submit sitemap to Bing Webmaster Tools too (5% of search market)
- Build backlinks from band council websites, Indigenous Tourism Canada, AFN
- Consider adding `/community/[slug]/tax-savings` sub-pages for ultra-long-tail SEO

---

## What I changed in this audit (commits)

| Commit | Summary |
|---|---|
| `aaa8b56` | Seeded 326 communities to Supabase + added structured data (FinancialService, FAQPage, BlogPosting, BreadcrumbList) |
| `cdf6855` | Facebook & Google Ads playbooks in `docs/` |
| `ee5b4fa` | Removed phantom `aggregateRating` (Google policy violation); added live schema validator |
| `44c78ee` | Fixed canonical URL inheritance bug (was canonicalizing every page to homepage); www domain everywhere; copy fixes |
| `0d8e014` | Added /privacy page (PIPEDA), /not-found 404 page, fixed iOS form zoom (text-sm → text-base) |
| `0fc6e85` | Added .claude/ to gitignore |

---

## Go/no-go

**Site itself:** ✅ Ready
**SEO foundation:** ✅ Strong (326 community pages all canonical, all schema-tagged)
**Lead capture:** ✅ Working end-to-end
**Tracking for paid ads:** ❌ Needs the 3 env vars set in Vercel

**Recommended order to launch:**
1. Set the 3 tracking env vars in Vercel (10 min)
2. Submit sitemap to Google Search Console (5 min)
3. Soft launch: start Google Ads campaign at $20/day on the high-intent search terms in `docs/google-ads.md` — test for 3-5 days
4. After Google Ads is producing leads, layer in Facebook campaigns from `docs/facebook-ads.md`
5. Once 100+ pixel events are recorded, build lookalike audiences

**Estimated time to revenue:** 7–14 days after launching paid ads.
