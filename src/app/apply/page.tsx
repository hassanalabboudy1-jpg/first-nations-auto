import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Apply for Vehicle Financing — First Nation Auto Financing",
  description:
    "Apply in 3 minutes. $0 down payment. Tax-exempt on-reserve delivery. Serving 325+ First Nations communities in Ontario, Quebec, Manitoba, New Brunswick, Nova Scotia, and Newfoundland & Labrador.",
  alternates: { canonical: "/apply" },
};

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-earth-warm">
      {/* Nav */}
      <nav className="bg-earth-dark sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">🌿</span>
            <span className="text-lg font-bold text-white tracking-tight">
              First Nation Auto
            </span>
          </Link>
          <a
            href="tel:+16133028872"
            className="text-sm text-white/70 hover:text-white transition"
          >
            📞 613-302-8872
          </a>
        </div>
        <div className="bg-earth-gold">
          <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-xs font-semibold text-earth-dark">
            <span>✅ 98.9% Approval Rate</span>
            <span>🏠 Free On-Reserve Delivery</span>
            <span>💰 $0 Down Payment</span>
            <span>📞 1-Hour Callback</span>
          </div>
        </div>
      </nav>

      <section className="max-w-xl mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <p className="text-earth-red text-sm font-bold tracking-wider uppercase mb-2">
            Free &amp; 100% Secure
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-earth-dark uppercase">
            Get Pre-Approved Today
          </h1>
          <p className="text-earth-muted mt-2">
            3-minute application. A specialist calls you within 1 hour.
          </p>
        </div>

        <LeadForm />

        <div className="mt-8 text-center">
          <div className="flex justify-center gap-6 text-xs text-earth-muted font-semibold">
            <span>98.9% Approval</span>
            <span>50+ Lenders</span>
            <span>Free Delivery</span>
          </div>
        </div>
      </section>
    </main>
  );
}
