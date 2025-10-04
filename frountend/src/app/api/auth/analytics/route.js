import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function GET() {
    try {
        const key = JSON.parse(process.env.GA4_SERVICE_ACCOUNT_KEY);
        key.private_key = key.private_key.replace(/\\n/g, "\n"); // <-- critical!

        const propertyId = process.env.GA4_PROPERTY_ID;

        // ✅ Use JWT constructor instead of deprecated credentials
        const auth = new google.auth.JWT({
            email: key.client_email,
            key: key.private_key,
            scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
        });

        const analyticsData = google.analyticsdata({
            version: "v1beta",
            auth, // pass JWT instance
        });

        const response = await analyticsData.properties.runReport({
            property: `properties/${propertyId}`,
            requestBody: {
                metrics: [
                    { name: "totalUsers" },
                    { name: "sessions" },
                    { name: "screenPageViews" },
                ],
                dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
            },
        });

        return NextResponse.json(response.data);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
