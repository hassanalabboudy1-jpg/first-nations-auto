"use client";

import { useState, useMemo } from "react";
import { ALL_COMMUNITIES } from "@/data/communities";
import { trackLeadConversion } from "@/lib/tracking";

type FormStep = "vehicle" | "contact" | "financial" | "success";

const PROVINCES = [
  { value: "ON", label: "Ontario" },
  { value: "QC", label: "Quebec" },
  { value: "MB", label: "Manitoba" },
  { value: "NB", label: "New Brunswick" },
  { value: "NS", label: "Nova Scotia" },
] as const;

export function LeadForm({ preselectedCommunity }: { preselectedCommunity?: string }) {
  const [step, setStep] = useState<FormStep>("vehicle");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [communitySearch, setCommunitySearch] = useState("");
  const [showCommunityDropdown, setShowCommunityDropdown] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    province: "",
    communitySlug: preselectedCommunity || "",
    vehicleType: "",
    vehicleCondition: "",
    budgetRange: "",
    tradeIn: false,
    employmentStatus: "",
    monthlyIncome: "",
    creditRange: "",
    hasStatusCard: false,
    website: "", // honeypot
  });

  const [formLoadedAt] = useState(Date.now());

  const update = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  // Filter communities by selected province, then by search text
  const filteredCommunities = useMemo(() => {
    let list = ALL_COMMUNITIES;
    if (formData.province) {
      list = list.filter((c) => c.province === formData.province);
    }
    if (communitySearch.length >= 2) {
      const q = communitySearch.toLowerCase();
      list = list.filter((c) => c.name.toLowerCase().includes(q));
    }
    return list.slice(0, 20); // Show max 20 for performance
  }, [formData.province, communitySearch]);

  // Get display name for selected community
  const selectedCommunityName = useMemo(() => {
    if (!formData.communitySlug) return "";
    if (formData.communitySlug === "other") return "Other / Not Listed";
    const c = ALL_COMMUNITIES.find((c) => c.slug === formData.communitySlug);
    return c?.name || "";
  }, [formData.communitySlug]);

  async function handleSubmit() {
    if (!consentChecked) {
      setError("Please check the consent box to continue.");
      return;
    }
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

  const steps: FormStep[] = ["vehicle", "contact", "financial"];
  const stepIndex = steps.indexOf(step);

  // ── SUCCESS ──
  if (step === "success") {
    return (
      <div className="bg-earth-dark rounded-2xl p-8 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-2xl font-bold text-white mb-3">
          Application Received!
        </h3>
        <p className="text-white/80 mb-6 leading-relaxed">
          A financial specialist will call you within <strong className="text-earth-gold">1 hour</strong> to discuss
          your options. No obligation.
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
      {/* Progress bar */}
      <div className="flex gap-2 mb-2">
        {steps.map((s, i) => (
          <div
            key={s}
            className={`h-2 flex-1 rounded-full transition-colors ${
              i <= stepIndex ? "bg-earth-forest" : "bg-earth-border"
            }`}
          />
        ))}
      </div>
      <p className="text-[11px] text-earth-muted text-center mb-5">
        Step {stepIndex + 1} of 3 — {stepIndex === 0 ? "Vehicle" : stepIndex === 1 ? "Your Info" : "Final Details"}
      </p>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">
          {error}
        </p>
      )}

      {/* Honeypot — hidden from real users, bots fill it */}
      <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      {/* Trust signals */}
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mb-6 text-[11px] text-earth-muted">
        <span>🔒 100% Secure</span>
        <span>🏠 On-reserve delivery</span>
        <span>📞 1-hour callback</span>
        <span>⏱️ Takes 3 minutes</span>
      </div>

      {/* ── STEP 1: VEHICLE (aspirational, low friction) ── */}
      {step === "vehicle" && (
        <div className="space-y-4">
          <h3 className="font-bold text-earth-forest text-sm tracking-wider uppercase mb-1">
            What vehicle are you looking for?
          </h3>
          <p className="text-xs text-earth-muted mb-3">Pick the type that fits your life.</p>

          <div className="grid grid-cols-2 gap-3">
            {[
              { value: "truck", emoji: "🛻", label: "Truck" },
              { value: "suv", emoji: "🚙", label: "SUV / Minivan" },
              { value: "car", emoji: "🚗", label: "Car" },
              { value: "not_sure", emoji: "🤔", label: "Not Sure Yet" },
            ].map((type) => (
              <button
                key={type.value}
                onClick={() => update("vehicleType", type.value)}
                className={`p-4 rounded-xl border text-center transition ${
                  formData.vehicleType === type.value
                    ? "border-earth-forest bg-earth-forest/5 text-earth-forest ring-1 ring-earth-forest/20"
                    : "border-earth-border hover:border-earth-sage text-earth-muted"
                }`}
              >
                <div className="text-2xl mb-1">{type.emoji}</div>
                <div className="text-xs font-semibold">{type.label}</div>
              </button>
            ))}
          </div>

          {/* New or Used */}
          <div>
            <p className="text-xs text-earth-muted mb-2 font-medium">New or pre-owned?</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: "new", label: "New" },
                { value: "used", label: "Pre-Owned" },
                { value: "either", label: "Either" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => update("vehicleCondition", opt.value)}
                  className={`py-2.5 rounded-xl border text-xs font-semibold transition ${
                    formData.vehicleCondition === opt.value
                      ? "border-earth-forest bg-earth-forest/5 text-earth-forest"
                      : "border-earth-border text-earth-muted hover:border-earth-sage"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Budget */}
          <select
            value={formData.budgetRange}
            onChange={(e) => update("budgetRange", e.target.value)}
            className={inputClass + " text-earth-muted"}
          >
            <option value="">Monthly Budget (optional)</option>
            <option value="under_300">Under $300/month</option>
            <option value="300_500">$300 - $500/month</option>
            <option value="500_700">$500 - $700/month</option>
            <option value="over_700">$700+/month</option>
          </select>

          {/* Trade-in */}
          <label className="flex items-center gap-3 p-3 bg-earth-cream border border-earth-border rounded-xl cursor-pointer">
            <input
              type="checkbox"
              checked={formData.tradeIn}
              onChange={(e) => update("tradeIn", e.target.checked)}
              className="w-4 h-4 accent-earth-forest"
            />
            <span className="text-sm text-earth-muted">I have a vehicle to trade in</span>
          </label>

          <button
            onClick={() => setStep("contact")}
            className="w-full bg-earth-red hover:bg-red-700 text-white py-3.5 rounded-xl font-bold uppercase tracking-wide transition"
          >
            Next — Your Information
          </button>
        </div>
      )}

      {/* ── STEP 2: CONTACT ── */}
      {step === "contact" && (
        <div className="space-y-4">
          <h3 className="font-bold text-earth-forest text-sm tracking-wider uppercase mb-1">
            How can we reach you?
          </h3>
          <p className="text-xs text-earth-muted mb-3">So our specialist can call you back within 1 hour.</p>

          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="First Name *"
              value={formData.firstName}
              onChange={(e) => update("firstName", e.target.value)}
              className={inputClass}
              autoComplete="given-name"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => update("lastName", e.target.value)}
              className={inputClass}
              autoComplete="family-name"
            />
          </div>
          <input
            type="tel"
            placeholder="Phone Number *"
            value={formData.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClass}
            autoComplete="tel"
          />
          <input
            type="email"
            placeholder="Email *"
            value={formData.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClass}
            autoComplete="email"
          />

          {/* Province selector */}
          <select
            value={formData.province}
            onChange={(e) => {
              update("province", e.target.value);
              update("communitySlug", "");
              setCommunitySearch("");
            }}
            className={inputClass + " text-earth-muted"}
          >
            <option value="">Province</option>
            {PROVINCES.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>

          {/* Community search — only shows after province selected */}
          {formData.province && (
            <div className="relative">
              <input
                type="text"
                placeholder="Search your community..."
                value={formData.communitySlug === "other" ? "Other / Not Listed" : communitySearch || selectedCommunityName}
                onChange={(e) => {
                  setCommunitySearch(e.target.value);
                  setShowCommunityDropdown(true);
                  if (formData.communitySlug) update("communitySlug", "");
                }}
                onFocus={() => {
                  if (!formData.communitySlug) setShowCommunityDropdown(true);
                }}
                className={inputClass}
              />
              {showCommunityDropdown && !formData.communitySlug && (
                <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-earth-border rounded-xl shadow-lg max-h-48 overflow-y-auto">
                  {filteredCommunities.map((c) => (
                    <button
                      key={c.slug}
                      onClick={() => {
                        update("communitySlug", c.slug);
                        setCommunitySearch("");
                        setShowCommunityDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-earth-text hover:bg-earth-cream transition border-b border-earth-border/30 last:border-0"
                    >
                      {c.name}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      update("communitySlug", "other");
                      setCommunitySearch("");
                      setShowCommunityDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-earth-muted hover:bg-earth-cream transition"
                  >
                    Other / Not Listed
                  </button>
                  {filteredCommunities.length === 0 && communitySearch.length >= 2 && (
                    <p className="px-4 py-2.5 text-xs text-earth-muted">No communities found. Select &quot;Other&quot; below.</p>
                  )}
                </div>
              )}
              {formData.communitySlug && formData.communitySlug !== "other" && (
                <button
                  onClick={() => {
                    update("communitySlug", "");
                    setCommunitySearch("");
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-earth-muted hover:text-earth-text text-sm"
                >
                  ✕
                </button>
              )}
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => setStep("vehicle")}
              className="flex-1 border border-earth-border text-earth-muted py-3.5 rounded-xl font-semibold hover:border-earth-sage transition"
            >
              Back
            </button>
            <button
              onClick={() => {
                if (!formData.firstName || !formData.phone || !formData.email) {
                  setError("Please enter your name, phone number, and email.");
                  return;
                }
                setStep("financial");
              }}
              disabled={!formData.firstName || !formData.phone || !formData.email}
              className="flex-1 bg-earth-red hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold uppercase tracking-wide transition"
            >
              Next — Final Details
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 3: FINANCIAL + SUBMIT ── */}
      {step === "financial" && (
        <div className="space-y-4">
          <h3 className="font-bold text-earth-forest text-sm tracking-wider uppercase mb-1">
            Almost done — helps us find your best rate
          </h3>
          <p className="text-xs text-earth-muted mb-3">Helps us find your best rate.</p>

          {/* Employment */}
          <select
            value={formData.employmentStatus}
            onChange={(e) => update("employmentStatus", e.target.value)}
            className={inputClass + " text-earth-muted"}
          >
            <option value="">Employment Status</option>
            <option value="employed">Employed Full-Time</option>
            <option value="part_time">Employed Part-Time</option>
            <option value="self_employed">Self-Employed</option>
            <option value="seasonal">Seasonal Worker</option>
            <option value="band_council">Band / Council Employee</option>
            <option value="pension">Pension / CPP / Disability</option>
            <option value="income_assistance">Income Assistance</option>
            <option value="other">Other</option>
          </select>

          {/* Monthly Income */}
          <select
            value={formData.monthlyIncome}
            onChange={(e) => update("monthlyIncome", e.target.value)}
            className={inputClass + " text-earth-muted"}
          >
            <option value="">Monthly Income (before taxes)</option>
            <option value="under_1500">Under $1,500</option>
            <option value="1500_2500">$1,500 - $2,500</option>
            <option value="2500_3500">$2,500 - $3,500</option>
            <option value="3500_5000">$3,500 - $5,000</option>
            <option value="over_5000">$5,000+</option>
          </select>

          {/* Credit Self-Declaration */}
          <div>
            <p className="text-xs text-earth-muted mb-2 font-medium">How would you describe your credit?</p>
            <div className="space-y-2">
              {[
                { value: "excellent", label: "Great" },
                { value: "good", label: "Good" },
                { value: "fair", label: "Rebuilding" },
                { value: "poor", label: "Starting Fresh" },
                { value: "not_sure", label: "Not Sure" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => update("creditRange", opt.value)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition ${
                    formData.creditRange === opt.value
                      ? "border-earth-forest bg-earth-forest/5"
                      : "border-earth-border hover:border-earth-sage"
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                    formData.creditRange === opt.value
                      ? "border-earth-forest bg-earth-forest"
                      : "border-earth-border"
                  }`} />
                  <div>
                    <span className={`text-sm font-semibold ${
                      formData.creditRange === opt.value ? "text-earth-forest" : "text-earth-text"
                    }`}>{opt.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Status Card */}
          <label className="flex items-center gap-3 p-3 bg-earth-cream border border-earth-border rounded-xl cursor-pointer">
            <input
              type="checkbox"
              checked={formData.hasStatusCard}
              onChange={(e) => update("hasStatusCard", e.target.checked)}
              className="w-4 h-4 accent-earth-forest"
            />
            <div>
              <span className="text-sm text-earth-text">I have a Status Card</span>
              <p className="text-xs text-earth-muted mt-0.5">
                Save 100% of HST — tax-free on-reserve delivery
              </p>
            </div>
          </label>

          {/* Consent Checkbox — PIPEDA + third-party disclosure */}
          <label className="flex items-start gap-3 p-3 bg-earth-cream/50 border border-earth-border rounded-xl cursor-pointer">
            <input
              type="checkbox"
              checked={consentChecked}
              onChange={(e) => setConsentChecked(e.target.checked)}
              className="w-4 h-4 accent-earth-forest mt-0.5 flex-shrink-0"
            />
            <p className="text-xs text-earth-muted leading-relaxed">
              I consent to First Nation Auto Financing collecting my information and
              sharing it with dealer and lender partners to process my vehicle financing
              application. I agree to be contacted by phone, SMS, or email. I can withdraw
              consent at any time. Protected under{" "}
              <span className="underline">PIPEDA</span>.
            </p>
          </label>

          <div className="flex gap-3">
            <button
              onClick={() => setStep("contact")}
              className="flex-1 border border-earth-border text-earth-muted py-3.5 rounded-xl font-semibold hover:border-earth-sage transition"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading || !consentChecked}
              className="flex-1 bg-earth-red hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold text-lg uppercase tracking-wide transition"
            >
              {loading ? "Submitting..." : "Get Pre-Approved"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
