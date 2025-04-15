import Stripe from "stripe";
import { ProductCard } from "./product-card";

// Interface for ProductList component
interface Props {
  products: Stripe.Product[];
}

export const ProductList = ({ products }: Props) => {
  return (
    <div>
      <div className="mb-6 flex justify-center">
        <input type="text" placeholder="Search Products..." />
      </div>

      {/* list of products */}
      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr">
        {/* Map through the products and display them */}
        {/* If there are no products, return null */}
        {products.map((product, key) => {
          return (
            <li key={key}>
              <ProductCard product={product} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
