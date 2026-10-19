import prisma from "@/lib/prisma";

export interface UniversityItem {
  id: string;
  flag: string;
  name: string;
  country: string;
  rank: string;
  rankVal: number;
  tuition: string;
  tuitionVal: number;
  scholarship: string;
  course: string;
  discipline: string;
  banner: string;
  photoTag: string;
  intakes: string;
}

const COUNTRY_FLAGS: Record<string, string> = {
  "United Kingdom": "🇬🇧",
  "UK": "🇬🇧",
  "United States": "🇺🇸",
  "USA": "🇺🇸",
  "Canada": "🇨🇦",
  "Germany": "🇩🇪",
  "Australia": "🇦🇺",
  "Ireland": "🇮🇪",
  "New Zealand": "🇳🇿",
  "France": "🇫🇷",
  "Singapore": "🇸🇬",
  "Netherlands": "🇳🇱",
  "Italy": "🇮🇹",
};

// In-memory runtime cache for custom universities created when DB is offline
let runtimeCustomUniversities: any[] = [];

export function getCountryFlag(countryName: string): string {
  return COUNTRY_FLAGS[countryName] || "🌍";
}

export function formatDbUniversityToItem(uni: any): UniversityItem {
  const countryName = uni.country?.name || "Global";
  const currencySymbol = uni.country?.currencySymbol || "$";
  const tuitionVal = typeof uni.approxTuitionYearly === "number" ? uni.approxTuitionYearly : 25000;
  const tuitionStr =
    tuitionVal === 0
      ? "Free (€0 Public)"
      : `${currencySymbol} ${tuitionVal.toLocaleString()} / yr`;

  const ranking = uni.globalRanking ? `${uni.globalRanking} QS` : "Top Global";

  return {
    id: uni.slug || uni.id,
    flag: getCountryFlag(countryName),
    name: uni.name,
    country: countryName === "United Kingdom" ? "UK" : countryName === "United States" ? "USA" : countryName,
    rank: ranking,
    rankVal: uni.globalRanking || 500,
    tuition: tuitionStr,
    tuitionVal,
    scholarship: uni.scholarshipInfo || "Merit Scholarships Available",
    course: uni.courses?.[0]?.title || "Undergraduate & Postgraduate Degrees",
    discipline: "All Disciplines",
    banner: uni.bannerUrl || uni.logoUrl || "/campus_quad_hero.webp",
    photoTag: `${uni.locationCity || "Main"} Campus`,
    intakes: "Fall / Spring Intake",
  };
}

export async function getAllPublicUniversities(): Promise<any[]> {
  try {
    const dbUnis = await prisma.university.findMany({
      where: { isPublished: true },
      include: {
        country: {
          select: { name: true, currencySymbol: true },
        },
        courses: {
          take: 1,
          select: { title: true, degreeLevel: true },
        },
      },
      orderBy: { globalRanking: "asc" },
    });

    if (dbUnis && dbUnis.length > 0) {
      return [...dbUnis, ...runtimeCustomUniversities];
    }
  } catch (error) {
    console.warn("Prisma fetch failed, using runtime fallback for universities:", error);
  }

  return runtimeCustomUniversities;
}

export function addRuntimeUniversity(uni: any) {
  runtimeCustomUniversities = [uni, ...runtimeCustomUniversities.filter((u) => u.id !== uni.id)];
}

export function getRuntimeUniversities() {
  return runtimeCustomUniversities;
}
