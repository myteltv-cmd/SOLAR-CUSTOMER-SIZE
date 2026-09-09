import React, { useState } from 'react';
import { Language, SolarEngineConfig, SolarCalculationResult, CalculatorInputs, LeadSubmission } from './types';
import { DEFAULT_SOLAR_CONFIG, calculateSolarSystem } from './utils/calculator';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { WhySolarSection } from './components/WhySolarSection';
import { SolarCalculator } from './components/SolarCalculator';
import { BillUploadSection } from './components/BillUploadSection';
import { EnergyFlowDiagram } from './components/EnergyFlowDiagram';
import { SolarSolutionsSection } from './components/SolarSolutionsSection';
import { SystemExamplesSection } from './components/SystemExamplesSection';
import { RoiTimelineSection } from './components/RoiTimelineSection';
import { BatterySection } from './components/BatterySection';
import { WhyMetfoneSection } from './components/WhyMetfoneSection';
import { CustomerUseCasesSection } from './components/CustomerUseCasesSection';
import { FaqSection } from './components/FaqSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { LeadProposalModal } from './components/LeadProposalModal';
import { AdminConfigModal } from './components/AdminConfigModal';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('EN');
  const [config, setConfig] = useState<SolarEngineConfig>(DEFAULT_SOLAR_CONFIG);

  // Proposal modal state
  const [proposalModalOpen, setProposalModalOpen] = useState(false);
  const [requestType, setRequestType] = useState<'proposal' | 'site_survey' | 'expert_call' | 'bill_audit'>('proposal');
  const [activeCalculation, setActiveCalculation] = useState<SolarCalculationResult | undefined>(undefined);
  const [activeInputs, setActiveInputs] = useState<CalculatorInputs | undefined>(undefined);
  const [activeBillMeta, setActiveBillMeta] = useState<any>(undefined);

  // Admin config modal state
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  // Stored sales leads with initial sample data
  const [leads, setLeads] = useState<LeadSubmission[]>([
    {
      id: 'MFS-2026-8812',
      name: 'Vattanac Logistics Distribution Hub',
      phone: '+855 12 984 102',
      preferredChannel: 'telegram',
      province: 'Phnom Penh',
      propertyType: 'factory',
      monthlyBillUSD: 4200,
      daytimeUsage: 'mostly_day',
      batteryPreference: 'no_battery',
      estimatedKWp: 85,
      estimatedMonthlySavingsUSD: 1980,
      estimatedAnnualSavingsUSD: 23760,
      estimatedPaybackYears: 3.1,
      leadScore: 'HOT',
      requestType: 'site_survey',
      createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
      status: 'survey_scheduled'
    },
    {
      id: 'MFS-2026-7491',
      name: 'Dr. Chea Rathana (Borey Peng Huoth Villa)',
      phone: '+855 97 810 992',
      preferredChannel: 'telegram',
      province: 'Kandal',
      propertyType: 'home',
      monthlyBillUSD: 380,
      daytimeUsage: 'day_night',
      batteryPreference: 'battery_backup',
      estimatedKWp: 8,
      estimatedMonthlySavingsUSD: 175,
      estimatedAnnualSavingsUSD: 2100,
      estimatedPaybackYears: 4.2,
      leadScore: 'WARM',
      requestType: 'proposal',
      createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
      status: 'new'
    },
    {
      id: 'MFS-2026-6204',
      name: 'Angkor Heritage Boutique Resort',
      phone: '+855 63 963 888',
      preferredChannel: 'phone',
      province: 'Siem Reap',
      propertyType: 'hotel',
      monthlyBillUSD: 2400,
      daytimeUsage: 'day_night',
      batteryPreference: 'battery_backup',
      estimatedKWp: 45,
      estimatedMonthlySavingsUSD: 1050,
      estimatedAnnualSavingsUSD: 12600,
      estimatedPaybackYears: 3.6,
      leadScore: 'HOT',
      requestType: 'proposal',
      createdAt: new Date(Date.now() - 3600000 * 26).toISOString(),
      status: 'proposal_sent'
    }
  ]);

  const handleOpenCalculator = () => {
    const el = document.getElementById('calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenProposalModal = (
    type: 'proposal' | 'site_survey' | 'expert_call' | 'bill_audit' = 'proposal',
    calculatedData?: SolarCalculationResult,
    inputs?: CalculatorInputs
  ) => {
    setRequestType(type);
    if (calculatedData) setActiveCalculation(calculatedData);
    if (inputs) setActiveInputs(inputs);
    setProposalModalOpen(true);
  };

  const handleApplyBillData = (
    calculatedData: SolarCalculationResult,
    inputs: CalculatorInputs,
    billMeta: any
  ) => {
    setActiveCalculation(calculatedData);
    setActiveInputs(inputs);
    setActiveBillMeta(billMeta);
    handleOpenProposalModal('bill_audit', calculatedData, inputs);
  };

  const handleLeadSubmitted = (newLead: LeadSubmission) => {
    setLeads((prev) => [newLead, ...prev]);
  };

  const handleSelectExampleCapacity = (capacity: string) => {
    const defaultInputs: CalculatorInputs = {
      propertyType: 'shop',
      monthlyBillUSD: 800,
      currency: 'USD',
      daytimeUsage: 'mostly_day',
      batteryPreference: 'no_battery'
    };
    const res = calculateSolarSystem(defaultInputs, config);
    handleOpenProposalModal('proposal', res, defaultInputs);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F2] text-[#1A1A1A] flex flex-col selection:bg-[#E03E2D]/15 selection:text-[#E03E2D]">
      {/* Global Navigation Header */}
      <Header
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onOpenCalculator={handleOpenCalculator}
        onOpenProposalModal={() => handleOpenProposalModal('proposal')}
        onOpenAdminModal={() => setAdminModalOpen(true)}
        leadsCount={leads.length}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* 1. Hero Presentation */}
        <HeroSection
          currentLang={currentLang}
          onCalculateClick={handleOpenCalculator}
          onRequestSurveyClick={() => handleOpenProposalModal('site_survey')}
        />

        {/* 2. Why Solar Value Pillars */}
        <WhySolarSection
          currentLang={currentLang}
          onExploreClick={handleOpenCalculator}
        />

        {/* 3. Solar Savings Calculator & Estimator */}
        <SolarCalculator
          currentLang={currentLang}
          config={config}
          onOpenProposalModal={handleOpenProposalModal}
          onNavigateToBillUpload={() => {
            const el = document.getElementById('bill-upload');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onUpdateCalculationState={(inputs, results) => {
            setActiveInputs(inputs);
            setActiveCalculation(results);
          }}
        />

        {/* 4. Instant EDC Bill Upload & Analyzer */}
        <BillUploadSection
          currentLang={currentLang}
          config={config}
          onApplyBillData={handleApplyBillData}
        />

        {/* 5. Interactive Energy Flow Architecture */}
        <EnergyFlowDiagram currentLang={currentLang} />

        {/* 6. Tailored Solar Solutions (On-Grid, Hybrid, Battery) */}
        <SolarSolutionsSection
          currentLang={currentLang}
          onSelectSolution={() => handleOpenProposalModal('proposal')}
        />

        {/* 7. Reference System Sizing Examples */}
        <SystemExamplesSection
          currentLang={currentLang}
          onSelectExample={handleSelectExampleCapacity}
        />

        {/* 8. Financial ROI & Payback Milestone Timeline */}
        <RoiTimelineSection currentLang={currentLang} />

        {/* 9. LiFePO4 Energy Storage Technology */}
        <BatterySection
          currentLang={currentLang}
          onExploreBattery={() => {
            handleOpenCalculator();
          }}
        />

        {/* 10. Why Metfone Corporate Infrastructure */}
        <WhyMetfoneSection
          currentLang={currentLang}
          onContactClick={() => handleOpenProposalModal('expert_call')}
        />

        {/* 11. Customer Sector Use Cases (Home, Shop, Factory, Hotel) */}
        <CustomerUseCasesSection
          currentLang={currentLang}
          onRequestCustomPlan={() => handleOpenProposalModal('proposal')}
        />

        {/* 12. Frequently Asked Technical & Financial Questions */}
        <FaqSection
          currentLang={currentLang}
          onAskQuestion={() => handleOpenProposalModal('expert_call')}
        />

        {/* 13. High-Conversion Final Call to Action */}
        <FinalCtaSection
          currentLang={currentLang}
          onCalculateClick={handleOpenCalculator}
          onRequestSurveyClick={() => handleOpenProposalModal('site_survey')}
        />
      </main>

      {/* Corporate Footer */}
      <Footer
        currentLang={currentLang}
        onOpenAdminModal={() => setAdminModalOpen(true)}
      />

      {/* Lead Capture / Instant Proposal Modal */}
      <LeadProposalModal
        isOpen={proposalModalOpen}
        onClose={() => setProposalModalOpen(false)}
        currentLang={currentLang}
        calculatedData={activeCalculation}
        inputs={activeInputs}
        requestType={requestType}
        billMeta={activeBillMeta}
        onSubmitLead={handleLeadSubmitted}
      />

      {/* Admin CRM & Engineering Assumptions Config Modal */}
      <AdminConfigModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        config={config}
        onUpdateConfig={setConfig}
        leads={leads}
        currentLang={currentLang}
      />
    </div>
  );
}
