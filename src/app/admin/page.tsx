"use client";

import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import LinkGenerator from "@/components/admin/LinkGenerator";

export default function AdminPage() {
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "Sehan123";
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedAuth = localStorage.getItem("admin_is_authed") === "true";
    if (storedAuth) {
      setIsAuthed(true);
    }
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!adminPassword) {
      setError("NEXT_PUBLIC_ADMIN_PASSWORD belum diisi.");
      return;
    }

    if (password === adminPassword) {
      setIsAuthed(true);
      localStorage.setItem("admin_is_authed", "true");
      return;
    }

    setError("Password salah.");
  };

  const handleLogout = () => {
    setIsAuthed(false);
    localStorage.removeItem("admin_is_authed");
  };

  if (!isMounted) {
    return (
      <main className="min-h-screen py-16 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen py-16">
      <div className="max-w-md mx-auto px-4 sm:px-6">
        <h1 className="font-display font-light text-display-lg italic text-slate-700 text-center">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-body-sm text-slate-500 text-center">
          Generate link WhatsApp untuk setiap tamu.
        </p>

        {!isAuthed ? (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <label className="text-label text-slate-500 uppercase" htmlFor="pwd">
              Password
            </label>
            <input
              id="pwd"
              type="password"
              className="w-full px-4 py-3 rounded-xl border border-white/40 bg-white/60 text-body-md text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400/60"
              placeholder="Masukkan password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-body-sm text-red-500">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full rounded-xl bg-gold-400 text-white py-3 font-medium hover:bg-gold-300 transition-colors cursor-pointer"
            >
              Masuk
            </button>
          </form>
        ) : (
          <div className="mt-8 relative">
            <div className="absolute -top-8 right-0 flex items-center gap-4">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="text-body-sm text-slate-500 hover:text-gold-500 transition-colors cursor-pointer font-medium flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Refresh
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="text-body-sm text-red-500 hover:text-red-600 transition-colors cursor-pointer font-medium"
              >
                Keluar
              </button>
            </div>
            <LinkGenerator />
          </div>
        )}
      </div>
    </main>
  );
}
