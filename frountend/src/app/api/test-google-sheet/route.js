import { NextResponse } from "next/server";
import { google } from "googleapis";
import { authMiddleware } from "@/middleware/auth";
import { connectDB } from "@/lib/mongodb";
import Bookings from "@/models/Bookings";

export async function POST(req) {
    try {
        // ✅ Secure route
        await authMiddleware(req);

        // ✅ Connect DB
        await connectDB();

        // ✅ Fetch only not exported bookings
        const bookings = await Bookings.find({
            paid: true,
            exportedToSheet: false
        }).sort({ createdAt: 1 }).lean();

        if (!bookings.length) {
            return NextResponse.json({
                success: true,
                message: "No new bookings to export"
            });
        }

        // ✅ Convert data to sheet format
        const sheetData = bookings.map(b => [
            b._id.toString(),
            b.name,
            b.email,
            b.phone,
            b.doctor,
            b.date,
            b.time,
            b.amount,
            "YES",
            b.paymentInfo?.txnId || "",
            b.paymentInfo?.bankName || "",
            b.paymentInfo?.paymentMode || "",
            new Date(b.createdAt).toLocaleString()
        ]);

        // ✅ Google Sheets auth using env JSON
        const auth = new google.auth.GoogleAuth({
            credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON),
            scopes: ["https://www.googleapis.com/auth/spreadsheets"]
        });

        const sheets = google.sheets({ version: "v4", auth });

        // ✅ Export to sheet
        await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: "Sheet1!A:M",
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: sheetData
            }
        });

        // ✅ Mark exported
        await Bookings.updateMany(
            { _id: { $in: bookings.map(b => b._id) } },
            { $set: { exportedToSheet: true } }
        );

        return NextResponse.json({
            success: true,
            exportedCount: bookings.length
        });

    } catch (error) {
        console.error("Export Error:", error);

        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
