import {
  CalculatorInputs,
  SolarCalculationResult,
  SolarEngineConfig,
  LeadScore,
  DaytimeUsage,
  Currency
} from '../types';

export const DEFAULT_SOLAR_CONFIG: SolarEngineConfig = {
  tariffUSD: 0.174, // Cambodia EDC average commercial/residential baseline ($/kWh)
  sunshineHoursPerDay: 4.5, // 4.5 hours of peak sunshine per day in Cambodia (4.5h nắng/ngày)
  specificYieldKWhPerKWp: 1642.5, // 1,642.5 kWh/kWp/year (4.5h sunshine/day * 365 days)
  performanceRatio: 1.0, // 100% efficiency calculation baseline
  panelWattage: 620, // 620W Tier-1 N-type TopCon solar modules
  capexPerKWpUSD: 690, // Tier-1 Inverter + 620W Panels + Aluminum Mounting + Grid Sync ($/kWp)
  batteryCapexPerKWhUSD: 330, // LiFePO4 Grade-A Energy Storage ($/kWh)
  omCostPercentPerYear: 0.01,
  degradationPercentPerYear: 0.004, // 0.4% linear annual degradation (N-type TopCon premium)
  khrExchangeRate: 4100, // 1 USD = 4,100 KHR
  vndExchangeRate: 25400, // 1 USD = 25,400 VND
  daytimeOffsetRatios: {
    mostly_day: 1.0,
    day_night: 1.0,
    mostly_night: 1.0,
    not_sure: 1.0
  }
};

/**
 * Converts currency amounts between USD, KHR, and VND.
 */
export function convertCurrency(
  amountUSD: number,
  targetCurrency: Currency,
  config: SolarEngineConfig = DEFAULT_SOLAR_CONFIG
): { value: number; formatted: string; symbol: string } {
  if (targetCurrency === 'KHR') {
    const val = Math.round(amountUSD * config.khrExchangeRate);
    return {
      value: val,
      formatted: val.toLocaleString() + ' ៛',
      symbol: '៛'
    };
  }
  if (targetCurrency === 'VND') {
    const val = Math.round(amountUSD * config.vndExchangeRate);
    return {
      value: val,
      formatted: val.toLocaleString() + ' ₫',
      symbol: '₫'
    };
  }
  return {
    value: amountUSD,
    formatted: '$' + Math.round(amountUSD).toLocaleString(),
    symbol: '$'
  };
}

/**
 * 100% Precision Solar Sizing & Financial Algorithm
 * 
 * Sizing Formula (100% Efficiency Coverage):
 * 1. Monthly Electricity Consumption: E_monthly (kWh) = Monthly Bill ($) / Tariff ($/kWh)
 * 2. Daily Electricity Consumption: E_daily (kWh) = E_monthly / 30
 * 3. Daily Peak Sunshine: 4.5 hours / day
 * 4. Required Solar Capacity for 100% Coverage:
 *      P_target (kWp) = E_daily / 4.5h = E_monthly / 135
 * 5. Number of 620W N-type Modules:
 *      N_panels = ceil( (P_target * 1000) / 620 )
 * 6. Actual Installed Capacity:
 *      P_actual (kWp) = (N_panels * 620) / 1000
 * 7. Exact Solar Generation Output:
 *      Daily Generation (kWh/day) = P_actual * 4.5h
 *      Monthly Generation (kWh/month) = Daily Generation * 30 = P_actual * 135
 *      Annual Generation (kWh/year) = P_actual * 1642.5
 * 8. Financial Savings (100% Offset):
 *      Monthly Savings ($/mo) = min(Monthly Generation, Monthly Consumption) * Tariff = Bill ($)
 *      Annual Savings ($/yr) = Monthly Savings * 12
 *      Remaining Bill ($/mo) = $0 (100% offset)
 * 9. CAPEX & Simple Payback:
 *      Turnkey Solar Cost ($) = P_actual * $690/kWp
 *      Battery Storage Cost ($) = Battery kWh * $330/kWh
 *      Total Investment ($) = Solar Cost + Battery Cost
 *      Payback Period (years) = Total Investment / Annual Savings (approx 2.4 - 3.5 yrs)
 * 10. 25-Year Cumulative Savings:
 *      Sum over 25 years factoring in 0.4%/yr TopCon degradation minus 1%/yr O&M
 */
