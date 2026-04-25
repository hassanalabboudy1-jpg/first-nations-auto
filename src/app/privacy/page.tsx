import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — First Nation Auto Financing",
  description:
    "How First Nation Auto Financing collects, uses, and protects your personal information under PIPEDA (Canada's Personal Information Protection and Electronic Documents Act).",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-earth-warm">
      <nav className="bg-earth-dark sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">🌿</span>
            <span className="text-lg font-bold text-white tracking-tight">
              First Nation Auto
            </span>
          </Link>
          <a
            href="tel:+16133028872"
            className="text-sm text-white/70 hover:text-white transition"
          >
            📞 613-302-8872
          </a>
        </div>
      </nav>

      <section className="max-w-3xl mx-auto px-4 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-earth-dark mb-3">
          Privacy Policy
        </h1>
        <p className="text-sm text-earth-muted mb-10">
          Last updated: April 2026
        </p>

        <div className="prose prose-earth max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold text-earth-dark mb-3">
              Who we are
            </h2>
            <p className="text-earth-muted leading-relaxed">
              First Nation Auto Financing (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is a vehicle
              financing service for First Nations communities across Ontario,
              Quebec, Manitoba, New Brunswick, Nova Scotia, and Newfoundland &
              Labrador. This policy describes how we handle the personal
              information you share with us when you apply for financing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-earth-dark mb-3">
              What we collect
            </h2>
            <ul className="list-disc pl-6 space-y-1 text-earth-muted leading-relaxed">
              <li>Name, phone number, email address</li>
              <li>Mailing address and First Nations community</li>
              <li>Date of birth and Status Card status (yes/no — we do not store the card itself)</li>
              <li>Employment status, job title, and monthly income range</li>
              <li>Vehicle preference, budget range, and trade-in details</li>
              <li>IP address and basic browser information for security and fraud prevention</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-earth-dark mb-3">
              How we use it
            </h2>
            <p className="text-earth-muted leading-relaxed mb-3">
              We use your information to:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-earth-muted leading-relaxed">
              <li>Match you with appropriate lenders from our network of 50+ Canadian banks and finance companies</li>
              <li>Contact you by phone, SMS, or email to discuss your application</li>
              <li>Verify your eligibility for tax-exempt on-reserve delivery under Section 87 of the Indian Act</li>
              <li>Coordinate vehicle delivery to your community</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-earth-dark mb-3">
              Who we share it with
            </h2>
            <p className="text-earth-muted leading-relaxed">
              When you submit an application and provide consent, we share
              relevant information with our lender partners (which may include
              CIBC, RBC, TD, Bank of Nova Scotia, BMO, National Bank,
              Desjardins, and other Canadian financial institutions and
              specialty auto lenders) for the purpose of evaluating your
              application. We do not sell your personal information. We do not
              share your information for marketing purposes by third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-earth-dark mb-3">
              How long we keep it
            </h2>
            <p className="text-earth-muted leading-relaxed">
              We keep application records for as long as required by Canadian
              federal and provincial law (typically 7 years for financial
              records). Inactive lead records older than 24 months are deleted
              unless we have an ongoing relationship with you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-earth-dark mb-3">
              Your rights under PIPEDA
            </h2>
            <p className="text-earth-muted leading-relaxed mb-3">
              Under Canada&rsquo;s Personal Information Protection and Electronic
              Documents Act (PIPEDA), you have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-earth-muted leading-relaxed">
              <li>Access the personal information we hold about you</li>
              <li>Correct any inaccuracies</li>
              <li>Withdraw your consent at any time</li>
              <li>Have your data deleted (subject to legal retention requirements)</li>
              <li>File a complaint with the Office of the Privacy Commissioner of Canada</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-earth-dark mb-3">
              Security
            </h2>
            <p className="text-earth-muted leading-relaxed">
              All data is transmitted over HTTPS with TLS encryption. Stored
              data is encrypted at rest. Access is restricted to authorized
              staff who need it to process your application. We use industry
              standard practices including multi-factor authentication and
              row-level access controls.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-earth-dark mb-3">
              Cookies and tracking
            </h2>
            <p className="text-earth-muted leading-relaxed">
              We use cookies and pixels for site functionality and to measure
              advertising performance (Facebook Pixel, Google Ads conversion
              tracking). These tools may set cookies on your device. You can
              disable cookies in your browser settings without losing core site
              functionality.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-earth-dark mb-3">
              Contact us
            </h2>
            <p className="text-earth-muted leading-relaxed">
              To exercise any of the rights above, or for any privacy question,
              call us at{" "}
              <a href="tel:+16133028872" className="text-earth-forest font-semibold">
                613-302-8872
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-earth-border">
          <Link
            href="/"
            className="text-sm text-earth-forest hover:text-earth-dark font-semibold"
          >
            &larr; Back to Home
          </Link>
        </div>
      </section>

      <footer className="bg-earth-dark text-white/60 py-10 px-4 mt-10">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/" className="text-white font-bold">
            🌿 First Nation Auto
          </Link>
          <p className="text-xs text-white/30 mt-3">
            &copy; {new Date().getFullYear()} First Nation Auto Financing.
            Serving Ontario, Quebec, Manitoba, New Brunswick, Nova Scotia &
            Newfoundland & Labrador.
          </p>
        </div>
      </footer>
    </main>
  );
}
