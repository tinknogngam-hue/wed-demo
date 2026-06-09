import {
  Receipt, Users, BedDouble, FlaskConical, CreditCard,
  CalendarDays, ChevronRight, Bell, BarChart2,
  Package, MessageSquare, UserPlus, FileText,
  Clock, AlertTriangle, Megaphone, Pencil, HelpCircle,
  Dog, Cat,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// ─── Data ────────────────────────────────────────────────────────────────────

const kpiCards = [
  { icon: Receipt,     bg: 'from-[#0ea5e9] to-[#0284c7]', value: '฿125,430', label: 'รายได้วันนี้',       sub: '↑ 12.5% เทียบกับเมื่อวาน', subCls: 'text-[#16a34a]'  },
  { icon: Users,       bg: 'from-[#22c55e] to-[#16a34a]', value: '64',        label: 'OPD วันนี้',         sub: '↑ 8 เคส',                   subCls: 'text-[#16a34a]'  },
  { icon: BedDouble,   bg: 'from-[#3b82f6] to-[#1d4ed8]', value: '18',        label: 'IPD ที่นอนอยู่',     sub: 'จากทั้งหมด 24 เตียง',       subCls: 'text-[#64788a]'  },
  { icon: FlaskConical,bg: 'from-[#f97316] to-[#c2410c]', value: '27',        label: 'Lab รอดำเนินการ',    sub: 'ครบกำหนดใน 24 ชม.',         subCls: 'text-[#f97316]'  },
  { icon: CreditCard,  bg: 'from-[#0f8f83] to-[#0b7268]', value: '฿45,780',  label: 'ค้างชำระ',           sub: 'ลูกหนี้ 32 ราย',            subCls: 'text-[#64788a]'  },
];

const todayAppts = [
  { time: '09:00', owner: 'คุณสมชาย ใจดี',      pet: 'มะลิ',    info: 'สุนัข, Golden Retriever',  tag: 'Vaccine',     tagCls: 'bg-[#dcfce7] text-[#15803d]', dog: true  },
  { time: '10:00', owner: 'คุณวิภาว์ ศรีสุข',    pet: 'ทุงเงิน', info: 'แมว, Persian',              tag: 'ตรวจทั่วไป', tagCls: 'bg-[#dbeafe] text-[#1d4ed8]', dog: false },
  { time: '11:00', owner: 'คุณอนันต์ รักสัตว์',  pet: 'Lucky',   info: 'สุนัข, Beagle',             tag: 'Check up',    tagCls: 'bg-[#dbeafe] text-[#1d4ed8]', dog: true  },
  { time: '13:00', owner: 'คุณปรียา วัฒนา',      pet: 'ช้างน้ำ', info: 'แมว, Scottish Fold',        tag: 'X-ray',       tagCls: 'bg-[#ede9fe] text-[#7c3aed]', dog: false },
  { time: '14:00', owner: 'คุณกิตติยา แสงทอง',   pet: 'Rocky',   info: 'สุนัข, French Bulldog',     tag: 'ตรวจทั่วไป', tagCls: 'bg-[#dbeafe] text-[#1d4ed8]', dog: true  },
];

const ipdRows = [
  { pet: 'โคโค่', sp: 'สุนัข', owner: 'คุณเกษกุมุล', dx: 'Parvovirus',   sts: 'วิกฤต',    stsCls: 'bg-[#fee2e2] text-[#dc2626]', dog: true  },
  { pet: 'นุ่ม',   sp: 'แมว',   owner: 'คุณยลลิชา',   dx: 'Feline UTI',   sts: 'เฝ้าระวัง', stsCls: 'bg-[#ffedd5] text-[#c2410c]', dog: false },
  { pet: 'อลัน',  sp: 'สุนัข', owner: 'คุณเดชพล',    dx: 'Pancreatitis', sts: 'คงที่',    stsCls: 'bg-[#dcfce7] text-[#15803d]', dog: true  },
  { pet: 'ชมปัง', sp: 'สุนัข', owner: 'คุณนิธิกร',   dx: 'Post Surgery', sts: 'คงที่',    stsCls: 'bg-[#dcfce7] text-[#15803d]', dog: true  },
  { pet: 'โมจิ',  sp: 'แมว',   owner: 'คุณรัตนา',    dx: 'Asthma',       sts: 'คงที่',    stsCls: 'bg-[#dcfce7] text-[#15803d]', dog: false },
];

const labDonut = [
  { label: 'รอดำเนินการ',    value: 27, pct: 48, color: '#f97316' },
  { label: 'กำลังดำเนินการ', value: 15, pct: 27, color: '#3b82f6' },
  { label: 'รอผลตรวจ',      value: 10, pct: 18, color: '#8b5cf6' },
  { label: 'เสร็จสิ้นวันนี้',  value: 4,  pct: 7,  color: '#22c55e' },
];

const criticalLabs = [
  { pet: 'โคโค่', sp: 'สุนัข', result: 'PCV 15% (ต่ำ)',       time: '09:15', dog: true  },
  { pet: 'นุ่ม',   sp: 'แมว',   result: 'BUN 68 mg/dL (สูง)',  time: '10:02', dog: false },
  { pet: 'อลัน',  sp: 'สุนัข', result: 'K+ 6.2 mmol/L (สูง)', time: '11:20', dog: true  },
];

const revenueDonut = [
  { label: 'OPD',      value: 980312,  pct: 40, color: '#3b82f6' },
  { label: 'IPD',      value: 612695,  pct: 25, color: '#22c55e' },
  { label: 'Surgery',  value: 367607,  pct: 15, color: '#8b5cf6' },
  { label: 'Lab',      value: 245078,  pct: 10, color: '#10b981' },
  { label: 'Pharmacy', value: 245088,  pct: 10, color: '#f97316' },
];

const top5 = [
  { name: 'ตรวจรักษาทั่วไป (OPD)', amount: 980312, color: '#3b82f6' },
  { name: 'ผ่าตัดเลี้ยง (IPD)',     amount: 612695, color: '#22c55e' },
  { name: 'ผ่าตัดทำหมัน',           amount: 367607, color: '#8b5cf6' },
  { name: 'ตรวจเลือด (Lab)',         amount: 245078, color: '#f97316' },
  { name: 'ขายยา (Pharmacy)',         amount: 245088, color: '#ec4899' },
];

const tasks = [
  { text: 'Lab รอดำเนินการมากกว่า 24 ชม.', count: 12, cls: 'bg-[#fee2e2] text-[#dc2626]' },
  { text: 'เอกสารรออนุมัติ',                count: 7,  cls: 'bg-[#ffedd5] text-[#c2410c]' },
  { text: 'สินค้าคงเหลือต่ำกว่า Min',        count: 15, cls: 'bg-[#fef9c3] text-[#854d0e]' },
  { text: 'นัดหมายรอคอนเฟิร์ม',             count: 9,  cls: 'bg-[#dcfce7] text-[#15803d]' },
];

const quickActions = [
  { label: 'นัดหมายใหม่',  icon: CalendarDays,  bg: 'bg-[#e0f2fe]', ic: 'text-[#0284c7]', href: '/appointment' },
  { label: 'Walk-in',       icon: UserPlus,      bg: 'bg-[#ede9fe]', ic: 'text-[#7c3aed]', href: '/register'    },
  { label: 'สร้างใบสั่งยา', icon: FileText,      bg: 'bg-[#dbeafe]', ic: 'text-[#1d4ed8]', href: '/pharmacy'    },
  { label: 'Lab Order',     icon: FlaskConical,  bg: 'bg-[#ffedd5]', ic: 'text-[#c2410c]', href: '/lab'         },
  { label: 'รับชำระเงิน',   icon: CreditCard,    bg: 'bg-[#dcfce7]', ic: 'text-[#15803d]', href: '/billing'     },
  { label: 'Inventory',     icon: Package,       bg: 'bg-[#f1f5f9]', ic: 'text-[#64788a]', href: '/inventory'   },
  { label: 'รายงาน',        icon: BarChart2,     bg: 'bg-[#dbeafe]', ic: 'text-[#1d4ed8]', href: '/report'      },
  { label: 'ส่งข้อความ',    icon: MessageSquare, bg: 'bg-[#ccfbf1]', ic: 'text-[#0d9488]', href: '#'            },
  { label: 'เพิ่มลูกค้า',   icon: Users,         bg: 'bg-[#ede9fe]', ic: 'text-[#7c3aed]', href: '/register'    },
];

const alertItems = [
  { icon: Clock,         text: 'ยา Expired ใกล้หมดอายุ (ภายใน 30 วัน)', count: 8, cls: 'bg-[#fee2e2] text-[#dc2626]' },
  { icon: AlertTriangle, text: 'วัคซีนใกล้หมดอายุ',                       count: 5, cls: 'bg-[#ffedd5] text-[#c2410c]' },
  { icon: BedDouble,     text: 'เตียง ICU ไม่มีเพียงพอ',                   count: 2, cls: 'bg-[#fee2e2] text-[#dc2626]' },
];

const recentVisits = [
  { pet: 'Lucky',   sp: 'สุนัข', owner: 'คุณอนันต์ รักสัตว์', time: '11:15', amount: '1,650 บาท', sts: 'ชำแล้ว',   stsCls: 'bg-[#dcfce7] text-[#15803d]', dog: true  },
  { pet: 'มะลิ',   sp: 'สุนัข', owner: 'คุณสมชาย ใจดี',      time: '09:30', amount: '890 บาท',   sts: 'ชำแล้ว',   stsCls: 'bg-[#dcfce7] text-[#15803d]', dog: true  },
  { pet: 'ทุงเงิน', sp: 'แมว',  owner: 'คุณวิภาว์ ศรีสุข',    time: '10:20', amount: '1,250 บาท', sts: 'ค้างชำระ', stsCls: 'bg-[#fee2e2] text-[#dc2626]', dog: false },
];

const newsItems = [
  { icon: Megaphone,  text: 'ประกาศปรับเวลาทำการ วันหยุดพิเศษ 3 มิถุนายน 2567'    },
  { icon: Pencil,     text: 'โปรโมชั่นวัคซีนรวมสุนัข ลด 15% ถึง 31 พฤษภาคม 2567'  },
  { icon: HelpCircle, text: 'อบรมการใช้งาน Vet Management วันที่ 25 พฤษภาคม 2567'   },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function Av({ dog, size = 28 }) {
  const ic = Math.round(size * 0.52);
  return (
    <div
      className={`rounded-full flex items-center justify-center shrink-0 ${dog ? 'bg-[#fef3c7]' : 'bg-[#ede9fe]'}`}
      style={{ width: size, height: size }}
    >
      {dog
        ? <Dog size={ic} className="text-[#b45309]" />
        : <Cat size={ic} className="text-[#7c3aed]" />
      }
    </div>
  );
}

function Donut({ data, size = 110, sw = 15, center }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const r = (size - sw) / 2;
  const circ = 2 * Math.PI * r;
  const cx = size / 2;
  const cy = size / 2;
  let off = 0;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <g transform={`rotate(-90 ${cx} ${cy})`}>
          {data.map((seg, i) => {
            const dash = Math.max(0, (seg.value / total) * circ - 2.5);
            const start = off;
            off += (seg.value / total) * circ;
            return (
              <circle key={i} cx={cx} cy={cy} r={r} fill="none"
                stroke={seg.color} strokeWidth={sw}
                strokeDasharray={`${dash} ${circ}`}
                strokeDashoffset={-start}
              />
            );
          })}
        </g>
      </svg>
      {center && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {center}
        </div>
      )}
    </div>
  );
}

