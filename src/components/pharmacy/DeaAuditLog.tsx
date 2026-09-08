import React, { useState } from 'react';
import { INITIAL_AUDIT_RECORDS } from '../../data/mockData';
import { AuditRecord } from '../../types';
import { 
  ShieldCheck, 
  Lock, 
  Search, 
  Download, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  FileText, 
  Terminal, 
  Fingerprint, 
  Hash
} from 'lucide-react';

interface DeaAuditLogProps {
  initialInspectorMode?: boolean;
}

export const DeaAuditLog: React.FC<DeaAuditLogProps> = ({ initialInspectorMode = false }) => {
  const [logs, setLogs] = useState<AuditRecord[]>(INITIAL_AUDIT_RECORDS);
  const [inspectorMode, setInspectorMode] = useState<boolean>(initialInspectorMode);
  const [searchQuery, setSearchQuery] = useState('');
  const [scheduleFilter, setScheduleFilter] = useState<'all' | 'C-II' | 'C-III' | 'C-IV' | 'C-V'>('all');
  const [selectedRecord, setSelectedRecord] = useState<AuditRecord>(INITIAL_AUDIT_RECORDS[0]);
  const [feedback, setFeedback] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3500);
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.protocol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.medicationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.partyDea.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.partyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSchedule = scheduleFilter === 'all' || log.schedule === scheduleFilter;
    return matchesSearch && matchesSchedule;
  });

  return (
    <div className="flex flex-col w-full space-y-5 text-[#0b1c30]">
      {/* Regulatory Context & Blockchain Ledger Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 font-mono text-xs uppercase text-[#73777d]">
            <span>Regulatory &amp; DEA Compliance</span>
            <span>/</span>
            <span className="text-[#006a61] font-bold">21 CFR § 1311 / DSCSA EPCIS Ledger</span>
          </div>

          <div className="flex items-center gap-3 mt-1">
            <h1 className="font-display font-bold text-2xl text-[#001729] tracking-tight">
              DEA &amp; State Board Regulatory Audit Log
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#86f2e4] text-[#006f66] text-xs font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006a61] animate-ping"></span>
              SHA-256 HASH CHAIN: VALID
            </span>
          </div>

          <p className="text-xs text-[#43474d] max-w-3xl mt-1 leading-relaxed">
            Immutable, cryptographically chained electronic audit trail satisfying DEA CSOS Title 21 CFR § 1311, California Board of Pharmacy (BPC § 4081), and FDA DSCSA Track-and-Trace Title II requirements.
          </p>
        </div>

        {/* Inspector Mode & Export Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => {
              setInspectorMode(!inspectorMode);
              showToast(inspectorMode ? "Standard Pharmacist Mode restored." : "Inspector Redacted View activated: HIPAA PII masked for State Board/DEA audit inspection.");
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all ${
              inspectorMode
                ? 'bg-[#ba1a1a] text-white border-[#ba1a1a] shadow-xs'
                : 'bg-white hover:bg-[#eff4ff] text-[#001729] border-[#dce9ff] shadow-xs'
            }`}
          >
            {inspectorMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4 text-[#006a61]" />}
            <span>{inspectorMode ? 'Exit Inspector View' : 'Inspector Redacted View'}</span>
          </button>

          <button 
            onClick={() => showToast("DEA Form 222 electronic dossier signed and packaged into verifiable ZIP archive.")}
            className="px-3.5 py-2 bg-[#001729] hover:bg-[#0f2c42] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-[#86f2e4]" />
            <span>Export DEA 222 Dossier</span>
          </button>
        </div>
      </div>

      {feedback && (
        <div className="p-3 bg-[#86f2e4] text-[#006f66] rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Inspector Mode Active Notice */}
      {inspectorMode && (
        <div className="p-3 bg-[#ffdad6] border border-[#ba1a1a]/30 rounded-2xl flex items-center justify-between text-xs text-[#410002]">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#ba1a1a]" />
            <span className="font-bold">
              State Board &amp; DEA Field Inspector Redaction Mode Active (BPC § 4081 Redacted Safe-Harbor)
            </span>
          </div>
          <span className="font-mono text-[11px] font-bold text-[#ba1a1a]">PATIENT NAMES &amp; DOB MASKED</span>
        </div>
      )}

      {/* Regulatory KPI Metric Deck */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-[#e5eeff] shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold text-[#73777d] uppercase tracking-wider">Schedule II Perpetual Balance</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display font-bold text-2xl text-[#001729] font-mono">1,420</span>
                <span className="text-xs text-[#73777d]">dos. units</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-[#86f2e4] text-[#006f66] text-[10px] font-bold">
              0 Discrepancy
            </span>
          </div>
          <span className="text-[11px] text-[#006a61] font-semibold mt-2">
            Perpetual Ledger Reconciled 14m ago
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#e5eeff] shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold text-[#73777d] uppercase tracking-wider">DEA CSOS Signatures</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display font-bold text-2xl text-[#001729] font-mono">100%</span>
                <span className="text-xs text-[#006a61] font-bold">Validated</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-[#eff4ff] text-[#006a61] text-[10px] font-bold">
              NIST Level 3
            </span>
          </div>
          <span className="text-[11px] text-[#43474d] mt-2">
            Hardware PKI Token + Biometric Face ID
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#e5eeff] shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold text-[#73777d] uppercase tracking-wider">DSCSA EPCIS T3 Compliance</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display font-bold text-2xl text-[#001729] font-mono">100%</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-[#86f2e4] text-[#006f66] text-[10px] font-bold">
              Track-and-Trace
            </span>
          </div>
          <span className="text-[11px] text-[#006a61] font-semibold mt-2">
            Serialization DataMatrix 2D Verified
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#e5eeff] shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-bold text-[#73777d] uppercase tracking-wider">State PMP (CURES) Sync</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display font-bold text-2xl text-[#001729] font-mono">Real-Time</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-[#eff4ff] text-[#001729] text-[10px] font-bold">
              ASAP 4.2B
            </span>
          </div>
          <span className="text-[11px] text-[#43474d] mt-2">
            Last transmit: 2m ago • 0 State Exceptions
          </span>
        </div>
      </div>

      {/* Filter and Search Controller */}
      <div className="bg-white rounded-2xl p-4 border border-[#e5eeff] shadow-xs space-y-3">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 justify-between">
          <div className="relative flex-1 max-w-xl">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#73777d]" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Protocol/Rx #, Drug, Prescriber DEA, Entity..."
              className="w-full pl-9 pr-4 py-2 bg-[#eff4ff] text-xs text-[#001729] rounded-xl border border-[#dce9ff] focus:outline-none focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto text-xs">
            {['all', 'C-II', 'C-III', 'C-IV', 'C-V'].map((sch) => (
              <button
                key={sch}
                onClick={() => setScheduleFilter(sch as any)}
                className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
                  scheduleFilter === sch
                    ? 'bg-[#001729] text-white font-bold'
                    : 'bg-[#eff4ff] text-[#43474d] hover:bg-[#dce9ff]'
                }`}
              >
                {sch === 'all' ? 'All Schedules' : `Schedule ${sch}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Primary Split: Ledger Table (7 Cols) + Cryptographic Forensic Detail (5 Cols) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
        {/* Ledger Table */}
        <div className="xl:col-span-8 bg-white rounded-2xl border border-[#e5eeff] shadow-xs overflow-hidden">
          <div className="p-3.5 bg-[#eff4ff] border-b border-[#e5eeff] flex justify-between items-center text-xs font-semibold">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#006a61]" />
              <span className="text-[#001729]">DEA Form 222 &amp; DSCSA Epics Cryptographic Ledger</span>
            </div>
            <span className="font-mono text-[#006a61] text-[10px]">Block #894,120</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#f8f9ff] text-[#73777d] font-mono text-[10px] uppercase tracking-wider border-b border-[#e5eeff]">
                  <th className="py-2.5 px-3 font-bold">Timestamp &amp; Schedule</th>
                  <th className="py-2.5 px-3 font-bold">Protocol &amp; Controlled Drug</th>
                  <th className="py-2.5 px-3 font-bold">Entity / DEA</th>
                  <th className="py-2.5 px-3 font-bold text-right">Qty Change / Balance</th>
                  <th className="py-2.5 px-3 font-bold text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f4ff]">
                {filteredLogs.map((log) => {
                  const isSelected = selectedRecord.id === log.id;
                  const partyDisplay = inspectorMode && !log.partyDea.startsWith('DEA #RA')
                    ? `[REDACTED ENTITY-${log.id}]`
                    : log.partyName;

                  return (
                    <tr 
                      key={log.id}
                      onClick={() => setSelectedRecord(log)}
                      className={`hover:bg-[#eff4ff] cursor-pointer transition-colors ${
                        isSelected ? 'bg-[#eff4ff]' : ''
                      }`}
                    >
                      <td className="py-3 px-3">
                        <span className="font-mono text-[11px] text-[#001729] block">{log.timestamp}</span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className={`px-1.5 py-0.2 rounded font-mono text-[9px] font-bold ${
                            log.schedule === 'C-II' ? 'bg-[#ffdad6] text-[#ba1a1a]' : 'bg-[#eff4ff] text-[#006a61]'
                          }`}>
                            {log.schedule}
                          </span>
                          <span className="font-mono text-[9px] text-[#73777d] uppercase">{log.eventType}</span>
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <span className="font-title font-bold text-xs text-[#001729] block">{log.medicationName}</span>
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#73777d]">
                          <span className="font-semibold text-[#006a61]">{log.protocol}</span>
                          <span>•</span>
                          <span>NDC: {log.ndc}</span>
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <span className="font-medium text-xs text-[#001729] block">{partyDisplay}</span>
                        <span className="text-[10px] font-mono text-[#73777d]">{log.partyDea}</span>
                      </td>

                      <td className="py-3 px-3 text-right font-mono">
                        <span className={`font-bold block ${log.qtyChange > 0 ? 'text-[#006a61]' : 'text-[#ba1a1a]'}`}>
                          {log.qtyChange > 0 ? `+${log.qtyChange}` : log.qtyChange}
                        </span>
                        <span className="text-[10px] text-[#73777d]">Vault: {log.vaultBalance}</span>
                      </td>

                      <td className="py-3 px-3 text-center">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#86f2e4] text-[#006f66] font-mono text-[9px] font-bold">
                          {log.pmpStatus}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Forensic Detail Sidecar */}
        <div className="xl:col-span-4 bg-white rounded-2xl p-4 border border-[#e5eeff] shadow-xs space-y-4 text-xs">
          <div className="flex justify-between items-center pb-2 border-b border-[#f0f4ff]">
            <div className="flex items-center gap-1.5">
              <Fingerprint className="w-4 h-4 text-[#006a61]" />
              <span className="font-bold text-xs uppercase text-[#001729]">Forensic Trace Inspector</span>
            </div>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#001729] text-white font-bold">
              {selectedRecord.protocol}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#eff4ff] border border-[#dce9ff] space-y-2">
            <div className="flex justify-between items-start">
              <span className="font-title font-bold text-sm text-[#001729]">{selectedRecord.medicationName}</span>
              <span className="px-1.5 py-0.5 rounded bg-[#ffdad6] text-[#ba1a1a] font-mono text-[10px] font-bold">
                {selectedRecord.schedule}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-[#43474d]">
              <div>
                <span className="text-[10px] text-[#73777d] block">NDC Packaging</span>
                <span className="font-mono font-bold text-[#001729]">{selectedRecord.ndc}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#73777d] block">Event Category</span>
                <span className="font-bold text-[#001729]">{selectedRecord.eventType}</span>
              </div>
            </div>
          </div>

          {/* Cryptographic Proof Block */}
          <div className="p-3 bg-[#001729] text-white rounded-xl space-y-2 font-mono text-[10px]">
            <div className="flex justify-between items-center text-[#86f2e4] border-b border-[#0f2c42] pb-1">
              <span className="flex items-center gap-1">
                <Hash className="w-3.5 h-3.5" />
                <span>Cryptographic SHA-256 Digest</span>
              </span>
              <span className="text-[9px]">BLOCK #894,120</span>
            </div>
            <div className="break-all text-gray-300 bg-[#0f2c42] p-2 rounded leading-tight">
              {selectedRecord.sha256Hash}
            </div>
            <div className="flex justify-between text-[#86f2e4] pt-1">
              <span>Merkle Root: 0x884a...92f1</span>
              <span>Genesis Match: OK</span>
            </div>
          </div>

          {/* Pharmacist Dual Verification Sign-Off */}
          <div className="space-y-2 border-t border-[#f0f4ff] pt-2">
            <span className="font-bold text-xs text-[#001729] block">Dual-Sign Off Verification</span>
            <div className="p-2.5 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex items-center justify-between">
              <div>
                <span className="font-bold text-[#001729] block">{selectedRecord.dualSignatures.primaryRph}</span>
                <span className="text-[10px] text-[#73777d]">CSOS SmartCard Verified</span>
              </div>
              <CheckCircle2 className="w-4 h-4 text-[#006a61]" />
            </div>
          </div>

          <button 
            onClick={() => showToast(`Official Certificate of Authenticity generated for ${selectedRecord.protocol}`)}
            className="w-full py-2.5 bg-[#006a61] hover:bg-[#005049] text-white text-xs font-bold rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>Export Verified Chain Certificate</span>
          </button>
        </div>
      </div>
    </div>
  );
};
