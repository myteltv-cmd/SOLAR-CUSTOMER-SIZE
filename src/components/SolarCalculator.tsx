import React, { useState, useId } from 'react';
import {
  Language,
  PropertyType,
  BatteryPreference,
  Currency,
  CalculatorInputs,
  SolarCalculationResult,
  SolarEngineConfig
} from '../types';
import { translations } from '../i18n/translations';
import { calculateSolarSystem, convertCurrency } from '../utils/calculator';
import {
  Home,
  Store,
  Utensils,
  Building,
  Factory,
  Hotel,
  Briefcase,
  Sun,
  BatteryCharging,
  Battery,
  Sparkles,
  Zap,
  CheckCircle,
  FileUp,
  ShieldCheck,
  PhoneCall,
  Check,
  Send,
  HelpCircle,
  Calculator,
  ChevronDown,
  ChevronUp,
  FileText,
  Clock,
  Layers,
  ArrowRight,
  Printer
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SolarCalculatorProps {
  currentLang: Language;
  config: SolarEngineConfig;
  onOpenProposalModal: (
    type: 'proposal' | 'site_survey' | 'expert_call',
    calculatedData?: SolarCalculationResult,
    inputs?: CalculatorInputs
  ) => void;
  onNavigateToBillUpload: () => void;
  onUpdateCalculationState?: (inputs: CalculatorInputs, result: SolarCalculationResult) => void;
}

export const SolarCalculator: React.FC<SolarCalculatorProps> = ({
  currentLang,
  config,
  onOpenProposalModal,
  onNavigateToBillUpload,
  onUpdateCalculationState
}) => {
  const t = translations[currentLang];
  const inputId = useId();

  // Mode: 'bill' (USD / KHR / VND) or 'kwh' (Monthly kWh consumption)
  const [inputMode, setInputMode] = useState<'bill' | 'kwh'>('bill');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [monthlyBillUSD, setMonthlyBillUSD] = useState<number>(500);
  const [monthlyKWh, setMonthlyKWh] = useState<number>(2873);
  const [propertyType, setPropertyType] = useState<PropertyType>('shop');
  const [batteryPreference, setBatteryPreference] = useState<BatteryPreference>('no_battery');
  const [showFormulaDetails, setShowFormulaDetails] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Quick Preset Bills in USD
  const billPresetsUSD = [100, 250, 500, 1000, 2500, 5000, 10000];

  // Dynamic 100% calculation inputs
  const calculationInputs: CalculatorInputs = {
    propertyType,
    monthlyBillUSD:
      inputMode === 'kwh'
        ? monthlyKWh * config.tariffUSD
        : currency === 'KHR'
        ? Math.round(monthlyBillUSD / config.khrExchangeRate)
        : currency === 'VND'
        ? Math.round(monthlyBillUSD / config.vndExchangeRate)
        : monthlyBillUSD,
    monthlyKWh: inputMode === 'kwh' ? monthlyKWh : undefined,
    inputMode,
    currency,
    daytimeUsage: 'mostly_day', // Baseline 100% total consumption coverage
    batteryPreference,
    targetCoveragePercent: 100
  };

  const results: SolarCalculationResult = calculateSolarSystem(calculationInputs, config);

  const handleBillInputChange = (val: number) => {
    setMonthlyBillUSD(Math.max(0, val));
    if (onUpdateCalculationState) {
      onUpdateCalculationState(calculationInputs, results);
    }
  };

  const handleKWhInputChange = (val: number) => {
    setMonthlyKWh(Math.max(0, val));
    if (onUpdateCalculationState) {
      onUpdateCalculationState(calculationInputs, results);
    }
  };

  const handleCurrencyChange = (newCurrency: Currency) => {
    if (newCurrency === currency) return;
    const currentUSD =
      currency === 'KHR'
        ? monthlyBillUSD / config.khrExchangeRate
        : currency === 'VND'
        ? monthlyBillUSD / config.vndExchangeRate
        : monthlyBillUSD;

    if (newCurrency === 'KHR') {
      setMonthlyBillUSD(Math.round(currentUSD * config.khrExchangeRate));
    } else if (newCurrency === 'VND') {
      setMonthlyBillUSD(Math.round(currentUSD * config.vndExchangeRate));
    } else {
      setMonthlyBillUSD(Math.round(currentUSD));
    }
    setCurrency(newCurrency);
  };

  const propertyIcons: Record<PropertyType, React.ReactNode> = {
    home: <Home className="w-4 h-4" />,
    shop: <Store className="w-4 h-4" />,
    restaurant: <Utensils className="w-4 h-4" />,
    office: <Building className="w-4 h-4" />,
    factory: <Factory className="w-4 h-4" />,
    hotel: <Hotel className="w-4 h-4" />,
    other: <Briefcase className="w-4 h-4" />
  };

  const handleCelebrate = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // Ignore if canvas confetti not supported
    }
  };

  // Formatted currencies for key numbers
  const formattedMonthlyBill = convertCurrency(results.monthlyBillBeforeSolarUSD, currency, config);
  const formattedMonthlySavings = convertCurrency(results.estimatedMonthlySavingsUSD, currency, config);
  const formattedAnnualSavings = convertCurrency(results.estimatedAnnualSavingsUSD, currency, config);
  const formattedTurnkeyCost = convertCurrency(results.estimatedSystemCostUSD, currency, config);
  const formatted25YrProfit = convertCurrency(results.cumulativeSavings25YearsUSD, currency, config);

  return (
    <section id="calculator" className="py-16 sm:py-24 bg-[#F8FAFC] text-[#0F172A] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-[#ED1C24] text-[11px] font-bold uppercase tracking-[0.18em] font-mono shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#ED1C24]" />
            <span>METFONE SOLAR ENGINEERING & SIZING ENGINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            {currentLang === 'VI'
              ? 'Tính Toán Hệ Thống Điện Mặt Trời 100% Chuẩn Xác'
              : currentLang === 'KH'
              ? 'ការគណនាប្រព័ន្ធសូឡាជាក់លាក់ ១០០%'
              : currentLang === 'ZH'
              ? '100% 精准光伏发电与财务计算器'
              : '100% Precision Solar Sizing & Financial Engine'}
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
            {currentLang === 'VI'
              ? 'Tính toán tự động theo 100% nhu cầu điện năng thực tế, sử dụng tấm pin N-type TOPCon 620W chuẩn quốc tế và 4.5 giờ nắng đỉnh/ngày tại Campuchia.'
              : currentLang === 'KH'
              ? 'ការគណនាដោយស្វ័យប្រវត្តិតាមតម្រូវការថាមពលអគ្គិសនីជាក់ស្តែង ១០០% ដោយប្រើផ្ទាំងសូឡា N-type TOPCon 620W និងកម្រិតពន្លឺថ្ងៃ ៤.៥ ម៉ោង/ថ្ងៃ។'
              : currentLang === 'ZH'
              ? '根据100%实际用电负荷精准计算，采用国际标准620W N型TOPCon高效组件与柬埔寨4.5小时/天标准日照峰值。'
              : 'Engineered for 100% electric load offset using Tier-1 620W N-type TOPCon modules and 4.5 peak sun hours/day in Cambodia.'}
          </p>
        </div>

        {/* Interactive Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Controls & Input Parameters (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-7 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#ED1C24]/10 text-[#ED1C24] flex items-center justify-center font-bold">
                  <Calculator className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#64748B] uppercase font-mono tracking-wider block">
                    {currentLang === 'VI' ? 'Bước 1: Nhập Dữ Liệu' : 'Step 1: Input Parameters'}
                  </span>
                  <h3 className="text-base font-bold text-[#0F172A]">
                    {currentLang === 'VI' ? 'Mức Tiêu Thụ Điện Của Bạn' : 'Your Energy Profile'}
                  </h3>
                </div>
              </div>

              {/* Currency Selector */}
              <div className="flex items-center bg-[#F1F5F9] p-1 rounded-lg border border-[#E2E8F0] text-xs font-mono font-bold">
                {(['USD', 'KHR', 'VND'] as Currency[]).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => handleCurrencyChange(curr)}
                    className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                      currency === curr
                        ? 'bg-white text-[#ED1C24] shadow-2xs'
                        : 'text-[#64748B] hover:text-[#0F172A]'
                    }`}
                  >
                    {curr === 'USD' ? '$ USD' : curr === 'KHR' ? '៛ KHR' : '₫ VND'}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Mode Selector: Monthly Bill vs Monthly kWh */}
            <div className="grid grid-cols-2 gap-2 bg-[#F8FAFC] p-1.5 rounded-xl border border-[#E2E8F0] text-xs font-medium">
              <button
                type="button"
                onClick={() => setInputMode('bill')}
                className={`py-2 px-3 rounded-lg text-center font-semibold transition-all cursor-pointer ${
                  inputMode === 'bill'
                    ? 'bg-white text-[#ED1C24] shadow-xs border border-[#E2E8F0]'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                💵 {currentLang === 'VI' ? 'Tiền điện hàng tháng' : 'Monthly Bill'} ({currency})
              </button>
              <button
                type="button"
                onClick={() => setInputMode('kwh')}
                className={`py-2 px-3 rounded-lg text-center font-semibold transition-all cursor-pointer ${
                  inputMode === 'kwh'
                    ? 'bg-white text-[#ED1C24] shadow-xs border border-[#E2E8F0]'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                ⚡ {currentLang === 'VI' ? 'Sản lượng tiêu thụ' : 'Monthly Usage'} (kWh)
              </button>
            </div>

            {/* Main Value Input & Slider */}
            {inputMode === 'bill' ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label htmlFor="bill-input" className="text-xs font-bold text-[#475569] uppercase font-mono">
                    {currentLang === 'VI' ? 'Hóa đơn tiền điện / tháng' : 'Monthly Electricity Bill'}
                  </label>
                  <span className="text-[11px] font-mono text-[#64748B]">
                    ≈ {results.monthlyKWhConsumed.toLocaleString()} kWh/tháng (@$0.174/kWh)
                  </span>
                </div>

                <div className="relative">
                  <input
                    id="bill-input"
                    type="number"
                    min={20}
                    step={10}
                    value={monthlyBillUSD}
                    onChange={(e) => handleBillInputChange(Number(e.target.value))}
                    className="w-full bg-[#F8FAFC] border-2 border-[#E2E8F0] focus:border-[#ED1C24] focus:bg-white rounded-xl py-3 px-4 text-2xl font-extrabold text-[#0F172A] font-mono focus:outline-none transition-all"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#64748B] font-mono">
                    {currency === 'KHR' ? 'KHR ៛' : currency === 'VND' ? 'VND ₫' : 'USD $'}
                  </div>
                </div>

                {/* Slider */}
                <input
                  type="range"
                  min={50}
                  max={currency === 'KHR' ? 40000000 : currency === 'VND' ? 250000000 : 10000}
                  step={currency === 'KHR' ? 100000 : currency === 'VND' ? 500000 : 50}
                  value={monthlyBillUSD}
                  onChange={(e) => handleBillInputChange(Number(e.target.value))}
                  className="w-full h-2 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#ED1C24]"
                />

                {/* Presets Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {billPresetsUSD.map((pUSD) => {
                    const presetVal =
                      currency === 'KHR'
                        ? pUSD * config.khrExchangeRate
                        : currency === 'VND'
                        ? pUSD * config.vndExchangeRate
                        : pUSD;
                    const isSelected = monthlyBillUSD === presetVal;
                    return (
                      <button
                        key={pUSD}
                        type="button"
                        onClick={() => handleBillInputChange(presetVal)}
                        className={`text-xs py-1 px-2.5 rounded-lg font-mono font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#0F172A] text-white'
                            : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
                        }`}
                      >
                        {currency === 'USD'
                          ? `$${pUSD.toLocaleString()}`
                          : currency === 'KHR'
                          ? `${(presetVal / 1000).toFixed(0)}k ៛`
                          : `${(presetVal / 1000000).toFixed(1)}M ₫`}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label htmlFor="kwh-input" className="text-xs font-bold text-[#475569] uppercase font-mono">
                    {currentLang === 'VI' ? 'Số điện tiêu thụ (kWh/tháng)' : 'Monthly Consumption (kWh)'}
                  </label>
                  <span className="text-[11px] font-mono text-[#64748B]">
                    ≈ {results.dailyKWhConsumed} kWh/ngày
                  </span>
                </div>

                <div className="relative">
                  <input
                    id="kwh-input"
                    type="number"
                    min={100}
                    step={50}
                    value={monthlyKWh}
                    onChange={(e) => handleKWhInputChange(Number(e.target.value))}
                    className="w-full bg-[#F8FAFC] border-2 border-[#E2E8F0] focus:border-[#ED1C24] focus:bg-white rounded-xl py-3 px-4 text-2xl font-extrabold text-[#0F172A] font-mono focus:outline-none transition-all"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#64748B] font-mono">
                    kWh / month
                  </div>
                </div>

                <input
                  type="range"
                  min={300}
                  max={60000}
                  step={100}
                  value={monthlyKWh}
                  onChange={(e) => handleKWhInputChange(Number(e.target.value))}
                  className="w-full h-2 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#ED1C24]"
                />
              </div>
            )}

            {/* Property Type Grid */}
            <div className="space-y-2 pt-2 border-t border-[#F1F5F9]">
              <label className="text-xs font-bold text-[#475569] uppercase font-mono block">
                {currentLang === 'VI' ? 'Loại hình công trình' : 'Property Type'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'home', name: currentLang === 'VI' ? 'Nhà / Biệt thự' : 'Home / Villa' },
                  { id: 'shop', name: currentLang === 'VI' ? 'Cửa hàng / Cafe' : 'Shop / Cafe' },
                  { id: 'factory', name: currentLang === 'VI' ? 'Xưởng / Nhà máy' : 'Factory' },
                  { id: 'hotel', name: currentLang === 'VI' ? 'Khách sạn' : 'Hotel / Resort' }
                ].map((prop) => {
                  const isSelected = propertyType === prop.id;
                  return (
                    <button
                      key={prop.id}
                      type="button"
                      onClick={() => setPropertyType(prop.id as PropertyType)}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#ED1C24] bg-[#ED1C24]/5 text-[#ED1C24] ring-1 ring-[#ED1C24]'
                          : 'border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B] hover:bg-[#F1F5F9]'
                      }`}
                    >
                      <div className="mb-1">{propertyIcons[prop.id as PropertyType]}</div>
                      <span className="truncate w-full text-center">{prop.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* System Sizing Mode: 100% On-Grid vs Hybrid Storage */}
            <div className="space-y-2 pt-2 border-t border-[#F1F5F9]">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#475569] uppercase font-mono block">
                  {currentLang === 'VI' ? 'Cấu hình hệ thống' : 'System Configuration'}
                </label>
                <span className="text-[10px] text-[#16A34A] font-bold font-mono">
                  100% POWER OFFSET
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setBatteryPreference('no_battery')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    batteryPreference === 'no_battery'
                      ? 'border-[#0F172A] bg-[#0F172A] text-white shadow-xs'
                      : 'border-[#E2E8F0] bg-[#F8FAFC] text-[#475569] hover:bg-[#F1F5F9]'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs">
                    <Sun className={`w-3.5 h-3.5 ${batteryPreference === 'no_battery' ? 'text-amber-400' : 'text-amber-500'}`} />
                    <span>Hòa Lưới (On-Grid)</span>
                  </div>
                  <span className={`text-[10px] block mt-1 ${batteryPreference === 'no_battery' ? 'text-white/70' : 'text-[#64748B]'}`}>
                    {currentLang === 'VI' ? 'Tối ưu hoàn vốn (2.4 - 3.5 năm)' : 'Max ROI, Lowest CAPEX'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setBatteryPreference('battery_backup')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    batteryPreference === 'battery_backup'
                      ? 'border-[#0F172A] bg-[#0F172A] text-white shadow-xs'
                      : 'border-[#E2E8F0] bg-[#F8FAFC] text-[#475569] hover:bg-[#F1F5F9]'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs">
                    <BatteryCharging className={`w-3.5 h-3.5 ${batteryPreference === 'battery_backup' ? 'text-emerald-400' : 'text-emerald-500'}`} />
                    <span>Lưu Trữ (Hybrid)</span>
                  </div>
                  <span className={`text-[10px] block mt-1 ${batteryPreference === 'battery_backup' ? 'text-white/70' : 'text-[#64748B]'}`}>
                    {currentLang === 'VI' ? 'Pin LiFePO4 + Không lo mất điện' : 'Backup Power + Night Supply'}
                  </span>
                </button>
              </div>
            </div>

            {/* Quick Bill OCR Button */}
            <button
              type="button"
              onClick={onNavigateToBillUpload}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC] hover:bg-[#F1F5F9] text-xs font-semibold text-[#475569] transition-all cursor-pointer"
            >
              <FileUp className="w-4 h-4 text-[#ED1C24]" />
              <span>
                {currentLang === 'VI'
                  ? 'Hoặc tải lên ảnh chụp hóa đơn EDC để trích xuất'
                  : 'Or upload your EDC utility bill to auto-extract'}
              </span>
            </button>
          </div>

          {/* RIGHT COLUMN: Real-Time 100% Results Dashboard (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Primary Hero Result Card */}
            <div className="bg-[#0F172A] rounded-2xl border border-[#1E293B] p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
              {/* Background ambient solar glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#ED1C24]/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                {/* Header Badge & Title */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#ED1C24] text-white text-[10px] font-bold uppercase font-mono tracking-wider">
                      100% ENERGY MATCH
                    </span>
                    <span className="text-xs text-white/60 font-mono">
                      Tier-1 TOPCon 620W Architecture
                    </span>
                  </div>
                  <div className="text-xs text-emerald-400 font-mono font-bold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{currentLang === 'VI' ? 'Thuật toán chuẩn xác 100%' : '100% Precision Model'}</span>
                  </div>
                </div>

                {/* Primary Metric Highlights: Capacity & Savings */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* System Capacity */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4.5 space-y-1">
                    <span className="text-[11px] font-bold text-white/60 uppercase font-mono block">
                      {currentLang === 'VI' ? 'Công Suất Hệ Thống Cần Lắp' : 'Recommended System Size'}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
                        {results.actualInstalledKWp}
                      </span>
                      <span className="text-base font-bold text-amber-400 font-mono">kWp</span>
                    </div>
                    <div className="text-xs text-white/80 font-mono flex items-center gap-1 pt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>
                        <strong>{results.estimatedPanelsCount}</strong> × {results.panelWattage}W N-type Modules
                      </span>
                    </div>
                  </div>

                  {/* 100% Monthly Bill Savings */}
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4.5 space-y-1">
                    <span className="text-[11px] font-bold text-emerald-400 uppercase font-mono block">
                      {currentLang === 'VI' ? 'Tiết Kiệm 100% Tiền Điện' : '100% Bill Offset (Savings)'}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-300 tracking-tight">
                        {formattedMonthlySavings.formatted}
                      </span>
                      <span className="text-xs text-emerald-400 font-mono">/ {currentLang === 'VI' ? 'tháng' : 'month'}</span>
                    </div>
                    <div className="text-xs text-emerald-200/80 font-mono pt-1">
                      ≈ <strong>{formattedAnnualSavings.formatted}</strong> / {currentLang === 'VI' ? 'năm' : 'year'}
                    </div>
                  </div>
                </div>

                {/* Secondary Financial & Technical Specs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs border-t border-white/10 pt-5">
                  <div className="space-y-1">
                    <span className="text-white/50 block font-mono text-[10px] uppercase">
                      {currentLang === 'VI' ? 'Chi phí đầu tư trọn gói' : 'Turnkey Investment'}
                    </span>
                    <span className="font-extrabold text-white text-base font-mono">
                      {formattedTurnkeyCost.formatted}
                    </span>
                    <span className="text-[10px] text-white/40 block font-mono">
                      @$690/kWp turnkey
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-white/50 block font-mono text-[10px] uppercase">
                      {currentLang === 'VI' ? 'Thời gian hoàn vốn' : 'Simple Payback'}
                    </span>
                    <span className="font-extrabold text-emerald-400 text-base font-mono">
                      ≈ {results.estimatedPaybackYears} {currentLang === 'VI' ? 'Năm' : 'Years'}
                    </span>
                    <span className="text-[10px] text-white/40 block font-mono">
                      ROI 25y: +{results.roi25YearsPercent}%
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-white/50 block font-mono text-[10px] uppercase">
                      {currentLang === 'VI' ? 'Sản lượng (4.5h nắng)' : 'Daily Generation'}
                    </span>
                    <span className="font-extrabold text-amber-300 text-base font-mono">
                      {results.estimatedDailyGenerationKWh} <span className="text-xs font-normal">kWh/ngày</span>
                    </span>
                    <span className="text-[10px] text-white/40 block font-mono">
                      {results.estimatedMonthlyGenerationKWh.toLocaleString()} kWh/tháng
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-white/50 block font-mono text-[10px] uppercase">
                      {currentLang === 'VI' ? 'Diện tích mái cần' : 'Roof Area Required'}
                    </span>
                    <span className="font-extrabold text-white text-base font-mono">
                      ≈ {results.requiredRoofAreaSqM} <span className="text-xs font-normal">m²</span>
                    </span>
                    <span className="text-[10px] text-white/40 block font-mono">
                      {results.co2ReductionTonsPerYear} Tấn CO₂/năm
                    </span>
                  </div>
                </div>

                {/* Battery info badge if hybrid selected */}
                {batteryPreference === 'battery_backup' && (
                  <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl flex items-center justify-between text-xs text-emerald-200">
                    <div className="flex items-center gap-2">
                      <BatteryCharging className="w-4 h-4 text-emerald-400" />
                      <span>
                        Dung lượng pin lưu trữ LiFePO4 khuyến nghị: <strong>{results.recommendedBatteryKWh} kWh</strong> (Grade-A, 6000 chu kỳ)
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-emerald-400 font-bold">
                      +${results.batteryCapexUSD.toLocaleString()}
                    </span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleCelebrate();
                      onOpenProposalModal('proposal', results, calculationInputs);
                    }}
                    className="flex-1 bg-[#ED1C24] hover:bg-[#D01820] text-white font-bold py-3.5 px-5 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>
                      {currentLang === 'VI'
                        ? 'Nhận Báo Giá & Bản Vẽ 3D Chính Thức'
                        : 'Get Official Metfone Proposal & 3D Layout'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenProposalModal('site_survey', results, calculationInputs)}
                    className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3.5 px-5 rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>
                      {currentLang === 'VI' ? 'Đặt Lịch Khảo Sát Mái' : 'Schedule Free Site Survey'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Before vs After Electricity Bill Comparison Card */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
                <h4 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#ED1C24]" />
                  <span>
                    {currentLang === 'VI'
                      ? 'So Sánh Hóa Đơn Điện: Trước và Sau Khi Lắp Solar 100%'
                      : 'Before vs. After Solar Financial Comparison'}
                  </span>
                </h4>
                <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  TIẾT KIỆM 100%
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                {/* Before */}
                <div className="p-4 rounded-xl bg-red-50/60 border border-red-100 space-y-1">
                  <span className="text-[10px] font-bold text-red-600 uppercase font-mono block">
                    {currentLang === 'VI' ? 'Trước Khi Lắp Solar' : 'Current Electricity Bill'}
                  </span>
                  <div className="text-2xl font-extrabold text-red-700 font-mono">
                    {formattedMonthlyBill.formatted}
                  </div>
                  <span className="text-[11px] text-red-500/80 block">
                    {results.monthlyKWhConsumed.toLocaleString()} kWh/tháng
                  </span>
                </div>

                {/* After */}
                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100 space-y-1">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase font-mono block">
                    {currentLang === 'VI' ? 'Sau Khi Lắp Solar (100%)' : 'Bill After Solar'}
                  </span>
                  <div className="text-2xl font-extrabold text-emerald-600 font-mono">
                    $0 / 0 ៛
                  </div>
                  <span className="text-[11px] text-emerald-600/80 block">
                    {results.estimatedMonthlyGenerationKWh.toLocaleString()} kWh tự sản xuất
                  </span>
                </div>

                {/* 25-Year Cumulative Profit */}
                <div className="p-4 rounded-xl bg-slate-900 text-white space-y-1">
                  <span className="text-[10px] font-bold text-amber-400 uppercase font-mono block">
                    {currentLang === 'VI' ? 'Lợi Nhuận Ròng 25 Năm' : '25-Year Cumulative Net Profit'}
                  </span>
                  <div className="text-2xl font-extrabold text-white font-mono">
                    +{formatted25YrProfit.formatted}
                  </div>
                  <span className="text-[11px] text-white/60 block">
                    Đã trừ chi phí đầu tư & O&M
                  </span>
                </div>
              </div>
            </div>

            {/* Transparent 100% Mathematical Sizing Breakdown Accordion */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-xs">
              <button
                type="button"
                onClick={() => setShowFormulaDetails(!showFormulaDetails)}
                className="w-full p-4.5 flex items-center justify-between bg-[#F8FAFC] hover:bg-[#F1F5F9] transition-all cursor-pointer text-left"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#ED1C24]" />
                  <span className="text-xs font-bold text-[#0F172A] uppercase font-mono">
                    {currentLang === 'VI'
                      ? '📐 Xem Chi Tiết Công Thức & Thuật Toán Tính Toán 100% Chuẩn Xác'
                      : '📐 View Transparent 100% Engineering Formulas & Math Proof'}
                  </span>
                </div>
                {showFormulaDetails ? (
                  <ChevronUp className="w-4 h-4 text-[#64748B]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#64748B]" />
                )}
              </button>

              {showFormulaDetails && (
                <div className="p-5 border-t border-[#E2E8F0] space-y-4 text-xs font-mono text-[#334155] bg-white">
                  <div className="space-y-2">
                    <div className="font-bold text-[#0F172A] border-b border-slate-100 pb-1">
                      1. Tính toán lượng điện tiêu thụ thực tế (100% baseline):
                    </div>
                    <p className="text-[#475569]">
                      • Sản lượng điện tiêu thụ tháng: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-[#ED1C24] font-bold">E_tháng = ${results.monthlyBillBeforeSolarUSD} / $0.174 = {results.monthlyKWhConsumed} kWh/tháng</code>
                    </p>
                    <p className="text-[#475569]">
                      • Sản lượng điện tiêu thụ ngày: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-[#0F172A]">E_ngày = {results.monthlyKWhConsumed} / 30 = {results.dailyKWhConsumed} kWh/ngày</code>
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="font-bold text-[#0F172A] border-b border-slate-100 pb-1">
                      2. Định cỡ công suất hệ thống theo 4.5 giờ nắng đỉnh/ngày:
                    </div>
                    <p className="text-[#475569]">
                      • Công suất kWp cần thiết: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-[#ED1C24] font-bold">P_target = {results.dailyKWhConsumed} / 4.5h = {(results.dailyKWhConsumed / 4.5).toFixed(2)} kWp</code>
                    </p>
                    <p className="text-[#475569]">
                      • Số tấm pin N-type TOPCon 620W: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-[#0F172A]">N_tấm = ceil({(results.dailyKWhConsumed / 4.5).toFixed(2)} × 1000 / 620) = {results.estimatedPanelsCount} tấm</code>
                    </p>
                    <p className="text-[#475569]">
                      • Công suất lắp đặt thực tế: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-emerald-600 font-bold">P_thực_tế = {results.estimatedPanelsCount} × 0.620 kWp = {results.actualInstalledKWp} kWp</code>
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="font-bold text-[#0F172A] border-b border-slate-100 pb-1">
                      3. Sản lượng phát điện & Giá trị kinh tế (100% Offset):
                    </div>
                    <p className="text-[#475569]">
                      • Sản lượng ngày: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-[#0F172A]">{results.actualInstalledKWp} kWp × 4.5h = {results.estimatedDailyGenerationKWh} kWh/ngày</code>
                    </p>
                    <p className="text-[#475569]">
                      • Sản lượng tháng: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-[#0F172A]">{results.estimatedDailyGenerationKWh} × 30 = {results.estimatedMonthlyGenerationKWh} kWh/tháng</code>
                    </p>
                    <p className="text-[#475569]">
                      • Tiền điện tiết kiệm tháng: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-emerald-600 font-bold">{results.monthlyKWhConsumed} kWh × $0.174 = ${results.estimatedMonthlySavingsUSD}/tháng</code>
                    </p>
                    <p className="text-[#475569]">
                      • Thời gian hoàn vốn: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-[#0F172A]">${results.estimatedSystemCostUSD} / ${results.estimatedAnnualSavingsUSD} = {results.estimatedPaybackYears} năm</code>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
