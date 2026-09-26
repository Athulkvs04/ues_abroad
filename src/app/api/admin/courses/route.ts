import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/admin/courses - Fetch all degree courses
export async function GET() {
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

    return NextResponse.json({ success: true, courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}

// POST /api/admin/courses - Create a course
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, universityId, degreeLevel, durationMonths, tuitionFee, overview } = body;

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
    console.error("Error creating course:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create course" },
      { status: 500 }
    );
  }
}
