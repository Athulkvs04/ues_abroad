export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { checkDatabaseConnection } from "@/lib/db-status";
import { BlogPost } from "@/data/blogs";

// GET /api/admin/blogs - List database articles for CMS
export async function GET() {
  const isDbConnected = await checkDatabaseConnection();

  if (!isDbConnected) {
    return NextResponse.json({
      success: true,
      isDbConnected: false,
      message: "Database not connected",
      blogs: [],
      stats: {
        total: 0,
        featured: 0,
      },
    });
  }

  try {
    const dbBlogs = await prisma.blog.findMany({
      orderBy: { publishedAt: "desc" },
    });

    const blogs: BlogPost[] = dbBlogs.map((b) => ({
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

    return NextResponse.json({
      success: true,
      isDbConnected: true,
      blogs,
      stats: {
        total: blogs.length,
        featured: blogs.filter((b) => b.featured).length,
      },
    });
  } catch (error) {
    console.error("Error fetching admin blogs from database:", error);
    return NextResponse.json({
      success: true,
      isDbConnected: false,
      message: "Database query failed",
      blogs: [],
      stats: { total: 0, featured: 0 },
    });
  }
}

// POST /api/admin/blogs - Create a new article in database
export async function POST(req: Request) {
  const isDbConnected = await checkDatabaseConnection();

  if (!isDbConnected) {
    return NextResponse.json(
      { success: false, isDbConnected: false, error: "Database not connected. Please connect DATABASE_URL to publish articles." },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const { title, excerpt, content, category, coverImage, authorName, authorRole, readTime, tags, keyTakeaways, featured } = body;

    if (!title || !excerpt || !content) {
      return NextResponse.json(
        { success: false, error: "Title, excerpt, and content are required" },
        { status: 400 }
      );
    }

    const generatedSlug = (body.slug || title).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

    const newBlog = await prisma.blog.create({
      data: {
        title,
        slug: `${generatedSlug}-${Date.now().toString().slice(-4)}`,
        excerpt,
        content,
        coverImage: coverImage || "/campus_quad_hero.webp",
        author: authorName || "UES Abroad Team",
        isPublished: true,
      },
    });

    return NextResponse.json({ success: true, blog: newBlog });
  } catch (error) {
    console.error("Error creating blog in database:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create blog in database" },
      { status: 500 }
    );
  }
}
