"use client";

import { useState } from "react";

export function CallbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [openedAt] = useState(Date.now());
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!phone || !name) return;
    setLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: name,
          phone,
          email: "",
          website,
          _t: Date.now() - openedAt,
          source: "callback_widget",
          landingPage: window.location.pathname,
        }),
      });
      if (res.ok) setSubmitted(true);
    } catch {
      // Still show success — lead may have saved
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50">
        <div className="bg-earth-dark border border-earth-gold/30 rounded-2xl p-5 shadow-2xl w-72">
          <div className="text-center">
            <span className="text-3xl">✅</span>
            <p className="text-white font-bold mt-2">We&apos;ll call you soon!</p>
            <p className="text-white/50 text-xs mt-1">Within 1 hour.</p>
          </div>
        </div>
      </div>
    );
  }

  // Floating button
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 bg-earth-forest hover:bg-green-700 text-white rounded-full px-5 py-3 shadow-xl shadow-earth-forest/30 flex items-center gap-2 transition group"
      >
        <span className="text-lg">📞</span>
        <span className="text-sm font-bold">Want a Call Back?</span>
      </button>
    );
  }

  // Expanded form
  return (
    <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50">
      <div className="bg-earth-dark border border-earth-gold/30 rounded-2xl p-5 shadow-2xl w-80">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white font-bold text-sm">Request a Call Back</p>
            <p className="text-white/40 text-xs">We call within 1 hour</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/40 hover:text-white text-lg transition"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
            <input type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-earth-gold focus:outline-none"
          />
          <input
            type="tel"
            placeholder="Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-earth-gold focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading || !name || !phone}
            className="w-full bg-earth-red hover:bg-red-700 disabled:opacity-50 text-white py-2.5 rounded-lg font-bold text-sm uppercase tracking-wide transition"
          >
            {loading ? "Sending..." : "Call Me Back"}
          </button>
          <p className="text-[10px] text-white/30 text-center">
            No obligation. 100% secure.
          </p>
        </form>
      </div>
    </div>
  );
}
