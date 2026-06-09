// src/pages/followup.js
import React, { useState } from 'react';
import Link from 'next/link';
import { Bell, CalendarDays, MessageSquare, Mail, Phone, CheckCircle2, AlertCircle, Clock, Search, Filter, Dog, Cat, PawPrint } from 'lucide-react';

const followupList = [
  { id: 1, pet: 'Lucky',   species: 'dog',    breed: 'Golden Retriever', owner: 'คุณณวรรณ', phone: '081-234-5678', dueDate: '2569-06-23', reason: 'Recheck Lab (CKD)',          urgency: 'high',   notified: false, vet: 'Dr. Nattha',   status: 'pending' },
  { id: 2, pet: 'Mochi',   species: 'cat',    breed: 'Persian',          owner: 'คุณปัณณดา', phone: '086-543-2100', dueDate: '2569-06-16', reason: 'Vaccine Due (Annual)',       urgency: 'medium', notified: true,  vet: 'Dr. Somchai',  status: 'confirmed' },
  { id: 3, pet: 'Tiger',   species: 'dog',    breed: 'Thai Dog',         owner: 'คุณวิชัย',  phone: '089-765-4321', dueDate: '2569-06-10', reason: 'Post-op Wound Check',       urgency: 'high',   notified: true,  vet: 'Dr. Witthaya', status: 'overdue' },
  { id: 4, pet: 'Bella',   species: 'cat',    breed: 'Scottish Fold',    owner: 'คุณรัตนา', phone: '082-111-9999', dueDate: '2569-07-01', reason: 'Annual Checkup',            urgency: 'low',    notified: false, vet: 'Dr. Nattha',   status: 'pending' },
  { id: 5, pet: 'Charly',  species: 'dog',    breed: 'Poodle',           owner: 'คุณวรรณา', phone: '091-888-7777', dueDate: '2569-06-20', reason: 'Heart Medication Refill',   urgency: 'medium', notified: true,  vet: 'Dr. Somchai',  status: 'confirmed' },
  { id: 6, pet: 'Peanut',  species: 'rabbit', breed: 'ND Rabbit',        owner: 'คุณสุดา',  phone: '083-222-3333', dueDate: '2569-06-14', reason: 'Neuter Post-op',            urgency: 'medium', notified: false, vet: 'Dr. Witthaya', status: 'pending' },
];

