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
    icon: <CheckCircle className="w-3 h-3 flex-shrink-0" />,
  },
  "Tidak Hadir": {
    badge: "bg-red-50 text-red-600 border border-red-200",
    icon: <XCircle className="w-3 h-3 flex-shrink-0" />,
  },
  Ragu: {
    badge: "bg-amber-50 text-amber-600 border border-amber-200",
    icon: <HelpCircle className="w-3 h-3 flex-shrink-0" />,
  },
};

const PAGE_SIZE = 20;

// Stat card definition for summary
const StatCard = ({
  label,
  value,
  icon,
  active,
  activeClass,
  onClick,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  active: boolean;
  activeClass: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex flex-col items-center justify-center rounded-xl py-3 px-2 border transition-all cursor-pointer gap-1 ${
      active ? activeClass : "bg-white/60 border-[rgba(201,168,76,0.15)] hover:bg-white/80"
    }`}
  >
    <div className={`flex items-center justify-center ${active ? "" : "opacity-50"}`}>{icon}</div>
    <p className={`font-display text-[20px] italic leading-none ${active ? "" : "text-slate-700"}`}>{value}</p>
    <p className="text-[9px] tracking-widest uppercase font-semibold text-slate-400">{label}</p>
  </button>
);

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

  // Separate counts (always unfiltered)
  const [counts, setCounts] = useState({ hadir: 0, tidakHadir: 0, ragu: 0, total: 0 });

  const fetchCounts = useCallback(async () => {
    const { data } = await supabase
      .from("guestbook")
      .select("attendance");
    if (data) {
      const hadir = data.filter((e) => e.attendance === "Hadir").length;
      const tidakHadir = data.filter((e) => e.attendance === "Tidak Hadir").length;
      const ragu = data.filter((e) => e.attendance === "Ragu").length;
      setCounts({ hadir, tidakHadir, ragu, total: data.length });
    }
  }, []);

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
    void fetchCounts();
  }, [fetchCounts]);

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

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronDown className="w-3 h-3 opacity-30" />;
    return (
      <ChevronDown
        className={`w-3 h-3 transition-transform ${sortDir === "asc" ? "rotate-180" : ""}`}
      />
    );
  };

  const filterLabel =
    filterStatus === "Semua" ? "" :
    filterStatus === "Hadir" ? "Hadir" :
    filterStatus === "Tidak Hadir" ? "Tidak Hadir" : "Ragu-ragu";

  return (
    <div className="space-y-3">

      {/* ── Summary Cards 2×2 grid ── */}
      <div className="grid grid-cols-2 gap-2">
        <StatCard
          label="Total Tamu"
          value={counts.total}
          icon={<Users className="w-4 h-4 text-slate-500" />}
          active={filterStatus === "Semua"}
          activeClass="bg-[rgba(201,168,76,0.1)] border-[rgba(201,168,76,0.4)] text-slate-700"
          onClick={() => setFilterStatus("Semua")}
        />
        <StatCard
          label="Hadir"
          value={counts.hadir}
          icon={<CheckCircle className="w-4 h-4 text-emerald-500" />}
          active={filterStatus === "Hadir"}
          activeClass="bg-emerald-50 border-emerald-300 text-emerald-700"
          onClick={() => setFilterStatus("Hadir")}
        />
        <StatCard
          label="Tidak Hadir"
          value={counts.tidakHadir}
          icon={<XCircle className="w-4 h-4 text-red-400" />}
          active={filterStatus === "Tidak Hadir"}
          activeClass="bg-red-50 border-red-300 text-red-700"
          onClick={() => setFilterStatus("Tidak Hadir")}
        />
        <StatCard
          label="Ragu-ragu"
          value={counts.ragu}
          icon={<HelpCircle className="w-4 h-4 text-amber-500" />}
          active={filterStatus === "Ragu"}
          activeClass="bg-amber-50 border-amber-300 text-amber-700"
          onClick={() => setFilterStatus("Ragu")}
        />
      </div>

      {/* ── Search Bar (full width) ── */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Cari nama tamu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[rgba(201,168,76,0.2)] bg-white/70 text-[13px] text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[rgba(201,168,76,0.3)] focus:border-[rgba(201,168,76,0.5)]"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 cursor-pointer text-[18px] leading-none"
          >
            ×
          </button>
        )}
      </div>

      {/* ── Active Filter Pill + Sort + Refresh ── */}
      <div className="flex items-center justify-between">
        <p className="text-[11px] text-slate-400">
          {isLoading
            ? "Memuat..."
            : filterStatus !== "Semua"
              ? `${totalCount} tamu · ${filterLabel}`
              : `${counts.total} tamu terdaftar`}
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => toggleSort("guest_name")}
            className="flex items-center gap-0.5 text-[11px] text-slate-400 hover:text-slate-700 cursor-pointer transition-colors"
          >
            A–Z <SortIcon field="guest_name" />
          </button>
          <button
            type="button"
            onClick={() => toggleSort("created_at")}
            className="flex items-center gap-0.5 text-[11px] text-slate-400 hover:text-slate-700 cursor-pointer transition-colors"
          >
            Waktu <SortIcon field="created_at" />
          </button>
          <button
            type="button"
            onClick={() => { void fetchCounts(); fetchEntries(true); }}
            disabled={isRefreshing}
            className="flex items-center gap-1 text-[11px] text-[#c9a84c] hover:text-[#9a7a0a] cursor-pointer transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* ── Error State ── */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[12px] text-red-500 flex items-center justify-between">
          <span>{error}</span>
          <button
            type="button"
            onClick={() => fetchEntries()}
            className="underline cursor-pointer font-medium ml-2 whitespace-nowrap"
          >
            Coba lagi
          </button>
        </div>
      )}

      {/* ── Guest List ── */}
      <div className="space-y-2">
        {isLoading ? (
          <>
            {[...Array(4)].map((_, i) => (
              <div
                key={`sk-${i}`}
                className="h-20 rounded-xl border border-solid border-[rgba(201,168,76,0.1)] bg-white/50 animate-pulse"
              />
            ))}
          </>
        ) : entries.length === 0 ? (
          <div className="rounded-xl border border-solid border-[rgba(201,168,76,0.15)] bg-white/60 p-8 text-center">
            <Users className="w-8 h-8 text-slate-200 mx-auto mb-2" />
            <p className="text-[13px] text-slate-400">
              {search
                ? `Tidak ada tamu bernama "${search}"`
                : filterStatus !== "Semua"
                  ? `Belum ada tamu dengan status "${filterLabel}"`
                  : "Belum ada data tamu."}
            </p>
          </div>
        ) : (
          entries.map((entry, idx) => {
            const statusStyle = ATTENDANCE_COLORS[entry.attendance] ?? ATTENDANCE_COLORS["Ragu"];
            return (
              <div
                key={entry.id}
                className="rounded-xl border border-solid border-[rgba(201,168,76,0.15)] bg-white/70 px-4 py-3 transition-all hover:bg-white/90"
              >
                <div className="flex items-start gap-2.5">
                  {/* Number */}
                  <span className="text-[10px] text-slate-300 font-mono mt-1 min-w-[18px] text-right flex-shrink-0">
                    {(page - 1) * PAGE_SIZE + idx + 1}
                  </span>
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Name + badge on same row, wraps naturally */}
                    <div className="flex items-center flex-wrap gap-x-2 gap-y-1">
                      <span className="font-body font-semibold text-slate-700 text-[14px] leading-snug">
                        {entry.guest_name}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide flex-shrink-0 ${statusStyle.badge}`}
                      >
                        {statusStyle.icon}
                        {formatAttendanceLabel(entry.attendance)}
                      </span>
                    </div>
                    {/* Message */}
                    {entry.message && (
                      <p className="text-[12px] text-slate-500 mt-1 leading-relaxed italic line-clamp-2">
                        &ldquo;{entry.message}&rdquo;
                      </p>
                    )}
                    {/* Time */}
                    <p className="text-[10px] text-slate-300 mt-1">
                      {formatRelativeTime(entry.created_at)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-xl border border-[rgba(201,168,76,0.2)] text-[12px] text-slate-500 hover:bg-white/80 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all"
          >
            ← Sebelumnya
          </button>
          <span className="text-[12px] text-slate-400">
            {page} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-xl border border-[rgba(201,168,76,0.2)] text-[12px] text-slate-500 hover:bg-white/80 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all"
          >
            Berikutnya →
          </button>
        </div>
      )}
    </div>
  );
}
