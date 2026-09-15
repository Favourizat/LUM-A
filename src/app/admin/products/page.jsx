import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";
import Image from "next/image";
import Link from "next/link";
import DeleteProductButton from "@/components/DeleteProductButton/DeleteProductButton";

export default async function AdminProductsPage() {
    await connectToDatabase();

    const products = await Product.find().lean();

    return (
        <div>
            {/* Page heading */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[#3A2A22]">
                        Products
                    </h1>

                    <p className="mt-2 text-[#3A2A22]/70">
                        Manage your LUMÉA products here.
                    </p>

                    <div className="mt-8 mb-2 px-4">
                        <p className="text-sm text-[#3A2A22]/70">
                            Total products: {products.length}
                        </p>
                    </div>

                </div>

                <Link href="/admin/products/new">
                    <button className="rounded-full bg-[#3A2A22] px-5 py-3 text-sm font-medium text-[#F7F2E8]">
                        Add Product
                    </button>
                </Link>
            </div>

            {/* Products table */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-[#E5D8C8]">
                <table className="w-full">
                    <thead className="bg-[#F7F2E8]">
                        <tr className="border-b border-[#E5D8C8] text-left">
                            <th className="px-6 py-4 text-sm font-semibold text-[#3A2A22]">
                                Product
                            </th>

                            <th className="px-6 py-4 text-sm font-semibold text-[#3A2A22]">
                                Category
                            </th>

                            <th className="px-6 py-4 text-sm font-semibold text-[#3A2A22]">
                                Price
                            </th>

                            <th className="px-6 py-4 text-sm font-semibold text-[#3A2A22]">
                                Stock
                            </th>

                            <th className="px-6 py-4 text-sm font-semibold text-[#3A2A22]">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product) => (
                            <tr
                                key={product._id.toString()}
                                className="border-b border-[#E5D8C8] last:border-b-0"
                            >
                                {/* Product */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-[#F7F2E8]">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-cover"
                                                sizes="56px"
                                            />
                                        </div>

                                        <div>
                                            <p className="font-medium text-[#3A2A22]">
                                                {product.name}
                                            </p>

                                            <p className="text-xs text-[#3A2A22]/60">
                                                {product.slug}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                {/* Category */}
                                <td className="px-6 py-4 text-sm text-[#3A2A22]">
                                    {product.category}
                                </td>

                                {/* Price */}
                                <td className="px-6 py-4 text-sm font-medium text-[#3A2A22]">
                                    ₦{product.price.toLocaleString()}
                                </td>

                                {/* Stock */}
                                <td className="px-6 py-4 text-sm text-[#3A2A22]">
                                    {product.stock}
                                </td>

                                {/* Action */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <Link
                                            href={`/admin/products/${product._id.toString()}`}
                                            className="text-sm font-medium text-[#3A2A22] hover:underline"
                                        >
                                            Edit
                                        </Link>

                                        <DeleteProductButton
                                            productId={product._id.toString()} />
                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>




            </div>
        </div>
    );
}