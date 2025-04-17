import { create } from "zustand";
// Keep track of your cart items in local storage
// and persist them across page reloads
import { persist } from "zustand/middleware";

// Defines what is an item in the cart
export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  // Helps us to keep track of the quantity of the item in the cart
  // This is important for the checkout process
  // and for displaying the total price of the cart
  quantity: number;
}

// defines the zustand store will look like
interface CartStore {
  // list of items in the cart
  items: CartItem[];
  // function to add an item to the cart
  addItem: (item: CartItem) => void;
  // function to remove an item from the cart
  removeItem: (id: string) => void;
}

// HOOK
export const useCartStore = create<CartStore>();
