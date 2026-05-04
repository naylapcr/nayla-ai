import React from 'react';
import { FaPalette, FaBell, FaShieldAlt, FaGlobe } from "react-icons/fa";

export default function Settings() {
  const sections = [
    { title: "Appearance", desc: "Customize your dashboard vibe", icon: <FaPalette />, color: "bg-pink-50 text-pink-400" },
    { title: "Notifications", desc: "How you receive updates", icon: <FaBell />, color: "bg-blue-50 text-blue-400" },
    { title: "Privacy", desc: "Manage your store security", icon: <FaShieldAlt />, color: "bg-emerald-50 text-emerald-400" },
  ];

  return (
    <div className="max-w-4xl space-y-10 animate-in fade-in duration-700 font-sans">
      <div className="px-2">
        <h2 className="text-4xl font-light text-gray-800 tracking-tight">System <span className="font-bold text-[#f8b4b4]">Preferences</span></h2>
      </div>

      <div className="bg-white rounded-[4rem] border border-pink-50 p-10 space-y-8">
        {sections.map((s, i) => (
          <div key={i} className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-6">
              <div className={`${s.color} w-16 h-16 rounded-[2rem] flex items-center justify-center text-xl transition-transform group-hover:rotate-12`}>{s.icon}</div>
              <div>
                <h4 className="font-bold text-gray-800">{s.title}</h4>
                <p className="text-xs text-gray-400 mt-1">{s.desc}</p>
              </div>
            </div>
            <div className="w-12 h-6 bg-gray-100 rounded-full relative p-1">
              <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
            </div>
          </div>
        ))}
        <button className="w-full py-4 bg-black text-white rounded-3xl font-bold uppercase text-[11px] tracking-widest hover:bg-[#f8b4b4] transition-all">Save Changes</button>
      </div>
    </div>
  );
}