export type ViewMode = 
  | 'showcase' 
  | 'mobile' 
  | 'pharmacy' 
  | 'ops' 
  | 'architecture';

export type MobileTab = 'search' | 'compare' | 'rx' | 'cart' | 'orders';

export type PharmacyTab = 
  | 'pipeline' 
  | 'catalog' 
  | 'stock-alerts' 
  | 'par-rules' 
  | 'reconciliation' 
  | 'dea-audit';

export interface MedicineOffer {
  id: string;
  pharmacyName: string;
  pharmacyType: string;
  badge?: string;
  price: number;
  unitPrice: number;
  deliveryEstimate: string;
  fulfillmentType: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  batchExp: string;
  deaVerified: boolean;
}

export interface PipelineOrder {
  id: string;
  customerName: string;
  dob: string;
  customerImage?: string;
  placedTime: string;
  priority: 'high' | 'normal' | 'urgent';
  medicationName: string;
  dosage: string;
  strength: string;
  qty: number;
  form: string;
  ndc: string;
  prescriberName: string;
  prescriberNpi: string;
  refills: string;
  copay: number;
  status: 'verification' | 'dispense' | 'seal' | 'dispatch';
  dispenserTech?: string;
  lotNumber?: string;
  expirationDate?: string;
  tamperSealId?: string;
  coldChain?: boolean;
  tempReading?: number;
  courierName?: string;
  courierETA?: string;
  courierImage?: string;
}

export interface CatalogItem {
  id: string;
  brandName: string;
  genericName: string;
  formulation: string;
  ndc: string;
  orangeBookRating: string;
  wholesaleAcq: number;
  dispenseFee: number;
  offerPrice: number;
  grossMarginPercent: number;
  buyBoxStatus: 'winner' | 'matches' | 'rank-2' | 'verified-cold';
  physicalStock: number;
  shelfLocation: string;
  category: string;
  isActive: boolean;
}

export interface AuditRecord {
  id: string;
  timestamp: string;
  sha256Hash: string;
  eventType: string;
  protocol: string;
  medicationName: string;
  ndc: string;
  schedule: 'C-II' | 'C-III' | 'C-IV' | 'C-V' | 'Legend';
  partyName: string;
  partyDea: string;
  qtyChange: number;
  vaultBalance: number;
  dualSignatures: {
    primaryRph: string;
    secondaryRph?: string;
  };
  pmpStatus: string;
  verified: boolean;
}

export interface WholesalerDiscrepancy {
  invoiceId: string;
  poNumber: string;
  wholesaler: string;
  drugName: string;
  ndc: string;
  billedQty: number;
  receivedQty: number;
  basePrice: number;
  billedPrice: number;
  varianceTotal: number;
  errorCode: string;
  errorDescription: string;
  status: 'open' | 'credited' | 'disputed';
}
