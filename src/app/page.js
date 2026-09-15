import BestSellers from "@/components/BestSellers/BestSellers";
import CategorySlider from "@/components/CategorySlider/CategorySlider";
import Hero from "@/components/Hero/Hero";
import NewArrivals from "@/components/NewArrivals/NewArrivals";
import ShopByCategory from "@/components/ShopByCategory/ShopByCategory";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";

export default async function Home() {
  await connectToDatabase()

  const productsFromDatabase = await Product.find().lean();

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

  console.log("PRODUCTS FROM DATABASE:", products);

  const bestsellers = products.filter(
    (product) => product.isBestSeller
  )

  const newArrivals = products.filter(
    (product) => product.isNewArrival
  )

  return (

    <main>
      <Hero />
      <CategorySlider />
      <ShopByCategory />
      <BestSellers bestSellers={bestsellers} />
      <NewArrivals newArrivals={newArrivals} />
    </main>
  );
}