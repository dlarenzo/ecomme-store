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
  // function to clear the cart
  clearCart: () => void;
  // function to get the total price of the cart
  // getTotalPrice: () => number;
  // function to get the total quantity of items in the cart
  // getTotalQuantity: () => number;
}

// HOOK
export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      // set allows us to manipulate state of item
      items: [],

      // ADD ITEM TO CART
      // function to add an item to the cart
      addItem: (item) =>
        set((state) => {
          // Check if the item already exists in the cart
          const existing = state.items.find((i) => i.id === item.id);

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }

          return { items: [...state.items, item] };
        }),

      // REMOVE ITEM FROM CART function
      removeItem: (id) =>
        set((state) => {
          return {
            items: state.items
              .map((item) =>
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
              )
              .filter((item) => item.quantity > 0),
          };
        }),

      // CLEAR CART function
      clearCart: () =>
        set(() => {
          return { items: [] };
        }),
    }),
    { name: "cart" }
  )
);
