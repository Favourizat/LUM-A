"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false)

  const router = useRouter()
  const {data: session} = useSession()

  function handleAddToCart() {
  if(!session){
    router.push("/login")
    return
  }
  addToCart(product);

  setAdded(true)

  setTimeout(() => {
    setAdded(false)
  }, 2000);
}

  return (
    <button
      onClick={handleAddToCart}
      className="mt-8 w-full rounded-full bg-[#3A2A22] px-8 py-4 text-sm font-medium tracking-wide text-[#F7F2E8] transition hover:opacity-90 md:max-w-md"
    >
     {added ? "Added to Cart!" : " Add to Cart"}
    </button>
  );
}