"use client";

import { useState } from "react";
import { X, Edit, Save, XCircle, Plus } from "lucide-react";

export default function TreatmentsEditor({ initialData }) {
    const [treatments, setTreatments] = useState(initialData);
    const [editingIndex, setEditingIndex] = useState(null);
    const [showImageModal, setShowImageModal] = useState(false);
    const [newImageUrl, setNewImageUrl] = useState("");
    const [currentTreatmentIndex, setCurrentTreatmentIndex] = useState(null);

    const handleChange = (index, field, value) => {
        const updated = [...treatments];
        updated[index][field] = value;
        setTreatments(updated);
    };

    const handleImageChange = (tIndex, iIndex, value) => {
        const updated = [...treatments];
        updated[tIndex].images[iIndex] = value;
        setTreatments(updated);
    };

    const handleRemoveImage = (tIndex, iIndex) => {
        const updated = [...treatments];
        updated[tIndex].images.splice(iIndex, 1);
        setTreatments(updated);
    };

    const openAddImageModal = (tIndex) => {
        setCurrentTreatmentIndex(tIndex);
        setNewImageUrl("");
        setShowImageModal(true);
    };

    const handleAddImage = () => {
        if (!newImageUrl.trim()) return;
        const updated = [...treatments];
        updated[currentTreatmentIndex].images.push(newImageUrl);
        setTreatments(updated);
        setShowImageModal(false);
    };

    const handleEdit = (index) => setEditingIndex(index);

    const handleSave = () => {
        console.log("Updated Treatments:", treatments);
        setEditingIndex(null);
    };

    const handleCancel = () => {
        setTreatments(initialData);
        setEditingIndex(null);
    };

    return (
        <div className="space-x-10 space-y-10 flex flex-wrap justify-around">
            {treatments.map((treatment, tIndex) => (
                <div
                    key={tIndex}
                    className="relative p-6 w-150 border rounded-2xl shadow-lg bg-white hover:shadow-xl transition"
                >
                    {/* Action buttons */}
                    {editingIndex === tIndex ? (
                        <div className="absolute top-4 right-4 flex gap-2">
                            <button
                                onClick={handleSave}
                                className="bg-green-500 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-green-600 transition"
                            >
                                <Save size={16} /> Save
                            </button>
                            <button
                                onClick={handleCancel}
                                className="bg-gray-500 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-gray-600 transition"
                            >
                                <XCircle size={16} /> Cancel
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => handleEdit(tIndex)}
                            className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-blue-600 transition"
                        >
                            <Edit size={16} /> Edit
                        </button>
                    )}

                    {/* Heading & Description */}
                    {editingIndex === tIndex ? (
                        <>
                            <input
                                type="text"
                                value={treatment.heading}
                                onChange={(e) =>
                                    handleChange(tIndex, "heading", e.target.value)
                                }
                                className="w-full p-3 border rounded-lg text-lg font-semibold mb-3"
                            />
                            <textarea
                                value={treatment.description}
                                onChange={(e) =>
                                    handleChange(tIndex, "description", e.target.value)
                                }
                                className="w-full p-3 border rounded-lg"
                                rows={3}
                            />
                        </>
                    ) : (
                        <>
                            <h3 className="text-2xl font-bold text-gray-800">
                                {treatment.heading}
                            </h3>
                            <p className="text-gray-600 mt-2">{treatment.description}</p>
                        </>
                    )}

                    {/* Images Section */}
                    <div className="mt-6">
                        <h4 className="font-semibold text-gray-700 mb-3">Images</h4>
                        <div className="flex flex-wrap gap-4">
                            {treatment.images.map((img, iIndex) => (
                                <div
                                    key={iIndex}
                                    className="relative w-40 h-32 border rounded-lg overflow-hidden shadow-sm bg-gray-50"
                                >
                                    <img
                                        src={img}
                                        alt={`treatment-${iIndex}`}
                                        className="w-full h-full object-contain"
                                    />
                                    {editingIndex === tIndex && (
                                        <>
                                            <input
                                                type="text"
                                                value={img}
                                                onChange={(e) =>
                                                    handleImageChange(tIndex, iIndex, e.target.value)
                                                }
                                                className="mt-2 w-full p-1 text-sm border rounded"
                                            />
                                            <button
                                                onClick={() => handleRemoveImage(tIndex, iIndex)}
                                                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
                                            >
                                                <X size={14} />
                                            </button>
                                        </>
                                    )}
                                </div>
                            ))}

                            {/* Add new image */}
                            {editingIndex === tIndex && (
                                <button
                                    onClick={() => openAddImageModal(tIndex)}
                                    className="flex items-center justify-center w-40 h-32 border-2 border-dashed border-gray-400 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition"
                                >
                                    <Plus size={20} /> Add Image
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            {/* Image Modal */}
            {showImageModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-lg w-[400px]">
                        <h3 className="text-lg font-semibold mb-4">Add New Image</h3>
                        <input
                            type="text"
                            placeholder="Paste image URL here..."
                            value={newImageUrl}
                            onChange={(e) => setNewImageUrl(e.target.value)}
                            className="w-full p-2 border rounded-lg mb-4"
                        />
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowImageModal(false)}
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddImage}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
