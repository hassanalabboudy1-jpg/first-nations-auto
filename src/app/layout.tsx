import type { Metadata } from "next";
import "./globals.css";
import { TrackingPixels } from "@/components/TrackingPixels";
import { CallbackWidget } from "@/components/CallbackWidget";

export const metadata: Metadata = {
  title: "First Nation Auto Financing | Tax-Free Vehicle Delivery to 325+ Communities",
  description:
    "Vehicle financing for First Nations communities in Ontario, Quebec, Manitoba, New Brunswick, Nova Scotia, and Newfoundland &amp; Labrador. 100% tax savings with Status Card. $0 down. 98.9% approval. Free on-reserve delivery.",
  keywords: [
    "First Nations car financing",
    "First Nation auto financing",
    "Indigenous auto financing Ontario",
    "First Nation vehicle financing Quebec",
    "First Nations auto loan Manitoba",
    "First Nations auto loan New Brunswick",
    "Mi'kmaq vehicle financing Nova Scotia",
    "tax exempt vehicle First Nations",
    "on-reserve vehicle delivery",
    "Status Card tax exemption vehicle",
    "bad credit auto loan First Nations",
    "vehicle delivery reserve Canada",
  ],
  metadataBase: new URL("https://firstnationautofinancing.ca"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "First Nation Auto Financing | 325+ Communities Served",
    description:
      "Vehicle financing for First Nations communities. 100% tax savings with Status Card. $0 down. Free on-reserve delivery across 6 provinces.",
    type: "website",
    locale: "en_CA",
    siteName: "First Nation Auto Financing",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialService",
              "@id": "https://firstnationautofinancing.ca/#organization",
              name: "First Nation Auto Financing",
              alternateName: "First Nation Auto",
              url: "https://firstnationautofinancing.ca",
              telephone: "+1-613-302-8872",
              priceRange: "$$",
              description:
                "Vehicle financing for First Nations communities across Ontario, Quebec, Manitoba, New Brunswick, Nova Scotia and Newfoundland & Labrador. Tax-free on-reserve delivery, $0 down, all credit welcome.",
              address: {
                "@type": "PostalAddress",
                addressCountry: "CA",
              },
              areaServed: [
                { "@type": "AdministrativeArea", name: "Ontario" },
                { "@type": "AdministrativeArea", name: "Quebec" },
                { "@type": "AdministrativeArea", name: "Manitoba" },
                { "@type": "AdministrativeArea", name: "New Brunswick" },
                { "@type": "AdministrativeArea", name: "Nova Scotia" },
                { "@type": "AdministrativeArea", name: "Newfoundland and Labrador" },
              ],
              serviceType: [
                "Auto Financing",
                "Tax-Exempt Vehicle Delivery",
                "First Nations Auto Loans",
                "On-Reserve Vehicle Delivery",
              ],
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                opens: "08:00",
                closes: "20:00",
              },
            }),
          }}
        />
        <TrackingPixels />
        {children}
        <CallbackWidget />
      </body>
    </html>
  );
}
