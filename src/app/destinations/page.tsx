import type { Metadata } from "next";
import DestinationsClient from "./DestinationsClient";

export const metadata: Metadata = {
  title: "Top Study Abroad Destinations 2025/2026 | UK, Germany, Australia, Canada, USA, Ireland",
  description:
    "Compare tuition fees, post-study work permits (PSW), living costs, and visa success rates for Indian students across top study abroad countries.",
  keywords: [
    "Study Abroad Destinations",
    "Study in Germany Free Tuition",
    "Study in UK Graduate Route",
    "Study in Australia PR Pathways",
    "Study in Canada SDS Visa",
    "Study in Ireland Tech Jobs",
    "Study in USA STEM OPT",
    "Overseas Education Countries",
  ],
  alternates: {
    canonical: "https://uesabroad.com/destinations",
  },
  openGraph: {
    title: "Global Study Destinations | Compare Tuition, Visas & Work Rights",
    description:
      "Explore tuition, living expenses, and post-study work rights across the UK, Germany, Canada, Australia, Ireland, and USA.",
    url: "https://uesabroad.com/destinations",
    siteName: "UES Abroad",
    images: [
      {
        url: "/destinations/germany.webp",
        width: 1200,
        height: 630,
        alt: "Study Abroad Destinations Comparison",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Top Study Abroad Destinations | UES Abroad",
    description: "Compare tuition, visa success rates, and work rights across top global destinations.",
    images: ["/destinations/germany.webp"],
  },
};

export default function DestinationsPage() {
  return <DestinationsClient />;
}
