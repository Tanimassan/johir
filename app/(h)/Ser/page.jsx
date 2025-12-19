"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function HomesList() {
    const [homes, setHomes] = useState([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const router = useRouter();

    /* ---------- Fetch Homes ---------- */
    useEffect(() => {
        const fetchHomes = async () => {
            try {
                const res = await fetch("/api/Home", {
                    cache: "no-store",
                });
                const data = await res.json();

                if (data.success) {
                    setHomes(data.homes);
                }
            } catch (err) {
                console.error("Error fetching homes:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchHomes();
    }, []);

    /* ---------- Memoized Filter + Sort ---------- */
    const filteredHomes = useMemo(() => {
        if (!homes.length) return [];

        return homes
            .filter((home) => home.service === params.id)
            .sort((a, b) => b._id.localeCompare(a._id));
    }, [homes, params.id]);

    /* ---------- Loading ---------- */
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    /* ---------- Empty ---------- */
    if (!filteredHomes.length) {
        return (
            <p className="text-center mt-10 text-gray-500 text-lg">
                No homes uploaded yet 😔
            </p>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            {/* 🔙 Back Button */}
            <button
                onClick={() => router.back()}
                className="
                    mb-5 inline-flex items-center gap-2
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

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {filteredHomes.map((home) => (
                    <Link
                        key={home._id}
                        href={`/detiles/${home._id}`}
                        className="group"
                    >
                        <div
                            className="
                                bg-white rounded-xl
                                border border-gray-100
                                shadow-sm
                                hover:shadow-lg
                                hover:-translate-y-1
                                transition-all duration-300
                                overflow-hidden
                            "
                        >
                            {/* Image */}
                            <div className="w-full h-40 bg-gray-100">
                                <img
                                    src={home.photo || "/placeholder.png"}
                                    alt={home.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-4 space-y-1">
                                <h3 className="text-gray-800 font-medium text-base line-clamp-1">
                                    {home.title}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    {home.service}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
