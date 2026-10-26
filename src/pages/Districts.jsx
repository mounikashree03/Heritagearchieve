import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search, 
  ChevronRight,
  Landmark,
  MapPin,
  Filter
} from 'lucide-react';
import DistrictCard from '../components/DistrictCard';
import Breadcrumbs from '../components/Breadcrumbs';
import TempleIllustration from '../components/TempleIllustration';
import { artifactService } from '../services/api';

const Districts = () => {
  const { stateId: paramStateId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const activeStateId = paramStateId || searchParams.get('stateId') || 'tamil-nadu';

  const [currentState, setCurrentState] = useState(null);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [allStates, stateInfo, stateDistricts] = await Promise.all([
        artifactService.getStates(),
        artifactService.getState(activeStateId),
        artifactService.getDistricts(activeStateId)
      ]);

      setStates(allStates || []);
      setCurrentState(stateInfo || (allStates && allStates.find(s => s.id === activeStateId)) || (allStates && allStates[0]) || null);
      setDistricts(stateDistricts || []);
    } catch (err) {
      setError(err.message || 'Failed to load districts from archive');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeStateId]);

  const handleStateChange = (newId) => {
    navigate(`/states/${newId}/districts`);
  };

  const filteredDistricts = districts.filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (d.description && d.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const stateDisplayName = currentState ? currentState.name : 'Tamil Nadu';

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
              
              {/* Header Top: Breadcrumb & Back to States Button */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <Breadcrumbs
                  theme="dark"
                  items={[
                    { label: 'States', to: '/states' },
                    { label: stateDisplayName }
                  ]}
                />

                <Link
                  to="/states"
                  className="btn-dark-3d !px-4 !py-1.5 !text-xs inline-flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to States</span>
                </Link>
              </div>

              {/* Title */}
              <div>
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#D99A43] block mb-1">
                  Regional Archaeological Map
                </span>
                <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FFF7E5]">
                  {stateDisplayName} Districts
                </h1>
              </div>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-[#FFF7E5]/80 max-w-2xl leading-relaxed font-body">
                Explore the historical districts of {stateDisplayName}. Discover their ancient temples, monuments, excavations, and catalogued museum artifacts.
              </p>

              {/* Controls: State Switcher & Search */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 max-w-xl">
                
                {/* State Quick Switcher Dropdown */}
                <div className="sm:w-56 shrink-0">
                  <select
                    value={activeStateId}
                    onChange={(e) => handleStateChange(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#082C35] border border-[#D99A43]/50 rounded-full text-[#FFF7E5] focus:outline-none focus:ring-1 focus:ring-[#D99A43] cursor-pointer"
                  >
                    {states.map((st) => (
                      <option key={st.id} value={st.id} className="bg-[#061B29] text-[#FFF7E5]">
                        {st.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* District Search Input */}
                <div className="relative flex-grow">
                  <Search className="w-4 h-4 text-[#D99A43] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Search districts in ${stateDisplayName}...`}
                    className="w-full pl-10 pr-4 py-2 bg-[#082C35] border border-[#D99A43]/50 rounded-full text-xs text-[#FFF7E5] placeholder-[#FFF7E5]/50 focus:outline-none focus:ring-1 focus:ring-[#D99A43]"
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

            {/* Right Side: Architectural Temple Line Art */}
            <div className="lg:col-span-4 hidden lg:flex justify-end">
              <div className="relative w-full max-w-[280px] p-4 rounded-2xl bg-[#082C35]/60 border border-[#D99A43]/30 shadow-xl backdrop-blur-sm text-center">
                <TempleIllustration className="w-full max-w-[240px] mx-auto" />
                <div className="text-xs font-heading font-bold text-[#F2B34F] mt-2">
                  {districts.length} Historical Districts
                </div>
                <div className="text-[11px] text-[#FFF7E5]/70 font-mono">
                  {currentState?.artifactCount || 10}+ Artifacts Documented
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. WARM IVORY CONTENT AREA WITH RESPONSIVE DISTRICT CARDS */}
      <section className="bg-[#FFF7E5] py-14 px-4 sm:px-6 lg:px-8 min-h-[50vh]">
        <div className="max-w-7xl mx-auto space-y-6">
          
          <div className="flex items-center justify-between border-b border-[#E8D1A0] pb-4">
            <h2 className="font-heading text-xl font-bold text-[#10283A] flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#D99A43]" />
              <span>Districts in {stateDisplayName} ({filteredDistricts.length})</span>
            </h2>
            <Link
              to={`/artifacts?stateId=${activeStateId}`}
              className="text-xs font-semibold text-[#10283A] hover:text-[#D99A43] transition-colors inline-flex items-center gap-1"
            >
              <span>View All {stateDisplayName} Artifacts</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#D99A43]" />
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-20 flex flex-col items-center justify-center gap-3 text-[#526575]">
              <div className="w-10 h-10 rounded-full border-3 border-[#E8D1A0] border-t-[#D99A43] animate-spin" />
              <span className="text-sm font-medium font-body">Loading districts from digital archives...</span>
            </div>
          ) : error ? (
            <div className="max-w-md mx-auto my-12 p-8 card-3d-parchment rounded-2xl text-center space-y-3">
              <MapPin className="w-10 h-10 text-amber-500 mx-auto" />
              <p className="font-heading text-lg font-bold text-[#10283A]">
                Unable to Load Districts
              </p>
              <p className="text-xs text-[#526575]">
                {error}
              </p>
              <button
                onClick={fetchData}
                className="btn-gold-3d px-4 py-2 text-xs inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Retry Connection</span>
              </button>
            </div>
          ) : filteredDistricts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDistricts.map((district) => (
                <DistrictCard
                  key={district.id}
                  district={district}
                  stateName={stateDisplayName}
                />
              ))}
            </div>
          ) : (
            <div className="max-w-md mx-auto my-12 p-8 card-3d-parchment rounded-2xl text-center space-y-3">
              <p className="font-heading text-lg font-bold text-[#10283A]">
                No Districts Match "{searchQuery}"
              </p>
              <p className="text-xs text-[#526575]">
                Try checking the spelling or selecting another state.
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

export default Districts;
