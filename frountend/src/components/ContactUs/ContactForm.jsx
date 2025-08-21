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
  const [status, setStatus] = useState(""); // "success" or "error"

  function validate() {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required.";
    if (!formData.email.trim()) errs.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Email is invalid.";
    if (!formData.phone.trim()) errs.phone = "Phone number is required.";
    else if (!/^[\d\s()+-]+$/.test(formData.phone))
      errs.phone = "Phone number is invalid.";
    if (!formData.enquiryType) errs.enquiryType = "Please select an enquiry type.";
    if (!formData.message.trim()) errs.message = "Please enter a message.";
    return errs;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      setStatus("");
      return;
    }
    setErrors({});
    setStatus("");

    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        enquiryType: "",
        message: "",
      });
    }, 1000);
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

      {/* Full Name */}
      <label htmlFor="name" className="block font-medium mb-1">
        Full Name <span className="text-red-600">*</span>
      </label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className={`w-full p-2 mb-2 border rounded ${errors.name ? "border-red-600" : "border-gray-300"
          }`}
        required
      />
      {errors.name && (
        <p className="text-red-600 text-sm mb-2">{errors.name}</p>
      )}

      {/* Email */}
      <label htmlFor="email" className="block font-medium mb-1">
        Email Address <span className="text-red-600">*</span>
      </label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className={`w-full p-2 mb-2 border rounded ${errors.email ? "border-red-600" : "border-gray-300"
          }`}
        required
      />
      {errors.email && (
        <p className="text-red-600 text-sm mb-2">{errors.email}</p>
      )}

      {/* Phone */}
      <label htmlFor="phone" className="block font-medium mb-1">
        Phone Number <span className="text-red-600">*</span>
      </label>
      <input
        type="tel"
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        className={`w-full p-2 mb-2 border rounded ${errors.phone ? "border-red-600" : "border-gray-300"
          }`}
        placeholder="+91 98765 43210"
        required
      />
      {errors.phone && (
        <p className="text-red-600 text-sm mb-2">{errors.phone}</p>
      )}

      {/* Enquiry Type */}
      <label htmlFor="enquiryType" className="block font-medium mb-1">
        What is the enquiry? <span className="text-red-600">*</span>
      </label>
      <select
        id="enquiryType"
        name="enquiryType"
        value={formData.enquiryType}
        onChange={handleChange}
        className={`w-full p-2 mb-2 border rounded ${errors.enquiryType ? "border-red-600" : "border-gray-300"
          }`}
        required
      >
        <option value="">-- Select an option --</option>
        <option value="booking">Booking</option>
        <option value="consultation">Consultation</option>
        <option value="treatment">Treatment</option>
        <option value="complaints">Complaints</option>
      </select>
      {errors.enquiryType && (
        <p className="text-red-600 text-sm mb-2">{errors.enquiryType}</p>
      )}

      {/* Message */}
      <label htmlFor="message" className="block font-medium mb-1">
        Message <span className="text-red-600">*</span>
      </label>
      <textarea
        id="message"
        name="message"
        rows="4"
        value={formData.message}
        onChange={handleChange}
        className={`w-full p-2 mb-2 border rounded resize-none ${errors.message ? "border-red-600" : "border-gray-300"
          }`}
        required
      ></textarea>
      {errors.message && (
        <p className="text-red-600 text-sm mb-2">{errors.message}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
      >
        Send Request
      </button>

      {/* Status Message */}
      {status === "success" && (
        <p className="mt-4 text-green-600 font-semibold text-center">
          ✅ Thank you! Your request has been submitted.
        </p>
      )}
      {status === "error" && (
        <p className="mt-4 text-red-600 font-semibold text-center">
          ❌ Oops! Something went wrong. Please try again later.
        </p>
      )}
    </form>
  );
}
