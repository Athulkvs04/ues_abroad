export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";



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
    console.warn("Database not connected, returning sample leads fallback:", error);
    const fallbackLeads = [
      {
        id: "lead-sample-1",
        name: "Aarav Sharma",
        email: "aarav.sharma@example.com",
        phone: "+91 98765 12340",
        source: "COURSE_FINDER",
        status: "NEW",
        score: 85,
        targetCountry: "United Kingdom",
        targetDegree: "M.Sc. Computer Science",
        budgetApprox: 2500000,
        cgpa: 8.8,
        createdAt: new Date().toISOString(),
        notes: [{ id: "n1", content: "Interested in Fall 2026 intake, top 10 UK universities", author: "System", createdAt: new Date().toISOString() }],
      },
      {
        id: "lead-sample-2",
        name: "Pooja Patel",
        email: "pooja.patel@example.com",
        phone: "+91 98234 56781",
        source: "1:1 Expert Call",
        status: "CONTACTED",
        score: 92,
        targetCountry: "Germany",
        targetDegree: "M.Sc. Automotive Engineering",
        budgetApprox: 1200000,
        cgpa: 9.1,
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        notes: [{ id: "n2", content: "Discussed public university APS certificate requirements", author: "Senior Counselor", createdAt: new Date().toISOString() }],
      },
      {
        id: "lead-sample-3",
        name: "Rohan Iyer",
        email: "rohan.iyer@example.com",
        phone: "+91 98450 99881",
        source: "FOREX",
        status: "COUNSELLING_SCHEDULED",
        score: 78,
        targetCountry: "United States",
        targetDegree: "MBA",
        budgetApprox: 4500000,
        cgpa: 8.2,
        createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
        notes: [],
      }
    ];
    return NextResponse.json({ success: true, leads: fallbackLeads, isFallback: true });
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
