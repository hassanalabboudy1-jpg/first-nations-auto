"use client";

import { useState } from "react";
import Link from "next/link";
import type { CommunityData } from "@/data/communities";

interface ProvinceGroup {
  label: string;
  icon: string;
  color: string;
  hoverColor: string;
  communities: CommunityData[];
}

export function CommunityAccordion({ provinces }: { provinces: ProvinceGroup[] }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="space-y-3 max-w-2xl mx-auto">
      {provinces.map((province) => (
        <div key={province.label} className="border border-earth-border rounded-xl overflow-hidden bg-white">
          <button
            onClick={() => setOpen(open === province.label ? null : province.label)}
            className="w-full flex items-center justify-between px-5 py-4 hover:bg-earth-cream/50 transition text-left"
          >
            <div className="flex items-center gap-2">
              <span>{province.icon}</span>
              <span className="font-semibold text-earth-dark text-sm">
                {province.label}
              </span>
              <span className="text-xs text-earth-muted bg-earth-cream px-2 py-0.5 rounded-full">
                {province.communities.length}
              </span>
            </div>
            <svg
              className={`w-4 h-4 text-earth-muted transition-transform ${
                open === province.label ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Always render for SEO, hide visually when closed */}
          <div
            className={`px-5 pb-4 transition-all ${
              open === province.label
                ? "max-h-[2000px] opacity-100"
                : "max-h-0 opacity-0 overflow-hidden"
            }`}
          >
            <div className="flex flex-wrap gap-1.5 pt-1">
              {province.communities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/community/${c.slug}`}
                  className={`text-[11px] border border-earth-border rounded-full px-2.5 py-1 transition text-earth-muted hover:text-earth-forest hover:border-earth-forest`}
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Hidden links for SEO — always in DOM for crawlers */}
          {open !== province.label && (
            <div className="sr-only">
              {province.communities.map((c) => (
                <Link key={c.slug} href={`/community/${c.slug}`}>
                  {c.name} vehicle financing
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
