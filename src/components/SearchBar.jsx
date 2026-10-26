import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ value, onChange, onClear, placeholder = "Search artifacts by name, dynasty, period, material..." }) => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7E7062]">
        <Search className="w-4 h-4" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2.5 bg-[#FFFFFF] border parchment-border rounded-lg text-sm text-[#2B231D] placeholder-[#A09385] focus:outline-none focus:ring-2 focus:ring-[#A84B24] focus:border-transparent bronze-shadow transition-all"
        aria-label="Search historical artifacts"
      />
      {value && (
        <button
          onClick={onClear}
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#7E7062] hover:text-[#2B231D]"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
