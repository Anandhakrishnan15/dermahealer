// models/Treatment.js
import mongoose from "mongoose";

const TreatmentSchema = new mongoose.Schema(
    {
        heading: { type: String, required: true },
        description: { type: String, required: true },
        images: { type: [String], required: true }, // array of image URLs
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    { versionKey: false }
);

// Avoid model overwrite error in Next.js hot reload
export default mongoose.models.Treatment || mongoose.model("Treatment", TreatmentSchema);
