import { useState } from 'react';
import {
  TrendingUp, TrendingDown, AlertCircle,
  Plus, Download, BarChart2, Tag, X,
} from 'lucide-react';

const TABS = ['รายรับ-รายจ่าย', 'AR / AP', 'Package / Promotion', 'Deposit / Credit'];

const MONTHLY = [
  { month: 'ม.ค.',  rev: 2100000, exp: 750000  },
  { month: 'ก.พ.',  rev: 1980000, exp: 820000  },
  { month: 'มี.ค.', rev: 2250000, exp: 860000  },
  { month: 'เม.ย.', rev: 2180000, exp: 790000  },
  { month: 'พ.ค.',  rev: 2320000, exp: 870000  },
  { month: 'มิ.ย.', rev: 2450780, exp: 890250  },
];

const TRANSACTIONS = [
  { date: '09 มิ.ย.', ref: 'INV-6705122', desc: 'OPD + Lab + ยา',                   amount: '+฿4,850',   type: 'income'  },
  { date: '09 มิ.ย.', ref: 'INV-6705121', desc: 'ค่าผ่าตัด + ยาระงับความเจ็บปวด',   amount: '+฿12,500',  type: 'income'  },
  { date: '09 มิ.ย.', ref: 'PO-20240609', desc: 'ซื้อวัคซีน Pfizer Batch Q3',        amount: '-฿38,000',  type: 'expense' },
  { date: '09 มิ.ย.', ref: 'INV-6705120', desc: 'Wellness Package Gold',              amount: '+฿2,500',   type: 'income'  },
  { date: '08 มิ.ย.', ref: 'INV-6705108', desc: 'X-Ray + คอนซัลท์',                  amount: '+฿3,200',   type: 'income'  },
  { date: '08 มิ.ย.', ref: 'UTIL-2406',   desc: 'ค่าไฟฟ้า/น้ำ เดือนมิถุนายน',       amount: '-฿8,500',   type: 'expense' },
  { date: '08 มิ.ย.', ref: 'SAL-2406',    desc: 'เงินเดือนพนักงาน มิ.ย. 2567',      amount: '-฿210,000', type: 'expense' },
  { date: '07 มิ.ย.', ref: 'INV-6705098', desc: 'Dental Cleaning + X-Ray',            amount: '+฿5,800',   type: 'income'  },
];

const AR = [
  { client: 'คุณณัฐิดา วงศ์สวัสดิ์',  inv: 'INV-6705102', date: '10 พ.ย. 2567', due: '10 ธ.ค. 2567', amount: '฿2,150',  overdue: false },
  { client: 'คุณสมชาย ใจดี',           inv: 'INV-6705089', date: '08 พ.ย. 2567', due: '08 ธ.ค. 2567', amount: '฿3,500',  overdue: false },
  { client: 'คุณวิชัย มั่นคง',         inv: 'INV-6705045', date: '01 พ.ย. 2567', due: '01 ธ.ค. 2567', amount: '฿8,900',  overdue: true  },
  { client: 'คุณมาลี ทองดี',           inv: 'INV-6704988', date: '25 ต.ค. 2567', due: '25 พ.ย. 2567', amount: '฿1,200',  overdue: true  },
  { client: 'บริษัท พัทยาเพ็ทส์ จก.',  inv: 'INV-6704952', date: '20 ต.ค. 2567', due: '20 พ.ย. 2567', amount: '฿45,600', overdue: true  },
];

const AP = [
  { vendor: 'บ.ยาสัตว์ไทย จก.',        ref: 'PO-20241102', date: '02 พ.ย. 2567', due: '02 ธ.ค. 2567', amount: '฿85,000', overdue: false },
  { vendor: 'บ.อุปกรณ์การแพทย์ จก.',   ref: 'PO-20241088', date: '28 ต.ค. 2567', due: '28 พ.ย. 2567', amount: '฿23,500', overdue: true  },
  { vendor: 'น้ำยา Lab Reagent Co.',    ref: 'PO-20241075', date: '25 ต.ค. 2567', due: '25 พ.ย. 2567', amount: '฿12,800', overdue: true  },
];

