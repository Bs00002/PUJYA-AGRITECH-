import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_DATA: FAQItem[] = [
  {
    question: 'What is a polyhouse and how does protected cultivation work?',
    answer: 'A polyhouse is an engineered agricultural structure covered with specialized UV-stabilized polyethylene film. It creates a controlled micro-environment protecting high-value crops from adverse weather, pests, heavy rain, and extreme solar radiation, ensuring 3x-5x higher yield and year-round cultivation.',
  },
  {
    question: 'What is the difference between Naturally Ventilated and Fan & Pad Polyhouses?',
    answer: 'Naturally Ventilated Polyhouses utilize top ridge and side ventilation vents to allow natural air exchange suitable for moderate climates. Fan & Pad Polyhouses incorporate evaporative cooling pads and exhaust fans for complete climate control in hot arid regions like Gujarat, maintaining optimum temperature and humidity.',
  },
  {
    question: 'What types of Shade Net Houses does Pujya Agritech construct?',
    answer: 'Pujya Agritech designs and installs Flat Top Shade Net Houses, Dome Shape Shade Net Houses, and Cable-Purline Net Houses using 35% to 90% HDPE shade netting with anti-hail and anti-bird protection.',
  },
  {
    question: 'Does Pujya Agritech assist with NHB and MIDH government subsidies?',
    answer: 'Yes, Pujya Agritech provides complete EPC project documentation, technical layout drawings, structural stability certificates, and guidance for National Horticulture Board (NHB) and Mission for Integrated Development of Horticulture (MIDH) subsidy applications.',
  },
  {
    question: 'What greenhouse materials and protective films are supplied?',
    answer: 'We manufacture and supply 200 Micron 5-Layer UV Stabilized Poly Films, Anti-Insect Nets (40/50 mesh), HDPE Shade Nets, Mulching Films, Weed Mats, Drip Irrigation Lateral Pipes, Venturi Fertigation Systems, and GI Purline Frames across India.',
  },
  {
    question: 'Where is Pujya Agritech located and which regions are served?',
    answer: 'Pujya Agritech is headquartered in Ahmedabad, Gujarat, with manufacturing facilities in Gandhinagar, Gujarat. We execute turnkey EPC greenhouse projects and deliver materials pan-India and globally.',
  },
];

export const AEOFAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Structured Data JSON-LD for Google FAQPage Rich Results
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_DATA.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="py-16 bg-[#F8FAFC] text-[#10232B] font-sans border-t border-gray-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-[1140px] w-[92%] mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#006B8F]/10 text-[#006B8F] text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Protected Cultivation Knowledge & FAQs</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#10232B]">
            Frequently Asked Questions — Greenhouse & Polyhouse Technology
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Direct, expert answers regarding protected farming structures, climate-control technology, subsidy guidance, and greenhouse materials by Pujya Agritech.
          </p>
        </div>

        {/* Accordion FAQ Grid */}
        <div className="max-w-3xl mx-auto space-y-4">
          {FAQ_DATA.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 shadow-2xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 font-semibold text-[#10232B] hover:text-[#006B8F] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base leading-snug">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#006B8F] shrink-0 transition-transform duration-250 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/50">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default AEOFAQSection;
