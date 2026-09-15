"use client"

export default function DeleteProductButton({ productId }) {

    async function handleDelete() {
        const confirned = window.confirm(
            "Are you sure you want to delete this product?"
        )

        if (!confirned) {
            return
        }

        const response = await fetch(`/api/products/${productId}`, {
            method: "DELETE",
        })

        if (!response.ok) {
            console.log("Failed to delete product")
            return
        }

        console.log("Product deleted successfully")
        window.location.reload()
    }

    return (
        <button
            className="ml-4 text-sm font-medium text-red-600 hover:underline"
            onClick={handleDelete}
            >
                Delete
        </button>
    )
}