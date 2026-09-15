
import connectToDatabase from "@/lib/mongodb"
import Product from "@/models/Product"
import EditProductForm from "./EditProductForm"

import { notFound } from "next/navigation"

export default async function EditProductPage({ params }) {
    const { id } = await params

    await connectToDatabase()

    const product = await Product.findById(id).lean()

    if (!product) {
        notFound()
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-[#3A2A22]">
                Edit product
            </h1>

            <EditProductForm
                product={{
                    _id: product._id.toString(),
                    name: product.name,
                    price: product.price,
                    category: product.category,
                    image: product.image,
                    description: product.description,
                    stock: product.stock,
                    isNewArrival: product.isNewArrival,
                    isBestSeller: product.isBestSeller,
                }} 
                />
        </div>
    )
}