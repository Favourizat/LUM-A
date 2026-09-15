

import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


export async function PUT(request, {params}){

    const session = await getServerSession(authOptions)

    if(!session){
        return Response.json(
            {message: "Unauthorized"},
            {status: 401}
        )
    }

    if(session.user.role !== "admin"){
        return Response.json(
            {message: "Forbidden"},
            {status: 403}
        )
    }

    const { id } = await params;

    await connectToDatabase()

    const body = await request.json()

    const product = await Product.findByIdAndUpdate(
        id,
        body,
        {new: true, runValidators: true}
    )

    if(!product){
        return Response.json(
            {message: "Product not found"},
            {status: 404}
        )
    }

    return Response.json({
        success: true,
        product,
    })
}

    export async function DELETE(request, { params }){
        const session = await getServerSession(authOptions)

        if(!session){
            return Response.json(
                {message: "Unauthorized"},
                {status: 401}
            )
        }

        if(session.user.role !== "admin"){
            return Response.json(
                {message: "Forbidden"},
                {status: 403}
            )
        }

        const { id } = await params

        await connectToDatabase()

        const product = await Product.findByIdAndDelete(id)

        if(!product){
            return Response.json(
                {message: "Product not found"},
                {status: 404}
            )
        }

        return Response.json({
            success: true,
            message: "Product deleted successfully!",
        })
    }