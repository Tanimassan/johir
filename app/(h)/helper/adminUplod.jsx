"use client";

import { useEffect, useState } from "react";
import { services } from "../../helpers/data";

export default function UploadHome() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [service, setService] = useState("");
    const [name, setName] = useState("");
    const [sediol, setSediol] = useState("");
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);

    // cleanup preview URL
    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description || !file || !name || !sediol || !service) {
            alert("All fields are required!");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("service", service);
        formData.append("photo", file);
        formData.append("name", name);
        formData.append("sediol", sediol);

        try {
            const res = await fetch("/api/Home", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (data.success) {
                alert("Uploaded Successfully!");
                setTitle("");
                setDescription("");
                setService("");
                setName("");
                setSediol("");
                setFile(null);
                setPreview("");
            } else {
                alert("Upload failed!");
            }
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-full p-4 shadow-2xl relative">
            <h2 className="text-xl font-bold mb-6">Upload Home</h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Service Select */}
                <select
                    className="border bg-black text-white p-2 rounded"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                >
                    <option value="">Select Service</option>
                    {services?.map((item) => (
                        <option key={item.slug} value={item.slug}>
                            {item.name}
                        </option>
                    ))}
                </select>

                {/* Title */}
                <input
                    type="text"
                    placeholder="Enter Institute Name"
                    className="w-full border p-2 rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                {/* Description */}
                <div className="relative">
                    <textarea
                        placeholder="Enter Description"
                        className="w-full border p-2 rounded"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="absolute top-1 right-1 px-2 py-1 bg-blue-600 text-white rounded"
                    >
                        Expand
                    </button>
                </div>

                {/* Name & Sediol */}
                <input
                    type="text"
                    placeholder="Enter Name"
                    className="w-full border p-2 rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Enter Sediol"
                    className="w-full border p-2 rounded"
                    value={sediol}
                    onChange={(e) => setSediol(e.target.value)}
                />

                {/* File Upload */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const f = e.target.files[0];
                        if (!f) return;
                        setFile(f);
                        setPreview(URL.createObjectURL(f));
                    }}
                />

                {/* Preview */}
                {preview && (
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-40 h-40 object-cover rounded border"
                    />
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                >
                    {loading ? "Uploading..." : "Upload"}
                </button>
            </form>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white text-black p-6 rounded w-11/12 md:w-1/2">
                        <h3 className="font-semibold mb-2">Edit Description</h3>
                        <textarea
                            className="w-full border p-2 rounded h-48"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 border rounded"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 bg-blue-600 text-white rounded"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
