import connectToDatabase from "@/lib/mongodb";
import Order from "@/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import User from "@/models/User";

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return Response.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await request.json();

        await connectToDatabase();

        const customer = await User.findOne({
            email: session.user.email,
        });

        const order = await Order.create({
            customer: customer._id,
            customerName: body.customerName,
            customerEmail: body.customerEmail,
            customerPhone: body.customerPhone,
            deliveryAddress: body.deliveryAddress,
            deliveryCity: body.deliveryCity,
            items: body.items,
            totalAmount: body.totalAmount,
            status: "pending"
        });

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