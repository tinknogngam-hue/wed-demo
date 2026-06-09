'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Heart, LayoutDashboard, UserPlus, CalendarDays,
  Stethoscope, BedDouble, Pill, FlaskConical,
  ScanLine, CreditCard, LogOut,
  Activity, ListOrdered, Syringe, DoorOpen, Bell, BarChart2,
  Search, Package, Users, PawPrint, UserCog, Wallet,
  Dog, ChevronRight,
} from 'lucide-react';

const dropdownLink = 'flex items-center justify-between gap-2 px-5 py-2.5 text-[13px] hover:bg-[#e9f7f4] hover:text-[#0f8f83] font-bold transition-colors no-underline text-[#102a43]';

function NavItem({ href, icon: Icon, label, hotkey }) {
  return (
    <Link href={href} className={dropdownLink}>
      <span className="flex items-center gap-2.5">
        <Icon size={15} />
        {label}
      </span>
      <kbd className="text-[10px] font-mono bg-[#f0f5f8] text-[#9ab0bc] px-1.5 py-0.5 rounded border border-[#e8f0f5] shrink-0">
        {hotkey}
      </kbd>
    </Link>
  );
}

export default function AppHeader({ onOpenQuickAction }) {
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const isAuthPage = currentPath === '/login' || currentPath === '/forgot-password';
  if (isAuthPage) return null;

  return (
    <header className="bg-gradient-to-r from-[#07364a] to-[#04293a] text-white px-6 flex items-center h-[64px] shrink-0 relative z-50">

      {/* Brand */}
      <Link href="/dashboard" className="flex gap-3 items-center pr-6 border-r border-white/12 mr-6 cursor-pointer no-underline text-white">
        <div className="w-9 h-9 rounded-xl border-2 border-white/75 flex items-center justify-center">
          <Heart size={18} strokeWidth={2} />
        </div>
        <div>
          <h1 className="text-lg m-0 leading-none">PETCARE</h1>
          <p className="m-0 mt-0.5 text-[#bdd9e2] text-[11px]">Animal Hospital</p>
        </div>
      </Link>

      {/* Navigation dropdowns */}
      <nav className="flex items-center gap-2 flex-1 h-full">

        {/* Main */}
        <div className="relative group h-full flex items-center px-3 cursor-pointer">
          <span className="text-[#d8eef4] group-hover:text-white text-[13px] font-bold transition-colors">Main</span>
          <div className="absolute top-[64px] left-0 invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out z-50">
            <div className="bg-white border border-[#e3edf3] shadow-[0_14px_35px_rgba(16,42,67,.1)] rounded-xl py-2 w-[260px]">
              <NavItem href="/dashboard"   icon={LayoutDashboard} label="Dashboard"          hotkey="Alt+H" />
              <NavItem href="/clients"     icon={Users}           label="Clients"            hotkey="Alt+K" />
              <NavItem href="/patients"    icon={PawPrint}        label="Patients"           hotkey="Alt+S" />
              <NavItem href="/register"    icon={UserPlus}        label="Register / Walk-in" hotkey="Alt+R" />
              <NavItem href="/triage"      icon={Activity}        label="Triage"             hotkey="Alt+T" />
              {/* Queue — nested sub-menu */}
              <div className="relative group/queue">
                <div className="flex items-center justify-between gap-2 px-5 py-2.5 text-[13px] font-bold text-[#102a43] hover:bg-[#e9f7f4] hover:text-[#0f8f83] transition-colors cursor-pointer">
                  <span className="flex items-center gap-2.5">
                    <ListOrdered size={15} /> Queue Management
                  </span>
                  <ChevronRight size={13} className="text-[#9ab0bc]" />
                </div>
                {/* Sub-menu panel */}
                <div className="absolute left-full top-0 invisible opacity-0 -translate-x-1 group-hover/queue:visible group-hover/queue:opacity-100 group-hover/queue:translate-x-0 transition-all duration-150 ease-out z-50">
                  <div className="bg-white border border-[#e3edf3] shadow-[0_14px_35px_rgba(16,42,67,.1)] rounded-xl py-2 w-[230px] ml-1">
                    <p className="px-4 py-1.5 text-[10px] font-[800] text-[#9ab0bc] uppercase tracking-widest">คิวผู้ป่วย</p>
                    <NavItem href="/queue"        icon={PawPrint}    label="Animal Queue"    hotkey="Alt+Q" />
                    <NavItem href="/queue-doctor" icon={Dog}         label="Doctor Queue"    hotkey="Alt+D" />
                  </div>
                </div>
              </div>
              <NavItem href="/appointment" icon={CalendarDays}    label="Appointment"        hotkey="Alt+A" />
            </div>
          </div>
        </div>

        {/* Clinical */}
        <div className="relative group h-full flex items-center px-3 cursor-pointer">
          <span className="text-[#d8eef4] group-hover:text-white text-[13px] font-bold transition-colors">Clinical</span>
          <div className="absolute top-[64px] left-0 invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out z-50">
            <div className="bg-white border border-[#e3edf3] shadow-[0_14px_35px_rgba(16,42,67,.1)] rounded-xl py-2 w-[260px]">
              <NavItem href="/emr"       icon={Stethoscope} label="OPD / EMR"             hotkey="Alt+M" />
              <NavItem href="/treatment" icon={Syringe}     label="Treatment / Procedure"  hotkey="Alt+X" />
              <NavItem href="/discharge" icon={DoorOpen}    label="Discharge"              hotkey="Alt+C" />
              <NavItem href="/followup"  icon={Bell}        label="Follow-up"              hotkey="Alt+U" />
              <NavItem href="/ipd"       icon={BedDouble}   label="IPD / ICU"              hotkey="Alt+I" />
            </div>
          </div>
        </div>

        {/* Operations */}
        <div className="relative group h-full flex items-center px-3 cursor-pointer">
          <span className="text-[#d8eef4] group-hover:text-white text-[13px] font-bold transition-colors">Operations</span>
          <div className="absolute top-[64px] left-0 invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out z-50">
            <div className="bg-white border border-[#e3edf3] shadow-[0_14px_35px_rgba(16,42,67,.1)] rounded-xl py-2 w-[260px]">
              <NavItem href="/pharmacy"  icon={Pill}         label="Pharmacy"   hotkey="Alt+P" />
              <NavItem href="/lab"       icon={FlaskConical} label="Laboratory" hotkey="Alt+L" />
              <NavItem href="/imaging"   icon={ScanLine}     label="Imaging"    hotkey="Alt+G" />
              <NavItem href="/billing"   icon={CreditCard}   label="Billing"    hotkey="Alt+B" />
              <NavItem href="/inventory" icon={Package}      label="Inventory"  hotkey="Alt+N" />
            </div>
          </div>
        </div>

        {/* Reports */}
        <div className="relative group h-full flex items-center px-3 cursor-pointer">
          <span className="text-[#d8eef4] group-hover:text-white text-[13px] font-bold transition-colors">Reports</span>
          <div className="absolute top-[64px] left-0 invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out z-50">
            <div className="bg-white border border-[#e3edf3] shadow-[0_14px_35px_rgba(16,42,67,.1)] rounded-xl py-2 w-[260px]">
              <NavItem href="/report" icon={BarChart2} label="Reports & Dashboard" hotkey="Alt+O" />
            </div>
          </div>
        </div>

        {/* Admin */}
        <div className="relative group h-full flex items-center px-3 cursor-pointer">
          <span className="text-[#d8eef4] group-hover:text-white text-[13px] font-bold transition-colors">Admin</span>
          <div className="absolute top-[64px] left-0 invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out z-50">
            <div className="bg-white border border-[#e3edf3] shadow-[0_14px_35px_rgba(16,42,67,.1)] rounded-xl py-2 w-[260px]">
              <NavItem href="/hr"      icon={UserCog} label="HR & User Management"  hotkey="Alt+Y" />
              <NavItem href="/finance" icon={Wallet}  label="Finance & Accounting"  hotkey="Alt+Z" />
            </div>
          </div>
        </div>

      </nav>

      {/* Right section */}
      <div className="flex gap-3 items-center ml-4 border-l border-white/12 pl-4">

        {/* Quick Action trigger */}
        <button
          onClick={onOpenQuickAction}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#d8eef4] hover:text-white text-[12px] transition-colors border border-white/15 cursor-pointer"
        >
          <Search size={13} />
          <span>Quick Actions</span>
          <kbd className="font-mono text-[10px] bg-white/15 text-[#bdd9e2] px-1.5 py-0.5 rounded border border-white/15 ml-0.5">
            Ctrl+K
          </kbd>
        </button>

        <Link href="/login" className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors no-underline text-[#cfe4eb] whitespace-nowrap text-[13px]">
          <LogOut size={15} /> Log out
        </Link>
      </div>

    </header>
  );
}
