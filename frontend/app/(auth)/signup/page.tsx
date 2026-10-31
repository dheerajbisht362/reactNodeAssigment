"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { StatusBar } from "@/components/status-bar";
import { Keypad } from "@/components/keypad";
import { CountryCodeSelect } from "@/components/country-code-select";
import { Button } from "@/components/ui/button";
import { registerUser } from "@/lib/api";
import { setSavedPhone, setSavedDialCode } from "@/lib/auth";
import { formatErrorMessage } from "@/lib/utils";

export default function SignupPage() {
  const router = useRouter();
  const [dialCode, setDialCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleKeyPress = (num: string) => {
    if (phone.length < 10) {
      setPhone((prev) => prev + num);
      setError(null);
    }
  };

  const handleBackspace = () => {
    setPhone((prev) => prev.slice(0, -1));
    setError(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(clean);
    setError(null);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (phone.length !== 10) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await registerUser(phone, dialCode);
      if (res && (res.status === "Success" || res.status_code === 200 || res.data === "otp sent")) {
        setSavedPhone(phone);
        setSavedDialCode(dialCode);
        router.push("/otp");
      } else {
        setError(formatErrorMessage(res?.error || res?.message, "Failed to send OTP. Please try again."));
      }
    } catch (err: any) {
      if (err?.response?.status === 200 || err?.response?.data?.data === "otp sent") {
        setSavedPhone(phone);
        setSavedDialCode(dialCode);
        router.push("/otp");
        return;
      }
      setError(formatErrorMessage(err, "Failed to send OTP. Please check your number."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-white select-none">
      <div className="flex-1 flex flex-col">
        {/* Status Bar */}
        <StatusBar />

        {/* Back navigation */}
        <div className="px-6 pt-2 pb-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-9 h-9 flex items-center justify-center rounded-full text-[#FF5A00] hover:bg-neutral-100 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* Form content */}
        <div className="px-6 flex-1 flex flex-col justify-start">
          <h1 className="text-[26px] font-bold text-neutral-900 tracking-tight leading-tight">
            Sign Up to Fastor
          </h1>
          <p className="text-[13px] text-neutral-500 mt-2 font-normal leading-relaxed">
            Let us know your mobile number and we will send you an OTP for verification.
          </p>

          {/* Phone Input Box */}
          <div className="mt-8">
            <div
              className={`w-full rounded-2xl border ${
                error ? "border-red-400 bg-red-50/20" : "border-neutral-300 bg-white"
              } p-2.5 px-4 flex items-center shadow-[0_1px_3px_rgba(0,0,0,0.03)] focus-within:border-[#FF5A00] focus-within:ring-2 focus-within:ring-[#FF5A00]/20 transition-all`}
            >
              <CountryCodeSelect value={dialCode} onChange={setDialCode} />
              <div className="h-6 w-[1px] bg-neutral-300 mx-3" />
              <input
                type="tel"
                value={phone}
                onChange={handleInputChange}
                placeholder="- 00000"
                className="flex-1 bg-transparent border-0 outline-none text-base text-neutral-800 placeholder:text-neutral-400 font-medium tracking-wide"
                maxLength={10}
              />
            </div>

            {error && (
              <p className="text-xs text-red-500 font-medium mt-2 px-1">
                {error}
              </p>
            )}
          </div>

          {/* Get OTP Button */}
          <div className="mt-8">
            <Button
              type="button"
              onClick={() => handleSubmit()}
              disabled={loading || phone.length < 10}
              className="w-full h-[52px] rounded-xl bg-[#FF5A00] hover:bg-[#e04f00] text-white font-semibold text-base shadow-md disabled:opacity-50 transition-all cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center justify-center space-x-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Sending OTP...</span>
                </span>
              ) : (
                "Get OTP"
              )}
            </Button>

            <p className="text-[11px] text-neutral-400 text-center mt-3 leading-tight">
              By clicking, I accept the{" "}
              <span className="font-semibold text-neutral-600">Terms & Conditions</span> and{" "}
              <span className="font-semibold text-neutral-600">Privacy Policy</span>
            </p>
          </div>
        </div>
      </div>

      {/* On-screen Keypad matching design */}
      <Keypad onKeyPress={handleKeyPress} onBackspace={handleBackspace} />
    </div>
  );
}

