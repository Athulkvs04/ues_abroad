import prisma from "@/lib/prisma";
import { blogsData, BlogPost } from "@/data/blogs";

// In-memory runtime cache for fallback mode when database is not connected
let runtimeFallbackBlogs: BlogPost[] = [...blogsData];

export async function getAdminBlogs(): Promise<BlogPost[]> {
  try {
    const dbBlogs = await prisma.blog.findMany({
      orderBy: { publishedAt: "desc" },
    });

    if (dbBlogs && dbBlogs.length > 0) {
      // Map DB blogs to BlogPost format
      const mappedDbBlogs: BlogPost[] = dbBlogs.map((b) => ({
        id: b.id,
        slug: b.slug,
        title: b.title,
        excerpt: b.excerpt,
        content: b.content,
        category: "Scholarships",
        categoryColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
        coverImage: b.coverImage || "/campus_quad_hero.webp",
        author: {
          name: b.author || "UES Abroad Team",
          role: "Academic Advisor",
        },
        date: new Date(b.publishedAt).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        }),
        readTime: "5 min read",
        featured: false,
        trending: false,
        tags: ["Study Abroad", "Admissions"],
        keyTakeaways: [],
      }));

      // Combine with static blogs ensuring no duplicate slugs
      const dbSlugs = new Set(mappedDbBlogs.map((b) => b.slug));
      const remainingStatic = blogsData.filter((b) => !dbSlugs.has(b.slug));
      return [...mappedDbBlogs, ...remainingStatic];
    }
  } catch (error) {
    console.warn("Prisma blog fetch failed or DB not connected, using runtime fallback:", error);
  }

  return runtimeFallbackBlogs;
}

export async function getPublicBlogBySlug(slug: string): Promise<BlogPost | undefined> {
  const all = await getAdminBlogs();
  return all.find((b) => b.slug === slug || b.id === slug);
}

export async function createAdminBlog(data: {
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  category: "Australia" | "United Kingdom" | "Canada" | "Germany" | "Ireland" | "Scholarships" | "Visa Guides";
  coverImage?: string;
  authorName?: string;
  authorRole?: string;
  readTime?: string;
  tags?: string[];
  keyTakeaways?: string[];
  featured?: boolean;
}): Promise<BlogPost> {
  const generatedSlug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const newId = `blog-${Date.now()}`;

  const categoryColors: Record<string, string> = {
    "Australia": "bg-amber-50 text-amber-800 border-amber-200",
    "United Kingdom": "bg-blue-50 text-blue-800 border-blue-200",
    "Canada": "bg-red-50 text-red-800 border-red-200",
    "Germany": "bg-yellow-50 text-yellow-900 border-yellow-200",
    "Ireland": "bg-emerald-50 text-emerald-800 border-emerald-200",
    "Scholarships": "bg-emerald-50 text-emerald-800 border-emerald-200",
    "Visa Guides": "bg-purple-50 text-purple-800 border-purple-200",
  };

  const newPost: BlogPost = {
    id: newId,
    slug: generatedSlug,
    title: data.title,
    excerpt: data.excerpt,
    content: data.content,
    category: data.category || "Scholarships",
    categoryColor: categoryColors[data.category] || "bg-emerald-50 text-emerald-800 border-emerald-200",
    coverImage: data.coverImage || "/campus_quad_hero.webp",
    author: {
      name: data.authorName || "UES Admissions Team",
      role: data.authorRole || "Senior Study Abroad Counselor",
    },
    date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    readTime: data.readTime || "5 min read",
    featured: data.featured || false,
    trending: false,
    tags: data.tags && data.tags.length > 0 ? data.tags : [data.category || "Study Abroad"],
    keyTakeaways: data.keyTakeaways || [],
  };

  try {
    await prisma.blog.create({
      data: {
        id: newId,
        title: data.title,
        slug: generatedSlug,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.coverImage || "/campus_quad_hero.webp",
        author: data.authorName || "UES Abroad Team",
        isPublished: true,
      },
    });
  } catch (error) {
    console.warn("Could not save to DB (offline/unmigrated), saved to memory store:", error);
  }

  runtimeFallbackBlogs = [newPost, ...runtimeFallbackBlogs.filter(b => b.slug !== generatedSlug)];
  return newPost;
}

export async function updateAdminBlog(id: string, updates: Partial<BlogPost> & { authorName?: string; authorRole?: string }): Promise<BlogPost | null> {
  try {
    await prisma.blog.update({
      where: { id },
      data: {
        title: updates.title,
        slug: updates.slug,
        excerpt: updates.excerpt,
        content: updates.content,
        coverImage: updates.coverImage,
        author: updates.author?.name || updates.authorName,
      },
    });
  } catch {
    // Fallback store update
  }

  const idx = runtimeFallbackBlogs.findIndex((b) => b.id === id || b.slug === id);
  if (idx !== -1) {
    const existing = runtimeFallbackBlogs[idx];
    runtimeFallbackBlogs[idx] = {
      ...existing,
      ...updates,
      author: {
        name: updates.authorName || updates.author?.name || existing.author.name,
        role: updates.authorRole || updates.author?.role || existing.author.role,
      },
      keyTakeaways: updates.keyTakeaways || existing.keyTakeaways,
    };
    return runtimeFallbackBlogs[idx];
  }

  return null;
}

export async function deleteAdminBlog(id: string): Promise<boolean> {
  try {
    await prisma.blog.delete({
      where: { id },
    });
  } catch {
    // Fallback store deletion
  }

  const initialLen = runtimeFallbackBlogs.length;
  runtimeFallbackBlogs = runtimeFallbackBlogs.filter((b) => b.id !== id && b.slug !== id);
  return runtimeFallbackBlogs.length < initialLen;
}
