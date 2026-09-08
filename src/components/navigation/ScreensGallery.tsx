import React from 'react';
import { ViewMode, PharmacyTab } from '../../types';
import { 
  Smartphone, 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Layers, 
  Sliders, 
  Receipt, 
  FileText, 
  Workflow, 
  Truck, 
  Boxes 
} from 'lucide-react';

interface ScreensGalleryProps {
  onSelectMobileScreen: (screen: 'compare' | 'rx-upload' | 'order-tracking' | 'auth') => void;
  onSelectPharmacyScreen: (tab: PharmacyTab) => void;
}

export const ScreensGallery: React.FC<ScreensGalleryProps> = ({
  onSelectMobileScreen,
  onSelectPharmacyScreen
}) => {
  const patientScreens = [
    {
      id: 'compare' as const,
      title: 'Mobile Price Compare & Buy-Box Marketplace',
      screenNum: 'Screen 1',
      description: 'Interactive dosage (10mg/20mg/40mg) and duration selectors (30d/60d/90d), generic savings meter ($132.80 saved), brand vs generic comparison, and local pharmacy offer cards.',
      tags: ['Patient App', 'Buy-Box', 'Savings Radar', 'Orange Book AB'],
      badge: 'Best Value'
    },
    {
      id: 'rx-upload' as const,
      title: 'Rx Prescription Upload & OCR Verification',
      screenNum: 'Screen 2',
      description: 'Camera scanner & PDF upload, Rx transfer from major chains (Walgreens, CVS), OCR field extraction with confidence scores (99.8%), and prescriber lookup.',
      tags: ['Patient App', 'Vision OCR', 'Prescriber Lookup', 'Transfer'],
      badge: 'Interactive Scan'
    },
    {
      id: 'order-tracking' as const,
      title: 'Live Cold-Chain & Courier Order Tracking',
      screenNum: 'Screen 3',
      description: 'Live interactive map view with GPS courier driver (Derrick Ramos), step progress tracker, real-time IoT cold-chain logger (41.2°F nominal), and tamper seal verification.',
      tags: ['Patient App', 'GPS Courier', 'Sensitech IoT', 'Tamper Seal'],
      badge: 'Real-Time'
    },
    {
      id: 'auth' as const,
      title: 'Patient Account, Login & Registration',
      screenNum: 'Screen 4',
      description: 'Patient authentication portal with email/password, new account registration (insurance carrier, member ID, Rx savings card enrollment), and quick demo persona switching.',
      tags: ['Patient App', 'Auth & Registration', 'Demo Personas', 'Rx Savings Card'],
      badge: 'Auth Portal'
    }
  ];

  const pharmacyScreens = [
    {
      tab: 'pipeline' as PharmacyTab,
      title: 'Order Fulfillment & Dispensing Pipeline',
      screenNum: 'Screen 5',
      description: 'Station 04 live kanban across Intake & Verification, Pill Dispense & Vision AI pill counter (30/30 count), Tamper Seal & Cold-Chain Pack, and Courier Manifest handoff.',
      tags: ['Station 04', 'Vision AI', 'Barcode Scan', '4-Stage Kanban'],
      badge: 'Live Operations'
    },
    {
      tab: 'auth' as PharmacyTab,
      title: 'Pharmacy Staff Credentials & Station Enrollment',
      screenNum: 'Screen 11',
      description: 'Pharmacist-in-Charge (PIC) & Technician authentication, DEA 21 CFR § 1311 CSOS cryptographic signing, and state board permit & cold-vault station registration.',
      tags: ['Station 04', 'Staff Auth & Reg', 'DEA CSOS Signing', 'NABP Accredited'],
      badge: 'Auth & Station Reg'
    },
    {
      tab: 'catalog' as PharmacyTab,
      title: 'Pharmacy Catalog & Dynamic Pricing Manager',
      screenNum: 'Screen 6',
      description: '1,482 active SKUs with wholesale acquisition, dispensing fees, live offer prices, gross margin health, and interactive dynamic pricing simulator with live sliders.',
      tags: ['Pricing Engine', 'Margin Sentinel', 'EDI 852', 'Buy-Box Status'],
      badge: 'Live Simulator'
    },
    {
      tab: 'stock-alerts' as PharmacyTab,
      title: 'Stock Level Alerts & Wholesaler Restock (EDI 850)',
      screenNum: 'Screen 7',
      description: 'High-density clinical restock radar with burn rate velocity, wholesaler route optimizer (McKesson/Amerisource/Cardinal), and DEA CSOS digital token signing.',
      tags: ['EDI 850', 'CSOS Digital Token', 'Wholesaler POs', 'Cold Vault'],
      badge: 'DEA CSOS'
    },
    {
      tab: 'par-rules' as PharmacyTab,
      title: 'Automated Par Level & Reorder Policy Engine',
      screenNum: 'Screen 8',
      description: 'Simulation mode dry-run switch, dynamic ambient par sliders, working capital caps, and specialty oncology & cold-chain biosimilar parity guardrails.',
      tags: ['Par Levels', 'Dry-Run Engine', 'Specialty Oncology', 'JIT Matches'],
      badge: 'Algorithmic'
    },
    {
      tab: 'reconciliation' as PharmacyTab,
      title: 'Wholesaler Invoice Reconciliation & Rebates',
      screenNum: 'Screen 9',
      description: 'Three-way match (EDI 850 vs 856 vs 810), contract price discrepancy dispute queue, volume rebate tier matrix ($38,420 earned), and EDI 812 credit memo ledger.',
      tags: ['3-Way Match', 'EDI 810/812', 'Volume Rebates', 'PVA Audits'],
      badge: '98.1% Matched'
    },
    {
      tab: 'dea-audit' as PharmacyTab,
      title: 'DEA & State Board Regulatory Audit Log (21 CFR § 1311)',
      screenNum: 'Screen 10',
      description: 'Cryptographically chained SHA-256 ledger for Schedule II-V controlled substances, DSCSA EPCIS track-and-trace, dual pharmacist sign-offs, and Inspector Redacted Mode.',
      tags: ['Title 21 CFR', 'SHA-256 Chain', 'HIPAA Redaction', 'CII Perpetual'],
      badge: 'Cryptographic'
    }
  ];

  return (
    <div className="w-full bg-[#eff4ff] min-h-[calc(100vh-3.5rem)] p-4 sm:p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-8 pb-16">
        {/* Gallery Intro Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#dce9ff] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006a61] animate-pulse"></span>
              <span className="font-mono text-xs uppercase font-bold tracking-wider text-[#006a61]">
                genericMed Unified Platform System
              </span>
            </div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#001729] tracking-tight">
              Interactive Screen Directory
            </h1>
            <p className="text-xs sm:text-sm text-[#43474d] max-w-2xl leading-relaxed">
              Explore the full genericMed ecosystem — from consumer-facing prescription price comparison and OCR intake to enterprise pharmacy station fulfillment, dynamic pricing, and DEA 21 CFR § 1311 compliance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button 
              onClick={() => onSelectMobileScreen('compare')}
              className="px-4 py-2.5 bg-[#001729] hover:bg-[#0f2c42] text-white text-xs font-bold rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all"
            >
              <Smartphone className="w-4 h-4 text-[#86f2e4]" />
              <span>Launch Mobile App</span>
            </button>

            <button 
              onClick={() => onSelectPharmacyScreen('pipeline')}
              className="px-4 py-2.5 bg-[#006a61] hover:bg-[#005049] text-white text-xs font-bold rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all"
            >
              <Building2 className="w-4 h-4 text-[#89f5e7]" />
              <span>Open Pharmacy Station</span>
            </button>
          </div>
        </div>

        {/* Section 1: Patient Mobile Screens */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#001729] text-white flex items-center justify-center">
              <Smartphone className="w-4 h-4 text-[#86f2e4]" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-[#001729]">
                Patient-Facing Mobile Experience
              </h2>
              <p className="text-xs text-[#73777d]">
                Designed with a native mobile smartphone shell, responsive gestures, and live interactive state.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {patientScreens.map((screen) => (
              <div 
                key={screen.id}
                onClick={() => onSelectMobileScreen(screen.id as any)}
                className="bg-white rounded-2xl p-5 border border-[#e5eeff] shadow-xs hover:shadow-md hover:border-[#006a61]/40 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-[#006a61] bg-[#eff4ff] px-2 py-0.5 rounded-md border border-[#dce9ff]">
                      {screen.screenNum}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#86f2e4] text-[#006f66]">
                      {screen.badge}
                    </span>
                  </div>

                  <h3 className="font-title font-bold text-sm text-[#001729] group-hover:text-[#006a61] transition-colors mb-1.5">
                    {screen.title}
                  </h3>

                  <p className="text-xs text-[#43474d] leading-relaxed mb-4">
                    {screen.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {screen.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#eff4ff] text-[#43474d]">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold text-[#006a61] group-hover:translate-x-1 transition-transform">
                    <span>Launch Screen</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Pharmacy Enterprise Screens */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#0f2c42] text-white flex items-center justify-center">
              <Building2 className="w-4 h-4 text-[#86f2e4]" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-[#001729]">
                CarePoint Express Pharmacy Hub (Station 04)
              </h2>
              <p className="text-xs text-[#73777d]">
                Enterprise clinical workflow suite compliant with NABP, DEA Title 21 CFR, and DSCSA regulations.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {pharmacyScreens.map((screen) => (
              <div 
                key={screen.tab}
                onClick={() => onSelectPharmacyScreen(screen.tab)}
                className="bg-white rounded-2xl p-5 border border-[#e5eeff] shadow-xs hover:shadow-md hover:border-[#006a61]/40 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-[#001729] bg-[#eff4ff] px-2 py-0.5 rounded-md border border-[#dce9ff]">
                      {screen.screenNum}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#86f2e4] text-[#006f66]">
                      {screen.badge}
                    </span>
                  </div>

                  <h3 className="font-title font-bold text-sm text-[#001729] group-hover:text-[#006a61] transition-colors mb-1.5">
                    {screen.title}
                  </h3>

                  <p className="text-xs text-[#43474d] leading-relaxed mb-4">
                    {screen.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {screen.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#eff4ff] text-[#43474d]">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold text-[#006a61] group-hover:translate-x-1 transition-transform">
                    <span>Open Station View</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
