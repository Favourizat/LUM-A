"use client"

import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/context/CartContext"
import { useWishlist } from "@/context/WishlistContext"
import { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"

export default function Navbar() {
    const { data: session, status } = useSession();

    const { cart } = useCart()
    const { wishlist } = useWishlist()

    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")

    const [products, setProducts] = useState([])

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        async function fecthProducts() {
            const response = await fetch("/api/products")
            const data = await response.json()

            setProducts(data.products)
        }
        fecthProducts()
    }, [])


    // CART COUNT
    const cartCount = cart.reduce(
        (total, item) => total + item.quantity,
        0
    )

    // WISHLIST COUNT
    const wishlistCount = wishlist.length

    // PREPARE SEARCH TERM
    const search = searchTerm.toLowerCase().trim()

    // FILTER PRODUCTS
    const filteredProducts = products.filter((product) => {
        if (!search) return false

        return (
            product.name.toLowerCase().includes(search) ||
            product.category.toLowerCase().includes(search)
        )
    })

    // CLOSE AND RESET SEARCH
    const closeSearch = () => {
        setSearchTerm("")
        setIsSearchOpen(false)
    }

    return (
        <header className="relative border-b border-[#E5D8C8] bg-[#F7F2E8]">

            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

                {/* LOGO */}
                <div>
                    <Link
                        href="/"
                        className="text-2xl font-semibold tracking-[0.25em] text-[#3A2A22]"
                    >
                        LUMÉA
                    </Link>
                </div>


                {/* DESKTOP NAVIGATION */}
                <div className="hidden items-center gap-8 md:flex">

                    <Link
                        href="/"
                        className="text-sm text-[#3A2A22] transition hover:opacity-60"
                    >
                        Home
                    </Link>
                    <Link
                        href="/products"
                        className="text-sm text-[#3A2A22] transition hover:opacity-60"
                    >
                        Shop
                    </Link>

                    <Link
                        href="/about"
                        className="text-sm text-[#3A2A22] transition hover:opacity-60"
                    >
                        About
                    </Link>

                    <Link
                        href="/contact"
                        className="text-sm text-[#3A2A22] transition hover:opacity-60"
                    >
                        Contact
                    </Link>

                    {/* <Link
                        href="/products?sort=best-sellers"
                        className="text-sm text-[#3A2A22] transition hover:opacity-60"
                    >
                        Best Sellers
                    </Link> */}


                </div>


                {/* NAV ACTIONS */}
                <div className="flex items-center gap-4 text-[#3A2A22]">

                    {/* SEARCH AREA */}
                    <div className="relative">

                        {/* SEARCH ICON */}
                        {!isSearchOpen ? (

                            <button
                                type="button"
                                onClick={() => setIsSearchOpen(true)}
                                aria-label="Search"
                                className="transition hover:opacity-60"
                            >
                                <Search
                                    size={20}
                                    strokeWidth={1.5}
                                    className="transition hover:scale-150 cursor-pointer"
                                />
                            </button>

                        ) : (

                            /* SEARCH INPUT */
                            <div className="flex w-64 items-center gap-2 rounded-full border border-[#3A2A22]/20 bg-[#F7F2E8] px-4 py-2">

                                <Search
                                    size={18}
                                    strokeWidth={1.5}
                                    className="shrink-0 text-[#3A2A22] cursor-pointer"
                                />

                                <input
                                    autoFocus
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    placeholder="Search products..."
                                    className="w-full bg-transparent text-sm text-[#3A2A22] outline-none placeholder:text-[#3A2A22]/50"
                                />

                                <button
                                    type="button"
                                    onClick={closeSearch}
                                    aria-label="Close search"
                                    className="shrink-0 text-sm text-[#3A2A22] transition hover:opacity-60"
                                >
                                    ✕
                                </button>

                            </div>

                        )}


                        {/* SEARCH RESULTS DROPDOWN */}
                        {isSearchOpen && search && (

                            <div className="absolute right-0 top-full z-50 mt-3 w-80 overflow-hidden rounded-2xl border border-[#E5D8C8] bg-[#F7F2E8] shadow-lg">

                                <div className="max-h-96 overflow-y-auto p-4">

                                    {filteredProducts.length > 0 ? (

                                        <div>

                                            {/* RESULTS TITLE */}
                                            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7D8B72]">
                                                Search Result
                                                {filteredProducts.length !== 1
                                                    ? "s"
                                                    : ""
                                                }
                                            </p>


                                            {/* RESULTS LIST */}
                                            <div className="space-y-1">

                                                {filteredProducts.map(
                                                    (product) => (

                                                        <Link
                                                            key={product._id}
                                                            href={`/product/${product.slug}`}
                                                            onClick={closeSearch}
                                                            className="block rounded-xl px-3 py-3 transition hover:bg-[#3A2A22]/5"
                                                        >

                                                            <div className="flex items-center justify-between gap-4">

                                                                {/* PRODUCT INFO */}
                                                                <div className="min-w-0">

                                                                    <p className="truncate text-sm font-medium text-[#3A2A22]">
                                                                        {product.name}
                                                                    </p>

                                                                    <p className="mt-1 text-[10px] uppercase tracking-wider text-[#3A2A22]/45">
                                                                        {product.category}
                                                                    </p>

                                                                </div>


                                                                {/* PRODUCT PRICE */}
                                                                <p className="shrink-0 text-xs text-[#3A2A22]/70">
                                                                    ₦
                                                                    {product.price.toLocaleString()}
                                                                </p>

                                                            </div>

                                                        </Link>

                                                    )
                                                )}

                                            </div>

                                        </div>

                                    ) : (

                                        /* NO RESULTS */
                                        <div className="py-8 text-center">

                                            <p className="text-sm text-[#3A2A22]/60">
                                                No products found
                                            </p>

                                            <p className="mt-1 text-xs text-[#3A2A22]/40">
                                                Try another search term.
                                            </p>

                                        </div>

                                    )}

                                </div>

                            </div>

                        )}

                    </div>


                    {/* WISHLIST */}
                    <Link
                        href="/wishlist"
                        aria-label={`Wishlist with ${wishlistCount} saved products`}
                        className="relative hidden transition hover:opacity-60 sm:block"
                    >
                        <Heart
                            size={20}
                            strokeWidth={1.5}
                        />

                        {wishlistCount > 0 && (

                            <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#3A2A22] px-1 text-[9px] font-medium text-[#F7F2E8]">
                                {wishlistCount}
                            </span>

                        )}

                    </Link>


                    {/* CART */}
                    <Link
                        href="/cart"
                        aria-label={`Shopping bag with ${cartCount} items`}
                        className="relative transition hover:opacity-60"
                    >
                        <ShoppingBag
                            size={20}
                            strokeWidth={1.5}
                        />

                        {cartCount > 0 && (

                            <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#3A2A22] px-1 text-[9px] font-medium text-[#F7F2E8]">
                                {cartCount}
                            </span>

                        )}

                    </Link>


                    {/* LOGIN */}
                    {/* <Link
                        href="/login"
                        className="hidden text-sm transition hover:opacity-60 sm:block"
                    >
                        Login
                    </Link> */}

                    {session?.user ? (
                        <button onClick={() => signOut()}
                            className="hidden text-sm transition hover:opacity-60 sm:block"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link href="/login"
                            className="hidden text-sm transition hover:opacity-60 sm:block"
                        >
                            Login
                        </Link>
                    )}


                    {/* MOBILE MENU */}
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isOpen}
                        className="rounded-full p-2 transition hover:bg-[#3A2A22]/5 md:hidden"
                    >
                        {isOpen ? (
                            <X
                                size={22}
                                strokeWidth={1.5} />
                        ) : (
                            <Menu
                                size={22}
                                strokeWidth={1.5} />
                        )}
                    </button>


                </div>

            </nav>

            {isOpen && (
                <div className="border-t border-[#E5D8C8] bg-[#F7F2E8] md:hidden">
                    <div className="mx-auto max-w-7xl px-6 py-6">
                        {/* MOBILE NAVIGATION */}
                        <div className="flex flex-col">

                            <Link
                                href="/"
                                onClick={() => setIsOpen(false)}
                                className="border-b border-[#E5D8C8] py-4 text-sm text-[#3A2A22] transition hover:text-[#7D8B72]">
                                Home
                            </Link>

                            <Link
                                href="/products"
                                onClick={() => setIsOpen(false)}
                                className="border-b border-[#E5D8C8] py-4 text-sm text-[#3A2A22] transition hover:text-[#7D8B72]">
                                Shop
                            </Link>

                            <Link
                                href="/about"
                                onClick={() => setIsOpen(false)}
                                className="border-b border-[#E5D8C8] py-4 text-sm text-[#3A2A22] transition hover:text-[#7D8B72]">
                                About
                            </Link>

                            <Link
                                href="/contact"
                                onClick={() => setIsOpen(false)}
                                className="border-b border-[#E5D8C8] py-4 text-sm text-[#3A2A22] transition hover:text-[#7D8B72]">
                                Contact
                            </Link>

                            <Link
                            href="/wishlist"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-between border-b border-[#E5D8C8] py-4 text-sm text-[#3A2A22] transition hover:text-[#7D8B72]">
                                <span>Wishlist</span>

                                {wishlistCount > 0 && (
                                    <span
                                        className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#3A2A22] px-1 text-[10px] text-[#F7F2E8]">
                                        {wishlistCount}
                                    </span>
                                )}
                            </Link>

                            {session?.user ? (
                                <button
                                    className="border-b border-[#E5D8C8] py-4 text-left text-sm text-[#3A2A22] transition hover:text-[#7D8B72]"
                                    onClick={() => {
                                        setIsOpen(false)
                                        signOut()
                                    }}
                                >
                                    Logout
                                </button>
                            ) : (
                                <button>
                                    <Link
                                        href="/login"
                                        onClick={() => setIsOpen(false)}
                                        className="border-b border-[#E5D8C8] py-4 text-sm text-[#3A2A22] transition hover:text-[#7D8B72]"
                                    >
                                        Login
                                    </Link>
                                </button>
                            )}
                        </div>

                    </div>
                </div>
            )}

        </header>
    )
}