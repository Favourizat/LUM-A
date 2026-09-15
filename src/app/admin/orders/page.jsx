
import connectToDatabase from "@/lib/mongodb";
import Order from "@/models/Order";
import OrdersStatusSelect from "@/components/OrdersStatusSelect/OrdersStatusSelect";

export default async function AdminOrdersPage() {
    await connectToDatabase();

    const orders = await Order.find()
        .populate("customer")
        .sort({ createdAt: -1 });
    console.log(
        "NEWEST ORDER:",
        JSON.stringify(orders[0], null, 2)
    );

    return (
        <div>
            <h1 className="text-2xl font-bold text-[#3A2A22]">
                Orders
            </h1>

            <p className="mt-2 text-[#3A2A22]/70">
                Manage customer orders here.
            </p>

            <div className="mt-8 mb-2 px-4">
                <p className="text-sm text-[#3A2A22]/70">
                    Total orders: {orders.length}
                </p>
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-[#E5D8C8]">
                <table className="w-full">
                    <thead className="bg-[#F7F2E8]">
                        <tr className="border-b border-[#E5D8C8] text-left">
                            <th className="px-6 py-4 text-sm font-semibold text-[#3A2A22]">
                                Order
                            </th>

                            <th className="px-6 py-4 text-sm font-semibold text-[#3A2A22]">
                                Customer
                            </th>

                            <th className="px-6 py-4 text-sm font-semibold text-[#3A2A22]">
                                Total
                            </th>

                            <th className="px-6 py-4 text-sm font-semibold text-[#3A2A22]">
                                Status
                            </th>

                            <th className="px-6 py-4 text-sm font-semibold text-[#3A2A22]">
                                Date
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order) => (
                            <tr
                                key={order._id.toString()}
                                className="border-b border-[#E5D8C8]"
                            >
                                <td className="px-6 py-4 text-sm font-medium text-[#3A2A22]">
                                    #{order._id.toString().slice(-6)}
                                </td>

                                <td className="px-6 py-4 text-sm text-[#3A2A22]">
                                    <p>
                                        {order.customerName}
                                    </p>
                                    <p className="text-xs text-[#3A2A22]/60">
                                        {order.customerEmail}
                                    </p>
                                    <p className="text-xs text-[#3A2A22]/60">
                                        {order.customerPhone}
                                    </p>
                                    <p className="mt-1 text-xs text-[#3A2A22]/60">
                                        {order.deliveryAddress}
                                    </p>
                                    <p className="mt-1 text-xs text-[#3A2A22]/60">
                                        {order.deliveryCity}
                                    </p>
                                </td>

                                <td className="px-6 py-4 text-sm font-medium text-[#3A2A22]">
                                    ₦{order.totalAmount.toLocaleString()}
                                </td>

                                <td className="px-6 py-4">
                                    <OrdersStatusSelect
                                        orderId={order._id.toString()}
                                        currentStatus={order.status}
                                    />
                                </td>

                                <td className="px-6 py-4 text-sm text-[#3A2A22]/70">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
