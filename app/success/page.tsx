"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
export default function SuccessPage() {
  // AUTOMATICALLY CLEAR CART
  const { clearCart } = useCartStore();
  useEffect(() => {
    clearCart();
  }, [clearCart]);
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Payment was successful!</h1>
      <p className="mb-4">
        Thank you for your purchase with EComm Store! Your order is being
        processed.
      </p>

      <Link href={"/products"} className="text-blue-600 hover:underline">
        {" "}
        Continue Shopping!
      </Link>
    </div>
  );
}
