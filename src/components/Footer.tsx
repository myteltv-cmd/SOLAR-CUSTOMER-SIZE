import React from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { Sun, Phone, MapPin, Globe, Shield, Send } from 'lucide-react';

interface FooterProps {
  currentLang: Language;
  onOpenAdminModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onOpenAdminModal }) => {
  const t = translations[currentLang];

  return (
    <footer id="main-footer" className="bg-[#141413] text-[#A8A49C] text-xs pt-16 pb-12 border-t border-[#1A1A1A]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#E03E2D] flex items-center justify-center text-white font-bold">
                <Sun className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-1.5 font-serif-editorial">
                <span className="font-bold text-xl tracking-tight text-white">Metfone</span>
                <span className="font-sans font-extrabold text-xs uppercase tracking-[0.2em] text-[#E03E2D]">Solar</span>
              </div>
            </div>

            <p className="text-[#A8A49C] text-xs leading-relaxed max-w-sm">
              {t.footer.tagline}
            </p>

            <div className="pt-2 text-[11px] text-white/40 flex flex-col gap-1 font-mono">
              <span>{t.footer.copyright}</span>
              <button
                onClick={onOpenAdminModal}
                className="text-left text-white/50 hover:text-white underline underline-offset-2 transition-colors cursor-pointer w-fit"
              >
                Engineer Config & Sales CRM Access
              </button>
            </div>
          </div>

          {/* Col 2: Official Contact Info */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-[10px] font-bold text-white uppercase tracking-[0.15em] font-mono">
              {t.footer.officialHotlines}
            </div>
            <ul className="space-y-2 text-xs font-mono">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#E03E2D] shrink-0" />
                <span className="text-white/80">{t.footer.hotline1}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#E03E2D] shrink-0" />
                <a href="tel:+855979097097" className="text-white/80 hover:text-white transition-colors">
                  {t.footer.hotline2}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Send className="w-3.5 h-3.5 text-[#0088cc] shrink-0" />
                <a href="https://t.me/metfonesolar" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                  Telegram: @metfonesolar
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-white/40 shrink-0" />
                <a href="https://metfone.com.kh" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                  {t.footer.website}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Address & Coverage */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-[10px] font-bold text-white uppercase tracking-[0.15em] font-mono">
              National Headquarters
            </div>
            <div className="flex items-start gap-2 text-xs leading-relaxed text-[#A8A49C]">
              <MapPin className="w-3.5 h-3.5 text-[#E03E2D] shrink-0 mt-0.5" />
              <span>{t.footer.headquarters}</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-white/70">
              ✓ Full engineering, installation & emergency repair coverage across all 25 provinces in Cambodia.
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="pt-8 text-[10px] text-white/40 leading-relaxed text-center sm:text-left font-mono">
          {t.footer.disclaimer}
        </div>
      </div>
    </footer>
  );
};
