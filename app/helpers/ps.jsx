"use client";
import { useRouter } from "next/navigation";

export default function HomePage() {
    const router = useRouter();

    return (
        <div className="p-6">
            <button
                onClick={() => router.push("/check-password")}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Go to Admin
            </button>
        </div>
    );
}
