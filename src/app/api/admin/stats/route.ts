export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";



// GET /api/admin/stats - Dynamic Neon DB Metrics
export async function GET() {
  try {
    const [totalLeads, totalUniversities, totalCourses, leadScoreAgg, newLeads, accommodationCount, forexCount] =
      await Promise.all([
        prisma.lead.count(),
        prisma.university.count(),
        prisma.course.count(),
        prisma.lead.aggregate({
          _avg: { score: true },
        }),
        prisma.lead.count({ where: { status: "NEW" } }),
        prisma.accommodationLead.count(),
        prisma.forexReferral.count(),
      ]);

    const avgScore = Math.round(leadScoreAgg._avg.score || 75);

    return NextResponse.json({
      success: true,
      stats: {
        totalLeads,
        totalUniversities,
        totalCourses,
        avgScore,
        newLeads,
        accommodationCount,
        forexCount,
      },
    });
  } catch (error) {
    console.warn("Database not connected, returning catalog stats fallback:", error);
    return NextResponse.json({
      success: true,
      stats: {
        totalLeads: 8,
        totalUniversities: 90,
        totalCourses: 450,
        avgScore: 82,
        newLeads: 3,
        accommodationCount: 4,
        forexCount: 2,
      },
      isFallback: true,
    });
  }
}
