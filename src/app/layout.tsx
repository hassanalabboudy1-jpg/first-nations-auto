import type { Metadata } from "next";
import "./globals.css";
import { TrackingPixels } from "@/components/TrackingPixels";

export const metadata: Metadata = {
  title: "First Nations Auto Financing — ON, QC, NB & NS | Tax-Free Vehicle Delivery",
  description:
    "Vehicle financing designed for First Nations communities in Ontario, Quebec, New Brunswick, and Nova Scotia. Save on HST with on-reserve delivery. $0 down. Bad credit OK. Free delivery to your community.",
  keywords: [
    "First Nations car financing",
    "Indigenous auto financing Ontario",
    "First Nation vehicle financing Quebec",
    "First Nations auto loan New Brunswick",
    "Mi'kmaq vehicle financing Nova Scotia",
    "tax exempt vehicle First Nations",
    "on-reserve vehicle delivery",
    "Aboriginal auto loan Canada",
  ],
  openGraph: {
    title: "First Nations Auto Financing — Ontario, Quebec & Maritimes",
    description:
      "Vehicle financing designed for First Nations communities. Save on taxes with on-reserve delivery. $0 down. Free delivery.",
    type: "website",
    locale: "en_CA",
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
        <TrackingPixels />
        {children}
      </body>
    </html>
  );
}
