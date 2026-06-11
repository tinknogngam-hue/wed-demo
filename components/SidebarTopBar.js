import { Search, Bell, CalendarDays, HelpCircle, ChevronDown, Menu, UserCircle } from 'lucide-react';

export default function SidebarTopBar({ breadcrumbs = [], onOpenQuickAction }) {
  return (
    <div className="h-[56px] bg-white border-b border-[#e3edf3] flex items-center gap-3 px-4 shrink-0">
      <Menu size={18} className="text-[#64788a] cursor-pointer shrink-0" />

      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[13px] shrink-0">
        {breadcrumbs.map((b, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-[#c4d6e0]">›</span>}
            <span className={i < breadcrumbs.length - 1 ? 'text-[#64788a] cursor-pointer hover:text-[#2563eb]' : 'font-semibold text-[#102a43]'}>
              {b}
            </span>
          </span>
        ))}
      </div>

      {/* Search trigger */}
      <button
        onClick={onOpenQuickAction}
        className="flex items-center gap-2 bg-[#f8fafc] border border-[#e3edf3] rounded-lg px-3 h-[34px] text-[12px] text-[#9ab0bc] cursor-pointer hover:border-[#2563eb]/40 transition-colors ml-2 w-[280px] shrink-0"
      >
        <Search size={13} className="shrink-0" />
        <span className="flex-1 text-left truncate">Search patient, client, invoice...</span>
        <kbd className="font-mono text-[10px] bg-white border border-[#e3edf3] px-1.5 py-0.5 rounded shrink-0">⌘K</kbd>
      </button>

      {/* Right icons */}
      <div className="flex items-center gap-3 ml-auto">
        <div className="relative cursor-pointer">
          <Bell size={18} className="text-[#64788a] hover:text-[#2563eb] transition-colors" />
          <span className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] bg-[#ef4444] rounded-full flex items-center justify-center text-[8px] text-white font-black leading-none">
            8
          </span>
        </div>
        <CalendarDays size={18} className="text-[#64788a] hover:text-[#2563eb] cursor-pointer transition-colors" />
        <HelpCircle   size={18} className="text-[#64788a] hover:text-[#2563eb] cursor-pointer transition-colors" />

        {/* User */}
        <div className="flex items-center gap-2 pl-3 ml-1 border-l border-[#e3edf3] cursor-pointer">
          <div className="w-8 h-8 bg-[#dbeafe] rounded-full flex items-center justify-center shrink-0">
            <UserCircle size={22} className="text-[#2563eb]" />
          </div>
          <div className="hidden xl:block">
            <div className="text-[12px] font-bold text-[#102a43] leading-tight whitespace-nowrap">Dr. Natthapon</div>
            <div className="text-[9px] text-[#9ab0bc] leading-tight">Administrator</div>
          </div>
          <ChevronDown size={12} className="text-[#9ab0bc]" />
        </div>
      </div>
    </div>
  );
}
