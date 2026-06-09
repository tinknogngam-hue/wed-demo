import {
  Heart, Plus, Stethoscope, ListOrdered, PawPrint,
  LayoutDashboard, CalendarDays, BedDouble, LogOut,
} from 'lucide-react';

export default function Navbar() {
  return (
    <header className="bg-gradient-to-r from-nav to-[#04293a] text-white px-6 flex items-center h-16 shrink-0">

      {/* Brand Section */}
      <div className="flex gap-3 items-center pr-6 border-r border-white/12 mr-4">
        <div className="w-9 h-9 rounded-xl border-2 border-white/75 grid place-items-center">
          <Heart size={18} />
        </div>
        <div>
          <h1 className="text-lg m-0 leading-none">PETCARE</h1>
          <p className="m-0 mt-0.5 text-[#bdd9e2] text-[11px]">Animal Hospital</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex items-center gap-1.5 flex-1 overflow-x-auto hide-scrollbar">
        {/* Active Menu */}
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-gradient-to-r from-primary to-primary2 text-white shadow-[0_4px_12px_rgba(0,0,0,0.12)] text-[13px] font-bold cursor-pointer whitespace-nowrap">
          <Plus size={14} className="shrink-0" /> Register
        </div>

        {/* Inactive Menu */}
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-[#d8eef4] hover:bg-white/10 text-[13px] font-bold cursor-pointer whitespace-nowrap transition-colors">
          <Stethoscope size={14} className="shrink-0" /> OPD / EMR
        </div>

        {/* Static Links */}
        <div className="flex items-center gap-2 px-3.5 py-2 text-[#d8eef4]/78 text-[13px] font-bold cursor-default whitespace-nowrap"><LayoutDashboard size={14} className="shrink-0" /> Dashboard</div>
        <div className="flex items-center gap-2 px-3.5 py-2 text-[#d8eef4]/78 text-[13px] font-bold cursor-default whitespace-nowrap"><CalendarDays size={14} className="shrink-0" /> Appointment</div>
        <div className="flex items-center gap-2 px-3.5 py-2 text-[#d8eef4]/78 text-[13px] font-bold cursor-default whitespace-nowrap"><ListOrdered size={14} className="shrink-0" /> Queue / Flow</div>
        <div className="flex items-center gap-2 px-3.5 py-2 text-[#d8eef4]/78 text-[13px] font-bold cursor-default whitespace-nowrap"><PawPrint size={14} className="shrink-0" /> Patient Chart</div>
        <div className="flex items-center gap-2 px-3.5 py-2 text-[#d8eef4]/78 text-[13px] font-bold cursor-default whitespace-nowrap"><BedDouble size={14} className="shrink-0" /> IPD / ICU</div>
      </nav>

      {/* Right Menu */}
      <div className="flex gap-4 items-center text-[#cfe4eb] text-[13px] ml-4 border-l border-white/12 pl-4 whitespace-nowrap">
        <span className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors"><LogOut size={14} /> Log out</span>
      </div>

    </header>
  );
}
