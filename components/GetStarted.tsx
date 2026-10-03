
"use client";

import React, { useState, useEffect } from "react";
import CTAButton from "./CTAButton";

interface GetStartedProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  company: string;
  contact: string;
  source: string;
  budget: string;
  note: string;
}

const INITIAL_FORM: FormData = {
  fullName: "",
  email: "",
  company: "",
  contact: "",
  source: "",
  budget: "",
  note: "",
};

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx2B_4RKJ9nF-6xr_VA8LPZBTDOoZJ7GiSDw6nreOdkDoRfMVwfRXxYIM4oZcQz6aXQ/exec";

const GetStarted = ({ isOpen, onClose }: GetStartedProps) => {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    let active = true;

    fetch("https://ipapi.co/json/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to detect country");
        }
        return response.json();
      })
      .then((data) => {
        if (!active) return;

        setFormData((prev) => ({
          ...prev,
          contact: prev.contact || data?.country_calling_code || "",
        }));
      })
      .catch(() => {
        // Leave the phone field editable if country detection fails.
      });

    return () => {
      active = false;
    };
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          formType: "GetStarted",
          data: formData,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `The server returned status ${response.status}.`
        );
      }

      const responseText = await response.text();

      console.log("Google Apps Script response:", responseText);

      // If your Apps Script returns JSON, check its success status.
      // Otherwise, inspect the response and script logs to confirm
      // whether the data was actually saved.
      try {
        const result = JSON.parse(responseText);

        if (result.success === false || result.error) {
          throw new Error(
            result.error || "The server could not process your request."
          );
        }
      } catch (error) {
        if (
          error instanceof Error &&
          error.message !== "Unexpected end of JSON input" &&
          !(error instanceof SyntaxError)
        ) {
          throw error;
        }
      }

      setSubmitted(true);
      setFormData(INITIAL_FORM);
    } catch (error) {
      console.error("Get Started submission error:", error);

      setErrorMessage(
        error instanceof Error &&
          error.message !== "Failed to fetch"
          ? error.message
          : "We couldn't connect to the submission service. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isSubmitting) return;

    setSubmitted(false);
    setErrorMessage("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-xl"
        onClick={handleClose}
      />

      {/* Form Container */}
      <div className="relative bg-background border border-neutral/10 text-neutral w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] p-6 md:p-16 shadow-2xl animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          disabled={isSubmitting}
          aria-label="Close form"
          className="absolute top-6 right-6 md:top-8 md:right-10 text-neutral/40 hover:text-primary transition-colors text-2xl disabled:opacity-40"
        >
          ✕
        </button>

        {/* Heading */}
        <div className="mb-10 pr-8">
          <span className="uppercase tracking-[0.2em] text-xs font-bold text-primary mb-4 block">
            Onboarding
          </span>

          <h2 className="text-[32px] md:text-[48px] font-bold leading-tight">
            In need of <span className="text-primary">creative?</span>
          </h2>

          <p className="text-neutral/60 font-light mt-2">
            Tell us about your project and let’s build something
            unforgettable.
          </p>
        </div>

        {/* Success State */}
        {submitted ? (
          <div
            className="py-16 text-center space-y-4"
            role="status"
            aria-live="polite"
          >
            <div className="text-6xl mb-6">✅</div>

            <h3 className="text-2xl font-bold">
              Message Sent!
            </h3>

            <p className="text-neutral/60 font-light">
              Thank you for reaching out. We’ll get back to you
              as soon as possible.
            </p>

            <div className="pt-6">
              <CTAButton
                text="Close"
                type="button"
                onClick={handleClose}
              />
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
              <InputField
                label="Full Name *"
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                required
                autoComplete="name"
              />

              <InputField
                label="Email *"
                name="email"
                type="email"
                placeholder="john@company.com"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />

              <InputField
                label="Phone Number *"
                name="contact"
                type="tel"
                placeholder="+234 800 000 0000"
                value={formData.contact}
                onChange={handleChange}
                required
                autoComplete="tel"
              />

              <InputField
                label="Company Name"
                name="company"
                placeholder="Your company"
                value={formData.company}
                onChange={handleChange}
                autoComplete="organization"
              />

              <SelectField
                label="How did you find us? *"
                name="source"
                options={[
                  "Social Media",
                  "Referral",
                  "Ads",
                  "Google Search",
                  "Other",
                ]}
                value={formData.source}
                onChange={handleChange}
                required
              />

              <SelectField
                label="Project Budget"
                name="budget"
                options={[
                  "Under $1,000",
                  "$1,000 – $5,000",
                  "$5,000 – $10,000",
                  "Above $10,000",
                ]}
                value={formData.budget}
                onChange={handleChange}
              />
            </div>

            {/* Additional Note */}
            <div className="flex flex-col gap-3">
              <label
                htmlFor="note"
                className="text-sm font-bold uppercase tracking-wider text-neutral/50"
              >
                Additional Note *
              </label>

              <textarea
                id="note"
                name="note"
                placeholder="Briefly describe your goals..."
                className="w-full p-5 rounded-2xl border border-neutral/10 bg-neutral/5 min-h-[150px] focus:border-primary/50 focus:bg-primary/5 outline-none transition-all placeholder:text-neutral/30"
                value={formData.note}
                onChange={handleChange}
                required
                minLength={5}
                maxLength={5000}
              />
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div
                role="alert"
                className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-500"
              >
                <p className="font-semibold">
                  Submission unsuccessful
                </p>
                <p className="mt-1 break-words">
                  {errorMessage}
                </p>
                <p className="mt-2 text-xs">
                  Your message may not have been received.
                  Please check before submitting again.
                </p>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4 flex justify-end">
              <CTAButton
                text={
                  isSubmitting
                    ? "Sending..."
                    : "Send Message"
                }
                type="submit"
                disabled={isSubmitting}
              />
            </div>

            <p className="text-xs text-neutral/40 text-right">
              * Required fields
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  required?: boolean;
  autoComplete?: string;
}

const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  autoComplete,
}: InputFieldProps) => (
  <div className="flex flex-col gap-3">
    <label
      htmlFor={name}
      className="text-sm font-bold uppercase tracking-wider text-neutral/50"
    >
      {label}
    </label>

    <input
      id={name}
      type={type}
      name={name}
      placeholder={placeholder}
      className="w-full px-5 py-4 rounded-xl border border-neutral/10 bg-neutral/5 focus:border-primary/50 focus:bg-primary/5 outline-none transition-all placeholder:text-neutral/30"
      value={value}
      onChange={onChange}
      required={required}
      autoComplete={autoComplete}
    />
  </div>
);

interface SelectFieldProps {
  label: string;
  name: string;
  options: string[];
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  required?: boolean;
}

const SelectField = ({
  label,
  name,
  options,
  value,
  onChange,
  required = false,
}: SelectFieldProps) => (
  <div className="flex flex-col gap-3">
    <label
      htmlFor={name}
      className="text-sm font-bold uppercase tracking-wider text-neutral/50"
    >
      {label}
    </label>

    <div className="relative">
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-5 py-4 rounded-xl border border-neutral/10 bg-neutral/5 focus:border-primary/50 focus:bg-primary/5 outline-none appearance-none cursor-pointer transition-all"
        required={required}
      >
        <option value="" disabled>
          Select option...
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option.toLowerCase()}
            className="bg-background text-neutral"
          >
            {option}
          </option>
        ))}
      </select>

      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral/30 text-xs">
        ▼
      </div>
    </div>
  </div>
);

export default GetStarted;