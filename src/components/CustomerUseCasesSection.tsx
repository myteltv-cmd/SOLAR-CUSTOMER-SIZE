import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { Home, Store, Factory, Hotel, ArrowRight, AlertCircle, CheckCircle2, TrendingDown } from 'lucide-react';

interface CustomerUseCasesSectionProps {
  currentLang: Language;
  onRequestCustomPlan: (propertyType: string) => void;
}

export const CustomerUseCasesSection: React.FC<CustomerUseCasesSectionProps> = ({
  currentLang,
  onRequestCustomPlan
}) => {
  const t = translations[currentLang];
  const [activeTab, setActiveTab] = useState<'home' | 'shop' | 'factory' | 'hotel'>('home');

  const tabIcons = {
    home: <Home className="w-4 h-4" />,
    shop: <Store className="w-4 h-4" />,
    factory: <Factory className="w-4 h-4" />,
    hotel: <Hotel className="w-4 h-4" />
  };

  const currentCase = t.useCases.cases[activeTab];

  return (
    <section id="use-cases" className="py-16 sm:py-24 bg-white border-t border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#ED1C24] text-xs font-bold uppercase tracking-wider mb-3 border border-red-100">
            <span>{t.useCases.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            {t.useCases.title}
          </h2>
          <p className="mt-3 text-base text-gray-600">
            {t.useCases.subtitle}
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-gray-100 p-1.5 rounded-2xl border border-gray-200 flex-wrap justify-center gap-1">
            {(['home', 'shop', 'factory', 'hotel'] as Array<'home' | 'shop' | 'factory' | 'hotel'>).map((tabKey) => (
              <button
                key={tabKey}
                onClick={() => setActiveTab(tabKey)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === tabKey
                    ? 'bg-white text-[#ED1C24] shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tabIcons[tabKey]}
                <span>{t.useCases.tabs[tabKey]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Case Study Showcase Card */}
        <div className="max-w-4xl mx-auto bg-gray-50 rounded-3xl p-6 sm:p-10 border border-gray-200/90 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Problem */}
            <div className="p-5 rounded-2xl bg-white border border-gray-200/80 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-red-700 mb-2">
                <AlertCircle className="w-4 h-4 text-[#ED1C24]" />
                <span>The Challenge</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {currentCase.problem}
              </p>
            </div>

            {/* Solution */}
            <div className="p-5 rounded-2xl bg-white border border-gray-200/80 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-blue-700 mb-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>The Metfone Solution</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {currentCase.solution}
              </p>
            </div>

            {/* Outcome */}
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-emerald-800 mb-2">
                <TrendingDown className="w-4 h-4 text-emerald-600" />
                <span>Expected Impact</span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
                {currentCase.outcome}
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => onRequestCustomPlan(activeTab)}
              className="flex items-center gap-2 px-8 py-3.5 bg-[#ED1C24] hover:bg-[#D6151C] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md cursor-pointer transition-all"
            >
              <span>{currentCase.cta}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
