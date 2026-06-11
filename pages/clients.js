import { useState } from 'react';
import Link from 'next/link';
import {
  Pencil, Plus, Star, MessageSquare,
  MapPin, Bell, ChevronRight, MoreVertical,
  CalendarDays, FileText, PawPrint, User, Dog, Cat, X,
  Search, ArrowLeft, Download,
} from 'lucide-react';

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_CLIENTS = [
  { id: 'CLI-000125', name: 'คุณณัฐิดา วงศ์สวัสดิ์',  phone: '098-123-4567', email: 'nattida.w@example.com',  status: 'Active',   pets: 3, lastVisit: '20 พ.ค. 2567' },
  { id: 'CLI-000118', name: 'คุณวิชัย สมพร',           phone: '081-456-7890', email: 'wichai.s@example.com',   status: 'Active',   pets: 1, lastVisit: '18 พ.ค. 2567' },
  { id: 'CLI-000110', name: 'คุณปัณณดา ศรีสุข',        phone: '062-234-5678', email: 'pannada.s@example.com',  status: 'Active',   pets: 2, lastVisit: '15 พ.ค. 2567' },
  { id: 'CLI-000098', name: 'คุณรัตนา บุญมี',          phone: '089-345-6789', email: 'rattana.b@example.com',  status: 'Inactive', pets: 1, lastVisit: '3 เม.ย. 2567'  },
  { id: 'CLI-000087', name: 'คุณสมชาย ใจดี',           phone: '091-567-8901', email: 'somchai.j@example.com',  status: 'Active',   pets: 2, lastVisit: '28 เม.ย. 2567' },
  { id: 'CLI-000076', name: 'คุณนิภา วงศ์ทอง',         phone: '083-678-9012', email: 'nipa.w@example.com',     status: 'Active',   pets: 4, lastVisit: '22 พ.ค. 2567' },
  { id: 'CLI-000065', name: 'คุณธนา พิชิต',            phone: '095-789-0123', email: 'tana.p@example.com',     status: 'Active',   pets: 1, lastVisit: '10 พ.ค. 2567' },
  { id: 'CLI-000054', name: 'คุณวรรณา เพชรรัตน์',      phone: '086-890-1234', email: 'wanna.p@example.com',    status: 'Active',   pets: 2, lastVisit: '5 พ.ค. 2567'  },
];

const summary = [
  { label: 'Total Pets',    value: '3'            },
  { label: 'Total Visits',  value: '18'           },
  { label: 'Total Invoice', value: '฿24,850'      },
  { label: 'Outstanding',   value: '฿2,150', red: true },
  { label: 'Last Visit',    value: '20 พ.ค. 2567' },
];

const tags = [
  { icon: Star,         label: 'ลูกค้าประจำ'    },
  { icon: CalendarDays, label: 'Vaccination plan' },
  { icon: PawPrint,     label: 'Sensitive Skin'   },
];

const contactPref = [
  { label: 'ส่งการแจ้งเตือน',  value: 'LINE'          },
  { label: 'นัดหมายล่วงหน้า',  value: '1 วัน'         },
  { label: 'ช่วงเวลาที่สะดวก', value: '10:00 - 18:00' },
];

const pets = [
  {
    name: 'Lucky', gender: 'M', id: 'PET-000321',
    species: 'Dog', breed: 'Golden Retriever',
    sex: 'Male', sterilized: 'ทำหมันแล้ว',
    dob: '12 พ.ค. 2562', age: '5 ปี 0 เดือน',
    microchip: '900215000123456',
    lastVisit: '20 พ.ค. 2567', lastType: 'OPD', dog: true,
  },
  {
    name: 'Mochi', gender: 'F', id: 'PET-000322',
    species: 'Cat', breed: 'Scottish Fold',
    sex: 'Female', sterilized: 'ยังไม่ทำหมัน',
    dob: '3 ส.ค. 2563', age: '3 ปี 9 เดือน',
    microchip: '900215000234567',
    lastVisit: '15 พ.ค. 2567', lastType: 'Vaccine', dog: false,
  },
  {
    name: 'Choco', gender: 'M', id: 'PET-000323',
    species: 'Dog', breed: 'French Bulldog',
    sex: 'Male', sterilized: 'ทำหมันแล้ว',
    dob: '18 ธ.ค. 2564', age: '2 ปี 5 เดือน',
    microchip: '900215000345678',
    lastVisit: '10 พ.ค. 2567', lastType: 'Check up', dog: true,
  },
];

const TABS = ['Pets', 'Visits', 'Invoices', 'Documents', 'Reminders', 'Communication History'];

const typeColors = {
  OPD:     'bg-[#e0f2fe] text-[#0369a1]',
  Vaccine: 'bg-[#dcfce7] text-[#15803d]',
  Check:   'bg-[#f3f4f6] text-[#374151]',
};

const clientVisits = [
  { date: '20 พ.ค. 2567', pet: 'Lucky', type: 'OPD',     detail: 'Fever, Cough (URTI)',    doctor: 'Dr. Natthapon', invId: 'INV-6705102', amount: '฿2,150', paid: false },
  { date: '15 พ.ค. 2567', pet: 'Mochi', type: 'Vaccine', detail: 'DHPPiL, Rabies',          doctor: 'Dr. Natthapon', invId: 'INV-6704089', amount: '฿850',   paid: true  },
  { date: '10 พ.ค. 2567', pet: 'Choco', type: 'Check',   detail: 'Annual Wellness Check',   doctor: 'Dr. Piyawan',   invId: 'INV-6703971', amount: '฿1,200', paid: true  },
  { date: '20 ก.พ. 2567', pet: 'Lucky', type: 'OPD',     detail: 'Vomiting, Diarrhea',      doctor: 'Dr. Natthapon', invId: 'INV-6702018', amount: '฿1,800', paid: true  },
  { date: '5 ม.ค. 2567',  pet: 'Choco', type: 'OPD',     detail: 'Skin Allergy, Pruritus',  doctor: 'Dr. Piyawan',   invId: 'INV-6701044', amount: '฿3,200', paid: true  },
  { date: '10 ก.ย. 2566', pet: 'Lucky', type: 'Vaccine', detail: 'Booster + Deworm + Flea', doctor: 'Dr. Natthapon', invId: 'INV-6609332', amount: '฿1,500', paid: true  },
  { date: '3 ส.ค. 2566',  pet: 'Mochi', type: 'OPD',     detail: 'Ear Infection',            doctor: 'Dr. Piyawan',   invId: 'INV-6608210', amount: '฿950',   paid: true  },
];

