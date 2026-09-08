import React, { useState } from 'react';
import { useAuth, DEMO_OPS_OPERATORS } from '../../context/AuthContext';
import { 
  Server, 
  ShieldCheck, 
  KeyRound, 
  User, 
  Mail, 
  Building2, 
  Lock, 
  CheckCircle2, 
  LogOut, 
  ArrowRight, 
  Sparkles, 
  AlertCircle,
  Cpu,
  BadgeCheck,
  Fingerprint,
  FileText
} from 'lucide-react';

interface OpsAuthScreenProps {
  onSuccess?: () => void;
}

export const OpsAuthScreen: React.FC<OpsAuthScreenProps> = ({ onSuccess }) => {
  const { opsUser, opsLogin, opsRegister, opsLogout, setDemoOps } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Login form state
  const [operatorId, setOperatorId] = useState('GM-LOG-9921');
  const [mfaCode, setMfaCode] = useState('849021');
  const [clearanceTier, setClearanceTier] = useState<'Tier 1' | 'Tier 2' | 'Tier 3'>('Tier 3');
  const [useFido2, setUseFido2] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [successToast, setSuccessToast] = useState('');

  // Register form state
  const [regFullName, setRegFullName] = useState('Dr. Aris Thorne, MD, MPH');
  const [regOrg, setRegOrg] = useState('CMS Clinical Quality Oversight');
  const [regBadgeId, setRegBadgeId] = useState('CMS-STAR-1092');
  const [regRoleTitle, setRegRoleTitle] = useState('Chief Quality & Adherence Auditor');
  const [regAgency, setRegAgency] = useState('Centers for Medicare & Medicaid Services');
  const [regEmail, setRegEmail] = useState('a.thorne@cms.gov');
  const [regTier, setRegTier] = useState<'Tier 1' | 'Tier 2' | 'Tier 3'>('Tier 2');
  const [regJustification, setRegJustification] = useState('Mandated CMS 5-Star quality audit for Part D adherence metrics.');
  const [regMfa, setRegMfa] = useState<'TOTP' | 'FIDO2' | 'YubiKey'>('TOTP');
  const [attestPart11, setAttestPart11] = useState(true);
  const [registerError, setRegisterError] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!operatorId.trim()) {
      setLoginError('Please enter your Enterprise SSO or Government Badge ID.');
      return;
    }
    setLoginError('');
    opsLogin(operatorId, mfaCode, clearanceTier);
    setSuccessToast(`Identity verified via ${clearanceTier} authorization. Mission Control unlocked.`);
    setTimeout(() => {
      if (onSuccess) onSuccess();
    }, 900);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regFullName.trim() || !regBadgeId.trim() || !regOrg.trim()) {
      setRegisterError('Please provide your legal name, badge ID, and government/corporate organization.');
      return;
    }
    if (!attestPart11) {
      setRegisterError('You must agree to Title 21 CFR Part 11 electronic records auditing terms.');
      return;
    }

    setRegisterError('');
    opsRegister({
      fullName: regFullName.trim(),
      organization: regOrg.trim(),
      badgeId: regBadgeId.trim(),
      clearanceTier: regTier,
      roleTitle: regRoleTitle.trim() || 'Auditor',
      agency: regAgency.trim() || 'Oversight Agency',
      mfaMethod: regMfa
    });

    setSuccessToast('Operator credentials registered. Audit clearance granted.');
    setTimeout(() => {
      if (onSuccess) onSuccess();
    }, 900);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#001729] text-white rounded-3xl p-6 sm:p-8 border border-[#0f2c42] shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#86f2e4] animate-ping"></span>
            <span className="font-mono text-xs uppercase font-bold tracking-wider text-[#86f2e4]">
              Zero-Trust Enterprise Sentinel • 21 CFR Part 11
            </span>
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
            Mission Control Operator &amp; Regulatory Access
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
            Role-Based Access Control (RBAC) portal for network dispatch controllers, CMS healthcare adherence auditors, and DEA Title 21 compliance officers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-[#0a2033] border border-[#0f2c42] text-xs font-mono text-[#86f2e4]">
            FIPS 140-3 HSM ACTIVE
          </div>
          <div className="px-4 py-2 rounded-2xl bg-[#006a61] text-white text-xs font-bold font-mono">
            TLS 1.3 / mTLS
          </div>
        </div>
      </div>

      {/* Active Operator Status Card */}
      {opsUser && (
        <div className="bg-white rounded-3xl p-6 border border-[#e5eeff] shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#001729] text-[#86f2e4] font-display font-bold text-xl flex items-center justify-center border border-[#0f2c42] shadow-sm shrink-0">
              <Fingerprint className="w-7 h-7 text-[#86f2e4]" />
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-lg font-bold font-display text-[#001729]">{opsUser.fullName}</span>
                <span className="px-2 py-0.5 rounded-md bg-[#006a61] text-white text-[10px] font-bold font-mono">
                  {opsUser.clearanceTier} CLEARANCE
                </span>
                <span className="px-2 py-0.5 rounded-md bg-[#eff4ff] text-[#001729] text-[10px] font-mono border border-[#dce9ff]">
                  BADGE: {opsUser.badgeId}
                </span>
              </div>
              <p className="text-xs text-[#43474d] flex flex-wrap items-center gap-2">
                <span className="font-semibold text-[#001729]">{opsUser.roleTitle}</span>
                <span>•</span>
                <span>{opsUser.organization}</span>
                <span>•</span>
                <span className="text-[#006a61] font-mono">{opsUser.agency}</span>
              </p>
              <div className="flex items-center gap-3 pt-1 text-[11px] text-[#006a61]">
                <span className="flex items-center gap-1 font-mono">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  MFA Token: {opsUser.mfaMethod} Verified
                </span>
                <span className="text-[#73777d]">•</span>
                <span className="font-mono text-[#73777d]">Session: {opsUser.lastLogin}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                if (opsUser.clearanceTier === 'Tier 3') {
                  setDemoOps('cms');
                } else if (opsUser.clearanceTier === 'Tier 2') {
                  setDemoOps('dea');
                } else {
                  setDemoOps('logistics');
                }
              }}
              className="px-4 py-2.5 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] text-[#001729] text-xs font-bold border border-[#dce9ff] transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-[#006a61]" />
              <span>Cycle Operator Persona</span>
            </button>

            <button
              onClick={opsLogout}
              className="px-4 py-2.5 rounded-xl bg-[#ffdad6]/60 hover:bg-[#ffdad6] text-[#ba1a1a] text-xs font-bold border border-[#ffdad6] transition-all flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out Operator</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Container (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-[#e5eeff] shadow-xs space-y-6">
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
                    ? 'bg-[#001729] text-white shadow-xs'
                    : 'bg-[#eff4ff] text-[#43474d] hover:bg-[#dce9ff]'
                }`}
              >
                Enterprise SSO Sign In
              </button>
              <button
                onClick={() => {
                  setMode('register');
                  setLoginError('');
                  setRegisterError('');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  mode === 'register'
                    ? 'bg-[#006a61] text-white shadow-xs'
                    : 'bg-[#eff4ff] text-[#43474d] hover:bg-[#dce9ff]'
                }`}
              >
                Request Auditor / Operator Access
              </button>
            </div>

            <span className="text-[11px] font-mono text-[#73777d] hidden sm:inline">
              FIDO2 / WebAuthn Certified
            </span>
          </div>

          {/* Success Toast */}
          {successToast && (
            <div className="p-3.5 bg-[#e8fbf8] border border-[#86f2e4] text-[#006f66] rounded-2xl text-xs flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-[#006a61]" />
              <span>{successToast}</span>
            </div>
          )}

          {/* LOGIN FORM */}
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
                    Corporate SSO Email or Gov Badge ID
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#73777d] absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={operatorId}
                      onChange={(e) => setOperatorId(e.target.value)}
                      placeholder="e.g. GM-LOG-9921 or name@agency.gov"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#eff4ff] border border-[#dce9ff] rounded-xl text-[#001729] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006a61]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#001729] mb-1.5">
                    Requested Clearance Tier
                  </label>
                  <select
                    value={clearanceTier}
                    onChange={(e) => setClearanceTier(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-[#eff4ff] border border-[#dce9ff] rounded-xl text-[#001729] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006a61]"
                  >
                    <option value="Tier 1">Tier 1: Urban Fleet Dispatch &amp; Cold-Chain</option>
                    <option value="Tier 2">Tier 2: CMS Clinical Adherence &amp; Quality Auditor</option>
                    <option value="Tier 3">Tier 3: DEA Field Inspector &amp; Master Admin</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#001729] mb-1.5">
                    6-Digit TOTP / Authenticator Code
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-[#73777d] absolute left-3 top-2.5" />
                    <input
                      type="password"
                      maxLength={8}
                      value={mfaCode}
                      onChange={(e) => setMfaCode(e.target.value)}
                      placeholder="849021"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#eff4ff] border border-[#dce9ff] rounded-xl text-[#001729] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006a61]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#001729] mb-1.5">
                    Hardware FIDO2 Security Token
                  </label>
                  <div className="flex items-center gap-2 p-2 bg-[#eff4ff] border border-[#dce9ff] rounded-xl">
                    <input
                      type="checkbox"
                      id="fido"
                      checked={useFido2}
                      onChange={(e) => setUseFido2(e.target.checked)}
                      className="rounded text-[#006a61] w-4 h-4"
                    />
                    <label htmlFor="fido" className="text-xs text-[#001729] font-medium cursor-pointer">
                      YubiKey / FIDO2 Biometric Token Verified
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-[#73777d]">
                  All operator telemetry and queries are recorded in tamper-evident compliance logs.
                </span>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#001729] hover:bg-[#0f2c42] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2"
                >
                  <span>Authenticate Operator</span>
                  <ArrowRight className="w-4 h-4 text-[#86f2e4]" />
                </button>
              </div>
            </form>
          ) : (
            /* REGISTRATION FORM */
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
                    Legal Name &amp; Academic Credentials
                  </label>
                  <input
                    type="text"
                    value={regFullName}
                    onChange={(e) => setRegFullName(e.target.value)}
                    placeholder="e.g. Dr. Aris Thorne, MD, MPH"
                    className="w-full px-3 py-2 text-xs bg-[#eff4ff] border border-[#dce9ff] rounded-xl text-[#001729]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#001729] mb-1.5">
                    Official Agency or Corporate Entity
                  </label>
                  <input
                    type="text"
                    value={regOrg}
                    onChange={(e) => setRegOrg(e.target.value)}
                    placeholder="e.g. Centers for Medicare & Medicaid Services"
                    className="w-full px-3 py-2 text-xs bg-[#eff4ff] border border-[#dce9ff] rounded-xl text-[#001729]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#001729] mb-1.5">
                    Badge / Employee ID #
                  </label>
                  <input
                    type="text"
                    value={regBadgeId}
                    onChange={(e) => setRegBadgeId(e.target.value)}
                    placeholder="e.g. CMS-STAR-1092"
                    className="w-full px-3 py-2 text-xs bg-[#eff4ff] border border-[#dce9ff] rounded-xl text-[#001729] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#001729] mb-1.5">
                    Official Job Title
                  </label>
                  <input
                    type="text"
                    value={regRoleTitle}
                    onChange={(e) => setRegRoleTitle(e.target.value)}
                    placeholder="e.g. Chief Adherence Auditor"
                    className="w-full px-3 py-2 text-xs bg-[#eff4ff] border border-[#dce9ff] rounded-xl text-[#001729]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#001729] mb-1.5">
                    Clearance Tier Requested
                  </label>
                  <select
                    value={regTier}
                    onChange={(e) => setRegTier(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-[#eff4ff] border border-[#dce9ff] rounded-xl text-[#001729]"
                  >
                    <option value="Tier 1">Tier 1: Urban Fleet Dispatch</option>
                    <option value="Tier 2">Tier 2: CMS Clinical Quality</option>
                    <option value="Tier 3">Tier 3: DEA Field Inspector</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#001729] mb-1.5">
                  Audit Scope &amp; Statutory Justification
                </label>
                <textarea
                  rows={2}
                  value={regJustification}
                  onChange={(e) => setRegJustification(e.target.value)}
                  placeholder="State regulatory purpose for accessing real-time prescription logs or IoT cold-chain nodes..."
                  className="w-full px-3 py-2 text-xs bg-[#eff4ff] border border-[#dce9ff] rounded-xl text-[#001729]"
                />
              </div>

              <div className="p-3 bg-[#eff4ff] rounded-2xl border border-[#dce9ff]">
                <label className="flex items-start gap-2 text-xs text-[#43474d] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={attestPart11}
                    onChange={(e) => setAttestPart11(e.target.checked)}
                    className="mt-0.5 rounded text-[#006a61] w-4 h-4"
                  />
                  <span>
                    I affirm that this terminal access request conforms to Title 21 CFR Part 11 Electronic Signatures and HIPAA minimum necessary security standards.
                  </span>
                </label>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#006a61] hover:bg-[#005049] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2"
                >
                  <span>Submit Operator Registration</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right Column: Demo Switcher & RBAC Matrix (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Quick Demo Operator Logins */}
          <div className="bg-white rounded-3xl p-5 border border-[#e5eeff] shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#f0f4ff]">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#006a61]" />
                <h3 className="font-display font-bold text-sm text-[#001729]">Demo Operator Personas</h3>
              </div>
              <span className="text-[10px] font-mono text-[#006a61] font-bold">1-CLICK LOGIN</span>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => {
                  setOperatorId(DEMO_OPS_OPERATORS.logistics.badgeId);
                  setClearanceTier('Tier 3');
                  opsLogin(DEMO_OPS_OPERATORS.logistics.badgeId, '849021', 'Tier 3');
                  setSuccessToast('Authenticated as Elena Rostova (Logistics Director)');
                }}
                className="w-full p-3 rounded-2xl bg-[#eff4ff] hover:bg-[#dce9ff] border border-[#dce9ff] text-left transition-all space-y-1"
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xs text-[#001729]">Elena Rostova</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#001729] text-white text-[9px] font-bold">TIER 3</span>
                </div>
                <p className="text-[11px] text-[#43474d]">Director of Fulfillment • Fleet Dispatch &amp; IoT</p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setOperatorId(DEMO_OPS_OPERATORS.dea.badgeId);
                  setClearanceTier('Tier 3');
                  opsLogin(DEMO_OPS_OPERATORS.dea.badgeId, '440912', 'Tier 3');
                  setSuccessToast('Authenticated as Special Agent David Miller (DEA)');
                }}
                className="w-full p-3 rounded-2xl bg-[#eff4ff] hover:bg-[#dce9ff] border border-[#dce9ff] text-left transition-all space-y-1"
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xs text-[#001729]">Agent David Miller</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#006a61] text-white text-[9px] font-bold">DEA REG</span>
                </div>
                <p className="text-[11px] text-[#43474d]">DEA Diversion Control • 21 CFR § 1311 Auditor</p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setOperatorId(DEMO_OPS_OPERATORS.cms.badgeId);
                  setClearanceTier('Tier 2');
                  opsLogin(DEMO_OPS_OPERATORS.cms.badgeId, '109244', 'Tier 2');
                  setSuccessToast('Authenticated as Dr. Aris Thorne (CMS Quality Auditor)');
                }}
                className="w-full p-3 rounded-2xl bg-[#eff4ff] hover:bg-[#dce9ff] border border-[#dce9ff] text-left transition-all space-y-1"
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xs text-[#001729]">Dr. Aris Thorne, MD</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#86f2e4] text-[#006f66] text-[9px] font-bold">CMS 5-STAR</span>
                </div>
                <p className="text-[11px] text-[#43474d]">CMS Adherence &amp; PDC Quality Oversight</p>
              </button>
            </div>
          </div>

          {/* Security Sentinel Diagnostic */}
          <div className="bg-[#001729] text-white rounded-3xl p-5 border border-[#0f2c42] shadow-sm space-y-3">
            <div className="flex items-center justify-between text-[#86f2e4] pb-2 border-b border-[#0f2c42]">
              <span className="font-bold text-xs">Security &amp; Regulatory Sentinel</span>
              <ShieldCheck className="w-4 h-4" />
            </div>

            <p className="text-[11px] text-gray-300 leading-relaxed">
              Zero unauthorized intrusion attempts or token compromises across 412 fulfillment hub stations and cold-chain gateways.
            </p>

            <div className="pt-2 border-t border-[#0f2c42] text-[10px] font-mono text-[#86f2e4] flex justify-between">
              <span>Audit Ledger Chain:</span>
              <span>SYNCHRONIZED ✓</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
