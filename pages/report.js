import React, { useState } from 'react';
import {
  TrendingUp, Users, PawPrint, CreditCard, Activity, FlaskConical,
  CalendarDays, BarChart2, ArrowUp, ArrowDown, Download, Mail, X,
} from 'lucide-react';

// ── Per-period mock data ──────────────────────────────────────────────────────

const KPI_BY_PERIOD = {
  today: [
    { label: 'Revenue Today',    value: '฿ 48,250', sub: '+12% vs yesterday',    trend: 'up',   color: 'from-[#0f8f83] to-[#0b6d87]', icon: CreditCard   },
    { label: 'Patients Today',   value: '38',        sub: '+4 from yesterday',    trend: 'up',   color: 'from-[#7c3aed] to-[#a78bfa]',  icon: PawPrint     },
    { label: 'Active Clients',   value: '312',       sub: '12 new this month',    trend: 'up',   color: 'from-[#0891b2] to-[#22d3ee]',  icon: Users        },
    { label: 'Avg. Wait Time',   value: '22 min',    sub: '-3 min vs last week',  trend: 'down', color: 'from-[#d97706] to-[#fbbf24]',  icon: Activity     },
    { label: 'Lab Tests Today',  value: '24',        sub: '7 pending results',    trend: 'up',   color: 'from-[#dc2626] to-[#f87171]',  icon: FlaskConical },
    { label: 'Appointments',     value: '29',        sub: '5 remaining today',    trend: 'up',   color: 'from-[#059669] to-[#34d399]',  icon: CalendarDays },
  ],
  week: [
    { label: 'Revenue (Week)',   value: '฿ 175,700', sub: '+8.5% vs last week',  trend: 'up',   color: 'from-[#0f8f83] to-[#0b6d87]', icon: CreditCard   },
    { label: 'Patients (Week)',  value: '187',        sub: '+23 vs last week',    trend: 'up',   color: 'from-[#7c3aed] to-[#a78bfa]',  icon: PawPrint     },
    { label: 'Active Clients',   value: '312',        sub: '12 new this month',   trend: 'up',   color: 'from-[#0891b2] to-[#22d3ee]',  icon: Users        },
    { label: 'Avg. Wait Time',   value: '24 min',     sub: '-1 min vs last week', trend: 'down', color: 'from-[#d97706] to-[#fbbf24]',  icon: Activity     },
    { label: 'Lab Tests (Wk)',   value: '98',         sub: '14 pending results',  trend: 'up',   color: 'from-[#dc2626] to-[#f87171]',  icon: FlaskConical },
    { label: 'Appointments',     value: '142',        sub: '18 completed',        trend: 'up',   color: 'from-[#059669] to-[#34d399]',  icon: CalendarDays },
  ],
  month: [
    { label: 'Revenue (Month)',  value: '฿ 2.45M',   sub: '+6.2% vs last month', trend: 'up',   color: 'from-[#0f8f83] to-[#0b6d87]', icon: CreditCard   },
    { label: 'Patients (Mo.)',   value: '821',        sub: '+67 vs last month',   trend: 'up',   color: 'from-[#7c3aed] to-[#a78bfa]',  icon: PawPrint     },
    { label: 'Active Clients',   value: '312',        sub: '12 new this month',   trend: 'up',   color: 'from-[#0891b2] to-[#22d3ee]',  icon: Users        },
    { label: 'Avg. Wait Time',   value: '23 min',     sub: 'stable vs last month',trend: 'up',   color: 'from-[#d97706] to-[#fbbf24]',  icon: Activity     },
    { label: 'Lab Tests (Mo.)',  value: '412',        sub: '31 pending results',  trend: 'up',   color: 'from-[#dc2626] to-[#f87171]',  icon: FlaskConical },
    { label: 'Appointments',     value: '598',        sub: 'fully booked',        trend: 'up',   color: 'from-[#059669] to-[#34d399]',  icon: CalendarDays },
  ],
};

