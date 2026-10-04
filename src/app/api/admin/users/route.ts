export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";



// GET /api/admin/users - Fetch staff/counselor users for assignment
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.warn("Database not connected, returning fallback counselor users:", error);
    const fallbackUsers = [
      { id: "u-1", name: "Ananya Roy", email: "ananya.roy@uesabroad.com", role: "SUPER_ADMIN" },
      { id: "u-2", name: "Kavita Rao", email: "kavita.rao@uesabroad.com", role: "EDITOR" },
      { id: "u-3", name: "Rahul Deshmukh", email: "rahul.d@uesabroad.com", role: "EDITOR" },
    ];
    return NextResponse.json({ success: true, users: fallbackUsers, isFallback: true });
  }
}
