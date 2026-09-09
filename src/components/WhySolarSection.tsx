import React from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { DollarSign, Cpu, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface WhySolarSectionProps {
  currentLang: Language;
  onExploreClick: () => void;
}

export const WhySolarSection: React.FC<WhySolarSectionProps> = ({
  currentLang,
  onExploreClick
}) => {
  const t = translations[currentLang];

  const icons = [
    <DollarSign key="1" className="w-6 h-6 text-[#ED1C24]" />,
    <Cpu key="2" className="w-6 h-6 text-blue-600" />,
    <ShieldCheck key="3" className="w-6 h-6 text-emerald-600" />
  ];

  return (
    <section id="why-solar" className="py-16 sm:py-24 bg-[#EFECE6] relative overflow-hidden border-y border-[#1A1A1A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/10 text-[#E03E2D] text-[10px] font-bold uppercase tracking-[0.2em] font-mono mb-4 shadow-2xs">
            <span>CORE VALUE PILLARS</span>
          </div>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
            {t.whySolar.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#1A1A1A]/70 leading-relaxed">
            {t.whySolar.subtitle}
          </p>
        </div>

        {/* 3 High-Impact Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {t.whySolar.cards.map((card: any, idx: number) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-7 sm:p-8 border border-[#1A1A1A]/10 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-[#1A1A1A]/20 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#F7F5F2] border border-[#1A1A1A]/10 flex items-center justify-center">
                    {icons[idx]}
                  </div>
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#1A1A1A]/40 font-mono">
                    PILLAR 0{idx + 1}
                  </span>
                </div>

                <div className="space-y-1 mb-4">
                  <span className="text-xs font-bold tracking-wider uppercase text-[#E03E2D] font-mono">
                    {card.num}
                  </span>
                  <h3 className="font-serif-editorial text-2xl font-bold text-[#1A1A1A] tracking-tight">
                    {card.label}
                  </h3>
                </div>

                <p className="text-sm text-[#1A1A1A]/70 leading-relaxed">
                  {card.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#1A1A1A]/10 flex items-center justify-between">
                <button
                  onClick={onExploreClick}
                  className="text-xs font-bold text-[#1A1A1A] hover:text-[#E03E2D] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>See How It Saves</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
