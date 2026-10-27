import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | string)[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i);
    } else if (
      pages[pages.length - 1] !== "..." &&
      (i === currentPage - 2 || i === currentPage + 2)
    ) {
      pages.push("...");
    }
  }

  const startIdx = (currentPage - 1) * (itemsPerPage || 6) + 1;
  const endIdx = Math.min(currentPage * (itemsPerPage || 6), totalItems || 0);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8 mt-6 border-t border-slate-800/80">
      {totalItems !== undefined && (
        <span className="text-xs font-mono text-slate-400">
          Showing <strong className="text-white">{startIdx}</strong>-
          <strong className="text-white">{endIdx}</strong> of{" "}
          <strong className="text-cyan-400">{totalItems}</strong> items
        </span>
      )}

      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-3.5 py-2 rounded-xl border border-slate-800 bg-[#0d1322] text-xs font-bold text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:border-cyan-400/40 hover:text-white transition-all shadow-sm"
        >
          <ChevronLeft size={16} /> Prev
        </button>

        {/* Page Number Buttons */}
        <div className="flex items-center gap-1.5">
          {pages.map((p, idx) => {
            if (p === "...") {
              return (
                <span key={idx} className="px-2 text-xs font-mono text-slate-500">
                  ...
                </span>
              );
            }
            const isCurrent = p === currentPage;
            return (
              <button
                key={idx}
                onClick={() => onPageChange(Number(p))}
                className={`w-9 h-9 rounded-xl text-xs font-mono font-bold transition-all ${
                  isCurrent
                    ? "bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/20 font-black scale-105"
                    : "border border-slate-800 bg-[#0d1322] text-slate-300 hover:border-slate-700 hover:text-white"
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 px-3.5 py-2 rounded-xl border border-slate-800 bg-[#0d1322] text-xs font-bold text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:border-cyan-400/40 hover:text-white transition-all shadow-sm"
        >
          Next <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
