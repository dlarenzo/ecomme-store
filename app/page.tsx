import Link from "next/link";
import { stripe } from "@/lib/stripe";

export default async function Home() {
  // Get list of products from Stripe
  const products = await stripe.products.list({
    // specify how want to query the properties
    expand: ["data.default_price"],
    limit: 5,
  });
  // console log to see what we get back
  // console.log(products);
  return (
    <div>
      <section>
        <div>
          <div>
            <h2>Welcome to EComm Store</h2>
            <p>
              Discover our exclusive collection of products for the best prices.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
