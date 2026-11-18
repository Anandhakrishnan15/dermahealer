import mongoose from "mongoose";
import { MAX_PER_SLOT } from "@/lib/bookingCapacity";

const BookingSchema = new mongoose.Schema(
    {
        // 👤 Booking info
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true },
        phone: { type: String, required: true, trim: true },
        doctor: { type: String, required: true, trim: true },
        date: { type: String, required: true },
        time: { type: String, required: true },
        notes: { type: String, default: "" },

        // 💰 Payment
        amount: { type: Number, default: 50 },

        paid: { type: Boolean, default: false },

        paymentStatus: {
            type: String,
            enum: ["PENDING", "SUCCESS", "FAILED", "CAPACITY_CONFLICT"],
            default: "PENDING",
            index: true,
        },
        capacityManaged: {
            type: Boolean,
            default: false,
        },
        capacitySeat: {
            type: Number,
            min: 1,
            max: MAX_PER_SLOT,
        },
        reservationExpiresAt: {
            type: Date,
        },

        orderId: {
            type: String,
            trim: true,
            unique: true,
            index: true,
        },

        exportedToSheet: {
            type: Boolean,
            default: false,
            index: true,
        },

        // ✅ NEW FIELD (🔥 IMPORTANT)
        visited: {
            type: Boolean,
            default: false,
            index: true,
        },
        whatsappSent: {
            type: Boolean,
            default: false,
        },
        // 🧾 Transaction details
        paymentInfo: {
            txnId: { type: String, default: "" },
            bankTxnId: { type: String, default: "" },
            bankName: { type: String, default: "" },
            gatewayName: { type: String, default: "" },
            paymentMode: { type: String, default: "" },
            txnAmount: { type: String, default: "0.00" },
            txnDate: { type: String, default: "" },
            respMsg: { type: String, default: "" },
        },
    },
    { timestamps: true }
);

// 🔍 Prevent double booking (same slot)
BookingSchema.index({
    doctor: 1,
    date: 1,
    time: 1,
    paid: 1,
});

BookingSchema.index(
    {
        doctor: 1,
        date: 1,
        time: 1,
        capacitySeat: 1,
    },
    {
        unique: true,
        partialFilterExpression: {
            capacitySeat: { $type: "number" },
        },
        name: "unique_booking_slot_seat",
    },
);

// 🔍 Payment lookup optimization
BookingSchema.index({ orderId: 1, paymentStatus: 1 });

export default mongoose.models.Booking ||
    mongoose.model("Booking", BookingSchema);