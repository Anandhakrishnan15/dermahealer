"use client"
import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    contactMethod: "email",
    appointmentDate: "",
    message: "",
    consent: false,
    honeyPot: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(""); // "success" or "error"

  function validate() {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required.";
    if (!formData.email.trim()) errs.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Email is invalid.";
    if (formData.phone && !/^[\d\s()+-]+$/.test(formData.phone))
      errs.phone = "Phone number is invalid.";
    if (!formData.message.trim()) errs.message = "Please enter a message.";
    if (!formData.consent)
      errs.consent = "You must agree to the privacy policy.";
    // Honeypot check - should be empty
    if (formData.honeyPot) errs.honeyPot = "Spam detected.";
    return errs;
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
    // Fake async submission here - replace with actual API call
    setTimeout(() => {
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        contactMethod: "email",
        appointmentDate: "",
        message: "",
        consent: false,
        honeyPot: "",
      });
    }, 1000);
  }

  return (
    <form
      className=" text-[var(--text)] border border-[var(--border)] p-6 rounded shadow-md max-w-lg mx-auto"
    style={{ background: "var(--form-bg)" }}
      onSubmit={handleSubmit}
      noValidate
    >
          <h2 className="text-2xl font-semibold mb-6 text-center">Request an Appointment</h2>

      {/* Name */}
      <label htmlFor="name" className="block font-medium mb-1">
        Full Name <span className="text-red-600">*</span>
      </label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className={`w-full p-2 mb-2 border rounded ${
          errors.name ? "border-red-600" : "border-gray-300"
        }`}
        required
        aria-describedby="name-error"
      />
      {errors.name && (
        <p id="name-error" className="text-red-600 text-sm mb-2">
          {errors.name}
        </p>
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
        className={`w-full p-2 mb-2 border rounded ${
          errors.email ? "border-red-600" : "border-gray-300"
        }`}
        required
        aria-describedby="email-error"
      />
      {errors.email && (
        <p id="email-error" className="text-red-600 text-sm mb-2">
          {errors.email}
        </p>
      )}

      {/* Phone */}
      <label htmlFor="phone" className="block font-medium mb-1">
        Phone Number
      </label>
      <input
        type="tel"
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        className={`w-full p-2 mb-2 border rounded ${
          errors.phone ? "border-red-600" : "border-gray-300"
        }`}
        placeholder="+1 (555) 123-4567"
        aria-describedby="phone-error"
      />
      {errors.phone && (
        <p id="phone-error" className="text-red-600 text-sm mb-2">
          {errors.phone}
        </p>
      )}

      {/* Preferred Contact Method */}
      <fieldset className="mb-4">
        <legend className="font-medium mb-1">Preferred Contact Method</legend>
        <label className="inline-flex items-center mr-4">
          <input
            type="radio"
            name="contactMethod"
            value="email"
            checked={formData.contactMethod === "email"}
            onChange={handleChange}
            className="mr-1"
          />
          Email
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="contactMethod"
            value="phone"
            checked={formData.contactMethod === "phone"}
            onChange={handleChange}
            className="mr-1"
          />
          Phone
        </label>
      </fieldset>

      {/* Appointment Date */}
      <label htmlFor="appointmentDate" className="block font-medium mb-1">
        Preferred Appointment Date (optional)
      </label>
      <input
        type="date"
        id="appointmentDate"
        name="appointmentDate"
        value={formData.appointmentDate}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        min={new Date().toISOString().split("T")[0]} // no past dates
      />

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
        className={`w-full p-2 mb-2 border rounded resize-none ${
          errors.message ? "border-red-600" : "border-gray-300"
        }`}
        required
        aria-describedby="message-error"
      ></textarea>
      {errors.message && (
        <p id="message-error" className="text-red-600 text-sm mb-2">
          {errors.message}
        </p>
      )}

      {/* Consent */}
      <label className="inline-flex items-center mb-4">
        <input
          type="checkbox"
          name="consent"
          checked={formData.consent}
          onChange={handleChange}
          className="mr-2"
          required
          aria-describedby="consent-error"
        />
        <span>
          I agree to the{" "}
          <a href="/privacy-policy" target="_blank" className="text-blue-600 underline">
            privacy policy
          </a>
          . <span className="text-red-600">*</span>
        </span>
      </label>
      {errors.consent && (
        <p id="consent-error" className="text-red-600 text-sm mb-2">
          {errors.consent}
        </p>
      )}

      {/* Honeypot (hidden spam field) */}
      <input
        type="text"
        name="honeyPot"
        value={formData.honeyPot}
        onChange={handleChange}
        autoComplete="off"
        tabIndex="-1"
        style={{ display: "none" }}
      />
      {errors.honeyPot && (
        <p className="text-red-600 text-sm mb-2">{errors.honeyPot}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
        aria-live="polite"
      >
        Send Request
      </button>

      {/* Status Message */}
      {status === "success" && (
        <p className="mt-4 text-green-600 font-semibold text-center">
          Thank you! Your request has been submitted.
        </p>
      )}
      {status === "error" && (
        <p className="mt-4 text-red-600 font-semibold text-center">
          Oops! Something went wrong. Please try again later.
        </p>
      )}
    </form>
  );
}
