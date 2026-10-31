"use client";

import React, { useState } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface Country {
  name: string;
  code: string;
  flag: string;
}

export const COUNTRIES: Country[] = [
  { name: "India", code: "+91", flag: "🇮🇳" },
  { name: "United States", code: "+1", flag: "🇺🇸" },
  { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
  { name: "Canada", code: "+1", flag: "🇨🇦" },
  { name: "Australia", code: "+61", flag: "🇦🇺" },
  { name: "UAE", code: "+971", flag: "🇦🇪" },
  { name: "Singapore", code: "+65", flag: "🇸🇬" },
  { name: "Germany", code: "+49", flag: "🇩🇪" },
];

interface CountryCodeSelectProps {
  value: string;
  onChange: (code: string) => void;
}

export const CountryCodeSelect: React.FC<CountryCodeSelectProps> = ({
  value,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const selected = COUNTRIES.find((c) => c.code === value) || COUNTRIES[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-1.5 py-1 px-1 rounded hover:bg-neutral-100 transition-colors text-base font-semibold text-neutral-800"
      >
        <span>{selected.code}</span>
        <ChevronDown className="w-4 h-4 text-neutral-500" />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-full mt-2 w-56 max-h-60 overflow-y-auto bg-white rounded-xl shadow-xl border border-neutral-200 z-50 py-1">
            <div className="px-3 py-1.5 text-xs font-medium text-neutral-400 uppercase tracking-wider border-b border-neutral-100">
              Select Country
            </div>
            {COUNTRIES.map((c, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  onChange(c.code);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm text-left hover:bg-neutral-50 transition-colors ${
                  c.code === value ? "bg-[#FF5A00]/10 font-medium text-[#FF5A00]" : "text-neutral-700"
                }`}
              >
                <span className="flex items-center space-x-2">
                  <span className="text-base">{c.flag}</span>
                  <span>{c.name}</span>
                </span>
                <span className="text-xs text-neutral-500 font-mono">
                  {c.code}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
