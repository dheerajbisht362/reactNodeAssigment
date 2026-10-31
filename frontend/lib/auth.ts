export interface UserData {
  user_id?: string;
  user_name?: string;
  user_email?: string;
  user_mobile?: string;
  dial_code?: string;
  token?: string;
  [key: string]: any;
}

const TOKEN_KEY = "fastor_token";
const PHONE_KEY = "fastor_phone";
const DIAL_CODE_KEY = "fastor_dial_code";
const USER_KEY = "fastor_user";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
}

export function getSavedPhone(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(PHONE_KEY) || "";
}

export function setSavedPhone(phone: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PHONE_KEY, phone);
}

export function getSavedDialCode(): string {
  if (typeof window === "undefined") return "+91";
  return localStorage.getItem(DIAL_CODE_KEY) || "+91";
}

export function setSavedDialCode(code: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(DIAL_CODE_KEY, code);
}

export function getSavedUser(): UserData | null {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem(USER_KEY);
  if (!user) return null;
  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
}

export function setSavedUser(user: UserData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearAuth(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(PHONE_KEY);
  localStorage.removeItem(DIAL_CODE_KEY);
  localStorage.removeItem(USER_KEY);
}
