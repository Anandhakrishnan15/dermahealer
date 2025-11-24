import mongoose from "mongoose";

const HolidaySchema = new mongoose.Schema(
    {
        date: { type: String, required: true },
        reason: { type: String, default: "" },
        type: { type: String, enum: ["common", "doctor"], required: true },
        doctor: { type: String, default: "" } // Only for doctor holidays
    },
    { timestamps: true }
);

export default mongoose.models.Holiday || mongoose.model("Holiday", HolidaySchema);
