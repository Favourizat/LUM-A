import Link from "next/link";
import ProductCard from "../ProductCard/ProductCard";

export default function NewArrivals({ newArrivals }) {

    return (
        <section className="px-4 py-12 md:px-6 md:py-10">
            <div className="mx-auto max-w-7xl">

                {/* Heading */}
                <div className="mb-8 flex items-end justify-between">
                    <div>
                        <h2 className="text-3xl font-medium tracking-tight text-[#3A2A22] sm:text-4xl">
                            Shop New Arrivals
                        </h2>
                    </div>

                    {/* <Link
                        href="/products"
                        className="hidden text-sm font-medium text-[#3A2A22] transition hover:opacity-60 sm:block"
                    >
                        View All →
                    </Link> */}
                </div>

                {/* Products */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {newArrivals.map((product) => {
                        console.log("NEW ARRIVAL:", product);

                        return (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        );
                    })}
                </div>

                {/* Mobile View All */}
                {/* <div className="mt-8 text-center sm:hidden">
                    <Link
                        href="/products"
                        className="text-sm font-medium text-[#3A2A22]"
                    >
                        View All →
                    </Link>
                </div> */}

            </div>
        </section>
    );
}