"use client";

import React, { useState } from "react";
import { 
  ExternalLink, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Globe2, 
  MapPin, 
  ChevronDown, 
  Bed, 
  Home, 
  FileCheck, 
  PhoneCall, 
  HelpCircle,
  Percent,
  Users
} from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";

const AMBER_PORTAL_URL = "https://uesabroad.studentacco.com/";

const DESTINATION_HUBS = [
  {
    city: "London",
    country: "United Kingdom",
    flag: "🇬🇧",
    rentRange: "£180 – £360 / wk",
    universities: "UCL, King's College, Imperial, Queen Mary",
    highlight: "Bills & high-speed WiFi included",
    badge: "50,000+ Beds",
  },
  {
    city: "Manchester & Birmingham",
    country: "United Kingdom",
    flag: "🇬🇧",
    rentRange: "£140 – £260 / wk",
    universities: "Uni of Manchester, UoB, Aston, MMU",
    highlight: "Walking distance to city-centre campuses",
    badge: "Top Value",
  },
  {
    city: "Dublin & Galway",
    country: "Ireland",
    flag: "🇮🇪",
    rentRange: "€190 – €320 / wk",
    universities: "Trinity Dublin, UCD, DCU, Uni of Galway",
    highlight: "Official IRP residence registration ready",
    badge: "High Demand",
  },
  {
    city: "Munich & Berlin",
    country: "Germany",
    flag: "🇩🇪",
    rentRange: "€450 – €780 / mo",
    universities: "TUM, LMU Munich, HU Berlin, TU Berlin",
    highlight: "100% Anmeldung-guaranteed contracts",
    badge: "Anmeldung Ready",
  },
  {
    city: "Melbourne & Sydney",
    country: "Australia",
    flag: "🇦🇺",
    rentRange: "A$280 – A$490 / wk",
    universities: "Uni of Melbourne, Monash, UNSW, USYD",
    highlight: "PBSA with gyms, pools & cinema lounges",
    badge: "PBSA Living",
  },
  {
    city: "Toronto & Vancouver",
    country: "Canada",
    flag: "🇨🇦",
    rentRange: "C$850 – C$1,450 / mo",
    universities: "Uni of Toronto, UBC, York, TMU",
    highlight: "Furnished student lofts near metro lines",
    badge: "Verified Lofts",
  },
];

const ROOM_TYPES = [
  {
    title: "Private Studio",
    subtitle: "Complete Independence",
    icon: Home,
    desc: "Self-contained student apartment with private ensuite bathroom and fully-equipped private kitchenette.",
    perks: ["Private ensuite bathroom", "Private kitchenette & fridge", "Dedicated study desk", "All utilities included"],
  },
  {
    title: "Ensuite Room",
    subtitle: "Most Popular Choice",
    icon: Bed,
    desc: "Private bedroom with private ensuite bathroom, sharing a modern kitchen, dining, and lounge area with flatmates.",
    perks: ["Private attached bathroom", "Shared social kitchen & lounge", "Roommate matching available", "All bills & WiFi covered"],
  },
  {
    title: "Non-Ensuite / Shared WG",
    subtitle: "Budget-Friendly Favourite",
    icon: Users,
    desc: "Private bedroom with shared bathroom and kitchen facilities. Excellent for cultural immersion and lower monthly rent.",
    perks: ["Lower monthly rental cost", "Spacious shared living areas", "High-speed broadband", "Anmeldung/Registration ready"],
  },
  {
    title: "PBSA Student Residences",
    subtitle: "Full-Service Living",
    icon: Building2,
    desc: "Purpose-built student apartment communities featuring communal gyms, games rooms, study pods, and 24/7 on-site security.",
    perks: ["24/7 CCTV & front desk security", "On-site gym & cinema room", "Regular resident social events", "Secure parcel delivery"],
  },
];

const COMPARISON_POINTS = [
  {
    feature: "Identity & Lease Verification",
    amber: "100% verified PBSA institutions & audited property managers",
    unverified: "High risk of phantom landlords, scams & fake Facebook listings",
  },
  {
    feature: "Utility Bills & Internet",
    amber: "All-inclusive (electricity, water, heating & high-speed WiFi)",
    unverified: "Extra unpredictable bills (typically +€100 to €250/month)",
  },
  {
    feature: "Embassy Visa & City Registration",
    amber: "Official tenancy letters provided for visa applications & German Anmeldung",
    unverified: "Private landlords frequently refuse official city registration",
  },
  {
    feature: "Cancellation Safeguards",
    amber: "'No Visa, No Pay' policy — 100% refund if your student visa is rejected",
    unverified: "Deposits are routinely forfeited without any legal recourse",
  },
  {
    feature: "Price Match Guarantee",
    amber: "Guaranteed lowest price on institutional student residences",
    unverified: "Inflated agent markups and hidden sub-lease commissions",
  },
  {
    feature: "24/7 Dedicated Support",
    amber: "1-on-1 Amber booking specialist alongside your UES Abroad counsellor",
    unverified: "Zero customer service once advance deposit is sent",
  },
];

