"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { XCircle, Home, RotateCcw } from "lucide-react";

export default function PaymentFailed() {
    const params = useSearchParams();
    const router = useRouter();
    const [reason, setReason] = useState("Transaction failed");

    useEffect(() => {
        const r = params.get("reason");
        if (r) setReason(decodeURIComponent(r));
    }, [params]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-rose-100 text-center px-6">
            <XCircle className="w-20 h-20 text-red-500 mb-4 animate-bounce" />
            <h1 className="text-2xl font-semibold text-red-700 mb-2">
                Payment Failed
            </h1>
            <p className="text-gray-700 mb-6">{reason}</p>

            <div className="flex gap-4">
                <button
                    onClick={() => router.push("/book-appointment")}
                    className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2"
                >
                    <RotateCcw size={18} />
                    Try Again
                </button>

                <button
                    onClick={() => router.push("/")}
                    className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center gap-2"
                >
                    <Home size={18} />
                    Home
                </button>
            </div>

            <button
                onClick={() => router.back()}
                className="mt-10 text-sm text-gray-500 hover:underline"
            >
                Close
            </button>
        </div>
    );
}
