"use client";

import { useState, useEffect } from "react";

export default function BookAppointment() {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        doctor: "",
        date: "",
        time: "",
        notes: "",
    });

    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [loading, setLoading] = useState(false);
    const [paytmReady, setPaytmReady] = useState(false);

    // ✅ Load Paytm SDK dynamically
    useEffect(() => {
        const mid = process.env.NEXT_PUBLIC_PAYTM_MID;
        const baseDomain = "securestage.paytmpayments.com"; // Staging environment

        const sdkUrl = `https://${baseDomain}/merchantpgpui/checkoutjs/merchants/${mid}.js`;
        const script = document.createElement("script");
        script.src = sdkUrl;
        script.crossOrigin = "anonymous";

        script.onload = () => setPaytmReady(true);
        script.onerror = () => setPaytmReady(false);

        document.body.appendChild(script);
        return () => document.body.removeChild(script);
    }, []);

    // ✅ Generate dates for 30 days
    const dates = Array.from({ length: 30 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return {
            value: date.toISOString().split("T")[0],
            label: date.toDateString().slice(0, 10),
        };
    });

    // ✅ Available time slots
    const times = ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // ✅ Handle booking & payment
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Basic validation
        if (!selectedDate || !selectedTime) {
            alert("Please select both date and time before booking.");
            setLoading(false);
            return;
        }

        // Sync date/time into form
        const updatedForm = { ...form, date: selectedDate, time: selectedTime };

        try {
            // Step 1️⃣ Save booking
            const res = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedForm),
            });

            const text = await res.text();
            const bookingData = JSON.parse(text || "{}");

            if (!bookingData?.booking) throw new Error("Booking creation failed.");
            const { booking } = bookingData;

            // Step 2️⃣ Get Paytm token
            const paytmRes = await fetch("/api/paytm/initiate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    orderId: booking.orderId,
                    amount: booking.amount,
                }),
            });

            const paytmText = await paytmRes.text();
            const paytmData = JSON.parse(paytmText || "{}");

            const { txnToken, orderId, mid, amount } = paytmData;
            if (!txnToken || !orderId || !mid) throw new Error("Invalid Paytm response.");

            // Step 3️⃣ Initialize Paytm Checkout
            if (!paytmReady || !window.Paytm?.CheckoutJS) {
                alert("Paytm SDK not ready. Please try again.");
                setLoading(false);
                return;
            }

            const config = {
                root: "",
                flow: "DEFAULT",
                data: { orderId, token: txnToken, tokenType: "TXN_TOKEN", amount },
                handler: {
                    notifyMerchant: (event, data) => console.log("⚡ Paytm Event:", event, data),
                },
            };

            await window.Paytm.CheckoutJS.init(config);
            window.Paytm.CheckoutJS.invoke();

        } catch (err) {
            console.error("🔥 Booking error:", err);
            alert("Something went wrong. Please try again.");
        }

        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 py-8 px-4">
            <div className="bg-white shadow-2xl p-8 rounded-2xl w-full max-w-[600px] border border-blue-100">
                <h1 className="text-2xl font-semibold text-center mb-6 text-blue-700">
                    Book Doctor Appointment
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <input
                        name="name"
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                        disabled={!paytmReady}
                        className={`w-full p-3 border rounded-md outline-none ${paytmReady
                                ? "focus:ring-2 focus:ring-blue-400"
                                : "bg-gray-100 cursor-not-allowed opacity-70"
                            }`}
                    />
                    <input
                        name="phone"
                        onChange={handleChange}
                        placeholder="Phone Number"
                        required
                        disabled={!paytmReady}
                        className={`w-full p-3 border rounded-md outline-none ${paytmReady
                                ? "focus:ring-2 focus:ring-blue-400"
                                : "bg-gray-100 cursor-not-allowed opacity-70"
                            }`}
                    />

                    {/* Doctor Selection */}
                    <div>
                        <h3 className="font-medium mb-2 text-gray-700">Choose Doctor</h3>
                        <div className="flex items-center justify-around">
                            {[
                                {
                                    name: "Dr. B.K. Sharma",
                                    value: "Dr. B.K. Sharma",
                                    desc: "MBBS, MD (Skin & VD)",
                                },
                                {
                                    name: "Dr. Neha Rani",
                                    value: "Dr. Neha Rani",
                                    desc: "MBBS, Aesthetic Physician",
                                },
                            ].map((doc) => (
                                <label
                                    key={doc.value}
                                    className={`flex flex-col items-center gap-2 p-3 rounded-lg border cursor-pointer w-1/2 mx-1 transition-all ${form.doctor === doc.value
                                            ? "border-blue-500 bg-blue-50 shadow"
                                            : "border-gray-200 hover:bg-gray-50"
                                        } ${!paytmReady ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="doctor"
                                        value={doc.value}
                                        checked={form.doctor === doc.value}
                                        onChange={handleChange}
                                        disabled={!paytmReady}
                                        className="hidden"
                                    />
                                    <span className="text-blue-700 font-semibold">{doc.name}</span>
                                    <span className="text-xs text-gray-500">({doc.desc})</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Date Selection */}
                    <div>
                        <h3 className="font-medium mb-2 text-gray-700">Select Date</h3>
                        <div className="relative flex items-center">
                            <button
                                type="button"
                                disabled={!paytmReady}
                                onClick={() =>
                                    document
                                        .getElementById("dateScroll")
                                        .scrollBy({ left: -200, behavior: "smooth" })
                                }
                                className={`absolute left-0 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-100 ${!paytmReady ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                ◀
                            </button>

                            <div
                                id="dateScroll"
                                className={`flex overflow-x-auto gap-3 px-10 py-2 scroll-smooth scrollbar-hide ${!paytmReady ? "opacity-50 pointer-events-none" : ""
                                    }`}
                            >
                                {dates.map((d) => (
                                    <button
                                        key={d.value}
                                        type="button"
                                        onClick={() => {
                                            setSelectedDate(d.value);
                                            setForm((prev) => ({ ...prev, date: d.value }));
                                        }}
                                        disabled={!paytmReady}
                                        className={`min-w-[110px] p-3 rounded-lg text-center border flex-shrink-0 transition-all ${selectedDate === d.value
                                                ? "border-blue-500 bg-blue-50 text-blue-700 shadow"
                                                : "border-gray-200 hover:bg-gray-50"
                                            } ${!paytmReady ? "cursor-not-allowed" : ""}`}
                                    >
                                        {d.label}
                                    </button>
                                ))}
                            </div>

                            <button
                                type="button"
                                disabled={!paytmReady}
                                onClick={() =>
                                    document
                                        .getElementById("dateScroll")
                                        .scrollBy({ left: 200, behavior: "smooth" })
                                }
                                className={`absolute right-0 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-100 ${!paytmReady ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                ▶
                            </button>
                        </div>
                    </div>

                    {/* Time Selection */}
                    <div>
                        <h3 className="font-medium mb-2 text-gray-700">Select Time</h3>
                        <div className="relative flex items-center">
                            <button
                                type="button"
                                disabled={!paytmReady}
                                onClick={() =>
                                    document
                                        .getElementById("timeScroll")
                                        .scrollBy({ left: -150, behavior: "smooth" })
                                }
                                className={`absolute left-0 z-10 p-1.5 bg-white rounded-full shadow hover:bg-gray-100 ${!paytmReady ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                ◀
                            </button>

                            <div
                                id="timeScroll"
                                className={`flex overflow-x-auto gap-2 px-8 py-2 scroll-smooth no-scrollbar ${!paytmReady ? "opacity-50 pointer-events-none" : ""
                                    }`}
                            >
                                {times.map((t) => (
                                    <button
                                        key={t}
                                        type="button"
                                        onClick={() => {
                                            setSelectedTime(t);
                                            setForm((prev) => ({ ...prev, time: t }));
                                        }}
                                        disabled={!paytmReady}
                                        className={`px-4 py-2 rounded-full text-sm border flex-shrink-0 transition-all ${selectedTime === t
                                                ? "border-blue-500 bg-blue-50 text-blue-700 shadow"
                                                : "border-gray-200 hover:bg-gray-50"
                                            } ${!paytmReady ? "cursor-not-allowed" : ""}`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>

                            <button
                                type="button"
                                disabled={!paytmReady}
                                onClick={() =>
                                    document
                                        .getElementById("timeScroll")
                                        .scrollBy({ left: 150, behavior: "smooth" })
                                }
                                className={`absolute right-0 z-10 p-1.5 bg-white rounded-full shadow hover:bg-gray-100 ${!paytmReady ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                ▶
                            </button>
                        </div>
                    </div>

                    {/* Notes */}
                    <textarea
                        name="notes"
                        onChange={handleChange}
                        placeholder="Notes (optional)"
                        disabled={!paytmReady}
                        className={`w-full p-3 border rounded-md outline-none ${paytmReady
                                ? "focus:ring-2 focus:ring-blue-400"
                                : "bg-gray-100 cursor-not-allowed opacity-70"
                            }`}
                    ></textarea>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading || !paytmReady}
                        className={`w-full py-3 rounded-md text-white font-semibold transition ${paytmReady
                                ? "bg-blue-600 hover:bg-blue-700"
                                : "bg-gray-400 cursor-not-allowed"
                            }`}
                    >
                        {loading ? "Processing..." : "Book & Pay ₹100"}
                    </button>

                    {!paytmReady && (
                        <p className="text-sm text-red-500 text-center mt-3 font-medium">
                            ⚠️ Paytm SDK not loaded. Please wait...
                        </p>
                    )}
                </form>
            </div>
        </div>

    );
}
