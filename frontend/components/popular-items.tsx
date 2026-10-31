"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { safeString } from "@/lib/utils";

interface PopularItemsProps {
  items: Array<{
    id: string;
    name: string;
    date: string;
    price: string;
    items: string;
    image: string;
  }>;
}

export const PopularItems: React.FC<PopularItemsProps> = ({ items }) => {
  const router = useRouter();

  return (
    <div className="px-5 pt-2">
      <h2 className="text-[17px] font-bold text-neutral-900 mb-3">Popular Items</h2>
      <div className="flex flex-col space-y-3.5">
        {items.map((item, idx) => {
          const name = safeString(item.name);
          const price = safeString(item.price);
          const date = safeString(item.date);
          const itemCount = safeString(item.items);
          const image = safeString(item.image) || "";

          return (
            <div
              key={safeString(item.id) || idx}
              onClick={() => router.push(`/item/${item.id}`)}
              className="flex items-center space-x-3.5 p-2 rounded-2xl bg-white border border-neutral-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] cursor-pointer active:scale-[0.99] transition-transform"
            >
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-neutral-100 shrink-0">
                <img
                  src={image || "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&auto=format&fit=crop&q=80"}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <h4 className="text-[15px] font-bold text-neutral-900 truncate">
                    {name}
                  </h4>
                  <span className="text-[15px] font-bold text-[#FF5A00] ml-2">
                    {price}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-neutral-400 mt-0.5">
                  <span>{date}</span>
                  <span>{itemCount}</span>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="px-3 py-1 rounded-full bg-[#E05322] text-white text-[11px] font-semibold">
                    Cancel Order
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#FCECE5] text-[#E05322] text-[11px] font-semibold">
                    Track Driver
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

