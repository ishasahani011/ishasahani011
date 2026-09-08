import React, { useState } from 'react';
import { INITIAL_DISCREPANCIES } from '../../data/mockData';
import { WholesalerDiscrepancy } from '../../types';
import { 
  FileCheck, 
  AlertTriangle, 
  Percent, 
  CheckCircle2, 
  FileText, 
  Clock, 
  Gavel, 
  TrendingUp, 
  Receipt, 
  Building2, 
  DollarSign, 
  Download,
  Check,
  ShieldCheck
} from 'lucide-react';

export const InvoiceReconciliation: React.FC = () => {
  const [discrepancies, setDiscrepancies] = useState<WholesalerDiscrepancy[]>(INITIAL_DISCREPANCIES);
  const [activeFilter, setActiveFilter] = useState<'all' | 'disputes' | 'cleared'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleResolve = (invId: string, action: 'dispute' | 'credit') => {
    setDiscrepancies(prev => prev.map(d => {
      if (d.invoiceId === invId) {
        return { ...d, status: action === 'dispute' ? 'disputed' : 'credited' };
      }
      return d;
    }));
    showToast(action === 'dispute' ? `EDI 812 Formal Claim filed for ${invId}` : `Credit Memo accepted for ${invId}`);
  };

  return (
    <div className="flex flex-col w-full space-y-5 text-[#0b1c30]">
      {/* Header & Primary Action Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 font-mono text-xs uppercase text-[#73777d]">
            <span>Financial Settlements &amp; Audits</span>
            <span>/</span>
            <span className="text-[#006a61] font-bold">Wholesaler Reconciliation &amp; Rebates</span>
          </div>

          <div className="flex items-center gap-3 mt-1">
            <h1 className="font-display font-bold text-2xl text-[#001729] tracking-tight">
              Wholesaler Invoice Reconciliation &amp; Rebate Tracking
            </h1>
          </div>

          <p className="text-xs text-[#43474d] max-w-3xl mt-1 leading-relaxed">
            Automated three-way invoice matching (<strong className="font-mono text-[#001729]">EDI 850 PO</strong> vs <strong className="font-mono text-[#001729]">EDI 856 ASN</strong> vs <strong className="font-mono text-[#001729]">EDI 810 Invoice</strong>), contract price discrepancy audits, volume rebate tier accruals, and prompt-pay discount recovery.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button 
            onClick={() => showToast("3-Way auto-matching engine executed. 512 invoices cleared.")}
            className="px-3.5 py-2 bg-white hover:bg-[#eff4ff] text-[#001729] text-xs font-bold rounded-xl border border-[#dce9ff] shadow-xs flex items-center gap-1.5"
          >
            <FileCheck className="w-4 h-4 text-[#006a61]" />
            <span>Run 3-Way Auto-Match</span>
          </button>

          <button 
            onClick={() => showToast("Rebate summary CSV exported for CarePoint Express Q3.")}
            className="px-3.5 py-2 bg-white hover:bg-[#eff4ff] text-[#001729] text-xs font-bold rounded-xl border border-[#dce9ff] shadow-xs flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-[#73777d]" />
            <span>Export Rebate CSV</span>
          </button>

          <button 
            onClick={() => showToast("Dispute bundle of $4,892.40 packaged for McKesson & Cencora.")}
            className="px-3.5 py-2 bg-[#ba1a1a] hover:bg-[#93000a] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5"
          >
            <AlertTriangle className="w-4 h-4 text-white" />
            <span>Dispute Flagged ($4,892.40)</span>
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="p-3 bg-[#86f2e4] text-[#006f66] rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-[#e5eeff] shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold text-[#73777d] uppercase tracking-wider">Unreconciled Variance</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display font-bold text-2xl text-[#ba1a1a] font-mono">$4,892.40</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-[#ffdad6] text-[#ba1a1a] text-[10px] font-bold">
              Action Req
            </span>
          </div>
          <span className="text-[11px] text-[#43474d] mt-2">
            14 line item discrepancies • Overcharge risk flagged
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#e5eeff] shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold text-[#73777d] uppercase tracking-wider">Earned Q3 Rebate Accrual</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display font-bold text-2xl text-[#006a61] font-mono">$38,420.15</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-[#86f2e4] text-[#006f66] text-[10px] font-bold">
              Tier 2 (2.8%)
            </span>
          </div>
          <div className="space-y-1 mt-2">
            <div className="flex justify-between text-[11px] text-[#43474d]">
              <span>Step-Up Tier 3 ($45k target)</span>
              <span className="font-mono font-bold text-[#001729]">86%</span>
            </div>
            <div className="w-full bg-[#dce9ff] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#006a61] h-full rounded-full" style={{ width: '86%' }}></div>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#e5eeff] shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold text-[#73777d] uppercase tracking-wider">3-Way Match Rate</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display font-bold text-2xl text-[#001729] font-mono">98.1%</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-[#eff4ff] text-[#006a61] text-[10px] font-bold">
              EDI 810 Live
            </span>
          </div>
          <span className="text-[11px] text-[#43474d] mt-2">
            512 of 522 invoices cleanly cleared • 10 On Hold
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#e5eeff] shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold text-[#73777d] uppercase tracking-wider">Prompt-Pay Captured</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display font-bold text-2xl text-[#001729] font-mono">$9,150.80</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-[#86f2e4] text-[#006f66] text-[10px] font-bold">
              100% Captured
            </span>
          </div>
          <span className="text-[11px] text-[#006a61] font-semibold mt-2">
            $0 early discounts forfeited • Next: McKesson in 38h
          </span>
        </div>
      </div>

      {/* Discrepancy Table */}
      <div className="bg-white rounded-2xl border border-[#e5eeff] shadow-xs overflow-hidden">
        <div className="p-3.5 bg-[#eff4ff] border-b border-[#e5eeff] flex justify-between items-center text-xs">
          <span className="font-title font-bold text-sm text-[#001729]">Active Discrepancy &amp; Invoice Variance Queue</span>
          <span className="font-mono text-[#ba1a1a] font-bold">14 Lines Flagged</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#f8f9ff] text-[#73777d] font-mono text-[10px] uppercase tracking-wider border-b border-[#e5eeff]">
                <th className="py-2.5 px-3 font-bold">Invoice &amp; PO</th>
                <th className="py-2.5 px-3 font-bold">Medication &amp; NDC</th>
                <th className="py-2.5 px-3 font-bold text-right">Billed vs Recv</th>
                <th className="py-2.5 px-3 font-bold text-right">Contract vs Billed</th>
                <th className="py-2.5 px-3 font-bold text-right">Variance Ext.</th>
                <th className="py-2.5 px-3 font-bold">Diagnostics</th>
                <th className="py-2.5 px-3 font-bold text-right">Protocol Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f4ff]">
              {discrepancies.map((d) => (
                <tr key={d.invoiceId} className="hover:bg-[#eff4ff]/60 transition-colors">
                  <td className="py-3 px-3">
                    <span className="font-mono font-bold text-[#001729] block">{d.invoiceId}</span>
                    <span className="font-mono text-[10px] text-[#73777d]">{d.poNumber}</span>
                    <span className="text-[10px] text-[#006a61] font-medium block mt-0.5">{d.wholesaler}</span>
                  </td>

                  <td className="py-3 px-3">
                    <span className="font-title font-bold text-xs text-[#001729] block">{d.drugName}</span>
                    <span className="font-mono text-[10px] text-[#73777d]">NDC: {d.ndc}</span>
                  </td>

                  <td className="py-3 px-3 text-right font-mono">
                    <span className="font-bold text-[#001729]">{d.billedQty} billed</span> / <span className="text-[#006a61]">{d.receivedQty} recv</span>
                  </td>

                  <td className="py-3 px-3 text-right font-mono">
                    <span className="text-[#73777d]">${d.basePrice.toFixed(2)}</span> → <span className="font-bold text-[#ba1a1a]">${d.billedPrice.toFixed(2)}</span>
                  </td>

                  <td className="py-3 px-3 text-right">
                    <span className="font-mono font-bold text-sm text-[#ba1a1a] block font-mono">
                      +${d.varianceTotal.toFixed(2)}
                    </span>
                    <span className="text-[9px] text-[#ba1a1a] font-bold uppercase">Overcharge</span>
                  </td>

                  <td className="py-3 px-3">
                    <span className="px-1.5 py-0.2 rounded bg-[#ffdad6] text-[#ba1a1a] font-mono text-[10px] font-bold">
                      {d.errorCode}
                    </span>
                    <p className="text-[11px] text-[#43474d] mt-1">{d.errorDescription}</p>
                  </td>

                  <td className="py-3 px-3 text-right">
                    <div className="flex flex-col items-end gap-1">
                      <button 
                        onClick={() => handleResolve(d.invoiceId, 'dispute')}
                        className="px-2.5 py-1 bg-[#001729] hover:bg-[#0f2c42] text-white rounded-lg text-xs font-bold transition-colors"
                      >
                        {d.status === 'disputed' ? 'Disputed ✓' : 'File EDI 812 Claim'}
                      </button>
                      <button 
                        onClick={() => handleResolve(d.invoiceId, 'credit')}
                        className="text-[10px] text-[#006a61] hover:underline font-semibold"
                      >
                        Accept Credit Memo
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2-Column Lower Audit & Optimization Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Wholesaler Volume Rebate Tiers (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-4 border border-[#e5eeff] shadow-xs space-y-3 text-xs">
          <div className="flex justify-between items-center pb-2 border-b border-[#f0f4ff]">
            <span className="font-title font-bold text-sm text-[#001729]">Wholesaler Volume Rebate Tiers &amp; PVA Matrix</span>
            <span className="text-[10px] font-mono text-[#006a61]">Q3 Day 76 / 90</span>
          </div>

          <div className="space-y-3">
            {/* McKesson Card */}
            <div className="p-3 rounded-xl bg-[#eff4ff] border border-[#dce9ff] space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-title font-bold text-[#001729]">McKesson Connect • Prime Generic Agreement</span>
                  <p className="text-[11px] text-[#73777d]">PVA-MCK-99201-US • Tier 2 Active (2.80%)</p>
                </div>
                <span className="font-mono font-bold text-sm text-[#006a61]">$3,990.00 MTD</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span>Eligible: $142,500 / $160,000 Step-Up</span>
                  <span className="font-mono text-[#006a61] font-bold">89%</span>
                </div>
                <div className="w-full bg-[#dce9ff] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#006a61] h-full rounded-full" style={{ width: '89%' }}></div>
                </div>
              </div>
            </div>

            {/* Amerisource Card */}
            <div className="p-3 rounded-xl bg-[#eff4ff] border border-[#dce9ff] space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-title font-bold text-[#001729]">AmerisourceBergen / Cencora • Specialty Hub</span>
                  <p className="text-[11px] text-[#73777d]">PVA-CEN-44109-BIO • Cold-Chain 3.10%</p>
                </div>
                <span className="font-mono font-bold text-sm text-[#006a61]">$2,678.40 MTD</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span>Eligible: $86,400 / $100,000 Specialty Cap</span>
                  <span className="font-mono text-[#006a61] font-bold">86.4%</span>
                </div>
                <div className="w-full bg-[#dce9ff] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#006a61] h-full rounded-full" style={{ width: '86.4%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* EDI 812 Credit Memo Ledger & Attestation (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-4 border border-[#e5eeff] shadow-xs space-y-3.5 text-xs">
          <div className="flex justify-between items-center pb-2 border-b border-[#f0f4ff]">
            <span className="font-title font-bold text-sm text-[#001729]">EDI 812 Credit Memo Ledger</span>
            <span className="font-mono text-[10px] text-[#006a61]">3 Pending</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 bg-[#eff4ff] rounded-xl border border-[#dce9ff] space-y-1">
              <div className="flex justify-between font-bold text-[#001729]">
                <span>CLM-8921 • McKesson</span>
                <span className="font-mono text-[#ba1a1a]">$750.00</span>
              </div>
              <p className="text-[11px] text-[#43474d]">Atorvastatin Calcium price creep over PVA schedule.</p>
              <span className="text-[10px] text-[#006a61] font-semibold block">EDI 824 Accepted • Wholesaler Review In Progress</span>
            </div>

            <div className="p-2.5 bg-[#eff4ff] rounded-xl border border-[#dce9ff] space-y-1">
              <div className="flex justify-between font-bold text-[#001729]">
                <span>CLM-8894 • Amerisource</span>
                <span className="font-mono text-[#006a61]">$1,240.00</span>
              </div>
              <p className="text-[11px] text-[#43474d]">Cold-chain temperature excursion write-off credit.</p>
              <span className="text-[10px] text-[#006a61] font-semibold block">Approved • Credit Memo #CM-90192 Issued</span>
            </div>
          </div>

          {/* Pharmacist Attestation Statement */}
          <div className="p-3 bg-[#001729] text-white rounded-xl space-y-2 shadow-xs">
            <div className="flex items-center gap-1.5 font-bold text-white">
              <ShieldCheck className="w-4 h-4 text-[#89f5e7]" />
              <span>Digital Pharmacist Audit Attestation</span>
            </div>
            <p className="text-[10px] text-gray-300 italic leading-tight">
              “I hereby certify that reconciliation variance claims and rebate accruals comply with the Prime Vendor Agreement and active NCPDP standards.”
            </p>
            <div className="flex justify-between items-center pt-1 border-t border-[#0f2c42] text-[11px]">
              <span className="font-semibold text-white">Dr. Marcus Vance, PharmD</span>
              <button 
                onClick={() => showToast("PVA Reconciliation Audit PDF generated with digital cryptographic hash.")}
                className="px-2 py-1 rounded bg-[#006a61] text-white text-[10px] font-bold"
              >
                Generate PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
