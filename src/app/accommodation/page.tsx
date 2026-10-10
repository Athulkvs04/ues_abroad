"use client";

import React, { useState, useMemo, useRef } from "react";
import { Shield, Banknote, FileText, AlertTriangle } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { LeadModal } from "@/components/home/LeadModal";

interface RoomListing {
  id: string;
  title: string;
  photo: string;
  city: string;
  country: string;
  flag: string;
  type: "Shared WG" | "Private Studio" | "Student Dormitory" | "Homestay Family";
  priceLocal: string;
  priceInr: string;
  proximity: string;
  amenities: string[];
  availability: string;
  partner: string;
  roomSize: string;
}

const ROOM_LISTINGS: RoomListing[] = [
  {
    id: "muc-1",
    title: "Maximilianeum Scholar Studio",
    photo: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80",
    city: "Munich",
    country: "Germany",
    flag: "🇩🇪",
    type: "Private Studio",
    priceLocal: "€650 / mo",
    priceInr: "≈ ₹58,800",
    proximity: "8 min walk to TU Munich",
    amenities: ["Private Kitchenette", "En-suite Bath", "Anmeldung Ready"],
    availability: "Immediate",
    partner: "Fintiba Housing",
    roomSize: "22 m²",
  },
  {
    id: "muc-2",
    title: "Olympiapark Student WG Room",
    photo: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80",
    city: "Munich",
    country: "Germany",
    flag: "🇩🇪",
    type: "Shared WG",
    priceLocal: "€490 / mo",
    priceInr: "≈ ₹44,300",
    proximity: "12 min U-Bahn to LMU",
    amenities: ["Bills Included", "Furnished", "Anmeldung Ready"],
    availability: "Available",
    partner: "Munich Student Living",
    roomSize: "16 m²",
  },
  {
    id: "lon-1",
    title: "Bloomsbury Scholar En-Suite",
    photo: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=600&q=80",
    city: "London",
    country: "United Kingdom",
    flag: "🇬🇧",
    type: "Student Dormitory",
    priceLocal: "£280 / wk",
    priceInr: "≈ ₹1,18,000",
    proximity: "6 min walk to UCL",
    amenities: ["24/7 Security", "Private Bath", "All Bills Included"],
    availability: "Immediate",
    partner: "Unite Students",
    roomSize: "18 m²",
  },
  {
    id: "lon-2",
    title: "Kensington Terrace Studio",
    photo: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80",
    city: "London",
    country: "United Kingdom",
    flag: "🇬🇧",
    type: "Private Studio",
    priceLocal: "£340 / wk",
    priceInr: "≈ ₹1,44,000",
    proximity: "10 min walk to Imperial",
    amenities: ["Private Kitchen", "Superfast WiFi", "Bills Included"],
    availability: "2 Left",
    partner: "Chapter London",
    roomSize: "24 m²",
  },
  {
    id: "tor-1",
    title: "Downtown Campus Residence",
    photo: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80",
    city: "Toronto",
    country: "Canada",
    flag: "🇨🇦",
    type: "Student Dormitory",
    priceLocal: "CAD $980 / mo",
    priceInr: "≈ ₹60,200",
    proximity: "7 min walk to UofT",
    amenities: ["Hydro & WiFi", "Furnished", "Subway Access"],
    availability: "Available",
    partner: "Campus Living Canada",
    roomSize: "19 m²",
  },
  {
    id: "tor-2",
    title: "Bloor West Student Loft",
    photo: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80",
    city: "Toronto",
    country: "Canada",
    flag: "🇨🇦",
    type: "Shared WG",
    priceLocal: "CAD $780 / mo",
    priceInr: "≈ ₹47,900",
    proximity: "15 min to York Uni",
    amenities: ["Full Kitchen", "Laundry", "Roommate Match"],
    availability: "Immediate",
    partner: "Toronto Student Living",
    roomSize: "15 m²",
  },
  {
    id: "mel-1",
    title: "Parkville Garden Studio",
    photo: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80",
    city: "Melbourne",
    country: "Australia",
    flag: "🇦🇺",
    type: "Private Studio",
    priceLocal: "AUD $390 / wk",
    priceInr: "≈ ₹85,500",
    proximity: "5 min walk to Uni Melbourne",
    amenities: ["Air Conditioned", "Balcony", "All Utilities"],
    availability: "Available",
    partner: "Scape Australia",
    roomSize: "21 m²",
  },
  {
    id: "mel-2",
    title: "Carlton Heritage Homestay",
    photo: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80",
    city: "Melbourne",
    country: "Australia",
    flag: "🇦🇺",
    type: "Homestay Family",
    priceLocal: "AUD $310 / wk",
    priceInr: "≈ ₹68,000",
    proximity: "12 min tram to RMIT",
    amenities: ["Daily Meals", "Private Room", "Bills Included"],
    availability: "Immediate",
    partner: "Australian Homestay",
    roomSize: "18 m²",
  },
];

