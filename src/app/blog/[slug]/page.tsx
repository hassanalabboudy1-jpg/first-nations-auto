import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts } from "@/data/blog-posts";
import { notFound } from "next/navigation";

// Generate static paths for all blog posts
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate SEO metadata for each blog post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Article Not Found | First Nation Auto Blog",
    };
  }

  return {
    title: `${post.title} | First Nation Auto Blog`,
    description: post.excerpt,
    keywords: [
      post.category,
      "First Nations auto financing",
      "Status Card tax exemption",
      "on-reserve vehicle delivery",
      "Indigenous auto financing",
    ],
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      locale: "en_CA",
      siteName: "First Nation Auto Financing",
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
  };
}

const categoryColors: Record<string, string> = {
  "Tax Savings": "bg-earth-gold/20 text-earth-dark border-earth-gold",
  "Credit Education":
    "bg-earth-forest/10 text-earth-forest border-earth-forest/30",
  "Vehicle Guide": "bg-earth-red/10 text-earth-red border-earth-red/30",
  "Finance Tips": "bg-earth-sage/15 text-earth-dark border-earth-sage/30",
  "Buyer's Guide":
    "bg-earth-brown/10 text-earth-brown border-earth-brown/30",
};

function renderContent(content: string) {
  // Split content into paragraphs and headings
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith("### ")) {
      elements.push(
        <h3
          key={key++}
          className="text-xl font-bold text-earth-dark mt-8 mb-3"
        >
          {trimmed.replace("### ", "")}
        </h3>
      );
    } else if (trimmed.startsWith("## ")) {
      elements.push(
        <h2
          key={key++}
          className="text-2xl font-bold text-earth-dark mt-10 mb-4 pb-2 border-b border-earth-border"
        >
          {trimmed.replace("## ", "")}
        </h2>
      );
    } else if (trimmed.startsWith("- **")) {
      // Bold list item
      const match = trimmed.match(/^- \*\*(.+?)\*\*\.?\s*(.*)$/);
      if (match) {
        elements.push(
          <li key={key++} className="ml-6 mb-2 text-earth-muted leading-relaxed list-disc">
            <span className="font-bold text-earth-dark">{match[1]}.</span>{" "}
            {match[2]}
          </li>
        );
      } else {
        elements.push(
          <li key={key++} className="ml-6 mb-2 text-earth-muted leading-relaxed list-disc">
            {trimmed.replace("- ", "")}
          </li>
        );
      }
    } else if (trimmed.startsWith("- ")) {
      elements.push(
        <li key={key++} className="ml-6 mb-2 text-earth-muted leading-relaxed list-disc">
          {trimmed.replace("- ", "")}
        </li>
      );
    } else if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
      // Bold standalone line (like a sub-heading)
      elements.push(
        <p key={key++} className="font-bold text-earth-dark mt-6 mb-2">
          {trimmed.replace(/\*\*/g, "")}
        </p>
      );
    } else if (trimmed.startsWith("**")) {
      // Paragraph starting with bold
      const parts = trimmed.split("**");
      elements.push(
        <p key={key++} className="text-earth-muted leading-relaxed mb-4">
          {parts.map((part, i) =>
            i % 2 === 1 ? (
              <strong key={i} className="text-earth-dark">
                {part}
              </strong>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </p>
      );
    } else {
      // Regular paragraph
      // Handle inline bold
      const hasBold = trimmed.includes("**");
      if (hasBold) {
        const parts = trimmed.split("**");
        elements.push(
          <p key={key++} className="text-earth-muted leading-relaxed mb-4">
            {parts.map((part, i) =>
              i % 2 === 1 ? (
                <strong key={i} className="text-earth-dark">
                  {part}
                </strong>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </p>
        );
      } else {
        elements.push(
          <p key={key++} className="text-earth-muted leading-relaxed mb-4">
            {trimmed}
          </p>
        );
      }
    }
  }

  return elements;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Get related articles (same category first, then others, excluding current)
  const related = [
    ...blogPosts.filter(
      (p) => p.category === post.category && p.slug !== post.slug
    ),
    ...blogPosts.filter(
      (p) => p.category !== post.category && p.slug !== post.slug
    ),
  ].slice(0, 3);

  const publishedDate = new Date(post.publishedAt).toLocaleDateString(
    "en-CA",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.publishedAt,
            dateModified: post.publishedAt,
            author: {
              "@type": "Organization",
              name: post.author,
              url: "https://www.firstnationautofinancing.ca",
            },
            publisher: {
              "@type": "Organization",
              name: "First Nation Auto Financing",
              url: "https://www.firstnationautofinancing.ca",
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://www.firstnationautofinancing.ca/blog/${post.slug}`,
            },
            articleSection: post.category,
            inLanguage: "en-CA",
          }),
        }}
      />

      {/* Article Header */}
      <section className="bg-earth-dark">
        <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-white/50 hover:text-white transition mb-6"
          >
            &larr; Back to Blog
          </Link>
          <div className="flex items-center gap-3 mb-5">
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full border ${
                categoryColors[post.category] ||
                "bg-earth-cream text-earth-dark border-earth-border"
              }`}
            >
              {post.category}
            </span>
            <span className="text-xs text-white/40">{post.readTime}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-white/50">
            <span className="font-semibold text-white/70">{post.author}</span>
            <span>&middot;</span>
            <span>{publishedDate}</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <article className="bg-white rounded-2xl border border-earth-border shadow-sm p-6 md:p-10">
          {renderContent(post.content)}
        </article>

        {/* CTA Box */}
        <div className="bg-earth-dark rounded-2xl p-8 md:p-10 mt-10 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white uppercase mb-3">
            Ready to Get <span className="text-earth-gold">Pre-Approved</span>?
          </h3>
          <p className="text-white/60 mb-6 max-w-lg mx-auto leading-relaxed">
            Apply in 3 minutes. 98.9% approval rate. Free on-reserve delivery
            with 100% tax savings. Our team calls you within 1 hour.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/apply"
              className="bg-earth-red hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg uppercase tracking-wide transition shadow-lg shadow-earth-red/30"
            >
              Apply Now — 3 Minutes
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

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-earth-dark uppercase mb-6 text-center">
            Related <span className="text-earth-gold">Articles</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((relatedPost) => (
              <Link
                key={relatedPost.slug}
                href={`/blog/${relatedPost.slug}`}
                className="group bg-white rounded-2xl border border-earth-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full border ${
                        categoryColors[relatedPost.category] ||
                        "bg-earth-cream text-earth-dark border-earth-border"
                      }`}
                    >
                      {relatedPost.category}
                    </span>
                    <span className="text-xs text-earth-muted">
                      {relatedPost.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-earth-dark group-hover:text-earth-red transition leading-snug mb-3">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-earth-muted leading-relaxed">
                    {relatedPost.excerpt}
                  </p>
                  <div className="mt-4 pt-4 border-t border-earth-border flex justify-between items-center">
                    <span className="text-xs text-earth-muted">
                      {new Date(relatedPost.publishedAt).toLocaleDateString(
                        "en-CA",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </span>
                    <span className="text-earth-red text-sm font-bold group-hover:translate-x-1 transition-transform">
                      Read &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

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
              Serving Ontario, Quebec, Manitoba, New Brunswick, Nova Scotia
              &amp; Newfoundland &amp; Labrador.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
