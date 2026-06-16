import React from 'react';
import SalesOverview from './SalesOverview';
import TopProductItem from './TopProductItem';

export default function TopProductsList() {
  // Data produk makeup
  const products = [
    { name: "Velvet Lip Tint", earnings: 450000 },
    { name: "Glow Cushion Foundation", earnings: 380000 },
    { name: "Ethereal Eyeshadow Palette", earnings: 320000 },
  ];

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm lg:col-span-4 space-y-6">
      <SalesOverview />
      
      <div className="space-y-4 pt-4 border-t border-slate-50">
        <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <span>Product Name</span>
          <span>Earnings</span>
        </div>
        <div className="space-y-1">
          {products.map((p, i) => (
            <TopProductItem key={i} {...p} />
          ))}
        </div>
      </div>
    </div>
  );
}