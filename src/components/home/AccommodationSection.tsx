"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, MapPin, Building, BedDouble, CheckCircle2, ExternalLink } from "lucide-react";

interface AccommodationSectionProps {
  onOpenConsultModal?: (source?: string) => void;
}

interface FeaturedRoom {
  id: string;
  title: string;
  city: string;
  country: string;
  flag: string;
  type: string;
  priceLocal: string;
  priceInr: string;
  proximity: string;
  amenities: string[];
  photo: string;
  partner: string;
}

const FEATURED_ROOMS: FeaturedRoom[] = [
  {
    id: "muc-1",
    title: "Maximilianeum Scholar Studio",
    city: "Munich",
    country: "Germany",
    flag: "🇩🇪",
    type: "Private Studio",
    priceLocal: "€650 / mo",
    priceInr: "≈ ₹58,800",
    proximity: "8 min walk to TU Munich",
    amenities: ["Private Kitchenette", "En-suite Bath", "Anmeldung Ready"],
    photo: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80",
    partner: "Fintiba Housing",
  },
  {
    id: "lon-1",
    title: "Bloomsbury Scholar En-Suite",
    city: "London",
    country: "United Kingdom",
    flag: "🇬🇧",
    type: "Student Dormitory",
    priceLocal: "£280 / wk",
    priceInr: "≈ ₹1,18,000 / mo",
    proximity: "6 min walk to UCL & King's",
    amenities: ["24/7 Security", "Private Bath", "All Bills Included"],
    photo: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=600&q=80",
    partner: "Unite Students",
  },
  {
    id: "dub-1",
    title: "Docklands Premium WG Room",
    city: "Dublin",
    country: "Ireland",
    flag: "🇮🇪",
    type: "Shared WG",
    priceLocal: "€780 / mo",
    priceInr: "≈ ₹70,500",
    proximity: "10 min Luas to Trinity College",
    amenities: ["High-speed Wi-Fi", "Balcony View", "Bills Included"],
    photo: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80",
    partner: "Yugo Dublin",
  },
  {
    id: "mel-1",
    title: "Carlton Academic Residence",
    city: "Melbourne",
    country: "Australia",
    flag: "🇦🇺",
    type: "Student Residence",
    priceLocal: "AUD $390 / wk",
    priceInr: "≈ ₹85,000 / mo",
    proximity: "5 min walk to Univ. of Melbourne",
    amenities: ["Gym & Study Lounges", "On-site Laundry", "Furnished"],
    photo: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80",
    partner: "Scape Australia",
  },
];

export function AccommodationSection({ onOpenConsultModal }: AccommodationSectionProps) {
  const [selectedCity, setSelectedCity] = useState<string>("All");

  const cities = ["All", "Munich", "London", "Dublin", "Melbourne"];

  const filteredRooms = selectedCity === "All"
    ? FEATURED_ROOMS
    : FEATURED_ROOMS.filter((room) => room.city === selectedCity);

  return (
    <section id="accommodation-section" className="py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-xs font-semibold mb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Verified Student Housing</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 tracking-tight">
              Pre-Book Your Student Housing Abroad
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Skip the housing stress and fraudulent listings. UES Abroad partners with verified European and global student residence providers with official registration (<span className="text-emerald-700 font-medium">Anmeldung</span>) guarantees.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/accommodation"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-sm transition-all group"
            >
              <span>Explore All Rooms</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* City Filter Tabs */}
        <div className="flex items-center gap-2 pb-6 overflow-x-auto no-scrollbar">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCity === city
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300"
              }`}
            >
              {city === "All" ? "🌍 All Destinations" : city}
            </button>
          ))}
        </div>

        {/* Featured Rooms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group hover:-translate-y-1"
            >
              {/* Image banner */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={room.photo}
                  alt={room.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-xs text-white text-xs font-semibold">
                  <span>{room.flag}</span>
                  <span>{room.city}</span>
                </div>
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-emerald-600/90 text-white text-[11px] font-bold">
                  {room.type}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-slate-900 text-base line-clamp-1 group-hover:text-emerald-700 transition-colors">
                    {room.title}
                  </h3>
                  
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="line-clamp-1">{room.proximity}</span>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {room.amenities.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Starting from</span>
                    <div className="text-base font-bold text-slate-900 leading-tight">
                      {room.priceLocal}
                    </div>
                    <span className="text-[11px] text-emerald-600 font-semibold">{room.priceInr}</span>
                  </div>

                  <Link
                    href={`/accommodation#search`}
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 hover:border-emerald-200 transition-colors"
                    aria-label={`View ${room.title}`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Value Badges Banner */}
        <div className="mt-12 bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full md:w-auto flex-1">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Official City Registration</h4>
                <p className="text-xs text-slate-500 mt-0.5">Every lease contract supports German Anmeldung, UK council, and Irish residence cards.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 shrink-0">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Campus-Adjacent Locations</h4>
                <p className="text-xs text-slate-500 mt-0.5">Under 20 minutes commute by foot or public transit to top partner universities.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Zero Scam Risk Guarantee</h4>
                <p className="text-xs text-slate-500 mt-0.5">Never send money to unverified private classifieds. All leases are legally audited.</p>
              </div>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => onOpenConsultModal?.("Accommodation Home Banner")}
              className="w-full md:w-auto px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm transition-colors text-center"
            >
              Request Housing Callback
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