export function calculateSolarSystem(
  inputs: CalculatorInputs,
  config: SolarEngineConfig = DEFAULT_SOLAR_CONFIG
): SolarCalculationResult {
  // Ensure valid baseline bill in USD
  let billUSD = Math.max(10, inputs.monthlyBillUSD || 100);
  if (inputs.inputMode === 'kwh' && inputs.monthlyKWh && inputs.monthlyKWh > 0) {
    billUSD = Math.max(10, inputs.monthlyKWh * config.tariffUSD);
  }

  const annualBillUSD = billUSD * 12;
  const sunshineHours = config.sunshineHoursPerDay || 4.5;
  const specificYieldAnnual = config.specificYieldKWhPerKWp || (sunshineHours * 365); // 1,642.5 kWh/kWp/yr
  const panelWatt = config.panelWattage || 620; // 620W TopCon module

  // 1. Monthly & Daily consumption in kWh
  const monthlyKWhConsumed = Math.round((billUSD / config.tariffUSD) * 10) / 10;
  const dailyKWhConsumed = Math.round((monthlyKWhConsumed / 30) * 10) / 10;

  // 2. Exact Target kWp needed for 100% electric energy offset
  // P_target = Daily kWh / 4.5h sunshine
  const targetKWp = dailyKWhConsumed / sunshineHours;

  // 3. Number of 620W N-type Modules
  const estimatedPanelsCount = Math.max(2, Math.ceil((targetKWp * 1000) / panelWatt));

  // 4. Actual Installed Capacity in kWp (from whole panels count)
  const actualInstalledKWp = Math.round(((estimatedPanelsCount * panelWatt) / 1000) * 100) / 100;
  const estimatedKWp = actualInstalledKWp;

  // 5. Exact Solar Generation Output
  const estimatedDailyGenerationKWh = Math.round((actualInstalledKWp * sunshineHours) * 10) / 10;
  const estimatedMonthlyGenerationKWh = Math.round((estimatedDailyGenerationKWh * 30) * 10) / 10;
  const estimatedAnnualGenerationKWh = Math.round(actualInstalledKWp * specificYieldAnnual);

  // 6. 100% Coverage & Financial Savings
  const solarCoveragePercent = Math.min(
    100,
    Math.round((estimatedMonthlyGenerationKWh / monthlyKWhConsumed) * 100)
  );

  // Monthly savings = 100% offset of electricity consumed by solar generation
  const usableMonthlyKWh = Math.min(monthlyKWhConsumed, estimatedMonthlyGenerationKWh);
  const estimatedMonthlySavingsUSD = Math.round(usableMonthlyKWh * config.tariffUSD);
  const estimatedAnnualSavingsUSD = Math.round(estimatedMonthlySavingsUSD * 12);
  const estimatedMonthlyBillAfterSolarUSD = Math.max(0, Math.round(billUSD - estimatedMonthlySavingsUSD));
  const estimatedBillReductionPercent = 100;

  // 7. Battery Storage Recommendation (if selected)
  let recommendedBatteryKWh = 0;
  if (inputs.batteryPreference === 'battery_backup') {
    // Size battery to hold 50% to 70% of night load
    if (inputs.propertyType === 'home') {
      recommendedBatteryKWh = Math.round(actualInstalledKWp * 1.5 * 10) / 10;
    } else if (inputs.propertyType === 'shop' || inputs.propertyType === 'restaurant') {
      recommendedBatteryKWh = Math.round(actualInstalledKWp * 1.2);
    } else {
      recommendedBatteryKWh = Math.round(actualInstalledKWp * 1.0);
    }
  }

  // Solution classification
  let recommendedSolution: 'on_grid' | 'hybrid' | 'solar_battery' = 'on_grid';
  if (inputs.batteryPreference === 'battery_backup') {
    recommendedSolution = inputs.propertyType === 'home' || inputs.propertyType === 'shop' ? 'hybrid' : 'solar_battery';
  }

  // 8. Turnkey Investment Cost (CAPEX)
  const solarCapexUSD = Math.round(actualInstalledKWp * config.capexPerKWpUSD);
  const batteryCapexUSD = Math.round(recommendedBatteryKWh * config.batteryCapexPerKWhUSD);
  const estimatedSystemCostUSD = solarCapexUSD + batteryCapexUSD;

  // 9. Exact Simple Payback in Years
  // Payback = Total CAPEX / Annual Savings
  const rawPaybackYears = estimatedSystemCostUSD / Math.max(1, estimatedAnnualSavingsUSD);
  const estimatedPaybackYears = Math.round(rawPaybackYears * 10) / 10;

  // 10. 25-Year Cumulative Financial Profit Model
  let cumulative25YrSavings = 0;
  for (let year = 1; year <= 25; year++) {
    // 0.4% TopCon degradation per year
    const degradationFactor = 1 - (year - 1) * config.degradationPercentPerYear;
    const yearGeneration = estimatedAnnualGenerationKWh * degradationFactor;
    const yearGrossSavings = Math.min(annualBillUSD, yearGeneration * config.tariffUSD);
    const yearOMCost = solarCapexUSD * config.omCostPercentPerYear;
    cumulative25YrSavings += (yearGrossSavings - yearOMCost);
  }
  const cumulativeSavings25YearsUSD = Math.round(cumulative25YrSavings - estimatedSystemCostUSD);
  const roi25YearsPercent = Math.round((cumulativeSavings25YearsUSD / Math.max(1, estimatedSystemCostUSD)) * 100);

  // 11. Roof Space & Environmental Metrics
  // 620W panel size: 2.278m x 1.134m = 2.58 m² + spacing = 2.7 m² per module
  const requiredRoofAreaSqM = Math.round(estimatedPanelsCount * 2.7);

  // Carbon offset in Cambodia: 0.58 kg CO2 / kWh
  const co2ReductionTonsPerYear = Math.round(((estimatedAnnualGenerationKWh * 0.58) / 1000) * 10) / 10;
  const treesEquivalentPerYear = Math.round(co2ReductionTonsPerYear * 45);

  return {
    estimatedKWp,
    actualInstalledKWp,
    estimatedPanelsCount,
    panelWattage: panelWatt,
    sunshineHoursPerDay: sunshineHours,
    monthlyKWhConsumed,
    dailyKWhConsumed,
    estimatedDailyGenerationKWh,
    estimatedMonthlyGenerationKWh,
    estimatedAnnualGenerationKWh,
    solarCoveragePercent,
    monthlyBillBeforeSolarUSD: billUSD,
    estimatedMonthlySavingsUSD,
    estimatedAnnualSavingsUSD,
    estimatedMonthlyBillAfterSolarUSD,
    estimatedBillReductionPercent,
    solarCapexUSD,
    batteryCapexUSD,
    estimatedSystemCostUSD,
    estimatedPaybackYears,
    cumulativeSavings25YearsUSD,
    roi25YearsPercent,
    recommendedBatteryKWh,
    recommendedSolution,
    requiredRoofAreaSqM,
    co2ReductionTonsPerYear,
    treesEquivalentPerYear
  };
}

