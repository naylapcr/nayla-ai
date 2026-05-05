import React from 'react';
import { 
  FaArrowUp, FaArrowDown, FaSearch, FaBell,
  FaRegCalendarAlt, FaDownload, FaEye, FaChevronDown 
} from "react-icons/fa";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Sales", val: "12,485", trend: "+3.1%", isUp: true },
    { label: "Total Revenue", val: "$68,760", trend: "+2.4%", isUp: true },
    { label: "Active Customers", val: "4,220", trend: "+2.4%", isUp: true },
    { label: "Refund Request", val: "250", trend: "-0.6%", isUp: false },
  ];

  const orders = [
    { id: "#11852", product: "Black Solid T-Shirt", customer: "Nowshad Khan", date: "25 Dec 2025", amount: "$300.00", status: "In Progress" },
    { id: "#11878", product: "Men's Sneakers", customer: "Khalid Rahman", date: "25 Dec 2025", amount: "$500.00", status: "In Progress" },
    { id: "#11868", product: "Men's Jogger", customer: "Ashraf Ali", date: "24 Dec 2025", amount: "$200.00", status: "Pending" },
  ];

  return (
    <div className="p-6 bg-[#F9FAFB] min-h-screen font-sans">
      
      {/* 1. TOP BAR - FILTER CATEGORY (Sesuai Referensi) */}
      <div className="flex justify-between items-center mb-10">
        <div className="flex bg-white rounded-full p-1 shadow-sm border border-gray-100 items-center">
          <span className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-r border-gray-100 mr-1">Filter</span>
          <button className="px-6 py-2 bg-[#6366f1] text-white rounded-full text-sm font-bold shadow-lg shadow-indigo-100">All Data</button>
          <button className="px-6 py-2 text-gray-500 text-sm font-medium hover:text-[#6366f1]">Fashion</button>
          <button className="px-6 py-2 text-gray-500 text-sm font-medium hover:text-[#6366f1]">Beauty</button>
          <button className="px-6 py-2 text-gray-500 text-sm font-medium hover:text-[#6366f1]">Accessories</button>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative w-11 h-11 bg-white rounded-full border border-gray-100 shadow-sm text-gray-400 flex items-center justify-center">
            <FaBell size={18} />
            <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="flex items-center gap-3 bg-white pr-4 pl-1 py-1 rounded-full border border-gray-100 shadow-sm">
            <img src="https://ui-avatars.com/api/?name=Jon+Snow&background=6366f1&color=fff" className="w-9 h-9 rounded-full" alt="profile" />
            <div className="hidden md:block">
              <p className="text-xs font-bold text-gray-900 leading-none">Nayla</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Super Admin</p>
            </div>
            <FaChevronDown className="text-gray-400 text-[10px] ml-1" />
          </div>
        </div>
      </div>

      {/* 2. WELCOME HEADER */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Welcome, Nayla 👋</h1>
          <p className="text-gray-400 text-sm mt-1">Manage products, orders, and performance in one place.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-2xl border border-gray-100 text-xs font-bold text-gray-600 shadow-sm">
            <FaRegCalendarAlt className="text-gray-400" /> 12 Sept - 20 Sept <FaChevronDown size={10} />
          </button>
          <button className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-2xl border border-gray-100 text-xs font-bold text-gray-600 shadow-sm">
            <FaDownload className="text-gray-400" /> Export Report
          </button>
        </div>
      </div>

      {/* 3. MAIN GRID (Stats, Profit, Success Rate) */}
      <div className="grid grid-cols-12 gap-6 mb-8">
        {/* STATS CARDS (4 cards) */}
        <div className="col-span-12 lg:col-span-4 grid grid-cols-2 gap-4">
          {stats.map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{item.label}</span>
                <div className="p-2 bg-gray-50 rounded-xl text-gray-400 text-[10px]"><FaArrowUp className="rotate-45" /></div>
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-2">{item.val}</h2>
              <div className={`text-[10px] font-black ${item.isUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                {item.isUp ? '▲' : '▼'} {item.trend} <span className="text-gray-400 font-medium ml-1">vs Last Week</span>
              </div>
            </div>
          ))}
        </div>

        {/* TOTAL PROFIT CHART - BLOOM STYLE */}
<div className="col-span-12 lg:col-span-5 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm relative">
  <div className="flex justify-between items-start mb-2">
    <h3 className="text-lg font-bold text-gray-900">Total Profit</h3>
    <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 cursor-pointer">
      Last 7 days <FaChevronDown size={8} />
    </div>
  </div>

  <div className="flex items-center gap-3 mb-6">
    <h2 className="text-4xl font-black text-gray-900">$230,760</h2>
    <span className="bg-[#00ca82] text-white text-[10px] font-black px-2 py-1 rounded-lg flex items-center gap-1">
      +8.4% <FaArrowUp size={8} className="rotate-45" />
    </span>
  </div>

  {/* Legenda Chart */}
  <div className="flex justify-end gap-4 mb-6 text-[10px] font-bold uppercase tracking-wider">
    <div className="flex items-center gap-2 text-gray-400">
      <span className="w-2 h-2 rounded-full bg-sky-400"></span> Total Sales
    </div>
    <div className="flex items-center gap-2 text-gray-400">
      <span className="w-2 h-2 rounded-full bg-[#6366f1]"></span> Total Revenue
    </div>
  </div>

  {/* Area Grafik */}
  <div className="relative h-48 w-full group">
    {/* Garis Horizontal Background (Y-Axis) */}
    <div className="absolute inset-0 flex flex-col justify-between text-[10px] font-bold text-gray-300">
      <span className="border-b border-gray-50 pb-1">100K</span>
      <span className="border-b border-gray-50 pb-1">80K</span>
      <span className="border-b border-gray-50 pb-1">60K</span>
      <span className="border-b border-gray-50 pb-1">40K</span>
      <span className="border-b border-gray-50 pb-1">20K</span>
      <span>0K</span>
    </div>

    {/* Batang Grafik (Double Bar) */}
    <div className="absolute inset-0 flex items-end justify-between px-2 gap-2">
      {[
        { s: 60, r: 55 }, { s: 75, r: 95 }, { s: 50, r: 45 }, 
        { s: 65, r: 60 }, { s: 70, r: 80 }, { s: 55, r: 65 }, { s: 45, r: 40 }
      ].map((data, i) => (
        <div key={i} className="flex-1 flex flex-col items-center group/bar relative h-full justify-end">
          
          {/* Tooltip pas di hover (Mirip di gambar) */}
          <div className="absolute -top-4 opacity-0 group-hover/bar:opacity-100 transition-opacity bg-white shadow-xl border border-gray-100 p-2 rounded-xl z-10 w-20 text-center pointer-events-none">
             <p className="text-[8px] text-gray-400 font-bold">25 Dec, 2025</p>
             <p className="text-[10px] font-black text-indigo-600">${data.r * 1000}</p>
          </div>

          <div className="flex items-end gap-1 w-full h-full pb-1">
            {/* Sales Bar (Light Blue) */}
            <div 
              className="flex-1 bg-sky-200 rounded-t-sm transition-all duration-1000 group-hover/bar:bg-sky-400" 
              style={{ height: `${data.s}%` }}
            ></div>
            {/* Revenue Bar (Indigo) */}
            <div 
              className={`flex-1 rounded-t-sm transition-all duration-1000 ${i === 1 ? 'bg-[#6366f1]' : 'bg-indigo-100'} group-hover/bar:bg-[#6366f1]`} 
              style={{ height: `${data.r}%` }}
            ></div>
          </div>
          
          {/* Label Hari */}
          <span className="text-[10px] font-bold text-gray-400 mt-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i]}
          </span>
        </div>
      ))}
    </div>
  </div>
</div>

        {/* SUCCESS RATE WIDGET */}
        <div className="col-span-12 lg:col-span-3 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-6 text-center">Success Rate</h3>
          <div className="relative w-full h-32 flex justify-center overflow-hidden">
             {/* Semi Circle */}
             <div className="w-48 h-48 rounded-full border-[18px] border-indigo-50 border-t-[#6366f1] rotate-[135deg]"></div>
             <div className="absolute top-14 text-center">
                <p className="text-3xl font-black text-gray-900 leading-none">78.6%</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Sales Growth</p>
             </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8 border-t border-gray-50 pt-6">
            <div>
              <p className="text-[9px] text-gray-400 font-black uppercase mb-1">Sales Number</p>
              <div className="flex items-center gap-1 font-black text-sm">2,550 <span className="text-[8px] bg-emerald-500 text-white px-1 rounded">+6.4%</span></div>
            </div>
            <div>
              <p className="text-[9px] text-gray-400 font-black uppercase mb-1">Revenue</p>
              <div className="flex items-center gap-1 font-black text-sm">$68,760 <span className="text-[8px] bg-orange-400 text-white px-1 rounded">+4.4%</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. BOTTOM GRID (Table & Sales Overview) */}
      <div className="grid grid-cols-12 gap-6">
        {/* RECENT ORDERS TABLE */}
        <div className="col-span-12 lg:col-span-8 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-gray-900 text-lg">Recent Orders</h3>
            <div className="flex gap-4 items-center">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
                <input type="text" placeholder="Search" className="pl-9 pr-4 py-2 bg-gray-50 border-none rounded-full text-xs w-48" />
              </div>
              <button className="text-xs font-bold text-gray-500 bg-gray-50 px-4 py-2 rounded-full flex items-center gap-2">Status <FaChevronDown size={8}/></button>
            </div>
          </div>
          <table className="w-full text-left">
            <thead className="text-[10px] text-gray-400 uppercase font-black tracking-widest border-b border-gray-50">
              <tr>
                <th className="pb-4">Order ID</th>
                <th className="pb-4">Products</th>
                <th className="pb-4">Customer</th>
                <th className="pb-4">Amount</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Action</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {orders.map((ord, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-5 font-bold text-gray-900">{ord.id}</td>
                  <td className="py-5 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white">👕</div>
                    <div className="leading-tight"><p className="font-bold text-gray-900">{ord.product}</p><p className="text-[9px] text-gray-400 font-bold">+2 other products</p></div>
                  </td>
                  <td className="py-5 text-gray-600 font-medium">{ord.customer}</td>
                  <td className="py-5 font-black text-gray-900">{ord.amount}</td>
                  <td className="py-5"><span className={`px-3 py-1.5 rounded-xl font-black text-[9px] ${ord.status === 'In Progress' ? 'bg-indigo-50 text-indigo-500' : 'bg-orange-50 text-orange-500'}`}>{ord.status} ▾</span></td>
                  <td className="py-5"><FaEye className="text-gray-300 hover:text-indigo-500 cursor-pointer" size={16} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* SALES OVERVIEW (Widget Kanan Bawah) */}
        <div className="col-span-12 lg:col-span-4 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-gray-900">Sales Overview</h3>
            <span className="text-[10px] font-bold text-gray-400">Last 7 days ▾</span>
          </div>
          <div className="flex justify-between mb-8">
             <div className="text-center"><p className="text-emerald-500 text-[10px] font-bold uppercase mb-1">● Successful</p><h4 className="text-xl font-black">47.05%</h4></div>
             <div className="text-center"><p className="text-orange-400 text-[10px] font-bold uppercase mb-1">● Pending</p><h4 className="text-xl font-black">32.48%</h4></div>
             <div className="text-center"><p className="text-rose-400 text-[10px] font-bold uppercase mb-1">● Cancelled</p><h4 className="text-xl font-black">20.47%</h4></div>
          </div>
          {/* Progress Bars Mockup */}
          <div className="flex gap-2 mb-8">
             <div className="h-24 flex-1 bg-emerald-500 rounded-lg opacity-20"></div>
             <div className="h-24 flex-[0.7] bg-orange-400 rounded-lg opacity-20"></div>
             <div className="h-24 flex-[0.5] bg-rose-400 rounded-lg opacity-20"></div>
          </div>
          <div className="space-y-4">
             <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-400 border-b pb-2">
                <span>Product Name</span><span>Earnings</span>
             </div>
             <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-gray-900 flex items-center gap-2"><div className="w-2 h-2 bg-gray-900 rounded-full"></div> Black Solid T-Shirt</span>
                <span className="font-black">$40,000</span>
             </div>
             <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-gray-900 flex items-center gap-2"><div className="w-2 h-2 bg-gray-400 rounded-full"></div> Men's Jogger</span>
                <span className="font-black">$26,000</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}