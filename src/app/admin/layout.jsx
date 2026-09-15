import AdminSidebar from "@/components/AdminSidebar/AdminSidebar"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";



export default async function AdminLayout({ children }) {
    const session = await getServerSession(authOptions)

    if(!session){
        redirect("/login")
    }

    if(session.user.role !== "admin"){
        redirect("/")
    }

    return (
        <div className="flex min-screen">
            <AdminSidebar />

            <div className="flex-1 p-8">
                {children}
            </div>
        </div>
    )
}