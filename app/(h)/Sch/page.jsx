"use client";
import { useState, useEffect } from "react";

export default function SearchComponent() {
    const [query, setQuery] = useState(""); // input value
    const [results, setResults] = useState([]); // API data
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (query === "") {
            setResults([]); // blank input e results clear
            return;
        }

        const controller = new AbortController(); // previous fetch cancel korte
        const signal = controller.signal;

        // Debounce 500ms
        const timer = setTimeout(async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/Schas?query=${query}`, { signal });
                const data = await res.json();
                if (data.success) setResults(data.data);
            } catch (error) {
                if (error.name !== "AbortError") console.error(error);
            } finally {
                setLoading(false);
            }
        }, 500);

        return () => {
            clearTimeout(timer);
            controller.abort(); // previous fetch cancel
        };
    }, [query]);

    return (
        <div className="max-w-md mx-auto mt-4 relative"> {/* relative parent */}
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name..."
                className="border rounded w-full p-2"
            />

            {loading && <p className="mt-2 text-gray-500">Loading...</p>}

            {results.length > 0 && (
                <ul className="absolute z-10 top-full left-0 w-full mt-1 border rounded divide-y max-h-64 overflow-y-auto bg-white shadow-lg">
                    {results.map((item) => (
                        <li key={item._id} className="p-2 hover:bg-gray-100">
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-sm text-gray-600">{item.description}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>

    );
}
