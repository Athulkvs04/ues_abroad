export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";



// GET /api/admin/countries - Fetch destination countries
export async function GET() {
  try {
    const countries = await prisma.country.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        currencySymbol: true,
      },
    });

    return NextResponse.json({ success: true, countries });
  } catch (error) {
    console.error("Error fetching countries:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch countries" },
      { status: 500 }
    );
  }
}
