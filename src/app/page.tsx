import Link from "next/link";
import Image from "next/image";
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
    description:
      "Fill out our simple 3-minute form. No credit check, no commitment, no pressure.",
  },
  {
    num: "02",
    title: "Sam Calls You",
    description:
      "Within 1 hour, I'll personally call to discuss your options and find the right vehicle.",
  },
  {
    num: "03",
    title: "Get Approved",
    description:
      "We work with 50+ lenders to get you the best rate — even with challenged credit.",
  },
  {
    num: "04",
    title: "Delivered to Your Door",
    description:
      "Your vehicle is delivered tax-free directly to your community. No dealership trips.",
  },
];

const TRUST_POINTS = [
  {
    icon: "🤝",
    title: "Built on Respect",
    description:
      "We operate with honesty, transparency, and respect for every community we serve. No hidden fees. No surprises.",
  },
  {
    icon: "🏠",
    title: "On-Reserve Delivery",
    description:
      "Your vehicle delivered tax-free directly to your door. Save thousands in HST/QST that you'd pay at a dealership.",
  },
  {
    icon: "📞",
    title: "A Real Person, Not a Bot",
    description:
      "When you apply, Sam Al calls you personally within 1 hour. You're not a number here — you're family.",
  },
  {
    icon: "💳",
    title: "All Credit Welcome",
    description:
      "Bad credit, no credit, new credit — we work with 50+ lenders to find your best option. Over 98.9% approval rate.",
  },
  {
    icon: "🪶",
    title: "Community First",
    description:
      "We support powwows, hockey teams, and community events. A portion of every sale goes back to the communities we serve.",
  },
  {
    icon: "🔒",
    title: "Your Info is Safe",
    description:
      "PIPEDA compliant. Your personal information is encrypted and never shared without your consent.",
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
    <main className="min-h-screen bg-earth-warm">
      {/* Nav */}
      <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-earth-border">
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

      {/* Hero — Full width image with overlay */}
      <section className="relative min-h-[600px] md:min-h-[700px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
            alt="Canadian mountain landscape"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-earth-dark/80 via-earth-dark/60 to-earth-dark/30" />
        </div>

        <div className="max-w-6xl mx-auto px-4 py-20 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-earth-gold/20 border border-earth-gold/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-earth-gold rounded-full animate-pulse" />
              <span className="text-earth-gold text-xs font-semibold tracking-wide uppercase">
                Serving 191+ First Nations Communities
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-white">
              Vehicle financing{" "}
              <span className="text-earth-gold">built for your community</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-4 max-w-xl leading-relaxed">
              Save thousands with tax-exempt on-reserve delivery across Ontario,
              Quebec, New Brunswick, and Nova Scotia.
            </p>
            <div className="mb-8" />
            <div className="flex flex-wrap gap-3">
              <a
                href="#apply"
                className="bg-earth-gold hover:bg-earth-gold/90 text-earth-dark px-8 py-4 rounded-full font-bold text-lg transition shadow-lg shadow-earth-gold/20"
              >
                Get Pre-Approved Free
              </a>
              <a
                href="tel:+16133028872"
                className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg transition"
              >
                📞 613-302-8872
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-earth-forest">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-earth-gold">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-white/80 mt-1 tracking-wide uppercase">
                  {stat.label}
                </div>
                <div className="text-xs text-white/50 mt-0.5">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <p className="text-earth-forest text-sm font-semibold tracking-wider uppercase mb-2">
            Simple Process
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-earth-dark mb-3">
            From Application to Your Driveway
          </h2>
          <p className="text-earth-muted max-w-lg mx-auto">
            Four easy steps. No dealership visits. No hassle.
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {STEPS.map((step, i) => (
            <div key={step.num} className="relative text-center">
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-7 left-[60%] w-[80%] h-[2px] bg-earth-border" />
              )}
              <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-full bg-earth-forest text-white font-bold text-lg mb-4 shadow-lg shadow-earth-forest/20">
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

      {/* Vehicle Types — Visual Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1920&q=80"
            alt="Vehicle on open road"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-earth-dark/80" />
        </div>
        <div className="max-w-6xl mx-auto px-4 py-20 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Find Your Perfect Vehicle
            </h2>
            <p className="text-white/60 max-w-md mx-auto">
              Trucks, SUVs, cars, vans — new and used. We&apos;ll match you
              with the right vehicle for your needs and budget.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "🛻", label: "Trucks", desc: "Perfect for northern roads" },
              { icon: "🚙", label: "SUVs", desc: "Family-ready, all-season" },
              { icon: "🚗", label: "Cars", desc: "Fuel-efficient & reliable" },
              { icon: "🚐", label: "Vans", desc: "Space for the whole crew" },
            ].map((v) => (
              <a
                key={v.label}
                href="#apply"
                className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/20 transition group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {v.icon}
                </div>
                <div className="text-white font-bold">{v.label}</div>
                <div className="text-white/50 text-xs mt-1">{v.desc}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="bg-earth-cream">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-14">
            <p className="text-earth-forest text-sm font-semibold tracking-wider uppercase mb-2">
              Our Promise
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-earth-dark mb-3">
              Why Communities Trust Us
            </h2>
            <p className="text-earth-muted max-w-lg mx-auto">
              We&apos;re not just another lender. We build long-term
              relationships with the communities we serve.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TRUST_POINTS.map((point) => (
              <div
                key={point.title}
                className="bg-white rounded-2xl p-7 shadow-sm border border-earth-border hover:shadow-md hover:-translate-y-1 transition-all"
              >
                <div className="text-3xl mb-4">{point.icon}</div>
                <h3 className="font-bold text-earth-dark text-lg mb-2">
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
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1511497584788-876760111969?w=1920&q=80"
            alt="Northern forest landscape"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-earth-forest/90" />
        </div>
        <div className="max-w-3xl mx-auto px-4 py-20 relative z-10 text-center">
          <div className="w-24 h-24 rounded-full bg-earth-gold/20 border-3 border-earth-gold flex items-center justify-center text-4xl mx-auto mb-6">
            👤
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Meet Sam Al
          </h2>
          <p className="text-earth-gold text-sm mb-6 uppercase tracking-wider font-semibold">
            Your Financing Specialist
          </p>
          <p className="text-white/80 text-lg max-w-lg mx-auto leading-relaxed mb-8">
            &quot;I believe everyone deserves reliable transportation. Whether
            you&apos;re on Six Nations, in Kahnawà:ke, Eskasoni, or Tobique —
            I&apos;ll work personally with you to find the right vehicle at the
            right price. No judgment, no pressure, just honest help.&quot;
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+16133028872"
              className="bg-earth-gold hover:bg-earth-gold/90 text-earth-dark px-8 py-3 rounded-full font-bold transition shadow-lg"
            >
              📞 Call Sam: 613-302-8872
            </a>
            <a
              href="#apply"
              className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-8 py-3 rounded-full font-semibold transition"
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
            <p className="text-earth-forest text-sm font-semibold tracking-wider uppercase mb-2">
              Free &amp; No Credit Impact
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-earth-dark mb-2">
              Get Pre-Approved in 3 Minutes
            </h2>
            <p className="text-earth-muted">
              No commitment. Sam calls you within 1 hour.
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
            We deliver tax-free to 191+ First Nations communities. Find yours
            below.
          </p>
        </div>

        <CommunityAccordion
          provinces={[
            {
              label: "Ontario",
              icon: "🍁",
              color: "text-earth-forest",
              hoverColor:
                "hover:border-earth-forest hover:text-earth-forest",
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
              hoverColor:
                "hover:border-earth-brown hover:text-earth-brown",
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
                <p>
                  📞{" "}
                  <a
                    href="tel:+16133028872"
                    className="hover:text-white transition"
                  >
                    613-302-8872
                  </a>
                </p>
                <p>💬 Text anytime</p>
                <p>⏰ Callbacks within 1 hour</p>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
                Quick Links
              </h4>
              <div className="space-y-2 text-sm">
                <p>
                  <a href="#apply" className="hover:text-white transition">
                    Apply Now
                  </a>
                </p>
                <p>
                  <a
                    href="#communities"
                    className="hover:text-white transition"
                  >
                    Communities
                  </a>
                </p>
                <p>
                  <Link href="/admin" className="hover:text-white transition">
                    Admin
                  </Link>
                </p>
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
