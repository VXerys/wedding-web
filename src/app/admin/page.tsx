"use client";

import { useState, useEffect } from "react";
import { RefreshCw, LogOut, Link2, Users } from "lucide-react";
import LinkGenerator from "@/components/admin/LinkGenerator";
import GuestListTab from "@/components/admin/GuestListTab";

type Tab = "generate" | "guests";

export default function AdminPage() {
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "Sehan123";
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("generate");

  useEffect(() => {
    Promise.resolve().then(() => {
      setIsMounted(true);
      const storedAuth = localStorage.getItem("admin_is_authed") === "true";
      if (storedAuth) {
        setIsAuthed(true);
      }
    });
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

    setError("Password salah. Coba lagi.");
  };

  const handleLogout = () => {
    setIsAuthed(false);
    localStorage.removeItem("admin_is_authed");
  };

  if (!isMounted) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-cream-50">
        <div className="w-6 h-6 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream-50">
      {/* Top Header Bar */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-[rgba(201,168,76,0.15)] sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <h1 className="font-display font-light italic text-[22px] text-slate-700 leading-none">
            Admin
          </h1>
          {isAuthed && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[rgba(201,168,76,0.2)] bg-white/60 text-[12px] font-medium text-slate-500 hover:bg-white hover:text-slate-700 hover:border-[rgba(201,168,76,0.4)] transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Refresh
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 bg-red-50 text-[12px] font-medium text-red-500 hover:bg-red-100 hover:border-red-300 transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                Keluar
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
        {!isAuthed ? (
          /* ─────────── Login Form ─────────── */
          <div className="max-w-sm mx-auto mt-12">
            <div className="text-center mb-8">
              <h2 className="font-display font-light italic text-[32px] text-slate-700">
                Admin Dashboard
              </h2>
              <p className="mt-2 text-body-sm text-slate-500">
                Masuk untuk mengelola tamu undangan.
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 p-6 rounded-2xl border border-solid border-[rgba(201,168,76,0.2)] bg-white/70 shadow-card-sm"
            >
              <div>
                <label
                  className="block text-label text-slate-500 uppercase mb-2 tracking-widest"
                  htmlFor="pwd"
                >
                  Password
                </label>
                <input
                  id="pwd"
                  type="password"
                  className="w-full px-4 py-3 rounded-xl border border-[rgba(201,168,76,0.2)] bg-white/60 text-body-md text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[rgba(201,168,76,0.3)] focus:border-[rgba(201,168,76,0.5)]"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                />
              </div>
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-body-sm text-red-500">
                  {error}
                </div>
              )}
              <button
                type="submit"
                className="w-full rounded-xl bg-gold-400 text-white py-3 font-medium hover:bg-gold-500 transition-colors cursor-pointer"
              >
                Masuk
              </button>
            </form>
          </div>
        ) : (
          /* ─────────── Dashboard ─────────── */
          <div>
            {/* Tab Navigation */}
            <div className="flex gap-1 p-1 bg-white/60 border border-[rgba(201,168,76,0.15)] rounded-2xl mb-6">
              <button
                type="button"
                onClick={() => setActiveTab("generate")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-medium transition-all cursor-pointer ${
                  activeTab === "generate"
                    ? "bg-gold-400 text-white shadow-gold"
                    : "text-slate-500 hover:text-slate-700 hover:bg-white/80"
                }`}
              >
                <Link2 className="w-3.5 h-3.5" />
                Generate Link
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("guests")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-medium transition-all cursor-pointer ${
                  activeTab === "guests"
                    ? "bg-gold-400 text-white shadow-gold"
                    : "text-slate-500 hover:text-slate-700 hover:bg-white/80"
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                Data Tamu
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "generate" && (
              <div className="rounded-2xl border border-solid border-[rgba(201,168,76,0.15)] bg-white/60 overflow-hidden">
                <div className="px-5 py-4 border-b border-[rgba(201,168,76,0.1)]">
                  <h2 className="font-body font-semibold text-[14px] text-slate-700">
                    🔗 Generate Link Undangan
                  </h2>
                  <p className="text-[12px] text-slate-400 mt-0.5">
                    Masukkan nama tamu untuk membuat link undangan personal.
                  </p>
                </div>
                <div className="p-5">
                  <LinkGenerator />
                </div>
              </div>
            )}

            {activeTab === "guests" && (
              <div className="rounded-2xl border border-solid border-[rgba(201,168,76,0.15)] bg-white/60 overflow-hidden">
                <div className="px-5 py-4 border-b border-[rgba(201,168,76,0.1)]">
                  <h2 className="font-body font-semibold text-[14px] text-slate-700">
                    👥 Data Kehadiran Tamu
                  </h2>
                  <p className="text-[12px] text-slate-400 mt-0.5">
                    Daftar tamu yang sudah mengkonfirmasi kehadiran beserta ucapan mereka.
                  </p>
                </div>
                <div className="p-5">
                  <GuestListTab />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