const FAQS = [
  {
    q: "How does the dedicated UES Abroad Amber portal work?",
    a: "UES Abroad has partnered with Amber (amberstudent.com), the world's leading student housing marketplace. Through our dedicated portal at uesabroad.studentacco.com, you get instant access to 1M+ verified student beds across 250+ global cities with live availability, 3D virtual tours, and pre-negotiated partner pricing."
  },
  {
    q: "Why do we redirect to uesabroad.studentacco.com instead of booking here?",
    a: "Student housing availability changes second-by-second across global university hubs. The dedicated portal connects directly to live property management systems, allowing you to view real-time room availability, inspect 3D interactive virtual tours, compare exact lease durations, and secure your room with price-match guarantees."
  },
  {
    q: "What is the 'No Visa, No Pay' policy?",
    a: "If your student visa application is delayed or rejected by the embassy, or if you do not meet your university's conditional admission offer, you can cancel your accommodation booking with zero cancellation fees and receive a 100% refund on your advance deposit upon submitting proof."
  },
  {
    q: "Are utility bills included in the displayed rent?",
    a: "Yes. The vast majority of properties listed on the UES Abroad portal include all utility bills — water, heating, electricity, and superfast student WiFi — directly in the monthly rent. This protects you from unexpected winter heating surcharges or utility inflation."
  },
  {
    q: "Will I get official lease documents for my student visa and city registration?",
    a: "Yes. Once your booking is confirmed, you receive an official Tenancy Agreement and proof of address letter. In Germany, properties provide the mandatory Wohnungsgeberbestätigung required for city registration (Anmeldung). In the UK and Ireland, the tenancy confirmation is accepted directly for visa and residence permit applications."
  },
  {
    q: "Can parents or sponsors book or pay on the student's behalf?",
    a: "Yes. Parents or guardians can complete the reservation, sign as a guarantor if required by local tenancy regulations, and remit payments via credit card, international debit card, or foreign wire transfer."
  },
  {
    q: "When should I book my student accommodation?",
    a: "We strongly recommend booking your accommodation as soon as you receive your university offer letter. High-demand student hubs like London, Dublin, Munich, and Melbourne experience severe housing shortages, and the best-value rooms near campuses typically sell out 3 to 6 months before the intake."
  }
];

