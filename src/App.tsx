import React, { useState } from 'react';
import { ViewMode, PharmacyTab } from './types';
import { TopBar } from './components/navigation/TopBar';
import { MobileShell } from './components/mobile/MobileShell';
import { PharmacyHub } from './components/pharmacy/PharmacyHub';
import { ScreensGallery } from './components/navigation/ScreensGallery';
import { MissionControl } from './components/ops/MissionControl';
import { ArchitectureView } from './components/docs/ArchitectureView';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('showcase');
  const [pharmacyTab, setPharmacyTab] = useState<PharmacyTab>('pipeline');

  const handleSelectMobileScreen = (screen: 'compare' | 'rx-upload' | 'order-tracking') => {
    setCurrentView('mobile');
  };

  const handleSelectPharmacyScreen = (tab: PharmacyTab) => {
    setPharmacyTab(tab);
    setCurrentView('pharmacy');
  };

  const handleOpenInspector = () => {
    setPharmacyTab('dea-audit');
    setCurrentView('pharmacy');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#eff4ff] text-[#0b1c30] font-sans antialiased selection:bg-[#86f2e4] selection:text-[#006f66]">
      {/* Top Application Header */}
      <TopBar 
        currentView={currentView}
        onViewChange={setCurrentView}
        onOpenInspector={handleOpenInspector}
      />

      {/* Main View Area */}
      <main className="flex-1 flex flex-col">
        {currentView === 'showcase' && (
          <ScreensGallery 
            onSelectMobileScreen={handleSelectMobileScreen}
            onSelectPharmacyScreen={handleSelectPharmacyScreen}
          />
        )}

        {currentView === 'mobile' && (
          <MobileShell />
        )}

        {currentView === 'pharmacy' && (
          <PharmacyHub initialTab={pharmacyTab} />
        )}

        {currentView === 'ops' && (
          <MissionControl />
        )}

        {currentView === 'architecture' && (
          <ArchitectureView />
        )}
      </main>
    </div>
  );
}
