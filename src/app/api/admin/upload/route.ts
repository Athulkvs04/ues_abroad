export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

// Maximum file size: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024;
// Disallow SVG to prevent Stored XSS via embedded script tags
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

// POST /api/admin/upload - Handle image uploads for universities and blogs
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "uploads";

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: `Invalid file type: ${file.type}. Allowed: ${ALLOWED_TYPES.join(", ")}` },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: `File too large. Maximum size: ${MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 400 }
      );
    }

    // Sanitize folder name to prevent path traversal
    const sanitizedFolder = folder.replace(/[^a-zA-Z0-9_-]/g, "");
    
    // Generate unique filename
    const ext = path.extname(file.name) || ".webp";
    const safeName = file.name
      .replace(/\.[^/.]+$/, "") // remove extension
      .replace(/[^a-zA-Z0-9_-]/g, "_") // sanitize
      .slice(0, 60); // limit length
    const fileName = `${safeName}_${randomUUID().slice(0, 8)}${ext}`;
    
    // Save to public directory
    const uploadDir = path.join(process.cwd(), "public", sanitizedFolder);
    await mkdir(uploadDir, { recursive: true });
    
    const filePath = path.join(uploadDir, fileName);
    const bytes = await file.arrayBuffer();
    await writeFile(filePath, Buffer.from(bytes));

    const publicUrl = `/${sanitizedFolder}/${fileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName,
      size: file.size,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
