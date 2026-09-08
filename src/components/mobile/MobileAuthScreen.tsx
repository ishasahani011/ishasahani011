import React, { useState } from 'react';
import { useAuth, DEMO_PATIENTS } from '../../context/AuthContext';
import { 
  User, 
  Lock, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  LogOut, 
  ArrowRight, 
  KeyRound, 
  Sparkles,
  AlertCircle,
  FileText,
  CreditCard
} from 'lucide-react';

interface MobileAuthScreenProps {
  onSuccess: () => void;
}

export const MobileAuthScreen: React.FC<MobileAuthScreenProps> = ({ onSuccess }) => {
  const { patientUser, patientLogin, patientRegister, patientLogout, setDemoPatient } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('sarah.jenkins@patientcare.net');
  const [loginPassword, setLoginPassword] = useState('••••••••••');
  const [loginError, setLoginError] = useState('');
  const [loginSuccessToast, setLoginSuccessToast] = useState('');

  // Register form state
  const [regFullName, setRegFullName] = useState('');
  const [regDob, setRegDob] = useState('1992-06-18');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regStreet, setRegStreet] = useState('');
  const [regCity, setRegCity] = useState('Austin');
  const [regState, setRegState] = useState('TX');
  const [regZip, setRegZip] = useState('78701');
  const [regInsurance, setRegInsurance] = useState<'cash' | 'commercial' | 'medicare'>('cash');
  const [regAllergies, setRegAllergies] = useState('None known');
  const [agreedHipaa, setAgreedHipaa] = useState(true);
  const [registerError, setRegisterError] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginIdentifier.trim()) {
      setLoginError('Please enter your email or mobile phone number.');
      return;
    }
    setLoginError('');
    patientLogin(loginIdentifier, loginPassword);
    setLoginSuccessToast('Welcome back! Successfully logged into your patient vault.');
    setTimeout(() => {
      onSuccess();
    }, 900);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regFullName.trim()) {
      setRegisterError('Please enter your legal full name.');
      return;
    }
    if (!regEmail.trim() || !regPhone.trim()) {
      setRegisterError('Please provide both email and mobile phone for Rx delivery alerts.');
      return;
    }
    if (!agreedHipaa) {
      setRegisterError('Please accept the HIPAA privacy policy to proceed.');
      return;
    }

    setRegisterError('');
    patientRegister({
      fullName: regFullName.trim(),
      dob: regDob,
      email: regEmail.trim(),
      phone: regPhone.trim(),
      address: {
        street: regStreet.trim() || '120 Colorado St',
        city: regCity.trim() || 'Austin',
        state: regState.trim() || 'TX',
        zip: regZip.trim() || '78701'
      },
      insurancePreference: regInsurance,
      knownAllergies: regAllergies.trim() || 'None'
    });

    setLoginSuccessToast('Account registered! Your genericMed patient profile is active.');
    setTimeout(() => {
      onSuccess();
    }, 900);
  };

  // If already logged in, show the active profile with an option to logout or switch
  if (patientUser) {
    return (
      <div className="p-4 space-y-4 animate-in fade-in duration-200">
        <div className="bg-white rounded-3xl p-5 border border-[#e5eeff] shadow-xs text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-[#006a61] text-white text-xl font-bold flex items-center justify-center mx-auto shadow-md ring-4 ring-[#86f2e4]/30">
            {patientUser.fullName.split(' ').map(n => n[0]).join('')}
          </div>

          <div>
            <div className="flex items-center justify-center gap-1.5 text-xs text-[#006a61] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#006a61]" />
              <span>Verified Patient Account</span>
            </div>
            <h2 className="font-display font-bold text-xl text-[#001729] mt-0.5">
              {patientUser.fullName}
            </h2>
            <p className="font-mono text-xs text-[#73777d]">ID: {patientUser.id}</p>
          </div>

          <div className="bg-[#eff4ff] rounded-2xl p-3 text-left space-y-2 text-xs border border-[#dce9ff]">
            <div className="flex justify-between py-1 border-b border-[#dce9ff]/60">
              <span className="text-[#73777d]">Contact Phone:</span>
              <span className="font-semibold text-[#001729]">{patientUser.phone}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#dce9ff]/60">
              <span className="text-[#73777d]">Email:</span>
              <span className="font-semibold text-[#001729] truncate max-w-[180px]">{patientUser.email}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#dce9ff]/60">
              <span className="text-[#73777d]">Date of Birth:</span>
              <span className="font-semibold text-[#001729]">{patientUser.dob}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#dce9ff]/60">
              <span className="text-[#73777d]">Rx Delivery Address:</span>
              <span className="font-semibold text-[#001729] text-right truncate max-w-[180px]">
                {patientUser.address.street}, {patientUser.address.city}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[#73777d]">Billing / Insurance:</span>
              <span className="font-bold text-[#006a61] uppercase tracking-wider text-[11px]">
                {patientUser.insurancePreference} Pricing
              </span>
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={onSuccess}
              className="w-full py-2.5 bg-[#006a61] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#005049] transition-all flex items-center justify-center gap-1.5"
            >
              <span>Continue to Marketplace</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={patientLogout}
              className="w-full py-2 bg-transparent text-[#ba1a1a] hover:bg-[#ffdad6]/40 text-xs font-semibold rounded-xl border border-[#ffdad6] transition-all flex items-center justify-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out of Patient Vault</span>
            </button>
          </div>
        </div>

        {/* Quick Demo Account Switcher */}
        <div className="bg-[#eff4ff] p-3 rounded-2xl border border-[#dce9ff] text-xs space-y-2">
          <span className="font-bold text-[#001729] text-[11px] uppercase tracking-wider block">
            Switch Demo Patient Persona
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setDemoPatient('sarah')}
              className={`p-2 rounded-xl border text-left transition-all ${
                patientUser.fullName.includes('Sarah')
                  ? 'bg-white border-[#006a61] shadow-xs'
                  : 'bg-white/60 border-[#dce9ff] hover:bg-white'
              }`}
            >
              <p className="font-bold text-[#001729] text-[11px]">Sarah Jenkins</p>
              <p className="text-[10px] text-[#73777d]">Cash / Self-Pay</p>
            </button>

            <button
              onClick={() => setDemoPatient('robert')}
              className={`p-2 rounded-xl border text-left transition-all ${
                patientUser.fullName.includes('Robert')
                  ? 'bg-white border-[#006a61] shadow-xs'
                  : 'bg-white/60 border-[#dce9ff] hover:bg-white'
              }`}
            >
              <p className="font-bold text-[#001729] text-[11px]">Robert Chen</p>
              <p className="text-[10px] text-[#73777d]">Medicare Part D</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 animate-in fade-in duration-200">
      {/* Brand Header */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#86f2e4]/30 text-[#006f66] text-[11px] font-bold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>HIPAA-Compliant Patient Portal</span>
        </div>
        <h2 className="font-display font-bold text-xl text-[#001729]">
          {mode === 'login' ? 'Sign in to genericMed' : 'Create Patient Account'}
        </h2>
        <p className="text-xs text-[#73777d]">
          {mode === 'login' 
            ? 'Access your prescriptions, price tracking, and order history.' 
            : 'Get instant access to wholesale generic pricing & fast delivery.'}
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="grid grid-cols-2 p-1 bg-[#eff4ff] rounded-2xl border border-[#dce9ff]">
        <button
          onClick={() => {
            setMode('login');
            setLoginError('');
            setRegisterError('');
          }}
          className={`py-2 text-xs font-bold rounded-xl transition-all ${
            mode === 'login'
              ? 'bg-white text-[#001729] shadow-xs'
              : 'text-[#73777d] hover:text-[#001729]'
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => {
            setMode('register');
            setLoginError('');
            setRegisterError('');
          }}
          className={`py-2 text-xs font-bold rounded-xl transition-all ${
            mode === 'register'
              ? 'bg-white text-[#001729] shadow-xs'
              : 'text-[#73777d] hover:text-[#001729]'
          }`}
        >
          Register
        </button>
      </div>

      {/* Success Toast */}
      {loginSuccessToast && (
        <div className="p-3 bg-[#e8fbf8] border border-[#86f2e4] text-[#006f66] rounded-2xl text-xs flex items-center gap-2 font-medium">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-[#006a61]" />
          <span>{loginSuccessToast}</span>
        </div>
      )}

      {/* 1-Click Demo Profiles Pill (For instant tester evaluation) */}
      <div className="bg-white p-3 rounded-2xl border border-[#e5eeff] shadow-xs space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase font-bold text-[#73777d] tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#006a61]" />
            Quick Demo Autofill
          </span>
          <span className="text-[10px] text-[#006a61] font-bold">1-Click Test</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => {
              setLoginIdentifier(DEMO_PATIENTS.sarah.email);
              setLoginPassword('Password123!');
            }}
            className="p-1.5 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] text-left border border-[#dce9ff] transition-all text-xs"
          >
            <p className="font-bold text-[#001729] text-[11px]">Sarah Jenkins</p>
            <p className="text-[10px] text-[#73777d] font-mono">sarah.jenkins@...</p>
          </button>

          <button
            type="button"
            onClick={() => {
              setLoginIdentifier(DEMO_PATIENTS.robert.email);
              setLoginPassword('Password123!');
            }}
            className="p-1.5 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] text-left border border-[#dce9ff] transition-all text-xs"
          >
            <p className="font-bold text-[#001729] text-[11px]">Robert Chen</p>
            <p className="text-[10px] text-[#73777d] font-mono">robert.chen@...</p>
          </button>
        </div>
      </div>

      {/* LOGIN FORM */}
      {mode === 'login' ? (
        <form onSubmit={handleLoginSubmit} className="bg-white p-4 rounded-3xl border border-[#e5eeff] shadow-xs space-y-3">
          {loginError && (
            <div className="p-2.5 bg-[#ffdad6] text-[#ba1a1a] rounded-xl text-xs flex items-center gap-1.5 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-[#43474d] mb-1">
              Email or Mobile Phone Number
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#73777d] absolute left-3 top-2.5" />
              <input
                type="text"
                value={loginIdentifier}
                onChange={(e) => setLoginIdentifier(e.target.value)}
                placeholder="name@email.com or (512) 555-0100"
                className="w-full pl-9 pr-3 py-2 text-xs bg-[#eff4ff] border border-[#dce9ff] rounded-xl text-[#001729] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006a61]"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[11px] font-bold text-[#43474d]">
                Password or 6-Digit SMS Code
              </label>
              <button
                type="button"
                onClick={() => setLoginPassword('894012')}
                className="text-[10px] text-[#006a61] hover:underline font-semibold"
              >
                Use SMS OTP
              </button>
            </div>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-[#73777d] absolute left-3 top-2.5" />
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Enter password or OTP"
                className="w-full pl-9 pr-3 py-2 text-xs bg-[#eff4ff] border border-[#dce9ff] rounded-xl text-[#001729] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006a61]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-1.5 text-[#73777d] cursor-pointer text-[11px]">
              <input type="checkbox" defaultChecked className="rounded text-[#006a61]" />
              <span>Remember me</span>
            </label>
            <a href="#reset" onClick={(e) => { e.preventDefault(); setLoginPassword('123456'); }} className="text-[#006a61] text-[11px] font-semibold hover:underline">
              Send login link
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#006a61] hover:bg-[#005049] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 mt-2"
          >
            <span>Sign In to My Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      ) : (
        /* REGISTRATION FORM */
        <form onSubmit={handleRegisterSubmit} className="bg-white p-4 rounded-3xl border border-[#e5eeff] shadow-xs space-y-3">
          {registerError && (
            <div className="p-2.5 bg-[#ffdad6] text-[#ba1a1a] rounded-xl text-xs flex items-center gap-1.5 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{registerError}</span>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold text-[#43474d] mb-1">
              Legal Full Name (Matching Rx)
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#73777d] absolute left-3 top-2.5" />
              <input
                type="text"
                value={regFullName}
                onChange={(e) => setRegFullName(e.target.value)}
                placeholder="e.g. Jessica Taylor"
                className="w-full pl-9 pr-3 py-2 text-xs bg-[#eff4ff] border border-[#dce9ff] rounded-xl text-[#001729] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006a61]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-bold text-[#43474d] mb-1">
                Date of Birth
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-[#73777d] absolute left-3 top-2.5" />
                <input
                  type="date"
                  value={regDob}
                  onChange={(e) => setRegDob(e.target.value)}
                  className="w-full pl-9 pr-2 py-2 text-xs bg-[#eff4ff] border border-[#dce9ff] rounded-xl text-[#001729] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006a61]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#43474d] mb-1">
                Mobile Phone (SMS)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#73777d] absolute left-3 top-2.5" />
                <input
                  type="tel"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="(512) 555-0199"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#eff4ff] border border-[#dce9ff] rounded-xl text-[#001729] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006a61]"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#43474d] mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#73777d] absolute left-3 top-2.5" />
              <input
                type="email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="name@email.com"
                className="w-full pl-9 pr-3 py-2 text-xs bg-[#eff4ff] border border-[#dce9ff] rounded-xl text-[#001729] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006a61]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#43474d] mb-1">
              Rx Delivery Address
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-[#73777d] absolute left-3 top-2.5" />
              <input
                type="text"
                value={regStreet}
                onChange={(e) => setRegStreet(e.target.value)}
                placeholder="Street Address, Apt / Suite"
                className="w-full pl-9 pr-3 py-2 text-xs bg-[#eff4ff] border border-[#dce9ff] rounded-xl text-[#001729] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006a61]"
              />
            </div>
            <div className="grid grid-cols-3 gap-1.5 mt-1.5">
              <input
                type="text"
                value={regCity}
                onChange={(e) => setRegCity(e.target.value)}
                placeholder="City"
                className="px-2.5 py-1.5 text-xs bg-[#eff4ff] border border-[#dce9ff] rounded-xl text-[#001729]"
              />
              <input
                type="text"
                value={regState}
                onChange={(e) => setRegState(e.target.value)}
                placeholder="State"
                className="px-2.5 py-1.5 text-xs bg-[#eff4ff] border border-[#dce9ff] rounded-xl text-[#001729]"
              />
              <input
                type="text"
                value={regZip}
                onChange={(e) => setRegZip(e.target.value)}
                placeholder="ZIP"
                className="px-2.5 py-1.5 text-xs bg-[#eff4ff] border border-[#dce9ff] rounded-xl text-[#001729]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#43474d] mb-1">
              Pricing &amp; Coverage Preference
            </label>
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => setRegInsurance('cash')}
                className={`p-1.5 rounded-xl border text-center transition-all ${
                  regInsurance === 'cash'
                    ? 'bg-[#006a61] text-white border-[#006a61] font-bold'
                    : 'bg-[#eff4ff] text-[#43474d] border-[#dce9ff]'
                }`}
              >
                Cash / Direct
              </button>
              <button
                type="button"
                onClick={() => setRegInsurance('commercial')}
                className={`p-1.5 rounded-xl border text-center transition-all ${
                  regInsurance === 'commercial'
                    ? 'bg-[#006a61] text-white border-[#006a61] font-bold'
                    : 'bg-[#eff4ff] text-[#43474d] border-[#dce9ff]'
                }`}
              >
                Commercial
              </button>
              <button
                type="button"
                onClick={() => setRegInsurance('medicare')}
                className={`p-1.5 rounded-xl border text-center transition-all ${
                  regInsurance === 'medicare'
                    ? 'bg-[#006a61] text-white border-[#006a61] font-bold'
                    : 'bg-[#eff4ff] text-[#43474d] border-[#dce9ff]'
                }`}
              >
                Medicare
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#43474d] mb-1">
              Known Drug Allergies
            </label>
            <input
              type="text"
              value={regAllergies}
              onChange={(e) => setRegAllergies(e.target.value)}
              placeholder="e.g. Penicillin, Codeine, or None"
              className="w-full px-3 py-2 text-xs bg-[#eff4ff] border border-[#dce9ff] rounded-xl text-[#001729]"
            />
          </div>

          <div className="pt-1">
            <label className="flex items-start gap-2 text-[11px] text-[#73777d] cursor-pointer">
              <input
                type="checkbox"
                checked={agreedHipaa}
                onChange={(e) => setAgreedHipaa(e.target.checked)}
                className="mt-0.5 rounded text-[#006a61]"
              />
              <span>
                I authorize genericMed and partner pharmacies to receive my prescriptions and agree to the Notice of Privacy Practices (HIPAA).
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#006a61] hover:bg-[#005049] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 mt-2"
          >
            <span>Create Patient Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}
    </div>
  );
};
