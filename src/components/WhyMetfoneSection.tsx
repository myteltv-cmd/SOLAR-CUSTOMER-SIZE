import React from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import {
  MapPin,
  Radio,
  Smartphone,
  Wrench,
  ShieldCheck,
  Building2,
  PhoneCall
} from 'lucide-react';

interface WhyMetfoneSectionProps {
  currentLang: Language;
  onContactClick: () => void;
}

export const WhyMetfoneSection: React.FC<WhyMetfoneSectionProps> = ({
  currentLang,
  onContactClick
}) => {
  const t = translations[currentLang];

  const pillarIcons = [
    <MapPin key="1" className="w-6 h-6 text-[#ED1C24]" />,
    <Radio key="2" className="w-6 h-6 text-blue-600" />,
    <Smartphone key="3" className="w-6 h-6 text-purple-600" />,
    <Wrench key="4" className="w-6 h-6 text-emerald-600" />
  ];

  return (
    <section id="why-metfone" className="py-16 sm:py-24 bg-[#FBFBFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#ED1C24] text-xs font-bold uppercase tracking-wider mb-3 border border-red-100">
            <span>{t.whyMetfone.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            {t.whyMetfone.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600">
            {t.whyMetfone.subtitle}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.whyMetfone.pillars.map((pillar: any, idx: number) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-7 border border-gray-200/90 shadow-xs hover:shadow-md hover:border-gray-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-5">
                  {pillarIcons[idx]}
                </div>
                <h3 className="text-lg font-extrabold text-[#111827] mb-2.5">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Corporate Trust Banner */}
        <div className="mt-12 bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#ED1C24] flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">
                Official Metfone Solar Enterprise Division
              </div>
              <div className="text-xs text-gray-500">
                Metfone Building, No. 199, Mao Tse Toung Blvd, Phnom Penh, Cambodia
              </div>
            </div>
          </div>

          <button
            onClick={onContactClick}
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-[#ED1C24] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Connect with Metfone Engineering</span>
          </button>
        </div>
      </div>
    </section>
  );
};
