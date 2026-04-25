"use client";

import { useState } from "react";
import { faqs } from "@/data/faqs";

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