const CHART_BY_PERIOD = {
  today: [
    { day: '8am',  opd: 2200, lab: 800,   pharma: 950  },
    { day: '10am', opd: 4500, lab: 1800,  pharma: 2100 },
    { day: '12pm', opd: 6800, lab: 2400,  pharma: 3200 },
    { day: '2pm',  opd: 8200, lab: 3100,  pharma: 3800 },
    { day: '4pm',  opd: 7500, lab: 2900,  pharma: 3400 },
    { day: '6pm',  opd: 5200, lab: 1800,  pharma: 2200 },
    { day: '8pm',  opd: 3200, lab: 1100,  pharma: 1400 },
  ],
  week: [
    { day: 'Mon', opd: 18000, lab: 6500,  pharma: 8200  },
    { day: 'Tue', opd: 22000, lab: 8100,  pharma: 9400  },
    { day: 'Wed', opd: 15500, lab: 5200,  pharma: 6800  },
    { day: 'Thu', opd: 31000, lab: 11200, pharma: 12500 },
    { day: 'Fri', opd: 27500, lab: 9800,  pharma: 10100 },
    { day: 'Sat', opd: 42000, lab: 15300, pharma: 18200 },
    { day: 'Sun', opd: 19000, lab: 7200,  pharma: 8500  },
  ],
  month: [
    { day: 'Wk 1', opd: 182000, lab: 63000, pharma: 73000 },
    { day: 'Wk 2', opd: 196000, lab: 69000, pharma: 80000 },
    { day: 'Wk 3', opd: 214000, lab: 76000, pharma: 87000 },
    { day: 'Wk 4', opd: 228000, lab: 82000, pharma: 94000 },
  ],
};

const SERVICES_BY_PERIOD = {
  today: [
    { name: 'OPD Consultation',   count: 18,  revenue: 27000,  pct: 100 },
    { name: 'Laboratory Tests',   count: 14,  revenue: 10220,  pct: 78  },
    { name: 'Pharmacy',           count: 32,  revenue: 9400,   pct: 70  },
    { name: 'Imaging (X-ray/US)', count: 5,   revenue: 7500,   pct: 46  },
    { name: 'Procedures',         count: 3,   revenue: 6000,   pct: 38  },
    { name: 'Vaccination',        count: 7,   revenue: 3500,   pct: 22  },
  ],
  week: [
    { name: 'OPD Consultation',   count: 124, revenue: 186000, pct: 100 },
    { name: 'Laboratory Tests',   count: 87,  revenue: 63450,  pct: 72  },
    { name: 'Pharmacy',           count: 203, revenue: 58700,  pct: 68  },
    { name: 'Imaging (X-ray/US)', count: 31,  revenue: 46500,  pct: 42  },
    { name: 'Procedures',         count: 19,  revenue: 38000,  pct: 32  },
    { name: 'Vaccination',        count: 44,  revenue: 22000,  pct: 25  },
  ],
  month: [
    { name: 'OPD Consultation',   count: 542, revenue: 813000, pct: 100 },
    { name: 'Laboratory Tests',   count: 381, revenue: 277830, pct: 72  },
    { name: 'Pharmacy',           count: 892, revenue: 257100, pct: 65  },
    { name: 'Imaging (X-ray/US)', count: 136, revenue: 204000, pct: 44  },
    { name: 'Procedures',         count: 84,  revenue: 168000, pct: 36  },
    { name: 'Vaccination',        count: 192, revenue: 96000,  pct: 24  },
  ],
};

const CHART_TITLE = {
  today: 'Revenue Breakdown — Today',
  week:  'Revenue Breakdown — This Week',
  month: 'Revenue Breakdown — This Month',
};

const TABLE_LABEL = {
  today: 'Today',
  week:  'This Week',
  month: 'This Month',
};

const speciesBreakdown = [
  { name: 'Dog',    pct: 58, color: 'bg-[#0f8f83]' },
  { name: 'Cat',    pct: 31, color: 'bg-[#7c3aed]' },
  { name: 'Rabbit', pct: 6,  color: 'bg-[#d97706]' },
  { name: 'Other',  pct: 5,  color: 'bg-[#64788a]' },
];

