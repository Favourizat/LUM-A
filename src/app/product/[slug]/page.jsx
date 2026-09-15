
import Image from "next/image";
import { Star, Heart } from "lucide-react";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton/AddToCartButton";
import Product from "@/models/Product";

export default async function ProductPage({ params }) {
    const { slug } = await params;

    const productsFromDatabase = await Product.findOne({
        slug: slug,
    }).lean()

    if (!productsFromDatabase) {
        return (
            <main className="flex min-h-[60vh] items-center justify-center px-6">
                <div className="text-center">
                    <h1 className="text-3xl font-medium text-[#3A2A22]">
                        Product Not Found
                    </h1>

                    <p className="mt-3 text-sm text-[#3A2A22]/60">
                        We couldn't find the product you're looking for
                    </p>
                </div>
            </main>
        );
    }

    const product = {
        id: productsFromDatabase._id.toString(),
        name: productsFromDatabase.name,
        slug: productsFromDatabase.slug,
        price: productsFromDatabase.price,
        category: productsFromDatabase.category,
        image: productsFromDatabase.image,
        images: productsFromDatabase.images,
        description: productsFromDatabase.description,
        stock: productsFromDatabase.stock,
        isNewArrival: productsFromDatabase.isNewArrival,
        isBestSeller: productsFromDatabase.isBestSeller,
    };

    return (
        <main className="px-4 py-8 md:px-6 md:py-10">
            <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 md:gap-16">

                {/* LEFT COLUMN */}
                <div>

                    {/* Product Image */}
                    <div className="relative aspect-4/5 overflow-hidden rounded-3xl bg-[#F7F2E8]">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                        />
                    </div>

                </div>

                {/* RIGHT COLUMN */}
                <div className="flex flex-col justify-start pt-4">

                    <p className="font-bold text-2xl tracking-[0.3em] text-black">
                        {product.name}
                    </p>

                    <div className="mt-3 flex gap-1 text-gray-400">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={18} />
                        ))}
                    </div>
                    <div className="mt-5 h-0.5 w-32 bg-gray-200"></div>

                    {/* Description */}
                    <div className="mt-5">
                        <h2 className="py-4 text-xl">
                            Description
                        </h2>
                        <div className="h-0.5 w-32 bg-gray-200"></div>

                        <p className="mt-6 max-w-lg leading-7 text-[#3A2A22]/70">
                            A thoughtfully formulated LUMÉA essential, created with
                            care to complement your skin and become a cherished part
                            of your everyday skincare ritual. Simple, effective, and
                            intentionally made for moments of everyday self-care.
                        </p>
                    </div>


                    <p className="mt-8 text-3xl font-bold text-black">
                        N{product.price.toLocaleString()}
                    </p>

                    <div className="tracking-[0.1em] mt-4">
                        <span className="font-bold"> Availability: </span>
                        <span>In stock</span>
                    </div>

                    <div className="mt-4 tracking-[0.1em]">
                        <span className="font-bold"> Category: </span>
                        <span>{product.category}</span>
                    </div>



                    <AddToCartButton product={product} />


                </div>

            </div>
        </main>
    );
}
