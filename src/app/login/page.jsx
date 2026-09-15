
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import AuthStatus from "@/components/AuthStatus";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });
        console.log("LOGIN RESULT:", result);
    }

    function handleGoogleSignIn() {
        signIn("google", {
            callbackUrl: "/"
        })
    }

    return (
        <main className="min-h-screen px-4 py-20">
            <div className="mx-auto max-w-md">
                <h1 className="text-3xl font-medium text-[#3A2A22]">
                    Welcome Back
                </h1>

                <p className="mt-2 text-sm text-[#3A2A22]/60">
                    Sign in to your LUMÉA account.
                </p>

                {/* <AuthStatus /> */}

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="w-full rounded-lg border px-4 py-3"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="w-full rounded-lg border px-4 py-3"
                    />

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-[#3A2A22] py-3 text-[#F7F2E8]"
                    >
                        Sign In
                    </button>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[#E5D8C8]" />
                        </div>

                        <div className="relative flex justify-center">
                            <span className="bg-[#F7F2E8] px-4 text-xs text-[#3A2A22]/50">
                                OR
                            </span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="w-full rounded-lg border border-[#E5D8C8] bg-white py-3 text-sm font-medium text-[#3A2A22] transition hover:bg-[#E5D8C8]/20"
                    >
                        Continue with Google
                    </button>

                </form>
            </div>
        </main>
    );
}