// ── Modal shell ──────────────────────────────────────────────────────────────
function Modal({ title, onClose, children, maxWidth = 'max-w-md' }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onMouseDown={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div
        className={`relative bg-white rounded-2xl shadow-2xl w-full ${maxWidth} max-h-[90vh] flex flex-col`}
        onMouseDown={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-[#e3edf3] shrink-0">
          <h3 className="text-[15px] font-bold text-[#102a43] m-0">{title}</h3>
          <button onClick={onClose} className="p-1.5 hover:bg-[#f0f5f8] rounded-lg cursor-pointer text-[#9ab0bc] hover:text-[#39576d] border-0 bg-transparent">
            <X size={16} />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 px-5 py-4">{children}</div>
      </div>
    </div>
  );
}

// ── Form helpers ─────────────────────────────────────────────────────────────
function FRow({ label, children }) {
  return (
    <div className="mb-3.5">
      <label className="block text-[12px] font-semibold text-[#39576d] mb-1">{label}</label>
      {children}
    </div>
  );
}
const F = 'w-full border border-[#e3edf3] rounded-xl px-3 py-2.5 text-[13px] text-[#102a43] bg-[#f8fafc] focus:outline-none focus:border-[#0f8f83] transition-colors';
const FInput  = (props) => <input  {...props} className={F} />;
const FSelect = ({ children, ...p }) => <select {...p} className={F}>{children}</select>;

const BtnPrimary = ({ onClick, children }) => (
  <button onClick={onClick} className="flex-1 py-2.5 rounded-xl text-[13px] font-semibold bg-[#0f8f83] hover:bg-[#0a7a70] text-white cursor-pointer border-0">
    {children}
  </button>
);
const BtnSecondary = ({ onClick, children }) => (
  <button onClick={onClick} className="flex-1 py-2.5 rounded-xl text-[13px] font-semibold border border-[#e3edf3] text-[#64788a] hover:bg-[#f0f5f8] cursor-pointer bg-transparent">
    {children}
  </button>
);
const ModalFooter = ({ children }) => (
  <div className="flex gap-2 mt-5 pt-4 border-t border-[#e3edf3]">{children}</div>
);

// ── Page ─────────────────────────────────────────────────────────────────────
export default function ReportPage() {
  const [period, setPeriod]           = useState('week');
  const [toast, setToast]             = useState('');
  const [modal, setModal]             = useState(null);
  const [modalSvc, setModalSvc]       = useState(null);
  // picker state — persists between modal opens
  const [exportFmt, setExportFmt]     = useState('PDF');
  const [scheduleFreq, setSchedFreq]  = useState('รายสัปดาห์');
  const [scheduleFmt, setScheduleFmt] = useState('PDF');

  const closeModal = () => { setModal(null); setModalSvc(null); };
  const done = (msg) => { closeModal(); setToast(msg); };

  const openService = (svc) => { setModalSvc(svc); setModal('serviceDetail'); };

  // Derive all visible data from period
  const kpis       = KPI_BY_PERIOD[period];
  const chartData  = CHART_BY_PERIOD[period];
  const services   = SERVICES_BY_PERIOD[period];
  const maxBar     = Math.max(...chartData.map(d => d.opd + d.lab + d.pharma));
  const totalRev   = chartData.reduce((a, d) => a + d.opd + d.lab + d.pharma, 0);

  // Shared pill style for picker buttons
  const fmtCls = (active) =>
    `border-2 rounded-xl py-2.5 text-[12px] font-semibold cursor-pointer transition-colors ${
      active
        ? 'border-[#0f8f83] bg-[#e9f7f4] text-[#0f8f83]'
        : 'border-[#e3edf3] bg-white text-[#39576d] hover:border-[#0f8f83] hover:bg-[#f0faf8]'
    }`;

  return (
    <div className="h-full flex flex-col overflow-hidden bg-[#f6f9fb]">

      {/* Toast */}
      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#102a43] text-white text-sm px-6 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-white/10">
          <span className="font-bold">{toast}</span>
          <button onClick={() => setToast('')} className="bg-transparent border-0 text-white/50 hover:text-white cursor-pointer ml-2"><X size={14} /></button>
        </div>
      )}

      {/* ── Modal: Export Report ── */}
      {modal === 'exportReport' && (
        <Modal title="Export รายงาน" onClose={closeModal}>
          <FRow label="ประเภทรายงาน">
            <FSelect>
              <option>รายงานภาพรวม (All KPIs)</option>
              <option>รายงานรายได้ (Revenue)</option>
              <option>รายงานผู้ป่วย (Patients)</option>
              <option>รายงานบริการ (Services)</option>
              <option>รายงาน Species Distribution</option>
            </FSelect>
          </FRow>
          <FRow label="ช่วงเวลา">
            <FSelect defaultValue={period === 'today' ? 'Today' : period === 'week' ? 'This Week' : 'This Month'}>
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
              <option>Last 3 Months</option>
              <option>This Year</option>
              <option>กำหนดเอง</option>
            </FSelect>
          </FRow>
          <FRow label="รูปแบบไฟล์">
            <div className="grid grid-cols-3 gap-2">
              {['PDF', 'Excel', 'CSV'].map(fmt => (
                <button key={fmt} onClick={() => setExportFmt(fmt)} className={fmtCls(exportFmt === fmt)}>
                  {fmt === 'Excel' ? 'Excel (.xlsx)' : fmt}
                </button>
              ))}
            </div>
          </FRow>
          <FRow label="ส่วนที่ต้องการรวม">
            <div className="space-y-2 border border-[#e3edf3] rounded-xl p-3 bg-[#f8fafc]">
              {['KPI Summary Cards', 'Revenue Breakdown Chart', 'Top Services Table', 'Species Distribution'].map(s => (
                <label key={s} className="flex items-center gap-2 text-[13px] text-[#39576d] cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-[#0f8f83]" /> {s}
                </label>
              ))}
            </div>
          </FRow>
          <ModalFooter>
            <BtnSecondary onClick={closeModal}>ยกเลิก</BtnSecondary>
            <BtnPrimary onClick={() => done(`ดาวน์โหลด ${exportFmt} สำเร็จ`)}>
              <span className="flex items-center justify-center gap-1.5"><Download size={14} /> ดาวน์โหลด {exportFmt}</span>
            </BtnPrimary>
          </ModalFooter>
        </Modal>
      )}

      {/* ── Modal: Schedule Report ── */}
      {modal === 'scheduleReport' && (
        <Modal title="ตั้งเวลาส่งรายงานอัตโนมัติ" onClose={closeModal}>
          <FRow label="ประเภทรายงาน">
            <FSelect>
              <option>รายงานภาพรวม (All KPIs)</option>
              <option>รายงานรายได้ (Revenue)</option>
              <option>รายงานผู้ป่วย (Patients)</option>
              <option>รายงานบริการ (Services)</option>
            </FSelect>
          </FRow>
          <FRow label="ความถี่">
            <div className="grid grid-cols-3 gap-2">
              {['รายวัน', 'รายสัปดาห์', 'รายเดือน'].map(f => (
                <button key={f} onClick={() => setSchedFreq(f)} className={fmtCls(scheduleFreq === f)}>
                  {f}
                </button>
              ))}
            </div>
          </FRow>
          <FRow label="รูปแบบไฟล์">
            <div className="grid grid-cols-3 gap-2">
              {['PDF', 'Excel', 'CSV'].map(fmt => (
                <button key={fmt} onClick={() => setScheduleFmt(fmt)} className={fmtCls(scheduleFmt === fmt)}>
                  {fmt === 'Excel' ? 'Excel (.xlsx)' : fmt}
                </button>
              ))}
            </div>
          </FRow>
          <FRow label="ผู้รับอีเมล">
            <FInput type="email" placeholder="email@vetcare.com (คั่นด้วย comma หากมีหลายคน)" />
          </FRow>
          <FRow label="เริ่มส่งจากวันที่"><FInput type="date" /></FRow>
          <ModalFooter>
            <BtnSecondary onClick={closeModal}>ยกเลิก</BtnSecondary>
            <BtnPrimary onClick={() => done(`ตั้งส่ง${scheduleFreq} (${scheduleFmt}) สำเร็จ`)}>
              <span className="flex items-center justify-center gap-1.5"><Mail size={14} /> บันทึก</span>
            </BtnPrimary>
          </ModalFooter>
        </Modal>
      )}

      {/* ── Modal: Service Detail ── */}
      {modal === 'serviceDetail' && modalSvc && (
        <Modal title={modalSvc.name} onClose={closeModal} maxWidth="max-w-sm">
          <div className="space-y-1 mb-3">
            {[
              ['ช่วงเวลา',        TABLE_LABEL[period]],
              ['จำนวน Cases',     modalSvc.count],
              ['รายได้รวม',       `฿ ${modalSvc.revenue.toLocaleString()}`],
              ['เฉลี่ยต่อ Case',  `฿ ${Math.round(modalSvc.revenue / modalSvc.count).toLocaleString()}`],
              ['สัดส่วนรายได้',   `${modalSvc.pct}% of top service`],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between items-center py-2.5 border-b border-[#f0f5f8] last:border-0">
                <span className="text-[12px] text-[#9ab0bc]">{label}</span>
                <span className="text-[13px] font-bold text-[#102a43]">{value}</span>
              </div>
            ))}
          </div>
          <div className="mb-1">
            <div className="flex justify-between text-[11px] text-[#9ab0bc] mb-1.5">
              <span>Revenue share</span><span>{modalSvc.pct}%</span>
            </div>
            <div className="h-2.5 bg-[#e9f0f5] rounded-full overflow-hidden">
              <div className="h-full bg-[#0f8f83] rounded-full transition-all duration-500" style={{ width: `${modalSvc.pct}%` }} />
            </div>
          </div>
          <ModalFooter>
            <BtnSecondary onClick={closeModal}>ปิด</BtnSecondary>
            <BtnPrimary onClick={() => done(`Export ${modalSvc.name} สำเร็จ`)}>
              <span className="flex items-center justify-center gap-1.5"><Download size={14} /> Export</span>
            </BtnPrimary>
          </ModalFooter>
        </Modal>
      )}

      {/* ── Scrollable content ── */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-5">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div>
            <h2 className="m-0 text-[28px] font-bold text-[#102a43]">Reports & Dashboard — รายงาน</h2>
            <p className="m-0 mt-1 text-[#64788a] text-sm">ภาพรวมการดำเนินงาน รายได้ และ KPI สำคัญ</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {/* Period toggles — drive all data */}
            <div className="flex gap-1.5 bg-white border border-[#e3edf3] rounded-xl p-1 shadow-sm">
              {[
                { key: 'today', label: 'Today'      },
                { key: 'week',  label: 'This Week'  },
                { key: 'month', label: 'This Month' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setPeriod(key)}
                  className={`px-3.5 py-1.5 rounded-lg font-bold text-[13px] border-0 cursor-pointer transition-colors ${
                    period === key
                      ? 'bg-[#0f8f83] text-white shadow-sm'
                      : 'bg-transparent text-[#64788a] hover:text-[#102a43]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            {/* Divider */}
            <div className="w-px h-6 bg-[#e3edf3]" />
            {/* Action buttons */}
            <button
              onClick={() => setModal('scheduleReport')}
              className="flex items-center gap-1.5 px-3.5 py-2 border border-[#e3edf3] bg-white rounded-xl text-[13px] font-bold text-[#64788a] hover:bg-[#f0f5f8] cursor-pointer shadow-sm border-solid"
            >
              <Mail size={14} /> Schedule
            </button>
            <button
              onClick={() => setModal('exportReport')}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#0f8f83] hover:bg-[#0a7a70] text-white rounded-xl text-[13px] font-bold cursor-pointer border-0 shadow-sm transition-colors"
            >
              <Download size={14} /> Export
            </button>
          </div>
        </div>

        {/* KPI Cards — driven by period */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 shrink-0">
          {kpis.map(({ label, value, sub, trend, color, icon: Icon }) => (
            <div key={label} className="bg-white border border-[#e3edf3] rounded-2xl p-4 shadow-sm">
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${color} grid place-items-center mb-3`}>
                <Icon size={17} color="white" strokeWidth={2} />
              </div>
              <p className="m-0 text-[22px] font-black text-[#102a43] leading-none">{value}</p>
              <p className="m-0 mt-1 text-[11px] font-bold text-[#39576d]">{label}</p>
              <div className={`flex items-center gap-1 mt-1 text-[10px] font-[800] ${trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
                {trend === 'up' ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
                {sub}
              </div>
            </div>
          ))}
        </div>

        {/* Charts row — driven by period */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-5 shrink-0">

          {/* Revenue Bar Chart */}
          <div className="bg-white border border-[#e3edf3] rounded-2xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2 font-black text-[#102a43]">
                <TrendingUp size={17} className="text-[#0f8f83]" /> {CHART_TITLE[period]}
              </div>
              <div className="flex items-center gap-3 text-[11px] font-[800] text-[#64788a]">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-[#0f8f83] inline-block" /> OPD</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-[#7c3aed] inline-block" /> Lab</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-[#d97706] inline-block" /> Pharma</span>
              </div>
            </div>
            <div className="flex items-end gap-2 h-40">
              {chartData.map(({ day, opd, lab, pharma }) => {
                const total     = opd + lab + pharma;
                const hPct      = (total  / maxBar) * 100;
                const opdPct    = (opd    / total)  * 100;
                const labPct    = (lab    / total)  * 100;
                const pharmaPct = (pharma / total)  * 100;
                return (
                  <div key={day} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
                    <div className="w-full flex flex-col rounded-t-lg overflow-hidden relative" style={{ height: `${hPct}%` }}>
                      <div className="bg-[#0f8f83]" style={{ height: `${opdPct}%` }} />
                      <div className="bg-[#7c3aed]" style={{ height: `${labPct}%` }} />
                      <div className="bg-[#d97706]" style={{ height: `${pharmaPct}%` }} />
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#102a43] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-lg">
                        ฿{total.toLocaleString()}
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-[#64788a]">{day}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Species Breakdown — same across periods */}
          <div className="bg-white border border-[#e3edf3] rounded-2xl shadow-sm p-5">
            <div className="flex items-center gap-2 font-black text-[#102a43] mb-5">
              <BarChart2 size={17} className="text-[#0f8f83]" /> Species Distribution
            </div>
            <div className="space-y-4">
              {speciesBreakdown.map(({ name, pct, color }) => (
                <div key={name}>
                  <div className="flex justify-between text-[13px] mb-1.5">
                    <span className="font-[800] text-[#39576d]">{name}</span>
                    <span className="font-black text-[#102a43]">{pct}%</span>
                  </div>
                  <div className="h-3 bg-[#e9f0f5] rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${color} transition-all duration-700`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-[#e3edf3] grid grid-cols-2 gap-3">
              {speciesBreakdown.map(({ name, pct, color }) => (
                <div key={name} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${color}`} />
                  <span className="text-[12px] text-[#64788a]">{name} <b className="text-[#102a43]">{pct}%</b></span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Services Table — driven by period */}
        <div className="bg-white border border-[#e3edf3] rounded-2xl shadow-sm overflow-hidden shrink-0">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#e3edf3]">
            <div className="flex items-center gap-2 font-black text-[#102a43]">
              <TrendingUp size={17} className="text-[#0f8f83]" />
              Top Services — {TABLE_LABEL[period]}
            </div>
            <span className="text-[12px] text-[#64788a] font-bold">
              Total: ฿ {totalRev.toLocaleString()}
            </span>
          </div>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left text-[#64788a] text-[11px] font-[800] uppercase bg-[#fbfdfe] border-b border-[#e3edf3]">
                <th className="px-6 py-3">Service</th>
                <th className="px-4 py-3 text-center">Cases</th>
                <th className="px-4 py-3 text-right">Revenue</th>
                <th className="px-4 py-3 hidden md:table-cell">Share</th>
                <th className="px-4 py-3 w-16"></th>
              </tr>
            </thead>
            <tbody>
              {services.map((svc) => (
                <tr key={svc.name} className="border-b border-[#e3edf3] last:border-0 hover:bg-[#fbfdfe] transition-colors">
                  <td className="px-6 py-3 font-bold text-[#102a43]">{svc.name}</td>
                  <td className="px-4 py-3 text-center text-[#64788a]">{svc.count}</td>
                  <td className="px-4 py-3 text-right font-bold text-[#0f8f83]">฿ {svc.revenue.toLocaleString()}</td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-[#e9f0f5] rounded-full overflow-hidden">
                        <div className="h-full bg-[#0f8f83] rounded-full transition-all duration-500" style={{ width: `${svc.pct}%` }} />
                      </div>
                      <span className="text-[11px] text-[#64788a] font-bold w-8 text-right">{svc.pct}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => openService(svc)}
                      className="text-[11px] font-bold text-[#0f8f83] hover:text-[#0a7a70] hover:underline cursor-pointer bg-transparent border-0 px-0"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
