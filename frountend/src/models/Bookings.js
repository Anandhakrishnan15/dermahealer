import mongoose from "mongoose";

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
            enum: ["PENDING", "SUCCESS", "FAILED"],
            default: "PENDING",
            index: true,
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

// 🔍 Payment lookup optimization
BookingSchema.index({ orderId: 1, paymentStatus: 1 });

export default mongoose.models.Booking ||
    mongoose.model("Booking", BookingSchema);