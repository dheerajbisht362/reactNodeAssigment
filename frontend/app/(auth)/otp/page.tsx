"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { StatusBar } from "@/components/status-bar";
import { Keypad } from "@/components/keypad";
import { OtpInput } from "@/components/otp-input";
import { Button } from "@/components/ui/button";
import { loginUser, registerUser } from "@/lib/api";
import { getSavedPhone, getSavedDialCode, setToken, setSavedUser } from "@/lib/auth";
import { formatErrorMessage } from "@/lib/utils";

export default function OtpPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [dialCode, setDialCode] = useState("+91");
  const [otp, setOtp] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedPhone = getSavedPhone();
    const savedDial = getSavedDialCode();
    if (!savedPhone) {
      router.replace("/signup");
      return;
    }
    setPhone(savedPhone);
    if (savedDial) setDialCode(savedDial);
  }, [router]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => setSecondsLeft((p) => p - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleKeyPress = (num: string) => {
    if (otp.length < 6) {
      setOtp((p) => p + num);
      setError(null);
    }
  };

  const handleBackspace = () => {
    setOtp((p) => p.slice(0, -1));
    setError(null);
  };

  const handleResend = async () => {
    if (secondsLeft > 0 || resending) return;
    setResending(true);
    setError(null);
    try {
      await registerUser(phone, dialCode);
      setSecondsLeft(30);
      setOtp("");
    } catch (err: any) {
      setError(formatErrorMessage(err, "Failed to resend code."));
    } finally {
      setResending(false);
    }
  };

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError("Please enter the 6-digit code");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await loginUser(phone, otp, dialCode);
      if (res?.data?.token) {
        setToken(res.data.token);
        setSavedUser(res.data);
        router.push("/home");
      } else if (res?.status === "Success" && res?.data) {
        const token = typeof res.data === "string" ? res.data : res.data.token || `token_${Date.now()}`;
        setToken(token);
        setSavedUser(res.data);
        router.push("/home");
      } else {
        setError(formatErrorMessage(res?.error || res?.message, "Invalid OTP code"));
      }
    } catch (err: any) {
      if (err?.response?.data?.data?.token) {
        setToken(err.response.data.data.token);
        setSavedUser(err.response.data.data);
        router.push("/home");
        return;
      }
      setError(formatErrorMessage(err, "Invalid OTP code. Please check and try again."));
    } finally {
      setLoading(false);
    }
  };

  const timerText = `00:${secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}`;

  return (
    <div className="flex-1 flex flex-col justify-between bg-white select-none">
      <div className="flex-1 flex flex-col">
        <StatusBar />
        <div className="px-6 pt-2 pb-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-9 h-9 flex items-center justify-center rounded-full text-[#FF5A00] hover:bg-neutral-100"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        <div className="px-6 flex-1 flex flex-col justify-start">
          <h1 className="text-[26px] font-bold text-neutral-900 tracking-tight">6-digit code</h1>
          <p className="text-[13px] text-neutral-500 mt-2">
            Please enter the code we've sent to
            <br />
            <span className="font-bold text-neutral-900 mt-0.5 inline-block">
              {dialCode} {phone}
            </span>
          </p>

          <div className="mt-8">
            <OtpInput value={otp} onChange={setOtp} disabled={loading} />
            {error && <p className="text-xs text-red-500 font-medium text-center mt-3">{error}</p>}
            <div className="text-center mt-5">
              <span className="text-[13px] text-neutral-500">I didn't receive a code </span>
              {secondsLeft > 0 ? (
                <span className="text-[13px] font-semibold text-[#FF5A00]">({timerText})</span>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resending}
                  className="text-[13px] font-semibold text-[#FF5A00] hover:underline"
                >
                  {resending ? "Sending..." : "Resend Code"}
                </button>
              )}
            </div>
          </div>

          <div className="mt-8">
            <Button
              type="button"
              onClick={handleVerify}
              disabled={loading || otp.length !== 6}
              className="w-full h-[52px] rounded-xl bg-[#FF5A00] hover:bg-[#e04f00] text-white font-semibold text-base shadow-md disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center space-x-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Verifying...</span>
                </span>
              ) : (
                "Continue"
              )}
            </Button>
          </div>
        </div>
      </div>

      <Keypad onKeyPress={handleKeyPress} onBackspace={handleBackspace} />
    </div>
  );
}

