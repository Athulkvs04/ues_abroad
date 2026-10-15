import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { getStaticTenantConfig } from "@/config/tenant-resolver";
import { TenantProvider } from "@/components/providers/TenantProvider";
import { CookieConsentBanner } from "@/components/ui/CookieConsentBanner";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const config = getStaticTenantConfig();

export const metadata: Metadata = {
  metadataBase: new URL("https://uesabroad.com"),
  title: {
    default: config.seo.defaultTitle,
    template: config.seo.titleTemplate,
  },
  description: config.seo.defaultDescription,
  keywords: config.seo.keywords,
  openGraph: {
    title: config.seo.defaultTitle,
    description: config.seo.defaultDescription,
    url: "https://uesabroad.com",
    siteName: config.name,
    images: [
      {
        url: config.seo.ogImage,
        width: 1200,
        height: 630,
        alt: config.name,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: config.seo.defaultTitle,
    description: config.seo.defaultDescription,
    images: [config.seo.ogImage],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: config.name,
    legalName: config.legalName,
    url: "https://uesabroad.com",
    logo: "https://uesabroad.com/icon-512.png",
    image: "https://uesabroad.com/campus_quad_hero.webp",
    description: config.description,
    telephone: config.contact.phone,
    email: config.contact.emailAdmissions,
    address: {
      "@type": "PostalAddress",
      streetAddress: "1st Floor V Square, Head Post Office Road",
      addressLocality: "Palakkad",
      addressRegion: "Kerala",
      postalCode: "678001",
      addressCountry: "IN",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "240",
    },
    sameAs: [
      config.socials.instagram,
      config.socials.linkedin,
      config.socials.youtube,
      config.socials.facebook,
      config.socials.twitter,
    ].filter(Boolean),
  };

  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} antialiased scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-body selection:bg-primary/30 selection:text-white">
        <TenantProvider config={config}>
          <div className="flex-1 flex flex-col">{children}</div>
          <CookieConsentBanner />
        </TenantProvider>
      </body>
    </html>
  );
}
