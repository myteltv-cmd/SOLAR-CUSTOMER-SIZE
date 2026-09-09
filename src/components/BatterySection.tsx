import React from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { BatteryCharging, Sun, Moon, Zap, ShieldCheck } from 'lucide-react';

interface BatterySectionProps {
  currentLang: Language;
  onExploreBattery: () => void;
}

export const BatterySection: React.FC<BatterySectionProps> = ({
  currentLang,
  onExploreBattery
}) => {
  const t = translations[currentLang];

  const modeIcons = [
    <Sun key="1" className="w-5 h-5 text-amber-500" />,
    <Moon key="2" className="w-5 h-5 text-blue-500" />,
    <Zap key="3" className="w-5 h-5 text-[#ED1C24]" />
  ];

  return (
    <section id="battery-storage" className="py-16 sm:py-24 bg-white border-t border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Technology Deep Dive */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-blue-100">
              <BatteryCharging className="w-3.5 h-3.5" />
              <span>{t.batteryDeep.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
              {t.batteryDeep.title}
            </h2>

            <p className="text-base text-gray-600 leading-relaxed">
              {t.batteryDeep.subtitle}
            </p>

            {/* 3 Operational Modes */}
            <div className="space-y-3 pt-2">
              {t.batteryDeep.modes.map((m: any, idx: number) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-gray-50 border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      {modeIcons[idx]}
                      <span className="text-xs font-extrabold uppercase tracking-wider text-gray-900">
                        {m.title}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-gray-700 border border-gray-200">
                      {m.tag}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={onExploreBattery}
                className="px-6 py-3 rounded-xl bg-gray-900 hover:bg-[#ED1C24] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer"
              >
                Estimate Hybrid + Battery Setup
              </button>
            </div>
          </div>

          {/* Right Column: Battery Hardware Visual */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-200 bg-gray-900">
              <img
                src="https://images.unsplash.com/photo-1548611716-ad382f2405ee?auto=format&fit=crop&w=1000&q=80"
                alt="Modern Grade-A LiFePO4 Energy Storage"
                className="w-full h-[400px] object-cover opacity-85"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Inset Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-white/60">
                <div className="flex items-center justify-between text-xs font-bold text-gray-900 mb-2">
                  <span>LiFePO4 Lithium Iron Phosphate</span>
                  <span className="text-emerald-600 font-mono">6,000+ Cycles</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2 border-t border-gray-100">
                  <div>
                    <div className="text-[10px] text-gray-500">Switchover</div>
                    <div className="font-extrabold text-gray-900">&lt; 10ms</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500">Safety</div>
                    <div className="font-extrabold text-emerald-700">Thermal Stable</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500">Telemetry</div>
                    <div className="font-extrabold text-blue-600">Smart App</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
