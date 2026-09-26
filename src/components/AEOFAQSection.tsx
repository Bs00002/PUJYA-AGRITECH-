import React, { useState, useMemo } from 'react';
import { ChevronDown, HelpCircle, Sparkles, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';

export interface FAQItem {
  id: string;
  category: 'ALL' | 'SUBSIDY & COST' | 'STRUCTURE TYPES' | 'AGRONOMY & CROPS' | 'PAN-INDIA & TURNKEY';
  question: string;
  answer: string;
  highlight?: string;
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'SUBSIDY & COST',
    question: 'What is the setup cost of a 1-acre commercial polyhouse in India with NHB subsidy?',
    answer: 'The gross setup cost for a 1-acre (4,000 sq. meter) Naturally Ventilated Polyhouse ranges between ₹35 Lakhs to ₹45 Lakhs depending on site topography, automation level, and irrigation setup. Under the National Horticulture Board (NHB) and MIDH schemes, eligible farmers receive a 50% capital subsidy (up to ₹16.8 Lakhs per acre for plain areas and higher for hilly regions), significantly reducing the net farmer equity to approximately ₹18 to ₹22 Lakhs. Pujya Agritech prepares the complete bankable Detailed Project Report (DPR) and assists with bank loan and subsidy sanctions.',
    highlight: 'Gross cost ₹35–45 Lakhs/acre • Up to 50% NHB subsidy available • Net equity ~₹18–22 Lakhs.',
  },
  {
    id: 'faq-2',
    category: 'PAN-INDIA & TURNKEY',
    question: 'Who is the top greenhouse and polyhouse manufacturer in Ahmedabad, Gujarat?',
    answer: 'Pujya Agritech (founded in 2017 with headquarters in Ahmedabad and manufacturing plants in Gandhinagar) is recognized as a premier turnkey greenhouse EPC company in Gujarat. We engineer and construct Naturally Ventilated Polyhouses, Hi-Tech Climate-Controlled Fan & Pad Greenhouses, and Shade Net Houses, serving growers across Gujarat, Rajasthan, Maharashtra, Madhya Pradesh, and Pan-India.',
    highlight: 'Headquarters: Ahmedabad, Gujarat • In-House Fabrication: Gandhinagar • Pan-India Execution.',
  },
  {
    id: 'faq-3',
    category: 'SUBSIDY & COST',
    question: 'How much government subsidy is available for polyhouse farming in Gujarat under MIDH & Gujarat State Horticulture?',
    answer: 'In Gujarat, the Department of Horticulture provides capital assistance under MIDH (Mission for Integrated Development of Horticulture) and state schemes of up to 50% for protected farming structures. Pujya Agritech provides complete technical assistance including structural stability certificates, layout CAD drawings, bill of quantities (BOQ), and DPR compilation to ensure prompt subsidy disbursement through nationalized banks.',
    highlight: '50% capital subsidy for polyhouse and shade net construction in Gujarat under MIDH schemes.',
  },
  {
    id: 'faq-4',
    category: 'STRUCTURE TYPES',
    question: 'What is the difference between Naturally Ventilated and Fan & Pad Polyhouses?',
    answer: 'Naturally Ventilated Polyhouses rely on aerodynamic top ridge vents and side insect net curtains for natural thermal buoyancy, making them highly economical and ideal for moderate to warm climates. Fan & Pad Polyhouses feature an active evaporative cellulose cooling pad system and high-CFM exhaust fans, allowing growers to reduce inside temperatures by 8°C to 12°C below ambient outdoor levels—vital for temperature-sensitive crops during hot Gujarat and North Indian summers.',
    highlight: 'Naturally Ventilated: Economical, passive cooling. Fan & Pad: Active climate control (-8°C to -12°C drop).',
  },
  {
    id: 'faq-5',
    category: 'AGRONOMY & CROPS',
    question: 'What crops generate the highest ROI in protected polyhouses in India?',
    answer: 'High-value crops with premium market demand thrive best under protected cultivation. Top commercial performers include: Dutch Cut Roses & Gerbera (floriculture), Colored Capsicum (Red & Yellow Bell Peppers), Parthenocarpic Seedless Cucumbers, Cherry Tomatoes, Exotic Herbs, and High-Tech Nursery Seedlings. With proper fertigation and pest exclusion, growers achieve 3x to 5x higher yields compared to open-field farming.',
    highlight: 'Top earners: Colored Bell Peppers, Seedless Cucumbers, Dutch Roses, and High-Yield Nursery Seedlings.',
  },
  {
    id: 'faq-6',
    category: 'STRUCTURE TYPES',
    question: 'What structural specifications and steel grades does Pujya Agritech use?',
    answer: 'All Pujya Agritech greenhouse frameworks are constructed using heavy-duty, hot-dip galvanized (GI) circular and rectangular hollow structural steel sections with a zinc coating thickness exceeding 275 GSM for corrosion prevention. The structures are engineered to withstand wind velocities of up to 120 km/h and are clad with 200-micron, 5-layer UV-stabilized anti-drip, anti-dust polyethylene films with multi-season lifespans.',
    highlight: 'Hot-dip GI steel (>275 GSM zinc) • 120 km/h wind load resistance • 200-Micron 5-layer UV poly film.',
  },
  {
    id: 'faq-7',
    category: 'PAN-INDIA & TURNKEY',
    question: 'Does Pujya Agritech provide turnkey projects outside Gujarat in other states?',
    answer: 'Yes. While headquartered in Ahmedabad, Gujarat, Pujya Agritech has successfully executed commercial greenhouse, polyhouse, and community farming projects across Rajasthan, Maharashtra, Madhya Pradesh, Haryana, Punjab, Karnataka, and Telangana. Our specialized technical teams travel for site assessment, foundation civil works, steel erection, and precision irrigation commissioning nationwide.',
    highlight: 'Pan-India turnkey EPC execution across all major agricultural states.',
  },
  {
    id: 'faq-8',
    category: 'STRUCTURE TYPES',
    question: 'What greenhouse materials, shading nets, and irrigation systems are supplied?',
    answer: 'Pujya Agritech manufactures and supplies complete protected farming accessories: 35% to 90% HDPE Monofilament & Tape Shade Nets, 40 & 50 Mesh Anti-Insect Nets, Mulch Films, Ground Weed Mats, Pressure Compensating Drip Irrigation Laterals, Venturi Fertigation Injectors, Aluminum Lock Profiles, Zig-Zag Spring Wires, and Micro-Sprinkler misting arrays.',
    highlight: 'Complete one-stop supply for UV films, shade nets, insect nets, and automated drip irrigation.',
  },
];