/**
 * Calculates internal lead qualification score and recommended action.
 */
export function calculateLeadScore(
  monthlyBillUSD: number,
  daytimeUsage: DaytimeUsage,
  requestType: string
): { score: LeadScore; recommendation: string; badgeColor: string } {
  const isHighBill = monthlyBillUSD >= 1000;
  const isMediumBill = monthlyBillUSD >= 300;
  const isHighIntentRequest = requestType === 'site_survey' || requestType === 'proposal' || requestType === 'bill_audit';

  if (isHighBill || monthlyBillUSD >= 2000) {
    return {
      score: 'HOT',
      recommendation: 'Priority VIP: Dispatch Metfone Technical Engineer for immediate rooftop inspection & customized 100% solar proposal.',
      badgeColor: 'bg-[#E03E2D] text-white'
    };
  }

  if (isMediumBill || isHighIntentRequest) {
    return {
      score: 'WARM',
      recommendation: 'Qualified Prospect: Deliver customized quotation package via Telegram / WhatsApp within 2 hours.',
      badgeColor: 'bg-[#C27803] text-white'
    };
  }

  return {
    score: 'NURTURE',
    recommendation: 'Standard Sizing: Send instant automated 100% solar calculation report and follow-up.',
    badgeColor: 'bg-[#1E7B58] text-white'
  };
}

