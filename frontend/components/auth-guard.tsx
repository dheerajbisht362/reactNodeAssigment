"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getToken } from "@/lib/auth";

export const AuthGuard: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = getToken();
    const isAuthRoute = pathname === "/signup" || pathname === "/otp";

    if (!token && !isAuthRoute) {
      router.replace("/signup");
    } else if (token && isAuthRoute) {
      router.replace("/home");
    } else {
      setChecked(true);
    }
  }, [pathname, router]);

  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-[#FF5A00] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
};
