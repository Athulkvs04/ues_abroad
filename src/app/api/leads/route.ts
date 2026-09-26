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

    return NextResponse.json({ success: true, leadId: lead.id, message: "Inquiry captured successfully" });
  } catch (error) {
    console.error("Error creating public lead:", error);
    return NextResponse.json(
      { success: false, error: "Failed to record inquiry" },
      { status: 500 }
    );
  }
}
