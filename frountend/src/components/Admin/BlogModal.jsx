"use client";

export default function BlogModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-lg">
                <h2 className="text-xl font-bold mb-4">Add New Blog</h2>
                <input type="text" placeholder="Blog Title" className="border w-full p-2 mb-3 rounded" />
                <textarea placeholder="Blog Description" className="border w-full p-2 mb-3 rounded" rows="4"></textarea>
                <input type="file" className="mb-3" />
                <div className="border p-2 mb-3">[Rich Text Editor Here]</div>
                <div className="flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded">Add Blog</button>
                </div>
            </div>
        </div>
    );
}
