import React from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { Sparkles, ArrowRight, ShieldCheck, PhoneCall, Send } from 'lucide-react';

interface FinalCtaSectionProps {
  currentLang: Language;
  onCalculateClick: () => void;
  onRequestSurveyClick: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  currentLang,
  onCalculateClick,
  onRequestSurveyClick
}) => {
  const t = translations[currentLang];

  return (
    <section id="final-cta" className="py-20 sm:py-28 bg-[#141413] text-white relative overflow-hidden border-t border-[#1A1A1A]/20">
      {/* Subtle editorial warm ambient glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#E03E2D]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#C27803]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-bold uppercase tracking-[0.2em] font-mono border border-white/15">
          <Sparkles className="w-3.5 h-3.5 text-[#E03E2D]" />
          <span>{t.finalCta.badge}</span>
        </div>

        <h2 className="font-serif-editorial text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl mx-auto leading-[1.1]">
          {t.finalCta.title}
        </h2>

        <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
          {t.finalCta.subtitle}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            id="final-cta-calc-btn"
            onClick={onCalculateClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#E03E2D] hover:bg-[#C92F20] active:scale-[0.98] text-white font-bold text-sm sm:text-base shadow-xs hover:shadow transition-all cursor-pointer group"
          >
            <span>{t.finalCta.primaryBtn}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            id="final-cta-survey-btn"
            onClick={onRequestSurveyClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/20 text-white font-semibold text-sm sm:text-base backdrop-blur-xs transition-all cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-[#E03E2D]" />
            <span>{t.finalCta.secondaryBtn}</span>
          </button>
        </div>

        {/* Verified Phone & Telegram Hotlines */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-white/60 font-mono">
          <a
            href="tel:1204"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#E03E2D]" />
            <span>Hotline: 1204 / +855 97 9 097 097</span>
          </a>
          <a
            href="https://t.me/metfonesolar"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Send className="w-3.5 h-3.5 text-[#0088cc]" />
            <span>Telegram: @metfonesolar</span>
          </a>
        </div>
      </div>
    </section>
  );
};
