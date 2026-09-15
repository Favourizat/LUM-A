import connectToDatabase from "@/lib/mongodb";

export async function GET(){
    try{
        await connectToDatabase()

        return Response.json({
            message: "Mongodb connection successful!",
        })
    }catch(error){
        return Response.json(
            {
                message: "Mongo connection failed"
            },
            {
                status: 500,
            }
        )
    }
}