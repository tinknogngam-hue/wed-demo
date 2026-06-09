import { useState } from 'react';
import Link from 'next/link';
import {
  Pencil, Plus, Star, Phone, Mail, MessageSquare,
  MapPin, Clock, Bell, ChevronRight, MoreVertical,
  CalendarDays, FileText, PawPrint, User, Dog, Cat,
} from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

const client = {
  name: 'คุณณัฐิดา วงศ์สวัสดิ์',
  status: 'Active',
  clientId: 'CLI-000125',
  phone: '098-123-4567',
  email: 'nattida.w@example.com',
  lineId: 'nattida_w',
  dob: '14 ก.พ. 2536',
  preferredContact: 'LINE',
  note: 'ลูกค้าประจำ • นิสัยนารัก อัธยาศัยดี',
};

const summary = [
  { label: 'Total Pets',    value: '3'        },
  { label: 'Total Visits',  value: '18'       },
  { label: 'Total Invoice', value: '฿24,850'  },
  { label: 'Outstanding',   value: '฿2,150',  red: true },
  { label: 'Last Visit',    value: '20 พ.ค. 2567' },
];

const tags = [
  { icon: Star,          label: 'ลูกค้าประจำ'    },
  { icon: CalendarDays,  label: 'Vaccination plan' },
  { icon: PawPrint,      label: 'Sensitive Skin'   },
];

const contactPref = [
  { label: 'ส่งการแจ้งเตือน',   value: 'LINE'          },
  { label: 'นัดหมายล่วงหน้า',   value: '1 วัน'         },
  { label: 'ช่วงเวลาที่สะดวก',  value: '10:00 - 18:00' },
];

const pets = [
  {
    name: 'Lucky', gender: 'M', id: 'PET-000321',
    species: 'Dog', breed: 'Golden Retriever',
    sex: 'Male', sterilized: 'ทำหมันแล้ว',
    dob: '12 พ.ค. 2562', age: '5 ปี 0 เดือน',
    microchip: '900215000123456',
    lastVisit: '20 พ.ค. 2567', lastType: 'OPD',
    dog: true,
  },
  {
    name: 'Mochi', gender: 'F', id: 'PET-000322',
    species: 'Cat', breed: 'Scottish Fold',
    sex: 'Female', sterilized: 'ยังไม่ทำหมัน',
    dob: '3 ส.ค. 2563', age: '3 ปี 9 เดือน',
    microchip: '900215000234567',
    lastVisit: '15 พ.ค. 2567', lastType: 'Vaccine',
    dog: false,
  },
  {
    name: 'Choco', gender: 'M', id: 'PET-000323',
    species: 'Dog', breed: 'French Bulldog',
    sex: 'Male', sterilized: 'ทำหมันแล้ว',
    dob: '18 ธ.ค. 2564', age: '2 ปี 5 เดือน',
    microchip: '900215000345678',
    lastVisit: '10 พ.ค. 2567', lastType: 'Check up',
    dog: true,
  },
];

