"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function BlogsPage() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBlog, setSelectedBlog] = useState(null);

    // ✅ Fetch WordPress posts
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch("https://blog.dermahealerindia.com/wp-json/wp/v2/posts?_embed");
                const data = await res.json();
                console.log(data);
                

                // Normalize WP response
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
        if (selectedBlog?.id === id) {
            setSelectedBlog(null);
        } else {
            const blogData = blogs.find((b) => b.id === id);
            setSelectedBlog(blogData);
        }
    };

    const handleEdit = (id) => {
        window.open(`https://blog.dermahealerindia.com/wp-admin/post.php?post=${id}&action=edit`, "_blank");
    };

    const handleDelete = async (id) => {
        if (!confirm(`Are you sure you want to delete blog ID: ${id}?`)) return;

        try {
            const res = await fetch(`/api/wp/posts/${id}`, { method: "DELETE" });
            const data = await res.json();

            if (data.error) throw new Error(data.error);
            alert(`✅ Deleted blog ${id}`);
            setBlogs(blogs.filter((b) => b.id !== id));
        } catch (err) {
            alert(`❌ ${err.message}`);
        }
    };


    if (loading) {
        return <div className="p-6 text-gray-500">Loading blogs...</div>;
    }

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Blogs</h2>

            <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full text-sm text-left border-collapse">
                    <thead>
                        <tr className="bg-gradient-to-r from-gray-300 to-gray-200 text-[var(--sbg)]">
                            <th className="p-3">ID</th>
                            <th className="p-3">Title</th>
                            <th className="p-3">Author</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Views</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>

                    <AnimatePresence>
                        <tbody>
                            {blogs.map((blog) => (
                                <motion.tr
                                    key={blog.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="odd:bg-[var(--bg)] even:bg-[var(--form-bg)] hover:bg-[var(--link-hover)] transition-colors cursor-pointer"
                                    onClick={() => handleRowClick(blog.id)}
                                >
                                    <td className="p-3 font-medium text-gray-700">{blog.id}</td>
                                    <td className="p-3">{blog.title}</td>
                                    <td className="p-3">{blog.author}</td>
                                    <td className="p-3">{blog.date}</td>
                                    <td
                                        className={`p-3 font-semibold ${blog.status === "Published" ? "text-green-600" : "text-yellow-600"}`}
                                    >
                                        {blog.status}
                                    </td>
                                    <td className="p-3">{blog.views}</td>

                                    <td
                                        className="p-3 flex justify-center gap-2"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <button
                                            onClick={() => handleEdit(blog.id)}
                                            className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(blog.id)}
                                            className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </AnimatePresence>
                </table>
            </div>

            {/* Blog details section */}
            <AnimatePresence>
                {selectedBlog && (
                    <motion.div
                        key="blog-details"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="mt-6 p-6 rounded-lg shadow bg-[var(--card-bg)]"
                    >
                        <h3 className="text-lg font-bold mb-2">{selectedBlog.title}</h3>
                        <p className="text-sm text-gray-500 mb-4">
                            By {selectedBlog.author} — {selectedBlog.date}
                        </p>
                        <p className="text-sm text-gray-500 mb-4">
                            By {selectedBlog.author} — {selectedBlog.date} • 👁 {selectedBlog.views} views
                        </p>

                        {/* ⚠️ WP content includes HTML */}
                        <div
                            className="text-gray-700 leading-relaxed prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
