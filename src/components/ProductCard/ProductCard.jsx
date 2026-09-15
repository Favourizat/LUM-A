"use client"
import Link from "next/link";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import { useWishlist } from "@/context/WishlistContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }) {

    const { addToCart } = useCart()
    const { toggleWishlist, isInWishlist } = useWishlist()
    
    const router = useRouter()
    const {data: session} = useSession()

    const saved = isInWishlist(product.id)

    function handleWishlist(){
        if(!session){
            router.push("/login")
            return;
        }
        toggleWishlist(product)
    }

    return (
        <div className="group">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#F7F2E8]">
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
                                    : `Add ${product.name} from wishlist`
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F7F2E8] opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 hover:bg-[#F7F2E8]">
                            <Heart
                                size={17}
                                strokeWidth={1.5}
                                fill={saved ? "#3A2A22" : "none"} />
                        </button>

                        {/* Tooltip */}
                        <p className="pointer-events-none absolute right-0 top-12 whitespace-nowrap rounded-md bg-[#3A2A22] px-3 py-1.5 text-xs text-[#F7F2E8] opacity-0 group-hover/heart:opacity-100 transition-all duration-200 ">
                            {saved
                                ? "Remove from wishlist"
                                : "Add to wishlist"}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-4 flex flex-col">

                <p className="mb-3">
                    {product.category}
                </p>
                <Link
                    href={`/product/${product.slug}`}>
                    <h3 className="line-clamp-2 min-h-[40px] text-sm font-bold text-[#3A2A22] transition hover:opacity-70">
                        {product.name}
                    </h3>
                </Link>

                <p className="mt-1 text-sm text=[#3A2A22]/70 font-semibold">
                    N{product.price.toLocaleString()}
                </p>


                

                <AddToCartButton product={product} />

            </div>
        </div>
    )
}