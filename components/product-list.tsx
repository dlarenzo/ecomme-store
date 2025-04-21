"use client";
import Stripe from "stripe";
import { ProductCard } from "./product-card";
import { useState } from "react";

// Interface for ProductList component
interface Props {
  products: Stripe.Product[];
}

export const ProductList = ({ products }: Props) => {
  // Adding a search bar to filter products
  const [searchTerm, setSearchTerm] = useState<string>("");
  // Created new version of products  list to filter
  const filteredProducts = products.filter((product) => {
    const term = searchTerm.toLowerCase();
    const nameMatch = product.name.toLowerCase().includes(term);
    const descriptionMatch = product.description
      ? product.description.toLowerCase().includes(term)
      : false;

    return nameMatch || descriptionMatch;
  });
  return (
    <div>
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Products..."
          className="w-full max-w-md rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* list of products */}
      <ul className=" grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ">
        {/* Map through the products and display them */}
        {/* If there are no products, return null */}
        {filteredProducts.map((product, key) => {
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
