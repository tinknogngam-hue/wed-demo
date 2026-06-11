// src/pages/register.js
import { useState } from 'react';
import { Search, User, PawPrint, X, Printer, Stethoscope, ChevronRight } from 'lucide-react';

const QUEUE_TYPES = [
  { key: 'OPD',  label: 'OPD',       prefix: 'A', bg: 'bg-[#2563eb]', light: 'bg-[#eff6ff] text-[#2563eb] border-[#bfdbfe]', serving: 9,  next: 12, wait: 25 },
  { key: 'VAC',  label: 'Vaccine',   prefix: 'B', bg: 'bg-[#0f8f83]', light: 'bg-[#e6f7f3] text-[#0f8f83] border-[#99d6cf]', serving: 2,  next: 4,  wait: 10 },
  { key: 'EMRG', label: 'Emergency', prefix: 'C', bg: 'bg-[#dc2626]', light: 'bg-[#fef2f2] text-[#dc2626] border-[#fca5a5]', serving: 1,  next: 2,  wait: 5  },
];

const F = "w-full border border-[#e3edf3] rounded-xl px-3 py-2.5 text-[13px] text-[#102a43] outline-none focus:border-[#2563eb] transition-colors bg-white";

function Field({ label, required, span = 1, children }) {
  return (
    <div style={{ gridColumn: `span ${span}` }} className="flex flex-col gap-1">
      <label className="text-[12px] font-bold text-[#39576d]">
        {label}{required && <span className="text-[#dc2626] ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

function SectionHeading({ icon, color, title, subtitle, badge }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className={`w-8 h-8 rounded-xl grid place-items-center shrink-0 ${color}`}>{icon}</div>
      <div>
        <div className="text-[15px] font-black text-[#102a43]">{title}</div>
        <div className="text-[11px] text-[#9ab0bc]">{subtitle}</div>
      </div>
      {badge && <span className="ml-auto text-[11px] font-bold text-[#2563eb] bg-[#eff6ff] px-2 py-0.5 rounded-full">{badge}</span>}
    </div>
  );
}

export default function RegisterPage() {
  const [toast, setToast] = useState('');
  const [qType, setQType] = useState('OPD');

  const qt = QUEUE_TYPES.find(t => t.key === qType);
  const nextNum    = `${qt.prefix}${String(qt.next).padStart(3, '0')}`;
  const servingNum = `${qt.prefix}${String(qt.serving).padStart(3, '0')}`;

  return (
    <div className="h-full flex flex-col overflow-hidden bg-[#f6f9fb]">
      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#102a43] text-white text-sm px-6 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 border border-white/10">
          <span className="font-bold">{toast}</span>
          <button onClick={() => setToast('')} className="bg-transparent border-0 text-white/50 hover:text-white cursor-pointer ml-2"><X size={14} /></button>
        </div>
      )}

      {/* ── Header ── */}
      <div className="shrink-0 px-6 pt-4 pb-4 flex items-center justify-between gap-4 bg-white border-b border-[#e8f0f5]">
        <div>
          <h2 className="m-0 text-[20px] font-black text-[#102a43]">Register / Walk-in Intake</h2>
          <p className="m-0 mt-0.5 text-[12px] text-[#64788a]">ลงทะเบียนลูกค้า ออกคิว และเปิด Visit ใหม่</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-[#f8fafc] border border-[#e3edf3] rounded-xl px-4 py-2 text-[#9ab0bc] text-[12px] w-[260px]">
            <Search size={13} /> ค้นหาลูกค้า / สัตว์เลี้ยง / Microchip...
          </div>
          <button onClick={() => setToast('กำลังสแกนไมโครชิพ...')} className="px-3.5 py-2 border border-[#e3edf3] rounded-xl text-[12px] font-semibold text-[#39576d] bg-white hover:bg-[#f8fafc] cursor-pointer">Scan Microchip</button>
          <button onClick={() => setToast('กำลังค้นหาข้อมูลลูกค้า...')} className="px-3.5 py-2 border border-[#e3edf3] rounded-xl text-[12px] font-semibold text-[#39576d] bg-white hover:bg-[#f8fafc] cursor-pointer">Search Client</button>
          <button onClick={() => setToast('เปิดฟอร์ม Walk-in ด่วน...')} className="px-3.5 py-2 rounded-xl text-[12px] font-bold text-white bg-[#0f8f83] hover:bg-[#0a7268] cursor-pointer border-0 shadow-sm">Quick Walk-in</button>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex-1 min-h-0 overflow-hidden grid grid-cols-1 xl:grid-cols-[1fr_360px]">

        {/* ── Left: Form ── */}
        <div className="flex flex-col overflow-hidden border-r border-[#e8f0f5]">
          <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-0">

            {/* Section 1 — Client */}
            <div className="mb-7">
              <SectionHeading
                icon={<User size={16} />}
                color="bg-[#eff6ff] text-[#2563eb]"
                title="Client Information"
                subtitle="ข้อมูลเจ้าของสัตว์เลี้ยง"
                badge="New Client"
              />
              <div className="grid grid-cols-12 gap-3">
                <Field label="Prefix" span={2}>
                  <select className={F}>{['คุณ','นาย','นาง','นางสาว','ดร.','อื่นๆ'].map(o=><option key={o}>{o}</option>)}</select>
                </Field>
                <Field label="First Name" required span={4}>
                  <input className={F} placeholder="ชื่อจริง" />
                </Field>
                <Field label="Last Name" required span={4}>
                  <input className={F} placeholder="นามสกุล" />
                </Field>
                <Field label="Nickname" span={2}>
                  <input className={F} placeholder="ชื่อเล่น" />
                </Field>

                <Field label="Phone (Primary)" required span={4}>
                  <input className={F} type="tel" placeholder="08X-XXX-XXXX" />
                </Field>
                <Field label="Phone (Secondary)" span={4}>
                  <input className={F} type="tel" placeholder="08X-XXX-XXXX" />
                </Field>
                <Field label="Line ID" span={4}>
                  <input className={F} placeholder="@line_id" />
                </Field>

                <Field label="Email" span={6}>
                  <input className={F} type="email" placeholder="email@example.com" />
                </Field>
                <Field label="ID Card / Passport No." span={6}>
                  <input className={F} placeholder="1-XXXX-XXXXX-XX-X" />
                </Field>

                <Field label="Address (บ้านเลขที่ / หมู่บ้าน / ถนน)" span={12}>
                  <input className={F} placeholder="บ้านเลขที่, หมู่, ซอย, ถนน..." />
                </Field>
                <Field label="Sub-district (ตำบล/แขวง)" span={3}>
                  <input className={F} placeholder="ตำบล/แขวง" />
                </Field>
                <Field label="District (อำเภอ/เขต)" span={3}>
                  <input className={F} placeholder="อำเภอ/เขต" />
                </Field>
                <Field label="Province (จังหวัด)" span={3}>
                  <input className={F} placeholder="จังหวัด" />
                </Field>
                <Field label="Postal Code" span={3}>
                  <input className={F} placeholder="XXXXX" maxLength={5} />
                </Field>

                <Field label="How did you find us?" span={6}>
                  <select className={F}>{['— เลือก —','Google / Online Search','Facebook / Social Media','แนะนำจากเพื่อน / ครอบครัว','เดินผ่าน / ป้าย','อื่นๆ'].map(o=><option key={o}>{o}</option>)}</select>
                </Field>
                <Field label="Client Type" span={6}>
                  <select className={F}>{['New Client','Existing Client','VIP','Staff / Staff Pet'].map(o=><option key={o}>{o}</option>)}</select>
                </Field>
              </div>
            </div>

            {/* Section 2 — Patient */}
            <div className="mb-7 pt-6 border-t border-[#f0f5f8]">
              <SectionHeading
                icon={<PawPrint size={16} />}
                color="bg-[#e6f7f3] text-[#0f8f83]"
                title="Patient / Pet Information"
                subtitle="ข้อมูลสัตว์เลี้ยง"
              />
              <div className="grid grid-cols-12 gap-3">
                <Field label="Pet Name" required span={4}>
                  <input className={F} placeholder="ชื่อสัตว์เลี้ยง" />
                </Field>
                <Field label="Species" span={4}>
                  <select className={F}>{['Dog','Cat','Rabbit','Bird','Hamster / Rodent','Reptile / Exotic','Other'].map(o=><option key={o}>{o}</option>)}</select>
                </Field>
                <Field label="Breed (สายพันธุ์)" span={4}>
                  <input className={F} placeholder="เช่น Golden Retriever" />
                </Field>

                <Field label="Color / Markings (สี)" span={3}>
                  <input className={F} placeholder="สี / ลักษณะเด่น" />
                </Field>
                <Field label="Sex (เพศ)" span={3}>
                  <select className={F}>{['Male','Female','Unknown'].map(o=><option key={o}>{o}</option>)}</select>
                </Field>
                <Field label="Neutered Status" span={3}>
                  <select className={F}>{['Intact (ไม่ทำหมัน)','Neutered / Spayed (ทำหมัน)','Unknown'].map(o=><option key={o}>{o}</option>)}</select>
                </Field>
                <Field label="Blood Type" span={3}>
                  <select className={F}>{['Unknown','DEA 1.1 (+)','DEA 1.1 (−)','Type A','Type B','Type AB'].map(o=><option key={o}>{o}</option>)}</select>
                </Field>

                <Field label="Date of Birth (วันเกิด)" span={3}>
                  <input className={F} type="date" />
                </Field>
                <Field label="Age (approx.)" span={3}>
                  <input className={F} placeholder="เช่น 3 ปี / 8 เดือน" />
                </Field>
                <Field label="Weight (kg)" span={3}>
                  <input className={`${F} font-bold`} type="number" step="0.01" placeholder="0.00" />
                </Field>
                <Field label="Microchip No." span={3}>
                  <input className={F} placeholder="รหัส 15 หลัก" maxLength={15} />
                </Field>

                <Field label="Vaccine Book / Pet Passport No." span={6}>
                  <input className={F} placeholder="หมายเลขสมุดวัคซีน / Pet Passport" />
                </Field>
                <Field label="Insurance / Policy No." span={6}>
                  <input className={F} placeholder="หมายเลขกรมธรรม์ (ถ้ามี)" />
                </Field>

                <Field label="Known Allergies / Medical History (ประวัติการแพ้ / โรคประจำตัว)" span={12}>
                  <textarea className={`${F} resize-none h-16`} placeholder="ระบุประวัติการแพ้ยา อาหาร หรือโรคประจำตัวที่ทราบ..." />
                </Field>
                <Field label="Current Medications (ยาที่ใช้อยู่)" span={12}>
                  <input className={F} placeholder="ชื่อยา / ขนาดยา / ความถี่ (ถ้ามี)" />
                </Field>
              </div>
            </div>

            {/* Section 3 — Visit */}
            <div className="pt-6 border-t border-[#f0f5f8]">
              <SectionHeading
                icon={<Stethoscope size={16} />}
                color="bg-[#fef3c7] text-[#b45309]"
                title="Visit Information"
                subtitle="ข้อมูลการมาพบแพทย์"
              />
              <div className="grid grid-cols-12 gap-3">
                <Field label="Visit Type (ประเภทการมาพบ)" span={4}>
                  <select className={F}>{['OPD (ทั่วไป)','Vaccination (วัคซีน)','Health Check / Annual Screen','Surgery / Procedure','Emergency (ฉุกเฉิน)','Follow-up (ติดตามผล)','Grooming'].map(o=><option key={o}>{o}</option>)}</select>
                </Field>
                <Field label="Priority Level" span={4}>
                  <select className={F}>{['Normal','Urgent (เร่งด่วน)','Emergency (ฉุกเฉิน)'].map(o=><option key={o}>{o}</option>)}</select>
                </Field>
                <Field label="Preferred Doctor" span={4}>
                  <select className={F}>{['Any Available','Dr. Natthapon','Dr. Siriporn','Dr. Wanchai','Dr. Priya'].map(o=><option key={o}>{o}</option>)}</select>
                </Field>

                <Field label="Chief Complaint / Reason for Visit (อาการนำ)" required span={12}>
                  <textarea className={`${F} resize-none h-20`} placeholder="อธิบายอาการหลักหรือเหตุผลที่นำสัตว์เลี้ยงมาพบแพทย์..." />
                </Field>

                <Field label="Referred From (ส่งต่อจาก)" span={6}>
                  <input className={F} placeholder="ชื่อคลินิก / โรงพยาบาลที่ส่งตัวมา (ถ้ามี)" />
                </Field>
                <Field label="Arrival / Appointment Time" span={3}>
                  <input className={F} type="time" />
                </Field>
                <Field label="Room / Station" span={3}>
                  <select className={F}>{['Auto-assign','Room 1','Room 2','Room 3','Room 4 (Isolation)','Surgery Suite'].map(o=><option key={o}>{o}</option>)}</select>
                </Field>

                <Field label="Staff Notes (บันทึกสำหรับทีมงาน)" span={12}>
                  <input className={F} placeholder="หมายเหตุเพิ่มเติม เช่น ผู้ป่วยกลัวหมา / ต้องใช้ห้องแยก..." />
                </Field>
              </div>
            </div>

          </div>

          {/* ── Action Bar ── */}
          <div className="shrink-0 flex items-center justify-between px-6 py-3.5 border-t border-[#e8f0f5] bg-[#fbfdfe]">
            <div className="flex items-center gap-5">
              <label className="flex items-center gap-2 cursor-pointer text-[12px] font-semibold text-[#39576d]">
                <input type="checkbox" className="w-4 h-4 accent-[#2563eb]" defaultChecked /> Save to system
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-[12px] font-semibold text-[#39576d]">
                <input type="checkbox" className="w-4 h-4 accent-[#2563eb]" /> Print consent form
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-[12px] font-semibold text-[#39576d]">
                <input type="checkbox" className="w-4 h-4 accent-[#2563eb]" defaultChecked /> Auto-assign queue
              </label>
            </div>
            <button
              onClick={() => setToast(`สร้างคิว ${nextNum} และเปิด EMR เรียบร้อยแล้ว`)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-black text-white bg-[#0f8f83] hover:bg-[#0a7268] cursor-pointer border-0 shadow-md transition-colors"
            >
              Create Queue & Open EMR <ChevronRight size={15} />
            </button>
          </div>
        </div>

        {/* ── Right: Sidebar ── */}
        <aside className="flex flex-col overflow-y-auto bg-white">

          {/* Today Stats */}
          <div className="px-5 pt-5 pb-4 border-b border-[#f0f5f8]">
            <div className="text-[11px] font-black text-[#9ab0bc] uppercase tracking-widest mb-3">Today&apos;s Status</div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Waiting',     value: 12, color: 'text-[#2563eb]', bg: 'bg-[#eff6ff]'  },
                { label: 'In Progress', value: 4,  color: 'text-[#0f8f83]', bg: 'bg-[#e6f7f3]'  },
                { label: 'Completed',   value: 38, color: 'text-[#15803d]', bg: 'bg-[#dcfce7]'  },
                { label: 'Emergency',   value: 1,  color: 'text-[#dc2626]', bg: 'bg-[#fee2e2]'  },
              ].map(s => (
                <div key={s.label} className={`${s.bg} rounded-xl p-3 text-center`}>
                  <div className={`text-[22px] font-black leading-none ${s.color}`}>{s.value}</div>
                  <div className="text-[10px] font-bold text-[#64788a] mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Queue Ticket */}
          <div className="px-5 py-4 border-b border-[#f0f5f8]">
            <div className="text-[11px] font-black text-[#9ab0bc] uppercase tracking-widest mb-3">Queue Ticket</div>

            {/* Type Tabs */}
            <div className="flex gap-1.5 mb-4 p-1 bg-[#f0f5f8] rounded-xl">
              {QUEUE_TYPES.map(t => (
                <button
                  key={t.key}
                  onClick={() => setQType(t.key)}
                  className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer border-0 transition-all ${
                    qType === t.key ? `${t.bg} text-white shadow-sm` : 'bg-transparent text-[#64788a] hover:bg-white'
                  }`}
                >
                  {t.prefix} — {t.label}
                </button>
              ))}
            </div>

            {/* Ticket Card */}
            <div className="border border-[#e3edf3] rounded-2xl overflow-hidden relative">
              {/* Left notch */}
              <div className="absolute -left-px top-1/2 -translate-y-1/2 w-4 h-8 bg-[#f6f9fb] rounded-r-full border-r border-[#e3edf3] z-10" />
              {/* Right notch */}
              <div className="absolute -right-px top-1/2 -translate-y-1/2 w-4 h-8 bg-[#f6f9fb] rounded-l-full border-l border-[#e3edf3] z-10" />

              {/* Header bar */}
              <div className={`${qt.bg} px-5 py-2.5 flex items-center justify-between`}>
                <span className="text-white text-[10px] font-bold tracking-wider opacity-90">PET CENTRAL VETERINARY</span>
                <span className="text-white text-[10px] opacity-70">{new Date().toLocaleDateString('th-TH', { day:'2-digit', month:'2-digit', year:'numeric' })}</span>
              </div>

              {/* Number */}
              <div className="bg-white px-5 pt-5 pb-4 text-center">
                <div className="text-[10px] font-bold text-[#9ab0bc] uppercase tracking-widest mb-1">Queue Number</div>
                <div className="text-[72px] font-[950] leading-none text-[#102a43] tracking-tight">{nextNum}</div>
                <div className={`inline-flex items-center gap-1.5 mt-2.5 px-3 py-1 rounded-full text-[11px] font-bold border ${qt.light}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />{qt.label}
                </div>
              </div>

              {/* Perforation line */}
              <div className="mx-4 border-t-2 border-dashed border-[#e3edf3]" />

              {/* Footer stats */}
              <div className="bg-[#f8fafc] grid grid-cols-3 divide-x divide-[#e3edf3]">
                <div className="py-3 text-center">
                  <div className="text-[9px] text-[#9ab0bc] font-bold uppercase">Now Serving</div>
                  <div className="text-[17px] font-black text-[#102a43] mt-0.5">{servingNum}</div>
                </div>
                <div className="py-3 text-center">
                  <div className="text-[9px] text-[#9ab0bc] font-bold uppercase">Your Position</div>
                  <div className="text-[17px] font-black text-[#102a43] mt-0.5">#{qt.next - qt.serving}</div>
                </div>
                <div className="py-3 text-center">
                  <div className="text-[9px] text-[#9ab0bc] font-bold uppercase">Est. Wait</div>
                  <div className="text-[17px] font-black text-[#102a43] mt-0.5">~{qt.wait}m</div>
                </div>
              </div>
            </div>

            {/* Print Button */}
            <button
              onClick={() => setToast(`พิมพ์บัตรคิว ${nextNum} เรียบร้อย`)}
              className="w-full mt-3 flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-dashed border-[#c4d6e0] text-[12px] font-bold text-[#64788a] hover:border-[#0f8f83] hover:text-[#0f8f83] hover:bg-[#e6f7f3] transition-all cursor-pointer bg-transparent"
            >
              <Printer size={13} /> Print Ticket ({nextNum})
            </button>
          </div>

          {/* Recently Registered */}
          <div className="px-5 py-4 flex-1">
            <div className="text-[11px] font-black text-[#9ab0bc] uppercase tracking-widest mb-3">Recently Registered</div>
            {[
              { queue: 'A011', pet: 'มะม่วง', species: 'Dog',  owner: 'คุณสมหมาย ดีงาม', time: '10:32' },
              { queue: 'B003', pet: 'เหมียว',  species: 'Cat',  owner: 'คุณนภา รักสัตว์',  time: '10:18' },
              { queue: 'A010', pet: 'หมีพู',   species: 'Dog',  owner: 'คุณวีระ ใจดี',     time: '10:05' },
              { queue: 'C001', pet: 'ไข่มุก',  species: 'Cat',  owner: 'คุณปรียา สวย',    time: '09:58' },
            ].map(r => (
              <div key={r.queue} className="flex items-center gap-3 py-2.5 border-b border-[#f8fbfc] last:border-0">
                <div className="w-9 h-9 rounded-lg bg-[#f0f5f8] flex items-center justify-center shrink-0 text-[11px] font-black text-[#102a43]">{r.queue}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-bold text-[#102a43]">{r.pet} <span className="text-[#9ab0bc] font-normal text-[11px]">· {r.species}</span></div>
                  <div className="text-[11px] text-[#9ab0bc] truncate">{r.owner}</div>
                </div>
                <div className="text-[11px] text-[#9ab0bc] shrink-0 font-medium">{r.time}</div>
              </div>
            ))}
          </div>

        </aside>
      </div>
    </div>
  );
}
