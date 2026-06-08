'use client'; // 1. เพิ่มคำสั่งนี้บรรทัดแรกสุด เพื่อให้ Next.js รู้ว่าเราจะใช้ React Hook ในนี้

import React, { useState, useEffect } from 'react'; // นำเข้า useState และ useEffect
import Link from 'next/link';
// import { usePathname } from 'next/navigation'; // <-- ไม่แนะนำให้ใช้ตรงๆ ตอนนี้ เพราะอาจเกิดปัญหา hydration mismatch

import {
  Heart, LayoutDashboard, UserPlus, CalendarDays,
  Stethoscope, BedDouble, Pill, FlaskConical,
  ScanLine, CreditCard, HelpCircle, LogOut,
} from 'lucide-react';

const dropdownLink = 'flex items-center gap-2.5 px-5 py-2.5 text-[13px] hover:bg-[#e9f7f4] hover:text-[#0f8f83] font-bold transition-colors no-underline text-[#102a43]';

export default function AppHeader() {
  // 2. สร้าง State มารับค่า Path ปัจจุบัน
  const [currentPath, setCurrentPath] = useState('');

  // 3. ใช้ useEffect เพื่อดึง Path เมื่อ Component โหลดเสร็จ (อยู่ฝั่ง Client)
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  // 4. สร้างตัวแปรเช็คเงื่อนไข ว่าถ้า Path เป็น /login หรือ /forgot-password ให้คืนค่า null (ไม่แสดงผล)
  const isAuthPage = currentPath === '/login' || currentPath === '/forgot-password';

  if (isAuthPage) {
    return null;
  }

  // 5. โค้ดเดิมด้านล่างปล่อยไว้เหมือนเดิมครับ
  return (
    <header className="bg-gradient-to-r from-[#07364a] to-[#04293a] text-white px-6 flex items-center h-[64px] shrink-0 relative z-50">
      
      {/* Brand Section */}
      <Link href="/dashboard" className="flex gap-3 items-center pr-6 border-r border-white/12 mr-6 cursor-pointer no-underline text-white">
        <div className="w-9 h-9 rounded-xl border-2 border-white/75 flex items-center justify-center">
          <Heart size={18} strokeWidth={2} />
        </div>
        <div>
          <h1 className="text-lg m-0 leading-none">PETCARE</h1>
          <p className="m-0 mt-0.5 text-[#bdd9e2] text-[11px]">Animal Hospital</p>
        </div>
      </Link>

      {/* Navigation Links - Apple Style Dropdown */}
      <nav className="flex items-center gap-2 flex-1 h-full">
        
        {/* เมนูที่ 1: Main */}
        <div className="relative group h-full flex items-center px-3 cursor-pointer">
          <span className="text-[#d8eef4] group-hover:text-white text-[13px] font-bold transition-colors">
            Main
          </span>
          <div className="absolute top-[64px] left-0 invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out z-50">
            <div className="bg-white border border-[#e3edf3] shadow-[0_14px_35px_rgba(16,42,67,.1)] rounded-xl py-2 w-[220px]">
              <Link href="/dashboard" className={dropdownLink}>
                <LayoutDashboard size={15} /> Dashboard
              </Link>
              <Link href="/register" className={dropdownLink}>
                <UserPlus size={15} /> Register / Walk-in
              </Link>
              <Link href="/appointment" className={dropdownLink}>
                <CalendarDays size={15} /> Appointment
              </Link>
            </div>
          </div>
        </div>

        {/* เมนูที่ 2: Clinical */}
        <div className="relative group h-full flex items-center px-3 cursor-pointer">
          <span className="text-[#d8eef4] group-hover:text-white text-[13px] font-bold transition-colors">
            Clinical
          </span>
          <div className="absolute top-[64px] left-0 invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out z-50">
            <div className="bg-white border border-[#e3edf3] shadow-[0_14px_35px_rgba(16,42,67,.1)] rounded-xl py-2 w-[200px]">
              <Link href="/emr" className={dropdownLink}>
                <Stethoscope size={15} /> OPD / EMR
              </Link>
              <Link href="/ipd" className={dropdownLink}>
                <BedDouble size={15} /> IPD / ICU
              </Link>
            </div>
          </div>
        </div>

        {/* เมนูที่ 3: Operations & Services */}
        <div className="relative group h-full flex items-center px-3 cursor-pointer">
          <span className="text-[#d8eef4] group-hover:text-white text-[13px] font-bold transition-colors">
            Operations
          </span>
          <div className="absolute top-[64px] left-0 invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out z-50">
            <div className="bg-white border border-[#e3edf3] shadow-[0_14px_35px_rgba(16,42,67,.1)] rounded-xl py-2 w-[200px]">
              <Link href="/pharmacy" className={dropdownLink}>
                <Pill size={15} /> Pharmacy
              </Link>
              <Link href="/lab" className={dropdownLink}>
                <FlaskConical size={15} /> Laboratory
              </Link>
              <Link href="/imaging" className={dropdownLink}>
                <ScanLine size={15} /> Imaging
              </Link>
              <Link href="/billing" className={dropdownLink}>
                <CreditCard size={15} /> Billing
              </Link>
            </div>
          </div>
        </div>

      </nav>

      {/* Right Menu */}
      <div className="flex gap-4 items-center text-[#cfe4eb] text-[13px] ml-4 border-l border-white/12 pl-4 whitespace-nowrap">
        <Link href="/login" className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors no-underline text-[#cfe4eb]">
          <LogOut size={15} /> Log out
        </Link>
      </div>
      
    </header>
  );
}