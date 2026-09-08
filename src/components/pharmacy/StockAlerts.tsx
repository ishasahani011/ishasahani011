import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Send, 
  RefreshCw, 
  ShieldCheck, 
  Truck, 
  FileText, 
  Thermometer, 
  CheckCircle2, 
  Terminal, 
  Lock, 
  Boxes, 
  Clock, 
  ArrowRightLeft,
  Key
} from 'lucide-react';

export const StockAlerts: React.FC = () => {
  const [csosAuthorized, setCsosAuthorized] = useState(true);
  const [showTransmitModal, setShowTransmitModal] = useState(false);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [activeAlerts, setActiveAlerts] = useState([
    {
      id: 'alt-1',
      severity: 'CRITICAL • 1.5d',
      burnRate: '120 tab/day',
      drugName: 'Amoxicillin / Clavulanate 875/125mg',
      ndc: '0781-5555-20',
      manufacturer: 'Sandoz Generic',
      packDetails: 'Standard 140 Tabs Blister Pack',
      physicalStock: 180,
      minPar: 800,
      allocated: 92,
      netAvail: 88,
      wholesaler: 'McKesson Connect',
      slaDelivery: '$9.28/unit • 06:30 AM Arr',
      poDrafted: 'PO Auto-Drafted (10 pk)',
      status: 'critical'
    },
    {
      id: 'alt-2',
      severity: 'COLD 2-8°C • 3.0d',
      burnRate: '8 pk/day',
      drugName: 'Insulin Glargine Solostar 100u/mL',
      ndc: '0024-5901-05',
      manufacturer: 'Sanofi Cold-Chain Staged',
      packDetails: 'Pre-filled SoloStar Pens (5x3mL)',
      physicalStock: 24,
      minPar: 50,
      allocated: 16,
      netAvail: 8,
      wholesaler: 'Amerisource / Cencora',
      slaDelivery: '$42.00/unit • Verified Temp Pack',
      poDrafted: 'PO Auto-Drafted (30 pk)',
      status: 'cold'
    },
    {
      id: 'alt-3',
      severity: 'BACKORDER MITIGATED',
      burnRate: 'Mylan Inactive',
      drugName: 'Atorvastatin Calcium 40mg Tab',
      ndc: '0093-2274-34 (Teva Generic Swap)',
      manufacturer: 'Teva AB-Equiv 100% Match',
      packDetails: 'Cross-walked from Mylan #0093-7157-98',
      physicalStock: 45,
      minPar: 1000,
      allocated: 40,
      netAvail: 5,
      wholesaler: 'AmerisourceBergen',
      slaDelivery: '$5.40/bottle • In Stock',
      poDrafted: 'Swap Approved (15 btl)',
      status: 'swap'
    },
    {
      id: 'alt-4',
      severity: 'LOW STOCK • 2.2d',
      burnRate: 'High Demand',
      drugName: 'Losartan Potassium 50mg',
      ndc: '68180-211-09',
      manufacturer: 'Lupin Pharmaceuticals',
      packDetails: '1,000 Count Bulk Bottle',
      physicalStock: 320,
      minPar: 1500,
      allocated: 190,
      netAvail: 130,
      wholesaler: 'Cardinal Health',
      slaDelivery: '$12.40/1000ct • Courier Delivery',
      poDrafted: '+ Add to PO (2 btl)',
      status: 'low'
    }
  ]);

  const handleTransmit = () => {
    if (!csosAuthorized) {
      alert("Please authorize DEA CSOS Digital Verification before dispatching controlled POs.");
      return;
    }
    setIsTransmitting(true);
    setTimeout(() => {
      setIsTransmitting(false);
      setShowTransmitModal(true);
    }, 800);
  };

  return (
    <div className="flex flex-col w-full space-y-5 text-[#0b1c30]">
      {/* Header & Wholesaler Telemetry Strip */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1 text-xs font-mono uppercase text-[#73777d]">
            <span>Inventory &amp; Replenishment</span>
            <span>/</span>
            <span className="text-[#006a61] font-bold">EDI 850 Order Hub</span>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <h1 className="font-display font-bold text-2xl text-[#001729] tracking-tight">
              Stock Level Alerts &amp; Wholesaler Restock
            </h1>
            <span className="hidden sm:flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full bg-[#e5eeff] text-[#006a61] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006a61] animate-ping"></span>
              Live Burn Engine
            </span>
          </div>
        </div>

        {/* Live EDI Stream Badges */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center gap-1 px-2.5 py-1 bg-white rounded-xl border border-[#dce9ff] shadow-xs">
            <RefreshCw className="w-3.5 h-3.5 text-[#006a61]" />
            <span className="font-mono text-[#006a61] font-bold">EDI 850 STREAM: READY</span>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 bg-white rounded-xl border border-[#dce9ff] shadow-xs">
            <Clock className="w-3.5 h-3.5 text-[#73777d]" />
            <span className="font-mono text-[#43474d]">ASN Sync 18s ago</span>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 bg-[#86f2e4] rounded-xl text-[#006f66] font-bold shadow-xs">
            <Key className="w-3.5 h-3.5" />
            <span className="font-mono text-[11px]">CSOS #38910 VALID</span>
          </div>
        </div>
      </div>

      {/* KPI Quad Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-[#e5eeff] shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold text-[#73777d] uppercase tracking-wider">Critical &amp; Low Stock</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display font-bold text-2xl text-[#001729]">7 NDCs</span>
                <span className="px-1.5 py-0.2 rounded bg-[#ffdad6] text-[#ba1a1a] text-[10px] font-bold">
                  Below Par
                </span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-[#ffdad6]/60 text-[#ba1a1a] flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <span className="text-[11px] text-[#ba1a1a] font-semibold mt-2">
            3 Critical &lt;24h runout • $8,450 GMV At Risk
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#e5eeff] shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold text-[#73777d] uppercase tracking-wider">Automated PO Staging</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display font-bold text-2xl text-[#001729] font-mono">$14,820.50</span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-[#86f2e4] text-[#006f66] flex items-center justify-center">
              <Boxes className="w-5 h-5" />
            </div>
          </div>
          <span className="text-[11px] text-[#006a61] font-semibold mt-2">
            3 Wholesalers Batched • 5 SKUs Auto-Grouped
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#e5eeff] shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold text-[#73777d] uppercase tracking-wider">Shortage Sentinel</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display font-bold text-2xl text-[#001729]">2 Active</span>
                <span className="px-1.5 py-0.2 rounded bg-[#eff4ff] text-[#006a61] text-[10px] font-bold">
                  FDA Tracked
                </span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-[#eff4ff] text-[#001729] flex items-center justify-center border border-[#dce9ff]">
              <ArrowRightLeft className="w-5 h-5" />
            </div>
          </div>
          <span className="text-[11px] text-[#006a61] font-semibold mt-2">
            Atorvastatin &amp; Semaglutide • 100% AB Match
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#e5eeff] shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold text-[#73777d] uppercase tracking-wider">Cold-Chain &amp; Vault</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display font-bold text-2xl text-[#001729] font-mono">38.5°F</span>
                <span className="text-[10px] text-[#006a61] font-bold uppercase px-1.5 py-0.2 rounded bg-[#86f2e4]">
                  Chamber B-1
                </span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-[#cde5ff] text-[#001728] flex items-center justify-center">
              <Thermometer className="w-5 h-5" />
            </div>
          </div>
          <span className="text-[11px] text-[#73777d] mt-2">
            Insulin Glargine: 24/50 pk • Lot Exp: 48d
          </span>
        </div>
      </div>

      {/* Primary Split: Alerts Table (Left 7 Cols) + PO Builder (Right 5 Cols) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* Left Column: Alerts Table */}
        <div className="xl:col-span-8 space-y-4">
          <div className="bg-white rounded-2xl border border-[#e5eeff] shadow-xs overflow-hidden">
            <div className="p-3.5 bg-[#eff4ff] border-b border-[#e5eeff] flex justify-between items-center text-xs font-semibold">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#ba1a1a]" />
                <span className="text-[#001729]">Active Stock Depletion &amp; Restock Radar</span>
              </div>
              <span className="font-mono text-[#006a61] text-[11px]">Auto-Sync: Live WebSocket</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#f8f9ff] text-[#73777d] font-mono text-[10px] uppercase tracking-wider border-b border-[#e5eeff]">
                    <th className="py-2.5 px-3 font-bold">Severity</th>
                    <th className="py-2.5 px-3 font-bold">Medication &amp; Formulation</th>
                    <th className="py-2.5 px-3 font-bold text-right">Physical Stock</th>
                    <th className="py-2.5 px-3 font-bold text-right">Allocated / Net</th>
                    <th className="py-2.5 px-3 font-bold">Wholesaler Route</th>
                    <th className="py-2.5 px-3 font-bold text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0f4ff] text-[#0b1c30]">
                  {activeAlerts.map((alert) => (
                    <tr key={alert.id} className="hover:bg-[#eff4ff]/60 transition-colors">
                      <td className="py-3 px-3">
                        <span className={`inline-flex items-center gap-1 font-mono text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          alert.status === 'critical' ? 'bg-[#ffdad6] text-[#ba1a1a]' :
                          alert.status === 'cold' ? 'bg-[#cde5ff] text-[#001d32]' :
                          alert.status === 'swap' ? 'bg-[#86f2e4] text-[#006f66]' :
                          'bg-[#eff4ff] text-[#001729]'
                        }`}>
                          {alert.severity}
                        </span>
                        <span className="block text-[10px] text-[#73777d] mt-0.5 font-mono">{alert.burnRate}</span>
                      </td>

                      <td className="py-3 px-3">
                        <div className="font-title font-bold text-xs text-[#001729]">{alert.drugName}</div>
                        <div className="text-[11px] text-[#73777d] font-mono">NDC: {alert.ndc}</div>
                        <div className="text-[10px] text-[#43474d]">{alert.packDetails}</div>
                      </td>

                      <td className="py-3 px-3 text-right">
                        <span className="font-mono font-bold text-sm text-[#ba1a1a]">{alert.physicalStock}</span>
                        <span className="block text-[10px] text-[#73777d]">Min: {alert.minPar}</span>
                      </td>

                      <td className="py-3 px-3 text-right font-mono">
                        <span className="text-xs text-[#43474d]">{alert.allocated} Allocated</span>
                        <span className="block text-xs font-bold text-[#ba1a1a]">{alert.netAvail} Net Avail</span>
                      </td>

                      <td className="py-3 px-3">
                        <div className="font-bold text-xs text-[#001729] flex items-center gap-1">
                          <Truck className="w-3.5 h-3.5 text-[#006a61]" />
                          <span>{alert.wholesaler}</span>
                        </div>
                        <span className="text-[10px] text-[#73777d] block font-mono">{alert.slaDelivery}</span>
                      </td>

                      <td className="py-3 px-3 text-center">
                        <span className="px-2 py-1 rounded-lg bg-[#001729] text-white font-mono text-[10px] font-bold">
                          {alert.poDrafted}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Wholesaler Route Optimizer Cards */}
          <div className="bg-white rounded-2xl p-4 border border-[#e5eeff] shadow-xs">
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="font-display font-bold text-sm text-[#001729]">Wholesaler Primary vs Secondary Route Optimizer</span>
              <span className="text-[10px] text-[#006a61] font-bold uppercase">Algorithm: Best Net Cost &amp; Cutoff</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#eff4ff] border border-[#dce9ff]">
                <div className="flex justify-between font-bold text-[#001729]">
                  <span>McKesson Connect</span>
                  <span className="text-[#006a61] font-mono">PRIMARY (72%)</span>
                </div>
                <p className="text-[11px] text-[#73777d] mt-0.5">Order Cutoff: 20:30 EST (in 4h 12m)</p>
                <div className="mt-2 text-[11px] font-mono text-[#006a61] font-semibold">
                  Guaranteed Delivery: Tomorrow 06:30 AM
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#eff4ff] border border-[#dce9ff]">
                <div className="flex justify-between font-bold text-[#001729]">
                  <span>Amerisource / Cencora</span>
                  <span className="text-[#006a61] font-mono">SECONDARY</span>
                </div>
                <p className="text-[11px] text-[#73777d] mt-0.5">Specialty &amp; ValidTemp Cold Vault</p>
                <div className="mt-2 text-[11px] font-mono text-[#006a61] font-semibold">
                  Guaranteed Delivery: Tomorrow 08:00 AM
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#eff4ff] border border-[#dce9ff]">
                <div className="flex justify-between font-bold text-[#001729]">
                  <span>Cardinal Health</span>
                  <span className="text-[#73777d] font-mono">TERTIARY</span>
                </div>
                <p className="text-[11px] text-[#73777d] mt-0.5">Rapid Courier Direct (Cutoff 22:00 EST)</p>
                <div className="mt-2 text-[11px] font-mono text-[#006a61] font-semibold">
                  Emergency Same-Day Backup
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Staged EDI 850 Order Dispatcher */}
        <div className="xl:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-[#e5eeff] shadow-xs space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-[#f0f4ff]">
              <div>
                <h3 className="font-display font-bold text-sm text-[#001729]">Pending EDI 850 POs</h3>
                <p className="text-[11px] text-[#73777d]">Staged for Wholesale Network Transmission</p>
              </div>
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-lg bg-[#86f2e4] text-[#006f66]">
                3 BATCHES
              </span>
            </div>

            {/* Batches Stack */}
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-[#eff4ff] border border-[#dce9ff]">
                <div className="flex justify-between font-bold text-[#001729]">
                  <span>#PO-88392-MCK</span>
                  <span className="font-mono text-[#006a61]">$8,940.00</span>
                </div>
                <span className="text-[11px] text-[#73777d]">McKesson Direct • 4 Line Items (Amox/Clav + 3)</span>
                <span className="block text-[10px] text-[#006a61] font-mono font-bold mt-1">Fleet Arr: 06:30 AM</span>
              </div>

              <div className="p-3 rounded-xl bg-[#eff4ff] border border-[#dce9ff]">
                <div className="flex justify-between font-bold text-[#001729]">
                  <span>#PO-44102-ABC</span>
                  <span className="font-mono text-[#006a61]">$4,120.50</span>
                </div>
                <span className="text-[11px] text-[#73777d]">AmerisourceBergen • Cold-Chain Enclosed</span>
                <span className="block text-[10px] text-[#006a61] font-mono font-bold mt-1">Insulin Glargine + Atorvastatin</span>
              </div>

              <div className="p-3 rounded-xl bg-[#eff4ff] border border-[#dce9ff]">
                <div className="flex justify-between font-bold text-[#001729]">
                  <span>#PO-11928-CA</span>
                  <span className="font-mono text-[#006a61]">$1,760.00</span>
                </div>
                <span className="text-[11px] text-[#73777d]">Cardinal Health • Losartan Bulk</span>
                <span className="block text-[10px] text-[#006a61] font-mono font-bold mt-1">Same-Day Courier Staged</span>
              </div>
            </div>

            {/* DEA CSOS Digital Sign-Off Module */}
            <div className="p-3 rounded-xl bg-[#001729] text-white space-y-2 text-xs shadow-xs">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#89f5e7]" />
                <span className="font-bold text-white">DEA CSOS Digital Verification</span>
              </div>
              <p className="text-[11px] text-gray-300 leading-relaxed">
                I certify that this purchase order compilation is authorized in accordance with DEA Title 21 CFR § 1311.
              </p>

              <label className="flex items-center gap-2 p-2 bg-[#0f2c42] rounded-lg cursor-pointer border border-[#2f4960]">
                <input 
                  type="checkbox" 
                  checked={csosAuthorized}
                  onChange={(e) => setCsosAuthorized(e.target.checked)}
                  className="w-4 h-4 rounded text-[#006a61] focus:ring-0"
                />
                <div className="flex flex-col text-[11px]">
                  <span className="font-bold text-white">Dr. Marcus Vance, PharmD</span>
                  <span className="font-mono text-[10px] text-[#86f2e4]">Cert #38910-US-DEA • Token Connected</span>
                </div>
              </label>
            </div>

            {/* Transmit Button */}
            <button 
              onClick={handleTransmit}
              disabled={isTransmitting}
              className="w-full py-3 bg-[#006a61] hover:bg-[#005049] text-white text-xs font-bold rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all"
            >
              {isTransmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Transmitting EDI 850 Packets...
                </span>
              ) : (
                <>
                  <Send className="w-4 h-4 text-[#89f5e7]" />
                  <span>Transmit EDI 850 Orders ($14,820.50)</span>
                </>
              )}
            </button>
          </div>

          {/* EDI Socket Terminal Live Log */}
          <div className="bg-[#001729] text-white rounded-2xl p-4 shadow-sm space-y-2 font-mono text-[11px]">
            <div className="flex items-center justify-between text-[#86f2e4] pb-1 border-b border-[#0f2c42]">
              <span className="flex items-center gap-1.5 font-bold">
                <Terminal className="w-3.5 h-3.5" />
                EDI Socket Terminal
              </span>
              <span className="text-[10px]">PORT 8082 OK</span>
            </div>

            <div className="space-y-1 text-gray-300 leading-tight overflow-x-auto">
              <p className="text-[#86f2e4]">&gt; ISA*00* *00* *ZZ*genericMedHub*ZZ*MCKESSON*...</p>
              <p className="text-gray-400">&gt; GS*PO*NABP49210*MCK88392*20241024*1604*1*X*004010~</p>
              <p className="text-emerald-400">√ ST*850*0001~ (Amox/Clav 875mg x 10 pk staged)</p>
              <p className="text-gray-400">&gt; ST*850*0002~ (Amerisource Cold Staging - InsulGlar)</p>
              <p className="text-[#89f5e7] animate-pulse">• EDI 997 Functional Acknowledgment pending...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dispatch Success Modal */}
      {showTransmitModal && (
        <div className="fixed inset-0 z-50 bg-[#001729]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#86f2e4] text-[#006f66] flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-[#001729]">EDI 850 Orders Transmitted Successfully</h3>
              <p className="text-xs text-[#43474d] mt-1">
                3 Purchase orders ($14,820.50) transmitted to McKesson, AmerisourceBergen, and Cardinal Health. CSOS Digital signature verified under Dr. Marcus Vance (PharmD #38910).
              </p>
            </div>

            <div className="p-3 bg-[#eff4ff] rounded-xl font-mono text-xs space-y-1 border border-[#dce9ff]">
              <div className="flex justify-between">
                <span>McKesson PO-88392:</span>
                <span className="text-[#006a61] font-bold">EDI 997 ACK RECEIVED</span>
              </div>
              <div className="flex justify-between">
                <span>Amerisource PO-44102:</span>
                <span className="text-[#006a61] font-bold">EDI 997 ACK RECEIVED</span>
              </div>
              <div className="flex justify-between">
                <span>Cardinal Health PO-11928:</span>
                <span className="text-[#006a61] font-bold">DISPATCHED (Awaiting 997)</span>
              </div>
            </div>

            <button 
              onClick={() => setShowTransmitModal(false)}
              className="w-full py-2.5 bg-[#001729] text-white text-xs font-bold rounded-xl"
            >
              Return to Stock Alerts
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
