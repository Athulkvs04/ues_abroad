import prisma from "@/lib/prisma";

let isConnectedCache: { status: boolean; timestamp: number } | null = null;
const CACHE_TTL_MS = 15000; // 15 seconds cache

export async function checkDatabaseConnection(): Promise<boolean> {
  const now = Date.now();
  if (isConnectedCache && now - isConnectedCache.timestamp < CACHE_TTL_MS) {
    return isConnectedCache.status;
  }

  if (!process.env.DATABASE_URL) {
    isConnectedCache = { status: false, timestamp: now };
    return false;
  }

  try {
    // Ultra-fast query to verify connection
    await prisma.$queryRaw`SELECT 1`;
    isConnectedCache = { status: true, timestamp: now };
    return true;
  } catch {
    isConnectedCache = { status: false, timestamp: now };
    return false;
  }
}
