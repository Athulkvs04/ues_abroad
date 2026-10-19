export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { checkDatabaseConnection } from "@/lib/db-status";

// GET /api/admin/accommodation - Fetch all student housing inquiries
export async function GET() {
  const isDbConnected = await checkDatabaseConnection();

  if (!isDbConnected) {
    return NextResponse.json({
      success: true,
      isDbConnected: false,
      message: "Database not connected",
      inquiries: [],
    });
  }

  try {
    const inquiries = await prisma.accommodationLead.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      isDbConnected: true,
      inquiries,
    });
  } catch (error) {
    console.error("Error fetching accommodation leads from database:", error);
    return NextResponse.json({
      success: true,
      isDbConnected: false,
      message: "Database query failed",
      inquiries: [],
    });
  }
}
