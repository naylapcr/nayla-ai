import React from 'react';
import { FaStar, FaQuoteLeft } from "react-icons/fa";

export default function Reviews() {
  const reviews = [
    { user: "Minji K.", date: "Today", text: "Luneve cushion is literally a second skin! 💖", rate: 5, img: "✨" },
    { user: "Hanni P.", date: "Yesterday", text: "The lip tint color is so pretty but shipping took 3 days.", rate: 4, img: "☁️" },
    { user: "Danielle M.", date: "2 Days ago", text: "Best skincare ever. My skin is glowing!", rate: 5, img: "🌸" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 font-sans pb-10">
      <div className="px-2">
        <h2 className="text-4xl font-light text-gray-800 tracking-tight">Customer <span className="font-bold text-[#f8b4b4]">Stories</span></h2>
        <p className="text-gray-400 text-sm mt-2">What they say about Luneve's magic touch.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((r, i) => (
          <div key={i} className="bg-white p-8 rounded-[3.5rem] border border-pink-50 relative group hover:shadow-xl transition-all">
            <FaQuoteLeft className="text-pink-50 text-4xl absolute top-8 right-8" />
            <div className="w-14 h-14 bg-[#fffafb] rounded-2xl flex items-center justify-center text-2xl mb-6">{r.img}</div>
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => <FaStar key={i} className={i < r.rate ? "text-yellow-400" : "text-gray-100"} />)}
            </div>
            <p className="text-gray-600 italic leading-relaxed mb-6">"{r.text}"</p>
            <div className="flex justify-between items-center pt-6 border-t border-pink-50">
              <span className="font-bold text-gray-800">{r.user}</span>
              <span className="text-[10px] font-extrabold text-gray-300 uppercase tracking-widest">{r.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}