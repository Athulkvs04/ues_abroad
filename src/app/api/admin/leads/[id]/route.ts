import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// PATCH /api/admin/leads/[id] - Full editable lead fields & counselor assignment
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const {
      name,
      email,
      phone,
      status,
      noteContent,
      targetCountry,
      targetDegree,
      budgetApprox,
      cgpa,
      englishTest,
      assignedToId,
      score,
    } = body;

    const updateData: Prisma.LeadUpdateInput = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;
    if (status) updateData.status = status;
    if (targetCountry !== undefined) updateData.targetCountry = targetCountry;
    if (targetDegree !== undefined) updateData.targetDegree = targetDegree;
    if (englishTest !== undefined) updateData.englishTest = englishTest;
    if (assignedToId !== undefined) {
      updateData.assignedTo = assignedToId ? { connect: { id: assignedToId } } : { disconnect: true };
    }
    
    if (typeof budgetApprox === "number") updateData.budgetApprox = budgetApprox;
    if (typeof cgpa === "number") updateData.cgpa = cgpa;
    if (typeof score === "number") updateData.score = score;

    if (noteContent) {
      updateData.notes = {
        create: {
          content: noteContent,
          author: "Admin Console",
        },
      };
    }

    const updatedLead = await prisma.lead.update({
      where: { id },
      data: updateData,
      include: {
        assignedTo: {
          select: { id: true, name: true, email: true },
        },
        notes: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    return NextResponse.json({ success: true, lead: updatedLead });
  } catch (error) {
    console.error("Error updating lead:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update lead profile" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/leads/[id] - Delete a lead
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.lead.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Lead deleted successfully" });
  } catch (error) {
    console.error("Error deleting lead:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete lead" },
      { status: 500 }
    );
  }
}
