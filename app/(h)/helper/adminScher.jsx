"use client";

import { useEffect, useState } from "react";

export default function AdminHelperScher() {
    const [homes, setHomes] = useState([]);
    const [filteredHomes, setFilteredHomes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [Service, setService] = useState("");

    // Fetch all homes
    const loadHomes = async () => {
        try {
            const res = await fetch("/api/Home");
            const data = await res.json();

            if (data.success) {
                // Keep oldest first
                const sortedHomes = data.homes.sort((a, b) => a._id.localeCompare(b._id));
                setHomes(sortedHomes);
                setFilteredHomes(sortedHomes);
            }
        } catch (err) {
            console.error("Fetch Error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadHomes();
    }, []);

    // Filter by search & service
    useEffect(() => {
        const filtered = homes.filter(home => {
            const matchesService = Service === "" || home.service === Service;
            const matchesSearch = home.title.toLowerCase().includes(search.toLowerCase());
            return matchesService && matchesSearch;
        });
        setFilteredHomes(filtered);
    }, [search, homes, Service]);

    // Delete home
    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this item?")) return;

        try {
            const res = await fetch(`/api/Home/${id}`, { method: "DELETE" });
            const data = await res.json();

            if (data.success) {
                alert("Deleted successfully!");
                loadHomes();
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong!");
        }
    };

    const uniqueServices = [...new Set(homes.map(home => home.service))];

    return (
        <div className="p-4">
            {/* Search & Service Filter */}
            <div className="mb-4 flex flex-col md:flex-row gap-2 items-start">
                <input
                    type="search"
                    placeholder="Search by title"
                    className="border rounded-sm pl-2 py-1 w-full max-w-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    className="border bg-black text-white p-2 rounded"
                    value={Service}
                    onChange={(e) => setService(e.target.value)}
                >
                    <option value="">All Services</option>
                    {uniqueServices.map((service, i) => (
                        <option key={i} value={service}>{service}</option>
                    ))}
                </select>
            </div>

            {/* List of Homes */}
            {loading ? (
                <p className="text-center">Loading...</p>
            ) : filteredHomes.length === 0 ? (
                <p className="text-gray-500 text-center">No items found.</p>
            ) : (
                <div>
                    {filteredHomes.map((item, index) => (
                        <div
                            key={index}
                            className="border p-2 rounded-sm m-2 flex justify-between items-center"
                        >
                            <div className="flex items-center gap-2">


                                <div>
                                    <p className="font-medium">Name: {item.title}</p>

                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                    onClick={() => alert(`Edit ${item.title} (implement edit logic here)`)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    onClick={() => handleDelete(item._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
