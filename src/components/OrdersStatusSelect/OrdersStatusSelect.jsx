"use client"

import { useState } from "react"

export default function OrdersStatusSelect({ orderId, currentStatus }) {
    const [status, setStatus] = useState(currentStatus)

    async function handleStatusChange(event) {
        const newStatus = event.target.value

        setStatus(newStatus)

        const response = await fetch(`/api/orders/${orderId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                status: newStatus,
            }),
        })

        
if (!response.ok) {
    const errorText = await response.text()

    console.error("ORDER STATUS ERROR:", errorText)
    console.error("STATUS CODE:", response.status)

    setStatus(currentStatus)
}
    }

    return (
        <select
            value={status}
            onChange={handleStatusChange}
               className="rounded-full border border-[#E5D8C8] bg-[#F7F2E8] px-4 py-2 text-xs font-medium text-[#3A2A22] outline-none transition focus:border-[#3A2A22]"
        >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
        </select>
    )
}