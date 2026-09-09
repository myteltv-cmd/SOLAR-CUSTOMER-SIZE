import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { Phone, Sun, Calculator, Globe, Menu, X, ShieldCheck, Database, Send } from 'lucide-react';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenCalculator: () => void;
  onOpenProposalModal: (type?: string) => void;
  onOpenAdminModal: () => void;
  leadsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  onOpenCalculator,
  onOpenProposalModal,
  onOpenAdminModal,
  leadsCount
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[currentLang];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav.solutions, href: '#solutions' },
    { label: t.nav.calculator, href: '#calculator' },
    { label: t.nav.howItWorks, href: '#how-it-works' },
    { label: t.nav.whyMetfone, href: '#why-metfone' },
    { label: currentLang === 'VI' ? 'Bộ Sưu Tập' : currentLang === 'KH' ? 'កម្រងរូបភាព' : 'Collections', href: '#collections' },
    { label: t.nav.faq, href: '#faq' }
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#F7F5F2]/95 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.03)] border-b border-[#1A1A1A]/10 py-2.5'
          : 'bg-[#F7F5F2]/80 backdrop-blur-xs border-b border-[#1A1A1A]/5 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            id="brand-logo-link"
            href="#"
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-[#E03E2D] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform duration-200">
              <Sun className="w-4 h-4 animate-pulse-subtle" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-serif-editorial font-bold text-xl tracking-tight text-[#1A1A1A]">
                  METFONE
                </span>
                <span className="font-sans font-extrabold text-xs tracking-widest uppercase text-[#E03E2D] border-l border-[#1A1A1A]/15 pl-1.5">
                  SOLAR
                </span>
              </div>
              <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/50 -mt-0.5 font-mono">
                ENGINEERING INTELLIGENCE
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium text-[#1A1A1A]/70 hover:text-[#E03E2D] tracking-wide transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Area */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Hotline Pill */}
            <a
              id="hotline-header-btn"
              href="tel:1204"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EFECE6] hover:bg-[#E5E2DC] text-[#1A1A1A]/80 text-xs font-semibold border border-[#1A1A1A]/10 transition-colors"
              title="Official Metfone Customer Hotline"
            >
              <Phone className="w-3.5 h-3.5 text-[#E03E2D]" />
              <span className="font-mono text-[11px]">1204 / 097 9 097 097</span>
            </a>

            {/* Telegram Direct Connect */}
            <a
              id="telegram-header-btn"
              href="https://t.me/metfonesolar"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full bg-[#0088cc]/10 hover:bg-[#0088cc]/20 text-[#0088cc] border border-[#0088cc]/20 transition-colors"
              title="Connect on Telegram"
            >
              <Send className="w-4 h-4" />
            </a>

            {/* Language Switcher */}
            <div className="flex items-center bg-[#EFECE6] rounded-lg p-0.5 border border-[#1A1A1A]/10">
              {(['EN', 'KH', 'VI'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  id={`lang-btn-${lang.toLowerCase()}`}
                  onClick={() => onLanguageChange(lang)}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-all ${
                    currentLang === lang
                      ? 'bg-white text-[#E03E2D] shadow-xs'
                      : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A]'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Admin / Sales CRM trigger */}
            <button
              id="admin-crm-header-btn"
              onClick={onOpenAdminModal}
              className="p-1.5 rounded-lg border border-[#1A1A1A]/15 bg-white/70 hover:bg-white text-[#1A1A1A]/70 hover:text-[#1A1A1A] relative transition-colors"
              title="Admin Engineering Config & CRM Leads"
            >
              <Database className="w-4 h-4" />
              {leadsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E03E2D] text-white text-[9px] font-mono font-bold flex items-center justify-center">
                  {leadsCount}
                </span>
              )}
            </button>

            {/* Main Primary CTA */}
            <button
              id="header-calculate-savings-btn"
              onClick={onOpenCalculator}
              className="flex items-center gap-2 bg-[#E03E2D] hover:bg-[#C92F20] active:scale-[0.98] text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-xs hover:shadow transition-all"
            >
              <Calculator className="w-4 h-4" />
              <span>{t.nav.calculateSavings}</span>
            </button>
          </div>

          {/* Mobile menu hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Language pill on mobile */}
            <button
              id="mobile-lang-quick-btn"
              onClick={() => onLanguageChange(currentLang === 'EN' ? 'KH' : currentLang === 'KH' ? 'VI' : 'EN')}
              className="px-2 py-1 bg-[#EFECE6] border border-[#1A1A1A]/10 rounded-lg text-xs font-bold text-[#1A1A1A]/80 flex items-center gap-1"
            >
              <Globe className="w-3.5 h-3.5 text-[#E03E2D]" />
              <span>{currentLang}</span>
            </button>

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#EFECE6] border border-[#1A1A1A]/10 text-[#1A1A1A] hover:bg-[#E5E2DC] transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F7F5F2] border-b border-[#1A1A1A]/10 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-3 gap-1 p-1 bg-[#EFECE6] border border-[#1A1A1A]/10 rounded-xl mb-3">
            {(['EN', 'KH', 'VI'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  onLanguageChange(lang);
                }}
                className={`py-1.5 text-xs font-bold rounded-lg ${
                  currentLang === lang
                    ? 'bg-white text-[#E03E2D] shadow-xs'
                    : 'text-[#1A1A1A]/60'
                }`}
              >
                {lang === 'EN' ? 'English' : lang === 'KH' ? 'ខ្មែរ (Khmer)' : 'Tiếng Việt'}
              </button>
            ))}
          </div>

          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-[#1A1A1A]/80 hover:bg-[#EFECE6] rounded-lg"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-[#1A1A1A]/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCalculator();
              }}
              className="w-full py-2.5 bg-[#E03E2D] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-xs"
            >
              <Calculator className="w-4 h-4" />
              {t.nav.calculateSavings}
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProposalModal('site_survey');
              }}
              className="w-full py-2.5 bg-[#EFECE6] text-[#1A1A1A] hover:bg-[#E5E2DC] border border-[#1A1A1A]/10 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#E03E2D]" />
              {t.hero.secondaryCta}
            </button>

            <a
              href="tel:1204"
              className="w-full py-2 bg-white/70 text-[#1A1A1A]/70 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 border border-[#1A1A1A]/5"
            >
              <Phone className="w-3.5 h-3.5 text-[#E03E2D]" />
              <span>Official Hotline: 1204 / +855 97 9 097 097</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
