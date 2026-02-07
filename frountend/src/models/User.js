import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            trim: true,
            minlength: [3, "Username must be at least 3 characters"],
            maxlength: [50, "Username cannot exceed 50 characters"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"],
            unique: true,
            trim: true,
            match: [/^\+?[0-9]{10,12}$/, "Please enter a valid phone number"], // accepts + and 10–12 digits
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters"],
        },
        role: {
            type: String,
            enum: ["admin", "staff"],
            default: "staff",
        },
        blocked: {
            type: Boolean,
            default: true, // 🚨 blocked by default
        },
    },
    {
        timestamps: true,
        versionKey: false, // optional: removes `__v`
    }
);

// Prevent model overwrite on hot-reload
export default mongoose.models.User || mongoose.model("User", UserSchema);
