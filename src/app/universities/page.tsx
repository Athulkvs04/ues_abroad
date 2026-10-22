import type { Metadata } from "next";
import UniversitiesClient from "./UniversitiesClient";

export const metadata: Metadata = {
  title: "AI Course Finder & Global University Matcher | UES Abroad",
  description:
    "Match your profile with 500+ world-class partner universities using our AI course finder. Search programs by degree, zero tuition, QS ranking, and international scholarships across Germany, UK, USA, Australia, and Canada.",
  keywords: [
    "AI Course Finder",
    "AI University Matcher",
    "Study Abroad Course Search",
    "Global University Directory",
    "Tuition Free Universities in Germany",
    "UK Universities Admissions AI",
    "Scholarships for International Students",
  ],
  alternates: {
    canonical: "https://uesabroad.com/universities",
  },
  openGraph: {
    title: "AI Course Finder & Global University Matcher | UES Abroad",
    description:
      "Instant AI-driven matching for undergraduate & postgraduate courses across UK, Germany, USA, Australia, and Canada. Check scholarships & fee waivers.",
    url: "https://uesabroad.com/universities",
    siteName: "UES Abroad",
    images: [
      {
        url: "/universities/oxford_radcliffe_hero.webp",
        width: 1200,
        height: 630,
        alt: "AI Course Finder & Global University Matcher",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Course Finder | UES Abroad",
    description: "Search 500+ global universities & courses with AI-powered matching, tuition insights, and scholarship waivers.",
    images: ["/universities/oxford_radcliffe_hero.webp"],
  },
};

import { getAllPublicUniversities, formatDbUniversityToItem } from "@/lib/universities-store";

export default async function UniversitiesPage() {
  const dbUnis = await getAllPublicUniversities();
  const formattedUnis = dbUnis.map(formatDbUniversityToItem);

  return <UniversitiesClient initialUniversities={formattedUnis} />;
}
