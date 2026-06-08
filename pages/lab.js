// src/pages/lab.js
import React, { useState } from 'react';

// ข้อมูลจำลองสำหรับผลการตรวจแล็บรายบุคคล (Mock Laboratory Data)
const mockLabData = {
  'LAB-240606-001': {
    id: 'LAB-240606-001',
    pet: 'Lucky',
    species: 'Dog',
    mrn: 'P240001',
    priority: 'STAT',
    doctor: 'สพ.ญ. นัทธสร สุขใจ',
    tests: [
      { name: 'WBC', defaultVal: '12.5', range: '6.0 - 17.0', unit: 'x10³/µL', isHigh: false },
      { name: 'HCT', defaultVal: '42.0', range: '37.0 - 55.0', unit: '%', isHigh: false },
      { name: 'Creatinine', defaultVal: '2.4', range: '0.5 - 1.8', unit: 'mg/dL', isHigh: true }
    ]
  },
  'LAB-240606-002': {
    id: 'LAB-240606-002',
    pet: 'Mochi',
    species: 'Cat',
    mrn: 'P240155',
    priority: 'Pending',
    doctor: 'น.สพ. วิทยา รักษาดี',
    tests: [
      { name: 'FeLV Ag (Snap Test)', defaultVal: 'Negative', range: 'Negative', unit: 'Result', isHigh: false },
      { name: 'FIV Ab (Snap Test)', defaultVal: 'Negative', range: 'Negative', unit: 'Result', isHigh: false },
      { name: 'ALT (SGPT)', defaultVal: '115.0', range: '12.0 - 86.0', unit: 'U/L', isHigh: true }
    ]
  }
};

// ข้อมูลจำลองสำหรับ Lab Catalog
const mockCatalog = [
  { code: 'L-001', name: 'Complete Blood Count (CBC)', category: 'Hematology', specimen: 'Whole Blood (EDTA)', tat: '15 Mins', price: '250 ฿' },
  { code: 'L-002', name: 'Blood Chemistry Profile (Liver/Kidney)', category: 'Biochemistry', specimen: 'Serum/Plasma', tat: '20 Mins', price: '650 ฿' },
  { code: 'L-003', name: 'Canine Pancreatic Lipase (cPL)', category: 'Snap Test', specimen: 'Serum', tat: '10 Mins', price: '850 ฿' },
  { code: 'L-004', name: 'Urinalysis (UA)', category: 'Clinical Pathology', specimen: 'Urine', tat: '30 Mins', price: '180 ฿' },
];

