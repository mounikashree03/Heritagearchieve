import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  ChevronRight,
  ChevronLeft,
  Compass,
  Layers,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import ArtifactCard from '../components/ArtifactCard';
import SearchFilters from '../components/SearchFilters';
import Breadcrumbs from '../components/Breadcrumbs';
import TempleIllustration from '../components/TempleIllustration';
import { artifactService } from '../services/api';

const PAGE_SIZE = 12;

const Artifacts = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [periods, setPeriods] = useState([]);
  
  // Results & Pagination
  const [artifacts, setArtifacts] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Filter criteria states
  const [selectedState, setSelectedState] = useState(searchParams.get('stateId') || 'all');
  const [selectedDistrict, setSelectedDistrict] = useState(searchParams.get('districtId') || 'all');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedPeriod, setSelectedPeriod] = useState(searchParams.get('period') || 'all');
  const [selectedDynasty, setSelectedDynasty] = useState(searchParams.get('dynasty') || 'all');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState('name-asc');

  // Load static taxonomy metadata
  useEffect(() => {
    const loadMetadata = async () => {
      const [allStates, allDistricts, allCats, allPeriods] = await Promise.all([
        artifactService.getStates(),
        artifactService.getDistricts(selectedState !== 'all' ? selectedState : null),
        artifactService.getCategories(),
        artifactService.getHistoricalPeriods()
      ]);
      setStates(allStates);
      setDistricts(allDistricts);
      setCategories(allCats);
      setPeriods(allPeriods);
    };
    loadMetadata();
  }, [selectedState]);

  // Sync state if URL query params change
  useEffect(() => {
    if (searchParams.get('stateId')) setSelectedState(searchParams.get('stateId'));
    if (searchParams.get('districtId')) setSelectedDistrict(searchParams.get('districtId'));
    if (searchParams.get('category')) setSelectedCategory(searchParams.get('category'));
    if (searchParams.get('period')) setSelectedPeriod(searchParams.get('period'));
    if (searchParams.get('dynasty')) setSelectedDynasty(searchParams.get('dynasty'));
    if (searchParams.get('search')) setSearchQuery(searchParams.get('search'));
  }, [searchParams]);

  const [error, setError] = useState(null);

  // Query artifacts whenever criteria change
  const fetchArtifacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await artifactService.getArtifacts({
        stateId: selectedState,
        districtId: selectedDistrict,
        category: selectedCategory,
        historicalPeriod: selectedPeriod,
        dynasty: selectedDynasty,
        search: searchQuery,
        sortBy: sortBy,
        page: page,
        pageSize: PAGE_SIZE
      });

      setArtifacts(res.items || []);
      setTotalResults(res.totalCount || 0);
    } catch (err) {
      setError(err.message || 'Failed to fetch artifacts');
      setArtifacts([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtifacts();
  }, [selectedState, selectedDistrict, selectedCategory, selectedPeriod, selectedDynasty, searchQuery, sortBy, page]);

  // Handle URL updates on filter changes
  const updateParams = (newParams) => {
    const updated = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, val]) => {
      if (!val || val === 'all') {
        updated.delete(key);
      } else {
        updated.set(key, val);
      }
    });
    setSearchParams(updated);
    setPage(1);
  };

  const handleStateChange = (val) => {
    setSelectedState(val);
    setSelectedDistrict('all');
    updateParams({ stateId: val, districtId: 'all' });
  };

  const handleDistrictChange = (val) => {
    setSelectedDistrict(val);
    updateParams({ districtId: val });
  };

  const handleCategoryChange = (val) => {
    setSelectedCategory(val);
    updateParams({ category: val });
  };

  const handlePeriodChange = (val) => {
    setSelectedPeriod(val);
    updateParams({ period: val });
  };

  const handleDynastyChange = (val) => {
    setSelectedDynasty(val);
    updateParams({ dynasty: val });
  };

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    updateParams({ search: val });
  };

  const handleSearchClear = () => {
    setSearchQuery('');
    updateParams({ search: '' });
  };

  const handleResetFilters = () => {
    setSelectedState('all');
    setSelectedDistrict('all');
    setSelectedCategory('all');
    setSelectedPeriod('all');
    setSelectedDynasty('all');
    setSearchQuery('');
    setSortBy('name-asc');
    setSearchParams(new URLSearchParams());
    setPage(1);
  };

  const hasActiveFilters = 
    selectedState !== 'all' || 
    selectedDistrict !== 'all' || 
    selectedCategory !== 'all' || 
    selectedPeriod !== 'all' || 
    selectedDynasty !== 'all' || 
    searchQuery.trim() !== '';

  const totalPages = Math.ceil(totalResults / PAGE_SIZE) || 1;

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  return (
    <div className="w-full flex flex-col">
      
      {/* 1. DARK CINEMATIC HERO HEADER */}
      <section className="relative bg-[#061B29] text-[#FFF7E5] py-12 lg:py-16 px-4 sm:px-6 lg:px-8 border-b border-[#D99A43]/30 overflow-hidden">
        
        {/* Heritage Pattern Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#D99A43_1px,transparent_1px)] [background-size:28px_28px]" />

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4 text-left">
              
              <Breadcrumbs 
                theme="dark" 
                items={[{ label: 'Explore Artifacts' }]} 
              />

              <div>
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#D99A43] block mb-1">
                  National Digital Repository
                </span>
                <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FFF7E5]">
                  Explore India's Ancient Artifacts
                </h1>
              </div>

              <p className="text-sm sm:text-base text-[#FFF7E5]/80 max-w-2xl leading-relaxed font-body">
                Browse our comprehensive catalog of 68+ meticulously documented artifacts spanning stone sculptures, ancient coins, temple epigraphs, palm-leaf manuscripts, and historical regalia.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-[#FFF7E5]/75">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#082C35] border border-[#D99A43]/40">
                  <span className="w-2 h-2 rounded-full bg-[#D99A43]" />
                  68 Historical Records
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#082C35] border border-[#D99A43]/40">
                  <span className="w-2 h-2 rounded-full bg-[#F2B34F]" />
                  15 States & 78 Districts
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#082C35] border border-[#D99A43]/40">
                  <span className="w-2 h-2 rounded-full bg-[#A76529]" />
                  10 Heritage Categories
                </span>
              </div>

            </div>

            {/* Right Side: Architectural Line Art */}
            <div className="lg:col-span-4 hidden lg:flex justify-end">
              <div className="relative w-full max-w-[280px] p-4 rounded-2xl bg-[#082C35]/60 border border-[#D99A43]/30 shadow-xl backdrop-blur-sm text-center">
                <TempleIllustration className="w-full max-w-[240px] mx-auto" />
                <div className="text-xs font-heading font-bold text-[#F2B34F] mt-2">
                  Digital Museum Catalog
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. CATALOG CONTENT AREA */}
      <section className="bg-[#FFF7E5] py-12 px-4 sm:px-6 lg:px-8 min-h-[60vh]">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* 3D Search & Filter Controls */}
          <SearchFilters
            states={states}
            districts={districts}
            categories={categories}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onSearchClear={handleSearchClear}
            selectedState={selectedState}
            selectedDistrict={selectedDistrict}
            selectedCategory={selectedCategory}
            selectedPeriod={selectedPeriod}
            selectedDynasty={selectedDynasty}
            sortBy={sortBy}
            onStateChange={handleStateChange}
            onDistrictChange={handleDistrictChange}
            onCategoryChange={handleCategoryChange}
            onPeriodChange={handlePeriodChange}
            onDynastyChange={handleDynastyChange}
            onSortChange={(val) => setSortBy(val)}
            onResetFilters={handleResetFilters}
            hasActiveFilters={hasActiveFilters}
            totalResults={totalResults}
          />

          {/* Results Grid / Loading / Error / Empty States */}
          {loading ? (
            <div className="text-center py-24 flex flex-col items-center justify-center gap-3 text-[#526575]">
              <div className="w-10 h-10 rounded-full border-3 border-[#E8D1A0] border-t-[#D99A43] animate-spin" />
              <span className="text-sm font-medium font-body">Loading artifacts from museum database...</span>
            </div>
          ) : error ? (
            <div className="max-w-md mx-auto my-14 p-8 card-3d-parchment rounded-2xl text-center space-y-4">
              <Compass className="w-12 h-12 text-amber-500 mx-auto opacity-80" />
              <h3 className="font-heading text-xl font-bold text-[#10283A]">
                Unable to Load Artifacts
              </h3>
              <p className="text-xs text-[#526575] leading-relaxed">
                {error}
              </p>
              <button
                onClick={fetchArtifacts}
                className="btn-gold-3d px-5 py-2.5 text-xs inline-flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry Query</span>
              </button>
            </div>
          ) : artifacts.length > 0 ? (
            <div className="space-y-10">
              
              {/* Responsive 4-Column Grid of 3D Artifact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {artifacts.map((artifact) => (
                  <ArtifactCard key={artifact.id} artifact={artifact} />
                ))}
              </div>

              {/* Working 3D Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[#E8D1A0]">
                  <div className="text-xs text-[#526575] font-medium">
                    Showing <span className="font-semibold text-[#10283A]">{(page - 1) * PAGE_SIZE + 1}</span> to{' '}
                    <span className="font-semibold text-[#10283A]">{Math.min(page * PAGE_SIZE, totalResults)}</span> of{' '}
                    <span className="font-semibold text-[#10283A]">{totalResults}</span> artifacts
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Previous Button */}
                    <button
                      onClick={() => handlePageChange(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="px-3 py-2 rounded-xl text-xs font-semibold bg-[#F8EFD9] border border-[#E8D1A0] text-[#10283A] hover:border-[#D99A43] disabled:opacity-40 disabled:pointer-events-none transition-all inline-flex items-center gap-1 shadow-sm cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Previous</span>
                    </button>

                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pNum) => (
                      <button
                        key={pNum}
                        onClick={() => handlePageChange(pNum)}
                        className={`w-9 h-9 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          page === pNum
                            ? 'btn-gold-3d text-[#061B29] !shadow-[0_2px_8px_rgba(217,154,67,0.4)]'
                            : 'bg-[#F8EFD9] border border-[#E8D1A0] text-[#10283A] hover:border-[#D99A43] shadow-sm'
                        }`}
                      >
                        {pNum}
                      </button>
                    ))}

                    {/* Next Button */}
                    <button
                      onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                      className="px-3 py-2 rounded-xl text-xs font-semibold bg-[#F8EFD9] border border-[#E8D1A0] text-[#10283A] hover:border-[#D99A43] disabled:opacity-40 disabled:pointer-events-none transition-all inline-flex items-center gap-1 shadow-sm cursor-pointer"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="max-w-md mx-auto my-14 p-8 card-3d-parchment rounded-2xl text-center space-y-4">
              <Compass className="w-12 h-12 text-[#D99A43] mx-auto opacity-70" />
              <h3 className="font-heading text-xl font-bold text-[#10283A]">
                No Artifacts Match Your Filter
              </h3>
              <p className="text-xs text-[#526575] leading-relaxed">
                Try clearing some of your filter criteria or searching with a broader query.
              </p>
              <button
                onClick={handleResetFilters}
                className="btn-gold-3d px-5 py-2.5 text-xs inline-flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}

        </div>
      </section>

    </div>
  );
};

export default Artifacts;
