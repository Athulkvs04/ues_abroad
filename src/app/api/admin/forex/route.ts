import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/admin/forex - Fetch all Forex remittance referrals
export async function GET() {
  try {
    const referrals = await prisma.forexReferral.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, referrals });
  } catch (error) {
    console.error("Error fetching forex referrals:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch forex referrals" },
      { status: 500 }
    );
  }
}