const PACKAGES = [
  { name: 'Wellness Package Gold',    price: '฿2,500', validity: '1 ปี',    sold: 45,  active: true  },
  { name: 'Vaccine Package Standard', price: '฿1,200', validity: '6 เดือน', sold: 128, active: true  },
  { name: 'Dental Care Package',      price: '฿3,800', validity: '1 ปี',    sold: 23,  active: true  },
  { name: 'Lab Checkup Package',      price: '฿1,800', validity: '1 ปี',    sold: 67,  active: true  },
  { name: 'Senior Pet Package',       price: '฿4,500', validity: '1 ปี',    sold: 12,  active: false },
];

const PROMOS = [
  { name: 'วัคซีนรวมสุนัข ลด 15%',        start: '01 พ.ค. 2567', end: '31 พ.ค. 2567', discount: '15%',  active: false },
  { name: 'ตรวจเลือดฟรี เมื่อฉีดวัคซีน', start: '01 มิ.ย. 2567', end: '30 มิ.ย. 2567', discount: 'FREE', active: true  },
  { name: 'Dental ลด 20%',                start: '15 มิ.ย. 2567', end: '15 ก.ค. 2567', discount: '20%',  active: true  },
  { name: 'Birthday Discount 10%',         start: '01 มิ.ย. 2567', end: '30 มิ.ย. 2567', discount: '10%',  active: true  },
];

const DEPOSITS = [
  { client: 'คุณณัฐิดา วงศ์สวัสดิ์', type: 'Deposit', amount: '฿5,000',  date: '05 พ.ย. 2567', balance: '฿5,000',  status: 'ใช้งานได้'      },
  { client: 'คุณสมชาย ใจดี',          type: 'Credit',  amount: '฿1,500',  date: '10 ต.ค. 2567', balance: '฿800',    status: 'ใช้แล้วบางส่วน'  },
  { client: 'คุณวิชัย มั่นคง',        type: 'Deposit', amount: '฿10,000', date: '20 ต.ค. 2567', balance: '฿10,000', status: 'ใช้งานได้'      },
  { client: 'คุณมาลี ทองดี',          type: 'Credit',  amount: '฿2,000',  date: '01 พ.ย. 2567', balance: '฿0',      status: 'ใช้หมดแล้ว'     },
  { client: 'บ.พัทยาเพ็ทส์ จก.',     type: 'Deposit', amount: '฿50,000', date: '15 ต.ค. 2567', balance: '฿32,400', status: 'ใช้แล้วบางส่วน'  },
];

function BarChart() {
  const maxVal = 2500000;
  const w = 480, h = 120, padL = 50, padB = 24, padR = 16, padT = 8;
  const chartW = w - padL - padR;
  const chartH = h - padB - padT;
  const n = MONTHLY.length;
  const groupW = chartW / n;
  const barW = groupW * 0.32;
  const x = (i, which) => padL + i * groupW + (which === 0 ? groupW * 0.12 : groupW * 0.48);
  const y = (v) => padT + chartH - (v / maxVal) * chartH;
  const yLines = [0, 500000, 1000000, 1500000, 2000000, 2500000];
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height: 120 }}>
      {yLines.map(v => (
        <g key={v}>
          <line x1={padL} x2={w - padR} y1={y(v)} y2={y(v)} stroke="#e3edf3" strokeWidth="0.8" />
          {v > 0 && (
            <text x={padL - 4} y={y(v) + 3.5} textAnchor="end" fontSize="8" fill="#9ab0bc">
              {v >= 1000000 ? `${v / 1000000}M` : `${v / 1000}K`}
            </text>
          )}
        </g>
      ))}
      {MONTHLY.map((m, i) => (
        <g key={i}>
          <rect x={x(i, 0)} y={y(m.rev)} width={barW} height={chartH - (y(m.rev) - padT)} rx="2" fill="#0f8f83" opacity="0.85" />
          <rect x={x(i, 1)} y={y(m.exp)} width={barW} height={chartH - (y(m.exp) - padT)} rx="2" fill="#f97316" opacity="0.75" />
          <text x={padL + i * groupW + groupW / 2} y={h - 5} textAnchor="middle" fontSize="8.5" fill="#9ab0bc">{m.month}</text>
        </g>
      ))}
    </svg>
  );
}

