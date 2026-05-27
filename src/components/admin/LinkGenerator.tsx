"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { buildWhatsAppLink, encodeGuestName } from "@/lib/utils";

export default function LinkGenerator() {
  const [guestName, setGuestName] = useState("");
  const [inviteUrl, setInviteUrl] = useState("");
  const [waUrl, setWaUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (typeof window !== "undefined" ? window.location.origin : "");

  const sanitizedBaseUrl = useMemo(
    () => baseUrl.replace(/\/$/, ""),
    [baseUrl]
  );

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  const handleGenerate = () => {
    const name = guestName.trim();
    if (!name || !sanitizedBaseUrl || !waNumber) return;

    const invitation = `${sanitizedBaseUrl}/?to=${encodeGuestName(name)}`;
    const whatsapp = buildWhatsAppLink(name, invitation, waNumber);

    setInviteUrl(invitation);
    setWaUrl(whatsapp);
  };

  const handleCopy = async () => {
    if (!waUrl) return;
    await navigator.clipboard.writeText(waUrl);
    setCopied(true);
  };

  const isConfigMissing = !sanitizedBaseUrl || !waNumber;

  return (
    <div className="glass-card p-6 space-y-4">
      <div>
        <label className="text-label text-slate-500 uppercase" htmlFor="guest">
          Nama Tamu
        </label>
        <input
          id="guest"
          className="mt-2 w-full px-4 py-3 rounded-xl border border-white/40 bg-white/60 text-body-md text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400/60"
          placeholder="Contoh: Budi Santoso"
          value={guestName}
          onChange={(event) => setGuestName(event.target.value)}
        />
      </div>

      {isConfigMissing && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-body-sm text-amber-700">
          Lengkapi `NEXT_PUBLIC_SITE_URL` dan `NEXT_PUBLIC_WHATSAPP_NUMBER` di
          `.env.local`.
        </div>
      )}

      <button
        type="button"
        onClick={handleGenerate}
        className="w-full rounded-xl bg-gold-400 text-white py-3 font-medium hover:bg-gold-300 transition-colors"
      >
        Generate Link
      </button>

      {inviteUrl && (
        <div className="space-y-3">
          <div>
            <p className="text-label text-slate-500 uppercase">Invitation URL</p>
            <textarea
              readOnly
              className="mt-2 w-full min-h-[70px] rounded-xl border border-white/40 bg-white/60 p-3 text-body-sm text-slate-700"
              value={inviteUrl}
            />
          </div>
          <div>
            <p className="text-label text-slate-500 uppercase">WhatsApp URL</p>
            <textarea
              readOnly
              className="mt-2 w-full min-h-[70px] rounded-xl border border-white/40 bg-white/60 p-3 text-body-sm text-slate-700"
              value={waUrl}
            />
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className={`w-full rounded-xl py-3 font-medium flex items-center justify-center gap-2 transition-colors ${
              copied ? "bg-green-500 text-white" : "bg-gold-400 text-white"
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Tersalin!" : "Salin Link WhatsApp"}
          </button>
        </div>
      )}
    </div>
  );
}
