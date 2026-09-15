import ProductFilters from "@/components/ProductFilters/ProductFilters";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";

export default async function CategoryPage({ params }) {
  const { category } = await params;


  const categoryMap = {
    "body-care": "BODYCARE",
    cleansers: "CLEANSERS",
    toners: "TONERS",
    serums: "SERUMS",
    moisturizers: "MOISTURIZERS",
    sunscreen: "SUNSCREEN",
    treatments: "TREATMENTS",
    eyecare: "EYECARE",
    lipcare: "LIPCARE",
  };

  const formattedCategory = categoryMap[category.toLowerCase()];
  const categoryName = category.replace("-", " ");

  await connectToDatabase()

  const productsFromDatabase = await Product.find({
    category: formattedCategory,
  }).lean()

  const products = productsFromDatabase.map((product) => ({
    id: product._id.toString(),
    name: product.name,
    slug: product.slug,
    price: product.price,
    category: product.category,
    image: product.image,
    images: product.images,
    description: product.description,
    stock: product.stock,
    isNewArrival: product.isNewArrival,
    isBestSeller: product.isBestSeller,
  }));

  return (
    <main className="px-4 py-12 md:px-6 md:py-20">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10">
          <p className="mb-2 text-xs font-medium tracking-[0.3em] text-[#7D8B72]">
            LUMÉA COLLECTION
          </p>

          <h1 className="text-4xl font-medium capitalize text-[#3A2A22] sm:text-5xl">
            {categoryName}
          </h1>

          <p className="mt-4 text-sm text-[#3A2A22]/65">
            Explore our {categoryName.toLowerCase()} collection.
          </p>
        </div>

        <ProductFilters
          products={products}
          initialCategory={formattedCategory}
        />

      </div>
    </main>
  );
}