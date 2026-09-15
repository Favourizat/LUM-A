import Link from "next/link";
import ProductCard from "../ProductCard/ProductCard";


export default function BestSellers({ bestSellers }) {
    return (
        <section className="px-4 py-12 md:px-6 md:py-15">
            <div className="mx-auto mx-w-7xl">

                {/* Heading */}
                <div className="mb-8 flex items-end justify-between">
                    <div>
                        <p className="mb-2 text-xs font-medium tracking-[0.3em] text-[#7D8B72]">
                            CUSTOMER FAVORITES
                        </p>

                        <h2 className="text-3xl font-medium tracking-tight text-[#3A2A22] sm:text-4xl">
                            Best Sellers
                        </h2>
                    </div>

                    <Link
                        href="/products"
                        className="hidden sm:block text-sm font-medium text-[#3A2A22]">
                        View All
                    </Link>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
                    {/* {products.slice(0, 8).map((product) => (
                        <ProductCard 
                        key={product._id}
                        product={product}/>
                    ))} */}

                    {bestSellers.map((product) => (
                        <ProductCard 
                        key={product.id}
                        product={product}/>
                    ))}
                </div>

                {/* Mobile View All */}
                <div className="mt-8 sm:hidden">
                    <Link
                    href="/products"
                    className="text-sm font-medium text-[#3A2A22]">
                        View All at
                    </Link>
                </div>

            </div>
        </section>
    )
}