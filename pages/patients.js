import { useState } from 'react';
import Link from 'next/link';
import {
  Pencil, CalendarDays, MoreHorizontal, Camera,
  CheckCircle2, Shield, FileText, TrendingUp,
  Phone, MessageSquare, ChevronRight, AlertCircle, Dog,
} from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

const patient = {
  name: 'Lucky', gender: 'M', status: 'Active',
  species: 'Dog', breed: 'Golden Retriever', color: 'Golden',
  sex: 'Male (Neutered)',
  dob: '12 พ.ค. 2562', age: '5 ปี 0 เดือน',
  weight: '28.5 kg', weightDate: '10 พ.ย. 2567',
  microchip: '900215000123456', animalId: 'PET-000321',
  regNo: '–', insurance: '–',
};

const owner = {
  name: 'คุณณัฐิดา วงศ์สวัสดิ์',
  phone: '098-123-4567',
  lineId: 'nattida_w',
  href: '/clients',
};

const quickInfo = [
  { label: 'Blood Type',          value: 'DEA 1.1 (+)'                    },
  { label: 'Allergies',           value: 'No known allergies'              },
  { label: 'Chronic Conditions',  value: 'None'                           },
  { label: 'Current Medications', value: 'None'                           },
  { label: 'Diet',                value: 'Royal Canin Golden Retriever Adult' },
  { label: 'Last Deworm',         value: '10 ก.ย. 2566'                   },
  { label: 'Last Flea & Tick',    value: '10 ก.ย. 2566'                   },
  { label: 'Remark',              value: '–'                              },
];

const vaccinations = [
  { name: 'DHPPiL',       date: '10 มี.ค. 2567', due: '10 มี.ค. 2568', valid: true },
  { name: 'Rabies',       date: '10 มี.ค. 2567', due: '10 มี.ค. 2568', valid: true },
  { name: 'Leptospirosis',date: '10 มี.ค. 2567', due: '10 มี.ค. 2568', valid: true },
  { name: 'Bordetella',   date: '10 มี.ค. 2567', due: '10 มี.ค. 2568', valid: true },
];

const recentVisits = [
  { date: '10 พ.ย. 2567', type: 'OPD',     detail: 'Fever, Cough',     doctor: 'Dr. Natthapon' },
  { date: '15 เม.ย. 2567',type: 'Vaccine',  detail: 'DHPPiL, Rabies',   doctor: 'Dr. Natthapon' },
  { date: '20 ก.พ. 2567', type: 'OPD',     detail: 'Vomiting',         doctor: 'Dr. Natthapon' },
  { date: '05 ม.ค. 2567', type: 'Check up', detail: 'Annual Check Up',  doctor: 'Dr. Natthapon' },
];

const labResults = [
  { name: 'CBC',           date: '10 พ.ย. 2567', result: 'Normal',   ok: true  },
  { name: 'Chemistry',     date: '10 พ.ย. 2567', result: 'Normal',   ok: true  },
  { name: 'Heartworm Ag',  date: '10 พ.ย. 2567', result: 'Negative', ok: true  },
];

const invoices = [
  { id: 'INV-6705102', date: '10 พ.ย. 2567', amount: '฿2,150.00', red: true  },
  { id: 'INV-6702018', date: '20 ก.พ. 2567', amount: '฿0.00',     red: false },
];

const TABS = ['Overview','Medical Record','Visits','Vaccination','Lab Results','Imaging','Medications','Allergies','Documents','Notes'];

// ─── Growth chart data ────────────────────────────────────────────────────────

const growthPts = [
  { label: 'พ.ค.66', v: 21.5 },
  { label: 'ก.ย.66', v: 23   },
  { label: 'พ.ย.66', v: 24   },
  { label: 'ม.ค.67', v: 25.5 },
  { label: 'มี.ค.67',v: 26.5 },
  { label: 'พ.ค.67', v: 27.5 },
  { label: 'ก.ย.67', v: 28   },
  { label: 'พ.ย.67', v: 28.5 },
];

