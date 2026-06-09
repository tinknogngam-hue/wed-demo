'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  LayoutDashboard, Users, PawPrint, CalendarDays, ListOrdered,
  FileText, Stethoscope, BedDouble, Scissors, ScanLine, FlaskConical,
  Pill, Package, CreditCard, Megaphone, BarChart2, UserCog,
  Settings, ChevronLeft, ChevronRight,
} from 'lucide-react';

const NAV = [
  {
    group: 'MAIN',
    items: [
      { label: 'Dashboard',           icon: LayoutDashboard, href: '/dashboard'   },
    ],
  },
  {
    group: 'PATIENT & CLIENT',
    items: [
      { label: 'Clients',             icon: Users,           href: '/clients'     },
      { label: 'Patients',            icon: PawPrint,        href: '/patients'    },
      { label: 'Appointments',        icon: CalendarDays,    href: '/appointment' },
      { label: 'Queue / Walk-in',     icon: ListOrdered,     href: '/queue'       },
    ],
  },
  {
    group: 'CLINICAL',
    items: [
      { label: 'EMR / Medical Record',icon: FileText,        href: '/emr'         },
      { label: 'OPD',                 icon: Stethoscope,     href: '/emr'         },
      { label: 'IPD / ICU',           icon: BedDouble,       href: '/ipd'         },
      { label: 'Surgery',             icon: Scissors,        href: '/treatment'   },
      { label: 'Imaging',             icon: ScanLine,        href: '/imaging'     },
      { label: 'Lab / LIS',           icon: FlaskConical,    href: '/lab'         },
    ],
  },
  {
    group: 'PHARMACY & INVENTORY',
    items: [
      { label: 'Pharmacy',            icon: Pill,            href: '/pharmacy'    },
      { label: 'Inventory / Stock',   icon: Package,         href: '/inventory'   },
    ],
  },
  {
    group: 'BILLING & CRM',
    items: [
      { label: 'Billing / Cashier',   icon: CreditCard,      href: '/billing'     },
      { label: 'CRM / Marketing',     icon: Megaphone,       href: '#'            },
    ],
  },
  {
    group: 'MANAGEMENT',
    items: [
      { label: 'Reports / Dashboard', icon: BarChart2,       href: '/report'      },
      { label: 'HR / Staff',          icon: UserCog,         href: '#'            },
      { label: 'Settings',            icon: Settings,        href: '#'            },
    ],
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  return (
    <div
      className={`${collapsed ? 'w-[60px]' : 'w-[220px]'} h-screen bg-white border-r border-[#e3edf3] flex flex-col shrink-0 transition-all duration-200 overflow-hidden`}
    >
      {/* Logo */}
      <div className="h-[56px] flex items-center gap-2.5 px-3.5 border-b border-[#e3edf3] shrink-0">
        <div className="w-8 h-8 bg-[#2563eb] rounded-lg flex items-center justify-center shrink-0">
          <PawPrint size={15} color="white" strokeWidth={2.5} />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <div className="text-[12px] font-black text-[#102a43] leading-tight truncate">Vet Management</div>
            <div className="text-[9px] text-[#9ab0bc] leading-tight truncate">Veterinary Hospital System</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2">
        {NAV.map((section, si) => (
          <div key={si} className={si > 0 ? 'mt-0.5' : ''}>
            {!collapsed && (
              <div className="px-4 pt-2.5 pb-1 text-[9px] font-bold text-[#b0c4ce] uppercase tracking-widest">
                {section.group}
              </div>
            )}
            {section.items.map(({ label, icon: Icon, href }) => {
              const active = href !== '#' && router.pathname === href;
              return (
                <Link
                  key={label}
                  href={href}
                  title={collapsed ? label : undefined}
                  className={`flex items-center gap-2.5 mx-2 px-2.5 py-[7px] rounded-lg text-[12px] font-semibold transition-colors no-underline mb-0.5 ${
                    active
                      ? 'bg-[#eff6ff] text-[#2563eb]'
                      : 'text-[#64748b] hover:bg-[#f8fafc] hover:text-[#334155]'
                  }`}
                >
                  <Icon
                    size={15}
                    strokeWidth={2}
                    className={`shrink-0 ${active ? 'text-[#2563eb]' : 'text-[#94a3b8]'}`}
                  />
                  {!collapsed && <span className="truncate">{label}</span>}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(c => !c)}
        className="flex items-center gap-2 px-4 py-3 border-t border-[#e3edf3] text-[#9ab0bc] hover:text-[#64748b] transition-colors text-[11px] font-bold cursor-pointer w-full"
      >
        {collapsed
          ? <ChevronRight size={14} />
          : <><ChevronLeft size={14} /><span>Collapse</span></>
        }
      </button>
    </div>
  );
}
