import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts } from "@/data/blog-posts";

export const metadata: Metadata = {
  title:
    "Blog | First Nation Auto Financing — Tax Savings, Credit Tips & Vehicle Guides",
  description:
    "Expert articles on tax-free vehicle delivery, auto financing with bad credit, best trucks for reserve roads, and more. Serving 325+ First Nations communities across 6 provinces.",
  keywords: [
    "First Nations auto financing blog",
    "Status Card tax exemption vehicle",
    "bad credit auto loan First Nations",
    "best trucks for reserve roads",
    "on-reserve vehicle delivery guide",
    "Indigenous auto financing tips",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | First Nation Auto Financing",
    description:
      "Expert articles on tax-free vehicle delivery, auto financing tips, and vehicle guides for First Nations communities.",
    type: "website",
    locale: "en_CA",
    siteName: "First Nation Auto Financing",
  },
};

const categoryColors: Record<string, string> = {
  "Tax Savings": "bg-earth-gold/20 text-earth-dark border-earth-gold",
  "Credit Education": "bg-earth-forest/10 text-earth-forest border-earth-forest/30",
  "Vehicle Guide": "bg-earth-red/10 text-earth-red border-earth-red/30",
  "Finance Tips": "bg-earth-sage/15 text-earth-dark border-earth-sage/30",
  "Buyer's Guide": "bg-earth-brown/10 text-earth-brown border-earth-brown/30",
};

export default function BlogPage() {
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
          <div className="flex items-center gap-5">
            <a
              href="tel:+16133028872"
              className="hidden sm:flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition"
            >
              📞 613-302-8872
            </a>
            <Link
              href="/#vehicles"
              className="hidden md:block text-sm text-white/70 hover:text-white transition"
            >
              Vehicles
            </Link>
            <Link
              href="/#how-it-works"
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
              className="hidden md:block text-sm text-white font-semibold transition"
            >
              Blog
            </Link>
            <Link
              href="/apply"
              className="text-sm bg-earth-red hover:bg-red-700 text-white px-5 py-2 rounded-lg font-bold transition"
            >
              APPLY NOW
            </Link>
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
      <section className="bg-earth-dark">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 text-center">
          <p className="text-earth-gold text-sm font-bold tracking-wider uppercase mb-3">
            Resources &amp; Guides
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white uppercase leading-tight">
            The First Nation Auto{" "}
            <span className="text-earth-gold">Blog</span>
          </h1>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto leading-relaxed">
            Expert articles on tax-free vehicle delivery, auto financing tips,
            credit education, and vehicle guides — written for First Nations
            communities across Canada.
          </p>
          <div className="w-20 h-1 bg-earth-red mx-auto mt-6" />
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl border border-earth-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all overflow-hidden"
            >
              {/* Category & Read Time Header */}
              <div className="p-6 pb-0">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full border ${
                      categoryColors[post.category] ||
                      "bg-earth-cream text-earth-dark border-earth-border"
                    }`}
                  >
                    {post.category}
                  </span>
                  <span className="text-xs text-earth-muted">
                    {post.readTime}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 pb-6">
                <h2 className="text-lg font-bold text-earth-dark group-hover:text-earth-red transition leading-snug mb-3">
                  {post.title}
                </h2>
                <p className="text-sm text-earth-muted leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-earth-border">
                  <div className="text-xs text-earth-muted">
                    <span className="font-semibold text-earth-dark">
                      {post.author}
                    </span>{" "}
                    &middot;{" "}
                    {new Date(post.publishedAt).toLocaleDateString("en-CA", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <span className="text-earth-red text-sm font-bold group-hover:translate-x-1 transition-transform">
                    Read &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-earth-dark">
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white uppercase mb-4">
            Ready to Get <span className="text-earth-gold">Started</span>?
          </h2>
          <p className="text-white/60 mb-8 leading-relaxed">
            Apply in 3 minutes. Our team will call you within 1 hour to discuss
            your options — no obligation, no pressure.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/apply"
              className="bg-earth-red hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg uppercase tracking-wide transition shadow-lg shadow-earth-red/30"
            >
              Apply Now
            </Link>
            <a
              href="tel:+16133028872"
              className="bg-earth-gold hover:bg-yellow-500 text-earth-dark px-8 py-4 rounded-lg font-bold text-lg transition"
            >
              📞 613-302-8872
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-earth-dark text-white/60 pt-14 pb-20 md:pb-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <span className="text-xl">🌿</span>
                <span className="text-white font-bold text-lg">
                  First Nation Auto
                </span>
              </Link>
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
                  <Link href="/apply" className="hover:text-white transition">
                    Apply Now
                  </Link>
                </p>
                <p>
                  <Link href="/blog" className="hover:text-white transition">
                    Blog
                  </Link>
                </p>
                <p>
                  <Link
                    href="/#how-it-works"
                    className="hover:text-white transition"
                  >
                    How It Works
                  </Link>
                </p>
                <p>
                  <Link href="/about" className="hover:text-white transition">
                    About Us
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-xs text-white/30 max-w-lg mx-auto leading-relaxed mb-4">
              We acknowledge that we operate on the traditional territories of
              many First Nations, Inuit, and M&eacute;tis peoples. We are
              committed to building respectful relationships with the communities
              we serve.
            </p>
            <p className="text-xs text-white/20">
              &copy; {new Date().getFullYear()} First Nation Auto Financing.
              Serving Ontario, Quebec, Manitoba, New Brunswick &amp; Nova
              Scotia.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
