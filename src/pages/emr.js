// src/pages/emr.js
import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Phone, Mail, ClipboardList, Syringe, Pill, FileText, AlertTriangle, Sparkles, Heart, Dog, Cat, PawPrint, X } from 'lucide-react';

// ข้อมูลจำลองคิวcomบ่งตามสถานะ (Mock Data)
const mockQueues = {
  waiting: [
    { no: 'A012', pet: 'Lucky', species: 'dog', gender: 'M', breed: 'Golden Retriever', age: '5Y', symptom: 'Vomiting', owner: 'คุณณวรรณ สุขใจ', time: '09:15', duration: '19m', urgent: true },
    { no: 'A013', pet: 'Mochi', species: 'cat', gender: 'F', breed: 'Persian', age: '3Y', symptom: 'Vaccine', owner: 'คุณปัณณดา', time: '09:30', duration: '5m', urgent: false },
    { no: 'A014', pet: 'Peanut', species: 'rabbit', gender: 'M', breed: 'ND Rabbit', age: '1Y', symptom: 'Grooming', owner: 'คุณสุดา', time: '09:45', duration: '2m', urgent: false }
  ],
  progress: [
    { no: 'A010', pet: 'Tiger', species: 'dog', gender: 'M', breed: 'Thai Dog', age: '2Y', symptom: 'Abscess check', owner: 'คุณวิชัย', time: '08:45', duration: 'Exam room 1', urgent: false },
    { no: 'A011', pet: 'Sakura', species: 'cat', gender: 'F', breed: 'Siamese', age: '4Y', symptom: 'Fever', owner: 'คุณนิภา', time: '09:00', duration: 'Exam room 2', urgent: true }
  ],
  done: [
    { no: 'A007', pet: 'Charly', species: 'dog', gender: 'M', breed: 'Poodle', age: '12Y', symptom: 'Heart Follow-up', owner: 'คุณวรรณา', time: '08:00', duration: 'Completed', urgent: false },
    { no: 'A008', pet: 'Max', species: 'dog', gender: 'M', breed: 'French Bulldog', age: '3Y', symptom: 'Ear Infection', owner: 'คุณธนา', time: '08:15', duration: 'Completed', urgent: false },
    { no: 'A009', pet: 'Bella', species: 'cat', gender: 'F', breed: 'Scottish Fold', age: '2Y', symptom: 'Spay Post-op', owner: 'คุณรัตนา', time: '08:30', duration: 'Completed', urgent: false }
  ]
};