const urgencyConfig = {
  high:   { label: 'High',   badge: 'bg-red-100 text-red-700',      dot: 'bg-red-500' },
  medium: { label: 'Medium', badge: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-400' },
  low:    { label: 'Low',    badge: 'bg-green-100 text-green-700',   dot: 'bg-green-500' },
};

const statusConfig = {
  pending:   { label: 'Pending',   badge: 'bg-[#fef9c3] text-yellow-700', icon: Clock },
  confirmed: { label: 'Confirmed', badge: 'bg-[#dcfce7] text-green-700',  icon: CheckCircle2 },
  overdue:   { label: 'Overdue',   badge: 'bg-red-100 text-red-700',      icon: AlertCircle },
};

const stats = [
  { label: 'Total Follow-ups',   value: followupList.length,                                      color: 'from-[#0f8f83] to-[#0b6d87]', icon: CalendarDays },
  { label: 'Overdue',            value: followupList.filter(f => f.status === 'overdue').length,   color: 'from-red-500 to-red-400',       icon: AlertCircle },
  { label: 'Due This Week',      value: followupList.filter(f => f.status === 'pending').length,   color: 'from-[#7c3aed] to-[#a78bfa]',  icon: Clock },
  { label: 'Notified',           value: followupList.filter(f => f.notified).length,               color: 'from-[#0891b2] to-[#22d3ee]',  icon: Bell },
];

export default function FollowupPage() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filtered = followupList.filter(f => {
    const matchSearch = f.pet.toLowerCase().includes(search.toLowerCase()) ||
                        f.owner.toLowerCase().includes(search);
    const matchStatus = filterStatus === 'all' || f.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="h-full flex flex-col p-4 md:p-6 bg-[#f6f9fb] overflow-auto">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 shrink-0">
        <div>
          <h2 className="m-0 text-[28px] font-bold text-[#102a43]">Follow-up — ติดตามผล</h2>
          <p className="m-0 mt-1 text-[#64788a] text-sm">ติดตามการนัดหมายและส่งการแจ้งเตือนให้เจ้าของ</p>
        </div>
        <div className="flex gap-2.5 shrink-0">
          <button className="border border-[#e3edf3] rounded-xl px-4 py-2.5 font-[850] text-sm bg-white text-[#35546a] hover:bg-gray-50 flex items-center gap-2">
            <Bell size={14} /> Send All Reminders
          </button>
          <Link href="/appointment" className="border-0 rounded-xl px-4 py-2.5 font-[850] text-sm bg-gradient-to-r from-[#0f8f83] to-[#0b6d87] text-white shadow-sm no-underline">
            + New Appointment
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5 shrink-0">
        {stats.map(({ label, value, color, icon: Icon }) => (
          <div key={label} className="bg-white border border-[#e3edf3] rounded-2xl p-4 shadow-sm flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} grid place-items-center shrink-0`}>
              <Icon size={18} color="white" strokeWidth={2} />
            </div>
            <div>
              <p className="m-0 text-[24px] font-black text-[#102a43]">{value}</p>
              <p className="m-0 text-[12px] text-[#64788a]">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4 shrink-0">
        <div className="flex items-center gap-2 bg-white border border-[#e3edf3] rounded-xl p-[10px_14px] text-[#7a8fa0] shadow-sm text-sm flex-1">
          <Search size={14} />
          <input
            type="text"
            placeholder="ค้นหาสัตว์เลี้ยงหรือเจ้าของ..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 border-0 outline-none bg-transparent text-[#102a43] text-sm placeholder-[#7a8fa0]"
          />
        </div>
        <div className="flex gap-1.5">
          {[
            { key: 'all',       label: 'All' },
            { key: 'overdue',   label: 'Overdue' },
            { key: 'pending',   label: 'Pending' },
            { key: 'confirmed', label: 'Confirmed' },
          ].map(({ key, label }) => (
            <button key={key} onClick={() => setFilterStatus(key)}
              className={`px-3.5 py-2.5 rounded-xl text-[12px] font-[850] border-0 cursor-pointer transition-colors whitespace-nowrap ${filterStatus === key ? 'bg-[#e9f7f4] text-[#0f8f83]' : 'bg-white border border-[#e3edf3] text-[#64788a] hover:bg-gray-50'}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Follow-up List */}
      <div className="flex-1 min-h-0 overflow-auto">
        <div className="space-y-3 pb-4">
          {filtered.map((f) => {
            const uc = urgencyConfig[f.urgency];
            const sc = statusConfig[f.status];
            const StatusIcon = sc.icon;
            return (
              <div key={f.id} className={`bg-white border rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4 transition-all hover:shadow-md ${f.status === 'overdue' ? 'border-red-200' : 'border-[#e3edf3]'}`}>

                {/* Pet Info */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={`w-12 h-12 rounded-2xl grid place-items-center shrink-0 ${f.species === 'dog' ? 'bg-[#fef3c7]' : f.species === 'cat' ? 'bg-[#ede9fe]' : 'bg-[#dcfce7]'}`}>
                    {f.species === 'dog' ? <Dog size={24} className="text-[#b45309]" /> : f.species === 'cat' ? <Cat size={24} className="text-[#7c3aed]" /> : <PawPrint size={24} className="text-[#15803d]" />}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="m-0 font-bold text-[15px] text-[#102a43]">{f.pet}</p>
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-[850] ${uc.badge}`}>{uc.label}</span>
                    </div>
                    <p className="m-0 text-[12px] text-[#64788a]">{f.breed} · {f.owner} · {f.vet}</p>
                    <p className="m-0 mt-1 text-[12px] text-[#39576d] font-[700]">{f.reason}</p>
                  </div>
                </div>

                {/* Due Date */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <CalendarDays size={14} className={f.status === 'overdue' ? 'text-red-500' : 'text-[#64788a]'} />
                  <span className={`text-[13px] font-bold ${f.status === 'overdue' ? 'text-red-600' : 'text-[#39576d]'}`}>{f.dueDate}</span>
                </div>

                {/* Status Badge */}
                <span className={`px-3 py-1.5 rounded-full text-[12px] font-[850] flex items-center gap-1.5 shrink-0 ${sc.badge}`}>
                  <StatusIcon size={12} /> {sc.label}
                </span>

                {/* Notify Buttons */}
                <div className="flex gap-2 shrink-0">
                  <button title="LINE" className={`w-9 h-9 rounded-xl border grid place-items-center transition-colors ${f.notified ? 'border-[#0f8f83] bg-[#e9f7f4] text-[#0f8f83]' : 'border-[#e3edf3] bg-white text-[#64788a] hover:border-[#0f8f83]'}`}>
                    <MessageSquare size={15} />
                  </button>
                  <button title="Phone" className="w-9 h-9 rounded-xl border border-[#e3edf3] bg-white text-[#64788a] hover:border-[#0f8f83] grid place-items-center transition-colors">
                    <Phone size={15} />
                  </button>
                  <button title="Email" className="w-9 h-9 rounded-xl border border-[#e3edf3] bg-white text-[#64788a] hover:border-[#0f8f83] grid place-items-center transition-colors">
                    <Mail size={15} />
                  </button>
                </div>

                {/* Open EMR */}
                <Link href="/emr" className="shrink-0 border border-[#e3edf3] rounded-xl px-3 py-2 text-[12px] font-[850] text-[#35546a] no-underline hover:bg-gray-50 whitespace-nowrap">
                  Open EMR
                </Link>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="bg-white border border-[#e3edf3] rounded-2xl p-10 text-center">
              <p className="m-0 text-[#64788a] text-sm">ไม่พบรายการที่ตรงกับการค้นหา</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
