import { ProductList } from "@/components/product-list";
import { stripe } from "@/lib/stripe";

export default async function ProductsPage() {
  // Get list of products from Stripe
  const products = await stripe.products.list({
    // specify how want to query the properties
    expand: ["data.default_price"],
  });
  return (
    <div className="pb-8">
      <h1 className="text-5xl font-bold leading-none tracking-tight text-foreground text-center mb-8">
        All Products
      </h1>
      <ProductList products={products.data} />
    </div>
  );
}
