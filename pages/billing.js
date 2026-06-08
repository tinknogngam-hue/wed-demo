// src/pages/billing.js
import React, { useState } from 'react';

// ข้อมูลจำลองสำหรับระบบปิดบิลแยกคิวตามสถานะการชำระเงิน (Mock Invoice Master Data)
const mockInvoices = {
  pending: [
    {
      id: 'INV-240606-01', pet: 'Lucky', emoji: '🐶', breed: 'Golden Retriever', owner: 'คุณณวรรณ สุขใจ', tel: '081-234-5678', typeLabel: 'OPD + Lab + Meds', doctor: 'สพ.ญ. นัทธสร สุขใจ', date: '06/06/2026 10:45 AM',
      items: [
        { name: 'Doctor Fee (OPD)', desc: 'ค่าธรรมเนียมสัตวแพทย์ห้องตรวจ', qty: 1, price: 500, discount: 0 },
        { name: 'CBC & Blood Chemistry (Standard)', desc: 'เจาะตรวจวิเคราะห์ผลเลือดทั่วไป', qty: 1, price: 1200, discount: 0 },
        { name: 'Digital X-Ray (Thorax 2 Views)', desc: 'ภาพถ่ายเอกซเรย์ช่องอก 2 ท่า', qty: 1, price: 1000, discount: 0 },
        { name: 'Maropitant 16mg (Injection)', desc: 'ยาระงับอาการอาเจียนชนิดฉีดเข้าหลอดเลือด', qty: 1, price: 350, discount: 35 }
      ],
      subtotal: 3050, discountTotal: 35, vat: 197.24, netTotal: 3015
    },
    {
      id: 'INV-240606-02', pet: 'Mochi', emoji: '🐱', breed: 'Persian Cat', owner: 'คุณสมหมาย ใจดี', tel: '089-765-4321', typeLabel: 'Vaccine Package', doctor: 'น.สพ. วิทยา รักษาดี', date: '06/06/2026 11:15 AM',
      items: [
        { name: 'Feline Core Vaccine Package', desc: 'ชุดวัคซีนรวมแมวประจำปีและตรวจร่างกาย', qty: 1, price: 1200, discount: 100 }
      ],
      subtotal: 1200, discountTotal: 100, vat: 71.96, netTotal: 1100
    },
    {
      id: 'INV-240606-03', pet: 'Snowy', emoji: '🐰', breed: 'Rabbit', owner: 'คุณสมหญิง รักสัตว์', tel: '085-333-2211', typeLabel: 'Grooming & Spa', doctor: 'ฝ่ายบริการสปาตัดขน', date: '06/06/2026 11:40 AM',
      items: [
        { name: 'Medical Grooming & Haircut', desc: 'บริการตัดขนสั้นเพื่อการรักษาโรคผิวหนัง', qty: 1, price: 450, discount: 0 },
        { name: 'Ozone Microbubble Spa', desc: 'สปาฟองอากาศฆ่าเชื้อแบคทีเรียผิวหนัง', qty: 1, price: 200, discount: 0 }
      ],
      subtotal: 650, discountTotal: 0, vat: 42.52, netTotal: 650
    }
  ],
  completed: [
    {
      id: 'INV-240605-09', pet: 'Charly', emoji: '🐶', breed: 'Poodle', owner: 'คุณวรรณา นามดี', tel: '082-111-2222', typeLabel: 'Meds Only', doctor: 'สพ.ญ. นัทธสร สุขใจ', date: '05/06/2026 04:20 PM',
      items: [{ name: 'Heartworm Preventive Medication', desc: 'ยากันพยาธิหนอนหัวใจรายเดือน', qty: 1, price: 450, discount: 0 }],
      subtotal: 450, discountTotal: 0, vat: 29.44, netTotal: 450
    }
  ],
  debt: [
    {
      id: 'INV-240520-02', pet: 'Tiger', emoji: '🐶', breed: 'Thai Dog', owner: 'คุณวิชัย มานะ', tel: '086-444-5555', typeLabel: 'Emergency Post-op', doctor: 'น.สพ. วิทยา รักษาดี', date: '20/05/2026 02:10 AM',
      items: [{ name: 'Emergency Surgery Pack & ICU Stay', desc: 'ผ่าตัดด่วนกรณีสิ่งแปลกปลอมอุดตันและพักฟื้น', qty: 1, price: 15000, discount: 1500 }],
      subtotal: 15000, discountTotal: 1500, vat: 883.18, netTotal: 13500
    }
  ]
};

