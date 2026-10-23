"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Search, 
  GraduationCap, 
  Award, 
  ArrowRight, 
  RotateCcw,
  Camera,
  CheckCircle2,
  Bot,
  SlidersHorizontal,
  FileSpreadsheet,
  Bookmark,
  BookmarkCheck,
  Clock,
  Briefcase,
  ShieldCheck,
  Compass
} from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { LeadModal } from "@/components/home/LeadModal";
import type { UniversityItem } from "@/lib/universities-store";

/* ──────────────────────────────────────────────
   Types
   ────────────────────────────────────────────── */

export interface CourseProgramItem {
  id: string;
  courseTitle: string;
  degreeLevel: "Master's" | "Bachelor's" | "MBA" | "Doctoral";
  university: string;
  country: string;
  flag: string;
  rank: string;
  rankVal: number;
  duration: string;
  tuition: string;
  tuitionVal: number;
  scholarship: string;
  discipline: string;
  intakes: string;
  banner: string;
  photoTag: string;
  aiMatchInsight: string;
  visaWorkRights: string;
  careerOutcomes: string;
}

/* ──────────────────────────────────────────────
   Course Data (Built-in Verified Directory)
   ────────────────────────────────────────────── */

const COURSES_DATA: CourseProgramItem[] = [
  // ──── Computer Science & AI ────
  {
    id: "cambridge-msc-cs",
    courseTitle: "MPhil in Advanced Computer Science & Machine Learning",
    degreeLevel: "Master's",
    university: "University of Cambridge",
    country: "UK",
    flag: "🇬🇧",
    rank: "2 QS",
    rankVal: 2,
    duration: "1 Year Full-Time",
    tuition: "GBP £22,000 / yr",
    tuitionVal: 28000,
    scholarship: "Cambridge Trust International (£10k)",
    discipline: "Computer Science & AI",
    intakes: "Oct Intake",
    banner: "/universities/cambridge_kings_lawn.webp",
    photoTag: "King's College Lawn & Chapel",
    aiMatchInsight: "Top 2 QS worldwide. High-demand AI curriculum with 100% full-ride funding potential and highest Russell Group employer prestige.",
    visaWorkRights: "2-Year UK Graduate Route Visa",
    careerOutcomes: "Google DeepMind, ARM, Microsoft Research placement pipeline",
  },
  {
    id: "oxford-msc-cs",
    courseTitle: "MSc in Computer Science & Advanced Algorithms",
    degreeLevel: "Master's",
    university: "University of Oxford",
    country: "UK",
    flag: "🇬🇧",
    rank: "3 QS",
    rankVal: 3,
    duration: "1 Year Full-Time",
    tuition: "GBP £26,000 / yr",
    tuitionVal: 32000,
    scholarship: "Clarendon Fund Full Fee Waiver",
    discipline: "Computer Science & AI",
    intakes: "Oct Intake",
    banner: "/universities/oxford_radcliffe_panorama.webp",
    photoTag: "Radcliffe Square & Colleges Panorama",
    aiMatchInsight: "Top 3 QS globally. World-leading faculty in automated verification, computational linguistics, and quantum computing.",
    visaWorkRights: "2-Year UK Graduate Route Visa",
    careerOutcomes: "Top academic & high-frequency trading recruitment",
  },
  {
    id: "imperial-msc-ai",
    courseTitle: "MSc Computing (Artificial Intelligence & Machine Learning)",
    degreeLevel: "Master's",
    university: "Imperial College London",
    country: "UK",
    flag: "🇬🇧",
    rank: "6 QS",
    rankVal: 6,
    duration: "1 Year Full-Time",
    tuition: "GBP £34,000 / yr",
    tuitionVal: 40000,
    scholarship: "President's International Scholarship",
    discipline: "Computer Science & AI",
    intakes: "Oct Intake",
    banner: "/universities/imperial_queens_lawn.webp",
    photoTag: "Queen's Lawn & Queen's Tower",
    aiMatchInsight: "World-leading STEM incubator with highest graduate starting salary in London tech hub and specialized AI thesis track.",
    visaWorkRights: "2-Year UK Graduate Route Visa",
    careerOutcomes: "Highest graduate salary in London tech ecosystem",
  },
  {
    id: "tum-msc-ai",
    courseTitle: "MSc Informatics & Artificial Intelligence",
    degreeLevel: "Master's",
    university: "Technical University of Munich (TUM)",
    country: "Germany",
    flag: "🇩🇪",
    rank: "28 QS",
    rankVal: 28,
    duration: "2 Years Full-Time",
    tuition: "Free (€0 Public)",
    tuitionVal: 0,
    scholarship: "100% Tuition-Free Public German University",
    discipline: "Computer Science & AI",
    intakes: "Oct / Apr Intake",
    banner: "/universities/tum_campus_aerial.webp",
    photoTag: "TUM Garching High-Tech Research Campus",
    aiMatchInsight: "Ranked #28 globally. 100% tuition-free public German institution with direct BMW, Siemens & SAP industrial placement pipeline.",
    visaWorkRights: "18-Month German Job Seeker Post-Study Visa",
    careerOutcomes: "Direct engineering recruitment across Bavarian industrial hub",
  },
  {
    id: "toronto-msc-ai",
    courseTitle: "Master of Science in Applied Computing (AI & Machine Learning)",
    degreeLevel: "Master's",
    university: "University of Toronto",
    country: "Canada",
    flag: "🇨🇦",
    rank: "21 QS",
    rankVal: 21,
    duration: "16 Months",
    tuition: "CAD $38,000 / yr",
    tuitionVal: 38000,
    scholarship: "Vector Institute AI Scholarship ($17.5k)",
    discipline: "Computer Science & AI",
    intakes: "Sep Intake",
    banner: "/universities/toronto_campus.webp",
    photoTag: "Historic St. George Campus",
    aiMatchInsight: "Ranked #21 QS globally. 3-year Canadian PGWP work permit eligible; renowned Vector Institute AI tie-ups and paid 8-month internship.",
    visaWorkRights: "3-Year Canadian PGWP Work Permit",
    careerOutcomes: "Vector Institute AI labs & Toronto Tech Corridor",
  },
  {
    id: "trinity-msc-cs",
    courseTitle: "MSc Computer Science (Intelligent Systems & Networks)",
    degreeLevel: "Master's",
    university: "Trinity College Dublin",
    country: "Ireland",
    flag: "🇮🇪",
    rank: "81 QS",
    rankVal: 81,
    duration: "1 Year Full-Time",
    tuition: "EUR €22,000 / yr",
    tuitionVal: 24000,
    scholarship: "Global Excellence Postgraduate Award (€5,000)",
    discipline: "Computer Science & AI",
    intakes: "Sep Intake",
    banner: "/universities/trinity_chapel_steps.webp",
    photoTag: "Historic Chapel Steps & Courtyard",
    aiMatchInsight: "Ranked #81 QS. Silicon Docks tech corridor access (Google, Meta, LinkedIn EU HQ) with 2-year Irish stay-back option.",
    visaWorkRights: "2-Year Irish Stay-Back Post-Study Work Visa",
    careerOutcomes: "Direct hiring pipeline into Dublin Silicon Docks",
  },
  {
    id: "herts-msc-cs",
    courseTitle: "MSc Computer Science with 1-Year Industry Placement",
    degreeLevel: "Master's",
    university: "University of Hertfordshire",
    country: "UK",
    flag: "🇬🇧",
    rank: "Top Modern UK",
    rankVal: 350,
    duration: "2 Years (with Placement)",
    tuition: "GBP £14,500 / yr",
    tuitionVal: 18000,
    scholarship: "Chancellor's International Award (£4,000 Off)",
    discipline: "Computer Science & AI",
    intakes: "Sep / Jan Intake",
    banner: "/universities/hertfordshire_campus.webp",
    photoTag: "De Havilland Campus",
    aiMatchInsight: "Top UK Modern university. Includes guaranteed 1-year paid industry placement with £4,000 international scholarship waiver.",
    visaWorkRights: "2-Year UK Graduate Route Visa",
    careerOutcomes: "High placement conversion with UK technology employers",
  },
  {
    id: "unsw-mit-ai",
    courseTitle: "Master of Information Technology (AI & Cybersecurity)",
    degreeLevel: "Master's",
    university: "UNSW Sydney",
    country: "Australia",
    flag: "🇦🇺",
    rank: "19 QS",
    rankVal: 19,
    duration: "2 Years Full-Time",
    tuition: "AUD $45,000 / yr",
    tuitionVal: 45000,
    scholarship: "Future of Change India Award (AUD $10,000)",
    discipline: "Computer Science & AI",
    intakes: "Feb / Jul / Sep",
    banner: "/universities/unsw_orientation.webp",
    photoTag: "UNSW Orientation Festival",
    aiMatchInsight: "Australian Group of Eight (Go8). 3-year Australian post-study work visa rights with high demand in national cybersecurity initiatives.",
    visaWorkRights: "3-Year Australian Post-Study Work Visa",
    careerOutcomes: "Leading Australian tech enterprises and financial institutions",
  },
  {
    id: "gmu-ms-cs",
    courseTitle: "MS in Computer Science & Cyber Security Engineering",
    degreeLevel: "Master's",
    university: "George Mason University",
    country: "USA",
    flag: "🇺🇸",
    rank: "Tier-1 US",
    rankVal: 250,
    duration: "2 Years Full-Time",
    tuition: "USD $36,000 / yr",
    tuitionVal: 36000,
    scholarship: "Global Discovery Award ($12,000)",
    discipline: "Computer Science & AI",
    intakes: "Fall / Spring",
    banner: "/universities/gmu_johnson_center.webp",
    photoTag: "Johnson Center & Campus Plaza",
    aiMatchInsight: "Tier-1 US Research institution located in the Washington D.C. tech corridor. Generous $12,000 merit grant with 3-year STEM OPT extension.",
    visaWorkRights: "3-Year US STEM OPT Work Authorization",
    careerOutcomes: "High visa clearance and Amazon HQ2 tech ecosystem proximity",
  },

  // ──── Data Science & Analytics ────
  {
    id: "gmu-ms-da",
    courseTitle: "MS in Data Analytics & Machine Learning",
    degreeLevel: "Master's",
    university: "George Mason University",
    country: "USA",
    flag: "🇺🇸",
    rank: "Tier-1 US",
    rankVal: 250,
    duration: "2 Years Full-Time",
    tuition: "USD $36,000 / yr",
    tuitionVal: 36000,
    scholarship: "Merit Fellowship Award ($10,000)",
    discipline: "Data Science & Analytics",
    intakes: "Fall / Spring",
    banner: "/universities/gmu_johnson_center.webp",
    photoTag: "George Mason Campus Center",
    aiMatchInsight: "Specialized predictive analytics and big data curriculum with direct internships in the Northern Virginia tech hub.",
    visaWorkRights: "3-Year US STEM OPT Work Authorization",
    careerOutcomes: "High placement in Fortune 500 analytics consultancies",
  },
  {
    id: "northumbria-msc-ds",
    courseTitle: "MSc Big Data Analytics & Artificial Intelligence",
    degreeLevel: "Master's",
    university: "Northumbria University",
    country: "UK",
    flag: "🇬🇧",
    rank: "Top 40 UK",
    rankVal: 380,
    duration: "1 Year Full-Time",
    tuition: "GBP £15,500 / yr",
    tuitionVal: 19000,
    scholarship: "International Academic Excellence (£3,000)",
    discipline: "Data Science & Analytics",
    intakes: "Sep / Jan Intake",
    banner: "/universities/northumbria_newcastle.webp",
    photoTag: "Newcastle City Campus Landmark",
    aiMatchInsight: "AACSB accredited institution with £3,000 international fee discount and direct hands-on cloud data analytics labs.",
    visaWorkRights: "2-Year UK Graduate Route Visa",
    careerOutcomes: "UK enterprise business intelligence & analytics roles",
  },

  // ──── Engineering & Robotics ────
  {
    id: "cornell-meng-robotics",
    courseTitle: "M.Eng in Robotics & Autonomous Systems",
    degreeLevel: "Master's",
    university: "Cornell University",
    country: "USA",
    flag: "🇺🇸",
    rank: "16 QS",
    rankVal: 16,
    duration: "1 Year Full-Time",
    tuition: "USD $54,000 / yr",
    tuitionVal: 54000,
    scholarship: "Tata Scholarship for Indian Students",
    discipline: "Engineering & Robotics",
    intakes: "Aug / Jan Intake",
    banner: "/universities/cornell_arts_quad.webp",
    photoTag: "Arts Quad & Historic Campus",
    aiMatchInsight: "Ivy League Tier-1. Dedicated Tata Scholarship for Indian applicants; cutting-edge autonomous vehicle and AI robotics research facilities.",
    visaWorkRights: "3-Year US STEM OPT Work Authorization",
    careerOutcomes: "Tesla, Boston Dynamics, NASA JPL, Apple Hardware Engineering",
  },
  {
    id: "tum-msc-robotics",
    courseTitle: "MSc Robotics, Cognition & Intelligence",
    degreeLevel: "Master's",
    university: "Technical University of Munich (TUM)",
    country: "Germany",
    flag: "🇩🇪",
    rank: "28 QS",
    rankVal: 28,
    duration: "2 Years Full-Time",
    tuition: "Free (€0 Public)",
    tuitionVal: 0,
    scholarship: "100% Tuition-Free German Public Institution",
    discipline: "Engineering & Robotics",
    intakes: "Oct / Apr Intake",
    banner: "/universities/tum_campus_aerial.webp",
    photoTag: "TUM Engineering & Robotics Labs",
    aiMatchInsight: "World-ranked #28 engineering powerhouse with zero tuition fees. Integrated cooperation with KUKA Robotics, Audi, and DLR Aerospace.",
    visaWorkRights: "18-Month German Job Seeker Post-Study Visa",
    careerOutcomes: "Direct engineering recruitment across German smart manufacturing",
  },
  {
    id: "newcastle-meng",
    courseTitle: "Master of Professional Engineering (Mechanical & Robotics)",
    degreeLevel: "Master's",
    university: "University of Newcastle",
    country: "Australia",
    flag: "🇦🇺",
    rank: "173 QS",
    rankVal: 173,
    duration: "2 Years Full-Time",
    tuition: "AUD $32,000 / yr",
    tuitionVal: 32000,
    scholarship: "Excellence Scholarship (AUD $10,000)",
    discipline: "Engineering & Robotics",
    intakes: "Feb / Jul Intake",
    banner: "/universities/newcastle_nuspace.webp",
    photoTag: "NUspace Landmark Campus Building",
    aiMatchInsight: "Ranked 173 QS. Regional Australia visa extension (+1 extra year work rights = 4 years total) with AUD $10k merit scholarship.",
    visaWorkRights: "4-Year Australian Regional Post-Study Work Visa",
    careerOutcomes: "Engineers Australia accredited for fast-track PR pathway",
  },

  // ──── Global MBA & Business ────
  {
    id: "oxford-mba",
    courseTitle: "The Oxford MBA (Master of Business Administration)",
    degreeLevel: "MBA",
    university: "University of Oxford",
    country: "UK",
    flag: "🇬🇧",
    rank: "3 QS",
    rankVal: 3,
    duration: "1 Year Full-Time",
    tuition: "GBP £68,000 / yr",
    tuitionVal: 80000,
    scholarship: "Saïd Foundation & Oxford Executive Grants",
    discipline: "Business & Global MBA",
    intakes: "Sep Intake",
    banner: "/universities/oxford_radcliffe_hero.webp",
    photoTag: "Saïd Business School & Radcliffe Camera",
    aiMatchInsight: "Global top-tier executive curriculum at Saïd Business School. Intensive 1-year transformation with unmatched alumni network in 140+ countries.",
    visaWorkRights: "2-Year UK Graduate Route Visa",
    careerOutcomes: "McKinsey, BCG, Goldman Sachs, Morgan Stanley",
  },
  {
    id: "bsbi-mba",
    courseTitle: "Global MBA (Accredited European Dual Degree)",
    degreeLevel: "MBA",
    university: "Berlin School of Business and Innovation (BSBI)",
    country: "Germany",
    flag: "🇩🇪",
    rank: "Accredited EU",
    rankVal: 450,
    duration: "18 Months",
    tuition: "EUR €13,500 / yr",
    tuitionVal: 15000,
    scholarship: "Early Bird & Merit Scholarship (Up to 33% Off)",
    discipline: "Business & Global MBA",
    intakes: "Feb / May / Oct",
    banner: "/universities/bsbi_berlin_campus.webp",
    photoTag: "Berlin Campus in Alexanderplatz",
    aiMatchInsight: "Accredited European campus in the heart of Berlin startup capital. Flexible English curriculum with up to 33% early bird scholarship discount.",
    visaWorkRights: "18-Month German Post-Study Job Seeker Visa",
    careerOutcomes: "Berlin startup incubator and European corporate management",
  },
  {
    id: "coventry-mba",
    courseTitle: "MBA in International Business & Strategic Leadership",
    degreeLevel: "MBA",
    university: "Coventry University",
    country: "UK",
    flag: "🇬🇧",
    rank: "Top 30 UK",
    rankVal: 400,
    duration: "1 Year Full-Time",
    tuition: "GBP £16,800 / yr",
    tuitionVal: 21000,
    scholarship: "International Merit Award (£3,500 Off)",
    discipline: "Business & Global MBA",
    intakes: "Sep / Jan / May",
    banner: "/universities/coventry_campus_hub.webp",
    photoTag: "Coventry University Central Plaza",
    aiMatchInsight: "Top 30 UK student city with 3 flexible intakes (Sep/Jan/May). Automatic £3,500 tuition discount and CMI chartered management accreditation.",
    visaWorkRights: "2-Year UK Graduate Route Visa",
    careerOutcomes: "Chartered Management Institute (CMI) dual qualification",
  },
  {
    id: "columbia-ms-mgmt",
    courseTitle: "MS in Management Science & Global Operations",
    degreeLevel: "Master's",
    university: "Columbia University",
    country: "USA",
    flag: "🇺🇸",
    rank: "22 QS",
    rankVal: 22,
    duration: "1 Year Full-Time",
    tuition: "USD $58,000 / yr",
    tuitionVal: 58000,
    scholarship: "Columbia Graduate Fellowships Available",
    discipline: "Business & Global MBA",
    intakes: "Fall Intake",
    banner: "/universities/columbia_butler_library.webp",
    photoTag: "Butler Library & Historic Morningside Quad",
    aiMatchInsight: "Ivy League #22 QS. Manhattan networking epicenter with direct corporate access to Wall Street and global management consulting firms.",
    visaWorkRights: "3-Year US STEM OPT Work Authorization",
    careerOutcomes: "Wall Street investment banking & executive consulting",
  },
  {
    id: "dcu-msc-mgmt",
    courseTitle: "MSc in International Management & Digital Strategy",
    degreeLevel: "Master's",
    university: "Dublin City University (DCU)",
    country: "Ireland",
    flag: "🇮🇪",
    rank: "Top 1 Young Irish",
    rankVal: 420,
    duration: "1 Year Full-Time",
    tuition: "EUR €17,000 / yr",
    tuitionVal: 18500,
    scholarship: "International Merit Scholarship (€3,000)",
    discipline: "Business & Global MBA",
    intakes: "Sep Intake",
    banner: "/universities/dcu_glasnevin.webp",
    photoTag: "Glasnevin Modern Innovation Campus",
    aiMatchInsight: "Ireland's #1 Young University. AACSB accredited Business School with direct corporate consultancy projects and 97% employment rate.",
    visaWorkRights: "2-Year Irish Stay-Back Post-Study Work Visa",
    careerOutcomes: "Dublin European business hubs & FinTech enterprises",
  },

  // ──── Biotechnology, Health & Pharma ────
  {
    id: "galway-biomed",
    courseTitle: "MSc Biomedical Engineering & MedTech Innovation",
    degreeLevel: "Master's",
    university: "University of Galway",
    country: "Ireland",
    flag: "🇮🇪",
    rank: "289 QS",
    rankVal: 289,
    duration: "1 Year Full-Time",
    tuition: "EUR €19,500 / yr",
    tuitionVal: 21000,
    scholarship: "Global MedTech Grant (€5,000)",
    discipline: "Biotechnology & Health",
    intakes: "Sep Intake",
    banner: "/universities/galway_quad.webp",
    photoTag: "Historic Quadrangle Architecture",
    aiMatchInsight: "Europe's leading MedTech capital. 9 of the world's top 10 MedTech companies operate in Galway with 98% graduate employment within 6 months.",
    visaWorkRights: "2-Year Irish Stay-Back Post-Study Work Visa",
    careerOutcomes: "Medtronic, Boston Scientific, Pfizer, Johnson & Johnson",
  },
  {
    id: "trinity-pharma",
    courseTitle: "MSc in Pharmaceutical Sciences & Drug Development",
    degreeLevel: "Master's",
    university: "Trinity College Dublin",
    country: "Ireland",
    flag: "🇮🇪",
    rank: "81 QS",
    rankVal: 81,
    duration: "1 Year Full-Time",
    tuition: "EUR €20,000 / yr",
    tuitionVal: 22000,
    scholarship: "Dean of Graduate Studies Merit Award (€4,000)",
    discipline: "Biotechnology & Health",
    intakes: "Sep Intake",
    banner: "/universities/trinity_chapel_steps.webp",
    photoTag: "Historic Trinity Campus & Medical Precinct",
    aiMatchInsight: "Ranked #81 QS. Direct research collaboration with Ireland's massive pharmaceutical manufacturing sector with high clinical visa sponsorship.",
    visaWorkRights: "2-Year Irish Stay-Back Post-Study Work Visa",
    careerOutcomes: "Leading multinational pharmaceutical R&D labs",
  },
  {
    id: "herts-biotech",
    courseTitle: "MSc Biotechnology & Molecular Biology",
    degreeLevel: "Master's",
    university: "University of Hertfordshire",
    country: "UK",
    flag: "🇬🇧",
    rank: "Top Modern UK",
    rankVal: 350,
    duration: "1 Year Full-Time",
    tuition: "GBP £15,000 / yr",
    tuitionVal: 18500,
    scholarship: "STEM Innovation Grant (£3,000)",
    discipline: "Biotechnology & Health",
    intakes: "Sep / Jan Intake",
    banner: "/universities/hertfordshire_campus.webp",
    photoTag: "Science & Life Sciences Complex",
    aiMatchInsight: "Located in the UK Golden Triangle of life sciences (London-Oxford-Cambridge). State-of-the-art genomics and molecular biology suites.",
    visaWorkRights: "2-Year UK Graduate Route Visa",
    careerOutcomes: "UK life sciences and biotechnology sector placement",
  },

  // ──── FinTech & Finance ────
  {
    id: "dcu-fintech",
    courseTitle: "MSc in Financial Technology (FinTech)",
    degreeLevel: "Master's",
    university: "Dublin City University (DCU)",
    country: "Ireland",
    flag: "🇮🇪",
    rank: "Top 1 Young Irish",
    rankVal: 420,
    duration: "1 Year Full-Time",
    tuition: "EUR €16,500 / yr",
    tuitionVal: 18000,
    scholarship: "Irish International Financial Center Award (€3k)",
    discipline: "FinTech & Finance",
    intakes: "Sep Intake",
    banner: "/universities/dcu_glasnevin.webp",
    photoTag: "DCU FinTech & Innovation Center",
    aiMatchInsight: "Directly connected to Dublin's International Financial Services Centre (IFSC). Quantitative finance, blockchain, and algorithmic trading curriculum.",
    visaWorkRights: "2-Year Irish Stay-Back Post-Study Work Visa",
    careerOutcomes: "IFSC banking, algorithmic trading firms & European FinTechs",
  },
];

