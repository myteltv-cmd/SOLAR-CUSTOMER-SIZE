import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import {
  Sun,
  Moon,
  Zap,
  BatteryCharging,
  Home,
  Layers,
  ArrowRight,
  ArrowDown,
  Sparkles
} from 'lucide-react';

interface EnergyFlowDiagramProps {
  currentLang: Language;
}

export const EnergyFlowDiagram: React.FC<EnergyFlowDiagramProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [mode, setMode] = useState<'day' | 'night'>('day');

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-white border-t border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{t.energyFlow.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            {t.energyFlow.title}
          </h2>
          <p className="mt-3 text-base text-gray-600">
            {t.energyFlow.subtitle}
          </p>

          {/* Day / Night Mode Switcher */}
          <div className="mt-6 inline-flex bg-gray-100 p-1 rounded-xl border border-gray-200">
            <button
              id="energy-flow-day-btn"
              onClick={() => setMode('day')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                mode === 'day'
                  ? 'bg-white text-amber-600 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Sun className="w-4 h-4 text-amber-500" />
              <span>{t.energyFlow.modeDay}</span>
            </button>
            <button
              id="energy-flow-night-btn"
              onClick={() => setMode('night')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                mode === 'night'
                  ? 'bg-gray-900 text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Moon className="w-4 h-4 text-blue-400" />
              <span>{t.energyFlow.modeNight}</span>
            </button>
          </div>
        </div>

        {/* Visual Energy Flow Diagram Container */}
        <div
          className={`rounded-3xl p-6 sm:p-10 border transition-all duration-300 ${
            mode === 'day'
              ? 'bg-gradient-to-br from-amber-50/40 via-white to-gray-50 border-amber-200/70 shadow-lg'
              : 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950 text-white border-gray-800 shadow-2xl'
          }`}
        >
          {/* Desktop Horizontal / Mobile Vertical Step Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-3 items-center">
            {/* Step 1: Sun / Sky */}
            <div
              className={`p-5 rounded-2xl border text-center transition-all ${
                mode === 'day'
                  ? 'bg-white border-amber-200 shadow-xs'
                  : 'bg-gray-800/80 border-gray-700 opacity-40'
              }`}
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-2">
                <Sun className={`w-6 h-6 ${mode === 'day' ? 'animate-spin-slow' : ''}`} />
              </div>
              <div className="text-xs uppercase font-bold text-gray-500">Source</div>
              <div className={`text-base font-extrabold ${mode === 'day' ? 'text-gray-900' : 'text-gray-300'}`}>
                {t.energyFlow.sun}
              </div>
              <div className="text-[11px] text-gray-500 mt-1">
                {mode === 'day' ? '1,642.5 kWh/kWp/yr (4.5h/day)' : 'Idle at night'}
              </div>
            </div>

            {/* Step 2: Solar Panels */}
            <div
              className={`p-5 rounded-2xl border text-center transition-all ${
                mode === 'day'
                  ? 'bg-white border-blue-200 shadow-xs ring-2 ring-blue-100'
                  : 'bg-gray-800/80 border-gray-700 opacity-40'
              }`}
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                <Layers className="w-6 h-6" />
              </div>
              <div className="text-xs uppercase font-bold text-gray-500">Generation</div>
              <div className={`text-base font-extrabold ${mode === 'day' ? 'text-gray-900' : 'text-gray-300'}`}>
                {t.energyFlow.solarPanels}
              </div>
              <div className="text-[11px] text-blue-600 font-semibold mt-1">
                {mode === 'day' ? 'Generates DC Power' : 'Zero output'}
              </div>
            </div>

            {/* Step 3: Smart Inverter */}
            <div
              className={`p-5 rounded-2xl border text-center transition-all ${
                mode === 'day'
                  ? 'bg-white border-red-200 shadow-xs'
                  : 'bg-gray-800/90 border-gray-700'
              }`}
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-red-50 text-[#ED1C24] flex items-center justify-center mb-2">
                <Zap className="w-6 h-6 animate-pulse" />
              </div>
              <div className="text-xs uppercase font-bold text-gray-500">Smart Control</div>
              <div className={`text-base font-extrabold ${mode === 'day' ? 'text-gray-900' : 'text-white'}`}>
                {t.energyFlow.inverter}
              </div>
              <div className="text-[11px] text-gray-500 mt-1">
                DC ➔ AC 230V/400V
              </div>
            </div>

            {/* Step 4: Building Consumption */}
            <div
              className={`p-5 rounded-2xl border text-center transition-all ${
                mode === 'day'
                  ? 'bg-emerald-50/80 border-emerald-300 shadow-sm'
                  : 'bg-emerald-950/40 border-emerald-700 text-white'
              }`}
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
                <Home className="w-6 h-6" />
              </div>
              <div className="text-xs uppercase font-bold text-emerald-700">Consumption</div>
              <div className={`text-base font-extrabold ${mode === 'day' ? 'text-gray-900' : 'text-white'}`}>
                {t.energyFlow.building}
              </div>
              <div className="text-[11px] text-emerald-600 font-semibold mt-1">
                {mode === 'day' ? 'Direct Solar Offset' : 'Powered by Battery / Grid'}
              </div>
            </div>

            {/* Step 5: Battery / EDC Grid Backup */}
            <div
              className={`p-5 rounded-2xl border text-center transition-all ${
                mode === 'day'
                  ? 'bg-white border-gray-200'
                  : 'bg-blue-950/60 border-blue-600 ring-2 ring-blue-500/30'
              }`}
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-2">
                <BatteryCharging className="w-6 h-6" />
              </div>
              <div className="text-xs uppercase font-bold text-gray-500">Storage & Grid</div>
              <div className={`text-base font-extrabold ${mode === 'day' ? 'text-gray-900' : 'text-white'}`}>
                {t.energyFlow.battery} & {t.energyFlow.grid}
              </div>
              <div className="text-[11px] text-gray-500 mt-1">
                {mode === 'day' ? 'Charging surplus power' : 'Discharging clean energy'}
              </div>
            </div>
          </div>

          {/* Explanation Text */}
          <div className="mt-8 pt-6 border-t border-gray-200/50 text-center max-w-2xl mx-auto">
            <p className={`text-xs sm:text-sm leading-relaxed ${mode === 'day' ? 'text-gray-600' : 'text-gray-400'}`}>
              {t.energyFlow.flowExplain}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
