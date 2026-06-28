"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ArrowLeft, Loader2, Calendar } from "lucide-react";

interface LeadData {
  clientName: string;
  companyName: string;
  budget: string;
  projectType: string;
  coreFeatures: string[];
  currentReadiness: string;
}

const BUDGET_OPTIONS = [
  "Select Budget",
  "Less than $52",
  "$52-$73",
  "$73-$100",
  "$100+"
];

const PROJECT_TYPES = [
  "Select Project Type",
  "E-commerce",
  "SaaS",
  "Custom API Integration",
  "MVP",
  "Other"
];

const CORE_FEATURES = [
  "User Authentication",
  "Payment Gateway",
  "Real-time Chat",
  "Admin Dashboard",
  "Third-party API Integration"
];

const READINESS_OPTIONS = [
  "Just an idea",
  "I have a detailed brief/wireframes",
  "Ready to start coding immediately"
];

const initialFormState: LeadData = {
  clientName: "",
  companyName: "",
  budget: "",
  projectType: "",
  coreFeatures: [],
  currentReadiness: ""
};

// API function to submit lead data to the backend via the Next.js proxy endpoint
const submitLeadData = async (formData: LeadData): Promise<{ success: boolean; leadId?: string; message?: string }> => {
  const payload = {
    clientName: formData.clientName,
    companyName: formData.companyName,
    budget: formData.budget,
    projectType: formData.projectType,
    coreFeatures: formData.coreFeatures,
    readiness: formData.currentReadiness
  };

  try {
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const contentType = response.headers.get("content-type") || "";
    let responseData: { message?: string; leadId?: string } = {};

    if (contentType.includes("application/json")) {
      responseData = await response.json();
    } else {
      responseData = { message: await response.text() };
    }

    if (!response.ok) {
      throw new Error(responseData.message || "Something went wrong. Please try again.");
    }

    return { success: true, leadId: responseData.leadId };
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Unable to reach the server. Please check your connection and try again.");
    }

    throw error;
  }
};

