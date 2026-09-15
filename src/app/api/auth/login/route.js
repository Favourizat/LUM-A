
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";



export async function POST(request) {
    try {
        await connectToDatabase()

        const body = await request.json()
        console.log("LOGIN DATA:", body);

        const user = await User.findOne({
            email: body.email,
        })
        console.log("USER FOUND:", user);

        if (!user) {
            return Response.json(
                {
                    message: "Invalid email or password"
                },
                {
                    status: 401,
                }
            )
        }

        const passwordIsCorrect = await bcrypt.compare(
            body.password,
            user.password,
        )

        if (!passwordIsCorrect) {
            return Response.json(
                {
                    message: "Invalid email or password"
                },
                {
                    status: 401,
                }
            )
        }

        return Response.json({
            message: "Login data received",
        })
    } catch (error) {
        console.error("LOGIN ERROR:", error);

        return Response.json(
            {
                message: "Login failed"
            },
            {
                status: 500
            }
        )
    }
}