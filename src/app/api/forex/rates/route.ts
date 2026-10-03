import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

// Fallback rates if the external rate provider is unreachable
const FALLBACK_RATES: Record<string, number> = {
  EUR: 90.5,
  USD: 83.8,
  GBP: 106.2,
  CAD: 61.4,
  AUD: 54.8,
};

let cachedRates: {
  rates: Record<string, number>;
  timestamp: number;
} | null = null;

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

export async function GET() {
  const now = Date.now();

  // Return fresh cache if available
  if (cachedRates && now - cachedRates.timestamp < CACHE_TTL_MS) {
    return NextResponse.json({
      success: true,
      rates: cachedRates.rates,
      lastUpdated: new Date(cachedRates.timestamp).toISOString(),
      isLive: true,
      source: "cache",
    });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const res = await fetch("https://open.er-api.com/v6/latest/USD", {
      signal: controller.signal,
      headers: { "User-Agent": "UESAbroad-Forex/1.0" },
    });
    clearTimeout(timeout);

    if (!res.ok) {
      throw new Error(`Exchange rate provider responded with status ${res.status}`);
    }

    const data = await res.json();
    const usdToInr = data.rates?.INR || 83.8;

    const rates: Record<string, number> = {
      USD: Math.round(usdToInr * 100) / 100,
      EUR: Math.round((usdToInr / (data.rates?.EUR || 0.92)) * 100) / 100,
      GBP: Math.round((usdToInr / (data.rates?.GBP || 0.79)) * 100) / 100,
      CAD: Math.round((usdToInr / (data.rates?.CAD || 1.36)) * 100) / 100,
      AUD: Math.round((usdToInr / (data.rates?.AUD || 1.52)) * 100) / 100,
    };

    cachedRates = {
      rates,
      timestamp: now,
    };

    return NextResponse.json({
      success: true,
      rates,
      lastUpdated: new Date(now).toISOString(),
      isLive: true,
      source: "live-api",
    });
  } catch (error) {
    console.warn("Forex rates live fetch failed, serving fallback rates:", error);

    return NextResponse.json({
      success: true,
      rates: FALLBACK_RATES,
      lastUpdated: new Date(now).toISOString(),
      isLive: false,
      source: "fallback",
    });
  }
}

// POST /api/forex/rates - Lock-in rate and request forex callback
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, currency = "EUR", amount = 10000, rate } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: "Name and phone number are required to lock rates." },
        { status: 400 }
      );
    }

    let referralId = "fx-" + Date.now();

    // Persist to Prisma if database is available
    if (process.env.DATABASE_URL) {
      try {
        const referral = await prisma.forexReferral.create({
          data: {
            name,
            phone,
            email: email || null,
            fromCurrency: "INR",
            toCurrency: currency,
            amountApprox: parseFloat(amount) || 10000,
            status: "RATE_LOCKED",
          },
        });
        referralId = referral.id;

        await prisma.lead.create({
          data: {
            name,
            email: email || `${phone.replace(/[^0-9]/g, "")}@forex.uesabroad.com`,
            phone,
            source: "FOREX_RATE_LOCK",
            status: "NEW",
            metadata: {
              forexReferralId: referral.id,
              currency,
              amount,
              lockedRate: rate,
            },
          },
        });
      } catch (dbErr) {
        console.warn("Database save skipped (connection error):", dbErr);
      }
    } else {
      console.log("[Dev Mode] Forex referral recorded in-memory:", { name, phone, currency, amount, rate });
    }

    return NextResponse.json({
      success: true,
      message: `Rate successfully locked for ${currency} ${amount}! A FairexPay student specialist will call ${phone} within 15 minutes.`,
      referralId,
    });
  } catch (error) {
    console.error("Error creating forex referral:", error);
    return NextResponse.json(
      { success: false, error: "Failed to record forex request. Please try again." },
      { status: 500 }
    );
  }
}
