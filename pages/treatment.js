// src/pages/treatment.js
import React, { useState } from 'react';
import Link from 'next/link';
import { Syringe, Scissors, Droplets, ClipboardList, CheckCircle2, Clock, Plus, ChevronRight, PawPrint, X } from 'lucide-react';

const treatmentItems = [
  { id: 1, type: 'injection', name: 'Maropitant 16mg IV',       status: 'done',    time: '09:30', nurse: 'พยาบาล ก',  note: 'ฉีดเข้าหลอดเลือดดำแล้ว ไม่มีอาการแทรกซ้อน' },
  { id: 2, type: 'fluid',     name: 'LRS 500 mL IV (90 mL/hr)', status: 'ongoing', time: '09:45', nurse: 'พยาบาล ข',  note: 'ยังคงให้สารน้ำอยู่ คาดว่าเสร็จ 11:00' },
  { id: 3, type: 'procedure', name: 'Blood Draw CBC + Chem',    status: 'done',    time: '09:20', nurse: 'พยาบาล ก',  note: 'เจาะเลือดส่ง Lab แล้ว กำลังรอผล' },
  { id: 4, type: 'injection', name: 'Vitamin B Complex SC',     status: 'pending', time: '—',     nurse: '—',          note: 'รอผลแล็บก่อนจึงค่อยให้' },
];

const procedureItems = [
  { id: 1, type: 'wound',   name: 'Wound Cleaning & Dressing', status: 'done',    room: 'Treatment Room 1', vet: 'Dr. Somchai' },
  { id: 2, type: 'dental',  name: 'Dental Scaling',             status: 'pending', room: 'Dental Suite',     vet: 'Dr. Witthaya' },
];

const typeIcon = {
  injection: Syringe,
  fluid:     Droplets,
  procedure: Scissors,
};

const statusConfig = {
  done:    { label: 'Done',    badge: 'bg-green-100 text-green-700',   icon: CheckCircle2, iconColor: 'text-green-500' },
  ongoing: { label: 'Ongoing', badge: 'bg-[#e9f7f4] text-[#0f8f83]',  icon: Clock,        iconColor: 'text-[#0f8f83]' },
  pending: { label: 'Pending', badge: 'bg-yellow-100 text-yellow-700', icon: Clock,        iconColor: 'text-yellow-500' },
};

