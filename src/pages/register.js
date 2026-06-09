// src/pages/register.js
import React from 'react';
import { Search, UserCircle, User, PawPrint, Calendar, Activity, Info } from 'lucide-react';

export default function RegisterPage() {
  return (
    <div className="h-full flex flex-col p-4 md:p-6 bg-[#f6f9fb]">
      {/* Topbar */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-4 items-center mb-4 shrink-0">
        <div>
          <h2 className="m-0 text-[28px] font-bold text-[#102a43]">Register / Walk-in Intake</h2>
          <p className="m-0 mt-1 text-muted text-sm">ลงทะเบียนลูกค้า ออกคิว และเปิด Visit ใหม่</p>
        </div>
        <div className="hidden md:flex items-center gap-2 bg-white border border-line rounded-2xl p-[10px_16px] text-[#7a8fa0] shadow-sm text-sm w-[400px]">
          <Search size={15} /> Search client/pet/microchip...
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between mb-6 shrink-0 gap-3">
        <div className="text-[13px] text-muted">Home › Register › New Walk-in</div>
        <div className="flex gap-2.5">
          <button className="border border-line rounded-xl px-[15px] py-[10px] font-[850] cursor-pointer text-sm bg-white text-[#35546a] hover:bg-gray-50">Scan Microchip</button>
          <button className="border border-line rounded-xl px-[15px] py-[10px] font-[850] cursor-pointer text-sm bg-white text-[#35546a] hover:bg-gray-50">Search Client</button>
          <button className="border-0 rounded-xl px-[15px] py-[10px] font-[850] cursor-pointer text-sm bg-gradient-to-r from-primary to-primary2 text-white shadow-md hover:opacity-90">Quick Walk-in</button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_390px] gap-6 flex-1 min-h-0 overflow-hidden">
        
        {/* Left Form */}
        <div className="bg-white border border-line rounded-[18px] shadow-sm flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto p-6 md:p-8">
            
            {/* Client Info */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-5 text-lg font-[900] text-[#102a43]">
                <div className="w-9 h-9 rounded-xl grid place-items-center bg-soft text-primary"><User size={20} /></div>
                Client Information
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-2"><label className="text-[12px] font-bold text-[#39576d]">Prefix</label><select className="w-full border border-line rounded-xl px-3 py-2.5 text-sm"><option>คุณ</option></select></div>
                <div className="md:col-span-5"><label className="text-[12px] font-bold text-[#39576d]">First Name *</label><input className="w-full border border-line rounded-xl px-3 py-2.5 text-sm" defaultValue="สมชาย" /></div>
                <div className="md:col-span-5"><label className="text-[12px] font-bold text-[#39576d]">Last Name *</label><input className="w-full border border-line rounded-xl px-3 py-2.5 text-sm" defaultValue="ใจดี" /></div>
                <div className="md:col-span-6"><label className="text-[12px] font-bold text-[#39576d]">Phone *</label><input className="w-full border border-line rounded-xl px-3 py-2.5 text-sm" defaultValue="081-234-5678" /></div>
                <div className="md:col-span-6"><label className="text-[12px] font-bold text-[#39576d]">Email</label><input className="w-full border border-line rounded-xl px-3 py-2.5 text-sm" placeholder="somchai@email.com" /></div>
              </div>
            </div>

            {/* Patient Info */}
            <div className="pt-6 border-t border-line">
              <div className="flex items-center gap-3 mb-5 text-lg font-[900] text-[#102a43]">
                <div className="w-9 h-9 rounded-xl grid place-items-center bg-soft text-primary"><PawPrint size={20} /></div>
                Patient / Pet Information
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-4"><label className="text-[12px] font-bold text-[#39576d]">Pet Name *</label><input className="w-full border border-line rounded-xl px-3 py-2.5 text-sm" defaultValue="Lucky" /></div>
                <div className="md:col-span-4"><label className="text-[12px] font-bold text-[#39576d]">Species</label><select className="w-full border border-line rounded-xl px-3 py-2.5 text-sm"><option>Dog</option><option>Cat</option></select></div>
                <div className="md:col-span-4"><label className="text-[12px] font-bold text-[#39576d]">Breed</label><input className="w-full border border-line rounded-xl px-3 py-2.5 text-sm" placeholder="Golden Retriever" /></div>
                
                <div className="md:col-span-3"><label className="text-[12px] font-bold text-[#39576d]">Age (Year)</label><input className="w-full border border-line rounded-xl px-3 py-2.5 text-sm" placeholder="3" /></div>
                <div className="md:col-span-3"><label className="text-[12px] font-bold text-[#39576d]">Weight (kg)</label><input className="w-full border border-line rounded-xl px-3 py-2.5 text-sm font-bold text-primary" placeholder="0.0" /></div>
                <div className="md:col-span-3"><label className="text-[12px] font-bold text-[#39576d]">Gender</label><select className="w-full border border-line rounded-xl px-3 py-2.5 text-sm"><option>Male</option><option>Female</option></select></div>
                <div className="md:col-span-3"><label className="text-[12px] font-bold text-[#39576d]">Neutered Status</label><select className="w-full border border-line rounded-xl px-3 py-2.5 text-sm"><option>Intact</option><option>Neutered</option></select></div>
                
                <div className="md:col-span-12"><label className="text-[12px] font-bold text-[#39576d]">Medical History / Allergy</label><textarea className="w-full border border-line rounded-xl px-3 py-2.5 text-sm h-20" placeholder="ระบุประวัติแพ้ยาหรืออาการสำคัญ..."></textarea></div>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex justify-between items-center p-6 border-t border-line bg-[#fbfdfe]">
            <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-[#39576d]">
              <input type="checkbox" className="w-4 h-4" /> Save record
            </label>
            <button className="border-0 rounded-xl px-6 py-3 font-[850] text-sm bg-gradient-to-r from-primary to-primary2 text-white shadow-md hover:opacity-90">
              Create Queue & Open EMR →
            </button>
          </div>
        </div>

        {/* Sidebar Summary */}
        <aside className="bg-white border border-line rounded-[18px] shadow-sm p-6 flex flex-col gap-6">
          <div>
            <h3 className="text-base font-bold text-[#102a43] mb-4">Today Status</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#fbfdfe] border border-line rounded-2xl p-4 text-center"><b className="text-primary text-[22px]">12</b><span className="block text-muted text-xs">Waiting</span></div>
              <div className="bg-[#fbfdfe] border border-line rounded-2xl p-4 text-center"><b className="text-primary text-[22px]">4</b><span className="block text-muted text-xs">In Progress</span></div>
            </div>
          </div>

          <div className="border-t border-line pt-6">
             <h3 className="text-base font-bold text-[#102a43] mb-4">Queue Preview</h3>
             <div className="bg-gradient-to-br from-[#e6f7f3] to-[#edf6ff] border border-[#d7ecef] rounded-[17px] p-6 text-center">
               <div className="text-[48px] font-[950] text-primary leading-tight">A012</div>
               <p className="text-muted text-sm mt-1">Next Ticket Number</p>
             </div>
          </div>
        </aside>

      </div>
    </div>
  );
}