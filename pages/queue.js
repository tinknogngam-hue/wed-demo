// src/pages/queue.js  —  Animal Queue
import React, { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2, RefreshCw, Dog, Cat, Rabbit, Stethoscope, FlaskConical,
  Syringe, Scissors, ScanLine, LayoutGrid, List, Plus, Timer, Bell,
  ArrowRight, X, ChevronRight, Search, Phone, ChevronDown,
  Clock, Activity, Pencil, FileText, Paperclip,
} from 'lucide-react';

// ─── Config ──────────────────────────────────────────────────────────────────

const SPECIES = {
  dog:    { Icon: Dog,    bg: 'bg-[#fff7ed]', ic: 'text-[#c37000]', label: 'สุนัข' },
  cat:    { Icon: Cat,    bg: 'bg-[#f5f3ff]', ic: 'text-[#5c6bc0]', label: 'แมว' },
  rabbit: { Icon: Rabbit, bg: 'bg-[#f0fdf4]', ic: 'text-[#2e7d32]', label: 'กระต่าย' },
};

const SERVICES = {
  OPD:         { label: 'OPD',      cls: 'bg-[#e9f7f4] text-[#0f8f83]',  Icon: Stethoscope },
  Lab:         { label: 'แล็บ',     cls: 'bg-purple-100 text-purple-700', Icon: FlaskConical },
  Vaccination: { label: 'วัคซีน',   cls: 'bg-blue-100 text-blue-700',     Icon: Syringe },
  Dental:      { label: 'ทันตกรรม', cls: 'bg-amber-100 text-amber-700',   Icon: Scissors },
  Procedure:   { label: 'หัตถการ',  cls: 'bg-red-100 text-red-700',       Icon: ScanLine },
};

const URGENCY = {
  critical:  { dot: 'bg-red-500',    card: 'border-l-[4px] border-l-red-500',    badge: 'bg-red-100 text-red-700',       label: 'Critical' },
  emergency: { dot: 'bg-orange-500', card: 'border-l-[4px] border-l-orange-500', badge: 'bg-orange-100 text-orange-700', label: 'Emergency' },
  urgent:    { dot: 'bg-yellow-400', card: 'border-l-[4px] border-l-yellow-400', badge: 'bg-yellow-100 text-yellow-700', label: 'Urgent' },
  routine:   { dot: 'bg-green-500',  card: '',                                    badge: 'bg-green-100 text-green-700',   label: 'Routine' },
};

