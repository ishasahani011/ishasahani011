import React, { useState } from 'react';
import { 
  Activity, 
  ShieldCheck, 
  Building2, 
  Truck, 
  Thermometer, 
  TrendingUp, 
  AlertTriangle, 
  DollarSign, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  Server, 
  ArrowUpRight 
} from 'lucide-react';
import { IMAGES } from '../../data/mockData';

export const MissionControl: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState('all');

  return (
    <div className="w-full bg-[#eff4ff] min-h-[calc(100vh-3.5rem)] p-4 sm:p-6 overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-6 pb-12">
        {/* Mission Control Header */}
        <div className="bg-white rounded-2xl p-5 border border-[#e5eeff] shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006a61] animate-pulse"></span>
              <span className="font-mono text-xs uppercase font-bold tracking-wider text-[#006a61]">
                Unified Network Telemetry
              </span>
            </div>
            <h1 className="font-display font-bold text-2xl text-[#001729] tracking-tight mt-1">
              Mission Control &amp; Network Health
            </h1>
            <p className="text-xs text-[#43474d] mt-0.5">
              Live monitoring across 412 fulfillment hub stations, 18,400+ active prescriptions, cold-chain IoT gateways, and DEA CSOS nodes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-[#001729] text-white text-xs font-mono font-bold flex items-center gap-2">
              <Server className="w-3.5 h-3.5 text-[#86f2e4]" />
              <span>CLUSTER: US-EAST-01</span>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-[#86f2e4] text-[#006f66] text-xs font-mono font-bold">
              UPTIME 99.98%
            </span>
          </div>
        </div>

        {/* Top 4 KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-white p-4 rounded-2xl border border-[#e5eeff] shadow-xs flex flex-col justify-between">
            <span className="text-[10px] font-bold text-[#73777d] uppercase tracking-wider">Active Prescriptions Today</span>
            <div className="my-1.5 flex items-baseline gap-2">
              <span className="font-display font-bold text-2xl text-[#001729] font-mono">18,492</span>
              <span className="text-xs font-bold text-[#006a61]">+14.2%</span>
            </div>
            <span className="text-[11px] text-[#43474d]">99.4% Dispensed within 30-min SLA</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#e5eeff] shadow-xs flex flex-col justify-between">
            <span className="text-[10px] font-bold text-[#73777d] uppercase tracking-wider">Total GMV Processed (24h)</span>
            <div className="my-1.5 flex items-baseline gap-2">
              <span className="font-display font-bold text-2xl text-[#006a61] font-mono">$1,428,950</span>
            </div>
            <span className="text-[11px] text-[#006a61] font-semibold">Avg Patient Savings: $84.20 per Rx</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#e5eeff] shadow-xs flex flex-col justify-between">
            <span className="text-[10px] font-bold text-[#73777d] uppercase tracking-wider">Cold-Chain Sensors Online</span>
            <div className="my-1.5 flex items-baseline gap-2">
              <span className="font-display font-bold text-2xl text-[#001729] font-mono">1,842</span>
              <span className="text-xs font-bold text-[#006a61]">100% OK</span>
            </div>
            <span className="text-[11px] text-[#43474d]">0 Excursion alerts across active transit</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#e5eeff] shadow-xs flex flex-col justify-between">
            <span className="text-[10px] font-bold text-[#73777d] uppercase tracking-wider">DEA CSOS Hash Chain</span>
            <div className="my-1.5 flex items-baseline gap-2">
              <span className="font-display font-bold text-2xl text-[#001729] font-mono">Block #894k</span>
            </div>
            <span className="text-[11px] text-[#006a61] font-semibold">21 CFR § 1311 Synchronized</span>
          </div>
        </div>

        {/* Live Network Operations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Main Map & Live Feed (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-5 border border-[#e5eeff] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#f0f4ff]">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#006a61]" />
                <h2 className="font-display font-bold text-base text-[#001729]">
                  Live Urban Courier &amp; Fulfillment Dispatch
                </h2>
              </div>
              <span className="text-xs font-mono text-[#006a61] font-bold">
                128 Fleet Drivers Active
              </span>
            </div>

            {/* Map Simulator Graphic */}
            <div className="relative rounded-2xl overflow-hidden h-72 bg-[#001729] border border-[#0f2c42] shadow-inner flex items-center justify-center">
              <img 
                src={IMAGES.urbanMapNav} 
                alt="Fulfillment Hub Map" 
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
              {/* Overlay telemetry badges */}
              <div className="absolute top-3 left-3 bg-[#001729]/90 backdrop-blur-md p-2.5 rounded-xl border border-[#0f2c42] text-white text-xs space-y-1">
                <div className="flex items-center gap-2 font-bold text-[#86f2e4]">
                  <span className="w-2 h-2 rounded-full bg-[#86f2e4] animate-ping"></span>
                  <span>Hub: CarePoint Station 04 (Austin Metro)</span>
                </div>
                <div className="text-[11px] text-gray-300 font-mono">34 Batches in transit • 4m Avg Driver Arrival</div>
              </div>

              <div className="absolute bottom-3 right-3 bg-[#001729]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#0f2c42] text-[#86f2e4] text-xs font-mono font-bold">
                LAT: 30.2672° N • LON: 97.7431° W
              </div>
            </div>

            {/* Hub Status Table */}
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#eff4ff] text-[#73777d] font-mono text-[10px] uppercase border-b border-[#e5eeff]">
                    <th className="py-2.5 px-3 font-bold">Hub / Station</th>
                    <th className="py-2.5 px-3 font-bold">Active Load</th>
                    <th className="py-2.5 px-3 font-bold">SLA Performance</th>
                    <th className="py-2.5 px-3 font-bold">Cold Vault</th>
                    <th className="py-2.5 px-3 font-bold text-center">Health</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0f4ff]">
                  <tr className="hover:bg-[#eff4ff]/60">
                    <td className="py-2.5 px-3 font-bold text-[#001729]">CarePoint Express (Station 04)</td>
                    <td className="py-2.5 px-3 font-mono">34 orders</td>
                    <td className="py-2.5 px-3 font-mono text-[#006a61] font-bold">99.6%</td>
                    <td className="py-2.5 px-3 font-mono text-[#006a61]">41.2°F (Norm)</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-[#86f2e4] text-[#006f66] text-[10px] font-bold">OPTIMAL</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-[#eff4ff]/60">
                    <td className="py-2.5 px-3 font-bold text-[#001729]">St. Jude Community Rx (Hub 12)</td>
                    <td className="py-2.5 px-3 font-mono">58 orders</td>
                    <td className="py-2.5 px-3 font-mono text-[#006a61] font-bold">98.9%</td>
                    <td className="py-2.5 px-3 font-mono text-[#006a61]">39.8°F (Norm)</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-[#86f2e4] text-[#006f66] text-[10px] font-bold">OPTIMAL</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-[#eff4ff]/60">
                    <td className="py-2.5 px-3 font-bold text-[#001729]">Baystate Apothecary (Station 09)</td>
                    <td className="py-2.5 px-3 font-mono">22 orders</td>
                    <td className="py-2.5 px-3 font-mono text-[#006a61] font-bold">100.0%</td>
                    <td className="py-2.5 px-3 font-mono text-[#006a61]">40.5°F (Norm)</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-[#86f2e4] text-[#006f66] text-[10px] font-bold">OPTIMAL</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Live Event Stream & Sentinel (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl p-4 border border-[#e5eeff] shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#f0f4ff]">
                <div className="flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-[#006a61]" />
                  <h3 className="font-display font-bold text-sm text-[#001729]">Real-Time Event Stream</h3>
                </div>
                <span className="font-mono text-[10px] text-[#006a61] font-bold animate-pulse">STREAMING</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-[#eff4ff] border border-[#dce9ff]">
                  <div className="flex justify-between font-bold text-[#001729]">
                    <span>Vision AI Pill Verification</span>
                    <span className="text-[10px] font-mono text-[#73777d]">Just now</span>
                  </div>
                  <p className="text-[11px] text-[#43474d] mt-0.5">Station 04 Tray #4: Losartan 50mg count 30/30 verified.</p>
                </div>

                <div className="p-2.5 rounded-xl bg-[#eff4ff] border border-[#dce9ff]">
                  <div className="flex justify-between font-bold text-[#001729]">
                    <span>DEA CSOS Signature Auth</span>
                    <span className="text-[10px] font-mono text-[#73777d]">2m ago</span>
                  </div>
                  <p className="text-[11px] text-[#43474d] mt-0.5">Dr. Marcus Vance authenticated PO #PO-88392-MCK.</p>
                </div>

                <div className="p-2.5 rounded-xl bg-[#eff4ff] border border-[#dce9ff]">
                  <div className="flex justify-between font-bold text-[#001729]">
                    <span>Cold Chain Checkpoint Passed</span>
                    <span className="text-[10px] font-mono text-[#73777d]">5m ago</span>
                  </div>
                  <p className="text-[11px] text-[#43474d] mt-0.5">Package #GM-894085 Insulin Glargine logged at 41.2°F.</p>
                </div>

                <div className="p-2.5 rounded-xl bg-[#eff4ff] border border-[#dce9ff]">
                  <div className="flex justify-between font-bold text-[#001729]">
                    <span>EDI 850 Order Transmitted</span>
                    <span className="text-[10px] font-mono text-[#73777d]">12m ago</span>
                  </div>
                  <p className="text-[11px] text-[#43474d] mt-0.5">McKesson Connect EDI 997 Functional Acknowledgment OK.</p>
                </div>
              </div>
            </div>

            {/* Quick Diagnostic Card */}
            <div className="bg-[#001729] text-white rounded-2xl p-4 border border-[#0f2c42] shadow-sm space-y-2 text-xs">
              <div className="flex items-center justify-between text-[#86f2e4] pb-1 border-b border-[#0f2c42]">
                <span className="font-bold">Security &amp; Regulatory Sentinel</span>
                <ShieldCheck className="w-4 h-4" />
              </div>
              <p className="text-[11px] text-gray-300 leading-relaxed">
                Zero security intrusions, uncertified DEA CSOS tokens, or temperature excursions detected across 24h operational window.
              </p>
              <div className="flex items-center justify-between pt-1 font-mono text-[10px] text-[#86f2e4]">
                <span>21 CFR § 1311 Status:</span>
                <span>COMPLIANT ✓</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
