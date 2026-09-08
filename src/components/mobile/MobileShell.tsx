import React, { useState } from 'react';
import { MobilePriceCompare } from './MobilePriceCompare';
import { MobileRxUpload } from './MobileRxUpload';
import { MobileOrderTracking } from './MobileOrderTracking';
import { MedicineOffer } from '../../types';
import { INITIAL_OFFERS } from '../../data/mockData';
import { 
  Search, 
  ArrowLeftRight, 
  FileText, 
  ShoppingCart, 
  Receipt, 
  Wifi, 
  BatteryMedium, 
  Signal 
} from 'lucide-react';

export const MobileShell: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<'compare' | 'rx-upload' | 'order-tracking'>('compare');
  const [activeTab, setActiveTab] = useState<'search' | 'compare' | 'rx' | 'cart' | 'orders'>('compare');
  const [selectedOffer, setSelectedOffer] = useState<MedicineOffer>(INITIAL_OFFERS[0]);
  const [selectedDosage, setSelectedDosage] = useState('20mg');
  const [selectedDuration, setSelectedDuration] = useState(30);

  const handleProceedToRx = (offer: MedicineOffer, dosage: string, duration: number) => {
    setSelectedOffer(offer);
    setSelectedDosage(dosage);
    setSelectedDuration(duration);
    setCurrentScreen('rx-upload');
    setActiveTab('rx');
  };

  const handleProceedToTracking = () => {
    setCurrentScreen('order-tracking');
    setActiveTab('orders');
  };

  const handleTabChange = (tab: 'search' | 'compare' | 'rx' | 'cart' | 'orders') => {
    setActiveTab(tab);
    if (tab === 'compare' || tab === 'search') {
      setCurrentScreen('compare');
    } else if (tab === 'rx') {
      setCurrentScreen('rx-upload');
    } else if (tab === 'orders') {
      setCurrentScreen('order-tracking');
    } else if (tab === 'cart') {
      setCurrentScreen('compare');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-6 bg-[#eff4ff] min-h-[calc(100vh-3.5rem)]">
      {/* Phone Hardware Shell */}
      <div className="w-full max-w-[420px] bg-[#001729] rounded-[3rem] p-3.5 shadow-2xl ring-8 ring-[#001729]/20 flex flex-col relative overflow-hidden">
        {/* Hardware Dynamic Island & Status Bar */}
        <div className="bg-[#f8f9ff] pt-3 px-6 pb-2 rounded-t-[2.4rem] flex items-center justify-between text-xs font-semibold text-[#001729] select-none border-b border-[#e5eeff]/40">
          <span className="font-mono text-[13px] font-bold">9:41</span>

          {/* Dynamic Island Pill */}
          <div className="w-24 h-5 bg-black rounded-full flex items-center justify-center gap-1.5 px-2">
            <span className="w-2 h-2 rounded-full bg-[#006a61]"></span>
            <span className="text-[9px] font-mono text-[#89f5e7] font-bold tracking-tight">Rx 5:30PM</span>
          </div>

          <div className="flex items-center gap-1.5 text-[#001729]">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <BatteryMedium className="w-4 h-4" />
          </div>
        </div>

        {/* Inner Scrollable Screen Content */}
        <div className="bg-[#f8f9ff] h-[680px] overflow-y-auto no-scrollbar relative flex flex-col">
          {currentScreen === 'compare' && (
            <MobilePriceCompare 
              onProceedToRx={handleProceedToRx}
              onNavigateTab={(tab) => handleTabChange(tab as any)}
            />
          )}

          {currentScreen === 'rx-upload' && (
            <MobileRxUpload 
              selectedOffer={selectedOffer}
              dosage={selectedDosage}
              durationDays={selectedDuration}
              onBack={() => {
                setCurrentScreen('compare');
                setActiveTab('compare');
              }}
              onProceedToTracking={handleProceedToTracking}
            />
          )}

          {currentScreen === 'order-tracking' && (
            <MobileOrderTracking 
              onBack={() => {
                setCurrentScreen('compare');
                setActiveTab('compare');
              }}
              onNavigateHome={() => {
                setCurrentScreen('compare');
                setActiveTab('compare');
              }}
            />
          )}
        </div>

        {/* Native Bottom Navigation Bar */}
        <div className="bg-white/95 backdrop-blur-xl border-t border-[#e5eeff] px-2 py-2 rounded-b-[2.4rem] flex items-center justify-around z-40 select-none shadow-sm">
          <button 
            onClick={() => handleTabChange('search')}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
              activeTab === 'search' ? 'text-[#006a61] font-bold' : 'text-[#73777d]'
            }`}
          >
            <Search className="w-5 h-5" />
            <span>Search</span>
          </button>

          <button 
            onClick={() => handleTabChange('compare')}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
              activeTab === 'compare' ? 'text-[#006a61] font-bold' : 'text-[#73777d]'
            }`}
          >
            <ArrowLeftRight className="w-5 h-5" />
            <span>Compare</span>
          </button>

          <button 
            onClick={() => handleTabChange('rx')}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
              activeTab === 'rx' ? 'text-[#006a61] font-bold' : 'text-[#73777d]'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span>My Rx</span>
          </button>

          <button 
            onClick={() => handleTabChange('cart')}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors relative ${
              activeTab === 'cart' ? 'text-[#006a61] font-bold' : 'text-[#73777d]'
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Cart</span>
            <span className="absolute -top-1 right-1 w-3.5 h-3.5 rounded-full bg-[#006a61] text-white font-mono text-[9px] flex items-center justify-center font-bold">
              1
            </span>
          </button>

          <button 
            onClick={() => handleTabChange('orders')}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
              activeTab === 'orders' ? 'text-[#006a61] font-bold' : 'text-[#73777d]'
            }`}
          >
            <Receipt className="w-5 h-5" />
            <span>Orders</span>
          </button>
        </div>

        {/* Home Indicator Bar */}
        <div className="w-32 h-1 bg-white/40 mx-auto rounded-full mt-2"></div>
      </div>
    </div>
  );
};
