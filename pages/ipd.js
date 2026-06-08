// src/pages/ipd.js
import React, { useState } from 'react';

// ข้อมูลจำลองสำหรับ Ward Dashboard (ภาพรวมของกรงทั้งหมดใน Ward A)
const mockWardCages = [
  { id: 'ICU-01', pet: 'Lucky', species: '🐶', breed: 'Golden Retriever', status: 'Critical Care', day: 'Day 2', weight: '32.5 kg', diagnosis: 'Post-op FB / Pancreatitis', color: 'bg-[#fff1d8]', text: 'text-[#b86b00]', badge: 'bg-[#e95050] text-white' },
  { id: 'ICU-02', pet: 'Mochi', species: '🐱', breed: 'Persian Cat', status: 'Stable', day: 'Day 4', weight: '4.2 kg', diagnosis: 'Dehydration / URI', color: 'bg-[#eef4f7]', text: 'text-[#276db6]', badge: 'bg-[#e8f7f1] text-[#0f8d62]' },
  { id: 'ICU-03', pet: 'Peanut', species: '🐰', breed: 'ND Rabbit', status: 'Monitoring', day: 'Day 1', weight: '1.1 kg', diagnosis: 'GI Stasis', color: 'bg-[#f3f0ff]', text: 'text-[#8b5cf6]', badge: 'bg-[#edf5ff] text-[#276db6]' },
  { id: 'ICU-04', pet: 'ว่าง (Available)', species: '✨', breed: '-', status: 'Ready to use', day: '-', weight: '-', diagnosis: 'ความสะอาดเรียบร้อยเรียบร้อย', color: 'bg-gray-50', text: 'text-gray-400', badge: 'bg-gray-200 text-gray-600' },
];

