import React, { useState } from 'react';
import { PipelineOrder } from '../../types';
import { INITIAL_PIPELINE_ORDERS, IMAGES } from '../../data/mockData';
import { 
  Barcode, 
  Printer, 
  Truck, 
  CheckCircle2, 
  AlertCircle, 
  Thermometer, 
  Layers, 
  FileCheck, 
  QrCode, 
  Clock, 
  Send, 
  Stethoscope, 
  Camera, 
  ShieldCheck, 
  Sparkles,
  Eye
} from 'lucide-react';

export const FulfillmentPipeline: React.FC = () => {
  const [orders, setOrders] = useState<PipelineOrder[]>(INITIAL_PIPELINE_ORDERS);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'cardio' | 'cold' | 'escalations'>('all');
  const [scanQuery, setScanQuery] = useState('');
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setActionSuccessMessage(msg);
    setTimeout(() => setActionSuccessMessage(null), 3000);
  };

  const moveOrder = (id: string, newStatus: PipelineOrder['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
    showFeedback(`Order #${id} advanced to ${newStatus.toUpperCase()} stage`);
  };

  return (
    <div className="flex flex-col w-full space-y-4 text-[#0b1c30]">
      {/* Top Telemetry & Control Ribbon */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e5eeff]">
        <div className="flex flex-col 2xl:flex-row 2xl:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-bold text-xl text-[#001729] tracking-tight">
                Order Fulfillment &amp; Dispensing Pipeline
              </h1>
              <span className="px-2 py-0.5 rounded-lg bg-[#86f2e4] text-[#006f66] font-mono text-xs font-bold">
                NABP Sec. 7.2 Compliant
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#43474d] mt-1 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#006a61] animate-pulse"></span>
              <span>CarePoint Station 04</span>
              <span className="text-[#c3c7cd]">•</span>
              <span>Dispatch Window #16:00 EST</span>
              <span className="text-[#c3c7cd]">•</span>
              <span className="font-mono text-[#006a61]">HUB-ID: CP-E1-49210</span>
            </div>
          </div>

          {/* Quick Action Bar */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative flex-1 sm:w-72">
              <Barcode className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#006a61]" />
              <input 
                type="text"
                value={scanQuery}
                onChange={(e) => setScanQuery(e.target.value)}
                placeholder="Scan Vial / NDC / Rx #..."
                className="w-full pl-9 pr-14 py-1.5 bg-[#eff4ff] text-xs font-medium rounded-xl border border-[#dce9ff] focus:outline-none focus:bg-white focus:border-[#006a61]"
              />
              <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-white text-[10px] font-mono text-[#73777d] border border-[#dce9ff]">
                Ctrl+K
              </kbd>
            </div>

            <button 
              onClick={() => showFeedback("Batch of 14 Zebra thermal prescription labels printed.")}
              className="px-3 py-1.5 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] text-[#001729] text-xs font-bold flex items-center gap-1.5 transition-colors border border-[#dce9ff]"
            >
              <Printer className="w-4 h-4 text-[#001729]" />
              <span>Batch Print (14)</span>
            </button>

            <button 
              onClick={() => showFeedback("Courier Manifest signed & dispatched to 4 active drivers.")}
              className="px-3.5 py-1.5 rounded-xl bg-[#006a61] hover:bg-[#005049] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Truck className="w-4 h-4 text-[#89f5e7]" />
              <span>Courier Manifest (4 Active)</span>
            </button>
          </div>
        </div>

        {/* Live 5-Bento KPI Strip */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-4 pt-3 border-t border-[#f0f4ff]">
          <div className="p-2.5 rounded-xl bg-[#eff4ff] border border-[#dce9ff]">
            <span className="text-[10px] font-bold text-[#73777d] uppercase tracking-wider block">In-Pipe Load</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="font-display font-bold text-lg text-[#001729]">34 <span className="text-xs font-normal text-[#73777d]">orders</span></span>
              <span className="font-mono text-xs font-semibold text-[#006a61]">$1,842.50</span>
            </div>
            <div className="w-full bg-[#dce9ff] h-1 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-[#006a61] h-full w-3/4"></div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#eff4ff] border border-[#dce9ff]">
            <span className="text-[10px] font-bold text-[#73777d] uppercase tracking-wider block">Clinical Review</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="font-display font-bold text-lg text-[#001729]">6 <span className="text-xs font-normal text-[#73777d]">pending</span></span>
              <span className="font-mono text-xs font-semibold text-[#006a61]">~3.4m avg</span>
            </div>
            <div className="w-full bg-[#dce9ff] h-1 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-[#86f2e4] h-full w-1/2"></div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#eff4ff] border border-[#dce9ff]">
            <span className="text-[10px] font-bold text-[#73777d] uppercase tracking-wider block">Barcode Dispense</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="font-display font-bold text-lg text-[#001729]">8 <span className="text-xs font-normal text-[#73777d]">trays</span></span>
              <span className="font-mono text-xs font-semibold text-[#006a61]">100% NDC</span>
            </div>
            <div className="w-full bg-[#dce9ff] h-1 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-[#006a61] h-full w-2/3"></div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#eff4ff] border border-[#dce9ff]">
            <span className="text-[10px] font-bold text-[#73777d] uppercase tracking-wider block">Tamper Sealed</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="font-display font-bold text-lg text-[#001729]">11 <span className="text-xs font-normal text-[#73777d]">staged</span></span>
              <span className="font-mono text-xs font-semibold text-[#006a61]">Cold: 3 pk</span>
            </div>
            <div className="w-full bg-[#dce9ff] h-1 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-[#006a61] h-full w-5/6"></div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#eff4ff] border border-[#dce9ff] col-span-2 md:col-span-1">
            <span className="text-[10px] font-bold text-[#73777d] uppercase tracking-wider block">Dispatch SLA Today</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="font-display font-bold text-lg text-[#001729]">68 <span className="text-xs font-normal text-[#73777d]">sent</span></span>
              <span className="font-mono text-xs font-bold text-[#006a61]">99.6% SLA</span>
            </div>
            <div className="w-full bg-[#dce9ff] h-1 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-[#006a61] h-full w-[99%]"></div>
            </div>
          </div>
        </div>
      </div>

      {actionSuccessMessage && (
        <div className="p-3 bg-[#86f2e4] text-[#006f66] rounded-xl text-xs font-bold flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{actionSuccessMessage}</span>
          </div>
          <span className="font-mono text-[10px] uppercase">Acknowledged</span>
        </div>
      )}

      {/* 4-Column Fulfillment Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-start">
        {/* ================= STAGE 1: INTAKE & RX VERIFICATION ================= */}
        <div className="flex flex-col gap-3 bg-[#eff4ff]/80 p-3 rounded-2xl border border-[#dce9ff]">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-[#0f2c42] text-[#86f2e4] flex items-center justify-center font-mono text-xs font-bold">
                1
              </span>
              <span className="font-title font-bold text-xs text-[#001729]">Intake &amp; Verification</span>
            </div>
            <span className="font-mono text-[11px] text-[#43474d]">3 items</span>
          </div>

          {/* Card 1: Alex Morgan */}
          <div className="rounded-xl bg-white p-3.5 shadow-xs border border-[#e5eeff] flex flex-col gap-2.5">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold text-xs text-[#001729]">#GM-894120</span>
                  <span className="px-1.5 py-0.2 rounded bg-[#ffdad6] text-[#ba1a1a] text-[10px] font-bold">
                    High Priority
                  </span>
                </div>
                <span className="text-[11px] text-[#73777d]">Alex Morgan (DOB: 1984-04-12)</span>
              </div>
              <img 
                src={IMAGES.patientAlex} 
                alt="Alex Morgan" 
                className="w-8 h-8 rounded-lg object-cover bg-[#eff4ff]"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="bg-[#eff4ff] p-2.5 rounded-lg text-xs">
              <div className="flex justify-between font-bold text-[#001729]">
                <span>Atorvastatin Calcium 20mg</span>
                <span className="font-mono text-[#006a61]">30 Tabs</span>
              </div>
              <span className="text-[11px] text-[#73777d] block mt-0.5">Generic for Lipitor® • NDC: 0093-2274-34</span>
              <div className="flex items-center gap-1 text-[10px] text-[#43474d] mt-1">
                <Stethoscope className="w-3 h-3 text-[#006a61]" />
                <span>Dr. Rachel Henderson, MD (#1849204912)</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-[#73777d] px-1">
              <span>Refills: 2 remaining</span>
              <span className="text-[#006a61] font-bold">Copay: $12.00 (Auth 9192)</span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button 
                onClick={() => showFeedback("Prescriber clarification requested for Dr. Henderson.")}
                className="py-1 px-2 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-xs font-semibold text-[#001729] text-center"
              >
                Clarification
              </button>
              <button 
                onClick={() => moveOrder('GM-894120', 'dispense')}
                className="py-1 px-2 rounded-lg bg-[#001729] hover:bg-[#0f2c42] text-white text-xs font-semibold flex items-center justify-center gap-1"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#86f2e4]" />
                <span>Approve &amp; Send</span>
              </button>
            </div>
          </div>

          {/* Card 2: David Chen */}
          <div className="rounded-xl bg-white p-3.5 shadow-xs border border-[#e5eeff] flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold text-xs text-[#001729]">#GM-894128</span>
                  <span className="px-1.5 py-0.2 rounded bg-[#e5eeff] text-[#001729] text-[10px] font-bold">
                    Maintenance
                  </span>
                </div>
                <span className="text-[11px] text-[#73777d]">David Chen • Placed 12m ago</span>
              </div>
              <span className="font-mono text-[10px] text-[#73777d]">BIN 004336</span>
            </div>

            <div className="bg-[#eff4ff] p-2 rounded-lg text-xs">
              <div className="flex justify-between font-bold text-[#001729]">
                <span>Metformin HCl 500mg ER</span>
                <span className="font-mono text-[#006a61]">60 Tabs</span>
              </div>
              <span className="text-[11px] text-[#73777d]">Generic for Glucophage XR</span>
            </div>

            <button 
              onClick={() => moveOrder('GM-894128', 'dispense')}
              className="w-full py-1.5 bg-[#eff4ff] hover:bg-[#dce9ff] text-[#001729] text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1"
            >
              <FileCheck className="w-3.5 h-3.5 text-[#006a61]" />
              <span>Authorize Pharmacist Sign-Off</span>
            </button>
          </div>
        </div>

        {/* ================= STAGE 2: PILL DISPENSE & NDC SCAN ================= */}
        <div className="flex flex-col gap-3 bg-[#eff4ff]/80 p-3 rounded-2xl border border-[#dce9ff]">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-[#006a61] text-white flex items-center justify-center font-mono text-xs font-bold">
                2
              </span>
              <span className="font-title font-bold text-xs text-[#001729]">Dispense &amp; NDC Scan</span>
            </div>
            <span className="font-mono text-[11px] text-[#43474d]">2 active</span>
          </div>

          {/* Tray #4 Active with Vision AI Pill Counter Feed */}
          <div className="rounded-xl bg-white p-3.5 shadow-xs border border-[#e5eeff] flex flex-col gap-2.5">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold text-xs text-[#001729]">#GM-894098</span>
                  <span className="px-1.5 py-0.2 rounded bg-[#86f2e4] text-[#006f66] text-[10px] font-bold">
                    Tray #4 Active
                  </span>
                </div>
                <span className="text-[11px] text-[#73777d]">Tech J. Morales • Station B</span>
              </div>
              <span className="font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-[#eff4ff] text-[#001729]">
                BIN-09
              </span>
            </div>

            <div className="bg-[#eff4ff] p-2 rounded-lg text-xs">
              <div className="flex justify-between font-bold text-[#001729]">
                <span>Losartan Potassium 50mg</span>
                <span className="font-mono text-[#006a61]">30 Count</span>
              </div>
              <span className="text-[11px] text-[#73777d]">Lot #LOT-9821A • Exp: 09/2026</span>
            </div>

            {/* Simulated Live Camera Counting Feed */}
            <div className="relative rounded-lg overflow-hidden h-28 bg-[#001729] flex items-center justify-center">
              <img 
                src={IMAGES.visionPillTray} 
                alt="Pill Counting Tray" 
                className="w-full h-full object-cover opacity-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded bg-[#001729]/90 text-white font-mono text-[9px] flex items-center gap-1 backdrop-blur">
                <span className="w-1.5 h-1.5 rounded-full bg-[#86f2e4] animate-ping"></span>
                <span>Vision AI Count: 30 / 30 Verified</span>
              </div>
              <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-[#001729]/90 text-[#86f2e4] font-mono text-[9px]">
                NDC 0781-5555-20 Match ✓
              </div>
            </div>

            <div className="flex items-center justify-between text-xs p-2 bg-[#eff4ff] rounded-lg">
              <span className="flex items-center gap-1.5 text-[#43474d]">
                <QrCode className="w-4 h-4 text-[#006a61]" />
                <span>2D DataMatrix Serial</span>
              </span>
              <span className="font-mono text-xs text-[#006a61] font-bold">VERIFIED</span>
            </div>

            <button 
              onClick={() => moveOrder('GM-894098', 'seal')}
              className="w-full py-1.5 bg-[#001729] hover:bg-[#0f2c42] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1 shadow-sm"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#86f2e4]" />
              <span>Print Seal &amp; Move to Pack</span>
            </button>
          </div>
        </div>

        {/* ================= STAGE 3: TAMPER-SEAL & COLD-CHAIN ================= */}
        <div className="flex flex-col gap-3 bg-[#eff4ff]/80 p-3 rounded-2xl border border-[#dce9ff]">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-[#006a61] text-white flex items-center justify-center font-mono text-xs font-bold">
                3
              </span>
              <span className="font-title font-bold text-xs text-[#001729]">Seal &amp; Cold-Chain</span>
            </div>
            <span className="font-mono text-[11px] text-[#43474d]">1 staged</span>
          </div>

          {/* Cold-chain Insulin Solostar */}
          <div className="rounded-xl bg-white p-3.5 shadow-xs border border-[#e5eeff] flex flex-col gap-2.5">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold text-xs text-[#001729]">#GM-894085</span>
                  <span className="px-1.5 py-0.2 rounded bg-[#006a61] text-white text-[10px] font-bold flex items-center gap-1">
                    <Thermometer className="w-3 h-3" /> Cold 36°-46°F
                  </span>
                </div>
                <span className="text-[11px] text-[#73777d]">Patient: Maya Lin</span>
              </div>
            </div>

            <div className="bg-[#eff4ff] p-2 rounded-lg text-xs">
              <span className="font-bold text-[#001729] block">Insulin Glargine Solostar</span>
              <span className="text-[11px] text-[#43474d]">5 Pens x 3mL • Sanofi Aventis</span>
            </div>

            {/* Thermal Logger Telemetry Box */}
            <div className="p-2.5 rounded-lg bg-[#eff4ff] border border-[#dce9ff] flex flex-col gap-1 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-medium text-[#43474d] flex items-center gap-1">
                  <Thermometer className="w-3.5 h-3.5 text-[#006a61]" />
                  <span>Logger #TH-882</span>
                </span>
                <span className="font-mono font-bold text-[#006a61]">41.2°F NOMINAL</span>
              </div>
              <span className="text-[11px] text-[#73777d]">Insulated Barrier Pack: Gel-Vial x2</span>
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono text-[#73777d]">
              <span>Tamper Seal: #GM-TC-4991</span>
              <span className="text-[#006a61] font-bold">NFC Tag Active</span>
            </div>

            <button 
              onClick={() => moveOrder('GM-894085', 'dispatch')}
              className="w-full py-1.5 bg-[#006a61] hover:bg-[#005049] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Stage for Courier Handoff</span>
            </button>
          </div>
        </div>

        {/* ================= STAGE 4: COURIER DISPATCH & HANDOFF ================= */}
        <div className="flex flex-col gap-3 bg-[#eff4ff]/80 p-3 rounded-2xl border border-[#dce9ff]">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-[#86f2e4] text-[#006f66] flex items-center justify-center font-mono text-xs font-bold">
                4
              </span>
              <span className="font-title font-bold text-xs text-[#001729]">Courier &amp; Dispatch</span>
            </div>
            <span className="font-mono text-[11px] text-[#43474d]">2 couriers</span>
          </div>

          {/* Active Courier Driver Derrick Ramos */}
          <div className="rounded-xl bg-white p-3.5 shadow-xs border border-[#e5eeff] flex flex-col gap-2.5">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <img 
                  src={IMAGES.courierDerrickWarehouse} 
                  alt="Derrick Ramos" 
                  className="w-9 h-9 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="font-title font-bold text-xs text-[#001729] block">Derrick Ramos</span>
                  <span className="text-[10px] text-[#73777d]">Priority MedCourier</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#86f2e4] text-[#006f66] font-mono text-[10px] font-bold animate-pulse">
                ETA 4m
              </span>
            </div>

            <div className="bg-[#eff4ff] p-2 rounded-lg text-xs space-y-1 border border-[#dce9ff]">
              <div className="flex justify-between font-bold text-[#001729]">
                <span>Manifest Batch #MF-88102</span>
                <span className="font-mono text-[#006a61]">4 Packages</span>
              </div>
              <div className="flex flex-wrap gap-1 pt-0.5">
                <span className="px-1.5 py-0.2 rounded bg-white font-mono text-[9px] text-[#001729]">#GM-894120</span>
                <span className="px-1.5 py-0.2 rounded bg-white font-mono text-[9px] text-[#001729]">#GM-894091</span>
                <span className="px-1.5 py-0.2 rounded bg-[#86f2e4] font-mono text-[9px] text-[#006f66] font-bold">#GM-894085 (Cold)</span>
              </div>
            </div>

            <button 
              onClick={() => showFeedback("Driver QR badge verified. Manifest #MF-88102 released to Derrick Ramos.")}
              className="w-full py-1.5 bg-[#001729] hover:bg-[#0f2c42] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1 shadow-sm"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#86f2e4]" />
              <span>Sign &amp; Release Manifest</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
