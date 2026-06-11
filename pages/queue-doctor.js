import React, { useState } from 'react';
import {
  Dog, Cat, Rabbit, PawPrint,
  ChevronLeft, ChevronRight, CalendarDays, Clock, Users,
  CheckCircle2, XCircle, X, Plus, Stethoscope,
  Scissors, FlaskConical, ScanLine, Syringe,
  UserCircle, ChevronDown, Filter,
} from 'lucide-react';

// ─── Data ─────────────────────────────────────────────────────────────────────

const doctors = [
  { id: 1, name: 'Dr. Natthapon', specialty: 'Internal Medicine', initials: 'NT' },
  { id: 2, name: 'Dr. Piyawan',   specialty: 'Surgery',           initials: 'PW' },
  { id: 3, name: 'Dr. Kittisak',  specialty: 'Dentistry',         initials: 'KS' },
  { id: 4, name: 'Dr. Waraporn',  specialty: 'Dermatology',       initials: 'WP' },
];

const appointments = [
  { id:1,  doctor:1, pet:'Lucky',   species:'dog',  start:'08:30', end:'09:00', service:'OPD',       chief:'Follow up CKD',             status:'in-progress' },
  { id:2,  doctor:1, pet:'Mochi',   species:'cat',  start:'09:30', end:'10:00', service:'OPD',       chief:'Vomiting',                  status:'checked-in' },
  { id:3,  doctor:1, pet:'Bella',   species:'dog',  start:'10:30', end:'11:00', service:'OPD',       chief:'Diarrhea',                  status:'confirmed' },
  { id:4,  doctor:1, pet:'Max',     species:'dog',  start:'11:30', end:'12:00', service:'OPD',       chief:"Cushing's follow up",       status:'pending' },
  { id:5,  doctor:1, pet:'CoCo',    species:'dog',  start:'13:30', end:'14:00', service:'OPD',       chief:'Heart murmur',              status:'confirmed' },
  { id:6,  doctor:1, pet:'Luna',    species:'cat',  start:'15:00', end:'15:30', service:'OPD',       chief:'FIP follow up',             status:'confirmed' },
  { id:7,  doctor:1, pet:'Walk-in', species:null,   start:'16:30', end:'17:00', service:'Walk-in',   chief:null,                        status:'walk-in' },
  { id:8,  doctor:2, pet:'Daisy',   species:'dog',  start:'09:00', end:'10:30', service:'Procedure', chief:'Spay',                      status:'in-progress' },
  { id:9,  doctor:2, pet:'Charlie', species:'cat',  start:'11:00', end:'12:00', service:'Dental',    chief:'Dental Cleaning',           status:'confirmed' },
  { id:10, doctor:2, pet:'Rocky',   species:'dog',  start:'13:00', end:'14:30', service:'Procedure', chief:'Mass Removal',              status:'pending' },
  { id:11, doctor:2, pet:'Tiger',   species:'cat',  start:'15:30', end:'16:30', service:'Procedure', chief:'Femoral Head Ostectomy',    status:'confirmed' },
  { id:12, doctor:3, pet:'Bingo',   species:'dog',  start:'09:30', end:'10:30', service:'Dental',    chief:'Dental Scaling',            status:'confirmed' },
  { id:13, doctor:3, pet:'Milo',    species:'dog',  start:'11:00', end:'12:00', service:'Dental',    chief:'Periodontal Treatment',     status:'pending' },
  { id:14, doctor:3, pet:'Pudding', species:'cat',  start:'13:30', end:'14:30', service:'Dental',    chief:'Dental Scaling',            status:'confirmed' },
  { id:15, doctor:3, pet:'Coco',    species:'dog',  start:'16:00', end:'17:00', service:'OPD',       chief:'Atopy',                     status:'confirmed' },
  { id:16, doctor:4, pet:'Nana',    species:'dog',  start:'10:00', end:'10:30', service:'OPD',       chief:'Skin allergy',              status:'confirmed' },
  { id:17, doctor:4, pet:'Kiwi',    species:'cat',  start:'14:00', end:'14:30', service:'OPD',       chief:'Otitis externa',            status:'confirmed' },
  { id:18, doctor:4, pet:'Coco',    species:'dog',  start:'16:00', end:'17:00', service:'OPD',       chief:'Atopy',                     status:'confirmed' },
];

