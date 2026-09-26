export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";



// PATCH /api/admin/universities/[id] - Update a university
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { name, locationCity, globalRanking, approxTuitionYearly, approxLivingYearly, overview } = body;

    const updateData: Prisma.UniversityUpdateInput = {};
    if (name) updateData.name = name;
    if (locationCity) updateData.locationCity = locationCity;
    if (overview) updateData.overview = overview;
    if (typeof globalRanking === "number") updateData.globalRanking = globalRanking;
    if (typeof approxTuitionYearly === "number") updateData.approxTuitionYearly = approxTuitionYearly;
    if (typeof approxLivingYearly === "number") updateData.approxLivingYearly = approxLivingYearly;

    const updated = await prisma.university.update({
      where: { id },
      data: updateData,
      include: {
        country: true,
        _count: { select: { courses: true } },
      },
    });

    return NextResponse.json({ success: true, university: updated });
  } catch (error) {
    console.error("Error updating university:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update university" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/universities/[id] - Delete a university
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.university.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "University deleted" });
  } catch (error) {
    console.error("Error deleting university:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete university" },
      { status: 500 }
    );
  }
}
