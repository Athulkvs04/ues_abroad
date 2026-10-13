"use client";

import React, { useState } from "react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustSection } from "@/components/home/TrustSection";
import { DestinationsSection } from "@/components/home/DestinationsSection";
import { ExplorerSection } from "@/components/home/ExplorerSection";
import { DecisionTeaserSection } from "@/components/home/DecisionTeaserSection";
import { ServicesBentoSection } from "@/components/home/ServicesBentoSection";
import { JourneySection } from "@/components/home/JourneySection";
import { SeminarSection } from "@/components/home/SeminarSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { BlogsSection } from "@/components/home/BlogsSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";
import { LeadModal } from "@/components/home/LeadModal";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState<string | undefined>(undefined);

  const handleOpenModal = (source?: string) => {
    setModalSource(source);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalSource(undefined);
  };

  return (
    <PublicLayout onOpenConsultModal={() => handleOpenModal("Header Counselling")}>
      {/* 1. HERO SECTION */}
      <HeroSection onOpenConsultModal={() => handleOpenModal("Hero Booking")} />

      {/* 2. TRUST STATISTICS & UNIVERSITY MARQUEE */}
      <TrustSection />

      {/* 3. STUDY DESTINATIONS (CURATED HUB WITH LINK TO /destinations) */}
      <DestinationsSection onOpenConsultModal={handleOpenModal} />

      {/* 4. UNIVERSITY EXPLORER (CURATED 6 CARDS WITH LINK TO /universities) */}
      <ExplorerSection onOpenConsultModal={handleOpenModal} />

      {/* 5. SMART DECISION CENTER TEASER (LINKS TO /tools) */}
      <DecisionTeaserSection onOpenConsultModal={handleOpenModal} />

      {/* 6. RELOCATION & STUDENT SERVICES BENTO (ACCOMMODATION, FOREX, VISA, EXAM PREP) */}
      <ServicesBentoSection onOpenConsultModal={handleOpenModal} />

      {/* 7. OUR STUDENT JOURNEY (8-STEP ROADMAP) */}
      <JourneySection />

      {/* 8. LIVE UPCOMING SEMINARS & MASTERCLASSES */}
      <SeminarSection onOpenConsultModal={handleOpenModal} />

      {/* 9. TESTIMONIALS & STUDENT SUCCESS STORIES */}
      <TestimonialsSection />

      {/* 10. EDITORIAL INSIGHTS & BLOGS (WITH LINK TO /blogs) */}
      <BlogsSection onOpenConsultModal={handleOpenModal} />

      {/* 11. FINAL HIGH-IMPACT CONSULTATION CTA */}
      <FinalCtaSection onOpenConsultModal={handleOpenModal} />

      {/* LEAD CAPTURE POPUP MODAL */}
      <LeadModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        source={modalSource} 
      />
    </PublicLayout>
  );
}