export default function EmrPage() {
  // State สำหรับจัดการคิวซ้ายมือ
  const [activeTab, setActiveTab] = useState('waiting');
  
  // State สำหรับจัดการ Clinical Summary ขวามือ
  const [summaryTab, setSummaryTab] = useState('lab');

  // State สำหรับจัดการแถบเมนูหลักของคนไข้ (Center Nav Tabs)
  const [currentNavTab, setCurrentNavTab] = useState('current');

  // State ใหม่สำหรับจัดการเมนูย่อยด้านในแถบประวัติปัจจุบัน ('soap' | 'problems' | 'orders' | 'prescription' | 'note')
  const [soapSubTab, setSoapSubTab] = useState('soap');

  return (
    <div className="h-full flex flex-col p-4 md:p-6 bg-[#f6f9fb] overflow-auto">
      {/* Topbar ของหน้า EMR */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_auto] gap-4 items-center mb-3.5 shrink-0">
        <div>
          <h2 className="m-0 text-[28px] font-bold text-[#102a43]">OPD Consultation / EMR</h2>
          <p className="m-0 mt-1 text-[#64788a] text-sm">Worklist + Current Encounter + Clinical Summary ในหน้าเดียว</p>
        </div>
        <div className="bg-white border border-[#e3edf3] rounded-2xl p-[13px_16px] text-[#7a8fa0] shadow-[0_14px_35px_rgba(16,42,67,.07)] text-sm w-full lg:w-[450px] flex items-center gap-2">
          <Search size={14} className="shrink-0" /> Search patient / client / MRN / queue no.
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3.5 shrink-0 gap-3">
        <div className="text-[13px] text-[#64788a]">Home › OPD › Consultation › A012 Lucky</div>
        <div className="flex flex-wrap gap-2.5">
          <Link href="/register" className="border border-[#e3edf3] rounded-xl px-[15px] py-[10px] font-[850] cursor-pointer text-sm bg-white text-[#35546a] hover:bg-[#f6f9fb] no-underline">
            ← Back to Register
          </Link>
          <button className="border border-[#e3edf3] rounded-xl px-[15px] py-[10px] font-[850] cursor-pointer text-sm bg-white text-[#35546a] hover:bg-[#f6f9fb]">
            Template
          </button>
          <button className="border-0 rounded-xl px-[15px] py-[10px] font-[850] cursor-pointer text-sm bg-[#eef4f7] text-[#35546a]">
            Print
          </button>
          <button className="border-0 rounded-xl px-[15px] py-[10px] font-[850] cursor-pointer text-sm bg-gradient-to-r from-[#0f8f83] to-[#0b6d87] text-white shadow-sm">
            Complete Visit
          </button>
        </div>
      </div>

      {/* Main EMR Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] xl:grid-cols-[330px_minmax(720px,1fr)_390px] gap-[16px] flex-1 min-h-0">
        
        {/* ================= LEFT PANEL: Queue ================= */}
        <div className="bg-white border border-[#e3edf3] rounded-[18px] shadow-[0_14px_35px_rgba(16,42,67,.07)] flex flex-col overflow-hidden h-[600px] lg:h-auto">
          <div className="p-[16px_18px] border-b border-[#e3edf3] flex items-center justify-between shrink-0">
            <h3 className="m-0 text-[17px] font-bold text-[#102a43]">Today's Queue (15)</h3>
            <span className="bg-[#e8f7f1] text-[#0f8d62] px-2 py-1 rounded-full text-[11px] font-[850]">Live</span>
          </div>
          
          <div className="p-[12px_14px] border-b border-[#e3edf3] shrink-0">
            <div className="flex gap-1 bg-[#f2f6f8] p-1 rounded-xl text-[12px]">
              <button 
                onClick={() => setActiveTab('waiting')}
                className={`flex-1 py-2 rounded-lg font-[800] border-0 cursor-pointer transition-all ${activeTab === 'waiting' ? 'bg-white text-[#0f8f83] shadow-sm' : 'text-[#64788a] bg-transparent hover:bg-white/50'}`}
              >
                Waiting 7
              </button>
              <button 
                onClick={() => setActiveTab('progress')}
                className={`flex-1 py-2 rounded-lg font-[800] border-0 cursor-pointer transition-all ${activeTab === 'progress' ? 'bg-white text-[#0f8f83] shadow-sm' : 'text-[#64788a] bg-transparent hover:bg-white/50'}`}
              >
                Progress 2
              </button>
              <button 
                onClick={() => setActiveTab('done')}
                className={`flex-1 py-2 rounded-lg font-[800] border-0 cursor-pointer transition-all ${activeTab === 'done' ? 'bg-white text-[#0f8f83] shadow-sm' : 'text-[#64788a] bg-transparent hover:bg-white/50'}`}
              >
                Done 6
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-3">
            {mockQueues[activeTab].map((q) => (
              <div 
                key={q.no} 
                className={`border rounded-2xl p-[13px] mb-2.5 grid grid-cols-[52px_1fr_54px] gap-2.5 items-center cursor-pointer transition-all ${
                  q.no === 'A012' 
                    ? 'border-[#7ccdc2] bg-gradient-to-b from-[#effaf7] to-white shadow-sm' 
                    : 'border-[#e3edf3] bg-white hover:border-[#7ccdc2]'
                }`}
              >
                <div className="text-[18px] font-[950] text-[#0f8f83]">{q.no}</div>
                <div>
                  <b className="text-[15px] text-[#102a43]">{q.pet} {q.species === 'dog' ? <Dog size={14} className="inline text-[#b45309]" /> : q.species === 'cat' ? <Cat size={14} className="inline text-[#7c3aed]" /> : <PawPrint size={14} className="inline text-[#15803d]" />} <span className={`text-[10px] font-bold border px-0.5 rounded ${q.gender === 'M' ? 'text-[#3b82f6] border-[#3b82f6]' : 'text-[#ec4899] border-[#ec4899]'}`}>{q.gender}</span></b>
                  <small className="block text-[#64788a] mt-1 text-[12px]">{q.breed} · {q.age} · {q.symptom}</small>
                  <small className="block text-[#64788a] text-[12px]">{q.owner}</small>
                </div>
                <div className="text-right text-[12px] text-[#64788a]">
                  {q.time}<br/>
                  <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[11px] font-[850] ${
                    q.urgent ? 'bg-[#fff4e2] text-[#b86b00]' : 'bg-[#edf5ff] text-[#276db6]'
                  }`}>
                    {q.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= CENTER PANEL: Patient & SOAP ================= */}
        <div className="bg-white border border-[#e3edf3] rounded-[18px] shadow-[0_14px_35px_rgba(16,42,67,.07)] flex flex-col overflow-hidden">
          {/* Patient Header */}
          <div className="p-[16px_18px] grid grid-cols-1 sm:grid-cols-[68px_1.2fr_1fr_auto] gap-[16px] items-center shrink-0 border-b border-[#e3edf3]">
            <div className="w-[68px] h-[68px] rounded-[22px] bg-[#fff0d9] grid place-items-center justify-self-center sm:justify-self-start"><Dog size={38} className="text-[#b45309]" /></div>
            <div className="text-center sm:text-left">
              <h2 className="m-0 text-[25px] font-bold text-[#102a43] flex items-center gap-2">Lucky <span className="text-[#3b82f6] text-[13px] font-bold border border-[#3b82f6] px-1.5 py-0.5 rounded">M</span></h2>
              <p className="m-0 mt-1 text-[#64788a] text-[13px]">Golden Retriever · 5Y 2M · 32.5 kg · BCS 5/9</p>
              <span className="inline-block mt-1.5 bg-[#e9f7f4] text-[#0f8f83] px-2.5 py-1 rounded-full font-[850] text-[12px]">MRN P240001</span>
            </div>
            <div className="border-t sm:border-t-0 sm:border-l border-[#e3edf3] pt-3 sm:pt-0 sm:pl-4 text-[13px] text-[#254860] leading-relaxed text-center sm:text-left">
              <b className="text-[#102a43] text-[14px]">คุณณวรรณ สุขใจ</b><br/>
              <span className="flex items-center gap-1.5"><Phone size={12} /> 081-234-5678</span>
              <span className="flex items-center gap-1.5 mt-1"><Mail size={12} /> nawan.sukjai@email.com</span>
            </div>
            <div className="text-center sm:text-right flex sm:flex-col justify-center gap-2 sm:gap-0 mt-2 sm:mt-0">
              <span className="inline-block bg-[#e8f7f1] text-[#0f8d62] px-2 py-1 rounded-full text-[11px] font-[850]">Current Visit</span>
              <span className="inline-block bg-[#edf5ff] text-[#276db6] px-2 py-1 rounded-full text-[11px] font-[850] sm:mt-2">OPD</span>
            </div>
          </div>

          {/* Snapshots */}
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-2.5 p-[16px_18px] shrink-0 border-b border-[#e3edf3]">
            <div className="border border-[#c8ead8] bg-[#effaf4] rounded-xl p-3 flex flex-col justify-center min-h-[72px]">
              <small className="block text-[#64788a] font-[800] mb-1.5 text-[11px]">Allergy / ADR</small>
              <b className="text-[15px] text-[#102a43]">None</b>
            </div>
            <div className="border border-[#f1d2a6] bg-[#fff6e9] rounded-xl p-3 flex flex-col justify-center min-h-[72px]">
              <small className="block text-[#64788a] font-[800] mb-1.5 text-[11px]">Chronic Disease</small>
              <b className="text-[15px] text-[#102a43]">CKD Stage 2</b>
            </div>
            <div className="border border-[#e3edf3] bg-white rounded-xl p-3 flex flex-col justify-center min-h-[72px]">
              <small className="block text-[#64788a] font-[800] mb-1.5 text-[11px]">Medication</small>
              <b className="text-[15px] text-[#102a43]">2 รายการ</b>
            </div>
            <div className="border border-[#c8ead8] bg-[#effaf4] rounded-xl p-3 flex flex-col justify-center min-h-[72px]">
              <small className="block text-[#64788a] font-[800] mb-1.5 text-[11px]">Vaccine</small>
              <b className="text-[15px] text-[#102a43]">ครบถ้วน</b>
            </div>
            <div className="border border-[#e3edf3] bg-white rounded-xl p-3 flex flex-col justify-center min-h-[72px]">
              <small className="block text-[#64788a] font-[800] mb-1.5 text-[11px]">Last Visit</small>
              <b className="text-[15px] text-[#102a43]">20/04/2567</b>
            </div>
            <div className="border border-[#f1d2a6] bg-[#fff6e9] rounded-xl p-3 flex flex-col justify-center min-h-[72px]">
              <small className="block text-[#64788a] font-[800] mb-1.5 text-[11px]">Follow-up</small>
              <b className="text-[15px] text-[#102a43]">Due 14 วัน</b>
            </div>
          </div>

          {/* Nav Tabs */}
          <div className="sticky top-0 z-10 flex gap-1.5 p-[10px_14px] border-b border-[#e3edf3] bg-[#fbfdfe] overflow-x-auto hide-scrollbar shrink-0">
            <button 
              onClick={() => setCurrentNavTab('current')}
              className={`border-0 rounded-xl px-3.5 py-2.5 font-[850] text-[13px] cursor-pointer whitespace-nowrap transition-colors ${currentNavTab === 'current' ? 'bg-[#e9f7f4] text-[#0f8f83]' : 'bg-transparent text-[#4b6679] hover:bg-[#e9f2f5]'}`}
            >
              Current Visit
            </button>
            <button 
              onClick={() => setCurrentNavTab('history')}
              className={`border-0 rounded-xl px-3.5 py-2.5 font-[850] text-[13px] cursor-pointer whitespace-nowrap transition-colors ${currentNavTab === 'history' ? 'bg-[#e9f7f4] text-[#0f8f83]' : 'bg-transparent text-[#4b6679] hover:bg-[#e9f2f5]'}`}
            >
              History
            </button>
            <button 
              onClick={() => setCurrentNavTab('lab')}
              className={`border-0 rounded-xl px-3.5 py-2.5 font-[850] text-[13px] cursor-pointer whitespace-nowrap transition-colors ${currentNavTab === 'lab' ? 'bg-[#e9f7f4] text-[#0f8f83]' : 'bg-transparent text-[#4b6679] hover:bg-[#e9f2f5]'}`}
            >
              Lab
            </button>
            <button 
              onClick={() => setCurrentNavTab('imaging')}
              className={`border-0 rounded-xl px-3.5 py-2.5 font-[850] text-[13px] cursor-pointer whitespace-nowrap transition-colors ${currentNavTab === 'imaging' ? 'bg-[#e9f7f4] text-[#0f8f83]' : 'bg-transparent text-[#4b6679] hover:bg-[#e9f2f5]'}`}
            >
              Imaging
            </button>
            <button 
              onClick={() => setCurrentNavTab('medication')}
              className={`border-0 rounded-xl px-3.5 py-2.5 font-[850] text-[13px] cursor-pointer whitespace-nowrap transition-colors ${currentNavTab === 'medication' ? 'bg-[#e9f7f4] text-[#0f8f83]' : 'bg-transparent text-[#4b6679] hover:bg-[#e9f2f5]'}`}
            >
              Medication
            </button>
            <button 
              onClick={() => setCurrentNavTab('vaccine')}
              className={`border-0 rounded-xl px-3.5 py-2.5 font-[850] text-[13px] cursor-pointer whitespace-nowrap transition-colors ${currentNavTab === 'vaccine' ? 'bg-[#e9f7f4] text-[#0f8f83]' : 'bg-transparent text-[#4b6679] hover:bg-[#e9f2f5]'}`}
            >
              Vaccine
            </button>
            <button 
              onClick={() => setCurrentNavTab('documents')}
              className={`border-0 rounded-xl px-3.5 py-2.5 font-[850] text-[13px] cursor-pointer whitespace-nowrap transition-colors ${currentNavTab === 'documents' ? 'bg-[#e9f7f4] text-[#0f8f83]' : 'bg-transparent text-[#4b6679] hover:bg-[#e9f2f5]'}`}
            >
              Documents
            </button>
          </div>

          {/* Dynamic Content Renderer */}
          <div className="flex-1 min-h-0 overflow-hidden">
            
            {/* 1. หน้าแสดงผลแท็บ CURRENT VISIT (เพิ่มสเตตผูกระบบเมนูย่อยด้านใน) */}
            {currentNavTab === 'current' && (
              <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] h-full overflow-hidden animate-fadeIn">
                {/* Subnav SOAP - ปรับแต่งโค้ดให้สลับแท็บได้จริงด้วย State */}
                <div className="border-b md:border-b-0 md:border-r border-[#e3edf3] p-[14px] bg-[#fbfdfe] flex md:flex-col overflow-x-auto md:overflow-y-auto gap-1 shrink-0">
                  <button 
                    onClick={() => setSoapSubTab('soap')}
                    className={`text-left border-0 rounded-xl px-3 py-2.5 font-[850] text-[13px] cursor-pointer whitespace-nowrap min-w-[100px] md:w-full md:mb-1 transition-all ${soapSubTab === 'soap' ? 'bg-white text-[#0f8f83] shadow-sm' : 'bg-transparent text-[#536b7d] hover:bg-white'}`}
                  >
                    SOAP
                  </button>
                  <button 
                    onClick={() => setSoapSubTab('problems')}
                    className={`text-left border-0 rounded-xl px-3 py-2.5 font-[850] text-[13px] cursor-pointer whitespace-nowrap min-w-[100px] md:w-full md:mb-1 transition-all ${soapSubTab === 'problems' ? 'bg-white text-[#0f8f83] shadow-sm' : 'bg-transparent text-[#536b7d] hover:bg-white'}`}
                  >
                    Problem List
                  </button>
                  <button 
                    onClick={() => setSoapSubTab('orders')}
                    className={`text-left border-0 rounded-xl px-3 py-2.5 font-[850] text-[13px] cursor-pointer whitespace-nowrap min-w-[100px] md:w-full md:mb-1 transition-all ${soapSubTab === 'orders' ? 'bg-white text-[#0f8f83] shadow-sm' : 'bg-transparent text-[#536b7d] hover:bg-white'}`}
                  >
                    Orders
                  </button>
                  <button 
                    onClick={() => setSoapSubTab('prescription')}
                    className={`text-left border-0 rounded-xl px-3 py-2.5 font-[850] text-[13px] cursor-pointer whitespace-nowrap min-w-[100px] md:w-full md:mb-1 transition-all ${soapSubTab === 'prescription' ? 'bg-white text-[#0f8f83] shadow-sm' : 'bg-transparent text-[#536b7d] hover:bg-white'}`}
                  >
                    Prescription
                  </button>
                  <button 
                    onClick={() => setSoapSubTab('note')}
                    className={`text-left border-0 rounded-xl px-3 py-2.5 font-[850] text-[13px] cursor-pointer whitespace-nowrap min-w-[100px] md:w-full md:mb-1 transition-all ${soapSubTab === 'note' ? 'bg-white text-[#0f8f83] shadow-sm' : 'bg-transparent text-[#536b7d] hover:bg-white'}`}
                  >
                    Note
                  </button>
                </div>

                {/* คอนเทนต์ภายในตามเมนูย่อยที่กดเลือก */}
                <div className="p-[18px] overflow-y-auto bg-[#f6f9fb] h-full flex flex-col">
                  
                  {/* แสดงฟอร์มประเมิน SOAP ดั้งเดิม */}
                  {soapSubTab === 'soap' && (
                    <div className="space-y-3 animate-fadeIn flex-1">
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 mb-3.5">
                        <div className="border border-[#e3edf3] bg-white rounded-xl p-2.5"><small className="block text-[#64788a] text-[11px] font-[800] mb-1">Visit Date</small><b className="text-[13px] text-[#102a43]">12/05/2567</b></div>
                        <div className="border border-[#e3edf3] bg-white rounded-xl p-2.5"><small className="block text-[#64788a] text-[11px] font-[800] mb-1">Time</small><b className="text-[13px] text-[#102a43]">09:15</b></div>
                        <div className="border border-[#e3edf3] bg-white rounded-xl p-2.5"><small className="block text-[#64788a] text-[11px] font-[800] mb-1">Type</small><b className="text-[13px] text-[#102a43]">OPD</b></div>
                        <div className="border border-[#e3edf3] bg-white rounded-xl p-2.5"><small className="block text-[#64788a] text-[11px] font-[800] mb-1">Doctor</small><b className="text-[13px] text-[#102a43]">สพ.ญ. นัทธสร</b></div>
                        <div className="border border-[#e3edf3] bg-white rounded-xl p-2.5"><small className="block text-[#64788a] text-[11px] font-[800] mb-1">Status</small><b className="text-[13px] text-[#0f8f83]">กำลังตรวจ</b></div>
                      </div>

                      {/* S */}
                      <div className="border border-[#e3edf3] bg-white rounded-2xl overflow-hidden shadow-sm">
                        <div className="flex items-center justify-between p-[12px_14px] bg-[#fbfdfe] border-b border-[#e3edf3]">
                          <div className="flex items-center gap-2.5 font-[900] text-[#102a43]"><div className="w-8 h-8 rounded-full grid place-items-center bg-[#e9f7f4] text-[#0f8f83] text-[14px]">S</div> Subjective</div>
                        </div>
                        <div className="p-[14px_16px] text-[14px] leading-relaxed">
                          <textarea className="w-full border-0 outline-none resize-y min-h-[84px] text-[#102a43] bg-transparent" defaultValue={`CC: อาเจียน 2 ครั้ง ตั้งแต่เช้า ไม่กินอาหาร\n\nHistory: อาเจียนเป็นอาหารเมื่อคืน 1 ครั้ง เช้านี้ 1 ครั้ง ไม่ถ่ายเหลว ปกติกินอาหารได้ดี ไม่เคยมีอาการแบบนี้มาก่อน`}></textarea>
                        </div>
                      </div>

                      {/* O */}
                      <div className="border border-[#e3edf3] bg-white rounded-2xl overflow-hidden shadow-sm">
                        <div className="flex items-center justify-between p-[12px_14px] bg-[#fbfdfe] border-b border-[#e3edf3]">
                          <div className="flex items-center gap-2.5 font-[900] text-[#102a43]"><div className="w-8 h-8 rounded-full grid place-items-center bg-[#e9f7f4] text-[#0f8f83] text-[14px]">O</div> Objective</div>
                        </div>
                        <div className="p-[14px_16px] text-[14px] leading-relaxed">
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mb-3">
                            <div className="border border-[#e3edf3] rounded-xl p-2.5 text-center"><small className="block text-[#64788a] font-[800] text-[11px]">T</small><b className="text-[18px] text-[#102a43]">38.6</b> <span className="text-[11px] text-[#64788a]">°C</span></div>
                            <div className="border border-[#e3edf3] rounded-xl p-2.5 text-center"><small className="block text-[#64788a] font-[800] text-[11px]">PR</small><b className="text-[18px] text-[#102a43]">112</b> <span className="text-[11px] text-[#64788a]">bpm</span></div>
                            <div className="border border-[#e3edf3] rounded-xl p-2.5 text-center"><small className="block text-[#64788a] font-[800] text-[11px]">RR</small><b className="text-[18px] text-[#102a43]">28</b> <span className="text-[11px] text-[#64788a]">rpm</span></div>
                            <div className="border border-[#e3edf3] rounded-xl p-2.5 text-center"><small className="block text-[#64788a] font-[800] text-[11px]">BCS</small><b className="text-[18px] text-[#102a43]">5/9</b></div>
                            <div className="border border-[#e3edf3] rounded-xl p-2.5 text-center"><small className="block text-[#64788a] font-[800] text-[11px]">Hydration</small><b className="text-[16px] text-[#102a43]">ปกติ</b></div>
                            <div className="border border-[#e3edf3] rounded-xl p-2.5 text-center"><small className="block text-[#64788a] font-[800] text-[11px]">MM</small><b className="text-[16px] text-[#102a43]">ชมพู</b></div>
                          </div>
                          <div className="text-[#102a43]">Abdominal palpation soft, non-painful</div>
                        </div>
                      </div>

                      {/* A */}
                      <div className="border border-[#e3edf3] bg-white rounded-2xl overflow-hidden shadow-sm">
                        <div className="flex items-center justify-between p-[12px_14px] bg-[#fbfdfe] border-b border-[#e3edf3]">
                          <div className="flex items-center gap-2.5 font-[900] text-[#102a43]"><div className="w-8 h-8 rounded-full grid place-items-center bg-[#e9f7f4] text-[#0f8f83] text-[14px]">A</div> Assessment</div>
                        </div>
                        <div className="p-[14px_16px] text-[14px] leading-relaxed text-[#102a43]">
                          <b>Vomiting</b><br/>Differential Dx: Pancreatitis, Foreign body, Dietary indiscretion, Gastroenteritis
                        </div>
                      </div>

                      {/* P */}
                      <div className="border border-[#e3edf3] bg-white rounded-2xl overflow-hidden shadow-sm">
                        <div className="flex items-center justify-between p-[12px_14px] bg-[#fbfdfe] border-b border-[#e3edf3]">
                          <div className="flex items-center gap-2.5 font-[900] text-[#102a43]"><div className="w-8 h-8 rounded-full grid place-items-center bg-[#e9f7f4] text-[#0f8f83] text-[14px]">P</div> Plan</div>
                        </div>
                        <div className="p-[14px_16px] text-[14px] leading-relaxed text-[#102a43]">
                          <ul className="m-0 pl-5">
                            <li>CBC, Chemistry, SDMA</li>
                            <li>cPL</li>
                            <li>Maropitant 16 mg IV</li>
                            <li>LRS 500 ml IV</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* จำลองข้อมูลปัญหาผู้ป่วย (Problem List Sub-tab) */}
                  {soapSubTab === 'problems' && (
                    <div className="space-y-3 animate-fadeIn flex-1">
                      <div className="bg-white border border-[#e3edf3] rounded-2xl p-4 shadow-sm">
                        <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-md">Active / Acute</span>
                        <h4 className="text-[#102a43] font-bold text-sm m-0 mt-2">1. อาเจียนเฉียบพลันและเบื่ออาหาร (Acute Vomiting & Anorexia)</h4>
                        <p className="text-xs text-[#64788a] m-0 mt-1">เริ่มแสดงอาการตั้งแต่เช้าวันนี้ อาเจียนออกมาเป็นเศษอาหารและน้ำลายสีขาวขุ่น</p>
                      </div>
                      <div className="bg-white border border-[#e3edf3] rounded-2xl p-4 shadow-sm">
                        <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-md">Active / Chronic</span>
                        <h4 className="text-[#102a43] font-bold text-sm m-0 mt-2">2. โรคไตเรื้อรังระยะที่ 2 (Chronic Kidney Disease Stage 2)</h4>
                        <p className="text-xs text-[#64788a] m-0 mt-1">อยู่ระหว่างการควบคุมอาหารประกอบโรคไตเรื้อรังร่วมกับยาลดโปรตีนรั่วในปัสสาวะ</p>
                      </div>
                    </div>
                  )}

                  {/* จำลองข้อมูลใบสั่งการรักษา (Orders Sub-tab) */}
                  {soapSubTab === 'orders' && (
                    <div className="bg-white border border-[#e3edf3] rounded-2xl p-4 shadow-sm space-y-3 animate-fadeIn flex-1">
                      <h4 className="text-[#102a43] font-bold text-sm m-0 border-b pb-2"><ClipboardList size={14} className="inline mr-1.5 text-[#0f8f83]" /> รายการคำสั่งการรักษาตรวจแล็บห้องปฏิบัติการ (Lab Orders)</h4>
                      <label className="flex items-center gap-3 text-sm text-[#102a43] cursor-pointer"><input type="checkbox" defaultChecked className="w-4 h-4" /> เจาะตรวจเลือดประจำวัน (CBC + Blood Chemistry + SDMA)</label>
                      <label className="flex items-center gap-3 text-sm text-[#102a43] cursor-pointer"><input type="checkbox" defaultChecked className="w-4 h-4" /> ชุดตรวจคัดกรองตับอ่อนอักเสบสุนัขสากล (cPL Snap Test)</label>
                      
                      <h4 className="text-[#102a43] font-bold text-sm m-0 border-b pb-2 pt-2"><Syringe size={14} className="inline mr-1.5 text-[#0f8f83]" /> รายการคำสั่งให้ยาและสารน้ำหัตถการ (Treatment Orders)</h4>
                      <label className="flex items-center gap-3 text-sm text-[#102a43] cursor-pointer"><input type="checkbox" defaultChecked className="w-4 h-4" /> Maropitant Injection 10mg/mL - ขนาด 3.2 mL ฉีดเข้าหลอดเลือดดำ (IV STAT)</label>
                      <label className="flex items-center gap-3 text-sm text-[#102a43] cursor-pointer"><input type="checkbox" defaultChecked className="w-4 h-4" /> ให้สารน้ำ Lactated Ringer's Solution (LRS) อัตราความเร็ว 90 mL/hr</label>
                    </div>
                  )}

                  {/* จำลองข้อมูลใบสั่งยาเดินทางกลับบ้าน (Prescription Sub-tab) */}
                  {soapSubTab === 'prescription' && (
                    <div className="bg-white border border-[#e3edf3] rounded-2xl p-4 shadow-sm animate-fadeIn flex-1">
                      <h4 className="text-[#102a43] font-bold text-sm m-0 border-b pb-2"><Pill size={14} className="inline mr-1.5 text-[#0f8f83]" /> ยาสั่งกลับบ้าน (Take-home Medications)</h4>
                      <table className="w-full text-xs text-left mt-3 border-collapse">
                        <thead>
                          <tr className="bg-gray-50 text-[#64788a] font-bold"><th className="p-2">ชื่อยา/ความเข้มข้น</th><th className="p-2">จำนวน</th><th className="p-2">วิธีใช้และวิธีคำนวณโดส</th></tr>
                        </thead>
                        <tbody className="text-[#102a43]">
                          <tr className="border-b"><td className="p-2 font-bold">Semintra 4 mg/mL (Telmisartan)</td><td className="p-2">1 ขวด</td><td className="p-2 text-gray-600">กินครั้งละ 1.5 mL ป้อนเข้าทางช่องปาก วันละ 1 ครั้ง สำหรับคุมโปรตีนรั่วในปัสสาวะ</td></tr>
                          <tr className="border-b"><td className="p-2 font-bold">Nefroguard Supplement Tablets</td><td className="p-2">30 เม็ด</td><td className="p-2 text-gray-600">กินครั้งละ 1 เม็ด พร้อมอาหาร เช้า-เย็น เพื่อช่วยจับฟอสเฟตส่วนเกินในทางเดินอาหาร</td></tr>
                          <tr><td className="p-2 font-bold">Cerenia 16mg Tablets (Maropitant)</td><td className="p-2">4 เม็ด</td><td className="p-2 text-gray-600">กินครั้งละ 1 เม็ด วันละ 1 ครั้ง ติดต่อเนื่อง 4 วันเพื่อบรรเทาอาการคลื่นไส้ลดอาเจียน</td></tr>
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* จำลองบันทึกแพทย์และพยาบาล (Note Sub-tab) */}
                  {soapSubTab === 'note' && (
                    <div className="bg-white border border-[#e3edf3] rounded-2xl p-4 shadow-sm animate-fadeIn flex-1">
                      <h4 className="text-[#102a43] font-bold text-sm m-0 border-b pb-2"><FileText size={14} className="inline mr-1.5 text-[#0f8f83]" /> บันทึกความเห็นแพทย์ผู้ทำการตรวจ (Doctor & Nursing Notes)</h4>
                      <div className="text-xs text-[#102a43] space-y-3 mt-3">
                        <div className="p-2.5 bg-gray-50 rounded-lg">
                          <span className="text-gray-400 font-bold">12/05/2569 09:30 · สพ.ญ. นัทธสร:</span>
                          <p className="m-0 mt-1 text-gray-700">เจ้าของกังวลเรื่องน้อง Lucky ซึมลงมากหลังอาเจียน แนะนำแอดมิทเฝ้าระวังสัญญาณชีพและคุมภาวะขาดน้ำเฉียบพลัน หากผลเลือดแล็บสกรีนค่าตับอ่อนออกให้แจ้งแพทย์ทันที</p>
                        </div>
                        <div className="p-2.5 bg-gray-50 rounded-lg">
                          <span className="text-gray-400 font-bold">12/05/2569 09:18 · พยาบาลหน้าห้องตรวจ:</span>
                          <p className="m-0 mt-1 text-gray-700">ชั่งน้ำหนักพบค่าน้ำหนักลดลงไป 0.5 kg จากการตรวจรอบที่แล้ว ตรวจสอบเบื้องต้นช่องปากแห้งเล็กน้อย คาดว่าเกิดจากเสียน้ำ</p>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            )}

            {/* 2. หน้าแสดงผลแท็บ HISTORY */}
            {currentNavTab === 'history' && (
              <div className="p-5 overflow-y-auto h-full bg-[#f6f9fb] space-y-3 animate-fadeIn">
                <h4 className="m-0 text-base text-[#102a43]">ประวัติการเข้ารับการรักษาย้อนหลัง (Visit History)</h4>
                <div className="bg-white border border-[#e3edf3] rounded-xl p-4 shadow-sm">
                  <div className="flex justify-between text-xs text-[#64788a] mb-1"><b>Visit: #V26-00412</b> <span>20/04/2567 · Dr. นัทธสร</span></div>
                  <b className="text-sm text-[#102a43]">OPD Follow-up CKD Stage 2</b>
                  <p className="text-xs text-[#64788a] mt-2 mb-0">คนไข้เข้าตรวจตามนัดเพื่อติดตามโรคไตเรื้อรัง นัดเจาะเลือดสกรีนไต ผลแล็บค่อนข้างคงที่ แนะนำคุมอาหารประกอบโรคไตต่อเนื่อง</p>
                </div>
                <div className="bg-white border border-[#e3edf3] rounded-xl p-4 shadow-sm">
                  <div className="flex justify-between text-xs text-[#64788a] mb-1"><b>Visit: #V26-00105</b> <span>15/01/2567 · Dr. วิทยา</span></div>
                  <b className="text-sm text-[#102a43]">Annual Physical Checkup & Vaccine</b>
                  <p className="text-xs text-[#64788a] mt-2 mb-0">ตรวจร่างกายประจำปีปกติ ทำการเอกซเรย์ช่องอกคัดกรองขนาดหัวใจ และฉีดวัคซีนรวมสุนัขประจำปี</p>
                </div>
              </div>
            )}

            {/* 3. หน้าแสดงผลแท็บ LAB */}
            {currentNavTab === 'lab' && (
              <div className="p-5 overflow-y-auto h-full bg-[#f6f9fb] animate-fadeIn">
                <div className="bg-white border border-[#e3edf3] rounded-xl p-5 shadow-sm">
                  <h4 className="m-0 mb-4 text-base text-[#102a43] border-b pb-2">ผลตรวจทางห้องปฏิบัติการ (Laboratory Reports)</h4>
                  <table className="w-full text-sm border-collapse text-left">
                    <thead>
                      <tr className="text-xs uppercase text-[#64788a] bg-gray-50"><th className="p-2">Parameter</th><th className="p-2">Result</th><th className="p-2">Reference Range</th><th className="p-2">Status</th></tr>
                    </thead>
                    <tbody className="text-[#102a43]">
                      <tr className="border-b"><td className="p-2 font-bold">Creatinine</td><td className="p-2 text-red-500 font-bold">2.1 mg/dL</td><td className="p-2">0.5 - 1.8 mg/dL</td><td className="p-2 text-red-500">High <AlertTriangle size={12} className="inline ml-1 text-red-500" /></td></tr>
                      <tr className="border-b"><td className="p-2 font-bold">BUN</td><td className="p-2 text-red-500 font-bold">34.2 mg/dL</td><td className="p-2">7.0 - 27.0 mg/dL</td><td className="p-2 text-red-500">High <AlertTriangle size={12} className="inline ml-1 text-red-500" /></td></tr>
                      <tr className="border-b"><td className="p-2 font-bold">SDMA</td><td className="p-2 text-red-500 font-bold">18 µg/dL</td><td className="p-2">0 - 14 µg/dL</td><td className="p-2 text-red-500">High <AlertTriangle size={12} className="inline ml-1 text-red-500" /></td></tr>
                      <tr><td className="p-2 font-bold">HCT</td><td className="p-2">43 %</td><td className="p-2">37 - 55 %</td><td className="p-2 text-green-600">Normal</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 4. หน้าแสดงผลแท็บ IMAGING */}
            {currentNavTab === 'imaging' && (
              <div className="p-5 overflow-y-auto h-full bg-[#f6f9fb] space-y-3 animate-fadeIn">
                <h4 className="m-0 text-base text-[#102a43]">ผลตรวจทางรังสีวิทยาเเละภาพถ่าย (Imaging Reports)</h4>
                <div className="bg-white border border-[#e3edf3] rounded-xl p-4 shadow-sm">
                  <div className="flex justify-between text-xs text-[#64788a] mb-2"><b>Ultrasound Abdomen</b> <span>20/04/2567</span></div>
                  <p className="text-sm text-[#102a43] m-0 font-bold">Kidneys Study:</p>
                  <p className="text-xs text-[#64788a] mt-1 m-0">Both kidneys appear small with irregular borders. Decreased corticomedullary differentiation which is highly suggestive of underlying Chronic Kidney Disease (CKD).</p>
                </div>
              </div>
            )}

            {/* 5. หน้าแสดงผลแท็บ MEDICATION */}
            {currentNavTab === 'medication' && (
              <div className="p-5 overflow-y-auto h-full bg-[#f6f9fb] space-y-3 animate-fadeIn">
                <h4 className="m-0 text-base text-[#102a43]">รายการยาที่คนไข้ได้รับอยู่ (Medication Profile)</h4>
                <div className="bg-white border border-[#e3edf3] rounded-xl p-4 shadow-sm space-y-2 text-sm">
                  <div className="flex justify-between border-b pb-2"><b>1. Semintra 4 mg/mL (Telmisartan)</b> <span className="text-xs text-[#0f8f83] font-bold">Active</span></div>
                  <p className="text-xs text-[#64788a] m-0">ปริมาณการกิน: 1.5 mL วันละ 1 ครั้ง ทางช่องปาก เพื่อช่วยควบคุมแรงดันในหน่วยไตและลดอัตราโปรตีนรั่วลงปัสสาวะ</p>
                </div>
              </div>
            )}

            {/* 6. หน้าแสดงผลแท็บ VACCINE */}
            {currentNavTab === 'vaccine' && (
              <div className="p-5 overflow-y-auto h-full bg-[#f6f9fb] animate-fadeIn">
                <div className="bg-white border border-[#e3edf3] rounded-xl p-5 shadow-sm">
                  <h4 className="m-0 mb-3 text-base text-[#102a43]">บันทึกการได้รับวัคซีน (Vaccination Records)</h4>
                  <ul className="text-sm space-y-2 text-[#64788a] m-0 pl-4">
                    <li><b className="text-[#102a43]">วัคซีนโรคพิษสุนัขบ้า (Rabies Vaccine):</b> ฉีดล่าสุดเมื่อ 15/01/2567 · นัดหมายครั้งถัดไป 15/01/2570</li>
                    <li><b className="text-[#102a43]">วัคซีนโรคสุนัขรวม 5 โรค (DHPPiL):</b> ฉีดล่าสุดเมื่อ 15/01/2567 · นัดหมายครั้งถัดไป 15/01/2570</li>
                  </ul>
                </div>
              </div>
            )}

            {/* 7. หน้าแสดงผลแท็บ DOCUMENTS */}
            {currentNavTab === 'documents' && (
              <div className="p-5 overflow-y-auto h-full bg-[#f6f9fb] animate-fadeIn">
                <div className="bg-white border border-[#e3edf3] rounded-xl p-4 shadow-sm text-center">
                  <p className="text-sm text-[#64788a] m-0 py-4"><FileText size={14} className="inline mr-1.5 text-[#9ab0bc]" /> ไม่พบเอกสารหรือใบรับรองแพทย์ภายนอกที่ถูกอัปโหลดในระบบขณะนี้</p>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* ================= RIGHT PANEL: Clinical Summary ================= */}
        <div className="flex flex-col lg:col-span-2 xl:col-span-1 bg-white border border-[#e3edf3] rounded-[18px] shadow-[0_14px_35px_rgba(16,42,67,.07)] overflow-hidden">
          <div className="p-[16px_18px] border-b border-[#e3edf3] flex items-center justify-between shrink-0">
            <h3 className="m-0 text-[17px] font-bold text-[#102a43]">Clinical Summary</h3>
            <span className="bg-[#edf5ff] text-[#276db6] px-2 py-1 rounded-full text-[11px] font-[850] uppercase">{summaryTab} View</span>
          </div>
          
          {/* ส่วนปุ่มสลับแถบข้อมูลเมนู Clinical Summary */}
          <div className="bg-[#fbfdfe] border-b border-[#e3edf3] p-[12px_14px] shrink-0">
            <div className="grid grid-cols-4 gap-1 bg-[#f2f6f8] p-1 rounded-xl text-[12px]">
              <button 
                onClick={() => setSummaryTab('lab')}
                className={`py-1.5 rounded-lg font-[800] border-0 cursor-pointer transition-all ${summaryTab === 'lab' ? 'bg-white text-[#0f8f83] shadow-sm' : 'text-[#64788a] bg-transparent hover:bg-white/50'}`}
              >
                Lab
              </button>
              <button 
                onClick={() => setSummaryTab('summary')}
                className={`py-1.5 rounded-lg font-[800] border-0 cursor-pointer transition-all ${summaryTab === 'summary' ? 'bg-white text-[#0f8f83] shadow-sm' : 'text-[#64788a] bg-transparent hover:bg-white/50'}`}
              >
                Summary
              </button>
              <button 
                onClick={() => setSummaryTab('med')}
                className={`py-1.5 rounded-lg font-[800] border-0 cursor-pointer transition-all ${summaryTab === 'med' ? 'bg-white text-[#0f8f83] shadow-sm' : 'text-[#64788a] bg-transparent hover:bg-white/50'}`}
              >
                Med
              </button>
              <button 
                onClick={() => setSummaryTab('image')}
                className={`py-1.5 rounded-lg font-[800] border-0 cursor-pointer transition-all ${summaryTab === 'image' ? 'bg-white text-[#0f8f83] shadow-sm' : 'text-[#64788a] bg-transparent hover:bg-white/50'}`}
              >
                Image
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-3 bg-[#f6f9fb] space-y-3">
            
            {/* 1. แสดงเมื่อคลิกแถบ LAB */}
            {summaryTab === 'lab' && (
              <>
                {/* Recent Lab */}
                <div className="bg-white border border-[#8dd7ce] shadow-[0_8px_22px_rgba(15,143,131,.08)] rounded-[16px] overflow-hidden animate-fadeIn">
                  <h3 className="m-0 p-[13px_14px] border-b border-[#e3edf3] text-[15px] flex justify-between bg-white text-[#102a43] sticky top-0">
                    Recent Lab <a href="#" className="text-[#0f8f83] text-[12px] no-underline font-normal">ดูทั้งหมด</a>
                  </h3>
                  <div className="p-[13px_14px]">
                    <div className="grid grid-cols-[1fr_auto] gap-2.5 py-2.5 border-b border-[#e3edf3] text-[13px]">
                      <div><b className="text-[#102a43]">Creatinine</b><br/><span className="text-[#64788a] text-[11px]">20/04/2567</span></div>
                      <div className="text-[#e95050] font-[900]">2.1 mg/dL</div>
                    </div>
                    <div className="grid grid-cols-[1fr_auto] gap-2.5 py-2.5 border-b border-[#e3edf3] text-[13px]">
                      <div><b className="text-[#102a43]">SDMA</b><br/><span className="text-[#64788a] text-[11px]">20/04/2567</span></div>
                      <div className="text-[#e95050] font-[900]">18 µg/dL</div>
                    </div>
                    <div className="grid grid-cols-[1fr_auto] gap-2.5 py-2.5 border-b border-[#e3edf3] text-[13px]">
                      <div><b className="text-[#102a43]">UPC</b><br/><span className="text-[#64788a] text-[11px]">20/04/2567</span></div>
                      <div className="text-[#e95050] font-[900]">2.1</div>
                    </div>
                    <div className="grid grid-cols-[1fr_auto] gap-2.5 pt-2.5 text-[13px]">
                      <div><b className="text-[#102a43]">HCT</b><br/><span className="text-[#64788a] text-[11px]">20/04/2567</span></div>
                      <div className="text-[#0f9f6e] font-[900]">43%</div>
                    </div>
                  </div>
                </div>

                {/* Lab Trend Graph */}
                <div className="bg-white border border-[#8dd7ce] shadow-[0_8px_22px_rgba(15,143,131,.08)] rounded-[16px] overflow-hidden">
                  <h3 className="m-0 p-[13px_14px] border-b border-[#e3edf3] text-[15px] flex justify-between bg-white text-[#102a43] sticky top-0">
                    Lab Trend <a href="#" className="text-[#0f8f83] text-[12px] no-underline font-normal">Graph</a>
                  </h3>
                  <div className="p-[13px_14px]">
                    <b className="text-[13px] text-[#102a43] block mb-2">Creatinine (mg/dL)</b>
                    <div className="h-[145px] border border-[#e3edf3] rounded-[14px] bg-white overflow-hidden">
                      <svg viewBox="0 0 340 145" preserveAspectRatio="none" className="w-full h-full">
                        <polyline points="18,100 88,90 158,72 228,55 318,35" fill="none" stroke="#0f8f83" strokeWidth="4"/>
                        <circle cx="18" cy="100" r="5" fill="#0f8f83"/>
                        <circle cx="88" cy="90" r="5" fill="#0f8f83"/>
                        <circle cx="158" cy="72" r="5" fill="#0f8f83"/>
                        <circle cx="228" cy="55" r="5" fill="#0f8f83"/>
                        <circle cx="318" cy="35" r="5" fill="#0f8f83"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* 2. แสดงเมื่อคลิกแถบ SUMMARY */}
            {summaryTab === 'summary' && (
              <>
                <div className="bg-white border border-[#e3edf3] rounded-[16px] overflow-hidden animate-fadeIn">
                  <h3 className="m-0 p-[13px_14px] border-b border-[#e3edf3] text-[15px] bg-white text-[#102a43] sticky top-0"><Sparkles size={16} className="inline mr-2 text-[#0f8f83]" /> AI Clinical Summary</h3>
                  <div className="p-[13px_14px]">
                    <div className="bg-gradient-to-b from-[#f4fbff] to-[#f8fffd] border border-[#d8edf1] rounded-[15px] p-[13px] text-[13px] leading-relaxed text-[#102a43]">
                      <b>Last Visit Summary:</b>
                      <ul className="m-0 pl-5 mb-2">
                        <li>พบภาวะ CKD Stage 2 มีค่า Creatinine ทรงตัวที่ระดับ 2.1 mg/dL</li>
                        <li>ตรวจพบโปรตีนรั่วในปัสสาวะ (UPC 2.1)</li>
                      </ul>
                      <b>Today's Assessment:</b>
                      <ul className="m-0 pl-5">
                        <li>มีอาการแทรกซ้อนอาเจียนเฉียบพลัน 2 ครั้ง และเบื่ออาหาร</li>
                        <li>แนะนำให้ทำการตรวจคัดกรองค่าตับอ่อน (cPL test) เพิ่มเติม เพื่อแยกแยะภาวะตับอ่อนอักเสบแทรกซ้อน</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-[#e3edf3] rounded-[16px] overflow-hidden">
                  <h3 className="m-0 p-[13px_14px] border-b border-[#e3edf3] text-[15px] bg-white text-[#102a43] sticky top-0">Problem List</h3>
                  <div className="p-[13px_14px]">
                    <div className="flex gap-2.5 py-2.5 border-b border-[#e3edf3]">
                      <div className="w-[34px] h-[34px] rounded-xl grid place-items-center bg-[#fff6e9]"><Heart size={18} className="text-orange-500" /></div>
                      <div>
                        <b className="text-[13px] text-[#102a43]">CKD Stage 2</b>
                        <small className="block text-[#64788a] text-[11px]">IRIS Staging system standard</small>
                      </div>
                    </div>
                    <div className="flex gap-2.5 pt-2.5">
                      <div className="w-[34px] h-[34px] rounded-xl grid place-items-center bg-[#fff6e9]"><AlertTriangle size={18} className="text-amber-500" /></div>
                      <div>
                        <b className="text-[13px] text-[#102a43]">Proteinuria</b>
                        <small className="block text-[#64788a] text-[11px]">UPC อยู่ที่ระดับ 2.1 (High Pro)</small>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* 3. แสดงเมื่อคลิกแถบ MED */}
            {summaryTab === 'med' && (
              <div className="bg-white border border-[#e3edf3] rounded-[16px] overflow-hidden animate-fadeIn">
                <h3 className="m-0 p-[13px_14px] border-b border-[#e3edf3] text-[15px] bg-white text-[#102a43] sticky top-0">Current Medications</h3>
                <div className="p-[13px_14px] space-y-3">
                  <div className="p-3 bg-gray-50 border border-[#e3edf3] rounded-xl">
                    <div className="flex justify-between items-center"><b className="text-[14px] text-[#102a43]">Semintra 4 mg/mL</b><span className="text-xs bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full">ยาทาน</span></div>
                    <p className="text-xs text-[#64788a] m-0 mt-1">กินครั้งละ 1.5 mL ช่องปาก วันละ 1 ครั้ง (ลดโปรตีนรั่วในปัสสาวะ)</p>
                  </div>
                  <div className="p-3 bg-gray-50 border border-[#e3edf3] rounded-xl">
                    <div className="flex justify-between items-center"><b className="text-[14px] text-[#102a43]">Nefroguard Tablet</b><span className="text-xs bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full">ยาทาน</span></div>
                    <p className="text-xs text-[#64788a] m-0 mt-1">กินครั้งละ 1 เม็ด พร้อมอาหาร วันละ 2 ครั้ง (บำรุงและดักจับฟอสเฟต)</p>
                  </div>
                </div>
              </div>
            )}

            {/* 4. แสดงเมื่อคลิกแถบ IMAGE */}
            {summaryTab === 'image' && (
              <div className="bg-white border border-[#e3edf3] rounded-[16px] overflow-hidden animate-fadeIn">
                <h3 className="m-0 p-[13px_14px] border-b border-[#e3edf3] text-[15px] bg-white text-[#102a43] sticky top-0">Recent Imaging Records</h3>
                <div className="p-[13px_14px] space-y-3">
                  <div className="border border-[#e3edf3] rounded-xl p-3 bg-white hover:border-[#0f8f83] cursor-pointer transition-colors">
                    <div className="flex justify-between text-xs text-[#64788a] mb-1"><span>Ultrasound Abdomen</span> <span>20/04/2567</span></div>
                    <b className="text-[13px] text-[#102a43] block mb-1">ทั้งไตซ้ายและขวามีขนาดเล็กเล็กน้อย</b>
                    <p className="text-xs text-[#64788a] m-0">Corticomedullary differentiation ลดลง สอดคล้องกับพยาธิสภาพของโรคไตเรื้อรัง (CKD)</p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}