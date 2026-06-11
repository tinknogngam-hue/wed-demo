import React, { useState } from 'react';
import {
  X, Search, ClipboardList, FileText, Dog, Pill, AlertTriangle,
  Printer, Camera, Download, Scale, Package, ChevronRight,
} from 'lucide-react';

// ── Static mock data ─────────────────────────────────────────────────────────

const RX_ITEMS = [
  {
    drug: 'Maropitant (Cerenia) 16mg', form: 'Tablet', stock: 142,
    sig: 'กินครั้งละ 1 เม็ด วันละ 1 ครั้ง (OD)', duration: '4 วัน', qty: 4, unit: 'Tab',
  },
  {
    drug: 'Omeprazole 20mg', form: 'Capsule', stock: 580,
    sig: 'กินครั้งละ 1 แคปซูล วันละ 1 ครั้ง ก่อนอาหารเช้า', duration: '7 วัน', qty: 7, unit: 'Cap',
  },
];

const DRUG_MASTER = [
  { code: 'MED-001', name: 'Maropitant (Cerenia) 16mg',            group: 'ยาควบคุม - แก้อาเจียน', regNo: 'Reg.No 1A 45/62',  stock: 142, unit: 'Tab',    price: '85 ฿'    },
  { code: 'MED-002', name: 'Omeprazole 20mg',                       group: 'ยาอันตราย - ลดกรด',    regNo: 'Reg.No 1A 102/58', stock: 580, unit: 'Cap',    price: '12 ฿'    },
  { code: 'MED-003', name: 'Amoxicillin + Clavulanic Acid 250mg',   group: 'ยาปฏิชีวนะ',           regNo: 'Reg.No 2A 12/60',  stock: 320, unit: 'Tab',    price: '35 ฿'    },
  { code: 'MED-004', name: 'Semintra 4 mg/mL Oral Sol.',            group: 'ยาอันตราย - โรคไต',    regNo: 'Reg.No 1A 88/64',  stock: 18,  unit: 'Bottle', price: '1,450 ฿' },
];

const STOCK_ITEMS = [
  { name: 'Maropitant 16mg', stock: 142, unit: 'Tabs', lot: 'L2024-05', exp: '12/2025', reorder: 50,  lastReceived: '15 พ.ค. 2567' },
  { name: 'Omeprazole 20mg', stock: 580, unit: 'Caps', lot: 'A119-2',   exp: '08/2026', reorder: 100, lastReceived: '02 มิ.ย. 2567' },
];

