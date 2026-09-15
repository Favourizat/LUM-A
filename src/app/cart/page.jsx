
"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, isLoaded } = useCart();

  console.log("CART PAGE:", cart);

  if (!isLoaded) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p>
          Loading cart...
        </p>
      </main>
    )
  }

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  )

  const shipping = subtotal >= 50000 ? 0 : 3000;

  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-6 py-20">
        <div className="text-center">
          <p className="text-xs font-medium tracking-[0.3em] text-[#7D8B72]">
            LUMÉA
          </p>

          <h1 className="mt-3 text-4xl font-medium text-[#3A2A22]">
            Your Cart Is Empty
          </h1>

          <p className="mt-4 text-sm text-[#3A2A22]/60">
            You haven't added anything to your cart yet.
          </p>

          <Link
            href="/products"
            className="mt-8 inline-block rounded-full bg-[#3A2A22] px-8 py-4 text-sm font-medium text-[#F7F2E8] transition hover:opacity-90"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="px-4 py-12 md:px-6 md:py-20">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-10">
          <p className="text-xs font-medium tracking-[0.3em] text-[#7D8B72]">
            LUMÉA
          </p>

          <h1 className="mt-2 text-4xl font-medium text-[#3A2A22] sm:text-5xl">
            Your Cart
          </h1>

          <p className="mt-3 text-sm text-[#3A2A22]/60">
            {cart.length} item(s) in your cart
          </p>
        </div>

        {/* Cart */}
        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">

          {/* Cart Items */}
          <div className="space-y-6">

            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-5 border-b border-[#E5D8C8] pb-6"
              >

                {/* Product Image */}
                <div className="relative h-32 w-28 flex-shrink-0 overflow-hidden rounded-xl bg-[#F7F2E8] sm:h-40 sm:w-32">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Product Information */}
                <div className="flex flex-1 flex-col justify-between">

                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#7D8B72]">
                      {item.category}
                    </p>

                    <h2 className="mt-2 text-sm font-medium text-[#3A2A22] sm:text-base">
                      {item.name}
                    </h2>

                    <p className="mt-2 text-sm text-[#3A2A22]/70">
                      ₦{item.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E5D8C8] text-[#3A2A22] transition hover:bg-[#E5D8C8]"
                      aria-label={`Decrease quantity of ${item.name}`}>
                      -
                    </button>

                    <p className="mt-4 text-xs text-[#3A2A22]/60">
                      Quantity: {item.quantity}
                    </p>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E5D8C8] text-[#3A2A22] transition hover:bg-[#E5D8C8]"
                      aria-label={`Increase quantity of ${item.name}`}>
                      +
                    </button>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="mt-3 text-xs text-[#3A2A22]/50 underline underline-offset-4 transition hover:text-[#3A2A22]">
                      Remove from Cart
                    </button>

                  </div>

                </div>

                {/* Item Total */}
                <div className="text-right">
                  <p className="text-sm font-medium text-[#3A2A22]">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>

              </div>
            ))}

          </div>

          {/* Summary */}
          <div className="h-fit rounded-2xl bg-[#F7F2E8] p-6 md:p-8">

            <h2 className="text-lg font-medium text-[#3A2A22]">
              Order Summary
            </h2>

            <div className="mt-6 flex items-center justify-between text-sm">
              <span className="text-[#3A2A22]/60">
                Subtotal
              </span>

              <span className="font-medium text-[#3A2A22]">
                ₦{subtotal.toLocaleString()}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between border-b border-[#E5D8C8] pb-5 text-sm">
              <span className="text-[#3A2A22]/60">
                Shipping
              </span>

              <span className="font-medium text-[#3A2A22]">
                {shipping === 0
                  ? "Free"
                  : `₦${shipping.toLocaleString()}`}
              </span>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span className="font-medium text-[#3A2A22]">
                Total
              </span>

              <span className="text-lg font-medium text-[#3A2A22]">
                ₦{total.toLocaleString()}
              </span>
            </div>

            <div className="pt-10 flex items-center justify-center">
              <Link
                href="/checkout"
                className="mt-6 w-full text-center rounded-full bg-[#3A2A22] px-4 py-4 text-sm font-medium text-[#F7F2E8] transition hover:opacity-90"
              >
                Proceed to Checkout
              </Link>

            </div>

            <div className="mt-10">
              <Link
                href="/products"
                className="mt-4 block text-center text-sm text-[#3A2A22]/60 transition hover:text-[#3A2A22]"
              >
                Continue Shopping
              </Link>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}
