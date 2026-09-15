
import connectToDatabase from "@/lib/mongodb";
import Order from "@/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const allowedStatuses = [
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
]

export async function PATCH(request, { params }) {
    try {
        const session = await getServerSession(authOptions)

        if (!session || !session.user) { return Response.json({ message: "Unauthorized" }, { status: 401 }); }

        const { id } = await params;
        const body = await request.json()
        const { status } = body

        if(!allowedStatuses.includes(status)){
            return Response.json(
                {message: "Invalid order status"},
                {status: 400}
            )
        }
        await connectToDatabase()

        const order = await Order.findByIdAndUpdate(
            id,
            { status },
            { returnDocument: "after" }
        );

        if (!order) {
            return Response.json(
                { message: "Order not found" },
                { status: 404 }
            )
        }

        // order.status = body.status

        // await order.save()

        return Response.json({
            success: true,
            order,
        })
    } catch (error) {
        console.error("FAILED TO UPDATE ORDER:", error)
        console.error("ERROR MESSAGE:", error.message)
        return Response.json(
            { message: "Failed to update order" },
            { status: 500 })
    }
}