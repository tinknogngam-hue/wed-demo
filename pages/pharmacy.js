// src/pages/pharmacy.js
import React, { useState } from 'react';

// ข้อมูลจำลองสำหรับคลังยา (Drug Master Data)
const mockDrugMaster = [
  { code: 'MED-001', name: 'Maropitant (Cerenia) 16mg', group: 'ยาควบคุม - แก้อาเจียน', regNo: 'Reg.No 1A 45/62', stock: 142, unit: 'Tab', price: '85 ฿' },
  { code: 'MED-002', name: 'Omeprazole 20mg', group: 'ยาอันตราย - ลดกรด', regNo: 'Reg.No 1A 102/58', stock: 580, unit: 'Cap', price: '12 ฿' },
  { code: 'MED-003', name: 'Amoxicillin + Clavulanic Acid 250mg', group: 'ยาปฏิชีวนะ', regNo: 'Reg.No 2A 12/60', stock: 320, unit: 'Tab', price: '35 ฿' },
  { code: 'MED-004', name: 'Semintra 4 mg/mL Oral Sol.', group: 'ยาอันตราย - โรคไต', regNo: 'Reg.No 1A 88/64', stock: 18, unit: 'Bottle', price: '1,450 ฿' },
];

export default function PharmacyPage() {
  // State หลักสำหรับควบคุมหน้าจอทำงานปัจจุบัน ('pending' | 'master' | 'scan' | 'manual')
  const [pharmacyView, setPharmacyView] = useState('pending');
  
  // State สำหรับจำลองระบบแจ้งเตือนข้อความเด้ง (Toast Notification)
  const [toastMsg, setToastMsg] = useState('');

  // ฟังก์ชันยิง Toast แจ้งเตือนด่วน
  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 4000);
  };

  return (
    <div className="h-screen flex flex-col p-4 md:p-6 bg-[#f6f9fb] overflow-hidden relative">
      
      {/* ระบบ Toast Notification ส่วนบนของหน้าจอ */}
      {toastMsg && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#102a43] text-white text-sm px-6 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-white/10 animate-fadeIn">
          <span className="font-bold">{toastMsg}</span>
          <button onClick={() => setToastMsg('')} className="bg-transparent border-0 text-white/50 hover:text-white cursor-pointer ml-2">✕</button>
        </div>
      )}

      {/* Topbar ของหน้า Pharmacy */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] lg:grid-cols-[1fr_450px] gap-4 items-center mb-4 shrink-0">
        <div>
          <h2 className="m-0 text-[26px] md:text-[28px] font-bold text-[#102a43]">Pharmacy & Dispensing</h2>
          <p className="m-0 mt-1 text-[#64788a] text-sm">ระบบห้องยา จ่ายยา พิมพ์ฉลาก และตัดสต๊อกอัตโนมัติ</p>
        </div>
        <div className="bg-white border border-[#e3edf3] rounded-2xl p-[13px_16px] text-[#7a8fa0] shadow-[0_14px_35px_rgba(16,42,67,.07)] text-sm w-full md:w-[350px] lg:w-[450px]">
          🔎 Search patient / MRN / prescription no. / drug name
        </div>
      </div>

      {/* Toolbar - รองรับการสลับสเตตและเปลี่ยนคลาสสไตล์ Active ให้สวยงาม */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 shrink-0 gap-3">
        <div className="text-[13px] text-[#64788a]">
          Home › Pharmacy › {pharmacyView === 'pending' && 'Pending Prescriptions'} {pharmacyView === 'master' && 'Drug Master Inventory'} {pharmacyView === 'scan' && 'Barcode Scanner Terminal'} {pharmacyView === 'manual' && 'Manual Dispense Entry'}
        </div>
        <div className="flex flex-wrap gap-2.5">
          <button 
            onClick={() => setPharmacyView(pharmacyView === 'pending' ? 'master' : 'pending')}
            className={`border rounded-xl px-[15px] py-[10px] font-[850] cursor-pointer text-sm transition-all ${pharmacyView === 'master' ? 'bg-[#0f8f83] text-white border-[#0f8f83] shadow-sm' : 'bg-white text-[#35546a] border-[#e3edf3] hover:bg-[#f6f9fb]'}`}
          >
            {pharmacyView === 'master' ? '📋 View Prescriptions Queue' : '📑 Drug Master'}
          </button>
          <button 
            onClick={() => setPharmacyView('scan')}
            className={`border rounded-xl px-[15px] py-[10px] font-[850] cursor-pointer text-sm transition-all ${pharmacyView === 'scan' ? 'bg-[#0f8f83] text-white border-[#0f8f83] shadow-sm' : 'bg-white text-[#35546a] border-[#e3edf3] hover:bg-[#f6f9fb]'}`}
          >
            🔍 Scan Prescription
          </button>
          <button 
            onClick={() => setPharmacyView('manual')}
            className={`border rounded-xl px-[15px] py-[10px] font-[850] cursor-pointer text-sm transition-all ${pharmacyView === 'manual' ? 'bg-[#0f8f83] text-white border-[#0f8f83] shadow-sm' : 'border-0 bg-gradient-to-r from-[#0f8f83] to-[#0b6d87] text-white shadow-sm hover:opacity-90'}`}
          >
            Manual Dispense
          </button>
        </div>
      </div>

      {/* พื้นที่หลัก (ซ้าย: คอนเทนต์หลักตามเมนูย่อย | ขวา: เครื่องมือเภสัชกร) */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_390px] gap-4 lg:gap-[18px] flex-1 min-h-0 overflow-hidden">
        
        {/* กล่องซ้าย: แสดงผลคอนเทนต์แบบ Dynamic ตาม State ทูลบาร์ด้านบน */}
        <div className="bg-white border border-[#e3edf3] rounded-[18px] shadow-[0_14px_35px_rgba(16,42,67,.07)] flex flex-col overflow-hidden min-w-0 h-full">
          
          {/* VIEW 1: หน้าแสดงรายการคิวรอจ่ายยาเดิม (PENDING PRESCRIPTIONS) */}
          {pharmacyView === 'pending' && (
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden animate-fadeIn">
              {/* Header & Patient Info */}
              <div className="p-5 md:p-[20px_24px] border-b border-[#e3edf3] bg-[#fbfdfe] shrink-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-[11px] text-lg font-[900] text-[#102a43]">
                    <div className="w-9 h-9 rounded-xl grid place-items-center bg-[#e9f7f4] text-[#0f8f83] text-lg">💊</div> 
                    Prescription: RX-2405012
                  </div>
                  <span className="px-3 py-1.5 bg-[#fff4e2] text-[#b86b00] rounded-full text-xs font-bold">Waiting to Dispense</span>
                </div>

                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="w-[60px] h-[60px] rounded-[18px] bg-[#fff1d8] grid place-items-center text-[34px] shrink-0 self-center sm:self-start">🐶</div>
                  <div className="flex-1 w-full">
                    <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4">
                      <div>
                        <h3 className="m-0 text-[18px] text-[#102a43]">Lucky ♂</h3>
                        <p className="m-0 mt-1 text-[13px] text-[#64788a]">Golden Retriever · 5Y 2M · <b className="text-[#0f8f83]">32.5 kg</b></p>
                      </div>
                      <div className="text-left sm:text-right">
                        <div className="text-[12px] text-[#64788a]">Doctor</div>
                        <div className="text-[14px] font-bold text-[#102a43]">สพ.ญ. นัทธสร สุขใจ</div>
                      </div>
                    </div>
                    <div className="mt-3 bg-[#fff0f0] border border-[#fcd5d5] text-[#e95050] px-3 py-2 rounded-lg text-[13px] font-bold flex items-center gap-2">
                      <span>⚠️</span> Allergy Alert: Penicillin (Severe Rash / Anaphylaxis)
                    </div>
                  </div>
                </div>
              </div>

              {/* Medication List Table */}
              <div className="flex-1 overflow-auto p-[0_24px]">
                <table className="w-full text-left border-collapse mt-4 min-w-[750px]">
                  <thead>
                    <tr className="text-[12px] text-[#64788a] border-b border-[#e3edf3]">
                      <th className="pb-3 font-bold">Medication</th>
                      <th className="pb-3 font-bold">Sig / Instruction</th>
                      <th className="pb-3 font-bold text-center w-[80px]">Qty</th>
                      <th className="pb-3 font-bold text-center w-[120px]">Label</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px] text-[#102a43]">
                    <tr className="border-b border-[#e3edf3] group">
                      <td className="py-4">
                        <b className="text-[#102a43] text-[14px]">Maropitant (Cerenia) 16mg</b><br/>
                        <small className="text-[#64788a]">Tablet • Stock: 142</small>
                      </td>
                      <td className="py-4 text-[13px] text-[#102a43]">กินครั้งละ <b>1 เม็ด</b> วันละ 1 ครั้ง (OD)<br/><span className="text-[#64788a]">ระยะเวลา 4 วัน</span></td>
                      <td className="py-4 text-center"><b className="text-[16px] text-[#102a43]">4</b> <small className="text-[#64788a]">Tab</small></td>
                      <td className="py-4 text-center">
                        <button onClick={() => triggerToast('🖨️ กำลังพิมพ์ฉลากยา: Maropitant สำหรับ Lucky...')} className="border border-[#0f8f83] text-[#0f8f83] bg-[#e9f7f4] px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#0f8f83] hover:text-white transition-colors cursor-pointer">🖨️ Print</button>
                      </td>
                    </tr>
                    <tr className="border-b border-[#e3edf3] group">
                      <td className="py-4">
                        <b className="text-[#102a43] text-[14px]">Omeprazole 20mg</b><br/>
                        <small className="text-[#64788a]">Capsule • Stock: 580</small>
                      </td>
                      <td className="py-4 text-[13px] text-[#102a43]">กินครั้งละ <b>1 แคปซูล</b> วันละ 1 ครั้ง ก่อนอาหารเช้า<br/><span className="text-[#64788a]">ระยะเวลา 7 วัน</span></td>
                      <td className="py-4 text-center"><b className="text-[16px] text-[#102a43]">7</b> <small className="text-[#64788a]">Cap</small></td>
                      <td className="py-4 text-center">
                        <button onClick={() => triggerToast('🖨️ กำลังพิมพ์ฉลากยา: Omeprazole สำหรับ Lucky...')} className="border border-[#0f8f83] text-[#0f8f83] bg-[#e9f7f4] px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#0f8f83] hover:text-white transition-colors cursor-pointer">🖨️ Print</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Action Bar */}
              <div className="flex justify-between items-center p-4 md:p-[18px_24px] border-t border-[#e3edf3] bg-[#fbfdfe] shrink-0 gap-2">
                <button onClick={() => triggerToast('🖨️ พิมพ์ฉลากยาทุกรายการในใบสั่งยานี้เรียบร้อย')} className="border border-[#e3edf3] rounded-xl px-[15px] py-[10px] font-[850] cursor-pointer text-sm bg-white text-[#35546a] hover:bg-gray-50 transition-colors shrink-0">🖨️ Print All Labels</button>
                <button onClick={() => triggerToast('✅ จ่ายยาเสร็จสิ้น ระบบตัดยอดสต๊อกคลังยาและส่งบิลไปฝ่ายการเงินแล้ว')} className="border-0 rounded-xl px-[20px] py-[10px] font-[850] cursor-pointer text-sm bg-gradient-to-r from-[#0f8f83] to-[#0b6d87] text-white shadow-sm flex items-center gap-2 hover:opacity-90 transition-opacity">Confirm Dispense & Deduct Stock <span>→</span></button>
              </div>
            </div>
          )}

          {/* VIEW 2: หน้าแสดงสารบบรายละเอียดข้อมูลยาโรงพยาบาล (DRUG MASTER) */}
          {pharmacyView === 'master' && (
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden p-5 md:p-6 animate-fadeIn">
              <div className="flex justify-between items-center border-b pb-3 mb-4 shrink-0">
                <h3 className="m-0 text-lg font-bold text-[#102a43]">📑 ระบบสารบบและทะเบียนข้อมูลยาโรงพยาบาล (Drug Master List)</h3>
                <button onClick={() => triggerToast('➕ เปิดฟอร์มลงทะเบียนยาตัวใหม่เข้าระบบ')} className="bg-[#0f8f83] text-white px-4 py-2 rounded-xl text-xs font-bold border-0 cursor-pointer">+ ขึ้นทะเบียนยาใหม่</button>
              </div>
              <div className="flex-1 overflow-auto">
                <table className="w-full text-left text-xs border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-gray-50 text-[#64788a] font-bold border-b"><th className="p-3">Code</th><th className="p-3">ชื่อเวชภัณฑ์ยา</th><th className="p-3">หมวดหมู่กลุ่มยา</th><th className="p-3">เลขทะเบียนยา</th><th className="p-3 text-center">คงเหลือในคลัง</th><th className="p-3 text-right">ราคาต่อหน่วย</th></tr>
                  </thead>
                  <tbody className="text-[#102a43]">
                    {mockDrugMaster.map((drug) => (
                      <tr key={drug.code} className="border-b hover:bg-gray-50/50">
                        <td className="p-3 font-mono font-bold text-gray-400">{drug.code}</td>
                        <td className="p-3 font-bold text-sm">{drug.name}</td>
                        <td className="p-3 text-gray-600">{drug.group}</td>
                        <td className="p-3 font-mono text-gray-500">{drug.regNo}</td>
                        <td className="p-3 text-center font-bold text-sm text-[#0f8f83]">{drug.stock} {drug.unit}</td>
                        <td className="p-3 text-right font-bold">{drug.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VIEW 3: หน้าแสดงระบบสแกนเอกสารบาร์โค้ดใบสั่งยา (SCAN PRESCRIPTION) */}
          {pharmacyView === 'scan' && (
            <div className="flex-1 p-5 md:p-6 flex flex-col items-center justify-center text-center animate-fadeIn">
              <div className="w-full max-w-sm border-2 border-dashed border-[#0f8f83] bg-gray-50 rounded-2xl p-8 flex flex-col items-center justify-center shadow-inner">
                <span className="text-5xl mb-4">📷</span>
                <h4 className="text-[#102a43] font-bold m-0 text-base">กำลังจำลองเชื่อมต่อหัวอ่าน Barcode/QR Reader...</h4>
                <p className="text-xs text-[#64788a] mt-2 mb-6">นำบาร์โค้ดที่อยู่บนแถบหัวกระดาษแผ่นพาสปอร์ตเคสคนไข้ ส่องกับกล้องเพื่อโหลดข้อมูล</p>
                <input 
                  type="text" 
                  placeholder="หรือระบุรหัสใบสั่งยาเอง เช่น RX-2405012..." 
                  className="w-full border border-line rounded-xl px-4 py-2.5 text-center text-sm outline-none font-mono tracking-wider mb-3 focus:border-[#0f8f83]" 
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setPharmacyView('pending');
                      triggerToast(`🔍 ดึงข้อมูลใบสั่งยาเลขที่ ${e.target.value} สำเร็จ!`);
                    }
                  }}
                />
                <button onClick={() => { setPharmacyView('pending'); triggerToast('🔍 ดึงข้อมูลคิวจำลอง RX-2405012 เรียบร้อย'); }} className="w-full bg-[#0f8f83] text-white py-2 rounded-xl text-xs font-black border-0 cursor-pointer shadow-sm">จำลองการยิงสแกนบาร์โค้ด</button>
              </div>
            </div>
          )}

          {/* VIEW 4: หน้าจอฟอร์มการคีย์สั่งจ่ายยาด้วยตนเองด่วน (MANUAL DISPENSE) */}
          {pharmacyView === 'manual' && (
            <div className="flex-1 p-5 md:p-6 overflow-y-auto animate-fadeIn">
              <h3 className="m-0 mb-4 text-lg font-bold text-[#102a43] border-b pb-2">📥 คีย์รายการจ่ายยา/เวชภัณฑ์ด่วนหน้าห้องยา (Manual Dispense Entry)</h3>
              <form onSubmit={(e) => { e.preventDefault(); setPharmacyView('pending'); triggerToast('✅ บันทึกใบจ่ายยาฉุกเฉินเข้าระบบส่วนกลางสำเร็จ'); }} className="space-y-4 max-w-xl text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-[#35546a]">ระบุชื่อคนไข้ หรือรหัส MRN *</label>
                    <input required className="border border-[#e3edf3] rounded-xl px-4 py-2.5 outline-none text-[#102a43]" placeholder="พิมพ์ค้นหาคนไข้..." />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-[#35546a]">เลือกห้องตรวจ / สัตวแพทย์สั่งจ่าย</label>
                    <select className="border border-[#e3edf3] rounded-xl px-4 py-2.5 outline-none text-[#102a43] bg-white">
                      <option>สพ.ญ. นัทธสร สุขใจ (OPD 1)</option>
                      <option>น.สพ. วิทยา รักษาดี (OPD 2)</option>
                      <option>คีย์ด่วนโดยเภสัชกรหน้าร้าน</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-[#35546a]">ค้นหาและระบุชื่อยาที่ต้องการจ่ายด่วน *</label>
                  <input required className="border border-[#e3edf3] rounded-xl px-4 py-2.5 outline-none text-[#102a43]" placeholder="เช่น Omeprazole, Amoxi, น้ำเกลือ..." />
                </div>
                <div className="pt-2 flex gap-3">
                  <button type="button" onClick={() => setPharmacyView('pending')} className="border border-gray-300 rounded-xl px-6 py-2.5 font-bold text-sm bg-white text-[#35546a] cursor-pointer">ยกเลิก</button>
                  <button type="submit" className="border-0 rounded-xl px-6 py-2.5 font-bold text-sm bg-[#0f8f83] text-white shadow-sm cursor-pointer">ออกใบเสร็จและเบิกจ่ายยา</button>
                </div>
              </form>
            </div>
          )}

        </div>

        {/* กล่องขวา: Pharmacist Tools */}
        <aside className="flex flex-col gap-4 lg:gap-[18px] min-w-0 overflow-y-auto pr-1 max-h-full">
          {/* Dose Calculator */}
          <div className="bg-white border border-[#e3edf3] rounded-[18px] shadow-[0_14px_35px_rgba(16,42,67,.07)] p-5 shrink-0">
            <div className="flex items-center gap-2 mb-4 text-lg font-bold text-[#102a43]">
              <div className="w-8 h-8 rounded-lg bg-[#eef4f7] text-[#35546a] grid place-items-center text-sm">⚖️</div>
              Dose Calculator
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-bold text-[#64788a]">Weight (kg)</label>
                  <input defaultValue="32.5" className="border border-[#e3edf3] rounded-lg px-3 py-2 text-sm bg-[#f6f9fb] outline-none text-[#102a43] font-bold" readOnly />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-bold text-[#64788a]">Dose (mg/kg)</label>
                  <input placeholder="e.g. 5" className="border border-[#e3edf3] rounded-lg px-3 py-2 text-sm outline-none text-[#102a43]" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-bold text-[#64788a]">Concentration (mg/tab or mg/ml)</label>
                <input placeholder="e.g. 100" className="border border-[#e3edf3] rounded-lg px-3 py-2 text-sm outline-none text-[#102a43]" />
              </div>
              <button onClick={() => triggerToast('📐 ระบบคำนวณโดสยาสำเร็จ: แนะนำให้ยาคนไข้ขนาด 0.5 เม็ด')} className="w-full border border-[#e3edf3] rounded-lg py-2.5 text-[13px] font-bold bg-[#f6f9fb] text-[#35546a] hover:bg-[#e3edf3] transition-colors mt-2 cursor-pointer">
                Calculate Dose
              </button>
            </div>
          </div>

          {/* Quick Stock Check */}
          <div className="bg-white border border-[#e3edf3] rounded-[18px] shadow-[0_14px_35px_rgba(16,42,67,.07)] p-5 flex-1 min-h-[250px]">
            <h3 className="m-0 mb-4 text-[16px] font-bold text-[#102a43]">Stock Quick View</h3>
            <div className="relative mb-4">
              <input placeholder="Search drug inventory..." className="w-full border border-[#e3edf3] rounded-xl pl-9 pr-3 py-2.5 text-sm outline-none" />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a0b2c3]">🔎</span>
            </div>
            
            <div className="space-y-2">
              <div onClick={() => triggerToast('🔍 เปิดรายละเอียดล็อตและวันหมดอายุของ Maropitant 16mg')} className="p-3 border border-[#e3edf3] rounded-xl flex justify-between items-center bg-[#fbfdfe] hover:border-[#0f8f83] transition-colors cursor-pointer">
                <div>
                  <b className="text-[13px] text-[#102a43]">Maropitant 16mg</b>
                  <span className="block text-[11px] text-[#64788a]">Lot: L2024-05 • Exp: 12/2025</span>
                </div>
                <div className="text-right">
                  <b className="text-[15px] text-[#0f8f83]">142</b>
                  <span className="block text-[11px] text-[#64788a]">Tabs</span>
                </div>
              </div>
              
              <div onClick={() => triggerToast('🔍 เปิดรายละเอียดล็อตและวันหมดอายุของ Omeprazole 20mg')} className="p-3 border border-[#e3edf3] rounded-xl flex justify-between items-center bg-[#fbfdfe] hover:border-[#0f8f83] transition-colors cursor-pointer">
                <div>
                  <b className="text-[13px] text-[#102a43]">Omeprazole 20mg</b>
                  <span className="block text-[11px] text-[#64788a]">Lot: A119-2 • Exp: 08/2026</span>
                </div>
                <div className="text-right">
                  <b className="text-[15px] text-[#0f8f83]">580</b>
                  <span className="block text-[11px] text-[#64788a]">Caps</span>
                </div>
              </div>
            </div>
          </div>

        </aside>

      </div>
    </div>
  );
}