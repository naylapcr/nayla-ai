import React from 'react';
import SalesOverview from './SalesOverview';
import TopProductItem from './TopProductItem';

export default function TopProductsList() {
  const products = [
    { name: "Black Solid T-Shirt", earnings: 40000 },
    { name: "Men's Jogger", earnings: 26000 },
  ];

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm lg:col-span-4 space-y-6">
      <SalesOverview />
      
      <div className="space-y-3 pt-2">
        <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
          <span>Product Name</span>
          <span>Earnings</span>
        </div>
        <div className="divide-y divide-gray-50">
          {products.map((p, i) => (
            <TopProductItem key={i} {...p} />
          ))}
        </div>
      </div>
    </div>
  );
}