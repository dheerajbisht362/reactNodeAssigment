import axios from "axios";
import { getToken } from "./auth";
import { safeString } from "./utils";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://staging.fastor.ai";

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface ApiResponse<T = any> {
  status: string;
  status_code: number;
  data: T;
  error?: string;
  message?: string;
}

export interface RestaurantItem {
  restaurant_id: string;
  restaurant_name: string;
  logo: string;
  address_complete: string | null;
}

export interface RestaurantResponse {
  results: RestaurantItem[];
  meta: {
    total_pages: number;
    total_count: number;
  };
}

// 1. POST /v1/pwa/user/register
export async function registerUser(phone: string, dial_code = "+91"): Promise<ApiResponse<string>> {
  const params = new URLSearchParams();
  params.append("phone", phone);
  params.append("dial_code", dial_code);

  const res = await api.post<ApiResponse<string>>("/v1/pwa/user/register", params.toString());
  return res.data;
}

// 2. POST /v1/pwa/user/login
export async function loginUser(
  phone: string,
  otp: string,
  dial_code = "+91"
): Promise<ApiResponse<any>> {
  const params = new URLSearchParams();
  params.append("phone", phone);
  params.append("otp", otp);
  params.append("dial_code", dial_code);

  const res = await api.post<ApiResponse<any>>("/v1/pwa/user/login", params.toString());
  return res.data;
}

// 3. GET /v1/m/restaurant?city_id=118&page=N
export async function getRestaurants(
  city_id = 118,
  page = 1
): Promise<ApiResponse<RestaurantResponse>> {
  const res = await api.get<ApiResponse<RestaurantResponse>>(`/v1/m/restaurant?city_id=${city_id}&page=${page}`);
  return res.data;
}

export interface FoodItem {
  id: string;
  name: string;
  price: string;
  image: string;
  date: string;
  items: string;
  description?: string;
}

export function mapRestaurantToFoodItem(r: RestaurantItem): FoodItem {
  return {
    id: safeString(r.restaurant_id) || "",
    name: safeString(r.restaurant_name) || "Unknown Item",
    price: "₹14.00",
    image: safeString(r.logo) || "",
    date: "",
    items: "",
    description: safeString(r.address_complete) || undefined,
  };
}
