import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { log } from "console";

const filePath = path.join(process.cwd(), "src", "data", "rating.json");

console.log(filePath);


// ✅ GET current rating
export async function GET() {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        return NextResponse.json(JSON.parse(data));
    } catch (err) {
        return NextResponse.json({ error: "Failed to read rating.json" }, { status: 500 });
    }
}

// ✅ POST update rating (use from Admin Dashboard)
export async function POST(req) {
    try {
        const body = await req.json();
        await fs.writeFile(filePath, JSON.stringify(body, null, 2));
        return NextResponse.json({ success: true, rating: body });
    } catch (err) {
        return NextResponse.json({ error: "Failed to update rating.json" }, { status: 500 });
    }
}
