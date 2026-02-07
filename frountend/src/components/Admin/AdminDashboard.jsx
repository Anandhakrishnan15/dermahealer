"use client";

import { useStats } from "@/context/StatsContext";
import { useEffect, useState } from "react";

export default function BlogsPage() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const { setTotalBlog } = useStats();

    // ✅ Fetch WordPress posts
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch(
                    "https://blog.dermahealerindia.com/wp-json/wp/v2/posts?_embed"
                );
                const data = await res.json();
                console.log("this are the total Blogs", data);
                
                setTotalBlog(data.length)  
                const formatted = data.map((post) => ({
                    id: post.id,
                    title: post.title.rendered,
                    author: post._embedded?.author?.[0]?.name || "Unknown",
                    date: new Date(post.date).toLocaleDateString(),
                    status: post.status === "publish" ? "Published" : "Draft",
                    content: post.content.rendered,
                    views: post.views || 0,
                }));

                setBlogs(formatted);
            } catch (err) {
                console.error("Error fetching blogs:", err);
            } finally {              
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const handleRowClick = (id) => {
        setSelectedBlog((prev) =>
            prev?.id === id ? null : blogs.find((b) => b.id === id)
        );
    };

    const handleEdit = (id) => {
        window.open(
            `https://blog.dermahealerindia.com/wp-admin/post.php?post=${id}&action=edit`,
            "_blank"
        );
    };

    const handleDelete = async (id) => {
        if (!confirm(`Are you sure you want to delete blog ID: ${id}?`)) return;
        try {
            const res = await fetch(`/api/wp/posts/${id}`, { method: "DELETE" });
            const data = await res.json();

            if (data.error) throw new Error(data.error);
            alert(`✅ Deleted blog ${id}`);
            setBlogs((prev) => prev.filter((b) => b.id !== id));
        } catch (err) {
            alert(`❌ ${err.message}`);
        }
    };

    if (loading) {
        return <div className="p-6 text-gray-500">Loading blogs...</div>;
    }

    return (
        <div className="p-6">
            <h2 className="mb-4 text-xl font-bold">Blogs</h2>

            <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full border-collapse text-left text-sm">
                    <thead>
                        <tr className="bg-gradient-to-r from-gray-300 to-gray-200 text-[var(--sbg)]">
                            <th className="p-3">ID</th>
                            <th className="p-3">Title</th>
                            <th className="p-3">Author</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Status</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {blogs.map((blog) => (
                            <tr
                                key={blog.id}
                                className="cursor-pointer transition-colors odd:bg-[var(--bg)] even:bg-[var(--form-bg)] hover:bg-[var(--link-hover)]"
                                onClick={() => handleRowClick(blog.id)}
                            >
                                <td className="p-3 font-medium text-gray-700">{blog.id}</td>
                                <td className="p-3">{blog.title}</td>
                                <td className="p-3">{blog.author}</td>
                                <td className="p-3">{blog.date}</td>
                                <td
                                    className={`p-3 font-semibold ${blog.status === "Published"
                                            ? "text-green-600"
                                            : "text-yellow-600"
                                        }`}
                                >
                                    {blog.status}
                                </td>
                                <td
                                    className="flex justify-center gap-2 p-3"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <button
                                        onClick={() => handleEdit(blog.id)}
                                        className="rounded bg-blue-500 px-3 py-1 text-xs text-white hover:bg-blue-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(blog.id)}
                                        className="rounded bg-red-500 px-3 py-1 text-xs text-white hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Blog details */}
            {selectedBlog && (
                <div className="mt-6 rounded-lg bg-[var(--card-bg)] p-6 shadow">
                    <h3 className="mb-2 text-lg font-bold">{selectedBlog.title}</h3>
                    <p className="mb-4 text-sm text-gray-500">
                        By {selectedBlog.author} — {selectedBlog.date} • 👁{" "}
                        {selectedBlog.views} views
                    </p>

                    {/* WordPress HTML content */}
                    <div
                        className="prose max-w-none leading-relaxed text-gray-700"
                        dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
                    />
                </div>
            )}
        </div>
    );
}