export const CAMBODIA_PROVINCES = [
  'Phnom Penh',
  'Siem Reap',
  'Battambang',
  'Sihanoukville (Preah Sihanouk)',
  'Kandal',
  'Kampong Cham',
  'Kampong Speu',
  'Kampong Chhnang',
  'Kampong Thom',
  'Banteay Meanchey',
  'Kampot',
  'Kep',
  'Koh Kong',
  'Kratie',
  'Mondulkiri',
  'Odor Meanchey',
  'Pailin',
  'Preah Vihear',
  'Prey Veng',
  'Pursat',
  'Ratanakiri',
  'Stung Treng',
  'Svay Rieng',
  'Takeo',
  'Tboung Khmum'
];

/**
 * Standard Metfone Pre-Engineered Turnkey Solar Packages (100% Precision)
 */
export const STANDARD_SOLAR_PACKAGES = [
  {
    id: 'pkg-home-6kw',
    name: 'Home & Villa 100% Solar Package',
    capacityKWp: 6.2,
    panelsCount: 10,
    panelWattage: 620,
    dailyGenerationKWh: 27.9,
    monthlyGenerationKWh: 837,
    idealForBillUSD: '120 – 180',
    turnkeyCostUSD: 4278,
    paybackYears: 2.5,
    inverterType: '6kW Single/Three-Phase Tier-1 Inverter',
    roofAreaSqM: 27,
    warranty: '12 yrs product, 30 yrs 87.4% linear power'
  },
  {
    id: 'pkg-commercial-12kw',
    name: 'Shop & Cafe 100% Solar Package',
    capacityKWp: 12.4,
    panelsCount: 20,
    panelWattage: 620,
    dailyGenerationKWh: 55.8,
    monthlyGenerationKWh: 1674,
    idealForBillUSD: '250 – 350',
    turnkeyCostUSD: 8556,
    paybackYears: 2.4,
    inverterType: '12kW Three-Phase High Efficiency Inverter',
    roofAreaSqM: 54,
    warranty: '12 yrs product, 30 yrs 87.4% linear power'
  },
  {
    id: 'pkg-business-25kw',
    name: 'Enterprise & Hotel 100% Package',
    capacityKWp: 24.8,
    panelsCount: 40,
    panelWattage: 620,
    dailyGenerationKWh: 111.6,
    monthlyGenerationKWh: 3348,
    idealForBillUSD: '500 – 700',
    turnkeyCostUSD: 17112,
    paybackYears: 2.4,
    inverterType: '25kW Three-Phase Dual-MPPT Inverter',
    roofAreaSqM: 108,
    warranty: '12 yrs product, 30 yrs 87.4% linear power'
  },
  {
    id: 'pkg-industrial-62kw',
    name: 'Industrial Factory 100% Package',
    capacityKWp: 62.0,
    panelsCount: 100,
    panelWattage: 620,
    dailyGenerationKWh: 279.0,
    monthlyGenerationKWh: 8370,
    idealForBillUSD: '1,300 – 1,800',
    turnkeyCostUSD: 42780,
    paybackYears: 2.4,
    inverterType: '60kW Industrial High-Voltage Inverter Station',
    roofAreaSqM: 270,
    warranty: '12 yrs product, 30 yrs 87.4% linear power'
  },
  {
    id: 'pkg-mega-124kw',
    name: 'Megawatt C&I Turnkey Station',
    capacityKWp: 124.0,
    panelsCount: 200,
    panelWattage: 620,
    dailyGenerationKWh: 558.0,
    monthlyGenerationKWh: 16740,
    idealForBillUSD: '2,800 – 3,500+',
    turnkeyCostUSD: 85560,
    paybackYears: 2.3,
    inverterType: '100kW+ Utility-Grade MPPT Smart Inverters',
    roofAreaSqM: 540,
    warranty: '12 yrs product, 30 yrs 87.4% linear power'
  }
];

