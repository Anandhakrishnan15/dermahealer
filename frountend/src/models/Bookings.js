import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
    {
        // 👤 Basic booking info
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true },
        phone: { type: String, required: true, trim: true },
        doctor: { type: String, required: true, trim: true },
        date: { type: String, required: true },
        time: { type: String, required: true },
        notes: { type: String, default: "" },

        // 💰 Payment info
        amount: { type: Number, default: 50 },
        paid: { type: Boolean, default: false },
        orderId: { type: String, trim: true },
        exportedToSheet: {
            type: Boolean,
            default: false,
            index: true // IMPORTANT for fast search
        },
        // 🧾 Detailed transaction info
        paymentInfo: {
            txnId: { type: String, default: "" },
            bankTxnId: { type: String, default: "" },
            bankName: { type: String, default: "" },
            gatewayName: {
                type: String,
                enum: ["HDFC", "ICICI", "AXIS", "PAYTM", "OTHER", ""],
                default: "",
            },
            paymentMode: {
                type: String,
                enum: ["CC", "DC", "NB", "UPI", "WALLET", "OTHER", ""],
                default: "",
            },
            txnAmount: { type: String, default: "0.00" },
            txnDate: { type: String, default: "" },
            respMsg: { type: String, default: "" },
        },
    },
    { timestamps: true }
);

// ✅ ADD THIS INDEX HERE
BookingSchema.index({
    doctor: 1,
    date: 1,
    time: 1,
    paid: 1
});

// ✅ Always use singular model name
export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
