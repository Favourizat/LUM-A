
"use client";

import { useSession } from "next-auth/react";

export default function AuthStatus() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <p>Checking authentication...</p>;
    }

    if (status === "unauthenticated") {
        return <p>You are not logged in.</p>;
    }

    return (
        <div>
            <p>You are logged in.</p>
            <p>Name: {session.user.name}</p>
            <p>Email: {session.user.email}</p>
        </div>
    );
}
