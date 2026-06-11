import React, { useState, useMemo } from 'react';
import {
  Search, Package, Download, RefreshCw, Plus,
  AlertTriangle, TrendingDown, Truck, FileText, X,
  ChevronLeft, ChevronRight,
} from 'lucide-react';

// ─── Modal ──────────────────────────────────────────────────────
function Modal({ title, onClose, children, maxWidth = 'max-w-md' }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
         onMouseDown={onClose}>
      <div className={`bg-white rounded-2xl shadow-2xl w-full ${maxWidth} max-h-[90vh] overflow-y-auto`}
           onMouseDown={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-[#e3edf3]">
          <h3 className="m-0 text-[16px] font-bold text-[#102a43]">{title}</h3>
          <button onClick={onClose} className="bg-transparent border-0 cursor-pointer text-[#64788a] hover:text-[#102a43] p-1 rounded-lg hover:bg-[#f6f9fb]">
            <X size={18} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

function FRow({ label, children }) {
  return (
    <div className="flex flex-col gap-1 mb-3">
      <label className="text-[12px] font-bold text-[#39576d]">{label}</label>
      {children}
    </div>
  );
}
const F = 'w-full border border-[#e3edf3] rounded-xl px-3 py-2.5 text-[13px] text-[#102a43] outline-none focus:border-[#2563eb] transition-colors bg-white';
const FInput    = (props) => <input    {...props} className={F} />;
const FSelect   = ({ children, ...p }) => <select   {...p}   className={F}>{children}</select>;
const FTextarea = (props) => <textarea {...props} rows={3} className={`${F} resize-none`} />;

// ─── Mock data ──────────────────────────────────────────────────
const ALL_ITEMS = [
  { sku: 'MED-0012',  name: 'NexGard Spectra (M)',               category: 'Medication', qty: 45,  unit: 'Box',    lot: 'L2024-X',  exp: '10/2026',    status: 'instock',    supplier: 'Bayer Thailand',          cost: 850  },
  { sku: 'MED-0084',  name: "Lactated Ringer's (LRS) 500ml",     category: 'Supplies',   qty: 5,   unit: 'Bag',    lot: 'R552-A',   exp: '12/2025',    status: 'lowstock',   supplier: 'Lilly Thailand',          cost: 45   },
  { sku: 'VAC-0005',  name: 'Rabies Vaccine (Defensor 3)',        category: 'Vaccines',   qty: 120, unit: 'Vial',   lot: 'V998-1',   exp: '15/07/2026', status: 'expiring',   supplier: 'Boehringer Ingelheim',    cost: 320  },
  { sku: 'FOOD-0021', name: 'Royal Canin Gastrointestinal 2kg',   category: 'Pet Food',   qty: 0,   unit: 'Bag',    lot: '-',        exp: '-',          status: 'outofstock', supplier: 'Royal Canin TH',          cost: 890  },
  { sku: 'MED-0031',  name: 'Amoxicillin 250mg Capsule',          category: 'Medication', qty: 500, unit: 'Tablet', lot: 'A2025-7',  exp: '03/2027',    status: 'instock',    supplier: 'GPO Thailand',            cost: 4    },
  { sku: 'MED-0045',  name: 'Metronidazole 200mg',                category: 'Medication', qty: 200, unit: 'Tablet', lot: 'M2025-1',  exp: '06/2027',    status: 'instock',    supplier: 'GPO Thailand',            cost: 3    },
  { sku: 'VAC-0011',  name: 'Bordetella Vaccine (Bronchicine)',   category: 'Vaccines',   qty: 48,  unit: 'Vial',   lot: 'B901-C',   exp: '02/2027',    status: 'instock',    supplier: 'Boehringer Ingelheim',    cost: 280  },
  { sku: 'SUP-0003',  name: 'IV Catheter 22G (50 pcs/box)',       category: 'Supplies',   qty: 12,  unit: 'Box',    lot: 'C2025-4',  exp: '12/2028',    status: 'lowstock',   supplier: 'BD Thailand',             cost: 680  },
  { sku: 'FOOD-0008', name: "Hill's Prescription Diet k/d 4kg",   category: 'Pet Food',   qty: 30,  unit: 'Bag',    lot: 'H2024-9',  exp: '01/2026',    status: 'expiring',   supplier: "Hill's Pet Nutrition",    cost: 1250 },
  { sku: 'MED-0067',  name: 'Prednisolone 5mg',                   category: 'Medication', qty: 350, unit: 'Tablet', lot: 'P2025-3',  exp: '09/2027',    status: 'instock',    supplier: 'GPO Thailand',            cost: 2    },
  { sku: 'SUP-0009',  name: 'Surgical Gloves L (100 pcs/box)',    category: 'Supplies',   qty: 8,   unit: 'Box',    lot: 'G2025-1',  exp: '-',          status: 'lowstock',   supplier: 'Ansell Thailand',         cost: 320  },
  { sku: 'VAC-0018',  name: 'FVRCP Vaccine (Felocell 4)',          category: 'Vaccines',   qty: 60,  unit: 'Vial',   lot: 'F2025-2',  exp: '05/2027',    status: 'instock',    supplier: 'Zoetis Thailand',         cost: 290  },
  { sku: 'MED-0092',  name: 'Furosemide 40mg',                    category: 'Medication', qty: 3,   unit: 'Strip',  lot: 'F2025-X',  exp: '08/2026',    status: 'lowstock',   supplier: 'GPO Thailand',            cost: 8    },
  { sku: 'FOOD-0033', name: 'Royal Canin Urinary Care 2kg',        category: 'Pet Food',   qty: 18,  unit: 'Bag',    lot: 'U2025-1',  exp: '03/2027',    status: 'instock',    supplier: 'Royal Canin TH',          cost: 780  },
  { sku: 'SUP-0015',  name: 'Sterile Saline 0.9% 100ml',          category: 'Supplies',   qty: 240, unit: 'Bottle', lot: 'S2025-9',  exp: '06/2028',    status: 'instock',    supplier: 'Lilly Thailand',          cost: 35   },
  { sku: 'VAC-0023',  name: 'Leptospirosis Vaccine (Recombitek)',  category: 'Vaccines',   qty: 0,   unit: 'Vial',   lot: '-',        exp: '-',          status: 'outofstock', supplier: 'Merial TH',               cost: 180  },
];

const TABS = ['All Items', 'Medication', 'Vaccines', 'Pet Food', 'Supplies'];

const STATUS = {
  instock:    { label: 'In Stock',      bg: '#e8f7f1', color: '#0f8d62' },
  lowstock:   { label: 'Low Stock',     bg: '#fff0f0', color: '#e95050' },
  expiring:   { label: 'Expiring Soon', bg: '#fff4e2', color: '#b86b00' },
  outofstock: { label: 'Out of Stock',  bg: '#f2f6f8', color: '#64788a' },
};

const SORT_OPTS = ['Name: A–Z', 'Name: Z–A', 'Stock: Low → High', 'Stock: High → Low', 'Expiry: Soonest'];
const PAGE_SIZE = 8;

function parseExp(s) {
  if (!s || s === '-') return Infinity;
  const p = s.split('/');
  if (p.length === 3) return new Date(+p[2], +p[1] - 1, +p[0]).getTime();
  if (p.length === 2) return new Date(+p[1], +p[0] - 1).getTime();
  return Infinity;
}

// ─── Page ───────────────────────────────────────────────────────
export default function InventoryPage() {
  const [toast, setToast]         = useState('');
  const [modal, setModal]         = useState(null);
  const [modalData, setModalData] = useState(null);
  const [activeTab, setActiveTab] = useState('All Items');
  const [search, setSearch]       = useState('');
  const [sort, setSort]           = useState('Name: A–Z');
  const [page, setPage]           = useState(1);

  const closeModal = () => { setModal(null); setModalData(null); };
  const done = (msg) => { closeModal(); setToast(msg); };

  const openItem = (item) => { setModalData(item); setModal('itemDetail'); };

  const handleTab = (t) => { setActiveTab(t); setPage(1); };
  const handleSearch = (v) => { setSearch(v); setPage(1); };
  const handleSort = (v) => { setSort(v); setPage(1); };

  const filtered = useMemo(() => {
    let items = ALL_ITEMS;
    if (activeTab !== 'All Items') items = items.filter(i => i.category === activeTab);
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(i =>
        i.name.toLowerCase().includes(q) ||
        i.sku.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q) ||
        i.lot.toLowerCase().includes(q)
      );
    }
    const arr = [...items];
    switch (sort) {
      case 'Name: Z–A':         arr.sort((a,b) => b.name.localeCompare(a.name)); break;
      case 'Stock: Low → High': arr.sort((a,b) => a.qty - b.qty); break;
      case 'Stock: High → Low': arr.sort((a,b) => b.qty - a.qty); break;
      case 'Expiry: Soonest':   arr.sort((a,b) => parseExp(a.exp) - parseExp(b.exp)); break;
      default:                  arr.sort((a,b) => a.name.localeCompare(b.name));
    }
    return arr;
  }, [activeTab, search, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const curPage    = Math.min(page, totalPages);
  const pageItems  = filtered.slice((curPage - 1) * PAGE_SIZE, curPage * PAGE_SIZE);

  // Sidebar derived stats
  const lowCount  = ALL_ITEMS.filter(i => i.status === 'lowstock').length;
  const expCount  = ALL_ITEMS.filter(i => i.status === 'expiring').length;
  const outCount  = ALL_ITEMS.filter(i => i.status === 'outofstock').length;
  const cogValue  = ALL_ITEMS.reduce((s, i) => s + i.qty * i.cost, 0);

  const searchInputProps = {
    value: search,
    onChange: e => handleSearch(e.target.value),
    placeholder: 'Search SKU / name / lot / category…',
    className: 'flex-1 outline-none text-[13px] text-[#102a43] bg-transparent',
  };

  const Toast = toast && (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#102a43] text-white text-sm px-6 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-white/10">
      <span className="font-bold">{toast}</span>
      <button onClick={() => setToast('')} className="bg-transparent border-0 text-white/50 hover:text-white cursor-pointer ml-2"><X size={14} /></button>
    </div>
  );

  return (
    /* ปรับแต่งความกว้างและระยะห่างรอบขอบจอตรงส่วนนี้ */
    <div className="h-full w-full flex flex-col overflow-hidden px-4 sm:px-6 lg:px-8 py-4 md:py-6">
      {Toast}

      {/* ── Modals ──────────────────────────────────────────── */}

      {modal === 'exportCSV' && (
        <Modal title="Export Inventory CSV" onClose={closeModal}>
          <FRow label="Date Range">
            <div className="grid grid-cols-2 gap-2">
              <FInput type="date" defaultValue="2026-01-01" />
              <FInput type="date" defaultValue="2026-06-10" />
            </div>
          </FRow>
          <FRow label="Category">
            <FSelect><option>All Categories</option>{TABS.slice(1).map(t=><option key={t}>{t}</option>)}</FSelect>
          </FRow>
          <FRow label="Include Columns">
            <div className="space-y-2 text-[13px] text-[#102a43]">
              {['SKU / Item Name','Category','On Hand Qty','Lot & Expiry','Cost (COGS)','Supplier'].map(col => (
                <label key={col} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked /> {col}
                </label>
              ))}
            </div>
          </FRow>
          <button onClick={() => done('ดาวน์โหลดไฟล์ CSV เรียบร้อยแล้ว')}
            className="w-full mt-1 bg-gradient-to-r from-[#0f8f83] to-[#0b6d87] text-white rounded-xl py-2.5 font-bold text-[14px] border-0 cursor-pointer hover:opacity-90 flex items-center justify-center gap-2">
            <Download size={15} /> Download CSV
          </button>
        </Modal>
      )}

      {modal === 'stockCount' && (
        <Modal title="Stock Count / Audit" onClose={closeModal} maxWidth="max-w-lg">
          <div className="bg-[#fff4e2] border border-[#f3dcaa] rounded-xl p-3 mb-4 text-[13px] text-[#b86b00] font-bold flex items-center gap-2">
            <AlertTriangle size={14} /> รายการสินค้าจะถูกล็อคชั่วคราวระหว่างการตรวจนับ
          </div>
          <FRow label="สถานที่ตรวจนับ">
            <FSelect><option>คลังยาหลัก</option><option>คลังสำรอง A</option><option>ตู้ยาห้อง ICU</option></FSelect>
          </FRow>
          <FRow label="กลุ่มสินค้าที่ตรวจ">
            <FSelect><option>ทั้งหมด</option><option>Medication only</option><option>Vaccines only</option><option>Pet Food only</option></FSelect>
          </FRow>
          <FRow label="ผู้รับผิดชอบ"><FInput placeholder="ชื่อพนักงาน" /></FRow>
          <FRow label="หมายเหตุ"><FTextarea placeholder="บันทึกเพิ่มเติม…" /></FRow>
          <div className="flex gap-2 mt-1">
            <button onClick={closeModal} className="flex-1 border border-[#e3edf3] bg-white text-[#35546a] rounded-xl py-2.5 font-bold text-[14px] cursor-pointer hover:bg-[#f6f9fb]">ยกเลิก</button>
            <button onClick={() => done('เริ่มการตรวจนับสต็อกเรียบร้อยแล้ว')}
              className="flex-1 bg-gradient-to-r from-[#0f8f83] to-[#0b6d87] text-white rounded-xl py-2.5 font-bold text-[14px] border-0 cursor-pointer hover:opacity-90">
              เริ่มนับสต็อก
            </button>
          </div>
        </Modal>
      )}

      {modal === 'addStock' && (
        <Modal title="Add / Receive Stock" onClose={closeModal} maxWidth="max-w-lg">
          <div className="grid grid-cols-2 gap-3">
            <FRow label="SKU / Item Code"><FInput placeholder="MED-XXXX" /></FRow>
            <FRow label="Category">
              <FSelect>{TABS.slice(1).map(t=><option key={t}>{t}</option>)}</FSelect>
            </FRow>
          </div>
          <FRow label="Item Name *"><FInput placeholder="ชื่อสินค้า" /></FRow>
          <div className="grid grid-cols-3 gap-3">
            <FRow label="Qty Received *"><FInput type="number" placeholder="0" /></FRow>
            <FRow label="Unit"><FSelect><option>Box</option><option>Vial</option><option>Bag</option><option>Bottle</option><option>Tablet</option></FSelect></FRow>
            <FRow label="Cost/Unit (฿)"><FInput type="number" placeholder="0.00" /></FRow>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FRow label="Lot Number"><FInput placeholder="L2024-XXX" /></FRow>
            <FRow label="Expiry Date"><FInput type="date" /></FRow>
          </div>
          <FRow label="Supplier">
            <FSelect><option>-- เลือกผู้จำหน่าย --</option><option>Bayer Thailand</option><option>Royal Canin TH</option><option>Boehringer Ingelheim</option><option>GPO Thailand</option><option>BD Thailand</option></FSelect>
          </FRow>
          <FRow label="PO Number (optional)"><FInput placeholder="PO-XXXXX" /></FRow>
          <FRow label="Notes"><FTextarea placeholder="บันทึกเพิ่มเติม…" /></FRow>
          <div className="flex gap-2 mt-1">
            <button onClick={closeModal} className="flex-1 border border-[#e3edf3] bg-white text-[#35546a] rounded-xl py-2.5 font-bold text-[14px] cursor-pointer hover:bg-[#f6f9fb]">ยกเลิก</button>
            <button onClick={() => done('รับสินค้าเข้าคลังเรียบร้อยแล้ว')}
              className="flex-1 bg-gradient-to-r from-[#0f8f83] to-[#0b6d87] text-white rounded-xl py-2.5 font-bold text-[14px] border-0 cursor-pointer hover:opacity-90">
              บันทึกการรับสินค้า
            </button>
          </div>
        </Modal>
      )}

      {modal === 'reorder' && (
        <Modal title="Reorder Item" onClose={closeModal}>
          <div className="bg-[#fff0f0] border border-[#fcd5d5] rounded-xl p-3 mb-4">
            <b className="text-[13px] text-[#e95050] block">{modalData?.name}</b>
            <span className="text-[12px] text-[#64788a]">
              SKU: {modalData?.sku} · On Hand: <b className="text-[#e95050]">{modalData?.qty}</b> {modalData?.unit}
            </span>
          </div>
          <FRow label="Supplier">
            <FSelect><option>Bayer Thailand</option><option>Lilly Thailand</option><option>Boehringer Ingelheim</option><option>BD Thailand</option></FSelect>
          </FRow>
          <FRow label="Qty to Order"><FInput type="number" placeholder="50" /></FRow>
          <FRow label="Urgency">
            <FSelect><option>Normal (3–5 days)</option><option>Urgent (1–2 days)</option><option>Emergency (same day)</option></FSelect>
          </FRow>
          <FRow label="Notes to Supplier"><FTextarea placeholder="หมายเหตุ…" /></FRow>
          <button onClick={() => done('ส่งคำสั่งสั่งซื้อเรียบร้อยแล้ว')}
            className="w-full mt-1 bg-[#e95050] text-white rounded-xl py-2.5 font-bold text-[14px] border-0 cursor-pointer hover:bg-[#d63f3f]">
            ยืนยันการสั่งซื้อ
          </button>
        </Modal>
      )}

      {modal === 'reviewExpiry' && (
        <Modal title="Review Expiring Stock" onClose={closeModal}>
          <div className="bg-[#fff8ea] border border-[#f3dcaa] rounded-xl p-3 mb-4">
            <b className="text-[13px] text-[#b86b00] block">{modalData?.name}</b>
            <span className="text-[12px] text-[#64788a]">
              SKU: {modalData?.sku} · Expiry: <b className="text-[#b86b00]">{modalData?.exp}</b> · Qty: {modalData?.qty} {modalData?.unit}
            </span>
          </div>
          <FRow label="Action">
            <FSelect>
              <option>เร่งใช้งาน (Accelerate Use)</option>
              <option>คืนสินค้า (Return to Supplier)</option>
              <option>ตัดออก (Write Off / Dispose)</option>
              <option>ลดราคา (Discount / Clearance)</option>
            </FSelect>
          </FRow>
          <FRow label="Qty Affected"><FInput type="number" defaultValue={String(modalData?.qty ?? '')} /></FRow>
          <FRow label="Notes"><FTextarea placeholder="รายละเอียด…" /></FRow>
          <div className="flex gap-2 mt-1">
            <button onClick={closeModal} className="flex-1 border border-[#e3edf3] bg-white text-[#35546a] rounded-xl py-2.5 font-bold text-[14px] cursor-pointer hover:bg-[#f6f9fb]">ยกเลิก</button>
            <button onClick={() => done('บันทึกการดำเนินการสินค้าใกล้หมดอายุแล้ว')}
              className="flex-1 bg-[#b86b00] text-white rounded-xl py-2.5 font-bold text-[14px] border-0 cursor-pointer hover:bg-[#965700]">
              บันทึก
            </button>
          </div>
        </Modal>
      )}

      {modal === 'receivePO' && (
        <Modal title="Receive Purchase Order" onClose={closeModal} maxWidth="max-w-lg">
          <FRow label="PO Number *"><FInput placeholder="PO-XXXXX" /></FRow>
          <FRow label="Supplier *">
            <FSelect><option>-- เลือกผู้จำหน่าย --</option><option>Bayer Thailand</option><option>Royal Canin TH</option><option>Boehringer Ingelheim</option><option>GPO Thailand</option></FSelect>
          </FRow>
          <FRow label="Received Date"><FInput type="date" defaultValue="2026-06-10" /></FRow>
          <FRow label="Delivery Note / Invoice No."><FInput placeholder="INV-XXXXX" /></FRow>
          <FRow label="Items (SKU × qty per line)"><FTextarea placeholder={'MED-0012 × 50\nVAC-0005 × 100'} /></FRow>
          <FRow label="Notes"><FTextarea placeholder="หมายเหตุ…" /></FRow>
          <div className="flex gap-2 mt-1">
            <button onClick={closeModal} className="flex-1 border border-[#e3edf3] bg-white text-[#35546a] rounded-xl py-2.5 font-bold text-[14px] cursor-pointer hover:bg-[#f6f9fb]">ยกเลิก</button>
            <button onClick={() => done('รับ PO เข้าระบบเรียบร้อยแล้ว')}
              className="flex-1 bg-gradient-to-r from-[#0f8f83] to-[#0b6d87] text-white rounded-xl py-2.5 font-bold text-[14px] border-0 cursor-pointer hover:opacity-90 flex items-center justify-center gap-2">
              <Truck size={14} /> รับสินค้าเข้าคลัง
            </button>
          </div>
        </Modal>
      )}

      {modal === 'transferStock' && (
        <Modal title="Transfer Stock" onClose={closeModal} maxWidth="max-w-lg">
          <div className="grid grid-cols-2 gap-3">
            <FRow label="From Location"><FSelect><option>คลังยาหลัก</option><option>คลังสำรอง A</option><option>ตู้ยาห้อง ICU</option></FSelect></FRow>
            <FRow label="To Location"><FSelect><option>ตู้ยาห้อง ICU</option><option>คลังสำรอง A</option><option>คลังยาหลัก</option></FSelect></FRow>
          </div>
          <FRow label="Item (SKU / Name)"><FInput placeholder="ค้นหา SKU หรือชื่อสินค้า…" /></FRow>
          <FRow label="Qty to Transfer"><FInput type="number" placeholder="0" /></FRow>
          <FRow label="Reason"><FSelect><option>เติมสต็อกห้องรักษา</option><option>โอนระหว่างคลัง</option><option>ย้ายสินค้าใกล้หมดอายุ</option></FSelect></FRow>
          <FRow label="Notes"><FTextarea placeholder="หมายเหตุ…" /></FRow>
          <div className="flex gap-2 mt-1">
            <button onClick={closeModal} className="flex-1 border border-[#e3edf3] bg-white text-[#35546a] rounded-xl py-2.5 font-bold text-[14px] cursor-pointer hover:bg-[#f6f9fb]">ยกเลิก</button>
            <button onClick={() => done('โอนสต็อกเรียบร้อยแล้ว')}
              className="flex-1 bg-gradient-to-r from-[#0f8f83] to-[#0b6d87] text-white rounded-xl py-2.5 font-bold text-[14px] border-0 cursor-pointer hover:opacity-90 flex items-center justify-center gap-2">
              <RefreshCw size={14} /> ยืนยันการโอน
            </button>
          </div>
        </Modal>
      )}

      {modal === 'adjustStock' && (
        <Modal title="Adjust Stock (Spoilage / Loss)" onClose={closeModal} maxWidth="max-w-lg">
          <div className="bg-[#fff4e2] border border-[#f3dcaa] rounded-xl p-3 mb-4 text-[13px] text-[#b86b00] font-bold flex items-center gap-2">
            <AlertTriangle size={14} /> การปรับสต็อกจะบันทึกในประวัติการเปลี่ยนแปลงทั้งหมด
          </div>
          <FRow label="Item (SKU / Name)"><FInput placeholder="ค้นหา SKU หรือชื่อสินค้า…" /></FRow>
          <div className="grid grid-cols-2 gap-3">
            <FRow label="Adjustment Type"><FSelect><option>ลด (Loss / Spoilage)</option><option>เพิ่ม (Found / Correction)</option></FSelect></FRow>
            <FRow label="Qty"><FInput type="number" placeholder="0" /></FRow>
          </div>
          <FRow label="Reason">
            <FSelect>
              <option>สินค้าเสียหาย (Spoilage)</option><option>หมดอายุ (Expired)</option>
              <option>สูญหาย (Lost)</option><option>นับผิด (Count Correction)</option><option>อื่นๆ (Other)</option>
            </FSelect>
          </FRow>
          <FRow label="Lot Number (if applicable)"><FInput placeholder="L2024-XXX" /></FRow>
          <FRow label="Notes / Evidence"><FTextarea placeholder="อธิบายรายละเอียด…" /></FRow>
          <div className="flex gap-2 mt-1">
            <button onClick={closeModal} className="flex-1 border border-[#e3edf3] bg-white text-[#35546a] rounded-xl py-2.5 font-bold text-[14px] cursor-pointer hover:bg-[#f6f9fb]">ยกเลิก</button>
            <button onClick={() => done('ปรับสต็อกเรียบร้อยแล้ว')}
              className="flex-1 bg-gradient-to-r from-[#0f8f83] to-[#0b6d87] text-white rounded-xl py-2.5 font-bold text-[14px] border-0 cursor-pointer hover:opacity-90">
              บันทึกการปรับสต็อก
            </button>
          </div>
        </Modal>
      )}

      {modal === 'itemDetail' && modalData && (
        <Modal title={modalData.name} onClose={closeModal} maxWidth="max-w-sm">
          <div className="bg-[#f6f9fb] rounded-xl p-3 mb-4 text-[13px] space-y-1.5">
            {[['SKU', modalData.sku], ['Category', modalData.category], ['On Hand', `${modalData.qty} ${modalData.unit}`], ['Lot', modalData.lot], ['Expiry', modalData.exp], ['Supplier', modalData.supplier], ['Cost/Unit', `฿${modalData.cost.toLocaleString()}`]].map(([k,v]) => (
              <div key={k} className="flex justify-between gap-4">
                <span className="text-[#64788a] shrink-0">{k}</span>
                <b className="text-[#102a43] text-right">{v}</b>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <button onClick={() => { closeModal(); setModal('addStock'); }}
              className="w-full border border-[#e3edf3] bg-white rounded-xl px-4 py-2.5 text-[13px] font-bold text-[#35546a] hover:bg-[#f6f9fb] text-left flex items-center gap-2 cursor-pointer">
              <Plus size={14} className="text-[#0f8f83]" /> Receive More Stock
            </button>
            <button onClick={() => done('แก้ไขข้อมูลสินค้าเรียบร้อยแล้ว')}
              className="w-full border border-[#e3edf3] bg-white rounded-xl px-4 py-2.5 text-[13px] font-bold text-[#35546a] hover:bg-[#f6f9fb] text-left flex items-center gap-2 cursor-pointer">
              <FileText size={14} className="text-[#0f8f83]" /> Edit Item Details
            </button>
            <button onClick={() => { closeModal(); setModal('adjustStock'); }}
              className="w-full border border-[#e3edf3] bg-white rounded-xl px-4 py-2.5 text-[13px] font-bold text-[#35546a] hover:bg-[#f6f9fb] text-left flex items-center gap-2 cursor-pointer">
              <RefreshCw size={14} className="text-[#0f8f83]" /> Adjust Stock
            </button>
            <button onClick={() => done('พิมพ์ฉลากเรียบร้อยแล้ว')}
              className="w-full border border-[#e3edf3] bg-white rounded-xl px-4 py-2.5 text-[13px] font-bold text-[#35546a] hover:bg-[#f6f9fb] text-left flex items-center gap-2 cursor-pointer">
              <Download size={14} className="text-[#0f8f83]" /> Print Label
            </button>
          </div>
        </Modal>
      )}

      {/* ── Desktop header (xl+) ─────────────────────────────── */}
      <div className="hidden xl:grid xl:grid-cols-[1fr_1fr_260px] xl:gap-5 xl:items-center xl:mb-3.5 xl:shrink-0">
        <div>
          <h2 className="m-0 text-[28px] font-bold text-[#102a43]">Inventory & Stock</h2>
          <p className="m-0 mt-1 text-[#64788a] text-sm">ระบบจัดการคลังยา วัคซีน อาหารสัตว์ และเวชภัณฑ์</p>
        </div>
        <div className="bg-white border border-[#e3edf3] rounded-2xl px-4 py-3 shadow-[0_14px_35px_rgba(16,42,67,.07)] flex items-center gap-2">
          <Search size={14} className="shrink-0 text-[#7a8fa0]" />
          <input {...searchInputProps} />
        </div>
        <div className="flex items-center justify-end gap-3">
          <div className="text-right text-sm">
            <b className="text-[#102a43]">นาย สต๊อก รักษาดี</b><br />
            <small className="text-[#64788a]">Inventory Manager</small>
          </div>
          <div className="w-[42px] h-[42px] rounded-full bg-[#f4fbff] grid place-items-center shrink-0">
            <Package size={20} className="text-[#0f8f83]" />
          </div>
        </div>
      </div>

      {/* ── Tablet/mobile header (<xl) ───────────────────────── */}
      <div className="xl:hidden shrink-0 mb-3">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="m-0 text-[20px] md:text-[24px] font-bold text-[#102a43]">Inventory & Stock</h2>
            <p className="m-0 text-[#64788a] text-xs">ระบบจัดการคลังยา วัคซีน อาหารสัตว์ และเวชภัณฑ์</p>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="text-right text-xs hidden md:block">
              <b className="text-[#102a43]">นาย สต๊อก รักษาดี</b><br />
              <small className="text-[#64788a]">Inventory Manager</small>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#f4fbff] grid place-items-center">
              <Package size={18} className="text-[#0f8f83]" />
            </div>
          </div>
        </div>
        <div className="bg-white border border-[#e3edf3] rounded-2xl px-4 py-3 flex items-center gap-2 shadow-sm">
          <Search size={14} className="shrink-0 text-[#7a8fa0]" />
          <input {...searchInputProps} />
        </div>
      </div>

      {/* ── Toolbar ─────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3.5 shrink-0">
        <div className="text-[12px] md:text-[13px] text-[#64788a]">Home › Inventory › Stock Overview</div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setModal('exportCSV')}
            className="border border-[#e3edf3] rounded-xl px-3.5 py-2.5 font-[850] cursor-pointer text-sm bg-white text-[#35546a] hover:bg-[#f6f9fb] flex items-center gap-1.5">
            <Download size={14} /> Export CSV
          </button>
          <button onClick={() => setModal('stockCount')}
            className="border border-[#e3edf3] rounded-xl px-3.5 py-2.5 font-[850] cursor-pointer text-sm bg-white text-[#35546a] hover:bg-[#f6f9fb] flex items-center gap-1.5">
            <RefreshCw size={14} /> <span className="hidden sm:inline">Stock Count /</span> Audit
          </button>
          <button onClick={() => setModal('addStock')}
            className="border-0 rounded-xl px-3.5 py-2.5 font-[850] cursor-pointer text-sm bg-gradient-to-r from-[#0f8f83] to-[#0b6d87] text-white shadow-sm hover:opacity-90 flex items-center gap-1.5">
            <Plus size={14} /> Add / Receive Stock
          </button>
        </div>
      </div>

      {/* ── Content area ────────────────────────────────────────── */}
      <div className="flex-1 min-h-0 overflow-y-auto xl:overflow-hidden">
        <div className="flex flex-col gap-4 xl:h-full xl:grid xl:grid-cols-[1fr_360px] xl:overflow-hidden">

          {/* ── Left: Table card ──────────────────────────────── */}
          <div className="bg-white border border-[#e3edf3] rounded-[18px] shadow-[0_14px_35px_rgba(16,42,67,.07)] flex flex-col xl:overflow-hidden">

            {/* Filter tabs + sort */}
            <div className="px-4 md:px-6 py-3 border-b border-[#e3edf3] bg-[#fbfdfe] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 shrink-0">
              <div className="flex gap-1 bg-[#f2f6f8] p-1 rounded-xl text-[12px] overflow-x-auto">
                {TABS.map(tab => (
                  <button key={tab} onClick={() => handleTab(tab)}
                    className={`px-3 py-1.5 rounded-lg font-[850] cursor-pointer border-0 whitespace-nowrap shrink-0 transition-colors ${activeTab === tab ? 'bg-white text-[#0f8f83] shadow-sm' : 'bg-transparent text-[#64788a] hover:bg-white/60'}`}>
                    {tab}
                  </button>
                ))}
              </div>
              <select value={sort} onChange={e => handleSort(e.target.value)}
                className="border border-[#e3edf3] rounded-lg px-3 py-1.5 text-sm bg-white outline-none text-[#35546a] font-bold shrink-0 cursor-pointer">
                {SORT_OPTS.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto xl:flex-1 xl:overflow-y-auto">
              <table className="w-full text-left border-collapse" style={{ minWidth: 600 }}>
                <thead className="sticky top-0 bg-[#fbfdfe] z-10">
                  <tr className="text-[12px] text-[#64788a]">
                    <th className="py-3 px-4 md:px-6 font-bold border-b border-[#e3edf3]">SKU / Item Name</th>
                    <th className="py-3 px-4 md:px-6 font-bold border-b border-[#e3edf3] hidden md:table-cell">Category</th>
                    <th className="py-3 px-4 md:px-6 font-bold border-b border-[#e3edf3] text-right">On Hand</th>
                    <th className="py-3 px-4 md:px-6 font-bold border-b border-[#e3edf3] hidden lg:table-cell">Lot & Expiry</th>
                    <th className="py-3 px-4 md:px-6 font-bold border-b border-[#e3edf3] text-center">Status</th>
                    <th className="py-3 px-4 md:px-6 font-bold border-b border-[#e3edf3] w-10"></th>
                  </tr>
                </thead>
                <tbody className="text-[13px] text-[#102a43]">
                  {pageItems.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-16 text-center text-[#64788a] text-sm">
                        {search ? `No results for "${search}"` : 'No items in this category'}
                      </td>
                    </tr>
                  ) : pageItems.map(item => {
                    const s = STATUS[item.status];
                    const rowCls =
                      item.status === 'lowstock'   ? 'border-b border-[#e3edf3] bg-[#fffcf8] hover:bg-[#fff9f0] transition-colors' :
                      item.status === 'outofstock' ? 'border-b border-[#e3edf3] opacity-60 hover:opacity-100 transition-opacity' :
                                                     'border-b border-[#e3edf3] hover:bg-[#f6f9fb] transition-colors';
                    return (
                      <tr key={item.sku} className={rowCls}>
                        <td className="py-3.5 px-4 md:px-6">
                          <span className="text-[11px] text-[#64788a] block mb-0.5">{item.sku}</span>
                          <b className="text-[13px] md:text-[14px] leading-snug">{item.name}</b>
                        </td>
                        <td className="py-3.5 px-4 md:px-6 text-[#64788a] hidden md:table-cell">{item.category}</td>
                        <td className="py-3.5 px-4 md:px-6 text-right whitespace-nowrap">
                          <b className={`text-[14px] md:text-[15px] ${item.status === 'lowstock' ? 'text-[#e95050]' : ''}`}>{item.qty}</b>{' '}
                          <span className="text-[#64788a] text-[11px]">{item.unit}</span>
                        </td>
                        <td className="py-3.5 px-4 md:px-6 hidden lg:table-cell">
                          <span className="block text-[#35546a] font-bold text-[12px]">Lot: {item.lot}</span>
                          <span className={`text-[11px] ${item.status === 'expiring' ? 'text-[#b86b00] font-bold' : 'text-[#64788a]'}`}>Exp: {item.exp}</span>
                        </td>
                        <td className="py-3.5 px-4 md:px-6 text-center">
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap"
                            style={{ background: s.bg, color: s.color }}>{s.label}</span>
                        </td>
                        <td className="py-3.5 px-4 md:px-6 text-center">
                          <button onClick={() => openItem(item)}
                            className="bg-transparent border-0 text-[#a0b2c3] hover:text-[#102a43] cursor-pointer text-lg leading-none p-1 rounded hover:bg-[#f6f9fb]">⋮</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 px-4 md:px-6 py-3.5 border-t border-[#e3edf3] bg-[#fbfdfe] shrink-0 text-sm text-[#64788a]">
              <span>
                {filtered.length === 0 ? '0 items' : `Showing ${(curPage-1)*PAGE_SIZE+1}–${Math.min(curPage*PAGE_SIZE, filtered.length)} of ${filtered.length} items`}
              </span>
              <div className="flex gap-1 flex-wrap">
                <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={curPage === 1}
                  className="border border-[#e3edf3] bg-white px-3 py-1.5 rounded-lg hover:bg-[#f6f9fb] cursor-pointer disabled:opacity-40 disabled:cursor-default flex items-center gap-1">
                  <ChevronLeft size={14} /> Prev
                </button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  const n = i + 1;
                  return (
                    <button key={n} onClick={() => setPage(n)}
                      className={`px-3 py-1.5 rounded-lg cursor-pointer border text-sm font-bold ${curPage === n ? 'border-[#0f8f83] bg-[#0f8f83] text-white' : 'border-[#e3edf3] bg-white hover:bg-[#f6f9fb]'}`}>
                      {n}
                    </button>
                  );
                })}
                <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={curPage === totalPages}
                  className="border border-[#e3edf3] bg-white px-3 py-1.5 rounded-lg hover:bg-[#f6f9fb] cursor-pointer disabled:opacity-40 disabled:cursor-default flex items-center gap-1">
                  Next <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* ── Right: Sidebar ───────────────────────────────── */}
          <aside className="flex flex-col gap-4 xl:overflow-y-auto">

            {/* Summary stats */}
            <div className="bg-white border border-[#e3edf3] rounded-[18px] shadow-[0_14px_35px_rgba(16,42,67,.07)] p-5 shrink-0">
              <h3 className="m-0 mb-4 text-[15px] font-bold text-[#102a43]">Inventory Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-2 gap-3">
                <div className="border border-[#e3edf3] rounded-xl p-3 bg-[#fbfdfe]">
                  <small className="block text-[#64788a] text-[11px] font-bold mb-1">Total SKUs</small>
                  <b className="text-[22px] text-[#102a43]">{ALL_ITEMS.length}</b>
                </div>
                <div className="border border-[#e3edf3] rounded-xl p-3 bg-[#fbfdfe]">
                  <small className="block text-[#64788a] text-[11px] font-bold mb-1">Low Stock</small>
                  <div className="flex items-baseline gap-1.5">
                    <b className="text-[22px] text-[#e95050]">{lowCount}</b>
                    <span className="text-[10px] text-[#e95050] bg-[#fff0f0] px-1.5 py-0.5 rounded font-bold">Alert</span>
                  </div>
                </div>
                <div className="border border-[#e3edf3] rounded-xl p-3 bg-[#fbfdfe]">
                  <small className="block text-[#64788a] text-[11px] font-bold mb-1">Expiring Soon</small>
                  <div className="flex items-baseline gap-1.5">
                    <b className="text-[22px] text-[#b86b00]">{expCount}</b>
                    <span className="text-[10px] text-[#b86b00] bg-[#fff4e2] px-1.5 py-0.5 rounded font-bold">Review</span>
                  </div>
                </div>
                <div className="border border-[#e3edf3] rounded-xl p-3 bg-[#fbfdfe]">
                  <small className="block text-[#64788a] text-[11px] font-bold mb-1">Out of Stock</small>
                  <b className="text-[22px] text-[#64788a]">{outCount}</b>
                </div>
                <div className="col-span-2 md:col-span-4 xl:col-span-2 border border-[#e3edf3] rounded-xl p-3 bg-gradient-to-r from-[#0f8f83] to-[#0b6d87] text-white">
                  <small className="block text-white/80 text-[11px] font-bold mb-1">Total Inventory Value (COGS)</small>
                  <b className="text-[22px]">฿ {cogValue.toLocaleString()}</b>
                </div>
              </div>
            </div>

            {/* Alerts + Quick Actions */}
            <div className="bg-white border border-[#e3edf3] rounded-[18px] shadow-[0_14px_35px_rgba(16,42,67,.07)] p-5 xl:flex-1">
              <div className="flex justify-between items-center mb-4">
                <h3 className="m-0 text-[15px] font-bold text-[#102a43] flex items-center gap-2">
                  Action Required <AlertTriangle size={15} className="text-[#e95050]" />
                </h3>
                <span className="text-[11px] font-bold text-[#e95050] bg-[#fff0f0] px-2 py-0.5 rounded-full">
                  {lowCount + expCount} items
                </span>
              </div>

              <div className="space-y-2.5">
                {ALL_ITEMS.filter(i => i.status === 'lowstock').map(item => (
                  <div key={item.sku} className="p-3 border border-[#fcd5d5] bg-[#fff0f0] rounded-xl flex justify-between items-center gap-2">
                    <div className="flex gap-2.5 items-center min-w-0">
                      <div className="w-8 h-8 rounded-full bg-white text-[#e95050] flex items-center justify-center shrink-0">
                        <TrendingDown size={15} />
                      </div>
                      <div className="min-w-0">
                        <b className="text-[12px] text-[#e95050] block">Below Reorder Point</b>
                        <span className="text-[11px] text-[#64788a] block truncate">{item.name}</span>
                        <span className="text-[10px] text-[#e95050] font-bold">{item.qty} {item.unit} remaining</span>
                      </div>
                    </div>
                    <button onClick={() => { setModalData(item); setModal('reorder'); }}
                      className="bg-[#e95050] text-white text-[11px] px-2.5 py-1.5 rounded-lg font-bold hover:bg-[#d63f3f] cursor-pointer border-0 shrink-0">
                      Reorder
                    </button>
                  </div>
                ))}

                {ALL_ITEMS.filter(i => i.status === 'expiring').map(item => (
                  <div key={item.sku} className="p-3 border border-[#f3dcaa] bg-[#fff8ea] rounded-xl flex justify-between items-center gap-2">
                    <div className="flex gap-2.5 items-center min-w-0">
                      <div className="w-8 h-8 rounded-full bg-white text-[#b86b00] flex items-center justify-center shrink-0 text-sm font-bold">⏳</div>
                      <div className="min-w-0">
                        <b className="text-[12px] text-[#b86b00] block">Expiring Soon</b>
                        <span className="text-[11px] text-[#64788a] block truncate">{item.name}</span>
                        <span className="text-[10px] text-[#b86b00] font-bold">Exp: {item.exp}</span>
                      </div>
                    </div>
                    <button onClick={() => { setModalData(item); setModal('reviewExpiry'); }}
                      className="bg-[#b86b00] text-white text-[11px] px-2.5 py-1.5 rounded-lg font-bold hover:bg-[#965700] cursor-pointer border-0 shrink-0">
                      Review
                    </button>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="mt-5 pt-5 border-t border-[#e3edf3]">
                <h3 className="m-0 mb-3 text-[14px] font-bold text-[#102a43]">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-2 gap-2">
                  <button onClick={() => setModal('receivePO')}
                    className="border border-[#e3edf3] bg-white rounded-xl p-3 text-[12px] font-[850] text-[#35546a] hover:bg-[#f6f9fb] text-left cursor-pointer transition-colors">
                    <Truck size={16} className="block mb-1 text-[#0f8f83]" /> Receive PO
                  </button>
                  <button onClick={() => setModal('transferStock')}
                    className="border border-[#e3edf3] bg-white rounded-xl p-3 text-[12px] font-[850] text-[#35546a] hover:bg-[#f6f9fb] text-left cursor-pointer transition-colors">
                    <RefreshCw size={16} className="block mb-1 text-[#0f8f83]" /> Transfer Stock
                  </button>
                  <button onClick={() => setModal('adjustStock')}
                    className="col-span-2 md:col-span-1 xl:col-span-2 border border-[#e3edf3] bg-white rounded-xl p-3 text-[12px] font-[850] text-[#35546a] hover:bg-[#f6f9fb] text-left flex items-center justify-between cursor-pointer transition-colors">
                    <div className="flex items-center gap-2">
                      <FileText size={14} className="text-[#0f8f83]" /> Adjust Stock (Spoilage/Loss)
                    </div>
                    <span className="text-[#a0b2c3]">→</span>
                  </button>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}