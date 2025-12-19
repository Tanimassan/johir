"use client";
import { useState, useEffect } from "react";

export default function SearchComponent() {
    const [query, setQuery] = useState(""); // input value
    const [data, setData] = useState([]);   // API theke asha data
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // query blank thakle fetch korbena
        if (!query) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/search?query=${query}`);
                const result = await res.json();
                setData(result); // API theke data set kora
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        // Debounce korte paren jate prottek letter e call na hoy
        const timer = setTimeout(() => {
            fetchData();
        }, 500); // 500ms por API call

        return () => clearTimeout(timer); // cleanup
    }, [query]); // query change hole fetch hobe

    return (
        <div className="p-4">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="border p-2 rounded w-full"
            />

            {loading && <p>Loading...</p>}

            <ul className="mt-4">
                {data.map((item, index) => (
                    <li key={index} className="border-b py-2">
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
