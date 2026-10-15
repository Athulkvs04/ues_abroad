import type { Metadata } from "next";
import { HomePageClient } from "@/components/home/HomePageClient";

export const metadata: Metadata = {
  title: "UES Abroad | Premier Study Abroad Consultants & Global University Admissions",
  description:
    "Official overseas education consultancy helping students secure admissions with scholarships across top global universities in UK, Germany, Ireland, Australia, Canada, and USA.",
  keywords: [
    "Study Abroad Consultants",
    "Overseas Education",
    "Study in UK",
    "Study in Germany Free Tuition",
    "Study in Ireland Tech Careers",
    "Study in Australia PR Pathway",
    "Study in Canada SDS Visa",
    "Study Abroad Palakkad",
    "Study Abroad Calicut",
    "Global University Admissions",
  ],
  alternates: {
    canonical: "https://uesabroad.com",
  },
  openGraph: {
    title: "UES Abroad | Premier Study Abroad Consultants & Global Admissions",
    description:
      "Expert guidance from counselling to campus. Unlock admissions into world-class global universities with end-to-end mentoring.",
    url: "https://uesabroad.com",
    siteName: "UES Abroad",
    images: [
      {
        url: "/campus_quad_hero.webp",
        width: 1200,
        height: 630,
        alt: "UES Abroad Global University Admissions Campus Quad",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UES Abroad | Premier Study Abroad Consultants",
    description: "Expert guidance from counselling to campus across 500+ global partner universities.",
    images: ["/campus_quad_hero.webp"],
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
