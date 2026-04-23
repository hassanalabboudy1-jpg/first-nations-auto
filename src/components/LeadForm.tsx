"use client";

import { useState, useMemo } from "react";
import { ALL_COMMUNITIES } from "@/data/communities";
import { trackLeadConversion } from "@/lib/tracking";

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | "success";
const TOTAL_STEPS = 9;

const PROVINCES = [
  { value: "ON", label: "Ontario" },
  { value: "QC", label: "Quebec" },
  { value: "MB", label: "Manitoba" },
  { value: "NB", label: "New Brunswick" },
  { value: "NS", label: "Nova Scotia" },
  { value: "NL", label: "Newfoundland & Labrador" },
] as const;

export function LeadForm({ preselectedCommunity }: { preselectedCommunity?: string }) {
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [communitySearch, setCommunitySearch] = useState("");
  const [showCommunityDropdown, setShowCommunityDropdown] = useState(false);
  const [formLoadedAt] = useState(Date.now());

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    vehicleType: "",
    vehicleCondition: "",
    budgetRange: "",
    currentVehicle: "",
    employmentStatus: "",
    jobTitle: "",
    employmentDuration: "",
    monthlyIncome: "",
    streetAddress: "",
    city: "",
    province: "",
    postalCode: "",
    housingStatus: "",
    communitySlug: preselectedCommunity || "",
    dobMonth: "",
    dobDay: "",
    dobYear: "",
    hasStatusCard: false,
    website: "", // honeypot
  });

  const update = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const selectAndAdvance = (field: string, value: string, nextStep: Step) => {
    update(field, value);
    setTimeout(() => setStep(nextStep), 200);
  };

  const filteredCommunities = useMemo(() => {
    let list = ALL_COMMUNITIES;
    if (formData.province) {
      list = list.filter((c) => c.province === formData.province);
    }
    if (communitySearch.length >= 2) {
      const q = communitySearch.toLowerCase();
      list = list.filter((c) => c.name.toLowerCase().includes(q));
    }
    return list.slice(0, 20);
  }, [formData.province, communitySearch]);

  const selectedCommunityName = useMemo(() => {
    if (!formData.communitySlug) return "";
    if (formData.communitySlug === "other") return "Other / Not Listed";
    const c = ALL_COMMUNITIES.find((c) => c.slug === formData.communitySlug);
    return c?.name || "";
  }, [formData.communitySlug]);

  async function handleSubmit() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          _t: Date.now() - formLoadedAt,
          source: "website_form",
          landingPage: window.location.pathname,
          utmSource: new URLSearchParams(window.location.search).get("utm_source"),
          utmMedium: new URLSearchParams(window.location.search).get("utm_medium"),
          utmCampaign: new URLSearchParams(window.location.search).get("utm_campaign"),
        }),
      });

      if (res.ok) {
        trackLeadConversion({
          community: formData.communitySlug,
          vehicleType: formData.vehicleType,
        });
        setStep("success");
      } else {
        setError("Something went wrong. Please try again or call us at 613-302-8872.");
      }
    } catch {
      setError("Connection error. Please try again or call us at 613-302-8872.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full bg-white border border-earth-border rounded-xl px-4 py-3.5 text-sm text-earth-text focus:border-earth-forest focus:ring-1 focus:ring-earth-forest/20 focus:outline-none transition placeholder:text-earth-muted/60";

  const optionBtnClass = (selected: boolean) =>
    `w-full flex items-center gap-3 p-4 rounded-xl border text-left transition ${
      selected
        ? "border-earth-forest bg-earth-forest/5 ring-1 ring-earth-forest/20"
        : "border-earth-border hover:border-earth-sage"
    }`;

  const currentStep = typeof step === "number" ? step : TOTAL_STEPS;

  // Generate year options (18-80 years old)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 63 }, (_, i) => currentYear - 18 - i);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // ── SUCCESS ──
  if (step === "success") {
    return (
      <div className="bg-earth-dark rounded-2xl p-8 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-2xl font-bold text-white mb-3">Application Received!</h3>
        <p className="text-white/80 mb-6 leading-relaxed">
          A financial specialist will call you within{" "}
          <strong className="text-earth-gold">1 hour</strong> to discuss your options.
          No obligation.
        </p>
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-left space-y-3 mb-6">
          <p className="text-xs text-earth-gold font-bold uppercase tracking-wider">What happens next:</p>
          <div className="flex gap-3 items-start">
            <span className="text-earth-gold text-sm mt-0.5">1.</span>
            <p className="text-sm text-white/70">We review your application and match you with the best lender for your situation</p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-earth-gold text-sm mt-0.5">2.</span>
            <p className="text-sm text-white/70">A specialist calls you to confirm details and discuss vehicle options</p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="text-earth-gold text-sm mt-0.5">3.</span>
            <p className="text-sm text-white/70">Once approved, your vehicle is delivered tax-free to your community</p>
          </div>
        </div>
        <p className="text-xs text-white/40">
          Questions? Call us anytime at{" "}
          <a href="tel:+16133028872" className="text-earth-gold hover:underline">613-302-8872</a>
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-earth-border rounded-2xl p-6 md:p-8 shadow-sm">
      {/* Honeypot */}
      <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" value={formData.website} onChange={(e) => update("website", e.target.value)} />
      </div>

      {/* Progress */}
      <div className="mb-2">
        <div className="flex gap-1">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i < currentStep ? "bg-earth-forest" : "bg-earth-border"
              }`}
            />
          ))}
        </div>
        <p className="text-[11px] text-earth-muted text-center mt-2">
          Step {currentStep} of {TOTAL_STEPS}
        </p>
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">
          {error}
        </p>
      )}

      {/* ── STEP 1: Contact Info ── */}
      {step === 1 && (
        <div className="space-y-4">
          <h3 className="font-bold text-earth-dark text-lg text-center mb-1">
            Let&apos;s get started
          </h3>
          <p className="text-xs text-earth-muted text-center mb-4">So our specialist can call you within 1 hour.</p>

          <div className="grid grid-cols-2 gap-3">
            <input type="text" placeholder="First Name *" value={formData.firstName} onChange={(e) => update("firstName", e.target.value)} className={inputClass} autoComplete="given-name" />
            <input type="text" placeholder="Last Name *" value={formData.lastName} onChange={(e) => update("lastName", e.target.value)} className={inputClass} autoComplete="family-name" />
          </div>
          <input type="tel" placeholder="Phone Number *" value={formData.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} autoComplete="tel" />
          <input type="email" placeholder="Email *" value={formData.email} onChange={(e) => update("email", e.target.value)} className={inputClass} autoComplete="email" />

          <button
            onClick={() => {
              if (!formData.firstName || !formData.lastName || !formData.phone || !formData.email) {
                setError("Please fill in all fields to continue.");
                return;
              }
              setStep(2);
            }}
            disabled={!formData.firstName || !formData.lastName || !formData.phone || !formData.email}
            className="w-full bg-earth-red hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold uppercase tracking-wide transition"
          >
            Get Started →
          </button>

          <div className="flex items-center justify-center gap-4 text-[10px] text-earth-muted">
            <span>🔒 100% Secure</span>
            <span>📞 1-hour callback</span>
            <span>✅ 98.9% approval</span>
          </div>
        </div>
      )}

      {/* ── STEP 2: Vehicle Type ── */}
      {step === 2 && (
        <div className="space-y-3">
          <h3 className="font-bold text-earth-dark text-lg text-center mb-1">
            What type of vehicle are you looking for?
          </h3>
          <p className="text-xs text-earth-muted text-center mb-4">Pick the one that fits your lifestyle.</p>
          {[
            { value: "truck", emoji: "🛻", label: "Truck" },
            { value: "suv", emoji: "🚙", label: "SUV / Minivan" },
            { value: "car", emoji: "🚗", label: "Car" },
            { value: "not_sure", emoji: "🤔", label: "Not Sure Yet" },
          ].map((type) => (
            <button
              key={type.value}
              onClick={() => selectAndAdvance("vehicleType", type.value, 3)}
              className={optionBtnClass(formData.vehicleType === type.value)}
            >
              <span className="text-2xl">{type.emoji}</span>
              <span className={`text-sm font-semibold ${formData.vehicleType === type.value ? "text-earth-forest" : "text-earth-text"}`}>
                {type.label}
              </span>
            </button>
          ))}
          <button onClick={() => setStep(1)} className="w-full text-sm text-earth-muted hover:text-earth-dark transition pt-2">← Back</button>
        </div>
      )}

      {/* ── STEP 3: Monthly Budget ── */}
      {step === 3 && (
        <div className="space-y-3">
          <h3 className="font-bold text-earth-dark text-lg text-center mb-1">
            What&apos;s your monthly budget?
          </h3>
          <p className="text-xs text-earth-muted text-center mb-4">We&apos;ll find options that fit.</p>
          {[
            { value: "under_300", label: "Under $300/month" },
            { value: "300_500", label: "$300 – $500/month" },
            { value: "500_700", label: "$500 – $700/month" },
            { value: "over_700", label: "$700+/month" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => selectAndAdvance("budgetRange", opt.value, 4)}
              className={optionBtnClass(formData.budgetRange === opt.value)}
            >
              <span className={`text-sm font-semibold ${formData.budgetRange === opt.value ? "text-earth-forest" : "text-earth-text"}`}>
                {opt.label}
              </span>
            </button>
          ))}
          <button onClick={() => setStep(2)} className="w-full text-sm text-earth-muted hover:text-earth-dark transition pt-2">← Back</button>
        </div>
      )}

      {/* ── STEP 4: Trade-In ── */}
      {step === 4 && (
        <div className="space-y-3">
          <h3 className="font-bold text-earth-dark text-lg text-center mb-1">
            Do you have a vehicle to trade in?
          </h3>
          <p className="text-xs text-earth-muted text-center mb-4">A trade-in can lower your monthly payment.</p>
          {[
            { value: "no", emoji: "❌", label: "No vehicle to trade" },
            { value: "keeping", emoji: "✅", label: "Yes, but keeping it" },
            { value: "trading", emoji: "🔄", label: "Yes, trading it in" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => selectAndAdvance("currentVehicle", opt.value, 5)}
              className={optionBtnClass(formData.currentVehicle === opt.value)}
            >
              <span className="text-2xl">{opt.emoji}</span>
              <span className={`text-sm font-semibold ${formData.currentVehicle === opt.value ? "text-earth-forest" : "text-earth-text"}`}>
                {opt.label}
              </span>
            </button>
          ))}
          <button onClick={() => setStep(3)} className="w-full text-sm text-earth-muted hover:text-earth-dark transition pt-2">← Back</button>
        </div>
      )}

      {/* ── STEP 5: Employment Status ── */}
      {step === 5 && (
        <div className="space-y-3">
          <h3 className="font-bold text-earth-dark text-lg text-center mb-1">
            What&apos;s your employment status?
          </h3>
          {[
            { value: "employed", emoji: "💼", label: "Full-Time" },
            { value: "part_time", emoji: "🕐", label: "Part-Time" },
            { value: "self_employed", emoji: "🏢", label: "Self-Employed" },
            { value: "seasonal", emoji: "🌿", label: "Seasonal" },
            { value: "band_council", emoji: "🏛️", label: "Band / Council" },
            { value: "pension", emoji: "🎖️", label: "Pension / Disability" },
            { value: "income_assistance", emoji: "🤝", label: "Income Assistance" },
            { value: "other", emoji: "📋", label: "Other" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => selectAndAdvance("employmentStatus", opt.value, 6)}
              className={optionBtnClass(formData.employmentStatus === opt.value)}
            >
              <span className="text-xl">{opt.emoji}</span>
              <span className={`text-sm font-semibold ${formData.employmentStatus === opt.value ? "text-earth-forest" : "text-earth-text"}`}>
                {opt.label}
              </span>
            </button>
          ))}
          <button onClick={() => setStep(4)} className="w-full text-sm text-earth-muted hover:text-earth-dark transition pt-2">← Back</button>
        </div>
      )}

      {/* ── STEP 6: Job Details ── */}
      {step === 6 && (
        <div className="space-y-4">
          <h3 className="font-bold text-earth-dark text-lg text-center mb-1">
            Tell us about your job
          </h3>
          <p className="text-xs text-earth-muted text-center mb-4">Helps lenders find your best rate.</p>

          <input type="text" placeholder="Job Title" value={formData.jobTitle} onChange={(e) => update("jobTitle", e.target.value)} className={inputClass} />

          <select
            value={formData.employmentDuration}
            onChange={(e) => update("employmentDuration", e.target.value)}
            className={inputClass + " text-earth-muted"}
          >
            <option value="">How long have you been there?</option>
            <option value="less_3_months">Less than 3 months</option>
            <option value="3_months_1_year">3 months – 1 year</option>
            <option value="1_3_years">1 – 3 years</option>
            <option value="3_plus_years">3+ years</option>
          </select>

          <div className="flex gap-3 pt-2">
            <button onClick={() => setStep(5)} className="flex-1 border border-earth-border text-earth-muted py-3.5 rounded-xl font-semibold hover:border-earth-sage transition">← Back</button>
            <button
              onClick={() => setStep(7)}
              className="flex-1 bg-earth-red hover:bg-red-700 text-white py-3.5 rounded-xl font-bold uppercase tracking-wide transition"
            >
              Continue →
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 7: Monthly Income ── */}
      {step === 7 && (
        <div className="space-y-3">
          <h3 className="font-bold text-earth-dark text-lg text-center mb-1">
            What&apos;s your monthly take-home income?
          </h3>
          <p className="text-xs text-earth-muted text-center mb-4">After taxes. This stays confidential.</p>
          {[
            { value: "under_1500", label: "Under $1,500" },
            { value: "1500_2500", label: "$1,500 – $2,500" },
            { value: "2500_3500", label: "$2,500 – $3,500" },
            { value: "3500_5000", label: "$3,500 – $5,000" },
            { value: "over_5000", label: "$5,000+" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => selectAndAdvance("monthlyIncome", opt.value, 8)}
              className={optionBtnClass(formData.monthlyIncome === opt.value)}
            >
              <span className={`text-sm font-semibold ${formData.monthlyIncome === opt.value ? "text-earth-forest" : "text-earth-text"}`}>
                {opt.label}
              </span>
            </button>
          ))}
          <button onClick={() => setStep(6)} className="w-full text-sm text-earth-muted hover:text-earth-dark transition pt-2">← Back</button>
        </div>
      )}

      {/* ── STEP 8: Address + Community ── */}
      {step === 8 && (
        <div className="space-y-4">
          <h3 className="font-bold text-earth-dark text-lg text-center mb-1">
            Where do you live?
          </h3>
          <p className="text-xs text-earth-muted text-center mb-4">For delivery and lender matching.</p>

          <input type="text" placeholder="Street Address" value={formData.streetAddress} onChange={(e) => update("streetAddress", e.target.value)} className={inputClass} autoComplete="street-address" />

          <div className="grid grid-cols-2 gap-3">
            <input type="text" placeholder="City" value={formData.city} onChange={(e) => update("city", e.target.value)} className={inputClass} autoComplete="address-level2" />
            <select value={formData.province} onChange={(e) => { update("province", e.target.value); update("communitySlug", ""); setCommunitySearch(""); }} className={inputClass + " text-earth-muted"}>
              <option value="">Province</option>
              {PROVINCES.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>

          <input type="text" placeholder="Postal Code" value={formData.postalCode} onChange={(e) => update("postalCode", e.target.value.toUpperCase())} className={inputClass} autoComplete="postal-code" maxLength={7} />

          {/* Housing Status */}
          <div>
            <p className="text-xs text-earth-muted mb-2 font-medium">Housing situation</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: "own", label: "Own" },
                { value: "rent", label: "Rent" },
                { value: "other", label: "Other" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => update("housingStatus", opt.value)}
                  className={`py-2.5 rounded-xl border text-xs font-semibold transition ${
                    formData.housingStatus === opt.value
                      ? "border-earth-forest bg-earth-forest/5 text-earth-forest"
                      : "border-earth-border text-earth-muted hover:border-earth-sage"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Reserve / Community */}
          {formData.province && (
            <div className="relative">
              <p className="text-xs text-earth-muted mb-2 font-medium">Reserve / Community (optional)</p>
              <input
                type="text"
                placeholder="Search your community..."
                value={formData.communitySlug === "other" ? "Other / Not Listed" : communitySearch || selectedCommunityName}
                onChange={(e) => {
                  setCommunitySearch(e.target.value);
                  setShowCommunityDropdown(true);
                  if (formData.communitySlug) update("communitySlug", "");
                }}
                onFocus={() => { if (!formData.communitySlug) setShowCommunityDropdown(true); }}
                className={inputClass}
              />
              {showCommunityDropdown && !formData.communitySlug && (
                <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-earth-border rounded-xl shadow-lg max-h-48 overflow-y-auto">
                  {filteredCommunities.map((c) => (
                    <button key={c.slug} onClick={() => { update("communitySlug", c.slug); setCommunitySearch(""); setShowCommunityDropdown(false); }} className="w-full text-left px-4 py-2.5 text-sm text-earth-text hover:bg-earth-cream transition border-b border-earth-border/30 last:border-0">
                      {c.name}
                    </button>
                  ))}
                  <button onClick={() => { update("communitySlug", "other"); setCommunitySearch(""); setShowCommunityDropdown(false); }} className="w-full text-left px-4 py-2.5 text-sm text-earth-muted hover:bg-earth-cream transition">
                    Other / Not Listed
                  </button>
                </div>
              )}
              {formData.communitySlug && formData.communitySlug !== "other" && (
                <button onClick={() => { update("communitySlug", ""); setCommunitySearch(""); }} className="absolute right-3 top-[calc(50%+10px)] -translate-y-1/2 text-earth-muted hover:text-earth-text text-sm">✕</button>
              )}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button onClick={() => setStep(7)} className="flex-1 border border-earth-border text-earth-muted py-3.5 rounded-xl font-semibold hover:border-earth-sage transition">← Back</button>
            <button
              onClick={() => {
                if (!formData.province) { setError("Please select your province."); return; }
                setStep(9);
              }}
              className="flex-1 bg-earth-red hover:bg-red-700 text-white py-3.5 rounded-xl font-bold uppercase tracking-wide transition"
            >
              Continue →
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 9: DOB + Status Card + Submit ── */}
      {step === 9 && (
        <div className="space-y-4">
          <h3 className="font-bold text-earth-dark text-lg text-center mb-1">
            Almost done — just a few more details
          </h3>

          {/* Date of Birth */}
          <div>
            <p className="text-xs text-earth-muted mb-2 font-medium">Date of Birth</p>
            <div className="grid grid-cols-3 gap-2">
              <select value={formData.dobMonth} onChange={(e) => update("dobMonth", e.target.value)} className={inputClass + " text-earth-muted text-xs"}>
                <option value="">Month</option>
                {months.map((m, i) => (
                  <option key={m} value={String(i + 1).padStart(2, "0")}>{m}</option>
                ))}
              </select>
              <select value={formData.dobDay} onChange={(e) => update("dobDay", e.target.value)} className={inputClass + " text-earth-muted text-xs"}>
                <option value="">Day</option>
                {days.map((d) => (
                  <option key={d} value={String(d).padStart(2, "0")}>{d}</option>
                ))}
              </select>
              <select value={formData.dobYear} onChange={(e) => update("dobYear", e.target.value)} className={inputClass + " text-earth-muted text-xs"}>
                <option value="">Year</option>
                {years.map((y) => (
                  <option key={y} value={String(y)}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Status Card */}
          <div>
            <p className="text-xs text-earth-muted mb-2 font-medium">Do you have a First Nations Status Card?</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => update("hasStatusCard", true)}
                className={`p-3.5 rounded-xl border text-center text-sm font-semibold transition ${
                  formData.hasStatusCard
                    ? "border-earth-forest bg-earth-forest/5 text-earth-forest"
                    : "border-earth-border text-earth-muted hover:border-earth-sage"
                }`}
              >
                ✅ Yes
              </button>
              <button
                onClick={() => update("hasStatusCard", false)}
                className={`p-3.5 rounded-xl border text-center text-sm font-semibold transition ${
                  !formData.hasStatusCard
                    ? "border-earth-forest bg-earth-forest/5 text-earth-forest"
                    : "border-earth-border text-earth-muted hover:border-earth-sage"
                }`}
              >
                No
              </button>
            </div>
            {formData.hasStatusCard && (
              <p className="text-xs text-earth-forest mt-2 bg-earth-forest/5 rounded-lg px-3 py-2">
                🪶 You may qualify for 100% tax savings on your vehicle purchase.
              </p>
            )}
          </div>

          {/* Consent */}
          <label className="flex items-start gap-3 p-3 bg-earth-cream/50 border border-earth-border rounded-xl cursor-pointer">
            <input type="checkbox" id="consent" className="w-4 h-4 accent-earth-forest mt-0.5 flex-shrink-0" />
            <p className="text-xs text-earth-muted leading-relaxed">
              I consent to First Nation Auto Financing collecting my information and
              sharing it with dealer and lender partners to process my vehicle financing
              application. I agree to be contacted by phone, SMS, or email. I can withdraw
              consent at any time. Protected under{" "}
              <span className="underline">PIPEDA</span>.
            </p>
          </label>

          <div className="flex gap-3">
            <button onClick={() => setStep(8)} className="flex-1 border border-earth-border text-earth-muted py-3.5 rounded-xl font-semibold hover:border-earth-sage transition">← Back</button>
            <button
              onClick={() => {
                const consent = (document.getElementById("consent") as HTMLInputElement)?.checked;
                if (!consent) { setError("Please check the consent box to continue."); return; }
                if (!formData.dobMonth || !formData.dobDay || !formData.dobYear) { setError("Please enter your date of birth."); return; }
                handleSubmit();
              }}
              disabled={loading}
              className="flex-1 bg-earth-red hover:bg-red-700 disabled:opacity-50 text-white py-3.5 rounded-xl font-bold text-lg uppercase tracking-wide transition"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </div>

          <div className="flex items-center justify-center gap-4 text-[10px] text-earth-muted pt-1">
            <span>🔒 100% Secure</span>
            <span>📞 1-hour callback</span>
            <span>✅ 98.9% approval</span>
          </div>
        </div>
      )}
    </div>
  );
}