// ── Modal shell ──────────────────────────────────────────────────────────────
function Modal({ title, onClose, children, maxWidth = 'max-w-md' }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onMouseDown={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div
        className={`relative bg-white rounded-2xl shadow-2xl w-full ${maxWidth} max-h-[90vh] flex flex-col`}
        onMouseDown={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-[#e3edf3] shrink-0">
          <h3 className="text-[15px] font-bold text-[#102a43] m-0">{title}</h3>
          <button onClick={onClose} className="p-1.5 hover:bg-[#f0f5f8] rounded-lg cursor-pointer text-[#9ab0bc] hover:text-[#39576d] border-0 bg-transparent">
            <X size={16} />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 px-5 py-4">{children}</div>
      </div>
    </div>
  );
}

// ── Form helpers ─────────────────────────────────────────────────────────────
function FRow({ label, children }) {
  return (
    <div className="mb-3.5">
      <label className="block text-[12px] font-semibold text-[#39576d] mb-1">{label}</label>
      {children}
    </div>
  );
}
const F = 'w-full border border-[#e3edf3] rounded-xl px-3 py-2.5 text-[13px] text-[#102a43] bg-[#f8fafc] focus:outline-none focus:border-[#0f8f83] transition-colors';
const FInput  = (props) => <input  {...props} className={F} />;
const FSelect = ({ children, ...p }) => <select {...p} className={F}>{children}</select>;

const BtnPrimary = ({ onClick, type = 'button', children }) => (
  <button type={type} onClick={onClick} className="flex-1 py-2.5 rounded-xl text-[13px] font-semibold bg-[#0f8f83] hover:bg-[#0a7a70] text-white cursor-pointer border-0">
    {children}
  </button>
);
const BtnSecondary = ({ onClick, children }) => (
  <button onClick={onClick} className="flex-1 py-2.5 rounded-xl text-[13px] font-semibold border border-[#e3edf3] text-[#64788a] hover:bg-[#f0f5f8] cursor-pointer bg-transparent">
    {children}
  </button>
);
const ModalFooter = ({ children }) => (
  <div className="flex gap-2 mt-5 pt-4 border-t border-[#e3edf3]">{children}</div>
);

// ── Label preview card (reused in printLabel + printAll) ─────────────────────
function LabelCard({ item }) {
  return (
    <div className="border border-[#e3edf3] rounded-xl p-3.5 bg-[#f8fafc]">
      <div className="flex justify-between items-start mb-2">
        <div className="text-[10px] text-[#9ab0bc] font-bold tracking-widest">VetCare · RX-2405012</div>
        <div className="text-[10px] text-[#9ab0bc]">09/06/2567</div>
      </div>
      <div className="font-bold text-[13px] text-[#102a43]">{item.drug}</div>
      <div className="text-[11px] text-[#64788a] mt-0.5">Lucky · Golden Retriever · 32.5 kg</div>
      <div className="border-t border-[#e3edf3] mt-2 pt-2">
        <div className="text-[12px] font-semibold text-[#102a43]">{item.sig}</div>
        <div className="text-[11px] text-[#9ab0bc] mt-0.5">ระยะเวลา {item.duration} · จ่าย {item.qty} {item.unit}</div>
        <div className="text-[10px] text-[#9ab0bc] mt-1">สพ.ญ. นัทธสร สุขใจ</div>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function PharmacyPage() {
  const [pharmacyView, setPharmacyView] = useState('pending');
  const [toastMsg, setToastMsg]         = useState('');
  const [modal, setModal]               = useState(null);
  const [modalData, setModalData]       = useState(null);

  // Dose calculator inputs
  const doseWeight = 32.5; // readonly — auto-filled from patient record
  const [doseMgKg, setDoseMgKg] = useState('');
  const [doseConc, setDoseConc] = useState('');

  const closeModal = () => { setModal(null); setModalData(null); };
  const done = (msg) => { closeModal(); setToastMsg(msg); };

  const openPrintLabel = (item) => { setModalData(item); setModal('printLabel'); };
  const openStockDetail = (item) => { setModalData(item); setModal('stockDetail'); };

  const handleCalcDose = () => {
    const mgKgNum = parseFloat(doseMgKg);
    const concNum = parseFloat(doseConc);
    const result  = doseWeight * mgKgNum / concNum;
    setModalData({
      weight: doseWeight,
      mgKg:   doseMgKg || '—',
      conc:   doseConc || '—',
      result: !isNaN(result) && isFinite(result) ? result.toFixed(2) : null,
    });
    setModal('doseResult');
  };

  return (
    <div className="h-full flex flex-col p-4 md:p-6 bg-[#f6f9fb] overflow-hidden">

      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#102a43] text-white text-sm px-6 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-white/10">
          <span className="font-bold">{toastMsg}</span>
          <button onClick={() => setToastMsg('')} className="bg-transparent border-0 text-white/50 hover:text-white cursor-pointer ml-2"><X size={14} /></button>
        </div>
      )}

      {/* ── Modal: Print Single Label ── */}
      {modal === 'printLabel' && modalData && (
        <Modal title="พิมพ์ฉลากยา" onClose={closeModal}>
          <p className="text-[13px] text-[#64788a] mb-3">ตัวอย่างฉลากที่จะพิมพ์:</p>
          <LabelCard item={modalData} />
          <ModalFooter>
            <BtnSecondary onClick={closeModal}>ยกเลิก</BtnSecondary>
            <BtnPrimary onClick={() => done(`พิมพ์ฉลาก ${modalData.drug} สำเร็จ`)}>
              <span className="flex items-center justify-center gap-1.5"><Printer size={14} /> พิมพ์ฉลาก</span>
            </BtnPrimary>
          </ModalFooter>
        </Modal>
      )}

      {/* ── Modal: Print All Labels ── */}
      {modal === 'printAll' && (
        <Modal title="พิมพ์ฉลากยาทั้งหมด" onClose={closeModal} maxWidth="max-w-lg">
          <p className="text-[13px] text-[#64788a] mb-3">ฉลากทั้ง {RX_ITEMS.length} รายการในใบสั่งยา RX-2405012:</p>
          <div className="space-y-3 mb-2">
            {RX_ITEMS.map((item, i) => <LabelCard key={i} item={item} />)}
          </div>
          <ModalFooter>
            <BtnSecondary onClick={closeModal}>ยกเลิก</BtnSecondary>
            <BtnPrimary onClick={() => done('พิมพ์ฉลากยาทุกรายการสำเร็จ')}>
              <span className="flex items-center justify-center gap-1.5"><Printer size={14} /> พิมพ์ทั้งหมด ({RX_ITEMS.length} ฉลาก)</span>
            </BtnPrimary>
          </ModalFooter>
        </Modal>
      )}

      {/* ── Modal: Confirm Dispense ── */}
      {modal === 'confirmDispense' && (
        <Modal title="ยืนยันการจ่ายยาและตัดสต๊อก" onClose={closeModal} maxWidth="max-w-lg">
          <div className="bg-[#fff4e2] border border-[#fcd5a0] rounded-xl px-4 py-3 flex items-center gap-2 text-[13px] font-semibold text-[#b86b00] mb-4">
            <AlertTriangle size={15} /> กรุณาตรวจสอบรายการยาก่อนยืนยัน
          </div>
          <div className="mb-4">
            <div className="text-[12px] font-bold text-[#9ab0bc] uppercase tracking-wide mb-2">รายการยาที่จ่าย</div>
            <div className="border border-[#e3edf3] rounded-xl overflow-hidden">
              {RX_ITEMS.map((item, i) => (
                <div key={i} className={`flex items-center justify-between px-4 py-3 ${i < RX_ITEMS.length - 1 ? 'border-b border-[#f0f5f8]' : ''}`}>
                  <div>
                    <div className="font-semibold text-[13px] text-[#102a43]">{item.drug}</div>
                    <div className="text-[11px] text-[#64788a]">{item.sig}</div>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <div className="font-bold text-[#0f8f83]">{item.qty} {item.unit}</div>
                    <div className="text-[11px] text-[#9ab0bc]">Stock: {item.stock - item.qty} เหลือ</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2 text-[13px]">
            {[
              ['ใบสั่งยา', 'RX-2405012'],
              ['คนไข้', 'Lucky · Golden Retriever · 32.5 kg'],
              ['แพทย์', 'สพ.ญ. นัทธสร สุขใจ'],
              ['การดำเนินการ', 'ตัดสต๊อกคลังยา + ส่งบิลไปฝ่ายการเงิน'],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between">
                <span className="text-[#9ab0bc]">{label}</span>
                <span className="font-semibold text-[#39576d]">{value}</span>
              </div>
            ))}
          </div>
          <ModalFooter>
            <BtnSecondary onClick={closeModal}>ยกเลิก</BtnSecondary>
            <BtnPrimary onClick={() => done('จ่ายยาเสร็จสิ้น ตัดสต๊อกและส่งบิลสำเร็จ')}>
              <span className="flex items-center justify-center gap-1.5">ยืนยันจ่ายยา <ChevronRight size={14} /></span>
            </BtnPrimary>
          </ModalFooter>
        </Modal>
      )}

      {/* ── Modal: Register New Drug ── */}
      {modal === 'registerDrug' && (
        <Modal title="ขึ้นทะเบียนยาใหม่" onClose={closeModal} maxWidth="max-w-lg">
          <div className="grid grid-cols-2 gap-x-3">
            <FRow label="รหัสยา (Drug Code)"><FInput placeholder="เช่น MED-005" /></FRow>
            <FRow label="เลขทะเบียนยา"><FInput placeholder="Reg.No …" /></FRow>
          </div>
          <FRow label="ชื่อยา / เวชภัณฑ์ *"><FInput placeholder="ชื่อสามัญทางยา + ความแรง" /></FRow>
          <FRow label="หมวดหมู่กลุ่มยา">
            <FSelect>
              <option>ยาควบคุม - แก้อาเจียน</option>
              <option>ยาอันตราย - ลดกรด</option>
              <option>ยาปฏิชีวนะ</option>
              <option>ยาอันตราย - โรคไต</option>
              <option>วัคซีน</option>
              <option>เวชภัณฑ์ทั่วไป</option>
            </FSelect>
          </FRow>
          <div className="grid grid-cols-3 gap-x-3">
            <FRow label="หน่วยนับ">
              <FSelect>
                <option>Tab</option>
                <option>Cap</option>
                <option>Bottle</option>
                <option>Vial</option>
                <option>Bag</option>
                <option>Box</option>
              </FSelect>
            </FRow>
            <FRow label="ราคาต่อหน่วย (฿)"><FInput type="number" placeholder="0.00" min="0" /></FRow>
            <FRow label="สต๊อกเริ่มต้น"><FInput type="number" placeholder="0" min="0" /></FRow>
          </div>
          <ModalFooter>
            <BtnSecondary onClick={closeModal}>ยกเลิก</BtnSecondary>
            <BtnPrimary onClick={() => done('ลงทะเบียนยาใหม่เข้าระบบสำเร็จ')}>บันทึก</BtnPrimary>
          </ModalFooter>
        </Modal>
      )}

      {/* ── Modal: Dose Calculation Result ── */}
      {modal === 'doseResult' && modalData && (
        <Modal title="ผลการคำนวณโดสยา" onClose={closeModal} maxWidth="max-w-sm">
          <div className="space-y-2 mb-4">
            {[
              ['น้ำหนักผู้ป่วย', `${modalData.weight} kg`],
              ['อัตราโดส', `${modalData.mgKg} mg/kg`],
              ['ความเข้มข้นยา', `${modalData.conc} mg/unit`],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between items-center py-2 border-b border-[#f0f5f8]">
                <span className="text-[12px] text-[#9ab0bc]">{label}</span>
                <span className="text-[13px] font-bold text-[#39576d]">{value}</span>
              </div>
            ))}
          </div>
          {modalData.result ? (
            <div className="bg-[#e9f7f4] border border-[#0f8f83]/20 rounded-xl p-4 text-center">
              <div className="text-[11px] font-bold text-[#0f8f83] uppercase tracking-wide mb-1">ปริมาณยาที่แนะนำ</div>
              <div className="text-[32px] font-black text-[#0f8f83] leading-none">{modalData.result}</div>
              <div className="text-[13px] text-[#64788a] mt-1">unit / ครั้ง</div>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-center text-[13px] text-red-500 font-semibold">
              กรุณากรอกค่า Dose (mg/kg) และ Concentration ให้ครบก่อนคำนวณ
            </div>
          )}
          <ModalFooter>
            <BtnSecondary onClick={closeModal}>ปิด</BtnSecondary>
            {modalData.result && (
              <BtnPrimary onClick={() => done('บันทึกผลการคำนวณโดสแล้ว')}>บันทึกผล</BtnPrimary>
            )}
          </ModalFooter>
        </Modal>
      )}

      {/* ── Modal: Stock Detail ── */}
      {modal === 'stockDetail' && modalData && (
        <Modal title={`Stock Detail: ${modalData.name}`} onClose={closeModal} maxWidth="max-w-sm">
          <div className="space-y-1 mb-4">
            {[
              ['คงเหลือในคลัง',    `${modalData.stock} ${modalData.unit}`],
              ['Lot Number',        modalData.lot],
              ['วันหมดอายุ',       modalData.exp],
              ['Reorder Point',     `${modalData.reorder} ${modalData.unit}`],
              ['รับเข้าล่าสุด',    modalData.lastReceived],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between items-center py-2.5 border-b border-[#f0f5f8] last:border-0">
                <span className="text-[12px] text-[#9ab0bc]">{label}</span>
                <span className={`text-[13px] font-bold ${label === 'คงเหลือในคลัง' ? 'text-[#0f8f83]' : 'text-[#39576d]'}`}>{value}</span>
              </div>
            ))}
          </div>
          {modalData.stock <= modalData.reorder && (
            <div className="bg-[#fff4e2] border border-[#fcd5a0] rounded-xl px-3 py-2.5 flex items-center gap-2 text-[12px] font-semibold text-[#b86b00] mb-2">
              <AlertTriangle size={13} /> สต๊อกต่ำกว่าจุด Reorder — ควรสั่งซื้อเพิ่ม
            </div>
          )}
          <ModalFooter>
            <BtnSecondary onClick={closeModal}>ปิด</BtnSecondary>
            <BtnPrimary onClick={() => done(`ส่งคำขอสั่งซื้อ ${modalData.name} แล้ว`)}>
              <span className="flex items-center justify-center gap-1.5"><Package size={14} /> Request Reorder</span>
            </BtnPrimary>
          </ModalFooter>
        </Modal>
      )}

      {/* ── Topbar ── */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] lg:grid-cols-[1fr_450px] gap-4 items-center mb-4 shrink-0">
        <div>
          <h2 className="m-0 text-[26px] md:text-[28px] font-bold text-[#102a43]">Pharmacy & Dispensing</h2>
          <p className="m-0 mt-1 text-[#64788a] text-sm">ระบบห้องยา จ่ายยา พิมพ์ฉลาก และตัดสต๊อกอัตโนมัติ</p>
        </div>
        <div className="bg-white border border-[#e3edf3] rounded-2xl p-[13px_16px] text-[#7a8fa0] shadow-[0_14px_35px_rgba(16,42,67,.07)] text-sm w-full md:w-[350px] lg:w-[450px] flex items-center gap-2">
          <Search size={14} className="shrink-0 text-[#9ab0bc]" /> Search patient / MRN / prescription no. / drug name
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 shrink-0 gap-3">
        <div className="text-[13px] text-[#64788a]">
          Home › Pharmacy ›{' '}
          {pharmacyView === 'pending' && 'Pending Prescriptions'}
          {pharmacyView === 'master'  && 'Drug Master Inventory'}
          {pharmacyView === 'scan'    && 'Barcode Scanner Terminal'}
          {pharmacyView === 'manual'  && 'Manual Dispense Entry'}
        </div>
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => setPharmacyView(pharmacyView === 'pending' ? 'master' : 'pending')}
            className={`border rounded-xl px-[15px] py-[10px] font-[850] cursor-pointer text-sm transition-all ${pharmacyView === 'master' ? 'bg-[#0f8f83] text-white border-[#0f8f83] shadow-sm' : 'bg-white text-[#35546a] border-[#e3edf3] hover:bg-[#f6f9fb]'}`}
          >
            {pharmacyView === 'master'
              ? <><ClipboardList size={14} className="inline mr-1.5" /> View Prescriptions Queue</>
              : <><FileText size={14} className="inline mr-1.5" /> Drug Master</>}
          </button>
          <button
            onClick={() => setPharmacyView('scan')}
            className={`border rounded-xl px-[15px] py-[10px] font-[850] cursor-pointer text-sm transition-all ${pharmacyView === 'scan' ? 'bg-[#0f8f83] text-white border-[#0f8f83] shadow-sm' : 'bg-white text-[#35546a] border-[#e3edf3] hover:bg-[#f6f9fb]'}`}
          >
            <Search size={14} className="inline mr-1.5" /> Scan Prescription
          </button>
          <button
            onClick={() => setPharmacyView('manual')}
            className={`border rounded-xl px-[15px] py-[10px] font-[850] cursor-pointer text-sm transition-all ${pharmacyView === 'manual' ? 'bg-[#0f8f83] text-white border-[#0f8f83] shadow-sm' : 'border-0 bg-gradient-to-r from-[#0f8f83] to-[#0b6d87] text-white shadow-sm hover:opacity-90'}`}
          >
            Manual Dispense
          </button>
        </div>
      </div>

      {/* ── Main layout: left content + right sidebar ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_390px] gap-4 lg:gap-[18px] flex-1 min-h-0 overflow-hidden">

        {/* Left panel */}
        <div className="bg-white border border-[#e3edf3] rounded-[18px] shadow-[0_14px_35px_rgba(16,42,67,.07)] flex flex-col overflow-hidden min-w-0 h-full">

          {/* VIEW 1: Pending Prescriptions */}
          {pharmacyView === 'pending' && (
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
              {/* Patient header */}
              <div className="p-5 md:p-[20px_24px] border-b border-[#e3edf3] bg-[#fbfdfe] shrink-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-[11px] text-lg font-[900] text-[#102a43]">
                    <div className="w-9 h-9 rounded-xl grid place-items-center bg-[#e9f7f4] text-[#0f8f83]"><Pill size={18} /></div>
                    Prescription: RX-2405012
                  </div>
                  <span className="px-3 py-1.5 bg-[#fff4e2] text-[#b86b00] rounded-full text-xs font-bold">Waiting to Dispense</span>
                </div>
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="w-[60px] h-[60px] rounded-[18px] bg-[#fff1d8] grid place-items-center shrink-0 self-center sm:self-start">
                    <Dog size={32} className="text-[#b45309]" />
                  </div>
                  <div className="flex-1 w-full">
                    <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4">
                      <div>
                        <h3 className="m-0 text-[18px] text-[#102a43] flex items-center gap-2">
                          Lucky <span className="text-[#3b82f6] text-[11px] font-bold border border-[#3b82f6] px-1 py-0.5 rounded">M</span>
                        </h3>
                        <p className="m-0 mt-1 text-[13px] text-[#64788a]">Golden Retriever · 5Y 2M · <b className="text-[#0f8f83]">32.5 kg</b></p>
                      </div>
                      <div className="text-left sm:text-right">
                        <div className="text-[12px] text-[#64788a]">Doctor</div>
                        <div className="text-[14px] font-bold text-[#102a43]">สพ.ญ. นัทธสร สุขใจ</div>
                      </div>
                    </div>
                    <div className="mt-3 bg-[#fff0f0] border border-[#fcd5d5] text-[#e95050] px-3 py-2 rounded-lg text-[13px] font-bold flex items-center gap-2">
                      <AlertTriangle size={14} /> Allergy Alert: Penicillin (Severe Rash / Anaphylaxis)
                    </div>
                  </div>
                </div>
              </div>

              {/* Medication list */}
              <div className="flex-1 overflow-auto p-[0_24px]">
                <table className="w-full text-left border-collapse mt-4 min-w-[680px]">
                  <thead>
                    <tr className="text-[12px] text-[#64788a] border-b border-[#e3edf3]">
                      <th className="pb-3 font-bold">Medication</th>
                      <th className="pb-3 font-bold">Sig / Instruction</th>
                      <th className="pb-3 font-bold text-center w-[80px]">Qty</th>
                      <th className="pb-3 font-bold text-center w-[110px]">Label</th>
                    </tr>
                  </thead>
                  <tbody className="text-[13px] text-[#102a43]">
                    {RX_ITEMS.map((item, i) => (
                      <tr key={i} className="border-b border-[#e3edf3]">
                        <td className="py-4">
                          <b className="text-[#102a43] text-[14px]">{item.drug}</b><br />
                          <small className="text-[#64788a]">{item.form} · Stock: {item.stock}</small>
                        </td>
                        <td className="py-4 text-[13px] text-[#102a43]">
                          {item.sig}<br />
                          <span className="text-[#64788a]">ระยะเวลา {item.duration}</span>
                        </td>
                        <td className="py-4 text-center">
                          <b className="text-[16px] text-[#102a43]">{item.qty}</b>{' '}
                          <small className="text-[#64788a]">{item.unit}</small>
                        </td>
                        <td className="py-4 text-center">
                          <button
                            onClick={() => openPrintLabel(item)}
                            className="border border-[#0f8f83] text-[#0f8f83] bg-[#e9f7f4] px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-[#0f8f83] hover:text-white transition-colors cursor-pointer"
                          >
                            <Printer size={13} className="inline mr-1.5" /> Print
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Action bar */}
              <div className="flex justify-between items-center p-4 md:p-[18px_24px] border-t border-[#e3edf3] bg-[#fbfdfe] shrink-0 gap-2">
                <button
                  onClick={() => setModal('printAll')}
                  className="border border-[#e3edf3] rounded-xl px-[15px] py-[10px] font-[850] cursor-pointer text-sm bg-white text-[#35546a] hover:bg-gray-50 transition-colors shrink-0"
                >
                  <Printer size={13} className="inline mr-1.5" /> Print All Labels
                </button>
                <button
                  onClick={() => setModal('confirmDispense')}
                  className="border-0 rounded-xl px-[20px] py-[10px] font-[850] cursor-pointer text-sm bg-gradient-to-r from-[#0f8f83] to-[#0b6d87] text-white shadow-sm flex items-center gap-2 hover:opacity-90 transition-opacity"
                >
                  Confirm Dispense & Deduct Stock <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* VIEW 2: Drug Master */}
          {pharmacyView === 'master' && (
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden p-5 md:p-6">
              <div className="flex justify-between items-center border-b pb-3 mb-4 shrink-0">
                <h3 className="m-0 text-lg font-bold text-[#102a43]">
                  <FileText size={18} className="inline mr-2 text-[#0f8f83]" />ระบบสารบบและทะเบียนข้อมูลยาโรงพยาบาล
                </h3>
                <button
                  onClick={() => setModal('registerDrug')}
                  className="bg-[#0f8f83] text-white px-4 py-2 rounded-xl text-xs font-bold border-0 cursor-pointer"
                >
                  + ขึ้นทะเบียนยาใหม่
                </button>
              </div>
              <div className="flex-1 overflow-auto">
                <table className="w-full text-left text-xs border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-gray-50 text-[#64788a] font-bold border-b">
                      <th className="p-3">Code</th>
                      <th className="p-3">ชื่อเวชภัณฑ์ยา</th>
                      <th className="p-3">หมวดหมู่กลุ่มยา</th>
                      <th className="p-3">เลขทะเบียนยา</th>
                      <th className="p-3 text-center">คงเหลือ</th>
                      <th className="p-3 text-right">ราคา/หน่วย</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#102a43]">
                    {DRUG_MASTER.map((drug) => (
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

          {/* VIEW 3: Scan Prescription */}
          {pharmacyView === 'scan' && (
            <div className="flex-1 p-5 md:p-6 flex flex-col items-center justify-center text-center">
              <div className="w-full max-w-sm border-2 border-dashed border-[#0f8f83] bg-gray-50 rounded-2xl p-8 flex flex-col items-center justify-center shadow-inner">
                <Camera size={48} className="mb-4 text-[#9ab0bc]" />
                <h4 className="text-[#102a43] font-bold m-0 text-base">กำลังจำลองเชื่อมต่อหัวอ่าน Barcode/QR Reader...</h4>
                <p className="text-xs text-[#64788a] mt-2 mb-6">นำบาร์โค้ดที่อยู่บนแถบหัวกระดาษแผ่นพาสปอร์ตเคสคนไข้ ส่องกับกล้องเพื่อโหลดข้อมูล</p>
                <input
                  type="text"
                  placeholder="หรือระบุรหัสใบสั่งยาเอง เช่น RX-2405012..."
                  className="w-full border border-[#e3edf3] rounded-xl px-4 py-2.5 text-center text-sm outline-none font-mono tracking-wider mb-3 focus:border-[#0f8f83]"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setPharmacyView('pending');
                      setToastMsg(`ดึงข้อมูลใบสั่งยาเลขที่ ${e.target.value} สำเร็จ!`);
                    }
                  }}
                />
                <button
                  onClick={() => { setPharmacyView('pending'); setToastMsg('ดึงข้อมูลคิวจำลอง RX-2405012 เรียบร้อย'); }}
                  className="w-full bg-[#0f8f83] text-white py-2 rounded-xl text-xs font-black border-0 cursor-pointer shadow-sm"
                >
                  จำลองการยิงสแกนบาร์โค้ด
                </button>
              </div>
            </div>
          )}

          {/* VIEW 4: Manual Dispense */}
          {pharmacyView === 'manual' && (
            <div className="flex-1 p-5 md:p-6 overflow-y-auto">
              <h3 className="m-0 mb-4 text-lg font-bold text-[#102a43] border-b pb-2">
                <Download size={18} className="inline mr-2 text-[#0f8f83]" />คีย์รายการจ่ายยา/เวชภัณฑ์ด่วนหน้าห้องยา
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setPharmacyView('pending');
                  setToastMsg('บันทึกใบจ่ายยาฉุกเฉินเข้าระบบส่วนกลางสำเร็จ');
                }}
                className="space-y-4 max-w-xl text-sm"
              >
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

        {/* ── Right sidebar: Pharmacist Tools ── */}
        <aside className="flex flex-col gap-4 lg:gap-[18px] min-w-0 overflow-y-auto pr-1 max-h-full">

          {/* Dose Calculator */}
          <div className="bg-white border border-[#e3edf3] rounded-[18px] shadow-[0_14px_35px_rgba(16,42,67,.07)] p-5 shrink-0">
            <div className="flex items-center gap-2 mb-4 text-lg font-bold text-[#102a43]">
              <div className="w-8 h-8 rounded-lg bg-[#eef4f7] text-[#35546a] grid place-items-center"><Scale size={16} /></div>
              Dose Calculator
            </div>
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-bold text-[#64788a]">Weight (kg)</label>
                  <input
                    value={doseWeight}
                    readOnly
                    className="border border-[#e3edf3] rounded-lg px-3 py-2 text-sm bg-[#f6f9fb] outline-none text-[#102a43] font-bold"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-bold text-[#64788a]">Dose (mg/kg)</label>
                  <input
                    value={doseMgKg}
                    onChange={e => setDoseMgKg(e.target.value)}
                    placeholder="e.g. 5"
                    className="border border-[#e3edf3] rounded-lg px-3 py-2 text-sm outline-none text-[#102a43]"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-bold text-[#64788a]">Concentration (mg/tab or mg/ml)</label>
                <input
                  value={doseConc}
                  onChange={e => setDoseConc(e.target.value)}
                  placeholder="e.g. 100"
                  className="border border-[#e3edf3] rounded-lg px-3 py-2 text-sm outline-none text-[#102a43]"
                />
              </div>
              <button
                onClick={handleCalcDose}
                className="w-full border border-[#e3edf3] rounded-lg py-2.5 text-[13px] font-bold bg-[#f6f9fb] text-[#35546a] hover:bg-[#e3edf3] transition-colors mt-2 cursor-pointer"
              >
                Calculate Dose
              </button>
            </div>
          </div>

          {/* Stock Quick View */}
          <div className="bg-white border border-[#e3edf3] rounded-[18px] shadow-[0_14px_35px_rgba(16,42,67,.07)] p-5 flex-1 min-h-[250px]">
            <h3 className="m-0 mb-4 text-[16px] font-bold text-[#102a43]">Stock Quick View</h3>
            <div className="relative mb-4">
              <input placeholder="Search drug inventory..." className="w-full border border-[#e3edf3] rounded-xl pl-9 pr-3 py-2.5 text-sm outline-none" />
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a0b2c3]" />
            </div>
            <div className="space-y-2">
              {STOCK_ITEMS.map((item) => (
                <button
                  key={item.name}
                  onClick={() => openStockDetail(item)}
                  className="w-full p-3 border border-[#e3edf3] rounded-xl flex justify-between items-center bg-[#fbfdfe] hover:border-[#0f8f83] transition-colors cursor-pointer text-left"
                >
                  <div>
                    <b className="text-[13px] text-[#102a43]">{item.name}</b>
                    <span className="block text-[11px] text-[#64788a]">Lot: {item.lot} · Exp: {item.exp}</span>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <b className="text-[15px] text-[#0f8f83]">{item.stock}</b>
                    <span className="block text-[11px] text-[#64788a]">{item.unit}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </aside>
      </div>
    </div>
  );
}
