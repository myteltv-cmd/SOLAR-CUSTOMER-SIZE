import React, { useState, useId } from 'react';
import {
  Language,
  SolarCalculationResult,
  CalculatorInputs,
  LeadSubmission,
  LeadScore
} from '../types';
import { translations } from '../i18n/translations';
import { CAMBODIA_PROVINCES, calculateLeadScore } from '../utils/calculator';
import {
  X,
  Sparkles,
  CheckCircle2,
  Phone,
  Send,
  MapPin,
  FileText,
  ShieldCheck,
  Zap,
  Building,
  User,
  Mail,
  Copy,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LeadProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  calculatedData?: SolarCalculationResult;
  inputs?: CalculatorInputs;
  requestType: 'proposal' | 'site_survey' | 'expert_call' | 'bill_audit';
  billMeta?: any;
  onSubmitLead: (lead: LeadSubmission) => void;
}

export const LeadProposalModal: React.FC<LeadProposalModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  calculatedData,
  inputs,
  requestType,
  billMeta,
  onSubmitLead
}) => {
  const t = translations[currentLang];
  const nameId = useId();
  const phoneId = useId();
  const emailId = useId();
  const provinceId = useId();
  const notesId = useId();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredChannel, setPreferredChannel] = useState<'telegram' | 'whatsapp' | 'phone' | 'messenger'>('telegram');
  const [email, setEmail] = useState('');
  const [province, setProvince] = useState('Phnom Penh');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<LeadSubmission | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setFormError('Please enter your full name or company contact.');
      return;
    }
    if (!phone.trim() || phone.length < 8) {
      setFormError('Please enter a valid phone number (Telegram/WhatsApp).');
      return;
    }

    setFormError('');
    setIsSubmitting(true);

    const billAmount = inputs?.monthlyBillUSD || 500;
    const usage = inputs?.daytimeUsage || 'mostly_day';
    const propType = inputs?.propertyType || 'shop';

    const { score } = calculateLeadScore(billAmount, usage, requestType);

    const newLead: LeadSubmission = {
      id: `MFS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      name: fullName.trim(),
      phone: phone.trim(),
      preferredChannel,
      email: email.trim() || undefined,
      province,
      propertyType: propType,
      monthlyBillUSD: billAmount,
      daytimeUsage: usage,
      batteryPreference: inputs?.batteryPreference || 'no_battery',
      estimatedKWp: calculatedData?.estimatedKWp || 25,
      estimatedMonthlySavingsUSD: calculatedData?.estimatedMonthlySavingsUSD || 720,
      estimatedAnnualSavingsUSD: calculatedData?.estimatedAnnualSavingsUSD || 8640,
      estimatedPaybackYears: calculatedData?.estimatedPaybackYears || 3.5,
      leadScore: score,
      requestType,
      notes: notes.trim() || undefined,
      billFileName: billMeta?.fileName,
      parsedBillData: billMeta ? {
        monthlyKWh: billMeta.monthlyKWh,
        tariffUSD: billMeta.tariffUSD,
        meterNumber: billMeta.meterId,
        peakDemandKW: billMeta.peakDemandKVA
      } : undefined,
      createdAt: new Date().toISOString(),
      status: 'new'
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedLead(newLead);
      onSubmitLead(newLead);
      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.5 }
        });
      } catch {}
    }, 600);
  };

  const handleCopyRef = () => {
    if (submittedLead && navigator.clipboard) {
      navigator.clipboard.writeText(submittedLead.id);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2500);
    }
  };

  return (
    <div
      id="lead-proposal-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141413]/70 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="bg-[#F7F5F2] rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#1A1A1A]/15 relative animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#1A1A1A]/50 hover:text-[#1A1A1A] bg-[#EFECE6] hover:bg-[#E2DDD5] transition-colors z-10 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* SUCCESS VIEW */}
        {submittedLead ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#EFECE6] border border-[#1A1A1A]/10 text-[#1E7B58] flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                {t.proposalModal.successTitle}
              </h3>
              <p className="text-sm text-[#1A1A1A]/70 leading-relaxed max-w-md mx-auto">
                {t.proposalModal.successMessage}
              </p>
            </div>

            {/* Reference ID Capsule */}
            <div className="p-4 bg-white rounded-2xl border border-[#1A1A1A]/10 inline-flex items-center justify-between gap-4 w-full max-w-sm shadow-2xs">
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-[#1A1A1A]/50 font-mono block">
                  {t.proposalModal.refId}
                </span>
                <span className="font-mono font-extrabold text-base text-[#E03E2D]">
                  {submittedLead.id}
                </span>
              </div>
              <button
                onClick={handleCopyRef}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#F7F5F2] hover:bg-[#EFECE6] border border-[#1A1A1A]/10 text-xs font-bold text-[#1A1A1A] rounded-lg transition-colors cursor-pointer font-mono"
              >
                {copiedRef ? <Check className="w-3.5 h-3.5 text-[#1E7B58]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedRef ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Direct Connect Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://t.me/metfonesolar?text=Hello%20Metfone%20Solar%2C%20I%20have%20submitted%20request%20${submittedLead.id}%20for%20my%20property.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-[#0088cc] hover:bg-[#0077b3] text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>{t.proposalModal.directChat}</span>
              </a>

              <button
                onClick={onClose}
                className="px-6 py-3 bg-white hover:bg-[#EFECE6] border border-[#1A1A1A]/10 text-[#1A1A1A] rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer"
              >
                {t.proposalModal.close}
              </button>
            </div>
          </div>
        ) : (
          /* LEAD FORM VIEW */
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EFECE6] text-[#E03E2D] text-[10px] font-bold uppercase tracking-wider font-mono mb-2 border border-[#1A1A1A]/10">
                <Sparkles className="w-3 h-3" />
                <span>Priority Energy Proposal</span>
              </div>
              <h3 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                {t.proposalModal.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#1A1A1A]/70 mt-1">
                {t.proposalModal.subtitle}
              </p>
            </div>

            {/* Summary capsule */}
            {calculatedData && (
              <div className="bg-white rounded-xl p-3.5 border border-[#1A1A1A]/10 text-xs shadow-2xs">
                <div className="font-bold text-[#1A1A1A] mb-1.5 flex items-center justify-between">
                  <span className="font-serif-editorial">{t.proposalModal.summaryBoxTitle}</span>
                  <span className="font-mono text-[#E03E2D] font-bold">
                    ≈ {calculatedData.estimatedKWp} kWp
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[#1A1A1A]/70">
                  <div>
                    Savings: <strong className="text-[#1E7B58] font-mono">~${calculatedData.estimatedMonthlySavingsUSD}/mo</strong>
                  </div>
                  <div>
                    Payback: <strong className="text-[#C27803] font-mono">~{calculatedData.estimatedPaybackYears} yrs</strong>
                  </div>
                  <div>
                    Bill: <strong className="text-[#1A1A1A] font-mono">${inputs?.monthlyBillUSD || 500}/mo</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Attached Bill Badge if came from Bill Upload */}
            {billMeta && (
              <div className="p-3 bg-white border border-[#1A1A1A]/10 text-[#1A1A1A] rounded-xl text-xs flex items-center gap-2 shadow-2xs font-mono">
                <FileText className="w-4 h-4 text-[#E03E2D] shrink-0" />
                <span>
                  Attached Bill: <strong>{billMeta.fileName}</strong> (Meter #{billMeta.meterId})
                </span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {formError && (
                <div className="p-3 rounded-xl bg-white text-[#E03E2D] text-xs font-bold border border-[#E03E2D]/30">
                  {formError}
                </div>
              )}

              {/* Name */}
              <div>
                <label
                  htmlFor={nameId}
                  className="block text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]/70 font-mono mb-1"
                >
                  {t.proposalModal.fullName}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#1A1A1A]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id={nameId}
                    type="text"
                    required
                    placeholder={t.proposalModal.fullNamePlaceholder}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-white pl-10 pr-4 py-2.5 rounded-xl border border-[#1A1A1A]/15 text-sm text-[#1A1A1A] focus:border-[#E03E2D] focus:ring-1 focus:ring-[#E03E2D]/20 focus:outline-none transition-all shadow-2xs"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor={phoneId}
                  className="block text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]/70 font-mono mb-1"
                >
                  {t.proposalModal.phone}
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#1A1A1A]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id={phoneId}
                    type="tel"
                    required
                    placeholder={t.proposalModal.phonePlaceholder}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white pl-10 pr-4 py-2.5 rounded-xl border border-[#1A1A1A]/15 text-sm text-[#1A1A1A] focus:border-[#E03E2D] focus:ring-1 focus:ring-[#E03E2D]/20 focus:outline-none font-mono transition-all shadow-2xs"
                  />
                </div>
              </div>

              {/* Preferred Channel */}
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]/70 font-mono mb-1">
                  {t.proposalModal.preferredChannel}
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'telegram', label: 'Telegram' },
                    { id: 'whatsapp', label: 'WhatsApp' },
                    { id: 'phone', label: 'Direct Call' },
                    { id: 'messenger', label: 'Messenger' }
                  ].map((ch) => (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => setPreferredChannel(ch.id as any)}
                      className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        preferredChannel === ch.id
                          ? 'border-[#E03E2D] bg-[#EFECE6] text-[#E03E2D]'
                          : 'border-[#1A1A1A]/10 bg-white text-[#1A1A1A]/70 hover:border-[#1A1A1A]/30'
                      }`}
                    >
                      {ch.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Province & Email Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={provinceId}
                    className="block text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]/70 font-mono mb-1"
                  >
                    {t.proposalModal.province}
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-[#1A1A1A]/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      id={provinceId}
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-full bg-white pl-10 pr-4 py-2.5 rounded-xl border border-[#1A1A1A]/15 text-xs sm:text-sm text-[#1A1A1A] focus:border-[#E03E2D] focus:ring-1 focus:ring-[#E03E2D]/20 focus:outline-none appearance-none shadow-2xs"
                    >
                      {CAMBODIA_PROVINCES.map((prov) => (
                        <option key={prov} value={prov}>
                          {prov}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor={emailId}
                    className="block text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]/70 font-mono mb-1"
                  >
                    {t.proposalModal.email}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#1A1A1A]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id={emailId}
                      type="email"
                      placeholder={t.proposalModal.emailPlaceholder}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white pl-10 pr-4 py-2.5 rounded-xl border border-[#1A1A1A]/15 text-xs sm:text-sm text-[#1A1A1A] focus:border-[#E03E2D] focus:ring-1 focus:ring-[#E03E2D]/20 focus:outline-none shadow-2xs"
                    />
                  </div>
                </div>
              </div>

              {/* Optional Notes */}
              <div>
                <label
                  htmlFor={notesId}
                  className="block text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]/70 font-mono mb-1"
                >
                  {t.proposalModal.notes}
                </label>
                <textarea
                  id={notesId}
                  rows={2}
                  placeholder={t.proposalModal.notesPlaceholder}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-white p-3 rounded-xl border border-[#1A1A1A]/15 text-xs sm:text-sm text-[#1A1A1A] focus:border-[#E03E2D] focus:ring-1 focus:ring-[#E03E2D]/20 focus:outline-none resize-none shadow-2xs"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#E03E2D] hover:bg-[#C92F20] active:scale-[0.98] text-white font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span>{t.proposalModal.submitting}</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>{t.proposalModal.submitBtn}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
