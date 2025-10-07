import { NextResponse } from "next/server";
import { getCachedWPToken } from "../../../../../lib/wpAuth";

const WP_API = "https://blog.dermahealerindia.com/wp-json/wp/v2/posts";

export async function DELETE(req, { params }) {
    const { id } = await params; // <- remove await

    try {
        const WP_TOKEN = await getCachedWPToken();

        if (!WP_TOKEN) throw new Error("Could not retrieve a valid WordPress JWT token.");

        const res = await fetch(`${WP_API}/${id}?force=true`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${WP_TOKEN}` },
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || `WordPress API error: ${res.status}`);

        return NextResponse.json({ success: true, deleted: data });

    } catch (err) {
        console.error("Deletion Error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
