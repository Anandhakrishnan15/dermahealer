"use client";
import { useEffect, useState } from "react";

export default function AdminFilesPage() {
    const [files, setFiles] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchFiles() {
            try {
                const token = localStorage.getItem("token"); // JWT token stored in localStorage
                const res = await fetch("/api/files", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                const data = await res.json();

                if (!res.ok) {
                    setError(data.error || "Failed to fetch files");
                } else {
                    setFiles(data.files);
                }
            } catch (err) {
                setError("Network error");
            } finally {
                setLoading(false);
            }
        }

        fetchFiles();
    }, []);

    if (loading) return <p className="p-4">Loading...</p>;
    if (error) return <p className="p-4 text-red-500">{error}</p>;

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">All Files</h1>
            <table className="w-full border-collapse border">
                <thead>
                    <tr>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Type</th>
                        <th className="border p-2">Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {files.map((file) => (
                        <tr key={file._id}>
                            <td className="border p-2">{file.name}</td>
                            <td className="border p-2">{file.type}</td>
                            <td className="border p-2">{new Date(file.createdAt).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
