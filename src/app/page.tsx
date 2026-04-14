import Link from "next/link";
import Image from "next/image";
import { LeadForm } from "@/components/LeadForm";
import { CommunityAccordion } from "@/components/CommunityAccordion";
import { ALL_COMMUNITIES } from "@/data/communities";

export default function HomePage() {
  const ontarioCommunities = ALL_COMMUNITIES.filter((c) => c.province === "ON");
  const quebecCommunities = ALL_COMMUNITIES.filter((c) => c.province === "QC");
  const manitobaCommunities = ALL_COMMUNITIES.filter((c) => c.province === "MB");
  const newBrunswickCommunities = ALL_COMMUNITIES.filter((c) => c.province === "NB");
  const novaScotiaCommunities = ALL_COMMUNITIES.filter((c) => c.province === "NS");

  return (
    <main className="min-h-screen bg-earth-warm">
      {/* Nav */}
      <nav className="bg-earth-dark sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌿</span>
            <span className="text-lg font-bold text-white tracking-tight">
              First Nation Auto
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="tel:+16133028872"
              className="hidden sm:flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition"
            >
              📞 613-302-8872
            </a>
            <Link
              href="#vehicles"
              className="hidden md:block text-sm text-white/70 hover:text-white transition"
            >
              Vehicles
            </Link>
            <Link
              href="#how-it-works"
              className="hidden md:block text-sm text-white/70 hover:text-white transition"
            >
              How It Works
            </Link>
            <a
              href="#apply"
              className="text-sm bg-earth-red hover:bg-red-700 text-white px-5 py-2 rounded-lg font-bold transition"
            >
              APPLY NOW
            </a>
          </div>
        </div>
        {/* Trust banner */}
        <div className="bg-earth-gold">
          <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-xs font-semibold text-earth-dark">
            <span>✅ 98.9% Approval Rate</span>
            <span>🏠 Free On-Reserve Delivery</span>
            <span>💰 $0 Down Payment</span>
            <span>📞 1-Hour Callback</span>
            <span>🔒 100% Secure</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[650px] md:min-h-[750px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1549317661-bd32c8ce0637?w=1920&q=80"
            alt="Pickup truck on open road"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-earth-dark via-earth-dark/85 to-earth-dark/40" />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16 relative z-10 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-earth-red/20 border border-earth-red/40 rounded-lg px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-earth-red rounded-full animate-pulse" />
              <span className="text-earth-red text-xs font-bold tracking-wider uppercase">
                Now Serving 248+ First Nations Communities
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] mb-6 text-white uppercase">
              Get The Keys To{" "}
              <span className="text-earth-gold">Your Dream Car</span>
            </h1>
            <p className="text-lg text-white/70 mb-8 max-w-lg leading-relaxed">
              100% tax-free on-reserve delivery with your Status Card.
              All credit welcome. 50+ lenders. Sam calls you within 1 hour.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#apply"
                className="bg-earth-red hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg uppercase tracking-wide transition shadow-lg shadow-earth-red/30"
              >
                Apply Now — 3 Minutes
              </a>
              <a
                href="tel:+16133028872"
                className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg transition"
              >
                📞 Call Sam
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-earth-dark border-y-4 border-earth-gold">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "248+", label: "Communities", sub: "ON, QC, MB, NB & NS" },
              { value: "100%", label: "Tax Savings", sub: "HST exempt with Status Card" },
              { value: "$0", label: "Down Payment", sub: "Drive today" },
              { value: "50+", label: "Lenders", sub: "Best rate guaranteed" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-earth-gold">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-white mt-1 uppercase tracking-wider">
                  {stat.label}
                </div>
                <div className="text-xs text-white/50 mt-0.5">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Showcase */}
      <section id="vehicles" className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <p className="text-earth-red text-sm font-bold tracking-wider uppercase mb-2">
            Find Your Perfect Ride
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-earth-dark uppercase">
            Trucks, SUVs, Cars &amp; More
          </h2>
          <p className="text-earth-muted mt-3 max-w-lg mx-auto">
            From brand new to quality pre-owned — we match you with the right
            vehicle for your budget and lifestyle.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            {
              icon: "🛻",
              label: "Trucks",
              desc: "Built for northern roads",
              img: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=600&q=80",
            },
            {
              icon: "🚙",
              label: "SUVs",
              desc: "Family-ready, all-season",
              img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80",
            },
            {
              icon: "🚗",
              label: "Cars",
              desc: "Fuel-efficient & reliable",
              img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80",
            },
            {
              icon: "🚐",
              label: "Vans",
              desc: "Space for the whole crew",
              img: "https://images.unsplash.com/photo-1564694202883-46e7571e622e?w=600&q=80",
            },
          ].map((v) => (
            <a
              key={v.label}
              href="#apply"
              className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="relative h-48 md:h-56">
                <Image
                  src={v.img}
                  alt={v.label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-earth-dark/90 via-earth-dark/30 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="text-white font-bold text-lg">{v.label}</div>
                <div className="text-white/60 text-xs">{v.desc}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-earth-dark text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-14">
            <p className="text-earth-gold text-sm font-bold tracking-wider uppercase mb-2">
              Simple 4-Step Process
            </p>
            <h2 className="text-3xl md:text-5xl font-bold uppercase">
              How It Works
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                num: "01",
                title: "Apply Online",
                desc: "Fill out our simple 3-minute form. No commitment, no pressure.",
              },
              {
                num: "02",
                title: "Sam Calls You",
                desc: "Within 1 hour, I personally call to discuss your options.",
              },
              {
                num: "03",
                title: "Get Approved",
                desc: "50+ lenders compete for your business — even with challenged credit.",
              },
              {
                num: "04",
                title: "Delivered Tax-Free",
                desc: "Vehicle delivered to your door on-reserve. No dealership trips.",
              },
            ].map((step, i) => (
              <div key={step.num} className="relative text-center">
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-earth-gold/20" />
                )}
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-earth-red text-white font-bold text-xl mb-5">
                  {step.num}
                </div>
                <h3 className="font-bold text-lg mb-2 text-earth-gold">
                  {step.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a
              href="#apply"
              className="inline-block bg-earth-red hover:bg-red-700 text-white px-10 py-4 rounded-lg font-bold text-lg uppercase tracking-wide transition"
            >
              Start Your Application
            </a>
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <p className="text-earth-red text-sm font-bold tracking-wider uppercase mb-2">
            Our Promise To You
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-earth-dark uppercase">
            Why Communities Trust Us
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: "🤝",
              title: "Built on Respect",
              desc: "Honest, transparent, and respectful. No hidden fees. No surprises. We explain every detail of your loan.",
            },
            {
              icon: "🏠",
              title: "On-Reserve Delivery",
              desc: "Vehicle delivered tax-free to your door. Save thousands in HST that you'd pay at any dealership.",
            },
            {
              icon: "📞",
              title: "Talk to Sam, Not a Bot",
              desc: "When you apply, Sam Al calls you personally within 1 hour. You're not a number — you're family.",
            },
            {
              icon: "💳",
              title: "All Credit Welcome",
              desc: "Bad credit, no credit, bankruptcy — 50+ lenders compete for you. 98.9% approval rate.",
            },
            {
              icon: "🪶",
              title: "Community First",
              desc: "We support powwows, hockey teams, and community events. We give back to the communities we serve.",
            },
            {
              icon: "🔒",
              title: "Your Info is Safe",
              desc: "PIPEDA compliant. Your information is encrypted and never shared without your consent.",
            },
          ].map((p) => (
            <div
              key={p.title}
              className="bg-white rounded-2xl p-7 border border-earth-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="text-3xl mb-4">{p.icon}</div>
              <h3 className="font-bold text-earth-dark text-lg mb-2">
                {p.title}
              </h3>
              <p className="text-sm text-earth-muted leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Meet Sam — CTA banner */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1511497584788-876760111969?w=1920&q=80"
            alt="Northern forest"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-earth-dark/90" />
        </div>
        <div className="max-w-4xl mx-auto px-4 py-20 relative z-10 text-center">
          <div className="w-24 h-24 rounded-full bg-earth-gold/20 border-4 border-earth-gold flex items-center justify-center text-4xl mx-auto mb-6">
            👤
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white uppercase mb-2">
            Meet Sam Al
          </h2>
          <p className="text-earth-gold text-sm uppercase tracking-wider font-bold mb-6">
            Your Dedicated Financing Specialist
          </p>
          <p className="text-white/70 text-lg max-w-xl mx-auto leading-relaxed mb-8">
            &quot;I believe everyone deserves reliable transportation. Whether
            you&apos;re on Six Nations, in Kahnawà:ke, Peguis, Eskasoni, or
            Tobique — I&apos;ll work with you personally. No judgment. No
            pressure. Just honest help.&quot;
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+16133028872"
              className="bg-earth-gold hover:bg-yellow-500 text-earth-dark px-8 py-4 rounded-lg font-bold text-lg transition shadow-lg"
            >
              📞 Call Sam: 613-302-8872
            </a>
            <a
              href="#apply"
              className="bg-earth-red hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg uppercase transition"
            >
              Apply Now
            </a>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="bg-earth-cream">
        <div className="max-w-xl mx-auto px-4 py-20">
          <div className="text-center mb-8">
            <p className="text-earth-red text-sm font-bold tracking-wider uppercase mb-2">
              Free &amp; Secure Application
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-earth-dark uppercase">
              Get Pre-Approved in 3 Minutes
            </h2>
            <p className="text-earth-muted mt-2">
              No commitment. Sam calls you within 1 hour.
            </p>
          </div>
          <LeadForm />
        </div>
      </section>

      {/* Communities */}
      <section id="communities" className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-earth-dark mb-2">
            Communities We Serve
          </h2>
          <p className="text-sm text-earth-muted">
            Tax-free delivery to 248+ First Nations communities across 5
            provinces.
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
              label: "Manitoba",
              icon: "🦬",
              color: "text-earth-brown",
              hoverColor:
                "hover:border-earth-brown hover:text-earth-brown",
              communities: manitobaCommunities,
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
      <footer className="bg-earth-dark text-white/60 pt-14 pb-20 md:pb-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">🌿</span>
                <span className="text-white font-bold text-lg">
                  First Nation Auto
                </span>
              </div>
              <p className="text-sm leading-relaxed">
                Vehicle financing built for First Nations communities. Tax-free
                on-reserve delivery across Ontario, Quebec, Manitoba, New
                Brunswick, and Nova Scotia.
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
                  <a href="#how-it-works" className="hover:text-white transition">
                    How It Works
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-xs text-white/30 max-w-lg mx-auto leading-relaxed mb-4">
              We acknowledge that we operate on the traditional territories of
              many First Nations, Inuit, and Métis peoples. We are committed to
              building respectful relationships with the communities we serve.
            </p>
            <p className="text-xs text-white/20">
              &copy; {new Date().getFullYear()} First Nation Auto Financing.
              Serving Ontario, Quebec, Manitoba, New Brunswick &amp; Nova
              Scotia.
            </p>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-earth-dark/95 backdrop-blur-md border-t border-earth-gold/30 px-4 py-3 z-50">
        <div className="flex gap-2">
          <a
            href="tel:+16133028872"
            className="flex-1 bg-earth-gold text-earth-dark text-center py-3 rounded-lg font-bold text-sm transition"
          >
            📞 Call Sam
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
