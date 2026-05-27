"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import FormField from "@/components/rsvp/FormField";
import { useRSVPSubmit } from "@/hooks/useRSVPSubmit";
import type { AttendanceStatus, FormErrors, RSVPFormData } from "@/types/guestbook";
import type { GuestbookEntry } from "@/types/guestbook";

interface RSVPFormProps {
  guestName: string;
  addOptimisticEntry: (entry: GuestbookEntry) => void;
  confirmEntry: (tempId: string, realEntry: GuestbookEntry) => void;
  removeEntry: (tempId: string) => void;
}

const inputBase =
  "w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/40 rounded-xl font-body text-body-md text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400/60 transition-all duration-200";

const inputError = "border-red-300/60 focus:ring-red-300/50 focus:border-red-300";

export default function RSVPForm({
  guestName,
  addOptimisticEntry,
  confirmEntry,
  removeEntry,
}: RSVPFormProps) {
  const [formData, setFormData] = useState<RSVPFormData>(() => ({
    name: guestName,
    attendance: "",
    message: "",
  }));
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { submitRSVP, submitState, isSubmitting } = useRSVPSubmit({
    addOptimisticEntry,
    confirmEntry,
    removeEntry,
  });

  const buttonLabel = useMemo(() => {
    if (submitState === "loading") return "Mengirim...";
    if (submitState === "success") return "Terkirim!";
    if (submitState === "error") return "Gagal, Coba Lagi";
    return "Kirim Ucapan";
  }, [submitState]);

  const validate = () => {
    const nextErrors: FormErrors = {};
    if (!formData.name.trim()) {
      nextErrors.name = "Nama tidak boleh kosong.";
    }
    if (!formData.attendance) {
      nextErrors.attendance = "Pilih status kehadiran Anda.";
    }
    if (!formData.message.trim()) {
      nextErrors.message = "Tulis ucapan atau doa singkat.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    if (!validate()) return;

    const snapshot = { ...formData };
    if (!formData.attendance) return;
    const attendance = formData.attendance as AttendanceStatus;

    try {
      await submitRSVP({
        guest_name: formData.name.trim(),
        attendance,
        message: formData.message.trim(),
      });

      setFormData({
        name: guestName,
        attendance: "",
        message: "",
      });
      setErrors({});
    } catch {
      setFormData(snapshot);
      setSubmitError("Gagal mengirim ucapan. Silakan coba lagi.");
    }
  };

  return (
    <section className="pt-12 pb-16" id="rsvp">
      <div className="max-w-md mx-auto px-4 sm:px-6">
        <h2 className="font-display text-display-lg italic text-slate-700 text-center mb-6">
          RSVP & Ucapan
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <FormField id="guest-name" label="Nama" error={errors.name}>
            <input
              id="guest-name"
              className={`${inputBase} ${errors.name ? inputError : ""}`}
              placeholder="Nama lengkap"
              value={formData.name}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  name: event.target.value,
                }))
              }
              aria-describedby={errors.name ? "guest-name-error" : undefined}
            />
          </FormField>

          <FormField
            id="attendance"
            label="Kehadiran"
            error={errors.attendance}
          >
            <select
              id="attendance"
              className={`${inputBase} ${errors.attendance ? inputError : ""}`}
              value={formData.attendance}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  attendance: event.target.value as RSVPFormData["attendance"],
                }))
              }
              aria-describedby={errors.attendance ? "attendance-error" : undefined}
            >
              <option value="">Pilih kehadiran</option>
              <option value="Hadir">Hadir</option>
              <option value="Tidak Hadir">Tidak Hadir</option>
              <option value="Ragu">Ragu-ragu</option>
            </select>
          </FormField>

          <FormField id="message" label="Ucapan & Doa" error={errors.message}>
            <textarea
              id="message"
              className={`${inputBase} min-h-[120px] resize-none ${
                errors.message ? inputError : ""
              }`}
              placeholder="Tulis ucapan singkat..."
              value={formData.message}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  message: event.target.value,
                }))
              }
              aria-describedby={errors.message ? "message-error" : undefined}
            />
          </FormField>

          {submitError && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-body-sm text-red-500">
              {submitError}
            </div>
          )}

          <motion.button
            type="submit"
            className={`w-full h-12 rounded-xl text-white font-medium transition-colors ${
              submitState === "success"
                ? "bg-green-500"
                : submitState === "error"
                  ? "bg-red-400"
                  : "bg-gold-400 hover:bg-gold-300"
            } ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
            whileTap={{ scale: 0.97 }}
            disabled={isSubmitting}
          >
            {buttonLabel}
          </motion.button>
        </form>
      </div>
    </section>
  );
}
