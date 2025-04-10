import Link from "next/link";

export default function Home() {
  return (
    <div>
      {" "}
      <h2 className="text-orange-700">Hello</h2>
      <div className="flex flex-col space-y-4">
        <Link href="/products" className="text-green-700 hover:underline">
          Checkout
        </Link>
        <Link href="/cart">Cart</Link>
      </div>
    </div>
  );
}
