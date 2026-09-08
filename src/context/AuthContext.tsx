import React, { createContext, useContext, useState } from 'react';
import { PatientProfile, PharmacyStaffProfile, OpsOperatorProfile } from '../types';

export const DEMO_PATIENTS: Record<'sarah' | 'robert', PatientProfile> = {
  sarah: {
    id: 'PT-882194',
    fullName: 'Sarah M. Jenkins',
    email: 'sarah.jenkins@patientcare.net',
    phone: '(512) 555-0192',
    dob: '1988-04-12',
    address: {
      street: '204 Congress Ave, Apt 4B',
      city: 'Austin',
      state: 'TX',
      zip: '78701'
    },
    insurancePreference: 'cash',
    knownAllergies: 'Penicillin (mild rash)',
    rxCount: 4,
    isVerified: true
  },
  robert: {
    id: 'PT-449102',
    fullName: 'Robert E. Chen',
    email: 'robert.chen@austinmed.org',
    phone: '(512) 555-8321',
    dob: '1965-09-24',
    address: {
      street: '8810 South Lamar Blvd',
      city: 'Austin',
      state: 'TX',
      zip: '78704'
    },
    insurancePreference: 'medicare',
    knownAllergies: 'Sulfa antibiotics (anaphylaxis)',
    rxCount: 6,
    isVerified: true
  }
};

export const DEMO_PHARMACY_STAFF: Record<'pic' | 'tech', PharmacyStaffProfile> = {
  pic: {
    id: 'STF-9901',
    fullName: 'Dr. Marcus Vance, PharmD',
    role: 'PIC',
    licenseNumber: 'RPh-TX-78491',
    deaNumber: 'BV8492014',
    npiNumber: '1942805912',
    stationId: 'station-04',
    stationName: 'CarePoint Express (Station 04 - Austin Metro)',
    csosCertified: true,
    twoFactorActive: true,
    email: 'm.vance@carepointrx.com'
  },
  tech: {
    id: 'STF-9905',
    fullName: 'Elena Gomez, CPhT',
    role: 'Lead Tech',
    licenseNumber: 'TS-TX-33918',
    deaNumber: 'BV8492014',
    npiNumber: '1839201948',
    stationId: 'station-04',
    stationName: 'CarePoint Express (Station 04 - Austin Metro)',
    csosCertified: false,
    twoFactorActive: true,
    email: 'e.gomez@carepointrx.com'
  }
};

export const DEMO_OPS_OPERATORS: Record<'logistics' | 'dea' | 'cms', OpsOperatorProfile> = {
  logistics: {
    id: 'OPS-4401',
    fullName: 'Elena Rostova',
    organization: 'genericMed Central Logistics',
    badgeId: 'GM-LOG-9921',
    clearanceTier: 'Tier 3',
    roleTitle: 'Director of Network Fulfillment & Dispatch',
    agency: 'genericMed Global Operations',
    mfaMethod: 'FIDO2',
    lastLogin: 'Today, 08:30 CST'
  },
  dea: {
    id: 'OPS-7720',
    fullName: 'Special Agent David Miller',
    organization: 'DEA Office of Diversion Control',
    badgeId: 'DEA-DC-44091',
    clearanceTier: 'Tier 3',
    roleTitle: 'Federal Diversion Investigator',
    agency: 'U.S. Department of Justice (DEA)',
    mfaMethod: 'YubiKey',
    lastLogin: 'Today, 09:12 CST'
  },
  cms: {
    id: 'OPS-3312',
    fullName: 'Dr. Aris Thorne, MD, MPH',
    organization: 'CMS Clinical Quality Oversight',
    badgeId: 'CMS-STAR-1092',
    clearanceTier: 'Tier 2',
    roleTitle: 'Chief Quality & Adherence Auditor',
    agency: 'Centers for Medicare & Medicaid Services',
    mfaMethod: 'TOTP',
    lastLogin: 'Today, 07:45 CST'
  }
};

interface AuthContextType {
  // Frontend 1: Patient
  patientUser: PatientProfile | null;
  patientLogin: (emailOrPhone: string, passOrOtp: string) => boolean;
  patientRegister: (data: Omit<PatientProfile, 'id' | 'rxCount' | 'isVerified'>) => void;
  patientLogout: () => void;
  setDemoPatient: (type: 'sarah' | 'robert') => void;

  // Frontend 2: Pharmacy Hub
  pharmacyUser: PharmacyStaffProfile | null;
  pharmacyLogin: (licenseOrEmail: string, pin: string, stationId: string) => boolean;
  pharmacyRegister: (data: Omit<PharmacyStaffProfile, 'id' | 'twoFactorActive'>) => void;
  pharmacyLogout: () => void;
  setDemoPharmacy: (type: 'pic' | 'tech') => void;

  // Frontend 3: Mission Control / Ops
  opsUser: OpsOperatorProfile | null;
  opsLogin: (operatorId: string, mfaCode: string, clearanceTier: 'Tier 1' | 'Tier 2' | 'Tier 3') => boolean;
  opsRegister: (data: Omit<OpsOperatorProfile, 'id' | 'lastLogin'>) => void;
  opsLogout: () => void;
  setDemoOps: (type: 'logistics' | 'dea' | 'cms') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize with active demo sessions so everything continues working seamlessly,
  // but users can log out, view the auth screens, register new accounts, or switch personas!
  const [patientUser, setPatientUser] = useState<PatientProfile | null>(DEMO_PATIENTS.sarah);
  const [pharmacyUser, setPharmacyUser] = useState<PharmacyStaffProfile | null>(DEMO_PHARMACY_STAFF.pic);
  const [opsUser, setOpsUser] = useState<OpsOperatorProfile | null>(DEMO_OPS_OPERATORS.logistics);

