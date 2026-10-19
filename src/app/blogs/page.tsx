import type { Metadata } from "next";
import BlogsClient from "./BlogsClient";

export const metadata: Metadata = {
  title: "Study Abroad Guides, Visa Updates & Scholarships 2025/2026 | UES Abroad",
  description:
    "Expert articles, step-by-step visa guidelines, scholarship roadmaps, post-study work updates, and university admission tips for Indian students going abroad.",
  keywords: [
    "Study Abroad Guides",
    "Overseas Education Blog",
    "Australia Scholarships 2025",
    "Canada Study Visa SDS",
    "UK Graduate Route Visa Updates",
    "Study in Germany Free Tuition Guides",
    "Ireland Tech Careers for International Students",
  ],
  alternates: {
    canonical: "https://uesabroad.com/blogs",
  },
  openGraph: {
    title: "Study Abroad Guides, Scholarships & Student Visa Updates",
    description:
      "Actionable admission strategies, scholarship application blueprints, and visa checklists written by certified senior counselors.",
    url: "https://uesabroad.com/blogs",
    siteName: "UES Abroad",
    images: [
      {
        url: "/campus_quad_hero.webp",
        width: 1200,
        height: 630,
        alt: "UES Abroad Study Guides and Editorial Insights",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study Abroad Guides & Editorial Insights | UES Abroad",
    description: "Browse authoritative guides on global admissions, scholarships, and visas.",
    images: ["/campus_quad_hero.webp"],
  },
};

import { getAdminBlogs } from "@/lib/blogs-store";

export default async function BlogsPage() {
  const blogs = await getAdminBlogs();
  return <BlogsClient initialBlogs={blogs} />;
}
