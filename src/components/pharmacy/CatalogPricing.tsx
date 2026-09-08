import React, { useState } from 'react';
import { INITIAL_CATALOG } from '../../data/mockData';
import { CatalogItem } from '../../types';
import { 
  Search, 
  Upload, 
  RefreshCw, 
  PlusCircle, 
  ShieldCheck, 
  Sliders, 
  Download, 
  CheckCircle2, 
  Calculator, 
  Check, 
  Lock, 
  TrendingUp,
  Percent,
  Layers,
  Thermometer
} from 'lucide-react';

export const CatalogPricing: React.FC = () => {
  const [catalog, setCatalog] = useState<CatalogItem[]>(INITIAL_CATALOG);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Simulator state
  const [simAcq, setSimAcq] = useState<number>(5.40);
  const [simFee, setSimFee] = useState<number>(3.00);
  const [simMarginPercent, setSimMarginPercent] = useState<number>(50.0);
  const [appliedNotification, setAppliedNotification] = useState(false);

  // Dynamic pricing calculations
  const costBasis = simAcq + simFee;
  const targetGrossMargin = simMarginPercent / 100;
  const simulatedPrice = costBasis / (1 - (targetGrossMargin * 0.5));
  const platformFee = simulatedPrice * 0.042; // 4.2% take
  const netPharmacyTake = simulatedPrice - platformFee;
  const netProfit = netPharmacyTake - costBasis;

  const toggleItemActive = (id: string) => {
    setCatalog(prev => prev.map(item => item.id === id ? { ...item, isActive: !item.isActive } : item));
  };

  const handleApplySimulated = () => {
    setAppliedNotification(true);
    setTimeout(() => setAppliedNotification(false), 3000);
  };

  const filteredCatalog = catalog.filter(item => {
    const matchesSearch = item.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ndc.includes(searchQuery);
    const matchesCategory = categoryFilter === 'all' || item.category.toLowerCase().includes(categoryFilter.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col w-full space-y-5 text-[#0b1c30]">
      {/* Header & Global Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-bold text-2xl text-[#001729] tracking-tight">
              Pharmacy Catalog &amp; Dynamic Pricing Manager
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#86f2e4] text-[#006f66] text-xs font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006a61] animate-pulse"></span>
              Live Mode
            </span>
          </div>
          <p className="text-xs text-[#43474d] mt-1">
            Manage multi-source NDC inventory, live price elasticity, margin floor guardrails, and automated EDI 852/846 real-time ledger synchronization.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button 
            onClick={() => alert("Bulk NDC Import wizard: drag & drop CSV or McKesson price file.")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#eff4ff] text-[#001729] text-xs font-semibold rounded-xl border border-[#dce9ff] shadow-xs"
          >
            <Upload className="w-3.5 h-3.5 text-[#73777d]" />
            <span>Bulk NDC Import</span>
          </button>

          <button 
            onClick={() => alert("EDI 850 / 846 Wholesaler sync verified across McKesson, AmerisourceBergen, and Cardinal.")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#eff4ff] text-[#001729] text-xs font-semibold rounded-xl border border-[#dce9ff] shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#006a61]" />
            <span>EDI Wholesaler Sync</span>
          </button>

          <button 
            onClick={() => alert("Add New NDC dialog opened.")}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#001729] hover:bg-[#0f2c42] text-white text-xs font-bold rounded-xl shadow-xs"
          >
            <PlusCircle className="w-4 h-4 text-[#86f2e4]" />
            <span>+ Add New NDC</span>
          </button>
        </div>
      </div>

      {/* 4-Bento KPI Metric Deck */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-[#e5eeff] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#73777d]">
            <span className="font-bold uppercase tracking-wider text-[10px]">Active Listed SKUs</span>
            <Layers className="w-4 h-4 text-[#006a61]" />
          </div>
          <div className="my-1.5">
            <div className="flex items-baseline gap-2">
              <span className="font-display font-bold text-2xl text-[#001729]">1,482</span>
              <span className="text-xs font-bold text-[#006a61]">+28 this wk</span>
            </div>
            <div className="flex items-center justify-between text-xs text-[#43474d] mt-1">
              <span>In-Stock Rate</span>
              <span className="font-mono font-bold text-[#001729]">99.2%</span>
            </div>
          </div>
          <div className="w-full bg-[#dce9ff] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#006a61] h-full rounded-full" style={{ width: '99.2%' }}></div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#e5eeff] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#73777d]">
            <span className="font-bold uppercase tracking-wider text-[10px]">Catalog GMV Value</span>
            <TrendingUp className="w-4 h-4 text-[#006a61]" />
          </div>
          <div className="my-1.5">
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-bold text-2xl text-[#001729] font-mono">$342,850</span>
              <span className="font-mono text-xs text-[#73777d]">USD</span>
            </div>
            <div className="flex items-center justify-between text-xs text-[#43474d] mt-1">
              <span>Therapeutic Clustered</span>
              <span className="font-mono font-bold text-[#001729]">48 Categories</span>
            </div>
          </div>
          <span className="text-[11px] text-[#006a61] font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +4.8% inventory turn velocity
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#e5eeff] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#73777d]">
            <span className="font-bold uppercase tracking-wider text-[10px]">Average Gross Margin</span>
            <Percent className="w-4 h-4 text-[#006a61]" />
          </div>
          <div className="my-1.5">
            <div className="flex items-baseline gap-2">
              <span className="font-display font-bold text-2xl text-[#006a61] font-mono">34.6%</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#86f2e4] text-[#006f66]">
                Healthy
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-[#43474d] mt-1">
              <span>Store Hard Floor</span>
              <span className="font-mono font-bold text-[#001729]">22.0%</span>
            </div>
          </div>
          <span className="text-[11px] text-[#73777d] flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#006a61]" /> +12.6% headroom buffer
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#e5eeff] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#73777d]">
            <span className="font-bold uppercase tracking-wider text-[10px]">Real-Time Sync Health</span>
            <CheckCircle2 className="w-4 h-4 text-[#006a61]" />
          </div>
          <div className="my-1.5">
            <div className="flex items-baseline gap-2">
              <span className="font-display font-bold text-2xl text-[#001729]">0</span>
              <span className="text-xs text-[#43474d]">Divergence Holds</span>
            </div>
            <div className="flex items-center justify-between text-xs text-[#43474d] mt-1">
              <span>EDI 852 Inventory Sync</span>
              <span className="font-mono font-bold text-[#006a61]">3m ago</span>
            </div>
          </div>
          <span className="text-[10px] font-mono text-[#73777d] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006a61]"></span> McKesson • Amerisource Live
          </span>
        </div>
      </div>

      {/* Margin Sentinel Alert Banner */}
      <div className="bg-[#eff4ff] border border-[#dce9ff] rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#006a61] text-white flex items-center justify-center shrink-0 mt-0.5">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-title font-bold text-xs text-[#001729]">Automated Margin Sentinel Guardrail Active</span>
              <span className="px-1.5 py-0.2 rounded bg-[#86f2e4] text-[#006f66] font-mono text-[10px] font-bold">
                PRD §9.3 &amp; §11.4 ENFORCED
              </span>
            </div>
            <p className="text-xs text-[#43474d] mt-0.5">
              Price adjustments exceeding ±15% or falling beneath store minimum ($2.50 fee + 18% cost-plus) trigger Pharmacist Lead verification. Marketplace Price Parity: <strong className="text-[#001729]">98.4% Buy-Box Optimal</strong>.
            </p>
          </div>
        </div>

        <button 
          onClick={() => alert("Margin floor rules: minimum $2.50 dispensing fee, 18% baseline markup, emergency surge max ±20%/hr.")}
          className="px-3 py-1.5 bg-white hover:bg-[#eff4ff] text-[#001729] text-xs font-semibold rounded-xl border border-[#dce9ff] shrink-0"
        >
          Configure Floor Rules
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-[#e5eeff] shadow-xs space-y-3">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 justify-between">
          <div className="relative flex-1 max-w-xl">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#73777d]" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search NDC [#####-###-##], Active Ingredient, Generic Name (e.g. Lipitor, Metformin)..."
              className="w-full pl-9 pr-4 py-2 bg-[#eff4ff] text-xs text-[#001729] rounded-xl border border-[#dce9ff] focus:outline-none focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto text-xs">
            {['all', 'Cardiovascular', 'Antibiotics', 'Diabetes', 'Mental Health'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
                  categoryFilter === cat
                    ? 'bg-[#001729] text-white font-bold'
                    : 'bg-[#eff4ff] text-[#43474d] hover:bg-[#dce9ff]'
                }`}
              >
                {cat === 'all' ? 'All Formulations' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Comprehensive Catalog Table */}
      <div className="bg-white rounded-2xl border border-[#e5eeff] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#eff4ff] text-[#73777d] font-mono text-[10px] uppercase tracking-wider border-b border-[#e5eeff]">
                <th className="py-3 px-4 font-bold">Medication &amp; NDC Identifiers</th>
                <th className="py-3 px-4 font-bold text-right">Wholesale ACQ</th>
                <th className="py-3 px-4 font-bold text-right">Dispense Fee</th>
                <th className="py-3 px-4 font-bold text-right">genericMed Offer Price</th>
                <th className="py-3 px-4 font-bold">Gross Margin Health</th>
                <th className="py-3 px-4 font-bold">Buy-Box &amp; Market Position</th>
                <th className="py-3 px-4 font-bold text-right">Stock</th>
                <th className="py-3 px-4 font-bold text-center">Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f4ff] text-[#0b1c30]">
              {filteredCatalog.map((item) => (
                <tr key={item.id} className="hover:bg-[#eff4ff]/60 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="font-title font-bold text-xs text-[#001729]">{item.genericName}</span>
                        <span className="px-1.5 py-0.2 rounded bg-[#eff4ff] font-mono text-[10px] text-[#43474d] font-medium border border-[#dce9ff]">
                          {item.formulation}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[#73777d]">
                        <span>equiv. to <em>{item.brandName}</em></span>
                        <span className="text-[#c3c7cd]">•</span>
                        <span className="font-mono text-[#006a61]">NDC: {item.ndc}</span>
                        <span className="px-1 py-0.2 rounded bg-[#86f2e4] text-[#006f66] font-mono text-[9px] font-bold">
                          {item.orangeBookRating}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-right font-mono">
                    <span className="font-bold text-[#001729]">${item.wholesaleAcq.toFixed(2)}</span>
                  </td>

                  <td className="py-3 px-4 text-right font-mono text-[#43474d]">
                    ${item.dispenseFee.toFixed(2)}
                  </td>

                  <td className="py-3 px-4 text-right">
                    <span className="font-display font-bold text-sm text-[#001729] font-mono">${item.offerPrice.toFixed(2)}</span>
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        <span className="font-mono font-bold text-[#006a61]">{item.grossMarginPercent.toFixed(1)}% GM</span>
                      </div>
                      <div className="w-20 bg-[#dce9ff] h-1.5 rounded-full overflow-hidden mt-1">
                        <div className="bg-[#006a61] h-full rounded-full" style={{ width: `${Math.min(item.grossMarginPercent * 1.5, 100)}%` }}></div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    {item.buyBoxStatus === 'winner' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#86f2e4] text-[#006f66] text-[10px] font-bold">
                        ★ Buy-Box Winner
                      </span>
                    )}
                    {item.buyBoxStatus === 'matches' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#e5eeff] text-[#001729] text-[10px] font-semibold">
                        ✓ Matches Lowest
                      </span>
                    )}
                    {item.buyBoxStatus === 'verified-cold' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#dce9ff] text-[#006a61] text-[10px] font-bold">
                        <Thermometer className="w-3 h-3" /> Verified Cold Hub
                      </span>
                    )}
                    {item.buyBoxStatus === 'rank-2' && (
                      <span className="text-[10px] text-[#73777d] font-semibold">
                        Rank #2 (+$0.50)
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-4 text-right font-mono font-bold text-[#001729]">
                    {item.physicalStock}
                  </td>

                  <td className="py-3 px-4 text-center">
                    <button 
                      onClick={() => toggleItemActive(item.id)}
                      className={`w-8 h-4 rounded-full relative p-0.5 transition-colors focus:outline-none ${
                        item.isActive ? 'bg-[#006a61]' : 'bg-[#c3c7cd]'
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-full bg-white transition-transform ${item.isActive ? 'translate-x-4' : 'translate-x-0'}`} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Margin & Dynamic Pricing Simulator */}
      <div className="bg-white rounded-2xl p-5 border border-[#e5eeff] shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 mb-4 pb-3 border-b border-[#f0f4ff]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0f2c42] text-white flex items-center justify-center">
              <Calculator className="w-5 h-5 text-[#86f2e4]" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-[#001729]">
                Interactive Margin &amp; Dynamic Pricing Rule Simulator
              </h3>
              <p className="text-xs text-[#43474d]">
                Test real-time margin adjustments against wholesale acquisition cost-plus pricing algorithms before committing to live catalog broadcast.
              </p>
            </div>
          </div>

          <span className="px-2.5 py-1 rounded-lg bg-[#eff4ff] text-[#006a61] text-xs font-bold flex items-center gap-1 border border-[#dce9ff]">
            <ShieldCheck className="w-4 h-4" />
            NABP Rule Compliance: PASS
          </span>
        </div>

        {appliedNotification && (
          <div className="mb-4 p-3 bg-[#86f2e4] text-[#006f66] rounded-xl text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Simulated pricing rules applied and broadcasted across live genericMed nodes!</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          {/* Controls Column (7 Cols) */}
          <div className="lg:col-span-6 space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-[#001729] block mb-1">Wholesale Acquisition (ACQ)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 font-mono text-xs text-[#73777d]">$</span>
                  <input 
                    type="number"
                    step="0.10"
                    value={simAcq}
                    onChange={(e) => setSimAcq(parseFloat(e.target.value) || 0)}
                    className="w-full pl-7 pr-3 py-2 bg-[#eff4ff] rounded-xl font-mono text-xs font-bold text-[#001729] border border-[#dce9ff] focus:outline-none focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#001729] block mb-1">Dispensing Fee Baseline</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 font-mono text-xs text-[#73777d]">$</span>
                  <input 
                    type="number"
                    step="0.50"
                    value={simFee}
                    onChange={(e) => setSimFee(parseFloat(e.target.value) || 0)}
                    className="w-full pl-7 pr-3 py-2 bg-[#eff4ff] rounded-xl font-mono text-xs font-bold text-[#001729] border border-[#dce9ff] focus:outline-none focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Target Margin Slider */}
            <div className="p-3.5 rounded-xl bg-[#eff4ff] border border-[#dce9ff] space-y-2">
              <div className="flex items-center justify-between font-semibold">
                <span className="text-[#001729]">Target Margin %</span>
                <span className="font-mono text-[#006a61] font-bold text-sm">{simMarginPercent.toFixed(1)}% Margin</span>
              </div>
              <input 
                type="range"
                min="20"
                max="65"
                step="0.5"
                value={simMarginPercent}
                onChange={(e) => setSimMarginPercent(parseFloat(e.target.value))}
                className="w-full accent-[#006a61] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#73777d] font-mono">
                <span>20% Store Floor</span>
                <span>40% Benchmark</span>
                <span>65% Max Safe Limit</span>
              </div>
            </div>
          </div>

          {/* Results Column (5 Cols) */}
          <div className="lg:col-span-6 bg-[#eff4ff] p-4 rounded-2xl border border-[#dce9ff] space-y-3">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 bg-white rounded-xl shadow-xs border border-[#e5eeff]">
                <span className="text-[10px] text-[#73777d] font-bold uppercase block mb-0.5">Live Offer Price</span>
                <span className="font-display font-bold text-base text-[#001729] font-mono">${simulatedPrice.toFixed(2)}</span>
                <span className="text-[9px] font-mono text-[#73777d] block mt-0.5">${(simulatedPrice / 30).toFixed(2)}/tab</span>
              </div>

              <div className="p-2.5 bg-white rounded-xl shadow-xs border border-[#e5eeff]">
                <span className="text-[10px] text-[#73777d] font-bold uppercase block mb-0.5">Pharmacy Take</span>
                <span className="font-display font-bold text-base text-[#006a61] font-mono">${netPharmacyTake.toFixed(2)}</span>
                <span className="text-[9px] font-mono text-[#73777d] block mt-0.5">Excl. 4.2% platform</span>
              </div>

              <div className="p-2.5 bg-white rounded-xl shadow-xs border border-[#e5eeff]">
                <span className="text-[10px] text-[#73777d] font-bold uppercase block mb-0.5">Net Profit</span>
                <span className="font-display font-bold text-base text-[#006a61] font-mono">+${netProfit.toFixed(2)}</span>
                <span className="text-[9px] font-mono text-[#006a61] font-bold block mt-0.5">Safe Headroom</span>
              </div>
            </div>

            <button 
              onClick={handleApplySimulated}
              className="w-full py-2.5 bg-[#006a61] hover:bg-[#005049] text-white text-xs font-bold rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>Apply &amp; Broadcast Rule to Network</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