const clientInvoices = [
  { id: 'INV-6705102', date: '20 พ.ค. 2567', pet: 'Lucky', desc: 'OPD — URTI Treatment',        items: 3, amount: '฿2,150.00', paid: false },
  { id: 'INV-6704089', date: '15 พ.ค. 2567', pet: 'Mochi', desc: 'Vaccine — DHPPiL + Rabies',   items: 2, amount: '฿850.00',   paid: true  },
  { id: 'INV-6703971', date: '10 พ.ค. 2567', pet: 'Choco', desc: 'Annual Wellness Check',       items: 4, amount: '฿1,200.00', paid: true  },
  { id: 'INV-6702018', date: '20 ก.พ. 2567', pet: 'Lucky', desc: 'OPD — Gastroenteritis',       items: 3, amount: '฿1,800.00', paid: true  },
  { id: 'INV-6701044', date: '5 ม.ค. 2567',  pet: 'Choco', desc: 'OPD — Dermatology Consult',  items: 5, amount: '฿3,200.00', paid: true  },
  { id: 'INV-6609332', date: '10 ก.ย. 2566', pet: 'Lucky', desc: 'Vaccine + Deworm + Flea/Tick',items: 4, amount: '฿1,500.00', paid: true  },
];

const clientDocuments = [
  { name: 'Vaccination Certificate — Lucky 2567.pdf',    type: 'Certificate',  date: '15 พ.ค. 2567', by: 'Dr. Natthapon', size: '180 KB' },
  { name: 'Vaccination Certificate — Mochi 2567.pdf',    type: 'Certificate',  date: '15 พ.ค. 2567', by: 'Dr. Natthapon', size: '180 KB' },
  { name: 'CBC + Chemistry Report — Lucky May 2567.pdf', type: 'Lab Report',   date: '20 พ.ค. 2567', by: 'Dr. Natthapon', size: '248 KB' },
  { name: 'Health Certificate for Export — Lucky.pdf',   type: 'Certificate',  date: '12 มี.ค. 2567', by: 'Dr. Natthapon', size: '210 KB' },
  { name: 'Dermatology Consult Note — Choco.pdf',        type: 'Clinical Note',date: '5 ม.ค. 2567',  by: 'Dr. Piyawan',   size: '145 KB' },
  { name: 'Annual Wellness Summary 2567.pdf',             type: 'Summary',      date: '1 ม.ค. 2567',  by: 'Admin',         size: '95 KB'  },
];

const clientReminders = [
  { pet: 'Lucky', type: 'Vaccine',    detail: 'DHPPiL + Rabies Annual Booster', dueDate: '15 เม.ย. 2568', channel: 'LINE', status: 'Scheduled' },
  { pet: 'Lucky', type: 'Medication', detail: 'Omega-3 Supplement Refill',      dueDate: '10 มิ.ย. 2567', channel: 'LINE', status: 'Pending'   },
  { pet: 'Mochi', type: 'Vaccine',    detail: 'DHPPiL Annual Booster',          dueDate: '15 เม.ย. 2568', channel: 'LINE', status: 'Scheduled' },
  { pet: 'Mochi', type: 'Procedure',  detail: 'Spay Surgery Follow-up',         dueDate: '1 ก.ค. 2567',   channel: 'SMS',  status: 'Pending'   },
  { pet: 'Choco', type: 'Check',      detail: 'Annual Wellness Check Up',        dueDate: '18 ธ.ค. 2567',  channel: 'LINE', status: 'Scheduled' },
  { pet: 'Choco', type: 'Vaccine',    detail: 'Rabies Annual Booster',           dueDate: '10 ก.ย. 2567',  channel: 'LINE', status: 'Scheduled' },
];

const clientComms = [
  { date: '20 พ.ค. 2567', time: '08:30', channel: 'LINE', type: 'Appointment Reminder', msg: 'นัดหมาย Lucky — OPD วันที่ 20 พ.ค. 2567 เวลา 10:00 น.', status: 'Delivered' },
  { date: '14 พ.ค. 2567', time: '09:00', channel: 'LINE', type: 'Vaccine Reminder',     msg: 'Mochi ถึงกำหนดฉีดวัคซีน DHPPiL ในวันที่ 15 พ.ค. 2567', status: 'Delivered' },
  { date: '8 พ.ค. 2567',  time: '09:00', channel: 'LINE', type: 'Appointment Reminder', msg: 'นัดหมาย Choco — Annual Check Up วันที่ 10 พ.ค. 2567',   status: 'Delivered' },
  { date: '19 ก.พ. 2567', time: '08:30', channel: 'LINE', type: 'Appointment Reminder', msg: 'นัดหมาย Lucky — OPD วันที่ 20 ก.พ. 2567 เวลา 09:30 น.', status: 'Delivered' },
  { date: '1 ม.ค. 2567',  time: '10:00', channel: 'SMS',  type: 'New Year Greeting',    msg: 'สวัสดีปีใหม่ 2567 ขอบคุณที่ไว้วางใจ NewBee Animal Hospital', status: 'Delivered' },
  { date: '5 ก.ย. 2566',  time: '09:00', channel: 'LINE', type: 'Vaccine Reminder',     msg: 'Lucky ถึงกำหนดฉีดวัคซีน Booster ในวันที่ 10 ก.ย. 2566',  status: 'Delivered' },
];

// ─── Modal wrapper ────────────────────────────────────────────────────────────

