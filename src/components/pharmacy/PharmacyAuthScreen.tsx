import React, { useState } from 'react';
import { useAuth, DEMO_PHARMACY_STAFF } from '../../context/AuthContext';
import { 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  KeyRound, 
  User, 
  Mail, 
  FileText, 
  Lock, 
  LogOut, 
  ArrowRight, 
  Sparkles, 
  AlertCircle,
  Hash,
  MapPin,
  Cpu,
  BadgeCheck
} from 'lucide-react';

interface PharmacyAuthScreenProps {
  onSuccess?: () => void;
}

export const PharmacyAuthScreen: React.FC<PharmacyAuthScreenProps> = ({ onSuccess }) => {
  const { pharmacyUser, pharmacyLogin, pharmacyRegister, pharmacyLogout, setDemoPharmacy } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Login form state
  const [identifier, setIdentifier] = useState('m.vance@carepointrx.com');
  const [pin, setPin] = useState('7849');
  const [stationId, setStationId] = useState('station-04');
  const [useCsosToken, setUseCsosToken] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [successToast, setSuccessToast] = useState('');

  // Register form state
  const [regEntityName, setRegEntityName] = useState('CarePoint Express Fulfillment, LLC');
  const [regDeaNumber, setRegDeaNumber] = useState('BV8492014');
  const [regStatePermit, setRegStatePermit] = useState('PH-TX-99401');
  const [regNpi, setRegNpi] = useState('1942805912');
  const [regPicName, setRegPicName] = useState('Dr. Marcus Vance, PharmD');
  const [regPicLicense, setRegPicLicense] = useState('RPh-TX-78491');
  const [regEmail, setRegEmail] = useState('m.vance@carepointrx.com');
  const [regStationName, setRegStationName] = useState('CarePoint Express (Station 04 - Austin Metro)');
  const [regColdChainVault, setRegColdChainVault] = useState('Class 4 Sensitech Cold-Vault (36-46°F)');
  const [attestDscsa, setAttestDscsa] = useState(true);
  const [registerError, setRegisterError] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setLoginError('Please enter your Pharmacist License # or Staff Email.');
      return;
    }
    setLoginError('');
    pharmacyLogin(identifier, pin, stationId);
    setSuccessToast('DEA CSOS signature verified. Station terminal activated.');
    setTimeout(() => {
      if (onSuccess) onSuccess();
    }, 900);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regEntityName.trim() || !regDeaNumber.trim() || !regPicName.trim()) {
      setRegisterError('Please fill in legal pharmacy entity name, DEA registration, and PIC details.');
      return;
    }
    if (!attestDscsa) {
      setRegisterError('You must attest to DSCSA 2024 serialization and 21 CFR § 1311 compliance.');
      return;
    }

    setRegisterError('');
    pharmacyRegister({
      fullName: regPicName.trim(),
      role: 'PIC',
      licenseNumber: regPicLicense.trim(),
      deaNumber: regDeaNumber.trim(),
      npiNumber: regNpi.trim(),
      stationId: 'station-custom',
      stationName: regStationName.trim(),
      csosCertified: true,
      email: regEmail.trim()
    });

    setSuccessToast('Pharmacy station credential registered and synchronized with DEA CSOS node.');
    setTimeout(() => {
      if (onSuccess) onSuccess();
    }, 900);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-[#e5eeff] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#006a61] animate-pulse"></span>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#006a61]">
              NABP Accredited • 21 CFR § 1311 Synchronized
            </span>
          </div>
          <h1 className="font-display font-bold text-2xl text-[#001729] tracking-tight">
            Pharmacy Staff Credentials &amp; Station Enrollment
          </h1>
          <p className="text-xs text-[#43474d] max-w-2xl">
            Authenticate licensed dispensing pharmacists, pharmacy technicians, and register state-licensed pharmacy station nodes with automated DEA CSOS cryptographic signing.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-[#001729] text-white text-xs font-mono font-bold flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#86f2e4]" />
            <span>CSOS NODE #894k</span>
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-[#86f2e4] text-[#006f66] text-xs font-bold">
            FIPS 140-2 LEVEL 3
          </span>
        </div>
      </div>

      {/* Active Pharmacist Profile Card (If logged in) */}
      {pharmacyUser && (
        <div className="bg-[#001729] text-white rounded-3xl p-6 border border-[#0f2c42] shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#006a61] text-[#86f2e4] font-display font-bold text-xl flex items-center justify-center border border-[#86f2e4]/30 shadow-inner shrink-0">
              {pharmacyUser.fullName.split(' ').filter(x => !x.includes('Dr.')).map(n => n[0]).join('') || 'Rx'}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-lg font-bold font-display text-white">{pharmacyUser.fullName}</span>
                <span className="px-2 py-0.5 rounded-md bg-[#86f2e4] text-[#006f66] text-[10px] font-bold font-mono">
                  {pharmacyUser.role}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-[#0f2c42] text-[#86f2e4] text-[10px] font-mono border border-[#006f66]/40">
                  LIC: {pharmacyUser.licenseNumber}
                </span>
              </div>
              <p className="text-xs text-[#7994ae] flex items-center gap-2">
                <span>{pharmacyUser.stationName}</span>
                <span>•</span>
                <span className="font-mono text-[#86f2e4]">DEA: {pharmacyUser.deaNumber}</span>
                <span>•</span>
                <span className="font-mono text-[#7994ae]">NPI: {pharmacyUser.npiNumber}</span>
              </p>
              <div className="flex items-center gap-3 pt-1 text-[11px] text-[#86f2e4]">
                <span className="flex items-center gap-1 font-mono">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  CSOS Digital Signature: ACTIVE
                </span>
                <span className="text-[#7994ae]">•</span>
                <span className="font-mono text-gray-300">Terminal PIN: Validated</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setDemoPharmacy(pharmacyUser.role === 'PIC' ? 'tech' : 'pic');
              }}
              className="px-3.5 py-2 rounded-xl bg-[#0f2c42] hover:bg-[#1a3d59] text-[#86f2e4] text-xs font-semibold border border-[#006f66]/50 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Switch to {pharmacyUser.role === 'PIC' ? 'Lead Tech' : 'PIC Pharmacist'}</span>
            </button>

            <button
              onClick={pharmacyLogout}
              className="px-3.5 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 text-xs font-semibold border border-red-800/40 transition-all flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out Terminal</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Container Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-[#e5eeff] shadow-xs space-y-6">
          {/* Mode Switcher */}
          <div className="flex items-center justify-between border-b border-[#f0f4ff] pb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setMode('login');
                  setLoginError('');
                  setRegisterError('');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  mode === 'login'
                    ? 'bg-[#006a61] text-white shadow-xs'
                    : 'bg-[#eff4ff] text-[#43474d] hover:bg-[#dce9ff]'
                }`}
              >
                Staff Terminal Sign In
              </button>
              <button
                onClick={() => {
                  setMode('register');
                  setLoginError('');
                  setRegisterError('');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  mode === 'register'
                    ? 'bg-[#001729] text-white shadow-xs'
                    : 'bg-[#eff4ff] text-[#43474d] hover:bg-[#dce9ff]'
                }`}
              >
                Register New Station / Staff
              </button>
            </div>

            <span className="text-[11px] font-mono text-[#73777d] hidden sm:inline">
              Protocol: 21 CFR Part 1311
            </span>
          </div>

          {/* Toast */}
          {successToast && (
            <div className="p-3.5 bg-[#e8fbf8] border border-[#86f2e4] text-[#006f66] rounded-2xl text-xs flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-[#006a61]" />
              <span>{successToast}</span>
            </div>
          )}

          {/* STAFF LOGIN FORM */}
          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {loginError && (
                <div className="p-3 bg-[#ffdad6] text-[#ba1a1a] rounded-xl text-xs flex items-center gap-2 font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#001729] mb-1.5">
                    Staff Email or State RPh License #
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#73777d] absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="m.vance@carepointrx.com or RPh-TX-78491"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#eff4ff] border border-[#dce9ff] rounded-xl text-[#001729] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006a61]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#001729] mb-1.5">
                    Assigned Dispensing Hub Station
                  </label>
                  <select
                    value={stationId}
                    onChange={(e) => setStationId(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#eff4ff] border border-[#dce9ff] rounded-xl text-[#001729] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006a61]"
                  >
                    <option value="station-04">CarePoint Express (Station 04 - Austin Metro Hub)</option>
                    <option value="hub-12">St. Jude Community Rx (Hub 12)</option>
                    <option value="station-09">Baystate Apothecary (Station 09)</option>
                    <option value="station-custom">Regional Central Fulfillment Node #01</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#001729] mb-1.5">
                    Terminal Security PIN (4-Digits)
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-[#73777d] absolute left-3 top-2.5" />
                    <input
                      type="password"
                      maxLength={6}
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      placeholder="Enter 4-digit PIN"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#eff4ff] border border-[#dce9ff] rounded-xl text-[#001729] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006a61]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#001729] mb-1.5">
                    CSOS Hardware Token / FIPS Key
                  </label>
                  <div className="flex items-center gap-2 p-2 bg-[#eff4ff] border border-[#dce9ff] rounded-xl">
                    <input
                      type="checkbox"
                      id="csos"
                      checked={useCsosToken}
                      onChange={(e) => setUseCsosToken(e.target.checked)}
                      className="rounded text-[#006a61] w-4 h-4"
                    />
                    <label htmlFor="csos" className="text-xs text-[#001729] font-medium cursor-pointer">
                      Verify CSOS Signing Key (DEA 21 CFR § 1311)
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-[#73777d]">
                  Terminal sessions log all dispensing events to immutable SHA-256 audit ledger.
                </span>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#006a61] hover:bg-[#005049] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2"
                >
                  <span>Authenticate Terminal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          ) : (
            /* STATION & STAFF REGISTRATION FORM */
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              {registerError && (
                <div className="p-3 bg-[#ffdad6] text-[#ba1a1a] rounded-xl text-xs flex items-center gap-2 font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{registerError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#001729] mb-1.5">
                    Pharmacy Legal Entity Name (DBA)
                  </label>
                  <input
                    type="text"
                    value={regEntityName}
                    onChange={(e) => setRegEntityName(e.target.value)}
                    placeholder="e.g. Austin Regional Apothecary LLC"
                    className="w-full px-3 py-2 text-xs bg-[#eff4ff] border border-[#dce9ff] rounded-xl text-[#001729]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#001729] mb-1.5">
                    Station Display Name &amp; Metro Area
                  </label>
                  <input
                    type="text"
                    value={regStationName}
                    onChange={(e) => setRegStationName(e.target.value)}
                    placeholder="CarePoint Express (Station 04 - Austin Metro)"
                    className="w-full px-3 py-2 text-xs bg-[#eff4ff] border border-[#dce9ff] rounded-xl text-[#001729]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#001729] mb-1.5">
                    Federal DEA Registration #
                  </label>
                  <input
                    type="text"
                    value={regDeaNumber}
                    onChange={(e) => setRegDeaNumber(e.target.value)}
                    placeholder="e.g. BV8492014"
                    className="w-full px-3 py-2 text-xs bg-[#eff4ff] border border-[#dce9ff] rounded-xl text-[#001729] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#001729] mb-1.5">
                    State Pharmacy Permit #
                  </label>
                  <input
                    type="text"
                    value={regStatePermit}
                    onChange={(e) => setRegStatePermit(e.target.value)}
                    placeholder="e.g. PH-TX-99401"
                    className="w-full px-3 py-2 text-xs bg-[#eff4ff] border border-[#dce9ff] rounded-xl text-[#001729] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#001729] mb-1.5">
                    Organization NPI (Type 2)
                  </label>
                  <input
                    type="text"
                    value={regNpi}
                    onChange={(e) => setRegNpi(e.target.value)}
                    placeholder="e.g. 1942805912"
                    className="w-full px-3 py-2 text-xs bg-[#eff4ff] border border-[#dce9ff] rounded-xl text-[#001729] font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#001729] mb-1.5">
                    Pharmacist-in-Charge (PIC) Name
                  </label>
                  <input
                    type="text"
                    value={regPicName}
                    onChange={(e) => setRegPicName(e.target.value)}
                    placeholder="Dr. Marcus Vance, PharmD"
                    className="w-full px-3 py-2 text-xs bg-[#eff4ff] border border-[#dce9ff] rounded-xl text-[#001729]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#001729] mb-1.5">
                    PIC Individual License #
                  </label>
                  <input
                    type="text"
                    value={regPicLicense}
                    onChange={(e) => setRegPicLicense(e.target.value)}
                    placeholder="RPh-TX-78491"
                    className="w-full px-3 py-2 text-xs bg-[#eff4ff] border border-[#dce9ff] rounded-xl text-[#001729] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#001729] mb-1.5">
                    Official PIC Email
                  </label>
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="m.vance@carepointrx.com"
                    className="w-full px-3 py-2 text-xs bg-[#eff4ff] border border-[#dce9ff] rounded-xl text-[#001729]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#001729] mb-1.5">
                  Cold-Vault &amp; Controlled Substances Storage Spec
                </label>
                <input
                  type="text"
                  value={regColdChainVault}
                  onChange={(e) => setRegColdChainVault(e.target.value)}
                  placeholder="e.g. Sensitech IoT Monitored Walk-In (36-46°F) + TL-30 Schedule II Vault"
                  className="w-full px-3 py-2 text-xs bg-[#eff4ff] border border-[#dce9ff] rounded-xl text-[#001729]"
                />
              </div>

              <div className="p-3 bg-[#eff4ff] rounded-2xl border border-[#dce9ff]">
                <label className="flex items-start gap-2 text-xs text-[#43474d] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={attestDscsa}
                    onChange={(e) => setAttestDscsa(e.target.checked)}
                    className="mt-0.5 rounded text-[#006a61] w-4 h-4"
                  />
                  <span>
                    I certify under penalty of perjury that this pharmacy holds active permits with the State Board of Pharmacy, conforms to DSCSA 2024 interoperable EPCIS data exchange, and authorizes CSOS electronic order signing.
                  </span>
                </label>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#001729] hover:bg-[#0f2c42] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2"
                >
                  <span>Register Pharmacy Station Node</span>
                  <ArrowRight className="w-4 h-4 text-[#86f2e4]" />
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right Column: Demo Switcher & Security Sentinel (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Quick Demo Staff Logins */}
          <div className="bg-white rounded-3xl p-5 border border-[#e5eeff] shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#f0f4ff]">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#006a61]" />
                <h3 className="font-display font-bold text-sm text-[#001729]">Demo Staff Personas</h3>
              </div>
              <span className="text-[10px] font-mono text-[#006a61] font-bold">1-CLICK LOGIN</span>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => {
                  setIdentifier(DEMO_PHARMACY_STAFF.pic.email);
                  setPin('7849');
                  setStationId('station-04');
                  pharmacyLogin(DEMO_PHARMACY_STAFF.pic.email, '7849', 'station-04');
                  setSuccessToast('Authenticated as Dr. Marcus Vance, PharmD (PIC)');
                }}
                className="w-full p-3 rounded-2xl bg-[#eff4ff] hover:bg-[#dce9ff] border border-[#dce9ff] text-left transition-all space-y-1"
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xs text-[#001729]">Dr. Marcus Vance, PharmD</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#006a61] text-white text-[9px] font-bold">PIC</span>
                </div>
                <p className="text-[11px] text-[#43474d]">License #RPh-TX-78491 • CSOS Dual Signer</p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIdentifier(DEMO_PHARMACY_STAFF.tech.email);
                  setPin('3391');
                  setStationId('station-04');
                  pharmacyLogin(DEMO_PHARMACY_STAFF.tech.email, '3391', 'station-04');
                  setSuccessToast('Authenticated as Elena Gomez, CPhT (Lead Tech)');
                }}
                className="w-full p-3 rounded-2xl bg-[#eff4ff] hover:bg-[#dce9ff] border border-[#dce9ff] text-left transition-all space-y-1"
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xs text-[#001729]">Elena Gomez, CPhT</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#eff4ff] text-[#006a61] border border-[#006a61] text-[9px] font-bold">TECH</span>
                </div>
                <p className="text-[11px] text-[#43474d]">License #TS-TX-33918 • Pill Vision AI Operator</p>
              </button>
            </div>
          </div>

          {/* Compliance & Regulatory Requirements Card */}
          <div className="bg-[#001729] text-white rounded-3xl p-5 border border-[#0f2c42] shadow-sm space-y-3">
            <div className="flex items-center justify-between text-[#86f2e4] pb-2 border-b border-[#0f2c42]">
              <span className="font-bold text-xs">DEA &amp; NABP Terminal Rules</span>
              <ShieldCheck className="w-4 h-4" />
            </div>

            <ul className="text-[11px] text-gray-300 space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#86f2e4] mt-1.5 shrink-0"></span>
                <span>Dual authorization is mandated for Schedule II electronic orders (Title 21 CFR § 1311.100).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#86f2e4] mt-1.5 shrink-0"></span>
                <span>Pharmacy staff sessions auto-revalidate every 8 hours with digital certificate fingerprinting.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#86f2e4] mt-1.5 shrink-0"></span>
                <span>Cold-vault excursion alarms immediately alert authenticated PIC on duty.</span>
              </li>
            </ul>

            <div className="pt-2 border-t border-[#0f2c42] text-[10px] font-mono text-[#7994ae] flex justify-between">
              <span>Security Standard:</span>
              <span className="text-[#86f2e4]">21 CFR PART 11</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
