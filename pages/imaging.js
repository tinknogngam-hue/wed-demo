// src/pages/imaging.js
import React, { useState } from 'react';

// ข้อมูลจำลองสำหรับผู้ป่วยทางรังสีวิทยา (Mock Radiology Worklist Data)
const mockOrders = {
  pending: [
    {
      id: 'ACC-240606-01',
      pet: 'Lucky',
      species: 'Dog',
      breed: 'Golden Retriever',
      mrn: 'P240001',
      age: '5Y 2M',
      modality: 'DX (X-Ray)',
      priority: 'STAT',
      time: '09:15 AM',
      study: 'Thorax AP/LAT (2 Views)',
      reason: 'Coughing, R/O Pneumonia',
      kvp: '80', mas: '5', thk: '15cm',
      images: { ap: '🩻 Canine Thorax AP (Image 1/2)', lat: '🦴 Canine Thorax LAT (Image 2/2)' },
      findings: 'Cardiac silhouette is normal in size and shape. Pulmonary vasculature appears unremarkable. No evidence of alveolar or interstitial infiltrates. Pleural space is clear.',
      impression: '1. Unremarkable thoracic radiographs. No signs of active pneumonia.'
    },
    {
      id: 'ACC-240606-02',
      pet: 'Mochi',
      species: 'Cat',
      breed: 'Persian Cat',
      mrn: 'P240155',
      age: '3Y 1M',
      modality: 'US (Ultrasound)',
      priority: 'Routine',
      time: '10:30 AM',
      study: 'Whole Abdomen US',
      reason: 'Chronic vomiting, CKD check',
      kvp: 'Freq: 12MHz', mas: 'Gain: 55', thk: 'Depth: 4cm',
      images: { ap: '🍏 Kidneys & Bladder US Scan', lat: '🌀 Hepatic & Splenic Parenchyma' },
      findings: 'Both kidneys appear smaller in size with irregular margins. Loss of corticomedullary differentiation noted. Mild mineralization in the left renal pelvis.',
      impression: '1. Bilateral chronic renal parenchymal disease, consistent with IRIS CKD Staging.'
    }
  ],
  completed: [
    {
      id: 'ACC-240606-03',
      pet: 'Bella',
      species: 'Dog',
      breed: 'Poodle',
      mrn: 'P240089',
      age: '8Y 4M',
      modality: 'DX (X-Ray)',
      priority: 'Routine',
      time: '08:15 AM',
      study: 'Spine AP/LAT (Thoracolumbar)',
      reason: 'Hindlimb weakness, Pain evaluation',
      kvp: '75', mas: '4', thk: '10cm',
      images: { ap: '🦴 Spine Vertebrae AP Line', lat: '🩻 Lateral Intervertebral Disc Space' },
      findings: 'Narrowing of the intervertebral disc spaces at T13-L1 and L1-L2. Sclerosis of the adjacent vertebral endplates. Mild osteophyte formation.',
      impression: '1. Intervertebral Disc Disease (IVDD) at thoracolumbar junction.'
    }
  ]
};

// ข้อมูลจำลองสำหรับเทมเพลตคำอ่านผลฟิล์มสำเร็จรูป (Radiology Report Templates)
const reportTemplates = {
  normal: {
    findings: 'Cardiac silhouette is normal in size and shape. Pulmonary vasculature appears unremarkable. No evidence of alveolar or interstitial infiltrates. Pleural space is clear.',
    impression: '1. Unremarkable thoracic radiographs. No significant cardiopulmonary abnormalities detected.'
  },
  pneumonia: {
    findings: 'Increased alveolar infiltration and patchy radiopacity seen in the right middle and cranial lung lobes. Air bronchograms are prominent. Interstitial markings are increased generalized.',
    impression: '1. Radiographic signs strongly suggestive of alveolar pneumonia. Clinical and therapeutic monitoring recommended.'
  },
  cardiomegaly: {
    findings: 'Generalized cardiomegaly is noted with elevation of the trachea on the lateral view. Left atrial enlargement is evident by a "straightening" of the caudal waist. VHS is measured at 11.5.',
    impression: '1. Cardiomegaly with radiographic patterns suggestive of left-sided heart disease. Rule out congestive heart failure.'
  }
};

