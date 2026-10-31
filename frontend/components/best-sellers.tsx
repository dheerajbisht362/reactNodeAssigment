"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { safeString } from "@/lib/utils";

interface BestSellersProps {
  items: Array<{
    id: string;
    name: string;
    price: string;
    image: string;
  }>;
}

export const BestSellers: React.FC<BestSellersProps> = ({ items }) => {
  const router = useRouter();

  return (
    <div className="pt-4 pb-2">
      <div className="px-5 mb-3">
        <h2 className="text-[17px] font-bold text-neutral-900">Best Seller</h2>
      </div>
      <div className="flex space-x-3 overflow-x-auto px-5 no-scrollbar pb-1">
        {items.map((item, idx) => {
          const name = safeString(item.name);
          const price = safeString(item.price);
          const image = safeString(item.image) || "";

          return (
            <div
              key={safeString(item.id) || idx}
              onClick={() => router.push(`/item/${item.id}`)}
              className="w-20 shrink-0 cursor-pointer active:scale-95 transition-transform"
            >
              <div className="relative w-20 h-28 rounded-2xl overflow-hidden bg-neutral-100 shadow-sm border border-neutral-100">
                <img
                  src={image || "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&auto=format&fit=crop&q=80"}
                  alt={name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-1 right-1 bg-[#D3411B]/95 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                  {price}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

