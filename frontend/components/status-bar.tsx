"use client";

import React from "react";
import { Wifi } from "lucide-react";

export const StatusBar: React.FC = () => {
  return (
    <div className="w-full flex items-center justify-between px-7 pt-3 pb-1 text-black select-none">
      <span className="text-[15px] font-semibold tracking-tight">9:41</span>
      <div className="flex items-center space-x-2">
        <div className="flex items-end space-x-0.5 h-3">
          <div className="w-0.5 h-1 bg-black rounded-sm" />
          <div className="w-0.5 h-1.5 bg-black rounded-sm" />
          <div className="w-0.5 h-2 bg-black rounded-sm" />
          <div className="w-0.5 h-2.5 bg-black rounded-sm" />
        </div>
        <Wifi className="w-4 h-4 text-black stroke-[2.5]" />
        <div className="w-5 h-2.5 border border-black rounded-[3px] p-[1px] flex items-center">
          <div className="w-full h-full bg-black rounded-[1px]" />
        </div>
      </div>
    </div>
  );
};
