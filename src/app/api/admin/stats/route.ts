import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load dashboard metrics" },
      { status: 500 }
    );
  }
}
