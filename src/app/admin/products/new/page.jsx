"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NewProductPage() {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescriptuon] = useState("")
    const [stock, setStock] = useState("")
    const [isNewArrival, setisNewArrival] = useState(false)
    const [isBestSeller, setIsBestSeller] = useState(false);
    const [success, setSuccess] = useState("")

    const router = useRouter()

    async function handleSubmit(event) {
        event.preventDefault()

        console.log("Form submitted")

        const slug = name
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")

        const productData = {
            name,
            slug,
            price: Number(price),
            category,
            image,
            images: [],
            description,
            stock: Number(stock),
            isNewArrival,
            isBestSeller,
        }

        const response = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(productData)
        })

        if (!response.ok) {
            console.log("Failed to create product")
            return
        }

        const data = await response.json()
        console.log(data)

        setSuccess("Product created successfully!");

        setTimeout(() => {
            router.push("/admin/products")
        }, 1000)
    }

    return (
        <div>

            {
                success && (
                    <p className="mt-6 text-sm font-medium text-[#7D8B72]">
                        {success}
                    </p>
                )
            }
            <h1 className="text-2xl font-bold text-[#3A2A22]">
                Add product
            </h1>

            <form onSubmit={handleSubmit}>
                <div className="mt-4 ">
                    <label htmlFor=""
                        className="block text-sm font-medium text-[#3A2A22]">
                        Product Name
                    </label>

                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter product Name"
                        className="mt-2 w-full rounded-lg border border-[#E5D8C8] px-4 py-3 outline-none"
                    />
                </div>

                <div className="mt-4 ">
                    <label htmlFor=""
                        className="block text-sm font-medium text-[#3A2A22]">
                        Price
                    </label>

                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter product Price"
                        className="mt-2 w-full rounded-lg border border-[#E5D8C8] px-4 py-3 outline-none"
                    />
                </div>

                <div className="mt-6">
                    <label htmlFor=""
                        className="block text-sm font-medium text-[#3A2A22]">
                        Category
                    </label>

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="mt-2 w-full rounded-lg border border-[#E5D8C8] px-4 py-3 outline-none"
                    >
                        <option value="">Select a Category</option>
                        <option value="CLEANSERS">Cleansers</option>
                        <option value="TONERS">Toners</option>
                        <option value="SERUMS">Serums</option>
                        <option value="MOISTURIZERS">Moisturizers</option>
                        <option value="SUNSCREEN">Sunscreen</option>
                        <option value="BODYCARE">Bath & Body</option>
                        <option value="TREATMENTS">Treatments</option>
                        <option value="EYE CARE">Eye Care</option>
                        <option value="LIP CARE">Lip Care</option>
                    </select>
                </div>

                <div className="mt-4 ">
                    <label htmlFor=""
                        className="block text-sm font-medium text-[#3A2A22]">
                        Product Image
                    </label>

                    <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="Enter product Image"
                        className="mt-2 w-full rounded-lg border border-[#E5D8C8] px-4 py-3 outline-none"
                    />
                </div>

                <div className="mt-4 ">
                    <label htmlFor=""
                        className="block text-sm font-medium text-[#3A2A22]">
                        Description
                    </label>

                    <textarea
                        value={description}
                        onChange={(e) => setDescriptuon(e.target.value)}
                        placeholder="Enter product description"
                        rows={5}
                        className="mt-2 w-full rounded-lg border border-[#E5D8C8] px-4 py-3 outline-none"
                    />
                </div>

                <div className="mt-6">
                    <label className="block text-sm font-medium text-[#3A2A22]">
                        Stock
                    </label>

                    <input
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        placeholder="Enter stock quantity"
                        min="0"
                        className="mt-2 w-full rounded-lg border border-[#E5D8C8] px-4 py-3 outline-none"
                    />
                </div>

                <div className="mt-6 flex items-center gap-3">
                    <input
                        type="checkbox"
                        checked={isNewArrival}
                        onChange={(e) => setisNewArrival(e.target.checked)}
                    />

                    <label className="text-sm font-medium text-[#3A2A22]">
                        Mark as New Arrival
                    </label>
                </div>


                <div className="mt-6 flex items-center gap-3">
                    <input
                        type="checkbox"
                        checked={isBestSeller}
                        onChange={(e) => setIsBestSeller(e.target.checked)}
                    />

                    <label className="text-sm font-medium text-[#3A2A22]">
                        Mark as Best Seller
                    </label>
                </div>

                <button
                    type="submit"
                    className="mt-8 rounded-full bg-[#3A2A22] px-6 py-3 text-sm font-medium text-[#F7F2E8]">
                    Add product
                </button>
            </form>

        </div>
    )
}