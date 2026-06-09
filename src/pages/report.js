// src/pages/report.js
import React, { useState } from 'react';
import { TrendingUp, Users, PawPrint, CreditCard, Activity, FlaskConical, CalendarDays, BarChart2, ArrowUp, ArrowDown } from 'lucide-react';

const kpiCards = [
  { label: 'Revenue Today',       value: '฿ 48,250', sub: '+12% vs yesterday',  trend: 'up',   color: 'from-[#0f8f83] to-[#0b6d87]', icon: CreditCard },
  { label: 'Patients Today',      value: '38',        sub: '+4 from yesterday',  trend: 'up',   color: 'from-[#7c3aed] to-[#a78bfa]',  icon: PawPrint },
  { label: 'Active Clients',      value: '312',       sub: '12 new this month',  trend: 'up',   color: 'from-[#0891b2] to-[#22d3ee]',  icon: Users },
  { label: 'Avg. Wait Time',      value: '22 min',    sub: '-3 min vs last week', trend: 'down', color: 'from-[#d97706] to-[#fbbf24]',  icon: Activity },
  { label: 'Lab Tests Today',     value: '24',        sub: '7 pending results',  trend: 'up',   color: 'from-[#dc2626] to-[#f87171]',  icon: FlaskConical },
  { label: 'Appointments',        value: '29',        sub: '5 remaining',        trend: 'up',   color: 'from-[#059669] to-[#34d399]',  icon: CalendarDays },
];

const revenueWeek = [
  { day: 'Mon', opd: 18000, lab: 6500,  pharma: 8200 },
  { day: 'Tue', opd: 22000, lab: 8100,  pharma: 9400 },
  { day: 'Wed', opd: 15500, lab: 5200,  pharma: 6800 },
  { day: 'Thu', opd: 31000, lab: 11200, pharma: 12500 },
  { day: 'Fri', opd: 27500, lab: 9800,  pharma: 10100 },
  { day: 'Sat', opd: 42000, lab: 15300, pharma: 18200 },
  { day: 'Sun', opd: 19000, lab: 7200,  pharma: 8500 },
];

const topServices = [
  { name: 'OPD Consultation',   count: 124, revenue: 186000, pct: 100 },
  { name: 'Laboratory Tests',   count: 87,  revenue: 63450,  pct: 72 },
  { name: 'Pharmacy',           count: 203, revenue: 58700,  pct: 68 },
  { name: 'Imaging (X-ray/US)', count: 31,  revenue: 46500,  pct: 42 },
  { name: 'Procedures',         count: 19,  revenue: 38000,  pct: 32 },
  { name: 'Vaccination',        count: 44,  revenue: 22000,  pct: 25 },
];

const speciesBreakdown = [
  { name: 'Dog',    pct: 58, color: 'bg-[#0f8f83]' },
  { name: 'Cat',    pct: 31, color: 'bg-[#7c3aed]' },
  { name: 'Rabbit', pct: 6,  color: 'bg-[#d97706]' },
  { name: 'Other',  pct: 5,  color: 'bg-[#64788a]' },
];

const maxTotal = Math.max(...revenueWeek.map(d => d.opd + d.lab + d.pharma));

