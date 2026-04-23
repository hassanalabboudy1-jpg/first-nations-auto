import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Referral Program — Earn $500 Per Referral | First Nation Auto Financing",
  description:
    "Refer a friend or family member to First Nation Auto Financing and earn $500 for every approved deal. Help your community get into reliable vehicles.",
};

export default function ReferralPage() {
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
          <div className="inline-block bg-earth-gold/10 border border-earth-gold/30 rounded-full px-6 py-2 mb-6">
            <span className="text-earth-gold text-xs font-bold tracking-[0.2em] uppercase">
              Community Rewards Program
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold uppercase mb-6">
            Earn <span className="text-earth-gold">$500</span> For Every Referral
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-xl mx-auto">
            Know someone who needs a vehicle? Refer them to us and earn $500 cash
            for every approved deal. No limits — the more you refer, the more you earn.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <h2 className="text-2xl font-bold text-earth-dark uppercase text-center mb-12">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              num: "01",
              title: "Refer Someone",
              desc: "Tell your friend, family member, or community member about us. Share our website or have them mention your name when they apply.",
            },
            {
              num: "02",
              title: "They Get Approved",
              desc: "Your referral fills out our 3-minute application. We match them with the best lender from our network of 50+ partners. 98.9% get approved.",
            },
            {
              num: "03",
              title: "You Get Paid",
              desc: "Once the deal is funded and the vehicle is delivered, you receive $500 cash. No limits on how many people you can refer.",
            },
          ].map((step) => (
            <div key={step.num} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-earth-red text-white font-bold text-xl mb-5">
                {step.num}
              </div>
              <h3 className="font-bold text-lg mb-2 text-earth-dark">{step.title}</h3>
              <p className="text-sm text-earth-muted leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Earnings Calculator */}
      <section className="bg-earth-dark text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold uppercase mb-8">
            Your Earning <span className="text-earth-gold">Potential</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { referrals: "2", earnings: "$1,000" },
              { referrals: "5", earnings: "$2,500" },
              { referrals: "10", earnings: "$5,000" },
              { referrals: "20", earnings: "$10,000" },
            ].map((r) => (
              <div
                key={r.referrals}
                className="bg-white/5 border border-white/10 rounded-xl p-5"
              >
                <p className="text-3xl font-bold text-earth-gold">{r.earnings}</p>
                <p className="text-xs text-white/50 mt-1">{r.referrals} referrals</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Refer */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-earth-dark uppercase text-center mb-10">
          Why Refer Through Us
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              icon: "💰",
              title: "Real Cash, Not Gift Cards",
              desc: "$500 per approved referral, paid directly to you. No points, no conditions, no fine print.",
            },
            {
              icon: "🤝",
              title: "Help Your Community",
              desc: "Every referral helps someone in your community get into a reliable vehicle with fair financing and tax savings.",
            },
            {
              icon: "♾️",
              title: "No Limits",
              desc: "Refer as many people as you want. Some of our community ambassadors earn thousands every month.",
            },
            {
              icon: "⚡",
              title: "Fast Payment",
              desc: "Once the deal closes and the vehicle is delivered, your $500 is on its way. No waiting months.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white border border-earth-border rounded-xl p-6 flex gap-4"
            >
              <span className="text-3xl flex-shrink-0">{item.icon}</span>
              <div>
                <h3 className="font-bold text-earth-dark mb-1">{item.title}</h3>
                <p className="text-sm text-earth-muted leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-earth-cream py-16">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-earth-dark uppercase mb-4">
            Ready to Start Earning?
          </h2>
          <p className="text-earth-muted mb-6">
            Call us to register as a referral partner, or simply have your referral
            mention your name when they apply.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+16133028872"
              className="bg-earth-gold hover:bg-yellow-500 text-earth-dark px-8 py-4 rounded-lg font-bold text-lg transition"
            >
              📞 Call 613-302-8872
            </a>
            <Link
              href="/#apply"
              className="bg-earth-red hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg uppercase transition"
            >
              Apply Now
            </Link>
          </div>
          <p className="text-xs text-earth-muted mt-4">
            Referral bonus is paid after the referred applicant&apos;s deal is funded
            and the vehicle is delivered. Subject to our referral program terms.
          </p>
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
