---
name: seo-auditor
description: >-
  Use this skill when auditing, improving, or validating search engine optimization (SEO), metadata, OpenGraph cards, sitemaps, structured JSON-LD schemas, or web image assets across UES Abroad pages.
---

# UES Abroad SEO & Metadata Auditor

This skill provides automated auditing and implementation guidelines for search engine optimization, OpenGraph social sharing, sitemap coverage, and image performance across all public routes of the UES Abroad platform.

---

## 1. Automated Audit Runbook

To check the current SEO health across all pages, sitemaps, and images, execute the automated audit script:

```bash
node .agents/skills/seo-auditor/scripts/audit-seo.mjs
```

The script verifies:
1. **Metadata Coverage**: Checks every `page.tsx` outside `/admin` for `export const metadata: Metadata` or `generateMetadata`.
2. **Sitemap Synchronization**: Confirms that all static public pages and dynamic blog slugs are included in `src/app/sitemap.ts`.
3. **Robots.txt Rules**: Verifies that `/admin` and private routes are disallowed from crawling and sitemap index is linked.
4. **Image Formats**: Flags unoptimized legacy `.jpg`/`.png` files that should be converted to `.webp`.

---

## 2. Page Metadata Implementation Standards

Every public route MUST define targeted metadata instead of relying solely on the fallback root layout:

```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Universities & Global Degrees | UES Abroad",
  description: "Explore 500+ top universities across the UK, USA, Canada, Germany, and Australia. Filter by fees, intake, and eligibility.",
  keywords: ["Study abroad universities", "Global university admissions", "UES Abroad", "University finder"],
  openGraph: {
    title: "Find Your Dream Global University | UES Abroad",
    description: "Search accredited universities worldwide with end-to-end admission guidance.",
    url: "https://uesabroad.com/universities",
    siteName: "UES Abroad",
    images: [
      {
        url: "/campus_quad_hero.webp",
        width: 1200,
        height: 630,
        alt: "Global university campus quad",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://uesabroad.com/universities",
  },
};
```

### Dynamic Routes (`generateMetadata`)
For dynamic routes such as `src/app/blogs/[slug]/page.tsx`, use `generateMetadata`:
```typescript
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) return { title: "Article Not Found | UES Abroad" };

  return {
    title: `${blog.title} | UES Abroad Guides`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [{ url: blog.coverImage, width: 1200, height: 630 }],
      type: "article",
      publishedTime: blog.date,
      authors: [blog.author.name],
    },
    alternates: {
      canonical: `https://uesabroad.com/blogs/${slug}`,
    },
  };
}
```

---

## 3. Dynamic Sitemap Maintenance

In `src/app/sitemap.ts`, ensure dynamic records are combined with static pages:

```typescript
import { MetadataRoute } from "next";
import { getAllBlogs } from "@/data/blogs";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://uesabroad.com";
  const now = new Date();

  const staticRoutes = [
    "",
    "/destinations",
    "/universities",
    "/accommodation",
    "/forex",
    "/blogs",
    "/tools",
    "/privacy-policy",
    "/terms",
    "/disclaimer",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const blogRoutes = getAllBlogs().map((blog) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: new Date(blog.date || now),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
```

---

## 4. Structured Data (JSON-LD)

To boost search rich snippets, embed structured JSON-LD in `RootLayout` or relevant page components:

```json
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "UES Abroad",
  "url": "https://uesabroad.com",
  "logo": "https://uesabroad.com/icon-512.png",
  "description": "Premier Study Abroad & Global University Admissions Consulting",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Palakkad",
    "addressRegion": "Kerala",
    "addressCountry": "India"
  },
  "sameAs": [
    "https://facebook.com/uesabroad",
    "https://instagram.com/uesabroad",
    "https://linkedin.com/company/uesabroad"
  ]
}
```

---

## 5. Verification Checklist

After applying SEO updates:
1. Re-run `node .agents/skills/seo-auditor/scripts/audit-seo.mjs` to ensure 0 missing pages.
2. Run `npm run build` to confirm static rendering and metadata generation compile cleanly.
