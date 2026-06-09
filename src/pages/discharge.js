// src/pages/discharge.js
import React, { useState } from 'react';
import Link from 'next/link';
import { Printer, CheckSquare, Square, FileText, ClipboardList, Receipt, CalendarPlus, MessageSquare, Mail, Smartphone, CheckCircle2, ChevronRight, PawPrint, Phone, Check } from 'lucide-react';

const docItems = [
  { id: 'medical',      icon: ClipboardList, label: 'Medical Report',       desc: 'บันทึกการวินิจฉัยและรักษา', checked: true  },
  { id: 'prescription', icon: FileText,      label: 'Prescription / ใบยา', desc: 'รายการยากลับบ้านทั้งหมด',    checked: true  },
  { id: 'invoice',      icon: Receipt,       label: 'Invoice / Receipt',    desc: 'ใบแจ้งหนี้และใบเสร็จรับเงิน', checked: false },
];

const visitSummary = [
  { label: 'Visit Date',       value: '09/06/2569 · 09:15–11:30' },
  { label: 'Attending Vet',    value: 'สพ.ญ. นัทธสร วงษ์ดี' },
  { label: 'Chief Complaint',  value: 'Vomiting & Anorexia' },
  { label: 'Final Diagnosis',  value: 'Acute Gastroenteritis + CKD Stage 2 (known)' },
  { label: 'Treatment Done',   value: 'Maropitant IV · LRS IV · CBC+Chem Lab' },
  { label: 'Discharge Meds',   value: 'Cerenia 16mg · Semintra 4mg/mL · Nefroguard' },
];

