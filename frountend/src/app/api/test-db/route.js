// app/api/test-db/route.js (Next.js 15 / App Router)
import { NextResponse } from "next/server";
import { getDBConnection } from "@/lib/db";

export async function GET() {
    try {
        const db = await getDBConnection();
        const [rows] = await db.query("SELECT NOW() as time");
        return NextResponse.json({ success: true, serverTime: rows[0].time });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
