import { connectDB } from "@/lib/mongodb";
import Treatment from "@/models/Treatment";
import { NextResponse } from "next/server";

// GET all treatments
export async function GET() {
    try {
        await connectDB();
        const treatments = await Treatment.find().sort({ createdAt: -1 });
        return NextResponse.json({ success: true, treatments });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}

// POST: create a new treatment
export async function POST(req) {
    try {
        await connectDB();
        const data = await req.json();

        if (!data.heading || !data.description || !data.images?.length) {
            return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 });
        }

        const newTreatment = await Treatment.create(data);
        return NextResponse.json({ success: true, treatment: newTreatment });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}

// PATCH: update a treatment by ID
export async function PATCH(req) {
    try {
        await connectDB();
        const { id, updatedData } = await req.json();

        const updated = await Treatment.findByIdAndUpdate(id, { ...updatedData, updatedAt: new Date() }, { new: true });
        if (!updated) return NextResponse.json({ success: false, error: "Treatment not found" }, { status: 404 });

        return NextResponse.json({ success: true, treatment: updated });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}

// DELETE: remove a treatment by ID
export async function DELETE(req) {
    try {
        await connectDB();
        const { id } = await req.json();

        const deleted = await Treatment.findByIdAndDelete(id);
        if (!deleted) return NextResponse.json({ success: false, error: "Treatment not found" }, { status: 404 });

        return NextResponse.json({ success: true, message: "Treatment deleted", treatment: deleted });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
