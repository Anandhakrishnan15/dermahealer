"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import blogPosts from "../../../data/blogPosts"; // assuming your blogPosts array is exported here

export default function BlogsPage() {
    const [selectedBlog, setSelectedBlog] = useState(null);

    const blogs = [
        { id: 1, title: "The Future of Dermatology", author: "Dr. Smith", date: "2024-07-20", status: "Published" },
        { id: 2, title: "Top Skincare Tips", author: "Dr. Lee", date: "2024-07-25", status: "Draft" },
        { id: 3, title: "Understanding Skin Allergies", author: "Dr. Brown", date: "2024-08-05", status: "Published" },
    ];

    const handleRowClick = (id) => {
        if (selectedBlog?.id === id) {
            setSelectedBlog(null); // collapse if same row clicked
        } else {
            const blogData = blogPosts.find((b) => b.id === id);
            setSelectedBlog(blogData);
        }
    };

    const handleEdit = (id) => {
        alert(`Edit blog with ID: ${id}`);
    };

    const handleDelete = (id) => {
        if (confirm(`Are you sure you want to delete blog ID: ${id}?`)) {
            alert(`Deleted blog with ID: ${id}`);
        }
    };

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
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>

                    <AnimatePresence>
                        <tbody>
                            {blogPosts.map((blog) => (
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
                                        className={`p-3 font-semibold ${blog.status === "Published" ? "text-green-600" : "text-yellow-600"
                                            }`}
                                    >
                                        {blog.status}
                                    </td>
                                    <td
                                        className="p-3 flex justify-center gap-2"
                                        onClick={(e) => e.stopPropagation()} // stop row click
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
                        <div className="text-gray-700 leading-relaxed">{selectedBlog.content}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
