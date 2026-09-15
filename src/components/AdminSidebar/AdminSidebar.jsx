"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Package,
    ShoppingBag,
    Users,
} from "lucide-react"

export default function AdminSidebar() {
    const pathname = usePathname()

    const links = [
        {
            name: "Dashboard",
            href: "/admin",
            icon: LayoutDashboard,
        },
        {
            name: "Products",
            href: "/admin/products",
            icon: Package,
        },
        {
            name: "Orders",
            href: "/admin/orders",
            icon: ShoppingBag,
        },
        {
            name: "Users",
            href: "/admin/users",
            icon: Users,
        },
    ]

    return (
        <aside
        className="w-64 min-h-screen border-r border-[#E5D8C8] bg-[#F7F2E8] p-6">
            <h2 className="mb-4 text-xl font-bold text-[#3A2A22]">
                LUMÉA Admin
            </h2>

            <nav className="space-y-2">
                {links.map((link) => {
                    const Icon = link.icon

                    const isActive = pathname === link.href

                    return (
                        <Link
                         key={link.href}
                         href={link.href}
                         className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
                            isActive 
                            ? "bg-[#3A2A22] text-[#F7F2E8]"
                            : "text-[#3A2A22] hover:bg-[#E5D8C8]"
                         }`}>
                           <Icon size={18}/>
                           <span>{link.name}</span>
                        </Link>
                    )
                })}
            </nav>
        </aside>
    )
}