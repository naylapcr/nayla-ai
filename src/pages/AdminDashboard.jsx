import React from 'react';

// Import komponen inti dashboard
import DashboardHeader from '../components/dashboard/DashboardHeader';
import CategoryFilter from '../components/dashboard/CategoryFilter';
import NotificationBell from '../components/dashboard/NotificationBell';
import AdminProfile from '../components/dashboard/AdminProfile';
import StatCard from '../components/dashboard/StatCard';
import ProfitChart from '../components/dashboard/ProfitChart';
import SuccessRateChart from '../components/dashboard/SuccessRateChart';
import SearchBar from '../components/dashboard/SearchBar';
import StatusDropdown from '../components/dashboard/StatusDropdown';
import RecentOrderRow from '../components/dashboard/RecentOrderRow';
import SalesOverview from '../components/dashboard/SalesOverview';
import TopProductItem from '../components/dashboard/TopProductItem';

export default function AdminDashboard() {
  const stats = [
    { label: "Total Sales", val: "12,485", trend: "+3.1%", isUp: true },
    { label: "Total Revenue", val: "$68,760", trend: "+2.4%", isUp: true },
    { label: "Active Customers", val: "4,220", trend: "+2.4%", isUp: true },
    { label: "Refund Request", val: "250", trend: "-0.6%", isUp: false },
  ];

  const orders = [
    { id: "#11852", product: "Black Solid T-Shirt", icon: "👕", meta: "+2 other products", customer: "Nowshad Khan", amount: 300, status: "In Progress" },
    { id: "#11878", product: "Men's Sneakers", icon: "👟", meta: "+2 other products", customer: "Khalid Rahman", amount: 500, status: "In Progress" },
    { id: "#11868", product: "Men's Jogger", icon: "🩳", meta: "+2 other products", customer: "Ashraf Ali", amount: 200, status: "Pending" },
  ];

  const topProducts = [
    { name: "Black Solid T-Shirt", earnings: 40000 },
    { name: "Men's Jogger", earnings: 26000 },
  ];

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen font-sans">
      
      {/* 2. AREA KONTEN UTAMA DASHBOARD */}
      <div className="flex-1 p-6 md:p-10 max-w-[1600px] mx-auto space-y-8 w-full overflow-hidden">
        
        {/* Top Bar Filter & Profil */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100/60 pb-4">
          <CategoryFilter />
          <div className="flex items-center gap-4 self-end sm:self-auto">
            <NotificationBell />
            <AdminProfile />
          </div>
        </div>

        {/* Header Sapaan */}
        <DashboardHeader />

        {/* BENTO GRID UTAMA (Stats & Grafik) */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* 4 Kartu Ringkasan */}
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

          {/* Grafik Batang Finansial */}
          <div className="col-span-12 md:col-span-7 xl:col-span-5">
            <ProfitChart />
          </div>

          {/* Grafik Donat Kinerja Penjualan */}
          <div className="col-span-12 md:col-span-5 xl:col-span-3">
            <SuccessRateChart />
          </div>

        </div>

        {/* BENTO GRID BAWAH (Tabel & Detail Produk) */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* Tabel Transaksi */}
          <div className="col-span-12 lg:col-span-8 bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 className="text-base font-bold text-slate-900 tracking-tight">Recent Orders</h3>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <SearchBar />
                <StatusDropdown />
              </div>
            </div>
            
            <div className="overflow-x-auto -mx-6 md:mx-0">
              <div className="inline-block min-w-full align-middle px-6 md:px-0">
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
                    {orders.map((order, i) => (
                      <RecentOrderRow key={i} {...order} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Analitik Samping */}
          <div className="col-span-12 lg:col-span-4 bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-between gap-6">
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
    </div>
  );
}