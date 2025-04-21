"use client";
import Link from "next/link";

import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useCartStore } from "@/store/cart-store";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export const Navbar = () => {
  // mobile open
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  // Cart count number items in the cart
  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  // Toggle mobile menu
  // Grabs size of the window
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileOpen(false);
      }
    };
    // add event listener
    window.addEventListener("resize", handleResize);

    // remove event listener so no memory leaks
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow ">
      <div className="container  mx-auto flex items-center justify-between py-4 px-4">
        <Link href="/" className="hover:text-blue-600">
          {" "}
          EComm Store
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link href="/">Home</Link>
          <Link href="/products" className="hover:text-blue-600">
            Products
          </Link>
          <Link href="/checkout" className="hover:text-blue-600">
            Checkout
          </Link>
        </div>
        {/* CART INFORMATION */}
        <div className="flex items-center space-x-4">
          <Link href="/checkout" className="relative">
            <ShoppingCartIcon className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {" "}
                {cartCount}
              </span>
            )}
          </Link>
          <Button
            variant="ghost"
            className="md:hidden"
            // set mobile button to toggle from bars to x icon
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <XMarkIcon /> : <Bars3Icon />}
          </Button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <nav className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col p-4 space-y-2">
            <li>
              <Link href={"/"} className="block hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link href={"/products"} className="block hover:text-blue-600">
                Products
              </Link>
            </li>
            <li>
              <Link href={"/checkout"} className="block hover:text-blue-600">
                Checkout
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </nav>
  );
};
