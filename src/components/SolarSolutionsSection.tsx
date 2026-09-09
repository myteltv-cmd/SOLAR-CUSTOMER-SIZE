import React from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { Zap, BatteryCharging, Shield, Check, Info, ArrowRight } from 'lucide-react';

interface SolarSolutionsSectionProps {
  currentLang: Language;
  onSelectSolution: (solutionId: string) => void;
}

export const SolarSolutionsSection: React.FC<SolarSolutionsSectionProps> = ({
  currentLang,
  onSelectSolution
}) => {
  const t = translations[currentLang];

  const icons: Record<string, React.ReactNode> = {
    on_grid: <Zap className="w-6 h-6 text-amber-500" />,
    hybrid: <BatteryCharging className="w-6 h-6 text-[#ED1C24]" />,
    battery: <Shield className="w-6 h-6 text-blue-600" />
  };

  return (
    <section id="solutions" className="py-16 sm:py-24 bg-[#FBFBFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#ED1C24] text-xs font-bold uppercase tracking-wider mb-3 border border-red-100">
            <span>{t.solutions.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            {t.solutions.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600">
            {t.solutions.subtitle}
          </p>
        </div>

        {/* Section 22: Transparency Note: "A battery is not always necessary" */}
        <div className="mb-12 bg-amber-50/80 border border-amber-200 rounded-2xl p-5 sm:p-6 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
            <Info className="w-5 h-5" />
          </div>
          <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
            {t.solutions.transparencyNote}
          </div>
        </div>

        {/* 3 Solution Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {t.solutions.cards.map((card: any) => (
            <div
              key={card.id}
              className="bg-white rounded-2xl p-7 sm:p-8 border border-gray-200/90 shadow-sm hover:shadow-xl hover:border-gray-300 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Card Tag & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                    {icons[card.id]}
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-[11px] font-bold">
                    {card.tag}
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold text-[#111827] tracking-tight">
                  {card.title}
                </h3>
                <div className="text-xs font-semibold text-[#ED1C24] mt-1 mb-3">
                  Best for: {card.target}
                </div>

                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {card.benefit}
                </p>

                {/* Key Points */}
                <div className="space-y-2.5 pt-4 border-t border-gray-100">
                  {card.points.map((pt: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-700">
                      <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-gray-100">
                <button
                  id={`solution-cta-${card.id}`}
                  onClick={() => onSelectSolution(card.id)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gray-900 hover:bg-[#ED1C24] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow transition-all cursor-pointer group"
                >
                  <span>{card.cta}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
