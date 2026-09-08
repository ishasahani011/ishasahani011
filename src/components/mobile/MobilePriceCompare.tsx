import React, { useState } from 'react';
import { BRAND_LOGO_URL, IMAGES, INITIAL_OFFERS } from '../../data/mockData';
import { MedicineOffer } from '../../types';
import { 
  Search, 
  SlidersHorizontal, 
  ShieldCheck, 
  Zap, 
  TrendingDown, 
  CheckCircle2, 
  Truck, 
  Star, 
  ShoppingBag, 
  Camera, 
  Building2, 
  ChevronDown, 
  ChevronUp, 
  Lock, 
  ArrowRight,
  Sparkles,
  Award
} from 'lucide-react';

interface MobilePriceCompareProps {
  onProceedToRx: (offer: MedicineOffer, dosage: string, durationDays: number) => void;
  onNavigateTab?: (tab: string) => void;
}

export const MobilePriceCompare: React.FC<MobilePriceCompareProps> = ({
  onProceedToRx,
  onNavigateTab
}) => {
  const [selectedDosage, setSelectedDosage] = useState<'10mg' | '20mg' | '40mg' | '80mg'>('20mg');
  const [selectedDuration, setSelectedDuration] = useState<30 | 90>(30);
  const [selectedSeller, setSelectedSeller] = useState<MedicineOffer>(INITIAL_OFFERS[0]);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // Price calculations based on duration
  const basePrice = selectedDuration === 30 ? 16.80 : 38.00;
  const brandPrice = selectedDuration === 30 ? 142.00 : 380.00;
  const activeOfferPrice = selectedSeller.id === 'carepoint-lowest' 
    ? basePrice 
    : selectedSeller.price;
  const savings = (brandPrice - activeOfferPrice).toFixed(2);
  const unitPrice = (activeOfferPrice / selectedDuration).toFixed(2);

  const handleSelectOffer = (offer: MedicineOffer) => {
    setSelectedSeller(offer);
  };

  const handleCheckoutClick = () => {
    setCheckoutLoading(true);
    setTimeout(() => {
      setCheckoutLoading(false);
      onProceedToRx(selectedSeller, selectedDosage, selectedDuration);
    }, 450);
  };

  return (
    <div className="flex flex-col w-full pb-28 text-[#0b1c30] bg-[#f8f9ff]">
      {/* Top Mobile Header */}
      <div className="sticky top-0 z-30 bg-[#f8f9ff]/90 backdrop-blur-xl border-b border-[#e5eeff] px-4 py-2.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <img 
            src={BRAND_LOGO_URL} 
            alt="genericMed" 
            className="h-7 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col leading-none">
            <div className="flex items-center gap-1">
              <span className="font-display font-bold text-sm text-[#001729] tracking-tight">genericMed</span>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#86f2e4] text-[#006f66]">FDA-Reg</span>
            </div>
            <span className="text-[10px] text-[#43474d] font-medium mt-0.5">Price Compare</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button 
            onClick={() => onProceedToRx(selectedSeller, selectedDosage, selectedDuration)}
            className="min-h-[36px] px-2.5 py-1 rounded-lg bg-[#eff4ff] text-[#006a61] text-xs font-semibold flex items-center gap-1 active:bg-[#dce9ff] transition-colors"
          >
            <Camera className="w-3.5 h-3.5" />
            <span className="text-[11px]">Rx Upload</span>
          </button>
          <div className="w-7 h-7 rounded-full bg-[#001729] flex items-center justify-center text-white text-xs font-bold">
            AM
          </div>
        </div>
      </div>

      {/* Query & Active Filters Context Rail */}
      <div className="px-4 py-3 bg-[#eff4ff] border-b border-[#e5eeff] flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <Search className="w-4 h-4 text-[#006a61] shrink-0" />
            <span className="font-display font-bold text-sm text-[#001729] truncate">Lipitor (Atorvastatin)</span>
            <span className="px-1.5 py-0.5 rounded bg-[#e5eeff] text-[#43474d] font-mono text-[11px] font-semibold">
              {selectedDosage}
            </span>
          </div>
          <button 
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white text-[#006a61] text-xs font-semibold shadow-xs active:scale-95 transition-transform"
            onClick={() => alert("Filter options: Bioequivalence AB, In-Stock, Free Delivery, 24h Pharmacy")}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filter</span>
          </button>
        </div>

        {/* Filter Badges Rail */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-[11px]">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#86f2e4] text-[#006f66] font-semibold shrink-0">
            <ShieldCheck className="w-3 h-3" />
            FDA Bioequivalent
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#dce9ff] text-[#0b1c30] font-medium shrink-0">
            <Zap className="w-3 h-3 text-[#006a61]" />
            In Stock (Today 3h)
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#dce9ff] text-[#0b1c30] font-medium shrink-0">
            <Award className="w-3 h-3 text-[#006a61]" />
            Lowest Price Match
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {/* Instant Savings Comparison Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#001729] via-[#0f2c42] to-[#001729] text-white shadow-md relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-[#006a61]/25 blur-2xl pointer-events-none"></div>

          <div className="flex items-center justify-between relative z-10 mb-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#aec9e6]">Price Parity Audit</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#006a61] text-[#89f5e7] text-xs font-bold">
              <TrendingDown className="w-3.5 h-3.5" />
              88% Less
            </span>
          </div>

          <div className="flex items-baseline gap-2 relative z-10 my-1">
            <span className="font-display font-bold text-2xl text-white tracking-tight">${activeOfferPrice.toFixed(2)}</span>
            <span className="font-mono text-sm text-[#aec9e6] line-through decoration-[#ba1a1a] decoration-2">${brandPrice.toFixed(2)}</span>
            <span className="text-xs text-[#89f5e7] font-semibold ml-auto">Save ${savings}</span>
          </div>

          <div className="text-xs text-white/90 relative z-10 flex items-center gap-1.5 mt-1">
            <CheckCircle2 className="w-4 h-4 text-[#89f5e7] shrink-0" />
            <span>Brand Lipitor® costs ${brandPrice.toFixed(2)}/{selectedDuration} tabs. Switch to authorized generic Atorvastatin.</span>
          </div>
        </div>

        {/* Bioequivalence Trust Card */}
        <div className="p-4 rounded-2xl bg-white shadow-xs border border-[#e5eeff] flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-[#86f2e4] text-[#006f66] flex items-center justify-center">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <span className="font-title font-semibold text-xs text-[#001729]">FDA "AB" Therapeutic Equivalent</span>
            </div>
            <span className="font-mono text-[11px] text-[#43474d]">NDC: 0093-2274-34</span>
          </div>
          <p className="text-xs text-[#43474d] leading-relaxed">
            Exact same active pharmaceutical ingredient (API), {selectedDosage} strength, bioavailability, and safety profile as brand-name Pfizer Lipitor®.
          </p>
          <div className="pt-2 border-t border-[#f0f4ff] flex items-center justify-between text-[11px] text-[#73777d]">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006a61]"></span>
              Oral film-coated tablet
            </span>
            <span className="flex items-center gap-1 text-[#006a61]">
              <Sparkles className="w-3 h-3" />
              cGMP Inspected Facility
            </span>
          </div>
        </div>

        {/* Product Visual & Strength Selector Block */}
        <div className="p-4 rounded-2xl bg-white shadow-xs border border-[#e5eeff] flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="relative w-20 h-20 rounded-xl bg-[#eff4ff] shrink-0 overflow-hidden shadow-inner border border-[#dce9ff]">
              <img 
                src={IMAGES.pillAtorvastatin} 
                alt="Atorvastatin 20mg" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 inset-x-0 bg-[#001729]/80 py-0.5 text-center">
                <span className="font-mono text-[10px] text-white font-bold">{selectedDosage.toUpperCase()}</span>
              </div>
            </div>

            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-[10px] text-[#43474d] uppercase font-bold tracking-wider">Generic Equivalent</span>
              <span className="font-display font-bold text-sm text-[#001729] truncate">Atorvastatin Calcium</span>
              <span className="text-xs text-[#73777d]">Film-Coated Daily Statin</span>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded bg-[#86f2e4] text-[#006f66] text-[10px] font-bold">
                  Tier 1 Generic
                </span>
                <span className="text-[11px] text-[#006a61] font-semibold">99.4% Match Efficacy</span>
              </div>
            </div>
          </div>

          {/* Dosage Strength Selector */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-[#001729]">Select Strength</span>
              <span className="text-[#006a61] text-[11px] font-medium">Doctor Prescribed: {selectedDosage}</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {(['10mg', '20mg', '40mg', '80mg'] as const).map((dosage) => (
                <button
                  key={dosage}
                  onClick={() => setSelectedDosage(dosage)}
                  className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedDosage === dosage
                      ? 'bg-[#001729] text-white shadow-sm ring-1 ring-[#001729]'
                      : 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#dce9ff]'
                  }`}
                >
                  {dosage}
                </button>
              ))}
            </div>
          </div>

          {/* Supply Duration Selector */}
          <div className="flex flex-col gap-1.5">
            <span className="font-semibold text-xs text-[#001729]">Supply Duration</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setSelectedDuration(30)}
                className={`p-2.5 rounded-xl flex flex-col text-left transition-all relative border ${
                  selectedDuration === 30
                    ? 'bg-[#eff4ff] border-[#006a61] shadow-xs ring-1 ring-[#006a61]'
                    : 'bg-white border-[#e5eeff] hover:bg-[#eff4ff]'
                }`}
              >
                <span className="font-title font-bold text-xs text-[#001729]">30 Days</span>
                <span className="text-[11px] text-[#43474d]">30 Tablets (Standard)</span>
                <span className="font-mono text-xs text-[#006a61] font-bold mt-1">$16.80 ($0.56/tab)</span>
              </button>

              <button
                onClick={() => setSelectedDuration(90)}
                className={`p-2.5 rounded-xl flex flex-col text-left transition-all relative border overflow-hidden ${
                  selectedDuration === 90
                    ? 'bg-[#eff4ff] border-[#006a61] shadow-xs ring-1 ring-[#006a61]'
                    : 'bg-white border-[#e5eeff] hover:bg-[#eff4ff]'
                }`}
              >
                <div className="absolute top-0 right-0 bg-[#006a61] text-white px-1.5 py-0.5 rounded-bl text-[9px] font-bold">
                  SAVE 25%
                </div>
                <span className="font-title font-bold text-xs text-[#001729]">90 Days</span>
                <span className="text-[11px] text-[#43474d]">90 Tablets (Best Value)</span>
                <span className="font-mono text-xs text-[#006a61] font-bold mt-1">$38.00 ($0.42/tab)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Section Header: Licensed Pharmacy Offers */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <h2 className="font-display font-bold text-sm text-[#001729]">Licensed Pharmacy Offers</h2>
            <span className="text-[11px] text-[#43474d]">Ranked by lowest patient out-of-pocket cost</span>
          </div>
          <span className="px-1.5 py-0.5 rounded bg-[#e5eeff] text-[#43474d] font-mono text-[10px] font-bold">
            4 verified
          </span>
        </div>

        {/* Lowest Eligible Price Hero Card */}
        <div 
          onClick={() => handleSelectOffer(INITIAL_OFFERS[0])}
          className={`rounded-2xl bg-white border-2 overflow-hidden shadow-sm flex flex-col cursor-pointer transition-all ${
            selectedSeller.id === 'carepoint-lowest'
              ? 'border-[#006a61] ring-2 ring-[#006a61]/20'
              : 'border-[#e5eeff] hover:border-[#006a61]/50'
          }`}
        >
          {/* Badge Strip */}
          <div className="px-3.5 py-1 bg-[#006a61] text-white flex items-center justify-between text-xs font-bold uppercase tracking-wider">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#86f2e4]" />
              <span>Lowest Eligible Verified Price</span>
            </div>
            <span className="font-mono text-[10px] text-[#89f5e7] opacity-90">Synced 4m ago</span>
          </div>

          <div className="p-3.5 flex flex-col gap-2.5">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#006a61] font-display font-bold text-sm shrink-0 border border-[#dce9ff]">
                  CP
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="font-title font-bold text-xs text-[#001729]">CarePoint Express</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#006a61]" />
                  </div>
                  <span className="text-[11px] text-[#73777d]">Licensed Retail Pharmacy • DEA Verified</span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="font-mono text-[11px] font-bold text-[#0b1c30]">4.9</span>
                    <span className="text-[10px] text-[#73777d]">(1,420 reviews)</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end shrink-0">
                <span className="font-display font-bold text-xl text-[#001729]">${basePrice.toFixed(2)}</span>
                <span className="font-mono text-[10px] text-[#43474d]">${(basePrice / selectedDuration).toFixed(2)} / tab</span>
              </div>
            </div>

            {/* Delivery Details */}
            <div className="p-2.5 rounded-xl bg-[#eff4ff] flex flex-col gap-1 border border-[#e5eeff]">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-semibold text-[#001729]">
                  <Truck className="w-4 h-4 text-[#006a61]" />
                  <span>Arrives Today by 5:30 PM</span>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-[#86f2e4] text-[#006f66] font-bold text-[10px]">
                  FREE Courier
                </span>
              </div>
              <span className="text-[11px] text-[#73777d] pl-5.5">Batch exp: 03/2028 • In stock ready to pack</span>
            </div>

            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleSelectOffer(INITIAL_OFFERS[0]);
                handleCheckoutClick();
              }}
              className="w-full py-2 px-3 rounded-xl bg-[#001729] hover:bg-[#0f2c42] text-white font-title text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#86f2e4]" />
              <span>Select Lowest Price Offer</span>
            </button>
          </div>
        </div>

        {/* Alternative Offers List */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-[#43474d]">Alternative Licensed Offers (3 more available)</span>

          {INITIAL_OFFERS.slice(1).map((offer) => (
            <div 
              key={offer.id}
              onClick={() => handleSelectOffer(offer)}
              className={`p-3 rounded-2xl bg-white border flex flex-col gap-2 shadow-xs cursor-pointer transition-all ${
                selectedSeller.id === offer.id 
                  ? 'border-[#006a61] ring-1 ring-[#006a61]' 
                  : 'border-[#e5eeff] hover:border-[#dce9ff]'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#001729] font-bold text-xs shrink-0">
                    {offer.pharmacyName.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="font-title font-bold text-xs text-[#001729] truncate">{offer.pharmacyName}</span>
                      {offer.badge && (
                        <span className="px-1 py-0.2 rounded bg-[#e5eeff] text-[#43474d] text-[9px] font-semibold">
                          {offer.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#73777d] truncate">{offer.pharmacyType}</span>
                    <span className="text-[10px] text-[#006a61] mt-0.5">Batch exp {offer.batchExp}</span>
                  </div>
                </div>

                <div className="flex flex-col items-end shrink-0">
                  <span className="font-title font-bold text-sm text-[#001729]">${offer.price.toFixed(2)}</span>
                  <span className="font-mono text-[10px] text-[#73777d]">${offer.unitPrice.toFixed(2)} / tab</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 text-xs border-t border-[#f0f4ff]">
                <span className="text-[11px] text-[#73777d] flex items-center gap-1">
                  <Truck className="w-3 h-3 text-[#006a61]" />
                  {offer.deliveryEstimate}
                </span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectOffer(offer);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    selectedSeller.id === offer.id
                      ? 'bg-[#006a61] text-white'
                      : 'bg-[#eff4ff] text-[#001729] hover:bg-[#dce9ff]'
                  }`}
                >
                  {selectedSeller.id === offer.id ? 'Selected' : 'Select'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Rx Requirement & Photo Upload Action Card */}
        <div className="p-4 rounded-2xl bg-[#eff4ff] border border-[#dce9ff] flex flex-col gap-2.5">
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#86f2e4] text-[#006f66] flex items-center justify-center shrink-0">
              <Camera className="w-4 h-4" />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-title font-bold text-xs text-[#001729]">Valid Prescription Required</span>
                <span className="px-1.5 py-0.5 rounded-full bg-[#006a61] text-white text-[9px] font-bold">
                  ~2 min verify
                </span>
              </div>
              <p className="text-[11px] text-[#43474d] mt-1 leading-relaxed">
                You can complete checkout now. Upload a photo or transfer your script from your doctor before fulfillment dispatch.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button 
              onClick={() => onProceedToRx(selectedSeller, selectedDosage, selectedDuration)}
              className="py-1.5 px-2 rounded-xl bg-white text-[#001729] text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs border border-[#dce9ff] active:bg-[#f0f4ff]"
            >
              <Camera className="w-3.5 h-3.5 text-[#006a61]" />
              <span>Snap Rx Photo</span>
            </button>
            <button 
              onClick={() => onProceedToRx(selectedSeller, selectedDosage, selectedDuration)}
              className="py-1.5 px-2 rounded-xl bg-white text-[#001729] text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs border border-[#dce9ff] active:bg-[#f0f4ff]"
            >
              <Building2 className="w-3.5 h-3.5 text-[#006a61]" />
              <span>Transfer Script</span>
            </button>
          </div>

          <div className="flex items-center gap-1 pt-1 text-[#73777d] text-[10px]">
            <Lock className="w-3 h-3 text-[#006a61]" />
            <span>genericMed facilitates fulfillment by licensed U.S. pharmacies. HIPAA compliant.</span>
          </div>
        </div>

        {/* Cost Transparency Accordion */}
        <div className="p-3.5 rounded-2xl bg-white border border-[#e5eeff] shadow-xs flex flex-col">
          <button 
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="flex items-center justify-between text-xs w-full text-left font-semibold text-[#001729]"
          >
            <span>Clear Price Breakdown</span>
            <div className="flex items-center gap-1 text-[#006a61] text-[11px]">
              <span>100% Transparent</span>
              {showBreakdown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {showBreakdown && (
            <div className="flex flex-col gap-1.5 pt-3 mt-2 border-t border-[#f0f4ff] text-xs text-[#43474d]">
              <div className="flex justify-between">
                <span>Active Ingredient (Atorvastatin {selectedDosage} × {selectedDuration})</span>
                <span className="font-mono text-[#0b1c30]">${(activeOfferPrice * 0.74).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Licensed Pharmacy Dispensing Fee</span>
                <span className="font-mono text-[#0b1c30]">$3.00</span>
              </div>
              <div className="flex justify-between">
                <span>Courier Delivery (Orders over $15)</span>
                <span className="font-mono text-[#006a61] font-semibold">FREE</span>
              </div>
              <div className="flex justify-between">
                <span>Regulatory Compliance &amp; Verification</span>
                <span className="font-mono text-[#0b1c30]">$1.40</span>
              </div>
              <div className="pt-2 border-t border-[#e5eeff] flex justify-between font-title font-bold text-sm text-[#001729]">
                <span>Total Out-of-Pocket</span>
                <span className="font-mono text-[#001729]">${activeOfferPrice.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Persistent Floating Bottom Action Bar */}
      <div className="fixed bottom-14 inset-x-0 z-30 bg-white/95 backdrop-blur-xl border-t border-[#e5eeff] shadow-[0_-4px_20px_rgba(0,23,41,0.08)] px-4 py-2.5 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-title font-bold text-xs text-[#001729] truncate">
                Atorvastatin {selectedDosage}
              </span>
              <span className="text-[10px] text-[#73777d]">({selectedDuration} Tabs)</span>
            </div>
            <span className="text-[11px] text-[#006a61] truncate font-medium">
              {selectedSeller.pharmacyName} • {selectedSeller.fulfillmentType}
            </span>
          </div>

          <div className="flex flex-col items-end shrink-0 pl-2">
            <span className="font-display font-bold text-lg text-[#001729] leading-tight">
              ${activeOfferPrice.toFixed(2)}
            </span>
            <span className="font-mono text-[10px] text-[#006a61] font-bold">
              Save ${savings}
            </span>
          </div>
        </div>

        <button 
          onClick={handleCheckoutClick}
          disabled={checkoutLoading}
          className="w-full h-11 rounded-xl bg-[#001729] hover:bg-[#0f2c42] text-white font-title text-xs font-bold flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] transition-all"
        >
          {checkoutLoading ? (
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              Securing Best Price...
            </span>
          ) : (
            <>
              <Lock className="w-3.5 h-3.5 text-[#86f2e4]" />
              <span>Proceed to Rx Verification</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
