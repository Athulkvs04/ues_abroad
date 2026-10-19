export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { checkDatabaseConnection } from "@/lib/db-status";

// GET /api/admin/stats - Live database metrics
export async function GET() {
  const isDbConnected = await checkDatabaseConnection();

  if (!isDbConnected) {
    return NextResponse.json({
      success: true,
      isDbConnected: false,
      message: "Database not connected",
      stats: {
        totalLeads: 0,
        totalUniversities: 0,
        totalCourses: 0,
        avgScore: 0,
        newLeads: 0,
        accommodationCount: 0,
        forexCount: 0,
      },
    });
  }

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

    const avgScore = leadScoreAgg._avg.score ? Math.round(leadScoreAgg._avg.score) : 0;

    return NextResponse.json({
      success: true,
      isDbConnected: true,
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
    console.error("Error fetching admin stats from database:", error);
    return NextResponse.json({
      success: true,
      isDbConnected: false,
      message: "Database query failed",
      stats: {
        totalLeads: 0,
        totalUniversities: 0,
        totalCourses: 0,
        avgScore: 0,
        newLeads: 0,
        accommodationCount: 0,
        forexCount: 0,
      },
    });
  }
}
