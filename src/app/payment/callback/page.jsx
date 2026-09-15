"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useCart } from "@/context/CartContext"

export default function PaymentCallbackPage() {
    const searchParams = useSearchParams()

    const reference = searchParams.get("reference")

    const [status, setStatus] = useState("verifying")

    const {clearCart} = useCart()

    async function verifyPayment() {
        const response = await fetch(
            `/api/payments/verify?reference=${reference}`
        )

        const text = await response.text() 
        console.log("VERIFY RESPONSE STATUS:", response.status) 
        console.log("VERIFY RESPONSE:", text) 
        const data = text ? JSON.parse(text) : {}

        
if (!response.ok) {
    console.error("PAYMENT VERIFICATION STATUS:", response.status)
    console.error("PAYMENT VERIFICATION RESPONSE:", text)
    console.error("PAYMENT VERIFICATION ERROR:", data)

    setStatus("error")
    return
}

        console.log("PAYMENT VERIFIED:", data)

        clearCart();

        setStatus("success")
    }

    useEffect(() => {
        if (reference) {
            verifyPayment()
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
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-semibold">
                        Payment successful!
                    </h1>

                    <p className="mt-3">
                        Thank you for your order. Your payment has been confirmed.
                    </p>
                </div>
            </div>
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
                        We could not confirm your payment. Please contact support if you were charged.
                    </p>
                </div>
            </div>
        )
    }
}