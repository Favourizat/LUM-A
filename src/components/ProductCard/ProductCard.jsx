
"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import Image from "next/image";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import { useWishlist } from "@/context/WishlistContext";

export default function ProductCard({ product }) {
    console.log("PRODUCT SLUG:", product.slug);

    const { toggleWishlist, isInWishlist } = useWishlist();

    const saved = isInWishlist(product.id);

    function handleWishlist() {
        toggleWishlist(product);
    }

    return (
        <div className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#F7F2E8]">

                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {product.isNewArrival && (
                    <span className="absolute left-4 top-4 rounded-full bg-[#F7F2E8] px-3 py-1 text-[10px] font-medium tracking-wider text-[#3A2A22]">
                        NEW
                    </span>
                )}

                {/* Wishlist */}
                <div className="absolute right-4 top-4">
                    <div className="group/heart relative">

                        {/* Heart Button */}
                        <button
                            onClick={handleWishlist}
                            aria-label={
                                saved
                                    ? `Remove ${product.name} from wishlist`
                                    : `Add ${product.name} to wishlist`
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F7F2E8] opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 hover:bg-[#F7F2E8]"
                        >
                            <Heart
                                size={17}
                                strokeWidth={1.5}
                                fill={saved ? "#3A2A22" : "none"}
                            />
                        </button>

                        {/* Tooltip */}
                        <p className="pointer-events-none absolute right-0 top-12 whitespace-nowrap rounded-md bg-[#3A2A22] px-3 py-1.5 text-xs text-[#F7F2E8] opacity-0 transition-all duration-200 group-hover/heart:opacity-100">
                            {saved
                                ? "Remove from wishlist"
                                : "Add to wishlist"}
                        </p>

                    </div>
                </div>
            </div>

            <div className="flex flex-col px-5 pb-5 pt-4">

                <p className="mb-1">
                    {product.category}
                </p>

                <Link href={`/product/${product.slug}`}>
                    <h3 className="line-clamp-2 min-h-[30px] text-sm font-bold text-[#3A2A22] transition hover:opacity-70">
                        {product.name}
                    </h3>
                </Link>

                <p className="text-sm font-semibold text-[#3A2A22]/70">
                    N{product.price.toLocaleString()}
                </p>

                <AddToCartButton product={product} />

            </div>
        </div>
    );
}