export default function LabPage() {
  // State สำหรับจัดการเลือกคิวสิ่งส่งตรวจฝั่งซ้าย
  const [selectedLabId, setSelectedLabId] = useState('LAB-240606-001');
  
  // State สำหรับคุมมุมมองหลักของเพจจำลอง ('queue' | 'catalog' | 'batch' | 'manual')
  const [toolbarView, setToolbarView] = useState('queue');

  // State สำหรับการแสดงผลระบบแจ้งเตือน Toast Alert ด้านบนจอ
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const activeLab = mockLabData[selectedLabId];

  return (
    <div className="h-screen flex flex-col p-4 md:p-6 bg-[#f6f9fb] overflow-hidden relative">
      
      {/* ระบบ Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#102a43] text-white text-sm px-6 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-white/10 animate-fadeIn">
          <span className="font-bold">{toastMessage}</span>
          <button onClick={() => setToastMessage('')} className="bg-transparent border-0 text-white/50 hover:text-white cursor-pointer ml-2">✕</button>
        </div>
      )}

      {/* Topbar ของหน้า Lab */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] lg:grid-cols-[1fr_450px] gap-4 items-center mb-4 shrink-0">
        <div>
          <h2 className="m-0 text-[26px] md:text-[28px] font-bold text-[#102a43]">Laboratory Services</h2>
          <p className="m-0 mt-1 text-[#64788a] text-sm">ระบบจัดการสิ่งส่งตรวจ การตรวจวิเคราะห์ และรายงานผลแล็บ</p>
        </div>
        <div className="bg-white border border-[#e3edf3] rounded-2xl p-[13px_16px] text-[#7a8fa0] shadow-[0_14px_35px_rgba(16,42,67,.07)] text-sm w-full">
          <input type="text" placeholder="🔎 Search specimen ID / patient / MRN / test name..." className="w-full bg-transparent border-0 outline-none" />
        </div>
      </div>

      {/* Toolbar - ปรับปรุงโครงสร้างให้คลิกสลับโหมดการทำงานได้จริง */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 shrink-0 gap-3">
        <div className="text-[13px] text-[#64788a]">
          Home › Laboratory › {toolbarView === 'queue' && 'Pending Specimens'} {toolbarView === 'catalog' && 'Lab Test Catalog Master'} {toolbarView === 'batch' && 'Batch Report Approval'} {toolbarView === 'manual' && 'Manual Result Entry Form'}
        </div>
        <div className="flex flex-wrap gap-2.5">
          <button 
            onClick={() => setToolbarView(toolbarView === 'queue' ? 'catalog' : 'queue')}
            className={`border rounded-xl px-[15px] py-[10px] font-[850] cursor-pointer text-sm transition-all ${toolbarView === 'catalog' ? 'bg-[#0f8f83] text-white border-[#0f8f83] shadow-sm' : 'bg-white text-[#35546a] border-[#e3edf3] hover:bg-[#f6f9fb]'}`}
          >
            📋 Lab Catalog
          </button>
          <button 
            onClick={() => setToolbarView(toolbarView === 'batch' ? 'queue' : 'batch')}
            className={`border rounded-xl px-[15px] py-[10px] font-[850] cursor-pointer text-sm transition-all ${toolbarView === 'batch' ? 'bg-[#0f8f83] text-white border-[#0f8f83] shadow-sm' : 'bg-white text-[#35546a] border-[#e3edf3] hover:bg-[#f6f9fb]'}`}
          >
            📤 Batch Report
          </button>
          <button 
            onClick={() => setToolbarView(toolbarView === 'manual' ? 'queue' : 'manual')}
            className={`border rounded-xl px-[15px] py-[10px] font-[850] cursor-pointer text-sm transition-all ${toolbarView === 'manual' ? 'bg-[#0f8f83] text-white border-[#0f8f83] shadow-sm' : 'border-0 bg-gradient-to-r from-[#0f8f83] to-[#0b6d87] text-white shadow-sm hover:opacity-90 flex items-center gap-2'}`}
          >
            <span>➕</span> Manual Entry
          </button>
        </div>
      </div>

      {/* พื้นที่แสดงคอนเทนต์แบบแปรผันตามแถบเมนูด้านบน */}
      <div className="flex-1 min-h-0 overflow-hidden">
        
        {/* VIEW MODE 1: หน้าจอหลักคิวการทำงาน (SPECIMEN QUEUE & RESULT ENTRY) */}
        {toolbarView === 'queue' && (
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] xl:grid-cols-[380px_1fr] gap-4 lg:gap-[18px] h-full overflow-hidden animate-fadeIn">
            {/* กล่องซ้าย: Lab Worklist */}
            <div className="bg-white border border-[#e3edf3] rounded-[18px] shadow-[0_14px_35px_rgba(16,42,67,.07)] flex flex-col overflow-hidden h-full">
              <div className="p-4 md:p-[16px_20px] border-b border-[#e3edf3] bg-[#fbfdfe] shrink-0">
                <h3 className="m-0 text-[16px] font-bold text-[#102a43]">Specimen Queue</h3>
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
                <div 
                  onClick={() => setSelectedLabId('LAB-240606-001')}
                  className={`border rounded-xl p-3 cursor-pointer transition-all ${selectedLabId === 'LAB-240606-001' ? 'border-[#8dd7ce] bg-[#effaf7] shadow-sm' : 'border-[#e3edf3] bg-white hover:border-[#8dd7ce]'}`}
                >
                  <div className="flex justify-between mb-2">
                    <b className="text-[#0f8f83] text-[12px]">LAB-240606-001</b>
                    <span className="text-[10px] font-black text-[#e95050] bg-[#fff0f0] px-2 py-0.5 rounded">STAT</span>
                  </div>
                  <b className="text-[14px] text-[#102a43] block">Lucky (Dog) - MRN P240001</b>
                  <div className="text-[12px] text-[#64788a] mt-1">Test: CBC, Blood Chemistry, cPL</div>
                </div>

                <div 
                  onClick={() => setSelectedLabId('LAB-240606-002')}
                  className={`border rounded-xl p-3 cursor-pointer transition-all ${selectedLabId === 'LAB-240606-002' ? 'border-[#8dd7ce] bg-[#effaf7] shadow-sm' : 'border-[#e3edf3] bg-white hover:border-[#8dd7ce]'}`}
                >
                  <div className="flex justify-between mb-2">
                    <b className="text-[#35546a] text-[12px]">LAB-240606-002</b>
                    <span className="text-[10px] font-black text-[#b86b00] bg-[#fff4e2] px-2 py-0.5 rounded">Pending</span>
                  </div>
                  <b className="text-[14px] text-[#102a43] block">Mochi (Cat) - MRN P240155</b>
                  <div className="text-[12px] text-[#64788a] mt-1">Test: Feline Leukemia/FIV</div>
                </div>
              </div>
            </div>

            {/* กล่องขวา: ตารางบันทึกผลแล็บแยกรายตัว */}
            <div className="bg-white border border-[#e3edf3] rounded-[18px] shadow-[0_14px_35px_rgba(16,42,67,.07)] flex flex-col overflow-hidden h-full">
              <div className="p-4 md:p-[20px_24px] border-b border-[#e3edf3] bg-[#fbfdfe] shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="m-0 text-[18px] font-bold text-[#102a43]">Result Entry: {activeLab.id}</h3>
                <div className="text-xs text-gray-500">
                  คนไข้: <span className="font-bold text-[#102a43]">{activeLab.pet} ({activeLab.species})</span> · สัตวแพทย์สั่งตรวจ: <span className="font-bold text-[#102a43]">{activeLab.doctor}</span>
                </div>
              </div>
              <div className="flex-1 overflow-auto p-4 md:p-6">
                <table className="w-full text-left border-collapse min-w-[550px]">
                  <thead>
                    <tr className="text-[12px] text-[#64788a] border-b border-[#e3edf3]">
                      <th className="pb-3 font-bold">Test Name</th>
                      <th className="pb-3 font-bold w-[140px]">Result</th>
                      <th className="pb-3 font-bold">Reference Range</th>
                      <th className="pb-3 font-bold">Unit</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px]">
                    {activeLab.tests.map((t, index) => (
                      <tr key={index} className="border-b border-[#e3edf3] hover:bg-gray-50/40">
                        <td className={`py-4 font-bold ${t.isHigh ? 'text-[#e95050]' : 'text-[#102a43]'}`}>{t.name}</td>
                        <td className="py-4">
                          <input className={`border rounded-lg px-3 py-1.5 w-28 outline-none text-sm font-bold ${t.isHigh ? 'border-[#e95050] text-[#e95050] bg-red-50/20' : 'border-[#e3edf3] text-[#102a43]'}`} defaultValue={t.defaultVal} />
                        </td>
                        <td className="py-4 text-[#64788a] text-[13px] font-mono">{t.range}</td>
                        <td className="py-4 text-[#64788a] text-[13px]">{t.unit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 md:p-[18px_24px] border-t border-[#e3edf3] bg-[#fbfdfe] text-right shrink-0">
                <button onClick={() => triggerToast(`🎉 อนุมัติและรายงานผลวิเคราะห์ทางห้องปฏิบัติการใบงาน ${activeLab.id} สำเร็จ`)} className="border-0 rounded-xl px-5 py-3 font-[850] text-sm bg-gradient-to-r from-[#0f8f83] to-[#0b6d87] text-white shadow-sm hover:opacity-90 cursor-pointer transition-opacity">Approve & Release Report</button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW MODE 2: หน้าแสดงรายชื่อสมุดสารบับแล็บ (LAB CATALOG) */}
        {toolbarView === 'catalog' && (
          <div className="bg-white border border-[#e3edf3] rounded-[18px] shadow-sm p-5 md:p-6 h-full flex flex-col overflow-hidden animate-fadeIn">
            <div className="flex justify-between items-center border-b pb-3 mb-4 shrink-0">
              <h3 className="m-0 text-lg font-bold text-[#102a43]">📋 สารบบรายการทดสอบทางห้องปฏิบัติการ (Lab Test Catalog)</h3>
            </div>
            <div className="flex-1 overflow-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-gray-50 text-[#64788a] font-bold border-b"><th className="p-3">Test Code</th><th className="p-3">รายการทดสอบ</th><th className="p-3">หมวดหมู่เทคนิค</th><th className="p-3">ชนิดสิ่งส่งตรวจ</th><th className="p-3">ระยะเวลาวิเคราะห์ (TAT)</th><th className="p-3 text-right">ค่าบริการ</th></tr>
                </thead>
                <tbody className="text-[#102a43]">
                  {mockCatalog.map((item) => (
                    <tr key={item.code} className="border-b hover:bg-gray-50/50 text-sm">
                      <td className="p-3 font-mono font-bold text-gray-400">{item.code}</td>
                      <td className="p-3 font-bold">{item.name}</td>
                      <td className="p-3 text-gray-600">{item.category}</td>
                      <td className="p-3 font-medium text-[#276db6]">{item.specimen}</td>
                      <td className="p-3 font-bold text-gray-500">{item.tat}</td>
                      <td className="p-3 text-right font-black text-[#0f8f83]">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VIEW MODE 3: หน้าจออนุมัติผลแล็บรวมแบบกลุ่มใหญ่ (BATCH REPORT) */}
        {toolbarView === 'batch' && (
          <div className="bg-white border border-[#e3edf3] rounded-[18px] shadow-sm p-5 md:p-6 h-full flex flex-col overflow-hidden animate-fadeIn">
            <div className="flex justify-between items-center border-b pb-3 mb-4 shrink-0">
              <h3 className="m-0 text-lg font-bold text-[#102a43]">📤 อนุมัติรายงานผลแล็บรายกลุ่ม (Batch Result Approval)</h3>
              <button onClick={() => { setToolbarView('queue'); triggerToast('✅ ได้ทำการ Approve ปล่อยผลแล็บพร้อมกันทั้งหมดเรียบร้อยแล้ว'); }} className="bg-[#0f8f83] text-white px-5 py-2.5 rounded-xl border-0 font-bold text-xs shadow-sm cursor-pointer hover:opacity-90">Approve Selected All</button>
            </div>
            <div className="flex-1 overflow-auto space-y-3">
              <div className="p-4 border rounded-xl bg-gray-50/50 flex items-center justify-between">
                <div className="flex items-center gap-3"><input type="checkbox" defaultChecked className="w-4 h-4" /><div><b className="text-sm block">LAB-240606-001 — Lucky (Dog)</b><span className="text-xs text-gray-500">สัตวแพทย์ผู้ส่ง: สพ.ญ. นัทธสร | รายการ: CBC, Blood Chem, cPL</span></div></div>
                <span className="text-xs font-bold text-red-600 bg-red-100/60 px-2 py-1 rounded">มีค่าวิกฤต (Creatinine High)</span>
              </div>
              <div className="p-4 border rounded-xl bg-gray-50/50 flex items-center justify-between">
                <div className="flex items-center gap-3"><input type="checkbox" defaultChecked className="w-4 h-4" /><div><b className="text-sm block">LAB-240606-002 — Mochi (Cat)</b><span className="text-xs text-gray-500">สัตวแพทย์ผู้ส่ง: น.สพ. วิทยา | รายการ: Feline Leukemia/FIV</span></div></div>
                <span className="text-xs font-bold text-amber-600 bg-amber-100/60 px-2 py-1 rounded">ผลแล็บพร้อมออก (ALT High)</span>
              </div>
            </div>
          </div>
        )}

        {/* VIEW MODE 4: หน้าจอฟอร์มคีย์สร้างใบสิ่งส่งตรวจแล็บด้วยตนเอง (MANUAL ENTRY) */}
        {toolbarView === 'manual' && (
          <div className="bg-white border border-[#e3edf3] rounded-[18px] shadow-sm p-5 md:p-6 h-full flex flex-col overflow-hidden animate-fadeIn">
            <h3 className="m-0 mb-4 text-lg font-bold text-[#102a43] border-b pb-2 shrink-0">➕ ป้อนฟอร์มสั่งตรวจหรือนำเข้าผลแล็บภายนอกภายนอก (Manual Entry Form)</h3>
            <form onSubmit={(e) => { e.preventDefault(); setToolbarView('queue'); triggerToast('✅ สร้างใบส่งตรวจและเตรียมรับสิ่งส่งตรวจแมนนวลเสร็จสิ้น'); }} className="space-y-4 max-w-xl text-sm flex-1 overflow-y-auto pr-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-[#35546a]">เลือกหรือระบุรหัสคนไข้ MRN *</label>
                  <input required type="text" placeholder="ระบุเลขรหัสสัตว์เลี้ยง..." className="border border-[#e3edf3] rounded-xl px-4 py-2.5 outline-none text-[#102a43]" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-[#35546a]">ประเภทสิ่งส่งตรวจ (Specimen Type)</label>
                  <select className="border border-[#e3edf3] rounded-xl px-4 py-2.5 outline-none text-[#102a43] bg-white">
                    <option>Whole Blood (EDTA)</option>
                    <option>Serum / Plasma</option>
                    <option>Urine Specimen</option>
                    <option>Fecal Swab</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-[#35546a]">ระบุรายการทดสอบ (Test Profile) *</label>
                <input required type="text" placeholder="ระบุกลุ่มการทดสอบ เช่น Blood Chem Complete, T4, TSH..." className="border border-[#e3edf3] rounded-xl px-4 py-2.5 outline-none text-[#102a43]" />
              </div>
              <div className="pt-2 flex gap-3">
                <button type="button" onClick={() => setToolbarView('queue')} className="border border-gray-300 rounded-xl px-6 py-2.5 font-bold text-sm bg-white text-[#35546a] cursor-pointer">ยกเลิก</button>
                <button type="submit" className="border-0 rounded-xl px-6 py-2.5 font-bold text-sm bg-[#0f8f83] text-white shadow-sm cursor-pointer">บันทึกส่งรายการแล็บ</button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}