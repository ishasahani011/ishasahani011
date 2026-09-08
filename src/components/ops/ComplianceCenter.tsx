import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { 
  ShieldCheck, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  Pill, 
  Calendar, 
  Clock, 
  Truck, 
  Sparkles, 
  RefreshCw, 
  Filter, 
  ArrowUpRight, 
  Info,
  Send,
  UserCheck,
  ChevronRight,
  HeartPulse,
  Award
} from 'lucide-react';

// Adherence Data Interfaces
interface AdherenceTimePoint {
  date: string;
  label: string;
  compositePDC: number;
  statinsPDC: number;
  antihypertensivesPDC: number;
  antidiabeticsPDC: number;
  patientsCount: number;
}

interface FulfillmentPatternBin {
  window: string;
  label: string;
  courierPercent: number;
  retailPickupPercent: number;
  mailOrderPercent: number;
  riskLevel: 'optimal' | 'moderate' | 'high-risk';
}

interface AdherencePatientAlert {
  id: string;
  patientInitials: string;
  age: number;
  insuranceType: 'Medicare Advantage' | 'Commercial' | 'Medicaid';
  medication: string;
  ndc: string;
  therapeuticClass: 'Statins' | 'ACEi/ARB' | 'Antidiabetic' | 'Anticoagulant';
  currentPDC: number;
  daysSupplyRemaining: number;
  patternStatus: 'Due in 48h' | 'Lapse: 4 Days Late' | 'Critical Drop: 9d' | 'First-Fill Risk';
  lastFillChannel: 'genericMed Courier' | 'Station 04 Retail' | 'Central Mail';
  riskScore: 'High' | 'Medium' | 'Low';
  actionTaken?: string;
}

const INITIAL_TIME_SERIES: AdherenceTimePoint[] = [
  { date: '2026-06-01', label: 'Wk 1', compositePDC: 81.2, statinsPDC: 83.4, antihypertensivesPDC: 82.1, antidiabeticsPDC: 78.2, patientsCount: 16200 },
  { date: '2026-06-08', label: 'Wk 2', compositePDC: 81.8, statinsPDC: 84.1, antihypertensivesPDC: 82.8, antidiabeticsPDC: 78.9, patientsCount: 16450 },
  { date: '2026-06-15', label: 'Wk 3', compositePDC: 82.5, statinsPDC: 84.9, antihypertensivesPDC: 83.4, antidiabeticsPDC: 79.5, patientsCount: 16720 },
  { date: '2026-06-22', label: 'Wk 4', compositePDC: 83.1, statinsPDC: 85.3, antihypertensivesPDC: 84.0, antidiabeticsPDC: 80.2, patientsCount: 17010 },
  { date: '2026-06-29', label: 'Wk 5', compositePDC: 83.9, statinsPDC: 86.0, antihypertensivesPDC: 84.6, antidiabeticsPDC: 81.0, patientsCount: 17290 },
  { date: '2026-07-06', label: 'Wk 6', compositePDC: 84.4, statinsPDC: 86.7, antihypertensivesPDC: 85.2, antidiabeticsPDC: 81.6, patientsCount: 17540 },
  { date: '2026-07-13', label: 'Wk 7', compositePDC: 84.9, statinsPDC: 87.2, antihypertensivesPDC: 85.8, antidiabeticsPDC: 82.3, patientsCount: 17820 },
  { date: '2026-07-20', label: 'Wk 8', compositePDC: 85.3, statinsPDC: 87.6, antihypertensivesPDC: 86.1, antidiabeticsPDC: 82.9, patientsCount: 18050 },
  { date: '2026-07-27', label: 'Wk 9', compositePDC: 85.8, statinsPDC: 88.1, antihypertensivesPDC: 86.7, antidiabeticsPDC: 83.4, patientsCount: 18240 },
  { date: '2026-08-03', label: 'Wk 10', compositePDC: 86.1, statinsPDC: 88.5, antihypertensivesPDC: 87.1, antidiabeticsPDC: 83.9, patientsCount: 18390 },
  { date: '2026-08-10', label: 'Wk 11', compositePDC: 86.4, statinsPDC: 88.9, antihypertensivesPDC: 87.4, antidiabeticsPDC: 84.2, patientsCount: 18492 },
];

