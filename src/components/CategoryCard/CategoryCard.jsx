import Link from "next/link";
import Image from "next/image";

export default function CategoryCard({ category }) {
  return (
    <Link
      href={`/products/${category.slug}`}
      className="group flex flex-col items-center text-center"
    >
      {/* Category Image */}
      <div className="relative h-[160px] w-full max-w-[160px] overflow-hidden rounded-full border border-[#E5D8C8] bg-[#F7F2E8] sm:h-[120px] sm:w-[120px]">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="h-full w-full object-cover transition duration-500 group-hover:scale-125 opacity-100 group-hover:opacity-90"
        />
      </div>

      {/* Category Name */}
      <h3 className="mt-4 text-sm font-medium text-[#3A2A22]">
        {category.name}
      </h3>
    </Link>
  );
}