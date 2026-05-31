"use client";

import { useEffect, useState } from "react";
import { RSVPSubmitError, useRSVPSubmit } from "@/hooks/useRSVPSubmit";
import { supabase } from "@/lib/supabase/client";
import type { AttendanceStatus, FormErrors, RSVPFormData } from "@/types/guestbook";
import type { GuestbookEntry } from "@/types/guestbook";
import { motion, useReducedMotion } from "framer-motion";
import {
  fadeUp,
  staggerContainer,
  labelFade,
  lineExpand,
  scaleIn,
  sectionViewport,
} from "@/lib/motionVariants";

interface RSVPFormProps {
  guestName: string;
  addOptimisticEntry: (entry: GuestbookEntry) => void;
  confirmEntry: (tempId: string, realEntry: GuestbookEntry) => void;
  removeEntry: (tempId: string) => void;
}

const FALLBACK_GUEST_NAME = "Tamu Undangan";

export default function RSVPForm({
  guestName,
  addOptimisticEntry,
  confirmEntry,
  removeEntry,
}: RSVPFormProps) {
  const prefersReducedMotion = useReducedMotion();
  const viewport = prefersReducedMotion ? { once: true, amount: 0.05 } : sectionViewport;
  const reducedVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.25 } } };

  const [formData, setFormData] = useState<RSVPFormData>(() => ({
    name: guestName,
    attendance: "",
    message: "",
  }));
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCheckingSubmission, setIsCheckingSubmission] = useState(
    () => guestName.trim() !== FALLBACK_GUEST_NAME
  );

  const { submitRSVP, submitState, isSubmitting } = useRSVPSubmit({
    addOptimisticEntry,
    confirmEntry,
    removeEntry,
  });

  const imgContainer = "/images/figma/d745edfa5a6618dd70dff20b2a6531d6e9e0306d.svg";

  useEffect(() => {
    const normalizedGuestName = guestName.trim();
    let isActive = true;

    const checkExistingSubmission = async () => {
      if (!normalizedGuestName || normalizedGuestName === FALLBACK_GUEST_NAME) {
        if (isActive) {
          setIsCheckingSubmission(false);
        }
        return;
      }

      setIsCheckingSubmission(true);

      const { data, error } = await supabase
        .from("guestbook")
        .select("id, guest_name, attendance, message, created_at")
        .eq("guest_name", normalizedGuestName)
        .limit(1)
        .maybeSingle();

      if (!isActive) {
        return;
      }

      if (error) {
        console.error("[RSVP] Failed to check existing submission", {
          error,
          guestName: normalizedGuestName,
        });
        setIsCheckingSubmission(false);
        return;
      }

      setHasSubmitted(Boolean(data));
      setIsCheckingSubmission(false);
    };

    void checkExistingSubmission();

    return () => {
      isActive = false;
    };
  }, [guestName]);

  const validate = () => {
    const nextErrors: FormErrors = {};
    if (!formData.name.trim()) {
      nextErrors.name = "Nama tidak boleh kosong.";
    }
    if (!formData.attendance) {
      nextErrors.attendance = "Pilih status kehadiran Anda.";
    }
    if (!formData.message.trim()) {
      nextErrors.message = "Ucapan & doa tidak boleh kosong.";
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

      setErrors({});
      setHasSubmitted(true);
    } catch (error) {
      setFormData(snapshot);
      if (error instanceof RSVPSubmitError) {
        const errorSuffix = error.code
          ? ` [${error.code}]`
          : typeof error.status === "number"
            ? ` [HTTP ${error.status}]`
            : "";

        setSubmitError(`${error.message}${errorSuffix}`);
        return;
      }

      setSubmitError("Gagal mengirim RSVP. Silakan coba lagi.");
    }
  };

  return (
    <section className="w-full flex flex-col gap-[40px] items-center pt-[31px]" id="rsvp">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={prefersReducedMotion ? reducedVariants : staggerContainer}
        className="w-full flex flex-col gap-[4.2px] items-center relative"
      >
        <motion.span
          variants={labelFade}
          className="font-body font-semibold text-[13px] text-center tracking-[1.56px] text-[#5f5f58] uppercase"
        >
          RSVP
        </motion.span>
        <motion.h2
          variants={fadeUp}
          className="font-display font-light italic text-[42px] text-center text-[#585e4d] leading-[42px] tracking-[-0.42px]"
        >
          Konfirmasi Kehadiran
        </motion.h2>
        <motion.div
          variants={lineExpand}
          className="flex gap-[12px] items-center justify-center pt-[11.8px] w-full"
        >
          <div className="bg-[rgba(201,168,76,0.3)] h-[0.5px] w-[48px]" />
          <div className="w-[11.397px] h-[11.397px] relative flex items-center justify-center">
            <img alt="" className="w-full h-full object-contain" src={imgContainer} />
          </div>
          <div className="bg-[rgba(201,168,76,0.3)] h-[0.5px] w-[48px]" />
        </motion.div>
        <motion.p
          variants={fadeUp}
          className="font-body italic text-[16px] text-center text-[rgba(95,95,88,0.7)] leading-[24px] pt-[11.8px] max-w-[320px]"
        >
          Kami sangat menantikan kehadiran Bapak/Ibu/Saudara/i
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={scaleIn}
        className="md:backdrop-blur-[6px] bg-[rgba(255,255,255,0.6)] border border-solid border-white flex flex-col items-center pb-[49px] pt-[32px] px-[33px] rounded-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] w-full transform-gpu"
        style={{ contain: "paint", isolation: "isolate" }}
      >
        {isCheckingSubmission ? (
          <div className="w-full flex flex-col items-center py-8 text-center">
            <div className="mb-4 h-10 w-10 rounded-full border border-[rgba(201,168,76,0.2)] border-t-[#c9a84c] animate-spin" />
            <h4 className="font-body font-semibold text-[16px] text-[#585e4d] mb-1">
              Checking your confirmation...
            </h4>
            <p className="font-body italic text-[13px] text-[rgba(95,95,88,0.7)]">
              Please wait while we prepare your RSVP status.
            </p>
          </div>
        ) : hasSubmitted || submitState === "success" ? (
          <div className="w-full flex flex-col items-center py-8 text-center">
            <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(201,168,76,0.25)] font-body text-[18px] text-[#c9a84c]">
              OK
            </span>
            <h4 className="font-body font-semibold text-[16px] text-[#585e4d] mb-1">
              Thank you for your confirmation.
            </h4>
            <p className="font-body italic text-[13px] text-[rgba(95,95,88,0.7)]">
              Your attendance and wishes have been saved.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-[23px] items-stretch">
            <div className="w-full flex flex-col gap-[8px] items-start">
              <label htmlFor="rsvp-name" className="font-body font-medium text-[11px] tracking-[1.32px] text-[#c9a84c]">
                NAMA LENGKAP
              </label>
              <input
                id="rsvp-name"
                type="text"
                required
                value={formData.name}
                onChange={(event) =>
                  setFormData((prev) => ({
                    ...prev,
                    name: event.target.value,
                  }))
                }
                placeholder="Masukkan nama Anda"
                className={`w-full bg-[rgba(255,255,255,0.6)] border border-solid rounded-[48px] px-[17px] py-[19px] font-body text-[13px] text-[#1a1d14] placeholder-[rgba(95,95,88,0.3)] focus:outline-none focus:border-[#c9a84c] transition-colors ${
                  errors.name ? "border-red-300" : "border-[rgba(201,168,76,0.1)]"
                }`}
                aria-describedby={errors.name ? "rsvp-name-error" : undefined}
              />
              {errors.name && (
                <p id="rsvp-name-error" className="font-body text-[11px] text-red-500">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="w-full flex flex-col gap-[8px] items-start relative">
              <span className="font-body font-medium text-[11px] tracking-[1.32px] text-[#c9a84c]">
                KEHADIRAN
              </span>
              <div className="w-full grid grid-cols-3 gap-2" role="group" aria-label="Status Kehadiran">
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      attendance: "Hadir",
                    }))
                  }
                  className={`py-[14px] rounded-[48px] text-[12px] font-body text-center transition-all duration-300 cursor-pointer border border-solid ${
                    formData.attendance === "Hadir"
                      ? "bg-[#585e4d] text-white border-transparent shadow-[0_4px_12px_rgba(88,94,77,0.2)] font-medium"
                      : "bg-[rgba(255,255,255,0.6)] text-[rgba(95,95,88,0.8)] border-[rgba(201,168,76,0.15)] hover:bg-white"
                  } ${errors.attendance ? "border-red-300" : ""}`}
                >
                  Hadir
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      attendance: "Tidak Hadir",
                    }))
                  }
                  className={`py-[14px] rounded-[48px] text-[12px] font-body text-center transition-all duration-300 cursor-pointer border border-solid ${
                    formData.attendance === "Tidak Hadir"
                      ? "bg-[#5f5f58]/20 text-[#5f5f58] border-transparent font-medium"
                      : "bg-[rgba(255,255,255,0.6)] text-[rgba(95,95,88,0.8)] border-[rgba(201,168,76,0.15)] hover:bg-white"
                  } ${errors.attendance ? "border-red-300" : ""}`}
                >
                  Tidak Hadir
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      attendance: "Ragu",
                    }))
                  }
                  className={`py-[14px] rounded-[48px] text-[12px] font-body text-center transition-all duration-300 cursor-pointer border border-solid ${
                    formData.attendance === "Ragu"
                      ? "bg-[rgba(212,175,55,0.2)] text-[#d4af37] border-transparent font-medium"
                      : "bg-[rgba(255,255,255,0.6)] text-[rgba(95,95,88,0.8)] border-[rgba(201,168,76,0.15)] hover:bg-white"
                  } ${errors.attendance ? "border-red-300" : ""}`}
                >
                  Ragu-ragu
                </button>
              </div>
              {errors.attendance && (
                <p className="font-body text-[11px] text-red-500 mt-1">
                  {errors.attendance}
                </p>
              )}
            </div>

            <div className="w-full flex flex-col gap-[8px] items-start">
              <label htmlFor="rsvp-message" className="font-body font-medium text-[11px] tracking-[1.32px] text-[#c9a84c]">
                UCAPAN & DOA
              </label>
              <textarea
                id="rsvp-message"
                value={formData.message}
                onChange={(event) =>
                  setFormData((prev) => ({
                    ...prev,
                    message: event.target.value,
                  }))
                }
                placeholder="Tulis ucapan selamat & doa restu Anda..."
                rows={4}
                className={`w-full bg-[rgba(255,255,255,0.6)] border border-solid rounded-[16px] px-[17px] py-[15px] font-body text-[13px] text-[#1a1d14] placeholder-[rgba(95,95,88,0.3)] focus:outline-none focus:border-[#c9a84c] transition-colors resize-none ${
                  errors.message ? "border-red-300" : "border-[rgba(201,168,76,0.1)]"
                }`}
                aria-describedby={errors.message ? "rsvp-message-error" : undefined}
              />
              {errors.message && (
                <p id="rsvp-message-error" className="font-body text-[11px] text-red-500">
                  {errors.message}
                </p>
              )}
            </div>

            {submitError && (
              <div className="rounded-[16px] border border-red-200 bg-red-50 px-4 py-3 font-body text-[12px] text-red-500">
                {submitError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-[#c9a84c] relative rounded-[9999px] py-[20px] w-full flex items-center justify-center font-body font-medium text-[11px] text-white tracking-[2.2px] shadow-[0px_10px_15px_-3px_rgba(201,168,76,0.2),0px_4px_6px_-4px_rgba(201,168,76,0.2)] hover:bg-[#b5943f] active:scale-[0.98] transition-all ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {isSubmitting ? "MENGIRIM..." : "KONFIRMASI KEHADIRAN"}
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