function Hdr({ title, href = '#', lbl = 'ดูทั้งหมด' }) {
  return (
    <div className="flex items-center justify-between mb-2.5">
      <span className="font-black text-[#102a43] text-[13px]">{title}</span>
      <Link href={href} className="text-[#0f8f83] text-[11px] font-bold no-underline hover:underline flex items-center gap-0.5">
        {lbl}<ChevronRight size={11} />
      </Link>
    </div>
  );
}

function Card({ children, cls = '' }) {
  return (
    <div className={`bg-white border border-[#e3edf3] rounded-xl shadow-[0_2px_10px_rgba(16,42,67,.06)] p-4 ${cls}`}>
      {children}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const maxAmt = Math.max(...top5.map(t => t.amount));

  // --- 1. เพิ่ม State สำหรับเก็บวันที่ (ค่าเริ่มต้นคือวันที่ปัจจุบัน) ---
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    // ทำให้เวลาเป็น Timezone ปัจจุบัน (ป้องกันปัญหา Date เลื่อน)
    const offset = today.getTimezoneOffset() * 60000;
    const localISOTime = (new Date(today - offset)).toISOString().split('T')[0]; 
    return localISOTime; // Format: YYYY-MM-DD
  });

  // --- 2. แปลงวันที่ (YYYY-MM-DD) เป็นภาษาไทย ---
  const formattedThaiDate = new Date(selectedDate).toLocaleDateString('th-TH', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="overflow-y-auto h-full bg-[#f0f5f8] px-5 py-4 flex flex-col gap-3">

{/* Filter bar */}
      <div className="flex items-center justify-end gap-2.5 shrink-0">
        
        {/* --- 3. ส่วนที่แก้ไขให้เป็น Date Picker --- */}
        <div className="relative flex items-center gap-2 bg-white border border-[#e3edf3] rounded-lg px-3 py-1.5 shadow-sm cursor-pointer hover:border-[#0f8f83] transition-colors focus-within:ring-2 focus-within:ring-[#0f8f83]/20">
          <CalendarDays size={13} className="text-[#0f8f83]" />
          
          {/* แสดงผลวันที่เป็นภาษาไทย */}
          <span className="text-[12px] font-bold text-[#39576d] whitespace-nowrap">
            {formattedThaiDate}
          </span>
          
          <CalendarDays size={12} className="text-[#c4d6e0]" />

          {/* Input ซ่อนอยู่ด้านหลัง (opacity-0) เพื่อเรียก Native Calendar ของเบราว์เซอร์ */}
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
        {/* ------------------------------------- */}

        <div className="flex items-center gap-1.5 bg-white border border-[#e3edf3] rounded-lg px-3 py-1.5 shadow-sm cursor-pointer">
          <span className="text-[12px] text-[#9ab0bc]">สาขา:</span>
          <span className="text-[12px] font-bold text-[#39576d]">ทั้งหมด</span>
          <ChevronRight size={12} className="text-[#c4d6e0] rotate-90" />
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-5 gap-3 shrink-0">
        {kpiCards.map(({ icon: Icon, bg, value, label, sub, subCls }) => (
          <div key={label} className="bg-white border border-[#e3edf3] rounded-xl shadow-[0_2px_10px_rgba(16,42,67,.06)] p-4 flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${bg} flex items-center justify-center shrink-0`}>
              <Icon size={20} color="white" strokeWidth={1.8} />
            </div>
            <div className="min-w-0">
              <div className="text-[19px] font-black text-[#102a43] leading-none">{value}</div>
              <div className="text-[11px] font-bold text-[#39576d] mt-0.5 leading-tight">{label}</div>
              <div className={`text-[10px] mt-0.5 leading-tight ${subCls}`}>{sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Row 2: Appointments | IPD | Lab */}
      <div className="grid grid-cols-3 gap-3 shrink-0">

        {/* Appointments */}
        <Card>
          <Hdr title="นัดหมายวันนี้" href="/appointment" />
          <div className="flex flex-col gap-2">
            {todayAppts.map((a, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-[12px] font-black text-[#0f8f83] w-[38px] shrink-0">{a.time}</span>
                <Av dog={a.dog} size={28} />
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-bold text-[#102a43] truncate">{a.owner}</div>
                  <div className="text-[10px] text-[#9ab0bc] truncate">{a.pet} ({a.info})</div>
                </div>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md shrink-0 ${a.tagCls}`}>{a.tag}</span>
              </div>
            ))}
          </div>
          <Link href="/appointment" className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-[#64788a] font-bold border border-[#e3edf3] rounded-lg py-1.5 no-underline hover:border-[#0f8f83] hover:text-[#0f8f83] transition-colors cursor-pointer">
            <CalendarDays size={11} /> ดูปฏิทินทั้งหมด
          </Link>
        </Card>

        {/* IPD */}
        <Card>
          <Hdr title="ผู้ป่วยอนโรงพยาบาล (IPD)" href="/ipd" />
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#f0f5f8]">
                {['ชื่อสัตว์ป่วย','เจ้าของ','อาหารหลัก','สถานะ'].map(h => (
                  <th key={h} className="pb-1.5 text-left text-[9px] font-bold text-[#9ab0bc] uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ipdRows.map((p, i) => (
                <tr key={i} className="border-b border-[#f8fbfc] last:border-0">
                  <td className="py-1.5">
                    <div className="flex items-center gap-1.5">
                      <Av dog={p.dog} size={22} />
                      <div>
                        <div className="text-[11px] font-bold text-[#102a43]">{p.pet}</div>
                        <div className="text-[9px] text-[#c4d6e0]">({p.sp})</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-1.5 text-[10px] text-[#39576d]">{p.owner}</td>
                  <td className="py-1.5 text-[10px] text-[#64788a]">{p.dx}</td>
                  <td className="py-1.5">
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${p.stsCls}`}>{p.sts}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-2.5 pt-2 border-t border-[#f0f5f8] flex items-center justify-between text-[10px]">
            <span className="flex items-center gap-1 text-[#64788a]"><BedDouble size={11} /> เตียงว่าง 4 เตียง</span>
            <Link href="/ipd" className="flex items-center gap-0.5 text-[#0f8f83] font-bold no-underline hover:underline">
              บันทึกการรักษา<ChevronRight size={10} />
            </Link>
          </div>
        </Card>

        {/* Lab / LIS */}
        <Card>
          <Hdr title="Lab / LIS" href="/lab" />
          <div className="flex items-center gap-3">
            <Donut
              data={labDonut} size={108} sw={15}
              center={
                <div className="text-center">
                  <div className="text-[16px] font-black text-[#102a43] leading-none">56</div>
                  <div className="text-[9px] text-[#64788a] mt-0.5">รายการ</div>
                </div>
              }
            />
            <div className="flex flex-col gap-1.5 flex-1">
              {labDonut.map((d) => (
                <div key={d.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: d.color }} />
                    <span className="text-[10px] text-[#64788a] truncate">{d.label}</span>
                  </div>
                  <div className="text-right shrink-0 ml-1">
                    <span className="text-[11px] font-black text-[#102a43]">{d.value}</span>
                    <span className="text-[9px] text-[#9ab0bc] ml-0.5">({d.pct}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-[#f0f5f8]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-black text-[#102a43]">ผลวิกฤติวันนี้</span>
              <Link href="/lab" className="text-[10px] text-[#0f8f83] font-bold no-underline hover:underline">ดูทั้งหมด</Link>
            </div>
            {criticalLabs.map((c, i) => (
              <div key={i} className="flex items-center gap-2 py-1">
                <Av dog={c.dog} size={22} />
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-bold text-[#102a43]">{c.pet} </span>
                  <span className="text-[10px] text-[#9ab0bc]">({c.sp})</span>
                  <div className="text-[10px] text-[#39576d] truncate">{c.result}</div>
                </div>
                <span className="text-[10px] font-bold text-[#dc2626] shrink-0">{c.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Row 3: Revenue | Top5 | Tasks | Quick Actions */}
      <div className="grid grid-cols-4 gap-3 shrink-0">
        
        {/* Alerts */}
        <Card>
          <div className="flex items-center gap-1.5 mb-2.5">
            <Bell size={14} className="text-[#f97316]" />
            <span className="text-[13px] font-black text-[#102a43]">Alerts</span>
          </div>
          <div className="flex flex-col gap-2">
            {alertItems.map((a, i) => (
              <div key={i} className="flex items-center gap-2">
                <a.icon size={12} className="text-[#9ab0bc] shrink-0" />
                <span className="text-[11px] text-[#39576d] flex-1 leading-tight">{a.text}</span>
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-md shrink-0 ${a.cls}`}>{a.count}</span>
              </div>
            ))}
          </div>
          <Link href="#" className="mt-3 flex items-center gap-0.5 text-[11px] text-[#0f8f83] font-bold no-underline hover:underline">
            ดูทั้งหมด<ChevronRight size={11} />
          </Link>
        </Card>

        {/* Revenue */}
        {/* <Card>
          <Hdr title="รายได้แยกตามประเภทบริการ (เดือนนี้)" href="/report" lbl="ดูรายงาน" />
          <div className="flex items-center gap-3">
            <Donut
              data={revenueDonut} size={100} sw={22}
              center={
                <div className="text-center px-1">
                  <div className="text-[9px] text-[#64788a]">รวม</div>
                  <div className="text-[12px] font-black text-[#102a43] leading-tight">2,450,780</div>
                  <div className="text-[9px] text-[#64788a]">บาท</div>
                </div>
              }
            />
            <div className="flex flex-col gap-1 flex-1">
              {revenueDonut.map((d) => (
                <div key={d.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                    <span className="text-[10px] text-[#64788a]">{d.label}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black text-[#102a43]">{d.pct}%</span>
                    <div className="text-[9px] text-[#c4d6e0]">({d.value.toLocaleString()})</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card> */}

        {/* Top 5 */}
        <Card>
          <Hdr title="Top 5 บริการ (เดือนนี้)" href="/report" lbl="ดูรายงาน" />
          <div className="flex flex-col gap-2.5">
            {top5.map((s, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-black text-[#c4d6e0] w-3">{i + 1}.</span>
                    <span className="text-[11px] text-[#102a43] font-semibold truncate max-w-[120px]">{s.name}</span>
                  </div>
                  <span className="text-[10px] text-[#64788a] shrink-0">{s.amount.toLocaleString()} บาท</span>
                </div>
                <div className="h-1.5 bg-[#f0f5f8] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(s.amount / maxAmt) * 100}%`, backgroundColor: s.color }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Tasks */}
        <Card>
          <Hdr title="Tasks / งานที่ต้องทำ" href="#" />
          <div className="flex flex-col gap-2.5">
            {tasks.map((t, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-[#0f8f83] rounded flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 bg-[#0f8f83] rounded-sm" />
                </div>
                <span className="text-[11px] text-[#39576d] flex-1 leading-tight">{t.text}</span>
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-md shrink-0 ${t.cls}`}>{t.count}</span>
              </div>
            ))}
          </div>
          <Link href="#" className="mt-3 flex items-center gap-1 text-[11px] text-[#0f8f83] font-bold no-underline hover:underline">
            ดูงานทั้งหมด <ChevronRight size={11} />
          </Link>
        </Card>

        {/* Quick Actions */}
        <Card>
          <div className="text-[13px] font-black text-[#102a43] mb-2.5">Quick Actions</div>
          <div className="grid grid-cols-3 gap-1.5">
            {quickActions.map(({ label, icon: Icon, bg, ic, href }) => (
              <Link key={label} href={href}
                className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-[#f6f9fb] transition-colors no-underline cursor-pointer">
                <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center`}>
                  <Icon size={16} className={ic} strokeWidth={1.8} />
                </div>
                <span className="text-[9px] text-[#39576d] font-bold text-center leading-tight">{label}</span>
              </Link>
            ))}
          </div>
        </Card>
      </div>

      {/* Row 4: Alerts | Recent Visits | News */}
      <div className="grid grid-cols-[1fr_2fr_1fr] gap-3 shrink-0">

        {/* Recent Visits */}
        {/* <Card>
          <Hdr title="Recent Visits" href="#" />
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#f0f5f8]">
                {['สัตว์ป่วย','เจ้าของ','เวลา','ค่าบริการ','สถานะ'].map((h, i) => (
                  <th key={h} className={`pb-1.5 text-[9px] font-bold text-[#9ab0bc] uppercase ${i >= 3 ? 'text-right' : 'text-left'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentVisits.map((v, i) => (
                <tr key={i} className="border-b border-[#f8fbfc] last:border-0">
                  <td className="py-2">
                    <div className="flex items-center gap-1.5">
                      <Av dog={v.dog} size={24} />
                      <div>
                        <div className="text-[11px] font-bold text-[#102a43]">{v.pet}</div>
                        <div className="text-[9px] text-[#c4d6e0]">({v.sp})</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-2 text-[11px] text-[#39576d]">{v.owner}</td>
                  <td className="py-2 text-[11px] text-[#64788a]">{v.time}</td>
                  <td className="py-2 text-right text-[11px] font-bold text-[#102a43]">{v.amount}</td>
                  <td className="py-2 text-right">
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${v.stsCls}`}>{v.sts}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card> */}

        {/* News */}
        {/* <Card>
          <Hdr title="News / ประกาศ" href="#" />
          <div className="flex flex-col gap-3">
            {newsItems.map((n, i) => (
              <div key={i} className="flex items-start gap-2">
                <n.icon size={15} className="shrink-0 text-[#64788a]" />
                <span className="text-[11px] text-[#39576d] leading-snug">{n.text}</span>
              </div>
            ))}
          </div>
        </Card> */}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-[10px] text-[#c4d6e0] border-t border-[#e3edf3] pt-3 pb-1 shrink-0">
        <span>© 2024 Vet Management System. All rights reserved.</span>
        <span>Version 1.0.0</span>
      </div>

    </div>
  );
}
