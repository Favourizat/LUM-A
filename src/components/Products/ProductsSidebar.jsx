import Link from "next/link";
import { categories } from "@/data/categories";

export default function ProductsSidebar() {

    return (
        <aside className="w-full md:w-56">
            <p className="mb-5 text-xs font-medium tracking-[0.25em] text-[[#7D8B72]">
                PRODUCT CATEGORIES
            </p>

            <nav className="flex flex-col gap-3">
                {categories.map((category) => (
                    <Link
                    key={category.slug}
                    href={
                        category.slug
                        ? `/products/${category.slug}` 
                        : "/products"
                    }
                    className="text-sm text-[#3A2A22]/70 transition hover:text-[[#3A2A22]"
                    >
                        {category.name}
                    </Link>
                ))}
            </nav>
        </aside>
    )
} 