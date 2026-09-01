import React from 'react';
import { HeroBanner } from './HeroBanner';
import { WhoWeAreMission } from './WhoWeAreMission';
import { WorkflowJourney } from './WorkflowJourney';
import { CertificationsSection } from './CertificationsSection';
import { DownloadsSection } from './DownloadsSection';
import { AEOFAQSection } from './AEOFAQSection';

interface HomeViewProps {
  setActiveTab: (tab: string) => void;
  onOpenConsultationModal: (itemName?: string) => void;
  onSelectProduct?: (slug: string) => void;
  onSelectProject?: (slug: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setActiveTab,
  onOpenConsultationModal,
  onSelectProject,
}) => {
  return (
    <div className="bg-white text-[#10232B] font-sans selection:bg-[#2F7445] selection:text-white">
      {/* 1. HERO BANNER */}
      <HeroBanner
        onOpenConsultationModal={() => onOpenConsultationModal()}
        onViewProducts={() => setActiveTab('products')}
      />

      {/* 2. WHO WE ARE COMPANY INTRODUCTION SECTION */}
      <WhoWeAreMission
        onLearnMoreAboutClick={() => {
          setActiveTab('about');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onViewProductsClick={() => {
          setActiveTab('products');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 3. PREMIUM PROJECT WORKFLOW TIMELINE */}
      <WorkflowJourney onOpenConsultationModal={onOpenConsultationModal} />

      {/* 4. OUR CERTIFICATIONS SECTION */}
      <CertificationsSection onOpenConsultationModal={onOpenConsultationModal} />

      {/* 5. DOWNLOADS & E-BROCHURE SECTION */}
      <DownloadsSection />

      {/* 6. AEO / FAQ KNOWLEDGE & AI SEARCH SECTION */}
      <AEOFAQSection />
    </div>
  );
};