export function ContactForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || "";
  const [formData, setFormData] = useState<LeadData>(initialFormState);
  const timerRef = useRef<number | null>(null);

  const resetForm = () => {
    setFormData(initialFormState);
    setStep(1);
    setSuccess(false);
    setError(null);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (feature: string) => {
    setFormData((prev) => {
      const isSelected = prev.coreFeatures.includes(feature);
      const newFeatures = isSelected
        ? prev.coreFeatures.filter((f) => f !== feature)
        : [...prev.coreFeatures, feature];
      return { ...prev, coreFeatures: newFeatures };
    });
  };

  const handleRadioChange = (readiness: string) => {
    setFormData((prev) => ({ ...prev, currentReadiness: readiness }));
  };

  const isStep1Valid =
    formData.clientName.trim() !== "" &&
    formData.budget !== "" &&
    formData.budget !== "Select Budget";

  const isStep2Valid =
    formData.projectType !== "" &&
    formData.projectType !== "Select Project Type" &&
    formData.currentReadiness !== "";

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (isStep1Valid) {
      setError(null);
      setStep(2);
    }
  };

  const handleBack = () => {
    setError(null);
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStep2Valid) return;

    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    setIsSubmitting(true);
    setError(null);

    let keepWaiting = false;

    try {
      const result = await submitLeadData(formData);
      if (result.success) {
        setSuccess(true);
        keepWaiting = !bookingUrl;

        timerRef.current = window.setTimeout(() => {
          resetForm();
          if (bookingUrl) {
            window.location.href = bookingUrl;
          } else {
            setIsSubmitting(false);
          }
        }, 2000);
      }
    } catch (error: unknown) {
      console.error("Submission failed:", error);
      if (error instanceof Error) {
        setError(error.message || "Something went wrong. Please try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      if (!keepWaiting) {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="w-full max-w-xl bg-neutral-950/80 border border-neutral-900 backdrop-blur-md p-8 rounded-lg shadow-2xl relative overflow-hidden">
      
      {/* Top Header & Visual Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-baseline mb-3">
          <span className="font-syne font-bold text-xs uppercase tracking-[0.2em] text-muted">
            Let&apos;s Build Something
          </span>
          <span className="font-mono text-xs text-neutral-500">
            Step {step} of 2
          </span>
        </div>
        <div className="h-0.5 w-full bg-neutral-900 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-white rounded-full"
            initial={{ width: "50%" }}
            animate={{ width: step === 1 ? "50%" : "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.form
            key="step1"
            onSubmit={handleNext}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Client Name */}
            <div>
              <label htmlFor="clientName" className="block text-xs uppercase font-mono tracking-wider text-neutral-400 mb-2">
                Client Name <span className="text-white/60">*</span>
              </label>
              <input
                type="text"
                id="clientName"
                name="clientName"
                required
                value={formData.clientName}
                onChange={handleTextChange}
                placeholder="Enter your name"
                className="w-full bg-neutral-900/50 border border-neutral-800 focus:border-neutral-500 rounded px-4 py-3 text-sm text-white focus:outline-none transition-all placeholder:text-neutral-600"
              />
            </div>

            {/* Company Name */}
            <div>
              <label htmlFor="companyName" className="block text-xs uppercase font-mono tracking-wider text-neutral-400 mb-2">
                Company Name <span className="text-neutral-600">(Optional)</span>
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleTextChange}
                placeholder="Enter your company name"
                className="w-full bg-neutral-900/50 border border-neutral-800 focus:border-neutral-500 rounded px-4 py-3 text-sm text-white focus:outline-none transition-all placeholder:text-neutral-600"
              />
            </div>

            {/* Budget */}
            <div>
              <label htmlFor="budget" className="block text-xs uppercase font-mono tracking-wider text-neutral-400 mb-2">
                Project Budget <span className="text-white/60">*</span>
              </label>
              <select
                id="budget"
                name="budget"
                required
                value={formData.budget}
                onChange={handleTextChange}
                className="w-full bg-neutral-900/50 border border-neutral-800 focus:border-neutral-500 rounded px-4 py-3 text-sm text-white focus:outline-none transition-all cursor-pointer"
              >
                {BUDGET_OPTIONS.map((opt) => (
                  <option key={opt} value={opt === "Select Budget" ? "" : opt} className="bg-neutral-950 text-white">
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Button */}
            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={!isStep1Valid}
                className="group flex items-center gap-2 bg-white text-black font-syne font-bold px-6 py-4 uppercase text-xs tracking-wider hover:bg-neutral-200 transition-all rounded-sm disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.form
            key="step2"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Project Type */}
            <div>
              <label htmlFor="projectType" className="block text-xs uppercase font-mono tracking-wider text-neutral-400 mb-2">
                Project Type <span className="text-white/60">*</span>
              </label>
              <select
                id="projectType"
                name="projectType"
                required
                value={formData.projectType}
                onChange={handleTextChange}
                className="w-full bg-neutral-900/50 border border-neutral-800 focus:border-neutral-500 rounded px-4 py-3 text-sm text-white focus:outline-none transition-all cursor-pointer"
              >
                {PROJECT_TYPES.map((opt) => (
                  <option key={opt} value={opt === "Select Project Type" ? "" : opt} className="bg-neutral-950 text-white">
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Core Features */}
            <div>
              <span className="block text-xs uppercase font-mono tracking-wider text-neutral-400 mb-3">
                Core Features Required <span className="text-neutral-600">(Select Multiple)</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CORE_FEATURES.map((feature) => {
                  const isChecked = formData.coreFeatures.includes(feature);
                  return (
                    <button
                      key={feature}
                      type="button"
                      onClick={() => handleCheckboxChange(feature)}
                      className={`flex items-center gap-3 px-4 py-3 border text-left rounded text-xs transition-all ${
                        isChecked
                          ? "bg-white/10 border-white text-white"
                          : "bg-neutral-900/30 border-neutral-900 text-neutral-400 hover:border-neutral-800"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                        isChecked ? "border-white bg-white text-black" : "border-neutral-700"
                      }`}>
                        {isChecked && <Check size={10} strokeWidth={3} />}
                      </div>
                      <span>{feature}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Current Readiness */}
            <div>
              <span className="block text-xs uppercase font-mono tracking-wider text-neutral-400 mb-3">
                Current Readiness <span className="text-white/60">*</span>
              </span>
              <div className="space-y-2.5">
                {READINESS_OPTIONS.map((opt) => {
                  const isSelected = formData.currentReadiness === opt;
                  return (
                    <label
                      key={opt}
                      onClick={() => handleRadioChange(opt)}
                      className={`flex items-center gap-3 px-4 py-3 border rounded text-xs cursor-pointer transition-all ${
                        isSelected
                          ? "bg-white/10 border-white text-white"
                          : "bg-neutral-900/30 border-neutral-900 text-neutral-400 hover:border-neutral-800"
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                        isSelected ? "border-white" : "border-neutral-700"
                      }`}>
                        {isSelected && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white animate-scaleUp" />
                        )}
                      </div>
                      <span>{opt}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Error / Success Message */}
            {error && (
              <div className="p-4 bg-red-950/40 border border-red-900/60 rounded text-red-200 text-xs font-mono">
                {error}
              </div>
            )}
            {success && (
              <div className="p-4 bg-emerald-950/40 border border-emerald-900/60 rounded text-emerald-200 text-xs font-mono">
                Your request was submitted successfully. We will contact you soon.
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-4 flex justify-between gap-4">
              <button
                type="button"
                onClick={handleBack}
                disabled={isSubmitting}
                className="flex items-center gap-2 border border-neutral-800 hover:border-neutral-600 text-muted hover:text-white font-syne font-bold px-5 py-4 uppercase text-xs tracking-wider transition-all rounded-sm disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <ArrowLeft size={14} />
                <span>Back</span>
              </button>

              <button
                type="submit"
                disabled={!isStep2Valid || isSubmitting}
                className="group flex items-center gap-2 bg-white text-black font-syne font-bold px-6 py-4 uppercase text-xs tracking-wider hover:bg-neutral-200 transition-all rounded-sm disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Calendar size={14} />
                    <span>Submit & Book Call</span>
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
