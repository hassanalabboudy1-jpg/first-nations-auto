import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ALL_COMMUNITIES, generateCommunityMeta, PROVINCE_LABELS, TAX_RATES } from "@/data/communities";
import { LeadForm } from "@/components/LeadForm";

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate static pages for ALL communities at build time — programmatic SEO
export function generateStaticParams() {
  return ALL_COMMUNITIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const community = ALL_COMMUNITIES.find((c) => c.slug === slug);
  if (!community) return {};

  const meta = generateCommunityMeta(community);
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      locale: community.province === "QC" ? "fr_CA" : "en_CA",
    },
  };
}

export default async function CommunityPage({ params }: Props) {
  const { slug } = await params;
  const community = ALL_COMMUNITIES.find((c) => c.slug === slug);
  if (!community) notFound();

  const province = PROVINCE_LABELS[community.province] ?? community.province;
  const taxRate = TAX_RATES[community.province] ?? "15% HST";
  const taxSavingsMap: Record<string, string> = { ON: "$5,000-$8,000", QC: "$6,000-$10,000", MB: "$4,500-$7,500", NB: "$6,000-$9,000", NS: "$6,000-$9,000" };
  const taxSavings = taxSavingsMap[community.province] ?? "$5,000-$8,000";

  // Find nearby communities for internal linking (same province)
  const nearbyCommunities = ALL_COMMUNITIES.filter(
    (c) => c.province === community.province && c.slug !== community.slug
  ).slice(0, 8);

  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="border-b border-brand-border bg-brand-darker/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🚗</span>
            <span className="font-display text-sm font-bold tracking-wider gradient-text">
              FIRST NATIONS AUTO
            </span>
          </Link>
          <a
            href="#apply"
            className="text-sm bg-brand-red hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            Apply Now
          </a>
        </div>
      </nav>

      {/* Community Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-teal/10 via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto px-4 pt-12 pb-8 relative">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <span>/</span>
            <Link href="/#communities" className="hover:text-white transition">
              Communities
            </Link>
            <span>/</span>
            <span className="text-gray-300">{community.name}</span>
          </div>

          {/* Greeting */}
          <p className="font-display text-2xl text-brand-teal font-bold mb-2">
            {community.greeting}!
          </p>

          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            Vehicle Financing for{" "}
            <span className="gradient-text">{community.name}</span>
          </h1>

          <p className="text-lg text-gray-400 mb-6 max-w-2xl leading-relaxed">
            {community.nation} community in {province}. Save {taxRate} with
            tax-exempt on-reserve delivery to{" "}
            {community.reserveName || community.name}. $0 down payment. All
            credit welcome.
          </p>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-brand-darker border border-brand-border rounded-xl p-4 text-center">
              <div className="font-display text-xl font-bold text-brand-gold">
                {taxRate}
              </div>
              <div className="text-xs text-gray-500 mt-1">Tax Savings</div>
            </div>
            <div className="bg-brand-darker border border-brand-border rounded-xl p-4 text-center">
              <div className="font-display text-xl font-bold text-brand-gold">
                {taxSavings}
              </div>
              <div className="text-xs text-gray-500 mt-1">Avg. Saved</div>
            </div>
            <div className="bg-brand-darker border border-brand-border rounded-xl p-4 text-center">
              <div className="font-display text-xl font-bold text-brand-gold">
                FREE
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {community.isRemote ? "Remote Delivery" : "Delivery"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Tax Exemption Works */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="font-display text-xl font-bold mb-6">
          How Tax Exemption Works for {community.name}
        </h2>
        <div className="bg-brand-darker border border-brand-border rounded-xl p-6 space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-brand-teal/20 flex items-center justify-center flex-shrink-0 text-brand-teal font-bold text-sm">
              1
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm">
                Apply Online
              </h3>
              <p className="text-sm text-gray-400">
                Fill out our 3-minute application. We&apos;ll match you with the best
                financing from 50+ lenders.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-brand-teal/20 flex items-center justify-center flex-shrink-0 text-brand-teal font-bold text-sm">
              2
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm">
                Choose Your Vehicle
              </h3>
              <p className="text-sm text-gray-400">
                Browse our inventory or tell us what you need. Trucks, SUVs,
                cars, vans — new and used.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-brand-teal/20 flex items-center justify-center flex-shrink-0 text-brand-teal font-bold text-sm">
              3
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm">
                We Deliver to {community.name}
              </h3>
              <p className="text-sm text-gray-400">
                Your vehicle is delivered directly to{" "}
                {community.reserveName || community.name}. Because delivery is
                on-reserve, you save {taxRate} under Section 87 of the Indian
                Act. That&apos;s {taxSavings} back in your pocket.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="max-w-4xl mx-auto px-4 py-10">
        <div className="max-w-xl mx-auto">
          <h2 className="font-display text-xl font-bold text-center mb-2">
            Apply Now — {community.name}
          </h2>
          <p className="text-center text-gray-400 mb-6 text-sm">
            Pre-approval in minutes. No impact on your credit score.
          </p>
          <LeadForm />
        </div>
      </section>

      {/* Nearby communities — internal linking for SEO */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="font-display text-lg font-bold mb-4">
          Also serving nearby communities
        </h2>
        <div className="flex flex-wrap gap-2">
          {nearbyCommunities.map((c) => (
            <Link
              key={c.slug}
              href={`/community/${c.slug}`}
              className="text-xs bg-brand-darker border border-brand-border rounded-lg px-3 py-2 hover:border-brand-teal/50 hover:text-brand-teal transition"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FinancialService",
            name: `First Nations Auto Financing — ${community.name}`,
            description: `Vehicle financing for ${community.name} (${community.nation}) in ${province}. Tax-exempt delivery. $0 down.`,
            areaServed: {
              "@type": "Place",
              name: community.name,
              geo: community.latitude
                ? {
                    "@type": "GeoCoordinates",
                    latitude: community.latitude,
                    longitude: community.longitude,
                  }
                : undefined,
            },
            serviceType: "Auto Financing",
            provider: {
              "@type": "Organization",
              name: "First Nations Auto Financing",
            },
          }),
        }}
      />

      {/* Footer */}
      <footer className="border-t border-brand-border py-8 px-4 mt-10">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/" className="font-display text-sm gradient-text font-bold">
            FIRST NATIONS AUTO FINANCING
          </Link>
          <p className="text-xs text-gray-600 mt-3">
            Serving {community.name} and 248+ First Nations communities across
            Ontario, Quebec, Manitoba, New Brunswick &amp; Nova Scotia.
          </p>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-brand-darker/95 backdrop-blur-md border-t border-brand-border px-4 py-3 z-50">
        <a
          href="#apply"
          className="block w-full bg-brand-red hover:bg-red-700 text-white text-center py-3 rounded-lg font-semibold text-sm transition"
        >
          Get Pre-Approved — Free &amp; Secure
        </a>
      </div>
    </main>
  );
}
