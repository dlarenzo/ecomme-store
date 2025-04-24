"use server";
import { stripe } from "@/lib/stripe";
import { CartItem } from "@/store/cart-store";
import { redirect } from "next/navigation";

export const checkoutAction = async (formData: FormData): Promise<void> => {
  const itemsJson = formData.get("items") as string;
  const items = JSON.parse(itemsJson);

  // MAP CART ITEM
  const line_items = items.map((item: CartItem) => ({
    price_data: {
      currency: "usd",
      product_data: { name: item.name },
      unit_amount: item.price,
    },
    quantity: item.quantity,
  }));

  // CREATE A STRIPE CHECKOUT SESSION
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
  });

  // REDIRECT TO THE CHECKOUT SESSION
  redirect(session.url!);
};

// TO BE IMPLEMENTED IN THE app > checkout > page.tsx > form action= {}