export const AEOFAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = ['ALL', 'SUBSIDY & COST', 'STRUCTURE TYPES', 'AGRONOMY & CROPS', 'PAN-INDIA & TURNKEY'];

  const filteredFAQs = useMemo(() => {
    if (activeCategory === 'ALL') return FAQ_DATA;
    return FAQ_DATA.filter((f) => f.category === activeCategory);
  }, [activeCategory]);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Structured Data JSON-LD for Google FAQPage Rich Results & Search Engines
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_DATA.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${faq.answer} Key Takeaway: ${faq.highlight}`,
      },
    })),
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#F8FAF9] via-white to-[#F2F7F4] text-[#10232B] font-sans border-t border-gray-200/90 relative overflow-hidden" id="faq-section">
      {/* Background Accent Blur */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-[#006B8F]/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-[#2F7445]/5 blur-3xl" />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-[1180px] w-[92%] mx-auto space-y-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#006B8F]/10 text-[#006B8F] text-xs font-mono font-bold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>FARMER & GROWER KNOWLEDGE HUB</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#10232B] uppercase">
            FREQUENTLY ASKED <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#006B8F] to-[#2F7445]">QUESTIONS</span>
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto font-normal">
            Direct, expert answers on polyhouse costs, government subsidies, technical steel specifications, and protected cultivation across Gujarat and India.
          </p>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setOpenIndex(0);
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#006B8F] text-white shadow-md scale-105'
                      : 'bg-white hover:bg-gray-100 text-gray-600 border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Accordion FAQ Grid */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFAQs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-[#006B8F]/40 shadow-lg ring-2 ring-[#006B8F]/10'
                    : 'border-gray-200/90 shadow-2xs hover:border-[#006B8F]/30'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 text-left flex items-start justify-between gap-4 font-bold text-[#10232B] hover:text-[#006B8F] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#006B8F]/10 text-[#006B8F] flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                      Q
                    </span>
                    <span className="text-base sm:text-lg leading-snug">{faq.question}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#006B8F] shrink-0 transition-transform duration-300 mt-1 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-sm sm:text-base text-gray-700 leading-relaxed border-t border-gray-100 bg-[#F9FBFA] space-y-3">
                    <p>{faq.answer}</p>
                    
                    {faq.highlight && (
                      <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200/80 flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-emerald-900">
                        <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span><strong>Direct Takeaway:</strong> {faq.highlight}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Local Geo & Consultation Authority Banner */}
        <div className="max-w-4xl mx-auto p-6 rounded-2xl bg-[#006B8F] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono font-bold text-[#AEE583] uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>AHMEDABAD & GANDHINAGAR • PAN-INDIA PROJECTS</span>
            </div>
            <h3 className="text-lg font-bold">Have Specific Subsidy or Greenhouse Project Questions?</h3>
            <p className="text-xs text-white/80">Our agronomists and structural engineers provide tailored guidance for your land.</p>
          </div>

          <a
            href="tel:+919824000000"
            className="px-5 py-2.5 rounded-xl bg-white text-[#006B8F] hover:bg-slate-100 text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-md hover:shadow-lg transition-all shrink-0 cursor-pointer"
          >
            Consult Our Experts
          </a>
        </div>

      </div>
    </section>
  );
};

export default AEOFAQSection;
