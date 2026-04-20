import mongoose from "mongoose";

const FollowUpSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
        },

        patientDetails: {
            name: { type: String, required: true },
            email: { type: String },
            phone: { type: String, required: true },
        },

        doctor: {
            name: { type: String, required: true },
            doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
        },

        appointment: {
            date: { type: Date, required: true },
            timeSlot: { type: String, required: true },
        },

        // ✅ Professional Status System
        status: {
            type: String,
            enum: ["scheduled", "completed", "cancelled", "no-show"],
            default: "scheduled",
        },

        payment: {
            isPaid: { type: Boolean, default: false },
            amount: { type: Number, default: 0 },
            method: {
                type: String,
                enum: ["cash", "upi", "card", "online"],
            },
            transactionId: { type: String },
            paidAt: { type: Date },
        },

        notifications: {
            emailSent: { type: Boolean, default: false },      // confirmation email
            reminderSent: { type: Boolean, default: false },   // 1-day-before reminder
            whatsappSent: { type: Boolean, default: false },
            smsSent: { type: Boolean, default: false },        // optional SMS
        },

        reminderDate: { type: Date }, // calculated: 1 day before appointment

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        notes: String,
    },
    { timestamps: true }
);

// ✅ Indexes
FollowUpSchema.index({ "patientDetails.phone": 1 });
FollowUpSchema.index({ "appointment.date": 1 });
FollowUpSchema.index({ status: 1 });
FollowUpSchema.index({ reminderDate: 1 }); // for efficient reminder queries

export default mongoose.models.FollowUp ||
    mongoose.model("FollowUp", FollowUpSchema);