function Modal({ title, onClose, onSave, saveLabel = 'บันทึก', maxWidth = 'max-w-md', children }) {
  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
      onMouseDown={onClose}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl w-full ${maxWidth} flex flex-col max-h-[90vh]`}
        onMouseDown={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[#f0f5f8] shrink-0">
          <span className="font-black text-[16px] text-[#102a43]">{title}</span>
          <button
            onClick={onClose}
            className="text-[#9ab0bc] hover:text-[#102a43] cursor-pointer border-0 bg-transparent p-1 rounded-lg hover:bg-[#f0f5f8] transition-colors"
          >
            <X size={16} />
          </button>
        </div>
        <div className="px-6 py-5 overflow-y-auto flex-1">{children}</div>
        {onSave && (
          <div className="flex gap-2.5 justify-end px-6 py-4 border-t border-[#f0f5f8] shrink-0">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-[#e3edf3] rounded-xl text-[13px] font-semibold text-[#64788a] hover:bg-[#f8fafc] cursor-pointer bg-white"
            >
              ยกเลิก
            </button>
            <button
              onClick={onSave}
              className="px-4 py-2 bg-[#2563eb] rounded-xl text-[13px] font-semibold text-white hover:bg-[#1d4ed8] cursor-pointer"
            >
              {saveLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Form field helpers ───────────────────────────────────────────────────────

function FRow({ label, children }) {
  return (
    <div className="mb-4">
      <label className="block text-[12px] font-bold text-[#39576d] mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function FInput(props) {
  return (
    <input
      className="w-full border border-[#e3edf3] rounded-xl px-3 py-2.5 text-[13px] text-[#102a43] outline-none focus:border-[#2563eb] transition-colors"
      {...props}
    />
  );
}

function FSelect({ options, ...props }) {
  return (
    <select
      className="w-full border border-[#e3edf3] rounded-xl px-3 py-2.5 text-[13px] text-[#102a43] outline-none focus:border-[#2563eb] transition-colors cursor-pointer"
      {...props}
    >
      {options.map(o =>
        typeof o === 'string'
          ? <option key={o}>{o}</option>
          : <option key={o.v} value={o.v}>{o.l}</option>
      )}
    </select>
  );
}

function FTextarea(props) {
  return (
    <textarea
      rows={4}
      className="w-full border border-[#e3edf3] rounded-xl px-3 py-2.5 text-[13px] text-[#102a43] outline-none focus:border-[#2563eb] transition-colors resize-none"
      {...props}
    />
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ClientsPage() {
  const [query, setQuery]             = useState('');
  const [selectedClient, setSelected] = useState(null);
  const [tab, setTab]                 = useState('Pets');
  const [toast, setToast]             = useState('');
  const [modal, setModal]             = useState(null);
  const [modalPet, setModalPet]       = useState(null);
  const [starred, setStarred]         = useState(false);

  const closeModal = () => { setModal(null); setModalPet(null); };
  const done = (msg) => { closeModal(); setToast(msg); };

  const filtered = MOCK_CLIENTS.filter(c => {
    const q = query.toLowerCase();
    return (
      c.name.includes(q) ||
      c.phone.includes(q) ||
      c.id.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q)
    );
  });

  const Toast = toast && (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#102a43] text-white text-sm px-6 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-white/10">
      <span className="font-bold">{toast}</span>
      <button onClick={() => setToast('')} className="bg-transparent border-0 text-white/50 hover:text-white cursor-pointer ml-2">
        <X size={14} />
      </button>
    </div>
  );

  // ── Search mode ─────────────────────────────────────────────────────────────
  if (!selectedClient) {
    return (
      <div className="h-full bg-[#f8fafc] flex flex-col overflow-hidden">
        {Toast}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[720px] mx-auto pt-12 pb-10 px-6">

            <div className="mb-8">
              <h1 className="text-[28px] font-black text-[#102a43] m-0 mb-1">Clients</h1>
              <p className="m-0 text-[#64788a] text-[14px]">
                ค้นหาข้อมูลลูกค้าด้วยชื่อ, เบอร์โทรศัพท์, Client ID หรืออีเมล
              </p>
            </div>

            <div className="flex items-center gap-3 bg-white border-2 border-[#e3edf3] focus-within:border-[#2563eb] rounded-2xl px-4 py-3 shadow-sm transition-colors mb-3">
              <Search size={18} className="text-[#9ab0bc] shrink-0" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="ค้นหาชื่อ, เบอร์โทร, Client ID, หรืออีเมล..."
                className="flex-1 border-0 outline-none text-[15px] bg-transparent text-[#102a43] placeholder-[#9ab0bc]"
                autoFocus
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-[#9ab0bc] hover:text-[#64788a] bg-transparent border-0 cursor-pointer p-0">
                  <X size={16} />
                </button>
              )}
            </div>

            {query.trim() ? (
              filtered.length > 0 ? (
                <div className="bg-white border border-[#e3edf3] rounded-2xl shadow-sm overflow-hidden">
                  <div className="px-5 py-2.5 border-b border-[#f0f5f8] text-[11px] font-bold text-[#9ab0bc] uppercase tracking-wider">
                    พบ {filtered.length} รายการ
                  </div>
                  {filtered.map((c, i) => (
                    <button
                      key={c.id}
                      onClick={() => { setSelected(c); setTab('Pets'); }}
                      className={`w-full flex items-center gap-4 px-5 py-4 hover:bg-[#f8fafc] text-left cursor-pointer border-0 bg-transparent transition-colors ${i < filtered.length - 1 ? 'border-b border-[#f0f5f8]' : ''}`}
                    >
                      <div className="w-10 h-10 rounded-full bg-[#dbeafe] flex items-center justify-center shrink-0">
                        <User size={20} className="text-[#2563eb]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-[#102a43] text-[14px]">{c.name}</div>
                        <div className="text-[12px] text-[#9ab0bc] mt-0.5">{c.id} · {c.phone}</div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${c.status === 'Active' ? 'bg-[#dcfce7] text-[#15803d]' : 'bg-gray-100 text-gray-500'}`}>
                          {c.status}
                        </span>
                        <span className="text-[11px] text-[#9ab0bc]">{c.pets} สัตว์เลี้ยง</span>
                        <span className="text-[11px] text-[#c4d6e0] hidden sm:inline">ล่าสุด {c.lastVisit}</span>
                      </div>
                      <ChevronRight size={15} className="text-[#c4d6e0] shrink-0" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-[#e3edf3] rounded-2xl shadow-sm p-10 text-center">
                  <User size={36} className="text-[#c4d6e0] mx-auto mb-3" />
                  <div className="text-[14px] font-bold text-[#64788a]">ไม่พบลูกค้าที่ตรงกัน</div>
                  <div className="text-[12px] text-[#9ab0bc] mt-1">ลองค้นหาด้วยคำอื่น หรือตรวจสอบการสะกด</div>
                </div>
              )
            ) : (
              <div className="text-center mt-12">
                <div className="w-16 h-16 rounded-2xl bg-[#dbeafe] flex items-center justify-center mx-auto mb-4">
                  <User size={32} className="text-[#2563eb]" />
                </div>
                <div className="text-[15px] font-bold text-[#64788a] mb-1">เริ่มต้นด้วยการค้นหา</div>
                <div className="text-[13px] text-[#9ab0bc]">
                  พิมพ์ชื่อ, เบอร์โทรศัพท์ หรือ Client ID เพื่อค้นหาข้อมูลลูกค้า
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── Detail mode ─────────────────────────────────────────────────────────────
  const cl = selectedClient;

  return (
    <div className="h-full overflow-y-auto bg-[#f8fafc]">
      {Toast}

      {/* ── Modals ── */}

      {modal === 'editClient' && (
        <Modal title="แก้ไขข้อมูลลูกค้า" onClose={closeModal} onSave={() => done('บันทึกข้อมูลลูกค้าเรียบร้อยแล้ว')}>
          <div className="grid grid-cols-2 gap-x-4">
            <FRow label="คำนำหน้า">
              <FSelect options={['คุณ', 'นาย', 'นาง', 'นางสาว', 'ดร.']} defaultValue="คุณ" />
            </FRow>
            <FRow label="ชื่อ-สกุล">
              <FInput defaultValue="ณัฐิดา วงศ์สวัสดิ์" />
            </FRow>
          </div>
          <FRow label="เบอร์โทรศัพท์"><FInput defaultValue={cl.phone} /></FRow>
          <FRow label="อีเมล"><FInput type="email" defaultValue={cl.email} /></FRow>
          <FRow label="Line ID"><FInput defaultValue="nattida_w" /></FRow>
          <div className="grid grid-cols-2 gap-x-4">
            <FRow label="วันเกิด"><FInput type="date" defaultValue="1993-02-14" /></FRow>
            <FRow label="ช่องทางติดต่อที่ต้องการ">
              <FSelect options={['LINE', 'SMS', 'อีเมล', 'โทรศัพท์']} defaultValue="LINE" />
            </FRow>
          </div>
        </Modal>
      )}

      {modal === 'newVisit' && (
        <Modal title="สร้างการมาพบใหม่" onClose={closeModal} onSave={() => done('สร้างการมาพบใหม่เรียบร้อยแล้ว')} saveLabel="สร้างการมาพบ">
          <FRow label="สัตว์เลี้ยง">
            <FSelect
              options={pets.map(p => ({ v: p.id, l: `${p.name} (${p.species} · ${p.id})` }))}
              defaultValue={modalPet?.id}
            />
          </FRow>
          <FRow label="ประเภทการมาพบ">
            <FSelect options={['OPD', 'Vaccine', 'Check up', 'Surgery', 'Dental', 'Grooming']} />
          </FRow>
          <div className="grid grid-cols-2 gap-x-4">
            <FRow label="วันที่"><FInput type="date" defaultValue="2024-05-20" /></FRow>
            <FRow label="เวลา"><FInput type="time" defaultValue="10:00" /></FRow>
          </div>
          <FRow label="อาการสำคัญ / Chief Complaint">
            <FTextarea placeholder="ระบุอาการหรือเหตุผลที่มาพบ..." />
          </FRow>
          <FRow label="แพทย์ผู้รักษา">
            <FSelect options={['Dr. Natthapon', 'Dr. Piyawan', 'Dr. Somporn']} />
          </FRow>
        </Modal>
      )}

      {modal === 'editAddress' && (
        <Modal title="แก้ไขที่อยู่" onClose={closeModal} onSave={() => done('บันทึกที่อยู่เรียบร้อยแล้ว')}>
          <FRow label="บ้านเลขที่ / ซอย / ถนน">
            <FInput defaultValue="99/123 หมู่บ้านปิ่นเกล้า ซอย 5 ถ.บรมราชชนนี" />
          </FRow>
          <div className="grid grid-cols-2 gap-x-4">
            <FRow label="แขวง / ตำบล"><FInput defaultValue="อรุณอมรินทร์" /></FRow>
            <FRow label="เขต / อำเภอ"><FInput defaultValue="บางกอกน้อย" /></FRow>
          </div>
          <div className="grid grid-cols-2 gap-x-4">
            <FRow label="จังหวัด"><FInput defaultValue="กรุงเทพมหานคร" /></FRow>
            <FRow label="รหัสไปรษณีย์"><FInput defaultValue="10700" /></FRow>
          </div>
        </Modal>
      )}

      {modal === 'editContact' && (
        <Modal title="แก้ไขการตั้งค่าการติดต่อ" onClose={closeModal} onSave={() => done('บันทึกการตั้งค่าการติดต่อแล้ว')}>
          <FRow label="ช่องทางการแจ้งเตือน">
            <FSelect options={['LINE', 'SMS', 'อีเมล', 'โทรศัพท์']} defaultValue="LINE" />
          </FRow>
          <FRow label="แจ้งเตือนนัดหมายล่วงหน้า">
            <FSelect options={['1 วัน', '2 วัน', '3 วัน', '7 วัน']} defaultValue="1 วัน" />
          </FRow>
          <FRow label="ช่วงเวลาที่สะดวกให้ติดต่อ">
            <div className="grid grid-cols-2 gap-x-4">
              <FSelect options={['08:00', '09:00', '10:00', '11:00', '12:00']} defaultValue="10:00" />
              <FSelect options={['16:00', '17:00', '18:00', '19:00', '20:00']} defaultValue="18:00" />
            </div>
          </FRow>
          <FRow label="รับการแจ้งเตือนเกี่ยวกับ">
            <div className="flex flex-col gap-2 mt-1">
              {['นัดหมาย', 'วัคซีนที่ใกล้หมดอายุ', 'ยารักษาโรค', 'โปรโมชั่นและข่าวสาร'].map(opt => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer text-[13px] text-[#39576d]">
                  <input type="checkbox" defaultChecked={opt !== 'โปรโมชั่นและข่าวสาร'} className="w-4 h-4 accent-[#2563eb]" />
                  {opt}
                </label>
              ))}
            </div>
          </FRow>
        </Modal>
      )}

      {modal === 'editRemark' && (
        <Modal title="แก้ไขหมายเหตุ" onClose={closeModal} onSave={() => done('บันทึกหมายเหตุเรียบร้อยแล้ว')}>
          <FRow label="หมายเหตุ">
            <FTextarea defaultValue="แพ้อาหารประเภทไก่" rows={5} placeholder="ระบุหมายเหตุหรือข้อมูลสำคัญเกี่ยวกับลูกค้า..." />
          </FRow>
        </Modal>
      )}

      {modal === 'addPet' && (
        <Modal title="เพิ่มสัตว์เลี้ยงใหม่" onClose={closeModal} onSave={() => done('เพิ่มสัตว์เลี้ยงใหม่เรียบร้อยแล้ว')} saveLabel="เพิ่มสัตว์เลี้ยง">
          <div className="grid grid-cols-2 gap-x-4">
            <FRow label="ชื่อสัตว์เลี้ยง *"><FInput placeholder="เช่น Buddy" /></FRow>
            <FRow label="ชนิด (Species)">
              <FSelect options={['Dog', 'Cat', 'Rabbit', 'Bird', 'Reptile', 'Other']} />
            </FRow>
          </div>
          <FRow label="สายพันธุ์ (Breed)"><FInput placeholder="เช่น Golden Retriever" /></FRow>
          <div className="grid grid-cols-2 gap-x-4">
            <FRow label="เพศ"><FSelect options={['Male', 'Female']} /></FRow>
            <FRow label="ทำหมัน"><FSelect options={['ยังไม่ทำหมัน', 'ทำหมันแล้ว']} /></FRow>
          </div>
          <div className="grid grid-cols-2 gap-x-4">
            <FRow label="วันเกิด"><FInput type="date" /></FRow>
            <FRow label="สี (Color)"><FInput placeholder="เช่น Golden" /></FRow>
          </div>
          <FRow label="หมายเลขไมโครชิพ"><FInput placeholder="900XXXXXXXXXXXX" /></FRow>
          <FRow label="น้ำหนัก (kg)"><FInput type="number" step="0.1" placeholder="0.0" /></FRow>
        </Modal>
      )}

      {modal === 'addTag' && (
        <Modal title="เพิ่มแท็ก" onClose={closeModal} onSave={() => done('เพิ่มแท็กเรียบร้อยแล้ว')} saveLabel="เพิ่มแท็ก">
          <FRow label="แท็กที่แนะนำ">
            <div className="flex flex-wrap gap-2 mt-1">
              {['ลูกค้า VIP', 'ลูกค้าประจำ', 'Vaccination Plan', 'Allergy', 'Sensitive Skin', 'Senior Pet', 'ต้องนัดล่วงหน้า', 'ประกันสัตว์'].map(t => (
                <button key={t} className="px-3 py-1.5 border border-[#e3edf3] rounded-full text-[12px] text-[#39576d] hover:border-[#2563eb] hover:text-[#2563eb] hover:bg-[#eff6ff] transition-colors cursor-pointer bg-white">
                  + {t}
                </button>
              ))}
            </div>
          </FRow>
          <FRow label="หรือพิมพ์แท็กใหม่">
            <FInput placeholder="พิมพ์แท็กที่ต้องการ..." />
          </FRow>
        </Modal>
      )}

      {modal === 'petOptions' && (
        <Modal title={`${modalPet?.name ?? 'Pet'} — ตัวเลือก`} onClose={closeModal} onSave={null} maxWidth="max-w-xs">
          <div className="flex flex-col gap-1 -mx-2">
            <Link
              href="/patients"
              onClick={closeModal}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#f0f5f8] text-[13px] font-semibold text-[#102a43] no-underline transition-colors"
            >
              <FileText size={16} className="text-[#2563eb]" /> ดูประวัติผู้ป่วย
            </Link>
            <button
              onClick={() => done(`เปิดฟอร์มแก้ไขข้อมูล ${modalPet?.name}`)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#f0f5f8] text-[13px] font-semibold text-[#102a43] text-left border-0 bg-transparent cursor-pointer transition-colors"
            >
              <Pencil size={16} className="text-[#64788a]" /> แก้ไขข้อมูลสัตว์เลี้ยง
            </button>
            <button
              onClick={() => { setModal('newVisit'); }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#f0f5f8] text-[13px] font-semibold text-[#102a43] text-left border-0 bg-transparent cursor-pointer transition-colors"
            >
              <CalendarDays size={16} className="text-[#64788a]" /> นัดหมายใหม่
            </button>
            <button
              onClick={() => done(`ปิดการใช้งาน ${modalPet?.name} แล้ว`)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#fef2f2] text-[13px] font-semibold text-[#dc2626] text-left border-0 bg-transparent cursor-pointer transition-colors"
            >
              <X size={16} /> ปิดการใช้งานสัตว์เลี้ยง
            </button>
          </div>
        </Modal>
      )}

      {/* ── Detail content ── */}
      <div className="p-5 flex flex-col gap-4">

        {/* Back */}
        <button
          onClick={() => setSelected(null)}
          className="flex items-center gap-2 text-[#2563eb] font-bold text-[13px] hover:underline cursor-pointer border-0 bg-transparent w-fit p-0"
        >
          <ArrowLeft size={14} /> กลับไปค้นหา
        </button>

        {/* Top info card */}
        <div className="bg-white border border-[#e3edf3] rounded-xl p-5 shadow-sm">
          <div className="flex gap-5">

            {/* Photo + basic info */}
            <div className="flex gap-4 flex-1 min-w-0">
              <div className="w-[96px] h-[96px] rounded-full bg-[#dbeafe] flex items-center justify-center shrink-0 border-4 border-[#e3edf3]">
                <User size={48} className="text-[#2563eb]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[17px] font-black text-[#102a43]">{cl.name}</span>
                  <span className={`px-2 py-0.5 text-[11px] font-bold rounded-full ${cl.status === 'Active' ? 'bg-[#dcfce7] text-[#15803d]' : 'bg-gray-100 text-gray-500'}`}>
                    {cl.status}
                  </span>
                  <button
                    onClick={() => setStarred(s => !s)}
                    className="border-0 bg-transparent cursor-pointer p-0 leading-none"
                  >
                    <Star
                      size={14}
                      className={`transition-colors ${starred ? 'text-[#f59e0b] fill-[#f59e0b]' : 'text-[#9ab0bc] hover:text-[#f59e0b]'}`}
                    />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-1.5">
                  {[
                    ['Client ID',         cl.id],
                    ['Phone',             cl.phone],
                    ['Email',             cl.email],
                    ['Line ID',           'nattida_w'],
                    ['Date of Birth',     '14 ก.พ. 2536'],
                    ['Preferred Contact', 'LINE'],
                  ].map(([lbl, val]) => (
                    <div key={lbl} className="flex items-center gap-2">
                      <span className="text-[12px] text-[#9ab0bc] w-[110px] shrink-0">{lbl}</span>
                      <span className={`text-[12px] font-semibold ${lbl === 'Email' ? 'text-[#2563eb]' : 'text-[#102a43]'}`}>{val}</span>
                    </div>
                  ))}
                  <div className="col-span-2 flex items-center gap-2">
                    <span className="text-[12px] text-[#9ab0bc] w-[110px] shrink-0">Note</span>
                    <span className="text-[12px] text-[#39576d]">ลูกค้าประจำ • นิสัยนารัก อัธยาศัยดี</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-px bg-[#f0f5f8] self-stretch shrink-0" />

            {/* Summary */}
            <div className="w-[300px] shrink-0">
              <div className="text-[11px] font-bold text-[#9ab0bc] uppercase tracking-wider mb-2">Summary</div>
              <div className="flex flex-col gap-1.5">
                {summary.map((s) => (
                  <div key={s.label} className="flex items-center justify-between">
                    <span className="text-[12px] text-[#64788a]">{s.label}</span>
                    <span className={`text-[12px] font-bold ${s.red ? 'text-[#dc2626]' : 'text-[#102a43]'}`}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-px bg-[#f0f5f8] self-stretch shrink-0" />

            {/* Tags + Actions */}
            <div className="w-[450px] shrink-0">
              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => setModal('editClient')}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-[#e3edf3] rounded-lg text-[12px] font-semibold text-[#39576d] hover:border-[#2563eb] hover:text-[#2563eb] transition-colors cursor-pointer bg-white"
                >
                  <Pencil size={12} /> Edit
                </button>
                <button
                  onClick={() => setModal('newVisit')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2563eb] rounded-lg text-[12px] font-semibold text-white hover:bg-[#1d4ed8] transition-colors cursor-pointer"
                >
                  <Plus size={12} /> New Visit
                </button>
              </div>
              <div className="text-[11px] font-bold text-[#9ab0bc] uppercase tracking-wider mb-1.5">Tags</div>
              <div className="grid grid-cols-2 gap-1.5">
                {tags.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5 px-2 py-1 bg-[#f8fafc] border border-[#e3edf3] rounded-lg min-w-0">
                    <Icon size={12} className="text-[#64788a] shrink-0" />
                    <span className="text-[11px] text-[#39576d] font-medium truncate">{label}</span>
                  </div>
                ))}
                <button
                  onClick={() => setModal('addTag')}
                  className="flex items-center gap-1.5 px-2 py-1 text-[11px] text-[#9ab0bc] hover:text-[#2563eb] transition-colors cursor-pointer border-0 bg-transparent col-span-1"
                >
                  <Plus size={12} /> Add Tag
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Address | Contact Preference | Remark */}
        <div className="grid grid-cols-3 gap-4">

          {/* Address */}
          <div className="bg-white border border-[#e3edf3] rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[#2563eb]" />
                <span className="text-[13px] font-black text-[#102a43]">Address</span>
              </div>
              <button
                onClick={() => setModal('editAddress')}
                className="flex items-center gap-1 text-[#9ab0bc] hover:text-[#2563eb] cursor-pointer border-0 bg-transparent transition-colors p-1 rounded-lg hover:bg-[#f0f5f8]"
              >
                <Pencil size={12} />
              </button>
            </div>
            <div className="text-[12px] text-[#39576d] leading-relaxed">
              99/123 หมู่บ้านปิ่นเกล้า ซอย 5<br />
              ถ.บรมราชชนนี แขวงอรุณอมรินทร์<br />
              เขตบางกอกน้อย กรุงเทพฯ 10700
            </div>
          </div>

          {/* Contact Preference */}
          <div className="bg-white border border-[#e3edf3] rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Bell size={14} className="text-[#2563eb]" />
                <span className="text-[13px] font-black text-[#102a43]">Contact Preference</span>
              </div>
              <button
                onClick={() => setModal('editContact')}
                className="flex items-center gap-1 text-[#9ab0bc] hover:text-[#2563eb] cursor-pointer border-0 bg-transparent transition-colors p-1 rounded-lg hover:bg-[#f0f5f8]"
              >
                <Pencil size={12} />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {contactPref.map((c) => (
                <div key={c.label} className="flex items-center gap-2">
                  <span className="text-[11px] text-[#9ab0bc] w-[110px] shrink-0">{c.label}</span>
                  <span className="text-[12px] font-semibold text-[#102a43]">{c.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Remark */}
          <div className="bg-white border border-[#e3edf3] rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <MessageSquare size={14} className="text-[#2563eb]" />
                <span className="text-[13px] font-black text-[#102a43]">Remark</span>
              </div>
              <button
                onClick={() => setModal('editRemark')}
                className="flex items-center gap-1 text-[#9ab0bc] hover:text-[#2563eb] cursor-pointer border-0 bg-transparent transition-colors p-1 rounded-lg hover:bg-[#f0f5f8]"
              >
                <Pencil size={12} />
              </button>
            </div>
            <div className="text-[12px] text-[#39576d] leading-relaxed">แพ้อาหารประเภทไก่</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center border-b border-[#e3edf3] bg-white rounded-t-xl px-2 -mb-1 overflow-x-auto">
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2.5 text-[12px] font-semibold transition-colors cursor-pointer border-b-2 whitespace-nowrap ${
                tab === t
                  ? 'border-[#2563eb] text-[#2563eb]'
                  : 'border-transparent text-[#64748b] hover:text-[#102a43]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Pets tab */}
        {tab === 'Pets' && (
          <div className="bg-white border border-[#e3edf3] rounded-xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#f0f5f8]">
              <span className="text-[13px] font-black text-[#102a43]">Pets ({pets.length})</span>
              <button
                onClick={() => setModal('addPet')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2563eb] rounded-lg text-[12px] font-semibold text-white hover:bg-[#1d4ed8] transition-colors cursor-pointer"
              >
                <Plus size={13} /> Add New Pet
              </button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#f0f5f8]">
                  {['Name', 'Species / Breed', 'Sex', 'Birth Date / Age', 'Microchip', 'Last Visit', 'Action'].map((h, i) => (
                    <th key={h} className={`px-5 py-3 text-[10px] font-bold text-[#9ab0bc] uppercase ${i === 6 ? 'text-center' : 'text-left'}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pets.map((p) => (
                  <tr key={p.id} className="border-b border-[#f8fbfc] last:border-0 hover:bg-[#f8fafc] transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center ${p.dog ? 'bg-[#fef3c7]' : 'bg-[#ede9fe]'}`}>
                          {p.dog ? <Dog size={18} className="text-[#b45309]" /> : <Cat size={18} className="text-[#7c3aed]" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            <span className="text-[13px] font-bold text-[#102a43]">{p.name}</span>
                            <span className={`text-[11px] font-bold ${p.gender === 'M' ? 'text-[#3b82f6]' : 'text-[#ec4899]'}`}>{p.gender}</span>
                          </div>
                          <div className="text-[10px] text-[#9ab0bc]">{p.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="text-[12px] font-semibold text-[#102a43]">{p.species}</div>
                      <div className="text-[11px] text-[#9ab0bc]">{p.breed}</div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="text-[12px] text-[#39576d]">{p.sex}</div>
                      <div className="text-[10px] text-[#9ab0bc]">{p.sterilized}</div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="text-[12px] text-[#39576d]">{p.dob}</div>
                      <div className="text-[10px] text-[#9ab0bc]">{p.age}</div>
                    </td>
                    <td className="px-5 py-3 font-mono text-[11px] text-[#64788a]">{p.microchip}</td>
                    <td className="px-5 py-3">
                      <div className="text-[12px] text-[#39576d]">{p.lastVisit}</div>
                      <div className="text-[10px] text-[#9ab0bc]">{p.lastType}</div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <Link href="/patients">
                          <FileText size={15} className="text-[#9ab0bc] hover:text-[#2563eb] cursor-pointer transition-colors" />
                        </Link>
                        <button
                          onClick={() => { setModalPet(p); setModal('newVisit'); }}
                          className="border-0 bg-transparent p-0 cursor-pointer leading-none"
                        >
                          <CalendarDays size={15} className="text-[#9ab0bc] hover:text-[#2563eb] transition-colors" />
                        </button>
                        <button
                          onClick={() => { setModalPet(p); setModal('petOptions'); }}
                          className="border-0 bg-transparent p-0 cursor-pointer leading-none"
                        >
                          <MoreVertical size={15} className="text-[#9ab0bc] hover:text-[#2563eb] transition-colors" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── Visits tab ── */}
        {tab === 'Visits' && (
          <div className="bg-white border border-[#e3edf3] rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b border-[#f0f5f8]">
              <span className="text-[13px] font-black text-[#102a43]">Visit History ({clientVisits.length})</span>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#f0f5f8]">
                  {['Date', 'Pet', 'Type', 'Details', 'Doctor', 'Invoice', 'Amount', 'Status'].map(h => (
                    <th key={h} className="px-5 py-3 text-[10px] font-bold text-[#9ab0bc] uppercase text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {clientVisits.map((v, i) => (
                  <tr key={i} className="border-b border-[#f8fbfc] last:border-0 hover:bg-[#f8fafc] transition-colors">
                    <td className="px-5 py-3 text-[12px] font-semibold text-[#102a43] whitespace-nowrap">{v.date}</td>
                    <td className="px-5 py-3 text-[12px] font-semibold text-[#102a43]">{v.pet}</td>
                    <td className="px-5 py-3">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${typeColors[v.type] ?? 'bg-[#f3f4f6] text-[#374151]'}`}>{v.type}</span>
                    </td>
                    <td className="px-5 py-3 text-[12px] text-[#39576d]">{v.detail}</td>
                    <td className="px-5 py-3 text-[12px] text-[#64788a] whitespace-nowrap">{v.doctor}</td>
                    <td className="px-5 py-3 font-mono text-[11px] text-[#64788a]">{v.invId}</td>
                    <td className="px-5 py-3 text-[12px] font-semibold text-[#102a43]">{v.amount}</td>
                    <td className="px-5 py-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${v.paid ? 'bg-[#dcfce7] text-[#15803d]' : 'bg-[#fee2e2] text-[#dc2626]'}`}>
                        {v.paid ? 'Paid' : 'Unpaid'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── Invoices tab ── */}
        {tab === 'Invoices' && (
          <div className="flex flex-col gap-4">
            <div className="bg-[#fef2f2] border border-[#fecaca] rounded-xl px-5 py-4 flex items-center justify-between">
              <div>
                <div className="text-[11px] font-bold text-[#dc2626] uppercase tracking-wider mb-0.5">Outstanding Balance</div>
                <div className="text-[26px] font-black text-[#dc2626] leading-tight">฿2,150.00</div>
              </div>
              <button
                onClick={() => done('ดำเนินการชำระเงินแล้ว')}
                className="px-4 py-2 bg-[#dc2626] rounded-xl text-[13px] font-semibold text-white hover:bg-[#b91c1c] cursor-pointer"
              >
                Pay Now
              </button>
            </div>
            <div className="bg-white border border-[#e3edf3] rounded-xl shadow-sm overflow-hidden">
              <div className="px-5 py-3.5 border-b border-[#f0f5f8]">
                <span className="text-[13px] font-black text-[#102a43]">Invoices ({clientInvoices.length})</span>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#f0f5f8]">
                    {['Invoice ID', 'Date', 'Pet', 'Description', 'Items', 'Amount', 'Status', ''].map(h => (
                      <th key={h} className="px-5 py-3 text-[10px] font-bold text-[#9ab0bc] uppercase text-left">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {clientInvoices.map((inv, i) => (
                    <tr key={i} className="border-b border-[#f8fbfc] last:border-0 hover:bg-[#f8fafc] transition-colors">
                      <td className="px-5 py-3 font-mono text-[11px] text-[#2563eb] font-semibold">{inv.id}</td>
                      <td className="px-5 py-3 text-[12px] text-[#39576d] whitespace-nowrap">{inv.date}</td>
                      <td className="px-5 py-3 text-[12px] font-semibold text-[#102a43]">{inv.pet}</td>
                      <td className="px-5 py-3 text-[12px] text-[#39576d]">{inv.desc}</td>
                      <td className="px-5 py-3 text-[12px] text-[#64788a] text-center">{inv.items}</td>
                      <td className="px-5 py-3 text-[12px] font-bold text-[#102a43]">{inv.amount}</td>
                      <td className="px-5 py-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${inv.paid ? 'bg-[#dcfce7] text-[#15803d]' : 'bg-[#fee2e2] text-[#dc2626]'}`}>
                          {inv.paid ? 'Paid' : 'Unpaid'}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <button
                          onClick={() => done(`กำลังดาวน์โหลด ${inv.id}`)}
                          className="text-[11px] text-[#2563eb] font-semibold hover:underline cursor-pointer border-0 bg-transparent"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Documents tab ── */}
        {tab === 'Documents' && (
          <div className="bg-white border border-[#e3edf3] rounded-xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#f0f5f8]">
              <span className="text-[13px] font-black text-[#102a43]">Documents ({clientDocuments.length})</span>
              <button
                onClick={() => done('กำลังเปิดหน้าต่างอัปโหลดไฟล์...')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2563eb] rounded-lg text-[12px] font-semibold text-white hover:bg-[#1d4ed8] cursor-pointer"
              >
                <Plus size={13} /> Upload File
              </button>
            </div>
            <div className="divide-y divide-[#f8fbfc]">
              {clientDocuments.map((doc, i) => (
                <div key={i} className="flex items-center gap-4 px-5 py-3.5 hover:bg-[#f8fafc] transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-[#f0f5f8] flex items-center justify-center shrink-0">
                    <FileText size={18} className="text-[#64788a]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-semibold text-[#102a43] truncate">{doc.name}</div>
                    <div className="text-[11px] text-[#9ab0bc] mt-0.5">{doc.date} · {doc.size} · {doc.by}</div>
                  </div>
                  <span className="text-[10px] font-bold text-[#64788a] bg-[#f0f5f8] px-2 py-0.5 rounded-md shrink-0">{doc.type}</span>
                  <button
                    onClick={() => done(`กำลังดาวน์โหลด ${doc.name}`)}
                    className="text-[#9ab0bc] hover:text-[#2563eb] cursor-pointer bg-transparent border-0 shrink-0 transition-colors"
                  >
                    <Download size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Reminders tab ── */}
        {tab === 'Reminders' && (
          <div className="bg-white border border-[#e3edf3] rounded-xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#f0f5f8]">
              <span className="text-[13px] font-black text-[#102a43]">Reminders ({clientReminders.length})</span>
              <button
                onClick={() => done('เปิดฟอร์มเพิ่มการแจ้งเตือนใหม่...')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2563eb] rounded-lg text-[12px] font-semibold text-white hover:bg-[#1d4ed8] cursor-pointer"
              >
                <Plus size={13} /> Add Reminder
              </button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#f0f5f8]">
                  {['Pet', 'Type', 'Detail', 'Due Date', 'Channel', 'Status', 'Action'].map(h => (
                    <th key={h} className="px-5 py-3 text-[10px] font-bold text-[#9ab0bc] uppercase text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {clientReminders.map((r, i) => (
                  <tr key={i} className="border-b border-[#f8fbfc] last:border-0 hover:bg-[#f8fafc] transition-colors">
                    <td className="px-5 py-3 text-[12px] font-semibold text-[#102a43]">{r.pet}</td>
                    <td className="px-5 py-3">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                        r.type === 'Vaccine'    ? 'bg-[#dcfce7] text-[#15803d]' :
                        r.type === 'Medication' ? 'bg-[#e0f2fe] text-[#0369a1]' :
                                                  'bg-[#f3f4f6] text-[#374151]'
                      }`}>{r.type}</span>
                    </td>
                    <td className="px-5 py-3 text-[12px] text-[#39576d]">{r.detail}</td>
                    <td className="px-5 py-3 text-[12px] font-semibold text-[#102a43] whitespace-nowrap">{r.dueDate}</td>
                    <td className="px-5 py-3">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                        r.channel === 'LINE' ? 'bg-[#dcfce7] text-[#15803d]' : 'bg-[#ede9fe] text-[#7c3aed]'
                      }`}>{r.channel}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        r.status === 'Scheduled' ? 'bg-[#e0f2fe] text-[#0369a1]' : 'bg-[#fef3c7] text-[#b45309]'
                      }`}>{r.status}</span>
                    </td>
                    <td className="px-5 py-3">
                      <button
                        onClick={() => done(`ส่งการแจ้งเตือน ${r.pet} — ${r.detail} แล้ว`)}
                        className="text-[11px] text-[#2563eb] font-semibold hover:underline cursor-pointer border-0 bg-transparent"
                      >
                        Send Now
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── Communication History tab ── */}
        {tab === 'Communication History' && (
          <div className="bg-white border border-[#e3edf3] rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b border-[#f0f5f8]">
              <span className="text-[13px] font-black text-[#102a43]">Communication History ({clientComms.length})</span>
            </div>
            <div className="divide-y divide-[#f8fbfc]">
              {clientComms.map((m, i) => (
                <div key={i} className="flex items-start gap-4 px-5 py-4 hover:bg-[#f8fafc] transition-colors">
                  <span className={`text-[10px] font-black px-2 py-1 rounded-lg shrink-0 mt-0.5 ${
                    m.channel === 'LINE' ? 'bg-[#dcfce7] text-[#15803d]' :
                    m.channel === 'SMS'  ? 'bg-[#ede9fe] text-[#7c3aed]' :
                                           'bg-[#e0f2fe] text-[#0369a1]'
                  }`}>{m.channel}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[12px] font-semibold text-[#102a43]">{m.type}</span>
                      <span className="text-[10px] font-bold bg-[#dcfce7] text-[#15803d] px-1.5 py-0.5 rounded-md">{m.status}</span>
                    </div>
                    <div className="text-[12px] text-[#39576d] truncate">{m.msg}</div>
                    <div className="text-[11px] text-[#9ab0bc] mt-1">{m.date} · {m.time} น.</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
