import React, { useState, useEffect } from 'react';
import { Search, Landmark } from 'lucide-react';
import StateCard from '../components/StateCard';
import Breadcrumbs from '../components/Breadcrumbs';
import TempleIllustration from '../components/TempleIllustration';
import { artifactService } from '../services/api';

const States = () => {
  const [states, setStates] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStates = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await artifactService.getStates();
      // Ensure we read states array from response or response.data
      const statesArray = Array.isArray(response)
        ? response
        : (Array.isArray(response?.data) ? response.data : []);
      setStates(statesArray);
    } catch (err) {
      setError(err.message || 'Failed to load states from archive');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStates();
  }, []);

  const filteredStates = states.filter((s) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    const nameStr = (s.name || s.state_name || '').toLowerCase();
    const descStr = (s.description || '').toLowerCase();
    return nameStr.includes(q) || descStr.includes(q);
  });

  return (
    <div className="w-full flex flex-col">
      
      {/* 1. DARK CINEMATIC HEADER WITH GOLD HERITAGE MOTIFS */}
      <section className="relative bg-[#061B29] text-[#FFF7E5] py-12 lg:py-16 px-4 sm:px-6 lg:px-8 border-b border-[#D99A43]/30 overflow-hidden">
        
        {/* Heritage Pattern Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#D99A43_1px,transparent_1px)] [background-size:28px_28px]" />

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4 text-left">
              
              {/* Working Breadcrumbs */}
              <Breadcrumbs 
                theme="dark" 
                items={[{ label: 'Indian States' }]} 
              />

              {/* Title & Accent */}
              <div>
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#D99A43] block mb-1">
                  Geographical Heritage Index
                </span>
                <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FFF7E5]">
                  Indian States & Their Heritage
                </h1>
              </div>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-[#FFF7E5]/80 max-w-2xl leading-relaxed font-body">
                Discover the rich cultural and historical heritage of India's states.
                Each state holds unique stories, art forms, sacred architectures, and ancient artifacts.
              </p>

              {/* 3D Quick Search Input */}
              <div className="pt-2 max-w-md">
                <div className="relative">
                  <Search className="w-4 h-4 text-[#D99A43] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search states (e.g., Tamil Nadu, Rajasthan, Odisha)..."
                    className="w-full pl-10 pr-4 py-2.5 bg-[#082C35] border border-[#D99A43]/50 rounded-full text-xs text-[#FFF7E5] placeholder-[#FFF7E5]/50 focus:outline-none focus:ring-2 focus:ring-[#D99A43]/40 shadow-inner"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#FFF7E5]/60 hover:text-[#D99A43]"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

            </div>

            {/* Right Side: Gold Temple Architectural Line Art */}
            <div className="lg:col-span-4 hidden lg:flex justify-end">
              <div className="relative w-full max-w-[280px] p-4 rounded-2xl bg-[#082C35]/60 border border-[#D99A43]/30 shadow-xl backdrop-blur-sm">
                <TempleIllustration className="w-full max-w-[260px]" />
                <div className="text-center text-[11px] font-mono text-[#D99A43] mt-2">
                  15 Historical States • 78 Districts
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. WARM IVORY CONTENT AREA WITH 4-COLUMN RESPONSIVE GRID */}
      <section className="bg-[#FFF7E5] py-14 px-4 sm:px-6 lg:px-8 min-h-[50vh]">
        <div className="max-w-7xl mx-auto space-y-6">
          
          <div className="flex items-center justify-between border-b border-[#E8D1A0] pb-4">
            <h2 className="font-heading text-xl font-bold text-[#10283A] flex items-center gap-2">
              <Landmark className="w-5 h-5 text-[#D99A43]" />
              <span>States Directory ({filteredStates.length} of {states.length})</span>
            </h2>
            <span className="text-xs text-[#526575]">
              Click any state card to explore its districts
            </span>
          </div>

          {loading ? (
            <div className="text-center py-20 flex flex-col items-center justify-center gap-3 text-[#526575]">
              <div className="w-10 h-10 rounded-full border-3 border-[#E8D1A0] border-t-[#D99A43] animate-spin" />
              <span className="text-sm font-medium font-body">Loading states from digital archive...</span>
            </div>
          ) : error ? (
            <div className="max-w-md mx-auto my-12 p-8 card-3d-parchment rounded-2xl text-center space-y-3">
              <Landmark className="w-10 h-10 text-amber-500 mx-auto" />
              <p className="font-heading text-lg font-bold text-[#10283A]">
                Unable to Load States
              </p>
              <p className="text-xs text-[#526575]">
                {error}
              </p>
              <button
                onClick={fetchStates}
                className="btn-gold-3d px-4 py-2 text-xs inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Retry Connection</span>
              </button>
            </div>
          ) : filteredStates.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredStates.map((state) => (
                <StateCard key={state.id} state={state} />
              ))}
            </div>
          ) : (
            <div className="max-w-md mx-auto my-12 p-8 card-3d-parchment rounded-2xl text-center space-y-3">
              <p className="font-heading text-lg font-bold text-[#10283A]">
                No States Match "{searchQuery}"
              </p>
              <p className="text-xs text-[#526575]">
                Try searching by state name or region.
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="btn-gold-3d px-4 py-2 text-xs"
              >
                Clear Search
              </button>
            </div>
          )}

        </div>
      </section>

    </div>
  );
};

export default States;
