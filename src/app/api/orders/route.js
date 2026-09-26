import connectToDatabase from "@/lib/mongodb";
import Order from "@/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import User from "@/models/User";

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);

        const body = await request.json();

        await connectToDatabase();

        let customer = null;

        // If the user is logged in, find their User account
        if (session?.user?.email) {
            customer = await User.findOne({
                email: session.user.email,
            });
        }

        const orderData = {
            customerName: body.customerName,
            customerEmail: body.customerEmail,
            customerPhone: body.customerPhone,
            deliveryAddress: body.deliveryAddress,
            deliveryCity: body.deliveryCity,
            items: body.items,
            totalAmount: body.totalAmount,
            status: "pending",
        };

        // Only attach a customer if a logged-in user was found
        if (customer?._id) {
            orderData.customer = customer._id;
        }

        const order = await Order.create(orderData);

        return Response.json({
            success: true,
            order,
        });
    } catch (error) {
        console.error("Failed to create order:", error);

        return Response.json(
            {
                success: false,
                message: "Failed to create order",
            },
            {
                status: 500,
            }
        );
    }
}