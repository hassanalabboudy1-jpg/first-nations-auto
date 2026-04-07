import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";
import { ALL_COMMUNITIES } from "@/data/communities";

const STATS = [
  { value: "191+", label: "Communities Served", sub: "ON, QC, NB & NS" },
  { value: "13%", label: "Tax Savings", sub: "HST exempt on-reserve" },
  { value: "$0", label: "Down Payment", sub: "Get approved today" },
  { value: "FREE", label: "Delivery", sub: "To your community" },
];

const FEATURES = [
  {
    icon: "🏠",
    title: "Delivered to Your Door",
    description:
      "Free vehicle delivery directly to your community — whether you're in Six Nations, Kahnawà:ke, or Attawapiskat. We come to you.",
  },
  {
    icon: "💰",
    title: "Tax Exemption Savings",
    description:
      "Save 13% HST (Ontario) or 14.975% QST+GST (Quebec) with on-reserve delivery. Section 87 of the Indian Act — your right, your savings.",
  },
  {
    icon: "✅",
    title: "All Credit Welcome",
    description:
      "No credit, bad credit, rebuilding credit — we work with every situation. 98% approval rate through our network of 50+ lenders.",
  },
  {
    icon: "🤝",
    title: "Community First",
    description:
      "We invest back into the communities we serve. Sponsoring powwows, hockey tournaments, and youth programs. This is a partnership.",
  },
  {
    icon: "📱",
    title: "3-Minute Application",
    description:
      "Apply in minutes from your phone. No impact on your credit score for pre-approval. Get a response the same day.",
  },
  {
    icon: "🔄",
    title: "Trade-In Accepted",
    description:
      "Have a vehicle to trade? We'll give you top value and apply it to your new purchase. Easy, transparent, fair.",
  },
];

export default function HomePage() {
  const ontarioCommunities = ALL_COMMUNITIES.filter(
    (c) => c.province === "ON"
  );
  const quebecCommunities = ALL_COMMUNITIES.filter(
    (c) => c.province === "QC"
  );
  const newBrunswickCommunities = ALL_COMMUNITIES.filter(
    (c) => c.province === "NB"
  );
  const novaScotiaCommunities = ALL_COMMUNITIES.filter(
    (c) => c.province === "NS"
  );

  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="border-b border-brand-border bg-brand-darker/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚗</span>
            <span className="font-display text-sm font-bold tracking-wider gradient-text">
              FIRST NATIONS AUTO
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="#communities"
              className="text-sm text-gray-400 hover:text-white transition"
            >
              Communities
            </Link>
            <Link
              href="#apply"
              className="text-sm bg-brand-red hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-red/10 via-transparent to-transparent" />
        <div className="max-w-6xl mx-auto px-4 pt-16 pb-12 relative">
          <div className="max-w-3xl">
            <p className="font-display text-xs tracking-widest text-brand-teal mb-4 uppercase">
              Ontario, Quebec &amp; Maritimes First Nations Communities
            </p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Vehicle financing{" "}
              <span className="gradient-text">built for your community</span>
            </h1>
            <p className="text-lg text-gray-400 mb-8 max-w-xl leading-relaxed">
              Save thousands with tax-exempt on-reserve delivery. $0 down. All
              credit welcome. Free delivery to 191+ First Nations communities
              across Ontario, Quebec, New Brunswick, and Nova Scotia.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#apply"
                className="bg-brand-red hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition"
              >
                Get Pre-Approved
              </a>
              <a
                href="tel:+1XXXXXXXXXX"
                className="border border-brand-border hover:border-gray-500 text-white px-8 py-3 rounded-lg font-semibold text-lg transition"
              >
                Call Us
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-brand-darker border border-brand-border rounded-xl p-5 text-center"
              >
                <div className="font-display text-3xl font-bold text-brand-gold">
                  {stat.value}
                </div>
                <div className="font-display text-xs font-bold text-gray-400 mt-1 tracking-wide uppercase">
                  {stat.label}
                </div>
                <div className="text-xs text-gray-600 mt-1">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="font-display text-2xl font-bold text-center mb-12">
          Why First Nations communities choose us
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="bg-brand-darker border border-brand-border rounded-xl p-6 hover:border-brand-teal/50 transition"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="font-display text-sm font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="max-w-6xl mx-auto px-4 py-16">
        <div className="max-w-xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-center mb-2">
            Get Pre-Approved in 3 Minutes
          </h2>
          <p className="text-center text-gray-400 mb-8">
            No impact on your credit score. We call you within 1 hour.
          </p>
          <LeadForm />
        </div>
      </section>

      {/* Communities */}
      <section id="communities" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="font-display text-2xl font-bold text-center mb-2">
          Communities We Serve
        </h2>
        <p className="text-center text-gray-400 mb-10">
          Click your community for personalized financing information
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Ontario */}
          <div>
            <h3 className="font-display text-sm font-bold text-brand-red mb-4 tracking-wider uppercase">
              Ontario — {ontarioCommunities.length} Communities
            </h3>
            <div className="flex flex-wrap gap-2">
              {ontarioCommunities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/community/${c.slug}`}
                  className="text-xs bg-brand-darker border border-brand-border rounded-lg px-3 py-2 hover:border-brand-red/50 hover:text-brand-red transition"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Quebec */}
          <div>
            <h3 className="font-display text-sm font-bold text-brand-blue mb-4 tracking-wider uppercase">
              Quebec — {quebecCommunities.length} Communities
            </h3>
            <div className="flex flex-wrap gap-2">
              {quebecCommunities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/community/${c.slug}`}
                  className="text-xs bg-brand-darker border border-brand-border rounded-lg px-3 py-2 hover:border-brand-blue/50 hover:text-brand-blue transition"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>

          {/* New Brunswick */}
          <div>
            <h3 className="font-display text-sm font-bold text-brand-teal mb-4 tracking-wider uppercase">
              New Brunswick — {newBrunswickCommunities.length} Communities
            </h3>
            <div className="flex flex-wrap gap-2">
              {newBrunswickCommunities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/community/${c.slug}`}
                  className="text-xs bg-brand-darker border border-brand-border rounded-lg px-3 py-2 hover:border-brand-teal/50 hover:text-brand-teal transition"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Nova Scotia */}
          <div>
            <h3 className="font-display text-sm font-bold text-brand-gold mb-4 tracking-wider uppercase">
              Nova Scotia — {novaScotiaCommunities.length} Communities
            </h3>
            <div className="flex flex-wrap gap-2">
              {novaScotiaCommunities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/community/${c.slug}`}
                  className="text-xs bg-brand-darker border border-brand-border rounded-lg px-3 py-2 hover:border-brand-gold/50 hover:text-brand-gold transition"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-brand-border py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-display text-sm gradient-text font-bold mb-4">
            FIRST NATIONS AUTO FINANCING
          </p>
          <p className="text-xs text-gray-500 max-w-lg mx-auto leading-relaxed mb-6">
            We acknowledge that we operate on the traditional territories of many
            First Nations, Inuit, and Metis peoples. We are committed to building
            respectful relationships with the communities we serve.
          </p>
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} First Nations Auto Financing.
            Serving Ontario, Quebec, New Brunswick &amp; Nova Scotia.
          </p>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-brand-darker/95 backdrop-blur-md border-t border-brand-border px-4 py-3 z-50">
        <a
          href="#apply"
          className="block w-full bg-brand-red hover:bg-red-700 text-white text-center py-3 rounded-lg font-semibold text-sm transition"
        >
          Get Pre-Approved — Free &amp; No Credit Impact
        </a>
      </div>
    </main>
  );
}
