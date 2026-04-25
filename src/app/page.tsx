import Link from "next/link";
import Image from "next/image";
import { LeadForm } from "@/components/LeadForm";
import { CommunityAccordion } from "@/components/CommunityAccordion";
import { PaymentCalculator } from "@/components/PaymentCalculator";
import { FAQ } from "@/components/FAQ";
import { faqs } from "@/data/faqs";
import { ALL_COMMUNITIES } from "@/data/communities";

export default function HomePage() {
  const ontarioCommunities = ALL_COMMUNITIES.filter((c) => c.province === "ON");
  const quebecCommunities = ALL_COMMUNITIES.filter((c) => c.province === "QC");
  const manitobaCommunities = ALL_COMMUNITIES.filter((c) => c.province === "MB");
  const newBrunswickCommunities = ALL_COMMUNITIES.filter((c) => c.province === "NB");
  const novaScotiaCommunities = ALL_COMMUNITIES.filter((c) => c.province === "NS");
  const newfoundlandCommunities = ALL_COMMUNITIES.filter((c) => c.province === "NL");

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
            <Link
              href="/about"
              className="hidden md:block text-sm text-white/70 hover:text-white transition"
            >
              About
            </Link>
            <Link
              href="/blog"
              className="hidden md:block text-sm text-white/70 hover:text-white transition"
            >
              Blog
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
            <div className="mb-6" />
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] mb-6 text-white uppercase">
              Get The Keys To{" "}
              <span className="text-earth-gold">Your Dream Car</span>
            </h1>
            <p className="text-lg text-white/70 mb-8 max-w-lg leading-relaxed">
              100% tax-free on-reserve delivery with your Status Card.
              All credit welcome. 50+ lenders. We call you within 1 hour.
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
                📞 Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-earth-dark border-y-4 border-earth-gold">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {[
              { value: "325+", label: "Communities", sub: "ON, QC, MB, NB, NS & NL" },
              { value: "100%", label: "Tax Savings", sub: "HST exempt with Status Card" },
              { value: "$0", label: "Down Payment", sub: "Drive today" },
              { value: "50+", label: "Lenders", sub: "Rates from 0% OAC" },
              { value: "500+", label: "Vehicles Delivered", sub: "And counting" },
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
            Trucks, SUVs, Cars &amp; Minivans
          </h2>
          <p className="text-earth-muted mt-3 max-w-lg mx-auto">
            From brand new to quality pre-owned — we match you with the right
            vehicle for your budget and lifestyle.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              icon: "🛻",
              label: "Trucks",
              desc: "Built for northern roads",
              img: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=600&q=80",
            },
            {
              icon: "🚙",
              label: "SUVs & Minivans",
              desc: "Family-ready, all-season",
              img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80",
            },
            {
              icon: "🚗",
              label: "Cars",
              desc: "Fuel-efficient & reliable",
              img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80",
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
                title: "The Financial Specialist Calls You",
                desc: "Within 1 hour, a specialist personally calls to discuss your options.",
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

      {/* Why Trust Us — Premium Section */}
      <section className="relative overflow-hidden bg-earth-dark">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-5">
          <Image
            src="https://images.unsplash.com/photo-1511497584788-876760111969?w=1920&q=60"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 py-24 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block bg-earth-gold/10 border border-earth-gold/30 rounded-full px-6 py-2 mb-6">
              <span className="text-earth-gold text-xs font-bold tracking-[0.2em] uppercase">
                The First Nation Auto Promise
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white uppercase leading-tight">
              Why 325+ Communities{" "}
              <span className="text-earth-gold">Trust Us</span>
            </h2>
            <div className="w-20 h-1 bg-earth-red mx-auto mt-6" />
          </div>

          {/* Top row — 3 big feature cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {[
              {
                stat: "98.9%",
                title: "Approval Rate",
                desc: "Bad credit, no credit, bankruptcy, consumer proposal — we work with 50+ lenders who compete for your business. Almost everyone gets approved.",
                accent: "border-earth-red",
                statColor: "text-earth-red",
              },
              {
                stat: "100%",
                title: "Tax Savings",
                desc: "With your Status Card, save every dollar of HST on your vehicle purchase. On a $40,000 vehicle, that's up to $6,000+ back in your pocket.",
                accent: "border-earth-gold",
                statColor: "text-earth-gold",
              },
              {
                stat: "1 HR",
                title: "Callback Guarantee",
                desc: "When you apply, a real financial specialist calls you within 1 hour — not a robot, not tomorrow, not next week. We respect your time.",
                accent: "border-earth-sage",
                statColor: "text-earth-sage",
              },
            ].map((card) => (
              <div
                key={card.title}
                className={`bg-white/5 backdrop-blur-sm rounded-2xl p-8 border-t-4 ${card.accent} hover:bg-white/10 transition-all group`}
              >
                <div className={`text-5xl font-bold ${card.statColor} mb-3`}>
                  {card.stat}
                </div>
                <h3 className="text-white font-bold text-xl mb-3 uppercase tracking-wide">
                  {card.title}
                </h3>
                <p className="text-white/60 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom row — 3 supporting cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🏠",
                title: "Free On-Reserve Delivery",
                desc: "Your vehicle delivered directly to your community — no dealership trips, no extra charges. We come to you, anywhere across 6 provinces.",
              },
              {
                icon: "🤝",
                title: "Transparent & Honest",
                desc: "We explain every detail of your loan upfront. No hidden fees, no bait-and-switch. What we quote is what you pay. Built on respect.",
              },
              {
                icon: "🔒",
                title: "Your Privacy, Protected",
                desc: "PIPEDA compliant. 256-bit encryption. Your personal and financial information is never shared without your explicit consent.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-7 border border-white/10 hover:border-earth-gold/30 hover:bg-white/10 transition-all"
              >
                <div className="text-3xl mb-4">{card.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2 uppercase tracking-wide">
                  {card.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-14">
            <a
              href="#apply"
              className="inline-block bg-earth-red hover:bg-red-700 text-white px-12 py-4 rounded-lg font-bold text-lg uppercase tracking-wider transition shadow-lg shadow-earth-red/20"
            >
              Get Pre-Approved Now
            </a>
            <p className="text-white/30 text-xs mt-4">
              Takes 3 minutes. No obligation. 100% secure.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-earth-cream">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-14">
            <p className="text-earth-red text-sm font-bold tracking-wider uppercase mb-2">
              Real Stories, Real Results
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-earth-dark uppercase">
              What Our <span className="text-earth-gold">Customers</span> Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Michael T.",
                community: "Six Nations, ON",
                vehicle: "2024 RAM 1500",
                quote: "I was turned down by 3 dealerships because of my credit. First Nation Auto got me approved in 2 days with a payment I can actually afford. Truck was delivered right to my door on the reserve.",
                rating: 5,
              },
              {
                name: "Sarah W.",
                community: "Kahnawà:ke, QC",
                vehicle: "2023 Toyota RAV4",
                quote: "The tax savings alone saved me over $6,000. The whole process was easy — I filled out the form, got a call within an hour, and had my SUV delivered the next week. No pressure at all.",
                rating: 5,
              },
              {
                name: "James R.",
                community: "Peguis, MB",
                vehicle: "2023 Ford F-150",
                quote: "Coming from a remote community, I thought financing would be impossible. They worked with my situation, got me a fair rate, and delivered the truck right to Peguis. Highly recommend.",
                rating: 5,
              },
            ].map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl p-7 border border-earth-border shadow-sm hover:shadow-md transition"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="text-earth-gold text-lg">★</span>
                  ))}
                </div>
                <p className="text-earth-text leading-relaxed mb-5 text-sm">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="border-t border-earth-border pt-4">
                  <p className="font-bold text-earth-dark text-sm">{t.name}</p>
                  <p className="text-xs text-earth-muted">{t.community}</p>
                  <p className="text-xs text-earth-forest font-semibold mt-1">{t.vehicle}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <div className="inline-flex items-center gap-3 bg-earth-dark/5 rounded-full px-6 py-3">
              <span className="text-earth-gold text-lg font-bold">★ 4.9/5</span>
              <span className="text-sm text-earth-muted">Based on customer feedback</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Lender Partners */}
      <section className="bg-white border-y border-earth-border">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <p className="text-center text-xs text-earth-muted font-bold tracking-wider uppercase mb-6">
            Trusted By Canada&apos;s Leading Lenders
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-earth-muted/40">
            {["TD Auto Finance", "Bank of Nova Scotia", "RBC Auto Lending", "CIBC Auto Finance", "National Bank", "BMO Auto", "Desjardins"].map((lender) => (
              <span key={lender} className="text-sm font-bold tracking-wide text-earth-forest uppercase">
                {lender}
              </span>
            ))}
          </div>
          <p className="text-center text-[10px] text-earth-muted/50 mt-4">
            50+ lender partners competing for your best rate
          </p>
        </div>
      </section>

      {/* Community Story */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Image */}
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/indigenous-family.jpg"
                alt="Indigenous family with their new vehicle"
                fill
                className="object-cover"
              />
            </div>
            {/* Text */}
            <div>
              <p className="text-earth-red text-sm font-bold tracking-wider uppercase mb-3">
                Our Community, Our Strength
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-earth-dark uppercase leading-tight mb-6">
                Driving Our Communities{" "}
                <span className="text-earth-gold">Forward</span>
              </h2>
              <p className="text-earth-muted text-lg leading-relaxed mb-4">
                For too long, First Nations communities have been underserved by
                traditional lenders and dealerships. We&apos;re here to change
                that.
              </p>
              <p className="text-earth-muted leading-relaxed mb-4">
                Every family deserves reliable transportation — whether it&apos;s
                getting to work, driving your kids to school, or making the trip
                to see loved ones. With on-reserve delivery and 100% tax savings
                with your Status Card, we make vehicle ownership accessible and
                affordable.
              </p>
              <p className="text-earth-muted leading-relaxed mb-8">
                We&apos;re not just financing vehicles — we&apos;re building
                trust, one community at a time. From Six Nations to Peguis, from
                Kahnawà:ke to Eskasoni, we&apos;re proud to serve 325+ First
                Nations communities across 6 provinces.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#apply"
                  className="bg-earth-red hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg uppercase transition"
                >
                  Apply Now
                </a>
                <a
                  href="tel:+16133028872"
                  className="bg-earth-gold hover:bg-yellow-500 text-earth-dark px-8 py-4 rounded-lg font-bold text-lg transition"
                >
                  📞 613-302-8872
                </a>
              </div>
            </div>
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
              No commitment. We call you within 1 hour.
            </p>
          </div>
          <LeadForm />
        </div>
      </section>

      {/* Payment Calculator */}
      <section className="bg-earth-dark">
        <div className="max-w-3xl mx-auto px-4 py-20">
          <div className="text-center mb-10">
            <p className="text-earth-gold text-sm font-bold tracking-wider uppercase mb-2">
              Estimate Your Payment
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white uppercase">
              Payment Calculator
            </h2>
            <p className="text-white/50 mt-2 text-sm">
              See what your monthly payments could look like. No commitment.
            </p>
          </div>
          <PaymentCalculator />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-earth-warm">
        <div className="max-w-3xl mx-auto px-4 py-20">
          <div className="text-center mb-10">
            <p className="text-earth-red text-sm font-bold tracking-wider uppercase mb-2">
              Common Questions
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-earth-dark uppercase">
              Frequently Asked <span className="text-earth-gold">Questions</span>
            </h2>
          </div>
          <FAQ />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: faqs.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              }),
            }}
          />
        </div>
      </section>

      {/* Communities */}
      <section id="communities" className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-earth-dark mb-2">
            Communities We Serve
          </h2>
          <p className="text-sm text-earth-muted">
            Tax-free delivery to 325+ First Nations communities across 6
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
            {
              label: "Newfoundland & Labrador",
              icon: "🏔️",
              color: "text-earth-forest",
              hoverColor:
                "hover:border-earth-forest hover:text-earth-forest",
              communities: newfoundlandCommunities,
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
                Brunswick, Nova Scotia, and Newfoundland.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
                Contact Us
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
                <p>
                  <Link href="/about" className="hover:text-white transition">
                    About Us
                  </Link>
                </p>
                <p>
                  <Link href="/blog" className="hover:text-white transition">
                    Blog
                  </Link>
                </p>
                <p>
                  <Link href="/referral" className="hover:text-white transition">
                    Refer &amp; Earn $500
                  </Link>
                </p>
                <p>
                  <Link href="/privacy" className="hover:text-white transition">
                    Privacy Policy
                  </Link>
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
              Serving Ontario, Quebec, Manitoba, New Brunswick, Nova Scotia
              &amp; Newfoundland &amp; Labrador.
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
