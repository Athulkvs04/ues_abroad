export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { checkDatabaseConnection } from "@/lib/db-status";

// GET /api/admin/forex - Fetch all Forex remittance referrals
export async function GET() {
  const isDbConnected = await checkDatabaseConnection();

  if (!isDbConnected) {
    return NextResponse.json({
      success: true,
      isDbConnected: false,
      message: "Database not connected",
      referrals: [],
    });
  }

  try {
    const referrals = await prisma.forexReferral.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      isDbConnected: true,
      referrals,
    });
  } catch (error) {
    console.error("Error fetching forex referrals from database:", error);
    return NextResponse.json({
      success: true,
      isDbConnected: false,
      message: "Database query failed",
      referrals: [],
    });
  }
}
