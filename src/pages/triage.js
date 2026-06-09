// src/pages/triage.js
import React, { useState } from 'react';
import Link from 'next/link';
import { Search, AlertTriangle, Activity, Thermometer, Heart, Wind, Scale, ArrowRight, PawPrint } from 'lucide-react';

const speciesColor = { dog: 'text-[#c37000]', cat: 'text-[#5c6bc0]', rabbit: 'text-[#2e7d32]' };

const urgencyLevels = [
  { key: 'critical',  label: 'Critical',  color: 'bg-red-500',    text: 'text-red-700',    bg: 'bg-red-50',    border: 'border-red-300',    desc: 'ต้องได้รับการรักษาทันที' },
  { key: 'emergency', label: 'Emergency', color: 'bg-orange-500', text: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-300', desc: 'รอได้ไม่เกิน 15 นาที' },
  { key: 'urgent',    label: 'Urgent',    color: 'bg-yellow-400', text: 'text-yellow-700', bg: 'bg-yellow-50', border: 'border-yellow-300', desc: 'รอได้ไม่เกิน 30 นาที' },
  { key: 'routine',   label: 'Routine',   color: 'bg-green-500',  text: 'text-green-700',  bg: 'bg-green-50',  border: 'border-green-300',  desc: 'รอตามลำดับคิวปกติ' },
];

const recentTriages = [
  { no: 'A015', pet: 'Mochi', species: 'cat',    owner: 'คุณปัณณดา', urgency: 'urgent',    time: '09:42' },
  { no: 'A016', pet: 'Lucky', species: 'dog',    owner: 'คุณสมชาย',   urgency: 'routine',   time: '09:51' },
  { no: 'A017', pet: 'Tiger', species: 'dog',    owner: 'คุณวิชัย',   urgency: 'critical',  time: '10:05' },
  { no: 'A018', pet: 'Coco',  species: 'rabbit', owner: 'คุณมาลี',   urgency: 'emergency', time: '10:18' },
];

const urgencyBadge = {
  critical:  'bg-red-100 text-red-700',
  emergency: 'bg-orange-100 text-orange-700',
  urgent:    'bg-yellow-100 text-yellow-700',
  routine:   'bg-green-100 text-green-700',
};

export default function TriagePage() {
  const [selected, setSelected] = useState('routine');
  const [vitals, setVitals] = useState({ temp: '', pr: '', rr: '', bw: '', bcs: '', pain: '', crt: '', mm: '' });

  const handleVital = (key, val) => setVitals(prev => ({ ...prev, [key]: val }));

  return (
    <div className="h-full flex flex-col p-4 md:p-6 bg-[#f6f9fb] overflow-auto">

      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-center mb-4 shrink-0">
        <div>
          <h2 className="m-0 text-[28px] font-bold text-[#102a43]">Triage — คัดกรองผู้ป่วย</h2>
          <p className="m-0 mt-1 text-[#64788a] text-sm">บันทึกสัญญาณชีพและประเมินระดับความเร่งด่วนก่อนเข้าคิว</p>
        </div>
        <div className="flex gap-2.5">
          <Link href="/register" className="border border-[#e3edf3] rounded-xl px-[15px] py-[10px] font-[850] text-sm bg-white text-[#35546a] hover:bg-gray-50 no-underline">
            ← Register
          </Link>
          <Link href="/queue" className="border-0 rounded-xl px-[15px] py-[10px] font-[850] text-sm bg-gradient-to-r from-[#0f8f83] to-[#0b6d87] text-white shadow-md hover:opacity-90 no-underline">
            Queue Board →
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2 bg-white border border-[#e3edf3] rounded-2xl p-[12px_16px] text-[#7a8fa0] shadow-sm text-sm mb-5 shrink-0">
        <Search size={15} /> Search patient / microchip / queue number...
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-5 flex-1 min-h-0">

        {/* Left: Triage Form */}
        <div className="bg-white border border-[#e3edf3] rounded-2xl shadow-sm flex flex-col overflow-hidden">

          {/* Patient Info Strip */}
          <div className="p-[16px_20px] border-b border-[#e3edf3] bg-[#f6fbff] flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 rounded-2xl bg-[#fff0d9] grid place-items-center"><PawPrint size={24} className="text-[#c37000]" /></div>
            <div className="flex-1">
              <h3 className="m-0 text-[18px] font-bold text-[#102a43]">Lucky <span className="text-[#3b82f6] text-[12px] font-bold border border-[#3b82f6] px-1 py-0.5 rounded ml-0.5">M</span> <span className="text-[#64788a] font-normal text-[14px]">· Golden Retriever · 5Y</span></h3>
              <p className="m-0 text-[13px] text-[#64788a]">คุณณวรรณ สุขใจ · MRN P240001 · Queue A012</p>
            </div>
            <span className="bg-[#e9f7f4] text-[#0f8f83] px-3 py-1.5 rounded-full font-[850] text-[12px]">Walk-in</span>
          </div>

          <div className="flex-1 overflow-auto p-6 flex flex-col gap-6">

            {/* Vitals Grid */}
            <div>
              <h4 className="m-0 mb-4 text-[16px] font-[900] text-[#102a43] flex items-center gap-2">
                <Activity size={17} className="text-[#0f8f83]" /> Vital Signs
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { key: 'temp', label: 'Temperature',  unit: '°C',  icon: Thermometer, placeholder: '38.5', normal: '37.5–39.2' },
                  { key: 'pr',   label: 'Pulse Rate',   unit: 'bpm', icon: Heart,       placeholder: '100',  normal: '60–160' },
                  { key: 'rr',   label: 'Resp. Rate',   unit: 'rpm', icon: Wind,        placeholder: '24',   normal: '15–30' },
                  { key: 'bw',   label: 'Body Weight',  unit: 'kg',  icon: Scale,       placeholder: '32.5', normal: '' },
                ].map(({ key, label, unit, icon: Icon, placeholder, normal }) => (
                  <div key={key} className="border border-[#e3edf3] rounded-2xl p-3 bg-[#fbfdfe]">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Icon size={13} className="text-[#0f8f83]" />
                      <label className="text-[11px] font-[800] text-[#64788a] uppercase tracking-wide">{label}</label>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <input
                        type="number"
                        placeholder={placeholder}
                        value={vitals[key]}
                        onChange={e => handleVital(key, e.target.value)}
                        className="w-full border-0 outline-none text-[22px] font-black text-[#102a43] bg-transparent p-0"
                      />
                      <span className="text-[12px] text-[#64788a] shrink-0">{unit}</span>
                    </div>
                    {normal && <p className="m-0 mt-1 text-[10px] text-[#8faabb]">ปกติ: {normal}</p>}
                  </div>
                ))}
              </div>

              {/* Secondary Vitals */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                <div className="border border-[#e3edf3] rounded-2xl p-3 bg-[#fbfdfe]">
                  <label className="text-[11px] font-[800] text-[#64788a] uppercase tracking-wide block mb-2">BCS (1-9)</label>
                  <select value={vitals.bcs} onChange={e => handleVital('bcs', e.target.value)}
                    className="w-full border border-[#e3edf3] rounded-xl px-3 py-2 text-sm bg-white">
                    {[...Array(9)].map((_, i) => <option key={i+1}>{i+1}</option>)}
                  </select>
                </div>
                <div className="border border-[#e3edf3] rounded-2xl p-3 bg-[#fbfdfe]">
                  <label className="text-[11px] font-[800] text-[#64788a] uppercase tracking-wide block mb-2">Pain Score (0-10)</label>
                  <input type="range" min="0" max="10" value={vitals.pain || 0} onChange={e => handleVital('pain', e.target.value)}
                    className="w-full accent-[#0f8f83]" />
                  <p className="m-0 text-center text-[18px] font-black text-[#0f8f83]">{vitals.pain || 0}</p>
                </div>
                <div className="border border-[#e3edf3] rounded-2xl p-3 bg-[#fbfdfe]">
                  <label className="text-[11px] font-[800] text-[#64788a] uppercase tracking-wide block mb-2">CRT</label>
                  <select value={vitals.crt} onChange={e => handleVital('crt', e.target.value)}
                    className="w-full border border-[#e3edf3] rounded-xl px-3 py-2 text-sm bg-white">
                    <option value="">เลือก</option>
                    <option>&lt; 2 วินาที (ปกติ)</option>
                    <option>2-3 วินาที</option>
                    <option>&gt; 3 วินาที (ผิดปกติ)</option>
                  </select>
                </div>
                <div className="border border-[#e3edf3] rounded-2xl p-3 bg-[#fbfdfe]">
                  <label className="text-[11px] font-[800] text-[#64788a] uppercase tracking-wide block mb-2">Mucous Membrane</label>
                  <select value={vitals.mm} onChange={e => handleVital('mm', e.target.value)}
                    className="w-full border border-[#e3edf3] rounded-xl px-3 py-2 text-sm bg-white">
                    <option value="">เลือก</option>
                    <option>ชมพู (ปกติ)</option>
                    <option>ซีดขาว</option>
                    <option>ฟ้า/ม่วง</option>
                    <option>เหลือง/Icteric</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Urgency Selection */}
            <div>
              <h4 className="m-0 mb-4 text-[16px] font-[900] text-[#102a43] flex items-center gap-2">
                <AlertTriangle size={17} className="text-[#0f8f83]" /> ประเมินระดับความเร่งด่วน
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {urgencyLevels.map(({ key, label, color, text, bg, border, desc }) => (
                  <button
                    key={key}
                    onClick={() => setSelected(key)}
                    className={`border-2 rounded-2xl p-4 text-center cursor-pointer transition-all ${
                      selected === key ? `${border} ${bg} shadow-sm` : 'border-[#e3edf3] bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full ${color} mx-auto mb-2`} />
                    <p className={`m-0 font-[900] text-[15px] ${selected === key ? text : 'text-[#102a43]'}`}>{label}</p>
                    <p className="m-0 mt-1 text-[11px] text-[#64788a]">{desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Chief Complaint */}
            <div>
              <label className="text-[13px] font-[800] text-[#39576d] block mb-2">Chief Complaint / Reason for Visit</label>
              <textarea
                className="w-full border border-[#e3edf3] rounded-2xl px-4 py-3 text-sm h-24 bg-white resize-none focus:outline-none focus:border-[#0f8f83]"
                placeholder="ระบุอาการหลักที่นำสัตว์เลี้ยงมาพบสัตวแพทย์วันนี้..."
              />
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex justify-between items-center p-5 border-t border-[#e3edf3] bg-[#fbfdfe] shrink-0">
            <p className="m-0 text-[13px] text-[#64788a]">Urgency: <b className={`${urgencyLevels.find(u => u.key === selected)?.text}`}>{urgencyLevels.find(u => u.key === selected)?.label}</b></p>
            <div className="flex gap-2.5">
              <button className="border border-[#e3edf3] rounded-xl px-4 py-2.5 font-[850] text-sm bg-white text-[#35546a]">Save Draft</button>
              <button className="border-0 rounded-xl px-5 py-2.5 font-[850] text-sm bg-gradient-to-r from-[#0f8f83] to-[#0b6d87] text-white shadow-sm flex items-center gap-2">
                Confirm & Add to Queue <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Recent Triage List */}
        <div className="bg-white border border-[#e3edf3] rounded-2xl shadow-sm flex flex-col overflow-hidden">
          <div className="p-[16px_18px] border-b border-[#e3edf3] shrink-0 flex items-center justify-between">
            <h3 className="m-0 text-[17px] font-bold text-[#102a43]">Triage วันนี้</h3>
            <span className="bg-[#e8f7f1] text-[#0f8d62] px-2 py-1 rounded-full text-[11px] font-[850]">Live</span>
          </div>

          {/* Summary Counts */}
          <div className="grid grid-cols-4 gap-0 border-b border-[#e3edf3] shrink-0">
            {urgencyLevels.map(({ key, label, text, bg, color }) => (
              <div key={key} className={`p-3 text-center border-r border-[#e3edf3] last:border-r-0 ${bg}`}>
                <div className={`w-2.5 h-2.5 rounded-full ${color} mx-auto mb-1`} />
                <p className={`m-0 text-[20px] font-black ${text}`}>{recentTriages.filter(r => r.urgency === key).length}</p>
                <p className="m-0 text-[10px] text-[#64788a]">{label}</p>
              </div>
            ))}
          </div>

          <div className="flex-1 overflow-auto p-3">
            {recentTriages.map((t) => (
              <div key={t.no} className="border border-[#e3edf3] rounded-2xl p-3.5 mb-2.5 flex items-center gap-3 hover:border-[#7ccdc2] cursor-pointer transition-all bg-white">
                <PawPrint size={18} className={speciesColor[t.species] || 'text-[#c37000]'} />
                <div className="flex-1 min-w-0">
                  <p className="m-0 font-bold text-[14px] text-[#102a43] truncate">{t.pet}</p>
                  <p className="m-0 text-[12px] text-[#64788a] truncate">{t.owner} · {t.no}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-[850] ${urgencyBadge[t.urgency]}`}>
                    {urgencyLevels.find(u => u.key === t.urgency)?.label}
                  </span>
                  <p className="m-0 mt-1 text-[11px] text-[#8faabb]">{t.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
