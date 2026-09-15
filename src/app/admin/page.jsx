
import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";
import User from "@/models/User";
import Order from "@/models/Order";

export default async function AdminPage() {
    // const session = await getServerSession(authOptions);

    // if (!session) {
    //     redirect("/login");
    // }

    // if (session.user.role !== "admin") {
    //     redirect("/");
    // }

    await connectToDatabase()

    const productCount = await Product.countDocuments()
    const userCount = await User.countDocuments()
    const orderCount = await User.countDocuments()

    const revenueResult = await Order.aggregate([
        {
            $group: {
                _id: null,
                total: {
                    $sum: "$totalAmount",
                }
            }
        }
    ])

    const totalRevenue = revenueResult[0]?.total || 0;

    return (
        <main>
            <h1 className="text-2xl font-bold text-[#3A2A22]">Admin Dashboard</h1>
            <p className="mt-2 text-[#3A2A22]/70">Welcome to the LUMÉA admin dashboard.</p>

            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-[#E5D8C8] bg-[#F7F2E8] p-6">
                    <p className="text-sm text-[#3A2A22]/70">
                        Total products
                    </p>




                    <p className="mt-2 text-3xl font-bold text-[#3A2A22]/70">
                        {productCount}
                    </p>
                </div>

                <div className="rounded-2xl border border-[#E5D8C8] bg-[#F7F2E8] p-6">
                    <p className="text-sm text-[#3A2A22]/70">
                        Total users
                    </p>

                    <p className="mt-2 text-3xl font-bold text-[#3A2A22]">
                        {userCount}
                    </p>
                </div>

                <div className="rounded-2xl border border-[#E5D8C8] bg-[#F7F2E8] p-6">
                    <p className="text-sm text-[#3A2A22]/70">
                        Total orders
                    </p>

                    <p className="mt-2 text-3xl font-bold text-[#3A2A22]">
                        {orderCount}
                    </p>
                </div>

                <div className="rounded-2xl border border-[#E5D8C8] bg-[#F7F2E8] p-6">
                    <p className="text-sm text-[#3A2A22]/70">
                        Total revenue
                    </p>

                    <p className="mt-2 text-3xl font-bold text-[#3A2A22]">
                        ₦{totalRevenue.toLocaleString()}
                    </p>
                </div>

            </div>
        </main>
    );
}
