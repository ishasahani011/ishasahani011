import React, { useState } from 'react';
import { ViewMode } from '../../types';
import { BRAND_LOGO_URL } from '../../data/mockData';
import { 
  Smartphone, 
  Building2, 
  ShieldCheck, 
  PlayCircle, 
  FileText, 
  Activity, 
  Bell, 
  Search, 
  CheckCircle2,
  Lock,
  Layers
} from 'lucide-react';

interface TopBarProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  onOpenInspector?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentView,
  onViewChange,
  onOpenInspector
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-40 h-14 bg-[#001729] text-white px-4 lg:px-6 flex items-center justify-between border-b border-[#0f2c42] shadow-sm select-none">
      {/* Brand Logo & Title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <img 
            src={BRAND_LOGO_URL} 
            alt="genericMed" 
            className="h-7 w-auto object-contain brightness-110"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-display font-bold text-[17px] tracking-tight text-white">generic<span className="text-[#86f2e4]">Med</span></span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#0f2c42] text-[#86f2e4] border border-[#006f66]/40">
                Multi-Tenant
              </span>
            </div>
            <span className="text-[10px] text-[#7994ae] tracking-wider uppercase font-mono">Ops &amp; Marketplace Engine</span>
          </div>
        </div>

        <div className="hidden md:block h-5 w-px bg-[#0f2c42] mx-1"></div>

        {/* View Mode Switcher Pills */}
        <nav className="hidden md:flex items-center bg-[#0a2033] p-1 rounded-xl border border-[#0f2c42] text-xs">
          <button
            onClick={() => onViewChange('showcase')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition-all ${
              currentView === 'showcase' 
                ? 'bg-[#006a61] text-white shadow-sm font-semibold' 
                : 'text-[#7994ae] hover:text-white'
            }`}
          >
            <PlayCircle className="w-3.5 h-3.5 text-[#86f2e4]" />
            <span>Interactive Showcase</span>
          </button>

          <button
            onClick={() => onViewChange('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition-all ${
              currentView === 'mobile' 
                ? 'bg-[#006a61] text-white shadow-sm font-semibold' 
                : 'text-[#7994ae] hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-[#86f2e4]" />
            <span>Patient Mobile App</span>
          </button>

          <button
            onClick={() => onViewChange('pharmacy')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition-all ${
              currentView === 'pharmacy' 
                ? 'bg-[#006a61] text-white shadow-sm font-semibold' 
                : 'text-[#7994ae] hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-[#86f2e4]" />
            <span>CarePoint Pharmacy Hub</span>
          </button>

          <button
            onClick={() => onViewChange('ops')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition-all ${
              currentView === 'ops' 
                ? 'bg-[#006a61] text-white shadow-sm font-semibold' 
                : 'text-[#7994ae] hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-[#86f2e4]" />
            <span>Mission Control</span>
          </button>

          <button
            onClick={() => onViewChange('architecture')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition-all ${
              currentView === 'architecture' 
                ? 'bg-[#006a61] text-white shadow-sm font-semibold' 
                : 'text-[#7994ae] hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#86f2e4]" />
            <span>Architecture &amp; PRD</span>
          </button>
        </nav>
      </div>

      {/* Right Controls & Telemetry */}
      <div className="flex items-center gap-3">
        {/* Mobile dropdown selector for small screens */}
        <div className="md:hidden">
          <select
            value={currentView}
            onChange={(e) => onViewChange(e.target.value as ViewMode)}
            className="bg-[#0f2c42] text-xs text-white rounded-lg px-2.5 py-1.5 border border-[#2f4960] focus:outline-none"
          >
            <option value="showcase">🧪 Interactive Showcase</option>
            <option value="mobile">📱 Patient Mobile App</option>
            <option value="pharmacy">🏥 Pharmacy Partner Hub</option>
            <option value="ops">🌐 Mission Control</option>
            <option value="architecture">📐 Architecture &amp; PRD</option>
          </select>
        </div>

        {/* Live SLA & Latency badges */}
        <div className="hidden xl:flex items-center gap-2 text-[11px] font-mono text-[#7994ae] bg-[#0a2033] px-2.5 py-1 rounded-lg border border-[#0f2c42]">
          <span className="flex items-center gap-1 text-[#86f2e4]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#86f2e4] animate-pulse"></span>
            SLA 99.98%
          </span>
          <span className="text-[#2f4960]">•</span>
          <span>US-EAST 28ms</span>
          <span className="text-[#2f4960]">•</span>
          <span className="text-emerald-400 flex items-center gap-0.5">
            <Lock className="w-3 h-3" /> HIPAA/DEA
          </span>
        </div>

        {/* Inspector Mode Trigger */}
        {onOpenInspector && (
          <button
            onClick={onOpenInspector}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg bg-[#ba1a1a]/20 text-[#ffdad6] border border-[#ba1a1a]/40 hover:bg-[#ba1a1a]/30 transition-colors"
            title="Launch Official Board of Pharmacy & DEA Inspector Console"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
            <span className="font-semibold uppercase tracking-wider text-[10px]">Inspector Mode</span>
          </button>
        )}

        {/* Notification Bell with Badge */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-1.5 rounded-lg text-[#7994ae] hover:text-white hover:bg-[#0f2c42] transition-colors relative"
            title="System Alerts"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#001729] border border-[#0f2c42] rounded-xl shadow-2xl p-3 z-50 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#0f2c42] mb-2 font-semibold">
                <span>Real-Time Operational Alerts</span>
                <span className="text-[10px] font-mono text-[#86f2e4]">3 UNRESOLVED</span>
              </div>
              <div className="space-y-2">
                <div className="p-2 rounded-lg bg-[#ffdad6]/10 border border-[#ba1a1a]/30 text-[#ffdad6]">
                  <div className="flex items-center justify-between font-bold">
                    <span>Stale Price Feed Detected</span>
                    <span className="font-mono text-[10px]">2m ago</span>
                  </div>
                  <p className="text-[11px] text-gray-300 mt-0.5">MedPlus Direct LLC Atorvastatin 20mg is -72.2% below market floor.</p>
                </div>
                <div className="p-2 rounded-lg bg-[#86f2e4]/10 border border-[#006a61]/40 text-[#86f2e4]">
                  <div className="flex items-center justify-between font-bold">
                    <span>CSOS Form 222 Signed</span>
                    <span className="font-mono text-[10px]">14m ago</span>
                  </div>
                  <p className="text-[11px] text-gray-300 mt-0.5">PO #CSOS-2024-8841 authenticated by Dr. Marcus Vance, PharmD.</p>
                </div>
                <div className="p-2 rounded-lg bg-[#0f2c42] text-gray-300">
                  <div className="flex items-center justify-between font-bold text-white">
                    <span>Cold-Chain Chamber Normal</span>
                    <span className="font-mono text-[10px]">25m ago</span>
                  </div>
                  <p className="text-[11px] text-gray-400 mt-0.5">Chamber B-1 Sensitech IoT reading nominal at 38.5°F.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Badge */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#0f2c42]">
          <div className="w-7 h-7 rounded-full bg-[#006a61] flex items-center justify-center text-white text-xs font-bold ring-1 ring-[#86f2e4]/30">
            EV
          </div>
          <div className="hidden lg:flex flex-col text-left leading-tight">
            <span className="text-xs font-semibold text-white">Dr. Elena Vance</span>
            <span className="text-[10px] text-[#86f2e4] font-medium">Principal Ops Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};
