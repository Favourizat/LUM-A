
"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useCart } from "@/context/CartContext"
import Link from "next/link"

function PaymentCallbackContent() {
    const searchParams = useSearchParams()

    const reference = searchParams.get("reference")

    const [status, setStatus] = useState("verifying")

    const { clearCart } = useCart()

    async function verifyPayment() {
        try {
            const response = await fetch(
                `/api/payments/verify?reference=${reference}`
            )

            const text = await response.text()

            console.log("VERIFY RESPONSE STATUS:", response.status)
            console.log("VERIFY RESPONSE:", text)

            const data = text ? JSON.parse(text) : {}

            if (!response.ok) {
                console.error(
                    "PAYMENT VERIFICATION STATUS:",
                    response.status
                )
                console.error(
                    "PAYMENT VERIFICATION RESPONSE:",
                    text
                )
                console.error(
                    "PAYMENT VERIFICATION ERROR:",
                    data
                )

                setStatus("error")
                return
            }

            console.log("PAYMENT VERIFIED:", data)

            clearCart()

            setStatus("success")
        } catch (error) {
            console.error("PAYMENT VERIFICATION FAILED:", error)
            setStatus("error")
        }
    }

    useEffect(() => {
        if (reference) {
            verifyPayment()
        } else {
            setStatus("error")
        }
    }, [reference])

    if (status === "verifying") {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <h1 className="text-2xl font-semibold">
                    Verifying your payment...
                </h1>
            </div>
        )
    }

    if (status === "success") {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#F7F2E8] px-6">
                <div className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-sm md:p-12">

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#7D8B72]/15">
                        <span className="text-2xl text-[#7D8B72]">
                            ✓
                        </span>
                    </div>

                    <p className="mt-6 text-xs font-medium tracking-[0.3em] text-[#7D8B72]">
                        LUMÉA
                    </p>

                    <h1 className="mt-3 text-3xl font-medium text-[#3A2A22]">
                        Payment successful
                    </h1>

                    <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#3A2A22]/60">
                        Thank you for your order. Your payment has been
                        successfully confirmed.
                    </p>

                    <p className="mt-6 text-sm font-medium text-[#3A2A22]">
                        Payment Reference
                    </p>

                    <p className="mt-2 text-sm text-[#3A2A22]/60">
                        {reference}
                    </p>

                    <Link
                        href="/products"
                        className="mt-8 inline-block rounded-full bg-[#3A2A22] px-8 py-4 text-sm font-medium text-[#F7F2E8] transition hover:opacity-90"
                    >
                        Continue Shopping
                    </Link>

                </div>
            </main>
        )
    }

    if (status === "error") {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-semibold">
                        Payment Verification Failed
                    </h1>

                    <p className="mt-3">
                        We could not confirm your payment. Please contact
                        support if you were charged.
                    </p>
                </div>
            </div>
        )
    }
}

export default function PaymentCallbackPage() {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-screen items-center justify-center">
                    <h1 className="text-2xl font-semibold">
                        Loading payment details...
                    </h1>
                </div>
            }
        >
            <PaymentCallbackContent />
        </Suspense>
    )
}
