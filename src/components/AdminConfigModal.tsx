import React, { useState } from 'react';
import {
  SolarEngineConfig,
  LeadSubmission,
  LeadScore,
  Language
} from '../types';
import { DEFAULT_SOLAR_CONFIG } from '../utils/calculator';
import {
  X,
  Database,
  Sliders,
  Users,
  Download,
  Flame,
  Clock,
  Sparkles,
  Phone,
  Send,
  RefreshCw,
  CheckCircle2,
  Filter
} from 'lucide-react';

interface AdminConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SolarEngineConfig;
  onUpdateConfig: (newConfig: SolarEngineConfig) => void;
  leads: LeadSubmission[];
  currentLang: Language;
}

export const AdminConfigModal: React.FC<AdminConfigModalProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
  leads,
  currentLang
}) => {
  const [activeTab, setActiveTab] = useState<'crm' | 'config'>('crm');
  const [scoreFilter, setScoreFilter] = useState<'ALL' | LeadScore>('ALL');
  const [localConfig, setLocalConfig] = useState<SolarEngineConfig>(config);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const filteredLeads = leads.filter((lead) => {
    if (scoreFilter === 'ALL') return true;
    return lead.leadScore === scoreFilter;
  });

  const handleExportCsv = () => {
    const headers = [
      'Lead ID',
      'Name',
      'Phone',
      'Preferred Channel',
      'Province',
      'Property Type',
      'Monthly Bill ($)',
      'Est. Solar kWp',
      'Est. Monthly Savings ($)',
      'Lead Score',
      'Request Type',
      'Created At'
    ];

    const rows = leads.map((l) => [
      l.id,
      `"${l.name.replace(/"/g, '""')}"`,
      l.phone,
      l.preferredChannel,
      l.province,
      l.propertyType,
      l.monthlyBillUSD,
      l.estimatedKWp,
      l.estimatedMonthlySavingsUSD,
      l.leadScore,
      l.requestType,
      l.createdAt
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Metfone_Solar_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveConfig = () => {
    onUpdateConfig(localConfig);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleResetConfig = () => {
    setLocalConfig(DEFAULT_SOLAR_CONFIG);
    onUpdateConfig(DEFAULT_SOLAR_CONFIG);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141413]/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#F7F5F2] rounded-3xl max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-[#1A1A1A]/15 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#1A1A1A]/10 flex items-center justify-between bg-[#EFECE6]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#141413] text-white flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-editorial text-base font-bold text-[#1A1A1A]">
                Metfone Solar Management Portal
              </h3>
              <span className="text-xs text-[#1A1A1A]/60 font-mono">
                Sales Lead Qualification & Engineering Assumptions Engine
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Tabs switcher */}
            <div className="flex bg-white/80 p-1 rounded-xl text-xs font-bold border border-[#1A1A1A]/10 font-mono">
              <button
                onClick={() => setActiveTab('crm')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'crm'
                    ? 'bg-[#EFECE6] text-[#E03E2D] shadow-2xs'
                    : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A]'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Sales CRM ({leads.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('config')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'config'
                    ? 'bg-[#EFECE6] text-[#E03E2D] shadow-2xs'
                    : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A]'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Assumptions Config</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#1A1A1A]/40 hover:text-[#1A1A1A] bg-white hover:bg-[#EFECE6] border border-[#1A1A1A]/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* TAB 1: SALES CRM LEADS */}
          {activeTab === 'crm' && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Score Filter */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-[#1A1A1A]/60 uppercase font-mono flex items-center gap-1">
                    <Filter className="w-3.5 h-3.5" />
                    Filter Score:
                  </span>
                  <div className="flex bg-white p-1 rounded-lg text-xs font-bold font-mono border border-[#1A1A1A]/10 shadow-2xs">
                    {(['ALL', 'HOT', 'WARM', 'NURTURE'] as Array<'ALL' | LeadScore>).map((score) => (
                      <button
                        key={score}
                        onClick={() => setScoreFilter(score)}
                        className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                          scoreFilter === score
                            ? score === 'HOT'
                              ? 'bg-[#E03E2D] text-white'
                              : score === 'WARM'
                              ? 'bg-[#C27803] text-white'
                              : score === 'NURTURE'
                              ? 'bg-[#1E7B58] text-white'
                              : 'bg-[#EFECE6] text-[#1A1A1A] shadow-2xs'
                            : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A]'
                        }`}
                      >
                        {score}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleExportCsv}
                  className="flex items-center gap-2 px-3.5 py-2 bg-[#141413] hover:bg-[#2A2A28] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer self-start sm:self-auto font-mono"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export to CSV</span>
                </button>
              </div>

              {/* Leads Table */}
              <div className="border border-[#1A1A1A]/10 rounded-2xl overflow-x-auto shadow-2xs bg-white">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#EFECE6] text-[#1A1A1A]/70 uppercase font-bold font-mono text-[10px] border-b border-[#1A1A1A]/10">
                    <tr>
                      <th className="p-3.5">Score</th>
                      <th className="p-3.5">Lead / Contact</th>
                      <th className="p-3.5">Province</th>
                      <th className="p-3.5">Property / Bill</th>
                      <th className="p-3.5">Est. Solar</th>
                      <th className="p-3.5">Savings / Payback</th>
                      <th className="p-3.5">Recommended Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1A1A1A]/5 font-medium">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-[#F7F5F2] transition-colors">
                        <td className="p-3.5">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase ${
                              lead.leadScore === 'HOT'
                                ? 'bg-[#EFECE6] text-[#E03E2D] border border-[#E03E2D]/30'
                                : lead.leadScore === 'WARM'
                                ? 'bg-[#EFECE6] text-[#C27803] border border-[#C27803]/30'
                                : 'bg-[#EFECE6] text-[#1E7B58] border border-[#1E7B58]/30'
                            }`}
                          >
                            {lead.leadScore === 'HOT' && <Flame className="w-3 h-3 text-[#E03E2D]" />}
                            {lead.leadScore}
                          </span>
                        </td>

                        <td className="p-3.5">
                          <div className="font-bold text-[#1A1A1A] font-serif-editorial text-sm">{lead.name}</div>
                          <div className="text-[#1A1A1A]/60 font-mono flex items-center gap-1 mt-0.5">
                            <Phone className="w-3 h-3 text-[#E03E2D]" />
                            <span>{lead.phone}</span>
                            <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 bg-[#EFECE6] rounded text-[#1A1A1A]/70">
                              {lead.preferredChannel}
                            </span>
                          </div>
                        </td>

                        <td className="p-3.5 text-[#1A1A1A]/80">{lead.province}</td>

                        <td className="p-3.5">
                          <div className="capitalize text-[#1A1A1A] font-semibold">
                            {lead.propertyType}
                          </div>
                          <div className="font-mono text-[#1A1A1A]/60">
                            ${lead.monthlyBillUSD.toLocaleString()}/mo
                          </div>
                        </td>

                        <td className="p-3.5">
                          <div className="font-bold font-mono text-[#1A1A1A]">
                            {lead.estimatedKWp} kWp
                          </div>
                          <div className="text-[10px] text-[#1A1A1A]/50 capitalize font-mono">
                            {lead.batteryPreference.replace('_', ' ')}
                          </div>
                        </td>

                        <td className="p-3.5">
                          <div className="font-mono font-bold text-[#1E7B58]">
                            +${lead.estimatedMonthlySavingsUSD.toLocaleString()}/mo
                          </div>
                          <div className="text-[10px] text-[#1A1A1A]/50 font-mono">
                            ~{lead.estimatedPaybackYears} yr payback
                          </div>
                        </td>

                        <td className="p-3.5 text-[11px] text-[#1A1A1A]/70 max-w-xs">
                          {lead.leadScore === 'HOT' ? (
                            <span className="text-[#E03E2D] font-semibold">
                              🚀 Priority: Call within 15 mins for site survey.
                            </span>
                          ) : lead.leadScore === 'WARM' ? (
                            <span className="text-[#C27803] font-semibold">
                              📄 Send digital proposal on Telegram within 2 hrs.
                            </span>
                          ) : (
                            <span className="text-[#1E7B58]">
                              📘 Send energy guide & add to weekly nurture sequence.
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: CONFIGURABLE ASSUMPTIONS */}
          {activeTab === 'config' && (
            <div className="space-y-6 max-w-3xl">
              <div className="p-4 bg-white rounded-2xl border border-[#1A1A1A]/10 text-xs text-[#1A1A1A]/80 shadow-2xs">
                ⚙️ <strong>Administrator Engineering Layer:</strong> Modify the underlying solar radiation yield, EDC tariff baseline, and installation CAPEX costs without altering frontend code.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Sunshine Hours per Day */}
                <div className="bg-white p-4 rounded-xl border border-[#1A1A1A]/10 space-y-1.5 shadow-2xs">
                  <label className="block text-[10px] font-bold text-[#1A1A1A]/70 uppercase font-mono">
                    Sunshine Hours / Day (h/ngày)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={localConfig.sunshineHoursPerDay ?? 4.5}
                    onChange={(e) => {
                      const hours = Number(e.target.value);
                      setLocalConfig({
                        ...localConfig,
                        sunshineHoursPerDay: hours,
                        specificYieldKWhPerKWp: Math.round(hours * 365 * 10) / 10
                      });
                    }}
                    className="w-full bg-[#F7F5F2] p-2.5 rounded-lg border border-[#1A1A1A]/15 text-sm font-mono font-bold text-[#1A1A1A] focus:border-[#E03E2D] focus:outline-none"
                  />
                  <span className="text-[10px] text-[#1A1A1A]/50">
                    Cambodia standard: 4.5 hours/day (yields {Math.round((localConfig.sunshineHoursPerDay ?? 4.5) * 365 * 10) / 10} kWh/kWp/yr)
                  </span>
                </div>

                {/* Specific Yield */}
                <div className="bg-white p-4 rounded-xl border border-[#1A1A1A]/10 space-y-1.5 shadow-2xs">
                  <label className="block text-[10px] font-bold text-[#1A1A1A]/70 uppercase font-mono">
                    Solar Specific Yield (kWh/kWp/year)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={localConfig.specificYieldKWhPerKWp}
                    onChange={(e) => {
                      const yieldVal = Number(e.target.value);
                      setLocalConfig({
                        ...localConfig,
                        specificYieldKWhPerKWp: yieldVal,
                        sunshineHoursPerDay: Math.round((yieldVal / 365) * 10) / 10
                      });
                    }}
                    className="w-full bg-[#F7F5F2] p-2.5 rounded-lg border border-[#1A1A1A]/15 text-sm font-mono font-bold text-[#1A1A1A] focus:border-[#E03E2D] focus:outline-none"
                  />
                  <span className="text-[10px] text-[#1A1A1A]/50">
                    Calculated: {localConfig.sunshineHoursPerDay ?? 4.5}h/day × 365 days = {localConfig.specificYieldKWhPerKWp} kWh/kWp/yr
                  </span>
                </div>

                {/* Tariff USD */}
                <div className="bg-white p-4 rounded-xl border border-[#1A1A1A]/10 space-y-1.5 shadow-2xs">
                  <label className="block text-[10px] font-bold text-[#1A1A1A]/70 uppercase font-mono">
                    Average EDC Tariff ($/kWh)
                  </label>
                  <input
                    type="number"
                    step="0.005"
                    value={localConfig.tariffUSD}
                    onChange={(e) =>
                      setLocalConfig({ ...localConfig, tariffUSD: Number(e.target.value) })
                    }
                    className="w-full bg-[#F7F5F2] p-2.5 rounded-lg border border-[#1A1A1A]/15 text-sm font-mono font-bold text-[#1A1A1A] focus:border-[#E03E2D] focus:outline-none"
                  />
                  <span className="text-[10px] text-[#1A1A1A]/50">
                    Standard EDC commercial rate: ~$0.165 to $0.185 / kWh
                  </span>
                </div>

                {/* Capex per kWp */}
                <div className="bg-white p-4 rounded-xl border border-[#1A1A1A]/10 space-y-1.5 shadow-2xs">
                  <label className="block text-[10px] font-bold text-[#1A1A1A]/70 uppercase font-mono">
                    Turnkey Solar CAPEX ($/kWp)
                  </label>
                  <input
                    type="number"
                    value={localConfig.capexPerKWpUSD}
                    onChange={(e) =>
                      setLocalConfig({ ...localConfig, capexPerKWpUSD: Number(e.target.value) })
                    }
                    className="w-full bg-[#F7F5F2] p-2.5 rounded-lg border border-[#1A1A1A]/15 text-sm font-mono font-bold text-[#1A1A1A] focus:border-[#E03E2D] focus:outline-none"
                  />
                  <span className="text-[10px] text-[#1A1A1A]/50">
                    Includes Tier-1 620W TopCon panels, inverter, racking, mounting & sync
                  </span>
                </div>

                {/* Battery Capex */}
                <div className="bg-white p-4 rounded-xl border border-[#1A1A1A]/10 space-y-1.5 shadow-2xs">
                  <label className="block text-[10px] font-bold text-[#1A1A1A]/70 uppercase font-mono">
                    LiFePO4 Battery CAPEX ($/kWh)
                  </label>
                  <input
                    type="number"
                    value={localConfig.batteryCapexPerKWhUSD}
                    onChange={(e) =>
                      setLocalConfig({ ...localConfig, batteryCapexPerKWhUSD: Number(e.target.value) })
                    }
                    className="w-full bg-[#F7F5F2] p-2.5 rounded-lg border border-[#1A1A1A]/15 text-sm font-mono font-bold text-[#1A1A1A] focus:border-[#E03E2D] focus:outline-none"
                  />
                  <span className="text-[10px] text-[#1A1A1A]/50">
                    Grade-A Lithium Iron Phosphate with integrated BMS
                  </span>
                </div>

                {/* Exchange Rate */}
                <div className="bg-white p-4 rounded-xl border border-[#1A1A1A]/10 space-y-1.5 shadow-2xs">
                  <label className="block text-[10px] font-bold text-[#1A1A1A]/70 uppercase font-mono">
                    KHR Exchange Rate (៛ / USD)
                  </label>
                  <input
                    type="number"
                    value={localConfig.khrExchangeRate}
                    onChange={(e) =>
                      setLocalConfig({ ...localConfig, khrExchangeRate: Number(e.target.value) })
                    }
                    className="w-full bg-[#F7F5F2] p-2.5 rounded-lg border border-[#1A1A1A]/15 text-sm font-mono font-bold text-[#1A1A1A] focus:border-[#E03E2D] focus:outline-none"
                  />
                  <span className="text-[10px] text-[#1A1A1A]/50">
                    Default 4,100 Riel per 1 USD
                  </span>
                </div>

                {/* Panel Wattage */}
                <div className="bg-white p-4 rounded-xl border border-[#1A1A1A]/10 space-y-1.5 shadow-2xs">
                  <label className="block text-[10px] font-bold text-[#1A1A1A]/70 uppercase font-mono">
                    Standard Panel Wattage (W)
                  </label>
                  <input
                    type="number"
                    value={localConfig.panelWattage}
                    onChange={(e) =>
                      setLocalConfig({ ...localConfig, panelWattage: Number(e.target.value) })
                    }
                    className="w-full bg-[#F7F5F2] p-2.5 rounded-lg border border-[#1A1A1A]/15 text-sm font-mono font-bold text-[#1A1A1A] focus:border-[#E03E2D] focus:outline-none"
                  />
                  <span className="text-[10px] text-[#1A1A1A]/50">
                    Default: 620W N-type high efficiency modules
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-[#1A1A1A]/10">
                <button
                  onClick={handleResetConfig}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#1A1A1A]/70 bg-white hover:bg-[#EFECE6] border border-[#1A1A1A]/10 rounded-xl transition-colors cursor-pointer font-mono"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset to Metfone Defaults</span>
                </button>

                <div className="flex items-center gap-3">
                  {savedSuccess && (
                    <span className="text-xs font-bold text-[#1E7B58] flex items-center gap-1 animate-in fade-in font-mono">
                      <CheckCircle2 className="w-4 h-4" />
                      Assumptions Updated Live!
                    </span>
                  )}
                  <button
                    onClick={handleSaveConfig}
                    className="px-6 py-2.5 bg-[#E03E2D] hover:bg-[#C92F20] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    Save & Apply Config
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
