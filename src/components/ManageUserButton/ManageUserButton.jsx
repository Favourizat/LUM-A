"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ManageUserButton({ user }) {
    const [isOpen, setIsOpen] = useState(false)
    const [role, setRole] = useState(user.role)
    const [isUpdating, setIsUpdating] = useState(false)

    const router = useRouter()

    async function handleRoleChange(event) {
        const newRole = event.target.value

        setRole(newRole)
        setIsUpdating(true)

        const response = await fetch(`/api/admin/users/${user._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                role: newRole,
            })
        })

        if (!response.ok) {
            console.error("ROLE UPDATE FAILED", response.status)
            setRole(user.role)
            setIsUpdating(false)
            return
        }

        const data = await response.json()

        console.log("ROLE UPDATED", data.user)

        setIsUpdating(false)
        router.refresh()
        setIsOpen(false)
    }

    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-sm text-[#3A2A22] hover:underline">
                {isOpen ? "Close" : "Manage"}
            </button>

            {isOpen && (
            <div
                className="mt-3"
            >
                <select
                    value={role}
                    onChange={handleRoleChange}
                    disabled={isUpdating}
                    className="rounded-lg border border-[#E5D8C8] bg-[#F7F2E8] px-3 py-2 text-xs text-[#3A2A22]"
                >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                </select>

                {isUpdating && (
                    <span
                        className="ml-2 text-xs text-[#3A2A22]/60">
                        Saving...
                    </span>
                )}
            </div>
            )}
        </div>
    )
}