const TABS = ['Pets','Visits','Invoices','Documents','Reminders','Communication History'];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ClientDetailPage() {
  const [tab, setTab] = useState('Pets');

  return (
    <div className="overflow-y-auto h-full bg-[#f8fafc] p-5 flex flex-col gap-4">

      {/* Page title */}
      <h1 className="text-[22px] font-black text-[#102a43] m-0 leading-none shrink-0">
        {client.name}
      </h1>

      {/* Top info card */}
      <div className="bg-white border border-[#e3edf3] rounded-xl p-5 shadow-sm shrink-0">
        <div className="flex gap-5">

          {/* Photo + basic info */}
          <div className="flex gap-4 flex-1 min-w-0">
            <div className="w-[96px] h-[96px] rounded-full bg-[#dbeafe] flex items-center justify-center shrink-0 border-4 border-[#e3edf3]">
              <User size={48} className="text-[#2563eb]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[17px] font-black text-[#102a43]">{client.name}</span>
                <span className="px-2 py-0.5 bg-[#dcfce7] text-[#15803d] text-[11px] font-bold rounded-full">{client.status}</span>
                <Star size={14} className="text-[#9ab0bc] cursor-pointer hover:text-[#f59e0b] transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-1.5">
                {[
                  ['Client ID',         client.clientId],
                  ['Phone',             client.phone],
                  ['Email',             client.email],
                  ['Line ID',           client.lineId],
                  ['Date of Birth',     client.dob],
                  ['Preferred Contact', client.preferredContact],
                ].map(([lbl, val]) => (
                  <div key={lbl} className="flex items-center gap-2">
                    <span className="text-[12px] text-[#9ab0bc] w-[110px] shrink-0">{lbl}</span>
                    <span className={`text-[12px] font-semibold ${lbl === 'Email' ? 'text-[#2563eb]' : 'text-[#102a43]'}`}>{val}</span>
                  </div>
                ))}
                <div className="col-span-2 flex items-center gap-2">
                  <span className="text-[12px] text-[#9ab0bc] w-[110px] shrink-0">Note</span>
                  <span className="text-[12px] text-[#39576d]">{client.note}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px bg-[#f0f5f8] self-stretch shrink-0" />

          {/* Summary */}
          <div className="w-[190px] shrink-0">
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

          {/* Divider */}
          <div className="w-px bg-[#f0f5f8] self-stretch shrink-0" />

          {/* Tags + Actions */}
          <div className="w-[160px] shrink-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#e3edf3] rounded-lg text-[12px] font-semibold text-[#39576d] hover:border-[#2563eb] hover:text-[#2563eb] transition-colors cursor-pointer bg-white">
                  <Pencil size={12} /> Edit
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2563eb] rounded-lg text-[12px] font-semibold text-white hover:bg-[#1d4ed8] transition-colors cursor-pointer">
                  <Plus size={12} /> New Visit
                </button>
              </div>
            </div>
            <div className="text-[11px] font-bold text-[#9ab0bc] uppercase tracking-wider mb-1.5">Tags</div>
            <div className="flex flex-col gap-1">
              {tags.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 px-2 py-1 bg-[#f8fafc] border border-[#e3edf3] rounded-lg">
                  <Icon size={12} className="text-[#64788a] shrink-0" />
                  <span className="text-[11px] text-[#39576d] font-medium truncate">{label}</span>
                </div>
              ))}
              <button className="flex items-center gap-1.5 px-2 py-1 text-[11px] text-[#9ab0bc] hover:text-[#2563eb] transition-colors cursor-pointer">
                <Plus size={12} /> Add Tag
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Address | Contact Preference | Remark */}
      <div className="grid grid-cols-3 gap-4 shrink-0">

        {/* Address */}
        <div className="bg-white border border-[#e3edf3] rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-[#2563eb]" />
              <span className="text-[13px] font-black text-[#102a43]">Address</span>
            </div>
          </div>
          <div className="text-[12px] text-[#39576d] leading-relaxed">
            99/123 หมู่บ้านปิ่นเกล้า ซอย 5<br />
            ถ.บรมราชชนนี แขวงอรุณอมรินทร์<br />
            เขตบางกอกน้อย กรุงเทพฯ 10700
          </div>
          <button className="mt-3 flex items-center gap-1 text-[11px] text-[#2563eb] font-bold cursor-pointer hover:underline">
            <Pencil size={11} /> Edit
          </button>
        </div>

        {/* Contact Preference */}
        <div className="bg-white border border-[#e3edf3] rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Bell size={14} className="text-[#2563eb]" />
              <span className="text-[13px] font-black text-[#102a43]">Contact Preference</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {contactPref.map((c) => (
              <div key={c.label} className="flex items-center gap-2">
                <span className="text-[11px] text-[#9ab0bc] w-[110px] shrink-0">{c.label}</span>
                <span className="text-[12px] font-semibold text-[#102a43]">{c.value}</span>
              </div>
            ))}
          </div>
          <button className="mt-3 flex items-center gap-1 text-[11px] text-[#2563eb] font-bold cursor-pointer hover:underline">
            <Pencil size={11} /> Edit
          </button>
        </div>

        {/* Remark */}
        <div className="bg-white border border-[#e3edf3] rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MessageSquare size={14} className="text-[#2563eb]" />
              <span className="text-[13px] font-black text-[#102a43]">Remark</span>
            </div>
          </div>
          <div className="text-[12px] text-[#39576d] leading-relaxed">แพ้อาหารประเภทไก่</div>
          <button className="mt-3 flex items-center gap-1 text-[11px] text-[#2563eb] font-bold cursor-pointer hover:underline">
            <Pencil size={11} /> Edit
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center border-b border-[#e3edf3] shrink-0 bg-white rounded-t-xl px-2 -mb-1">
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
        <div className="bg-white border border-[#e3edf3] rounded-xl shadow-sm overflow-hidden shrink-0">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#f0f5f8]">
            <span className="text-[13px] font-black text-[#102a43]">Pets ({pets.length})</span>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2563eb] rounded-lg text-[12px] font-semibold text-white hover:bg-[#1d4ed8] transition-colors cursor-pointer">
              <Plus size={13} /> Add New Pet
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#f0f5f8]">
                {['Name','Species / Breed','Sex','Birth Date / Age','Microchip','Last Visit','Action'].map((h, i) => (
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
                  <td className="px-5 py-3 text-[12px] text-[#64788a] font-mono text-[11px]">{p.microchip}</td>
                  <td className="px-5 py-3">
                    <div className="text-[12px] text-[#39576d]">{p.lastVisit}</div>
                    <div className="text-[10px] text-[#9ab0bc]">{p.lastType}</div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <Link href="/patients">
                        <FileText size={15} className="text-[#9ab0bc] hover:text-[#2563eb] cursor-pointer transition-colors" />
                      </Link>
                      <CalendarDays size={15} className="text-[#9ab0bc] hover:text-[#2563eb] cursor-pointer transition-colors" />
                      <MoreVertical size={15} className="text-[#9ab0bc] hover:text-[#2563eb] cursor-pointer transition-colors" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Other tabs placeholder */}
      {tab !== 'Pets' && (
        <div className="bg-white border border-[#e3edf3] rounded-xl p-10 flex flex-col items-center justify-center text-center shrink-0">
          <FileText size={32} className="text-[#c4d6e0] mb-3" />
          <div className="text-[14px] font-bold text-[#64788a]">{tab}</div>
          <div className="text-[12px] text-[#9ab0bc] mt-1">No records found</div>
        </div>
      )}
    </div>
  );
}
