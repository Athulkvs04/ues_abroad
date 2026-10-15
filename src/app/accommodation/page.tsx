import type { Metadata } from "next";
import AccommodationClient from "./AccommodationClient";

export const metadata: Metadata = {
  title: "Global Student Accommodation Portal | Verified PBSA Rooms & Studios | UES Abroad",
  description:
    "Book 100% scam-free, verified student accommodation near top universities worldwide in partnership with AmberStudent. Live 3D tours, free cancellation, and embassy-compliant contracts.",
  keywords: [
    "Student Accommodation Abroad",
    "PBSA Student Housing",
    "Student Rooms London",
    "Student Apartments Dublin",
    "Germany Student WG",
    "Melbourne Student Housing",
    "Amber Student Housing UES Abroad",
  ],
  alternates: {
    canonical: "https://uesabroad.com/accommodation",
  },
  openGraph: {
    title: "Verified Global Student Accommodation | 100% Scam-Free Housing",
    description:
      "Secure student studios, en-suites, and shared apartments near campuses worldwide with price match guarantees and dedicated relocation counselors.",
    url: "https://uesabroad.com/accommodation",
    siteName: "UES Abroad",
    images: [
      {
        url: "/universities/amber_studio_hero.webp",
        width: 1200,
        height: 630,
        alt: "Modern Student Accommodation Studio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Global Student Accommodation | UES Abroad",
    description: "Book verified PBSA rooms near global campuses with 3D virtual tours and price match guarantees.",
    images: ["/universities/amber_studio_hero.webp"],
  },
};

export default function AccommodationPage() {
  return <AccommodationClient />;
}