// ข้อมูลจำลองประวัติการอัปโหลดไฟล์ DICOM
const mockDicomUploads = [
  { id: 'DCM-8801', filename: 'STUDY_LUCKY_AP.dcm', size: '18.4 MB', targetCage: 'ICU-01', status: 'Synced to PACS' },
  { id: 'DCM-8802', filename: 'STUDY_LUCKY_LAT.dcm', size: '17.9 MB', targetCage: 'ICU-01', status: 'Synced to PACS' },
  { id: 'DCM-8803', filename: 'US_MOCHI_ABDOMEN.dcm', size: '42.1 MB', targetCage: 'OPD-02', status: 'Processing' }
];

// ข้อมูลจำลองเครื่องมือตรวจรังสี (Modality Master Setup)
const mockModalities = [
  { id: 'MOD-01', name: 'Digital X-Ray System Room 1', type: 'DX (X-Ray)', aeTitle: 'CR_ROOM_01', ip: '192.168.1.120', port: '104', connection: 'Connected' },
  { id: 'MOD-02', name: 'Mindray Ultrasound OPD 2', type: 'US (Ultrasound)', aeTitle: 'US_OPD_02', ip: '192.168.1.125', port: '11112', connection: 'Connected' }
];

export default function ImagingPage() {
  // State ควบคุมหน้าจอทำงานปัจจุบันจากทูลบาร์ ('worklist' | 'upload' | 'setup')
  const [currentView, setCurrentView] = useState('worklist');

  // State คัดกรองคิวหลักซ้ายมือ (pending / completed)
  const [worklistStatus, setWorklistStatus] = useState('pending');
  
  // State เลือกใบงานสั่งตรวจทางรังสีวิทยาปัจจุบัน
  const [selectedOrderId, setSelectedOrderId] = useState('ACC-240606-01');
  
  // State สลับฟิล์มภาพเอกซเรย์กรงมองมุมกล้อง ('ap' | 'lat')
  const [viewOrientation, setViewOrientation] = useState('ap');
  
  // State บันทึกข้อมูลข้อความอ่านผลใน Textarea
  const [reportFindings, setReportFindings] = useState(mockOrders.pending[0].findings);
  const [reportImpression, setReportImpression] = useState(mockOrders.pending[0].impression);
  const [reportStatus, setReportStatus] = useState('Draft');

  // State สำหรับเปิด/ปิด และจัดการข้อมูลฟอร์มเพิ่มแผนงานนัดถ่ายภาพใหม่ (Modal)
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({ petName: '', mrn: '', modality: 'DX (X-Ray)', study: '', reason: '' });

  // State ตัวแจ้งเตือนด่วน Toast Message
  const [toastAlert, setToastAlert] = useState('');

  const triggerToast = (msg) => {
    setToastAlert(msg);
    setTimeout(() => setToastAlert(''), 4000);
  };

  const handleSelectOrder = (order) => {
    setSelectedOrderId(order.id);
    setViewOrientation('ap');
    setReportFindings(order.findings);
    setReportImpression(order.impression);
    setReportStatus(order.id === 'ACC-240606-03' ? 'Completed' : 'Draft');
  };

  const handleApplyTemplate = (e) => {
    const val = e.target.value;
    if (reportTemplates[val]) {
      setReportFindings(reportTemplates[val].findings);
      setReportImpression(reportTemplates[val].impression);
      triggerToast(`📋 ปรับใช้เทมเพลตรายงานรูปแบบ ${val.toUpperCase()} เรียบร้อย`);
    }
  };

  const handleCreateOrder = (e) => {
    e.preventDefault();
    if (!newOrder.petName || !newOrder.study) return;

    const createdItem = {
      id: `ACC-240606-0${mockOrders.pending.length + 3}`,
      pet: newOrder.petName,
      species: 'Patient',
      breed: 'Mixed Breed',
      mrn: newOrder.mrn || `P2400${mockOrders.pending.length + 5}`,
      age: 'Unknown',
      modality: newOrder.modality,
      priority: 'Routine',
      time: 'Just Now',
      study: newOrder.study,
      reason: newOrder.reason || '-',
      kvp: '70', mas: '4', thk: '12cm',
      images: { ap: '🩻 Custom Transverse View AP', lat: '🦴 Custom Sagittal View LAT' },
      findings: 'No significant abnormalities detected within the visualized structures.',
      impression: '1. Unremarkable radiographic evaluation.'
    };

    mockOrders.pending.push(createdItem);
    setIsOrderModalOpen(false);
    setCurrentView('worklist');
    setWorklistStatus('pending');
    handleSelectOrder(createdItem);
    setNewOrder({ petName: '', mrn: '', modality: 'DX (X-Ray)', study: '', reason: '' });
    triggerToast('➕ สร้างใบคำสั่งสั่งถ่ายภาพเข้าระบบคิวหลักสำเร็จ');
  };

  const currentList = mockOrders[worklistStatus] || [];
  let activeOrder = currentList.find(o => o.id === selectedOrderId) || currentList[0];

  return (
    <div className="h-screen flex flex-col p-4 md:p-6 bg-[#f6f9fb] overflow-hidden relative">
      
      {/* Toast Alert */}
      {toastAlert && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#102a43] text-white text-sm px-6 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-white/10 animate-fadeIn">
          <span className="font-bold">{toastAlert}</span>
          <button onClick={() => setToastAlert('')} className="bg-transparent border-0 text-white/50 hover:text-white cursor-pointer ml-2">✕</button>
        </div>
      )}

      {/* Topbar ของหน้า Imaging */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] lg:grid-cols-[1fr_450px] gap-4 items-center mb-4 shrink-0">
        <div>
          <h2 className="m-0 text-[26px] md:text-[28px] font-bold text-[#102a43]">Imaging & Radiology</h2>
          <p className="m-0 mt-1 text-[#64788a] text-sm">ระบบเอกซเรย์ อัลตราซาวด์ และการอ่านผล (PACS Integration)</p>
        </div>
        <div className="bg-white border border-[#e3edf3] rounded-2xl p-[13px_16px] text-[#7a8fa0] shadow-[0_14px_35px_rgba(16,42,67,.07)] text-sm w-full">
          <input type="text" placeholder="🔎 Search patient / MRN / Accession No. / Modality..." className="w-full bg-transparent border-0 outline-none" />
        </div>
      </div>

      {/* Toolbar - ปรับการเชื่อมสเตตไฮไลท์ตามปุ่มกดสลับโหมดใช้งานจริง */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 shrink-0 gap-3">
        <div className="text-[13px] text-[#64788a]">
          Home › Imaging › {currentView === 'worklist' && 'Modality Worklist'} {currentView === 'upload' && 'Upload DICOM Repository'} {currentView === 'setup' && 'Modality Master Configuration'}
        </div>
        <div className="flex flex-wrap gap-2.5">
          <button 
            onClick={() => setCurrentView('worklist')}
            className={`border rounded-xl px-[15px] py-[10px] font-[850] cursor-pointer text-sm transition-all ${currentView === 'worklist' ? 'bg-[#0f8f83] text-white border-[#0f8f83] shadow-sm' : 'bg-white text-[#35546a] border-[#e3edf3] hover:bg-[#f6f9fb]'}`}
          >
            🩻 Modality Worklist
          </button>
          <button 
            onClick={() => setCurrentView('upload')}
            className={`border rounded-xl px-[15px] py-[10px] font-[850] cursor-pointer text-sm transition-all ${currentView === 'upload' ? 'bg-[#0f8f83] text-white border-[#0f8f83] shadow-sm' : 'bg-white text-[#35546a] border-[#e3edf3] hover:bg-[#f6f9fb]'}`}
          >
            📥 Upload DICOM
          </button>
          <button 
            onClick={() => setCurrentView('setup')}
            className={`border rounded-xl px-[15px] py-[10px] font-[850] cursor-pointer text-sm transition-all ${currentView === 'setup' ? 'bg-[#0f8f83] text-white border-[#0f8f83] shadow-sm' : 'bg-white text-[#35546a] border-[#e3edf3] hover:bg-[#f6f9fb]'}`}
          >
            ⚙️ Modality Setup
          </button>
          <button 
            onClick={() => setIsOrderModalOpen(true)} 
            className="border-0 rounded-xl px-[15px] py-[10px] font-[850] cursor-pointer text-sm bg-gradient-to-r from-[#0f8f83] to-[#0b6d87] text-white shadow-sm hover:opacity-90 flex items-center gap-2"
          >
            <span>➕</span> New Order
          </button>
        </div>
      </div>

      {/* พื้นที่หลักการประมวลผลข้อมูลส่วนคอนเทนต์ */}
      <div className="flex-1 min-h-0 overflow-hidden">
        
        {/* VIEW 1: โหมดหน้าหลักเครื่องตรวจประมวลผลฟิล์มรังสี (WORKLIST & PACS) */}
        {currentView === 'worklist' && (
          <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] xl:grid-cols-[380px_1fr] gap-4 lg:gap-[18px] h-full overflow-hidden animate-fadeIn">
            {/* ฝั่งซ้าย: Worklist Queue */}
            <div className="bg-white border border-[#e3edf3] rounded-[18px] shadow-[0_14px_35px_rgba(16,42,67,.07)] flex flex-col overflow-hidden h-full">
              <div className="p-4 border-b border-[#e3edf3] bg-[#fbfdfe] shrink-0">
                <h3 className="m-0 text-[16px] font-bold text-[#102a43] flex justify-between items-center">
                  Today's Worklist
                  <span className="bg-[#e9f7f4] text-[#0f8f83] text-[12px] px-2 py-0.5 rounded-md font-bold">8 Orders</span>
                </h3>
                <div className="flex gap-1 bg-[#f2f6f8] p-1 rounded-xl text-[12px] mt-3">
                  <button onClick={() => setWorklistStatus('pending')} className={`flex-1 py-1.5 rounded-lg font-[850] border-0 cursor-pointer transition-all ${worklistStatus === 'pending' ? 'bg-white text-[#0f8f83] shadow-sm' : 'text-[#64788a] bg-transparent hover:bg-white/50'}`}>Pending ({mockOrders.pending.length})</button>
                  <button onClick={() => setWorklistStatus('completed')} className={`flex-1 py-1.5 rounded-lg font-[850] border-0 cursor-pointer transition-all ${worklistStatus === 'completed' ? 'bg-white text-[#0f8f83] shadow-sm' : 'text-[#64788a] bg-transparent hover:bg-white/50'}`}>Completed ({mockOrders.completed.length})</button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
                {currentList.map((order) => (
                  <div 
                    key={order.id}
                    onClick={() => handleSelectOrder(order)}
                    className={`border rounded-xl p-3 cursor-pointer transition-all ${activeOrder && activeOrder.id === order.id ? 'border-[#8dd7ce] bg-gradient-to-b from-[#effaf7] to-white shadow-sm' : 'border-[#e3edf3] bg-white hover:border-[#8dd7ce]'}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-white text-[10px] font-bold px-2 py-0.5 rounded ${order.modality.includes('US') ? 'bg-[#276db6]' : 'bg-[#102a43]'}`}>{order.modality}</span>
                      <span className={`text-[11px] font-bold ${order.priority === 'STAT' ? 'text-[#e95050]' : 'text-[#64788a]'}`}>{order.priority === 'STAT' ? 'STAT' : order.time}</span>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-[42px] h-[42px] rounded-lg bg-[#fff1d8] grid place-items-center text-[22px] shrink-0">{order.species.includes('Cat') ? '🐱' : '🐶'}</div>
                      <div><b className="text-[14px] text-[#102a43] block">{order.pet} ({order.breed})</b><span className="text-[12px] text-[#64788a]">MRN: {order.mrn} • {order.age}</span></div>
                    </div>
                    <div className="mt-2 text-[13px] text-[#35546a] border-t border-[#e3edf3] pt-2">
                      <b>Study:</b> {order.study}<br/><span className="text-[#64788a] text-xs">Reason: {order.reason}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ฝั่งขวา: PACS Viewer & Report Engine */}
            {activeOrder ? (
              <div className="flex flex-col gap-4 lg:gap-[18px] min-h-0 h-full overflow-hidden">
                <div className="bg-[#111827] rounded-[18px] flex-1 flex flex-col overflow-hidden relative shadow-lg border border-gray-800">
                  <div className="h-12 bg-[#1f2937] border-b border-[#374151] flex items-center justify-between px-4 shrink-0">
                    <div className="text-white/80 text-xs md:text-[13px] font-medium flex flex-wrap gap-x-4 gap-y-1 py-1">
                      <span><b className="text-white">Patient:</b> {activeOrder.pet} ({activeOrder.mrn})</span>
                      <span><b className="text-white">Study:</b> {activeOrder.study}</span>
                    </div>
                    <div className="flex gap-1">
                      {['🌗', '🔍', '📐', '🔀'].map((icon, idx) => (
                        <button key={idx} onClick={() => triggerToast(`🛠️ เปิดเครื่องมือแต่งภาพ [${icon}]`)} className="text-white/70 hover:text-white bg-transparent hover:bg-[#374151] p-1.5 border-0 rounded-lg transition-colors cursor-pointer text-sm">{icon}</button>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 relative flex items-center justify-center p-4 min-h-0">
                    <div className="absolute top-4 left-4 text-[#9ca3af] text-[11px] font-mono leading-tight bg-[#111827]/60 p-1.5 rounded-lg">kVp: {activeOrder.kvp}<br/>mAs: {activeOrder.mas}<br/>Thk: {activeOrder.thk}</div>
                    <div className="w-[85%] sm:w-[70%] h-[80%] border border-[#374151] bg-[#1f2937] flex flex-col items-center justify-center rounded-xl opacity-90 shadow-2xl">
                      <span className="text-[54px] md:text-[64px] mb-3 drop-shadow-lg">🩻</span>
                      <span className="text-white font-bold text-center text-xs md:text-sm px-4">{viewOrientation === 'ap' ? activeOrder.images.ap : activeOrder.images.lat}</span>
                    </div>
                    <div className="absolute bottom-4 left-4 flex gap-2 shrink-0">
                      <div onClick={() => setViewOrientation('ap')} className={`w-16 h-16 md:w-20 md:h-20 rounded-lg border-2 flex items-center justify-center text-[10px] font-bold transition-all cursor-pointer text-center p-1 ${viewOrientation === 'ap' ? 'bg-[#374151] border-[#0f8f83] text-white' : 'bg-[#111827] border-gray-700 text-gray-500'}`}>View A<br/>(AP)</div>
                      <div onClick={() => setViewOrientation('lat')} className={`w-16 h-16 md:w-20 md:h-20 rounded-lg border-2 flex items-center justify-center text-[10px] font-bold transition-all cursor-pointer text-center p-1 ${viewOrientation === 'lat' ? 'bg-[#374151] border-[#0f8f83] text-white' : 'bg-[#111827] border-gray-700 text-gray-500'}`}>View B<br/>(LAT)</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-[#e3edf3] rounded-[18px] shadow-md h-[290px] flex flex-col shrink-0 overflow-hidden">
                  <div className="p-3 md:p-[12px_20px] border-b border-[#e3edf3] bg-[#fbfdfe] flex justify-between items-center shrink-0 gap-2">
                    <h3 className="m-0 text-[15px] font-bold text-[#102a43]">📝 Radiology Report</h3>
                    <select onChange={handleApplyTemplate} className="border border-[#e3edf3] rounded-lg px-2 py-1.5 text-xs bg-white outline-none text-[#35546a] font-bold cursor-pointer hover:bg-gray-50">
                      <option value="">-- Quick Template --</option>
                      <option value="normal">Normal Findings</option>
                      <option value="pneumonia">Pneumonia / Infiltrates</option>
                      <option value="cardiomegaly">Cardiomegaly</option>
                    </select>
                  </div>
                  <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-[#fbfdfe]/50">
                    <div className="flex-1 flex flex-col gap-1 min-h-[70px]"><label className="text-[11px] font-bold text-[#64788a]">Findings</label><textarea value={reportFindings} onChange={(e) => setReportFindings(e.target.value)} className="flex-1 border border-[#e3edf3] rounded-xl p-2.5 text-xs md:text-[13px] outline-none bg-white resize-none focus:border-[#0f8f83] shadow-inner"></textarea></div>
                    <div className="flex-1 flex flex-col gap-1 min-h-[60px]"><label className="text-[11px] font-bold text-[#64788a]">Impression</label><textarea value={reportImpression} onChange={(e) => setReportImpression(e.target.value)} className="flex-1 border border-[#e3edf3] rounded-xl p-2.5 text-xs md:text-[13px] outline-none bg-white resize-none focus:border-[#0f8f83] shadow-inner"></textarea></div>
                  </div>
                  <div className="p-3 md:p-[12px_20px] border-t border-[#e3edf3] bg-[#fbfdfe] flex justify-between items-center shrink-0">
                    <span className="text-[12px] text-[#64788a]">Status: <b className={`ml-1 font-bold ${reportStatus === 'Completed' ? 'text-[#0f9f6e]' : 'text-[#b86b00]'}`}>{reportStatus}</b></span>
                    <div className="flex gap-2">
                      <button onClick={() => { setReportStatus('Draft'); triggerToast('💾 บันทึกแบบร่างผลอ่านสำเร็จ'); }} className="border border-[#e3edf3] rounded-xl px-3.5 py-2 font-[850] text-xs bg-white text-[#35546a] hover:bg-[#f6f9fb]">Save Draft</button>
                      <button onClick={() => { setReportStatus('Completed'); triggerToast(`🎉 อนุมัติรายงานผลรังสีเคส ${activeOrder.id} เข้าระบบประวัติเสร็จสิ้น`); }} className="border-0 rounded-xl px-4 py-2 font-[850] bg-[#0f9f6e] text-white text-xs shadow-sm hover:opacity-90">Sign Report</button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white border rounded-[18px] flex items-center justify-center text-gray-400 font-bold text-sm">ไม่พบรายการสั่งตรวจคิวงานทางรังสี</div>
            )}
          </div>
        )}

        {/* VIEW MODE 2: หน้าอัปโหลดไฟล์ฟิล์มอิสระ (UPLOAD DICOM REPOSITORY) */}
        {currentView === 'upload' && (
          <div className="bg-white border border-[#e3edf3] rounded-[18px] shadow-sm p-5 md:p-6 h-full flex flex-col overflow-hidden animate-fadeIn">
            <h3 className="m-0 mb-4 text-base font-bold text-[#102a43] border-b pb-3 shrink-0">📥 นำเข้าไฟล์ภาพมาตรฐานการแพทย์ (DICOM File Uploader Terminal)</h3>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-5 flex-1 min-h-0 overflow-hidden">
              {/* โซน Drag & Drop อัปโหลด */}
              <div onClick={() => triggerToast('📂 เปิดระบบเรียกดูไฟล์ระบบคอมพิวเตอร์ของคุณเพื่อเลือกรูปภาพ...')} className="border-2 border-dashed border-[#0f8f83] bg-gray-50/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-inner cursor-pointer hover:bg-gray-50 transition-colors h-48 md:h-full">
                <span className="text-4xl mb-2">📁</span>
                <b className="text-sm text-[#102a43] block">Drag & Drop DICOM Files</b>
                <p className="text-xs text-[#64788a] mt-1 m-0">หรือคลิกบริเวณนี้เพื่อเลือกไฟล์นามสกุล .dcm จากเครื่องคอมพิวเตอร์</p>
              </div>
              {/* ตารางแสดงไฟล์ล่าสุด */}
              <div className="flex flex-col min-h-0 h-full overflow-hidden">
                <b className="text-xs font-bold text-[#64788a] uppercase tracking-wider mb-2 block">รายการประวัติการอัปโหลดไฟล์ (Recent Upload Log)</b>
                <div className="flex-1 overflow-auto border rounded-xl bg-white">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 font-bold border-b"><th className="p-3">File ID</th><th className="p-3">ชื่อไฟล์เวชศาสตร์</th><th className="p-3">ขนาดไฟล์</th><th className="p-3">กรงรับสัตว์</th><th className="p-3 text-right">สถานะคลัง PACS</th></tr>
                    </thead>
                    <tbody className="text-[#102a43]">
                      {mockDicomUploads.map((d) => (
                        <tr key={d.id} className="border-b hover:bg-gray-50/50">
                          <td className="p-3 font-mono text-gray-400 font-bold">{d.id}</td>
                          <td className="p-3 font-bold">{d.filename}</td>
                          <td className="p-3 text-gray-500 font-medium">{d.size}</td>
                          <td className="p-3 font-mono font-bold text-[#276db6]">{d.targetCage}</td>
                          <td className={`p-3 text-right font-black ${d.status.includes('Synced') ? 'text-[#0f8f83]' : 'text-amber-600'}`}>{d.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW MODE 3: หน้าตั้งค่าพอร์ตพารามิเตอร์ระบบเครื่องจักร (MODALITY SETUP) */}
        {currentView === 'setup' && (
          <div className="bg-white border border-[#e3edf3] rounded-[18px] shadow-sm p-5 md:p-6 h-full flex flex-col overflow-hidden animate-fadeIn">
            <h3 className="m-0 mb-4 text-base font-bold text-[#102a43] border-b pb-3 shrink-0">⚙️ การเชื่อมต่อโหนดและเครื่องรับส่งสัญญาณภาพรังสี (Modality PACS Configuration)</h3>
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_350px] gap-6 flex-1 min-h-0 overflow-hidden">
              {/* ตารางแสดงเครื่องจักรหลัก */}
              <div className="overflow-auto border rounded-xl bg-white h-full">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 font-bold border-b"><th className="p-3">เครื่องมือ</th><th className="p-3">ประเภท</th><th className="p-3">AE Title</th><th className="p-3">IP Address</th><th className="p-3">Port</th><th className="p-3 text-right">การเชื่อมต่อ</th></tr>
                  </thead>
                  <tbody className="text-[#102a43] text-sm">
                    {mockModalities.map((m) => (
                      <tr key={m.id} className="border-b hover:bg-gray-50/50">
                        <td className="p-3 font-bold">{m.name}</td>
                        <td className="p-3"><span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs font-bold">{m.type}</span></td>
                        <td className="p-3 font-mono font-bold text-gray-600">{m.aeTitle}</td>
                        <td className="p-3 font-mono text-gray-500">{m.ip}</td>
                        <td className="p-3 font-mono text-gray-500">{m.port}</td>
                        <td className="p-3 text-right text-green-600 font-black">● {m.connection}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* ฟอร์มสั้นขวามือสั่ง Ping ทราฟฟิกทดสอบโหนดเชื่อมโยง */}
              <div className="bg-gray-50 rounded-2xl p-4 border text-xs space-y-3 shrink-0 h-fit">
                <b className="text-sm font-bold text-[#102a43] block border-b pb-1.5">📡 ทดสอบการส่งสัญญาณเครือข่าย (C-ECHO Ping)</b>
                <div className="flex flex-col gap-1"><label className="font-bold text-gray-600">เลือกโหนดเครื่องส่งสัญญาณ</label><select className="border p-2 rounded-lg bg-white font-medium outline-none"><option>PACS_DR01 (เครื่องเอกซเรย์)</option><option>PACS_US02 (เครื่องอัลตราซาวด์)</option></select></div>
                <button type="button" onClick={() => triggerToast('📡 ส่งสัญญาณทดสอบ DICOM Verification C-ECHO SUCCESS! โหนดปลายทางทำงานปกติ')} className="w-full bg-[#102a43] text-white py-2 rounded-xl font-bold border-0 cursor-pointer shadow-sm">ส่งคำสั่งทดสอบ (Verify Connection)</button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ================= NEW IMAGING ORDER REGISTRATION MODAL ================= */}
      {isOrderModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#102a43]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#e3edf3] rounded-2xl w-full max-w-md shadow-2xl p-6 animate-scaleIn">
            <h3 className="m-0 mb-4 text-base font-bold text-[#102a43]">➕ ออกใบส่งตรวจทางรังสีวิทยาและภาพถ่ายใหม่</h3>
            <form onSubmit={handleCreateOrder} className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1"><label className="font-bold text-[#35546a]">ชื่อสัตว์เลี้ยง *</label><input required type="text" placeholder="เช่น บราวนี่" value={newOrder.petName} onChange={(e) => setNewOrder({ ...newOrder, petName: e.target.value })} className="border border-[#e3edf3] rounded-xl p-2.5 outline-none text-[#102a43]" /></div>
                <div className="flex flex-col gap-1"><label className="font-bold text-[#35546a]">รหัสประจำตัว MRN</label><input type="text" placeholder="เช่น P24099" value={newOrder.mrn} onChange={(e) => setNewOrder({ ...newOrder, mrn: e.target.value })} className="border border-[#e3edf3] rounded-xl p-2.5 outline-none text-[#102a43]" /></div>
              </div>
              <div className="flex flex-col gap-1"><label className="font-bold text-[#35546a]">เทคนิคเครื่องส่งตรวจ (Modality) *</label><select value={newOrder.modality} onChange={(e) => setNewOrder({ ...newOrder, modality: e.target.value })} className="border border-[#e3edf3] rounded-xl p-2.5 text-[#102a43] bg-white outline-none"><option value="DX (X-Ray)">DX (Digital X-Ray)</option><option value="US (Ultrasound)">US (Ultrasound Dynamic)</option></select></div>
              <div className="flex flex-col gap-1"><label className="font-bold text-[#35546a]">ตำแหน่งบริเวณที่ต้องการถ่ายภาพ *</label><input required type="text" placeholder="เช่น Abdomen AP/LAT" value={newOrder.study} onChange={(e) => setNewOrder({ ...newOrder, study: e.target.value })} className="border border-[#e3edf3] rounded-xl p-2.5 outline-none text-[#102a43]" /></div>
              <div className="flex flex-col gap-1"><label className="font-bold text-[#35546a]">อาการสำคัญที่สงสัย (Indication)</label><input type="text" placeholder="เช่น อาเจียนเรื้อรัง สงสัยสิ่งแปลกปลอม" value={newOrder.reason} onChange={(e) => setNewOrder({ ...newOrder, reason: e.target.value })} className="border border-[#e3edf3] rounded-xl p-2.5 outline-none text-[#102a43]" /></div>
              <div className="pt-2 flex gap-3 justify-end">
                <button type="button" onClick={() => setIsOrderModalOpen(false)} className="border border-gray-300 rounded-xl px-4 py-2 font-bold text-gray-500 bg-white cursor-pointer">ยกเลิก</button>
                <button type="submit" className="border-0 bg-[#0f8f83] text-white font-bold px-5 py-2 rounded-xl shadow-sm cursor-pointer">สร้างใบส่งตรวจ</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}