const FULFILLMENT_BINS: FulfillmentPatternBin[] = [
  { window: '-7 to -3d', label: 'Early Refill', courierPercent: 14.5, retailPickupPercent: 8.2, mailOrderPercent: 18.0, riskLevel: 'optimal' },
  { window: '-2 to 0d', label: 'On-Time Window', courierPercent: 62.8, retailPickupPercent: 44.5, mailOrderPercent: 52.1, riskLevel: 'optimal' },
  { window: '+1 to +3d', label: 'Grace Period', courierPercent: 15.4, retailPickupPercent: 21.3, mailOrderPercent: 16.4, riskLevel: 'optimal' },
  { window: '+4 to +7d', label: 'Minor Therapy Gap', courierPercent: 5.1, retailPickupPercent: 16.2, mailOrderPercent: 8.9, riskLevel: 'moderate' },
  { window: '>+7d', label: 'High-Risk Lapse', courierPercent: 2.2, retailPickupPercent: 9.8, mailOrderPercent: 4.6, riskLevel: 'high-risk' },
];

const INITIAL_PATIENT_ALERTS: AdherencePatientAlert[] = [
  {
    id: 'ALERT-9021',
    patientInitials: 'M. T.',
    age: 67,
    insuranceType: 'Medicare Advantage',
    medication: 'Atorvastatin 40mg (Lipitor® Eq.)',
    ndc: '00093-7156-56',
    therapeuticClass: 'Statins',
    currentPDC: 78.4,
    daysSupplyRemaining: -4,
    patternStatus: 'Lapse: 4 Days Late',
    lastFillChannel: 'Station 04 Retail',
    riskScore: 'High'
  },
  {
    id: 'ALERT-9022',
    patientInitials: 'R. B.',
    age: 59,
    insuranceType: 'Commercial',
    medication: 'Lisinopril 20mg (Zestril® Eq.)',
    ndc: '68180-514-01',
    therapeuticClass: 'ACEi/ARB',
    currentPDC: 81.2,
    daysSupplyRemaining: 2,
    patternStatus: 'Due in 48h',
    lastFillChannel: 'genericMed Courier',
    riskScore: 'Medium'
  },
  {
    id: 'ALERT-9023',
    patientInitials: 'E. K.',
    age: 72,
    insuranceType: 'Medicare Advantage',
    medication: 'Metformin ER 500mg',
    ndc: '53746-178-05',
    therapeuticClass: 'Antidiabetic',
    currentPDC: 64.0,
    daysSupplyRemaining: -9,
    patternStatus: 'Critical Drop: 9d',
    lastFillChannel: 'Station 04 Retail',
    riskScore: 'High'
  },
  {
    id: 'ALERT-9024',
    patientInitials: 'J. S.',
    age: 51,
    insuranceType: 'Commercial',
    medication: 'Eliquis® (Apixaban 5mg)',
    ndc: '00069-0897-66',
    therapeuticClass: 'Anticoagulant',
    currentPDC: 92.5,
    daysSupplyRemaining: 1,
    patternStatus: 'Due in 48h',
    lastFillChannel: 'genericMed Courier',
    riskScore: 'Low'
  },
  {
    id: 'ALERT-9025',
    patientInitials: 'D. C.',
    age: 64,
    insuranceType: 'Medicare Advantage',
    medication: 'Losartan Pot. 50mg (Cozaar® Eq.)',
    ndc: '68180-517-02',
    therapeuticClass: 'ACEi/ARB',
    currentPDC: 72.8,
    daysSupplyRemaining: 0,
    patternStatus: 'First-Fill Risk',
    lastFillChannel: 'Central Mail',
    riskScore: 'High'
  }
];

