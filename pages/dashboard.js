// src/pages/dashboard.js
import {
  Users, PawPrint, CalendarDays, FlaskConical,
  TrendingUp, Clock, CheckCircle2, AlertCircle,
  ArrowRight, Activity,
} from 'lucide-react';
import Link from 'next/link';

const statCards = [
  { label: 'Patients Today',    value: '38',  sub: '+4 from yesterday',  icon: PawPrint,     color: 'from-[#0f8f83] to-[#0b6d87]' },
  { label: 'Appointments',      value: '24',  sub: '6 remaining today',  icon: CalendarDays, color: 'from-[#7c3aed] to-[#a78bfa]' },
  { label: 'Active Clients',    value: '312', sub: '12 new this month',  icon: Users,        color: 'from-[#0891b2] to-[#22d3ee]' },
  { label: 'Lab Results',       value: '7',   sub: '3 pending review',   icon: FlaskConical, color: 'from-[#d97706] to-[#fbbf24]' },
];

const queueList = [
  { no: 'A011', pet: 'Mochi',  species: 'Cat',    owner: 'คุณปัณณดา',  status: 'In Progress', vet: 'Dr. Somchai' },
  { no: 'A012', pet: 'Lucky',  species: 'Dog',    owner: 'คุณสมชาย',    status: 'Waiting',     vet: '—' },
  { no: 'A013', pet: 'Peanut', species: 'Rabbit', owner: 'คุณสุดา',     status: 'Waiting',     vet: '—' },
  { no: 'A014', pet: 'Tiger',  species: 'Dog',    owner: 'คุณวิชัย',    status: 'Waiting',     vet: '—' },
  { no: 'A015', pet: 'Sakura', species: 'Cat',    owner: 'คุณนิภา',     status: 'Waiting',     vet: '—' },
];

const appointments = [
  { time: '09:00', pet: 'Max',     owner: 'คุณธนา',   type: 'Annual Vaccine',   done: true },
  { time: '10:30', pet: 'Bella',   owner: 'คุณรัตนา', type: 'Post-op Checkup',  done: true },
  { time: '13:00', pet: 'Buddy',   owner: 'คุณเอกชัย', type: 'Dental Cleaning', done: false },
  { time: '14:30', pet: 'Coco',    owner: 'คุณมาลี',  type: 'Dermatology',      done: false },
  { time: '16:00', pet: 'Charlie', owner: 'คุณวรรณา', type: 'General Checkup', done: false },
];

const revenueData = [
  { day: 'Mo', amount: 4200 },
  { day: 'Tu', amount: 6800 },
  { day: 'We', amount: 5500 },
  { day: 'Th', amount: 8200 },
  { day: 'Fr', amount: 7600 },
  { day: 'Sa', amount: 11500 },
  { day: 'Su', amount: 5900 },
];

const statusBadge = {
  'In Progress': 'bg-[#dcfce7] text-[#166534]',
  'Waiting':     'bg-[#fef9c3] text-[#854d0e]',
  'Done':        'bg-[#f1f5f9] text-[#64788a]',
};

const maxRevenue = Math.max(...revenueData.map(d => d.amount));

