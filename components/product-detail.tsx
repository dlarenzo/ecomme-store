"use client";

import Stripe from "stripe";
import Image from "next/image";
import { Button } from "./ui/button";

// Import HOOKS
import { useCartStore } from "@/store/cart-store";

interface Props {
  product: Stripe.Product;
}
export const ProductDetail = ({ product }: Props) => {
  // Hook pulled from cart-store.ts
  const { items, addItem, removeItem } = useCartStore();

  const price = product.default_price as Stripe.Price;

  // Tell if the current cartItem is already in the cart
  const cartItem = items.find((item) => item.id === product.id);

  // Get the quantity of the item in the cart
  const quantity = cartItem ? cartItem.quantity : 0;

  // onAddItem function to add the item to the cart
  const onAddItem = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: price.unit_amount as number,
      imageUrl: product.images ? product.images[0] : null,
      quantity: 1,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 items-center">
      {product.images && product.images[0] && (
        <div className="relative h-96 w-full md:w-1/2 rounded-lg overflow-hidden">
          <Image
            alt={product.name}
            src={product.images[0]}
            layout="fill"
            objectFit="cover"
            className="group-hover:opacity-90 transition-opacity duration-300 rounded-t-lg"
          />
        </div>
      )}

      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold mb-4"> {product.name}</h1>
        {product.description && (
          <p className="text-gray-700 mb-4">{product.description}</p>
        )}

        {price && price.unit_amount && (
          <p className="text-lg font-semibold text-gray-900">
            {" "}
            ${(price.unit_amount / 100).toFixed(2)}
          </p>
        )}

        {/* ADD AND SUBTRACT ITEM FROM CART */}
        <div>
          <Button variant="outline" onClick={() => removeItem(product.id)}>
            {" "}
            -
          </Button>
          <span className="mx-2"> {quantity}</span>
          <Button onClick={onAddItem}> +</Button>
        </div>
      </div>
    </div>
  );
};
