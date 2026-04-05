import { authMiddleware } from "@/middleware/auth";

// 🔥 GLOBAL CACHE
let cache = {};
const CACHE_TTL = 30 * 1000; // 30 seconds

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

// ==========================
// ✅ POST → ADD PATIENT
// ==========================
export async function POST(req) {
    try {
        const user = await authMiddleware(req);

        if (!user) {
            return Response.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await req.json();

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);

        const googleRes = await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            signal: controller.signal,
        });

        clearTimeout(timeout);

        const result = await googleRes.json();

        if (!googleRes.ok || !result.success) {
            throw new Error(result.error || "Google Script Error");
        }

        cache = {};

        return Response.json({
            success: true,
            message: "Patient added successfully",
        });

    } catch (error) {
        console.error("POST API Error:", error);

        return Response.json(
            {
                success: false,
                error:
                    error.name === "AbortError"
                        ? "Request timeout"
                        : error.message || "Internal Server Error",
            },
            { status: 500 }
        );
    }
}

// ==========================
// ✅ GET → FETCH PATIENTS
// ==========================
export async function GET(req) {
    try {
        const user = await authMiddleware(req);

        if (!user) {
            return Response.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(req.url);

        const page = parseInt(searchParams.get("page")) || 1;
        const limit = parseInt(searchParams.get("limit")) || 10;
        const search = searchParams.get("search") || "";

        const key = `${search}_${page}_${limit}`;
        const now = Date.now();

        if (cache[key] && now - cache[key].timestamp < CACHE_TTL) {
            return Response.json(cache[key].data);
        }

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);

        const googleRes = await fetch(
            `${GOOGLE_SCRIPT_URL}?search=${encodeURIComponent(search)}&page=${page}&limit=${limit}`,
            {
                signal: controller.signal,
            }
        );

        clearTimeout(timeout);

        const data = await googleRes.json();

        if (!googleRes.ok || !data.success) {
            throw new Error(data.error || "Google Script Error");
        }

        const response = {
            success: true,
            patients: data.data,
            total: data.total,
            page: data.page,
            totalPages: data.totalPages,
        };

        cache[key] = {
            data: response,
            timestamp: now,
        };

        if (Object.keys(cache).length > 100) {
            cache = {};
        }

        return Response.json(response, {
            headers: {
                "Cache-Control": "public, max-age=30",
            },
        });

    } catch (error) {
        console.error("GET API Error:", error);

        return Response.json(
            {
                success: false,
                error:
                    error.name === "AbortError"
                        ? "Request timeout"
                        : error.message || "Internal Server Error",
            },
            { status: 500 }
        );
    }
}