// src/pages/triage.js
import { useState } from 'react';
import Link from 'next/link';
import {
  Search, AlertTriangle, Activity, Thermometer, Heart, Wind, Scale,
  ArrowRight, PawPrint, X, Clock,
} from 'lucide-react';

const speciesColor = { dog: 'text-[#c37000]', cat: 'text-[#5c6bc0]', rabbit: 'text-[#2e7d32]' };

const urgencyLevels = [
  { key: 'critical',  label: 'Critical',  color: 'bg-red-500',    text: 'text-red-700',    bg: 'bg-red-50',    border: 'border-red-300',    desc: 'ต้องได้รับการรักษาทันที' },
  { key: 'emergency', label: 'Emergency', color: 'bg-orange-500', text: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-300', desc: 'รอได้ไม่เกิน 15 นาที' },
  { key: 'urgent',    label: 'Urgent',    color: 'bg-yellow-400', text: 'text-yellow-700', bg: 'bg-yellow-50', border: 'border-yellow-300', desc: 'รอได้ไม่เกิน 30 นาที' },
  { key: 'routine',   label: 'Routine',   color: 'bg-green-500',  text: 'text-green-700',  bg: 'bg-green-50',  border: 'border-green-300',  desc: 'รอตามลำดับคิวปกติ' },
];

const recentTriages = [
  { no: 'A015', pet: 'Mochi', species: 'cat',    owner: 'คุณปัณณดา', urgency: 'urgent',    time: '09:42', temp: '39.8', pr: '180', rr: '32', bw: '4.2'  },
  { no: 'A016', pet: 'Lucky', species: 'dog',    owner: 'คุณสมชาย',  urgency: 'routine',   time: '09:51', temp: '38.5', pr: '90',  rr: '22', bw: '28.5' },
  { no: 'A017', pet: 'Tiger', species: 'dog',    owner: 'คุณวิชัย',  urgency: 'critical',  time: '10:05', temp: '41.2', pr: '200', rr: '48', bw: '22.0' },
  { no: 'A018', pet: 'Coco',  species: 'rabbit', owner: 'คุณมาลี',   urgency: 'emergency', time: '10:18', temp: '40.1', pr: '250', rr: '60', bw: '1.8'  },
];

const urgencyBadge = {
  critical:  'bg-red-100 text-red-700',
  emergency: 'bg-orange-100 text-orange-700',
  urgent:    'bg-yellow-100 text-yellow-700',
  routine:   'bg-green-100 text-green-700',
};

// ─── Modal ────────────────────────────────────────────────────────────────────

function Modal({ title, onClose, onSave, saveLabel = 'ยืนยัน', maxWidth = 'max-w-md', children }) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onMouseDown={onClose}>
      <div className={`bg-white rounded-2xl shadow-2xl w-full ${maxWidth} flex flex-col max-h-[90vh]`} onMouseDown={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#f0f5f8]">
          <span className="text-[15px] font-black text-[#102a43]">{title}</span>
          <button onClick={onClose} className="text-[#9ab0bc] hover:text-[#64788a] bg-transparent border-0 cursor-pointer p-0"><X size={18} /></button>
        </div>
        <div className="overflow-y-auto flex-1 px-6 py-5 flex flex-col gap-4">{children}</div>
        {onSave && (
          <div className="px-6 py-4 border-t border-[#f0f5f8] flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 text-[13px] font-semibold text-[#64788a] border border-[#e3edf3] rounded-lg hover:bg-[#f8fafc] cursor-pointer bg-white">ยกเลิก</button>
            <button onClick={onSave} className="px-4 py-2 text-[13px] font-semibold text-white bg-[#0f8f83] rounded-lg hover:bg-[#0a7268] cursor-pointer">{saveLabel}</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TriagePage() {
  const [selected, setSelected]   = useState('routine');
  const [vitals, setVitals]       = useState({ temp: '', pr: '', rr: '', bw: '', bcs: '', pain: '', crt: '', mm: '' });
  const [toast, setToast]         = useState('');
  const [modal, setModal]         = useState(null);
  const [modalData, setModalData] = useState(null);

  const handleVital = (key, val) => setVitals(prev => ({ ...prev, [key]: val }));
  const closeModal  = () => { setModal(null); setModalData(null); };
  const done        = (msg) => { closeModal(); setToast(msg); };

  const urgencyInfo = urgencyLevels.find(u => u.key === selected);

  return (
    <div className="h-full flex flex-col bg-[#f6f9fb] overflow-hidden">

      {/* Toast */}
      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#102a43] text-white text-sm px-6 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-white/10">
          <span className="font-bold">{toast}</span>
          <button onClick={() => setToast('')} className="bg-transparent border-0 text-white/50 hover:text-white cursor-pointer ml-2"><X size={14} /></button>
        </div>
      )}

      {/* ── Modals ── */}
      {modal === 'saveDraft' && (
        <Modal title="บันทึกแบบร่าง" onClose={closeModal} onSave={() => done('บันทึกแบบร่างเรียบร้อยแล้ว')} saveLabel="บันทึก">
          <div className="flex items-center gap-3 p-4 bg-[#f8fafc] rounded-xl border border-[#e3edf3]">
            <PawPrint size={20} className="text-[#c37000] shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-black text-[#102a43]">Lucky · Golden Retriever</div>
              <div className="text-[12px] text-[#64788a]">คุณณวรรณ สุขใจ · Queue A012</div>
            </div>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0 ${urgencyBadge[selected]}`}>{urgencyInfo?.label}</span>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-bold text-[#39576d]">หมายเหตุเพิ่มเติม</label>
            <textarea className="border border-[#e3edf3] rounded-xl px-3 py-2.5 text-[13px] resize-none h-20 outline-none focus:border-[#0f8f83] transition-colors" placeholder="บันทึกข้อสังเกตหรือสิ่งที่ต้องติดตามเพิ่มเติม..." />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-bold text-[#39576d]">แจ้งเตือนไปยัง</label>
            <select className="border border-[#e3edf3] rounded-xl px-3 py-2.5 text-[13px] outline-none focus:border-[#0f8f83] bg-white">
              {['ไม่แจ้งเตือน', 'Dr. Natthapon', 'Dr. Siriporn', 'Dr. Wanchai', 'ทีมพยาบาล'].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
        </Modal>
      )}

      {modal === 'confirmQueue' && (
        <Modal title="ยืนยันเพิ่มเข้าคิว" onClose={closeModal} onSave={() => done('เพิ่มเข้าคิวและแจ้งเตือนแพทย์เรียบร้อยแล้ว')} saveLabel="ยืนยัน & เพิ่มเข้าคิว" maxWidth="max-w-lg">
          <div className="flex items-center gap-3 p-4 bg-[#f8fafc] rounded-xl border border-[#e3edf3]">
            <PawPrint size={22} className="text-[#c37000] shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-black text-[#102a43]">Lucky · Golden Retriever · 5Y</div>
              <div className="text-[12px] text-[#64788a]">คุณณวรรณ สุขใจ · Queue A012</div>
            </div>
            <div className={`px-3 py-1.5 rounded-full text-[12px] font-black border-2 ${urgencyInfo?.border} ${urgencyBadge[selected]}`}>
              {urgencyInfo?.label}
            </div>
          </div>

          <div>
            <div className="text-[11px] font-bold text-[#9ab0bc] uppercase tracking-wider mb-2">สัญญาณชีพที่บันทึก</div>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: 'Temp', value: vitals.temp || '—', unit: '°C'  },
                { label: 'PR',   value: vitals.pr   || '—', unit: 'bpm' },
                { label: 'RR',   value: vitals.rr   || '—', unit: 'rpm' },
                { label: 'BW',   value: vitals.bw   || '—', unit: 'kg'  },
              ].map(v => (
                <div key={v.label} className="bg-white rounded-xl p-2.5 text-center border border-[#e3edf3]">
                  <div className="text-[10px] text-[#9ab0bc] font-bold">{v.label}</div>
                  <div className="text-[17px] font-black text-[#102a43]">{v.value}</div>
                  <div className="text-[9px] text-[#9ab0bc]">{v.unit}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-bold text-[#39576d]">มอบหมายให้แพทย์</label>
              <select className="border border-[#e3edf3] rounded-xl px-3 py-2.5 text-[13px] outline-none focus:border-[#0f8f83] bg-white">
                {['Auto-assign', 'Dr. Natthapon', 'Dr. Siriporn', 'Dr. Wanchai', 'Dr. Priya'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-bold text-[#39576d]">ห้องตรวจ</label>
              <select className="border border-[#e3edf3] rounded-xl px-3 py-2.5 text-[13px] outline-none focus:border-[#0f8f83] bg-white">
                {['Auto-assign', 'Room 1', 'Room 2', 'Room 3', 'Room 4 (Isolation)'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {[
              { label: 'แจ้งเตือนแพทย์ผ่าน LINE', checked: true },
              { label: 'พิมพ์บัตรคิวให้ผู้ป่วย',   checked: true },
              { label: 'เปิด EMR ทันทีหลังยืนยัน',  checked: false },
            ].map(({ label, checked }) => (
              <label key={label} className="flex items-center gap-2 cursor-pointer text-[12px] font-semibold text-[#39576d]">
                <input type="checkbox" defaultChecked={checked} className="w-4 h-4 accent-[#0f8f83]" /> {label}
              </label>
            ))}
          </div>
        </Modal>
      )}

      {modal === 'viewTriage' && modalData && (
        <Modal title={`Triage — ${modalData.pet} (${modalData.no})`} onClose={closeModal} onSave={null} maxWidth="max-w-sm">
          <div className="flex items-center gap-3 p-3.5 bg-[#f8fafc] rounded-xl border border-[#e3edf3]">
            <PawPrint size={20} className={`${speciesColor[modalData.species] || 'text-[#c37000]'} shrink-0`} />
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-black text-[#102a43]">{modalData.pet}</div>
              <div className="text-[12px] text-[#64788a]">{modalData.owner} · {modalData.no}</div>
            </div>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0 ${urgencyBadge[modalData.urgency]}`}>
              {urgencyLevels.find(u => u.key === modalData.urgency)?.label}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[
              ['Temperature', `${modalData.temp} °C`],
              ['Pulse Rate',  `${modalData.pr} bpm`],
              ['Resp. Rate',  `${modalData.rr} rpm`],
              ['Body Weight', `${modalData.bw} kg`],
            ].map(([l, v]) => (
              <div key={l} className="bg-[#f8fafc] rounded-xl p-2.5 border border-[#e3edf3]">
                <div className="text-[10px] text-[#9ab0bc] font-bold">{l}</div>
                <div className="text-[15px] font-black text-[#102a43]">{v}</div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-[#9ab0bc]">
            <Clock size={11} /> บันทึกเมื่อ {modalData.time} น.
          </div>

          <div className="flex flex-col gap-2 pt-1 border-t border-[#f0f5f8]">
            {[
              { label: 'แก้ไขข้อมูล Triage',          fn: () => done('เปิดโหมดแก้ไข Triage แล้ว') },
              { label: 'ส่งต่อให้แพทย์ทันที',         fn: () => done(`ส่งต่อ ${modalData.pet} ให้แพทย์แล้ว`) },
              { label: 'ทำเครื่องหมายเสร็จสิ้น',      fn: () => done(`${modalData.pet} — บันทึกเสร็จสิ้นแล้ว`) },
            ].map(({ label, fn }) => (
              <button key={label} onClick={fn} className="w-full text-left px-4 py-2.5 rounded-xl border border-[#e3edf3] text-[13px] font-semibold text-[#102a43] hover:bg-[#e6f7f3] hover:border-[#0f8f83] hover:text-[#0f8f83] cursor-pointer bg-white transition-colors">
                {label}
              </button>
            ))}
          </div>
        </Modal>
      )}

      {/* ── Header ── */}
      <div className="shrink-0 px-4 md:px-6 pt-4 md:pt-6 pb-0">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="m-0 text-[22px] font-black text-[#102a43]">Triage — คัดกรองผู้ป่วย</h2>
            <p className="m-0 mt-0.5 text-[#64788a] text-[13px]">บันทึกสัญญาณชีพและประเมินระดับความเร่งด่วนก่อนเข้าคิว</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Link href="/register" className="border border-[#e3edf3] rounded-xl px-4 py-2.5 font-bold text-[13px] bg-white text-[#35546a] hover:bg-[#f8fafc] no-underline">
              ← Register
            </Link>
            <Link href="/queue" className="rounded-xl px-4 py-2.5 font-bold text-[13px] bg-[#0f8f83] text-white hover:bg-[#0a7268] no-underline shadow-sm">
              Queue Board →
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white border border-[#e3edf3] rounded-2xl px-4 py-3 text-[#9ab0bc] shadow-sm text-[13px] mb-4">
          <Search size={14} className="shrink-0" /> Search patient / microchip / queue number...
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div className="flex-1 min-h-0 px-4 md:px-6 pb-4 md:pb-6 grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-5">

        {/* Left: Triage Form */}
        <div className="bg-white border border-[#e3edf3] rounded-2xl shadow-sm flex flex-col overflow-hidden">

          {/* Patient strip */}
          <div className="px-5 py-4 border-b border-[#e3edf3] bg-[#f6fbff] flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 rounded-2xl bg-[#fff0d9] grid place-items-center shrink-0">
              <PawPrint size={24} className="text-[#c37000]" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="m-0 text-[16px] font-black text-[#102a43]">
                Lucky
                <span className="text-[#3b82f6] text-[11px] font-bold border border-[#3b82f6] px-1 py-0.5 rounded ml-1.5">M</span>
                <span className="text-[#64788a] font-normal text-[13px] ml-1.5">· Golden Retriever · 5Y</span>
              </h3>
              <p className="m-0 text-[12px] text-[#64788a]">คุณณวรรณ สุขใจ · MRN P240001 · Queue A012</p>
            </div>
            <span className="bg-[#e9f7f4] text-[#0f8f83] px-3 py-1.5 rounded-full font-bold text-[11px] shrink-0">Walk-in</span>
          </div>

          {/* Form body */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">

            {/* Vitals */}
            <div>
              <h4 className="m-0 mb-4 text-[15px] font-black text-[#102a43] flex items-center gap-2">
                <Activity size={16} className="text-[#0f8f83]" /> Vital Signs
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { key: 'temp', label: 'Temperature', unit: '°C',  icon: Thermometer, placeholder: '38.5', normal: '37.5–39.2' },
                  { key: 'pr',   label: 'Pulse Rate',  unit: 'bpm', icon: Heart,       placeholder: '100',  normal: '60–160'    },
                  { key: 'rr',   label: 'Resp. Rate',  unit: 'rpm', icon: Wind,        placeholder: '24',   normal: '15–30'     },
                  { key: 'bw',   label: 'Body Weight', unit: 'kg',  icon: Scale,       placeholder: '32.5', normal: ''          },
                ].map(({ key, label, unit, icon: Icon, placeholder, normal }) => (
                  <div key={key} className="border border-[#e3edf3] rounded-2xl p-3 bg-[#fbfdfe]">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Icon size={12} className="text-[#0f8f83]" />
                      <label className="text-[10px] font-black text-[#64788a] uppercase tracking-wide">{label}</label>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <input
                        type="number"
                        placeholder={placeholder}
                        value={vitals[key]}
                        onChange={e => handleVital(key, e.target.value)}
                        className="w-full border-0 outline-none text-[22px] font-black text-[#102a43] bg-transparent p-0"
                      />
                      <span className="text-[11px] text-[#64788a] shrink-0">{unit}</span>
                    </div>
                    {normal && <p className="m-0 mt-1 text-[10px] text-[#9ab0bc]">ปกติ: {normal}</p>}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                <div className="border border-[#e3edf3] rounded-2xl p-3 bg-[#fbfdfe]">
                  <label className="text-[10px] font-black text-[#64788a] uppercase tracking-wide block mb-2">BCS (1–9)</label>
                  <select value={vitals.bcs} onChange={e => handleVital('bcs', e.target.value)} className="w-full border border-[#e3edf3] rounded-xl px-3 py-2 text-[13px] bg-white outline-none">
                    {[...Array(9)].map((_, i) => <option key={i+1}>{i+1}</option>)}
                  </select>
                </div>
                <div className="border border-[#e3edf3] rounded-2xl p-3 bg-[#fbfdfe]">
                  <label className="text-[10px] font-black text-[#64788a] uppercase tracking-wide block mb-2">Pain Score (0–10)</label>
                  <input type="range" min="0" max="10" value={vitals.pain || 0} onChange={e => handleVital('pain', e.target.value)} className="w-full accent-[#0f8f83]" />
                  <p className="m-0 text-center text-[18px] font-black text-[#0f8f83]">{vitals.pain || 0}</p>
                </div>
                <div className="border border-[#e3edf3] rounded-2xl p-3 bg-[#fbfdfe]">
                  <label className="text-[10px] font-black text-[#64788a] uppercase tracking-wide block mb-2">CRT</label>
                  <select value={vitals.crt} onChange={e => handleVital('crt', e.target.value)} className="w-full border border-[#e3edf3] rounded-xl px-3 py-2 text-[13px] bg-white outline-none">
                    <option value="">เลือก</option>
                    <option>&lt; 2 วินาที (ปกติ)</option>
                    <option>2–3 วินาที</option>
                    <option>&gt; 3 วินาที (ผิดปกติ)</option>
                  </select>
                </div>
                <div className="border border-[#e3edf3] rounded-2xl p-3 bg-[#fbfdfe]">
                  <label className="text-[10px] font-black text-[#64788a] uppercase tracking-wide block mb-2">Mucous Membrane</label>
                  <select value={vitals.mm} onChange={e => handleVital('mm', e.target.value)} className="w-full border border-[#e3edf3] rounded-xl px-3 py-2 text-[13px] bg-white outline-none">
                    <option value="">เลือก</option>
                    <option>ชมพู (ปกติ)</option>
                    <option>ซีดขาว</option>
                    <option>ฟ้า/ม่วง</option>
                    <option>เหลือง/Icteric</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Urgency */}
            <div>
              <h4 className="m-0 mb-4 text-[15px] font-black text-[#102a43] flex items-center gap-2">
                <AlertTriangle size={16} className="text-[#0f8f83]" /> ประเมินระดับความเร่งด่วน
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {urgencyLevels.map(({ key, label, color, text, bg, border, desc }) => (
                  <button
                    key={key}
                    onClick={() => setSelected(key)}
                    className={`border-2 rounded-2xl p-4 text-center cursor-pointer transition-all ${
                      selected === key
                        ? `${border} ${bg} shadow-sm`
                        : 'border-[#e3edf3] bg-white hover:border-[#c4d6e0]'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full ${color} mx-auto mb-2`} />
                    <p className={`m-0 font-black text-[14px] ${selected === key ? text : 'text-[#102a43]'}`}>{label}</p>
                    <p className="m-0 mt-1 text-[11px] text-[#64788a] leading-tight">{desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Chief Complaint */}
            <div>
              <label className="text-[13px] font-black text-[#39576d] block mb-2">Chief Complaint / Reason for Visit</label>
              <textarea
                className="w-full border border-[#e3edf3] rounded-2xl px-4 py-3 text-[13px] h-24 bg-white resize-none focus:outline-none focus:border-[#0f8f83] transition-colors"
                placeholder="ระบุอาการหลักที่นำสัตว์เลี้ยงมาพบสัตวแพทย์วันนี้..."
              />
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex justify-between items-center px-5 py-4 border-t border-[#e3edf3] bg-[#fbfdfe] shrink-0">
            <p className="m-0 text-[13px] text-[#64788a]">
              Urgency: <b className={urgencyInfo?.text}>{urgencyInfo?.label}</b>
            </p>
            <div className="flex gap-2.5">
              <button
                onClick={() => setModal('saveDraft')}
                className="border border-[#e3edf3] rounded-xl px-4 py-2.5 font-bold text-[13px] bg-white text-[#35546a] hover:bg-[#f8fafc] cursor-pointer"
              >
                Save Draft
              </button>
              <button
                onClick={() => setModal('confirmQueue')}
                className="border-0 rounded-xl px-5 py-2.5 font-bold text-[13px] bg-[#0f8f83] text-white hover:bg-[#0a7268] shadow-sm flex items-center gap-2 cursor-pointer"
              >
                Confirm & Add to Queue <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Recent Triage List */}
        <div className="bg-white border border-[#e3edf3] rounded-2xl shadow-sm flex flex-col overflow-hidden">
          <div className="px-5 py-4 border-b border-[#e3edf3] shrink-0 flex items-center justify-between">
            <h3 className="m-0 text-[16px] font-black text-[#102a43]">Triage วันนี้</h3>
            <span className="bg-[#e8f7f1] text-[#0f8d62] px-2.5 py-1 rounded-full text-[11px] font-bold">● Live</span>
          </div>

          <div className="grid grid-cols-4 border-b border-[#e3edf3] shrink-0">
            {urgencyLevels.map(({ key, label, text, bg, color }) => (
              <div key={key} className={`py-3 text-center border-r border-[#e3edf3] last:border-r-0 ${bg}`}>
                <div className={`w-2.5 h-2.5 rounded-full ${color} mx-auto mb-1`} />
                <p className={`m-0 text-[20px] font-black ${text}`}>{recentTriages.filter(r => r.urgency === key).length}</p>
                <p className="m-0 text-[10px] text-[#64788a]">{label}</p>
              </div>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            {recentTriages.map((t) => (
              <button
                key={t.no}
                onClick={() => { setModalData(t); setModal('viewTriage'); }}
                className="w-full border border-[#e3edf3] rounded-2xl p-3.5 mb-2.5 flex items-center gap-3 hover:border-[#7ccdc2] hover:bg-[#f6fbff] cursor-pointer transition-all bg-white text-left"
              >
                <PawPrint size={18} className={speciesColor[t.species] || 'text-[#c37000]'} />
                <div className="flex-1 min-w-0">
                  <p className="m-0 font-bold text-[14px] text-[#102a43] truncate">{t.pet}</p>
                  <p className="m-0 text-[12px] text-[#64788a] truncate">{t.owner} · {t.no}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-bold ${urgencyBadge[t.urgency]}`}>
                    {urgencyLevels.find(u => u.key === t.urgency)?.label}
                  </span>
                  <p className="m-0 mt-1 text-[11px] text-[#9ab0bc]">{t.time}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