/* ──────────────────────────────────────────────
   Suggested Prompts & Filter Options
   ────────────────────────────────────────────── */

const PROMPT_SUGGESTIONS = [
  { label: "Computer Science & AI", query: "Computer Science AI" },
  { label: "Data Science & Big Data", query: "Data Science Big Data" },
  { label: "Robotics & Automation", query: "Robotics and Automation" },
  { label: "Global MBA & Business", query: "Global MBA" },
  { label: "Biotechnology & MedTech", query: "Biomedical Biotechnology" },
  { label: "FinTech & Financial Engineering", query: "FinTech Finance" },
  { label: "Tuition-Free Germany Public", query: "Germany Free Tuition" },
];

/* ──────────────────────────────────────────────
   Component
   ────────────────────────────────────────────── */

interface UniversitiesClientProps {
  initialUniversities?: UniversityItem[];
}

export default function UniversitiesClient({ initialUniversities }: UniversitiesClientProps) {
  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDiscipline, setSelectedDiscipline] = useState("all");
  const [selectedDegreeLevel, setSelectedDegreeLevel] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedBudget, setSelectedBudget] = useState("all");
  const [sortBy, setSortBy] = useState<"ai_match" | "ranking" | "tuition_asc" | "tuition_desc">("ai_match");

  // Shortlist State
  const [shortlist, setShortlist] = useState<string[]>([]);

  // Lead modal state
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [leadModalTitle, setLeadModalTitle] = useState("AI Course & University Evaluation");
  const [leadModalSource, setLeadModalSource] = useState("AI_COURSE_FINDER");

  // Combine database universities into course program items if available
  const allCourses = useMemo(() => {
    if (initialUniversities && initialUniversities.length > 0) {
      const dbCourses: CourseProgramItem[] = initialUniversities.map((uni) => ({
        id: `db-${uni.id}`,
        courseTitle: uni.course || "Undergraduate & Postgraduate Degree Programs",
        degreeLevel: "Master's",
        university: uni.name,
        country: uni.country,
        flag: uni.flag,
        rank: uni.rank,
        rankVal: uni.rankVal,
        duration: "1–2 Years Full-Time",
        tuition: uni.tuition,
        tuitionVal: uni.tuitionVal,
        scholarship: uni.scholarship,
        discipline: uni.discipline === "All Disciplines" ? "Computer Science & AI" : uni.discipline,
        intakes: uni.intakes || "Fall / Spring Intake",
        banner: uni.banner,
        photoTag: uni.photoTag || `${uni.name} Campus`,
        aiMatchInsight: `Verified admission pathway for ${uni.name} with dedicated counselor guidance and international application fee waivers.`,
        visaWorkRights: uni.country === "UK" ? "2-Year UK Graduate Route" : uni.country === "Germany" ? "18-Month Job Seeker Visa" : "Post-Study Work Visa Eligible",
        careerOutcomes: "Global alumni network and corporate recruitment support",
      }));

      // Combine with built-in, avoiding duplicates by university name
      const dbUniNames = new Set(dbCourses.map((c) => c.university.toLowerCase()));
      const remainingBuiltIns = COURSES_DATA.filter((c) => !dbUniNames.has(c.university.toLowerCase()));
      return [...COURSES_DATA, ...dbCourses.filter((c) => !COURSES_DATA.some(b => b.id === c.id))];
    }
    return COURSES_DATA;
  }, [initialUniversities]);

  // Natural Language Intent Detection (clean, without emojis)
  const detectedIntent = useMemo(() => {
    if (!searchTerm.trim()) return null;
    const q = searchTerm.toLowerCase();

    const intents: {
      course?: string;
      country?: string;
      discipline?: string;
      budget?: string;
      degreeLevel?: string;
    } = {};

    if (q.includes("germany") || q.includes("german")) intents.country = "Germany";
    else if (q.includes("uk") || q.includes("england") || q.includes("britain") || q.includes("london")) intents.country = "UK";
    else if (q.includes("usa") || q.includes("us ") || q.includes("america") || q.includes("united states")) intents.country = "USA";
    else if (q.includes("australia") || q.includes("sydney")) intents.country = "Australia";
    else if (q.includes("canada") || q.includes("toronto")) intents.country = "Canada";
    else if (q.includes("ireland") || q.includes("dublin")) intents.country = "Ireland";

    if (q.includes("computer science") || q.includes("cs") || q.includes("ai") || q.includes("software")) {
      intents.discipline = "Computer Science & AI";
    } else if (q.includes("data science") || q.includes("analytics") || q.includes("big data")) {
      intents.discipline = "Data Science & Analytics";
    } else if (q.includes("engineering") || q.includes("robotics") || q.includes("mechanical") || q.includes("automotive")) {
      intents.discipline = "Engineering & Robotics";
    } else if (q.includes("mba") || q.includes("business") || q.includes("management")) {
      intents.discipline = "Business & Global MBA";
    } else if (q.includes("biotech") || q.includes("pharma") || q.includes("health") || q.includes("biomedical")) {
      intents.discipline = "Biotechnology & Health";
    } else if (q.includes("fintech") || q.includes("finance")) {
      intents.discipline = "FinTech & Finance";
    }

    if (q.includes("master") || q.includes("ms ") || q.includes("msc") || q.includes("pg")) {
      intents.degreeLevel = "Master's (Postgraduate)";
    } else if (q.includes("bachelor") || q.includes("ug") || q.includes("undergrad")) {
      intents.degreeLevel = "Bachelor's (Undergraduate)";
    } else if (q.includes("mba")) {
      intents.degreeLevel = "MBA";
    }

    if (q.includes("free") || q.includes("zero tuition") || q.includes("€0")) {
      intents.budget = "Free (€0 Public)";
    } else if (q.includes("under 20k") || q.includes("cheap") || q.includes("affordable")) {
      intents.budget = "Under $20k / yr";
    } else if (q.includes("ivy") || q.includes("top 20")) {
      intents.budget = "Ivy / Tier-1";
    }

    return Object.keys(intents).length > 0 ? intents : null;
  }, [searchTerm]);

  const handleSelectPrompt = (promptQuery: string) => {
    setSearchTerm(promptQuery);
  };

  // AI Match Score calculation
  const calculateAiScore = React.useCallback(
    (course: CourseProgramItem, query: string): number => {
      let score = 88;
      const q = query.toLowerCase().trim();

      if (q) {
        if (course.courseTitle.toLowerCase().includes(q) || q.includes(course.courseTitle.toLowerCase())) score += 6;
        if (course.discipline.toLowerCase().includes(q)) score += 4;
        if (course.university.toLowerCase().includes(q)) score += 3;
        if (course.country.toLowerCase().includes(q)) score += 2;
      }

      if (selectedCountry !== "all" && course.country === selectedCountry) score += 3;
      if (selectedDiscipline !== "all" && course.discipline === selectedDiscipline) score += 4;
      if (selectedDegreeLevel !== "all" && course.degreeLevel === selectedDegreeLevel) score += 2;
      if (selectedBudget === "free" && course.tuitionVal === 0) score += 5;
      if (selectedBudget === "under20k" && course.tuitionVal > 0 && course.tuitionVal <= 20000) score += 3;

      if (course.rankVal <= 20) score += 2;

      return Math.min(score, 99);
    },
    [selectedCountry, selectedDiscipline, selectedDegreeLevel, selectedBudget]
  );

  // Filtered & Sorted Courses
  const filteredCourses = useMemo(() => {
    const list = allCourses.filter((course) => {
      // Natural language + search term filtering
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesTitle = course.courseTitle.toLowerCase().includes(q);
        const matchesUni = course.university.toLowerCase().includes(q);
        const matchesCountry = course.country.toLowerCase().includes(q);
        const matchesDiscipline = course.discipline.toLowerCase().includes(q);

        const tokens = q.split(" ").filter((t) => t.length > 2);
        const matchesToken = tokens.some(
          (t) =>
            course.courseTitle.toLowerCase().includes(t) ||
            course.university.toLowerCase().includes(t) ||
            course.country.toLowerCase().includes(t) ||
            course.discipline.toLowerCase().includes(t)
        );

        if (!matchesTitle && !matchesUni && !matchesCountry && !matchesDiscipline && !matchesToken) {
          return false;
        }
      }

      // Explicit Discipline filter
      if (selectedDiscipline !== "all" && course.discipline !== selectedDiscipline) {
        return false;
      }

      // Explicit Degree Level filter
      if (selectedDegreeLevel !== "all" && course.degreeLevel !== selectedDegreeLevel) {
        return false;
      }

      // Explicit Country filter
      if (selectedCountry !== "all" && course.country !== selectedCountry) {
        return false;
      }

      // Explicit Budget filter
      if (selectedBudget === "free" && course.tuitionVal !== 0) return false;
      if (selectedBudget === "under20k" && (course.tuitionVal === 0 || course.tuitionVal > 20000)) return false;
      if (selectedBudget === "20k_35k" && (course.tuitionVal <= 20000 || course.tuitionVal > 35000)) return false;
      if (selectedBudget === "above35k" && course.tuitionVal <= 35000) return false;

      return true;
    });

    return list.sort((a, b) => {
      if (sortBy === "ai_match") {
        const scoreA = calculateAiScore(a, searchTerm);
        const scoreB = calculateAiScore(b, searchTerm);
        if (scoreB !== scoreA) return scoreB - scoreA;
        return a.rankVal - b.rankVal;
      }
      if (sortBy === "ranking") return a.rankVal - b.rankVal;
      if (sortBy === "tuition_asc") return a.tuitionVal - b.tuitionVal;
      if (sortBy === "tuition_desc") return b.tuitionVal - a.tuitionVal;
      return 0;
    });
  }, [allCourses, searchTerm, selectedDiscipline, selectedDegreeLevel, selectedCountry, selectedBudget, sortBy, calculateAiScore]);

  // Reset all filters
  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedDiscipline("all");
    setSelectedDegreeLevel("all");
    setSelectedCountry("all");
    setSelectedBudget("all");
    setSortBy("ai_match");
  };

  // Toggle Shortlist
  const toggleShortlist = (courseId: string) => {
    setShortlist((prev) =>
      prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]
    );
  };

  // Open Lead Modal for evaluation
  const openEvaluationModal = (course?: CourseProgramItem) => {
    if (course) {
      setLeadModalTitle(`AI Eligibility Check for ${course.courseTitle} at ${course.university}`);
      setLeadModalSource(`AI_COURSE_FINDER_${course.id.toUpperCase()}`);
    } else {
      const shortlistedNames = allCourses
        .filter((c) => shortlist.includes(c.id))
        .map((c) => `${c.courseTitle} (${c.university})`)
        .join(", ");
      setLeadModalTitle(
        shortlistedNames
          ? `Export ${shortlist.length} Shortlisted Courses to Counselor`
          : "Export Course Shortlist to Counselor"
      );
      setLeadModalSource("AI_COURSE_FINDER_SHORTLIST");
    }
    setLeadModalOpen(true);
  };

  return (
    <PublicLayout>
      {/* ──── 1. Hero Section: Dedicated AI Course Finder ──── */}
      <section className="relative overflow-hidden min-h-[460px] lg:min-h-[500px] flex items-center bg-slate-950 text-white border-b border-slate-800">
        <div className="absolute inset-0 pointer-events-none select-none">
          <Image
            src="/universities/oxford_radcliffe_hero.webp"
            alt="Historic Oxford University Radcliffe Architecture"
            fill
            priority
            className="object-cover object-[center_28%] lg:object-[68%_28%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 via-42% to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/30" />
        </div>

        <div className="container max-w-6xl mx-auto px-4 py-16 lg:py-20 relative z-10">
          <div className="max-w-2xl">
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 text-xs font-semibold mb-5 backdrop-blur-xs">
              <Bot className="w-4 h-4 text-emerald-400" />
              <span>AI Course Finder &amp; University Admissions</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              AI Course Finder for{" "}
              <span className="text-emerald-400">Global University Admissions</span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-200 leading-relaxed font-normal max-w-xl">
              Search over 1,200+ undergraduate, master&apos;s, and MBA courses across the UK, Germany, USA, Australia, Canada, and Ireland. Instant AI matching for eligibility, zero-tuition German public universities, and scholarships up to 100%.
            </p>

            {/* Quick Metrics Bar */}
            <div className="mt-8 pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-200 text-xs font-medium max-w-xl">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>1,200+ Degree Courses</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>500+ Universities</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero Tuition Germany</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Fee Waivers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──── 2. Interactive AI Course Finder Search Hub ──── */}
      <section className="py-12 bg-slate-50 min-h-screen">
        <div className="container max-w-6xl mx-auto px-4">

          {/* Search Control Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs mb-8 space-y-4">
            
            {/* Control Bar Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-700" />
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  AI Degree Match &amp; Course Exploration Hub
                </span>
              </div>

              {shortlist.length > 0 && (
                <button
                  type="button"
                  onClick={() => openEvaluationModal()}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <BookmarkCheck className="w-3.5 h-3.5" />
                  <span>{shortlist.length} Shortlisted Courses</span>
                </button>
              )}
            </div>

            {/* Prominent Course Search Bar */}
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Enter course title or field (e.g. Master's in Data Science, Robotics Engineering, MBA, Biotechnology, Computer Science)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-20 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:bg-white transition-all font-medium"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-700 px-2 py-1 rounded cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick-Select Course Categories */}
            <div className="pt-1">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                Popular Course Disciplines:
              </div>
              <div className="flex flex-wrap gap-2">
                {PROMPT_SUGGESTIONS.map((sug) => (
                  <button
                    key={sug.label}
                    type="button"
                    onClick={() => handleSelectPrompt(sug.query)}
                    className="px-3 py-1.5 rounded-full bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 text-xs font-medium transition-all cursor-pointer"
                  >
                    {sug.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Detected AI Intent Callout */}
            {detectedIntent && (
              <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/90 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex flex-wrap items-center gap-2 text-emerald-900 font-medium">
                  <Bot className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="font-semibold">AI Match Engine Detected:</span>
                  {detectedIntent.discipline && (
                    <span className="px-2 py-0.5 rounded-md bg-white border border-emerald-200 font-bold text-emerald-800">
                      Discipline: {detectedIntent.discipline}
                    </span>
                  )}
                  {detectedIntent.country && (
                    <span className="px-2 py-0.5 rounded-md bg-white border border-emerald-200 font-bold text-emerald-800">
                      Country: {detectedIntent.country}
                    </span>
                  )}
                  {detectedIntent.degreeLevel && (
                    <span className="px-2 py-0.5 rounded-md bg-white border border-emerald-200 font-bold text-emerald-800">
                      Degree: {detectedIntent.degreeLevel}
                    </span>
                  )}
                  {detectedIntent.budget && (
                    <span className="px-2 py-0.5 rounded-md bg-white border border-emerald-200 font-bold text-emerald-800">
                      Budget: {detectedIntent.budget}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="text-emerald-700 hover:text-emerald-900 font-semibold text-[11px] underline cursor-pointer"
                >
                  Clear Intent
                </button>
              </div>
            )}

            {/* Multi-Filter Dropdown Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 pt-2">
              {/* Discipline Filter */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                  Subject / Discipline
                </label>
                <select
                  value={selectedDiscipline}
                  onChange={(e) => setSelectedDiscipline(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:outline-none focus:border-emerald-600 cursor-pointer"
                >
                  <option value="all">All Disciplines</option>
                  <option value="Computer Science & AI">Computer Science &amp; AI</option>
                  <option value="Data Science & Analytics">Data Science &amp; Analytics</option>
                  <option value="Engineering & Robotics">Engineering &amp; Robotics</option>
                  <option value="Business & Global MBA">Business &amp; Global MBA</option>
                  <option value="Biotechnology & Health">Biotechnology &amp; Health</option>
                  <option value="FinTech & Finance">FinTech &amp; Finance</option>
                </select>
              </div>

              {/* Degree Level Filter */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                  Degree Level
                </label>
                <select
                  value={selectedDegreeLevel}
                  onChange={(e) => setSelectedDegreeLevel(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:outline-none focus:border-emerald-600 cursor-pointer"
                >
                  <option value="all">All Degree Levels</option>
                  <option value="Master's">Master&apos;s (Postgraduate)</option>
                  <option value="Bachelor's">Bachelor&apos;s (Undergraduate)</option>
                  <option value="MBA">Global MBA</option>
                </select>
              </div>

              {/* Country Filter */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                  Destination Country
                </label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:outline-none focus:border-emerald-600 cursor-pointer"
                >
                  <option value="all">All Destinations</option>
                  <option value="UK">United Kingdom</option>
                  <option value="Germany">Germany (Tuition-Free)</option>
                  <option value="USA">United States</option>
                  <option value="Australia">Australia</option>
                  <option value="Canada">Canada</option>
                  <option value="Ireland">Ireland</option>
                </select>
              </div>

              {/* Budget Filter */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                  Tuition Budget
                </label>
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:outline-none focus:border-emerald-600 cursor-pointer"
                >
                  <option value="all">Any Tuition Budget</option>
                  <option value="free">Free (€0 Public)</option>
                  <option value="under20k">Under $20,000 / yr</option>
                  <option value="20k_35k">$20k – $35k / yr</option>
                  <option value="above35k">$35k+ / yr (Ivy &amp; Tier-1)</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                  Sort Results
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "ai_match" | "ranking" | "tuition_asc" | "tuition_desc")}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:outline-none focus:border-emerald-600 cursor-pointer"
                >
                  <option value="ai_match">AI Match Score (Highest)</option>
                  <option value="ranking">QS World Ranking</option>
                  <option value="tuition_asc">Tuition: Low to High</option>
                  <option value="tuition_desc">Tuition: High to Low</option>
                </select>
              </div>
            </div>

            {/* Results Counter & Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
              <span className="text-slate-500">
                Matched <strong className="text-slate-900 font-bold">{filteredCourses.length}</strong> courses across verified partner institutions
              </span>

              <div className="flex items-center gap-3">
                {(searchTerm || selectedDiscipline !== "all" || selectedDegreeLevel !== "all" || selectedCountry !== "all" || selectedBudget !== "all") && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-slate-600 hover:text-emerald-700 font-semibold inline-flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset All Filters</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => openEvaluationModal()}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold border border-emerald-200/80 inline-flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Export Shortlist to Counselor</span>
                </button>
              </div>
            </div>

          </div>

          {/* ──── Course Cards Grid ──── */}
          {filteredCourses.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto my-12 shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No Direct Course Matches</h3>
              <p className="text-xs text-slate-500 mt-2 mb-6 leading-relaxed">
                No course programs matched your search for &quot;{searchTerm}&quot;. Try adjusting your keywords or clearing active filters.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all cursor-pointer"
                >
                  Clear Filters
                </button>
                <button
                  type="button"
                  onClick={() => openEvaluationModal()}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                >
                  Consult Counselor Free
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, idx) => {
                const matchScore = calculateAiScore(course, searchTerm);
                const isShortlisted = shortlist.includes(course.id);

                return (
                  <div
                    key={course.id}
                    className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Campus Frame */}
                      <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                        <Image
                          src={course.banner}
                          alt={`${course.university} Campus`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={idx < 3}
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent pointer-events-none" />

                        {/* Top-Left: Country Flag & Destination */}
                        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-xs text-slate-900 text-xs font-bold border border-white/80 shadow-xs">
                          <span>{course.flag}</span>
                          <span>{course.country}</span>
                        </div>

                        {/* Top-Right: AI Match Score */}
                        <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-lg bg-emerald-700/95 backdrop-blur-xs text-white text-xs font-bold shadow-xs">
                          {matchScore}% Match
                        </div>

                        {/* Bottom Tag: Degree Level & Rank */}
                        <div className="absolute bottom-2.5 left-3 z-10 flex items-center gap-2 text-[10px] text-white font-semibold">
                          <span className="bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded">
                            {course.degreeLevel}
                          </span>
                          <span className="bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded">
                            #{course.rank}
                          </span>
                        </div>

                        {/* Shortlist Bookmark Button */}
                        <button
                          type="button"
                          onClick={() => toggleShortlist(course.id)}
                          aria-label={isShortlisted ? "Remove from shortlist" : "Add to shortlist"}
                          className={`absolute bottom-2.5 right-3 z-10 p-1.5 rounded-lg backdrop-blur-xs transition-all cursor-pointer ${
                            isShortlisted
                              ? "bg-emerald-600 text-white shadow-xs"
                              : "bg-black/50 text-white hover:bg-emerald-600"
                          }`}
                        >
                          {isShortlisted ? (
                            <BookmarkCheck className="w-3.5 h-3.5" />
                          ) : (
                            <Bookmark className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      {/* Course Card Details */}
                      <div className="p-5">
                        {/* Course Title */}
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 mb-1.5 leading-snug">
                          {course.courseTitle}
                        </h3>

                        {/* University Name */}
                        <div className="text-xs font-semibold text-slate-600 mb-3 flex items-center gap-1">
                          <GraduationCap className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                          <span className="truncate">{course.university}</span>
                        </div>

                        {/* Metadata Grid */}
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between py-1 border-b border-slate-100">
                            <span className="text-slate-500">Duration:</span>
                            <span className="font-semibold text-slate-800">{course.duration}</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-100">
                            <span className="text-slate-500">Tuition Fees:</span>
                            <span className="font-bold text-emerald-700 font-mono">{course.tuition}</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-100">
                            <span className="text-slate-500">Intakes:</span>
                            <span className="font-medium text-slate-700">{course.intakes}</span>
                          </div>
                        </div>

                        {/* Scholarship Badge */}
                        <div className="mt-3 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100/80 flex items-start gap-1.5">
                          <Award className="w-3.5 h-3.5 text-emerald-700 mt-0.5 shrink-0" />
                          <span className="text-[11px] font-semibold text-emerald-800 leading-tight">
                            {course.scholarship}
                          </span>
                        </div>

                        {/* AI Match Insight Box */}
                        <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-700 space-y-1">
                          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-800">
                            <Bot className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                            <span>AI Course Evaluation:</span>
                          </div>
                          <p className="text-[11px] text-slate-600 leading-relaxed">
                            {course.aiMatchInsight}
                          </p>
                          <div className="pt-1 flex items-center gap-1 text-[10px] text-emerald-700 font-semibold">
                            <ShieldCheck className="w-3 h-3 shrink-0" />
                            <span>{course.visaWorkRights}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Action Button */}
                    <div className="p-5 pt-0">
                      <button
                        type="button"
                        onClick={() => openEvaluationModal(course)}
                        className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 text-center cursor-pointer"
                      >
                        <span>Check Course Eligibility &amp; Apply</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ──── Bottom Counselling & Shortlist Export Banner ──── */}
          <div className="mt-16 bg-gradient-to-br from-[#0A7D45] via-emerald-700 to-[#075A32] rounded-3xl p-8 sm:p-10 text-white shadow-premium flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl">
              <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold mb-3 border border-white/20">
                100% Free Admissions Mentoring
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold mb-2">
                Need Help Finding the Right Course?
              </h3>
              <p className="text-emerald-100 text-sm leading-relaxed">
                Our certified global counselors evaluate your CGPA, IELTS/PTE scores, and budget to provide a tailored university shortlist with application fee waivers.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                type="button"
                onClick={() => openEvaluationModal()}
                className="px-6 py-3.5 rounded-2xl bg-white text-emerald-900 hover:bg-emerald-50 font-bold text-sm shadow-md transition-all whitespace-nowrap cursor-pointer text-center"
              >
                Export Course Shortlist
              </button>
              <Link
                href="/#hero-section"
                className="px-6 py-3.5 rounded-2xl bg-emerald-900/50 hover:bg-emerald-900/70 border border-white/20 text-white font-bold text-sm transition-all whitespace-nowrap text-center"
              >
                Book Free Consultation
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ──── 3. Lead Evaluation Modal ──── */}
      <LeadModal
        isOpen={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        title={leadModalTitle}
        source={leadModalSource}
      />
    </PublicLayout>
  );
}
