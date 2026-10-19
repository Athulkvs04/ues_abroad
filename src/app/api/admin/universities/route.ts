export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { checkDatabaseConnection } from "@/lib/db-status";

// GET /api/admin/universities - Fetch all universities from database
export async function GET() {
  const isDbConnected = await checkDatabaseConnection();

  if (!isDbConnected) {
    return NextResponse.json({
      success: true,
      isDbConnected: false,
      message: "Database not connected",
      universities: [],
    });
  }

  try {
    const universities = await prisma.university.findMany({
      orderBy: { name: "asc" },
      include: {
        country: {
          select: { id: true, name: true, currencySymbol: true },
        },
        _count: {
          select: { courses: true },
        },
      },
    });

    return NextResponse.json({
      success: true,
      isDbConnected: true,
      universities,
    });
  } catch (error) {
    console.error("Database query error for universities:", error);
    return NextResponse.json({
      success: true,
      isDbConnected: false,
      message: "Database query failed",
      universities: [],
    });
  }
}

// POST /api/admin/universities - Create a university in database
export async function POST(req: Request) {
  const isDbConnected = await checkDatabaseConnection();

  if (!isDbConnected) {
    return NextResponse.json(
      { success: false, isDbConnected: false, error: "Database not connected. Please connect DATABASE_URL to create universities." },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const {
      name,
      countryId,
      locationCity,
      globalRanking,
      approxTuitionYearly,
      approxLivingYearly,
      overview,
      admissionReqs,
      scholarshipInfo,
      logoUrl,
      bannerUrl,
      isPartner,
      isPublished,
    } = body;

    if (!name || !countryId) {
      return NextResponse.json(
        { success: false, error: "University name and country are required." },
        { status: 400 }
      );
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const generatedSlug = `${slug}-${Date.now().toString().slice(-4)}`;

    const newUni = await prisma.university.create({
      data: {
        name,
        slug: generatedSlug,
        countryId,
        locationCity: locationCity || "Main Campus",
        globalRanking: globalRanking ? parseInt(globalRanking) : null,
        approxTuitionYearly: approxTuitionYearly ? parseFloat(approxTuitionYearly) : 25000,
        approxLivingYearly: approxLivingYearly ? parseFloat(approxLivingYearly) : 12000,
        overview: overview || "Comprehensive academic degree programs.",
        admissionReqs: admissionReqs || "Standard academic eligibility and English proficiency test (IELTS 6.5+).",
        scholarshipInfo: scholarshipInfo || "Merit scholarships and tuition grants available.",
        logoUrl: logoUrl || null,
        bannerUrl: bannerUrl || null,
        isPartner: Boolean(isPartner),
        isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
      },
      include: {
        country: {
          select: { id: true, name: true, currencySymbol: true },
        },
        _count: { select: { courses: true } },
      },
    });

    return NextResponse.json({ success: true, university: newUni });
  } catch (error) {
    console.error("Error creating university in database:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create university in database" },
      { status: 500 }
    );
  }
}
