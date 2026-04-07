import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";
import { CommunityAccordion } from "@/components/CommunityAccordion";
import { ALL_COMMUNITIES } from "@/data/communities";

const STATS = [
  { value: "191+", label: "Communities Served", sub: "ON, QC, NB & NS" },
  { value: "100%", label: "Tax Savings", sub: "HST exempt with Status Card" },
  { value: "$0", label: "Down Payment", sub: "Drive today" },
  { value: "1 HR", label: "Callback Time", sub: "We call you fast" },
];

const STEPS = [
  {
    num: "01",
    title: "Apply Online",
    description: "Fill out our simple 3-minute form. No credit check, no commitment, no pressure.",
  },
  {
    num: "02",
    title: "Sam Calls You",
    description: "Within 1 hour, I'll personally call to discuss your options and find the right vehicle.",
  },
  {
    num: "03",
    title: "Get Approved",
    description: "We work with 50+ lenders to get you the best rate — even with challenged credit.",
  },
  {
    num: "04",
    title: "Delivered to Your Door",
    description: "Your vehicle is delivered tax-free directly to your community. No dealership trips.",
  },
];

const TRUST_POINTS = [
  {
    icon: "🤝",
    title: "Built on Respect",
    description: "We operate with honesty, transparency, and respect for every community we serve. No hidden fees. No surprises.",
  },
  {
    icon: "🏠",
    title: "On-Reserve Delivery",
    description: "Your vehicle delivered tax-free directly to your door. Save thousands in HST/QST that you'd pay at a dealership.",
  },
  {
    icon: "📞",
    title: "A Real Person, Not a Bot",
    description: "When you apply, Sam Al calls you personally within 1 hour. You're not a number here — you're family.",
  },
  {
    icon: "💳",
    title: "All Credit Welcome",
    description: "Bad credit, no credit, new credit — we work with 50+ lenders to find your best option. Over 98.9% approval rate.",
  },
  {
    icon: "🪶",
    title: "Community First",
    description: "We support powwows, hockey teams, and community events. A portion of every sale goes back to the communities we serve.",
  },
  {
    icon: "🔒",
    title: "Your Info is Safe",
    description: "PIPEDA compliant. Your personal information is encrypted and never shared without your consent.",
  },
];

