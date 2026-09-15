"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart } from "lucide-react"
import { useWishlist } from "@/context/WishlistContext"
import AddToCartButton from "@/components/AddToCartButton/AddToCartButton"

export default function WishlistPage() {
    const { wishlist, removeFromWishlist } = useWishlist()
    return (
        <main className="min-h-screen px-4 py-12 md:px-6 md:py-20">
            <div className="mx-auto max-w-7xl">
                <div className="mb-12">
                    <p className="mb-2 text-xs tracking-[0.3em] font-medium text-[#7D8B72]">
                        LUMÉA COLLECTION
                    </p>

                    <h1 className="text-4xl font-medium text-[#7D8B72] sm:text-5xl">
                        My Wishlist
                    </h1>

                    <p className="mt-4 mb-4 text-sm text-[#3A2A22]/60">
                        {wishlist.length} saved product
                        {wishlist.length !== 1 ? "s" : ""}
                    </p>
                    {wishlist.length === 0 ? (
                        <div className="flex items-center justify-center text-center py-20">
                            <div className="flex flex-col items-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E5D8C8]/40">
                                    <Heart
                                        size={28}
                                        strokeWidth={1.2}
                                        className="text-[#3A2A22]/60"
                                    />
                                </div>

                                <h2 className="mt-4 text-2xl font-medium text-[#3A2A22]">
                                    Your wishlist is empty
                                </h2>

                                <p className="mt-3 max-w-md text-sm leading-6 text-[#3A2A22]/60">
                                    Save products you love and come back to them whenever you're ready
                                </p>

                                <Link
                                    href="/products"
                                    className="mt-8 rounded-full bg-[#3A2A22] px-8 py-3 text-sm font-medium text-[#F7F2E8] transition hover:opacity-90"
                                >
                                    Explore products
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols2 gap-x-4 gap-y-10 sm:geid-cols-3 md:grid-cols-4 md:gap-6">
                            {wishlist.map((product) => (
                                <div
                                    key={product.id}
                                    className="group">
                                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border-2 border-[#3A2A22]/40 bg-[#F7F2E8]">
                                        <Link href={`product/${product.slug}`}>
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-center transiton duration-500 group-hover:scale-105" />
                                        </Link>

                                        <button
                                            onClick={() => removeFromWishlist(product.id)}
                                            aria-label={`Remove ${product.name} from wishlist`}
                                            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center bg-[#F7F2E8] rounded-3xl">
                                            <Heart
                                                size={17}
                                                strokeWidth={1.5}
                                                fill="#3A2A22" />
                                        </button>
                                    </div>

                                    <div className="mt-4 ">
                                        <p className="mb-4 text-xs text-[#7D8B72]">
                                            {product.category}
                                        </p>
                                        <Link href={`/product/${product.slug}`}>
                                            <h3 className="text-sm font-bold text-[#3A2A22] transition hover:opacity-70">
                                                {product.name}
                                            </h3>

                                            <p className="mt-1 text-sm font-semibold text-[#3A2A22]/70">
                                                N{product.price.toLocaleString()}
                                            </p>

                                            <AddToCartButton product={product} />
                                        </Link>
                                    </div>

                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </main>
    )
}