const STATUS_META = {
  'waiting':    { label: 'รอคิว',      badge: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-400' },
  'waiting-dr': { label: 'รอพบแพทย์',  badge: 'bg-orange-100 text-orange-700', dot: 'bg-orange-400' },
  'in-consult': { label: 'กำลังพบ',    badge: 'bg-[#e9f7f4] text-[#0f8f83]',   dot: 'bg-[#0f8f83]' },
  'completed':  { label: 'เสร็จแล้ว',  badge: 'bg-gray-100 text-gray-600',     dot: 'bg-gray-400' },
};

// ─── Mock Data ────────────────────────────────────────────────────────────────

const mockQueue = [
  { no: 1,  qno: 'A011', pet: 'Oreo',  species: 'dog',    breed: 'Dalmatian',        age: '3Y', weight: '22.0', owner: 'คุณสมชาย',  phone: '081-111-2222', line: 'somchai01',  service: 'Vaccination', status: 'completed',  time: '08:15', wait: null,       vet: 'Dr. Somchai',   urgency: 'routine', room: null,           chief: 'Annual Vaccination' },
  { no: 2,  qno: 'A012', pet: 'Simba', species: 'cat',    breed: 'Bengal',           age: '5Y', weight: '5.2',  owner: 'คุณณวรรณ',  phone: '081-234-5678', line: 'nattida_w',  service: 'OPD',         status: 'completed',  time: '08:45', wait: null,       vet: 'Dr. Nattha',    urgency: 'routine', room: null,           chief: 'Check up' },
  { no: 3,  qno: 'A013', pet: 'Bingo', species: 'dog',    breed: 'Shih Tzu',         age: '7Y', weight: '7.8',  owner: 'คุณปัณณดา', phone: '086-543-2100', line: 'pannada88', service: 'OPD',         status: 'completed',  time: '09:10', wait: null,       vet: 'Dr. Natthapon', urgency: 'routine', room: null,           chief: 'Skin problem' },
  { no: 4,  qno: 'A014', pet: 'Kiwi',  species: 'cat',    breed: 'British SH',       age: '4Y', weight: '4.5',  owner: 'คุณรัตนา',  phone: '082-111-9999', line: 'rattana99',  service: 'Dental',      status: 'completed',  time: '09:25', wait: null,       vet: 'Dr. Somchai',   urgency: 'routine', room: null,           chief: 'Otitis externa' },
  { no: 5,  qno: 'A015', pet: 'Lucky', species: 'dog',    breed: 'Golden Retriever', age: '5Y', weight: '28.5', owner: 'คุณณวรรณ',  phone: '098-123-4567', line: 'nattida_w',  service: 'OPD',         status: 'in-consult', time: '08:30', wait: '18 นาที',  vet: 'Dr. Nattha',    urgency: 'urgent',  room: 'ห้องตรวจ 1',   chief: 'Follow up CKD · กินอาหารน้อย · อาเจียน 1 ครั้ง' },
  { no: 6,  qno: 'A016', pet: 'Mochi', species: 'cat',    breed: 'Persian',          age: '3Y', weight: '4.1',  owner: 'คุณปัณณดา', phone: '086-543-2100', line: 'pannada88', service: 'Lab',         status: 'waiting-dr', time: '09:05', wait: '7 นาที',   vet: 'Dr. Nattha',    urgency: 'routine', room: null,           chief: 'Vomiting · น้ำหนักลด' },
  { no: 7,  qno: 'A017', pet: 'Bella', species: 'dog',    breed: 'French Bulldog',   age: '2Y', weight: '12.0', owner: 'คุณนิภา',   phone: '089-765-4321', line: 'nipha_v',    service: 'OPD',         status: 'in-consult', time: '09:35', wait: '25 นาที',  vet: 'Dr. Natthapon', urgency: 'routine', room: 'ห้องตรวจ 2',   chief: 'ท้องเสีย' },
  { no: 8,  qno: 'A018', pet: 'Daisy', species: 'cat',    breed: 'Persian',          age: '4Y', weight: '3.8',  owner: 'คุณรัตนา',  phone: '082-111-9999', line: 'rattana99',  service: 'Procedure',   status: 'in-consult', time: '09:50', wait: '10 นาที',  vet: 'Dr. Piyawan',   urgency: 'routine', room: 'ห้องผ่าตัด',    chief: 'Spay' },
  { no: 9,  qno: 'A019', pet: 'Max',   species: 'dog',    breed: 'Pomeranian',       age: '6Y', weight: '3.5',  owner: 'คุณธนา',    phone: '091-888-7777', line: 'thana_pk',   service: 'OPD',         status: 'waiting-dr', time: '10:20', wait: '25 นาที',  vet: 'Dr. Natthapon', urgency: 'routine', room: null,           chief: 'Annual check' },
  { no: 10, qno: 'A020', pet: 'CoCo',  species: 'dog',    breed: 'Beagle',           age: '4Y', weight: '11.2', owner: 'คุณสมศรี',  phone: '083-222-3333', line: 'somsri_ck',  service: 'Vaccination', status: 'waiting',    time: '10:40', wait: '45 นาที',  vet: '—',             urgency: 'routine', room: null,           chief: 'Vaccine booster' },
  { no: 11, qno: 'A021', pet: 'Luna',  species: 'cat',    breed: 'Maine Coon',       age: '1Y', weight: '5.9',  owner: 'คุณมาลี',   phone: '091-555-6666', line: 'mali_mc',    service: 'OPD',         status: 'waiting',    time: '11:10', wait: '1:05 ชม.', vet: '—',             urgency: 'urgent',  room: null,           chief: 'หายใจลำบาก' },
  { no: 12, qno: 'A022', pet: 'Kuro',  species: 'dog',    breed: 'Shiba Inu',        age: '3Y', weight: '10.1', owner: 'คุณวิชัย',  phone: '089-765-4321', line: 'wichai_sb',  service: 'OPD',         status: 'waiting',    time: '11:30', wait: '1:25 ชม.', vet: '—',             urgency: 'routine', room: null,           chief: 'ไม่สบาย กินน้อย' },
];

const historyByPet = {
  Lucky: [
    { date: '10 พ.ค. 2567', type: 'OPD',   detail: 'Follow up CKD',  vet: 'Dr. Natthapon' },
    { date: '01 พ.ค. 2567', type: 'Lab',   detail: 'CBC, Chemistry', vet: 'Dr. Natthapon' },
    { date: '15 เม.ย. 2567', type: 'OPD', detail: 'Anorexia',        vet: 'Dr. Piyawan' },
  ],
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function AnimalAvatar({ species, size = 38 }) {
  const { Icon, bg, ic } = SPECIES[species] || SPECIES.dog;
  return (
    <div className={`rounded-full ${bg} grid place-items-center shrink-0`} style={{ width: size, height: size }}>
      <Icon size={Math.round(size * 0.52)} className={ic} />
    </div>
  );
}

function ServiceChip({ service }) {
  const cfg = SERVICES[service];
  if (!cfg) return null;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-[850] ${cfg.cls}`}>
      <cfg.Icon size={10} strokeWidth={2.5} /> {cfg.label}
    </span>
  );
}

function KanbanCard({ q, isSelected, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white border rounded-2xl overflow-hidden cursor-pointer transition-all hover:shadow-md mb-2.5
        ${URGENCY[q.urgency]?.card || ''}
        ${isSelected ? 'border-[#0f8f83] ring-2 ring-[#0f8f83]/20 shadow-md' : 'border-[#e3edf3] hover:border-[#7ccdc2]'}`}
    >
      <div className="p-3">
        {/* Animal identity row */}
        <div className="flex items-start gap-2.5 mb-2.5">
          <AnimalAvatar species={q.species} size={40} />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-1">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-[850] text-[14px] text-[#102a43]">{q.pet}</span>
                  <span className="text-[10px] text-[#8faabb] bg-[#f0f5f8] px-1.5 py-px rounded-md">
                    ({SPECIES[q.species]?.label})
                  </span>
                </div>
                <p className="m-0 text-[11px] text-[#64788a]">{q.breed} · {q.age}</p>
                <p className="m-0 text-[11px] text-[#8faabb] truncate">{q.owner}</p>
              </div>
              <span className="text-[11px] font-[900] text-[#0f8f83] shrink-0">{q.qno}</span>
            </div>
          </div>
        </div>

        {/* Service item row */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <ServiceChip service={q.service} />
            {q.room && <span className="text-[10px] text-[#8faabb] bg-[#f0f5f8] px-1.5 py-px rounded-md">{q.room}</span>}
          </div>
          {q.wait && (
            <div className="flex items-center gap-1 shrink-0">
              <Timer size={10} className="text-orange-400" />
              <span className="text-[10px] font-[850] text-orange-500">{q.wait}</span>
            </div>
          )}
        </div>

        <p className="m-0 mt-1.5 text-[11px] text-[#a0b2c3]">{q.time}</p>

        {q.urgency !== 'routine' && (
          <span className={`inline-block mt-1.5 px-1.5 py-px rounded-md text-[10px] font-[850] ${URGENCY[q.urgency].badge}`}>
            {URGENCY[q.urgency].label}
          </span>
        )}
      </div>
    </div>
  );
}

function KanbanColumn({ title, count, dotCls, items, selected, onSelect, extra }) {
  return (
    <div className="bg-white rounded-2xl border border-[#e3edf3] shadow-sm flex flex-col overflow-hidden flex-1" style={{ minWidth: 230 }}>
      <div className="px-4 py-3 border-b border-[#e3edf3] shrink-0 flex items-center gap-2">
        <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${dotCls}`} />
        <span className="font-[900] text-[14px] text-[#102a43] flex-1">{title}</span>
        <span className="text-[11px] font-black text-[#8faabb] bg-[#f0f5f8] px-2 py-0.5 rounded-full">{count}</span>
      </div>
      <div className="flex-1 overflow-auto p-3">
        {items.length === 0
          ? <p className="text-center text-[12px] text-[#a0b2c3] mt-6">ไม่มีรายการ</p>
          : items.map(q => (
              <KanbanCard
                key={q.qno}
                q={q}
                isSelected={selected?.qno === q.qno}
                onClick={() => onSelect(selected?.qno === q.qno ? null : q)}
              />
            ))
        }
        {extra}
      </div>
    </div>
  );
}

function MasterRow({ q, isSelected, onClick }) {
  const sm = STATUS_META[q.status];
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-2 px-2.5 py-2 rounded-xl cursor-pointer transition-all mb-1
        ${isSelected ? 'bg-[#e9f7f4] border border-[#0f8f83]' : 'border border-transparent hover:bg-[#f6f9fb]'}`}
    >
      <span className={`w-5 h-5 rounded-full text-[10px] font-black grid place-items-center shrink-0
        ${q.status === 'completed' ? 'bg-gray-100 text-gray-400' : 'bg-[#e9f7f4] text-[#0f8f83]'}`}>
        {q.no}
      </span>
      <AnimalAvatar species={q.species} size={30} />
      <div className="flex-1 min-w-0">
        <p className="m-0 font-[800] text-[13px] text-[#102a43] truncate leading-tight">{q.pet}</p>
        <p className="m-0 text-[10px] text-[#8faabb] truncate">{q.breed}</p>
      </div>
      <div className="flex flex-col items-end gap-0.5 shrink-0">
        <span className={`inline-block px-1.5 py-px rounded-md text-[10px] font-[850] ${sm?.badge}`}>{sm?.label}</span>
        <span className="text-[10px] text-[#a0b2c3]">{q.time}</span>
        {q.wait && <span className="text-[10px] text-orange-500 font-[850]">{q.wait}</span>}
      </div>
    </div>
  );
}

