import { useState } from 'react';
import {
  Users, UserCheck, Shield, Clock, Plus, Search,
  MoreHorizontal, Download, CheckCircle2, XCircle,
  Eye, Edit, Trash2, X,
} from 'lucide-react';

const USERS = [
  { name: 'Dr. ณัฐพล สิริวัฒน์',   email: 'natthapon@vetcare.com', role: 'Administrator',  dept: 'Management',   status: true,  lastLogin: 'ออนไลน์อยู่',    av: 'N' },
  { name: 'Dr. สมชาย รัตนพงศ์',    email: 'somchai@vetcare.com',   role: 'Veterinarian',   dept: 'Clinical',     status: true,  lastLogin: '2 ชม. ที่แล้ว', av: 'S' },
  { name: 'น.สพ. วิภา เจริญสุข',   email: 'vipa@vetcare.com',      role: 'Veterinarian',   dept: 'Clinical',     status: true,  lastLogin: '30 น. ที่แล้ว', av: 'V' },
  { name: 'พยาบาล แพรว มณีรัตน์',  email: 'praew@vetcare.com',     role: 'Nurse',          dept: 'Clinical',     status: true,  lastLogin: '1 วันที่แล้ว',  av: 'P' },
  { name: 'Lab Tech เล็ก สมใจ',    email: 'lek@vetcare.com',       role: 'Lab Technician', dept: 'Laboratory',   status: true,  lastLogin: '3 ชม. ที่แล้ว', av: 'L' },
  { name: 'ภก. มาลี ประสงค์ดี',    email: 'malee@vetcare.com',     role: 'Pharmacist',     dept: 'Pharmacy',     status: true,  lastLogin: '5 ชม. ที่แล้ว', av: 'M' },
  { name: 'แอดมิน สมหญิง วงษ์ทอง', email: 'somying@vetcare.com',   role: 'Receptionist',   dept: 'Front Desk',   status: false, lastLogin: '5 วันที่แล้ว',  av: 'A' },
  { name: 'ช่างภาพ สมศักดิ์ แก้ว', email: 'somsak@vetcare.com',    role: 'Imaging Tech',   dept: 'Imaging',      status: false, lastLogin: '12 วันที่แล้ว', av: 'I' },
];

const ROLES = [
  { name: 'Administrator',  users: 1, perms: ['ทุกโมดูล', 'ตั้งค่าระบบ', 'จัดการผู้ใช้'],             color: '#dc2626' },
  { name: 'Veterinarian',   users: 2, perms: ['OPD/EMR', 'IPD', 'รักษา', 'จ่ายยา (สั่ง)'],            color: '#2563eb' },
  { name: 'Nurse',          users: 1, perms: ['OPD อ่าน', 'IPD', 'Triage', 'Lab อ่าน'],               color: '#0891b2' },
  { name: 'Lab Technician', users: 1, perms: ['Lab เต็ม', 'Imaging อ่าน'],                             color: '#7c3aed' },
  { name: 'Pharmacist',     users: 1, perms: ['คลังยา', 'จ่ายยา', 'Billing อ่าน'],                    color: '#059669' },
  { name: 'Receptionist',   users: 1, perms: ['ลงทะเบียน', 'นัดหมาย', 'คิว', 'Billing จำกัด'],        color: '#d97706' },
  { name: 'Imaging Tech',   users: 1, perms: ['Imaging เต็ม', 'Lab อ่าน'],                             color: '#db2777' },
];

