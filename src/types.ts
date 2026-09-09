export type Language = 'EN' | 'KH' | 'VI';

export type PropertyType =
  | 'home'
  | 'shop'
  | 'restaurant'
  | 'office'
  | 'factory'
  | 'hotel'
  | 'other';

export type DaytimeUsage =
  | 'mostly_day'
  | 'day_night'
  | 'mostly_night'
  | 'not_sure';

export type BatteryPreference =
  | 'no_battery'
  | 'battery_backup'
  | 'not_sure';

export type Currency = 'USD' | 'KHR' | 'VND';

export interface CalculatorInputs {
  propertyType: PropertyType;
  monthlyBillUSD: number;
  monthlyKWh?: number;
  inputMode?: 'bill' | 'kwh';
  currency: Currency;
  daytimeUsage: DaytimeUsage;
  batteryPreference: BatteryPreference;
  targetCoveragePercent?: number; // default 100%
  roofAreaSqM?: number;
  province?: string;
}

export interface SolarCalculationResult {
  // 100% Precision Electrical Capacity & Hardware Specs
  estimatedKWp: number; // Target calculated capacity in kWp
  actualInstalledKWp: number; // Actual kWp from exact 620W modules count
  estimatedPanelsCount: number; // Number of 620W N-type TopCon modules
  panelWattage: number; // 620W
  sunshineHoursPerDay: number; // 4.5 hours/day
  
  // Power Consumption vs Generation (100% Baseline)
  monthlyKWhConsumed: number; // kWh consumed per month
  dailyKWhConsumed: number; // kWh consumed per day
  estimatedDailyGenerationKWh: number; // Daily generation at 4.5h sun
  estimatedMonthlyGenerationKWh: number; // Monthly generation (Daily * 30)
  estimatedAnnualGenerationKWh: number; // Annual generation (Monthly * 12 or kWp * 1,642.5)
  solarCoveragePercent: number; // 100% energy coverage
  
  // Financial Savings & Investment Breakdown
  monthlyBillBeforeSolarUSD: number; // Original monthly bill in USD
  estimatedMonthlySavingsUSD: number; // Monthly bill savings in USD (100% offset)
  estimatedAnnualSavingsUSD: number; // Annual savings in USD
  estimatedMonthlyBillAfterSolarUSD: number; // Remaining bill ($0 or nominal grid fee)
  estimatedBillReductionPercent: number; // 100% bill reduction
  
  // Investment & Return on Investment (ROI)
  solarCapexUSD: number; // Solar PV turnkey cost ($690/kWp)
  batteryCapexUSD: number; // Battery storage cost (if selected)
  estimatedSystemCostUSD: number; // Total turnkey investment ($)
  estimatedPaybackYears: number; // Exact payback period in years (CAPEX / Annual Savings)
  cumulativeSavings25YearsUSD: number; // Total net profit over 25-year panel lifetime
  roi25YearsPercent: number; // ROI percentage over 25 years
  
  // Technical & Environmental Specs
  recommendedBatteryKWh: number;
  recommendedSolution: 'on_grid' | 'hybrid' | 'solar_battery';
  requiredRoofAreaSqM: number; // m² needed (2.7 m² per 620W panel)
  co2ReductionTonsPerYear: number; // Metric tons CO₂ avoided/year
  treesEquivalentPerYear: number; // Equivalent mature trees planted/year
}

export type LeadScore = 'HOT' | 'WARM' | 'NURTURE';

export interface LeadSubmission {
  id: string;
  name: string;
  phone: string;
  preferredChannel: 'telegram' | 'whatsapp' | 'phone' | 'messenger';
  email?: string;
  province: string;
  propertyType: PropertyType;
  monthlyBillUSD: number;
  monthlyKWh?: number;
  daytimeUsage: DaytimeUsage;
  batteryPreference: BatteryPreference;
  estimatedKWp: number;
  estimatedPanelsCount?: number;
  estimatedMonthlySavingsUSD: number;
  estimatedAnnualSavingsUSD: number;
  estimatedPaybackYears: number;
  estimatedSystemCostUSD?: number;
  leadScore: LeadScore;
  requestType: 'proposal' | 'site_survey' | 'expert_call' | 'bill_audit';
  notes?: string;
  billFileName?: string;
  billFileSize?: string;
  parsedBillData?: {
    monthlyKWh?: number;
    tariffUSD?: number;
    meterNumber?: string;
    peakDemandKW?: number;
  };
  createdAt: string;
  status: 'new' | 'contacted' | 'survey_scheduled' | 'proposal_sent' | 'closed';
}

export interface SolarEngineConfig {
  tariffUSD: number; // e.g. 0.174 USD per kWh (EDC baseline)
  sunshineHoursPerDay: number; // 4.5 hours/day peak sun hours in Cambodia
  specificYieldKWhPerKWp: number; // 1642.5 kWh/kWp/year (4.5h * 365 days)
  performanceRatio: number; // 1.0 (100% calculation baseline)
  panelWattage: number; // 620W N-type TopCon solar modules
  capexPerKWpUSD: number; // e.g. 690 USD / kWp installed turnkey
  batteryCapexPerKWhUSD: number; // e.g. 330 USD / kWh Grade-A LiFePO4
  omCostPercentPerYear: number; // e.g. 1.0% of CAPEX
  degradationPercentPerYear: number; // e.g. 0.4% per year
  khrExchangeRate: number; // e.g. 4100 KHR / USD
  vndExchangeRate: number; // e.g. 25400 VND / USD
  daytimeOffsetRatios: Record<DaytimeUsage, number>;
}
