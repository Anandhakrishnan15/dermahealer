// models/Rating.js
import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema(
    {
        score: { type: Number, required: true, min: 0, max: 5 },
        reviews: { type: Number, required: true, min: 0 },
        updatedAt: { type: Date, default: Date.now },
    },
    { versionKey: false }
);

// Only one document is stored, so we can overwrite safely
export default mongoose.models.Rating || mongoose.model("Rating", RatingSchema);