function GrowthChart() {
  const W = 360, H = 130;
  const pL = 30, pR = 8, pT = 12, pB = 28;
  const pW = W - pL - pR, pH = H - pT - pB;
  const yMax = 40, n = growthPts.length;
  const tx = (i) => pL + (i / (n - 1)) * pW;
  const ty = (v) => pT + pH * (1 - v / yMax);
  const pts = growthPts.map((d, i) => ({ ...d, x: tx(i), y: ty(d.v) }));
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const yTicks = [0, 10, 20, 30, 40];

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} className="overflow-visible">
      {/* Grid */}
      {yTicks.map(t => (
        <g key={t}>
          <line x1={pL} y1={ty(t)} x2={W - pR} y2={ty(t)} stroke="#f0f5f8" strokeWidth={1} />
          <text x={pL - 4} y={ty(t) + 3.5} textAnchor="end" fontSize={8} fill="#9ab0bc">{t}</text>
        </g>
      ))}
      {/* Area fill */}
      <path
        d={`${path} L${(W - pR).toFixed(1)} ${(pT + pH).toFixed(1)} L${pL} ${(pT + pH).toFixed(1)} Z`}
        fill="#3b82f6" fillOpacity={0.06}
      />
      {/* Line */}
      <path d={path} fill="none" stroke="#3b82f6" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
      {/* Dots */}
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={i === n - 1 ? 4.5 : 3}
          fill={i === n - 1 ? '#2563eb' : '#3b82f6'} stroke="white" strokeWidth={1.5} />
      ))}
      {/* X labels */}
      {pts.map((p, i) => (
        (i % 2 === 0 || i === n - 1) && (
          <text key={i} x={p.x} y={H - 4} textAnchor="middle" fontSize={7.5} fill="#9ab0bc">{p.label}</text>
        )
      ))}
      {/* Y label */}
      <text x={4} y={pT + pH / 2} textAnchor="middle" fontSize={8} fill="#9ab0bc" transform={`rotate(-90 4 ${pT + pH / 2})`}>kg</text>
    </svg>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PatientDetailPage() {
  const [tab, setTab] = useState('Overview');

  return (
    <div className="overflow-y-auto h-full bg-[#f8fafc] p-5 flex flex-col gap-4">

      {/* Page title + actions */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-[24px] font-black text-[#102a43] m-0 leading-none">{patient.name}</h1>
          <span className="text-[#3b82f6] text-[13px] font-bold leading-none border border-[#3b82f6] px-1.5 py-0.5 rounded">{patient.gender}</span>
          <span className="px-2.5 py-0.5 bg-[#dcfce7] text-[#15803d] text-[12px] font-bold rounded-full">{patient.status}</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 border border-[#e3edf3] rounded-lg text-[13px] font-semibold text-[#39576d] hover:border-[#2563eb] hover:text-[#2563eb] transition-colors cursor-pointer bg-white">
            <Pencil size={13} /> Edit
          </button>
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 border border-[#e3edf3] rounded-lg text-[13px] font-semibold text-[#39576d] hover:border-[#2563eb] hover:text-[#2563eb] transition-colors cursor-pointer bg-white">
            <CalendarDays size={13} /> New Visit
          </button>
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#2563eb] rounded-lg text-[13px] font-semibold text-white hover:bg-[#1d4ed8] transition-colors cursor-pointer">
            <MoreHorizontal size={13} /> More
          </button>
        </div>
      </div>

      {/* Patient info card */}
      <div className="bg-white border border-[#e3edf3] rounded-xl p-5 shadow-sm shrink-0">
        <div className="flex gap-6">
          {/* Photo */}
          <div className="flex flex-col items-center gap-2 shrink-0">
            <div className="w-[100px] h-[100px] rounded-full bg-[#fef3c7] flex items-center justify-center border-4 border-[#e3edf3]">
              <Dog size={52} className="text-[#b45309]" />
            </div>
            <button className="flex items-center gap-1 text-[11px] text-[#64788a] border border-[#e3edf3] rounded-lg px-2.5 py-1 hover:border-[#2563eb] hover:text-[#2563eb] transition-colors cursor-pointer">
              <Camera size={11} /> Change Photo
            </button>
          </div>

          {/* Fields grid */}
          <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-2 min-w-0">
            {[
              ['Species',          patient.species],
              ['Microchip',        patient.microchip],
              ['Breed',            patient.breed],
              ['Animal ID',        patient.animalId],
              ['Color',            patient.color],
              ['Registration No.', patient.regNo],
              ['Sex',              patient.sex],
              ['Insurance',        patient.insurance],
              ['Birth Date / Age', `${patient.dob} (${patient.age})`],
              ['', ''],
              ['Weight (Last)',     `${patient.weight} (${patient.weightDate})`],
              ['', ''],
            ].map(([label, value], i) => (
              label ? (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[12px] text-[#9ab0bc] w-[120px] shrink-0 leading-5">{label}</span>
                  <span className="text-[12px] font-semibold text-[#102a43] leading-5">{value}</span>
                </div>
              ) : <div key={i} />
            ))}
          </div>

          {/* Owner panel */}
          <div className="w-[200px] shrink-0 border-l border-[#f0f5f8] pl-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#9ab0bc] uppercase tracking-wider">Owner (Client)</span>
              <Link href={owner.href} className="text-[11px] text-[#2563eb] font-bold no-underline hover:underline">View Client</Link>
            </div>
            <div className="text-[13px] font-bold text-[#102a43] mb-2">{owner.name}</div>
            <div className="flex items-center gap-1.5 text-[12px] text-[#64788a] mb-1">
              <Phone size={12} className="text-[#9ab0bc]" /> {owner.phone}
            </div>
            <div className="flex items-center gap-1.5 text-[12px] text-[#64788a]">
              <MessageSquare size={12} className="text-[#9ab0bc]" /> {owner.lineId}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-0 border-b border-[#e3edf3] shrink-0 bg-white rounded-t-xl px-2 -mb-1">
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-[12px] font-semibold transition-colors cursor-pointer border-b-2 whitespace-nowrap ${
              tab === t
                ? 'border-[#2563eb] text-[#2563eb]'
                : 'border-transparent text-[#64748b] hover:text-[#102a43]'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Overview content */}
      {tab === 'Overview' && (
        <>
          {/* Row 1: Quick Info | Vaccination | Recent Visits */}
          <div className="grid grid-cols-3 gap-4 shrink-0">

            {/* Quick Info */}
            <div className="bg-white border border-[#e3edf3] rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Shield size={14} className="text-[#2563eb]" />
                <span className="text-[13px] font-black text-[#102a43]">Quick Info</span>
              </div>
              <div className="flex flex-col gap-2">
                {quickInfo.map((q) => (
                  <div key={q.label} className="flex items-start gap-2">
                    <span className="text-[11px] text-[#9ab0bc] w-[120px] shrink-0 leading-5">{q.label}</span>
                    <span className="text-[11px] text-[#39576d] leading-5 font-medium">{q.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vaccination Status */}
            <div className="bg-white border border-[#e3edf3] rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Shield size={14} className="text-[#2563eb]" />
                  <span className="text-[13px] font-black text-[#102a43]">Vaccination Status</span>
                </div>
                <Link href="/lab" className="text-[11px] text-[#2563eb] font-bold no-underline hover:underline">View All</Link>
              </div>
              <div className="flex flex-col gap-2.5">
                {vaccinations.map((v) => (
                  <div key={v.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-[#22c55e] shrink-0" />
                      <span className="text-[12px] font-semibold text-[#102a43]">{v.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] text-[#64788a]">{v.date}</div>
                      <div className="flex items-center gap-1.5 justify-end">
                        <span className="text-[10px] font-bold text-[#15803d] bg-[#dcfce7] px-1.5 py-0.5 rounded-md">Valid</span>
                        <span className="text-[10px] text-[#9ab0bc]">Due {v.due}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Visits */}
            <div className="bg-white border border-[#e3edf3] rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FileText size={14} className="text-[#2563eb]" />
                  <span className="text-[13px] font-black text-[#102a43]">Recent Visits</span>
                </div>
                <Link href="/emr" className="text-[11px] text-[#2563eb] font-bold no-underline hover:underline">View All</Link>
              </div>
              <div className="flex flex-col gap-0">
                {recentVisits.map((v, i) => (
                  <div key={i} className="flex items-center gap-2 py-2 border-b border-[#f8fbfc] last:border-0">
                    <div className="min-w-[72px]">
                      <div className="text-[11px] font-bold text-[#102a43]">{v.date}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-[#64788a] bg-[#f0f5f8] px-1.5 py-0.5 rounded-md">{v.type}</span>
                      <div className="text-[11px] text-[#39576d] mt-0.5 truncate">{v.detail}</div>
                      <div className="text-[10px] text-[#9ab0bc]">{v.doctor}</div>
                    </div>
                    <FileText size={14} className="text-[#c4d6e0] shrink-0 cursor-pointer hover:text-[#2563eb] transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Growth Chart | Lab Results | Outstanding */}
          <div className="grid grid-cols-3 gap-4 shrink-0">

            {/* Growth Chart */}
            <div className="bg-white border border-[#e3edf3] rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp size={14} className="text-[#2563eb]" />
                  <span className="text-[13px] font-black text-[#102a43]">Growth Chart</span>
                </div>
                <div className="flex items-center gap-2">
                  <select className="text-[11px] text-[#64788a] border border-[#e3edf3] rounded-md px-2 py-1 cursor-pointer outline-none">
                    <option>Weight</option>
                    <option>Height</option>
                  </select>
                  <select className="text-[11px] text-[#64788a] border border-[#e3edf3] rounded-md px-2 py-1 cursor-pointer outline-none">
                    <option>1 Year</option>
                    <option>6 Months</option>
                    <option>All</option>
                  </select>
                </div>
              </div>
              <GrowthChart />
            </div>

            {/* Lab Results */}
            <div className="bg-white border border-[#e3edf3] rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <AlertCircle size={14} className="text-[#2563eb]" />
                  <span className="text-[13px] font-black text-[#102a43]">Last 3 Lab Results</span>
                </div>
                <Link href="/lab" className="text-[11px] text-[#2563eb] font-bold no-underline hover:underline">View All</Link>
              </div>
              <div className="flex flex-col gap-3">
                {labResults.map((r) => (
                  <div key={r.name} className="flex items-center justify-between">
                    <div>
                      <div className="text-[12px] font-semibold text-[#102a43]">{r.name}</div>
                      <div className="text-[10px] text-[#9ab0bc]">{r.date}</div>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${r.ok ? 'bg-[#dcfce7] text-[#15803d]' : 'bg-[#fee2e2] text-[#dc2626]'}`}>
                      {r.result}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Outstanding */}
            <div className="bg-white border border-[#e3edf3] rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <FileText size={14} className="text-[#2563eb]" />
                <span className="text-[13px] font-black text-[#102a43]">Outstanding</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-[11px] text-[#9ab0bc] mb-0.5">Total Outstanding</div>
                  <div className="text-[22px] font-black text-[#dc2626]">฿2,150.00</div>
                </div>
                <Link href="/billing" className="px-3 py-1.5 bg-[#fee2e2] text-[#dc2626] text-[11px] font-bold rounded-lg no-underline hover:bg-[#fecaca] transition-colors">
                  View Invoice
                </Link>
              </div>
              <div className="flex flex-col gap-2 border-t border-[#f0f5f8] pt-3">
                {invoices.map((inv) => (
                  <div key={inv.id} className="flex items-center justify-between">
                    <div>
                      <div className="text-[12px] font-semibold text-[#102a43]">{inv.id}</div>
                      <div className="text-[10px] text-[#9ab0bc]">{inv.date}</div>
                    </div>
                    <span className={`text-[12px] font-bold ${inv.red ? 'text-[#dc2626]' : 'text-[#64788a]'}`}>
                      {inv.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Other tabs placeholder */}
      {tab !== 'Overview' && (
        <div className="bg-white border border-[#e3edf3] rounded-xl p-10 flex flex-col items-center justify-center text-center shrink-0">
          <FileText size={32} className="text-[#c4d6e0] mb-3" />
          <div className="text-[14px] font-bold text-[#64788a]">{tab}</div>
          <div className="text-[12px] text-[#9ab0bc] mt-1">No records found</div>
        </div>
      )}
    </div>
  );
}
