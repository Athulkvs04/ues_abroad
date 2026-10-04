export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";



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
    console.warn("Database not connected, returning fallback courses:", error);
    const fallbackCourses = [
      {
        id: "crs-1",
        title: "M.Sc. Advanced Computer Science & AI",
        degreeLevel: "MASTER",
        durationMonths: 12,
        tuitionFee: 32500,
        overview: "Intensive 1-year postgraduate degree focusing on machine learning, NLP, and distributed systems.",
        university: { name: "University of Oxford", country: { name: "United Kingdom", currencySymbol: "£" } },
      },
      {
        id: "crs-2",
        title: "M.Sc. Data Engineering and Analytics",
        degreeLevel: "MASTER",
        durationMonths: 24,
        tuitionFee: 3000,
        overview: "World-class curriculum covering big data architectures, cloud systems, and scalable data processing.",
        university: { name: "Technical University of Munich (TUM)", country: { name: "Germany", currencySymbol: "€" } },
      },
      {
        id: "crs-3",
        title: "Global Master of Business Administration (MBA)",
        degreeLevel: "MBA",
        durationMonths: 12,
        tuitionFee: 64000,
        overview: "Accelerated executive leadership program with international study immersions.",
        university: { name: "University of Cambridge", country: { name: "United Kingdom", currencySymbol: "£" } },
      },
      {
        id: "crs-4",
        title: "B.Sc. Mechanical & Aerospace Engineering",
        degreeLevel: "BACHELOR",
        durationMonths: 48,
        tuitionFee: 56000,
        overview: "Hands-on engineering curriculum with robotics labs, aero propulsion, and co-op internships.",
        university: { name: "Massachusetts Institute of Technology (MIT)", country: { name: "United States", currencySymbol: "$" } },
      },
    ];
    return NextResponse.json({ success: true, courses: fallbackCourses, isFallback: true });
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
