"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store";
import { checkoutAction } from "./checkout-action";

export default function CheckoutPage() {
  // Get information about the checkout cart items
  const { items, removeItem, addItem, clearCart } = useCartStore();

  // Use reduce function to count through array to get total number of items
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (total === 0 || items.length === 0) {
    return (
      <div>
        <h1>Your Cart is Empty!</h1>
      </div>
    );
  }

  // DISPLAY THE ITEMS IN THE CHECKOUT PAGE
  return (
    <div className="container mx=auto px=4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      <Card className="max-w-md mx-auto 8">
        <CardHeader>Order Summary</CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {/* MAP THROUGH THE ITEMS IN THE CART */}
            {/* Display the items in the cart */}
            {items.map((item, key) => (
              <li key={key} className="flex flex-col gap-2 border-b pb-2x">
                <div className="flex justify-between">
                  <span>{item.name} </span>
                  <span>
                    ${((item.price * item.quantity) / 100).toFixed(2)}
                  </span>
                </div>
                {/* AMOUNT AND BUTTONS TO INCREMENT */}
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={() => removeItem(item.id)}>
                    {" "}
                    -
                  </Button>
                  <span className="mx-2d"> {item.quantity}</span>
                  <Button onClick={() => addItem({ ...item, quantity: 1 })}>
                    {" "}
                    +
                  </Button>
                </div>
              </li>
            ))}
          </ul>

          {/* TOTAL AMOUNT OF CART */}
          <div className="mt-4 border-t pt-2 text-lg font-semibold">
            Total: $ {(total / 100).toFixed(2)}
          </div>
        </CardContent>
      </Card>

      {/* PROCEED TO PAYMENT STRIPE */}
      <form action={checkoutAction} className="max-w-md mx-auto mt-8">
        {/* hidden input which contains the items cart */}
        <input type="hidden" name="items" value={JSON.stringify(items)} />
        <Button type="submit" variant={"default"} className="w-full">
          {" "}
          Proceed to Payment
        </Button>

        {/* CLEAR CART */}
        <Button
          onClick={() => clearCart()}
          variant={"default"}
          className="w-full mt-4"
        >
          {" "}
          Clear Cart
        </Button>
      </form>
    </div>
  );
}
