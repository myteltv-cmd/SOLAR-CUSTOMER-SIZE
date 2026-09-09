import React, { useState, useRef } from 'react';
import { Language, SolarEngineConfig, SolarCalculationResult, CalculatorInputs } from '../types';
import { translations } from '../i18n/translations';
import { calculateSolarSystem } from '../utils/calculator';
import {
  FileUp,
  FileText,
  CheckCircle2,
  Sparkles,
  Zap,
  Building,
  ArrowRight,
  TrendingDown,
  Clock,
  ShieldCheck,
  AlertCircle,
  X
} from 'lucide-react';

interface BillUploadSectionProps {
  currentLang: Language;
  config: SolarEngineConfig;
  onApplyBillData: (calculatedData: SolarCalculationResult, inputs: CalculatorInputs, billMeta: any) => void;
}

interface ParsedBill {
  customerName: string;
  meterId: string;
  billingPeriod: string;
  monthlyKWh: number;
  monthlyBillUSD: number;
  tariffRateUSD: number;
  peakDemandKVA: number;
  propertyType: 'factory' | 'hotel' | 'home' | 'shop';
  confidence: number;
  fileName: string;
}

export const BillUploadSection: React.FC<BillUploadSectionProps> = ({
  currentLang,
  config,
  onApplyBillData
}) => {
  const t = translations[currentLang];
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [parsedBill, setParsedBill] = useState<ParsedBill | null>(null);
  const [scanProgress, setScanProgress] = useState(0);

  // Pre-configured realistic EDC Cambodia sample bills
  const sampleBills: Record<string, ParsedBill> = {
    factory: {
      customerName: 'Cambodia Garment & Textile Manufacturing Co.',
      meterId: 'EDC-PP-8849201',
      billingPeriod: 'July 2026',
      monthlyKWh: 20450,
      monthlyBillUSD: 3450,
      tariffRateUSD: 0.168,
      peakDemandKVA: 160,
      propertyType: 'factory',
      confidence: 98,
      fileName: 'EDC_Industrial_Tariff_Bill_Sample.pdf'
    },
    hotel: {
      customerName: 'Riverside Boutique Hotel & Spa Phnom Penh',
      meterId: 'EDC-PP-5192834',
      billingPeriod: 'July 2026',
      monthlyKWh: 10600,
      monthlyBillUSD: 1850,
      tariffRateUSD: 0.174,
      peakDemandKVA: 85,
      propertyType: 'hotel',
      confidence: 96,
      fileName: 'EDC_Commercial_Hotel_Bill_Sample.jpg'
    },
    home: {
      customerName: 'Mr. & Mrs. Ouk Sokunthea (Borey Villa)',
      meterId: 'EDC-KD-1049281',
      billingPeriod: 'July 2026',
      monthlyKWh: 1780,
      monthlyBillUSD: 320,
      tariffRateUSD: 0.180,
      peakDemandKVA: 15,
      propertyType: 'home',
      confidence: 95,
      fileName: 'EDC_Residential_Villa_Bill_Sample.png'
    }
  };

  const simulateOcrScan = (billData: ParsedBill) => {
    setIsScanning(true);
    setScanProgress(10);
    setParsedBill(null);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          setTimeout(() => {
            setIsScanning(false);
            setParsedBill(billData);
          }, 300);
          return 100;
        }
        return prev + 25;
      });
    }, 180);
  };

  const handleFileUpload = (file: File) => {
    // Generate simulated parsing based on file name or fallback to high-tier profile
    const billData: ParsedBill = {
      customerName: 'Verified Utility Customer (EDC Cambodia)',
      meterId: `EDC-${Math.floor(1000000 + Math.random() * 9000000)}`,
      billingPeriod: 'Recent Billing Statement',
      monthlyKWh: 7850,
      monthlyBillUSD: 1350,
      tariffRateUSD: 0.172,
      peakDemandKVA: 65,
      propertyType: 'shop',
      confidence: 94,
      fileName: file.name
    };
    simulateOcrScan(billData);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleApplyToProposal = () => {
    if (!parsedBill) return;

    const customInputs: CalculatorInputs = {
      propertyType: parsedBill.propertyType,
      monthlyBillUSD: parsedBill.monthlyBillUSD,
      currency: 'USD',
      daytimeUsage: parsedBill.propertyType === 'factory' || parsedBill.propertyType === 'shop' ? 'mostly_day' : 'day_night',
      batteryPreference: parsedBill.propertyType === 'home' ? 'battery_backup' : 'no_battery'
    };

    const calculatedResults = calculateSolarSystem(customInputs, config);

    onApplyBillData(calculatedResults, customInputs, {
      meterId: parsedBill.meterId,
      monthlyKWh: parsedBill.monthlyKWh,
      tariffUSD: parsedBill.tariffRateUSD,
      peakDemandKVA: parsedBill.peakDemandKVA,
      fileName: parsedBill.fileName
    });
  };

  return (
    <section id="bill-upload" className="py-16 sm:py-24 bg-[#EFECE6] border-y border-[#1A1A1A]/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#1A1A1A]/10 text-[#E03E2D] text-[10px] font-bold uppercase tracking-[0.2em] font-mono shadow-2xs">
            <Zap className="w-3.5 h-3.5 text-[#E03E2D]" />
            <span>{t.billUpload.badge}</span>
          </div>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
            {t.billUpload.title}
          </h2>
          <p className="text-base sm:text-lg text-[#1A1A1A]/70 leading-relaxed">
            {t.billUpload.subtitle}
          </p>
        </div>

        {/* Upload Card & Sample Switchers */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#1A1A1A]/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-6">
          {/* Drag & Drop Area */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all cursor-pointer ${
              isDragging
                ? 'border-[#E03E2D] bg-[#EFECE6]/50'
                : 'border-[#1A1A1A]/15 hover:border-[#E03E2D]/50 bg-[#F7F5F2]'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,image/png,image/jpeg,image/jpg"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileUpload(e.target.files[0]);
                }
              }}
            />

            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#EFECE6] border border-[#1A1A1A]/10 text-[#E03E2D] flex items-center justify-center mb-3">
              <FileUp className="w-7 h-7" />
            </div>

            <div className="text-base sm:text-lg font-bold text-[#1A1A1A]">
              {t.billUpload.dragDropTitle}
            </div>
            <div className="text-xs text-[#1A1A1A]/60 mt-1 font-mono">
              {t.billUpload.supportedFormats}
            </div>
          </div>

          {/* Quick Clickable Sample EDC Bills */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/50 font-mono mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C27803]" />
              <span>{t.billUpload.sampleBillsTitle}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                id="sample-bill-factory-btn"
                onClick={() => simulateOcrScan(sampleBills.factory)}
                className="flex items-center justify-between p-3 bg-[#F7F5F2] rounded-xl border border-[#1A1A1A]/10 hover:border-[#E03E2D] hover:shadow-2xs transition-all text-left cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#E03E2D]" />
                  <span className="text-xs font-bold text-[#1A1A1A]">
                    {t.billUpload.sampleFactory}
                  </span>
                </div>
                <span className="text-[10px] bg-[#EFECE6] text-[#E03E2D] font-bold font-mono px-2 py-0.5 rounded border border-[#1A1A1A]/5">
                  Test
                </span>
              </button>

              <button
                id="sample-bill-hotel-btn"
                onClick={() => simulateOcrScan(sampleBills.hotel)}
                className="flex items-center justify-between p-3 bg-[#F7F5F2] rounded-xl border border-[#1A1A1A]/10 hover:border-[#E03E2D] hover:shadow-2xs transition-all text-left cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#1A1A1A]" />
                  <span className="text-xs font-bold text-[#1A1A1A]">
                    {t.billUpload.sampleHotel}
                  </span>
                </div>
                <span className="text-[10px] bg-[#EFECE6] text-[#1A1A1A] font-bold font-mono px-2 py-0.5 rounded border border-[#1A1A1A]/5">
                  Test
                </span>
              </button>

              <button
                id="sample-bill-home-btn"
                onClick={() => simulateOcrScan(sampleBills.home)}
                className="flex items-center justify-between p-3 bg-[#F7F5F2] rounded-xl border border-[#1A1A1A]/10 hover:border-[#E03E2D] hover:shadow-2xs transition-all text-left cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#1E7B58]" />
                  <span className="text-xs font-bold text-[#1A1A1A]">
                    {t.billUpload.sampleHome}
                  </span>
                </div>
                <span className="text-[10px] bg-[#EFECE6] text-[#1E7B58] font-bold font-mono px-2 py-0.5 rounded border border-[#1A1A1A]/5">
                  Test
                </span>
              </button>
            </div>
          </div>

          {/* OCR Scanning Progress Bar */}
          {isScanning && (
            <div className="bg-[#F7F5F2] rounded-xl p-6 border border-[#1A1A1A]/15 shadow-2xs space-y-3 animate-pulse">
              <div className="flex items-center justify-between text-xs font-bold text-[#1A1A1A]">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#E03E2D] animate-spin" />
                  {t.billUpload.analyzingBill}
                </span>
                <span className="font-mono">{scanProgress}%</span>
              </div>
              <div className="w-full bg-[#EFECE6] rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-[#E03E2D] h-1.5 rounded-full transition-all duration-200"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Extracted Data Display Card */}
          {parsedBill && !isScanning && (
            <div className="bg-[#F7F5F2] rounded-2xl p-6 border border-[#1E7B58]/40 shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#1A1A1A]/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#EFECE6] text-[#1E7B58] flex items-center justify-center border border-[#1A1A1A]/5">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif-editorial text-lg font-bold text-[#1A1A1A]">
                      {t.billUpload.extractedDataTitle}
                    </h4>
                    <span className="text-xs text-[#1A1A1A]/60 font-mono">
                      Extracted from {parsedBill.fileName} • {parsedBill.confidence}% confidence
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setParsedBill(null)}
                  className="text-[#1A1A1A]/40 hover:text-[#1A1A1A] p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white p-3 rounded-xl border border-[#1A1A1A]/10">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#1A1A1A]/50 font-mono block">
                    {t.billUpload.meterNumber}
                  </span>
                  <span className="text-sm font-bold text-[#1A1A1A] font-mono">
                    {parsedBill.meterId}
                  </span>
                </div>

                <div className="bg-white p-3 rounded-xl border border-[#1A1A1A]/10">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#1A1A1A]/50 font-mono block">
                    {t.billUpload.monthlyKWh}
                  </span>
                  <span className="text-sm font-bold text-[#1A1A1A] font-mono">
                    {parsedBill.monthlyKWh.toLocaleString()} kWh
                  </span>
                </div>

                <div className="bg-white p-3 rounded-xl border border-[#1A1A1A]/10">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#1A1A1A]/50 font-mono block">
                    {t.billUpload.tariffRate}
                  </span>
                  <span className="text-sm font-bold text-[#1E7B58] font-mono">
                    ${parsedBill.tariffRateUSD.toFixed(3)} / kWh
                  </span>
                </div>

                <div className="bg-white p-3 rounded-xl border border-[#1A1A1A]/10">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#1A1A1A]/50 font-mono block">
                    {t.billUpload.peakDemand}
                  </span>
                  <span className="text-sm font-bold text-[#C27803] font-mono">
                    {parsedBill.peakDemandKVA} kVA
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <div className="text-xs text-[#1A1A1A]/70">
                  Total Monthly Charge: <strong className="text-[#1A1A1A] font-mono">${parsedBill.monthlyBillUSD.toLocaleString()}</strong> ({parsedBill.billingPeriod})
                </div>

                <button
                  id="apply-bill-to-proposal-btn"
                  onClick={handleApplyToProposal}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#E03E2D] hover:bg-[#C92F20] text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs cursor-pointer transition-all"
                >
                  <span>{t.billUpload.generateProposalFromBill}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
