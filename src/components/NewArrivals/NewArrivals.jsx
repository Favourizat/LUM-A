import Link from "next/link";
import ProductCard from "../ProductCard/ProductCard";

export default function NewArrivals({ newArrivals }) {

    return (
        <section className="px-4 py-12 md:px-6 md:py-10">
            <div className="mx-auto max-w-7xl">

                {/* Heading */}
                <div className="mb-10 mt-10 text-center">
                    <p className="mb-2 text-xs font-medium tracking-[0.25em] text-[#7D8B72]">
                        NEWEST PRODUCTS
                    </p>

                    <h2 className="font-serif text-xl font-medium tracking-tight text-[#3A2A22] sm:text-xl md:text-3xl">
                        NEW COLLECTION
                    </h2>

                    <div className="mx-auto mt-4 h-px w-12 bg-[#B89B5E]" />
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