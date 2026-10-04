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
    console.warn("Database not connected, returning fallback countries:", error);
    const fallbackCountries = [
      { id: "c-uk", name: "United Kingdom", currencySymbol: "£" },
      { id: "c-us", name: "United States", currencySymbol: "$" },
      { id: "c-de", name: "Germany", currencySymbol: "€" },
      { id: "c-ca", name: "Canada", currencySymbol: "CAD $" },
      { id: "c-au", name: "Australia", currencySymbol: "AUD $" },
      { id: "c-ie", name: "Ireland", currencySymbol: "€" },
      { id: "c-nz", name: "New Zealand", currencySymbol: "NZD $" },
      { id: "c-fr", name: "France", currencySymbol: "€" },
      { id: "c-sg", name: "Singapore", currencySymbol: "SGD $" },
    ];
    return NextResponse.json({ success: true, countries: fallbackCountries, isFallback: true });
  }
}
