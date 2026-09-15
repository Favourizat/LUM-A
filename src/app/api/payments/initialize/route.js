
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import Order from "@/models/Order";

export async function POST(request){
    const session = await getServerSession(authOptions)
    console.log("PAYMENT SESSION:", session);

    // Checks if user is logged in
    if(!session){
        return Response.json(
            {message: "Unauthorized"},
            {status: 401}
        )
    }

    const body = await request.json()

    const {email, amount, orderId} = body

    console.log("PAYMENT REQUEST:", email, amount, orderId);

    // Checks if email, amount, and orderId is present
    if(!email || !amount || !orderId){
        return Response.json(
            {message: "Email and amount, and orderId are required"},
            {status: 400}
        )
    }

    // Checks if the user who owns the order is equal to the logged in user
    await connectToDatabase()

    const order = await Order.findById(orderId)

    if(order.customer.toString() !== session.user.id){
        return Response.json(
            {message: "You are not authorized to pay for this order"},
            {status: 403}
        )
    }

    // Checks if the user's order has already been paid for or marked paid
    if(order.paymentStatus === "paid"){
        return Response.json(
            {message: "This order has already been paid for"},
            {status: 400}
        )
    }

    if(!order){
        return Response.json(
            {message: "Order not found"},
            {status: 404}
        )
    }

    const response = await fetch(
        "https://api.paystack.co/transaction/initialize",
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                amount: order.totalAmount * 100,
                callback_url: "http://localhost:3000/payment/callback",
            })
        }
    )

    const data = await response.json()

    console.log("PAYSTACK RESPONSE:", data);

    if(!response.ok){
        return Response.json(
            {message: data.message || "Payment initialization failed"},
            {status: 400},
        )
    }

    order.paymentReference = data.data.reference
    await order.save()

    return Response.json({
        success: true,
        authorization_url: data.data.authorization_url,
        reference: data.data.reference,
    })
}