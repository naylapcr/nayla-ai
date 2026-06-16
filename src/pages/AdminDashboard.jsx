import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaChevronDown,
  FaRegBell,
  FaMagnifyingGlass,
  FaEye,
  FaXmark,
  FaUser,
  FaGear,
  FaRightFromBracket,
  FaBox,
} from "react-icons/fa6";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import CategoryFilter from "../components/dashboard/CategoryFilter";
import StatCard from "../components/dashboard/StatCard";
import ProfitChart from "../components/dashboard/ProfitChart";
import SuccessRateChart from "../components/dashboard/SuccessRateChart";
import SalesOverview from "../components/dashboard/SalesOverview";
import TopProductItem from "../components/dashboard/TopProductItem";
import DateRangePicker from "../components/dashboard/DateRangePicker";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [activeTooltipId, setActiveTooltipId] = useState(null);

  const stats = [
    { label: "Total Sales", val: "12,485", trend: "+3.1%", isUp: true },
    { label: "Total Revenue", val: "$68,760", trend: "+2.4%", isUp: true },
    { label: "Active Customers", val: "4,220", trend: "+2.4%", isUp: true },
    { label: "Refund Request", val: "250", trend: "-0.6%", isUp: false },
  ];

  const orders = [
  {
    id: "#11852",
    product: "Velvet Lip Tint",
    icon: "💄",
    meta: "+2 other products",
    customer: "Wonyoung Jang",
    amount: "Rp145.000",
    status: "In Progress",
    date: "16 June 2026",
    payment: "Credit Card",
  },
  {
    id: "#11878",
    product: "Glow Cushion Foundation",
    icon: "🎨",
    meta: "+1 other product",
    customer: "Somi Enomoto",
    amount: "Rp210.000",
    status: "In Progress",
    date: "15 June 2026",
    payment: "PayPal",
  },
  {
    id: "#11868",
    product: "Ethereal Eyeshadow Palette",
    icon: "👁️",
    meta: "+3 other products",
    customer: "Nayla Ramadhani",
    amount: "Rp320.000",
    status: "Pending",
    date: "14 June 2026",
    payment: "Bank Transfer",
  },
];

  const topProducts = [
    { name: "Black Solid T-Shirt", earnings: 40000 },
    { name: "Men's Jogger", earnings: 26000 },
  ];

  const openOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen font-sans relative">
      <div className="flex-1 p-6 md:p-10 max-w-[1600px] mx-auto space-y-8 w-full overflow-hidden">
        
        {/* TOP BAR */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100/60 pb-4">
          <CategoryFilter />
          <div className="flex items-center gap-4 self-end sm:self-auto">
            <DateRangePicker />
            <button className="w-10 h-10 bg-white rounded-xl border border-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors relative">
              <FaRegBell size={16} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-pink-500 rounded-full"></span>
            </button>

            {/* DROPDOWN PROFIL */}
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-3 bg-white p-1.5 pr-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-all text-left"
              >
                <div className="w-7 h-7 bg-pink-600 rounded-lg flex items-center justify-center text-white text-xs font-black">NB</div>
                
                  
                <FaChevronDown size={10} className={`text-slate-400 transition-transform ${isProfileDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isProfileDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setIsProfileDropdownOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-slate-100 shadow-xl py-1 z-40">
                    <button className="w-full flex items-center gap-2 px-4 py-2 text-xs text-slate-600 hover:bg-slate-50 text-left font-medium"><FaUser size={12} className="text-slate-400" /> Profile Settings</button>
                    <button className="w-full flex items-center gap-2 px-4 py-2 text-xs text-slate-600 hover:bg-slate-50 text-left font-medium"><FaGear size={12} className="text-slate-400" /> Preferences</button>
                    <div className="border-t border-slate-50 my-1"></div>
                    <button onClick={() => navigate("/login")} className="w-full flex items-center gap-2 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 text-left font-bold"><FaRightFromBracket size={12} /> Log Out</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <DashboardHeader />

        {/* BENTO GRID */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 xl:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((item, i) => <StatCard key={i} title={item.label} value={item.val} percentage={item.trend} isPositive={item.isUp} />)}
          </div>
          <div className="col-span-12 md:col-span-7 xl:col-span-5"><ProfitChart /></div>
          <div className="col-span-12 md:col-span-5 xl:col-span-3"><SuccessRateChart /></div>
        </div>

        {/* TABEL ORDERS */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-slate-900">Recent Orders</h3>
              <div className="relative flex-1 max-w-xs">
                <FaMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={12} />
                <input type="text" placeholder="Search..." className="w-full bg-slate-50 pl-9 pr-4 py-2 rounded-xl text-xs font-medium border-0 focus:ring-2 focus:ring-pink-500/20" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <th className="pb-4 pl-2">Order ID</th>
                    <th className="pb-4">Products</th>
                    <th className="pb-4">Customer</th>
                    <th className="pb-4">Amount</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4 pr-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="text-xs divide-y divide-slate-50/50">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/40 transition-colors">
                      <td className="py-4 pl-2 font-bold text-slate-900">{order.id}</td>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{order.icon}</span>
                          <div>
                            <p className="font-bold text-slate-800 leading-tight">{order.product}</p>
                            <span className="text-[10px] text-slate-400 font-medium">{order.meta}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 font-semibold text-slate-600">{order.customer}</td>
                      <td className="py-4 font-bold text-slate-900">{order.amount}</td>
                      <td className="py-4">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${order.status === "In Progress" ? "bg-pink-50 text-pink-600" : "bg-amber-50 text-amber-600"}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 pr-2 text-right">
                        <button onClick={() => openOrderDetails(order)} className="p-2 text-slate-400 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all"><FaEye size={14} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SIDEBAR ANALITIK */}
          <div className="col-span-12 lg:col-span-4 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col gap-6">
            <SalesOverview />
            <div className="space-y-4 pt-4 border-t border-slate-50">
              <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest"><span>Product Name</span><span>Earnings</span></div>
              <div className="space-y-1">{topProducts.map((prod, i) => <TopProductItem key={i} {...prod} />)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {isDialogOpen && selectedOrder && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-[2rem] border border-slate-100 shadow-2xl p-6 relative">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Transaction Details</h3>
                <p className="text-xs text-slate-400 font-medium">Order reference {selectedOrder.id}</p>
              </div>
              <button onClick={() => setIsDialogOpen(false)} className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400"><FaXmark size={16} /></button>
            </div>
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3">
                <span className="text-2xl">{selectedOrder.icon}</span>
                <div>
                  <h5 className="text-xs font-bold text-slate-800">{selectedOrder.product}</h5>
                  <p className="text-[11px] text-slate-400 font-semibold">{selectedOrder.meta}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs pt-2">
                <div><span className="text-slate-400 font-semibold">Customer</span><p className="font-bold text-slate-800 mt-0.5">{selectedOrder.customer}</p></div>
                <div><span className="text-slate-400 font-semibold">Total Amount</span><p className="font-black text-pink-600 mt-0.5 text-sm">{selectedOrder.amount}</p></div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button onClick={() => setIsDialogOpen(false)} className="px-5 py-2.5 bg-pink-500 text-white text-xs font-bold rounded-xl hover:bg-pink-600 transition-all">Close Details</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}