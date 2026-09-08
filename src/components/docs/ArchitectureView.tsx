import React from 'react';
import { 
  Layers, 
  ShieldCheck, 
  Smartphone, 
  Building2, 
  Workflow, 
  Server, 
  Lock, 
  FileText, 
  CheckCircle2, 
  ArrowRight,
  Database,
  Cpu
} from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  return (
    <div className="w-full bg-[#eff4ff] min-h-[calc(100vh-3.5rem)] p-4 sm:p-8 overflow-y-auto text-[#0b1c30]">
      <div className="max-w-5xl mx-auto space-y-8 pb-16">
        {/* Architecture Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#dce9ff] shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#86f2e4] text-[#006f66] font-mono text-xs font-bold">
              PRD &amp; SYSTEM ARCHITECTURE SPECIFICATION
            </span>
            <span className="text-xs text-[#73777d]">v2.4 Production Standard</span>
          </div>

          <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#001729] tracking-tight">
            genericMed Unified Architecture &amp; Clinical Regulatory Framework
          </h1>

          <p className="text-xs sm:text-sm text-[#43474d] leading-relaxed">
            genericMed bridges transparent consumer prescription price comparison and frictionless digital onboarding with an enterprise, high-throughput pharmacy fulfillment backoffice engineered to meet strict FDA Orange Book AB substitution, DEA Title 21 CFR § 1311 CSOS, and DSCSA EPCIS serialization mandates.
          </p>
        </div>

        {/* 3-Tier Architectural Hierarchy */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Tier 1 */}
          <div className="bg-white rounded-2xl p-5 border border-[#e5eeff] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#001729] text-white flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-[#86f2e4]" />
            </div>
            <h3 className="font-title font-bold text-sm text-[#001729]">
              Tier 1: Patient Digital Front Door
            </h3>
            <p className="text-xs text-[#43474d] leading-relaxed">
              Consumer mobile application designed with native touch ergonomics, dynamic price sliders, instant savings meters, camera/PDF prescription OCR extraction, and real-time IoT courier shipment tracking.
            </p>
            <ul className="text-xs space-y-1.5 text-[#006a61] font-semibold pt-1">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#006a61]" />
                <span>Screen 1: Price Compare &amp; Buy-Box</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#006a61]" />
                <span>Screen 2: Rx Upload &amp; OCR Engine</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#006a61]" />
                <span>Screen 3: Live Cold-Chain GPS Tracking</span>
              </li>
            </ul>
          </div>

          {/* Tier 2 */}
          <div className="bg-white rounded-2xl p-5 border border-[#e5eeff] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#0f2c42] text-white flex items-center justify-center">
              <Building2 className="w-5 h-5 text-[#86f2e4]" />
            </div>
            <h3 className="font-title font-bold text-sm text-[#001729]">
              Tier 2: CarePoint Partner Station
            </h3>
            <p className="text-xs text-[#43474d] leading-relaxed">
              High-velocity operational workstation for licensed retail and compounding pharmacies. Powers 4-stage kanban fulfillment, pill-counting computer vision, and wholesale restock.
            </p>
            <ul className="text-xs space-y-1.5 text-[#006a61] font-semibold pt-1">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#006a61]" />
                <span>Screen 5: Fulfillment Kanban Pipeline</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#006a61]" />
                <span>Screen 6: Catalog &amp; Dynamic Pricing</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#006a61]" />
                <span>Screen 7: EDI 850 Stock Replenishment</span>
              </li>
            </ul>
          </div>

          {/* Tier 3 */}
          <div className="bg-white rounded-2xl p-5 border border-[#e5eeff] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#006a61] text-white flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#89f5e7]" />
            </div>
            <h3 className="font-title font-bold text-sm text-[#001729]">
              Tier 3: Enterprise Settlement &amp; Compliance
            </h3>
            <p className="text-xs text-[#43474d] leading-relaxed">
              Automated financial reconciliation engine and cryptographic ledger ensuring zero diversion, complete 3-way invoice matching, and tamper-proof DEA audit trails.
            </p>
            <ul className="text-xs space-y-1.5 text-[#006a61] font-semibold pt-1">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#006a61]" />
                <span>Screen 8: Par &amp; Reorder Policy Engine</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#006a61]" />
                <span>Screen 9: 3-Way Match &amp; Rebate Accruals</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#006a61]" />
                <span>Screen 10: DEA Title 21 CFR § 1311 Log</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory Standards Compliance Matrix */}
        <div className="bg-white rounded-2xl p-6 border border-[#e5eeff] shadow-xs space-y-4">
          <h2 className="font-display font-bold text-lg text-[#001729]">
            Regulatory &amp; Technical Standards Enforced
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-[#eff4ff] border border-[#dce9ff]">
              <span className="font-title font-bold text-[#001729] block">FDA Orange Book Therapeutic Equivalence</span>
              <p className="text-[11px] text-[#43474d] mt-1">
                Strict AB-rating parity algorithms prevent unapproved generic substitution. Evaluates bioequivalence ratings (AB1, AB2, AP, AA) in real time before presenting offers to consumers.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#eff4ff] border border-[#dce9ff]">
              <span className="font-title font-bold text-[#001729] block">DEA Title 21 CFR § 1311 (EPCS / CSOS)</span>
              <p className="text-[11px] text-[#43474d] mt-1">
                Enforces two-factor authentication, cryptographic hardware tokens, and SHA-256 digital signature chains for electronic Schedule II-V controlled substance orders.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#eff4ff] border border-[#dce9ff]">
              <span className="font-title font-bold text-[#001729] block">FDA DSCSA Title II Track-and-Trace</span>
              <p className="text-[11px] text-[#43474d] mt-1">
                Full unit-level 2D DataMatrix barcode verification and EPCIS T3 transaction information logging from manufacturer lot to dispenser receipt.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#eff4ff] border border-[#dce9ff]">
              <span className="font-title font-bold text-[#001729] block">ANSI ASC X12 EDI Healthcare Suite</span>
              <p className="text-[11px] text-[#43474d] mt-1">
                Standardized interchange protocols including EDI 850 (Purchase Order), EDI 856 (Advance Ship Notice), EDI 810 (Invoice), and EDI 812 (Credit/Debit Adjustment).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
