"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase/client";
import type { GuestbookEntry, AttendanceStatus } from "@/types/guestbook";
import { formatRelativeTime, formatAttendanceLabel } from "@/lib/utils";
import { RefreshCw, Search, Users, CheckCircle, XCircle, HelpCircle, ChevronDown } from "lucide-react";

type SortField = "created_at" | "guest_name" | "attendance";
type SortDir = "asc" | "desc";
type FilterStatus = "Semua" | AttendanceStatus;

const ATTENDANCE_COLORS: Record<string, { badge: string; icon: React.ReactNode }> = {
  Hadir: {
    badge: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    icon: <CheckCircle className="w-3.5 h-3.5" />,
  },
  "Tidak Hadir": {
    badge: "bg-red-50 text-red-600 border border-red-200",
    icon: <XCircle className="w-3.5 h-3.5" />,
  },
  Ragu: {
    badge: "bg-amber-50 text-amber-600 border border-amber-200",
    icon: <HelpCircle className="w-3.5 h-3.5" />,
  },
};

const PAGE_SIZE = 20;

export default function GuestListTab() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("Semua");
  const [sortField, setSortField] = useState<SortField>("created_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchEntries = useCallback(async (showRefresh = false) => {
    if (showRefresh) setIsRefreshing(true);
    else setIsLoading(true);
    setError(null);

    try {
      let query = supabase
        .from("guestbook")
        .select("id, guest_name, attendance, message, created_at", { count: "exact" });

      if (filterStatus !== "Semua") {
        query = query.eq("attendance", filterStatus);
      }

      if (search.trim()) {
        query = query.ilike("guest_name", `%${search.trim()}%`);
      }

      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const { data, count, error: fetchError } = await query
        .order(sortField, { ascending: sortDir === "asc" })
        .range(from, to);

      if (fetchError) throw fetchError;

      setEntries((data ?? []) as GuestbookEntry[]);
      setTotalCount(count ?? 0);
    } catch (err) {
      console.error("[GuestList] fetch error", err);
      setError("Gagal memuat data. Coba lagi.");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [filterStatus, search, sortField, sortDir, page]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  // Reset page to 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [filterStatus, search, sortField, sortDir]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);
  const hadir = entries.filter((e) => e.attendance === "Hadir").length;
  const tidakHadir = entries.filter((e) => e.attendance === "Tidak Hadir").length;
  const ragu = entries.filter((e) => e.attendance === "Ragu").length;

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronDown className="w-3 h-3 opacity-30" />;
    return (
      <ChevronDown
        className={`w-3 h-3 transition-transform ${sortDir === "asc" ? "rotate-180" : ""}`}
      />
    );
  };

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => setFilterStatus("Semua")}
          className={`rounded-xl p-3 text-center transition-all border cursor-pointer ${
            filterStatus === "Semua"
              ? "bg-[rgba(201,168,76,0.12)] border-[rgba(201,168,76,0.4)]"
              : "bg-white/60 border-[rgba(201,168,76,0.15)] hover:bg-white/80"
          }`}
        >
          <div className="flex items-center justify-center gap-1 mb-1 text-slate-500">
            <Users className="w-3.5 h-3.5" />
          </div>
          <p className="font-display text-[22px] italic text-slate-700 leading-none">{totalCount}</p>
          <p className="text-[10px] text-slate-500 mt-0.5 tracking-wide uppercase font-medium">Total</p>
        </button>
        <button
          type="button"
          onClick={() => setFilterStatus("Hadir")}
          className={`rounded-xl p-3 text-center transition-all border cursor-pointer ${
            filterStatus === "Hadir"
              ? "bg-emerald-50 border-emerald-300"
              : "bg-white/60 border-[rgba(201,168,76,0.15)] hover:bg-white/80"
          }`}
        >
          <div className="flex items-center justify-center gap-1 mb-1 text-emerald-500">
            <CheckCircle className="w-3.5 h-3.5" />
          </div>
          <p className="font-display text-[22px] italic text-emerald-700 leading-none">
            {filterStatus === "Semua" ? hadir : filterStatus === "Hadir" ? totalCount : "-"}
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5 tracking-wide uppercase font-medium">Hadir</p>
        </button>
        <button
          type="button"
          onClick={() => setFilterStatus("Tidak Hadir")}
          className={`rounded-xl p-3 text-center transition-all border cursor-pointer ${
            filterStatus === "Tidak Hadir"
              ? "bg-red-50 border-red-300"
              : "bg-white/60 border-[rgba(201,168,76,0.15)] hover:bg-white/80"
          }`}
        >
          <div className="flex items-center justify-center gap-1 mb-1 text-red-400">
            <XCircle className="w-3.5 h-3.5" />
          </div>
          <p className="font-display text-[22px] italic text-red-600 leading-none">
            {filterStatus === "Semua" ? tidakHadir : filterStatus === "Tidak Hadir" ? totalCount : "-"}
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5 tracking-wide uppercase font-medium">Absen</p>
        </button>
      </div>

      {/* Search + Filter Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Cari nama tamu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[rgba(201,168,76,0.2)] bg-white/70 text-body-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[rgba(201,168,76,0.3)] focus:border-[rgba(201,168,76,0.5)]"
          />
        </div>
        <button
          type="button"
          onClick={() => setFilterStatus("Ragu")}
          className={`px-3 py-2.5 rounded-xl border text-[11px] font-medium tracking-wide transition-all cursor-pointer ${
            filterStatus === "Ragu"
              ? "bg-amber-50 border-amber-300 text-amber-600"
              : "bg-white/60 border-[rgba(201,168,76,0.15)] text-slate-500 hover:bg-white/80"
          }`}
        >
          Ragu-ragu
        </button>
      </div>

      {/* List Header */}
      <div className="flex items-center justify-between px-1">
        <p className="text-[11px] text-slate-400">
          {isLoading ? "Memuat..." : `${totalCount} tamu${filterStatus !== "Semua" ? ` · ${filterStatus}` : ""}`}
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => toggleSort("guest_name")}
            className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-700 cursor-pointer transition-colors"
          >
            Nama <SortIcon field="guest_name" />
          </button>
          <button
            type="button"
            onClick={() => toggleSort("created_at")}
            className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-700 cursor-pointer transition-colors"
          >
            Waktu <SortIcon field="created_at" />
          </button>
          <button
            type="button"
            onClick={() => fetchEntries(true)}
            disabled={isRefreshing}
            className="flex items-center gap-1 text-[11px] text-[#c9a84c] hover:text-[#b8941f] cursor-pointer transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-body-sm text-red-500">
          {error}
          <button
            type="button"
            onClick={() => fetchEntries()}
            className="ml-2 underline cursor-pointer"
          >
            Coba lagi
          </button>
        </div>
      )}

      {/* Guest List */}
      <div className="space-y-2">
        {isLoading ? (
          <>
            {[...Array(5)].map((_, i) => (
              <div
                key={`sk-${i}`}
                className="h-[88px] rounded-xl border border-solid border-[rgba(201,168,76,0.1)] bg-white/50 animate-pulse"
              />
            ))}
          </>
        ) : entries.length === 0 ? (
          <div className="rounded-xl border border-solid border-[rgba(201,168,76,0.15)] bg-white/60 p-8 text-center">
            <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-body-sm text-slate-400">
              {search ? `Tidak ada tamu bernama "${search}"` : "Belum ada data tamu."}
            </p>
          </div>
        ) : (
          entries.map((entry, idx) => {
            const statusStyle = ATTENDANCE_COLORS[entry.attendance] ?? ATTENDANCE_COLORS["Ragu"];
            return (
              <div
                key={entry.id}
                className="rounded-xl border border-solid border-[rgba(201,168,76,0.15)] bg-white/70 p-4 transition-all hover:bg-white/90"
              >
                {/* Row 1: Number + Name + Badge */}
                <div className="flex items-start gap-3">
                  <span className="text-[11px] text-slate-300 font-mono mt-0.5 min-w-[20px] text-right">
                    {(page - 1) * PAGE_SIZE + idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-body font-semibold text-slate-700 text-[14px] truncate">
                        {entry.guest_name}
                      </span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${statusStyle.badge}`}>
                        {statusStyle.icon}
                        {formatAttendanceLabel(entry.attendance)}
                      </span>
                    </div>
                    {/* Message */}
                    {entry.message && (
                      <p className="text-[12px] text-slate-500 mt-1.5 leading-relaxed italic line-clamp-2">
                        &ldquo;{entry.message}&rdquo;
                      </p>
                    )}
                    {/* Time */}
                    <p className="text-[10px] text-slate-300 mt-1.5">
                      {formatRelativeTime(entry.created_at)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-xl border border-[rgba(201,168,76,0.2)] text-[12px] text-slate-500 hover:bg-white/80 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
          >
            ← Sebelumnya
          </button>
          <span className="text-[12px] text-slate-400">
            Halaman {page} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-xl border border-[rgba(201,168,76,0.2)] text-[12px] text-slate-500 hover:bg-white/80 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
          >
            Berikutnya →
          </button>
        </div>
      )}
    </div>
  );
}
