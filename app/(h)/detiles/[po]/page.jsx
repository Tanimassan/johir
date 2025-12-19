"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function HomesList() {
    const [home, setHome] = useState(null);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const router = useRouter();

    /* ---------- Fetch Data ---------- */
    useEffect(() => {
        if (!params?.po) return;

        const fetchHome = async () => {
            try {
                const res = await fetch(`/api/Home/${params.po}`, {
                    cache: "no-store",
                });
                const data = await res.json();

                if (data.success) {
                    setHome(data.home);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHome();
    }, [params?.po]);

    /* ---------- Memoized UI ---------- */
    const homeView = useMemo(() => {
        if (!home) return null;

        return (
            <div
                className="
                    grid grid-cols-1 md:grid-cols-2 gap-6
                    bg-white rounded-xl overflow-hidden
                    shadow-md
                    hover:shadow-2xl
                    hover:-translate-y-1
                    hover:scale-[1.01]
                    transition-all duration-300 ease-in-out
                "
            >
                {/* Image */}
                <div className="w-full h-64 md:h-full">
                    <img
                        src={home.photo || "/placeholder.png"}
                        alt={home.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col gap-4">
                    <h1 className="text-2xl font-bold text-gray-800">
                        🏫 {home.title}
                    </h1>

                    <p className="text-gray-600 leading-relaxed">
                        {home.description}
                    </p>

                    <div className="text-sm text-gray-500 space-y-1">
                        <p>
                            <span className="font-medium text-gray-700">
                                Name:
                            </span>{" "}
                            {home.name || "N/A"}
                        </p>

                        <p>
                            <span className="font-medium text-gray-700">
                                Schedule:
                            </span>{" "}
                            {home.sediol || "Not available"}
                        </p>
                    </div>
                </div>
            </div>
        );
    }, [home]);

    /* ---------- Loading ---------- */
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    /* ---------- Not Found ---------- */
    if (!home) {
        return (
            <p className="text-center mt-10 text-gray-500 text-lg">
                Home not found ❌
            </p>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* 🔙 Navigation Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
                <button
                    onClick={() => router.back()}
                    className="
                        inline-flex items-center gap-2
                        px-4 py-2 rounded-lg
                        bg-white border border-gray-200
                        text-gray-700 text-sm font-medium
                        shadow-sm
                        hover:shadow-md
                        hover:bg-gray-50
                        transition-all
                    "
                >
                    ← Go Back
                </button>

                <button
                    onClick={() => router.push("/")}
                    className="
                        inline-flex items-center gap-2
                        px-4 py-2 rounded-lg
                        bg-white border border-gray-200
                        text-gray-700 text-sm font-medium
                        shadow-sm
                        hover:shadow-md
                        hover:bg-gray-50
                        transition-all
                    "
                >
                    🏠 Home
                </button>
            </div>

            {homeView}
        </div>
    );
}
