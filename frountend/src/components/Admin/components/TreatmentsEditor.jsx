"use client";

import { useState, useEffect } from "react";
import { X, Edit, Save, XCircle, Plus, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

export default function TreatmentsEditor() {
  const [treatments, setTreatments] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [currentTreatmentIndex, setCurrentTreatmentIndex] = useState(null);
  const [isNewTreatment, setIsNewTreatment] = useState(false);

  // --- Fetch treatments from MongoDB
  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const res = await fetch("/api/update-treatments");
        const data = await res.json();
        if (data.success) setTreatments(data.treatments);
      } catch (err) {
        console.error("Failed to fetch treatments:", err);
      }
    };
    fetchTreatments();
  }, []);

  // --- Update field
  const handleChange = (index, field, value) => {
    const updated = [...treatments];
    updated[index][field] = value;
    setTreatments(updated);
  };

  // --- Update image
  const handleImageChange = (tIndex, iIndex, value) => {
    const updated = [...treatments];
    updated[tIndex].images[iIndex] = value;
    setTreatments(updated);
  };

  // --- Remove image
  const handleRemoveImage = (tIndex, iIndex) => {
    const updated = [...treatments];
    updated[tIndex].images.splice(iIndex, 1);
    setTreatments(updated);
  };

  // --- Open modal to add image
  const openAddImageModal = (tIndex) => {
    if (treatments[tIndex].images.length >= 3) {
      toast.warning("You can only add up to 3 images per treatment.");
      return;
    }
    setCurrentTreatmentIndex(tIndex);
    setNewImageUrl("");
    setShowImageModal(true);
  };

  // --- Add new image
  const handleAddImage = () => {
    if (!newImageUrl.trim()) return;
    const updated = [...treatments];
    updated[currentTreatmentIndex].images.push(newImageUrl);
    setTreatments(updated);
    setShowImageModal(false);
  };

  // --- Edit mode
  const handleEdit = (index) => setEditingIndex(index);

  // --- Save treatment (create or update)
  const handleSave = async (tIndex) => {
    try {
      const treatment = treatments[tIndex];
      const method = treatment._id ? "PATCH" : "POST";
      const body = treatment._id
        ? { id: treatment._id, updatedData: treatment }
        : treatment;

        const res = await fetch("/api/update-treatments", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await res.json();

      if (result.success) {
        toast.success("Saved successfully!");
        const updatedTreatments = [...treatments];
        updatedTreatments[tIndex] = result.treatment; // update _id if new
        setTreatments(updatedTreatments);
        setEditingIndex(null);
        setIsNewTreatment(false);
      } else {
        toast.error("❌ Failed: " + result.error);
      }
    } catch (err) {
      console.error("Error saving treatment:", err);
    }
  };

  // --- Cancel editing
  const handleCancel = () => {
    if (isNewTreatment) {
      setTreatments(treatments.slice(1));
      setIsNewTreatment(false);
    }
    setEditingIndex(null);
  };

  // --- Add new treatment
  const handleAddTreatment = () => {
    const newTreatment = { heading: "", description: "", images: [] };
    setTreatments([newTreatment, ...treatments]);
    setEditingIndex(0);
    setIsNewTreatment(true);
  };

  // --- Remove a treatment entirely
  const handleRemoveTreatment = async (tIndex) => {
    try {
      const treatment = treatments[tIndex];
      if (!treatment._id) {
        // Not saved yet, remove locally
        const updated = [...treatments];
        updated.splice(tIndex, 1);
        setTreatments(updated);
        return;
      }

        const res = await fetch("/api/update-treatments", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: treatment._id }),
      });
      const result = await res.json();

      if (result.success) {
        const updated = [...treatments];
        updated.splice(tIndex, 1);
        setTreatments(updated);
        toast.success("Treatment removed!");
        if (editingIndex === tIndex) setEditingIndex(null);
      } else {
        toast.error("❌ Failed: " + result.error);
      }
    } catch (err) {
      console.error("Error deleting treatment:", err);
    }
  };

  return (
    <div className="space-x-10 space-y-10 flex flex-wrap justify-around">
      {/* Add new treatment button */}
      <button
        onClick={handleAddTreatment}
        className="flex flex-col items-center justify-center w-64 h-48 border-2 border-dashed border-gray-400 rounded-xl text-gray-500 hover:border-green-500 hover:text-green-500 transition"
      >
        <Plus size={32} />
        <span className="mt-2">Add New Treatment</span>
      </button>

      {treatments.map((treatment, tIndex) => (
        <div
          key={treatment._id || tIndex}
          className="relative p-6 w-150 border rounded-2xl shadow-lg bg-white hover:shadow-xl transition"
        >
          {/* Action buttons */}
          {editingIndex === tIndex ? (
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => handleSave(tIndex)}
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
              <button
                onClick={() => handleRemoveTreatment(tIndex)}
                className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-red-600 transition"
              >
                <Trash2 size={16} /> Remove
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
                placeholder="Heading"
                value={treatment.heading}
                onChange={(e) => handleChange(tIndex, "heading", e.target.value)}
                className="w-full p-3 border rounded-lg text-lg font-semibold mb-3"
              />
              <textarea
                placeholder="Description"
                value={treatment.description}
                onChange={(e) => handleChange(tIndex, "description", e.target.value)}
                className="w-full p-3 border rounded-lg"
                rows={3}
              />
            </>
          ) : (
            <>
              <h3 className="text-2xl font-bold text-gray-800">{treatment.heading}</h3>
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
                        onChange={(e) => handleImageChange(tIndex, iIndex, e.target.value)}
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

              {editingIndex === tIndex && treatment.images.length < 3 && (
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
