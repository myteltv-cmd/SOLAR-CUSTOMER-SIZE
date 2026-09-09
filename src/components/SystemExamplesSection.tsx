import React from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { Layers, ArrowRight, TrendingUp, Sun, Sparkles } from 'lucide-react';

interface SystemExamplesSectionProps {
  currentLang: Language;
  onSelectExample: (capacity: string) => void;
}

export const SystemExamplesSection: React.FC<SystemExamplesSectionProps> = ({
  currentLang,
  onSelectExample
}) => {
  const t = translations[currentLang];

  return (
    <section id="system-examples" className="py-16 sm:py-24 bg-white border-t border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#ED1C24] text-xs font-bold uppercase tracking-wider mb-3 border border-red-100">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.examples.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            {t.examples.title}
          </h2>
          <p className="mt-3 text-base text-gray-600">
            {t.examples.subtitle}
          </p>
        </div>

        {/* 3 Reference Capacity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.examples.items.map((ex: any, idx: number) => (
            <div
              key={idx}
              className="bg-gray-50 rounded-2xl p-7 border border-gray-200/80 hover:border-gray-300 hover:bg-white hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    {ex.tier}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-red-100 text-[#ED1C24] text-[10px] font-bold">
                    {ex.tag}
                  </span>
                </div>

                <div className="text-3xl font-black text-[#111827] font-mono mb-2">
                  {ex.capacity}
                </div>

                <div className="text-xs text-gray-600 font-medium mb-6">
                  Suitable for: <strong className="text-gray-900">{ex.suitableFor}</strong>
                </div>

                {/* Metrics Table */}
                <div className="space-y-3 p-4 bg-white rounded-xl border border-gray-200/70 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Monthly Yield</span>
                    <span className="font-bold text-gray-900 font-mono">{ex.monthlyGen}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Monthly Savings</span>
                    <span className="font-bold text-emerald-700 font-mono">{ex.monthlySavings}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Annual Savings</span>
                    <span className="font-bold text-[#ED1C24] font-mono">{ex.annualSavings}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Roof Area Required</span>
                    <span className="font-bold text-gray-800 font-mono">{ex.roofSpace}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-200">
                <button
                  onClick={() => onSelectExample(ex.capacity)}
                  className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-gray-100 border border-gray-300 text-xs font-bold text-gray-800 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Request {ex.capacity} Proposal</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#ED1C24]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
