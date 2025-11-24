"use client";

import { useState, useEffect, useRef } from "react";
import { z } from "zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ---------------- ZOD SCHEMA (used only on submit) ---------------- */
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

/* ---------------- Component ---------------- */
export default function BookAppointment() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    doctor: "",
    date: "",
    time: "",
    notes: "",
    terms: false, // NEW
  });

  const [errors, setErrors] = useState({}); // populated only on submit validation
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const [loading, setLoading] = useState(false);
  const [sdkLoading, setSdkLoading] = useState(true); // SDK background loader
  const [paytmReady, setPaytmReady] = useState(false);

  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const availabilityCache = useRef({});
  const [availability, setAvailability] = useState({});

  /* ---------------- Load Paytm SDK in background ---------------- */
  useEffect(() => {
    const mid = process.env.NEXT_PUBLIC_PAYTM_MID;
    if (!mid) {
      toast.error("Paytm MID not set (NEXT_PUBLIC_PAYTM_MID).");
      setSdkLoading(false);
      setPaytmReady(false);
      return;
    }

    const sdkUrl = `https://securestage.paytmpayments.com/merchantpgpui/checkoutjs/merchants/${mid}.js`;
    // avoid duplicate script
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
      // toast.success("Payment SDK loaded");
    };

    script.onerror = () => {
      setPaytmReady(false);
      setSdkLoading(false);
      toast.error("Failed to load payment SDK. Please refresh.");
    };

    document.body.appendChild(script);

    // keep script (do not remove) to preserve SDK if user navigates back
    return () => { };
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

  const times = ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM"];

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

  const getSlotColor = (slotsLeft) => {
    if (slotsLeft === 0) return "bg-red-100 text-red-700 border-red-200";
    if (slotsLeft <= 3) return "bg-amber-50 text-amber-700 border-amber-200";
    return "bg-emerald-50 text-emerald-700 border-emerald-200";
  };

  /* ---------------- Submit handler — Zod validation runs ONLY here ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // combine form with selected date/time (in case they were chosen via buttons)
    const submitForm = { ...form, date: selectedDate || form.date, time: selectedTime || form.time };

    // validate with Zod now (only on submit)
    const result = FormSchema.safeParse(submitForm);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      // show toasts for the errors (first message per field)
      const shown = new Set();
      Object.values(fieldErrors).forEach((arr) => {
        if (Array.isArray(arr) && arr[0] && !shown.has(arr[0])) {
          toast.error(arr[0]);
          shown.add(arr[0]);
        }
      });
      return;
    }

    // final checks (SDK)
    if (!paytmReady) {
      toast.error("Payment system not ready yet. Please wait.");
      return;
    }

    // require date/time selection explicitly
    if (!submitForm.date || !submitForm.time) {
      toast.error("Please select both date and time.");
      setErrors((p) => ({ ...p, date: submitForm.date ? undefined : ["Select a date"], time: submitForm.time ? undefined : ["Select a time"] }));
      return;
    }

    setLoading(true);

    try {
      // CREATE BOOKING
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitForm),
      });
      if (!res.ok) throw new Error("Booking failed");
      const bookingData = await res.json();
      if (!bookingData?.booking) throw new Error("Booking failed");

      // INITIATE PAYTM
      const paytmRes = await fetch("/api/paytm/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: bookingData.booking.orderId, amount: bookingData.booking.amount }),
      });
      if (!paytmRes.ok) throw new Error("Payment initiation failed");
      const paytmData = await paytmRes.json();
      const { txnToken, orderId, amount } = paytmData || {};

      if (!txnToken || !orderId) throw new Error("Payment data missing");

      if (!window.Paytm?.CheckoutJS) {
        toast.error("Payment SDK not available");
        setLoading(false);
        return;
      }

      const config = {
        root: "",
        flow: "DEFAULT",
        data: { orderId, token: txnToken, tokenType: "TXN_TOKEN", amount },
        handler: { notifyMerchant: (ev, d) => console.log(ev, d) },
      };

      await window.Paytm.CheckoutJS.init(config);
      window.Paytm.CheckoutJS.invoke();
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Something went wrong during booking");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <>
      {/* <ToastContainer position="top-right" autoClose={2500} /> */}

      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4">
        <div className="w-full max-w-3xl bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          {/* SDK loading banner */}
          {sdkLoading && (
            <div className="mb-4 px-4 py-2 text-sm text-yellow-800 bg-yellow-50 rounded-md text-center">
              Initializing secure payment... the form is disabled until the payment system loads.
            </div>
          )}

          <h1 className="text-2xl font-semibold text-gray-800 mb-4">Book Doctor Appointment</h1>

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
                onChange={handleChange}
                disabled={disabledAll}
                inputMode="numeric"
                className={`w-full mt-2 p-3 rounded-lg border focus:outline-none ${errors.phone ? "border-red-400 ring-1 ring-red-100" : "border-gray-200"
                  }`}
                placeholder="10 digit mobile number"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone[0]}</p>}
            </div>

            {/* Doctor */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Choose Doctor <span className="text-red-500">*</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                {[
                  { name: "Dr. B.K. Sharma", value: "Dr. B.K. Sharma", desc: "MBBS, MD (Skin & VD)" },
                  { name: "Dr. Neha Rani", value: "Dr. Neha Rani", desc: "MBBS, Aesthetic Physician" },
                ].map((doc) => {
                  const active = form.doctor === doc.value;
                  return (
                    <label
                      key={doc.value}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition ${active ? "border-blue-200 bg-blue-50 shadow-sm" : "border-gray-100 bg-white"
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
                      <div>
                        <div className="font-medium text-gray-800">{doc.name}</div>
                        <div className="text-xs text-gray-500">{doc.desc}</div>
                      </div>
                    </label>
                  );
                })}
              </div>
              {errors.doctor && <p className="text-red-500 text-xs mt-2">{errors.doctor[0]}</p>}
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Select Date <span className="text-red-500">*</span>
                </label>

                <div className="flex gap-2 overflow-x-auto mt-3 pb-2">
                  {dates.map((d) => {
                    const isSunday = d.day === 0;
                    const slotsLeft = availability[d.value];
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
                        disabled={
                          disabledAll ||
                          isSunday ||
                          isToday ||
                          isLoading ||
                          (slotsLeft === 0 && slotsLeft !== undefined)
                        }
                        className={`
    min-w-[120px] p-2 rounded-lg text-center border transition duration-200

    /* Selected */
    ${selected ? "bg-blue-100 border-blue-400 shadow-md" : ""}

    /* Sunday = Red */
    ${isSunday ? "bg-red-50 border-red-300 text-red-600" : ""}

    /* Today = Grey Disabled */
    ${isToday ? "bg-gray-100 border-gray-300 text-gray-500" : ""}

    /* No Slots = Red */
    ${!isSunday &&
                            !isToday &&
                            !isLoading &&
                            slotsLeft === 0
                            ? "bg-red-100 border-red-300 text-red-700"
                            : ""
                          }

    /* Available = White */
    ${!isSunday &&
                            !isToday &&
                            !isLoading &&
                            slotsLeft > 0 &&
                            !selected
                            ? "bg-white border-gray-200"
                            : ""
                          }

    /* Loading */
    ${isLoading ? "bg-gray-50 border-gray-200 text-gray-400" : ""}
  `}
                      >
                        <div className="text-sm font-medium">{d.label}</div>

                        <div className="text-xs mt-1">
                          {isSunday && "Closed (Sunday)"}
                          {isToday && "Today (Not allowed)"}
                          {isLoading && "Loading..."}
                          {!isSunday && !isToday && !isLoading && slotsLeft === undefined && "—"}
                          {!isSunday && !isToday && !isLoading && slotsLeft === 0 && "No slots"}
                          {!isSunday && !isToday && !isLoading && slotsLeft > 0 && `${slotsLeft} slots`}
                        </div>
                      </button>


                    );
                  })}
                </div>
                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date[0]}</p>}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Select Time <span className="text-red-500">*</span>
                </label>

                <div className="flex gap-2 flex-wrap mt-3">
                  {times.map((t) => {
                    const selected = selectedTime === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => {
                          setSelectedTime(t);
                          setForm((p) => ({ ...p, time: t }));
                          setErrors((prev) => ({ ...prev, time: undefined }));
                        }}
                        disabled={disabledAll}
                        className={`px-4 py-2 rounded-full border transition ${selected ? "bg-gray-100 border-gray-300" : "bg-white border-gray-100"
                          } ${disabledAll ? "opacity-60 cursor-not-allowed" : ""}`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
                {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time[0]}</p>}
              </div>
            </div>

            {/* Notes */}
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

              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the clinic’s booking terms & conditions and understand that appointment time may vary depending on doctor availability.
                <span className="text-red-500">*</span>
              </label>
            </div>

            {errors.terms && (
              <p className="text-red-500 text-xs mt-1">{errors.terms[0]}</p>
            )}

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={disabledAll || loading}
                className={`w-full py-3 rounded-lg text-white font-medium transition ${disabledAll || loading ? "bg-gray-300 cursor-not-allowed" : "bg-gray-800 hover:bg-black"
                  }`}
              >
                {sdkLoading ? "Initializing payment..." : loading ? "Processing..." : "Book & Pay ₹100"}
              </button>

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
