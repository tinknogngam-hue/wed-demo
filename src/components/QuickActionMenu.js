import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import {
  LayoutDashboard, UserPlus, Activity, ListOrdered, CalendarDays,
  Stethoscope, Syringe, DoorOpen, Bell, BedDouble,
  Pill, FlaskConical, ScanLine, CreditCard, BarChart2,
  Search, X, Package, Users, PawPrint, UserCog, Wallet, Dog,
} from 'lucide-react';

export const ALL_ACTIONS = [
  { label: 'Dashboard',            icon: LayoutDashboard, href: '/dashboard',   group: 'Main',       hotkey: 'Alt+H', desc: 'Overview & KPIs'          },
  { label: 'Clients',              icon: Users,           href: '/clients',     group: 'Main',       hotkey: 'Alt+K', desc: 'Client records'            },
  { label: 'Patients',             icon: PawPrint,        href: '/patients',    group: 'Main',       hotkey: 'Alt+S', desc: 'Patient records'           },
  { label: 'Register / Walk-in',   icon: UserPlus,        href: '/register',    group: 'Main',       hotkey: 'Alt+R', desc: 'New patient intake'        },
  { label: 'Triage',               icon: Activity,        href: '/triage',      group: 'Main',       hotkey: 'Alt+T', desc: 'Patient screening'          },
  { label: 'Animal Queue',         icon: PawPrint,        href: '/queue',        group: 'Main',       hotkey: 'Alt+Q', desc: 'Animal-centric queue board' },
  { label: 'Doctor Queue',         icon: Dog,             href: '/queue-doctor', group: 'Main',       hotkey: 'Alt+D', desc: 'Doctor schedule grid'       },
  { label: 'Appointment',          icon: CalendarDays,    href: '/appointment', group: 'Main',       hotkey: 'Alt+A', desc: 'Schedule visits'            },
  { label: 'OPD / EMR',            icon: Stethoscope,     href: '/emr',         group: 'Clinical',   hotkey: 'Alt+M', desc: 'Medical records'            },
  { label: 'Treatment / Procedure',icon: Syringe,         href: '/treatment',   group: 'Clinical',   hotkey: 'Alt+X', desc: 'Treatments & procedures'   },
  { label: 'Discharge',            icon: DoorOpen,        href: '/discharge',   group: 'Clinical',   hotkey: 'Alt+C', desc: 'Patient discharge'          },
  { label: 'Follow-up',            icon: Bell,            href: '/followup',    group: 'Clinical',   hotkey: 'Alt+U', desc: 'Scheduled follow-ups'      },
  { label: 'IPD / ICU',            icon: BedDouble,       href: '/ipd',         group: 'Clinical',   hotkey: 'Alt+I', desc: 'Inpatient department'      },
  { label: 'Pharmacy',             icon: Pill,            href: '/pharmacy',    group: 'Operations', hotkey: 'Alt+P', desc: 'Drug dispensing'            },
  { label: 'Laboratory',           icon: FlaskConical,    href: '/lab',         group: 'Operations', hotkey: 'Alt+L', desc: 'Lab tests & results'       },
  { label: 'Imaging',              icon: ScanLine,        href: '/imaging',     group: 'Operations', hotkey: 'Alt+G', desc: 'Radiology & scans'         },
  { label: 'Billing',              icon: CreditCard,      href: '/billing',     group: 'Operations', hotkey: 'Alt+B', desc: 'Invoicing & payments'      },
  { label: 'Inventory',            icon: Package,         href: '/inventory',   group: 'Operations', hotkey: 'Alt+N', desc: 'Stock & supplies'          },
  { label: 'Reports & Dashboard',  icon: BarChart2,       href: '/report',      group: 'Reports',    hotkey: 'Alt+O', desc: 'Analytics & reports'       },
  { label: 'HR & User Management', icon: UserCog,         href: '/hr',          group: 'Admin',      hotkey: 'Alt+Y', desc: 'Users, roles & attendance' },
  { label: 'Finance & Accounting', icon: Wallet,          href: '/finance',     group: 'Admin',      hotkey: 'Alt+Z', desc: 'Revenue, AR/AP & packages' },
];