// ─── Grid constants ────────────────────────────────────────────────────────────

const START_MIN = 8 * 60; // 480 — 08:00
const END_MIN   = 17 * 60 + 30; // 17:30
const SLOT_H    = 52; // px per 30 min slot

function timeToY(t) {
  const [h, m] = t.split(':').map(Number);
  return ((h * 60 + m) - START_MIN) / 30 * SLOT_H;
}

function durationH(start, end) {
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  return ((eh * 60 + em) - (sh * 60 + sm)) / 30 * SLOT_H;
}

// Generate time labels every 30 min from 08:00 to 17:30
const timeLabels = [];
for (let min = START_MIN; min <= END_MIN; min += 30) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  timeLabels.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
}

const TOTAL_H = ((END_MIN - START_MIN) / 30) * SLOT_H; // total grid height in px

// ─── Service config ───────────────────────────────────────────────────────────

const SERVICE_CFG = {
  OPD:       { borderCls: 'border-l-[#0f8f83]', bgCls: 'bg-[#e9f7f4]', Icon: Stethoscope, label: 'OPD' },
  Procedure: { borderCls: 'border-l-purple-500', bgCls: 'bg-purple-50', Icon: ScanLine,    label: 'Procedure' },
  Dental:    { borderCls: 'border-l-amber-500',  bgCls: 'bg-amber-50',  Icon: Scissors,    label: 'Dental' },
  'Walk-in': { borderCls: 'border-l-gray-400',   bgCls: 'bg-gray-50',   Icon: PawPrint,    label: 'Walk-in' },
};

// ─── Status dot colors ────────────────────────────────────────────────────────

const STATUS_DOT = {
  'in-progress': 'bg-[#0f8f83]',
  'checked-in':  'bg-blue-500',
  'confirmed':   'bg-green-500',
  'pending':     'bg-yellow-400',
  'cancelled':   'bg-red-500',
  'walk-in':     'bg-gray-400',
};

// ─── Species icon ─────────────────────────────────────────────────────────────

function SpeciesIcon({ species, size = 13 }) {
  if (species === 'dog')    return <Dog    size={size} className="text-[#c37000] shrink-0" />;
  if (species === 'cat')    return <Cat    size={size} className="text-[#5c6bc0] shrink-0" />;
  if (species === 'rabbit') return <Rabbit size={size} className="text-[#2e7d32] shrink-0" />;
  return <PawPrint size={size} className="text-[#8faabb] shrink-0" />;
}

// ─── Doctor avatar ────────────────────────────────────────────────────────────

function DoctorAvatar({ initials, size = 44 }) {
  return (
    <div
      className="rounded-full bg-gradient-to-br from-[#0f8f83] to-[#07364a] text-white font-black grid place-items-center shrink-0 shadow-sm"
      style={{ width: size, height: size, fontSize: size * 0.31 }}
    >
      {initials}
    </div>
  );
}

// ─── Appointment card (absolutely positioned) ─────────────────────────────────

