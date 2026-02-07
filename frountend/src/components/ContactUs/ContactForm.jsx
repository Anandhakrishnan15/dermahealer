"use client";
import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    enquiryType: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(""); // success | error | loading

  function validate() {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required.";
    if (!formData.email.trim()) errs.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errs.email = "Email is invalid.";
    if (!formData.phone.trim()) errs.phone = "Phone number is required.";
    else if (!/^[\d\s()+-]+$/.test(formData.phone))
      errs.phone = "Phone number is invalid.";
    if (!formData.enquiryType)
      errs.enquiryType = "Please select an enquiry type.";
    if (!formData.message.trim())
      errs.message = "Please enter a message.";
    return errs;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      setStatus("");
      return;
    }

    setErrors({});
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        enquiryType: "",
        message: "",
      });
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <form
      className="text-[var(--text)] border border-[var(--border)] p-6 rounded-xl shadow-lg w-full mx-auto"
      style={{ background: "var(--form-bg)" }}
      onSubmit={handleSubmit}
      noValidate
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-[var(--heading)]">
        Connect With Our Experts
      </h2>

      {/* Name */}
      <label className="block font-medium mb-1">
        Full Name <span className="text-red-600">*</span>
      </label>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        className={`w-full p-2 mb-2 border rounded ${errors.name ? "border-red-600" : "border-gray-300"
          }`}
      />
      {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}

      {/* Email */}
      <label className="block font-medium mb-1 mt-4">
        Email Address <span className="text-red-600">*</span>
      </label>
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        className={`w-full p-2 mb-2 border rounded ${errors.email ? "border-red-600" : "border-gray-300"
          }`}
      />
      {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}

      {/* Phone */}
      <label className="block font-medium mb-1 mt-4">
        Phone Number <span className="text-red-600">*</span>
      </label>
      <input
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        className={`w-full p-2 mb-2 border rounded ${errors.phone ? "border-red-600" : "border-gray-300"
          }`}
      />
      {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}

      {/* Enquiry */}
      <label className="block font-medium mb-1 mt-4">
        What is the enquiry? <span className="text-red-600">*</span>
      </label>
      <select
        name="enquiryType"
        value={formData.enquiryType}
        onChange={handleChange}
        className={`w-full p-2 mb-2 border rounded ${errors.enquiryType ? "border-red-600" : "border-gray-300"
          }`}
      >
        <option value="">-- Select an option --</option>
        <option value="booking">Booking</option>
        <option value="consultation">Consultation</option>
        <option value="treatment">Treatment</option>
        <option value="complaints">Complaints</option>
      </select>
      {errors.enquiryType && (
        <p className="text-red-600 text-sm">{errors.enquiryType}</p>
      )}

      {/* Message */}
      <label className="block font-medium mb-1 mt-4">
        Message <span className="text-red-600">*</span>
      </label>
      <textarea
        name="message"
        rows="4"
        value={formData.message}
        onChange={handleChange}
        className={`w-full p-2 mb-2 border rounded ${errors.message ? "border-red-600" : "border-gray-300"
          }`}
      />
      {errors.message && (
        <p className="text-red-600 text-sm">{errors.message}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded mt-4"
      >
        {status === "loading" ? "Sending..." : "Send Request"}
      </button>

      {status === "success" && (
        <p className="mt-4 text-green-600 text-center font-semibold">
          ✅ Message sent successfully!
        </p>
      )}
      {status === "error" && (
        <p className="mt-4 text-red-600 text-center font-semibold">
          ❌ Failed to send. Please try again.
        </p>
      )}
    </form>
  );
}
