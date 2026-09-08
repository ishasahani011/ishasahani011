import React, { useState } from 'react';
import { 
  Sliders, 
  Play, 
  CheckCircle2, 
  ShieldCheck, 
  Lock, 
  Thermometer, 
  TrendingUp, 
  AlertTriangle, 
  DollarSign, 
  Zap, 
  Calendar, 
  Check, 
  Sparkles,
  Award
} from 'lucide-react';

export const ParReorderEngine: React.FC = () => {
  const [isDryRun, setIsDryRun] = useState(false);
  const [minAmbientDays, setMinAmbientDays] = useState(3.0);
  const [maxCeilingDays, setMaxCeilingDays] = useState(14.0);
  const [urgentHours, setUrgentHours] = useState(36);
  const [selectedRule, setSelectedRule] = useState<'oncology' | 'statin' | 'insulin' | 'csos'>('oncology');
  const [feedback, setFeedback] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="flex flex-col w-full space-y-5 text-[#0b1c30]">
      {/* Top Global Context & Policy Header */}
      <div className="bg-white rounded-2xl p-5 border border-[#e5eeff] shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 font-mono text-xs uppercase text-[#73777d]">
            <span>Inventory &amp; Replenishment</span>
            <span>/</span>
            <span className="text-[#006a61] font-bold">Par &amp; Auto-Reorder Engine</span>
          </div>

          <div className="flex items-center gap-3 mt-1">
            <h1 className="font-display font-bold text-2xl text-[#001729] tracking-tight">
              Automated Par Level &amp; Reorder Policy Engine
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#86f2e4] text-[#006f66] text-xs font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006a61] animate-ping"></span>
              Autonomous Trigger: Live
            </span>
          </div>

          <p className="text-xs text-[#43474d] max-w-3xl mt-1 leading-relaxed">
            Algorithmic replenishment rules orchestrating EDI 850 wholesale PO generation, dynamic seasonal safety stock buffers, cold-chain temperature thresholds, and FDA Orange Book AB-rated fallback substitutions for CarePoint Express (NABP #49210).
          </p>
        </div>

        {/* Master Simulation Switches & Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2.5 bg-[#eff4ff] p-2 rounded-xl border border-[#dce9ff]">
            <div className="flex flex-col text-xs leading-none">
              <span className="text-[10px] text-[#73777d] uppercase font-bold">Simulation Mode</span>
              <span className="font-semibold text-[#001729]">{isDryRun ? 'Dry-Run (Zero PO)' : 'Live Production'}</span>
            </div>
            <button
              onClick={() => {
                setIsDryRun(!isDryRun);
                showToast(isDryRun ? "Switched to Live Production Dispatch mode." : "Simulation Mode active: Zero PO generation in sandbox.");
              }}
              className={`w-11 h-6 rounded-full relative p-0.5 transition-colors ${
                isDryRun ? 'bg-[#006a61]' : 'bg-[#c3c7cd]'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${isDryRun ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>

          <button 
            onClick={() => showToast("Simulating 30-day burn: 1,482 NDCs projected. Zero stockout bottlenecks detected.")}
            className="px-3.5 py-2 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] text-[#001729] text-xs font-bold flex items-center gap-1.5 border border-[#dce9ff]"
          >
            <Play className="w-3.5 h-3.5 text-[#006a61]" />
            <span>Simulate 30d Burn</span>
          </button>

          <button 
            onClick={() => showToast("Policies successfully synced across CarePoint Express EDI 850 nodes.")}
            className="px-3.5 py-2 rounded-xl bg-[#001729] hover:bg-[#0f2c42] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#86f2e4]" />
            <span>Deploy Policy Updates</span>
          </button>
        </div>
      </div>

      {feedback && (
        <div className="p-3 bg-[#86f2e4] text-[#006f66] rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Global Dynamic Engine Tuning Sliders */}
      <div className="bg-white rounded-2xl p-5 border border-[#e5eeff] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#f0f4ff] gap-2">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#006a61]" />
            <h2 className="font-display font-bold text-sm text-[#001729]">
              Global Replenishment Algorithmic Parameters
            </h2>
          </div>
          <span className="text-[11px] font-mono text-[#006a61] bg-[#eff4ff] px-2.5 py-1 rounded-lg border border-[#dce9ff]">
            Active Mode: AI Predictive Demand + Wholesaler SLA Drift
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Slider 1: Min Ambient Days */}
          <div className="p-3.5 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex flex-col gap-2">
            <div className="flex justify-between items-center font-bold">
              <span className="text-[#001729]">Min Stock Par (Ambient)</span>
              <span className="font-mono text-sm text-[#006a61]">{minAmbientDays.toFixed(1)} days</span>
            </div>
            <p className="text-[11px] text-[#43474d]">
              Safety buffer before triggering priority EDI 850 replenishment dispatch.
            </p>
            <input 
              type="range"
              min="1"
              max="10"
              step="0.5"
              value={minAmbientDays}
              onChange={(e) => setMinAmbientDays(parseFloat(e.target.value))}
              className="w-full accent-[#006a61] cursor-pointer"
            />
          </div>

          {/* Slider 2: Max Par Ceiling */}
          <div className="p-3.5 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex flex-col gap-2">
            <div className="flex justify-between items-center font-bold">
              <span className="text-[#001729]">Max Par Ceiling</span>
              <span className="font-mono text-sm text-[#001729]">{maxCeilingDays.toFixed(1)} days</span>
            </div>
            <p className="text-[11px] text-[#43474d]">
              Restricts working capital entrapment and protects against expiration on high-cost formulations.
            </p>
            <input 
              type="range"
              min="7"
              max="30"
              step="1"
              value={maxCeilingDays}
              onChange={(e) => setMaxCeilingDays(parseFloat(e.target.value))}
              className="w-full accent-[#006a61] cursor-pointer"
            />
          </div>

          {/* Slider 3: Urgent Threshold */}
          <div className="p-3.5 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex flex-col gap-2">
            <div className="flex justify-between items-center font-bold">
              <span className="text-[#ba1a1a]">Urgent Restock Threshold</span>
              <span className="font-mono text-sm text-[#ba1a1a]">{urgentHours} hours</span>
            </div>
            <p className="text-[11px] text-[#43474d]">
              Forces immediate multi-wholesaler failover broadcast &amp; alerts Lead Pharmacist on mobile.
            </p>
            <input 
              type="range"
              min="12"
              max="72"
              step="6"
              value={urgentHours}
              onChange={(e) => setUrgentHours(parseInt(e.target.value))}
              className="w-full accent-[#ba1a1a] cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Main Split: Rulebook Table (Left 7) + Specialty Sidecar (Right 5) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* Rulebook Table */}
        <div className="xl:col-span-8 bg-white rounded-2xl p-4 border border-[#e5eeff] shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#f0f4ff] text-xs font-semibold">
            <span className="font-title font-bold text-sm text-[#001729]">Replenishment Rulebook (19 NDCs Mapped)</span>
            <span className="text-[10px] font-mono text-[#006a61]">Next Computation: 14m 20s</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#eff4ff] text-[#73777d] font-mono text-[10px] uppercase tracking-wider border-b border-[#e5eeff]">
                  <th className="py-2.5 px-3 font-bold">Formulation Scope</th>
                  <th className="py-2.5 px-3 font-bold">Velocity</th>
                  <th className="py-2.5 px-3 font-bold text-right">Min / Reorder / Max</th>
                  <th className="py-2.5 px-3 font-bold">Primary Wholesaler</th>
                  <th className="py-2.5 px-3 font-bold text-center">AB Swap</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f4ff]">
                <tr 
                  onClick={() => setSelectedRule('oncology')}
                  className={`hover:bg-[#eff4ff] cursor-pointer transition-colors ${
                    selectedRule === 'oncology' ? 'bg-[#eff4ff]' : ''
                  }`}
                >
                  <td className="py-3 px-3">
                    <span className="font-title font-bold text-[#001729] block">Pembrolizumab &amp; Specialty Oncology</span>
                    <span className="text-[10px] text-[#006a61] font-mono">NDC 0006-3026-* • Cold-Chain (2°C - 8°C)</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-[#001729] text-white font-mono text-[10px] font-bold">
                      Tier S (Specialty)
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono">
                    <span className="text-[#ba1a1a] font-bold">6</span> / <span className="font-bold text-[#001729]">12</span> / <span className="text-[#73777d]">24</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-medium text-[#001729]">Amerisource Specialty (ColdVault)</span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="text-[#006a61] font-bold">Purple Book</span>
                  </td>
                </tr>

                <tr 
                  onClick={() => setSelectedRule('statin')}
                  className={`hover:bg-[#eff4ff] cursor-pointer transition-colors ${
                    selectedRule === 'statin' ? 'bg-[#eff4ff]' : ''
                  }`}
                >
                  <td className="py-3 px-3">
                    <span className="font-title font-bold text-[#001729] block">Atorvastatin &amp; HMG-CoA Statins</span>
                    <span className="text-[10px] text-[#73777d] font-mono">NDC 0093-* • Oral Solid Tablets</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-[#86f2e4] text-[#006f66] font-mono text-[10px] font-bold">
                      Tier A (Fast)
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono">
                    <span className="text-[#ba1a1a] font-bold">350</span> / <span className="font-bold text-[#001729]">750</span> / <span className="text-[#73777d]">2,400</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-medium text-[#001729]">McKesson Connect (#1)</span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <CheckCircle2 className="w-4 h-4 text-[#006a61] inline" />
                  </td>
                </tr>

                <tr 
                  onClick={() => setSelectedRule('insulin')}
                  className={`hover:bg-[#eff4ff] cursor-pointer transition-colors ${
                    selectedRule === 'insulin' ? 'bg-[#eff4ff]' : ''
                  }`}
                >
                  <td className="py-3 px-3">
                    <span className="font-title font-bold text-[#001729] block">Insulin Glargine Biologics</span>
                    <span className="text-[10px] text-[#006a61] font-mono">NDC 0024-* • Cold-Chain (36°F - 46°F)</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-[#86f2e4] text-[#006f66] font-mono text-[10px] font-bold">
                      Tier A (Crit)
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono">
                    <span className="text-[#ba1a1a] font-bold">40</span> / <span className="font-bold text-[#001729]">95</span> / <span className="text-[#73777d]">220</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-medium text-[#001729]">Amerisource ColdVault</span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="text-[#73777d] font-bold text-[10px]">Biosimilar</span>
                  </td>
                </tr>

                <tr 
                  onClick={() => setSelectedRule('csos')}
                  className={`hover:bg-[#eff4ff] cursor-pointer transition-colors ${
                    selectedRule === 'csos' ? 'bg-[#eff4ff]' : ''
                  }`}
                >
                  <td className="py-3 px-3">
                    <span className="font-title font-bold text-[#001729] block">Oxycodone / Methylphenidate CII</span>
                    <span className="text-[10px] text-[#ba1a1a] font-mono">DEA SCH-II Vault Double-Lock</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-[#ffdad6] text-[#ba1a1a] font-mono text-[10px] font-bold">
                      Vault Strict
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono">
                    <span className="text-[#ba1a1a] font-bold">100</span> / <span className="font-bold text-[#001729]">250</span> / <span className="text-[#73777d]">400</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-medium text-[#001729]">Amerisource CSOS EDI 850</span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="text-[#ba1a1a] font-bold">CSOS Only</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidecar: Specialty Oncology & Cold-Chain Deep Dive */}
        <div className="xl:col-span-4 bg-white rounded-2xl p-4 border border-[#e5eeff] shadow-xs space-y-3.5 text-xs">
          <div className="flex justify-between items-center pb-2 border-b border-[#f0f4ff]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006a61] animate-pulse"></span>
              <span className="font-bold text-xs uppercase text-[#001729]">Rule Inspector</span>
            </div>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#001729] text-white font-bold">
              POL-ID #492-ONC-14
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#eff4ff] border border-[#dce9ff] space-y-1">
            <span className="font-title font-bold text-sm text-[#001729] block">High-Cost Specialty Oncology</span>
            <p className="text-[11px] text-[#43474d] leading-relaxed">
              Active profile covers Keytruda (Pembrolizumab), Herceptin (Trastuzumab), and biosimilars (Kanjinti/Ogivri) with JIT patient regimen verification.
            </p>
          </div>

          <div className="space-y-2.5">
            <div className="p-2.5 bg-[#f8f9ff] rounded-xl border border-[#e5eeff]">
              <div className="flex justify-between items-center font-bold">
                <span className="text-[#001729] flex items-center gap-1">
                  <Thermometer className="w-3.5 h-3.5 text-[#006a61]" /> Cold-Chain Integrity
                </span>
                <span className="font-mono text-[#006a61]">36°F - 46°F</span>
              </div>
              <p className="text-[11px] text-[#73777d] mt-1">Sensitech dual-probe IoT sensor. Auto-quarantine if excursion &gt; +0.8°C.</p>
            </div>

            <div className="p-2.5 bg-[#f8f9ff] rounded-xl border border-[#e5eeff]">
              <div className="flex justify-between items-center font-bold">
                <span className="text-[#ba1a1a] flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-[#ba1a1a]" /> Exposure Cap
                </span>
                <span className="font-mono text-[#ba1a1a]">$25,000 Ceiling</span>
              </div>
              <p className="text-[11px] text-[#73777d] mt-1">Dual Pharmacist Sign-Off required (Lead Oncologist Board Certified sign).</p>
            </div>

            <div className="p-2.5 bg-[#f8f9ff] rounded-xl border border-[#e5eeff]">
              <div className="flex justify-between items-center font-bold">
                <span className="text-[#001729] flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#006a61]" /> Just-In-Time (JIT) Match
                </span>
                <span className="font-mono text-[#006a61]">72h Regimen Sync</span>
              </div>
              <p className="text-[11px] text-[#73777d] mt-1">Reorder releases strictly upon scheduled patient infusion chair booking.</p>
            </div>
          </div>

          <button 
            onClick={() => showToast("Oncology Policy POL-ID #492-ONC-14 updated & signed with cryptographic key.")}
            className="w-full py-2.5 bg-[#006a61] hover:bg-[#005049] text-white text-xs font-bold rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Check className="w-4 h-4" />
            <span>Save &amp; Deploy Rule</span>
          </button>
        </div>
      </div>
    </div>
  );
};
