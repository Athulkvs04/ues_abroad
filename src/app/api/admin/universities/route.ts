import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/admin/universities - Fetch all universities
export async function GET() {
  try {
    const universities = await prisma.university.findMany({
      orderBy: { name: "asc" },
      include: {
        country: {
          select: { name: true, currencySymbol: true },
        },
        _count: {
          select: { courses: true },
        },
      },
    });

    return NextResponse.json({ success: true, universities });
  } catch (error) {
    console.error("Error fetching universities:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch universities" },
      { status: 500 }
    );
  }
}

// POST /api/admin/universities - Create a university
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, countryId, locationCity, globalRanking, approxTuitionYearly, approxLivingYearly, overview } = body;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const newUni = await prisma.university.create({
      data: {
        name,
        slug: `${slug}-${Date.now().toString().slice(-4)}`,
        countryId,
        locationCity: locationCity || "Main Campus",
        globalRanking: globalRanking ? parseInt(globalRanking) : null,
        approxTuitionYearly: approxTuitionYearly ? parseFloat(approxTuitionYearly) : 25000,
        approxLivingYearly: approxLivingYearly ? parseFloat(approxLivingYearly) : 12000,
        overview: overview || "Partner university program",
        admissionReqs: "Standard academic eligibility",
        scholarshipInfo: "Merit scholarships available",
      },
      include: {
        country: true,
      },
    });

    return NextResponse.json({ success: true, university: newUni });
  } catch (error) {
    console.error("Error creating university:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create university" },
      { status: 500 }
    );
  }
}
