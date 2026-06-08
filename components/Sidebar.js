// src/components/Sidebar.js
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, UserPlus, Stethoscope, CalendarDays, BedDouble,
  FlaskConical, ScanLine, Pill, Package, CreditCard,
  HelpCircle, LogOut,
} from 'lucide-react';

const navGroups = [
  {
    label: 'MAIN',
    items: [
      { href: '/dashboard',   icon: LayoutDashboard, label: 'Dashboard' },
      { href: '/register',    icon: UserPlus,        label: 'Register' },
      { href: '/emr',         icon: Stethoscope,     label: 'OPD / EMR' },
      { href: '/appointment', icon: CalendarDays,    label: 'Appointment' },
      { href: '/ipd',         icon: BedDouble,       label: 'IPD' },
    ],
  },
  {
    label: 'SERVICES',
    items: [
      { href: '/lab',       icon: FlaskConical, label: 'Laboratory' },
      { href: '/imaging',   icon: ScanLine,     label: 'Imaging' },
      { href: '/pharmacy',  icon: Pill,         label: 'Pharmacy' },
      { href: '/inventory', icon: Package,      label: 'Inventory' },
      { href: '/billing',   icon: CreditCard,   label: 'Billing' },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-gradient-to-b from-[#0a3347] to-[#04293a] text-white w-[210px] shrink-0 flex flex-col overflow-y-auto">
      <nav className="flex-1 p-[14px_10px]">
        {navGroups.map((group) => (
          <div key={group.label}>
            <div className="text-[#87b7c5] text-[10px] font-[850] tracking-widest mx-[10px] mt-4 mb-1.5">
              {group.label}
            </div>
            {group.items.map(({ href, icon: Icon, label }) => {
              const isActive = href === '/' ? pathname === '/' : pathname?.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-bold mb-0.5 no-underline transition-colors
                    ${isActive
                      ? 'bg-gradient-to-r from-primary to-primary2 text-white shadow-md'
                      : 'text-[#d8eef4] hover:bg-white/10'
                    }`}
                >
                  <Icon size={16} strokeWidth={2} />
                  {label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="p-[14px_20px] border-t border-white/10 text-[#cfe4eb] text-[13px] flex flex-col gap-2">
        <span className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
          <LogOut size={15} /> Log out
        </span>
      </div>
    </aside>
  );
}