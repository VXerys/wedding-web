"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

export default function LinkGenerator() {
  const [guestName, setGuestName] = useState("");
  const [inviteUrl, setInviteUrl] = useState("");
  const [rawMessage, setRawMessage] = useState("");
  const [copiedInvite, setCopiedInvite] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  useEffect(() => {
    if (copiedInvite) {
      const timeout = setTimeout(() => setCopiedInvite(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [copiedInvite]);

  useEffect(() => {
    if (copiedText) {
      const timeout = setTimeout(() => setCopiedText(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [copiedText]);

  const handleGenerate = () => {
    const name = guestName.trim();
    if (!name) return;

    const siteUrl =
      typeof window !== "undefined"
        ? window.location.origin
        : process.env.NEXT_PUBLIC_SITE_URL ?? "https://intanagif.me";
    const sanitizedBaseUrl = siteUrl.replace(/\/$/, "");

    const encodedName = encodeURIComponent(name).replace(/%20/g, "+");
    const invitation = `${sanitizedBaseUrl}/?to=${encodedName}`;

    const message = `Assalamualaikum ${name},

Dengan penuh rasa syukur, kami mengundang Anda untuk hadir di acara pernikahan kami.

Buka undangan digital:
${invitation}`;

    setInviteUrl(invitation);
    setRawMessage(message);
  };

  const handleCopyInvite = async () => {
    if (!inviteUrl) return;
    await navigator.clipboard.writeText(inviteUrl);
    setCopiedInvite(true);
  };

  const handleCopyText = async () => {
    if (!rawMessage) return;
    await navigator.clipboard.writeText(rawMessage);
    setCopiedText(true);
  };

  const handleReset = () => {
    setGuestName("");
    setInviteUrl("");
    setRawMessage("");
  };

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

      <button
        type="button"
        onClick={handleGenerate}
        className="w-full rounded-xl bg-gold-400 text-white py-3 font-medium hover:bg-gold-300 transition-colors cursor-pointer"
      >
        Generate Link
      </button>

      {inviteUrl && (
        <div className="space-y-4 pt-2">
          <div>
            <p className="text-label text-slate-500 uppercase">Invitation URL</p>
            <textarea
              readOnly
              className="mt-2 w-full min-h-[70px] rounded-xl border border-white/40 bg-white/60 p-3 text-body-sm text-slate-700 font-sans"
              value={inviteUrl}
            />
            <button
              type="button"
              onClick={handleCopyInvite}
              className={`mt-2 w-full rounded-xl py-2.5 font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer text-body-sm ${
                copiedInvite ? "bg-green-500 text-white" : "bg-gold-400 text-white hover:bg-gold-300"
              }`}
            >
              {copiedInvite ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copiedInvite ? "Tersalin!" : "Salin Link Undangan"}
            </button>
          </div>

          <div className="border-t border-slate-100 pt-3">
            <p className="text-label text-slate-500 uppercase">WhatsApp Message Text</p>
            <textarea
              readOnly
              className="mt-2 w-full min-h-[110px] rounded-xl border border-white/40 bg-white/60 p-3 text-body-sm text-slate-700 font-sans"
              value={rawMessage}
            />
            <button
              type="button"
              onClick={handleCopyText}
              className={`mt-2 w-full rounded-xl py-2.5 font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer text-body-sm ${
                copiedText ? "bg-green-500 text-white" : "bg-gold-400 text-white hover:bg-gold-300"
              }`}
            >
              {copiedText ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copiedText ? "Tersalin!" : "Salin Teks Chat"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="mt-4 w-full rounded-xl py-2.5 font-medium flex items-center justify-center gap-2 border border-dashed border-slate-300 text-slate-500 hover:border-slate-400 hover:text-slate-600 transition-colors cursor-pointer text-body-sm"
            >
              Reset Form / Tamu Baru
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
