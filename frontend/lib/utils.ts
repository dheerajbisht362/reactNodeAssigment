import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function safeString(val: any): string {
  if (val == null) return "";
  if (typeof val === "string") return val;
  if (typeof val === "number") return String(val);
  try {
    return String(val);
  } catch {
    return "";
  }
}

export function formatErrorMessage(err: any, fallback = "Something went wrong"): string {
  if (!err) return fallback;
  if (typeof err === "string") return err;
  if (typeof err === "number") return String(err);

  // If err is an Axios error or API response
  const apiData = err?.response?.data;
  if (apiData) {
    if (typeof apiData === "string") return apiData;
    if (typeof apiData.error === "string") return apiData.error;
    if (typeof apiData.message === "string") return apiData.message;
    if (typeof apiData.data === "string") return apiData.data;

    // If error is an object like { error: { otp: "Invalid OTP" } } or { otp: "..." }
    const nested = apiData.error || apiData.data;
    if (nested && typeof nested === "object") {
      const vals = Object.values(nested);
      for (const v of vals) {
        if (typeof v === "string") return v;
        if (Array.isArray(v) && typeof v[0] === "string") return v[0];
      }
    }
  }

  // If err is an object directly
  if (typeof err === "object") {
    if (typeof err.message === "string") return err.message;
    if (typeof err.error === "string") return err.error;
    const vals = Object.values(err);
    for (const v of vals) {
      if (typeof v === "string") return v;
      if (Array.isArray(v) && typeof v[0] === "string") return v[0];
    }
  }

  return fallback;
}