  // Patient methods
  const patientLogin = (emailOrPhone: string, _pass: string): boolean => {
    const found = Object.values(DEMO_PATIENTS).find(
      p => p.email.toLowerCase() === emailOrPhone.toLowerCase() || p.phone.includes(emailOrPhone)
    );
    if (found) {
      setPatientUser(found);
      return true;
    }
    // Default fallback mock login
    setPatientUser({
      id: `PT-${Math.floor(100000 + Math.random() * 900000)}`,
      fullName: emailOrPhone.split('@')[0] || 'Registered Patient',
      email: emailOrPhone.includes('@') ? emailOrPhone : `${emailOrPhone}@patient.com`,
      phone: emailOrPhone.includes('@') ? '(512) 555-0100' : emailOrPhone,
      dob: '1990-01-01',
      address: {
        street: '100 Main St',
        city: 'Austin',
        state: 'TX',
        zip: '78701'
      },
      insurancePreference: 'cash',
      knownAllergies: 'None recorded',
      rxCount: 1,
      isVerified: true
    });
    return true;
  };

  const patientRegister = (data: Omit<PatientProfile, 'id' | 'rxCount' | 'isVerified'>) => {
    const newProfile: PatientProfile = {
      ...data,
      id: `PT-${Math.floor(100000 + Math.random() * 900000)}`,
      rxCount: 0,
      isVerified: true
    };
    setPatientUser(newProfile);
  };

  const patientLogout = () => {
    setPatientUser(null);
  };

  const setDemoPatient = (type: 'sarah' | 'robert') => {
    setPatientUser(DEMO_PATIENTS[type]);
  };

  // Pharmacy methods
  const pharmacyLogin = (licenseOrEmail: string, _pin: string, stationId: string): boolean => {
    const found = Object.values(DEMO_PHARMACY_STAFF).find(
      s => s.licenseNumber.toLowerCase() === licenseOrEmail.toLowerCase() || 
           s.email.toLowerCase() === licenseOrEmail.toLowerCase()
    );
    if (found) {
      setPharmacyUser(found);
      return true;
    }
    setPharmacyUser({
      id: `STF-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName: 'Registered Pharmacist',
      role: 'Staff Pharmacist',
      licenseNumber: licenseOrEmail,
      deaNumber: 'BV8492014',
      npiNumber: '1948201940',
      stationId: stationId || 'station-04',
      stationName: 'CarePoint Express (Station 04 - Austin Metro)',
      csosCertified: true,
      twoFactorActive: true,
      email: licenseOrEmail.includes('@') ? licenseOrEmail : 'rph@carepointrx.com'
    });
    return true;
  };

  const pharmacyRegister = (data: Omit<PharmacyStaffProfile, 'id' | 'twoFactorActive'>) => {
    const newStaff: PharmacyStaffProfile = {
      ...data,
      id: `STF-${Math.floor(1000 + Math.random() * 9000)}`,
      twoFactorActive: true
    };
    setPharmacyUser(newStaff);
  };

  const pharmacyLogout = () => {
    setPharmacyUser(null);
  };

  const setDemoPharmacy = (type: 'pic' | 'tech') => {
    setPharmacyUser(DEMO_PHARMACY_STAFF[type]);
  };

  // Ops methods
  const opsLogin = (operatorId: string, _mfa: string, clearanceTier: 'Tier 1' | 'Tier 2' | 'Tier 3'): boolean => {
    const found = Object.values(DEMO_OPS_OPERATORS).find(
      o => o.badgeId.toLowerCase() === operatorId.toLowerCase() ||
           o.fullName.toLowerCase().includes(operatorId.toLowerCase())
    );
    if (found) {
      setOpsUser(found);
      return true;
    }
    setOpsUser({
      id: `OPS-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName: operatorId,
      organization: 'genericMed Operations Network',
      badgeId: `GM-OPS-${Math.floor(1000 + Math.random() * 9000)}`,
      clearanceTier: clearanceTier,
      roleTitle: 'Certified Network Controller',
      agency: 'genericMed Operations Center',
      mfaMethod: 'FIDO2',
      lastLogin: 'Just now'
    });
    return true;
  };

  const opsRegister = (data: Omit<OpsOperatorProfile, 'id' | 'lastLogin'>) => {
    const newOp: OpsOperatorProfile = {
      ...data,
      id: `OPS-${Math.floor(1000 + Math.random() * 9000)}`,
      lastLogin: 'Just registered'
    };
    setOpsUser(newOp);
  };

  const opsLogout = () => {
    setOpsUser(null);
  };

  const setDemoOps = (type: 'logistics' | 'dea' | 'cms') => {
    setOpsUser(DEMO_OPS_OPERATORS[type]);
  };

  return (
    <AuthContext.Provider
      value={{
        patientUser,
        patientLogin,
        patientRegister,
        patientLogout,
        setDemoPatient,

        pharmacyUser,
        pharmacyLogin,
        pharmacyRegister,
        pharmacyLogout,
        setDemoPharmacy,

        opsUser,
        opsLogin,
        opsRegister,
        opsLogout,
        setDemoOps
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
