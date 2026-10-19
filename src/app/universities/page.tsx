import type { Metadata } from "next";
import UniversitiesClient from "./UniversitiesClient";

export const metadata: Metadata = {
  title: "Top Universities Worldwide & Course Directory | UES Abroad",
  description:
    "Explore 500+ world-class partner universities across the UK, USA, Canada, Germany, Ireland, and Australia. Search by QS ranking, tuition fees, scholarships, and courses.",
  keywords: [
    "Global University Directory",
    "Study Abroad Universities",
    "QS World Ranking Universities",
    "UK Universities Admissions",
    "German Technical Universities TU9",
    "Australian Group of Eight Go8",
    "Scholarships for International Students",
  ],
  alternates: {
    canonical: "https://uesabroad.com/universities",
  },
  openGraph: {
    title: "Explore 500+ Top Global Universities | UES Abroad",
    description:
      "Filter universities by QS rank, country, discipline, and tuition. Unlock direct application access with scholarship mentoring.",
    url: "https://uesabroad.com/universities",
    siteName: "UES Abroad",
    images: [
      {
        url: "/universities/oxford_radcliffe_hero.webp",
        width: 1200,
        height: 630,
        alt: "Top Global Universities Directory",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Global University Finder | UES Abroad",
    description: "Search 500+ universities worldwide. Filter by tuition, ranking, and scholarship opportunities.",
    images: ["/universities/oxford_radcliffe_hero.webp"],
  },
};

import { getAllPublicUniversities, formatDbUniversityToItem } from "@/lib/universities-store";

export default async function UniversitiesPage() {
  const dbUnis = await getAllPublicUniversities();
  const formattedUnis = dbUnis.map(formatDbUniversityToItem);

  return <UniversitiesClient initialUniversities={formattedUnis} />;
}
