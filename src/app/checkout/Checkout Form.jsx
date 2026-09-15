"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CheckoutForm() {
    const { cart, isLoaded } = useCart()

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [errors, setErrors] = useState({})

    if (!isLoaded) {
        return (
            <main className="flex min-h-[60vh] items-center justify-center px-6">
                <p className="text-sm text-[#3A2A22]/60">
                    Loading checkout
                </p>
            </main>
        )
    }

    if (cart.length === 0) {
        return (
            <main className="flex min-h-[60vh] items-center justify-center px-6 py-12">
                <div className="max-w-md text-center">

                    <p className="text-xs font-medium tracking-[0.3em] text-[#7D8B72]">
                        LUMÉA
                    </p>

                    <h1 className="mt-3 font-medium text-3xl text-[#3A2A22]">
                        Your cart is empty
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-[#3A2A22]/60">
                        Add some products to your cart before proceeding to checkout
                    </p>

                    <Link
                        href="/products"
                        className="mt-8 inline-block rounded-full bg-[#3A2A22] px-8 py-4 text-sm font-medium tracking-wide text-[#F7F2E8] transition hover:opacity-90"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </main>
        )
    }

    const subtotal = cart.reduce(
        (total, items) => total + items.price * items.quantity,
        0
    )

    const delivery = subtotal >= 50000 ? 0 : 3000

    const total = subtotal + delivery;

    async function handleSubmit(event) {
        event.preventDefault()

        console.log("CHECKOUT EMAIL:", email)

        const newErrors = {}

        if (!name.trim()) {
            newErrors.name = "Please enter your full name"
        }

        if (!email.trim()) {
            newErrors.email = "Please enter your email address"
        }

        if (!phone.trim()) {
            newErrors.phone = "Please enter your phone number"
        }

        if (!address.trim()) {
            newErrors.address = "Please enter your delivery address"
        }

        if (!city.trim()) {
            newErrors.city = "Please enter your city"
        }

        setErrors(newErrors)

        if (Object.keys(newErrors).length > 0) {
            return
        }
        console.log("ORDER DATA:", {
            customerName: name,
            customerEmail: email,
            customerPhone: phone,
            deliveryAddress: address,
            deliveryCity: city,
        })


        const response = await fetch("/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                items: cart.map((item) => ({
                    product: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                })),
                totalAmount: total,

                customerName: name,
                customerEmail: email,
                customerPhone: phone,
                deliveryAddress: address,
                deliveryCity: city,
            }),
        })

        if (!response.ok) {
            const errorData = await response.json();

            console.log("ORDER ERROR:", errorData);

            return;
        }

        const data = await response.json()
        console.log("ORDER CREATED:", data)
        console.log("ORDER ID:", data.order._id)

        const paymentResponse = await fetch("/api/payments/initialize", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                amount: total * 100,
                orderId: data.order._id,
            })
        })

        
const paymentText = await paymentResponse.text()

console.log("PAYMENT RESPONSE STATUS:", paymentResponse.status)
console.log("PAYMENT RESPONSE:", paymentText)

const paymentData = paymentText ? JSON.parse(paymentText) : {}

