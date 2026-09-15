
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PATCH(request, { params }) {
    try {
        const session = await getServerSession(authOptions)

        console.log("ADMIN PATCH SESSION:", session);
        console.log("ADMIN PATCH ROLE:", session?.user?.role);

        if (!session || session.user.role !== "admin") {
            return Response.json(
                { message: "Forbidden" },
                { status: 403 }
            )
        }

        const { id } = await params

        const body = await request.json()

        const targetUser = await User.findById(id)

        if (!targetUser) {
            return Response.json(
                { message: "User not found" },
                { status: 404 }
            )
        }

        if (targetUser.email === session.user.email) {
            return Response.json(
                { message: "You cannot change your own role" },
                { status: 400 }
            );
        }

        const { role } = body

        if (!["customer", "admin"].includes(role)) {
            return Response.json(
                { message: "Invalid role" },
                { status: 400 }
            )
        }

        await connectToDatabase()

        const user = await User.findByIdAndUpdate(
            id,
            { role },
            { returnDocument: "after" },
        )

        if (!user) {
            return Response.json(
                { message: "User not found" },
                { status: 404 }
            )
        }

        return Response.json({
            success: true,
            message: "User role updated successfully!",
            user,
        })
    } catch (error) {
        console.error("ROLE UPDATE ERROR:", error)
        return Response.json(
            { message: "Failed to update user role" },
            { status: 500 }
        )
    }
}