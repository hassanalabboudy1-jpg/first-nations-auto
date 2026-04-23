"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What credit score do I need to get approved?",
    a: "We work with all credit situations — good credit, bad credit, no credit, bankruptcy, consumer proposal. Our network of 50+ lenders means we can find financing for almost anyone. 98.9% of applicants get approved.",
  },
  {
    q: "How does tax-free delivery work with my Status Card?",
    a: "If you have a valid Status Card (Certificate of Indian Status), you are exempt from paying HST/GST on your vehicle when it is delivered to your reserve. This can save you $3,000 to $10,000+ depending on the vehicle price and your province. We handle all the paperwork.",
  },
  {
    q: "Does applying affect my credit score?",
    a: "No. Our pre-approval process is a soft inquiry that does not affect your credit score. A hard credit check only happens later when you choose to proceed with a specific lender and vehicle.",
  },
  {
    q: "How fast can I get my vehicle?",
    a: "Most approvals happen within 24-48 hours. Once you choose your vehicle, delivery to your community typically takes 3-7 business days depending on your location. We deliver to all 248+ First Nations communities across Ontario, Quebec, Manitoba, New Brunswick, and Nova Scotia.",
  },
  {
    q: "What documents do I need to apply?",
    a: "A valid government-issued photo ID is all you need to apply.",
  },
  {
    q: "Can I get approved with a bankruptcy or consumer proposal?",
    a: "Yes. We have lenders who specialize in financing during and after bankruptcy or consumer proposal. Your options and rates will depend on your specific situation, but we can almost always find a path to approval.",
  },
  {
    q: "Do you offer new and used vehicles?",
    a: "Yes, both. Our lender network finances new and pre-owned vehicles. We help you find the right vehicle for your budget — whether that is a brand new truck or a quality pre-owned SUV.",
  },
  {
    q: "What if I have a vehicle to trade in?",
    a: "We accept trade-ins. The value of your trade-in can be applied to your down payment, reducing your monthly payments. Let us know about your trade-in during the application process and we will include it in your deal.",
  },
  {
    q: "Do I need a down payment?",
    a: "No. We offer $0 down payment options. While a down payment can lower your monthly payments and interest, it is not required to get approved.",
  },
  {
    q: "What happens after I submit the application?",
    a: "A financial specialist will call you within 1 hour to discuss your options. They will review your situation, answer any questions, and present you with financing options. There is no obligation — if you are not happy with the offer, you can walk away.",
  },
  {
    q: "Is my personal information safe?",
    a: "Yes. Your information is encrypted with 256-bit SSL and handled in strict compliance with PIPEDA (Canada\u2019s federal privacy law). We only share your information with our lender partners for the purpose of processing your application, and only with your explicit consent.",
  },
  {
    q: "Do you deliver to remote or northern communities?",
    a: "Yes. We deliver to all First Nations communities across our 5 provinces, including remote and northern locations. Delivery is always free, regardless of how far your community is.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="bg-white border border-earth-border rounded-xl overflow-hidden"
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-earth-cream/50 transition"
          >
            <span className="text-sm font-semibold text-earth-dark pr-4">{faq.q}</span>
            <span className={`text-earth-muted text-lg flex-shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`}>
              ▾
            </span>
          </button>
          {open === i && (
            <div className="px-5 pb-4">
              <p className="text-sm text-earth-muted leading-relaxed">{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
