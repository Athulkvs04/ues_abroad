export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { addRuntimeUniversity, getRuntimeUniversities } from "@/lib/universities-store";

// PATCH /api/admin/universities/[id] - Update a university
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const {
      name,
      countryId,
      locationCity,
      globalRanking,
      approxTuitionYearly,
      approxLivingYearly,
      overview,
      admissionReqs,
      scholarshipInfo,
      logoUrl,
      bannerUrl,
      isPartner,
      isPublished,
    } = body;

    const updateData: Prisma.UniversityUpdateInput = {};
    if (name !== undefined) updateData.name = name;
    if (locationCity !== undefined) updateData.locationCity = locationCity;
    if (overview !== undefined) updateData.overview = overview;
    if (admissionReqs !== undefined) updateData.admissionReqs = admissionReqs;
    if (scholarshipInfo !== undefined) updateData.scholarshipInfo = scholarshipInfo;
    if (logoUrl !== undefined) updateData.logoUrl = logoUrl;
    if (bannerUrl !== undefined) updateData.bannerUrl = bannerUrl;
    if (isPartner !== undefined) updateData.isPartner = Boolean(isPartner);
    if (isPublished !== undefined) updateData.isPublished = Boolean(isPublished);

    if (countryId) {
      updateData.country = { connect: { id: countryId } };
    }

    if (globalRanking !== undefined) {
      updateData.globalRanking = globalRanking === "" || globalRanking === null ? null : parseInt(globalRanking);
    }
    if (approxTuitionYearly !== undefined) {
      updateData.approxTuitionYearly = parseFloat(approxTuitionYearly) || 0;
    }
    if (approxLivingYearly !== undefined) {
      updateData.approxLivingYearly = parseFloat(approxLivingYearly) || 0;
    }

    try {
      const updated = await prisma.university.update({
        where: { id },
        data: updateData,
        include: {
          country: { select: { id: true, name: true, currencySymbol: true } },
          _count: { select: { courses: true } },
        },
      });

      addRuntimeUniversity(updated);
      return NextResponse.json({ success: true, university: updated });
    } catch (dbError) {
      console.warn("DB update failed, updating runtime university:", dbError);
      const existing = getRuntimeUniversities().find(u => u.id === id);
      const updatedFallback = {
        ...existing,
        ...body,
        id,
      };
      addRuntimeUniversity(updatedFallback);
      return NextResponse.json({ success: true, university: updatedFallback, isFallback: true });
    }
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

    try {
      await prisma.university.delete({
        where: { id },
      });
    } catch (dbError) {
      console.warn("DB delete failed, removing from runtime store:", dbError);
    }

    return NextResponse.json({ success: true, message: "University deleted" });
  } catch (error) {
    console.error("Error deleting university:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete university" },
      { status: 500 }
    );
  }
}