export default function AccommodationPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState<string | undefined>(undefined);

  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  const [activeSelectedRoom, setActiveSelectedRoom] = useState<RoomListing | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [destination, setDestination] = useState("Germany");
  const [housingType, setHousingType] = useState("Shared Apartment (WG)");
  const [budget, setBudget] = useState("€550 - €750 / month");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const formRef = useRef<HTMLDivElement>(null);

  const handleOpenModal = (source?: string) => {
    setModalSource(source);
    setIsModalOpen(true);
  };

  const filteredRooms = useMemo(() => {
    return ROOM_LISTINGS.filter((room) => {
      if (selectedCity !== "All" && room.city !== selectedCity) return false;
      if (selectedType !== "All" && room.type !== selectedType) return false;
      return true;
    });
  }, [selectedCity, selectedType]);

  const handleRequestRoom = (room: RoomListing) => {
    setActiveSelectedRoom(room);
    setDestination(room.country);
    
    if (room.type === "Private Studio") setHousingType("Private Studio");
    else if (room.type === "Shared WG") setHousingType("Shared Apartment (WG)");
    else if (room.type === "Student Dormitory") setHousingType("Student Dormitory");
    else setHousingType("Homestay");

    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) return;

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          source: "HOUSING_ACCOMMODATION",
          targetCountry: destination,
          targetDegree: housingType,
          metadata: {
            budget,
            destination,
            housingType,
            requestedRoomId: activeSelectedRoom?.id || null,
            requestedRoomTitle: activeSelectedRoom?.title || null,
          },
        }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Failed to submit accommodation request:", err);
      setSubmitError("Error submitting request. Please try again or reach out on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PublicLayout onOpenConsultModal={() => handleOpenModal("Accommodation Portal")}>
      {/* Header Banner - Clean, spacious, and punchy */}
      <div className="bg-slate-900 py-20 text-white border-b border-slate-800">
        <div className="container max-w-6xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold mb-4">
            <span>Verified Student Accommodation</span>
            <span>•</span>
            <span>Zero Brokerage Fees</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Verified Student Housing Near Top Universities
          </h1>

          <p className="text-sm sm:text-base text-slate-300 mt-4 max-w-2xl leading-relaxed">
            Scam-free, furnished student apartments and dorms across Germany, the UK, Canada, and Australia with official visa proof letters.
          </p>

          {/* Quick Metrics - Spacious & modern */}
          <div className="flex flex-wrap gap-10 sm:gap-14 mt-10 pt-8 border-t border-slate-800/80 text-xs">
            <div>
              <strong className="text-xl font-bold text-white block">4,200+</strong>
              <span className="text-slate-400 text-xs mt-0.5 block">Verified Beds</span>
            </div>
            <div>
              <strong className="text-xl font-bold text-emerald-400 block">0%</strong>
              <span className="text-slate-400 text-xs mt-0.5 block">Brokerage Fee</span>
            </div>
            <div>
              <strong className="text-xl font-bold text-white block">48 Hours</strong>
              <span className="text-slate-400 text-xs mt-0.5 block">Visa Proof Letter</span>
            </div>
            <div>
              <strong className="text-xl font-bold text-amber-300 block">100%</strong>
              <span className="text-slate-400 text-xs mt-0.5 block">Deposit Protected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="py-20 bg-slate-50/70">
        <div className="container max-w-6xl space-y-16">
          
          {/* Room Listings Section */}
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Featured Student Rooms
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Walking distance or short transit to partner university campuses.
                </p>
              </div>

              {/* Filter pills with clear gaps so text never collides */}
              <div className="flex flex-wrap items-center gap-3 max-w-full">
                <div className="flex items-center gap-1.5 rounded-2xl bg-white border border-slate-200/90 p-1.5 shadow-sm text-xs font-medium overflow-x-auto max-w-full">
                  {["All", "Munich", "London", "Toronto", "Melbourne"].map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedCity(c)}
                      className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                        selectedCity === c
                          ? "bg-slate-900 text-white font-semibold shadow-sm"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 rounded-2xl bg-white border border-slate-200/90 p-1.5 shadow-sm text-xs font-medium overflow-x-auto max-w-full">
                  {[
                    { label: "All Types", val: "All" },
                    { label: "Studio", val: "Private Studio" },
                    { label: "WG", val: "Shared WG" },
                    { label: "Dorm", val: "Student Dormitory" },
                  ].map((t) => (
                    <button
                      key={t.val}
                      onClick={() => setSelectedType(t.val)}
                      className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                        selectedType === t.val
                          ? "bg-emerald-600 text-white font-semibold shadow-sm"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Room Cards Grid - Generous spacing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
              {filteredRooms.map((room) => {
                const isSelected = activeSelectedRoom?.id === room.id;
                return (
                  <div
                    key={room.id}
                    className={`bg-white rounded-3xl border transition-all flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md group ${
                      isSelected
                        ? "border-emerald-600 ring-2 ring-emerald-600/20"
                        : "border-slate-200/90"
                    }`}
                  >
                    <div>
                      {/* Photo Header */}
                      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                        <img
                          src={room.photo}
                          alt={room.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute top-3 left-3 flex items-center gap-1.5">
                          <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-sm text-[11px] font-bold text-white shadow-sm">
                            {room.flag} {room.city}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3">
                          <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[10px] font-bold shadow-sm">
                            {room.availability}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-3">
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            {room.type} • {room.roomSize}
                          </span>
                          <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-emerald-700 transition-colors line-clamp-1">
                            {room.title}
                          </h3>
                          <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-1.5">
                            <span>📍</span>
                            <span className="truncate">{room.proximity}</span>
                          </p>
                        </div>

                        {/* Price */}
                        <div className="pt-3 border-t border-slate-100 flex items-baseline justify-between">
                          <strong className="text-base font-extrabold text-slate-900 font-mono">
                            {room.priceLocal}
                          </strong>
                          <span className="text-xs font-bold text-emerald-700">
                            {room.priceInr}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="p-5 pt-0">
                      <button
                        onClick={() => handleRequestRoom(room)}
                        className={`w-full py-3 px-4 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] ${
                          isSelected
                            ? "bg-emerald-600 text-white"
                            : "bg-slate-900 hover:bg-emerald-700 text-white"
                        }`}
                      >
                        <span>{isSelected ? "Selected ✓" : "Request This Room"}</span>
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form & Trust Guarantee Section - Crisp and uncluttered */}
          <div ref={formRef} id="housing-request-form" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Trust Pillar */}
            <div className="lg:col-span-6 space-y-7">
              <div className="bg-white p-7 sm:p-9 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Why UES Verified Housing?</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
                    Guaranteed, safe, and transparent student housing before your flight departure.
                  </p>
                </div>

                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <span className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                      <Shield className="w-5 h-5" />
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">100% Scam-Inspected</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">Every property lease agreement and landlord identity is pre-verified by UES legal counsel.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                      <Banknote className="w-5 h-5" />
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Zero Agency Brokerage</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">Direct partner agreements with institutional student housing providers waive agency commissions.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                      <FileText className="w-5 h-5" />
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Visa Proof Guarantee (48 Hours)</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">Receive official registered letters (e.g. German Wohnungsgeberbestätigung) to submit with your student visa file.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Clean White 3-step timeline (NO dark purple box) */}
              <div className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm">
                <h4 className="text-sm font-bold text-slate-900 mb-4">How We Allocate Your Room</h4>
                <div className="grid grid-cols-3 gap-4 text-center text-xs">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
                    <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center mx-auto mb-2 text-xs">1</span>
                    <strong className="block text-slate-800 text-xs font-semibold">Submit Request</strong>
                    <span className="text-[11px] text-slate-500 leading-tight block">Specify preferences</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
                    <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center mx-auto mb-2 text-xs">2</span>
                    <strong className="block text-slate-800 text-xs font-semibold">Shortlist Call</strong>
                    <span className="text-[11px] text-slate-500 leading-tight block">Within 24 hours</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
                    <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center mx-auto mb-2 text-xs">3</span>
                    <strong className="block text-slate-800 text-xs font-semibold">Lease &amp; Keys</strong>
                    <span className="text-[11px] text-slate-500 leading-tight block">Airport handover</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Lead Capture Form Column - Clean, spacious & modern */}
            <div className="lg:col-span-6">
              <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm">
                
                {activeSelectedRoom && (
                  <div className="mb-6 px-4 py-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-emerald-700 font-bold">Selected:</span>
                      <strong className="text-emerald-950 font-bold truncate">
                        {activeSelectedRoom.title} ({activeSelectedRoom.city})
                      </strong>
                    </div>
                    <button
                      onClick={() => setActiveSelectedRoom(null)}
                      className="text-slate-400 hover:text-slate-600 font-bold text-xs shrink-0"
                    >
                      Clear ✕
                    </button>
                  </div>
                )}

                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Request Housing Allocation</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-6 leading-relaxed">
                  Direct inquiry routed to UES student accommodation officers.
                </p>

                {submitted ? (
                  <div className="p-10 sm:p-12 rounded-3xl bg-emerald-50/80 border border-emerald-200 text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto text-2xl font-bold">
                      ✓
                    </div>
                    <h4 className="text-xl font-bold text-emerald-950">Allocation Request Received</h4>
                    <p className="text-sm text-emerald-900/80 leading-relaxed max-w-md mx-auto py-2">
                      Thank you, <strong>{name}</strong>. An offline accommodation officer will call you at <strong>{phone}</strong> within 24 hours with verified shortlisted rooms.
                    </p>
                    <button 
                      className="mt-4 px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-sm active:scale-[0.98]"
                      onClick={() => {
                        setSubmitted(false);
                        setActiveSelectedRoom(null);
                      }}
                    >
                      Submit Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {submitError && (
                      <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
                      <div className="flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        <span>{submitError}</span>
                      </div>
                      </div>
                    )}
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1.5">Full Name *</label>
                      <input 
                        type="text" 
                        required 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:bg-white transition-all"
                        placeholder="Student Full Name"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1.5">Phone / WhatsApp *</label>
                        <input 
                          type="tel" 
                          required 
                          value={phone} 
                          onChange={(e) => setPhone(e.target.value)} 
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:bg-white transition-all"
                          placeholder="+91 98765 43210"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1.5">Email Address *</label>
                        <input 
                          type="email" 
                          required 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:bg-white transition-all"
                          placeholder="student@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1.5">Destination Country</label>
                        <select 
                          value={destination} 
                          onChange={(e) => setDestination(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:bg-white transition-all"
                        >
                          <option value="Germany">Germany</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="Australia">Australia</option>
                          <option value="Ireland">Ireland</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1.5">Housing Type</label>
                        <select 
                          value={housingType} 
                          onChange={(e) => setHousingType(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:bg-white transition-all"
                        >
                          <option value="Shared Apartment (WG)">Shared Apartment (WG)</option>
                          <option value="Student Dormitory">Student Dormitory</option>
                          <option value="Private Studio">Private Studio</option>
                          <option value="Homestay">Homestay Family</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1.5">Monthly Rent Budget</label>
                      <select 
                        value={budget} 
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:bg-white transition-all"
                      >
                        <option value="€400 - €550 / month">Under €550 / $600 per month</option>
                        <option value="€550 - €750 / month">€550 - €750 / $600 - $850 per month</option>
                        <option value="€750 - €1,000 / month">€750 - €1,000 / $850 - $1,100 per month</option>
                        <option value="€1,000+ / month">€1,000+ / $1,100+ Premium Studio</option>
                      </select>
                    </div>

                    <div className="pt-2">
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-semibold text-sm shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        <span>{isSubmitting ? "Submitting Request..." : "Submit Allocation Request"}</span>
                        <span>→</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <LeadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        source={modalSource} 
      />
    </PublicLayout>
  );
}
