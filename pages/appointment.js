import React, { useState } from 'react';

export default function AppointmentPage() {
  const [view, setView] = useState('monthly');

  return (
    <div className="h-screen flex bg-slate-50 overflow-hidden">
      {/* --- SIDEBAR (จากภาพ edited-image.png) --- */}
      <div className="w-[280px] bg-white border-r border-slate-200 p-4 flex flex-col shrink-0">
        <button className="bg-white border border-slate-200 shadow-sm rounded-full px-6 py-2.5 font-bold text-slate-700 mb-6 flex items-center gap-2 hover:bg-slate-50 transition">
          <span className="text-xl">+</span> สร้าง
        </button>
        
        {/* ปฏิทินตัวเล็ก (Placeholder) */}
        <div className="text-sm font-bold text-slate-700 mb-4">มิถุนายน 2026</div>
        <div className="h-40 bg-slate-100 rounded-lg mb-6 flex items-center justify-center text-slate-400 text-xs">
          [Mini Calendar]
        </div>

        {/* รายการปฏิทิน */}
        <div className="space-y-4">
          <div className="text-xs font-bold text-slate-500 uppercase">ปฏิทินของฉัน</div>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" defaultChecked /> Tasks
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" defaultChecked /> วันเกิด
          </label>
        </div>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col p-6 overflow-hidden">
        {/* Header และ Toggle อยู่ในส่วนนี้ */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">มิถุนายน 2026</h2>
          <div className="bg-white border border-slate-200 rounded-lg p-1 flex shadow-sm">
            <button onClick={() => setView('daily')} className={`px-4 py-1.5 rounded text-sm font-bold ${view === 'daily' ? 'bg-slate-100' : ''}`}>Daily</button>
            <button onClick={() => setView('monthly')} className={`px-4 py-1.5 rounded text-sm font-bold ${view === 'monthly' ? 'bg-slate-100' : ''}`}>Monthly</button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          {view === 'monthly' ? <MonthlyView /> : <DailyView />}
        </div>
      </div>
    </div>
  );
}

/* ==================================================
   MONTHLY VIEW 
   ================================================== */
function MonthlyView() {
  const days = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];
  
  // จำลองตาราง 35 ช่อง (ครอบคลุม 5 สัปดาห์)
  const daysInMonth = Array.from({ length: 35 }, (_, i) => i + 1);

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm h-full flex flex-col overflow-hidden">
      {/* Header: วันอาทิตย์ - วันเสาร์ */}
      <div className="grid grid-cols-7 border-b border-slate-200">
        {days.map(day => (
          <div key={day} className="py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wide">
            {day}
          </div>
        ))}
      </div>
      
      {/* Grid: ตารางวันที่ */}
      <div className="flex-1 grid grid-cols-7 grid-rows-5 gap-[1px] bg-slate-200">
        {daysInMonth.map((dayNumber) => {
          // จำลองวันนี้คือวันที่ 6 (เหมือนในภาพ)
          const isToday = dayNumber === 6;
          
          return (
            <div key={dayNumber} className="bg-white p-2 min-h-[120px] hover:bg-slate-50 transition-colors duration-150 flex flex-col gap-1 overflow-hidden">
              {/* เลขวันที่ */}
              <div className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${isToday ? 'bg-blue-600 text-white' : 'text-slate-700'}`}>
                {dayNumber}
              </div>
              
              {/* พื้นที่แสดงนัดหมาย (Event Markers) */}
              <div className="flex flex-col gap-1 mt-1">
                {dayNumber === 6 && (
                  <div className="text-[10px] bg-blue-100 text-blue-800 px-2 py-1 rounded truncate border border-blue-200 font-medium">
                    09:00 - ตรวจสุขภาพประจำปี
                  </div>
                )}
                {dayNumber === 3 && (
                  <div className="text-[10px] bg-green-100 text-green-800 px-2 py-1 rounded truncate border border-green-200 font-medium">
                    10:00 - นัดฉีดวัคซีน
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ==================================================
   DAILY VIEW (Include Schedule + Full Form)
   ================================================== */
function DailyView() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-6 h-full min-h-0">
      {/* Left: Schedule List */}
      <div className="bg-white border border-[#e3edf3] rounded-[18px] shadow-[0_14px_35px_rgba(16,42,67,.07)] flex flex-col overflow-hidden">
        <div className="p-5 border-b border-[#e3edf3] bg-[#fbfdfe] flex items-center justify-between">
          <h3 className="font-bold text-[#102a43]">Thursday, 6 June 2026</h3>
        </div>
        <div className="flex-1 overflow-auto p-5 space-y-4">
          <div className="border border-[#e3edf3] rounded-xl p-4 flex justify-between items-center bg-white hover:shadow-md transition">
            <div className="flex gap-4 items-center">
              <div className="text-right w-12 font-bold text-[#102a43]">09:00</div>
              <div className="w-1.5 h-12 bg-[#276db6] rounded-full"></div>
              <div>
                <b className="text-sm block">Mochi (Persian)</b>
                <span className="text-xs text-[#64788a]">Vaccine (Rabies)</span>
              </div>
            </div>
            <span className="bg-[#e8f7f1] text-[#0f8d62] px-3 py-1 rounded-full text-[11px] font-bold">Confirmed</span>
          </div>
        </div>
      </div>

      {/* Right: New Appointment Form (Full Version) */}
      <div className="bg-white border border-[#e3edf3] rounded-[18px] shadow-[0_14px_35px_rgba(16,42,67,.07)] flex flex-col overflow-hidden">
        <div className="p-[20px_24px] border-b border-[#e3edf3] bg-[#fbfdfe] shrink-0">
          <h3 className="m-0 text-[18px] font-bold text-[#102a43] flex items-center gap-2">
            <span className="text-[#0f8f83]">➕</span> New Appointment
          </h3>
        </div>

        <div className="flex-1 overflow-auto p-[20px_24px] space-y-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-[#64788a]">Client / Owner *</label>
            <div className="relative">
              <input placeholder="Search phone or name..." className="w-full border border-[#e3edf3] rounded-xl pl-9 pr-3 py-2.5 text-sm outline-none focus:border-[#0f8f83]" />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a0b2c3]">🔎</span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-[#64788a]">Patient / Pet *</label>
            <select className="border border-[#e3edf3] rounded-xl px-3 py-2.5 text-sm outline-none text-[#102a43] bg-white">
              <option value="">-- Select or Search Pet --</option>
              <option>Lucky (Golden Retriever)</option>
              <option>Mochi (Persian)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-[#64788a]">Date *</label>
              <input type="date" defaultValue="2026-06-07" className="border border-[#e3edf3] rounded-xl px-3 py-2.5 text-sm outline-none text-[#102a43]" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-[#64788a]">Time *</label>
              <input type="time" defaultValue="10:00" className="border border-[#e3edf3] rounded-xl px-3 py-2.5 text-sm outline-none text-[#102a43]" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-[#64788a]">Appointment Type</label>
            <select className="border border-[#e3edf3] rounded-xl px-3 py-2.5 text-sm outline-none text-[#102a43] bg-white">
              <option>OPD / General Checkup</option>
              <option>Vaccine</option>
              <option>Surgery</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-[#64788a]">Reason / Note</label>
            <textarea placeholder="e.g. Needs rabies booster" className="border border-[#e3edf3] rounded-xl px-3 py-2.5 text-sm outline-none resize-none min-h-[80px] text-[#102a43]"></textarea>
          </div>

          <label className="flex items-center gap-2 mt-2 cursor-pointer text-[13px] text-[#35546a]">
            <input type="checkbox" defaultChecked className="w-4 h-4 cursor-pointer" /> 
            Send LINE / SMS Reminder automatically
          </label>
        </div>

        <div className="p-[18px_24px] border-t border-[#e3edf3] bg-[#fbfdfe] shrink-0 flex gap-2.5">
          <button className="flex-1 border border-[#e3edf3] rounded-xl py-[10px] font-[850] cursor-pointer text-sm bg-white text-[#35546a] hover:bg-[#f6f9fb]">
            Clear
          </button>
          <button className="flex-[2] border-0 rounded-xl py-[10px] font-[850] cursor-pointer text-sm bg-gradient-to-r from-[#0f8f83] to-[#0b6d87] text-white shadow-sm hover:opacity-90">
            Save Appointment
          </button>
        </div>
      </div>
    </div>
  );
}