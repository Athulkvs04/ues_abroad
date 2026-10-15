export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { getAdminBlogs, createAdminBlog } from "@/lib/blogs-store";

// GET /api/admin/blogs - List all articles for CMS
export async function GET() {
  try {
    const blogs = await getAdminBlogs();
    return NextResponse.json({
      success: true,
      blogs,
      stats: {
        total: blogs.length,
        featured: blogs.filter((b) => b.featured).length,
      },
    });
  } catch (error) {
    console.error("Error fetching admin blogs:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

// POST /api/admin/blogs - Create a new article
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, excerpt, content, category, coverImage, authorName, authorRole, readTime, tags, featured } = body;

    if (!title || !excerpt || !content) {
      return NextResponse.json(
        { success: false, error: "Title, excerpt, and content are required" },
        { status: 400 }
      );
    }

    const newBlog = await createAdminBlog({
      title,
      excerpt,
      content,
      category: category || "Scholarships",
      coverImage: coverImage || "/campus_quad_hero.webp",
      authorName: authorName || "UES Admissions Team",
      authorRole: authorRole || "Senior Study Abroad Counselor",
      readTime: readTime || "5 min read",
      tags: Array.isArray(tags) ? tags : typeof tags === "string" ? tags.split(",").map((t: string) => t.trim()) : [],
      featured: Boolean(featured),
    });

    return NextResponse.json({ success: true, blog: newBlog });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create blog" },
      { status: 500 }
    );
  }
}
