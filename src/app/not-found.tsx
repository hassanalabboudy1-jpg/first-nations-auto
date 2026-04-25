import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-earth-warm flex items-center justify-center px-4">
      <div className="max-w-lg text-center">
        <div className="text-6xl mb-4">🌿</div>
        <h1 className="text-4xl md:text-5xl font-bold text-earth-dark mb-4">
          Page not found
        </h1>
        <p className="text-earth-muted leading-relaxed mb-8">
          The page you&rsquo;re looking for doesn&rsquo;t exist or may have been
          moved. Try one of the links below.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="bg-earth-red hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold transition"
          >
            Home
          </Link>
          <Link
            href="/apply"
            className="bg-earth-gold hover:bg-yellow-500 text-earth-dark px-6 py-3 rounded-lg font-bold transition"
          >
            Apply for Financing
          </Link>
          <a
            href="tel:+16133028872"
            className="bg-white border border-earth-border hover:border-earth-forest text-earth-dark px-6 py-3 rounded-lg font-bold transition"
          >
            📞 613-302-8872
          </a>
        </div>
      </div>
    </main>
  );
}
