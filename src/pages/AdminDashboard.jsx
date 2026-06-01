import React, { useState } from "react";
import {
  FaChevronDown,
  FaArrowTrendUp,
  FaDollarSign,
  FaRegBell,
  FaMagnifyingGlass,
  FaEye,
  FaXmark,
  FaUser,
  FaGear,
  FaRightFromBracket,
} from "react-icons/fa6";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import CategoryFilter from "../components/dashboard/CategoryFilter";
import StatCard from "../components/dashboard/StatCard";
import ProfitChart from "../components/dashboard/ProfitChart";
import SuccessRateChart from "../components/dashboard/SuccessRateChart";
import SalesOverview from "../components/dashboard/SalesOverview";
import TopProductItem from "../components/dashboard/TopProductItem";
// Tambah import ini di bagian atas
import DateRangePicker from "../components/dashboard/DateRangePicker";


export default function AdminDashboard() {
  // --- STATE UNTUK SHADCN UI COMPONENTS ---
  // State untuk Komponen 1: Dialog (Modal Detail Order)
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // State untuk Komponen 2: Dropdown Menu Profil
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // State untuk Komponen 3: Tooltip (Menyimpan ID baris yang di-hover)
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
      product: "Black Solid T-Shirt",
      icon: "👕",
      meta: "+2 other products",
      customer: "Nowshad Khan",
      amount: "$300.00",
      status: "In Progress",
      date: "31 May 2026",
      payment: "Credit Card",
    },
    {
      id: "#11878",
      product: "Men's Sneakers",
      icon: "👟",
      meta: "+2 other products",
      customer: "Khalid Rahman",
      amount: "$500.00",
      status: "In Progress",
      date: "30 May 2026",
      payment: "PayPal",
    },
    {
      id: "#11868",
      product: "Men's Jogger",
      icon: "🩳",
      meta: "+2 other products",
      customer: "Ashraf Ali",
      amount: "$200.00",
      status: "Pending",
      date: "28 May 2026",
      payment: "Bank Transfer",
    },
  ];

  const topProducts = [
    { name: "Black Solid T-Shirt", earnings: 40000 },
    { name: "Men's Jogger", earnings: 26000 },
  ];

  // Fungsi untuk membuka jendela modal detail transaksi
  const openOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen font-sans relative">
    

      {/* KONTEN UTAMA */}
      <div className="flex-1 p-6 md:p-10 max-w-[1600px] mx-auto space-y-8 w-full overflow-hidden">
        {/* TOP BAR BARU DENGAN SHADCN DROPDOWN */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100/60 pb-4">
          <CategoryFilter />

          <div className="flex items-center gap-4 self-end sm:self-auto">

            <DateRangePicker/>
            {/* Bell Notifikasi */}
            <button className="w-10 h-10 bg-white rounded-xl border border-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors relative">
              <FaRegBell size={16} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>

            {/* KOMPONEN 2: SHADCN DROPDOWN MENU (Profil Admin) */}
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-3 bg-white p-1.5 pr-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-all text-left"
              >
                <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-xs font-black">
                  NB
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 leading-none">
                    Nayla Beauty
                  </h4>
                  <span className="text-[9px] text-slate-400 font-medium">
                    Main Owner
                  </span>
                </div>
                <FaChevronDown
                  size={10}
                  className={`text-slate-400 transition-transform duration-200 ${isProfileDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Menu Dropdown Isi Item */}
              {isProfileDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-slate-100 shadow-xl py-1 z-40 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-slate-50">
                      <p className="text-xs font-bold text-slate-800">
                        My Account
                      </p>
                    </div>
                    <button className="w-full flex items-center gap-2 px-4 py-2 text-xs text-slate-600 hover:bg-slate-50 text-left font-medium">
                      <FaUser size={12} className="text-slate-400" /> Profile
                      Settings
                    </button>
                    <button className="w-full flex items-center gap-2 px-4 py-2 text-xs text-slate-600 hover:bg-slate-50 text-left font-medium">
                      <FaGear size={12} className="text-slate-400" />{" "}
                      Preferences
                    </button>
                    <div className="border-t border-slate-50 my-1"></div>
                    {/* Ganti bagian button Log Out menjadi seperti ini */}
                    <button className="w-full flex items-center gap-2 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 text-left font-bold">
                      <FaRightFromBracket size={12} /> Log Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <DashboardHeader />

        {/* BENTO GRID GRAPHS */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 xl:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((item, i) => (
              <StatCard
                key={i}
                title={item.label}
                value={item.val}
                percentage={item.trend}
                isPositive={item.isUp}
              />
            ))}
          </div>
          <div className="col-span-12 md:col-span-7 xl:col-span-5">
            <ProfitChart />
          </div>
          <div className="col-span-12 md:col-span-5 xl:col-span-3">
            <SuccessRateChart />
          </div>
        </div>

        {/* TABEL ORDERS DAN ANALITIK */}
        <div className="grid grid-cols-12 gap-6">
          {/* TABEL UTAMA */}
          <div className="col-span-12 lg:col-span-8 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Recent Orders
              </h3>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-48">
                  <FaMagnifyingGlass
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    size={12}
                  />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full bg-slate-50 pl-9 pr-4 py-2 rounded-xl text-xs font-medium border-0 focus:ring-2 focus:ring-indigo-500/20 placeholder:text-slate-400"
                  />
                </div>
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
                    <tr
                      key={order.id}
                      className="hover:bg-slate-50/40 transition-colors"
                    >
                      <td className="py-4 pl-2 font-bold text-slate-900">
                        {order.id}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{order.icon}</span>
                          <div>
                            <p className="font-bold text-slate-800 leading-tight">
                              {order.product}
                            </p>
                            <span className="text-[10px] text-slate-400 font-medium">
                              {order.meta}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 font-semibold text-slate-600">
                        {order.customer}
                      </td>
                      <td className="py-4 font-bold text-slate-900">
                        {order.amount}
                      </td>
                      <td className="py-4">
                        <span
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${order.status === "In Progress" ? "bg-indigo-50 text-indigo-600" : "bg-amber-50 text-amber-600"}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 pr-2 text-right relative">
                        {/* KOMPONEN 3: SHADCN TOOLTIP (Muncul saat hover tombol aksi) */}
                        <div className="inline-block relative">
                          <button
                            onClick={() => openOrderDetails(order)}
                            onMouseEnter={() => setActiveTooltipId(order.id)}
                            onMouseLeave={() => setActiveTooltipId(null)}
                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                          >
                            <FaEye size={14} />
                          </button>

                          {activeTooltipId === order.id && (
                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md whitespace-nowrap z-30 animate-in fade-in zoom-in-95 duration-100">
                              View Details
                              <div className="w-1.5 h-1.5 bg-slate-900 absolute top-full left-1/2 -translate-x-1/2 rotate-45 -mt-0.5"></div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SISI KANAN ANALITIK */}
          <div className="col-span-12 lg:col-span-4 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-between gap-6">
            <SalesOverview />
            <div className="space-y-4 pt-4 border-t border-slate-50">
              <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <span>Product Name</span>
                <span>Earnings</span>
              </div>
              <div className="space-y-1">
                {topProducts.map((prod, i) => (
                  <TopProductItem key={i} {...prod} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KOMPONEN 1: SHADCN DIALOG / MODAL (Pop-up Detail Order) */}
      {isDialogOpen && selectedOrder && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div
            className="bg-white w-full max-w-md rounded-[2rem] border border-slate-100 shadow-2xl p-6 relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Dialog Header */}
            <div className="flex justify-between items-start border-b border-slate-100 pb-4 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Transaction Details
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  Order reference {selectedOrder.id}
                </p>
              </div>
              <button
                onClick={() => setIsDialogOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <FaXmark size={16} />
              </button>
            </div>

            {/* Dialog Content / Info */}
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3">
                <span className="text-2xl">{selectedOrder.icon}</span>
                <div>
                  <h5 className="text-xs font-bold text-slate-800">
                    {selectedOrder.product}
                  </h5>
                  <p className="text-[11px] text-slate-400 font-semibold">
                    {selectedOrder.meta}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs pt-2">
                <div>
                  <span className="text-slate-400 font-semibold">Customer</span>
                  <p className="font-bold text-slate-800 mt-0.5">
                    {selectedOrder.customer}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold">
                    Order Date
                  </span>
                  <p className="font-bold text-slate-800 mt-0.5">
                    {selectedOrder.date}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold">
                    Payment Method
                  </span>
                  <p className="font-bold text-slate-800 mt-0.5">
                    {selectedOrder.payment}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold">
                    Total Amount
                  </span>
                  <p className="font-black text-indigo-600 mt-0.5 text-sm">
                    {selectedOrder.amount}
                  </p>
                </div>
              </div>
            </div>

            {/* Dialog Footer */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setIsDialogOpen(false)}
                className="px-5 py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-100 hover:bg-indigo-700 transition-all"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