export default function DischargePage() {
  const [docs, setDocs] = useState({ medical: true, prescription: true, invoice: false });
  const [followupDate, setFollowupDate] = useState('');
  const [notifyMethod, setNotifyMethod] = useState(['line']);
  const [status, setStatus] = useState('pending');

  const toggleDoc = (id) => setDocs(prev => ({ ...prev, [id]: !prev[id] }));
  const toggleNotify = (method) => setNotifyMethod(prev =>
    prev.includes(method) ? prev.filter(m => m !== method) : [...prev, method]
  );

  return (
    <div className="h-full flex flex-col p-4 md:p-6 bg-[#f6f9fb] overflow-auto">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 shrink-0">
        <div>
          <h2 className="m-0 text-[28px] font-bold text-[#102a43]">Discharge — ออกจากโรงพยาบาล</h2>
          <p className="m-0 mt-1 text-[#64788a] text-sm">เตรียมเอกสาร นัดติดตาม และปล่อย Visit</p>
        </div>
        <div className="flex gap-2.5 shrink-0">
          <Link href="/treatment" className="border border-[#e3edf3] rounded-xl px-4 py-2.5 font-[850] text-sm bg-white text-[#35546a] hover:bg-gray-50 no-underline">
            ← Treatment
          </Link>
          <Link href="/followup" className="border-0 rounded-xl px-4 py-2.5 font-[850] text-sm bg-gradient-to-r from-[#0f8f83] to-[#0b6d87] text-white shadow-sm no-underline flex items-center gap-2">
            Follow-up <ChevronRight size={14} />
          </Link>
        </div>
      </div>

      {/* Patient Banner */}
      <div className="bg-white border border-[#e3edf3] rounded-2xl p-4 mb-5 flex items-center gap-4 shadow-sm shrink-0">
        <div className="w-12 h-12 rounded-2xl bg-[#fff0d9] grid place-items-center"><PawPrint size={24} className="text-[#c37000]" /></div>
        <div className="flex-1 min-w-0">
          <h3 className="m-0 text-[17px] font-bold text-[#102a43]">Lucky <span className="text-[#3b82f6] text-[11px] font-bold border border-[#3b82f6] px-1 py-0.5 rounded">M</span> <span className="text-[#64788a] font-normal text-[13px]">Golden Retriever · 5Y · 32.5 kg</span></h3>
          <p className="m-0 text-[13px] text-[#64788a] truncate flex items-center gap-1.5">คุณณวรรณ สุขใจ · <Phone size={11} className="inline shrink-0" /> 081-234-5678 · MRN P240001 · Queue A012</p>
        </div>
        <span className={`shrink-0 px-3 py-1.5 rounded-full font-[850] text-[12px] ${status === 'completed' ? 'bg-[#dcfce7] text-green-700' : 'bg-[#fef9c3] text-yellow-700'}`}>
          {status === 'completed' ? <><Check size={12} className="inline mr-1" />Discharged</> : 'In Progress'}
        </span>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-5 flex-1 min-h-0">

        {/* Left: Main Discharge Form */}
        <div className="flex flex-col gap-5 overflow-auto">

          {/* Visit Summary */}
          <div className="bg-white border border-[#e3edf3] rounded-2xl shadow-sm overflow-hidden shrink-0">
            <div className="p-[14px_18px] border-b border-[#e3edf3] flex items-center gap-2">
              <ClipboardList size={16} className="text-[#0f8f83]" />
              <h4 className="m-0 text-[15px] font-bold text-[#102a43]">Visit Summary</h4>
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {visitSummary.map(({ label, value }) => (
                <div key={label} className="bg-[#fbfdfe] border border-[#e3edf3] rounded-xl p-3">
                  <p className="m-0 text-[11px] font-[800] text-[#64788a] uppercase tracking-wide mb-1">{label}</p>
                  <p className="m-0 text-[13px] font-bold text-[#102a43]">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Documents Checklist */}
          <div className="bg-white border border-[#e3edf3] rounded-2xl shadow-sm overflow-hidden shrink-0">
            <div className="p-[14px_18px] border-b border-[#e3edf3] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Printer size={16} className="text-[#0f8f83]" />
                <h4 className="m-0 text-[15px] font-bold text-[#102a43]">เอกสารสำหรับเจ้าของ</h4>
              </div>
              <button className="flex items-center gap-1.5 border-0 rounded-xl px-3 py-2 font-[850] text-[12px] bg-[#e9f7f4] text-[#0f8f83] cursor-pointer hover:bg-[#d4f0eb]">
                <Printer size={13} /> Print All
              </button>
            </div>
            <div className="p-4 space-y-3">
              {docItems.map(({ id, icon: Icon, label, desc, checked: defaultChecked }) => (
                <div key={id}
                  onClick={() => toggleDoc(id)}
                  className={`flex items-center gap-4 border rounded-2xl p-4 cursor-pointer transition-all ${docs[id] ? 'border-[#0f8f83] bg-[#f0fbf8]' : 'border-[#e3edf3] bg-white hover:border-gray-300'}`}>
                  <div className={`w-10 h-10 rounded-xl grid place-items-center shrink-0 ${docs[id] ? 'bg-[#e9f7f4]' : 'bg-[#f2f6f8]'}`}>
                    <Icon size={18} className={docs[id] ? 'text-[#0f8f83]' : 'text-[#64788a]'} />
                  </div>
                  <div className="flex-1">
                    <p className="m-0 font-bold text-[14px] text-[#102a43]">{label}</p>
                    <p className="m-0 mt-0.5 text-[12px] text-[#64788a]">{desc}</p>
                  </div>
                  {docs[id]
                    ? <CheckSquare size={20} className="text-[#0f8f83] shrink-0" />
                    : <Square size={20} className="text-[#c8d9e2] shrink-0" />
                  }
                </div>
              ))}
            </div>
          </div>

          {/* Client Instructions */}
          <div className="bg-white border border-[#e3edf3] rounded-2xl shadow-sm overflow-hidden shrink-0">
            <div className="p-[14px_18px] border-b border-[#e3edf3]">
              <h4 className="m-0 text-[15px] font-bold text-[#102a43]">คำแนะนำหลังกลับบ้าน</h4>
            </div>
            <div className="p-4">
              <textarea
                className="w-full border border-[#e3edf3] rounded-2xl px-4 py-3 text-sm h-28 bg-[#fbfdfe] resize-none focus:outline-none focus:border-[#0f8f83]"
                defaultValue="1. งดอาหาร 12 ชั่วโมงหลังถึงบ้าน ให้น้ำสะอาดได้ปกติ&#10;2. กินยา Cerenia 1 เม็ด/วัน ก่อนอาหาร 1 ชั่วโมง ติดต่อกัน 4 วัน&#10;3. หากอาเจียนซ้ำ หรือมีอาการซึมมากขึ้น ให้นำกลับมาพบแพทย์ทันที"
              />
            </div>
          </div>
        </div>

        {/* Right: Follow-up Scheduling + Notifications */}
        <div className="flex flex-col gap-4">

          {/* Follow-up Scheduling */}
          <div className="bg-white border border-[#e3edf3] rounded-2xl shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <CalendarPlus size={16} className="text-[#0f8f83]" />
              <h4 className="m-0 text-[15px] font-bold text-[#102a43]">นัดติดตามผล (Follow-up)</h4>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-[12px] font-[800] text-[#39576d] block mb-1.5">วันที่นัด</label>
                <input type="date" value={followupDate} onChange={e => setFollowupDate(e.target.value)}
                  className="w-full border border-[#e3edf3] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#0f8f83]" />
              </div>
              <div>
                <label className="text-[12px] font-[800] text-[#39576d] block mb-1.5">เหตุผลในการนัด</label>
                <select className="w-full border border-[#e3edf3] rounded-xl px-3 py-2.5 text-sm">
                  <option>Recheck Lab Results</option>
                  <option>Post-treatment Follow-up</option>
                  <option>Medication Adjustment</option>
                  <option>Vaccine Due</option>
                  <option>Annual Checkup</option>
                </select>
              </div>
              <div>
                <label className="text-[12px] font-[800] text-[#39576d] block mb-1.5">แพทย์ที่นัด</label>
                <select className="w-full border border-[#e3edf3] rounded-xl px-3 py-2.5 text-sm">
                  <option>สพ.ญ. นัทธสร วงษ์ดี</option>
                  <option>สพ.ญ. วิทยา สมใจ</option>
                  <option>Any Available Doctor</option>
                </select>
              </div>
              <button className="w-full border-0 rounded-xl py-2.5 font-[850] text-sm bg-[#e9f7f4] text-[#0f8f83] cursor-pointer hover:bg-[#d4f0eb]">
                <CalendarPlus size={14} className="inline mr-1.5" /> Save Appointment
              </button>
            </div>
          </div>

          {/* Notification */}
          <div className="bg-white border border-[#e3edf3] rounded-2xl shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare size={16} className="text-[#0f8f83]" />
              <h4 className="m-0 text-[15px] font-bold text-[#102a43]">ส่งข้อมูลให้เจ้าของ</h4>
            </div>
            <div className="space-y-2">
              {[
                { key: 'line',  label: 'LINE Notify',   Icon: MessageSquare },
                { key: 'sms',   label: 'SMS',           Icon: Smartphone },
                { key: 'email', label: 'Email',         Icon: Mail },
              ].map(({ key, label, Icon }) => (
                <label key={key} onClick={() => toggleNotify(key)}
                  className={`flex items-center justify-between border rounded-xl p-3 cursor-pointer transition-all ${notifyMethod.includes(key) ? 'border-[#0f8f83] bg-[#f0fbf8]' : 'border-[#e3edf3] hover:border-gray-300'}`}>
                  <div className="flex items-center gap-2.5">
                    <Icon size={15} className={notifyMethod.includes(key) ? 'text-[#0f8f83]' : 'text-[#64788a]'} />
                    <span className="text-[13px] font-bold text-[#102a43]">{label}</span>
                  </div>
                  {notifyMethod.includes(key)
                    ? <CheckSquare size={17} className="text-[#0f8f83]" />
                    : <Square size={17} className="text-[#c8d9e2]" />
                  }
                </label>
              ))}
              <button className="w-full border-0 rounded-xl py-2.5 font-[850] text-sm bg-[#e9f7f4] text-[#0f8f83] cursor-pointer hover:bg-[#d4f0eb] mt-1">
                Send Now
              </button>
            </div>
          </div>

          {/* Complete Discharge */}
          <button
            onClick={() => setStatus('completed')}
            className="w-full border-0 rounded-2xl py-4 font-[900] text-[15px] bg-gradient-to-r from-[#0f8f83] to-[#0b6d87] text-white shadow-md cursor-pointer hover:opacity-90 flex items-center justify-center gap-2">
            <CheckCircle2 size={18} /> Complete Discharge
          </button>

          {status === 'completed' && (
            <div className="bg-[#dcfce7] border border-green-300 rounded-2xl p-4 text-center animate-fadeIn">
              <CheckCircle2 size={28} className="text-green-600 mx-auto mb-2" />
              <p className="m-0 font-bold text-green-800">Visit Completed!</p>
              <p className="m-0 text-[12px] text-green-700 mt-1">Visit ปิดแล้ว · สถานะ: Discharged</p>
              <Link href="/dashboard" className="inline-block mt-3 text-[12px] text-green-700 font-bold underline no-underline hover:underline">
                กลับ Dashboard →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
