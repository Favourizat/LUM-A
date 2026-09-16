import Link from "next/link";
import CategoryCard from "../CategoryCard/CategoryCard";

const categories = [
    {
        name: "Toners",
        slug: "toners",
        image: "/toner-new.avif",
        category: "toner",
    },
    {
        name: "Treatments",
        slug: "treatments",
        image: "/treatment.jpg",
        category: "treatments",
    },
    {
        name: "Serums",
        slug: "serums",
        image: "/serum.jpg",
        category: "serums",
    },
    {
        name: "Moisturizers",
        slug: "moisturizers",
        image: "/moisturizer.jpg",
        category: "moisturizers"
    },
    {
        name: "Eyecare",
        slug: "eyecare",
        image: "/eyecare.jpg",
        category: "eyecare"
    },
    {
        name: "Lipcare",
        slug: "lipcare",
        image: "/lipcare.jpg",
        categort: "lipcare"
    },
];

export default function ShopByCategory() {
    return (
        <section className="px-4 py-2 md:px-6 md:py-5">
            <div className=" max-w-7xl">
                <div className="mb-1- flex items-center justify-between">

                    <div>
                        {/* <p>EXPLORE LUMÉA</p> */}

                        {/* <h2 className="text-3xl font-medium tracking-tight text-[#3A2A22] sm:text-4xl">
                            Shop By Category
                        </h2> */}
                    </div>

                    {/* <Link
                        href="/products"
                        className="hidden text-sm font-medium text-[#3A2A22] sm:block"
                    >
                        View All →
                    </Link> */}
                </div>

                 {/* Categories */}
                 <div className="mt-6 grid grid-cols-2 items-center gap-12 sm:flex sm:justify-center sm:gap-8">
                    {categories.map((category) => (
                        <CategoryCard 
                        key={category.slug}
                        category={category}/>
                    ))}
                 </div>

                 {/* Categories */}
                 {/* <div className="mt-4 sm:hidden grid grid-cols-2">
                    <Link href={`products?category=${category.slug}`}>

                    </Link>
                 </div> */}
            </div>
        </section>
    )
}