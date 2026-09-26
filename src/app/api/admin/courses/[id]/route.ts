export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// PATCH /api/admin/courses/[id] - Update a course
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { title, degreeLevel, durationMonths, tuitionFee, overview } = body;

    const updateData: Prisma.CourseUpdateInput = {};
    if (title) updateData.title = title;
    if (degreeLevel) updateData.degreeLevel = degreeLevel;
    if (overview) updateData.overview = overview;
    if (typeof durationMonths === "number") updateData.durationMonths = durationMonths;
    if (typeof tuitionFee === "number") updateData.tuitionFee = tuitionFee;

    const updated = await prisma.course.update({
      where: { id },
      data: updateData,
      include: {
        university: {
          select: {
            name: true,
            country: { select: { name: true, currencySymbol: true } },
          },
        },
      },
    });

    return NextResponse.json({ success: true, course: updated });
  } catch (error) {
    console.error("Error updating course:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update course" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/courses/[id] - Delete a course
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.course.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Course deleted" });
  } catch (error) {
    console.error("Error deleting course:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete course" },
      { status: 500 }
    );
  }
}
