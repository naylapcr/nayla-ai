import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaThLarge, FaBox, FaShoppingBag, 
  FaStar, FaCog, FaBug, FaSignOutAlt 
} from "react-icons/fa";

export default function Sidebar() {
  const menus = [
    { name: "Dashboard", path: "/", icon: <FaThLarge /> },
    { name: "Products", path: "/products", icon: <FaBox /> },
    { name: "Orders", path: "/orders", icon: <FaShoppingBag /> },
    { name: "Reviews", path: "/reviews", icon: <FaStar /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
  ];

  const errorMenus = [
    { name: "400 Error", path: "/400", icon: <FaBug /> },
    { name: "401 Error", path: "/401", icon: <FaBug /> },
    { name: "403 Error", path: "/403", icon: <FaBug /> },
  ];

  return (
    <aside className="w-72 min-h-screen bg-[#F9FAFB] border-r border-gray-100 flex flex-col p-6 font-sans">
      {/* 1. Brand Logo - Minimalis */}
      <div className="mb-12 px-4">
        <h1 className="text-2xl font-black text-gray-900 tracking-tighter italic">
          Luneve<span className="text-emerald-500">.</span>
        </h1>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">
          Boutique Admin
        </p>
      </div>

      {/* 2. Main Menu Section */}
      <div className="flex-1 flex flex-col gap-1">
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest px-4 mb-4">
          Main Menu
        </p>
        {menus.map((menu) => (
          <NavLink
            key={menu.name}
            to={menu.path}
            className={({ isActive }) => `
              flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group
              ${isActive 
                ? "bg-white text-gray-900 shadow-[0_10px_20px_rgba(0,0,0,0.04)] font-bold" 
                : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"}
            `}
          >
            <span className="text-lg">{menu.icon}</span>
            <span className="text-sm">{menu.name}</span>
          </NavLink>
        ))}

        {/* 3. System Test Section (Error Pages) */}
        <div className="mt-10">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest px-4 mb-4">
            System Test
          </p>
          {errorMenus.map((menu) => (
            <NavLink
              key={menu.name}
              to={menu.path}
              className={({ isActive }) => `
                flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300
                ${isActive 
                  ? "bg-white text-gray-900 shadow-sm font-bold" 
                  : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"}
              `}
            >
              <span className="text-lg">{menu.icon}</span>
              <span className="text-sm">{menu.name}</span>
            </NavLink>
          ))}
        </div>
      </div>

      {/* 4. Logout Section - Bagian Bawah */}
      <div className="mt-auto border-t border-gray-100 pt-6">
        <button className="flex items-center gap-4 px-4 py-3.5 w-full text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all duration-300">
          <FaSignOutAlt className="text-lg" />
          <span className="text-sm font-bold">Logout</span>
        </button>
      </div>
    </aside>
  );
}