import React from 'react';
import { PharmacyTab } from '../../types';
import { 
  Workflow, 
  Boxes, 
  AlertTriangle, 
  Sliders, 
  Receipt, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  Radio
} from 'lucide-react';

interface PharmacySidebarProps {
  activeTab: PharmacyTab;
  onTabChange: (tab: PharmacyTab) => void;
  onOpenInspector: () => void;
}

export const PharmacySidebar: React.FC<PharmacySidebarProps> = ({
  activeTab,
  onTabChange,
  onOpenInspector
}) => {
  return (
    <aside className="w-64 bg-[#eff4ff] border-r border-[#dce9ff] flex flex-col justify-between shrink-0 select-none">
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Pharmacy Station Header */}
        <div className="h-14 px-4 flex items-center gap-3 bg-white/70 border-b border-[#dce9ff]">
          <div className="w-8 h-8 rounded-lg bg-[#0f2c42] flex items-center justify-center text-[#cde5ff] font-display font-bold text-xs">
            CP
          </div>
          <div className="flex flex-col min-w-0 flex-1 leading-none">
            <span className="font-title font-bold text-xs text-[#001729] truncate">CarePoint Express</span>
            <span className="font-mono text-[10px] text-[#006a61] mt-0.5">NABP #49210 • STATION-04</span>
          </div>
        </div>

        {/* Live Network Sync Badge */}
        <div className="p-3">
          <div className="flex items-center justify-between p-2 bg-white rounded-xl border border-[#dce9ff] shadow-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#006a61] animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#001729]">Network Active</span>
            </div>
            <span className="font-mono text-[10px] text-[#006a61] font-semibold">SYNC OK</span>
          </div>
        </div>

        {/* Navigation Sections */}
        <nav className="px-2 pb-4 space-y-4 text-xs font-medium">
          {/* Section 1: Fulfillment */}
          <div className="space-y-1">
            <span className="px-3 text-[10px] uppercase font-bold tracking-wider text-[#73777d] block">
              Fulfillment &amp; Orders
            </span>

            <button
              onClick={() => onTabChange('pipeline')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all ${
                activeTab === 'pipeline'
                  ? 'bg-[#0f2c42] text-white font-bold shadow-xs'
                  : 'text-[#43474d] hover:bg-[#dce9ff] hover:text-[#001729]'
              }`}
            >
              <div className="flex items-center gap-2">
                <Workflow className="w-4 h-4 text-[#86f2e4]" />
                <span>Fulfillment Pipeline</span>
              </div>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-full bg-[#86f2e4] text-[#006f66] font-bold">
                5
              </span>
            </button>
          </div>

          {/* Section 2: Inventory & Catalog */}
          <div className="space-y-1">
            <span className="px-3 text-[10px] uppercase font-bold tracking-wider text-[#73777d] block">
              Inventory &amp; Pricing
            </span>

            <button
              onClick={() => onTabChange('catalog')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all ${
                activeTab === 'catalog'
                  ? 'bg-[#0f2c42] text-white font-bold shadow-xs'
                  : 'text-[#43474d] hover:bg-[#dce9ff] hover:text-[#001729]'
              }`}
            >
              <div className="flex items-center gap-2">
                <Boxes className="w-4 h-4 text-[#86f2e4]" />
                <span>Catalog &amp; Pricing</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#001729] text-white font-semibold uppercase">
                Active
              </span>
            </button>

            <button
              onClick={() => onTabChange('stock-alerts')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all ${
                activeTab === 'stock-alerts'
                  ? 'bg-[#0f2c42] text-white font-bold shadow-xs'
                  : 'text-[#43474d] hover:bg-[#dce9ff] hover:text-[#001729]'
              }`}
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Stock Alerts &amp; EDI POs</span>
              </div>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#ffdad6] text-[#ba1a1a] font-bold">
                7
              </span>
            </button>

            <button
              onClick={() => onTabChange('par-rules')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all ${
                activeTab === 'par-rules'
                  ? 'bg-[#0f2c42] text-white font-bold shadow-xs'
                  : 'text-[#43474d] hover:bg-[#dce9ff] hover:text-[#001729]'
              }`}
            >
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#86f2e4]" />
                <span>Par &amp; Reorder Engine</span>
              </div>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#e5eeff] text-[#001729]">
                19
              </span>
            </button>
          </div>

          {/* Section 3: Settlements & Rebates */}
          <div className="space-y-1">
            <span className="px-3 text-[10px] uppercase font-bold tracking-wider text-[#73777d] block">
              Settlements &amp; SLA
            </span>

            <button
              onClick={() => onTabChange('reconciliation')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all ${
                activeTab === 'reconciliation'
                  ? 'bg-[#0f2c42] text-white font-bold shadow-xs'
                  : 'text-[#43474d] hover:bg-[#dce9ff] hover:text-[#001729]'
              }`}
            >
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4 text-[#86f2e4]" />
                <span>Invoice &amp; Rebates</span>
              </div>
              <span className="font-mono text-[10px] text-[#006a61] font-semibold">98.1%</span>
            </button>
          </div>

          {/* Section 4: Compliance & Audits */}
          <div className="space-y-1">
            <span className="px-3 text-[10px] uppercase font-bold tracking-wider text-[#73777d] block">
              Compliance &amp; DEA
            </span>

            <button
              onClick={() => onTabChange('dea-audit')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all ${
                activeTab === 'dea-audit'
                  ? 'bg-[#0f2c42] text-white font-bold shadow-xs'
                  : 'text-[#43474d] hover:bg-[#dce9ff] hover:text-[#001729]'
              }`}
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#86f2e4]" />
                <span>DEA 21 CFR § 1311 Log</span>
              </div>
              <span className="font-mono text-[10px] text-[#006a61] font-bold">SHA-256</span>
            </button>

            <button
              onClick={onOpenInspector}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[#ba1a1a] hover:bg-[#ffdad6]/40 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span className="font-bold">Inspector Redacted View</span>
              </div>
              <span className="text-[9px] bg-[#ba1a1a] text-white font-mono px-1 rounded">CA-INV</span>
            </button>
          </div>
        </nav>
      </div>

      {/* DEA Vault Locked Footer Strip */}
      <div className="p-3 bg-white/80 border-t border-[#dce9ff] flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-xs font-semibold text-[#43474d] px-1">
          <span className="flex items-center gap-1">
            <Lock className="w-3.5 h-3.5 text-[#006a61]" />
            DEA 222 Vault
          </span>
          <span className="font-mono text-[10px] text-[#006a61]">LOCKED &amp; ARMED</span>
        </div>
        <div className="w-full bg-[#dce9ff] h-1.5 rounded-full overflow-hidden">
          <div className="bg-[#006a61] h-full w-full"></div>
        </div>
        <span className="text-[9px] font-mono text-[#73777d] px-1">Biometric Dual-Key Required</span>
      </div>
    </aside>
  );
};
