import React from 'react';
import { Filter, RotateCcw, ArrowUpDown } from 'lucide-react';

const FilterPanel = ({
  states = [],
  districts = [],
  categories = [],
  selectedState,
  selectedDistrict,
  selectedCategory,
  selectedPeriod,
  selectedDynasty,
  sortBy,
  onStateChange,
  onDistrictChange,
  onCategoryChange,
  onPeriodChange,
  onDynastyChange,
  onSortChange,
  onResetFilters,
  hasActiveFilters
}) => {

  const periods = [
    { value: 'all', label: 'All Eras' },
    { value: 'Sangam', label: 'Sangam / Early Historic (BCE)' },
    { value: 'Pallava', label: 'Pallava Era (6th - 9th C.)' },
    { value: 'Chola', label: 'Imperial Chola Era (10th - 13th C.)' },
    { value: 'Pandya', label: 'Pandyan Epoch' },
    { value: 'Chalukya', label: 'Chalukya Era (6th - 8th C.)' },
    { value: 'Hoysala', label: 'Hoysala Golden Epoch (11th - 13th C.)' },
    { value: 'Vijayanagara', label: 'Vijayanagara Empire (14th - 16th C.)' },
    { value: 'Satavahana', label: 'Satavahana Epoch' },
    { value: 'Megalithic', label: 'Megalithic / Iron Age' }
  ];

  const dynasties = [
    { value: 'all', label: 'All Dynasties' },
    { value: 'Chola', label: 'Chola Dynasty' },
    { value: 'Pandya', label: 'Pandyan Dynasty' },
    { value: 'Pallava', label: 'Pallava Dynasty' },
    { value: 'Chera', label: 'Chera Dynasty / Kerala' },
    { value: 'Hoysala', label: 'Hoysala Dynasty' },
    { value: 'Vijayanagara', label: 'Vijayanagara / Tuluva' },
    { value: 'Satavahana', label: 'Satavahana Empire' },
    { value: 'Chalukya', label: 'Chalukyas of Vatapi' },
    { value: 'Western Ganga', label: 'Western Ganga Dynasty' },
    { value: 'Travancore', label: 'Venad / Travancore' }
  ];

  // Filter districts available according to selected state
  const availableDistricts = selectedState && selectedState !== 'all'
    ? districts.filter(d => d.stateId === selectedState)
    : districts;

  return (
    <div className="bg-[#FFFFFF] rounded-xl parchment-border p-4 sm:p-5 bronze-shadow space-y-4">
      
      {/* Header with Title and Reset */}
      <div className="flex items-center justify-between border-b border-[#F0EAE1] pb-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#2B231D]">
          <Filter className="w-4 h-4 text-[#A84B24]" />
          <span>Refine Artifact Records</span>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            type="button"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A84B24] hover:text-[#8D5B28] px-2.5 py-1 rounded bg-[#FDF9F5] border border-[#DECBB5] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Filter Select Controls Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        
        {/* State Filter */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#7E7062] mb-1">
            State
          </label>
          <select
            value={selectedState}
            onChange={(e) => onStateChange(e.target.value)}
            className="w-full text-xs py-2 px-2.5 bg-[#FAF7F2] border parchment-border rounded-md text-[#2B231D] focus:ring-1 focus:ring-[#A84B24] focus:outline-none"
          >
            <option value="all">All States</option>
            {states.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* District Filter */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#7E7062] mb-1">
            District
          </label>
          <select
            value={selectedDistrict}
            onChange={(e) => onDistrictChange(e.target.value)}
            className="w-full text-xs py-2 px-2.5 bg-[#FAF7F2] border parchment-border rounded-md text-[#2B231D] focus:ring-1 focus:ring-[#A84B24] focus:outline-none"
          >
            <option value="all">
              {selectedState && selectedState !== 'all' ? 'All Districts in State' : 'All Districts'}
            </option>
            {availableDistricts.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#7E7062] mb-1">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full text-xs py-2 px-2.5 bg-[#FAF7F2] border parchment-border rounded-md text-[#2B231D] focus:ring-1 focus:ring-[#A84B24] focus:outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Historical Period */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#7E7062] mb-1">
            Period / Era
          </label>
          <select
            value={selectedPeriod}
            onChange={(e) => onPeriodChange(e.target.value)}
            className="w-full text-xs py-2 px-2.5 bg-[#FAF7F2] border parchment-border rounded-md text-[#2B231D] focus:ring-1 focus:ring-[#A84B24] focus:outline-none"
          >
            {periods.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        {/* Dynasty */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#7E7062] mb-1">
            Dynasty
          </label>
          <select
            value={selectedDynasty}
            onChange={(e) => onDynastyChange(e.target.value)}
            className="w-full text-xs py-2 px-2.5 bg-[#FAF7F2] border parchment-border rounded-md text-[#2B231D] focus:ring-1 focus:ring-[#A84B24] focus:outline-none"
          >
            {dynasties.map((dyn) => (
              <option key={dyn.value} value={dyn.value}>
                {dyn.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Order */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#7E7062] mb-1 flex items-center gap-1">
            <ArrowUpDown className="w-3 h-3 text-[#A84B24]" />
            <span>Sort By</span>
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full text-xs py-2 px-2.5 bg-[#FAF7F2] border parchment-border rounded-md text-[#2B231D] focus:ring-1 focus:ring-[#A84B24] focus:outline-none font-medium"
          >
            <option value="name-asc">Artifact Name (A - Z)</option>
            <option value="name-desc">Artifact Name (Z - A)</option>
            <option value="age-oldest">Chronology (Oldest First)</option>
          </select>
        </div>

      </div>

    </div>
  );
};

export default FilterPanel;
