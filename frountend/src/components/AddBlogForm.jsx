"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// Dynamically import Quill to prevent SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function AddBlogForm({ onSubmit }) {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);
    const [content, setContent] = useState("");

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, image, content });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Title */}
            <input
                type="text"
                placeholder="Blog Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border rounded-lg p-2 bg-[var(--form-bg)]"
                required
            />

            {/* Image Upload */}
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="border rounded-lg p-2 bg-[var(--form-bg)]"
            />

            {/* Rich Text Editor */}
            <ReactQuill
                value={content}
                onChange={setContent}
                className="bg-white rounded-lg"
                theme="snow"
            />

            {/* Submit */}
            <button
                type="submit"
                className="px-4 py-2 bg-[var(--btn-bg)] text-[var(--text)] rounded-lg hover:bg-[var(--btn-hover)] transition"
            >
                Save Blog
            </button>
        </form>
    );
}
