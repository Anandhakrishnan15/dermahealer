export async function GET() {
    const mid = process.env.PAYTM_MID;

    if (!mid) {
        return Response.json(
            { error: "MID not configured" },
            { status: 500 }
        );
    }

    return Response.json({ mid });
}
