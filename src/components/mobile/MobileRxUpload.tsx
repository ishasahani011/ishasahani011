import React, { useState } from 'react';
import { BRAND_LOGO_URL, IMAGES } from '../../data/mockData';
import { MedicineOffer } from '../../types';
import { 
  ArrowLeft, 
  Lock, 
  UploadCloud, 
  Camera, 
  FolderOpen, 
  CheckCircle2, 
  FileText, 
  Edit3, 
  Send, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  Stethoscope,
  Building,
  Check
} from 'lucide-react';

interface MobileRxUploadProps {
  selectedOffer: MedicineOffer;
  dosage: string;
  durationDays: number;
  onBack: () => void;
  onProceedToTracking: () => void;
}

export const MobileRxUpload: React.FC<MobileRxUploadProps> = ({
  selectedOffer,
  dosage,
  durationDays,
  onBack,
  onProceedToTracking
}) => {
  const [activeMethod, setActiveMethod] = useState<'upload' | 'transfer'>('upload');
  const [doctorName, setDoctorName] = useState('Dr. Rachel Henderson, Metro Clinic');
  const [doctorPhone, setDoctorPhone] = useState('(555) 019-2834');
  const [submitting, setSubmitting] = useState(false);
  const [transferSubmitted, setTransferSubmitted] = useState(false);

  const handleConfirm = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onProceedToTracking();
    }, 600);
  };

  return (
    <div className="flex flex-col w-full pb-20 text-[#0b1c30] bg-[#f8f9ff]">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-[#f8f9ff]/90 backdrop-blur-xl border-b border-[#e5eeff] px-4 py-2.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <button 
            onClick={onBack}
            className="w-8 h-8 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#001729] active:bg-[#dce9ff] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <img 
            src={BRAND_LOGO_URL} 
            alt="genericMed" 
            className="h-7 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col leading-none">
            <span className="font-display font-bold text-sm text-[#001729]">genericMed</span>
            <span className="text-[10px] text-[#43474d] font-medium">Rx Verification</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[11px] font-semibold text-[#006f66] bg-[#86f2e4] px-2 py-0.5 rounded-full">
          <Lock className="w-3 h-3" />
          <span>HIPAA Safe</span>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {/* Stepper Bar & Security Pill */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[10px] font-mono text-[#73777d] uppercase tracking-wider">Step 2 of 3</span>
            <span className="text-[11px] font-medium text-[#006a61] flex items-center gap-1">
              <Lock className="w-3 h-3" /> 256-Bit SSL • Encrypted
            </span>
          </div>

          <div className="flex items-center gap-1.5 w-full">
            <div className="h-1.5 rounded-full bg-[#006a61] flex-1"></div>
            <div className="h-1.5 rounded-full bg-[#006a61] flex-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
            <div className="h-1.5 rounded-full bg-[#dce9ff] flex-1"></div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#73777d]">
            <span className="text-[#006a61] font-medium">1. Offer Chosen</span>
            <span className="text-[#001729] font-bold">2. Rx Verification</span>
            <span>3. Fast Checkout</span>
          </div>
        </div>

        {/* Order Clinical Context Card */}
        <div className="rounded-2xl bg-white border border-[#e5eeff] p-4 shadow-xs relative overflow-hidden">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="px-2 py-0.5 rounded-md bg-[#eff4ff] text-[#001729] text-[10px] font-bold uppercase">
                  Rx Mandatory
                </span>
                <span className="px-2 py-0.5 rounded-md bg-[#86f2e4] text-[#006f66] text-[10px] font-bold">
                  Save $125.20
                </span>
              </div>
              <h2 className="font-display font-bold text-sm text-[#001729] truncate">
                Atorvastatin Calcium {dosage}
              </h2>
              <p className="text-xs text-[#43474d]">{durationDays} Tablets • Generic equivalent to Lipitor®</p>
            </div>

            <div className="w-10 h-10 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#006a61] shrink-0 border border-[#dce9ff]">
              <FileText className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-3 pt-2.5 bg-[#eff4ff] rounded-xl p-3 flex items-center justify-between border border-[#e5eeff]">
            <div className="flex items-center gap-2 min-w-0">
              <CheckCircle2 className="w-4 h-4 text-[#006a61] shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="font-title font-bold text-xs text-[#001729] truncate">
                  {selectedOffer.pharmacyName}
                </span>
                <span className="text-[10px] text-[#43474d]">Fulfillment Partner • NABP #49210</span>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="font-mono font-bold text-sm text-[#001729]">${selectedOffer.price.toFixed(2)}</span>
              <span className="block font-mono text-[10px] text-[#73777d] line-through">$142.00</span>
            </div>
          </div>
        </div>

        {/* Verification Method Toggle Tabs */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-[#dce9ff] rounded-xl">
          <button
            onClick={() => setActiveMethod('upload')}
            className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeMethod === 'upload'
                ? 'bg-white text-[#001729] shadow-xs'
                : 'text-[#43474d] hover:text-[#001729]'
            }`}
          >
            <UploadCloud className="w-4 h-4 text-[#006a61]" />
            <span>Upload Script</span>
          </button>

          <button
            onClick={() => setActiveMethod('transfer')}
            className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeMethod === 'transfer'
                ? 'bg-white text-[#001729] shadow-xs'
                : 'text-[#43474d] hover:text-[#001729]'
            }`}
          >
            <Stethoscope className="w-4 h-4 text-[#006a61]" />
            <span>Clinic Transfer</span>
          </button>
        </div>

        {activeMethod === 'upload' ? (
          <div className="flex flex-col gap-4">
            {/* Upload Dropzone */}
            <div className="rounded-2xl bg-white border-2 border-dashed border-[#c3c7cd] p-4 flex flex-col items-center text-center shadow-xs">
              <div className="w-12 h-12 rounded-full bg-[#86f2e4]/40 flex items-center justify-center text-[#006a61] mb-2">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-sm text-[#001729]">Snap or Upload Prescription</h3>
              <p className="text-xs text-[#43474d] max-w-xs mt-1 mb-3">
                Take a direct photo of your physical paper script or attach an exported PDF from your clinic portal.
              </p>

              <div className="flex items-center gap-2 w-full max-w-xs">
                <button 
                  onClick={() => alert("Simulating Camera capture... Rx image selected!")}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#001729] text-white text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
                >
                  <Camera className="w-3.5 h-3.5 text-[#86f2e4]" />
                  <span>Take Photo</span>
                </button>
                <button 
                  onClick={() => alert("Simulating File selection: rx_dr_henderson_clinic.jpg attached!")}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#eff4ff] text-[#001729] text-xs font-bold flex items-center justify-center gap-1.5 border border-[#dce9ff] active:bg-[#dce9ff]"
                >
                  <FolderOpen className="w-3.5 h-3.5 text-[#006a61]" />
                  <span>Browse File</span>
                </button>
              </div>

              {/* Regulatory Checklist Chips */}
              <div className="w-full mt-3 pt-3 border-t border-[#f0f4ff] flex flex-wrap items-center justify-center gap-1.5 text-left">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#eff4ff] text-[#43474d] text-[10px] font-medium">
                  <Check className="w-3 h-3 text-[#006a61]" /> MD Signature
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#eff4ff] text-[#43474d] text-[10px] font-medium">
                  <Check className="w-3 h-3 text-[#006a61]" /> Patient Name &amp; DOB
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#eff4ff] text-[#43474d] text-[10px] font-medium">
                  <Check className="w-3 h-3 text-[#006a61]" /> Dosage/Refills
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#eff4ff] text-[#43474d] text-[10px] font-medium">
                  <Check className="w-3 h-3 text-[#006a61]" /> Active Issue Date
                </span>
              </div>
            </div>

            {/* Live OCR Extracted Document & Parsed Ledger */}
            <div className="rounded-2xl bg-white border border-[#e5eeff] p-4 shadow-xs flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#006a61] animate-pulse"></span>
                  <span className="font-title font-bold text-xs text-[#001729]">Smart OCR Auto-Extracted</span>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-[#86f2e4] text-[#006f66] font-bold text-[10px]">
                  100% Bioequivalent
                </span>
              </div>

              {/* Document Preview Slip Card */}
              <div className="rounded-xl bg-[#eff4ff] p-3 flex items-center justify-between gap-3 border border-[#dce9ff]">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-11 h-13 rounded-lg bg-white flex flex-col items-center justify-center border border-[#c3c7cd] overflow-hidden shrink-0 relative shadow-xs">
                    <FileText className="w-5 h-5 text-[#006a61]" />
                    <span className="font-mono text-[8px] text-[#73777d] font-bold">JPG</span>
                    <div className="absolute bottom-0 inset-x-0 h-1 bg-[#006a61]"></div>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="font-title font-bold text-xs text-[#001729] truncate">
                        rx_dr_henderson_clinic.jpg
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#006a61]" />
                    </div>
                    <span className="font-mono text-[10px] text-[#73777d]">2.4 MB • Scanned 1m ago</span>
                    <span className="text-[10px] text-[#006a61] font-semibold mt-0.5">
                      Automated Pre-Screen Passed
                    </span>
                  </div>
                </div>
                <button className="w-7 h-7 rounded-lg bg-white border border-[#dce9ff] flex items-center justify-center text-[#001729] hover:bg-[#eff4ff]">
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Structured Ledger Fields Verified */}
              <div className="flex flex-col gap-1.5 bg-[#eff4ff]/60 rounded-xl p-3 text-xs">
                <div className="flex items-start justify-between py-1 border-b border-[#e5eeff]/60">
                  <span className="text-[#43474d]">Patient Name</span>
                  <div className="text-right">
                    <span className="font-title font-bold text-[#001729]">Alex Morgan</span>
                    <span className="block text-[10px] text-[#006a61] font-semibold">✓ Verified Profile Match</span>
                  </div>
                </div>

                <div className="flex items-start justify-between py-1 border-b border-[#e5eeff]/60">
                  <span className="text-[#43474d]">Prescribing MD</span>
                  <div className="text-right">
                    <span className="font-title font-bold text-[#001729]">Dr. Rachel Henderson, MD</span>
                    <span className="block font-mono text-[10px] text-[#43474d]">NPI: 1849204912 (Active DEA)</span>
                  </div>
                </div>

                <div className="flex items-start justify-between py-1 border-b border-[#e5eeff]/60">
                  <span className="text-[#43474d]">Script Details</span>
                  <div className="text-right">
                    <span className="font-title font-bold text-[#001729]">Lipitor (Atorvastatin) {dosage}</span>
                    <span className="block text-[10px] text-[#43474d]">Qty: {durationDays} • Take 1 Daily • 3 Refills</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[#43474d]">Substitution Status</span>
                  <span className="text-[11px] font-bold text-[#006a61] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Generic Substitution Allowed
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl bg-white border border-[#e5eeff] p-4 shadow-xs flex flex-col gap-3">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-xl bg-[#eff4ff] text-[#006a61] flex items-center justify-center">
                <Building className="w-5 h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <h3 className="font-display font-bold text-sm text-[#001729]">Transfer Prescription</h3>
                <p className="text-xs text-[#43474d]">We contact your doctor or pharmacy directly.</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-[#001729]">Doctor or Clinic Name</label>
                <input 
                  type="text" 
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  className="p-2.5 rounded-xl bg-[#eff4ff] text-[#0b1c30] border border-[#dce9ff] focus:outline-none focus:bg-white"
                  placeholder="e.g. Metro Health, Dr. Henderson"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-semibold text-[#001729]">Clinic Phone or City / State</label>
                <input 
                  type="text" 
                  value={doctorPhone}
                  onChange={(e) => setDoctorPhone(e.target.value)}
                  className="p-2.5 rounded-xl bg-[#eff4ff] text-[#0b1c30] border border-[#dce9ff] focus:outline-none focus:bg-white"
                  placeholder="(555) 019-2834 or Boston, MA"
                />
              </div>

              <button 
                onClick={() => setTransferSubmitted(true)}
                className="w-full py-2.5 rounded-xl bg-[#006a61] hover:bg-[#005049] text-white font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{transferSubmitted ? '✓ Transfer Request Queued' : 'Submit Direct Rx Request'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Pharmacist Clinical SLA & Duty Indicator */}
        <div className="rounded-2xl bg-white border border-[#e5eeff] p-4 shadow-xs flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#001729]">
              <Clock className="w-4 h-4 text-[#006a61]" />
              <span>Est. Review Time: ~2 Minutes</span>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-[#86f2e4] text-[#006f66] text-[10px] font-bold">
              Live Queue: Normal
            </span>
          </div>

          <div className="flex items-center gap-3 pt-2 border-t border-[#f0f4ff]">
            <div className="w-9 h-9 rounded-full bg-[#eff4ff] border border-[#dce9ff] flex items-center justify-center text-[#001729] font-bold text-xs shrink-0 relative">
              MV
              <span className="w-2.5 h-2.5 rounded-full bg-[#006a61] border-2 border-white absolute bottom-0 right-0"></span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-title font-bold text-xs text-[#001729] truncate">Dr. Marcus Vance, PharmD</span>
              <span className="text-[11px] text-[#43474d]">Licensed Dispensing Pharmacist on Duty</span>
            </div>
          </div>
        </div>

        {/* Action Bar / Confirm & Proceed */}
        <div className="flex flex-col gap-2 pt-2">
          <button 
            onClick={handleConfirm}
            disabled={submitting}
            className="w-full h-12 rounded-xl bg-[#001729] hover:bg-[#0f2c42] text-white font-title text-sm font-bold flex items-center justify-center gap-2 shadow-md active:scale-[0.99] transition-all"
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Authorizing Prescription...
              </span>
            ) : (
              <>
                <span>Confirm &amp; Proceed to Tracking</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
          <p className="text-[11px] text-center text-[#73777d]">
            Card is authorized upon pharmacist check. Free courier dispatched automatically.
          </p>
        </div>
      </div>
    </div>
  );
};
