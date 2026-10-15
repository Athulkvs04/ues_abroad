export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { updateAdminBlog, deleteAdminBlog, getAdminBlogs } from "@/lib/blogs-store";

interface Params {
  params: Promise<{ id: string }>;
}

// GET /api/admin/blogs/[id]
export async function GET(req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const blogs = await getAdminBlogs();
    const blog = blogs.find((b) => b.id === id || b.slug === id);

    if (!blog) {
      return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, blog });
  } catch (error) {
    console.error("Error fetching single blog:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch blog" }, { status: 500 });
  }
}

// PUT /api/admin/blogs/[id]
export async function PUT(req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updated = await updateAdminBlog(id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, blog: updated });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ success: false, error: "Failed to update blog" }, { status: 500 });
  }
}

// DELETE /api/admin/blogs/[id]
export async function DELETE(req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const deleted = await deleteAdminBlog(id);

    return NextResponse.json({ success: true, deleted });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ success: false, error: "Failed to delete blog" }, { status: 500 });
  }
}
