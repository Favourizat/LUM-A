import connectToDatabase from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const reference = searchParams.get("reference");

        if (!reference) {
            return Response.json(
                { message: "Payment reference is required" },
                { status: 400 }
            );
        }

        await connectToDatabase();

        const order = await Order.findOne({
            paymentReference: reference,
        });

        if (!order) {
            return Response.json(
                { message: "Order not found" },
                { status: 404 }
            );
        }

        const response = await fetch(
            `https://api.paystack.co/transaction/verify/${reference}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                },
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return Response.json(
                {
                    message:
                        data.message || "Payment verification failed",
                },
                { status: 400 }
            );
        }

        if (data.data.status !== "success") {
            return Response.json(
                { message: "Payment was not successful" },
                { status: 400 }
            );
        }

        if (data.data.amount !== order.totalAmount * 100) {
            return Response.json(
                { message: "Payment amount does not match order total" },
                { status: 400 }
            );
        }

        order.paymentStatus = "paid";

        await order.save();

        return Response.json({
            success: true,
            message: "Payment verified successfully",
            reference: data.data.reference,
            amount: data.data.amount,
            status: data.data.status,
        });
    } catch (error) {
        console.error("PAYMENT VERIFICATION ERROR:", error);

        return Response.json(
            {
                success: false,
                message: "Payment verification failed",
            },
            { status: 500 }
        );
    }
}