export default function BillingPage() {
  // State คัดกรองคิวบิลฝั่งซ้าย ('pending' | 'completed' | 'debt')
  const [invoiceFilter, setInvoiceFilter] = useState('pending');
  
  // State ล็อกรหัสใบเสร็จปิดบิลที่เปิดรีวิวดูรายละเอียดฝั่งขวา
  const [selectedInvId, setSelectedInvId] = useState('INV-240606-01');
  
  // State สลับประเภทการชำระเงินปิดกล่องท้ายบิล ('cash' | 'card' | 'qr')
  const [paymentMethod, setPaymentMethod] = useState('cash');

  // State เปิด/ปิด หน้ากากโมดอลป้อนสร้างใบแจ้งหนี้ปิดบิลด่วน (Manual Invoice)
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [manualInvoice, setManualInvoice] = useState({ ownerName: '', petName: '', itemName: '', totalAmount: '' });

  // State แสดงข้อความกล่องป๊อปอัพแจ้งเตือน Toast Alert ด้านบนจอ
  const [toastAlert, setToastAlert] = useState('');

  const triggerToast = (msg) => {
    setToastAlert(msg);
    setTimeout(() => setToastAlert(''), 4000);
  };

  // ฟังก์ชันป้องกันบั๊กกรณีสลับแท็บคิวแล้วไม่เจอไอดีเดิม ให้จับตัวแรกสุดขึ้นมาแสดงเป็นค่าเริ่มต้นแทน
  const currentList = mockInvoices[invoiceFilter] || [];
  let activeInvoice = currentList.find(i => i.id === selectedInvId) || currentList[0];

  // ฟังก์ชันรองรับเมื่อกดบันทึกเพิ่มใบหนี้關บิลแมนนวลจากตัวโมดอลฟอร์ม
  const handleCreateManualInvoice = (e) => {
    e.preventDefault();
    if (!manualInvoice.ownerName || !manualInvoice.totalAmount) return;

    const parsedPrice = parseFloat(manualInvoice.totalAmount) || 0;
    const itemObj = {
      id: `INV-240606-M${Math.floor(Math.random() * 90) + 10}`,
      pet: manualInvoice.petName || 'ไม่ระบุชื่อ',
      emoji: '✨',
      breed: 'สินค้าหน้าเคาน์เตอร์',
      owner: manualInvoice.ownerName,
      tel: '-',
      typeLabel: 'Manual Invoice Item',
      doctor: 'Cashier Counter',
      date: 'Just Now',
      items: [{ name: manualInvoice.itemName || 'สินค้าทั่วไป / บริการเวชภัณฑ์ด่วน', desc: 'รายการเปิดบิลแมนนวลหน้าห้องการเงิน', qty: 1, price: parsedPrice, discount: 0 }],
      subtotal: parsedPrice,
      discountTotal: 0,
      vat: parseFloat((parsedPrice * 0.07).toFixed(2)),
      netTotal: parsedPrice
    };

    mockInvoices.pending.unshift(itemObj);
    setIsManualModalOpen(false);
    setInvoiceFilter('pending');
    setSelectedInvId(itemObj.id);
    setManualInvoice({ ownerName: '', petName: '', itemName: '', totalAmount: '' });
    triggerToast('➕ สร้างใบเรียกเก็บเงินแมนนวลเข้าระบบการเงินสำเร็จคิวอัปเดตแล้ว');
  };

  return (
    <div className="h-screen flex flex-col p-4 md:p-6 bg-[#f6f9fb] overflow-hidden relative">
      
      {/* Toast Alert Pop-up Notification */}
      {toastAlert && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#102a43] text-white text-sm px-6 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-white/10 animate-fadeIn">
          <span className="font-bold">{toastAlert}</span>
          <button onClick={() => setToastAlert('')} className="bg-transparent border-0 text-white/50 hover:text-white cursor-pointer ml-2">✕</button>
        </div>
      )}

      {/* Topbar ของหน้า Billing */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] lg:grid-cols-[1fr_450px] gap-4 items-center mb-4 shrink-0">
        <div>
          <h2 className="m-0 text-[26px] md:text-[28px] font-bold text-[#102a43]">Billing & Cashier</h2>
          <p className="m-0 mt-1 text-[#64788a] text-sm">ระบบชำระเงิน ออกใบเสร็จ และจัดการส่วนลด</p>
        </div>
        <div className="bg-white border border-[#e3edf3] rounded-2xl p-[13px_16px] text-[#7a8fa0] shadow-[0_14px_35px_rgba(16,42,67,.07)] text-sm w-full">
          <input type="text" placeholder="🔎 Search invoice / patient / owner / phone..." className="w-full bg-transparent border-0 outline-none" />
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 shrink-0 gap-3">
        <div className="text-[13px] text-[#64788a]">Home › Billing › Pending Invoices</div>
        <div className="flex flex-wrap gap-2.5">
          <button onClick={() => triggerToast('📊 เปิดประวัติสรุปยอดสรุปการเงินและนำส่งเงิน (Daily Cash Report)')} className="border border-[#e3edf3] rounded-xl px-[15px] py-[10px] font-[850] cursor-pointer text-sm bg-white text-[#35546a] hover:bg-[#f6f9fb] transition-colors">
            📊 Daily Report
          </button>
          <button onClick={() => setIsManualModalOpen(true)} className="border border-[#e3edf3] rounded-xl px-[15px] py-[10px] font-[850] cursor-pointer text-sm bg-white text-[#35546a] hover:bg-[#f6f9fb] transition-colors">
            📝 Create Manual Invoice
          </button>
        </div>
      </div>

      {/* พื้นที่หลัก (ซ้าย: คิวรอชำระเงิน | ขวา: รายละเอียดบิลและชำระเงิน) */}
      <div className="grid grid-cols-1 lg:grid-cols-[330px_1fr] xl:grid-cols-[360px_1fr] gap-4 lg:gap-[18px] flex-1 min-h-0 overflow-hidden">
        
        {/* ================= LEFT PANEL: Invoice Worklist ================= */}
        <div className="bg-white border border-[#e3edf3] rounded-[18px] shadow-[0_14px_35px_rgba(16,42,67,.07)] flex flex-col overflow-hidden h-full">
          <div className="p-[16px_18px] border-b border-[#e3edf3] bg-[#fbfdfe] shrink-0">
            <h3 className="m-0 text-[16px] font-bold text-[#102a43] flex justify-between items-center">
              Payments Worklist
              <span className="bg-[#fff4e2] text-[#b86b00] text-[12px] px-2 py-0.5 rounded-md font-bold">{currentList.length} Invoices</span>
            </h3>
            
            {/* ชุดสลับประเภทฟิลเตอร์ข้อมูลคิวค้างจ่ายชำระเงิน */}
            <div className="flex gap-1 bg-[#f2f6f8] p-1 rounded-xl text-[11px] font-bold mt-3">
              <button onClick={() => setInvoiceFilter('pending')} className={`flex-1 py-1.5 rounded-md border-0 cursor-pointer transition-all ${invoiceFilter === 'pending' ? 'bg-white text-[#0f8f83] shadow-xs' : 'text-[#64788a] bg-transparent hover:bg-white/40'}`}>Pending</button>
              <button onClick={() => setInvoiceFilter('completed')} className={`flex-1 py-1.5 rounded-md border-0 cursor-pointer transition-all ${invoiceFilter === 'completed' ? 'bg-white text-[#0f8f83] shadow-xs' : 'text-[#64788a] bg-transparent hover:bg-white/40'}`}>Done</button>
              <button onClick={() => setInvoiceFilter('debt')} className={`flex-1 py-1.5 rounded-md border-0 cursor-pointer transition-all ${invoiceFilter === 'debt' ? 'bg-white text-red-600 shadow-xs' : 'text-[#64788a] bg-transparent hover:bg-white/40'}`}>Debt/AR</button>
            </div>
          </div>

          {/* รายชื่อการ์ดบิลดึงข้อมูลผูกระบบคลิกแบบเรียลไทม์ */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
            {currentList.length === 0 ? (
              <div className="text-center py-8 text-xs text-gray-400 font-bold">ไม่มีประวัติบิลในหมวดหมู่นี้</div>
            ) : (
              currentList.map((inv) => (
                <div 
                  key={inv.id}
                  onClick={() => setSelectedInvId(inv.id)}
                  className={`border rounded-xl p-3 cursor-pointer transition-all ${activeInvoice && activeInvoice.id === inv.id ? 'border-[#8dd7ce] bg-gradient-to-b from-[#effaf7] to-white shadow-sm' : 'border-[#e3edf3] bg-white hover:border-[#8dd7ce]'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <b className="text-[12px] text-[#102a43]">{inv.id}</b>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded ${invoiceFilter === 'pending' ? 'bg-[#fff4e2] text-[#b86b00]' : invoiceFilter === 'completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {invoiceFilter === 'pending' ? 'Waiting' : invoiceFilter === 'completed' ? 'Paid' : 'Unpaid Claim'}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-[42px] h-[42px] rounded-lg bg-[#fff1d8] grid place-items-center text-[22px] shrink-0">{inv.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <b className="text-[14px] text-[#102a43] block truncate">{inv.pet} ({inv.breed})</b>
                      <span className="text-[12px] text-[#64788a] block truncate">{inv.owner}</span>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between items-end border-t border-[#e3edf3] pt-2">
                    <span className="text-[11px] text-[#64788a]">{inv.typeLabel}</span>
                    <b className={`text-[15px] ${invoiceFilter === 'debt' ? 'text-red-600' : 'text-[#e95050]'}`}>฿ {inv.netTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</b>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ================= RIGHT PANEL: Invoice Detail & Payment ================= */}
        {activeInvoice ? (
          <div className="bg-white border border-[#e3edf3] rounded-[18px] shadow-[0_14px_35px_rgba(16,42,67,.07)] flex flex-col overflow-hidden h-full">
            
            {/* Details Header HUD */}
            <div className="p-4 md:p-[20px_24px] border-b border-[#e3edf3] bg-[#fbfdfe] flex flex-col sm:flex-row justify-between items-start gap-3 shrink-0">
              <div>
                <h2 className="m-0 text-xl md:text-[22px] font-bold text-[#102a43] flex flex-wrap items-center gap-2">
                  Invoice: {activeInvoice.id}
                  <span className={`text-[12px] px-2.5 py-0.5 rounded-md font-black ${invoiceFilter === 'pending' ? 'bg-[#fff4e2] text-[#b86b00]' : invoiceFilter === 'completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {invoiceFilter === 'pending' ? 'Pending Cashier' : invoiceFilter === 'completed' ? 'Settled Report' : 'Account Receivable'}
                  </span>
                </h2>
                <div className="mt-2 text-xs md:text-[13px] text-[#64788a]">
                  Date: {activeInvoice.date} • หมอผู้ดูแล: <span className="font-bold text-gray-700">{activeInvoice.doctor}</span>
                </div>
              </div>
              <div className="text-left sm:text-right text-xs md:text-[13px]">
                <b className="text-[#102a43]">ชื่อลูกค้า: {activeInvoice.owner}</b>
                <div className="text-[#64788a] mt-0.5">ติดต่อ: {activeInvoice.tel}</div>
                <div className="text-[#64788a]">คนไข้: {activeInvoice.pet} ({activeInvoice.breed})</div>
              </div>
            </div>

            {/* Table Items - ครอบ Scroll กันตารางดันขอบล้ม */}
            <div className="flex-1 overflow-auto p-[0_24px]">
              <table className="w-full text-left border-collapse mt-4 min-w-[650px]">
                <thead className="sticky top-0 bg-white z-10">
                  <tr className="text-[12px] text-[#64788a] border-b border-[#e3edf3]">
                    <th className="py-2.5 font-bold w-[40px]">#</th>
                    <th className="py-2.5 font-bold">Item Description / หัตถการเวชภัณฑ์</th>
                    <th className="py-2.5 font-bold text-center w-[60px]">Qty</th>
                    <th className="py-2.5 font-bold text-right w-[100px]">Unit Price</th>
                    <th className="py-2.5 font-bold text-right w-[90px]">Discount</th>
                    <th className="py-2.5 font-bold text-right w-[110px]">Amount (฿)</th>
                  </tr>
                </thead>
                <tbody className="text-[13px] text-[#102a43]">
                  {activeInvoice.items.map((item, index) => (
                    <tr key={index} className="border-b border-[#e3edf3] hover:bg-gray-50/40">
                      <td className="py-3.5 text-[#64788a]">{index + 1}</td>
                      <td className="py-3.5">
                        <b className="text-sm">{item.name}</b><br/>
                        <small className="text-[#64788a] text-xs">{item.desc}</small>
                      </td>
                      <td className="py-3.5 text-center font-bold">{item.qty}</td>
                      <td className="py-3.5 text-right font-mono">{item.price.toFixed(2)}</td>
                      <td className={`py-3.5 text-right font-mono ${item.discount > 0 ? 'text-[#0f8f83] font-bold' : 'text-gray-400'}`}>{item.discount > 0 ? `-${item.discount.toFixed(2)}` : '0.00'}</td>
                      <td className="py-3.5 text-right font-black font-mono">{(item.qty * item.price - item.discount).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Note & Add Item Actions */}
              <div className="mt-4 flex gap-2">
                <button onClick={() => triggerToast('➕ เปิดหน้าต่างเลือกคลังเวชภัณฑ์/บริการตรวจรักษา เพิ่มเติมเข้าสู่รายการบิล')} className="text-[12px] font-black text-[#0f8f83] bg-[#e9f7f4] px-3 py-1.5 rounded-lg border border-[#0f8f83] hover:bg-[#0f8f83] hover:text-white transition-colors cursor-pointer">
                  + Add Item
                </button>
                <button onClick={() => triggerToast('🎟️ ระบบเปิดใช้งานคูปองส่วนลดสมาชิก/ส่วนลดพิเศษประธานบริหาร')} className="text-[12px] font-black text-[#35546a] bg-white px-3 py-1.5 rounded-lg border border-[#e3edf3] hover:bg-gray-50 transition-colors cursor-pointer">
                  + Add Discount
                </button>
              </div>
            </div>

            {/* Payment Section (Bottom Summary HUD) */}
            <div className="bg-[#fbfdfe] border-t border-[#e3edf3] p-4 md:p-[18px_24px] shrink-0 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 border-b rounded-b-[18px]">
              
              {/* Left Column: Payment Methods Choice */}
              <div className="flex flex-col justify-between gap-3 text-sm">
                <div>
                  <h3 className="m-0 mb-2.5 text-[12px] font-bold text-[#64788a] uppercase tracking-wider">ช่องทางการรับชำระเงิน</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <div 
                      onClick={() => setPaymentMethod('cash')}
                      className={`border-2 rounded-xl p-2.5 text-center cursor-pointer select-none transition-all ${paymentMethod === 'cash' ? 'border-[#0f8f83] bg-[#e9f7f4]' : 'border-[#e3edf3] bg-white hover:border-gray-300'}`}
                    >
                      <span className="block text-xl mb-0.5">💵</span>
                      <b className={`text-xs ${paymentMethod === 'cash' ? 'text-[#0f8f83]' : 'text-[#35546a]'}`}>Cash</b>
                    </div>
                    <div 
                      onClick={() => setPaymentMethod('card')}
                      className={`border-2 rounded-xl p-2.5 text-center cursor-pointer select-none transition-all ${paymentMethod === 'card' ? 'border-[#0f8f83] bg-[#e9f7f4]' : 'border-[#e3edf3] bg-white hover:border-gray-300'}`}
                    >
                      <span className="block text-xl mb-0.5">💳</span>
                      <b className={`text-xs ${paymentMethod === 'card' ? 'text-[#0f8f83]' : 'text-[#35546a]'}`}>Credit Card</b>
                    </div>
                    <div 
                      onClick={() => setPaymentMethod('qr')}
                      className={`border-2 rounded-xl p-2.5 text-center cursor-pointer select-none transition-all ${paymentMethod === 'qr' ? 'border-[#0f8f83] bg-[#e9f7f4]' : 'border-[#e3edf3] bg-white hover:border-gray-300'}`}
                    >
                      <span className="block text-xl mb-0.5">📱</span>
                      <b className={`text-xs ${paymentMethod === 'qr' ? 'text-[#0f8f83]' : 'text-[#35546a]'}`}>PromptPay</b>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-[#64788a] uppercase">Internal Note / บันทึกภายในของเจ้าหน้าที่</label>
                  <input placeholder="พิมพ์ระบุข้อมูลหมายเหตุประกอบการรับเงิน..." className="border border-[#e3edf3] rounded-lg px-3 py-2 text-sm outline-none w-full bg-white text-[#102a43] focus:border-[#0f8f83]" />
                </div>
              </div>

              {/* Right Column: Summary Totals Calculation Info */}
              <div className="flex flex-col justify-end text-sm text-[#102a43]">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[#64788a]">Subtotal (ราคารวมก่อนหักส่วนลด):</span>
                  <b className="font-mono">฿ {activeInvoice.subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</b>
                </div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[#0f8f83] font-bold">Discount (ส่วนลดท้ายบิลสะสม):</span>
                  <b className="text-[#0f8f83] font-mono">- ฿ {activeInvoice.discountTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</b>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[#64788a]">VAT (รวมภาษีมูลค่าเพิ่ม 7%):</span>
                  <b className="font-mono text-gray-500">฿ {activeInvoice.vat.toLocaleString(undefined, { minimumFractionDigits: 2 })}</b>
                </div>
                <div className="flex justify-between items-center border-t border-[#e3edf3] pt-2 mb-4">
                  <span className="text-base font-black text-[#102a43]">ยอดสุทธิที่รับชำระ (Net Total):</span>
                  <b className="text-2xl font-black text-[#e95050] font-mono">฿ {activeInvoice.netTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</b>
                </div>
                
                {/* กลุ่มปุ่มควบคุมคำสั่ง Print & Save ท้ายบิล */}
                <div className="flex gap-2 justify-end shrink-0">
                  <button onClick={() => triggerToast(`🖨️ ออกใบพิมพ์ใบประเมินราคาล่วงหน้า (Quotation) ของบิลเลขที่ ${activeInvoice.id} สำเร็จ`)} className="border border-[#e3edf3] rounded-xl px-[15px] py-[11px] font-black cursor-pointer text-xs bg-white text-[#35546a] hover:bg-gray-50 transition-colors">
                    🖨️ Print Estimate
                  </button>
                  <button 
                    onClick={() => {
                      triggerToast(`✅ ปิดยอดรับเงินสำเร็จ! ได้ทำการบันทึกใบเสร็จรับเงินเลขที่ ${activeInvoice.id} ลงบัญชีคลังและพิมพ์ฉลากเสร็จสิ้น`);
                      if(invoiceFilter === 'pending') {
                        // ปรับย้ายคิวจำลองจากใบงานรอจ่าย sang จ่ายเงินเรียบร้อย
                        mockInvoices.completed.unshift({...activeInvoice, netTotal: activeInvoice.netTotal});
                        mockInvoices.pending = mockInvoices.pending.filter(i => i.id !== activeInvoice.id);
                        setInvoiceFilter('completed');
                      }
                    }}
                    className="border-0 rounded-xl px-[18px] py-[11px] font-black cursor-pointer text-xs bg-gradient-to-r from-[#0f8f83] to-[#0b6d87] text-white shadow-sm hover:opacity-90 flex items-center gap-1.5 transition-opacity"
                  >
                    Confirm Paid & Receipt <span>→</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        ) : (
          <div className="bg-white border border-dashed border-gray-300 rounded-[18px] flex items-center justify-center font-bold text-gray-400 text-sm">ไม่พบเอกสารใบแจ้งหนี้ปิดงวดงานระบบโรงพยาบาล</div>
        )}

      </div>

      {/* ================= CREATE MANUAL INVOICE POPUP MODAL ================= */}
      {isManualModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#102a43]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#e3edf3] rounded-2xl w-full max-w-md shadow-2xl p-6 animate-scaleIn">
            <h3 className="m-0 mb-4 text-base font-bold text-[#102a43]">📝 ออกใบแจ้งหนี้แบบคีย์เองหน้าร้าน (Manual Invoice Form)</h3>
            <form onSubmit={handleCreateManualInvoice} className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-[#35546a]">ชื่อเจ้าของสัตว์เลี้ยง *</label>
                  <input required type="text" placeholder="เช่น คุณสมศักดิ์ รักดี" value={manualInvoice.ownerName} onChange={(e) => setManualInvoice({ ...manualInvoice, ownerName: e.target.value })} className="border border-[#e3edf3] rounded-xl p-2.5 outline-none text-[#102a43] focus:border-[#0f8f83]" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-[#35546a]">ชื่อสัตว์เลี้ยง</label>
                  <input type="text" placeholder="เช่น ถุงทอง" value={manualInvoice.petName} onChange={(e) => setManualInvoice({ ...manualInvoice, petName: e.target.value })} className="border border-[#e3edf3] rounded-xl p-2.5 outline-none text-[#102a43] focus:border-[#0f8f83]" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-bold text-[#35546a]">ชื่อสินค้า / รายการที่สั่งซื้อเบิกด่วน *</label>
                <input required type="text" placeholder="เช่น อาหารเม็ดโรคไต Royal Canin Renal 2kg" value={manualInvoice.itemName} onChange={(e) => setManualInvoice({ ...manualInvoice, itemName: e.target.value })} className="border border-[#e3edf3] rounded-xl p-2.5 outline-none text-[#102a43] focus:border-[#0f8f83]" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-bold text-[#35546a]">จำนวนยอดเงินรวมเรียกเก็บ (฿) *</label>
                <input required type="number" min="0" placeholder="0.00" value={manualInvoice.totalAmount} onChange={(e) => setManualInvoice({ ...manualInvoice, totalAmount: e.target.value })} className="border border-[#e3edf3] rounded-xl p-2.5 outline-none text-[#102a43] focus:border-[#0f8f83] font-mono font-bold" />
              </div>
              <div className="pt-2 flex gap-3 justify-end">
                <button type="button" onClick={() => setIsManualModalOpen(false)} className="border border-gray-300 rounded-xl px-4 py-2 font-bold text-gray-500 bg-white cursor-pointer hover:bg-gray-50 transition-colors">ยกเลิก</button>
                <button type="submit" className="border-0 bg-[#0f8f83] text-white font-bold px-5 py-2 rounded-xl shadow-sm hover:opacity-90 cursor-pointer">เปิดบิลชำระเงิน</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}