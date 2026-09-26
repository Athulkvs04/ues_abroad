import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/admin/leads - Fetch all student leads
export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        notes: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    return NextResponse.json({ success: true, leads });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch leads from database" },
      { status: 500 }
    );
  }
}

// POST /api/admin/leads - Manually create a new lead
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, targetCountry, targetDegree, source, status, notes } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: "Name, Email, and Phone are required" },
        { status: 400 }
      );
    }

    const newLead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        targetCountry: targetCountry || "Not Specified",
        targetDegree: targetDegree || "Master's",
        source: source || "ADMIN_MANUAL",
        status: status || "NEW",
        notes: notes
          ? {
              create: {
                content: notes,
                author: "Admin Console",
              },
            }
          : undefined,
      },
      include: {
        notes: true,
      },
    });

    return NextResponse.json({ success: true, lead: newLead });
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create lead" },
      { status: 500 }
    );
  }
}
