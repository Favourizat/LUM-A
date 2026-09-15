"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function EditProductForm({ product }) {

    const router = useRouter()

    const [name, setName] = useState(product.name)
    const [price, setPrice] = useState(product.price)
    const [category, setCategory] = useState(product.category)
    const [image, setImage] = useState(product.image)
    const [description, setDescription] = useState(product.description)

    const [stock, setStock] = useState(product.stock)
    const [isNewArrival, setIsNewArrival] = useState(product.isNewArrival ?? false)
    const [isBestSeller, setIsBestSeller] = useState(product.isBestSeller)
    const [success, setSuccess] = useState("")



    async function handleSubmit(event) {
        event.preventDefault()

        const updatedProduct = {
            name,
            price: Number(price),
            category,
            image,
            description,
            stock: Number(stock),
            isNewArrival,
            isBestSeller,
        }

        const response = await fetch(`/api/products/${product._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct)
        })

        if (!response.ok) {
            console.log("Failed to update product")
            return
        }

        const data = await response.json()

        console.log("Product updated:", data)

        setSuccess("Product updated successfully!")

        setTimeout(() => {
            router.push("/admin/products")
        }, 1500);
    }

    return (
        <form onSubmit={handleSubmit}
            className="mt-8 space-y-8"
        >
            <div className="space-y-2">
                <label className="text-sm font-medium text-[#3A2A22]">
                    Product Name
                </label>

                <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="w-full rounded-xl border border-[#E5D8C8] px-4 py-3 outline-none" />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-[#3A2A22]">
                    Price
                </label>

                <input
                    type="number"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    className="w-full rounded-xl border border-[#E5D8C8] px-4 py-3 outline-none" />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-[#3A2A22]">
                    Category
                </label>

                <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    className="w-full rounded-xl border border-[#E5D8C8] px-4 py-3 outline-none"
                >
                    <option value="">Select a Category</option>
                    <option value="CLEANSERS">Cleansers</option>
                    <option value="TONERS">Toners</option>
                    <option value="SERUMS">Serums</option>
                    <option value="MOISTURIZERS">Moisturizers</option>
                    <option value="SUNSCREEN">Sunscreen</option>
                    <option value="BODYCARE">Bodycare</option>
                    <option value="TREATMENTS">Treatments</option>
                    <option value="EYECARE">Eyecare</option>
                    <option value="LIPCARE">Lipcare</option>
                </select>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-[#3A2A22]">
                    Image URL
                </label>

                <input
                    type="text"
                    value={image}
                    onChange={(event) => setImage(event.target.value)}
                    className="w-full rounded-xl border border-[#E5D8C8] px-4 py-3 outline-none"
                    placeholder="https://..."
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-[#3A2A22]">
                    Description
                </label>

                <textarea
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    rows={5}
                    className="w-full rounded-xl border border-[#E5D8C8] px-4 py-3 outline-none"
                    placeholder="Enter product description..."
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-[#3A2A22]">
                    Stock
                </label>

                <input
                    type="number"
                    value={stock}
                    onChange={(event) => setStock(event.target.value)}
                    min="0"
                    className="w-full rounded-xl border border-[#E5D8C8] px-4 py-3 outline-none"
                />
            </div>

            <div className="flex items-center gap-6">

                <label className="flex items-center gap-2 text-sm text-[#3A2A22]">
                    <input
                        type="checkbox"
                        checked={isNewArrival}
                        onChange={(event) => setIsNewArrival(event.target.checked)} />
                    New Arrival
                </label>

                <label className="flex items-center gap-2 text-sm text-[#3A2A22]">
                    <input
                        type="checkbox"
                        checked={isBestSeller}
                        onChange={(event) => setIsBestSeller(event.target.checked)}
                    />
                    Best Seller
                </label>

            </div>

            {success && (
                <p className="text-sm font-medium text-[#7D8B72]">
                    {success}
                </p>
            )}

            <button
                type="submit"
                className="rounded-full bg-[#3A2A22] px-6 py-3 text-sm font-medium text-[#F7F2E8] transition hover:opacity-90"
            >
                Update Product
            </button>

        </form>
    )
}