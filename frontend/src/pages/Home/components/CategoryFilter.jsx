import React from "react";
import { Flame, Palmtree, Mountain, Building, Home, Sparkles, SlidersHorizontal } from "lucide-react";

export const CATEGORIES = [
  { id: "trending", label: "Trending", icon: Flame },
  { id: "beachfront", label: "Beachfront", icon: Palmtree },
  { id: "cabins", label: "Cabins", icon: Mountain },
  { id: "mansions", label: "Mansions", icon: Building },
  { id: "tiny-homes", label: "Tiny Homes", icon: Home },
  { id: "luxe", label: "Luxe Stays", icon: Sparkles },
];

const CategoryFilter = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="sticky top-16.25 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex flex-col items-center gap-2 border-b-2 pb-2 text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? "border-slate-900 text-slate-900"
                    : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-800"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-slate-900" : "text-slate-500"}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        <button className="hidden md:flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
          <SlidersHorizontal className="h-4 w-4" />
          <span>Filters</span>
        </button>
      </div>
    </div>
  );
};

export default CategoryFilter;