"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    // ✅ Custom email and password
    const ADMIN_CREDENTIALS = {
        email: "admin@example.com",
        password: "1234"
    };

    const handleLogin = () => {
        if (!email) {
            setError("Email required");
            return;
        }

        if (!password) {
            setError("Password required");
            return;
        }

        if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
            router.push("/admin");
        } else {
            setError("Invalid email or password");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-slate-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-black rounded-2xl p-6 border border-blue-500 shadow-[0_0_25px_#2563eb]">

                {/* Header Bar */}
                <div className="flex justify-between items-center mb-6 p-3 rounded-xl
          bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white font-semibold">
                    <span>Admin Login</span>
                    <span className="text-sm">Secure ✔</span>
                </div>

                {/* Title */}
                <h2 className="text-white text-xl font-bold mb-4">
                    Enter Credentials
                </h2>

                {/* Email */}
                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-3 p-3 rounded-lg bg-black text-white
            border border-gray-700 focus:border-blue-500 outline-none"
                />

                {/* Password */}
                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-4 p-3 rounded-lg bg-black text-white
            border border-gray-700 focus:border-blue-500 outline-none"
                />

                {/* Error */}
                {error && (
                    <p className="text-red-500 text-sm mb-3">{error}</p>
                )}

                {/* Button */}
                <button
                    onClick={handleLogin}
                    className="w-full py-3 rounded-lg font-semibold text-white
            bg-blue-600 hover:bg-blue-700 transition-all
            shadow-[0_0_15px_#2563eb]"
                >
                    Login
                </button>
            </div>
        </div>
    );
}
