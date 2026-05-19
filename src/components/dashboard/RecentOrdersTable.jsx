import React from 'react';
import SearchBar from './SearchBar';
import StatusDropdown from './StatusDropdown';
import RecentOrderRow from './RecentOrderRow';

export default function RecentOrdersTable() {
  const orders = [
    { id: "#11852", product: "Black Solid T-Shirt", icon: "👕", meta: "+2 other products", customer: "Nowshad Khan", amount: 300, status: "In Progress" },
    { id: "#11878", product: "Men's Sneakers", icon: "👟", meta: "+2 other products", customer: "Khalid Rahman", amount: 500, status: "In Progress" },
    { id: "#11868", product: "Men's Jogger", icon: "🩳", meta: "+2 other products", customer: "Ashraf Ali", amount: 200, status: "Pending" },
  ];

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm lg:col-span-8 space-y-4 flex flex-col justify-between">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider">Recent Orders</h3>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <SearchBar />
          <StatusDropdown />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <th className="pb-3 pl-4">Order ID</th>
              <th className="pb-3">Products</th>
              <th className="pb-3">Customer</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 pr-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <RecentOrderRow key={i} {...order} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}