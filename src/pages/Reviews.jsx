import React, { useState } from 'react';
import { FaStar, FaMagnifyingGlass, FaEye, FaTrashCan, FaCheck } from "react-icons/fa6";

export default function Reviews() {
  const [activeTooltipId, setActiveTooltipId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const reviews = [
    { id: "#REV-001", user: "Minji K.", date: "14 June 2026", text: "Luneve cushion is literally a second skin! 💖", rate: 5, product: "Luneve Cushion Foundation", status: "Approved" },
    { id: "#REV-002", user: "Hanni P.", date: "13 June 2026", text: "The lip tint color is so pretty but shipping took 3 days.", rate: 4, product: "Velvet Lip Tint #04", status: "Pending" },
    { id: "#REV-003", user: "Danielle M.", date: "12 June 2026", text: "Best skincare ever. My skin is glowing!", rate: 5, product: "Glow Serum Niacinamide", status: "Approved" },
  ];

  const filteredReviews = reviews.filter(r => 
    r.user.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen font-sans w-full">
      <div className="flex-1 p-6 md:p-10 max-w-[1600px] mx-auto space-y-8 w-full overflow-hidden">
        
        {/* HEADER HALAMAN */}
        <div className="px-2">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Product <span className="text-pink-500">Reviews</span>
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Manage and monitor customer feedback and ratings.
          </p>
        </div>

        {/* BENTO CARD TABEL */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
          
          {/* TOP BAR: JUDUL TABEL & SEARCH */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              All Feedbacks ({filteredReviews.length})
            </h3>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <FaMagnifyingGlass
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  size={12}
                />
                <input
                  type="text"
                  placeholder="Search customer or product..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 pl-9 pr-4 py-2.5 rounded-xl text-xs font-medium border-0 focus:ring-2 focus:ring-pink-500/20 placeholder:text-slate-400 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* STRUKTUR TABEL */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <th className="pb-4 pl-2">Review ID</th>
                  <th className="pb-4">Customer</th>
                  <th className="pb-4">Product</th>
                  <th className="pb-4">Rating & Comment</th>
                  <th className="pb-4">Date</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4 pr-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-slate-50/50">
                {filteredReviews.map((review) => (
                  <tr
                    key={review.id}
                    className="hover:bg-slate-50/40 transition-colors group"
                  >
                    <td className="py-5 pl-2 font-bold text-slate-900">{review.id}</td>

                    <td className="py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-pink-50 rounded-xl flex items-center justify-center text-pink-600 font-bold text-[11px]">
                          {review.user.substring(0, 2).toUpperCase()}
                        </div>
                        <span className="font-bold text-slate-800">{review.user}</span>
                      </div>
                    </td>

                    <td className="py-5 font-semibold text-slate-600">{review.product}</td>

                    <td className="py-5 max-w-xs pr-4">
                      <div className="flex gap-0.5 mb-1.5">
                        {[...Array(5)].map((_, index) => (
                          <FaStar 
                            key={index} 
                            size={11} 
                            className={index < review.rate ? "text-amber-400" : "text-slate-100"} 
                          />
                        ))}
                      </div>
                      <p className="text-slate-500 line-clamp-2 leading-relaxed italic">
                        "{review.text}"
                      </p>
                    </td>

                    <td className="py-5 text-slate-400 font-medium">{review.date}</td>

                    <td className="py-5">
                      <span
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wide ${
                          review.status === "Approved" 
                            ? "bg-emerald-50 text-emerald-600" 
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {review.status}
                      </span>
                    </td>

                    <td className="py-5 pr-2 text-right relative">
                      <div className="flex items-center justify-end gap-1.5">
                        {review.status === "Pending" && (
                          <button className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all">
                            <FaCheck size={12} />
                          </button>
                        )}
                        
                        <div className="inline-block relative">
                          <button
                            onMouseEnter={() => setActiveTooltipId(review.id)}
                            onMouseLeave={() => setActiveTooltipId(null)}
                            className="p-2 text-slate-400 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all"
                          >
                            <FaEye size={13} />
                          </button>

                          {activeTooltipId === review.id && (
                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md whitespace-nowrap z-30 animate-in fade-in zoom-in-95 duration-100">
                              View Review
                              <div className="w-1.5 h-1.5 bg-slate-900 absolute top-full left-1/2 -translate-x-1/2 rotate-45 -mt-0.5"></div>
                            </div>
                          )}
                        </div>

                        <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all">
                          <FaTrashCan size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredReviews.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center py-10 text-slate-400 font-medium">
                      No reviews found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}