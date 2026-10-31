"use client";

import React, { useState, useEffect } from "react";
import { Phone, Wallet, ShoppingCart, Loader2 } from "lucide-react";
import { StatusBar } from "@/components/status-bar";
import { BestSellers } from "@/components/best-sellers";
import { PopularItems } from "@/components/popular-items";
import { getRestaurants, RestaurantItem, mapRestaurantToFoodItem, FoodItem } from "@/lib/api";
import { getSavedUser } from "@/lib/auth";
import { safeString } from "@/lib/utils";
import { useCart } from "@/components/cart-provider";

export default function HomePage() {
  const { totalItems } = useCart();
  const [userName, setUserName] = useState("Karan");
  const [restaurants, setRestaurants] = useState<RestaurantItem[]>([]);
  const [activeDot, setActiveDot] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getSavedUser();
    if (user?.user_name) {
      setUserName(safeString(user.user_name) || "Karan");
    }

    getRestaurants(118, 1)
      .then((res) => {
        if (res?.data?.results?.length) {
          setRestaurants(res.data.results);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const bestSellers: FoodItem[] = loading
    ? []
    : restaurants.slice(0, 4).map(mapRestaurantToFoodItem);

  const popular: FoodItem[] = loading
    ? []
    : restaurants.slice(4, 8).map(mapRestaurantToFoodItem);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col bg-white select-none overflow-y-auto no-scrollbar">
        <StatusBar />
        <div className="flex-1 flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#FF5A00]" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white pb-6 select-none overflow-y-auto no-scrollbar">
      <StatusBar />

      {/* Location */}
      <div className="px-5 pt-3 pb-2">
        <span className="text-[11px] text-neutral-400 font-medium block">Current Locations</span>
        <span className="text-[15px] font-bold text-neutral-900 block">Model Town, New Delhi</span>
      </div>

      {/* User / Action Buttons */}
      <div className="px-5 py-2 flex items-center space-x-2.5">
        <div className="flex-1 h-12 bg-neutral-100 rounded-2xl px-4 flex items-center">
          <input
            type="text"
            readOnly
            value={userName}
            className="w-full bg-transparent text-sm font-semibold text-neutral-700 outline-none cursor-default"
          />
        </div>
        <button
          type="button"
          aria-label="Cart"
          className={`w-12 h-12 rounded-2xl bg-[#FF5A00] flex items-center justify-center text-white shadow-sm relative ${totalItems > 0 ? "ring-2 ring-white ring-offset-2" : ""}`}
        >
          <ShoppingCart className="w-5 h-5 fill-current" />
          {totalItems > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-white text-[#FF5A00] text-[10px] font-bold flex items-center justify-center">
              {totalItems > 9 ? "9+" : totalItems}
            </span>
          )}
        </button>
        <button
          type="button"
          aria-label="Call"
          className="w-12 h-12 rounded-2xl bg-[#FF7A32] flex items-center justify-center text-white shadow-sm"
        >
          <Phone className="w-5 h-5 fill-current" />
        </button>
        <button
          type="button"
          aria-label="Wallet"
          className="w-12 h-12 rounded-2xl bg-[#4A90E2] flex items-center justify-center text-white shadow-sm"
        >
          <Wallet className="w-5 h-5 fill-current" />
        </button>
      </div>

      {/* Best Seller */}
      <BestSellers items={bestSellers} />

      {/* 30% OFF Promo */}
      <div className="px-5 py-3">
        <div className="w-full h-36 rounded-2xl bg-gradient-to-r from-[#D75023] via-[#DC5B26] to-[#E96D32] p-4 flex items-center justify-between relative overflow-hidden shadow-sm">
          <div className="z-10 max-w-[190px]">
            <p className="text-white text-xs font-normal leading-tight opacity-95">
              Experience our<br />delicious new dish
            </p>
            <h3 className="text-white text-2xl font-extrabold tracking-tight mt-2">30% OFF</h3>
          </div>
          <div className="w-36 h-36 -mr-4 rounded-full overflow-hidden shrink-0">
            <img
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&auto=format&fit=crop&q=80"
              alt="Promo Pizza"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex items-center justify-center space-x-1.5 mt-2.5">
          {[0, 1, 2, 3, 4].map((dot) => (
            <button
              key={dot}
              type="button"
              onClick={() => setActiveDot(dot)}
              className={`h-1.5 rounded-full transition-all ${
                activeDot === dot ? "w-4 bg-[#E05322]" : "w-1.5 bg-neutral-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Popular Items */}
      <PopularItems items={popular} />
    </div>
  );
}

