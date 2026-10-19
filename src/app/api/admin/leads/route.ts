export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { checkDatabaseConnection } from "@/lib/db-status";

// GET /api/admin/leads - Fetch all student leads
export async function GET() {
  const isDbConnected = await checkDatabaseConnection();

  if (!isDbConnected) {
    return NextResponse.json({
      success: true,
      isDbConnected: false,
      message: "Database not connected",
      leads: [],
    });
  }

  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        notes: {
          orderBy: { createdAt: "desc" },
        },
        assignedTo: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return NextResponse.json({
      success: true,
      isDbConnected: true,
      leads,
    });
  } catch (error) {
    console.error("Database query failed for leads:", error);
    return NextResponse.json({
      success: true,
      isDbConnected: false,
      message: "Database query failed",
      leads: [],
    });
  }
}

// POST /api/admin/leads - Manually create a new lead
export async function POST(req: Request) {
  const isDbConnected = await checkDatabaseConnection();

  if (!isDbConnected) {
    return NextResponse.json(
      { success: false, isDbConnected: false, error: "Database not connected. Please connect DATABASE_URL to persist leads." },
      { status: 503 }
    );
  }

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
