import Link from "next/link";
import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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
          {/* SECTION 1 */}
          <div>
            <h2>Welcome to EComm Store</h2>
            <p>
              Discover our exclusive collection of products for the best prices.
            </p>
            <Button asChild variant="default">
              <Link href="/products"> See All Products </Link>
            </Button>
          </div>

          {/* SECTION 2 */}
          <Image
            alt="Banner Image"
            width={450}
            height={450}
            src={products.data[1].images[0]}
          />
        </div>
      </section>
    </div>
  );
}
