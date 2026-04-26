"use client";

import { useState, useEffect, useRef } from "react";
import { z } from "zod";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ---------------- ZOD SCHEMA ---------------- */
const FormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().regex(/^[0-9]{10}$/, "Phone must be 10 digits"),
  doctor: z.string().min(1, "Please select a doctor"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  notes: z.string().optional(),
  terms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms to continue"
  }),
});

export default function BookAppointmentForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    doctor: "",
    date: "",
    time: "",
    notes: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sdkLoading, setSdkLoading] = useState(true);
  const [paytmReady, setPaytmReady] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const availabilityCache = useRef({});
  const [availability, setAvailability] = useState({});
  const [loadingAvailability, setLoadingAvailability] = useState(false);

  /* ---------------- Load Paytm SDK (MID from server) ---------------- */
  useEffect(() => {
    async function loadSDK() {
      try {
        const res = await fetch("/api/paytm/config");
        const data = await res.json();

        if (!data.mid) {
          toast.error("Paytm MID not configured.");
          setSdkLoading(false);
          return;
        }

        const sdkUrl = `https://securestage.paytmpayments.com/merchantpgpui/checkoutjs/merchants/${data.mid}.js`;

        if (document.querySelector(`script[src="${sdkUrl}"]`)) {
          setPaytmReady(Boolean(window.Paytm?.CheckoutJS));
          setSdkLoading(false);
          return;
        }

        const script = document.createElement("script");
        script.src = sdkUrl;
        script.async = true;
        script.crossOrigin = "anonymous";

        script.onload = () => {
          setPaytmReady(Boolean(window.Paytm?.CheckoutJS));
          setSdkLoading(false);
        };

        script.onerror = () => {
          toast.error("Failed to load Paytm SDK");
          setSdkLoading(false);
        };

        document.body.appendChild(script);
      } catch (err) {
        toast.error("Payment initialization failed");
        setSdkLoading(false);
      }
    }

    loadSDK();
  }, []);

  /* ---------------- Generate next 7 days (disable Sundays) ---------------- */
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      value: d.toISOString().split("T")[0],
      label: d.toDateString().slice(0, 10),
      day: d.getDay(), // 0 = Sunday
    };
  });

  const times = ["08:30-09:30", "10:30-11:30", "11:30-12:30", "12:30-01:30"];

  const disabledAll = sdkLoading || loading; // lock the entire form while SDK loads or submitting

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    // clear previous submit-time errors for that field as user edits
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  /* ---------------- Load availability (debounced) ---------------- */
  useEffect(() => {
    if (!form.doctor) return;
    const t = setTimeout(loadAvailability, 450);
    return () => clearTimeout(t);
  }, [form.doctor]);

  async function loadAvailability() {
    const doctor = form.doctor;
    if (!doctor) return;

    if (availabilityCache.current[doctor]) {
      setAvailability(availabilityCache.current[doctor]);
      return;
    }

    setLoadingAvailability(true);
    try {
      const res = await fetch("/api/check-availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ doctor, dates: dates.map((d) => d.value) }),
      });

      if (!res.ok) throw new Error("Availability API failed");
      const data = await res.json();

      availabilityCache.current[doctor] = data.availability || {};
      setAvailability(data.availability || {});
    } catch (err) {
      console.error(err);
      toast.error("Unable to load availability");
    } finally {
      setLoadingAvailability(false);
    }
  }

  /* ---------------- Submit handler — Zod validation runs ONLY here ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Prevent double click / duplicate booking
    if (loading) return;

    const submitForm = {
      ...form,
      date: selectedDate || form.date,
      time: selectedTime || form.time,
    };

    // ✅ Validate
    const result = FormSchema.safeParse(submitForm);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);

      const shown = new Set();
      Object.values(fieldErrors).forEach((arr) => {
        if (Array.isArray(arr) && arr[0] && !shown.has(arr[0])) {
          toast.error(arr[0]);
          shown.add(arr[0]);
        }
      });
      return;
    }

    // ✅ SDK check
    if (!paytmReady) {
      toast.error("Payment system not ready yet. Please wait.");
      return;
    }

    // ✅ Date/time check
    if (!submitForm.date || !submitForm.time) {
      toast.error("Please select both date and time.");
      setErrors((p) => ({
        ...p,
        date: submitForm.date ? undefined : ["Select a date"],
        time: submitForm.time ? undefined : ["Select a time"],
      }));
      return;
    }

    setLoading(true);

    try {
      // 🔹 STEP 1: Create booking
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitForm),
      });

      if (!res.ok) throw new Error("Booking failed");

      const bookingData = await res.json();
      const booking = bookingData?.booking;

      if (!booking) throw new Error("Booking failed");

      // 🔹 STEP 2: Initiate Paytm
      const paytmRes = await fetch("/api/paytm/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: booking.orderId,
          amount: booking.amount,
        }),
      });

      if (!paytmRes.ok) throw new Error("Payment initiation failed");

      const paytmData = await paytmRes.json();
      const { txnToken, orderId, amount } = paytmData;

      if (!txnToken || !orderId) {
        throw new Error("Payment data missing");
      }

      // 🔹 STEP 3: Check SDK
      if (!window.Paytm?.CheckoutJS) {
        throw new Error("Payment SDK not available");
      }

      const config = {
        root: "",
        flow: "DEFAULT",
        data: {
          orderId,
          token: txnToken,
          tokenType: "TXN_TOKEN",
          amount,
        },
        handler: {
          notifyMerchant: (eventName, data) => {
            // ✅ Only for logging (do NOT trust this)
            console.log("Paytm event:", eventName, data);
          },
        },
      };

      // 🔹 STEP 4: Open Paytm safely
      try {
        await window.Paytm.CheckoutJS.init(config);
        window.Paytm.CheckoutJS.invoke();
      } catch (sdkErr) {
        console.error("Paytm SDK error:", sdkErr);
        toast.error("Failed to open payment gateway. Try again.");
      }

    } catch (err) {
      console.error("Submit error:", err);
      toast.error(err?.message || "Something went wrong during booking");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <>
      {/* <ToastContainer position="top-right" autoClose={2500} /> */}
      {/* <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
           <span className="text-[80px] md:text-[120px] font-extrabold text-red-500/10 rotate-[-30deg] select-none">
             TESTING
           </span>
         </div> */}
      <div className="min-h-screen flex items-center justify-center bg-[var(--navbar-bg)] py-10 px-4">
        <div className="w-full max-w-3xl bg-[var(--bg)] rounded-2xl p-8 shadow-lg border border-gray-100">
          {/* SDK loading banner */}
          {sdkLoading && (
            <div className="mb-4 px-4 py-2 text-sm text-yellow-800 bg-yellow-50 rounded-md text-center">
              Initializing secure payment... the form is disabled until the payment system loads.
            </div>
          )}

          <h1 className="text-2xl font-semibold text-center text-[var(--text)] mb-4"> Book Appointment with Best Dermatologist in Siwan</h1>
          {/* Main Heading */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                disabled={disabledAll}
                className={`w-full mt-2 p-3 rounded-lg border focus:outline-none ${errors.name ? "border-red-400 ring-1 ring-red-100" : "border-gray-200"
                  }`}
                placeholder="Your full name"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name[0]}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                disabled={disabledAll}
                className={`w-full mt-2 p-3 rounded-lg border focus:outline-none ${errors.email ? "border-red-400 ring-1 ring-red-100" : "border-gray-200"
                  }`}
                placeholder="you@example.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={(e) => {
                  const value = e.target.value;
                  // Only allow numbers and max length of 10
                  if (/^\d*$/.test(value) && value.length <= 10) {
                    handleChange(e);
                  }
                }}
                disabled={disabledAll}
                inputMode="numeric"
                className={`w-full mt-2 p-3 rounded-lg border focus:outline-none ${errors.phone ? "border-red-400 ring-1 ring-red-100" : "border-gray-200"
                  }`}
                placeholder="10 digit mobile number"
                type="text" // Changed from "number" to allow better control
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone[0]}</p>
              )}
            </div>

            {/* Doctor Selection */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Choose Doctor <span className="text-red-500">*</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                {[
                  {
                    name: "Dr. B.K. Sharma",
                    value: "Dr. B.K. Sharma",
                    desc: "MBBS, MD (Skin & VD)",
                    fee: 600,
                  },
                  {
                    name: "Dr. Neha Rani",
                    value: "Dr. Neha Rani",
                    desc: "MBBS, Aesthetic Physician",
                    fee: 350,
                  },
                ].map((doc) => {
                  const active = form.doctor === doc.value;

                  return (
                    <label
                      key={doc.value}
                      className={`flex items-center justify-between gap-3 p-3 rounded-xl border transition ${active
                        ? "border-blue-400 bg-blue-50 shadow-sm ring-1 ring-blue-400"
                        : "border-gray-100 bg-white"
                        } ${disabledAll ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      <input
                        type="radio"
                        name="doctor"
                        value={doc.value}
                        checked={active}
                        onChange={handleChange}
                        disabled={disabledAll}
                        className="sr-only"
                      />

                      {/* Left Side Info */}
                      <div>
                        <div className="font-medium text-gray-800">{doc.name}</div>
                        <div className="text-xs text-gray-500">{doc.desc}</div>
                      </div>

                      {/* Right Side Fee */}
                      <div className="text-sm font-bold text-gray-700 text-right">
                        ₹{doc.fee}
                        <div className="text-[10px] font-normal text-gray-400 uppercase">
                          Pay at clinic
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
              {errors.doctor && <p className="text-red-500 text-xs mt-2">{errors.doctor[0]}</p>}
            </div>

            {/* Date & Time - ONLY SHOWS IF DOCTOR IS SELECTED */}
            {form.doctor && (
              <div className="mt-6 space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
                <hr className="border-gray-100" />

                {/* Date Selection */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700">
                    Select Date <span className="text-red-500">*</span>
                  </label>

                  <div className="flex gap-2 overflow-x-auto mt-3 pb-2 scrollbar-hide">
                    {dates.map((d) => {
                      const isSunday = d.day === 0;
                      const slotsLeft = availability[d.value]?.totalRemaining;
                      const isLoading = loadingAvailability || slotsLeft === undefined;
                      const selected = selectedDate === d.value;
                      const isToday = d.value === new Date().toISOString().split("T")[0];

                      return (
                        <button
                          key={d.value}
                          type="button"
                          onClick={() => {
                            if (isSunday || isToday || isLoading || slotsLeft === 0) return;
                            setSelectedDate(d.value);
                            setForm((p) => ({ ...p, date: d.value }));
                            setErrors((prev) => ({ ...prev, date: undefined }));
                          }}
                          disabled={disabledAll || isSunday || isToday || isLoading || (slotsLeft === 0 && slotsLeft !== undefined)}
                          className={`min-w-[110px] p-3 rounded-xl text-center border transition-all duration-200 
                ${selected ? "bg-blue-600 border-blue-600 text-white shadow-md scale-105" : "bg-white border-gray-200 text-gray-600"}
                ${isSunday ? "opacity-50 bg-red-50 border-red-100" : ""}
                ${isToday ? "opacity-50 bg-gray-50 border-gray-100" : ""}
              `}
                        >
                          <div className={`text-sm font-bold ${selected ? "text-white" : "text-gray-800"}`}>{d.label}</div>
                          <div className={`text-[10px] mt-1 ${selected ? "text-blue-100" : "text-gray-400"}`}>
                            {isSunday ? "Closed" : isToday ? "Not allowed" : isLoading ? "Loading..." : `${slotsLeft ?? 0} slots`}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date[0]}</p>}
                </div>

                {/* Time Selection */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700">
                    Select Time <span className="text-red-500">*</span>
                  </label>

                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 mt-3">
                    {times.map((t) => {

                      const timingData = availability[selectedDate]?.timings?.[t];

                      const isFull = timingData && !timingData.available;

                      const selected = selectedTime === t;

                      return (
                        <button
                          key={t}
                          type="button"
                          onClick={() => {
                            if (isFull) return;

                            setSelectedTime(t);
                            setForm((p) => ({ ...p, time: t }));
                            setErrors((prev) => ({ ...prev, time: undefined }));
                          }}
                          disabled={disabledAll || !selectedDate || isFull}
                          className={`px-3 py-2 rounded-lg border text-xs font-medium transition-all

            ${selected
                              ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                              : "bg-white border-gray-200 text-gray-600 hover:border-blue-300"
                            }

            ${isFull
                              ? "opacity-50 cursor-not-allowed bg-gray-100"
                              : ""
                            }

          `}
                        >
                          {t}
                          {isFull && (
                            <div className="text-[10px] text-red-500">Full</div>
                          )}
                        </button>
                      );

                    })}
                  </div>

                  {errors.time && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.time[0]}
                    </p>
                  )}
                </div>

              </div>
            )}            {/* Notes */}
            <div>
              <label className="text-sm font-medium text-gray-700">Notes (optional)</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                disabled={disabledAll}
                rows={3}
                className="w-full mt-2 p-3 rounded-lg border border-gray-200 focus:outline-none"
                placeholder="Any info for the doctor..."
              />
            </div>
            {/* Terms Checkbox */}
            <div className="flex items-start gap-3 mt-4">
              <input
                type="checkbox"
                id="terms"
                disabled={disabledAll}
                checked={form.terms || false}
                onChange={(e) =>
                  setForm((p) => ({ ...p, terms: e.target.checked }))
                }
                className="mt-1 w-4 h-4 rounded border-gray-300 text-gray-800 focus:ring-gray-500"
              />

              <div className="flex items-start gap-2">


                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the clinic’s{" "}
                  <a
                    href="/terms-and-conditions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-700 font-medium"
                  >
                    Terms & Conditions
                  </a>
                  ,{" "}
                  <a
                    href="/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-700 font-medium"
                  >
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a
                    href="/refund-and-cancellation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-700 font-medium"
                  >
                    Refund & Cancellation Policy
                  </a>
                  . I understand that appointment time may vary depending on doctor availability.
                  <span className="text-red-500"> *</span>
                </label>
              </div>


            </div>

            {errors.terms && (
              <p className="text-red-500 text-xs mt-1">{errors.terms[0]}</p>
            )}

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={disabledAll || loading}
                className={`w-full py-3 rounded-lg text-white font-medium transition ${disabledAll || loading ? "bg-gray-300 cursor-not-allowed" : "bg-gray-800 hover:bg-[var(--primary-color)]"
                  }`}
              >
                {sdkLoading ? "Initializing payment..." : loading ? "Processing..." : "Confirm Booking & Pay ₹50"}

              </button>
              {/* Small Note */}
              <p className="text-xs text-gray-500 text-center mt-2">
                * ₹50 is charged only as an online booking fee. Doctor consultation fees are payable separately at the clinic.
              </p>

              {!paytmReady && !sdkLoading && (
                <p className="text-xs text-red-500 text-center mt-2">
                  ⚠️ Payment SDK failed to load. Please refresh the page.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
