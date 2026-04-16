import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ALL_COMMUNITIES, generateCommunityMeta, PROVINCE_LABELS, TAX_RATES } from "@/data/communities";
import { LeadForm } from "@/components/LeadForm";

interface Props {
  params: Promise<{ slug: string }>;
}

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

  const nearbyCommunities = ALL_COMMUNITIES.filter(
    (c) => c.province === community.province && c.slug !== community.slug
  ).slice(0, 8);

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
          <div className="flex items-center gap-4">
            <a
              href="tel:+16133028872"
              className="hidden sm:flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition"
            >
              📞 613-302-8872
            </a>
            <a
              href="#apply"
              className="text-sm bg-earth-red hover:bg-red-700 text-white px-5 py-2 rounded-lg font-bold transition"
            >
              APPLY NOW
            </a>
          </div>
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

      {/* Community Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
            alt={`Vehicle financing for ${community.name}`}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-earth-dark via-earth-dark/85 to-earth-dark/50" />
        </div>
        <div className="max-w-7xl mx-auto px-4 pt-14 pb-16 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-white/40 mb-6">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <Link href="/#communities" className="hover:text-white transition">Communities</Link>
            <span>/</span>
            <span className="text-white/70">{community.name}</span>
          </div>

          <p className="text-3xl text-earth-gold font-bold mb-2">
            {community.greeting}!
          </p>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-white uppercase">
            Vehicle Financing for{" "}
            <span className="text-earth-gold">{community.name}</span>
          </h1>

          <p className="text-lg text-white/70 mb-8 max-w-2xl leading-relaxed">
            {community.nation} community in {province}. Save {taxRate} with
            tax-exempt on-reserve delivery to{" "}
            {community.reserveName || community.name}. $0 down. All credit welcome.
          </p>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-3 max-w-xl">
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
              <div className="text-xl md:text-2xl font-bold text-earth-gold">100%</div>
              <div className="text-xs text-white/50 mt-1">Tax Savings</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
              <div className="text-lg md:text-2xl font-bold text-earth-gold whitespace-nowrap">{taxSavings}</div>
              <div className="text-xs text-white/50 mt-1">Avg. Saved</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-earth-gold">FREE</div>
              <div className="text-xs text-white/50 mt-1">
                {community.isRemote ? "Remote Delivery" : "Delivery"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Tax Exemption Works */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-earth-dark uppercase mb-8">
          How Tax Exemption Works for {community.name}
        </h2>
        <div className="space-y-6">
          {[
            {
              num: "01",
              title: "Apply Online",
              desc: `Fill out our 3-minute application. We'll match you with the best financing from 50+ lenders.`,
            },
            {
              num: "02",
              title: "Choose Your Vehicle",
              desc: "Browse our inventory or tell us what you need. Trucks, SUVs, cars, minivans — new and used.",
            },
            {
              num: "03",
              title: `We Deliver to ${community.name}`,
              desc: `Your vehicle is delivered directly to ${community.reserveName || community.name}. Because delivery is on-reserve, you save ${taxRate} under Section 87 of the Indian Act. That's ${taxSavings} back in your pocket.`,
            },
          ].map((step) => (
            <div key={step.num} className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-earth-red flex items-center justify-center flex-shrink-0 text-white font-bold">
                {step.num}
              </div>
              <div>
                <h3 className="font-bold text-earth-dark text-lg">{step.title}</h3>
                <p className="text-earth-muted mt-1 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="bg-earth-cream">
        <div className="max-w-xl mx-auto px-4 py-16">
          <div className="text-center mb-8">
            <p className="text-earth-red text-sm font-bold tracking-wider uppercase mb-2">
              {community.name}
            </p>
            <h2 className="text-3xl font-bold text-earth-dark uppercase">
              Get Pre-Approved Now
            </h2>
            <p className="text-earth-muted mt-2">
              Takes 3 minutes. A specialist calls you within 1 hour.
            </p>
          </div>
          <LeadForm preselectedCommunity={community.slug} />
        </div>
      </section>

      {/* Nearby Communities */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-lg font-bold text-earth-dark mb-4">
          Also serving nearby communities
        </h2>
        <div className="flex flex-wrap gap-2">
          {nearbyCommunities.map((c) => (
            <Link
              key={c.slug}
              href={`/community/${c.slug}`}
              className="text-xs bg-white border border-earth-border rounded-full px-3 py-1.5 hover:border-earth-forest hover:text-earth-forest transition text-earth-muted"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FinancialService",
            name: `First Nation Auto Financing — ${community.name}`,
            description: `Vehicle financing for ${community.name} (${community.nation}) in ${province}. Tax-exempt delivery. $0 down.`,
            telephone: "+16133028872",
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
              name: "First Nation Auto Financing",
              url: "https://firstnationautofinancing.ca",
            },
          }),
        }}
      />

      {/* Footer */}
      <footer className="bg-earth-dark text-white/60 py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/" className="text-white font-bold">
            🌿 First Nation Auto
          </Link>
          <p className="text-xs text-white/30 mt-3">
            Serving {community.name} and 248+ First Nations communities across
            Ontario, Quebec, Manitoba, New Brunswick &amp; Nova Scotia.
          </p>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-earth-dark/95 backdrop-blur-md border-t border-earth-gold/30 px-4 py-3 z-50">
        <div className="flex gap-2">
          <a
            href="tel:+16133028872"
            className="flex-1 bg-earth-gold text-earth-dark text-center py-3 rounded-lg font-bold text-sm transition"
          >
            📞 Call Now
          </a>
          <a
            href="#apply"
            className="flex-1 bg-earth-red text-white text-center py-3 rounded-lg font-bold text-sm uppercase transition"
          >
            Apply Now
          </a>
        </div>
      </div>
    </main>
  );
}
