"use client";

import { useState } from "react";
import { ALL_COMMUNITIES } from "@/data/communities";
import { trackLeadConversion } from "@/lib/tracking";

type FormStep = "contact" | "vehicle" | "details" | "success";

export function LeadForm() {
  const [step, setStep] = useState<FormStep>("contact");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    communitySlug: "",
    vehicleType: "",
    budgetRange: "",
    tradeIn: false,
    employmentStatus: "",
    hasStatusCard: false,
    referralCode: "",
  });

  const update = (field: string, value: string | boolean) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  async function handleSubmit() {
    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
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
      }
    } catch {
      setStep("success");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full bg-white border border-earth-border rounded-xl px-4 py-3 text-sm text-earth-text focus:border-earth-forest focus:ring-1 focus:ring-earth-forest/20 focus:outline-none transition placeholder:text-earth-muted/60";

  if (step === "success") {
    return (
      <div className="bg-earth-dark rounded-2xl p-8 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-xl font-bold text-white mb-2">
          You&apos;re Pre-Approved!
        </h3>
        <p className="text-white/80 mb-4">
          Sam will call you within 1 hour to discuss your options. No obligation.
        </p>
        <p className="text-sm text-white/60">
          We&apos;ll be in touch shortly to discuss your options.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-earth-border rounded-2xl p-6 md:p-8 shadow-sm">
      {/* Progress */}
      <div className="flex gap-2 mb-6">
        {(["contact", "vehicle", "details"] as const).map((s, i) => (
          <div
            key={s}
            className={`h-2 flex-1 rounded-full transition-colors ${
              i <= ["contact", "vehicle", "details"].indexOf(step)
                ? "bg-earth-forest"
                : "bg-earth-border"
            }`}
          />
        ))}
      </div>

      {/* Trust Signals */}
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mb-6 text-[11px] text-earth-muted">
        <span>🔒 100% Secure</span>
        <span>🏠 On-reserve delivery</span>
        <span>📞 1-hour callback</span>
        <span>✅ 248+ communities</span>
      </div>

      {/* Step 1: Contact */}
      {step === "contact" && (
        <div className="space-y-4">
          <h3 className="font-bold text-earth-forest text-sm tracking-wider uppercase mb-4">
            Step 1 — Your Information
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="First Name *"
              value={formData.firstName}
              onChange={(e) => update("firstName", e.target.value)}
              className={inputClass}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => update("lastName", e.target.value)}
              className={inputClass}
            />
          </div>
          <input
            type="tel"
            placeholder="Phone Number *"
            value={formData.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClass}
          />
          <input
            type="email"
            placeholder="Email (optional)"
            value={formData.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClass}
          />
          <select
            value={formData.communitySlug}
            onChange={(e) => update("communitySlug", e.target.value)}
            className={inputClass + " text-earth-muted"}
          >
            <option value="">Select Your Community</option>
            <optgroup label="Ontario">
              {ALL_COMMUNITIES.filter((c) => c.province === "ON").map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </optgroup>
            <optgroup label="Quebec">
              {ALL_COMMUNITIES.filter((c) => c.province === "QC").map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </optgroup>
            <optgroup label="Manitoba">
              {ALL_COMMUNITIES.filter((c) => c.province === "MB").map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </optgroup>
            <optgroup label="New Brunswick">
              {ALL_COMMUNITIES.filter((c) => c.province === "NB").map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </optgroup>
            <optgroup label="Nova Scotia">
              {ALL_COMMUNITIES.filter((c) => c.province === "NS").map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </optgroup>
            <option value="other">Other / Not Listed</option>
          </select>
          <button
            onClick={() => {
              if (formData.firstName && formData.phone) setStep("vehicle");
            }}
            disabled={!formData.firstName || !formData.phone}
            className="w-full bg-earth-red hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold uppercase tracking-wide transition"
          >
            Next — Vehicle Preferences
          </button>
        </div>
      )}

      {/* Step 2: Vehicle */}
      {step === "vehicle" && (
        <div className="space-y-4">
          <h3 className="font-bold text-earth-forest text-sm tracking-wider uppercase mb-4">
            Step 2 — What Are You Looking For?
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: "truck", label: "🛻 Truck" },
              { value: "suv", label: "🚙 SUV" },
              { value: "car", label: "🚗 Car" },
              { value: "van", label: "🚐 Van" },
            ].map((type) => (
              <button
                key={type.value}
                onClick={() => update("vehicleType", type.value)}
                className={`p-4 rounded-xl border text-center transition ${
                  formData.vehicleType === type.value
                    ? "border-earth-forest bg-earth-forest/5 text-earth-forest"
                    : "border-earth-border hover:border-earth-sage text-earth-muted"
                }`}
              >
                <div className="text-2xl mb-1">{type.label.split(" ")[0]}</div>
                <div className="text-xs font-semibold">{type.label.split(" ")[1]}</div>
              </button>
            ))}
          </div>
          <select
            value={formData.budgetRange}
            onChange={(e) => update("budgetRange", e.target.value)}
            className={inputClass + " text-earth-muted"}
          >
            <option value="">Monthly Budget Range</option>
            <option value="under_300">Under $300/month</option>
            <option value="300_500">$300 - $500/month</option>
            <option value="500_700">$500 - $700/month</option>
            <option value="over_700">$700+/month</option>
          </select>
          <label className="flex items-center gap-3 p-3 bg-earth-cream border border-earth-border rounded-xl cursor-pointer">
            <input
              type="checkbox"
              checked={formData.tradeIn}
              onChange={(e) => update("tradeIn", e.target.checked)}
              className="w-4 h-4 accent-earth-forest"
            />
            <span className="text-sm text-earth-muted">I have a vehicle to trade in</span>
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => setStep("contact")}
              className="flex-1 border border-earth-border text-earth-muted py-3 rounded-xl font-semibold hover:border-earth-sage transition"
            >
              Back
            </button>
            <button
              onClick={() => setStep("details")}
              className="flex-1 bg-earth-red hover:bg-red-700 text-white py-3 rounded-xl font-bold uppercase tracking-wide transition"
            >
              Next — Final Details
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Details */}
      {step === "details" && (
        <div className="space-y-4">
          <h3 className="font-bold text-earth-forest text-sm tracking-wider uppercase mb-4">
            Step 3 — Almost Done!
          </h3>
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
            <option value="pension">Pension / Disability</option>
            <option value="other">Other</option>
          </select>
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
                Required for tax exemption on on-reserve delivery
              </p>
            </div>
          </label>
          <p className="text-xs text-earth-muted leading-relaxed">
            By submitting, you consent to being contacted about vehicle financing
            options. No impact on your credit score for pre-approval. Your
            information is protected under PIPEDA.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setStep("vehicle")}
              className="flex-1 border border-earth-border text-earth-muted py-3 rounded-xl font-semibold hover:border-earth-sage transition"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 bg-earth-red hover:bg-red-700 disabled:opacity-60 text-white py-3 rounded-xl font-bold text-lg uppercase tracking-wide transition"
            >
              {loading ? "Submitting..." : "Get Pre-Approved"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
