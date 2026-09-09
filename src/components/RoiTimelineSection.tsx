import React from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { TrendingUp, ShieldCheck, DollarSign, Award, Clock } from 'lucide-react';

interface RoiTimelineSectionProps {
  currentLang: Language;
}

export const RoiTimelineSection: React.FC<RoiTimelineSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  const yearIcons = [
    <Clock key="0" className="w-5 h-5 text-gray-700" />,
    <TrendingUp key="1" className="w-5 h-5 text-amber-600" />,
    <Award key="2" className="w-5 h-5 text-[#ED1C24]" />,
    <DollarSign key="3" className="w-5 h-5 text-emerald-600" />
  ];

  return (
    <section id="roi-timeline" className="py-16 sm:py-24 bg-[#FBFBFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-200">
            <span>{t.roi.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            {t.roi.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600">
            {t.roi.subtitle}
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {t.roi.years.map((item: any, idx: number) => {
            const isMilestone = idx === 2;
            const isProfit = idx === 3;

            return (
              <div
                key={idx}
                className={`relative rounded-2xl p-6 sm:p-7 border transition-all ${
                  isProfit
                    ? 'bg-gradient-to-b from-emerald-50/60 to-white border-emerald-300 shadow-md ring-1 ring-emerald-200'
                    : isMilestone
                    ? 'bg-gradient-to-b from-red-50/50 to-white border-red-300 shadow-md ring-1 ring-red-200'
                    : 'bg-white border-gray-200/90 shadow-xs'
                }`}
              >
                {/* Year Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isProfit
                        ? 'bg-emerald-100'
                        : isMilestone
                        ? 'bg-red-100'
                        : 'bg-gray-100'
                    }`}
                  >
                    {yearIcons[idx]}
                  </div>
                  <span
                    className={`text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-lg ${
                      isProfit
                        ? 'bg-emerald-600 text-white'
                        : isMilestone
                        ? 'bg-[#ED1C24] text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {item.year}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-[#111827] mb-2">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
