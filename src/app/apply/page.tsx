import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Apply for Vehicle Financing — First Nations Auto | ON, QC, NB & NS",
  description:
    "Apply in 3 minutes. No impact on your credit score. $0 down payment. Tax-exempt on-reserve delivery. Serving 248+ First Nations communities in Ontario, Quebec, Manitoba, New Brunswick, and Nova Scotia.",
};

export default function ApplyPage() {
  return (
    <main className="min-h-screen">
      <nav className="border-b border-brand-border bg-brand-darker/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🚗</span>
            <span className="font-display text-sm font-bold tracking-wider gradient-text">
              FIRST NATIONS AUTO
            </span>
          </Link>
          <a
            href="tel:+1XXXXXXXXXX"
            className="text-sm text-gray-400 hover:text-white transition"
          >
            Need help? Call us
          </a>
        </div>
      </nav>

      <section className="max-w-xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-2">
          Get Pre-Approved Today
        </h1>
        <p className="text-center text-gray-400 mb-8">
          3-minute application. No credit impact. We call you within 1 hour.
        </p>

        <LeadForm />

        <div className="mt-8 text-center space-y-3">
          <p className="text-xs text-gray-500 leading-relaxed">
            By submitting this application, you consent to being contacted by
            phone, SMS, or email regarding vehicle financing. Your information is
            handled in accordance with PIPEDA (Personal Information Protection and
            Electronic Documents Act).
          </p>
          <div className="flex justify-center gap-6 text-xs text-gray-600">
            <span>98% Approval Rate</span>
            <span>50+ Lender Network</span>
            <span>Free Delivery</span>
          </div>
        </div>
      </section>
    </main>
  );
}