function ApptCard({ appt, isSelected, onClick }) {
  const cfg   = SERVICE_CFG[appt.service] || SERVICE_CFG['Walk-in'];
  const top   = timeToY(appt.start);
  const height = durationH(appt.start, appt.end);
  const dotCls = STATUS_DOT[appt.status] || 'bg-gray-300';
  const isWalkIn = appt.service === 'Walk-in';
  const isShort  = height <= SLOT_H; // 30-min or less

  return (
    <div
      onClick={onClick}
      style={{ top, height, left: 4, right: 4, position: 'absolute', zIndex: isSelected ? 10 : 1 }}
      className={`
        rounded-xl border-l-[3px] border border-[#e3edf3] shadow-sm cursor-pointer overflow-hidden
        transition-all select-none
        ${cfg.borderCls} ${cfg.bgCls}
        ${isSelected ? 'ring-2 ring-[#0f8f83]/40 shadow-md border-[#0f8f83]/30' : 'hover:shadow-md hover:brightness-[.97]'}
        ${isWalkIn ? 'border-dashed' : ''}
      `}
    >
      <div className="h-full px-2 py-1 flex flex-col justify-between relative">
        {/* Status dot top-right */}
        <span
          className={`absolute top-1.5 right-1.5 w-2 h-2 rounded-full shrink-0 ${dotCls}`}
          title={appt.status}
        />

        {/* Top row: species icon + pet name */}
        <div className="flex items-start gap-1 pr-3">
          <SpeciesIcon species={appt.species} size={isShort ? 11 : 13} />
          <div className="min-w-0 flex-1">
            <p className="m-0 font-[850] text-[#102a43] truncate leading-tight" style={{ fontSize: isShort ? 11 : 12 }}>
              {appt.pet}
              {appt.species && (
                <span className="font-normal text-[#64788a] ml-1" style={{ fontSize: 10 }}>
                  {appt.species === 'dog' ? 'Dog' : appt.species === 'cat' ? 'Cat' : 'Rabbit'}
                </span>
              )}
            </p>
            {!isShort && (
              <p className="m-0 text-[10px] text-[#64788a] leading-tight">
                {appt.start}–{appt.end}
              </p>
            )}
          </div>
        </div>

        {/* Chief complaint (if not walk-in and not too short) */}
        {!isWalkIn && !isShort && appt.chief && (
          <p className="m-0 text-[10px] text-[#64788a] leading-snug truncate mt-0.5">
            {appt.chief}
          </p>
        )}

        {/* Service icon bottom-left for taller cards */}
        {height > SLOT_H * 1.5 && (
          <div className="flex items-center gap-1 mt-auto pt-0.5">
            <cfg.Icon size={10} className="text-[#64788a]" />
            <span className="text-[10px] text-[#64788a] font-[700]">{cfg.label}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── KPI cards ────────────────────────────────────────────────────────────────

const kpiCards = [
  { label: 'นัดหมายวันนี้',  value: 18, sub: 'Confirmed 15 · Pending 3',  bgVal: 'bg-[#e9f7f4]', valCls: 'text-[#0f8f83]' },
  { label: 'รอนัดหมาย',     value: 3,  sub: 'Check-in แล้ว 2',           bgVal: 'bg-blue-50',    valCls: 'text-blue-600'  },
  { label: 'Walk-in วันนี้', value: 1,  sub: 'ไม่มีนัดหมาย',              bgVal: 'bg-gray-100',   valCls: 'text-[#64788a]' },
  { label: 'ยกเลิกวันนี้',   value: 1,  sub: 'วันนี้',                    bgVal: 'bg-red-50',     valCls: 'text-red-500'   },
  { label: 'Completed',       value: 6,  sub: 'เสร็จแล้ววันนี้',          bgVal: 'bg-green-50',   valCls: 'text-green-600' },
];

// ─── Right panel data ─────────────────────────────────────────────────────────

const upcomingIds   = [2, 3, 4]; // ids of the "upcoming" appointments
const upcomingAppts = appointments.filter(a => upcomingIds.includes(a.id));

const apptTypeCounts = [
  { label: 'OPD',       pct: 56, dotCls: 'bg-[#0f8f83]' },
  { label: 'Procedure', pct: 22, dotCls: 'bg-purple-500' },
  { label: 'Dental',    pct: 22, dotCls: 'bg-amber-500'  },
];

const todayStats = [
  { label: 'Total Appointments', value: 18 },
  { label: 'Completed',          value: 6  },
  { label: 'No Show',            value: 0  },
  { label: 'Cancellations',      value: 1  },
  { label: 'Walk-in',            value: 1  },
];

// ─── Legend ───────────────────────────────────────────────────────────────────

const legendItems = [
  { label: 'Confirmed',   cls: 'bg-green-500' },
  { label: 'Pending',     cls: 'bg-yellow-400' },
  { label: 'Checked-in',  cls: 'bg-blue-500' },
  { label: 'In Progress', cls: 'bg-[#0f8f83]' },
  { label: 'Completed',   cls: 'bg-gray-400' },
  { label: 'Cancelled',   cls: 'bg-red-500' },
  { label: 'Walk-in',     cls: 'bg-gray-400', dashed: true },
];

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function QueueDoctorPage() {
  const [selectedAppt, setSelectedAppt]     = useState(null);
  const [doctorFilter, setDoctorFilter]     = useState('all');
  const [serviceFilter, setServiceFilter]   = useState('all');
  const [toast, setToast]                   = useState('');

  const handleCardClick = (appt) => {
    setSelectedAppt(prev => prev?.id === appt.id ? null : appt);
  };

  const filteredDoctors = doctorFilter === 'all'
    ? doctors
    : doctors.filter(d => d.id === Number(doctorFilter));

  const visibleAppts = appointments.filter(a => {
    const docOk  = doctorFilter  === 'all' || a.doctor  === Number(doctorFilter);
    const svcOk  = serviceFilter === 'all' || a.service === serviceFilter;
    return docOk && svcOk;
  });

  return (
    <div className="h-full flex flex-col bg-[#f0f5f8] overflow-hidden">
      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#102a43] text-white text-sm px-6 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-white/10">
          <span className="font-bold">{toast}</span>
          <button onClick={() => setToast('')} className="bg-transparent border-0 text-white/50 hover:text-white cursor-pointer ml-2"><X size={14} /></button>
        </div>
      )}

      {/* ── Header ── */}
      <div className="bg-white border-b border-[#e3edf3] px-5 py-3 shrink-0 flex items-center justify-between gap-3 flex-wrap">
        {/* Date navigation */}
        <div className="flex items-center gap-2">
          <button onClick={() => setToast('นำทางไปวันก่อนหน้า')} className="w-8 h-8 border border-[#e3edf3] rounded-xl grid place-items-center bg-white hover:bg-[#f6f9fb] transition">
            <ChevronLeft size={15} className="text-[#64788a]" />
          </button>
          <div className="flex items-center gap-2">
            <CalendarDays size={15} className="text-[#0f8f83]" />
            <span className="font-[900] text-[14px] text-[#102a43]">วันนี้</span>
            <span className="text-[13px] text-[#64788a]">จันทร์ 9 มิ.ย. 2026</span>
          </div>
          <button onClick={() => setToast('นำทางไปวันถัดไป')} className="w-8 h-8 border border-[#e3edf3] rounded-xl grid place-items-center bg-white hover:bg-[#f6f9fb] transition">
            <ChevronRight size={15} className="text-[#64788a]" />
          </button>
        </div>

        {/* View toggles */}
        <div className="flex items-center gap-1 border border-[#e3edf3] rounded-xl overflow-hidden">
          {['Day', 'Week'].map((v, i) => (
            <button
              key={v}
              onClick={() => setToast(`เปลี่ยนมุมมองเป็น ${v}`)}
              className={`px-4 py-2 text-[12px] font-[850] border-0 cursor-pointer transition-colors
                ${i > 0 ? 'border-l border-[#e3edf3]' : ''}
                ${v === 'Day' ? 'bg-[#0f8f83] text-white' : 'bg-white text-[#64788a] hover:bg-gray-50'}`}
            >
              {v}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={13} className="text-[#8faabb]" />

          {/* Doctor filter */}
          <div className="relative">
            <select
              value={doctorFilter}
              onChange={e => setDoctorFilter(e.target.value)}
              className="appearance-none border border-[#e3edf3] rounded-xl pl-3 pr-7 py-2 text-[12px] font-[700] text-[#102a43] bg-white outline-none hover:border-[#0f8f83] transition cursor-pointer"
            >
              <option value="all">All Doctors</option>
              {doctors.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
            <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64788a] pointer-events-none" />
          </div>

          {/* Service filter */}
          <div className="relative">
            <select
              value={serviceFilter}
              onChange={e => setServiceFilter(e.target.value)}
              className="appearance-none border border-[#e3edf3] rounded-xl pl-3 pr-7 py-2 text-[12px] font-[700] text-[#102a43] bg-white outline-none hover:border-[#0f8f83] transition cursor-pointer"
            >
              <option value="all">All Types</option>
              {Object.keys(SERVICE_CFG).map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64788a] pointer-events-none" />
          </div>

          {/* New appointment */}
          <button onClick={() => setToast('เพิ่มนัดหมายใหม่')} className="flex items-center gap-1.5 bg-gradient-to-r from-[#0f8f83] to-[#07364a] text-white border-0 rounded-xl px-4 py-2 text-[12px] font-[850] cursor-pointer shadow-sm hover:opacity-90 transition">
            <Plus size={13} /> New Appointment
          </button>
        </div>
      </div>

      {/* ── KPI bar ── */}
      <div className="bg-white border-b border-[#e3edf3] px-5 py-2.5 shrink-0 flex items-center gap-5 overflow-x-auto">
        {kpiCards.map(({ label, value, sub, bgVal, valCls }) => (
          <div key={label} className="flex items-center gap-2.5 shrink-0">
            <div className={`w-9 h-9 rounded-xl grid place-items-center ${bgVal}`}>
              <span className={`text-[16px] font-black ${valCls}`}>{value}</span>
            </div>
            <div>
              <p className="m-0 text-[12px] font-[800] text-[#39576d] leading-tight">{label}</p>
              <p className="m-0 text-[10px] text-[#8faabb] leading-tight">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Main grid + right panel ── */}
      <div className="flex-1 min-h-0 flex overflow-hidden">

        {/* Time grid */}
        <div className="flex-1 min-w-0 overflow-auto">
          {/* Doctor header row */}
          <div className="sticky top-0 z-20 bg-[#f6f9fb] border-b border-[#e3edf3] flex">
            {/* Time label gutter */}
            <div className="shrink-0 bg-[#f6f9fb]" style={{ width: 70 }} />
            {/* Doctor columns header */}
            <div className="flex-1 grid" style={{ gridTemplateColumns: `repeat(${filteredDoctors.length}, minmax(160px, 1fr))` }}>
              {filteredDoctors.map(doc => (
                <div key={doc.id} className="px-3 py-3 flex items-center gap-2.5 border-l border-[#e3edf3]">
                  <DoctorAvatar initials={doc.initials} size={38} />
                  <div>
                    <p className="m-0 font-[850] text-[13px] text-[#102a43] leading-tight">{doc.name}</p>
                    <p className="m-0 text-[11px] text-[#64788a] leading-tight">{doc.specialty}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grid body */}
          <div className="flex" style={{ minHeight: TOTAL_H + 40 }}>
            {/* Time labels */}
            <div className="shrink-0" style={{ width: 70 }}>
              <div style={{ position: 'relative', height: TOTAL_H + 40, paddingTop: 0 }}>
                {timeLabels.map((t) => (
                  <div
                    key={t}
                    className="absolute right-2 text-[11px] text-[#8faabb] font-[700] select-none"
                    style={{ top: timeToY(t) - 8, width: 60, textAlign: 'right' }}
                  >
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Doctor columns */}
            <div
              className="flex-1 grid"
              style={{
                gridTemplateColumns: `repeat(${filteredDoctors.length}, minmax(160px, 1fr))`,
                position: 'relative',
                height: TOTAL_H + 40,
              }}
            >
              {filteredDoctors.map(doc => {
                const docAppts = visibleAppts.filter(a => a.doctor === doc.id);
                return (
                  <div
                    key={doc.id}
                    className="relative border-l border-[#e3edf3]"
                    style={{ height: TOTAL_H + 40 }}
                  >
                    {/* Horizontal slot lines */}
                    {timeLabels.map((t) => (
                      <div
                        key={t}
                        className="absolute left-0 right-0 border-t border-[#e3edf3]"
                        style={{ top: timeToY(t) }}
                      />
                    ))}

                    {/* Appointment cards */}
                    {docAppts.map(appt => (
                      <ApptCard
                        key={appt.id}
                        appt={appt}
                        isSelected={selectedAppt?.id === appt.id}
                        onClick={() => handleCardClick(appt)}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Right sidebar ── */}
        <div
          className="shrink-0 border-l border-[#e3edf3] bg-white flex flex-col overflow-y-auto"
          style={{ width: 264 }}
        >

          {/* Upcoming */}
          <div className="p-4 border-b border-[#e3edf3]">
            <div className="flex items-center gap-1.5 mb-3">
              <Clock size={13} className="text-[#0f8f83]" />
              <span className="font-[900] text-[13px] text-[#102a43]">Upcoming</span>
              <span className="ml-auto text-[10px] text-[#8faabb] font-[700]">รอนัดหมาย</span>
            </div>
            <div className="flex flex-col gap-2">
              {upcomingAppts.map(a => {
                const dotCls = STATUS_DOT[a.status] || 'bg-gray-300';
                return (
                  <div
                    key={a.id}
                    onClick={() => handleCardClick(a)}
                    className={`flex items-start gap-2 p-2.5 rounded-xl cursor-pointer transition-all border
                      ${selectedAppt?.id === a.id
                        ? 'bg-[#e9f7f4] border-[#0f8f83]/30'
                        : 'bg-[#f6f9fb] border-[#e3edf3] hover:border-[#7ccdc2]'}`}
                  >
                    <div className="flex flex-col items-center gap-1 pt-0.5 shrink-0">
                      <span className="text-[11px] font-[900] text-[#0f8f83]">{a.start}</span>
                      <div className={`w-2 h-2 rounded-full ${dotCls}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <SpeciesIcon species={a.species} size={11} />
                        <span className="font-[850] text-[12px] text-[#102a43] truncate">{a.pet}</span>
                      </div>
                      {a.chief && (
                        <p className="m-0 text-[10px] text-[#64788a] truncate">{a.chief}</p>
                      )}
                    </div>
                    <span className="text-[10px] text-[#8faabb] shrink-0 pt-0.5">รอ</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Appointment Types */}
          <div className="p-4 border-b border-[#e3edf3]">
            <div className="flex items-center gap-1.5 mb-3">
              <Users size={13} className="text-[#0f8f83]" />
              <span className="font-[900] text-[13px] text-[#102a43]">Appointment Types</span>
            </div>
            <div className="flex flex-col gap-2">
              {apptTypeCounts.map(({ label, pct, dotCls }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${dotCls}`} />
                  <span className="text-[12px] text-[#39576d] flex-1">{label}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="w-20 h-1.5 bg-[#e3edf3] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${dotCls}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-[800] text-[#64788a] w-6 text-right">{pct}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Stats */}
          <div className="p-4">
            <div className="flex items-center gap-1.5 mb-3">
              <CheckCircle2 size={13} className="text-[#0f8f83]" />
              <span className="font-[900] text-[13px] text-[#102a43]">Today's Stats</span>
            </div>
            <div className="flex flex-col gap-1.5">
              {todayStats.map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-[12px] text-[#64788a]">{label}</span>
                  <span className="text-[13px] font-[900] text-[#102a43]">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Selected appointment detail */}
          {selectedAppt && (
            <div className="mx-3 mb-4 mt-1 p-3 rounded-xl border border-[#0f8f83]/30 bg-[#e9f7f4]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-[900] text-[#0f8f83] uppercase tracking-wide">Selected</span>
                <button
                  onClick={() => setSelectedAppt(null)}
                  className="text-[#64788a] hover:text-[#102a43] bg-transparent border-0 cursor-pointer p-0 leading-none"
                >
                  <XCircle size={14} />
                </button>
              </div>
              <div className="flex items-center gap-1.5 mb-1">
                <SpeciesIcon species={selectedAppt.species} size={13} />
                <span className="font-[850] text-[13px] text-[#102a43]">{selectedAppt.pet}</span>
              </div>
              <p className="m-0 text-[11px] text-[#64788a]">{selectedAppt.start}–{selectedAppt.end}</p>
              {selectedAppt.chief && (
                <p className="m-0 text-[11px] text-[#64788a] mt-0.5">{selectedAppt.chief}</p>
              )}
              <div className="flex items-center gap-1.5 mt-2">
                <div className={`w-2 h-2 rounded-full ${STATUS_DOT[selectedAppt.status] || 'bg-gray-300'}`} />
                <span className="text-[11px] font-[700] text-[#39576d] capitalize">{selectedAppt.status.replace('-', ' ')}</span>
              </div>
              {(() => {
                const doc = doctors.find(d => d.id === selectedAppt.doctor);
                return doc ? (
                  <p className="m-0 text-[11px] text-[#64788a] mt-1">{doc.name}</p>
                ) : null;
              })()}
            </div>
          )}
        </div>
      </div>

      {/* ── Legend ── */}
      <div className="bg-white border-t border-[#e3edf3] px-5 py-2 shrink-0 flex items-center gap-3 flex-wrap">
        <span className="text-[11px] font-[800] text-[#8faabb] mr-1">Legend:</span>
        {legendItems.map(({ label, cls, dashed }) => (
          <div key={label} className="flex items-center gap-1.5 shrink-0">
            <div
              className={`w-3 h-3 rounded-full ${cls}`}
              style={dashed ? { outline: '1.5px dashed #9ca3af', outlineOffset: 1, background: 'transparent' } : {}}
            />
            <span className="text-[11px] text-[#64788a] font-[700]">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
