import Link from "next/link";
import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Carousel } from "@/components/carousel";

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
      <section className="rounded bg-neutral-100 py-8 sm:py-12">
        <div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-8 px-8 sm:px-16 md:grid-cols-2">
          {/* SECTION 1 */}
          <div className="max-w-md space-y-4">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Welcome to EComm Store
            </h2>
            <p className="text-neutral-600">
              Discover our exclusive collection of products for the best prices.
            </p>
            <Button
              asChild
              variant="default"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-black text-sm font-semibold text-white shadow-sm ring-1 ring-neutral-900/10 hover:ring-neutral-900/20"
            >
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full px-6 py-3"
              >
                {" "}
                See All Products{" "}
              </Link>
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

      {/* CAROUSEL */}
      <section className="py-8">
        <Carousel products={products.data} />
      </section>
    </div>
  );
}
