"use client";

import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/lib/supabase/client";
import type { AttendanceStatus, GuestbookEntry } from "@/types/guestbook";

interface SubmitPayload {
  guest_name: string;
  attendance: AttendanceStatus;
  message: string;
}

interface SubmitHandlers {
  addOptimisticEntry: (entry: GuestbookEntry) => void;
  confirmEntry: (tempId: string, realEntry: GuestbookEntry) => void;
  removeEntry: (tempId: string) => void;
}

type SubmitState = "idle" | "loading" | "success" | "error";

export interface RSVPSubmitErrorDetails {
  message: string;
  code?: string;
  status?: number;
  details?: string;
  hint?: string;
}

export class RSVPSubmitError extends Error {
  code?: string;
  status?: number;
  details?: string;
  hint?: string;

  constructor(details: RSVPSubmitErrorDetails) {
    super(details.message);
    this.name = "RSVPSubmitError";
    this.code = details.code;
    this.status = details.status;
    this.details = details.details;
    this.hint = details.hint;
  }
}

const buildSubmitErrorDetails = (error: unknown): RSVPSubmitErrorDetails => {
  if (error instanceof RSVPSubmitError) {
    return {
      message: error.message,
      code: error.code,
      status: error.status,
      details: error.details,
      hint: error.hint,
    };
  }

  if (error && typeof error === "object") {
    const rawMessage = "message" in error ? error.message : undefined;
    const rawCode = "code" in error ? error.code : undefined;
    const rawStatus = "status" in error ? error.status : undefined;
    const rawDetails = "details" in error ? error.details : undefined;
    const rawHint = "hint" in error ? error.hint : undefined;

    return {
      message:
        typeof rawMessage === "string" && rawMessage.trim()
          ? rawMessage
          : "Gagal mengirim ucapan ke server.",
      code: typeof rawCode === "string" ? rawCode : undefined,
      status: typeof rawStatus === "number" ? rawStatus : undefined,
      details: typeof rawDetails === "string" ? rawDetails : undefined,
      hint: typeof rawHint === "string" ? rawHint : undefined,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message || "Gagal mengirim ucapan ke server.",
    };
  }

  return {
    message: "Gagal mengirim ucapan ke server.",
  };
};

export const useRSVPSubmit = ({
  addOptimisticEntry,
  confirmEntry,
  removeEntry,
}: SubmitHandlers) => {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const submitRSVP = useCallback(
    async (payload: SubmitPayload) => {
      const normalizedPayload: SubmitPayload = {
        guest_name: payload.guest_name.trim(),
        attendance: payload.attendance,
        message: payload.message.trim(),
      };

      const tempId = uuidv4();
      const optimisticEntry: GuestbookEntry = {
        id: tempId,
        guest_name: normalizedPayload.guest_name,
        attendance: normalizedPayload.attendance,
        message: normalizedPayload.message,
        created_at: new Date().toISOString(),
        isPending: true,
      };

      addOptimisticEntry(optimisticEntry);
      setSubmitState("loading");

      let timeoutId: ReturnType<typeof setTimeout> | null = null;

      try {
        const insertPromise = supabase
          .from("guestbook")
          .insert([normalizedPayload])
          .select("id, guest_name, attendance, message, created_at")
          .single();

        const timeoutPromise = new Promise<never>((_, reject) => {
          timeoutId = setTimeout(
            () => reject(new Error("Request timeout")),
            10000
          );
        });

        const { data, error } = await Promise.race([
          insertPromise,
          timeoutPromise,
        ]);

        if (error || !data) {
          throw error ?? new Error("Insert failed");
        }

        confirmEntry(tempId, data);
        setSubmitState("success");
        return { data };
      } catch (error) {
        const submitError = new RSVPSubmitError(buildSubmitErrorDetails(error));

        console.error("[RSVP] Supabase insert failed", {
          message: submitError.message,
          code: submitError.code,
          status: submitError.status,
          details: submitError.details,
          hint: submitError.hint,
          raw: error,
        });

        removeEntry(tempId);
        setSubmitState("error");
        throw submitError;
      } finally {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        setTimeout(() => setSubmitState("idle"), 2000);
      }
    },
    [addOptimisticEntry, confirmEntry, removeEntry]
  );

  return {
    submitRSVP,
    submitState,
    isSubmitting: submitState === "loading",
  };
};
