"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Minus, Plus, Check, Loader2 } from "lucide-react";
import { StatusBar } from "@/components/status-bar";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart-provider";
import { PORTIONS } from "@/lib/mock-data";
import { safeString } from "@/lib/utils";
import { getRestaurants, mapRestaurantToFoodItem, FoodItem } from "@/lib/api";

export default function ItemDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [itemId, setItemId] = useState("1");
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<FoodItem | null>(null);

  const { addItem, totalItems } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedPortion, setSelectedPortion] = useState("personal");
  const [added, setAdded] = useState(false);

  // Resolve params.id safely for Next.js 15 (params may be a Promise)
  useEffect(() => {
    const resolveId = async () => {
      const id = await params.id;
      setItemId(typeof id === "string" ? id : String(id));
    };
    resolveId();
  }, [params.id]);

  // Fetch item details from API
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await getRestaurants(118, 1);
        const results = res?.data?.results || [];
        const found = results.find((r) => safeString(r.restaurant_id) === itemId);
        if (found) {
          setItem(mapRestaurantToFoodItem(found));
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [itemId]);

  const portion = PORTIONS.find((p) => p.id === selectedPortion) || PORTIONS[0];
  const basePrice = item ? parseFloat(item.price.replace(/[^0-9.]/g, "")) || 14 : 14;

  if (loading || !item) {
    return (
      <div className="flex-1 flex flex-col bg-white select-none overflow-y-auto no-scrollbar pb-4">
        <StatusBar />
        <div className="flex-1 flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#FF5A00]" />
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: item.id,
      title: item.name,
      image: item.image,
      price: basePrice,
      quantity,
      portion: portion.name,
      portionPrice: portion.extraPrice,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-white select-none overflow-y-auto no-scrollbar pb-4">
      <div>
        <StatusBar />

        <div className="px-5 pt-2 pb-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-9 h-9 rounded-full flex items-center justify-center text-neutral-800 hover:bg-neutral-100"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        <div className="px-5">
          <div className="w-full h-56 rounded-3xl overflow-hidden bg-neutral-100 shadow-sm">
            <img
              src={item.image || "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80"}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="px-5 mt-5 flex items-center justify-between">
          <span className="text-2xl font-extrabold text-[#FF5A00]">
            ₹{basePrice.toFixed(2)}
          </span>
          <div className="flex items-center space-x-3.5">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-7 h-7 rounded-full bg-[#E05322] flex items-center justify-center text-white active:scale-95"
            >
              <Minus className="w-4 h-4 stroke-[3]" />
            </button>
            <span className="text-base font-bold text-neutral-900 w-4 text-center">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-7 h-7 rounded-full bg-[#E05322] flex items-center justify-center text-white active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>

        <div className="px-5 mt-4">
          <h1 className="text-lg font-bold text-neutral-900">
            {item.name}
          </h1>
          {item.description && (
            <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
              {item.description}
            </p>
          )}
        </div>

        <div className="px-5 mt-6">
          <h2 className="text-[15px] font-bold text-neutral-900 mb-3">
            Personal portion
          </h2>
          <div className="flex flex-col space-y-3">
            {PORTIONS.map((p) => {
              const isSelected = selectedPortion === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedPortion(p.id)}
                  className="flex items-center justify-between cursor-pointer py-1 group"
                >
                  <span className="text-xs font-medium text-neutral-600">
                    {p.name}
                  </span>
                  <div className="flex-1 border-b border-dotted border-neutral-300 mx-2.5 mb-1" />
                  <div className="flex items-center space-x-2.5">
                    <span className="text-xs text-neutral-500 font-medium">
                      ${p.extraPrice.toFixed(2)}
                    </span>
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected
                          ? "border-[#FF5A00]"
                          : "border-neutral-300 group-hover:border-neutral-400"
                      }`}
                    >
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-[#FF5A00]" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="px-5 pt-6 mt-4">
        <Button
          type="button"
          onClick={handleAddToCart}
          className="w-full h-12 rounded-xl bg-[#FF5A00] hover:bg-[#e04f00] text-white font-semibold text-base shadow-md transition-all active:scale-[0.99]"
        >
          {added ? (
            <span className="flex items-center justify-center space-x-2">
              <Check className="w-5 h-5 stroke-[2.5]" />
              <span>Added to cart ({totalItems})</span>
            </span>
          ) : (
            `Add to cart`
          )}
        </Button>
        <div className="w-32 h-1 bg-black rounded-full mx-auto mt-4" />
      </div>
    </div>
  );
}