function CompletedRow({ q }) {
  return (
    <div className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-[#f6f9fb] transition-colors mb-0.5">
      <AnimalAvatar species={q.species} size={26} />
      <div className="flex-1 min-w-0">
        <p className="m-0 text-[12px] font-[800] text-[#64788a] truncate">{q.pet}</p>
        <p className="m-0 text-[10px] text-[#a0b2c3] truncate">{SERVICES[q.service]?.label} · {q.vet}</p>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <CheckCircle2 size={12} className="text-green-500" />
        <span className="text-[10px] text-[#8faabb]">{q.time}</span>
      </div>
    </div>
  );
}

// Comprehensive detail panel
function DetailPanel({ q, onClose, onToast }) {
  const [tab, setTab] = useState('history');
  const history = historyByPet[q.pet] || [];
  const sm = STATUS_META[q.status];
  const typeColors = { OPD: 'bg-[#e9f7f4] text-[#0f8f83]', Lab: 'bg-purple-100 text-purple-700' };

  return (
    <div className="relative bg-white border-t-[3px] border-[#0f8f83] rounded-2xl shadow-lg overflow-hidden">
      <div className="flex flex-col lg:flex-row">

        {/* ── Left: Animal identity ── */}
        <div className="flex items-start gap-3 p-4 lg:border-r border-[#e3edf3] shrink-0 lg:w-[280px]">
          <AnimalAvatar species={q.species} size={56} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className="m-0 text-[18px] font-black text-[#102a43]">{q.pet}</h3>
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-[850] ${sm?.badge}`}>{sm?.label}</span>
              {q.wait && (
                <span className="flex items-center gap-1 text-orange-500 text-[11px] font-[850]">
                  <Timer size={11} /> {q.wait}
                </span>
              )}
            </div>
            <p className="m-0 text-[12px] text-[#64788a]">{q.breed} · {q.age} · {q.weight} kg</p>
            <div className="mt-1.5 space-y-0.5">
              <p className="m-0 text-[12px] font-[700] text-[#39576d]">{q.owner}</p>
              <p className="m-0 text-[11px] text-[#8faabb] flex items-center gap-1">
                <Phone size={10} /> {q.phone}
              </p>
              {q.line && <p className="m-0 text-[11px] text-[#8faabb]">LINE: {q.line}</p>}
            </div>
          </div>
        </div>

        {/* ── Center: Tabs + content ── */}
        <div className="flex-1 min-w-0 border-r border-[#e3edf3] flex flex-col">
          {/* Chief complaint */}
          <div className="px-4 pt-3 pb-2 border-b border-[#f0f5f8]">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="m-0 text-[11px] font-[800] text-[#8faabb] uppercase tracking-wide mb-1">อาการ/เหตุผล</p>
                <p className="m-0 text-[12px] text-[#102a43] font-[700]">{q.chief}</p>
              </div>
              <button onClick={() => onToast('เปิดฟอร์มแก้ไขข้อมูลสัตว์เลี้ยง')} className="flex items-center gap-1 text-[11px] text-[#0f8f83] font-bold bg-transparent border-0 cursor-pointer hover:underline shrink-0">
                <Pencil size={11} /> แก้ไข
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[#e3edf3] shrink-0 px-3">
            {[
              { key: 'history', label: 'ประวัติล่าสุด', Icon: Clock },
              { key: 'vital',   label: 'Vital ล่าสุด',  Icon: Activity },
              { key: 'lab',     label: 'Lab ล่าสุด',    Icon: FlaskConical },
              { key: 'files',   label: 'ไฟล์แนบ',       Icon: Paperclip },
            ].map(({ key, label, Icon }) => (
              <button key={key} onClick={() => setTab(key)}
                className={`flex items-center gap-1.5 px-3 py-2.5 text-[12px] font-[850] border-0 border-b-2 cursor-pointer transition-colors bg-transparent -mb-px
                  ${tab === key ? 'border-[#0f8f83] text-[#0f8f83]' : 'border-transparent text-[#64788a] hover:text-[#102a43]'}`}>
                <Icon size={12} /> {label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-auto px-4 py-2">
            {tab === 'history' && (
              history.length > 0 ? (
                <table className="w-full text-sm">
                  <tbody>
                    {history.map((h, i) => (
                      <tr key={i} className="border-b border-[#f0f5f8] last:border-0">
                        <td className="py-2 text-[11px] text-[#64788a] w-28">{h.date}</td>
                        <td className="py-2 w-14">
                          <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-[850] ${typeColors[h.type] || 'bg-gray-100 text-gray-600'}`}>{h.type}</span>
                        </td>
                        <td className="py-2 text-[12px] text-[#102a43] font-[700]">{h.detail}</td>
                        <td className="py-2 text-[11px] text-[#8faabb] text-right">{h.vet}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-[12px] text-[#a0b2c3] mt-4">ไม่พบประวัติ</p>
              )
            )}
            {tab === 'vital' && <p className="text-[12px] text-[#a0b2c3] mt-4">ยังไม่ได้บันทึก Vital Signs</p>}
            {tab === 'lab'   && <p className="text-[12px] text-[#a0b2c3] mt-4">ยังไม่มีผลแล็บ</p>}
            {tab === 'files' && <p className="text-[12px] text-[#a0b2c3] mt-4">ยังไม่มีไฟล์แนบ</p>}

            {tab === 'history' && history.length > 0 && (
              <button onClick={() => onToast('กำลังโหลดประวัติการรักษาทั้งหมด...')} className="mt-1 text-[11px] text-[#0f8f83] font-bold bg-transparent border-0 cursor-pointer hover:underline">
                ดูประวัติทั้งหมด <ChevronRight size={11} className="inline" />
              </button>
            )}
          </div>
        </div>

        {/* ── Right: Queue management ── */}
        <div className="px-4 py-4 shrink-0 lg:w-[190px]">
          <p className="m-0 text-[11px] font-[800] text-[#8faabb] uppercase tracking-wide mb-3">จัดการคิว</p>
          <div className="flex flex-col gap-2">
            <button onClick={() => onToast(`เรียกคิว ${q.qno} (${q.pet}) แล้ว`)} className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#0f8f83] to-[#0b6d87] text-white rounded-xl px-3 py-2.5 text-[12px] font-[850] border-0 cursor-pointer shadow-sm">
              <Bell size={13} /> Call Next
            </button>
            <button onClick={() => onToast(`ย้าย ${q.pet} เข้าพบสัตวแพทย์แล้ว`)} className="flex items-center justify-center gap-2 bg-blue-500 text-white rounded-xl px-3 py-2.5 text-[12px] font-[850] border-0 cursor-pointer">
              <ArrowRight size={13} /> ย้ายไปพบ
            </button>
            <button onClick={() => onToast('เปิดหน้าต่างเลือกสัตวแพทย์...')} className="flex items-center justify-center gap-2 bg-orange-500 text-white rounded-xl px-3 py-2.5 text-[12px] font-[850] border-0 cursor-pointer">
              <RefreshCw size={13} /> เปลี่ยนสัตวแพทย์
            </button>
            <button onClick={() => { onToast(`ยกเลิกคิว ${q.qno} แล้ว`); onClose(); }} className="flex items-center justify-center gap-2 bg-red-50 text-red-600 rounded-xl px-3 py-2.5 text-[12px] font-[850] border border-red-200 cursor-pointer">
              <X size={13} /> ยกเลิกคิว
            </button>
            <button onClick={() => onToast('บันทึกหมายเหตุเรียบร้อยแล้ว')} className="flex items-center justify-center gap-2 bg-white text-[#35546a] rounded-xl px-3 py-2.5 text-[12px] font-[850] border border-[#e3edf3] cursor-pointer hover:bg-gray-50">
              <FileText size={13} /> บันทึกหมายเหตุ
            </button>
            <Link href="/emr" className="flex items-center justify-center gap-2 bg-white text-[#0f8f83] rounded-xl px-3 py-2.5 text-[12px] font-[850] border border-[#0f8f83] no-underline hover:bg-[#e9f7f4]">
              Open EMR <ChevronRight size={12} />
            </Link>
          </div>
        </div>
      </div>

      <button onClick={onClose} className="absolute top-3 right-3 bg-transparent border-0 text-[#9ab0bc] hover:text-[#64788a] cursor-pointer p-1">
        <X size={14} />
      </button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function QueuePage() {
  const [selected, setSelected]     = useState(null);
  const [view, setView]             = useState('kanban');
  const [search, setSearch]         = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterStatus, setFilter]   = useState('all');
  const [toast, setToast]           = useState('');

  const byStatus = (s) => mockQueue.filter(q => q.status === s);
  const waiting   = byStatus('waiting');
  const waitingDr = byStatus('waiting-dr');
  const inConsult = byStatus('in-consult');
  const completed = byStatus('completed');
  const active    = mockQueue.filter(q => q.status !== 'completed');

  const masterFiltered = mockQueue.filter(q => {
    const matchSearch = !search || q.pet.toLowerCase().includes(search.toLowerCase()) || q.owner.includes(search);
    const matchStatus = filterStatus === 'all' || q.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleSelect = (q) => setSelected(prev => prev?.qno === q.qno ? null : q);

  const kpis = [
    { label: 'รอทั้งหมด',       value: active.length,       sub: 'รอเฉลี่ย 28 นาที' },
    { label: 'รอพบสัตวแพทย์',  value: waitingDr.length,    sub: 'เฉลี่ย 18 นาที', warn: true },
    { label: 'กำลังพบ',         value: inConsult.length,    sub: `OPD ${inConsult.filter(q=>q.service==='OPD').length} · Proc ${inConsult.filter(q=>q.service==='Procedure').length}` },
    { label: 'เสร็จแล้ววันนี้', value: completed.length,    sub: '+12% จากเมื่อวาน' },
    { label: 'Walk-in วันนี้',   value: 3,                   sub: 'ไม่มีนัดหมาย' },
  ];

  const filterLabels = { all: 'ทั้งหมด', waiting: 'รอคิว', 'waiting-dr': 'รอพบแพทย์', 'in-consult': 'กำลังพบ', completed: 'เสร็จแล้ว' };

  return (
    <div className="h-full flex flex-col bg-[#f0f5f8]">

      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#102a43] text-white text-sm px-6 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-white/10">
          <span className="font-bold">{toast}</span>
          <button onClick={() => setToast('')} className="bg-transparent border-0 text-white/50 hover:text-white cursor-pointer ml-2"><X size={14} /></button>
        </div>
      )}

      {/* ── KPI bar ── */}
      <div className="bg-white border-b border-[#e3edf3] px-5 py-3 shrink-0">
        <div className="flex items-center gap-3 flex-wrap">

          {/* KPI chips */}
          {kpis.map(({ label, value, sub, warn }, i) => (
            <div key={label} className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl border ${i === 0 ? 'border-[#0f8f83]/20 bg-[#f0fdf9]' : warn ? 'border-orange-200 bg-orange-50' : 'border-[#e3edf3] bg-white'} min-w-0`}>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[26px] font-black text-[#102a43] leading-none">{value}</span>
                </div>
                <p className="m-0 text-[11px] text-[#64788a] font-[700]">{label}</p>
                <p className={`m-0 text-[10px] ${warn ? 'text-orange-500' : 'text-[#8faabb]'}`}>{sub}</p>
              </div>
            </div>
          ))}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={() => setToast('รีเฟรชข้อมูลคิวแล้ว')} className="flex items-center gap-1.5 border border-[#e3edf3] rounded-xl px-3 py-2.5 text-[12px] font-[850] bg-white text-[#35546a] hover:bg-gray-50">
              <RefreshCw size={13} />
            </button>
            <div className="flex border border-[#e3edf3] rounded-xl overflow-hidden">
              {[{ key: 'kanban', Icon: LayoutGrid }, { key: 'list', Icon: List }].map(({ key, Icon }, i) => (
                <button key={key} onClick={() => setView(key)}
                  className={`flex items-center gap-1.5 px-3 py-2.5 text-[12px] font-[850] border-0 cursor-pointer transition-colors
                    ${i > 0 ? 'border-l border-[#e3edf3]' : ''}
                    ${view === key ? 'bg-[#0f8f83] text-white' : 'bg-white text-[#64788a] hover:bg-gray-50'}`}>
                  <Icon size={13} />
                </button>
              ))}
            </div>
            <button onClick={() => setToast('เรียกคิวถัดไปแล้ว')} className="flex items-center gap-1.5 border border-[#0f8f83] rounded-xl px-4 py-2.5 text-[12px] font-[850] bg-white text-[#0f8f83] hover:bg-[#e9f7f4]">
              <Bell size={13} /> Call Next
            </button>
            <Link href="/register" className="flex items-center gap-1.5 border-0 rounded-xl px-4 py-2.5 text-[12px] font-[850] bg-gradient-to-r from-[#07364a] to-[#04293a] text-white shadow-sm no-underline">
              <Plus size={13} /> Walk-in
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="flex-1 min-h-0 flex flex-col overflow-hidden">

        {view === 'kanban' ? (
          <div className="flex-1 min-h-0 overflow-x-auto overflow-y-hidden p-4">
            <div className="flex gap-3 h-full" style={{ minWidth: 1100 }}>

              {/* Master list column */}
              <div className="bg-white rounded-2xl border border-[#e3edf3] shadow-sm flex flex-col overflow-hidden" style={{ width: 240, minWidth: 240 }}>
                <div className="px-3 py-3 border-b border-[#e3edf3] shrink-0 flex items-center justify-between">
                  <span className="font-[900] text-[14px] text-[#102a43]">คิววันนี้</span>
                  <span className="text-[11px] font-black text-[#0f8f83] bg-[#e9f7f4] px-2 py-0.5 rounded-full">{mockQueue.length}</span>
                </div>

                {/* Search + Filter */}
                <div className="px-2.5 py-2 border-b border-[#f0f5f8] flex gap-1.5 shrink-0">
                  <div className="flex items-center gap-1.5 flex-1 bg-[#f6f9fb] rounded-xl px-2.5 py-1.5">
                    <Search size={12} className="text-[#8faabb] shrink-0" />
                    <input
                      type="text"
                      placeholder="ค้นหา..."
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      className="flex-1 border-0 outline-none bg-transparent text-[12px] text-[#102a43] placeholder-[#a0b2c3] min-w-0"
                    />
                  </div>
                  <div className="relative">
                    <button onClick={() => setFilterOpen(!filterOpen)}
                      className="flex items-center gap-1 bg-[#f6f9fb] rounded-xl px-2.5 py-1.5 text-[11px] font-[850] text-[#64788a] border-0 cursor-pointer whitespace-nowrap">
                      {filterLabels[filterStatus]} <ChevronDown size={11} />
                    </button>
                    {filterOpen && (
                      <div className="absolute top-full right-0 mt-1 bg-white border border-[#e3edf3] rounded-xl shadow-lg py-1 z-10 w-36">
                        {Object.entries(filterLabels).map(([key, label]) => (
                          <button key={key} onClick={() => { setFilter(key); setFilterOpen(false); }}
                            className={`w-full text-left px-3 py-2 text-[12px] font-[700] border-0 cursor-pointer transition-colors
                              ${filterStatus === key ? 'bg-[#e9f7f4] text-[#0f8f83]' : 'bg-transparent text-[#64788a] hover:bg-gray-50'}`}>
                            {label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex-1 overflow-auto px-1.5 py-2">
                  {masterFiltered.map(q => (
                    <MasterRow key={q.qno} q={q} isSelected={selected?.qno === q.qno}
                      onClick={() => handleSelect(q)} />
                  ))}
                  {masterFiltered.length === 0 && (
                    <p className="text-center text-[12px] text-[#a0b2c3] mt-4">ไม่พบรายการ</p>
                  )}
                  <button onClick={() => setToast('กำลังแสดงรายการทั้งหมด...')} className="w-full mt-2 text-center text-[11px] text-[#0f8f83] font-bold bg-transparent border-0 cursor-pointer hover:underline py-1">
                    ดูทั้งหมด <ChevronRight size={11} className="inline" />
                  </button>
                </div>
              </div>

              {/* Waiting */}
              <KanbanColumn title="รอคิว" count={waiting.length} dotCls="bg-yellow-400"
                items={waiting} selected={selected} onSelect={handleSelect}
                extra={
                  <button onClick={() => setToast('กำลังเปิดฟอร์มเพิ่มผู้ป่วยใหม่เข้าคิว...')} className="w-full mt-2 flex items-center justify-center gap-1.5 text-[12px] font-[850] text-[#0f8f83] bg-[#e9f7f4] hover:bg-[#d2f0eb] rounded-xl py-2 border-0 cursor-pointer transition-colors">
                    <Plus size={13} /> เพิ่มเข้าคิว
                  </button>
                }
              />

              {/* Waiting for vet */}
              <KanbanColumn title="รอพบสัตวแพทย์" count={waitingDr.length} dotCls="bg-orange-400"
                items={waitingDr} selected={selected} onSelect={handleSelect} />

              {/* In consultation */}
              <KanbanColumn title="กำลังพบ" count={inConsult.length} dotCls="bg-[#0f8f83]"
                items={inConsult} selected={selected} onSelect={handleSelect} />

              {/* Completed */}
              <div className="bg-white rounded-2xl border border-[#e3edf3] shadow-sm flex flex-col overflow-hidden" style={{ width: 200, minWidth: 200 }}>
                <div className="px-3 py-3 border-b border-[#e3edf3] shrink-0 flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-400" />
                  <span className="font-[900] text-[14px] text-[#102a43] flex-1">เสร็จแล้ว</span>
                  <span className="text-[11px] font-black text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{completed.length} ราย</span>
                </div>
                <div className="flex-1 overflow-auto px-2 py-2">
                  {completed.map(q => <CompletedRow key={q.qno} q={q} />)}
                  <button onClick={() => setToast('กำลังโหลดรายการเสร็จแล้วทั้งหมด...')} className="w-full mt-2 text-center text-[11px] text-[#0f8f83] font-bold bg-transparent border-0 cursor-pointer hover:underline py-1">
                    ดูทั้งหมด <ChevronRight size={11} className="inline" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        ) : (
          /* ── List view ── */
          <div className="flex-1 min-h-0 overflow-auto p-4">
            <div className="bg-white border border-[#e3edf3] rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="text-left text-[#64788a] text-[11px] font-[800] uppercase bg-[#fbfdfe] border-b border-[#e3edf3]">
                    <th className="px-4 py-3">คิว</th>
                    <th className="px-4 py-3">สัตว์เลี้ยง</th>
                    <th className="px-4 py-3">บริการ</th>
                    <th className="px-4 py-3">ความเร่งด่วน</th>
                    <th className="px-4 py-3">สถานะ</th>
                    <th className="hidden md:table-cell px-4 py-3">สัตวแพทย์</th>
                    <th className="hidden md:table-cell px-4 py-3">รอ</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {mockQueue.map((q) => (
                    <tr key={q.qno} onClick={() => handleSelect(q)}
                      className={`border-b border-[#e3edf3] last:border-0 cursor-pointer transition-colors
                        ${selected?.qno === q.qno ? 'bg-[#e9f7f4]' : q.status === 'completed' ? 'opacity-50 hover:opacity-70' : 'hover:bg-[#fbfdfe]'}`}>
                      <td className="px-4 py-3 font-black text-[14px] text-[#0f8f83]">{q.qno}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <AnimalAvatar species={q.species} size={32} />
                          <div>
                            <p className="m-0 font-bold text-[#102a43]">
                              {q.pet} <span className="text-[11px] text-[#64788a] font-normal">({SPECIES[q.species]?.label})</span>
                            </p>
                            <p className="m-0 text-[11px] text-[#64788a]">{q.breed} · {q.owner}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3"><ServiceChip service={q.service} /></td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <div className={`w-2 h-2 rounded-full shrink-0 ${URGENCY[q.urgency].dot}`} />
                          <span className="text-[12px] text-[#64788a]">{URGENCY[q.urgency].label}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-lg text-[11px] font-[850] ${STATUS_META[q.status]?.badge}`}>
                          {STATUS_META[q.status]?.label}
                        </span>
                      </td>
                      <td className="hidden md:table-cell px-4 py-3 text-[12px] text-[#64788a]">{q.vet}</td>
                      <td className="hidden md:table-cell px-4 py-3 text-[12px]">
                        {q.wait ? <span className="text-orange-500 font-[850]">{q.wait}</span> : <span className="text-[#c0d0dc]">—</span>}
                      </td>
                      <td className="px-4 py-3">
                        <Link href="/emr" className="flex items-center gap-0.5 text-[#0f8f83] text-[11px] font-bold no-underline hover:underline" onClick={e => e.stopPropagation()}>
                          Open <ChevronRight size={12} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Detail panel ── */}
        {selected && (
          <div className="px-4 pb-4 shrink-0">
            <DetailPanel q={selected} onClose={() => setSelected(null)} onToast={setToast} />
          </div>
        )}
      </div>
    </div>
  );
}