export default function IpdPage() {
  // State หลักสำหรับควบคุมหน้าจอทำงานปัจจุบัน ('sheet' | 'dashboard' | 'admit')
  const [currentView, setCurrentView] = useState('sheet');
  
  // State สำหรับจำลองการแสดงแจ้งเตือน Toast แจ้งเมื่อกดสั่งงานต่าง ๆ
  const [notification, setNotification] = useState('');

  // State สำหรับเก็บข้อมูลตาราง Treatment Sheet เพื่อให้กดโต้ตอบแบบ Dynamic ได้
  const [tasks, setTasks] = useState([
    { id: 1, time: '08:00', category: 'Med', task: 'Cefazolin (Antibiotic)', dose: '22 mg/kg IV', status: 'done', sign: 'น.ส. ใจดี (08:05)' },
    { id: 2, time: '08:00', category: 'Check', task: 'Vitals Sign (T, HR, RR)', dose: '-', status: 'done', sign: 'น.ส. ใจดี (08:10)' },
    { id: 3, time: '08:00', category: 'Care', task: 'Walk & Urinate', dose: '10 mins', status: 'done', sign: 'น.ส. ใจดี (08:30)' },
    { id: 4, time: '12:00', category: 'Fluid', task: 'Check LRS infusion rate', dose: '90 ml/hr IV', status: 'pending', sign: '-' },
    { id: 5, time: '12:00', category: 'Feed', task: 'GI Low Fat (Recovery)', dose: '50g / PO', status: 'pending', sign: '-' },
    { id: 6, time: '18:00', category: 'Med', task: 'Maropitant 16mg', dose: '1 mg/kg SC', status: 'pending', sign: '-' }
  ]);

  // State สำหรับเปิด/ปิด และจัดการข้อมูลฟอร์มเพิ่ม Extra Task Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ time: '12:00', category: 'Med', title: '', dose: '' });

  // ฟังก์ชันแสดงผล Toast แจ้งเตือนกระชับสั้น
  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 4000);
  };

  // ฟังก์ชันกดยืนยันเซ็นแลกงานเสร็จ (Mark Done)
  const handleMarkDone = (id) => {
    const now = new Date();
    const timeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, status: 'done', sign: `สพ.ญ. นัทธสร (${timeString})` } : t
    ));
    showToast('✅ อัปเดตสถานะและลงบันทึกการรักษาเรียบร้อย!');
  };

  // ฟังก์ชันเพิ่มคำสั่งการรักษาใหม่ (Add Extra Task)
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.title) return;

    const taskItem = {
      id: Date.now(),
      time: newTask.time,
      category: newTask.category,
      task: newTask.title,
      dose: newTask.dose || '-',
      status: 'pending',
      sign: '-'
    };

    const updatedTasks = [...tasks, taskItem].sort((a, b) => a.time.localeCompare(b.time));
    setTasks(updatedTasks);
    setIsModalOpen(false);
    setNewTask({ time: '12:00', category: 'Med', title: '', dose: '' });
    showToast('➕ เพิ่มคำสั่งการรักษาพิเศษเข้าสู่โครงตารางแล้ว');
  };

  return (
    <div className="h-screen flex flex-col p-4 md:p-6 bg-[#f6f9fb] overflow-hidden relative">
      
      {/* แจ้งเตือนแบบ Pop-up Toast */}
      {notification && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-[#102a43] text-white text-sm px-6 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-fadeIn">
          <span>{notification}</span>
          <button onClick={() => setNotification('')} className="bg-transparent border-0 text-white/60 hover:text-white cursor-pointer font-bold">✕</button>
        </div>
      )}

      {/* Topbar ของหน้า IPD */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-4 items-center mb-4 shrink-0">
        <div>
          <h2 className="m-0 text-[26px] md:text-[28px] font-bold text-[#102a43]">IPD / ICU Management</h2>
          <p className="m-0 mt-1 text-[#64788a] text-sm">ระบบจัดการสัตว์ป่วยใน กรงพักฟื้น และ Treatment Sheet</p>
        </div>
        <div className="bg-white border border-[#e3edf3] rounded-2xl p-[13px_16px] text-[#7a8fa0] shadow-[0_14px_35px_rgba(16,42,67,.07)] text-sm w-full md:w-[350px] lg:w-[450px]">
          🔎 Search patient / MRN / cage no. / ward
        </div>
      </div>

      {/* Toolbar - เพิ่มปุ่ม Treatment Sheet เพื่อใช้สลับกลับหน้าหลักได้ตลอดเวลา */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 shrink-0 gap-3">
        <div className="text-[13px] text-[#64788a]">
          Home › IPD / ICU › {currentView === 'sheet' && 'Ward A (Treatment Sheet)'} {currentView === 'dashboard' && 'Ward A Dashboard'} {currentView === 'admit' && 'Admit Process'}
        </div>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setCurrentView('sheet')}
            className={`border rounded-xl px-[15px] py-[10px] font-[850] cursor-pointer text-sm transition-all ${currentView === 'sheet' ? 'bg-[#0f8f83] text-white border-[#0f8f83] shadow-sm' : 'bg-white text-[#35546a] border-[#e3edf3] hover:bg-[#f6f9fb]'}`}
          >
            📋 Treatment Sheet
          </button>
          <button 
            onClick={() => setCurrentView('dashboard')}
            className={`border rounded-xl px-[15px] py-[10px] font-[850] cursor-pointer text-sm transition-all ${currentView === 'dashboard' ? 'bg-[#0f8f83] text-white border-[#0f8f83] shadow-sm' : 'bg-white text-[#35546a] border-[#e3edf3] hover:bg-[#f6f9fb]'}`}
          >
            📊 Ward Dashboard
          </button>
          <button 
            onClick={() => setCurrentView('admit')}
            className={`border rounded-xl px-[15px] py-[10px] font-[850] cursor-pointer text-sm transition-all ${currentView === 'admit' ? 'bg-[#0f8f83] text-white border-[#0f8f83] shadow-sm' : 'bg-white text-[#35546a] border-[#e3edf3] hover:bg-[#f6f9fb]'}`}
          >
            📥 Admit Patient
          </button>
          <button 
            onClick={() => showToast('🖨️ สั่งส่งพิมพ์เอกสารไปยังเครื่องพิมพ์กลางเรียบร้อยแล้ว')}
            className="border-0 rounded-xl px-[15px] py-[10px] font-[850] cursor-pointer text-sm bg-gradient-to-r from-[#0f8f83] to-[#0b6d87] text-white shadow-sm hover:opacity-90 transition-opacity"
          >
            📝 Print Sheet
          </button>
        </div>
      </div>

      {/* พื้นที่หลักการแสดงผลตัวงานหลัก */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_390px] gap-4 lg:gap-[18px] flex-1 min-h-0 overflow-hidden">
        
        {/* คอนเทนต์ฝั่งซ้าย */}
        <div className="bg-white border border-[#e3edf3] rounded-[18px] shadow-[0_14px_35px_rgba(16,42,67,.07)] flex flex-col overflow-hidden min-w-0 h-full">
          
          {/* 1. หน้าแสดงผล TREATMENT SHEET */}
          {currentView === 'sheet' && (
            <div className="flex-1 flex flex-col overflow-hidden animate-fadeIn">
              {/* Patient Info Header */}
              <div className="p-5 md:p-[20px_24px] border-b border-[#e3edf3] bg-[#fbfdfe] shrink-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-[11px] text-lg font-[900] text-[#102a43]">
                    <div className="w-9 h-9 rounded-xl grid place-items-center bg-[#e9f7f4] text-[#0f8f83] text-lg">▣</div> 
                    Cage: ICU-01
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1.5 bg-[#e95050] text-white rounded-full text-xs font-bold">Critical Care</span>
                    <span className="px-3 py-1.5 bg-[#edf5ff] text-[#276db6] rounded-full text-xs font-bold">Day 2</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="w-[60px] h-[60px] rounded-[18px] bg-[#fff1d8] grid place-items-center text-[34px] shrink-0 self-center sm:self-start">🐶</div>
                  <div className="flex-1 w-full">
                    <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4">
                      <div>
                        <h3 className="m-0 text-[18px] text-[#102a43]">Lucky ♂ <span className="text-[13px] text-[#64788a] font-normal ml-2">MRN P240001</span></h3>
                        <p className="m-0 mt-1 text-[13px] text-[#64788a]">Golden Retriever · 5Y 2M · <b className="text-[#0f8f83]">32.5 kg</b></p>
                      </div>
                      <div className="text-left sm:text-right">
                        <div className="text-[12px] text-[#64788a]">Diagnosis / Problem</div>
                        <div className="text-[14px] font-bold text-[#e95050]">Post-op Foreign Body / Pancreatitis</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Treatment Table Area */}
              <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                <div className="bg-white px-[24px] py-3 border-b border-[#e3edf3] flex justify-between items-center z-10 shrink-0">
                  <h3 className="m-0 text-[15px] md:text-[16px] font-bold text-[#102a43]">Daily Treatment Sheet (14/05/2026)</h3>
                  <div className="flex gap-1.5">
                    <button onClick={() => showToast('📅 โหลดประวัติรักษาของเมื่อวานเรียบร้อย')} className="border border-[#e3edf3] rounded-lg px-2.5 py-1.5 text-xs font-bold bg-[#fbfdfe] text-[#35546a]">◀ Yesterday</button>
                    <button className="border border-[#0f8f83] rounded-lg px-2.5 py-1.5 text-xs font-bold bg-[#e9f7f4] text-[#0f8f83]">Today</button>
                  </div>
                </div>

                <div className="flex-1 overflow-auto">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="text-[12px] text-[#64788a] bg-[#f6f9fb]">
                        <th className="py-3 px-6 font-bold border-b border-[#e3edf3] w-[80px]">Time</th>
                        <th className="py-3 px-6 font-bold border-b border-[#e3edf3]">Order / Task</th>
                        <th className="py-3 px-6 font-bold border-b border-[#e3edf3]">Dose / Route</th>
                        <th className="py-3 px-6 font-bold border-b border-[#e3edf3] text-center w-[110px]">Status</th>
                        <th className="py-3 px-6 font-bold border-b border-[#e3edf3] text-center w-[140px]">Sign</th>
                      </tr>
                    </thead>
                    <tbody className="text-[13px] text-[#102a43]">
                      {tasks.map((t) => (
                        <tr key={t.id} className={`border-b border-[#e3edf3] hover:bg-[#fbfdfe] ${t.status === 'pending' ? 'bg-[#fffcf8]/60' : ''}`}>
                          <td className="py-4 px-6 font-bold text-[#35546a]">{t.time}</td>
                          <td className="py-4 px-6">
                            <span className={`font-bold pr-1 ${t.category === 'Med' ? 'text-[#0f8f83]' : t.category === 'Check' ? 'text-[#276db6]' : 'text-[#b86b00]'}`}>
                              {t.category}:
                            </span>
                            {t.task}
                          </td>
                          <td className="py-4 px-6">{t.dose}</td>
                          <td className="py-4 px-6 text-center">
                            {t.status === 'done' ? (
                              <span className="text-[#0f8d62] font-bold">✅ Done</span>
                            ) : (
                              <button 
                                onClick={() => handleMarkDone(t.id)} 
                                className="bg-white border border-[#0f8f83] text-[#0f8f83] px-2.5 py-1 rounded-md text-xs font-black hover:bg-[#0f8f83] hover:text-white transition-colors cursor-pointer"
                              >
                                Mark Done
                              </button>
                            )}
                          </td>
                          <td className="py-4 px-6 text-center text-[#64788a] text-[11px] font-medium">{t.sign}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Action Bottom Bar */}
              <div className="flex justify-between items-center p-4 md:p-[18px_24px] border-t border-[#e3edf3] bg-[#fbfdfe] shrink-0">
                <button 
                  onClick={() => setIsModalOpen(true)} 
                  className="border border-[#e3edf3] rounded-xl px-[15px] py-[10px] font-[850] cursor-pointer text-sm bg-white text-[#35546a] hover:bg-gray-50 transition-colors"
                >
                  ➕ Add Extra Task
                </button>
                <button 
                  onClick={() => showToast('💾 บันทึกความคืบหน้าและอาการแพทย์ (Doctor Note) ไปยังระบบเรียบร้อย')}
                  className="border-0 rounded-xl px-[20px] py-[10px] font-[850] cursor-pointer text-sm bg-gradient-to-r from-[#0f8f83] to-[#0b6d87] text-white shadow-sm hover:opacity-90"
                >
                  Update Note
                </button>
              </div>
            </div>
          )}

          {/* 2. หน้าแสดงผล WARD DASHBOARD */}
          {currentView === 'dashboard' && (
            <div className="flex-1 p-5 md:p-6 overflow-y-auto animate-fadeIn bg-gray-50/50">
              <h3 className="m-0 mb-4 text-lg font-bold text-[#102a43] border-b pb-2">📊 ภาพรวม Ward A (Intensive Care Unit)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockWardCages.map((cage) => (
                  <div key={cage.id} className="bg-white border border-[#e3edf3] rounded-2xl p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <div className={`w-12 h-12 rounded-xl grid place-items-center text-2xl ${cage.color}`}>{cage.species}</div>
                        <div>
                          <span className="text-xs font-bold text-gray-400 block">{cage.id}</span>
                          <b className="text-base text-[#102a43]">{cage.pet}</b>
                          <span className="text-xs text-gray-500 ml-2">{cage.breed}</span>
                        </div>
                      </div>
                      <span className={`text-[11px] font-black px-2.5 py-1 rounded-full ${cage.badge}`}>{cage.status}</span>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs text-gray-600">
                      <div>📌 วินิจฉัย: <span className="font-bold text-[#102a43] block truncate">{cage.diagnosis}</span></div>
                      <div className="text-right">⏱️ ระยะเวลา: <span className="font-bold text-[#102a43] block">{cage.day} ({cage.weight})</span></div>
                    </div>
                    {cage.id === 'ICU-01' && (
                      <button 
                        onClick={() => setCurrentView('sheet')}
                        className="mt-4 w-full bg-[#e9f7f4] text-[#0f8f83] font-bold py-2 rounded-xl border border-[#0f8f83] hover:bg-[#0f8f83] hover:text-white transition-all text-xs cursor-pointer"
                      >
                        📂 เปิดดู Treatment Sheet แบบละเอียด
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. หน้าแสดงผล ADMIT PATIENT */}
          {currentView === 'admit' && (
            <div className="flex-1 p-5 md:p-6 overflow-y-auto animate-fadeIn">
              <h3 className="m-0 mb-4 text-lg font-bold text-[#102a43] border-b pb-2">📥 ลงทะเบียน Admit ผู้ป่วยในรายใหม่</h3>
              <div className="space-y-4 max-w-xl text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-[#35546a]">ค้นหาชื่อคนไข้ / MRN *</label>
                    <input className="border border-[#e3edf3] rounded-xl px-4 py-2.5 outline-none text-[#102a43]" placeholder="พิมพ์ชื่อสัตว์เลี้ยง หรือรหัสคนไข้..." />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-[#35546a]">เลือกกรงที่ต้องการจัดสรร *</label>
                    <select className="border border-[#e3edf3] rounded-xl px-4 py-2.5 outline-none text-[#102a43] bg-white">
                      <option>ICU-04 (กรงว่าง)</option>
                      <option disabled>ICU-01 (Lucky - ไม่ว่าง)</option>
                      <option disabled>ICU-02 (Mochi - ไม่ว่าง)</option>
                      <option disabled>ICU-03 (Peanut - ไม่ว่าง)</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-[#35546a]">อาการสำคัญ / สาเหตุการรับเข้ารักษาเป็นผู้ป่วยใน *</label>
                  <textarea rows="3" className="border border-[#e3edf3] rounded-xl px-4 py-2.5 outline-none text-[#102a43] resize-none" placeholder="ระบุแผนการรักษาเบื้องต้น หรืออาการวิกฤตของคนไข้..."></textarea>
                </div>
                <div className="pt-2 flex gap-3">
                  <button type="button" onClick={() => setCurrentView('sheet')} className="border border-gray-300 rounded-xl px-6 py-2.5 font-bold text-sm bg-white text-[#35546a] cursor-pointer">ยกเลิก</button>
                  <button type="button" onClick={() => { showToast('📥 บันทึกคนไข้เข้ากรง ICU-04 สำเร็จ!'); setCurrentView('dashboard'); }} className="border-0 rounded-xl px-6 py-2.5 font-bold text-sm bg-[#0f8f83] text-white shadow-sm cursor-pointer">ยืนยันการ Admit</button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* กล่องขวา: Ward Status & Vitals Monitoring */}
        <aside className="flex flex-col gap-4 lg:gap-[18px] min-w-0 overflow-y-auto pr-1 max-h-full">
          {/* Vitals Monitoring Chart */}
          <div className="bg-white border border-[#e3edf3] rounded-[18px] shadow-[0_14px_35px_rgba(16,42,67,.07)] p-5 shrink-0">
            <div className="flex justify-between items-center mb-4">
              <h3 className="m-0 text-[16px] font-bold text-[#102a43]">Vitals Monitoring</h3>
              <button onClick={() => showToast('📈 เปิดประวัติกราฟสัญญาณชีพแบบละเอียด')} className="text-[#0f8f83] text-xs font-bold bg-[#e9f7f4] px-2 py-1 rounded-md cursor-pointer">Record</button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-[#e3edf3] rounded-xl p-3 bg-[#fbfdfe]">
                <small className="block text-[#64788a] text-[11px] font-bold mb-1">Temp (°C)</small>
                <div className="flex items-baseline gap-2">
                  <b className="text-[20px] text-[#102a43]">38.8</b>
                  <span className="text-[11px] text-[#0f8d62]">▼ 0.2</span>
                </div>
              </div>
              <div className="border border-[#e3edf3] rounded-xl p-3 bg-[#fbfdfe]">
                <small className="block text-[#64788a] text-[11px] font-bold mb-1">Heart Rate (bpm)</small>
                <div className="flex items-baseline gap-2">
                  <b className="text-[20px] text-[#102a43]">110</b>
                  <span className="text-[11px] text-[#e95050]">▲ 5</span>
                </div>
              </div>
              <div className="border border-[#e3edf3] rounded-xl p-3 bg-[#fbfdfe]">
                <small className="block text-[#64788a] text-[11px] font-bold mb-1">Resp Rate (rpm)</small>
                <div className="flex items-baseline gap-2">
                  <b className="text-[20px] text-[#102a43]">28</b>
                  <span className="text-[11px] text-[#a0b2c3]">-</span>
                </div>
              </div>
              <div className="border border-[#e3edf3] rounded-xl p-3 bg-[#fbfdfe]">
                <small className="block text-[#64788a] text-[11px] font-bold mb-1">Blood Pressure</small>
                <div className="flex items-baseline gap-2">
                  <b className="text-[20px] text-[#102a43]">120/80</b>
                </div>
              </div>
            </div>
          </div>

          {/* Fluid Plan */}
          <div className="bg-white border border-[#e3edf3] rounded-[18px] shadow-[0_14px_35px_rgba(16,42,67,.07)] p-5 shrink-0">
            <h3 className="m-0 mb-4 text-[16px] font-bold text-[#102a43]">Fluid Plan 💧</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#64788a]">Fluid Type:</span>
                <b className="text-[#102a43] truncate pl-2">Lactated Ringer's</b>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#64788a]">Rate:</span>
                <b className="text-[#102a43]">90 ml/hr</b>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#64788a]">Total Infused (Today):</span>
                <b className="text-[#0f8f83]">720 ml</b>
              </div>
              <div className="mt-4 bg-[#f6f9fb] rounded-full h-2.5 w-full overflow-hidden">
                <div className="bg-[#276db6] h-full rounded-full" style={{ width: '45%' }}></div>
              </div>
              <div className="text-right text-[11px] text-[#64788a] mt-1">45% of 1600ml daily target</div>
            </div>
          </div>

          {/* IPD Cost Estimation */}
          <div className="bg-white border border-[#e3edf3] rounded-[18px] shadow-[0_14px_35px_rgba(16,42,67,.07)] p-5 shrink-0 min-h-[180px]">
            <h3 className="m-0 mb-3 text-[16px] font-bold text-[#102a43]">Estimated Cost</h3>
            <div className="bg-[#fff8ea] border border-[#f3dcaa] rounded-xl p-4 text-[#77500a] text-sm">
              <div className="flex justify-between mb-2">
                <span>Room / Ward (2 Days):</span>
                <b>1,000 ฿</b>
              </div>
              <div className="flex justify-between mb-2">
                <span>Medication & Fluid:</span>
                <b>1,450 ฿</b>
              </div>
              <div className="flex justify-between mb-2">
                <span>Nursing Care:</span>
                <b>600 ฿</b>
              </div>
              <div className="border-t border-[#f3dcaa] mt-2 pt-2 flex justify-between font-bold text-[16px]">
                <span>Total (Current):</span>
                <span className="text-[#e95050]">3,050 ฿</span>
              </div>
            </div>
          </div>
        </aside>

      </div>

      {/* ================= EXTRA TASK MODAL POPUP ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#102a43]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#e3edf3] rounded-2xl w-full max-w-md shadow-2xl p-6 animate-scaleIn">
            <h3 className="m-0 mb-4 text-base font-bold text-[#102a43]">➕ เพิ่มรายการคำสั่งการรักษาพิเศษ (Extra Task)</h3>
            <form onSubmit={handleAddTask} className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-[#64788a]">เวลาทำรายการ</label>
                  <input type="time" required value={newTask.time} onChange={(e) => setNewTask({ ...newTask, time: e.target.value })} className="border border-[#e3edf3] rounded-xl p-2.5 text-[#102a43]" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-[#64788a]">ประเภทงาน</label>
                  <select value={newTask.category} onChange={(e) => setNewTask({ ...newTask, category: e.target.value })} className="border border-[#e3edf3] rounded-xl p-2.5 text-[#102a43] bg-white">
                    <option value="Med">Med (ยาสั่ง)</option>
                    <option value="Check">Check (การตรวจชีพจร)</option>
                    <option value="Care">Care (การจัดการกรง)</option>
                    <option value="Fluid">Fluid (สารน้ำ)</option>
                    <option value="Feed">Feed (อาหารการกิน)</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-bold text-[#64788a]">หัวข้อแผนงาน / รายละเอียดตัวยา *</label>
                <input type="text" required placeholder="เช่น Tramadol เจือจางบำรุงแก้อาการปวด" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} className="border border-[#e3edf3] rounded-xl p-2.5 text-[#102a43]" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-bold text-[#64788a]">ปริมาณ / เส้นทางการให้ยา (Dose / Route)</label>
                <input type="text" placeholder="เช่น 2 mg/kg IV หรือ ทุก ๆ 4 ชั่งโมง" value={newTask.dose} onChange={(e) => setNewTask({ ...newTask, dose: e.target.value })} className="border border-[#e3edf3] rounded-xl p-2.5 text-[#102a43]" />
              </div>
              <div className="pt-2 flex gap-3 justify-end">
                <button type="button" onClick={() => setIsModalOpen(false)} className="border border-gray-300 rounded-xl px-4 py-2 font-bold text-gray-500 bg-white cursor-pointer">ยกเลิก</button>
                <button type="submit" className="border-0 bg-[#0f8f83] text-white font-bold px-5 py-2 rounded-xl shadow-sm hover:opacity-90 cursor-pointer">บันทึกคำสั่ง</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}