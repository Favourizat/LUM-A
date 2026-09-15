"use client";

import { useState } from "react";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        });

        const data = await response.json();

        console.log("SERVER RESPONSE:", data);
    }

    return (
        <main className="min-h-screen bg-[#F7F2E8] px-4 py-20">
            <div className="mx-auto max-w-md">
                <div className="mb-8 text-center">
                    <p className="mb-2 text-xs tracking-[0.3em] text-[#7D8B72]">
                        WELCOME TO LUMÉA
                    </p>

                    <h1 className="text-4xl font-medium text-[#3A2A22]">
                        Create an account
                    </h1>

                    <p className="mt-3 text-sm text-[#3A2A22]/65">
                        Create your account to continue shopping.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="rounded-2xl bg-white p-6 shadow-sm"
                >
                    <div className="mb-5">
                        <label
                            htmlFor="name"
                            className="mb-2 block text-sm font-medium text-[#3A2A22]"
                        >
                            Name
                        </label>

                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="Enter your name"
                            className="w-full rounded-lg border border-[#E5D8C8] px-4 py-3 text-sm outline-none focus:border-[#7D8B72]"
                        />
                    </div>

                    <div className="mb-5">
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium text-[#3A2A22]"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="Enter your email"
                            className="w-full rounded-lg border border-[#E5D8C8] px-4 py-3 text-sm outline-none focus:border-[#7D8B72]"
                        />
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-medium text-[#3A2A22]"
                        >
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Create a password"
                            className="w-full rounded-lg border border-[#E5D8C8] px-4 py-3 text-sm outline-none focus:border-[#7D8B72]"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-[#3A2A22] px-4 py-3 text-sm font-medium text-[#F7F2E8] transition hover:opacity-90"
                    >
                        Create Account
                    </button>
                </form>
            </div>
        </main>
    );
}