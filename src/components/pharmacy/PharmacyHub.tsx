import React, { useState } from 'react';
import { PharmacyTab } from '../../types';
import { PharmacySidebar } from './PharmacySidebar';
import { FulfillmentPipeline } from './FulfillmentPipeline';
import { CatalogPricing } from './CatalogPricing';
import { StockAlerts } from './StockAlerts';
import { ParReorderEngine } from './ParReorderEngine';
import { InvoiceReconciliation } from './InvoiceReconciliation';
import { DeaAuditLog } from './DeaAuditLog';

interface PharmacyHubProps {
  initialTab?: PharmacyTab;
}

export const PharmacyHub: React.FC<PharmacyHubProps> = ({ initialTab = 'pipeline' }) => {
  const [activeTab, setActiveTab] = useState<PharmacyTab>(initialTab);
  const [inspectorViewRequested, setInspectorViewRequested] = useState<boolean>(false);

  const handleOpenInspector = () => {
    setActiveTab('dea-audit');
    setInspectorViewRequested(true);
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)] w-full overflow-hidden bg-[#eff4ff]">
      {/* Station Sidebar Navigation */}
      <PharmacySidebar 
        activeTab={activeTab} 
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab !== 'dea-audit') {
            setInspectorViewRequested(false);
          }
        }}
        onOpenInspector={handleOpenInspector}
      />

      {/* Main Screen Content Viewport */}
      <main className="flex-1 overflow-y-auto p-4 lg:p-6 no-scrollbar">
        <div className="max-w-7xl mx-auto pb-12">
          {activeTab === 'pipeline' && <FulfillmentPipeline />}
          {activeTab === 'catalog' && <CatalogPricing />}
          {activeTab === 'stock-alerts' && <StockAlerts />}
          {activeTab === 'par-rules' && <ParReorderEngine />}
          {activeTab === 'reconciliation' && <InvoiceReconciliation />}
          {activeTab === 'dea-audit' && (
            <DeaAuditLog initialInspectorMode={inspectorViewRequested} />
          )}
        </div>
      </main>
    </div>
  );
};
