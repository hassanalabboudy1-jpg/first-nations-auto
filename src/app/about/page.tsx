import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us — First Nation Auto Financing",
  description:
    "Learn about First Nation Auto Financing — serving 248+ First Nations communities across Ontario, Quebec, Manitoba, New Brunswick, and Nova Scotia with tax-free on-reserve vehicle delivery.",
};

export default function AboutPage() {
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
              className="text-sm text-white/70 hover:text-white transition hidden sm:block"
            >
              📞 613-302-8872
            </a>
            <Link
              href="/#apply"
              className="text-sm bg-earth-red hover:bg-red-700 text-white px-5 py-2 rounded-lg font-bold transition"
            >
              APPLY NOW
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-earth-dark text-white py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-earth-gold text-sm font-bold tracking-wider uppercase mb-3">
            Our Story
          </p>
          <h1 className="text-4xl md:text-5xl font-bold uppercase mb-6">
            About First Nation <span className="text-earth-gold">Auto Financing</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed">
            We exist for one reason: to make vehicle financing accessible, fair, and
            transparent for First Nations communities across Canada.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-earth-dark uppercase mb-6">
          Why We Started This
        </h2>
        <div className="space-y-4 text-earth-muted leading-relaxed">
          <p>
            For too long, First Nations communities have been underserved by traditional
            auto lenders and dealerships. Families on reserves face unique challenges —
            limited local dealership access, confusing tax exemption processes, predatory
            lending practices, and credit barriers that mainstream financing ignores.
          </p>
          <p>
            We built First Nation Auto Financing to change that. We connect First Nations
            applicants across Ontario, Quebec, Manitoba, New Brunswick, and Nova Scotia with
            a network of 50+ lenders who compete for your business — so you get the best
            rate, not the only rate.
          </p>
          <p>
            Every vehicle is delivered tax-free directly to your community with your Status
            Card. No dealership trips. No hidden fees. No pressure.
          </p>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="bg-earth-dark text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold uppercase mb-10 text-center">
            What Makes Us <span className="text-earth-gold">Different</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Community-First Approach",
                desc: "We serve 248+ First Nations communities by name. We know your community, your province, and the unique financing options available to you. This isn't one-size-fits-all.",
              },
              {
                title: "100% Tax Savings",
                desc: "With your Status Card, you pay zero HST on your vehicle. On a $40,000 vehicle, that's up to $6,000+ saved. We handle all the paperwork so you don't have to.",
              },
              {
                title: "All Credit Welcome",
                desc: "Bad credit, no credit, bankruptcy, consumer proposal — our 50+ lender network means we can find financing for almost anyone. 98.9% of applicants get approved.",
              },
              {
                title: "Free On-Reserve Delivery",
                desc: "Your vehicle is delivered directly to your community at no extra cost. From Six Nations to Peguis to Eskasoni — wherever you are, we come to you.",
              },
              {
                title: "1-Hour Callback Guarantee",
                desc: "When you apply, a real financial specialist calls you within 1 hour. Not a robot. Not next week. We respect your time and take every application seriously.",
              },
              {
                title: "Transparent & Honest",
                desc: "We explain every detail of your financing upfront. No hidden fees, no bait-and-switch, no predatory terms. What we quote is what you pay.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white/5 border border-white/10 rounded-xl p-6"
              >
                <h3 className="text-earth-gold font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-earth-dark uppercase mb-6">
          Our Commitment to You
        </h2>
        <div className="space-y-4 text-earth-muted leading-relaxed">
          <p>
            We are a vehicle financing service that partners with dealerships who
            specifically serve First Nations communities. We are committed to operating
            with full transparency, cultural respect, and honest business practices.
          </p>
          <p>
            We will never use predatory lending terms. We will never pressure you into
            a deal. We will never share your information without your explicit consent.
            Your trust is everything to us — and we earn it one community at a time.
          </p>
          <p>
            Your personal and financial information is protected under PIPEDA
            (Canada&apos;s federal privacy law) and encrypted with 256-bit SSL security.
          </p>
        </div>
      </section>

      {/* Coverage */}
      <section className="bg-earth-cream py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-earth-dark uppercase mb-8">
            Communities We Serve
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { province: "Ontario", count: "125", icon: "🍁" },
              { province: "Quebec", count: "38", icon: "⚜️" },
              { province: "Manitoba", count: "57", icon: "🦬" },
              { province: "New Brunswick", count: "15", icon: "🌊" },
              { province: "Nova Scotia", count: "13", icon: "🦞" },
            ].map((p) => (
              <div
                key={p.province}
                className="bg-white rounded-xl p-5 border border-earth-border"
              >
                <span className="text-2xl">{p.icon}</span>
                <p className="font-bold text-earth-dark text-lg mt-2">{p.count}</p>
                <p className="text-xs text-earth-muted">{p.province}</p>
              </div>
            ))}
          </div>
          <p className="text-earth-muted text-sm mt-6">
            248+ First Nations communities across 5 provinces
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-earth-dark uppercase mb-4">
          Get In Touch
        </h2>
        <p className="text-earth-muted mb-6">
          Questions? We&apos;re here to help. Call us anytime or apply online.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="tel:+16133028872"
            className="bg-earth-gold hover:bg-yellow-500 text-earth-dark px-8 py-4 rounded-lg font-bold text-lg transition"
          >
            📞 613-302-8872
          </a>
          <Link
            href="/#apply"
            className="bg-earth-red hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg uppercase transition"
          >
            Apply Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-earth-dark text-white/60 py-10 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Link href="/" className="text-white font-bold">
            🌿 First Nation Auto
          </Link>
          <p className="text-xs text-white/30 mt-3">
            Serving 248+ First Nations communities across Ontario, Quebec, Manitoba,
            New Brunswick &amp; Nova Scotia.
          </p>
          <p className="text-xs text-white/20 mt-3">
            &copy; {new Date().getFullYear()} First Nation Auto Financing.
          </p>
        </div>
      </footer>
    </main>
  );
}
