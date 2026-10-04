export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";



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
    console.warn("Database not connected, returning fallback universities:", error);
    const fallbackUniversities = [
      {
        id: "uni-oxford",
        name: "University of Oxford",
        locationCity: "Oxford",
        globalRanking: 1,
        approxTuitionYearly: 31000,
        approxLivingYearly: 14000,
        overview: "Collegiate research university in Oxford, England, ranked #1 globally.",
        country: { id: "c-uk", name: "United Kingdom", currencySymbol: "£" },
        _count: { courses: 14 },
      },
      {
        id: "uni-cambridge",
        name: "University of Cambridge",
        locationCity: "Cambridge",
        globalRanking: 3,
        approxTuitionYearly: 33000,
        approxLivingYearly: 14500,
        overview: "World-renowned collegiate research university in Cambridge, United Kingdom.",
        country: { id: "c-uk", name: "United Kingdom", currencySymbol: "£" },
        _count: { courses: 12 },
      },
      {
        id: "uni-tum",
        name: "Technical University of Munich (TUM)",
        locationCity: "Munich",
        globalRanking: 28,
        approxTuitionYearly: 3000,
        approxLivingYearly: 11000,
        overview: "Germany's top-ranked technical university with cutting-edge engineering and AI labs.",
        country: { id: "c-de", name: "Germany", currencySymbol: "€" },
        _count: { courses: 18 },
      },
      {
        id: "uni-mit",
        name: "Massachusetts Institute of Technology (MIT)",
        locationCity: "Cambridge, MA",
        globalRanking: 1,
        approxTuitionYearly: 58000,
        approxLivingYearly: 19000,
        overview: "Private land-grant research university in Cambridge, Massachusetts.",
        country: { id: "c-us", name: "United States", currencySymbol: "$" },
        _count: { courses: 22 },
      },
      {
        id: "uni-toronto",
        name: "University of Toronto",
        locationCity: "Toronto",
        globalRanking: 21,
        approxTuitionYearly: 42000,
        approxLivingYearly: 16000,
        overview: "Canada's leading institution for research, innovation, and global employability.",
        country: { id: "c-ca", name: "Canada", currencySymbol: "CAD $" },
        _count: { courses: 16 },
      },
      {
        id: "uni-melbourne",
        name: "University of Melbourne",
        locationCity: "Melbourne",
        globalRanking: 14,
        approxTuitionYearly: 44000,
        approxLivingYearly: 18000,
        overview: "Australia's #1 university located in the cultural capital of Victoria.",
        country: { id: "c-au", name: "Australia", currencySymbol: "AUD $" },
        _count: { courses: 15 },
      },
    ];
    return NextResponse.json({ success: true, universities: fallbackUniversities, isFallback: true });
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
