import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/admin/accommodation - Fetch all student housing inquiries
export async function GET() {
  try {
    const inquiries = await prisma.accommodationLead.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, inquiries });
  } catch (error) {
    console.error("Error fetching accommodation leads:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch accommodation leads" },
      { status: 500 }
    );
  }
}
