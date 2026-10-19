export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { checkDatabaseConnection } from "@/lib/db-status";

// GET /api/admin/courses - Fetch all degree courses from database
export async function GET() {
  const isDbConnected = await checkDatabaseConnection();

  if (!isDbConnected) {
    return NextResponse.json({
      success: true,
      isDbConnected: false,
      message: "Database not connected",
      courses: [],
    });
  }

  try {
    const courses = await prisma.course.findMany({
      orderBy: { title: "asc" },
      include: {
        university: {
          select: {
            name: true,
            country: { select: { name: true, currencySymbol: true } },
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      isDbConnected: true,
      courses,
    });
  } catch (error) {
    console.error("Database query failed for courses:", error);
    return NextResponse.json({
      success: true,
      isDbConnected: false,
      message: "Database query failed",
      courses: [],
    });
  }
}

// POST /api/admin/courses - Create a course in database
export async function POST(req: Request) {
  const isDbConnected = await checkDatabaseConnection();

  if (!isDbConnected) {
    return NextResponse.json(
      { success: false, isDbConnected: false, error: "Database not connected. Please connect DATABASE_URL to create courses." },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const { title, universityId, degreeLevel, durationMonths, tuitionFee, overview } = body;

    if (!title || !universityId) {
      return NextResponse.json(
        { success: false, error: "Course title and university are required." },
        { status: 400 }
      );
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const newCourse = await prisma.course.create({
      data: {
        title,
        slug: `${slug}-${Date.now().toString().slice(-4)}`,
        universityId,
        degreeLevel: degreeLevel || "MASTER",
        durationMonths: durationMonths ? parseInt(durationMonths) : 24,
        tuitionFee: tuitionFee ? parseFloat(tuitionFee) : 25000,
        intakeMonths: ["September", "January"],
        overview: overview || "Full-time degree program",
      },
      include: {
        university: true,
      },
    });

    return NextResponse.json({ success: true, course: newCourse });
  } catch (error) {
    console.error("Error creating course in database:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create course in database" },
      { status: 500 }
    );
  }
}