export default function AccommodationPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadCountry, setLeadCountry] = useState("United Kingdom");
  const [leadCity, setLeadCity] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadName,
          email: leadEmail,
          phone: leadPhone,
          source: "HOUSING_AMBER_ADVISORY",
          targetCountry: leadCountry,
          targetDegree: "Student Housing Assistance",
          metadata: {
            preferredCity: leadCity,
            portal: "uesabroad.studentacco.com",
          },
        }),
      });
      setLeadSubmitted(true);
    } catch (err) {
      console.error("Failed to submit housing request:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PublicLayout>
      {/* 1. Hero Section - Clean, Executive White & Slate Theme with Emerald Accents */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200/80 pt-16 pb-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold mb-4 shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Official Amber Partnership • 1M+ Verified Student Beds Worldwide</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              Verified Student Housing &amp;{" "}
              <span className="text-emerald-700">Accommodation Portal</span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
              UES Abroad has integrated directly with Amber (amberstudent.com) to provide students with 100% scam-free, pre-inspected student housing near top universities with price match guarantees.
            </p>
          </div>

          {/* Focal Gateway Launch Hero Card - Clean White & Emerald Border */}
          <div className="max-w-4xl mx-auto rounded-3xl bg-white border border-emerald-200/90 p-8 sm:p-12 shadow-lg relative overflow-hidden">
            {/* Top emerald accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-700 via-emerald-500 to-emerald-400" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-slate-100">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-bold font-mono mb-3">
                  <Globe2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>uesabroad.studentacco.com</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Launch the Dedicated UES Accommodation Portal
                </h2>
                <p className="text-sm text-slate-600 mt-2 max-w-lg leading-relaxed">
                  Search across 1M+ verified rooms, private studios, and student dorms with 3D virtual tours, live availability, and official tenancy documentation.
                </p>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-3">
                <a
                  href={AMBER_PORTAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base shadow-sm hover:shadow-md active:scale-[0.98] transition-all group"
                >
                  <span>Open Dedicated Housing Portal</span>
                  <ExternalLink className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <span className="text-[11px] text-center text-slate-500 font-medium">
                  Instant Access • Zero Booking Fee
                </span>
              </div>
            </div>

            {/* 4 Core Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100/70 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-slate-900 text-xs font-bold">1M+ Verified Beds</strong>
                  <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">250+ student cities across UK, EU &amp; ANZ</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100/70 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                  <Percent className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-slate-900 text-xs font-bold">Price Match Guarantee</strong>
                  <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">Direct institutional PBSA pricing</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100/70 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-slate-900 text-xs font-bold">100% Scam-Free</strong>
                  <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">Verified properties &amp; legal contracts</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100/70 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                  <FileCheck className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-slate-900 text-xs font-bold">No Visa, No Pay</strong>
                  <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">100% refund on visa refusal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Destination Hubs Grid with Direct Portal Links */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-semibold mb-3">
                <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                <span>Global Student Hubs</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Popular Student Cities &amp; Campus Residences
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
                Explore student housing options near major partner universities with all utilities included.
              </p>
            </div>

            <a
              href={AMBER_PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white font-bold text-xs tracking-wide uppercase transition-all shadow-xs shrink-0 self-start md:self-auto"
            >
              <span>Explore All Cities</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DESTINATION_HUBS.map((hub) => (
              <div
                key={hub.city}
                className="bg-white rounded-3xl border border-slate-200/90 p-7 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-3xl">{hub.flag}</span>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/70 text-[11px] font-bold">
                      {hub.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {hub.city}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {hub.country}
                  </p>

                  <div className="my-5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
                    <div className="flex items-baseline justify-between text-xs">
                      <span className="text-slate-500 font-medium">Typical Rent:</span>
                      <strong className="text-slate-900 font-mono font-bold">{hub.rentRange}</strong>
                    </div>
                    <div className="text-[11px] text-slate-600 leading-snug">
                      <span className="text-slate-400 font-medium">Near: </span>
                      <span className="font-medium text-slate-700">{hub.universities}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 flex items-center gap-1.5 mb-6">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{hub.highlight}</span>
                  </p>
                </div>

                <a
                  href={AMBER_PORTAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 group-hover:bg-emerald-600 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Search Rooms in {hub.city.split("&")[0].trim()}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Room Types Guide */}
      <section className="py-20 bg-white border-b border-slate-200/80">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-semibold mb-3">
              <Bed className="w-3.5 h-3.5 text-emerald-700" />
              <span>Room Options Guide</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Choose the Room Style That Fits Your Lifestyle
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
              From private studios to vibrant shared student apartments, Amber provides every style of living.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ROOM_TYPES.map((type) => {
              const Icon = type.icon;
              return (
                <div
                  key={type.title}
                  className="bg-white rounded-3xl border border-slate-200/90 p-7 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 mb-5">
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                      {type.subtitle}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mb-2.5">
                      {type.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-6">
                      {type.desc}
                    </p>

                    <div className="space-y-2 pt-4 border-t border-slate-100 text-xs text-slate-600">
                      {type.perks.map((perk) => (
                        <div key={perk} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6">
                    <a
                      href={AMBER_PORTAL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                    >
                      <span>Browse {type.title}s</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Why Book via UES Abroad x Amber (Comparison Table) */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Security &amp; Peace of Mind</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              UES Abroad × Amber vs. Unverified Private Rentals
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
              Why thousands of international students avoid unverified classifieds and choose our verified partner portal.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs">
            <div className="grid grid-cols-12 bg-slate-900 text-white p-5 text-xs font-bold uppercase tracking-wider">
              <div className="col-span-4 sm:col-span-4">Protection Feature</div>
              <div className="col-span-4 sm:col-span-4 text-emerald-400">UES Abroad × Amber</div>
              <div className="col-span-4 sm:col-span-4 text-slate-400">Unverified Private Ads</div>
            </div>

            <div className="divide-y divide-slate-100">
              {COMPARISON_POINTS.map((pt, i) => (
                <div 
                  key={pt.feature} 
                  className={`grid grid-cols-12 p-5 text-xs sm:text-sm items-center gap-2 ${
                    i % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                  }`}
                >
                  <div className="col-span-4 sm:col-span-4 font-bold text-slate-900">
                    {pt.feature}
                  </div>
                  <div className="col-span-4 sm:col-span-4 text-emerald-800 font-medium flex items-start gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{pt.amber}</span>
                  </div>
                  <div className="col-span-4 sm:col-span-4 text-slate-500 leading-snug">
                    {pt.unverified}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. How It Works (4-Step Flow) */}
      <section className="py-20 bg-white border-b border-slate-200/80">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-semibold mb-3">
              <Clock className="w-3.5 h-3.5 text-emerald-700" />
              <span>4-Step Seamless Process</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              How Booking Works Through the Portal
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
              From university search to collecting your room keys abroad.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-50 rounded-3xl p-7 border border-slate-200/80 relative space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white font-extrabold text-sm flex items-center justify-center shadow-xs">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900">Search Your Campus</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Launch <span className="font-semibold text-slate-800">uesabroad.studentacco.com</span> and enter your university name or destination city.
              </p>
            </div>

            <div className="bg-slate-50 rounded-3xl p-7 border border-slate-200/80 relative space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white font-extrabold text-sm flex items-center justify-center shadow-xs">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900">Explore 3D Virtual Tours</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Inspect high-resolution floor plans, room photographs, and amenities. Filter by budget and distance to classes.
              </p>
            </div>

            <div className="bg-slate-50 rounded-3xl p-7 border border-slate-200/80 relative space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white font-extrabold text-sm flex items-center justify-center shadow-xs">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900">Reserve Online</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Reserve your room online with price match guarantee and zero agency booking charges.
              </p>
            </div>

            <div className="bg-slate-50 rounded-3xl p-7 border border-slate-200/80 relative space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white font-extrabold text-sm flex items-center justify-center shadow-xs">
                4
              </div>
              <h3 className="text-base font-bold text-slate-900">Lease &amp; Visa Letter</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive official tenancy agreements for your visa application and land smoothly with pre-arranged accommodation.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <a
              href={AMBER_PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-sm transition-all"
            >
              <span>Get Started on the Portal</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 6. FAQ Accordion Section */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-semibold mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
              <span>Got Questions?</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Everything you need to know about booking international student housing through UES Abroad.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={faq.q}
                  className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full text-left p-6 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-emerald-700 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-emerald-600" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-0 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                      <p className="pt-4">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Need Help / Personalized Housing Advisory Form */}
      <section className="py-20 bg-white border-b border-slate-200/80">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Personalized 1-on-1 Assistance</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                  Need Help Finding the Right Student Room?
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed font-normal">
                  If you have special requirements, need roommate matching, or want help comparing student halls near your university campus, submit your details and a housing officer will contact you.
                </p>

                <div className="pt-4 space-y-2 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Free service for all UES Abroad students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Direct coordination with Amber booking managers</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="bg-white rounded-2xl p-6 sm:p-8 text-slate-900">
                  {leadSubmitted ? (
                    <div className="text-center py-8 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">Request Received</h3>
                      <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                        Thank you, <strong>{leadName}</strong>. Our student housing officer will reach out on WhatsApp/phone within 24 hours.
                      </p>
                      <a
                        href={AMBER_PORTAL_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-xs"
                      >
                        <span>Meanwhile, Explore Portal</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ) : (
                    <form onSubmit={handleLeadSubmit} className="space-y-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={leadName}
                          onChange={(e) => setLeadName(e.target.value)}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:border-emerald-600"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-semibold text-slate-700 block mb-1">Phone / WhatsApp *</label>
                          <input
                            type="tel"
                            required
                            value={leadPhone}
                            onChange={(e) => setLeadPhone(e.target.value)}
                            placeholder="+91 98765 43210"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:border-emerald-600"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-slate-700 block mb-1">Email Address</label>
                          <input
                            type="email"
                            value={leadEmail}
                            onChange={(e) => setLeadEmail(e.target.value)}
                            placeholder="rahul@example.com"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:border-emerald-600"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-semibold text-slate-700 block mb-1">Target Country</label>
                          <select
                            value={leadCountry}
                            onChange={(e) => setLeadCountry(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:border-emerald-600 bg-white"
                          >
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="Ireland">Ireland</option>
                            <option value="Germany">Germany</option>
                            <option value="Australia">Australia</option>
                            <option value="Canada">Canada</option>
                            <option value="United States">United States</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-slate-700 block mb-1">Target City / University</label>
                          <input
                            type="text"
                            value={leadCity}
                            onChange={(e) => setLeadCity(e.target.value)}
                            placeholder="e.g. London / UCL"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:border-emerald-600"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs tracking-wider uppercase transition-all shadow-sm active:scale-[0.98] disabled:opacity-60 cursor-pointer"
                      >
                        {isSubmitting ? "Submitting..." : "Request Housing Callback"}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Compliance & Legal Disclaimer */}
      <section className="py-10 bg-slate-50 text-slate-500 text-xs">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-2">
            <strong className="block text-slate-800 font-bold">Third-Party Platform Disclosure</strong>
            <p className="leading-relaxed">
              UES Abroad facilitates global student housing access via its official partnership with Amber (amberstudent.com / studentacco.com). Tenancy agreements, room allocations, lease contracts, and property management policies are directly governed between the student and the respective student accommodation provider or institutional landlord.
            </p>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