export default function QuickActionMenu({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const router = useRouter();
  const inputRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveIdx(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  const filtered = query.trim()
    ? ALL_ACTIONS.filter(a =>
        a.label.toLowerCase().includes(query.toLowerCase()) ||
        a.group.toLowerCase().includes(query.toLowerCase()) ||
        a.desc.toLowerCase().includes(query.toLowerCase())
      )
    : ALL_ACTIONS;

  useEffect(() => { setActiveIdx(0); }, [query]);

  useEffect(() => {
    itemRefs.current[activeIdx]?.scrollIntoView({ block: 'nearest' });
  }, [activeIdx]);

  const navigate = useCallback((href) => {
    router.push(href);
    onClose();
  }, [router, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, filtered.length - 1)); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, 0)); }
      if (e.key === 'Enter' && filtered[activeIdx]) navigate(filtered[activeIdx].href);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, filtered, activeIdx, navigate, onClose]);

  if (!isOpen) return null;

  // Build flat render list with optional group headers
  const renderRows = [];
  let lastGroup = null;
  filtered.forEach((item, idx) => {
    if (!query.trim() && item.group !== lastGroup) {
      renderRows.push({ type: 'header', label: item.group, key: `h-${item.group}` });
      lastGroup = item.group;
    }
    renderRows.push({ type: 'item', item, flatIdx: idx });
  });

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center pt-[12vh]"
      onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#04293a]/60 backdrop-blur-sm" />

      {/* Panel */}
      <div className="relative w-full max-w-[580px] mx-4 bg-white rounded-2xl shadow-[0_32px_80px_rgba(4,41,58,0.28)] overflow-hidden flex flex-col max-h-[65vh]">

        {/* Search bar */}
        <div className="flex items-center gap-3 px-5 h-[56px] border-b border-[#e8f0f5] shrink-0">
          <Search size={17} className="text-[#64788a] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search pages and actions..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-[14px] text-[#102a43] placeholder-[#9ab0bc] outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-[#f0f5f8] rounded-lg transition-colors shrink-0 cursor-pointer"
          >
            <X size={15} className="text-[#9ab0bc]" />
          </button>
        </div>

        {/* Results */}
        <div className="overflow-y-auto py-2 flex-1">
          {filtered.length === 0 ? (
            <div className="px-5 py-10 text-center text-[#9ab0bc] text-[13px]">
              No results for &ldquo;{query}&rdquo;
            </div>
          ) : (
            <div className="px-2">
              {renderRows.map(row => {
                if (row.type === 'header') {
                  return (
                    <div key={row.key} className="px-3 pt-3 pb-1 text-[10px] font-bold text-[#9ab0bc] uppercase tracking-[0.1em]">
                      {row.label}
                    </div>
                  );
                }
                const { item, flatIdx } = row;
                const Icon = item.icon;
                const isActive = flatIdx === activeIdx;
                return (
                  <button
                    key={item.href}
                    ref={el => { itemRefs.current[flatIdx] = el; }}
                    onClick={() => navigate(item.href)}
                    onMouseEnter={() => setActiveIdx(flatIdx)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left cursor-pointer transition-colors ${
                      isActive ? 'bg-[#e9f7f4]' : 'hover:bg-[#f6f9fb]'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isActive ? 'bg-[#0f8f83]/15' : 'bg-[#f0f5f8]'
                    }`}>
                      <Icon size={15} className={isActive ? 'text-[#0f8f83]' : 'text-[#64788a]'} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-[13px] font-semibold leading-tight ${isActive ? 'text-[#0f8f83]' : 'text-[#102a43]'}`}>
                        {item.label}
                      </div>
                      <div className="text-[11px] text-[#9ab0bc] leading-tight mt-0.5">{item.desc}</div>
                    </div>
                    <kbd className={`text-[10px] font-mono px-2 py-0.5 rounded-md shrink-0 border transition-colors ${
                      isActive
                        ? 'bg-[#0f8f83]/10 text-[#0f8f83] border-[#0f8f83]/20'
                        : 'bg-[#f0f5f8] text-[#9ab0bc] border-[#e8f0f5]'
                    }`}>
                      {item.hotkey}
                    </kbd>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[#e8f0f5] px-5 h-[38px] flex items-center gap-5 shrink-0">
          {[['↑↓', 'Navigate'], ['↵', 'Go'], ['Esc', 'Close']].map(([key, label]) => (
            <span key={key} className="flex items-center gap-1.5 text-[11px] text-[#9ab0bc]">
              <kbd className="font-mono text-[10px] bg-[#f0f5f8] border border-[#e8f0f5] px-1.5 py-0.5 rounded">
                {key}
              </kbd>
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
