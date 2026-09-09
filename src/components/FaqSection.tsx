import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';

interface FaqSectionProps {
  currentLang: Language;
  onAskQuestion: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ currentLang, onAskQuestion }) => {
  const t = translations[currentLang];
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const filteredItems = t.faq.items.filter((item: any) =>
    item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#F7F5F2] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFECE6] border border-[#1A1A1A]/10 text-[#E03E2D] text-[10px] font-bold uppercase tracking-[0.2em] font-mono shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5 text-[#E03E2D]" />
            <span>{t.faq.badge}</span>
          </div>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
            {t.faq.title}
          </h2>
          <p className="text-base sm:text-lg text-[#1A1A1A]/70 leading-relaxed">
            {t.faq.subtitle}
          </p>

          {/* Quick Search */}
          <div className="mt-6 relative max-w-md mx-auto">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40" />
            <input
              type="text"
              placeholder="Search solar questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white pl-10 pr-4 py-2.5 rounded-xl border border-[#1A1A1A]/15 text-xs sm:text-sm text-[#1A1A1A] placeholder-[#1A1A1A]/40 focus:outline-none focus:border-[#E03E2D] focus:ring-1 focus:ring-[#E03E2D]/20 shadow-2xs transition-all"
            />
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredItems.map((item: any, idx: number) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#1A1A1A]/10 shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden transition-all"
              >
                <button
                  id={`faq-item-toggle-${idx}`}
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif-editorial text-base sm:text-lg font-bold text-[#1A1A1A] hover:text-[#E03E2D] transition-colors cursor-pointer"
                >
                  <span>{item.q}</span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#EFECE6] text-[#E03E2D]' : 'bg-[#F7F5F2] text-[#1A1A1A]/40'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#1A1A1A]/70 leading-relaxed border-t border-[#1A1A1A]/10">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-8 text-xs text-[#1A1A1A]/50">
            No matching questions found. Feel free to contact our engineering team directly.
          </div>
        )}
      </div>
    </section>
  );
};