const ATTENDANCE = [
  { name: 'Dr. ณัฐพล',     date: '09 มิ.ย. 2567', checkIn: '08:02', checkOut: '17:45', hours: '9:43', status: 'ปกติ'        },
  { name: 'Dr. สมชาย',    date: '09 มิ.ย. 2567', checkIn: '08:30', checkOut: '18:00', hours: '9:30', status: 'ปกติ'        },
  { name: 'น.สพ. วิภา',   date: '09 มิ.ย. 2567', checkIn: '09:15', checkOut: '18:30', hours: '9:15', status: 'สาย'         },
  { name: 'พยาบาล แพรว',  date: '09 มิ.ย. 2567', checkIn: '07:55', checkOut: '17:00', hours: '9:05', status: 'ปกติ'        },
  { name: 'Lab Tech เล็ก', date: '09 มิ.ย. 2567', checkIn: '08:10', checkOut: '—',     hours: '—',    status: 'กำลังทำงาน' },
  { name: 'ภก. มาลี',     date: '09 มิ.ย. 2567', checkIn: '08:45', checkOut: '17:30', hours: '8:45', status: 'ปกติ'        },
  { name: 'แอดมิน สมหญิง', date: '09 มิ.ย. 2567', checkIn: '—',    checkOut: '—',     hours: '—',    status: 'ลา'          },
];

const AUDIT = [
  { time: '11:30:05', user: 'Dr. ณัฐพล',     action: 'UPDATE',   detail: 'แก้ไขสิทธิ์ผู้ใช้ Lab Tech เล็ก',   ip: '192.168.1.10' },
  { time: '10:02:44', user: 'ภก. มาลี',      action: 'DISPENSE', detail: 'จ่ายยา Rx #RX-8841',                ip: '192.168.1.30' },
  { time: '09:45:08', user: 'Lab Tech เล็ก', action: 'UPDATE',   detail: 'อัปเดตผล CBC Lab #LB-5421',         ip: '192.168.1.25' },
  { time: '09:22:15', user: 'Dr. สมชาย',     action: 'CREATE',   detail: 'สร้าง OPD: Lucky (PET-000321)',     ip: '192.168.1.12' },
  { time: '09:14:32', user: 'Dr. ณัฐพล',     action: 'LOGIN',    detail: 'เข้าสู่ระบบ',                      ip: '192.168.1.10' },
  { time: '08:55:21', user: 'แอดมิน สมหญิง', action: 'DELETE',   detail: 'ยกเลิกนัดหมาย APT-1023',           ip: '192.168.1.15' },
  { time: '08:30:10', user: 'Dr. สมชาย',     action: 'PRINT',    detail: 'พิมพ์ใบเสร็จ INV-6705089',         ip: '192.168.1.12' },
  { time: '08:05:55', user: 'Lab Tech เล็ก', action: 'LOGIN',    detail: 'เข้าสู่ระบบ',                      ip: '192.168.1.25' },
];

const ACTIVITY = [
  { time: '11:30:22', user: 'Dr. ณัฐพล',     page: 'HR / Users',   action: 'VIEW'     },
  { time: '11:28:47', user: 'Lab Tech เล็ก', page: 'Lab / LIS',    action: 'UPDATE'   },
  { time: '11:25:10', user: 'Dr. สมชาย',     page: 'OPD / EMR',    action: 'CREATE'   },
  { time: '11:20:33', user: 'ภก. มาลี',      page: 'Pharmacy',     action: 'DISPENSE' },
  { time: '11:15:09', user: 'พยาบาล แพรว',   page: 'IPD / ICU',    action: 'VIEW'     },
  { time: '11:10:55', user: 'แอดมิน สมหญิง', page: 'Appointment',  action: 'UPDATE'   },
  { time: '11:05:01', user: 'Dr. สมชาย',     page: 'Dashboard',    action: 'VIEW'     },
  { time: '11:00:44', user: 'Lab Tech เล็ก', page: 'Inventory',    action: 'VIEW'     },
];

const AUDIT_COLOR = {
  LOGIN:    { bg: 'bg-blue-50',   text: 'text-blue-600'   },
  CREATE:   { bg: 'bg-green-50',  text: 'text-green-700'  },
  UPDATE:   { bg: 'bg-amber-50',  text: 'text-amber-700'  },
  DELETE:   { bg: 'bg-red-50',    text: 'text-red-600'    },
  DISPENSE: { bg: 'bg-purple-50', text: 'text-purple-700' },
  PRINT:    { bg: 'bg-slate-50',  text: 'text-slate-600'  },
};