// ── Modal shell ─────────────────────────────────────────────────────────────
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
const FInput    = (props) => <input    {...props} className={F} />;
const FSelect   = ({ children, ...p }) => <select {...p} className={F}>{children}</select>;
const FTextarea = (props) => <textarea {...props} rows={3} className={`${F} resize-none`} />;

const BtnPrimary = ({ onClick, children }) => (
  <button onClick={onClick} className="flex-1 py-2.5 rounded-xl text-[13px] font-semibold bg-[#0f8f83] hover:bg-[#0a7a70] text-white cursor-pointer border-0">
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

// ── Page ─────────────────────────────────────────────────────────────────────
export default function FinancePage() {
  const [tab, setTab]     = useState(0);
  const [toast, setToast] = useState('');
  const [modal, setModal] = useState(null);

  const closeModal = () => setModal(null);
  const done = (msg) => { closeModal(); setToast(msg); };

  const kpis = [
    { label: 'รายรับเดือนนี้',  value: '฿2,450,780', sub: '+8.5% จากเดือนที่แล้ว', up: true,  icon: TrendingUp,   color: '#059669' },
    { label: 'รายจ่ายเดือนนี้', value: '฿890,250',   sub: '+2.1% จากเดือนที่แล้ว', up: false, icon: TrendingDown, color: '#f97316' },
    { label: 'กำไรสุทธิ',      value: '฿1,560,530', sub: 'Margin 63.7%',           up: true,  icon: BarChart2,   color: '#2563eb' },
    { label: 'ลูกหนี้คงค้าง',  value: '฿125,400',   sub: 'ลูกหนี้ 5 ราย',          up: false, icon: AlertCircle, color: '#dc2626' },
  ];

  return (
    <div className="h-full flex flex-col overflow-hidden bg-[#f0f5f8] px-5 py-4 gap-3">

      {/* Toast */}
      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#102a43] text-white text-sm px-6 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-white/10">
          <span className="font-bold">{toast}</span>
          <button onClick={() => setToast('')} className="bg-transparent border-0 text-white/50 hover:text-white cursor-pointer ml-2"><X size={14} /></button>
        </div>
      )}

      {/* ── Modal: Export Report ── */}
      {modal === 'exportReport' && (
        <Modal title="Export รายงานการเงิน" onClose={closeModal}>
          <FRow label="ช่วงเวลา">
            <FSelect>
              <option>เดือนนี้ (มิถุนายน 2567)</option>
              <option>ไตรมาสนี้ (Q2 2567)</option>
              <option>ปีนี้ (2567)</option>
              <option>กำหนดเอง</option>
            </FSelect>
          </FRow>
          <FRow label="รูปแบบไฟล์">
            <div className="grid grid-cols-3 gap-2">
              {['PDF', 'Excel (.xlsx)', 'CSV'].map(fmt => (
                <button key={fmt} className="border-2 border-[#e3edf3] rounded-xl py-2.5 text-[12px] font-semibold text-[#39576d] hover:border-[#0f8f83] hover:bg-[#f0faf8] cursor-pointer transition-colors bg-white">
                  {fmt}
                </button>
              ))}
            </div>
          </FRow>
          <FRow label="ส่วนที่ต้องการรวม">
            <div className="space-y-2 border border-[#e3edf3] rounded-xl p-3 bg-[#f8fafc]">
              {['รายรับ-รายจ่าย', 'Accounts Receivable / Payable', 'แพ็กเกจและโปรโมชั่น', 'มัดจำและเครดิต'].map(s => (
                <label key={s} className="flex items-center gap-2 text-[13px] text-[#39576d] cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-[#0f8f83]" /> {s}
                </label>
              ))}
            </div>
          </FRow>
          <ModalFooter>
            <BtnSecondary onClick={closeModal}>ยกเลิก</BtnSecondary>
            <BtnPrimary onClick={() => done('กำลังดาวน์โหลดรายงาน...')}>ดาวน์โหลด</BtnPrimary>
          </ModalFooter>
        </Modal>
      )}

      {/* ── Modal: Add Transaction ── */}
      {modal === 'addTransaction' && (
        <Modal title="บันทึกรายการทางการเงิน" onClose={closeModal}>
          <FRow label="ประเภท">
            <FSelect>
              <option value="income">รายรับ</option>
              <option value="expense">รายจ่าย</option>
            </FSelect>
          </FRow>
          <FRow label="วันที่"><FInput type="date" defaultValue="2024-06-09" /></FRow>
          <FRow label="เลขที่อ้างอิง"><FInput placeholder="เช่น INV-6705123, PO-20240610" /></FRow>
          <FRow label="รายการ"><FInput placeholder="คำอธิบายรายการ" /></FRow>
          <FRow label="จำนวนเงิน (฿)"><FInput type="number" placeholder="0.00" min="0" step="0.01" /></FRow>
          <FRow label="ช่องทาง">
            <FSelect>
              <option>เงินสด</option>
              <option>โอนธนาคาร</option>
              <option>บัตรเครดิต/เดบิต</option>
              <option>QR Code</option>
            </FSelect>
          </FRow>
          <FRow label="หมายเหตุ"><FTextarea placeholder="รายละเอียดเพิ่มเติม (ถ้ามี)" /></FRow>
          <ModalFooter>
            <BtnSecondary onClick={closeModal}>ยกเลิก</BtnSecondary>
            <BtnPrimary onClick={() => done('บันทึกรายการสำเร็จ')}>บันทึก</BtnPrimary>
          </ModalFooter>
        </Modal>
      )}

      {/* ── Modal: Add Package ── */}
      {modal === 'addPackage' && (
        <Modal title="เพิ่มแพ็กเกจบริการ" onClose={closeModal}>
          <FRow label="ชื่อแพ็กเกจ"><FInput placeholder="เช่น Wellness Package Platinum" /></FRow>
          <FRow label="ราคา (฿)"><FInput type="number" placeholder="0.00" min="0" step="0.01" /></FRow>
          <FRow label="อายุการใช้งาน">
            <FSelect>
              <option>1 ปี</option>
              <option>6 เดือน</option>
              <option>3 เดือน</option>
              <option>ไม่มีกำหนด</option>
            </FSelect>
          </FRow>
          <FRow label="บริการที่รวมอยู่"><FTextarea placeholder="ระบุบริการที่รวมในแพ็กเกจ เช่น ตรวจสุขภาพ, วัคซีน, Lab..." /></FRow>
          <FRow label="สถานะ">
            <FSelect>
              <option value="active">เปิดใช้งาน</option>
              <option value="inactive">ปิดใช้งาน</option>
            </FSelect>
          </FRow>
          <ModalFooter>
            <BtnSecondary onClick={closeModal}>ยกเลิก</BtnSecondary>
            <BtnPrimary onClick={() => done('เพิ่มแพ็กเกจใหม่สำเร็จ')}>บันทึก</BtnPrimary>
          </ModalFooter>
        </Modal>
      )}

      {/* ── Modal: Add Promotion ── */}
      {modal === 'addPromo' && (
        <Modal title="เพิ่มโปรโมชั่น" onClose={closeModal}>
          <FRow label="ชื่อโปรโมชั่น"><FInput placeholder="เช่น วัคซีนรวมสุนัข ลด 15%" /></FRow>
          <FRow label="ส่วนลด">
            <div className="flex gap-2">
              <FSelect style={{ width: 110 }}>
                <option>%</option>
                <option>฿</option>
                <option>FREE</option>
              </FSelect>
              <input placeholder="เช่น 15, 200, FREE" className={`${F} flex-1`} />
            </div>
          </FRow>
          <div className="grid grid-cols-2 gap-3">
            <FRow label="วันที่เริ่ม"><FInput type="date" /></FRow>
            <FRow label="วันที่สิ้นสุด"><FInput type="date" /></FRow>
          </div>
          <FRow label="เงื่อนไข"><FTextarea placeholder="เงื่อนไขการใช้โปรโมชั่น (ถ้ามี)" /></FRow>
          <FRow label="สถานะ">
            <FSelect>
              <option value="active">เปิดใช้งาน</option>
              <option value="inactive">ปิดใช้งาน</option>
            </FSelect>
          </FRow>
          <ModalFooter>
            <BtnSecondary onClick={closeModal}>ยกเลิก</BtnSecondary>
            <BtnPrimary onClick={() => done('เพิ่มโปรโมชั่นใหม่สำเร็จ')}>บันทึก</BtnPrimary>
          </ModalFooter>
        </Modal>
      )}

      {/* ── Modal: Add Deposit ── */}
      {modal === 'addDeposit' && (
        <Modal title="เพิ่มรายการมัดจำ / เครดิต" onClose={closeModal}>
          <FRow label="ลูกค้า"><FInput placeholder="ชื่อลูกค้าหรือบริษัท" /></FRow>
          <FRow label="ประเภท">
            <FSelect>
              <option value="Deposit">Deposit (มัดจำ)</option>
              <option value="Credit">Credit (เครดิต)</option>
            </FSelect>
          </FRow>
          <FRow label="จำนวนเงิน (฿)"><FInput type="number" placeholder="0.00" min="0" step="0.01" /></FRow>
          <FRow label="วันที่"><FInput type="date" defaultValue="2024-06-09" /></FRow>
          <FRow label="หมายเหตุ"><FTextarea placeholder="บันทึกเพิ่มเติม (ถ้ามี)" /></FRow>
          <ModalFooter>
            <BtnSecondary onClick={closeModal}>ยกเลิก</BtnSecondary>
            <BtnPrimary onClick={() => done('บันทึกรายการมัดจำสำเร็จ')}>บันทึก</BtnPrimary>
          </ModalFooter>
        </Modal>
      )}

      {/* Page header */}
      <div className="flex items-start justify-between shrink-0">
        <div>
          <h2 className="text-[20px] font-bold text-[#102a43] m-0 leading-tight">Finance & Accounting</h2>
          <p className="m-0 mt-0.5 text-[13px] text-[#64788a]">การเงินและบัญชี · มิถุนายน 2567</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setModal('exportReport')}
            className="flex items-center gap-1.5 px-3 py-2 border border-[#e3edf3] bg-white rounded-lg text-[12px] text-[#64788a] hover:bg-[#f0f5f8] cursor-pointer shadow-sm"
          >
            <Download size={13} /> Export
          </button>
          <button
            onClick={() => setModal('addTransaction')}
            className="flex items-center gap-2 bg-[#0f8f83] hover:bg-[#0a7a70] text-white text-[13px] font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer border-0"
          >
            <Plus size={15} /> บันทึกรายการ
          </button>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-4 gap-3 shrink-0">
        {kpis.map(({ label, value, sub, up, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl border border-[#e3edf3] px-4 py-3.5 flex items-center gap-4 shadow-sm">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: color + '18' }}>
              <Icon size={20} style={{ color }} />
            </div>
            <div>
              <div className="text-[19px] font-bold text-[#102a43] leading-none">{value}</div>
              <div className="text-[11px] text-[#64788a] mt-0.5">{label}</div>
              <div className={`text-[10px] mt-0.5 font-semibold ${up ? 'text-green-600' : 'text-red-500'}`}>{sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main card — flex-1 + min-h-0 so inner overflow-y-auto scrolls independently */}
      <div className="bg-white rounded-xl border border-[#e3edf3] shadow-sm overflow-hidden flex-1 flex flex-col min-h-0">

        {/* Tab nav */}
        <div className="flex border-b border-[#e3edf3] px-4 gap-1 pt-1 shrink-0">
          {TABS.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              className={`px-4 py-2.5 text-[13px] font-semibold rounded-t-lg -mb-px border-b-2 transition-colors cursor-pointer whitespace-nowrap bg-transparent border-l-0 border-r-0 border-t-0 ${
                tab === i
                  ? 'text-[#0f8f83] border-b-[#0f8f83] bg-[#f0faf8]'
                  : 'text-[#64788a] border-b-transparent hover:text-[#102a43]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4">

          {/* Tab 0: Revenue & Expense */}
          {tab === 0 && (
            <div className="flex flex-col gap-4">
              <div className="border border-[#e3edf3] rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[13px] font-semibold text-[#102a43]">รายรับ - รายจ่าย รายเดือน (ม.ค.–มิ.ย. 2567)</div>
                  <div className="flex items-center gap-4 text-[11px] text-[#64788a]">
                    <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded-sm bg-[#0f8f83] inline-block opacity-85" /> รายรับ</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-2 rounded-sm bg-[#f97316] inline-block opacity-75" /> รายจ่าย</span>
                  </div>
                </div>
                <BarChart />
              </div>
              <div>
                <div className="text-[12px] font-semibold text-[#64788a] uppercase tracking-wide mb-2">รายการล่าสุด</div>
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="text-[11px] text-[#9ab0bc] uppercase tracking-wide border-b border-[#e3edf3]">
                      <th className="text-left pb-2 pl-1 font-semibold">วันที่</th>
                      <th className="text-left pb-2 font-semibold">เลขที่อ้างอิง</th>
                      <th className="text-left pb-2 font-semibold">รายการ</th>
                      <th className="text-right pb-2 font-semibold pr-1">จำนวนเงิน</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TRANSACTIONS.map((t, i) => (
                      <tr key={i} className="border-b border-[#f0f5f8] hover:bg-[#f6f9fb]">
                        <td className="py-2.5 pl-1 text-[#9ab0bc] text-[12px]">{t.date}</td>
                        <td className="py-2.5 font-mono text-[12px] text-[#64788a]">{t.ref}</td>
                        <td className="py-2.5 text-[#39576d]">{t.desc}</td>
                        <td className={`py-2.5 text-right pr-1 font-semibold font-mono ${t.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
                          {t.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 1: AR/AP */}
          {tab === 1 && (
            <div className="flex flex-col gap-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-[13px] font-bold text-[#102a43]">Accounts Receivable (ลูกหนี้)</div>
                  <span className="text-[11px] bg-orange-50 text-orange-600 font-semibold px-2 py-0.5 rounded-full">฿61,350 คงค้าง</span>
                </div>
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="text-[11px] text-[#9ab0bc] uppercase tracking-wide border-b border-[#e3edf3]">
                      <th className="text-left pb-2 pl-1 font-semibold">ลูกค้า</th>
                      <th className="text-left pb-2 font-semibold">เลขที่</th>
                      <th className="text-left pb-2 font-semibold">วันที่ออก</th>
                      <th className="text-left pb-2 font-semibold">กำหนดชำระ</th>
                      <th className="text-right pb-2 font-semibold">จำนวน</th>
                      <th className="text-left pb-2 font-semibold pl-4">สถานะ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {AR.map((r, i) => (
                      <tr key={i} className="border-b border-[#f0f5f8] hover:bg-[#f6f9fb]">
                        <td className="py-2.5 pl-1 font-semibold text-[#102a43]">{r.client}</td>
                        <td className="py-2.5 font-mono text-[12px] text-[#64788a]">{r.inv}</td>
                        <td className="py-2.5 text-[#64788a]">{r.date}</td>
                        <td className={`py-2.5 ${r.overdue ? 'text-red-500 font-semibold' : 'text-[#64788a]'}`}>{r.due}</td>
                        <td className="py-2.5 text-right font-semibold font-mono text-[#102a43]">{r.amount}</td>
                        <td className="py-2.5 pl-4">
                          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${r.overdue ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-700'}`}>
                            {r.overdue ? 'เกินกำหนด' : 'ค้างชำระ'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-[13px] font-bold text-[#102a43]">Accounts Payable (เจ้าหนี้)</div>
                  <span className="text-[11px] bg-blue-50 text-blue-600 font-semibold px-2 py-0.5 rounded-full">฿121,300 คงค้าง</span>
                </div>
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="text-[11px] text-[#9ab0bc] uppercase tracking-wide border-b border-[#e3edf3]">
                      <th className="text-left pb-2 pl-1 font-semibold">เจ้าหนี้</th>
                      <th className="text-left pb-2 font-semibold">เลขที่ PO</th>
                      <th className="text-left pb-2 font-semibold">วันที่</th>
                      <th className="text-left pb-2 font-semibold">กำหนดชำระ</th>
                      <th className="text-right pb-2 font-semibold">จำนวน</th>
                      <th className="text-left pb-2 pl-4 font-semibold">สถานะ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {AP.map((r, i) => (
                      <tr key={i} className="border-b border-[#f0f5f8] hover:bg-[#f6f9fb]">
                        <td className="py-2.5 pl-1 font-semibold text-[#102a43]">{r.vendor}</td>
                        <td className="py-2.5 font-mono text-[12px] text-[#64788a]">{r.ref}</td>
                        <td className="py-2.5 text-[#64788a]">{r.date}</td>
                        <td className={`py-2.5 ${r.overdue ? 'text-red-500 font-semibold' : 'text-[#64788a]'}`}>{r.due}</td>
                        <td className="py-2.5 text-right font-semibold font-mono text-[#102a43]">{r.amount}</td>
                        <td className="py-2.5 pl-4">
                          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${r.overdue ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-700'}`}>
                            {r.overdue ? 'เกินกำหนด' : 'ค้างชำระ'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 2: Package / Promotion */}
          {tab === 2 && (
            <div className="flex flex-col gap-5">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[13px] font-bold text-[#102a43]">แพ็กเกจบริการ</div>
                  <button
                    onClick={() => setModal('addPackage')}
                    className="flex items-center gap-1.5 bg-[#0f8f83] hover:bg-[#0a7a70] text-white text-[12px] font-semibold px-3 py-1.5 rounded-lg cursor-pointer border-0"
                  >
                    <Plus size={13} /> เพิ่มแพ็กเกจ
                  </button>
                </div>
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="text-[11px] text-[#9ab0bc] uppercase tracking-wide border-b border-[#e3edf3]">
                      <th className="text-left pb-2 pl-1 font-semibold">ชื่อแพ็กเกจ</th>
                      <th className="text-left pb-2 font-semibold">ราคา</th>
                      <th className="text-left pb-2 font-semibold">อายุการใช้งาน</th>
                      <th className="text-left pb-2 font-semibold">ขายแล้ว</th>
                      <th className="text-left pb-2 font-semibold">สถานะ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PACKAGES.map((p, i) => (
                      <tr key={i} className="border-b border-[#f0f5f8] hover:bg-[#f6f9fb]">
                        <td className="py-2.5 pl-1">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-md bg-[#e9f7f4] flex items-center justify-center">
                              <Tag size={11} className="text-[#0f8f83]" />
                            </div>
                            <span className="font-semibold text-[#102a43]">{p.name}</span>
                          </div>
                        </td>
                        <td className="py-2.5 font-semibold font-mono text-[#39576d]">{p.price}</td>
                        <td className="py-2.5 text-[#64788a]">{p.validity}</td>
                        <td className="py-2.5 text-[#64788a]">{p.sold} ราย</td>
                        <td className="py-2.5">
                          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${p.active ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                            {p.active ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[13px] font-bold text-[#102a43]">โปรโมชั่น</div>
                  <button
                    onClick={() => setModal('addPromo')}
                    className="flex items-center gap-1.5 border border-[#0f8f83] text-[#0f8f83] hover:bg-[#e9f7f4] text-[12px] font-semibold px-3 py-1.5 rounded-lg cursor-pointer bg-white"
                  >
                    <Plus size={13} /> เพิ่มโปรโมชั่น
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {PROMOS.map((p, i) => (
                    <div key={i} className={`border rounded-xl p-3.5 flex items-start gap-3 ${p.active ? 'border-[#0f8f83]/30 bg-[#f0faf8]' : 'border-[#e3edf3] bg-[#f6f9fb] opacity-60'}`}>
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 font-bold text-[13px] ${p.active ? 'bg-[#0f8f83] text-white' : 'bg-slate-200 text-slate-500'}`}>
                        {p.discount}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-[13px] text-[#102a43] leading-tight">{p.name}</div>
                        <div className="text-[11px] text-[#9ab0bc] mt-1">{p.start} – {p.end}</div>
                      </div>
                      {p.active && <span className="text-[10px] bg-green-100 text-green-700 font-bold px-1.5 py-0.5 rounded-md shrink-0">ACTIVE</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Deposit / Credit */}
          {tab === 3 && (
            <>
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-4 text-[13px]">
                  <div className="bg-[#e9f7f4] text-[#0f8f83] rounded-xl px-4 py-2.5 font-semibold">
                    มัดจำคงเหลือรวม <span className="font-bold ml-2">฿47,400</span>
                  </div>
                  <div className="bg-blue-50 text-blue-700 rounded-xl px-4 py-2.5 font-semibold">
                    เครดิตคงเหลือรวม <span className="font-bold ml-2">฿800</span>
                  </div>
                </div>
                <button
                  onClick={() => setModal('addDeposit')}
                  className="flex items-center gap-1.5 bg-[#0f8f83] hover:bg-[#0a7a70] text-white text-[12px] font-semibold px-3 py-1.5 rounded-lg cursor-pointer border-0"
                >
                  <Plus size={13} /> เพิ่มมัดจำ
                </button>
              </div>
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="text-[11px] text-[#9ab0bc] uppercase tracking-wide border-b border-[#e3edf3]">
                    <th className="text-left pb-2 pl-1 font-semibold">ลูกค้า</th>
                    <th className="text-left pb-2 font-semibold">ประเภท</th>
                    <th className="text-right pb-2 font-semibold">จำนวน</th>
                    <th className="text-right pb-2 font-semibold">คงเหลือ</th>
                    <th className="text-left pb-2 font-semibold pl-4">วันที่</th>
                    <th className="text-left pb-2 font-semibold">สถานะ</th>
                  </tr>
                </thead>
                <tbody>
                  {DEPOSITS.map((d, i) => (
                    <tr key={i} className="border-b border-[#f0f5f8] hover:bg-[#f6f9fb]">
                      <td className="py-2.5 pl-1 font-semibold text-[#102a43]">{d.client}</td>
                      <td className="py-2.5">
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${d.type === 'Deposit' ? 'bg-teal-50 text-teal-700' : 'bg-blue-50 text-blue-700'}`}>
                          {d.type}
                        </span>
                      </td>
                      <td className="py-2.5 text-right font-mono font-semibold text-[#102a43]">{d.amount}</td>
                      <td className="py-2.5 text-right font-mono font-semibold text-[#0f8f83]">{d.balance}</td>
                      <td className="py-2.5 pl-4 text-[#64788a]">{d.date}</td>
                      <td className="py-2.5">
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                          d.status === 'ใช้งานได้'      ? 'bg-green-50 text-green-700' :
                          d.status === 'ใช้แล้วบางส่วน' ? 'bg-amber-50 text-amber-700' :
                          'bg-slate-100 text-slate-500'
                        }`}>
                          {d.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