export default function HomePage() {
  const ontarioCommunities = ALL_COMMUNITIES.filter((c) => c.province === "ON");
  const quebecCommunities = ALL_COMMUNITIES.filter((c) => c.province === "QC");
  const newBrunswickCommunities = ALL_COMMUNITIES.filter((c) => c.province === "NB");
  const novaScotiaCommunities = ALL_COMMUNITIES.filter((c) => c.province === "NS");

  return (
    <main className="min-h-screen bg-earth-warm">
      {/* Nav */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-earth-border">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <span className="text-lg font-bold text-earth-forest tracking-tight">
              First Nations Auto
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="tel:+16133028872"
              className="hidden sm:flex items-center gap-1.5 text-sm text-earth-muted hover:text-earth-forest transition"
            >
              <span>📞</span> 613-302-8872
            </a>
            <Link
              href="#communities"
              className="hidden sm:block text-sm text-earth-muted hover:text-earth-forest transition"
            >
              Communities
            </Link>
            <a
              href="#apply"
              className="text-sm bg-earth-forest hover:bg-earth-forest/90 text-white px-5 py-2 rounded-full font-semibold transition"
            >
              Apply Now
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-earth-forest to-earth-sage">
        <div className="max-w-6xl mx-auto px-4 pt-16 pb-20 relative">
          <div className="max-w-2xl">
            <p className="text-earth-gold font-semibold text-sm mb-4 tracking-wide uppercase">
              Serving 191+ First Nations communities
            </p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-white">
              Vehicle financing{" "}
              <span className="text-earth-gold">built for your community</span>
            </h1>
            <p className="text-lg text-white/80 mb-8 max-w-xl leading-relaxed">
              Save thousands with tax-exempt on-reserve delivery across Ontario,
              Quebec, New Brunswick, and Nova Scotia. $0 down. All credit
              welcome. I&apos;ll personally call you within 1 hour.
            </p>
            <p className="text-sm text-white/60 mb-6 flex items-center gap-2">
              <span className="text-earth-gold font-semibold">— Sam Al</span>{" "}
              Your dedicated financing specialist
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#apply"
                className="bg-earth-gold hover:bg-earth-gold/90 text-earth-dark px-8 py-3 rounded-full font-bold text-lg transition shadow-lg"
              >
                Get Pre-Approved Free
              </a>
              <a
                href="tel:+16133028872"
                className="border-2 border-white/30 hover:border-white/60 text-white px-8 py-3 rounded-full font-semibold text-lg transition"
              >
                📞 613-302-8872
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 text-center border border-white/10"
              >
                <div className="text-3xl font-bold text-earth-gold">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-white/80 mt-1 tracking-wide uppercase">
                  {stat.label}
                </div>
                <div className="text-xs text-white/50 mt-1">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-earth-dark mb-3">
            How It Works
          </h2>
          <p className="text-earth-muted max-w-lg mx-auto">
            From application to delivery, we make it simple. No dealership
            visits required.
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {STEPS.map((step) => (
            <div key={step.num} className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-earth-forest text-white font-bold text-lg mb-4">
                {step.num}
              </div>
              <h3 className="font-bold text-earth-dark text-lg mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-earth-muted leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="bg-earth-cream">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-earth-dark mb-3">
              Why Communities Trust Us
            </h2>
            <p className="text-earth-muted max-w-lg mx-auto">
              We&apos;re not just another lender. We&apos;re here to build
              long-term relationships with the communities we serve.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TRUST_POINTS.map((point) => (
              <div
                key={point.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-earth-border hover:shadow-md transition"
              >
                <div className="text-3xl mb-4">{point.icon}</div>
                <h3 className="font-bold text-earth-dark mb-2">
                  {point.title}
                </h3>
                <p className="text-sm text-earth-muted leading-relaxed">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Sam */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="bg-earth-forest rounded-3xl p-8 md:p-12 text-center">
          <div className="w-20 h-20 rounded-full bg-earth-gold/20 border-2 border-earth-gold flex items-center justify-center text-3xl mx-auto mb-6">
            👤
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Meet Sam Al
          </h2>
          <p className="text-white/70 text-sm mb-1 uppercase tracking-wider font-semibold">
            Your Financing Specialist
          </p>
          <p className="text-white/80 max-w-lg mx-auto mt-4 leading-relaxed">
            &quot;I believe everyone deserves reliable transportation. Whether
            you&apos;re on Six Nations, in Kahnawà:ke, Eskasoni, or Tobique —
            I&apos;ll work personally with you to find the right vehicle at the
            right price. No judgment, no pressure, just honest help.&quot;
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a
              href="tel:+16133028872"
              className="bg-earth-gold hover:bg-earth-gold/90 text-earth-dark px-8 py-3 rounded-full font-bold transition"
            >
              📞 Call Sam: 613-302-8872
            </a>
            <a
              href="#apply"
              className="border-2 border-white/30 hover:border-white/60 text-white px-8 py-3 rounded-full font-semibold transition"
            >
              Apply Online — 3 Minutes
            </a>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="bg-earth-cream">
        <div className="max-w-xl mx-auto px-4 py-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-earth-dark mb-2">
              Get Pre-Approved in 3 Minutes
            </h2>
            <p className="text-earth-muted">
              No credit impact. No commitment. Sam calls you within 1 hour.
            </p>
          </div>
          <LeadForm />
        </div>
      </section>

      {/* Communities */}
      <section id="communities" className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-earth-dark mb-2">
            Communities We Serve
          </h2>
          <p className="text-sm text-earth-muted">
            We deliver tax-free to 191+ First Nations communities. Find yours below.
          </p>
        </div>

        <CommunityAccordion
          provinces={[
            {
              label: "Ontario",
              icon: "🍁",
              color: "text-earth-forest",
              hoverColor: "hover:border-earth-forest hover:text-earth-forest",
              communities: ontarioCommunities,
            },
            {
              label: "Quebec",
              icon: "⚜️",
              color: "text-earth-sage",
              hoverColor: "hover:border-earth-sage hover:text-earth-sage",
              communities: quebecCommunities,
            },
            {
              label: "New Brunswick",
              icon: "🌊",
              color: "text-earth-brown",
              hoverColor: "hover:border-earth-brown hover:text-earth-brown",
              communities: newBrunswickCommunities,
            },
            {
              label: "Nova Scotia",
              icon: "🦞",
              color: "text-earth-tan",
              hoverColor: "hover:border-earth-tan hover:text-earth-tan",
              communities: novaScotiaCommunities,
            },
          ]}
        />
      </section>

      {/* Footer */}
      <footer className="bg-earth-dark text-white/70 py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">🌿</span>
                <span className="text-white font-bold">First Nations Auto</span>
              </div>
              <p className="text-sm leading-relaxed">
                Vehicle financing built for First Nations communities. Tax-free
                on-reserve delivery across Ontario, Quebec, New Brunswick, and
                Nova Scotia.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
                Contact Sam
              </h4>
              <div className="space-y-2 text-sm">
                <p>📞 <a href="tel:+16133028872" className="hover:text-white transition">613-302-8872</a></p>
                <p>💬 Text anytime</p>
                <p>⏰ Callbacks within 1 hour</p>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
                Quick Links
              </h4>
              <div className="space-y-2 text-sm">
                <p><a href="#apply" className="hover:text-white transition">Apply Now</a></p>
                <p><a href="#communities" className="hover:text-white transition">Communities</a></p>
                <p><Link href="/admin" className="hover:text-white transition">Admin</Link></p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-xs text-white/40 max-w-lg mx-auto leading-relaxed mb-4">
              We acknowledge that we operate on the traditional territories of
              many First Nations, Inuit, and Métis peoples. We are committed to
              building respectful relationships with the communities we serve.
            </p>
            <p className="text-xs text-white/30">
              &copy; {new Date().getFullYear()} First Nations Auto. Serving
              Ontario, Quebec, New Brunswick &amp; Nova Scotia.
            </p>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white/95 backdrop-blur-md border-t border-earth-border px-4 py-3 z-50">
        <div className="flex gap-2">
          <a
            href="tel:+16133028872"
            className="flex-1 bg-earth-forest text-white text-center py-3 rounded-full font-semibold text-sm transition"
          >
            📞 Call Sam
          </a>
          <a
            href="#apply"
            className="flex-1 bg-earth-gold text-earth-dark text-center py-3 rounded-full font-bold text-sm transition"
          >
            Apply Free
          </a>
        </div>
      </div>
    </main>
  );
}
