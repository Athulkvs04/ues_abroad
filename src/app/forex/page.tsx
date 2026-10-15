import type { Metadata } from "next";
import ForexClient from "./ForexClient";

export const metadata: Metadata = {
  title: "Student Forex & Overseas University Tuition Remittance | UES Abroad",
  description:
    "Zero-margin live exchange rates for international university tuition transfers, German Blocked Accounts (Sperrkonto), Canada GIC, and student multi-currency travel cards.",
  keywords: [
    "Student Forex Transfer",
    "University Tuition Remittance",
    "German Blocked Account Funding",
    "Canada GIC Remittance",
    "RBI LRS Compliant Transfer",
    "Student Multi Currency Card",
    "FairExPay Forex UES Abroad",
  ],
  alternates: {
    canonical: "https://uesabroad.com/forex",
  },
  openGraph: {
    title: "Student Forex & University Fee Wire Portal | UES Abroad",
    description:
      "Save ₹35,000+ on university wire transfers with zero-margin RBI authorized remittance, German blocked accounts, and student forex cards.",
    url: "https://uesabroad.com/forex",
    siteName: "UES Abroad",
    images: [
      {
        url: "/universities/fairexpay_banking_hero.webp",
        width: 1200,
        height: 630,
        alt: "Student Forex and Tuition Fee Remittance",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Student Forex & International Tuition Remittance | UES Abroad",
    description: "Zero-markup currency conversion and direct university wire transfers with instant SWIFT A2 receipts.",
    images: ["/universities/fairexpay_banking_hero.webp"],
  },
};

export default function ForexPage() {
  return <ForexClient />;
}
