export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { checkDatabaseConnection } from "@/lib/db-status";

// GET /api/admin/users - Fetch staff/counselor users from database
export async function GET() {
  const isDbConnected = await checkDatabaseConnection();

  if (!isDbConnected) {
    return NextResponse.json({
      success: true,
      isDbConnected: false,
      message: "Database not connected",
      users: [],
    });
  }

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

    return NextResponse.json({
      success: true,
      isDbConnected: true,
      users,
    });
  } catch (error) {
    console.error("Database query error for users:", error);
    return NextResponse.json({
      success: true,
      isDbConnected: false,
      message: "Database query failed",
      users: [],
    });
  }
}
