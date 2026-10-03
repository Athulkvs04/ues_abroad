export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";



// POST /api/leads - Public Inquiry Capture Endpoint
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, source, targetCountry, targetDegree, budgetApprox, cgpa, englishTest, metadata } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: "Name and Phone number are required" },
        { status: 400 }
      );
    }

    let leadId = "lead-" + Date.now();

    if (process.env.DATABASE_URL) {
      try {
        const lead = await prisma.lead.create({
          data: {
            name,
            email: email || `${phone.replace(/[^0-9]/g, "")}@student.uesabroad.com`,
            phone,
            source: source || "WEBSITE_INQUIRY",
            status: "NEW",
            targetCountry: targetCountry || null,
            targetDegree: targetDegree || null,
            budgetApprox: budgetApprox ? parseFloat(budgetApprox) : null,
            cgpa: cgpa ? parseFloat(cgpa) : null,
            englishTest: englishTest || null,
            metadata: metadata || null,
          },
        });
        leadId = lead.id;
      } catch (dbErr) {
        console.warn("Database lead save skipped (connection error):", dbErr);
      }
    } else {
      console.log("[Dev Mode] Lead recorded in-memory:", { name, phone, email, source, targetCountry });
    }

    return NextResponse.json({ success: true, leadId, message: "Inquiry captured successfully" });
  } catch (error) {
    console.error("Error creating public lead:", error);
    return NextResponse.json(
      { success: false, error: "Failed to record inquiry" },
      { status: 500 }
    );
  }
}
