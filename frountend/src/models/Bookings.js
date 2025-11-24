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
        amount: { type: Number, default: 100 },
        paid: { type: Boolean, default: false },
        orderId: { type: String, trim: true },

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

// ✅ Always use singular model name (Mongoose auto-pluralizes)
export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