export default function ReportPage() {
  const [period, setPeriod] = useState('week');

  return (
    <div className="h-full flex flex-col p-4 md:p-6 bg-[#f6f9fb] overflow-auto">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 shrink-0">
        <div>
          <h2 className="m-0 text-[28px] font-bold text-[#102a43]">Reports & Dashboard — รายงาน</h2>
          <p className="m-0 mt-1 text-[#64788a] text-sm">ภาพรวมการดำเนินงาน รายได้ และ KPI สำคัญ</p>
        </div>
        <div className="flex gap-1.5">
          {['today', 'week', 'month'].map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-4 py-2.5 rounded-xl font-[850] text-[13px] border-0 cursor-pointer transition-colors capitalize ${period === p ? 'bg-[#e9f7f4] text-[#0f8f83]' : 'bg-white border border-[#e3edf3] text-[#64788a] hover:bg-gray-50'}`}>
              {p === 'today' ? 'Today' : p === 'week' ? 'This Week' : 'This Month'}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 mb-5 shrink-0">
        {kpiCards.map(({ label, value, sub, trend, color, icon: Icon }) => (
          <div key={label} className="bg-white border border-[#e3edf3] rounded-2xl p-4 shadow-sm">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${color} grid place-items-center mb-3`}>
              <Icon size={17} color="white" strokeWidth={2} />
            </div>
            <p className="m-0 text-[22px] font-black text-[#102a43] leading-none">{value}</p>
            <p className="m-0 mt-1 text-[11px] font-bold text-[#39576d]">{label}</p>
            <div className={`flex items-center gap-1 mt-1 text-[10px] font-[800] ${trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
              {trend === 'up' ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
              {sub}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-5 mb-5 shrink-0">

        {/* Revenue Bar Chart */}
        <div className="bg-white border border-[#e3edf3] rounded-2xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2 font-black text-[#102a43]">
              <TrendingUp size={17} className="text-[#0f8f83]" /> Revenue Breakdown — This Week
            </div>
            <div className="flex items-center gap-3 text-[11px] font-[800] text-[#64788a]">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-[#0f8f83] inline-block" /> OPD</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-[#7c3aed] inline-block" /> Lab</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-[#d97706] inline-block" /> Pharma</span>
            </div>
          </div>
          <div className="flex items-end gap-2 h-40">
            {revenueWeek.map(({ day, opd, lab, pharma }) => {
              const total = opd + lab + pharma;
              const heightPct = (total / maxTotal) * 100;
              const opdPct = (opd / total) * 100;
              const labPct = (lab / total) * 100;
              const pharmaPct = (pharma / total) * 100;
              return (
                <div key={day} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
                  <div className="w-full flex flex-col rounded-t-lg overflow-hidden relative" style={{ height: `${heightPct}%` }}>
                    <div className="bg-[#0f8f83]" style={{ height: `${opdPct}%` }} />
                    <div className="bg-[#7c3aed]" style={{ height: `${labPct}%` }} />
                    <div className="bg-[#d97706]" style={{ height: `${pharmaPct}%` }} />
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#102a43] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-lg">
                      ฿{total.toLocaleString()}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#64788a]">{day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Species Breakdown */}
        <div className="bg-white border border-[#e3edf3] rounded-2xl shadow-sm p-5">
          <div className="flex items-center gap-2 font-black text-[#102a43] mb-5">
            <BarChart2 size={17} className="text-[#0f8f83]" /> Species Distribution
          </div>
          <div className="space-y-4">
            {speciesBreakdown.map(({ name, pct, color }) => (
              <div key={name}>
                <div className="flex justify-between text-[13px] mb-1.5">
                  <span className="font-[800] text-[#39576d]">{name}</span>
                  <span className="font-black text-[#102a43]">{pct}%</span>
                </div>
                <div className="h-3 bg-[#e9f0f5] rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${color} transition-all duration-700`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-[#e3edf3] grid grid-cols-2 gap-3">
            {speciesBreakdown.map(({ name, pct, color }) => (
              <div key={name} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${color}`} />
                <span className="text-[12px] text-[#64788a]">{name} <b className="text-[#102a43]">{pct}%</b></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Services Table */}
      <div className="bg-white border border-[#e3edf3] rounded-2xl shadow-sm overflow-hidden shrink-0">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e3edf3]">
          <div className="flex items-center gap-2 font-black text-[#102a43]">
            <TrendingUp size={17} className="text-[#0f8f83]" /> Top Services This Week
          </div>
          <span className="text-[12px] text-[#64788a] font-bold">
            Total: ฿ {revenueWeek.reduce((a, d) => a + d.opd + d.lab + d.pharma, 0).toLocaleString()}
          </span>
        </div>
        <div className="overflow-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left text-[#64788a] text-[11px] font-[800] uppercase bg-[#fbfdfe] border-b border-[#e3edf3]">
                <th className="px-6 py-3">Service</th>
                <th className="px-4 py-3 text-center">Cases</th>
                <th className="px-4 py-3 text-right">Revenue</th>
                <th className="px-4 py-3 hidden md:table-cell">Share</th>
              </tr>
            </thead>
            <tbody>
              {topServices.map(({ name, count, revenue, pct }) => (
                <tr key={name} className="border-b border-[#e3edf3] last:border-0 hover:bg-[#fbfdfe] transition-colors">
                  <td className="px-6 py-3 font-bold text-[#102a43]">{name}</td>
                  <td className="px-4 py-3 text-center text-[#64788a]">{count}</td>
                  <td className="px-4 py-3 text-right font-bold text-[#0f8f83]">฿ {revenue.toLocaleString()}</td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-[#e9f0f5] rounded-full overflow-hidden">
                        <div className="h-full bg-[#0f8f83] rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-[11px] text-[#64788a] font-bold w-8 text-right">{pct}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
