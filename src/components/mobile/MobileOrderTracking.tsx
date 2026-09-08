import React, { useState } from 'react';
import { BRAND_LOGO_URL, IMAGES } from '../../data/mockData';
import { 
  ArrowLeft, 
  Share2, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  MapPin, 
  Building2, 
  Clock, 
  Check, 
  Truck, 
  Thermometer, 
  Star, 
  FileText, 
  HelpCircle, 
  ChevronRight,
  Headphones,
  CheckCircle2,
  Send
} from 'lucide-react';

interface MobileOrderTrackingProps {
  onBack: () => void;
  onNavigateHome?: () => void;
}

export const MobileOrderTracking: React.FC<MobileOrderTrackingProps> = ({
  onBack,
  onNavigateHome
}) => {
  const [contactless, setContactless] = useState(true);
  const [shared, setShared] = useState(false);
  const [callModal, setCallModal] = useState(false);
  const [chatModal, setChatModal] = useState(false);

  const handleShare = () => {
    setShared(true);
    navigator.clipboard?.writeText(window.location.href);
    setTimeout(() => setShared(false), 2200);
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
            <span className="text-[10px] text-[#43474d] font-medium">Order Detail</span>
          </div>
        </div>

        <button 
          onClick={handleShare}
          className="p-1.5 rounded-lg bg-[#eff4ff] text-[#006a61] flex items-center gap-1 text-xs font-semibold"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{shared ? 'Copied!' : 'Share'}</span>
        </button>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {/* Top ETA & Order Overview Banner */}
        <div className="w-full bg-white rounded-2xl p-4 shadow-xs border border-[#e5eeff]">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-1.5 font-mono text-xs text-[#43474d]">
              <span className="font-bold text-[#001729]">#GM-894120</span>
              <span>•</span>
              <span>Today, 2:15 PM</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#86f2e4] text-[#006f66] text-xs font-bold uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#006a61] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#006a61]"></span>
              </span>
              <span>In Transit</span>
            </div>
          </div>

          <div className="flex flex-col mb-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#73777d]">Estimated Arrival</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <h1 className="font-display font-bold text-2xl text-[#001729] tracking-tight">5:30 PM Today</h1>
              <span className="text-xs font-bold text-[#006a61]">(~26 mins left)</span>
            </div>
          </div>

          {/* Origin & Destination Strip */}
          <div className="bg-[#eff4ff] rounded-xl p-3 flex flex-col gap-2 border border-[#e5eeff]">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0 border border-[#dce9ff] text-[#006a61]">
                <Building2 className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-[#001729] truncate">CarePoint Express Pharmacy</p>
                <p className="text-[11px] text-[#43474d] truncate">Fulfillment Hub • 2.4 mi away</p>
              </div>
              <span className="font-mono text-[10px] text-[#73777d]">NABP #49210</span>
            </div>

            <div className="w-full flex items-center px-3">
              <div className="w-0.5 h-2.5 bg-[#c3c7cd] ml-2"></div>
            </div>

            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-6 h-6 rounded-full bg-[#86f2e4] flex items-center justify-center shrink-0 text-[#006f66]">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-[#001729] truncate">742 Evergreen Terrace</p>
                <p className="text-[11px] text-[#43474d] truncate">Apt 4B • Brooklyn, NY 11201</p>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white text-[#43474d] font-semibold border border-[#dce9ff]">
                Residential
              </span>
            </div>
          </div>
        </div>

        {/* Live GPS Route & Courier Card */}
        <div className="w-full bg-white rounded-2xl overflow-hidden shadow-xs border border-[#e5eeff]">
          {/* Map Viewport */}
          <div 
            className="relative w-full h-48 bg-[#dce9ff] bg-cover bg-center"
            style={{ backgroundImage: `url('${IMAGES.courierMap}')` }}
          >
            <div className="absolute inset-0 bg-[#001729]/10 pointer-events-none"></div>

            {/* Live Traffic Pill */}
            <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1.5 text-xs">
              <span className="w-2 h-2 rounded-full bg-[#006a61]"></span>
              <span className="text-[11px] font-bold text-[#001729]">Light Traffic • On Schedule</span>
            </div>

            {/* Temperature Telemetry Pill */}
            <div className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1 text-xs">
              <Thermometer className="w-3.5 h-3.5 text-[#006a61]" />
              <span className="font-mono text-[11px] font-bold text-[#001729]">68.4°F Safe</span>
            </div>

            {/* Courier Vehicle Marker */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="relative flex items-center justify-center">
                <span className="animate-ping absolute h-9 w-9 rounded-full bg-[#006a61] opacity-40"></span>
                <div className="w-8 h-8 rounded-full bg-[#001729] flex items-center justify-center text-white shadow-md">
                  <Truck className="w-4 h-4 text-[#89f5e7]" />
                </div>
              </div>
              <span className="mt-1 px-2 py-0.5 bg-[#001729] text-white font-mono text-[10px] font-bold rounded shadow-sm">
                Derrick (0.8 mi)
              </span>
            </div>
          </div>

          {/* Courier Identity & Contact Bar */}
          <div className="p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <img 
                  src={IMAGES.courierDerrick} 
                  alt="Derrick Ramos" 
                  className="w-12 h-12 rounded-full object-cover shrink-0 bg-[#eff4ff] border-2 border-white shadow-sm"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0 flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="font-title font-bold text-sm text-[#001729] truncate">Derrick Ramos</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#006a61]" />
                  </div>
                  <span className="text-xs text-[#43474d] truncate">Priority MedCourier Fleet</span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span className="font-mono text-xs font-bold text-[#001729]">4.9</span>
                    <span className="text-[10px] text-[#73777d]">2,840 Rx Deliveries</span>
                  </div>
                </div>
              </div>

              {/* Call & Message Buttons */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button 
                  onClick={() => setCallModal(true)}
                  className="w-9 h-9 rounded-full bg-[#eff4ff] hover:bg-[#dce9ff] text-[#001729] flex items-center justify-center transition-colors"
                  title="Call Courier"
                >
                  <Phone className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setChatModal(true)}
                  className="w-9 h-9 rounded-full bg-[#eff4ff] hover:bg-[#dce9ff] text-[#001729] flex items-center justify-center transition-colors"
                  title="Message Courier"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Contactless Preference Switch */}
            <div className="bg-[#eff4ff] rounded-xl p-3 flex items-center justify-between border border-[#e5eeff]">
              <div className="flex items-center gap-2 min-w-0">
                <ShieldCheck className="w-4 h-4 text-[#006a61] shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#001729]">Contactless Drop-off</p>
                  <p className="text-[11px] text-[#43474d]">Leave at apartment door if verified</p>
                </div>
              </div>

              <button
                onClick={() => setContactless(!contactless)}
                className={`w-10 h-6 rounded-full relative p-0.5 transition-colors focus:outline-none ${
                  contactless ? 'bg-[#006a61]' : 'bg-[#c3c7cd]'
                }`}
              >
                <div 
                  className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                    contactless ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* 5-Phase Clinical Fulfillment Tracker */}
        <div className="w-full bg-white rounded-2xl p-4 shadow-xs border border-[#e5eeff]">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display font-bold text-sm text-[#001729]">Chain-of-Custody Log</h2>
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-lg bg-[#86f2e4] text-[#006f66]">
              Phase 4 of 5
            </span>
          </div>

          <div className="relative pl-6 space-y-4">
            <div className="absolute left-2.5 top-2 bottom-3 w-0.5 bg-[#e5eeff]"></div>

            {/* Phase 1: Order Placed */}
            <div className="relative flex items-start gap-3">
              <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#006a61] text-white flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-1">
                  <span className="font-title font-bold text-xs text-[#001729]">Order Authorized &amp; Secured</span>
                  <span className="font-mono text-[10px] text-[#73777d]">2:15 PM</span>
                </div>
                <p className="text-[11px] text-[#43474d] mt-0.5">Insurance co-pay processed and verified via CarePoint B2B gateway.</p>
              </div>
            </div>

            {/* Phase 2: Pharmacist DEA Review */}
            <div className="relative flex items-start gap-3">
              <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#006a61] text-white flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-1">
                  <span className="font-title font-bold text-xs text-[#001729]">Clinical Rx Verification</span>
                  <span className="font-mono text-[10px] text-[#73777d]">2:21 PM</span>
                </div>
                <p className="text-[11px] text-[#43474d] mt-0.5">Reviewed by Dr. Marcus Vance, PharmD (License #PH-44810). Zero contraindications detected.</p>
              </div>
            </div>

            {/* Phase 3: Generic Dispensed & Sealed */}
            <div className="relative flex items-start gap-3">
              <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#006a61] text-white flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-1">
                  <span className="font-title font-bold text-xs text-[#001729]">Dispensed &amp; Tamper-Sealed</span>
                  <span className="font-mono text-[10px] text-[#73777d]">2:44 PM</span>
                </div>
                <div className="mt-1.5 p-2 rounded-lg bg-[#eff4ff] flex flex-col gap-1 font-mono text-[11px] text-[#43474d] border border-[#dce9ff]">
                  <span className="text-[#001729] font-bold">NDC 0093-2274-34</span>
                  <div className="flex justify-between">
                    <span>Lot: B-4921</span>
                    <span>Exp: 03/2028</span>
                    <span className="text-[#006a61] font-bold">Seal #GM-9912</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 4: Active Courier Delivery (Current) */}
            <div className="relative flex items-start gap-3">
              <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#001729] text-white flex items-center justify-center shrink-0 ring-4 ring-[#86f2e4]">
                <Truck className="w-3 h-3 text-[#86f2e4]" />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-1">
                  <span className="font-title font-bold text-xs text-[#001729]">Out for Courier Delivery</span>
                  <span className="font-mono text-[10px] text-[#006a61] font-bold uppercase">Active</span>
                </div>
                <p className="text-[11px] text-[#43474d] mt-0.5">In climate vehicle with carrier Derrick Ramos. Expected in ~26 minutes.</p>
              </div>
            </div>

            {/* Phase 5: Delivered & Signature Captured (Pending) */}
            <div className="relative flex items-start gap-3 opacity-50">
              <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#eff4ff] border border-[#c3c7cd] text-[#73777d] flex items-center justify-center shrink-0">
                <Clock className="w-3 h-3" />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-1">
                  <span className="font-title font-medium text-xs text-[#43474d]">Delivered &amp; Verification Check</span>
                  <span className="font-mono text-[10px] text-[#73777d]">Pending</span>
                </div>
                <p className="text-[11px] text-[#73777d] mt-0.5">Requires photographic confirmation of tamper seal or recipient sign-off.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Medication Details Card */}
        <div className="w-full bg-white rounded-2xl p-4 shadow-xs border border-[#e5eeff]">
          <h2 className="font-display font-bold text-sm text-[#001729] mb-3">Prescription Item in Transit</h2>
          <div className="flex items-start gap-3 mb-3">
            <img 
              src={IMAGES.pillBottleTransit} 
              alt="Atorvastatin Bottle" 
              className="w-16 h-16 rounded-xl object-cover bg-[#eff4ff] shrink-0 border border-[#dce9ff]"
              referrerPolicy="no-referrer"
            />
            <div className="min-w-0 flex-1">
              <h3 className="font-title font-bold text-sm text-[#001729] truncate">Atorvastatin Calcium</h3>
              <p className="text-xs text-[#43474d] truncate">Generic equivalent to Lipitor®</p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="px-2 py-0.5 rounded bg-[#eff4ff] text-[10px] font-bold text-[#001729]">20 mg Tablets</span>
                <span className="px-2 py-0.5 rounded bg-[#eff4ff] text-[10px] text-[#43474d]">30-Day Supply</span>
              </div>
            </div>
          </div>

          <div className="bg-[#eff4ff] rounded-xl p-3 flex items-center justify-between mb-3 border border-[#e5eeff]">
            <div>
              <span className="text-[10px] text-[#73777d] block font-semibold uppercase">Co-Pay Total</span>
              <span className="font-display font-bold text-base text-[#001729] font-mono">$16.80</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-[#006f66] font-bold bg-[#86f2e4] px-2 py-0.5 rounded-lg inline-flex items-center gap-1">
                Saved $125.20 vs Brand
              </span>
              <span className="font-mono text-[10px] text-[#43474d] block mt-1">0% Deductible Applied</span>
            </div>
          </div>

          <button 
            onClick={() => alert("Digital Rx Record PDF verified: NABP #49210 • CarePoint Express Dispense Record #DISP-99120")}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] text-[#001729] text-xs font-semibold transition-colors border border-[#dce9ff]"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#006a61]" />
              <span>View Dispense Record &amp; Digital Rx (PDF)</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#73777d]" />
          </button>
        </div>

        {/* Tamper Evident Safety Advisory */}
        <div className="w-full bg-[#eff4ff] rounded-2xl p-4 border border-[#dce9ff] flex flex-col gap-2.5">
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#001729] text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-[#86f2e4]" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-title font-bold text-xs text-[#001729]">Tamper-Evident Safety Protocol</h3>
              <p className="text-[11px] text-[#43474d] mt-1 leading-relaxed">
                Protected by dual holographic barrier seal (Lot #GM-9912). Do not accept delivery if the thermal indicator is compromised or outer seal is broken.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-3 flex items-center justify-between border border-[#dce9ff]">
            <div className="flex items-center gap-2 min-w-0">
              <Headphones className="w-4 h-4 text-[#006a61] shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#001729]">Pharmacist On-Call (24/7)</p>
                <p className="text-[11px] text-[#73777d]">Questions on dosages or side effects</p>
              </div>
            </div>
            <button 
              onClick={() => alert("Connecting to 24/7 on-call pharmacist Dr. Marcus Vance...")}
              className="px-3 py-1 bg-[#001729] text-white rounded-lg text-xs font-bold hover:bg-[#0f2c42]"
            >
              Call Clinic
            </button>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex gap-2 pt-1">
          <button 
            onClick={handleShare}
            className="flex-1 py-2.5 rounded-xl bg-white border border-[#dce9ff] text-[#001729] text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
          >
            <Share2 className="w-3.5 h-3.5 text-[#006a61]" />
            <span>{shared ? 'Link Copied!' : 'Share Live Tracking'}</span>
          </button>

          <button 
            onClick={() => alert("Delivery note added: 'Please leave with doorman at front desk.'")}
            className="flex-1 py-2.5 rounded-xl bg-[#001729] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-[#86f2e4]" />
            <span>Delivery Notes</span>
          </button>
        </div>
      </div>

      {/* Call Modal */}
      {callModal && (
        <div className="fixed inset-0 z-50 bg-[#001729]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-5 max-w-xs w-full shadow-2xl flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#eff4ff] text-[#006a61] flex items-center justify-center">
              <Phone className="w-6 h-6 animate-pulse" />
            </div>
            <h3 className="font-display font-bold text-base text-[#001729]">Connecting to Courier</h3>
            <p className="text-xs text-[#43474d]">
              Calling Derrick Ramos via secure genericMed masked line (555-019-4821).
            </p>
            <button 
              onClick={() => setCallModal(false)}
              className="w-full py-2 bg-[#ba1a1a] text-white text-xs font-bold rounded-xl mt-2"
            >
              End Call
            </button>
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {chatModal && (
        <div className="fixed inset-0 z-50 bg-[#001729]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-5 max-w-sm w-full shadow-2xl flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#e5eeff]">
              <div className="flex items-center gap-2">
                <img src={IMAGES.courierDerrick} alt="Derrick" className="w-7 h-7 rounded-full object-cover" />
                <span className="font-bold text-xs text-[#001729]">Derrick Ramos (Courier)</span>
              </div>
              <button onClick={() => setChatModal(false)} className="text-xs text-[#73777d] font-bold">Close</button>
            </div>
            <div className="space-y-2 text-xs py-2 max-h-48 overflow-y-auto">
              <div className="p-2 rounded-xl bg-[#eff4ff] text-[#001729] max-w-[80%] self-start">
                Hi Alex! I'm about 12 minutes away with your Atorvastatin package.
              </div>
              <div className="p-2 rounded-xl bg-[#001729] text-white max-w-[80%] ml-auto text-right">
                Great, thank you! Left buzzer instructions in notes.
              </div>
            </div>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Message Derrick..." 
                className="flex-1 p-2 bg-[#eff4ff] rounded-xl text-xs focus:outline-none"
              />
              <button 
                onClick={() => alert("Message sent to courier!")}
                className="p-2 bg-[#006a61] text-white rounded-xl"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
