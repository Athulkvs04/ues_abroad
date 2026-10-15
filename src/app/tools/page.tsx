import type { Metadata } from "next";
import ToolsClient from "./ToolsClient";

export const metadata: Metadata = {
  title: "Study Abroad Decision Center | Eligibility Checker, ROI Calculator & Uni Compare",
  description:
    "Interactive decision tools for study abroad aspirants: Evaluate admission eligibility by CGPA and IELTS, calculate living budget & ROI, and compare universities side-by-side.",
  keywords: [
    "Study Abroad Eligibility Calculator",
    "University Comparison Tool",
    "Student Cost of Living Calculator",
    "Study Abroad ROI",
    "IELTS CGPA University Matcher",
    "UES Abroad Decision Center",
  ],
  alternates: {
    canonical: "https://uesabroad.com/tools",
  },
  openGraph: {
    title: "Interactive Study Abroad Decision Center & Calculators | UES Abroad",
    description:
      "Assess your profile eligibility, calculate true living costs, compare universities, and plan your intake roadmap.",
    url: "https://uesabroad.com/tools",
    siteName: "UES Abroad",
    images: [
      {
        url: "/campus_quad_hero.webp",
        width: 1200,
        height: 630,
        alt: "UES Abroad Decision Tools & Calculators",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study Abroad Decision Tools | UES Abroad",
    description: "Free eligibility assessment, cost calculator, and university comparison tools.",
    images: ["/campus_quad_hero.webp"],
  },
};

export default function DecisionToolsPage() {
  return <ToolsClient />;
}
