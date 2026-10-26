import React from 'react';
import { Search, X, RotateCcw, Filter, ArrowUpDown, Layers, Landmark, Calendar, Crown } from 'lucide-react';

const SearchFilters = ({
  states = [],
  districts = [],
  categories = [],
  searchQuery,
  onSearchChange,
  onSearchClear,
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
  hasActiveFilters,
  totalResults
}) => {

  const periods = [
    { value: 'all', label: 'All Historical Eras' },
    { value: 'Harappan', label: 'Indus Valley / Harappan (BCE)' },
    { value: 'Sangam', label: 'Sangam & Early Historic (BCE - CE)' },
    { value: 'Mauryan', label: 'Mauryan & Shunga Empire' },
    { value: 'Satavahana', label: 'Satavahana & Amaravati Epoch' },
    { value: 'Kushan', label: 'Kushan Empire Era' },
    { value: 'Gupta', label: 'Classical Gupta Golden Age' },
    { value: 'Pallava', label: 'Pallava Dynasty' },
    { value: 'Chalukya', label: 'Early Chalukyas of Vatapi' },
    { value: 'Rashtrakuta', label: 'Rashtrakuta Dynasty' },
    { value: 'Chola', label: 'Imperial Chola Golden Age' },
    { value: 'Pala', label: 'Pala Empire Golden Age' },
    { value: 'Chandella', label: 'Chandella Dynasty' },
    { value: 'Hoysala', label: 'Hoysala Golden Epoch' },
    { value: 'Kakatiya', label: 'Kakatiya Golden Epoch' },
    { value: 'Eastern Ganga', label: 'Eastern Ganga Golden Age' },
    { value: 'Vijayanagara', label: 'Vijayanagara Imperial Era' },
    { value: 'Ahom', label: 'Ahom Kingdom' },
    { value: 'Kadamba', label: 'Kadambas of Goa' },
    { value: 'Mewar', label: 'Mewar & Rajput Kingdoms' },
    { value: 'Travancore', label: 'Travancore Kingdom' }
  ];

  const dynasties = [
    { value: 'all', label: 'All Dynasties & Civilizations' },
    { value: 'Harappan', label: 'Harappan Civilization' },
    { value: 'Mauryan', label: 'Mauryan Dynasty' },
    { value: 'Chola', label: 'Chola Dynasty' },
    { value: 'Pandya', label: 'Pandyan Dynasty' },
    { value: 'Pallava', label: 'Pallava Dynasty' },
    { value: 'Chera', label: 'Chera Dynasty' },
    { value: 'Chalukya', label: 'Chalukya Dynasty' },
    { value: 'Rashtrakuta', label: 'Rashtrakuta Dynasty' },
    { value: 'Hoysala', label: 'Hoysala Dynasty' },
    { value: 'Vijayanagara', label: 'Vijayanagara / Tuluva' },
    { value: 'Satavahana', label: 'Satavahana Dynasty' },
    { value: 'Gupta', label: 'Gupta Dynasty' },
    { value: 'Kushan', label: 'Kushan Dynasty' },
    { value: 'Pala', label: 'Pala Dynasty' },
    { value: 'Eastern Ganga', label: 'Eastern Ganga Dynasty' },
    { value: 'Kakatiya', label: 'Kakatiya Dynasty' },
    { value: 'Ahom', label: 'Ahom Dynasty' },
    { value: 'Kadamba', label: 'Kadamba Dynasty' },
    { value: 'Sisodia', label: 'Sisodia Rajput of Mewar' },
    { value: 'Travancore', label: 'Kulasekharas of Travancore' }
  ];

  // District options filtered by selected state
  const availableDistricts = selectedState && selectedState !== 'all'
    ? districts.filter(d => (d.stateId || '').toLowerCase() === selectedState.toLowerCase())
    : districts;

  return (
    <div className="card-3d-parchment rounded-2xl p-5 sm:p-7 space-y-5 text-left">
      
      {/* Top Search Bar & Counter */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        
        {/* 3D Raised Search Input */}
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#D99A43]">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search artifacts by name, material, era, dynasty, or findspot..."
            className="w-full pl-10 pr-10 py-3 bg-[#FFF7E5] border border-[#E8D1A0] rounded-xl text-sm text-[#10283A] placeholder-[#526575]/60 focus:outline-none focus:border-[#D99A43] focus:ring-2 focus:ring-[#D99A43]/30 transition-all shadow-[inset_0_2px_4px_rgba(6,27,41,0.04),0_1px_2px_rgba(255,255,255,0.8)] font-body"
            aria-label="Search artifacts"
          />
          {searchQuery && (
            <button
              onClick={onSearchClear}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#526575] hover:text-[#D99A43] cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Results Counter & Reset Action */}
        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
          <div className="text-xs font-semibold px-3.5 py-2.5 rounded-xl bg-[#061B29] text-[#FFF7E5] border border-[#D99A43]/40 shadow-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D99A43] animate-pulse" />
            <span>{totalResults} {totalResults === 1 ? 'Artifact' : 'Artifacts'} Catalogued</span>
          </div>

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold bg-[#FFF7E5] border border-[#E8D1A0] text-[#A76529] hover:border-[#D99A43] hover:text-[#061B29] transition-all shadow-sm cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>

      </div>

      {/* Dimensional 5-Dropdown Filter Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        
        {/* 1. State Filter */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-[#10283A] uppercase tracking-wider flex items-center gap-1">
            <Landmark className="w-3 h-3 text-[#D99A43]" />
            <span>State</span>
          </label>
          <select
            value={selectedState}
            onChange={(e) => onStateChange(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-[#FFF7E5] border border-[#E8D1A0] rounded-xl text-[#10283A] focus:outline-none focus:border-[#D99A43] focus:ring-1 focus:ring-[#D99A43] transition-all cursor-pointer shadow-sm"
          >
            <option value="all">All States (15)</option>
            {states.map((st) => (
              <option key={st.id} value={st.id}>
                {st.name}
              </option>
            ))}
          </select>
        </div>

        {/* 2. District Filter */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-[#10283A] uppercase tracking-wider flex items-center gap-1">
            <Filter className="w-3 h-3 text-[#D99A43]" />
            <span>District</span>
          </label>
          <select
            value={selectedDistrict}
            onChange={(e) => onDistrictChange(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-[#FFF7E5] border border-[#E8D1A0] rounded-xl text-[#10283A] focus:outline-none focus:border-[#D99A43] focus:ring-1 focus:ring-[#D99A43] transition-all cursor-pointer shadow-sm"
          >
            <option value="all">
              {selectedState && selectedState !== 'all' ? 'All Districts in State' : 'All Districts (78)'}
            </option>
            {availableDistricts.map((dst) => (
              <option key={dst.id} value={dst.id}>
                {dst.name}
              </option>
            ))}
          </select>
        </div>

        {/* 3. Category Filter */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-[#10283A] uppercase tracking-wider flex items-center gap-1">
            <Layers className="w-3 h-3 text-[#D99A43]" />
            <span>Category</span>
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-[#FFF7E5] border border-[#E8D1A0] rounded-xl text-[#10283A] focus:outline-none focus:border-[#D99A43] focus:ring-1 focus:ring-[#D99A43] transition-all cursor-pointer shadow-sm"
          >
            <option value="all">All Categories (10)</option>
            {categories.map((cat) => (
              <option key={cat.id || cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* 4. Historical Period Filter */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-[#10283A] uppercase tracking-wider flex items-center gap-1">
            <Calendar className="w-3 h-3 text-[#D99A43]" />
            <span>Era / Period</span>
          </label>
          <select
            value={selectedPeriod}
            onChange={(e) => onPeriodChange(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-[#FFF7E5] border border-[#E8D1A0] rounded-xl text-[#10283A] focus:outline-none focus:border-[#D99A43] focus:ring-1 focus:ring-[#D99A43] transition-all cursor-pointer shadow-sm"
          >
            {periods.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        {/* 5. Dynasty Filter */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-[#10283A] uppercase tracking-wider flex items-center gap-1">
            <Crown className="w-3 h-3 text-[#D99A43]" />
            <span>Dynasty</span>
          </label>
          <select
            value={selectedDynasty}
            onChange={(e) => onDynastyChange(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-[#FFF7E5] border border-[#E8D1A0] rounded-xl text-[#10283A] focus:outline-none focus:border-[#D99A43] focus:ring-1 focus:ring-[#D99A43] transition-all cursor-pointer shadow-sm"
          >
            {dynasties.map((dyn) => (
              <option key={dyn.value} value={dyn.value}>
                {dyn.label}
              </option>
            ))}
          </select>
        </div>

        {/* 6. Sorting Filter */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-[#10283A] uppercase tracking-wider flex items-center gap-1">
            <ArrowUpDown className="w-3 h-3 text-[#D99A43]" />
            <span>Sort By</span>
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-[#FFF7E5] border border-[#E8D1A0] rounded-xl text-[#10283A] focus:outline-none focus:border-[#D99A43] focus:ring-1 focus:ring-[#D99A43] transition-all cursor-pointer shadow-sm"
          >
            <option value="name-asc">Name (A to Z)</option>
            <option value="name-desc">Name (Z to A)</option>
            <option value="id-asc">Accession ID (Ascending)</option>
            <option value="id-desc">Accession ID (Descending)</option>
            <option value="era-oldest">Chronology (Oldest First)</option>
          </select>
        </div>

      </div>

    </div>
  );
};

export default SearchFilters;
