import React, { useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { TECH_OPTIONS } from "../data/techOptions";

interface TechSelectorProps {
  selected: string[];
  onChange: (selected: string[]) => void;
}

export default function TechSelector({ selected, onChange }: TechSelectorProps) {
  const [open, setOpen] = useState(false);
  const [customInput, setCustomInput] = useState("");

  const toggleTech = (tech: string) => {
    if (selected.includes(tech)) {
      onChange(selected.filter((t) => t !== tech));
    } else {
      onChange([...selected, tech]);
    }
  };

  const addCustomTech = () => {
    if (customInput.trim() && !selected.includes(customInput.trim())) {
      onChange([...selected, customInput.trim()]);
      setCustomInput("");
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-slate-700">
          Technologies & Tools (Select from categories or type custom)
        </label>
        <span className="text-[11px] text-slate-500 font-medium">{selected.length} selected</span>
      </div>

      {/* Selected Tags Display */}
      <div className="flex flex-wrap gap-1.5 p-2.5 min-h-[44px] bg-slate-50 border border-slate-200 rounded-xl">
        {selected.length === 0 ? (
          <span className="text-xs text-slate-400 self-center">No technologies selected yet...</span>
        ) : (
          selected.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium shadow-sm"
            >
              {tech}
              <button
                type="button"
                onClick={() => toggleTech(tech)}
                className="hover:text-rose-600 rounded-full p-0.5"
              >
                <X size={12} />
              </button>
            </span>
          ))
        )}
      </div>

      {/* Dropdown Opener & Custom Input */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex-1 flex items-center justify-between px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
        >
          <span>Choose from Mobile, Frontend, Backend, Deployment</span>
          <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        <div className="flex gap-1.5">
          <input
            type="text"
            placeholder="Custom tag..."
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCustomTech())}
            className="w-28 sm:w-36 px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 shadow-sm"
          />
          <button
            type="button"
            onClick={addCustomTech}
            className="px-3 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 shadow-sm"
          >
            Add
          </button>
        </div>
      </div>

      {/* Accordion Categories */}
      {open && (
        <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-lg space-y-3 max-h-60 overflow-y-auto mt-1">
          {TECH_OPTIONS.map((cat) => (
            <div key={cat.category} className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                {cat.category}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {cat.options.map((option) => {
                  const isChecked = selected.includes(option);
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => toggleTech(option)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                        isChecked
                          ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {isChecked && <Check size={12} />}
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
