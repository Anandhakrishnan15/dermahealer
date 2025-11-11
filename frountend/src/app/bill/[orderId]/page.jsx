"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BillPage() {
    const { orderId } = useParams();
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        async function fetchBooking() {
            const res = await fetch(`/api/bookings/${orderId}`);
            const data = await res.json();
            setBooking(data);
        }
        fetchBooking();
    }, [orderId]);

    if (!booking) return <p className="text-center p-10">Loading bill...</p>;

    const { paymentInfo } = booking;

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50">
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-semibold text-green-600 mb-4 text-center">
                    Payment Receipt
                </h1>

                <div className="space-y-2 text-gray-700">
                    <p><strong>Name:</strong> {booking.name}</p>
                    <p><strong>Doctor:</strong> {booking.doctor}</p>
                    <p><strong>Date:</strong> {booking.date} at {booking.time}</p>
                    <p><strong>Order ID:</strong> {booking.orderId}</p>
                    <p><strong>Txn ID:</strong> {paymentInfo.txnId}</p>
                    <p><strong>Bank:</strong> {paymentInfo.bankName}</p>
                    <p><strong>Amount:</strong> ₹{paymentInfo.txnAmount}</p>
                    <p><strong>Status:</strong> ✅ Paid</p>
                    <p><strong>Txn Date:</strong> {paymentInfo.txnDate}</p>
                </div>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => window.print()}
                        className="bg-green-600 text-white px-4 py-2 rounded-md"
                    >
                        Download / Print Bill
                    </button>
                </div>
            </div>
        </div>
    );
}
