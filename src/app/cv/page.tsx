import type { Metadata } from "next";
import CvBuilderClient from "./CvBuilderClient";

export const metadata: Metadata = {
  title: "AI CV Builder & Downloader | Academic Resume Maker | UES Abroad",
  description:
    "Build and download a professional academic CV tailored for university admissions across the UK, USA, Germany, Canada, Australia, and Ireland. Export as Word or text format instantly.",
  keywords: [
    "AI CV Builder",
    "Academic CV Maker",
    "Study Abroad CV Template",
    "Free CV Generator for Masters",
    "CV Download Word PDF",
    "Resume Builder for University Applications",
    "UES Abroad CV Tools",
  ],
  alternates: {
    canonical: "https://uesabroad.com/cv",
  },
  openGraph: {
    title: "AI CV Builder & Downloader | Academic Resume Maker | UES Abroad",
    description:
      "Create a structured, university-ready Curriculum Vitae in minutes. Customized for your academic profile, target country, and career trajectory.",
    url: "https://uesabroad.com/cv",
    siteName: "UES Abroad",
    images: [
      {
        url: "/universities/oxford_radcliffe_hero.webp",
        width: 1200,
        height: 630,
        alt: "AI CV Builder for Study Abroad Applications",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI CV Builder | UES Abroad",
    description: "Build and download your professional academic CV for university applications in seconds.",
    images: ["/universities/oxford_radcliffe_hero.webp"],
  },
};

export default function CvPage() {
  return <CvBuilderClient />;
}
