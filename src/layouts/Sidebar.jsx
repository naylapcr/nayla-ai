import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaThLarge, FaBox, FaShoppingBag, FaStar, 
  FaCog, FaBug, FaUserCircle 
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
    <div className="w-64 bg-white min-h-screen border-r border-pink-50 p-8 flex flex-col sticky top-0 font-sans">
      <div className="mb-12 px-2">
        <div className="flex items-center gap-1">
          <h1 className="text-3xl font-light italic tracking-tight text-[#f8b4b4]">Luneve</h1>
          <span className="text-[8px] self-start mt-2 text-gray-300">®</span>
        </div>
        <p className="text-[9px] font-extrabold uppercase tracking-[0.3em] text-gray-300 mt-1">Administrator</p>
      </div>
      
      <nav className="flex-1 space-y-1">
        <p className="text-[10px] font-extrabold text-gray-300 uppercase tracking-[0.2em] mb-4 ml-4">Main Menu</p>
        {menus.map((m, i) => (
          <NavLink key={i} to={m.path} className={({ isActive }) => `flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 ${isActive ? "bg-[#fff5f5] text-[#f8b4b4]" : "text-gray-400 hover:text-[#f8b4b4]"}`}>
            <span>{m.icon}</span>
            <span className="text-[11px] font-bold uppercase tracking-widest">{m.name}</span>
          </NavLink>
        ))}

        <p className="text-[10px] font-extrabold text-gray-300 uppercase tracking-[0.2em] mb-4 mt-8 ml-4">System Demo</p>
        {errorMenus.map((m, i) => (
          <NavLink key={i} to={m.path} className={({ isActive }) => `flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 ${isActive ? "bg-[#fff5f5] text-[#f8b4b4]" : "text-gray-400 hover:text-[#f8b4b4]"}`}>
            <span>{m.icon}</span>
            <span className="text-[11px] font-bold uppercase tracking-widest">{m.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="pt-6 border-t border-pink-50">
        <NavLink to="/login" className="flex items-center space-x-4 p-4 rounded-2xl bg-pink-50 text-[#f8b4b4] hover:bg-black hover:text-white transition-all">
          <FaUserCircle className="text-xl" />
          <span className="text-[11px] font-extrabold uppercase tracking-widest">Sign In</span>
        </NavLink>
      </div>
    </div>
  );
}