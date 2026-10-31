"use client";

import React from "react";
import { Delete } from "lucide-react";

interface KeypadProps {
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
  className?: string;
}

const KEYS = [
  { num: "1", sub: "" },
  { num: "2", sub: "ABC" },
  { num: "3", sub: "DEF" },
  { num: "4", sub: "GHI" },
  { num: "5", sub: "JKL" },
  { num: "6", sub: "MNO" },
  { num: "7", sub: "PQRS" },
  { num: "8", sub: "TUV" },
  { num: "9", sub: "WXYZ" },
  { num: "", sub: "" },
  { num: "0", sub: "" },
  { num: "del", sub: "" },
];

export const Keypad: React.FC<KeypadProps> = ({
  onKeyPress,
  onBackspace,
  className = "",
}) => {
  return (
    <div
      className={`w-full bg-[#E5E7EB]/40 backdrop-blur-md pt-3 pb-6 px-3 border-t border-neutral-200 select-none ${className}`}
    >
      <div className="grid grid-cols-3 gap-2">
        {KEYS.map((k, idx) => {
          if (!k.num) {
            return <div key={idx} className="h-12" />;
          }

          if (k.num === "del") {
            return (
              <button
                key={idx}
                type="button"
                onClick={onBackspace}
                className="h-12 rounded-lg flex items-center justify-center bg-white/70 active:bg-neutral-300 shadow-[0_1px_2px_rgba(0,0,0,0.06)] transition-all cursor-pointer"
              >
                <Delete className="w-6 h-6 text-neutral-800" />
              </button>
            );
          }

          return (
            <button
              key={idx}
              type="button"
              onClick={() => onKeyPress(k.num)}
              className="h-12 rounded-lg flex flex-col items-center justify-center bg-white shadow-[0_1px_2px_rgba(0,0,0,0.08)] active:bg-neutral-200 transition-all cursor-pointer"
            >
              <span className="text-xl font-medium text-neutral-900 leading-none">
                {k.num}
              </span>
              {k.sub && (
                <span className="text-[9px] font-bold text-neutral-500 tracking-wider mt-0.5">
                  {k.sub}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
