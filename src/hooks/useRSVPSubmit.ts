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

export const useRSVPSubmit = ({
  addOptimisticEntry,
  confirmEntry,
  removeEntry,
}: SubmitHandlers) => {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const submitRSVP = useCallback(
    async (payload: SubmitPayload) => {
      const tempId = uuidv4();
      const optimisticEntry: GuestbookEntry = {
        id: tempId,
        guest_name: payload.guest_name,
        attendance: payload.attendance,
        message: payload.message,
        created_at: new Date().toISOString(),
        isPending: true,
      };

      addOptimisticEntry(optimisticEntry);
      setSubmitState("loading");

      try {
        const insertPromise = supabase
          .from("guestbook")
          .insert([payload])
          .select("id, guest_name, attendance, message, created_at")
          .single();

        const timeoutPromise = new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error("Request timeout")), 10000);
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
        removeEntry(tempId);
        setSubmitState("error");
        throw error;
      } finally {
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
