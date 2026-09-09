import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingDown,
  Sparkles,
  CheckCircle2,
  Building2,
  SunMedium
} from 'lucide-react';

interface HeroSectionProps {
  currentLang: Language;
  onCalculateClick: () => void;
  onRequestSurveyClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentLang,
  onCalculateClick,
  onRequestSurveyClick
}) => {
  const t = translations[currentLang];
  const [interactiveBill, setInteractiveBill] = useState(2500);

  // Sizing formula for 100% energy generation offset (100% bill reduction)
  const monthlyKWh = Math.round(interactiveBill / 0.174);
  const targetKWp = Math.round((monthlyKWh / 135) * 10) / 10;
  const panelsCount = Math.ceil((targetKWp * 1000) / 620);
  const estimatedSavings = interactiveBill; // 100% electricity bill offset
  const estimatedAnnual = estimatedSavings * 12;

  return (
    <section id="hero-section" className="relative pt-24 sm:pt-28 pb-16 lg:pb-24 overflow-hidden bg-[#F7F5F2]">
      {/* Editorial architectural subtle background accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E03E2D]/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 left-10 w-72 h-72 bg-[#C27803]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial top date/issue bar */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#1A1A1A]/10 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/50 font-mono">
          <span>CAMBODIA SOLAR INITIATIVE • VOL. 2026</span>
          <span className="hidden sm:inline">NATIONAL COVERAGE • 25 PROVINCES</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Category Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EFECE6] border border-[#1A1A1A]/10 text-[#1A1A1A] text-[11px] font-bold tracking-wide">
              <SunMedium className="w-3.5 h-3.5 text-[#E03E2D]" />
              <span className="font-mono uppercase text-[10px] tracking-wider">{t.hero.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1A1A] tracking-tight leading-[1.08]">
              {currentLang === 'EN' ? (
                <>
                  Turn Sunshine <br className="hidden sm:inline" />
                  Into <span className="italic text-[#E03E2D] font-normal">Savings.</span>
                </>
              ) : currentLang === 'KH' ? (
                <>
                  បំប្លែងពន្លឺព្រះអាទិត្យ <br className="hidden sm:inline" />
                  ទៅជា <span className="text-[#E03E2D]">ការសន្សំប្រាក់។</span>
                </>
              ) : (
                <>
                  Biến Ánh Nắng <br className="hidden sm:inline" />
                  Thành <span className="italic text-[#E03E2D] font-normal">Lợi Nhuận.</span>
                </>
              )}
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-[#1A1A1A]/70 max-w-2xl leading-relaxed">
              {t.hero.subheadline}
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                id="hero-primary-calc-btn"
                onClick={onCalculateClick}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#E03E2D] hover:bg-[#C92F20] active:scale-[0.98] text-white font-bold text-base shadow-xs hover:shadow transition-all cursor-pointer group"
              >
                <span>{t.hero.primaryCta}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-secondary-survey-btn"
                onClick={onRequestSurveyClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#EFECE6] hover:bg-[#E5E2DC] border border-[#1A1A1A]/15 text-[#1A1A1A] font-semibold text-base shadow-2xs transition-all cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-[#E03E2D]" />
                <span>{t.hero.secondaryCta}</span>
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#1A1A1A]/60 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#1E7B58]" />
                <span>Zero technical complexity</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#1E7B58]" />
                <span>60-second instant estimate</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#1E7B58]" />
                <span>25-province engineering coverage</span>
              </div>
            </div>
          </div>

          {/* Right Column: Realistic Cambodian Commercial Solar Visual + Interactive Floating Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-[#1A1A1A]/10 bg-[#141413] group">
              {/* High-quality modern commercial building with rooftop solar */}
              <img
                src="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80"
                alt="Metfone Commercial Rooftop Solar in Cambodia"
                className="w-full h-[380px] sm:h-[420px] object-cover opacity-90 group-hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              {/* Top location tag */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/65 backdrop-blur-md text-white text-xs font-semibold border border-white/10">
                <Building2 className="w-3.5 h-3.5 text-[#E03E2D]" />
                <span className="font-mono text-[11px]">Commercial Solar • Cambodia</span>
              </div>

              {/* Bottom Interactive Savings Card Over Image */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#FFFFFF]/95 backdrop-blur-md rounded-xl p-4 shadow-xl border border-[#1A1A1A]/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-[#1A1A1A]/60 uppercase tracking-widest font-mono">
                    {t.hero.exampleCardTitle}
                  </span>
                  <span className="font-mono text-base font-extrabold text-[#1A1A1A]">
                    ${interactiveBill.toLocaleString()} / mo
                  </span>
                </div>

                {/* Interactive Slider for Instant Gratification */}
                <input
                  type="range"
                  min="200"
                  max="10000"
                  step="100"
                  value={interactiveBill}
                  onChange={(e) => setInteractiveBill(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#EFECE6] rounded-lg appearance-none cursor-pointer accent-[#E03E2D] mb-3"
                  aria-label="Adjust monthly bill example"
                />

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1A1A1A]/10">
                  <div className="bg-[#EFECE6]/80 rounded-lg p-2 border border-[#1A1A1A]/10">
                    <div className="text-[10px] uppercase font-bold text-[#1E7B58] flex items-center gap-1 font-mono">
                      <TrendingDown className="w-3 h-3 text-[#1E7B58]" />
                      {t.hero.exampleSavingsTitle}
                    </div>
                    <div className="text-base sm:text-lg font-black text-[#1E7B58] font-mono">
                      ~${estimatedSavings.toLocaleString()}
                      <span className="text-[10px] font-normal text-[#1E7B58]/80">/mo</span>
                    </div>
                  </div>

                  <div className="bg-[#EFECE6]/80 rounded-lg p-2 border border-[#1A1A1A]/10 flex flex-col justify-center">
                    <div className="text-[10px] uppercase font-bold text-[#E03E2D] font-mono">
                      Annual Savings
                    </div>
                    <div className="text-base sm:text-lg font-black text-[#E03E2D] font-mono">
                      ~${estimatedAnnual.toLocaleString()}
                      <span className="text-[10px] font-normal text-[#E03E2D]/80">/yr</span>
                    </div>
                  </div>
                </div>

                <div className="mt-2 text-[9px] text-[#1A1A1A]/50 text-center italic">
                  {t.hero.exampleNote}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 9: Trust Strip (Immediately Below Hero) */}
        <div className="mt-14 pt-8 border-t border-[#1A1A1A]/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {t.hero.trustPillars.map((pillar: string, idx: number) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#1A1A1A]/10 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-[#1A1A1A]/20 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-[#EFECE6] text-[#E03E2D] flex items-center justify-center shrink-0 border border-[#1A1A1A]/5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#1A1A1A] leading-snug">
                  {pillar}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