if (!paymentResponse.ok) {
    console.log("PAYMENT ERROR:", paymentData)
    return
}

        console.log("PAYMENT INITIALIZED:", paymentData)

        if(paymentData.success){
            window.location.href = paymentData.authorization_url
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <main className="px-4 py-12 md:px-6 md:py-20">

                <div className="mx-auto max-w-6xl">

                    {/* CHECKOUT LAYOUT */}
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_380px] lg:gap-20">

                        {/* LEFT SIDE */}
                        <div>

                            {/* CHECKOUT HEADER */}
                            <div className="mb-10">

                                <p className="text-xs font-medium tracking-[0.3em] text-[#7D8B72]">
                                    LUMÉA
                                </p>

                                <h1 className="mt-2 text-4xl font-medium text-[#3A2A22]">
                                    Checkout
                                </h1>

                                <p className="mt-3 text-sm text-[#3A2A22]/60">
                                    Complete your details to place your order.
                                </p>

                            </div>


                            {/* CONTACT INFORMATION */}
                            <section>

                                <div className="border-b border-[#E5D8C8] pb-4">
                                    <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3A2A22]">
                                        Contact Information
                                    </h2>
                                </div>


                                {/* FULL NAME */}
                                <div className="mt-6">

                                    <label
                                        htmlFor="name"
                                        className="mb-2 block text-sm font-medium text-[#3A2A22]"
                                    >
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter your name"
                                        className="w-full rounded-xl border border-[#E5D8C8] bg-[#F7F2E8] px-4 py-3 text-sm text-[#3A2A22] outline-none transition placeholder:text-[#3A2A22]/40 focus:border-[#3A2A22]"
                                    />

                                    {errors.name && (
                                        <p className="mt-2 text-xs text-red-700">
                                            {errors.name}
                                        </p>
                                    )}

                                </div>


                                {/* EMAIL */}
                                <div className="mt-6">

                                    <label
                                        htmlFor="email"
                                        className="mb-2 block text-sm font-medium text-[#3A2A22]"
                                    >
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        placeholder="you@example.com"
                                        className="w-full rounded-xl border border-[#E5D8C8] bg-[#F7F2E8] px-4 py-3 text-sm text-[#3A2A22] outline-none transition placeholder:text-[#3A2A22]/40 focus:border-[#3A2A22]"
                                    />

                                    {errors.email && (
                                        <p className="mt-2 text-xs text-red-700">
                                            {errors.email}
                                        </p>
                                    )}

                                </div>


                                {/* PHONE */}
                                <div className="mt-6">

                                    <label
                                        htmlFor="phone"
                                        className="mb-2 block text-sm font-medium text-[#3A2A22]"
                                    >
                                        Phone Number
                                    </label>

                                    <input
                                        type="tel"
                                        id="phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="0000 0000 0000"
                                        className="w-full rounded-xl border border-[#E5D8C8] bg-[#F7F2E8] px-4 py-3 text-sm text-[#3A2A22] outline-none transition placeholder:text-[#3A2A22]/40 focus:border-[#3A2A22]"
                                    />

                                    {errors.phone && (
                                        <p className="mt-2 text-xs text-red-700">
                                            {errors.phone}
                                        </p>
                                    )}

                                </div>

                            </section>


                            {/* DELIVERY INFORMATION */}
                            <section className="mt-12">

                                <div className="border-b border-[#E5D8C8] pb-4">
                                    <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3A2A22]">
                                        Delivery Information
                                    </h2>
                                </div>


                                {/* ADDRESS */}
                                <div className="mt-6">

                                    <label
                                        htmlFor="address"
                                        className="mb-2 block text-sm font-medium text-[#3A2A22]"
                                    >
                                        Delivery Address
                                    </label>

                                    <input
                                        type="text"
                                        id="address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="Enter your delivery address"
                                        className="w-full rounded-xl border border-[#E5D8C8] bg-[#F7F2E8] px-4 py-3 text-sm text-[#3A2A22] outline-none transition placeholder:text-[#3A2A22]/40 focus:border-[#3A2A22]"
                                    />

                                    {errors.address && (
                                        <p className="mt-2 text-xs text-red-700">
                                            {errors.address}
                                        </p>
                                    )}

                                </div>


                                {/* CITY */}
                                <div className="mt-6">

                                    <label
                                        htmlFor="city"
                                        className="mb-2 block text-sm font-medium text-[#3A2A22]"
                                    >
                                        City
                                    </label>

                                    <input
                                        type="text"
                                        id="city"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        placeholder="Enter your city"
                                        className="w-full rounded-xl border border-[#E5D8C8] bg-[#F7F2E8] px-4 py-3 text-sm text-[#3A2A22] outline-none transition placeholder:text-[#3A2A22]/40 focus:border-[#3A2A22]"
                                    />

                                    {errors.city && (
                                        <p className="mt-2 text-xs text-red-700">
                                            {errors.city}
                                        </p>
                                    )}

                                </div>

                            </section>

                        </div>


                        {/* RIGHT SIDE — ORDER SUMMARY */}
                        <aside className="lg:sticky lg:top-24 lg:self-start">

                            <div className="rounded-2xl border border-[#E5D8C8] bg-[#F7F2E8] p-6 md:p-8">

                                {/* SUMMARY HEADER */}
                                <div className="border-b border-[#E5D8C8] pb-5">

                                    <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3A2A22]">
                                        Order Summary
                                    </h2>

                                </div>


                                <div className="space-y-5 border-b border-[#E5D8C8] py-6">

                                    {cart.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center gap-4"
                                        >

                                            {/* PRODUCT IMAGE */}
                                            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>


                                            {/* PRODUCT DETAILS */}
                                            <div className="min-w-0 flex-1">

                                                <p className="truncate text-sm font-medium text-[#3A2A22]">
                                                    {item.name}
                                                </p>

                                                <p className="mt-1 text-xs text-[#3A2A22]/50">
                                                    Qty: {item.quantity}
                                                </p>

                                            </div>


                                            {/* PRODUCT PRICE */}
                                            <p className="text-sm font-medium text-[#3A2A22]">
                                                ₦{(item.price * item.quantity).toLocaleString()}
                                            </p>

                                        </div>
                                    ))}

                                </div>

                                {/* PRICE BREAKDOWN */}
                                <div className="space-y-4 py-6">

                                    {/* SUBTOTAL */}
                                    <div className="flex items-center justify-between text-sm">

                                        <span className="text-[#3A2A22]/60">
                                            Subtotal
                                        </span>

                                        <span className="font-medium text-[#3A2A22]">
                                            ₦{subtotal.toLocaleString()}
                                        </span>

                                    </div>


                                    {/* DELIVERY */}
                                    <div className="flex items-center justify-between text-sm">

                                        <span className="text-[#3A2A22]/60">
                                            Delivery
                                        </span>

                                        <span className="font-medium text-[#3A2A22]">
                                            {delivery === 0
                                                ? "Free"
                                                : `₦${delivery.toLocaleString()}`}
                                        </span>

                                    </div>

                                </div>


                                {/* TOTAL */}
                                <div className="border-t border-[#E5D8C8] pt-5">

                                    <div className="flex items-center justify-between">

                                        <span className="text-sm font-semibold uppercase tracking-wider text-[#3A2A22]">
                                            Total
                                        </span>

                                        <span className="text-lg font-semibold text-[#3A2A22]">
                                            ₦{total.toLocaleString()}
                                        </span>

                                    </div>

                                </div>

                                {/* PLACE ORDER BUTTON */}
                                <button
                                    type="submit"
                                    className="mt-6 w-full rounded-xl bg-[#3A2A22] px-6 py-4 text-sm font-medium text-[#F7F2E8] transition hover:opacity-90"
                                >
                                    Continue to Payment
                                </button>

                            </div>

                        </aside>

                    </div>

                </div>

            </main>
        </form>
    );
}