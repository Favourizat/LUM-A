import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

import CheckoutForm from "./Checkout Form";

export default async function CheckouPage(){
    const session = await getServerSession(authOptions)

    if(!session){
        redirect("/login")
    }

    return <CheckoutForm />
}