const ATT_COLOR = {
  ปกติ:        'bg-green-50 text-green-700',
  สาย:         'bg-orange-50 text-orange-700',
  กำลังทำงาน: 'bg-blue-50 text-blue-700',
  ลา:          'bg-slate-50 text-slate-500',
};

const TABS = ['ผู้ใช้ระบบ', 'Roles & Permissions', 'การเข้างาน', 'Audit Log', 'Activity Log'];
const avColors = ['#2563eb', '#0891b2', '#059669', '#7c3aed', '#d97706', '#dc2626', '#db2777', '#0f8f83'];

const Av = ({ ch, color }) => (
  <div
    style={{ background: color + '22', color }}
    className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold shrink-0"
  >
    {ch}
  </div>
);

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
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-[#f0f5f8] rounded-lg cursor-pointer text-[#9ab0bc] hover:text-[#39576d] border-0 bg-transparent"
          >
            <X size={16} />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 px-5 py-4">{children}</div>
      </div>
    </div>
  );
}

function FRow({ label, children }) {
  return (
    <div className="mb-3.5">
      <label className="block text-[12px] font-semibold text-[#39576d] mb-1">{label}</label>
      {children}
    </div>
  );
}
const F = 'w-full border border-[#e3edf3] rounded-xl px-3 py-2.5 text-[13px] text-[#102a43] bg-[#f8fafc] focus:outline-none focus:border-[#0f8f83] transition-colors';
const FInput = (props) => <input {...props} className={F} />;
const FSelect = ({ children, ...p }) => <select {...p} className={F}>{children}</select>;

const BtnPrimary = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="flex-1 py-2.5 rounded-xl text-[13px] font-semibold bg-[#0f8f83] hover:bg-[#0a7a70] text-white cursor-pointer border-0"
  >
    {children}
  </button>
);
const BtnSecondary = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="flex-1 py-2.5 rounded-xl text-[13px] font-semibold border border-[#e3edf3] text-[#64788a] hover:bg-[#f0f5f8] cursor-pointer bg-transparent"
  >
    {children}
  </button>
);
const ModalFooter = ({ children }) => (
  <div className="flex gap-2 mt-5 pt-4 border-t border-[#e3edf3]">{children}</div>
);

