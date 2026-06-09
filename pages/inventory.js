import React from 'react';
import { Search, Package, Download, RefreshCw, Plus, AlertTriangle, TrendingDown, Truck, FileText } from 'lucide-react';

export default function InventoryPage() {
  return (
    <div className="h-full flex flex-col">
      {/* Topbar ของหน้า Inventory */}
      <div className="grid grid-cols-[1fr_500px_270px] gap-[18px] items-center mb-3.5 shrink-0">
        <div>
          <h2 className="m-0 text-[28px] font-bold text-[#102a43]">Inventory & Stock</h2>
          <p className="m-0 mt-1 text-[#64788a] text-sm">ระบบจัดการคลังยา วัคซีน อาหารสัตว์ และเวชภัณฑ์</p>
        </div>
        <div className="bg-white border border-[#e3edf3] rounded-2xl p-[13px_16px] text-[#7a8fa0] shadow-[0_14px_35px_rgba(16,42,67,.07)] text-sm flex items-center gap-2">
          <Search size={14} className="shrink-0" /> Search SKU / item name / lot no. / category...
        </div>
        <div className="flex items-center justify-end gap-3">
          <div className="text-right text-sm">
            <b className="text-[#102a43]">นาย สต๊อก รักษาดี</b><br />
            <small className="text-[#64788a]">Inventory Manager</small>
          </div>
          <div className="w-[42px] h-[42px] rounded-full bg-[#f4fbff] grid place-items-center">
            <Package size={20} className="text-[#0f8f83]" />
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-3.5 shrink-0">
        <div className="text-[13px] text-[#64788a]">Home › Inventory › Stock Overview</div>
        <div className="flex gap-2.5">
          <button className="border border-[#e3edf3] rounded-xl px-[15px] py-[10px] font-[850] cursor-pointer text-sm bg-white text-[#35546a] hover:bg-[#f6f9fb] flex items-center gap-2">
            <Download size={14} /> Export CSV
          </button>
          <button className="border border-[#e3edf3] rounded-xl px-[15px] py-[10px] font-[850] cursor-pointer text-sm bg-white text-[#35546a] hover:bg-[#f6f9fb] flex items-center gap-2">
            <RefreshCw size={14} /> Stock Count / Audit
          </button>
          <button className="border-0 rounded-xl px-[15px] py-[10px] font-[850] cursor-pointer text-sm bg-gradient-to-r from-[#0f8f83] to-[#0b6d87] text-white shadow-sm hover:opacity-90 flex items-center gap-2">
            <Plus size={14} /> Add / Receive Stock
          </button>
        </div>
      </div>

      {/* พื้นที่หลัก (ซ้าย: Stock Table | ขวา: Dashboard & Alerts) */}
      <div className="grid grid-cols-[minmax(850px,1fr)_390px] gap-[18px] flex-1 min-h-0 overflow-hidden">
        
        {/* กล่องซ้าย: Inventory Item List */}
        <div className="bg-white border border-[#e3edf3] rounded-[18px] shadow-[0_14px_35px_rgba(16,42,67,.07)] flex flex-col overflow-hidden">
          
          {/* Filters & Tabs */}
          <div className="p-[16px_24px] border-b border-[#e3edf3] bg-[#fbfdfe] flex items-center justify-between shrink-0">
            <div className="flex gap-1 bg-[#f2f6f8] p-1 rounded-xl text-[13px]">
              <button className="px-4 py-2 rounded-lg bg-white text-[#0f8f83] font-[850] shadow-sm cursor-pointer border-0">All Items</button>
              <button className="px-4 py-2 rounded-lg text-[#64788a] font-[850] cursor-pointer hover:bg-white/50 border-0 bg-transparent">Medication</button>
              <button className="px-4 py-2 rounded-lg text-[#64788a] font-[850] cursor-pointer hover:bg-white/50 border-0 bg-transparent">Vaccines</button>
              <button className="px-4 py-2 rounded-lg text-[#64788a] font-[850] cursor-pointer hover:bg-white/50 border-0 bg-transparent">Pet Food</button>
            </div>
            <div className="flex gap-2">
              <select className="border border-[#e3edf3] rounded-lg px-3 py-1.5 text-sm bg-white outline-none text-[#35546a] font-bold">
                <option>Sort: A-Z</option>
                <option>Stock: Low to High</option>
                <option>Expiry: Soonest</option>
              </select>
            </div>
          </div>

          {/* Data Table */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-[#fbfdfe] shadow-sm z-10">
                <tr className="text-[12px] text-[#64788a]">
                  <th className="py-3 px-6 font-bold border-b border-[#e3edf3]">SKU / Item Name</th>
                  <th className="py-3 px-6 font-bold border-b border-[#e3edf3]">Category</th>
                  <th className="py-3 px-6 font-bold border-b border-[#e3edf3] text-right">On Hand</th>
                  <th className="py-3 px-6 font-bold border-b border-[#e3edf3]">Lot & Expiry</th>
                  <th className="py-3 px-6 font-bold border-b border-[#e3edf3] text-center">Status</th>
                  <th className="py-3 px-6 font-bold border-b border-[#e3edf3] w-[50px]"></th>
                </tr>
              </thead>
              <tbody className="text-[13px] text-[#102a43]">
                {/* Item 1: Normal */}
                <tr className="border-b border-[#e3edf3] hover:bg-[#f6f9fb] transition-colors">
                  <td className="py-4 px-6">
                    <span className="text-[11px] text-[#64788a] block mb-0.5">MED-0012</span>
                    <b className="text-[14px]">NexGard Spectra (M)</b>
                  </td>
                  <td className="py-4 px-6 text-[#64788a]">Medication / Preventative</td>
                  <td className="py-4 px-6 text-right">
                    <b className="text-[15px]">45</b> <span className="text-[#64788a] text-[11px]">Box</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="block text-[#35546a] font-bold">Lot: L2024-X</span>
                    <span className="text-[11px] text-[#64788a]">Exp: 10/2026</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="px-3 py-1 bg-[#e8f7f1] text-[#0f8d62] rounded-full text-[11px] font-bold">In Stock</span>
                  </td>
                  <td className="py-4 px-6 text-center text-[#a0b2c3] cursor-pointer hover:text-[#102a43]">⋮</td>
                </tr>

                {/* Item 2: Low Stock Alert */}
                <tr className="border-b border-[#e3edf3] bg-[#fffcf8] hover:bg-[#fff9f0] transition-colors">
                  <td className="py-4 px-6">
                    <span className="text-[11px] text-[#64788a] block mb-0.5">MED-0084</span>
                    <b className="text-[14px]">Lactated Ringer's (LRS) 500ml</b>
                  </td>
                  <td className="py-4 px-6 text-[#64788a]">Fluid / Supplies</td>
                  <td className="py-4 px-6 text-right">
                    <b className="text-[15px] text-[#e95050]">5</b> <span className="text-[#64788a] text-[11px]">Bag</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="block text-[#35546a] font-bold">Lot: R552-A</span>
                    <span className="text-[11px] text-[#64788a]">Exp: 12/2025</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="px-3 py-1 bg-[#fff0f0] text-[#e95050] rounded-full text-[11px] font-bold">Low Stock</span>
                  </td>
                  <td className="py-4 px-6 text-center text-[#a0b2c3] cursor-pointer hover:text-[#102a43]">⋮</td>
                </tr>

                {/* Item 3: Expiring Soon */}
                <tr className="border-b border-[#e3edf3] hover:bg-[#f6f9fb] transition-colors">
                  <td className="py-4 px-6">
                    <span className="text-[11px] text-[#64788a] block mb-0.5">VAC-0005</span>
                    <b className="text-[14px]">Rabies Vaccine (Defensor 3)</b>
                  </td>
                  <td className="py-4 px-6 text-[#64788a]">Vaccines / Biologicals</td>
                  <td className="py-4 px-6 text-right">
                    <b className="text-[15px]">120</b> <span className="text-[#64788a] text-[11px]">Vial</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="block text-[#35546a] font-bold">Lot: V998-1</span>
                    <span className="text-[11px] text-[#b86b00] font-bold">Exp: 15/07/2026</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="px-3 py-1 bg-[#fff4e2] text-[#b86b00] rounded-full text-[11px] font-bold">Expiring Soon</span>
                  </td>
                  <td className="py-4 px-6 text-center text-[#a0b2c3] cursor-pointer hover:text-[#102a43]">⋮</td>
                </tr>

                {/* Item 4: Out of Stock */}
                <tr className="border-b border-[#e3edf3] opacity-60 hover:opacity-100 transition-opacity">
                  <td className="py-4 px-6">
                    <span className="text-[11px] text-[#64788a] block mb-0.5">FOOD-0021</span>
                    <b className="text-[14px]">Royal Canin Gastrointestinal 2kg</b>
                  </td>
                  <td className="py-4 px-6 text-[#64788a]">Pet Food / Diet</td>
                  <td className="py-4 px-6 text-right">
                    <b className="text-[15px]">0</b> <span className="text-[#64788a] text-[11px]">Bag</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="block text-[#64788a]">-</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="px-3 py-1 bg-[#f2f6f8] text-[#64788a] rounded-full text-[11px] font-bold">Out of Stock</span>
                  </td>
                  <td className="py-4 px-6 text-center text-[#a0b2c3] cursor-pointer hover:text-[#102a43]">⋮</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center p-[14px_24px] border-t border-[#e3edf3] bg-[#fbfdfe] shrink-0 text-sm text-[#64788a]">
            <span>Showing 1 to 4 of 1,245 items</span>
            <div className="flex gap-1">
              <button className="border border-[#e3edf3] bg-white px-3 py-1.5 rounded-lg hover:bg-[#f6f9fb]">Prev</button>
              <button className="border border-[#0f8f83] bg-[#0f8f83] text-white px-3 py-1.5 rounded-lg">1</button>
              <button className="border border-[#e3edf3] bg-white px-3 py-1.5 rounded-lg hover:bg-[#f6f9fb]">2</button>
              <button className="border border-[#e3edf3] bg-white px-3 py-1.5 rounded-lg hover:bg-[#f6f9fb]">3</button>
              <button className="border border-[#e3edf3] bg-white px-3 py-1.5 rounded-lg hover:bg-[#f6f9fb]">Next</button>
            </div>
          </div>
        </div>

        {/* กล่องขวา: Inventory Dashboard & Alerts */}
        <aside className="flex flex-col gap-[18px] overflow-auto">
          
          {/* Quick Stats */}
          <div className="bg-white border border-[#e3edf3] rounded-[18px] shadow-[0_14px_35px_rgba(16,42,67,.07)] p-5">
            <h3 className="m-0 mb-4 text-[16px] font-bold text-[#102a43]">Inventory Summary</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-[#e3edf3] rounded-xl p-3 bg-[#fbfdfe]">
                <small className="block text-[#64788a] text-[11px] font-bold mb-1">Total Items</small>
                <b className="text-[22px] text-[#102a43]">1,245</b>
              </div>
              <div className="border border-[#e3edf3] rounded-xl p-3 bg-[#fbfdfe]">
                <small className="block text-[#64788a] text-[11px] font-bold mb-1">Low Stock</small>
                <div className="flex items-baseline gap-2">
                  <b className="text-[22px] text-[#e95050]">18</b>
                  <span className="text-[11px] text-[#e95050] bg-[#fff0f0] px-1.5 rounded">Action Req.</span>
                </div>
              </div>
              <div className="col-span-2 border border-[#e3edf3] rounded-xl p-3 bg-gradient-to-r from-[#0f8f83] to-[#0b6d87] text-white">
                <small className="block text-white/80 text-[11px] font-bold mb-1">Total Inventory Value (COGS)</small>
                <b className="text-[22px]">฿ 452,300.00</b>
              </div>
            </div>
          </div>

          {/* Action Required / Alerts */}
          <div className="bg-white border border-[#e3edf3] rounded-[18px] shadow-[0_14px_35px_rgba(16,42,67,.07)] p-5 flex-1">
            <div className="flex justify-between items-center mb-4">
              <h3 className="m-0 text-[16px] font-bold text-[#102a43] flex items-center gap-2">Action Required <AlertTriangle size={16} className="text-[#e95050]" /></h3>
              <a href="#" className="text-[12px] text-[#0f8f83] font-bold no-underline">View All</a>
            </div>
            
            <div className="space-y-3">
              {/* Alert 1 */}
              <div className="p-3 border border-[#fcd5d5] bg-[#fff0f0] rounded-xl flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded-full bg-white text-[#e95050] flex items-center justify-center"><TrendingDown size={16} /></div>
                  <div>
                    <b className="text-[13px] text-[#e95050] block">Below Reorder Point</b>
                    <span className="text-[11px] text-[#64788a]">Lactated Ringer's (LRS) 500ml</span>
                  </div>
                </div>
                <button className="bg-[#e95050] text-white text-[11px] px-3 py-1.5 rounded-lg font-bold hover:bg-[#d63f3f]">
                  Reorder
                </button>
              </div>

              {/* Alert 2 */}
              <div className="p-3 border border-[#f3dcaa] bg-[#fff8ea] rounded-xl flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded-full bg-white text-[#b86b00] flex items-center justify-center font-bold text-sm">⏳</div>
                  <div>
                    <b className="text-[13px] text-[#b86b00] block">Expiring in 30 Days</b>
                    <span className="text-[11px] text-[#64788a]">Rabies Vaccine (Defensor 3)</span>
                  </div>
                </div>
                <button className="bg-[#b86b00] text-white text-[11px] px-3 py-1.5 rounded-lg font-bold hover:bg-[#965700]">
                  Review
                </button>
              </div>
            </div>

            {/* Quick Add Section */}
            <div className="mt-6 pt-5 border-t border-[#e3edf3]">
              <h3 className="m-0 mb-3 text-[14px] font-bold text-[#102a43]">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                <button className="border border-[#e3edf3] rounded-xl p-3 text-[12px] font-[850] text-[#35546a] hover:bg-[#f6f9fb] text-left">
                  <Truck size={16} className="block mb-1 text-[#0f8f83]" /> Receive PO
                </button>
                <button className="border border-[#e3edf3] rounded-xl p-3 text-[12px] font-[850] text-[#35546a] hover:bg-[#f6f9fb] text-left">
                  <RefreshCw size={16} className="block mb-1 text-[#0f8f83]" /> Transfer Stock
                </button>
                <button className="col-span-2 border border-[#e3edf3] rounded-xl p-3 text-[12px] font-[850] text-[#35546a] hover:bg-[#f6f9fb] text-left flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText size={14} className="text-[#0f8f83]" /> Adjust Stock (Spoilage/Loss)
                  </div>
                  <span className="text-[#a0b2c3] text-lg">→</span>
                </button>
              </div>
            </div>
            
          </div>
        </aside>

      </div>
    </div>
  );
}