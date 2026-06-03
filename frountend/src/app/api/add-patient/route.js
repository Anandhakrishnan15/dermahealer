import { authMiddleware } from "@/middleware/auth";
import { z } from "zod";

// 🔥 CACHE
let cache = {};
const CACHE_TTL = 30 * 1000;

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

// ==========================
// ✅ ZOD SCHEMA (POST)
// ==========================
const patientSchema = z.object({
    fullName: z.string().min(2, "Name too short").max(50),
    email: z.string().optional().or(z.literal("")), // Allows ""
    phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid phone number"),
    age: z.coerce.number().min(1).max(120), // ✅ FIXED
    gender: z.enum(["male", "female"]),
    dob: z.string().optional().or(z.literal("")),
    treatment: z.string().min(2, "Treatment required"),
    address: z.string().optional().or(z.literal("")),
    notes: z.string().max(300).optional().or(z.literal("")),
});

// ==========================
// ✅ ZOD SCHEMA (GET)
// ==========================
const querySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(50).default(10),
    search: z.string().max(50).optional(),
});

// ==========================
// 🔒 SANITIZER
// ==========================
const sanitize = (obj) => {
    const clean = {};
    for (let key in obj) {
        if (typeof obj[key] === "string") {
            const trimmedValue = obj[key].trim().replace(/[<>$;]/g, "");

            // If the string is empty after cleaning, set it to "NIL"
            clean[key] = trimmedValue === "" ? "NIL" : trimmedValue;
        } else if (obj[key] === null || obj[key] === undefined) {
            // Handle null or undefined values as NIL as well
            clean[key] = "NIL";
        } else {
            clean[key] = obj[key];
        }
    }
    return clean;
};

// ==========================
// ❗ FORMAT ZOD ERRORS
// ==========================
const formatZodErrors = (error) => {
    const errors = {};
    error.issues.forEach((err) => {
        const field = err.path[0];
        if (!errors[field]) {
            errors[field] = err.message;
        }
    });
    return errors;
};

// ==========================
// ✅ POST → ADD PATIENT
// ==========================
export async function POST(req) {
    try {
        // 🔒 AUTH
        const user = await authMiddleware(req);
        if (!user) {
            return Response.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        // ❗ ENV CHECK
        if (!GOOGLE_SCRIPT_URL) {
            throw new Error("Missing GOOGLE_SCRIPT_URL");
        }

        const body = await req.json();

        // ✅ VALIDATION
        const parsed = patientSchema.safeParse(body);

        if (!parsed.success) {
            console.log("ZOD ERROR:", parsed.error);

            return Response.json(
                {
                    success: false,
                    error:
                        parsed.error.issues?.[0]?.message ||
                        "Validation failed",
                    errors: formatZodErrors(parsed.error), // 🔥 ALL ERRORS
                },
                { status: 400 }
            );
        }

        // 🔒 SANITIZE
        const cleanData = sanitize(parsed.data);

        // ⏱ TIMEOUT PROTECTION
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);

        let googleRes;
        try {
            googleRes = await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cleanData),
                signal: controller.signal,
            });
        } catch (err) {
            throw new Error("Failed to connect to Google Script");
        }

        clearTimeout(timeout);

        let result;
        try {
            result = await googleRes.json();
        } catch {
            throw new Error("Invalid response from Google Script");
        }

        if (!googleRes.ok || !result?.success) {
            throw new Error(result?.error || "Google Script Error");
        }

        // 🔄 CLEAR CACHE
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

        if (!GOOGLE_SCRIPT_URL) {
            throw new Error("Missing GOOGLE_SCRIPT_URL");
        }

        const { searchParams } = new URL(req.url);

        const parsedQuery = querySchema.safeParse({
            page: searchParams.get("page"),
            limit: searchParams.get("limit"),
            search: searchParams.get("search"),
        });

        if (!parsedQuery.success) {
            return Response.json(
                { success: false, error: "Invalid query params" },
                { status: 400 }
            );
        }

        let { page, limit, search } = parsedQuery.data;

        search = search?.replace(/[<>$;]/g, "") || "";

        const key = `${search}_${page}_${limit}`;
        const now = Date.now();

        if (cache[key] && now - cache[key].timestamp < CACHE_TTL) {
            return Response.json(cache[key].data);
        }

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);

        let googleRes;
        try {
            googleRes = await fetch(
                `${GOOGLE_SCRIPT_URL}?search=${encodeURIComponent(
                    search
                )}&page=${page}&limit=${limit}`,
                { signal: controller.signal }
            );
        } catch {
            throw new Error("Failed to connect to Google Script");
        }

        clearTimeout(timeout);

        let data;
        try {
            data = await googleRes.json();
        } catch {
            throw new Error("Invalid response from Google Script");
        }

        if (!googleRes.ok || !data?.success) {
            throw new Error(data?.error || "Google Script Error");
        }

        const response = {
            success: true,
            patients: data.data || [],
            total: data.total || 0,
            page: data.page || page,
            totalPages: data.totalPages || 1,
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