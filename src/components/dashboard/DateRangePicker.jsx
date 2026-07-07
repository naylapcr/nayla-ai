"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaCalendarDays, FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const SHORT_MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

function isSameDay(a, b) {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function fmt(d) {
  if (!d) return "";
  return d.getDate() + " " + SHORT_MONTHS[d.getMonth()];
}

export default function DateRangePicker() {
  const today = new Date();
  const [isOpen, setIsOpen] = useState(false);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [startDate, setStartDate] = useState(new Date(today.getFullYear(), today.getMonth(), 12));
  const [endDate, setEndDate] = useState(new Date(today.getFullYear(), today.getMonth(), 20));
  const [selecting, setSelecting] = useState(null); // null | 'end'
  const [hoverDate, setHoverDate] = useState(null);
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
        setSelecting(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const handleDayClick = (date) => {
    if (!selecting) {
      setStartDate(date);
      setEndDate(null);
      setSelecting("end");
    } else {
      if (date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }
      setSelecting(null);
    }
  };

  const isInRange = (date) => {
    const end = selecting ? hoverDate : endDate;
    if (!startDate || !end) return false;
    const lo = startDate < end ? startDate : end;
    const hi = startDate < end ? end : startDate;
    return date > lo && date < hi;
  };

  const isStart = (date) => isSameDay(date, startDate);
  const isEnd = (date) => {
    const end = selecting ? hoverDate : endDate;
    return isSameDay(date, end);
  };

  // Build calendar days
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const prevDays = new Date(viewYear, viewMonth, 0).getDate();
  const cells = [];

  for (let i = 0; i < firstDay; i++) {
    cells.push({ day: prevDays - firstDay + 1 + i, month: viewMonth - 1, year: viewYear, other: true });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, month: viewMonth, year: viewYear, other: false });
  }
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, month: viewMonth + 1, year: viewYear, other: true });
  }

  const label = startDate && endDate
    ? `${fmt(startDate)} - ${fmt(endDate)}`
    : startDate
    ? `${fmt(startDate)} - ...`
    : "Select dates";

  return (
    <div className="relative" ref={ref}>
      {/* TRIGGER BUTTON */}
      <button
        onClick={() => setIsOpen(o => !o)}
        className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-100 shadow-sm hover:bg-slate-50 transition-all text-slate-600 text-xs font-semibold"
      >
        <FaCalendarDays size={13} className="text-slate-400" />
        <span>{label}</span>
        <FaChevronDown
          size={10}
          className={`text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* CALENDAR DROPDOWN */}
      {isOpen && (
        <div className="absolute right-0 mt-2 z-50 bg-white rounded-2xl border border-slate-100 shadow-2xl p-4 w-72 animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Header navigasi bulan */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={prevMonth}
              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
            >
              <FaChevronLeft size={11} />
            </button>
            <span className="text-xs font-bold text-slate-800">
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button
              onClick={nextMonth}
              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
            >
              <FaChevronRight size={11} />
            </button>
          </div>

          {/* Header hari */}
          <div className="grid grid-cols-7 mb-1">
            {DAYS.map(d => (
              <div key={d} className="text-center text-[10px] font-bold text-slate-400 py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Grid tanggal */}
          <div className="grid grid-cols-7">
            {cells.map((cell, i) => {
              const date = new Date(cell.year, cell.month, cell.day);
              const start = isStart(date);
              const end = isEnd(date);
              const inRange = isInRange(date);
              const isToday = isSameDay(date, today);

              return (
                <button
                  key={i}
                  onClick={() => handleDayClick(date)}
                  onMouseEnter={() => selecting && setHoverDate(date)}
                  onMouseLeave={() => selecting && setHoverDate(null)}
                  className={`
                    relative h-8 text-[11px] font-medium transition-all
                    ${cell.other ? "text-slate-300" : "text-slate-700"}
                    ${start || end
                      ? "bg-pink-500 text-white font-bold rounded-lg z-10 shadow-sm shadow-pink-200"
                      : ""}
                    ${inRange && !start && !end
                      ? "bg-pink-50 text-pink-700 rounded-none"
                      : ""}
                    ${!start && !end && !inRange
                      ? "hover:bg-slate-100 rounded-lg"
                      : ""}
                    ${isToday && !start && !end
                      ? "font-black text-pink-500"
                      : ""}
                  `}
                >
                  {cell.day}
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-3 pt-3 border-t border-slate-50 flex justify-between items-center">
            <span className="text-[10px] text-slate-400 font-medium">
              {selecting
                ? "Pick end date"
                : startDate && endDate
                ? `${fmt(startDate)} – ${fmt(endDate)}`
                : "Pick start date"}
            </span>
            {!selecting && startDate && endDate && (
              <button
                onClick={() => setIsOpen(false)}
                className="text-[10px] font-bold px-3 py-1.5 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors shadow-sm shadow-pink-100"
              >
                Apply
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}