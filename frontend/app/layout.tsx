import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/components/cart-provider";
import { AuthGuard } from "@/components/auth-guard";

export const metadata: Metadata = {
  title: "Fastor Food Ordering",
  description: "Mobile-first food ordering experience powered by Fastor",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-100 flex justify-center min-h-screen">
        <div className="w-full max-w-[430px] min-h-screen bg-white shadow-2xl relative flex flex-col overflow-hidden">
          <CartProvider>
            <AuthGuard>{children}</AuthGuard>
          </CartProvider>
        </div>
      </body>
    </html>
  );
}