export default function DashboardPage() {
  return (
    <div className="h-full flex flex-col gap-5 overflow-auto p-4 md:p-6 bg-[#f6f9fb]">

      {/* Page Header */}
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h2 className="m-0 text-[26px] font-black text-[#102a43]">Dashboard</h2>
          <p className="m-0 mt-0.5 text-[#64788a] text-sm">Friday, 6 June 2026 · Main Hospital</p>
        </div>
        <div className="hidden md:flex items-center gap-2 text-sm text-[#64788a]">
          <Activity size={15} className="text-[#0f8f83]" />
          <span>Live · updated just now</span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
        {statCards.map(({ label, value, sub, icon: Icon, color }) => (
          <div key={label} className="bg-white border border-[#e3edf3] rounded-2xl p-5 shadow-[0_6px_24px_rgba(16,42,67,.06)] flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shrink-0 shadow-sm`}>
              <Icon size={22} color="white" strokeWidth={1.8} />
            </div>
            <div>
              <p className="m-0 text-[24px] lg:text-[28px] font-black text-[#102a43] leading-none">{value}</p>
              <p className="m-0 mt-0.5 text-[12px] lg:text-[13px] font-bold text-[#39576d]">{label}</p>
              <p className="m-0 mt-0.5 text-[10px] lg:text-xs text-[#64788a] truncate">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-4 flex-1 min-h-0">

        {/* OPD Queue */}
        <div className="bg-white border border-[#e3edf3] rounded-2xl shadow-[0_6px_24px_rgba(16,42,67,.06)] flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#e3edf3] shrink-0">
            <div className="flex items-center gap-2 font-black text-[#102a43]">
              <Clock size={17} className="text-[#0f8f83]" /> OPD Queue — Today
            </div>
            <Link 
              href="/queue" 
              className="flex items-center gap-1 text-[#0f8f83] text-[13px] font-bold no-underline hover:underline cursor-pointer"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="overflow-auto flex-1">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-left text-[#64788a] text-[12px] font-[800] uppercase">
                  <th className="px-6 py-3 bg-[#fbfdfe] border-b border-[#e3edf3]">Queue</th>
                  <th className="px-4 py-3 bg-[#fbfdfe] border-b border-[#e3edf3]">Pet</th>
                  <th className="hidden sm:table-cell px-4 py-3 bg-[#fbfdfe] border-b border-[#e3edf3]">Species</th>
                  <th className="px-4 py-3 bg-[#fbfdfe] border-b border-[#e3edf3]">Owner</th>
                  <th className="hidden md:table-cell px-4 py-3 bg-[#fbfdfe] border-b border-[#e3edf3]">Vet</th>
                  <th className="px-4 py-3 bg-[#fbfdfe] border-b border-[#e3edf3]">Status</th>
                </tr>
              </thead>
              <tbody>
                {queueList.map((q) => (
                  <tr key={q.no} className="hover:bg-[#fbfdfe] transition-colors border-b border-[#e3edf3] last:border-0">
                    <td className="px-6 py-3 font-black text-[#0f8f83]">{q.no}</td>
                    <td className="px-4 py-3 font-bold text-[#102a43]">{q.pet}</td>
                    <td className="hidden sm:table-cell px-4 py-3 text-[#64788a]">{q.species}</td>
                    <td className="px-4 py-3 text-[#39576d]">{q.owner}</td>
                    <td className="hidden md:table-cell px-4 py-3 text-[#64788a]">{q.vet}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-lg text-[11px] lg:text-[12px] font-[800] ${statusBadge[q.status]}`}>
                        {q.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Appointments */}
        <div className="bg-white border border-[#e3edf3] rounded-2xl shadow-[0_6px_24px_rgba(16,42,67,.06)] flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#e3edf3] shrink-0">
            <div className="flex items-center gap-2 font-black text-[#102a43]">
              <CalendarDays size={17} className="text-[#0f8f83]" /> Today's Appointments
            </div>
            <span className="text-xs text-[#64788a] font-bold">
              {appointments.filter(a => a.done).length}/{appointments.length} done
            </span>
          </div>
          <div className="overflow-auto flex-1 p-4 flex flex-col gap-2">
            {appointments.map((a) => (
              <div key={a.time + a.pet} className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${a.done ? 'border-[#e3edf3] bg-[#f8fbfc] opacity-60' : 'border-[#e3edf3] bg-white'}`}>
                <div className="w-[52px] text-center shrink-0">
                  <p className="m-0 text-[13px] font-black text-[#0f8f83] leading-none">{a.time}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="m-0 font-bold text-[13px] text-[#102a43] truncate">{a.pet} <span className="text-[#64788a] font-normal">· {a.owner}</span></p>
                  <p className="m-0 text-xs text-[#64788a] mt-0.5">{a.type}</p>
                </div>
                {a.done ? <CheckCircle2 size={18} className="text-[#22c55e] shrink-0" /> : <AlertCircle size={18} className="text-[#f59e0b] shrink-0" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Trend */}
      <div className="bg-white border border-[#e3edf3] rounded-2xl shadow-[0_6px_24px_rgba(16,42,67,.06)] p-5 shrink-0">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 font-black text-[#102a43]">
            <TrendingUp size={17} className="text-[#0f8f83]" /> Revenue This Week
          </div>
          <span className="text-xs font-bold text-[#0f8f83]">
            ฿ {revenueData.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()} Total
          </span>
        </div>
        
        {/* คอนเทนเนอร์หลักของกราฟ */}
        <div className="flex items-end gap-3 h-24 w-full">
          {revenueData.map((data, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
              {/* แท่งกราฟ */}
              <div 
                className="w-full rounded-t-md bg-[#0f8f83] opacity-80 hover:opacity-100 transition-all duration-500 relative"
                style={{ height: `${(data.amount / maxRevenue) * 100}%` }}
              >
                {/* Tooltip ยอดเงิน (จะโผล่มาเมื่อเอาเมาส์ชี้) */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#102a43] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 shadow-lg">
                  ฿{data.amount.toLocaleString()}
                </div>
              </div>
              <span className="text-[10px] font-bold text-[#64788a]">{data.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}