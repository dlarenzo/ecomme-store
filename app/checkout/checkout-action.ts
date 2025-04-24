import { CartItem } from "@/store/cart-store";

export const checkoutAction = async (formData: FormData): Promise<void> => {
  const itemsJson = formData.get("items") as string;
  const items = JSON.parse(itemsJson);

  // MAP CART ITEM
  const line_items = items.map((item: CartItem) => ({
    price_data: {
      currency: "cad",
      product_data: { name: item.name },
      unit_amount: item.price,
    },
    quantity: item.quantity,
  }));

  // CREATE A STRIPE CHECKOUT SESSION
};

// TO BE IMPLEMENTED IN THE app > checkout > page.tsx > form action= {}