export const ComplianceCenter: React.FC = () => {
  // Filters & State
  const [selectedClass, setSelectedClass] = useState<'all' | 'statins' | 'antihypertensives' | 'antidiabetics'>('all');
  const [selectedChannel, setSelectedChannel] = useState<'all' | 'courier' | 'retail' | 'mail'>('all');
  const [patientAlerts, setPatientAlerts] = useState<AdherencePatientAlert[]>(INITIAL_PATIENT_ALERTS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeHoverData, setActiveHoverData] = useState<AdherenceTimePoint | null>(null);
  const [isLiveStreaming, setIsLiveStreaming] = useState(true);

  // SVG Chart References
  const lineChartRef = useRef<SVGSVGElement>(null);
  const barChartRef = useRef<SVGSVGElement>(null);
  const donutChartRef = useRef<SVGSVGElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Handle Intervention Action
  const handleAction = (alertId: string, actionType: string) => {
    setPatientAlerts(prev => prev.map(a => {
      if (a.id === alertId) {
        return { ...a, actionTaken: actionType };
      }
      return a;
    }));
    showToast(`Intervention dispatched: ${actionType} logged in adherence ledger.`);
  };

  // 1. D3 Line / Area Chart: Adherence Trajectory (PDC %)
  useEffect(() => {
    if (!lineChartRef.current) return;

    const svg = d3.select(lineChartRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 25, right: 30, bottom: 35, left: 45 };
    const width = 640 - margin.left - margin.right;
    const height = 260 - margin.top - margin.bottom;

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Define X & Y scales
    const x = d3.scalePoint()
      .domain(INITIAL_TIME_SERIES.map(d => d.label))
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([70, 100])
      .nice()
      .range([height, 0]);

    // Gridlines
    g.append('g')
      .attr('class', 'grid')
      .attr('opacity', 0.15)
      .call(
        d3.axisLeft(y)
          .tickSize(-width)
          .tickFormat(() => '')
      );

    // 80% CMS 5-Star Threshold Line
    const y80 = y(80);
    g.append('line')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', y80)
      .attr('y2', y80)
      .attr('stroke', '#006a61')
      .attr('stroke-width', 1.5)
      .attr('stroke-dasharray', '4,4')
      .attr('opacity', 0.7);

    g.append('text')
      .attr('x', width - 8)
      .attr('y', y80 - 6)
      .attr('text-anchor', 'end')
      .attr('fill', '#006a61')
      .attr('font-size', '10px')
      .attr('font-family', 'monospace')
      .attr('font-weight', 'bold')
      .text('CMS 5-STAR TARGET (80% PDC)');

    // Gradients
    const defs = svg.append('defs');
    const areaGradient = defs.append('linearGradient')
      .attr('id', 'adherence-area-grad')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');

    areaGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#86f2e4')
      .attr('stop-opacity', 0.5);

    areaGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#86f2e4')
      .attr('stop-opacity', 0.0);

    // Area Generator (Composite PDC)
    if (selectedClass === 'all') {
      const area = d3.area<AdherenceTimePoint>()
        .x(d => x(d.label) || 0)
        .y0(height)
        .y1(d => y(d.compositePDC))
        .curve(d3.curveMonotoneX);

      g.append('path')
        .datum(INITIAL_TIME_SERIES)
        .attr('fill', 'url(#adherence-area-grad)')
        .attr('d', area);
    }

    // Line drawing helper
    const drawLine = (accessor: (d: AdherenceTimePoint) => number, color: string, strokeWidth = 2.5) => {
      const line = d3.line<AdherenceTimePoint>()
        .x(d => x(d.label) || 0)
        .y(d => y(accessor(d)))
        .curve(d3.curveMonotoneX);

      g.append('path')
        .datum(INITIAL_TIME_SERIES)
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', strokeWidth)
        .attr('d', line);
    };

    if (selectedClass === 'all' || selectedClass === 'statins') {
      drawLine(d => d.statinsPDC, '#0284c7', selectedClass === 'statins' ? 3 : 2);
    }
    if (selectedClass === 'all' || selectedClass === 'antihypertensives') {
      drawLine(d => d.antihypertensivesPDC, '#10b981', selectedClass === 'antihypertensives' ? 3 : 2);
    }
    if (selectedClass === 'all' || selectedClass === 'antidiabetics') {
      drawLine(d => d.antidiabeticsPDC, '#f59e0b', selectedClass === 'antidiabetics' ? 3 : 2);
    }
    if (selectedClass === 'all') {
      drawLine(d => d.compositePDC, '#006a61', 3.5);
    }

    // Circles and interactive points for composite line
    g.selectAll('.dot')
      .data(INITIAL_TIME_SERIES)
      .enter()
      .append('circle')
      .attr('cx', d => x(d.label) || 0)
      .attr('cy', d => {
        if (selectedClass === 'statins') return y(d.statinsPDC);
        if (selectedClass === 'antihypertensives') return y(d.antihypertensivesPDC);
        if (selectedClass === 'antidiabetics') return y(d.antidiabeticsPDC);
        return y(d.compositePDC);
      })
      .attr('r', 4)
      .attr('fill', '#ffffff')
      .attr('stroke', selectedClass === 'statins' ? '#0284c7' : selectedClass === 'antihypertensives' ? '#10b981' : selectedClass === 'antidiabetics' ? '#f59e0b' : '#006a61')
      .attr('stroke-width', 2.5)
      .style('cursor', 'pointer')
      .on('mouseenter', (_event, d) => setActiveHoverData(d))
      .on('mouseleave', () => setActiveHoverData(null));

    // X Axis
    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .attr('font-family', 'inherit')
      .attr('font-size', '10px')
      .call(g => g.select('.domain').attr('stroke', '#dce9ff'))
      .call(g => g.selectAll('.tick line').attr('stroke', '#dce9ff'));

    // Y Axis
    g.append('g')
      .call(d3.axisLeft(y).ticks(5).tickFormat(d => `${d}%`))
      .attr('font-family', 'inherit')
      .attr('font-size', '10px')
      .call(g => g.select('.domain').remove())
      .call(g => g.selectAll('.tick line').remove());

  }, [selectedClass]);

  // 2. D3 Grouped Bar Chart: Medication Fulfillment Timing by Channel
  useEffect(() => {
    if (!barChartRef.current) return;

    const svg = d3.select(barChartRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 20, bottom: 40, left: 45 };
    const width = 640 - margin.left - margin.right;
    const height = 240 - margin.top - margin.bottom;

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const channels = [
      { key: 'courierPercent', label: 'genericMed Courier', color: '#006a61' },
      { key: 'retailPickupPercent', label: 'Retail Counter Pickup', color: '#0284c7' },
      { key: 'mailOrderPercent', label: 'Central Mail Ground', color: '#94a3b8' }
    ];

    const activeChannels = selectedChannel === 'all' 
      ? channels 
      : channels.filter(c => 
          (selectedChannel === 'courier' && c.key === 'courierPercent') ||
          (selectedChannel === 'retail' && c.key === 'retailPickupPercent') ||
          (selectedChannel === 'mail' && c.key === 'mailOrderPercent')
        );

    // X0 Scale (Bins)
    const x0 = d3.scaleBand()
      .domain(FULFILLMENT_BINS.map(d => d.window))
      .rangeRound([0, width])
      .paddingInner(0.2);

    // X1 Scale (Channels inside each bin)
    const x1 = d3.scaleBand()
      .domain(activeChannels.map(d => d.key))
      .rangeRound([0, x0.bandwidth()])
      .padding(0.08);

    // Y Scale (Percentage)
    const y = d3.scaleLinear()
      .domain([0, 70])
      .nice()
      .rangeRound([height, 0]);

    // Gridlines
    g.append('g')
      .attr('class', 'grid')
      .attr('opacity', 0.12)
      .call(
        d3.axisLeft(y)
          .tickSize(-width)
          .tickFormat(() => '')
      );

    // Render Bars
    const binGroup = g.selectAll('.bin-group')
      .data(FULFILLMENT_BINS)
      .enter().append('g')
      .attr('transform', d => `translate(${x0(d.window)},0)`);

    activeChannels.forEach(ch => {
      binGroup.append('rect')
        .attr('x', x1(ch.key) || 0)
        .attr('y', d => y((d as any)[ch.key]))
        .attr('width', x1.bandwidth())
        .attr('height', d => height - y((d as any)[ch.key]))
        .attr('fill', ch.color)
        .attr('rx', 3)
        .attr('opacity', 0.95);

      // Percentage labels on top of bars
      binGroup.append('text')
        .attr('x', (x1(ch.key) || 0) + x1.bandwidth() / 2)
        .attr('y', d => y((d as any)[ch.key]) - 4)
        .attr('text-anchor', 'middle')
        .attr('font-size', '8.5px')
        .attr('font-family', 'monospace')
        .attr('font-weight', 'bold')
        .attr('fill', ch.color)
        .text(d => `${(d as any)[ch.key]}%`);
    });

    // X Axis
    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x0))
      .attr('font-size', '10px')
      .attr('font-family', 'monospace')
      .call(g => g.select('.domain').attr('stroke', '#dce9ff'));

    // Y Axis
    g.append('g')
      .call(d3.axisLeft(y).ticks(5).tickFormat(d => `${d}%`))
      .attr('font-size', '10px')
      .attr('font-family', 'inherit')
      .call(g => g.select('.domain').remove());

  }, [selectedChannel]);

  // 3. D3 Donut Chart: Patient Adherence Stratification Cohort
  useEffect(() => {
    if (!donutChartRef.current) return;

    const svg = d3.select(donutChartRef.current);
    svg.selectAll('*').remove();

    const width = 220;
    const height = 220;
    const radius = Math.min(width, height) / 2;

    const g = svg.append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const cohortData = [
      { name: 'Optimal Adherence (PDC ≥80%)', value: 74.5, count: 13776, color: '#006a61' },
      { name: 'Moderate Gap (PDC 60-79%)', value: 19.2, count: 3550, color: '#f59e0b' },
      { name: 'Critical Non-Adherence (<60%)', value: 6.3, count: 1166, color: '#ba1a1a' },
    ];

    const pie = d3.pie<any>()
      .value(d => d.value)
      .sort(null);

    const arc = d3.arc<any>()
      .innerRadius(radius * 0.65)
      .outerRadius(radius * 0.92)
      .cornerRadius(4)
      .padAngle(0.03);

    // Arcs
    g.selectAll('path')
      .data(pie(cohortData))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', d => d.data.color)
      .style('cursor', 'pointer')
      .attr('opacity', 0.95);

    // Center Text
    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.2em')
      .attr('font-size', '24px')
      .attr('font-family', 'monospace')
      .attr('font-weight', 'bold')
      .attr('fill', '#001729')
      .text('86.4%');

    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '1.3em')
      .attr('font-size', '10px')
      .attr('font-weight', 'bold')
      .attr('fill', '#73777d')
      .text('COMPOSITE PDC');

  }, []);

  return (
    <div className="w-full bg-[#eff4ff] space-y-6 text-[#0b1c30]">
      {/* Center Top Banner */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#e5eeff] shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#006a61] animate-pulse"></span>
            <span className="font-mono text-xs uppercase font-bold tracking-wider text-[#006a61] flex items-center gap-1">
              <HeartPulse className="w-3.5 h-3.5" />
              Quality &amp; Patient Adherence Sentinel • CMS Part D Standards
            </span>
          </div>
          <h1 className="font-display font-bold text-2xl text-[#001729] tracking-tight mt-1">
            Clinical Compliance &amp; Adherence Command Center
          </h1>
          <p className="text-xs text-[#43474d] mt-0.5 max-w-3xl">
            Real-time longitudinal Proportion of Days Covered (PDC) tracking, medication fulfillment lapse monitoring, and automated pharmacist intervention triggers across 18,492 chronic therapy patients.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-[#001729] text-white text-xs font-mono font-bold flex items-center gap-2">
            <Award className="w-4 h-4 text-[#86f2e4]" />
            <span>CMS QUALITY: 4.8 / 5.0 STARS</span>
          </div>

          <button 
            onClick={() => {
              showToast("Refreshing live D3 telemetry pipeline... 142 refill events ingested.");
            }}
            className="px-3 py-1.5 rounded-xl bg-[#86f2e4] hover:bg-[#6ed9cb] text-[#006f66] text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>SYNC D3 TELEMETRY</span>
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="p-3 bg-[#86f2e4] text-[#006f66] rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 4 Clinical Compliance Quality Scorecards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-[#e5eeff] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#73777d] uppercase tracking-wider">Network Composite PDC</span>
            <span className="px-2 py-0.5 rounded-full bg-[#86f2e4] text-[#006f66] font-mono text-[9px] font-bold">5-STAR TIER</span>
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="font-display font-bold text-3xl text-[#001729] font-mono">86.4%</span>
            <span className="text-xs font-bold text-[#006a61]">+5.2% vs Benchmark</span>
          </div>
          <span className="text-[11px] text-[#43474d]">Target: &gt;80% for Statins, Antihypertensives &amp; Diabetes</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#e5eeff] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#73777d] uppercase tracking-wider">Courier On-Time Fulfillment</span>
            <span className="px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#006a61] font-mono text-[9px] font-bold">ZERO LAPSE</span>
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="font-display font-bold text-3xl text-[#006a61] font-mono">92.7%</span>
            <span className="text-xs font-semibold text-[#006a61] font-mono">vs 73.9% Retail</span>
          </div>
          <span className="text-[11px] text-[#006a61] font-semibold">Same-Day Courier eliminates pharmacy drop-off gaps</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#e5eeff] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#73777d] uppercase tracking-wider">Med Possession Ratio (MPR)</span>
            <span className="px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#001729] font-mono text-[9px] font-bold">ANNUALIZED</span>
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="font-display font-bold text-3xl text-[#001729] font-mono">0.89</span>
            <span className="text-xs text-[#73777d]">/ 1.00 index</span>
          </div>
          <span className="text-[11px] text-[#43474d]">Mean days without medication: 3.2 days/year</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#e5eeff] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#73777d] uppercase tracking-wider">At-Risk Therapy Interventions</span>
            <span className="px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] font-mono text-[9px] font-bold">REAL-TIME</span>
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="font-display font-bold text-3xl text-[#ba1a1a] font-mono">14</span>
            <span className="text-xs text-[#ba1a1a] font-bold">Active Flags</span>
          </div>
          <span className="text-[11px] text-[#43474d]">Automated SMS and Pharmacist outreach queue active</span>
        </div>
      </div>

      {/* Primary Visualizations Row: D3 Trajectory Line/Area + Cohort Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* D3 Multi-Line & Area Adherence Trajectory (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-5 border border-[#e5eeff] shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#f0f4ff]">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#006a61]" />
                <h2 className="font-display font-bold text-base text-[#001729]">
                  Longitudinal Patient Adherence Trajectory (PDC %)
                </h2>
              </div>
              <p className="text-[11px] text-[#73777d] mt-0.5">
                Proportion of Days Covered weekly trends benchmarked against CMS 5-Star (80%) standard.
              </p>
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-1.5 text-xs">
              <button
                onClick={() => setSelectedClass('all')}
                className={`px-2.5 py-1 rounded-lg font-medium text-xs transition-colors ${
                  selectedClass === 'all'
                    ? 'bg-[#001729] text-white font-bold'
                    : 'bg-[#eff4ff] text-[#43474d] hover:bg-[#dce9ff]'
                }`}
              >
                All Classes
              </button>
              <button
                onClick={() => setSelectedClass('statins')}
                className={`px-2.5 py-1 rounded-lg font-medium text-xs transition-colors ${
                  selectedClass === 'statins'
                    ? 'bg-[#0284c7] text-white font-bold'
                    : 'bg-[#eff4ff] text-[#43474d] hover:bg-[#dce9ff]'
                }`}
              >
                Statins (88.9%)
              </button>
              <button
                onClick={() => setSelectedClass('antihypertensives')}
                className={`px-2.5 py-1 rounded-lg font-medium text-xs transition-colors ${
                  selectedClass === 'antihypertensives'
                    ? 'bg-[#10b981] text-white font-bold'
                    : 'bg-[#eff4ff] text-[#43474d] hover:bg-[#dce9ff]'
                }`}
              >
                ACEi/ARBs (87.4%)
              </button>
              <button
                onClick={() => setSelectedClass('antidiabetics')}
                className={`px-2.5 py-1 rounded-lg font-medium text-xs transition-colors ${
                  selectedClass === 'antidiabetics'
                    ? 'bg-[#f59e0b] text-white font-bold'
                    : 'bg-[#eff4ff] text-[#43474d] hover:bg-[#dce9ff]'
                }`}
              >
                Diabetes (84.2%)
              </button>
            </div>
          </div>

          {/* D3 SVG Container */}
          <div className="w-full overflow-x-auto">
            <svg 
              ref={lineChartRef} 
              viewBox="0 0 640 260" 
              className="w-full h-auto max-h-72 select-none"
            />
          </div>

          {/* Interactive Hover Telemetry or Legend */}
          <div className="p-3 bg-[#eff4ff] rounded-xl border border-[#dce9ff] flex flex-wrap items-center justify-between text-xs gap-3">
            <div className="flex items-center gap-4 text-[11px] font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-[#006a61] rounded"></span>
                <span className="font-bold text-[#001729]">Network Composite: 86.4%</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-[#0284c7] rounded"></span>
                <span className="text-[#0284c7]">Statins (Lipitor/Crestor)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-[#10b981] rounded"></span>
                <span className="text-[#10b981]">ACEi/ARBs (Lisinopril)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-[#f59e0b] rounded"></span>
                <span className="text-[#f59e0b]">Metformin / Antidiabetic</span>
              </span>
            </div>

            {activeHoverData && (
              <div className="text-[11px] font-mono bg-white px-3 py-1 rounded-lg border border-[#c6daff] shadow-xs flex items-center gap-2">
                <span className="font-bold text-[#001729]">{activeHoverData.label}:</span>
                <span className="text-[#006a61] font-bold">PDC {activeHoverData.compositePDC}%</span>
                <span className="text-[#73777d]">({activeHoverData.patientsCount.toLocaleString()} pts)</span>
              </div>
            )}
          </div>
        </div>

        {/* D3 Donut Chart: Patient Adherence Stratification Cohort (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-[#e5eeff] shadow-xs space-y-4 flex flex-col justify-between">
          <div className="pb-2 border-b border-[#f0f4ff]">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-sm text-[#001729]">
                Patient Adherence Stratification
              </h3>
              <span className="font-mono text-[10px] text-[#006a61] font-bold">N=18,492</span>
            </div>
            <p className="text-[11px] text-[#73777d] mt-0.5">
              Population health risk tiering based on annualized PDC score.
            </p>
          </div>

          <div className="flex items-center justify-center py-1">
            <svg 
              ref={donutChartRef} 
              viewBox="0 0 220 220" 
              className="w-48 h-48 select-none"
            />
          </div>

          {/* Cohort Legend Table */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 rounded-xl bg-[#eff4ff]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#006a61]"></span>
                <span className="font-semibold text-[#001729]">Optimal (PDC ≥80%)</span>
              </div>
              <div className="text-right font-mono">
                <span className="font-bold text-[#006a61]">74.5%</span>
                <span className="text-[10px] text-[#73777d] ml-1.5">(13,776)</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-[#eff4ff]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]"></span>
                <span className="font-semibold text-[#001729]">Moderate (PDC 60-79%)</span>
              </div>
              <div className="text-right font-mono">
                <span className="font-bold text-[#f59e0b]">19.2%</span>
                <span className="text-[10px] text-[#73777d] ml-1.5">(3,550)</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-[#eff4ff]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a]"></span>
                <span className="font-semibold text-[#001729]">High Risk (PDC &lt;60%)</span>
              </div>
              <div className="text-right font-mono">
                <span className="font-bold text-[#ba1a1a]">6.3%</span>
                <span className="text-[10px] text-[#73777d] ml-1.5">(1,166)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Visualization: D3 Fulfillment Pattern Distribution by Channel */}
      <div className="bg-white rounded-2xl p-5 border border-[#e5eeff] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#f0f4ff]">
          <div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#006a61]" />
              <h2 className="font-display font-bold text-base text-[#001729]">
                Medication Fulfillment Cadence &amp; Refill Timing Patterns
              </h2>
            </div>
            <p className="text-[11px] text-[#73777d] mt-0.5">
              Distribution of when patients refill relative to their prescribed depletion date (-7 to +14 days). Comparing Same-Day Courier vs Counter Pickup.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[11px] text-[#73777d]">Filter Channel:</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSelectedChannel('all')}
                className={`px-2.5 py-1 rounded-lg font-medium text-xs ${
                  selectedChannel === 'all'
                    ? 'bg-[#001729] text-white font-bold'
                    : 'bg-[#eff4ff] text-[#43474d] hover:bg-[#dce9ff]'
                }`}
              >
                All Channels
              </button>
              <button
                onClick={() => setSelectedChannel('courier')}
                className={`px-2.5 py-1 rounded-lg font-medium text-xs ${
                  selectedChannel === 'courier'
                    ? 'bg-[#006a61] text-white font-bold'
                    : 'bg-[#eff4ff] text-[#43474d] hover:bg-[#dce9ff]'
                }`}
              >
                genericMed Courier
              </button>
              <button
                onClick={() => setSelectedChannel('retail')}
                className={`px-2.5 py-1 rounded-lg font-medium text-xs ${
                  selectedChannel === 'retail'
                    ? 'bg-[#0284c7] text-white font-bold'
                    : 'bg-[#eff4ff] text-[#43474d] hover:bg-[#dce9ff]'
                }`}
              >
                Retail Counter
              </button>
            </div>
          </div>
        </div>

        {/* D3 SVG Bar Chart */}
        <div className="w-full overflow-x-auto">
          <svg 
            ref={barChartRef} 
            viewBox="0 0 640 240" 
            className="w-full h-auto max-h-64 select-none"
          />
        </div>

        {/* Channel Comparison Legend & Takeaway Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          <div className="p-3 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex items-start gap-2.5">
            <Truck className="w-4 h-4 text-[#006a61] shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-[#001729] block">genericMed Courier Impact</span>
              <p className="text-[11px] text-[#43474d] mt-0.5">
                <strong>92.7%</strong> of courier fills arrive in the optimal window (-2 to +3 days), virtually eliminating retail abandonment.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-[#ba1a1a] shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-[#001729] block">Counter Pickup Friction</span>
              <p className="text-[11px] text-[#43474d] mt-0.5">
                Physical retail pickup exhibits a <strong>26.0%</strong> lapse rate (&gt;4 days delay), driving down Medicare Part D Star scores.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-[#006a61] shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-[#001729] block">Med-Sync Auto-Dispatch</span>
              <p className="text-[11px] text-[#43474d] mt-0.5">
                Auto-scheduling monthly refills 3 days before supply exhaustion recovers ~84% of borderline non-adherent patients.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Patient Adherence Alerts & Clinical Intervention Queue */}
      <div className="bg-white rounded-2xl p-5 border border-[#e5eeff] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#f0f4ff]">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#006a61]" />
              <h2 className="font-display font-bold text-base text-[#001729]">
                Real-Time Adherence Risk Sentinel &amp; Clinical Action Queue
              </h2>
            </div>
            <p className="text-[11px] text-[#73777d] mt-0.5">
              Live automated detection of prescription refill gaps with 1-click clinical escalation workflows.
            </p>
          </div>

          <span className="px-3 py-1 rounded-full bg-[#86f2e4] text-[#006f66] font-mono text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-[#006a61] animate-ping"></span>
            <span>ACTIVE SENTINEL MONITORING</span>
          </span>
        </div>

        {/* Alerts Table */}
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#eff4ff] text-[#73777d] font-mono text-[10px] uppercase border-b border-[#e5eeff]">
                <th className="py-2.5 px-3 font-bold">Patient &amp; Plan</th>
                <th className="py-2.5 px-3 font-bold">Medication &amp; Class</th>
                <th className="py-2.5 px-3 font-bold">Current PDC</th>
                <th className="py-2.5 px-3 font-bold">Fulfillment Status</th>
                <th className="py-2.5 px-3 font-bold">Channel</th>
                <th className="py-2.5 px-3 font-bold text-right">Action Dispatch</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f4ff]">
              {patientAlerts.map(alert => {
                return (
                  <tr key={alert.id} className="hover:bg-[#eff4ff]/60 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-bold text-[#001729] flex items-center gap-1.5">
                        <span>Patient {alert.patientInitials}</span>
                        <span className="text-[10px] font-normal text-[#73777d]">({alert.age}y)</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#006a61]">{alert.insuranceType}</span>
                    </td>

                    <td className="py-3 px-3">
                      <span className="font-semibold text-[#001729] block">{alert.medication}</span>
                      <div className="flex items-center gap-1.5 text-[10px] text-[#73777d]">
                        <span className="font-mono">{alert.ndc}</span>
                        <span>•</span>
                        <span className="px-1.5 py-0.2 rounded bg-[#eff4ff] text-[#001729] font-medium">{alert.therapeuticClass}</span>
                      </div>
                    </td>

                    <td className="py-3 px-3 font-mono">
                      <div className="flex items-baseline gap-1.5">
                        <span className={`font-bold text-sm ${alert.currentPDC >= 80 ? 'text-[#006a61]' : alert.currentPDC >= 70 ? 'text-[#f59e0b]' : 'text-[#ba1a1a]'}`}>
                          {alert.currentPDC}%
                        </span>
                        <span className="text-[10px] text-[#73777d]">PDC</span>
                      </div>
                      <span className="text-[10px] text-[#73777d]">
                        {alert.daysSupplyRemaining > 0 
                          ? `${alert.daysSupplyRemaining}d supply left` 
                          : `${Math.abs(alert.daysSupplyRemaining)}d overdue`}
                      </span>
                    </td>

                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        alert.patternStatus === 'Due in 48h' 
                          ? 'bg-[#eff4ff] text-[#006a61] border border-[#dce9ff]' 
                          : alert.patternStatus === 'Lapse: 4 Days Late' 
                          ? 'bg-[#fff0db] text-[#b45309]' 
                          : 'bg-[#ffdad6] text-[#ba1a1a]'
                      }`}>
                        {alert.patternStatus}
                      </span>
                    </td>

                    <td className="py-3 px-3 font-medium text-[#43474d]">
                      {alert.lastFillChannel}
                    </td>

                    <td className="py-3 px-3 text-right">
                      {alert.actionTaken ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#006a61]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{alert.actionTaken}</span>
                        </span>
                      ) : (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleAction(alert.id, 'SMS Nudge Sent')}
                            className="px-2.5 py-1 bg-[#eff4ff] hover:bg-[#dce9ff] text-[#001729] font-semibold text-[11px] rounded-lg border border-[#dce9ff] transition-colors flex items-center gap-1"
                          >
                            <Send className="w-3 h-3 text-[#006a61]" />
                            <span>SMS Prompt</span>
                          </button>

                          <button
                            onClick={() => handleAction(alert.id, 'Courier Dispatched')}
                            className="px-2.5 py-1 bg-[#001729] hover:bg-[#0f2c42] text-white font-semibold text-[11px] rounded-lg transition-colors flex items-center gap-1 shadow-2xs"
                          >
                            <Truck className="w-3 h-3 text-[#86f2e4]" />
                            <span>AutoCourier</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
