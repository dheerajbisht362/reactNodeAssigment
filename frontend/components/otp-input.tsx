"use client";

import React, { useRef, useEffect } from "react";

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
}

export const OtpInput: React.FC<OtpInputProps> = ({
  value,
  onChange,
  length = 6,
  disabled = false,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first empty box on mount
    const firstEmptyIndex = value.length < length ? value.length : length - 1;
    inputRefs.current[firstEmptyIndex]?.focus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const char = e.target.value.replace(/\D/g, "").slice(-1);
    if (!char) return;

    const chars = value.split("");
    chars[index] = char;
    const nextVal = chars.join("").slice(0, length);
    onChange(nextVal);

    if (index < length - 1 && char) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const chars = value.split("");
      if (chars[index]) {
        chars[index] = "";
        onChange(chars.join(""));
      } else if (index > 0) {
        chars[index - 1] = "";
        onChange(chars.join(""));
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (pasted) {
      onChange(pasted);
      const focusIndex = Math.min(pasted.length, length - 1);
      inputRefs.current[focusIndex]?.focus();
    }
  };

  return (
    <div className="flex items-center justify-center space-x-2 select-none">
      {Array.from({ length }).map((_, idx) => {
        const char = value[idx] || "";
        const isMiddle = idx === 3;

        return (
          <React.Fragment key={idx}>
            {isMiddle && (
              <span className="text-neutral-400 font-semibold px-0.5 text-lg">
                -
              </span>
            )}
            <input
              ref={(el) => {
                inputRefs.current[idx] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={char}
              disabled={disabled}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              onPaste={handlePaste}
              className={`w-11 h-14 rounded-xl border text-center text-xl font-bold transition-all outline-none ${
                char
                  ? "border-[#FF5A00] bg-white text-neutral-900 shadow-[0_2px_4px_rgba(255,90,0,0.08)]"
                  : "border-neutral-300 bg-neutral-50/50 text-neutral-800 focus:border-[#FF5A00] focus:bg-white focus:ring-2 focus:ring-[#FF5A00]/20"
              }`}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};