export default function HRPage() {
  const [tab, setTab]           = useState(0);
  const [search, setSearch]     = useState('');
  const [toast, setToast]       = useState('');
  const [modal, setModal]       = useState(null);
  const [modalData, setModalData] = useState(null);
  const [attPeriod, setAttPeriod] = useState('วันนี้');

  const closeModal = () => { setModal(null); setModalData(null); };
  const done = (msg) => { closeModal(); setToast(msg); };

  const openView   = (u) => { setModalData(u); setModal('viewUser'); };
  const openEdit   = (u) => { setModalData(u); setModal('editUser'); };
  const openDelete = (u) => { setModalData(u); setModal('deleteUser'); };
  const openRole   = (r) => { setModalData(r); setModal('editRole'); };

  const kpis = [
    { label: 'ผู้ใช้ทั้งหมด',  value: USERS.length, sub: `ใช้งานอยู่ ${USERS.filter(u => u.status).length} คน`, icon: Users,     color: '#2563eb' },
    { label: 'ออนไลน์ขณะนี้', value: 5,             sub: 'จากทั้งหมด 8 คน',                                     icon: UserCheck, color: '#059669' },
    { label: 'บทบาทในระบบ',   value: ROLES.length,  sub: 'กำหนดสิทธิ์ครบถ้วน',                                  icon: Shield,    color: '#7c3aed' },
    { label: 'รออนุมัติ',     value: 2,             sub: 'บัญชีผู้ใช้ใหม่',                                      icon: Clock,     color: '#d97706' },
  ];

  const filteredUsers = USERS.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col overflow-hidden bg-[#f0f5f8] px-5 py-4 gap-3">

      {/* Toast */}
      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#102a43] text-white text-sm px-6 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-white/10">
          <span className="font-bold">{toast}</span>
          <button onClick={() => setToast('')} className="bg-transparent border-0 text-white/50 hover:text-white cursor-pointer ml-2"><X size={14} /></button>
        </div>
      )}

      {/* ── Modal: Add User ── */}
      {modal === 'addUser' && (
        <Modal title="เพิ่มผู้ใช้ใหม่" onClose={closeModal}>
          <FRow label="ชื่อ-นามสกุล"><FInput placeholder="เช่น Dr. สมชาย รัตนพงศ์" /></FRow>
          <FRow label="อีเมล"><FInput type="email" placeholder="email@vetcare.com" /></FRow>
          <FRow label="บทบาท">
            <FSelect>
              {ROLES.map(r => <option key={r.name}>{r.name}</option>)}
            </FSelect>
          </FRow>
          <FRow label="แผนก"><FInput placeholder="เช่น Clinical, Management" /></FRow>
          <FRow label="รหัสผ่านชั่วคราว"><FInput type="password" placeholder="อย่างน้อย 8 ตัวอักษร" /></FRow>
          <ModalFooter>
            <BtnSecondary onClick={closeModal}>ยกเลิก</BtnSecondary>
            <BtnPrimary onClick={() => done('เพิ่มผู้ใช้ใหม่สำเร็จ')}>บันทึก</BtnPrimary>
          </ModalFooter>
        </Modal>
      )}

      {/* ── Modal: Export Users ── */}
      {modal === 'exportUsers' && (
        <Modal title="Export ข้อมูลพนักงาน" onClose={closeModal}>
          <p className="text-[13px] text-[#64788a] mb-4">เลือกรูปแบบไฟล์ที่ต้องการส่งออก</p>
          <div className="grid grid-cols-3 gap-3 mb-5">
            {['CSV', 'Excel (.xlsx)', 'PDF'].map(fmt => (
              <button
                key={fmt}
                className="border-2 border-[#e3edf3] rounded-xl py-3 text-[13px] font-semibold text-[#39576d] hover:border-[#0f8f83] hover:bg-[#f0faf8] cursor-pointer transition-colors bg-white"
              >
                {fmt}
              </button>
            ))}
          </div>
          <p className="text-[12px] font-semibold text-[#9ab0bc] mb-2">ข้อมูลที่จะรวมในไฟล์</p>
          <div className="space-y-2 mb-4">
            {['ชื่อ-อีเมล-บทบาท', 'สถานะและแผนก', 'วันเข้างานล่าสุด'].map(item => (
              <label key={item} className="flex items-center gap-2 text-[13px] text-[#39576d] cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-[#0f8f83]" /> {item}
              </label>
            ))}
          </div>
          <ModalFooter>
            <BtnSecondary onClick={closeModal}>ยกเลิก</BtnSecondary>
            <BtnPrimary onClick={() => done('กำลังดาวน์โหลด...')}>ดาวน์โหลด</BtnPrimary>
          </ModalFooter>
        </Modal>
      )}

      {/* ── Modal: View User ── */}
      {modal === 'viewUser' && modalData && (
        <Modal title="ข้อมูลผู้ใช้" onClose={closeModal}>
          <div className="flex items-center gap-4 mb-5 pb-4 border-b border-[#e3edf3]">
            <div
              style={{ background: '#0f8f8322', color: '#0f8f83' }}
              className="w-14 h-14 rounded-full flex items-center justify-center text-[20px] font-bold shrink-0"
            >
              {modalData.av}
            </div>
            <div>
              <div className="text-[16px] font-bold text-[#102a43]">{modalData.name}</div>
              <div className="text-[13px] text-[#9ab0bc]">{modalData.email}</div>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold mt-1 ${modalData.status ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                {modalData.status ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
                {modalData.status ? 'ใช้งาน' : 'ระงับ'}
              </span>
            </div>
          </div>
          <div className="space-y-3">
            {[
              ['บทบาท', modalData.role],
              ['แผนก', modalData.dept],
              ['เข้าใช้งานล่าสุด', modalData.lastLogin],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between items-center">
                <span className="text-[12px] text-[#9ab0bc]">{label}</span>
                <span className="text-[13px] font-semibold text-[#39576d]">{value}</span>
              </div>
            ))}
          </div>
          <ModalFooter>
            <BtnSecondary onClick={closeModal}>ปิด</BtnSecondary>
            <BtnPrimary onClick={() => setModal('editUser')}>
              <span className="flex items-center justify-center gap-1.5"><Edit size={14} /> แก้ไข</span>
            </BtnPrimary>
          </ModalFooter>
        </Modal>
      )}

      {/* ── Modal: Edit User ── */}
      {modal === 'editUser' && modalData && (
        <Modal title="แก้ไขผู้ใช้" onClose={closeModal}>
          <FRow label="ชื่อ-นามสกุล"><FInput defaultValue={modalData.name} /></FRow>
          <FRow label="อีเมล"><FInput type="email" defaultValue={modalData.email} /></FRow>
          <FRow label="บทบาท">
            <FSelect defaultValue={modalData.role}>
              {ROLES.map(r => <option key={r.name}>{r.name}</option>)}
            </FSelect>
          </FRow>
          <FRow label="แผนก"><FInput defaultValue={modalData.dept} /></FRow>
          <FRow label="สถานะ">
            <FSelect defaultValue={modalData.status ? 'active' : 'suspended'}>
              <option value="active">ใช้งาน</option>
              <option value="suspended">ระงับ</option>
            </FSelect>
          </FRow>
          <ModalFooter>
            <BtnSecondary onClick={closeModal}>ยกเลิก</BtnSecondary>
            <BtnPrimary onClick={() => done('บันทึกการแก้ไขสำเร็จ')}>บันทึก</BtnPrimary>
          </ModalFooter>
        </Modal>
      )}

      {/* ── Modal: Delete User ── */}
      {modal === 'deleteUser' && modalData && (
        <Modal title="ยืนยันการลบผู้ใช้" onClose={closeModal} maxWidth="max-w-sm">
          <div className="text-center py-2">
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-3">
              <Trash2 size={24} className="text-red-500" />
            </div>
            <p className="text-[14px] font-semibold text-[#102a43] mb-1">ลบบัญชีผู้ใช้</p>
            <p className="text-[13px] text-[#64788a]">
              คุณต้องการลบ <span className="font-semibold text-[#102a43]">{modalData.name}</span> ออกจากระบบ?
              การดำเนินการนี้ไม่สามารถย้อนกลับได้
            </p>
          </div>
          <ModalFooter>
            <BtnSecondary onClick={closeModal}>ยกเลิก</BtnSecondary>
            <button
              onClick={() => done(`ลบ ${modalData.name} สำเร็จ`)}
              className="flex-1 py-2.5 rounded-xl text-[13px] font-semibold bg-red-500 hover:bg-red-600 text-white cursor-pointer border-0"
            >
              ลบบัญชี
            </button>
          </ModalFooter>
        </Modal>
      )}

      {/* ── Modal: Edit Role ── */}
      {modal === 'editRole' && modalData && (
        <Modal title={`แก้ไข Role: ${modalData.name}`} onClose={closeModal}>
          <FRow label="ชื่อบทบาท"><FInput defaultValue={modalData.name} /></FRow>
          <div className="mb-3.5">
            <label className="block text-[12px] font-semibold text-[#39576d] mb-2">สิทธิ์การเข้าถึง</label>
            <div className="border border-[#e3edf3] rounded-xl p-3 bg-[#f8fafc] space-y-2.5">
              {modalData.perms.map(p => (
                <label key={p} className="flex items-center gap-2 text-[13px] text-[#39576d] cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-[#0f8f83]" /> {p}
                </label>
              ))}
            </div>
          </div>
          <ModalFooter>
            <BtnSecondary onClick={closeModal}>ยกเลิก</BtnSecondary>
            <BtnPrimary onClick={() => done(`บันทึก Role ${modalData.name} สำเร็จ`)}>บันทึก</BtnPrimary>
          </ModalFooter>
        </Modal>
      )}

      {/* Page header */}
      <div className="flex items-start justify-between shrink-0">
        <div>
          <h2 className="text-[20px] font-bold text-[#102a43] m-0 leading-tight">HR & User Management</h2>
          <p className="m-0 mt-0.5 text-[13px] text-[#64788a]">ผู้ใช้และสิทธิ์ · อัปเดตล่าสุด: วันนี้ 11:30 น.</p>
        </div>
        <button
          onClick={() => setModal('addUser')}
          className="flex items-center gap-2 bg-[#0f8f83] hover:bg-[#0a7a70] text-white text-[13px] font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer border-0"
        >
          <Plus size={15} /> เพิ่มผู้ใช้
        </button>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-4 gap-3 shrink-0">
        {kpis.map(({ label, value, sub, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl border border-[#e3edf3] px-4 py-3.5 flex items-center gap-4 shadow-sm">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: color + '18' }}>
              <Icon size={20} style={{ color }} />
            </div>
            <div>
              <div className="text-[22px] font-bold text-[#102a43] leading-none">{value}</div>
              <div className="text-[11px] text-[#64788a] mt-0.5">{label}</div>
              <div className="text-[10px] text-[#9ab0bc] mt-0.5">{sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tab container — flex-1 + min-h-0 so inner overflow-y-auto can scroll */}
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

          {/* Tab 0: Users */}
          {tab === 0 && (
            <>
              <div className="flex gap-3 mb-4">
                <div className="relative flex-1 max-w-[320px]">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ab0bc]" />
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="ค้นหาชื่อ อีเมล หรือบทบาท..."
                    className="w-full pl-9 pr-3 py-2 text-[13px] border border-[#e3edf3] rounded-lg bg-[#f6f9fb] focus:outline-none focus:border-[#0f8f83]"
                  />
                </div>
                <button
                  onClick={() => setModal('exportUsers')}
                  className="flex items-center gap-1.5 px-3 py-2 border border-[#e3edf3] rounded-lg text-[12px] text-[#64788a] hover:bg-[#f0f5f8] cursor-pointer bg-white"
                >
                  <Download size={13} /> Export
                </button>
              </div>

              <table className="w-full text-[13px]">
                <thead>
                  <tr className="text-[11px] text-[#9ab0bc] uppercase tracking-wide border-b border-[#e3edf3]">
                    <th className="text-left pb-2 pl-1 font-semibold">ผู้ใช้</th>
                    <th className="text-left pb-2 font-semibold">บทบาท</th>
                    <th className="text-left pb-2 font-semibold">แผนก</th>
                    <th className="text-left pb-2 font-semibold">สถานะ</th>
                    <th className="text-left pb-2 font-semibold">เข้าใช้งานล่าสุด</th>
                    <th className="pb-2 font-semibold"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u, i) => (
                    <tr key={u.email} className="border-b border-[#f0f5f8] hover:bg-[#f6f9fb] transition-colors">
                      <td className="py-3 pl-1">
                        <div className="flex items-center gap-2.5">
                          <Av ch={u.av} color={avColors[i % avColors.length]} />
                          <div>
                            <div className="font-semibold text-[#102a43] leading-tight">{u.name}</div>
                            <div className="text-[11px] text-[#9ab0bc]">{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-[#39576d]">{u.role}</td>
                      <td className="py-3 text-[#64788a]">{u.dept}</td>
                      <td className="py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${u.status ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                          {u.status ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
                          {u.status ? 'ใช้งาน' : 'ระงับ'}
                        </span>
                      </td>
                      <td className="py-3 text-[#9ab0bc] text-[12px]">{u.lastLogin}</td>
                      <td className="py-3">
                        <div className="flex gap-1 justify-end">
                          <button onClick={() => openView(u)} className="p-1.5 hover:bg-[#e9f7f4] hover:text-[#0f8f83] rounded-lg transition-colors cursor-pointer text-[#9ab0bc] bg-transparent border-0"><Eye size={13} /></button>
                          <button onClick={() => openEdit(u)} className="p-1.5 hover:bg-[#e9f7f4] hover:text-[#0f8f83] rounded-lg transition-colors cursor-pointer text-[#9ab0bc] bg-transparent border-0"><Edit size={13} /></button>
                          <button onClick={() => openDelete(u)} className="p-1.5 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors cursor-pointer text-[#9ab0bc] bg-transparent border-0"><Trash2 size={13} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {/* Tab 1: Roles & Permissions */}
          {tab === 1 && (
            <div className="grid grid-cols-2 gap-3">
              {ROLES.map(role => (
                <div key={role.name} className="border border-[#e3edf3] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: role.color + '18' }}>
                        <Shield size={15} style={{ color: role.color }} />
                      </div>
                      <div>
                        <div className="font-semibold text-[13px] text-[#102a43]">{role.name}</div>
                        <div className="text-[11px] text-[#9ab0bc]">{role.users} ผู้ใช้</div>
                      </div>
                    </div>
                    <button
                      onClick={() => openRole(role)}
                      className="p-1.5 hover:bg-[#f0f5f8] rounded-lg cursor-pointer text-[#9ab0bc] hover:text-[#39576d] bg-transparent border-0"
                    >
                      <MoreHorizontal size={14} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {role.perms.map(p => (
                      <span
                        key={p}
                        className="text-[11px] px-2 py-0.5 rounded-md"
                        style={{ background: role.color + '12', color: role.color }}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Attendance */}
          {tab === 2 && (
            <>
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2">
                  {['วันนี้', 'สัปดาห์นี้', 'เดือนนี้'].map(t => (
                    <button
                      key={t}
                      onClick={() => setAttPeriod(t)}
                      className={`px-3 py-1.5 text-[12px] rounded-lg border cursor-pointer transition-colors ${
                        t === attPeriod
                          ? 'bg-[#0f8f83] text-white border-[#0f8f83]'
                          : 'border-[#e3edf3] text-[#64788a] hover:bg-[#f0f5f8] bg-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <div className="text-[12px] text-[#64788a]">09 มิถุนายน 2567</div>
              </div>
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="text-[11px] text-[#9ab0bc] uppercase tracking-wide border-b border-[#e3edf3]">
                    <th className="text-left pb-2 pl-1 font-semibold">ชื่อ</th>
                    <th className="text-left pb-2 font-semibold">วันที่</th>
                    <th className="text-left pb-2 font-semibold">เช็คอิน</th>
                    <th className="text-left pb-2 font-semibold">เช็คเอาต์</th>
                    <th className="text-left pb-2 font-semibold">ชั่วโมงทำงาน</th>
                    <th className="text-left pb-2 font-semibold">สถานะ</th>
                  </tr>
                </thead>
                <tbody>
                  {ATTENDANCE.map(a => (
                    <tr key={a.name} className="border-b border-[#f0f5f8] hover:bg-[#f6f9fb]">
                      <td className="py-3 pl-1 font-semibold text-[#102a43]">{a.name}</td>
                      <td className="py-3 text-[#64788a]">{a.date}</td>
                      <td className="py-3 text-[#39576d] font-mono">{a.checkIn}</td>
                      <td className="py-3 text-[#39576d] font-mono">{a.checkOut}</td>
                      <td className="py-3 text-[#39576d] font-mono">{a.hours}</td>
                      <td className="py-3">
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${ATT_COLOR[a.status] ?? 'bg-slate-50 text-slate-500'}`}>
                          {a.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {/* Tab 3: Audit Log */}
          {tab === 3 && (
            <>
              <div className="flex gap-2 mb-4">
                {['ทั้งหมด', 'LOGIN', 'CREATE', 'UPDATE', 'DELETE'].map(f => (
                  <button
                    key={f}
                    className={`px-3 py-1.5 text-[12px] rounded-lg border cursor-pointer transition-colors ${
                      f === 'ทั้งหมด'
                        ? 'bg-[#0f8f83] text-white border-[#0f8f83]'
                        : 'border-[#e3edf3] text-[#64788a] hover:bg-[#f0f5f8] bg-white'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="text-[11px] text-[#9ab0bc] uppercase tracking-wide border-b border-[#e3edf3]">
                    <th className="text-left pb-2 pl-1 font-semibold">เวลา</th>
                    <th className="text-left pb-2 font-semibold">ผู้ใช้</th>
                    <th className="text-left pb-2 font-semibold">การดำเนินการ</th>
                    <th className="text-left pb-2 font-semibold">รายละเอียด</th>
                    <th className="text-left pb-2 font-semibold">IP Address</th>
                  </tr>
                </thead>
                <tbody>
                  {AUDIT.map((a, i) => {
                    const ac = AUDIT_COLOR[a.action] ?? { bg: 'bg-slate-50', text: 'text-slate-600' };
                    return (
                      <tr key={i} className="border-b border-[#f0f5f8] hover:bg-[#f6f9fb]">
                        <td className="py-3 pl-1 font-mono text-[12px] text-[#9ab0bc]">{a.time}</td>
                        <td className="py-3 font-semibold text-[#102a43]">{a.user}</td>
                        <td className="py-3">
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${ac.bg} ${ac.text}`}>{a.action}</span>
                        </td>
                        <td className="py-3 text-[#64788a] max-w-[280px] truncate">{a.detail}</td>
                        <td className="py-3 font-mono text-[12px] text-[#9ab0bc]">{a.ip}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}

          {/* Tab 4: Activity Log */}
          {tab === 4 && (
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-[11px] text-[#9ab0bc] uppercase tracking-wide border-b border-[#e3edf3]">
                  <th className="text-left pb-2 pl-1 font-semibold">เวลา</th>
                  <th className="text-left pb-2 font-semibold">ผู้ใช้</th>
                  <th className="text-left pb-2 font-semibold">หน้า / โมดูล</th>
                  <th className="text-left pb-2 font-semibold">การดำเนินการ</th>
                </tr>
              </thead>
              <tbody>
                {ACTIVITY.map((a, i) => (
                  <tr key={i} className="border-b border-[#f0f5f8] hover:bg-[#f6f9fb]">
                    <td className="py-3 pl-1 font-mono text-[12px] text-[#9ab0bc]">{a.time}</td>
                    <td className="py-3 font-semibold text-[#102a43]">{a.user}</td>
                    <td className="py-3 text-[#39576d]">{a.page}</td>
                    <td className="py-3">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                        a.action === 'CREATE'   ? 'bg-green-50 text-green-700'   :
                        a.action === 'UPDATE'   ? 'bg-amber-50 text-amber-700'   :
                        a.action === 'DISPENSE' ? 'bg-purple-50 text-purple-700' :
                        'bg-slate-50 text-slate-500'
                      }`}>{a.action}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

        </div>
      </div>
    </div>
  );
}
