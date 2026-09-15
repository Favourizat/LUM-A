import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    await connectToDatabase();

    const body = await request.json();

    const existingUser = await User.findOne({
      email: body.email,
    });

    if (existingUser) {
      return Response.json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await User.create({
      name: body.name,
      email: body.email,
      password: hashedPassword,
    });

    return Response.json({
      message: "Registration successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("REGISTRATION ERROR:", error);

    return Response.json(
      {
        message: "Registration failed",
      },
      {
        status: 500,
      }
    );
  }
}