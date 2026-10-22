import type { Metadata } from "next";
import SopGeneratorClient from "./SopGeneratorClient";

export const metadata: Metadata = {
  title: "AI SOP Generator & Downloader | Statement of Purpose Builder | UES Abroad",
  description:
    "Generate a university-ready Statement of Purpose (SOP) tailored for UK, USA, Germany, Canada, and Australia admissions. Edit, format, and download as Word or PDF instantly.",
  keywords: [
    "AI SOP Generator",
    "Statement of Purpose Builder",
    "Study Abroad SOP Maker",
    "Free SOP Generator for Masters",
    "SOP Download Word PDF",
    "Personal Statement Generator Germany UK USA",
    "UES Abroad SOP Tools",
  ],
  alternates: {
    canonical: "https://uesabroad.com/sop",
  },
  openGraph: {
    title: "AI Statement of Purpose (SOP) Generator & Downloader | UES Abroad",
    description:
      "Craft a structured, admission-committee-approved Statement of Purpose in minutes. Customized for your course, target country, and university.",
    url: "https://uesabroad.com/sop",
    siteName: "UES Abroad",
    images: [
      {
        url: "/universities/oxford_radcliffe_hero.webp",
        width: 1200,
        height: 630,
        alt: "AI Statement of Purpose Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI SOP Generator | UES Abroad",
    description: "Generate and download your tailored university Statement of Purpose in seconds.",
    images: ["/universities/oxford_radcliffe_hero.webp"],
  },
};

export default function SopPage() {
  return <SopGeneratorClient />;
}
