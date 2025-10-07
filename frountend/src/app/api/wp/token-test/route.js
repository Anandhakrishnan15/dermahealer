// /api/wp/token-test/route.js
import { NextResponse } from "next/server";
import { getCachedWPToken } from "@/lib/wpAuth";

export async function GET() {
    try {
        const token = await getCachedWPToken();
        return NextResponse.json({ token });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
