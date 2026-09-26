"use client";

import React, { useState } from "react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustSection } from "@/components/home/TrustSection";
import { DestinationsSection } from "@/components/home/DestinationsSection";
import { ExplorerSection } from "@/components/home/ExplorerSection";
import { DecisionSection } from "@/components/home/DecisionSection";
import { CourseFinderSection } from "@/components/home/CourseFinderSection";
import { ExamCenterSection } from "@/components/home/ExamCenterSection";
import { ForexSection } from "@/components/home/ForexSection";
import { JourneySection } from "@/components/home/JourneySection";
import { SeminarSection } from "@/components/home/SeminarSection";
import { ResourcesSection } from "@/components/home/ResourcesSection";
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

      {/* 3. STUDY DESTINATIONS (PHOTO OVERLAY CARDS) */}
      <DestinationsSection onOpenConsultModal={handleOpenModal} />

      {/* 4. UNIVERSITY EXPLORER (CLEAN WHITE CARDS) */}
      <ExplorerSection onOpenConsultModal={handleOpenModal} />

      {/* 5. SMART DECISION CENTER (5 PROTOTYPE TABS) */}
      <DecisionSection onOpenConsultModal={handleOpenModal} />

      {/* 6. COURSE FINDER (INTERACTIVE RECOMMENDATIONS) */}
      <CourseFinderSection onOpenConsultModal={handleOpenModal} />

      {/* 7. EXAM CENTER (PREPARATION HUB) */}
      <ExamCenterSection onOpenConsultModal={handleOpenModal} />

      {/* 8. FOREX & INTERNATIONAL TRANSFERS */}
      <ForexSection onOpenConsultModal={handleOpenModal} />

      {/* 9. STUDENT JOURNEY TIMELINE */}
      <JourneySection />

      {/* 10. SEMINAR MODULE */}
      <SeminarSection onOpenConsultModal={handleOpenModal} />

      {/* 11. RESOURCES GRID (LEAD GATE) */}
      <ResourcesSection onOpenConsultModal={handleOpenModal} />

      {/* 12. TESTIMONIALS CAROUSEL */}
      <TestimonialsSection />

      {/* 13. BLOGS PLATFORM */}
      <BlogsSection onOpenConsultModal={handleOpenModal} />

      {/* 14. FINAL CTA BANNER (DARK THEME) */}
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