export default function TreatmentPage() {
  const [activeSection, setActiveSection] = useState('treatment');
  const [toast, setToast] = useState('');

  return (
    <div className="h-full flex flex-col p-4 md:p-6 bg-[#f6f9fb] overflow-auto">
      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#102a43] text-white text-sm px-6 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-white/10">
          <span className="font-bold">{toast}</span>
          <button onClick={() => setToast('')} className="bg-transparent border-0 text-white/50 hover:text-white cursor-pointer ml-2"><X size={14} /></button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 shrink-0">
        <div>
          <h2 className="m-0 text-[28px] font-bold text-[#102a43]">Treatment & Procedure — การรักษา/หัตถการ</h2>
          <p className="m-0 mt-1 text-[#64788a] text-sm">บันทึกการรักษาและหัตถการประจำ Visit</p>
        </div>
        <div className="flex gap-2.5 shrink-0">
          <Link href="/emr" className="border border-[#e3edf3] rounded-xl px-4 py-2.5 font-[850] text-sm bg-white text-[#35546a] hover:bg-gray-50 no-underline">
            ← EMR
          </Link>
          <Link href="/discharge" className="border-0 rounded-xl px-4 py-2.5 font-[850] text-sm bg-gradient-to-r from-[#0f8f83] to-[#0b6d87] text-white shadow-sm no-underline flex items-center gap-2">
            Discharge <ChevronRight size={14} />
          </Link>
        </div>
      </div>

      {/* Patient Banner */}
      <div className="bg-white border border-[#e3edf3] rounded-2xl p-4 mb-5 flex items-center gap-4 shadow-sm shrink-0">
        <div className="w-12 h-12 rounded-2xl bg-[#fff0d9] grid place-items-center"><PawPrint size={24} className="text-[#c37000]" /></div>
        <div className="flex-1">
          <h3 className="m-0 text-[17px] font-bold text-[#102a43]">Lucky <span className="text-[#3b82f6] text-[11px] font-bold border border-[#3b82f6] px-1 py-0.5 rounded">M</span> <span className="text-[#64788a] font-normal text-[13px]">Golden Retriever · 5Y · 32.5 kg</span></h3>
          <p className="m-0 text-[13px] text-[#64788a]">คุณณวรรณ สุขใจ · MRN P240001 · Queue A012</p>
        </div>
        <div className="flex gap-2">
          <span className="bg-[#e9f7f4] text-[#0f8f83] px-3 py-1.5 rounded-full font-[850] text-[12px]">OPD Visit</span>
          <span className="bg-[#fef3c7] text-yellow-700 px-3 py-1.5 rounded-full font-[850] text-[12px]">Urgent</span>
        </div>
      </div>

      {/* Section Toggle */}
      <div className="flex gap-1.5 mb-5 shrink-0">
        {[
          { key: 'treatment', label: 'Treatment Orders', icon: Syringe },
          { key: 'procedure', label: 'Procedure / Hatthakar', icon: Scissors },
          { key: 'notes',     label: 'Progress Notes', icon: ClipboardList },
        ].map(({ key, label, icon: Icon }) => (
          <button key={key} onClick={() => setActiveSection(key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-[850] text-[13px] border-0 cursor-pointer transition-colors ${activeSection === key ? 'bg-[#e9f7f4] text-[#0f8f83]' : 'bg-white border border-[#e3edf3] text-[#64788a] hover:bg-gray-50'}`}>
            <Icon size={14} /> {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_350px] gap-5 flex-1 min-h-0">

        {/* Main Content */}
        <div className="bg-white border border-[#e3edf3] rounded-2xl shadow-sm flex flex-col overflow-hidden">

          {/* Treatment Orders Tab */}
          {activeSection === 'treatment' && (
            <>
              <div className="flex items-center justify-between p-[16px_20px] border-b border-[#e3edf3] shrink-0">
                <h4 className="m-0 text-[16px] font-bold text-[#102a43] flex items-center gap-2"><Syringe size={16} className="text-[#0f8f83]" /> Treatment Orders</h4>
                <button onClick={() => setToast('เปิดฟอร์มเพิ่มคำสั่งการรักษา...')} className="flex items-center gap-1.5 border-0 rounded-xl px-3 py-2 font-[850] text-[12px] bg-[#e9f7f4] text-[#0f8f83] cursor-pointer hover:bg-[#d4f0eb]">
                  <Plus size={13} /> Add Order
                </button>
              </div>
              <div className="flex-1 overflow-auto p-4 space-y-3">
                {treatmentItems.map(({ id, type, name, status, time, nurse, note }) => {
                  const Icon = typeIcon[type];
                  const sc = statusConfig[status];
                  const StatusIcon = sc.icon;
                  return (
                    <div key={id} className={`border rounded-2xl p-4 ${status === 'done' ? 'border-[#e3edf3] bg-[#fbfdfe] opacity-70' : 'border-[#c8ead8] bg-white'}`}>
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-xl grid place-items-center shrink-0 ${status === 'ongoing' ? 'bg-[#e9f7f4]' : 'bg-[#f2f6f8]'}`}>
                          <Icon size={18} className={status === 'ongoing' ? 'text-[#0f8f83]' : 'text-[#64788a]'} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="m-0 font-bold text-[14px] text-[#102a43]">{name}</p>
                            <span className={`px-2 py-0.5 rounded-full text-[11px] font-[850] ${sc.badge}`}>{sc.label}</span>
                          </div>
                          <p className="m-0 mt-1 text-[12px] text-[#64788a]">{time !== '—' ? `เวลา ${time}` : 'รอดำเนินการ'} · {nurse}</p>
                          {note && <p className="m-0 mt-1.5 text-[12px] text-[#39576d] bg-[#f6f9fb] rounded-xl px-3 py-2">{note}</p>}
                        </div>
                        <StatusIcon size={18} className={`shrink-0 ${sc.iconColor}`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Procedure Tab */}
          {activeSection === 'procedure' && (
            <>
              <div className="flex items-center justify-between p-[16px_20px] border-b border-[#e3edf3] shrink-0">
                <h4 className="m-0 text-[16px] font-bold text-[#102a43] flex items-center gap-2"><Scissors size={16} className="text-[#0f8f83]" /> Procedure Records</h4>
                <button onClick={() => setToast('เปิดฟอร์มเพิ่มหัตถการ...')} className="flex items-center gap-1.5 border-0 rounded-xl px-3 py-2 font-[850] text-[12px] bg-[#e9f7f4] text-[#0f8f83] cursor-pointer hover:bg-[#d4f0eb]">
                  <Plus size={13} /> Add Procedure
                </button>
              </div>
              <div className="flex-1 overflow-auto p-4 space-y-3">
                {procedureItems.map(({ id, name, status, room, vet }) => {
                  const sc = statusConfig[status];
                  return (
                    <div key={id} className={`border rounded-2xl p-4 ${status === 'done' ? 'border-[#e3edf3] bg-[#fbfdfe]' : 'border-[#c8ead8] bg-white'}`}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#f2f6f8] grid place-items-center shrink-0">
                          <Scissors size={18} className="text-[#64788a]" />
                        </div>
                        <div className="flex-1">
                          <p className="m-0 font-bold text-[14px] text-[#102a43]">{name}</p>
                          <p className="m-0 mt-1 text-[12px] text-[#64788a]">{room} · {vet}</p>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-[850] ${sc.badge}`}>{sc.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Progress Notes Tab */}
          {activeSection === 'notes' && (
            <>
              <div className="flex items-center justify-between p-[16px_20px] border-b border-[#e3edf3] shrink-0">
                <h4 className="m-0 text-[16px] font-bold text-[#102a43] flex items-center gap-2"><ClipboardList size={16} className="text-[#0f8f83]" /> Progress Notes</h4>
                <button onClick={() => setToast('เปิดฟอร์มเพิ่มบันทึก...')} className="flex items-center gap-1.5 border-0 rounded-xl px-3 py-2 font-[850] text-[12px] bg-[#e9f7f4] text-[#0f8f83] cursor-pointer hover:bg-[#d4f0eb]">
                  <Plus size={13} /> Add Note
                </button>
              </div>
              <div className="flex-1 overflow-auto p-4 space-y-3">
                {[
                  { time: '09:45', author: 'พยาบาล ข', role: 'Nurse', note: 'ผู้ป่วยให้ความร่วมมือดี เส้นเลือดสำหรับ IV แทงได้ที่ขาหน้าซ้าย ไม่มีเลือดซึม' },
                  { time: '09:30', author: 'Dr. Nattha', role: 'Veterinarian', note: 'ผู้ป่วยยังคงซึม ปลุกได้ดีขึ้นหลังให้ Maropitant เสร็จแล้ว รอผลแล็บก่อนตัดสินใจ Admit' },
                  { time: '09:20', author: 'พยาบาล ก', role: 'Nurse', note: 'เจาะเลือดส่ง Lab เรียบร้อยแล้ว ส่งเองไปห้องแล็บ' },
                ].map((n, i) => (
                  <div key={i} className="bg-[#fbfdfe] border border-[#e3edf3] rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-full bg-[#e9f7f4] grid place-items-center text-[12px] font-black text-[#0f8f83]">{n.author[0]}</div>
                      <div>
                        <p className="m-0 text-[13px] font-bold text-[#102a43]">{n.author}</p>
                        <p className="m-0 text-[11px] text-[#64788a]">{n.role} · {n.time}</p>
                      </div>
                    </div>
                    <p className="m-0 text-[13px] text-[#39576d] leading-relaxed">{n.note}</p>
                  </div>
                ))}
                <textarea
                  placeholder="เพิ่มบันทึกใหม่..."
                  className="w-full border border-[#e3edf3] rounded-2xl px-4 py-3 text-sm h-24 bg-white resize-none focus:outline-none focus:border-[#0f8f83]"
                />
              </div>
            </>
          )}
        </div>

        {/* Right: Quick Stats & Referral */}
        <div className="flex flex-col gap-4">

          {/* Progress Summary */}
          <div className="bg-white border border-[#e3edf3] rounded-2xl shadow-sm p-5">
            <h4 className="m-0 mb-4 text-[15px] font-bold text-[#102a43]">สถานะการรักษา</h4>
            <div className="space-y-2.5">
              {[
                { label: 'Treatment Orders',  done: 2, total: 4 },
                { label: 'Procedures',        done: 1, total: 2 },
                { label: 'Lab Results',       done: 0, total: 1, pending: true },
              ].map(({ label, done, total, pending }) => (
                <div key={label}>
                  <div className="flex justify-between text-[12px] mb-1">
                    <span className="font-[800] text-[#39576d]">{label}</span>
                    <span className={`font-bold ${pending ? 'text-yellow-600' : 'text-[#0f8f83]'}`}>{done}/{total}</span>
                  </div>
                  <div className="h-2 bg-[#e9f0f5] rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${pending && done === 0 ? 'bg-yellow-400' : 'bg-[#0f8f83]'}`} style={{ width: `${total ? (done / total) * 100 : 0}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Referral Card */}
          <div className="bg-white border border-[#e3edf3] rounded-2xl shadow-sm p-5">
            <h4 className="m-0 mb-3 text-[15px] font-bold text-[#102a43]">Referral / ส่งต่อ</h4>
            <div className="space-y-2">
              {[
                { label: 'IPD Admission', desc: 'รับเข้า Admit หากอาการไม่ดีขึ้น', href: '/ipd' },
                { label: 'Specialist Referral', desc: 'ส่งต่อผู้เชี่ยวชาญภายนอก', href: '#' },
              ].map(({ label, desc, href }) => (
                <Link key={label} href={href}
                  className="flex items-center justify-between border border-[#e3edf3] rounded-xl p-3 hover:border-[#0f8f83] hover:bg-[#f6fbfd] transition-colors no-underline">
                  <div>
                    <p className="m-0 text-[13px] font-bold text-[#102a43]">{label}</p>
                    <p className="m-0 text-[11px] text-[#64788a]">{desc}</p>
                  </div>
                  <ChevronRight size={15} className="text-[#64788a]" />
                </Link>
              ))}
            </div>
          </div>

          {/* Outcome */}
          <div className="bg-white border border-[#e3edf3] rounded-2xl shadow-sm p-5">
            <h4 className="m-0 mb-3 text-[15px] font-bold text-[#102a43]">Outcome / ผลการรักษา</h4>
            <div className="space-y-2">
              {['กลับบ้าน (Discharge)', 'รับไว้รักษาต่อ (Admit/IPD)', 'ส่งต่อ (Referral)'].map(opt => (
                <label key={opt} className="flex items-center gap-2.5 cursor-pointer text-[13px] text-[#39576d] font-[700]">
                  <input type="radio" name="outcome" className="accent-[#0f8f83]" />
                  {opt}
                </label>
              ))}
            </div>
            <button onClick={() => setToast('ยืนยันและดำเนินการต่อแล้ว')} className="w-full mt-4 border-0 rounded-xl py-3 font-[850] text-sm bg-gradient-to-r from-[#0f8f83] to-[#0b6d87] text-white shadow-sm cursor-pointer hover:opacity-90">
              Confirm & Proceed →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
