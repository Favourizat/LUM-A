import connectToDatabase from "../src/lib/mongodb.js";
import Product from "../src/models/Product.js";
import { products } from "../src/data/products.js";

async function seedProducts() {
  try {
    console.log("Starting product seed...");

    await connectToDatabase();

    console.log("Connected to database.");

    await Product.deleteMany({});

    console.log("Existing products deleted.");

    await Product.insertMany(products);
    console.log("CATEGORY IN MODEL:", Product.schema.path("category"));
    console.log("PRODUCTS BEING SEEDED:", products);

    console.log("Products seeded successfully!");

    process.exit(0);
  } catch (error) {
    console.error("Failed to seed products:", error);

    process.exit(1);
  }
}

seedProducts();