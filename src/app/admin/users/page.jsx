import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import ManageUserButton from "@/components/ManageUserButton/ManageUserButton";


export default async function AdminUsersPage() {
    await connectToDatabase()

    const users = await User.find()
        .select("name email role createdAt")
        .sort({ createdAt: -1 })
        .lean()

    return (
        <div>
            <h1 className="text-2xl font-bold text-[#3A2A22]">
                Users
            </h1>

            <p className="mt-2 text-[#3A2A22]/70">
                Total users: {users.length}
            </p>

            <div className="mt-8 overflow-hidden rounded-2xl border border-[#E5D8C8]">
                <table className="w-full">
                    <thead className="bg-[#F7F2E8]">
                        <tr className="border-b border-[#E5D8C8]">
                            <th className="px-6 py-4 text-left text-sm font-semibold text-[#3A2A22]">
                                Name
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold text-[#3A2A22]">
                                Email
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold text-[#3A2A22]">
                                Role
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold text-[#3A2A22]">
                                Joined
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold text-[#3A2A22]">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr
                                key={user._id.toString()}
                                className="border-b border-[#E5D8C8]">
                                <td
                                    className="px-6 py-4 text-sm font-medium text-[#3A2A22]">
                                    {user.name}
                                </td>
                                <td
                                    className="px-6 py-4 text-sm text-[#3A2A22]/70">
                                    {user.email}
                                </td>
                                <td
                                    className="px-6 py-4">
                                    <span
                                        className="rounded-full bg-[#E5D8C8] px-3 py-1 text-xs font-medium text-[#3A2A22]">
                                        {user.role}
                                    </span>
                                </td>
                                <td
                                    className="px-6 py-4 text-sm text-[#3A2A22]/70">
                                    {new Date(user.createdAt).toLocaleString()}
                                </td>

                                <td className="px-6 py-4">
                                    <ManageUserButton
                                        user={{
                                            _id: user._id.toString(),
                                            role: user.role,
                                        }} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}