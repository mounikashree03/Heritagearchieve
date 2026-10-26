import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Landmark, 
  MapPin, 
  Layers, 
  ArrowRight, 
  Crown,
  ChevronRight,
  Sparkles,
  Compass
} from 'lucide-react';
import TempleIllustration from '../components/TempleIllustration';
import ThreeDCard from '../components/ThreeDCard';
import GoldButton from '../components/GoldButton';
import Timeline from '../components/Timeline';
import { 
  NatarajaIcon, 
  RomanCoinIcon, 
  StupaReliefIcon, 
  PalmLeafIcon, 
  InscriptionIcon, 
  PotteryIcon, 
  JewelleryIcon, 
  WeaponIcon, 
  SealIcon,
  TempleSmallIcon,
  getArtifactHeritageIcon
} from '../components/HeritageIcons';
import { artifactService } from '../services/api';

// 9 Categories matching the reference screenshot exactly
const categoryDisplayList = [
  { name: 'Sculptures', query: 'Sculptures and Bronze Icons', icon: NatarajaIcon },
  { name: 'Coins', query: 'Ancient Coins', icon: RomanCoinIcon },
  { name: 'Pottery', query: 'Pottery and Ceramics', icon: PotteryIcon },
  { name: 'Inscriptions', query: 'Temple Inscriptions', icon: InscriptionIcon },
  { name: 'Jewellery', query: 'Jewellery and Ornaments', icon: JewelleryIcon },
  { name: 'Weapons', query: 'Historical Weapons and Tools', icon: WeaponIcon },
  { name: 'Manuscripts', query: 'Manuscripts and Palm-Leaf Records', icon: PalmLeafIcon },
  { name: 'Architectural Fragments', query: 'Architectural Fragments', icon: TempleSmallIcon },
  { name: 'Ritual Objects', query: 'Ritual Objects', icon: SealIcon },
];

// Top 10 Preview States matching the reference screenshot
const homeStatesPreview = [
  { id: 'tamil-nadu', name: 'Tamil Nadu', count: 12, subtitle: 'Chola temples & rich culture' },
  { id: 'kerala', name: 'Kerala', count: 8, subtitle: 'Backwaters & ancient trade' },
  { id: 'karnataka', name: 'Karnataka', count: 10, subtitle: 'Hampi & royal heritage' },
  { id: 'andhra-pradesh', name: 'Andhra Pradesh', count: 9, subtitle: 'Buddhist & temple art' },
  { id: 'telangana', name: 'Telangana', count: 6, subtitle: 'Kakatiya & medieval art' },
  { id: 'maharashtra', name: 'Maharashtra', count: 8, subtitle: 'Caves & fort heritage' },
  { id: 'odisha', name: 'Odisha', count: 7, subtitle: 'Temple architecture' },
  { id: 'rajasthan', name: 'Rajasthan', count: 5, subtitle: 'Royal & desert culture' },
  { id: 'gujarat', name: 'Gujarat', count: 6, subtitle: 'Trade & craftsmanship' },
  { id: 'madhya-pradesh', name: 'Madhya Pradesh', count: 7, subtitle: 'Stupas & ancient cities' }
];

const Home = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ artifactsCount: 68, statesCount: 15, districtsCount: 78, categoriesCount: 10 });
  const [featuredArtifacts, setFeaturedArtifacts] = useState([]);
  const [states, setStates] = useState([]);
  const [imgError, setImgError] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const loadHomeData = async () => {
      const [statsData, featData, statesData] = await Promise.all([
        artifactService.getStatistics(),
        artifactService.getFeaturedArtifacts(4),
        artifactService.getStates()
      ]);

      if (statsData) setStats(statsData);
      if (featData && featData.length > 0) {
        setFeaturedArtifacts(featData);
      }
      if (statesData && statesData.length > 0) {
        setStates(statesData);
      }
    };
    loadHomeData();
  }, []);

  // Subtle hero parallax
  const handleHeroMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = ((clientX - left) / width - 0.5) * 15;
    const y = ((clientY - top) / height - 0.5) * 15;
    setMousePos({ x, y });
  };

  const getFeaturedDisplayData = (item) => {
    if (item.id === 'HA-TN-001') {
      return {
        title: 'Chola Bronze Nataraja',
        type: 'Sculpture',
        dynasty: 'Chola Dynasty',
        location: 'Tamil Nadu • Thanjavur'
      };
    }
    if (item.id === 'HA-TN-014' || item.id === 'HA-KL-002') {
      return {
        title: 'Ancient Roman Coin',
        type: 'Coin',
        dynasty: 'Roman Period',
        location: 'Kerala • Malappuram'
      };
    }
    if (item.id === 'HA-AP-001') {
      return {
        title: 'Amaravati Stupa Relief',
        type: 'Sculpture',
        dynasty: 'Satavahana Period',
        location: 'Andhra Pradesh • Guntur'
      };
    }
    if (item.id === 'HA-TN-003') {
      return {
        title: 'Palm Leaf Manuscript',
        type: 'Manuscript',
        dynasty: 'Medieval Period',
        location: 'Tamil Nadu • Kanchipuram'
      };
    }
    return {
      title: item.name,
      type: item.category ? item.category.split(' ')[0] : 'Artifact',
      dynasty: item.dynasty || item.historicalPeriod || 'Classical',
      location: `${item.state} • ${item.district}`
    };
  };

  return (
    <div className="flex flex-col w-full">
      
      {/* ============================================================== */}
      {/* 1. IMMERSIVE 3D HERO SECTION (Midnight Navy & Deep Teal)       */}
      {/* ============================================================== */}
      <section 
        onMouseMove={handleHeroMouseMove}
        className="relative bg-gradient-to-b from-[#061B29] via-[#082C35] to-[#061B29] text-[#FFF7E5] pt-14 pb-16 lg:pt-20 lg:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden select-none"
      >
        {/* Heritage Pattern Dark Wallpaper */}
        <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(#D99A43_1px,transparent_1px)] [background-size:32px_32px]" />
        
        {/* Ambient Sunset Lighting & Vignette */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(242,179,79,0.18)_0%,rgba(217,154,67,0.06)_50%,transparent_75%)] pointer-events-none blur-2xl" />

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div 
              className="lg:col-span-7 space-y-6 text-left"
              style={{
                transform: `translate3d(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px, 0)`,
                transition: 'transform 0.2s ease-out'
              }}
            >
              
              {/* Eyebrow Label with Indian Heritage Line */}
              <div className="inline-flex items-center gap-3">
                <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#D99A43]">
                  India's Timeless Treasures
                </span>
                <span className="h-[1px] w-12 bg-gradient-to-r from-[#D99A43] to-transparent" />
              </div>

              {/* Exact Hero Title */}
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.12] text-[#FFF7E5]">
                Explore India’s<br />
                <span className="text-gold-bright">Ancient Heritage</span>
              </h1>

              {/* Exact Subtitle */}
              <p className="font-body text-base sm:text-lg text-[#FFF7E5]/85 leading-relaxed max-w-xl font-normal">
                Discover the stories, civilizations, and craftsmanship behind India's timeless treasures.
              </p>

              {/* 3D Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <GoldButton
                  to="/artifacts"
                  variant="primary"
                  size="md"
                  icon={ArrowRight}
                  iconPosition="right"
                  className="!px-7 !py-3.5"
                >
                  Explore Artifacts
                </GoldButton>

                <GoldButton
                  to="/states"
                  variant="secondary"
                  size="md"
                  className="!px-7 !py-3.5"
                >
                  Browse by State
                </GoldButton>
              </div>

            </div>

            {/* Right Side: Detailed Temple Artwork with 3D Depth & Sunset Glow */}
            <div 
              className="lg:col-span-5 flex justify-center lg:justify-end"
              style={{
                transform: `perspective(1000px) rotateY(${-mousePos.x * 0.5}deg) rotateX(${mousePos.y * 0.5}deg) translate3d(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px, 20px)`,
                transition: 'transform 0.2s ease-out'
              }}
            >
              <div className="relative w-full max-w-[480px] rounded-3xl overflow-hidden border-2 border-[#D99A43]/60 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(217,154,67,0.35)] group">
                
                {/* Visual Artwork */}
                {!imgError ? (
                  <img
                    src="/hero_temple_sunset.jpg"
                    alt="Indian Ancient Temple Architecture Sunset"
                    onError={() => setImgError(true)}
                    className="w-full h-auto max-h-[400px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <TempleIllustration className="w-full max-h-[400px]" />
                )}

                {/* Ambient Sunset Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#061B29] via-transparent to-transparent pointer-events-none opacity-80" />
                <div className="absolute inset-0 border border-[#F2B34F]/30 rounded-3xl pointer-events-none" />

                {/* Decorative Bottom Corner Label */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#FFF7E5]/90 bg-[#061B29]/80 backdrop-blur-md px-4 py-2 rounded-xl border border-[#D99A43]/40">
                  <span className="font-heading font-semibold text-[#F2B34F]">Sacred Architecture</span>
                  <span className="text-[11px] font-mono text-[#D99A43]">Vedic to Classical</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. DIMENSIONAL STATISTICS STRIP                                */}
      {/* ============================================================== */}
      <section className="bg-[#082C35] border-y border-[#D99A43]/30 py-6 px-4 sm:px-6 lg:px-8 shadow-lg relative z-20">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
          
          {/* Stat 1: States */}
          <div className="stat-pill-3d p-4 flex items-center justify-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-[#061B29] border border-[#D99A43]/50 flex items-center justify-center text-[#D99A43] shrink-0 shadow-sm">
              <Landmark className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div>
              <div className="font-heading text-2xl sm:text-3xl font-bold text-[#FFF7E5]">
                {stats.statesCount || 15}
              </div>
              <div className="text-xs text-[#FFF7E5]/75 font-medium">
                States
              </div>
            </div>
          </div>

          {/* Stat 2: Districts */}
          <div className="stat-pill-3d p-4 flex items-center justify-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-[#061B29] border border-[#D99A43]/50 flex items-center justify-center text-[#D99A43] shrink-0 shadow-sm">
              <MapPin className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div>
              <div className="font-heading text-2xl sm:text-3xl font-bold text-[#FFF7E5]">
                {stats.districtsCount || 78}
              </div>
              <div className="text-xs text-[#FFF7E5]/75 font-medium">
                Districts
              </div>
            </div>
          </div>

          {/* Stat 3: Artifacts */}
          <div className="stat-pill-3d p-4 flex items-center justify-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-[#061B29] border border-[#D99A43]/50 flex items-center justify-center text-[#D99A43] shrink-0 shadow-sm">
              <Crown className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div>
              <div className="font-heading text-2xl sm:text-3xl font-bold text-[#FFF7E5]">
                {stats.artifactsCount >= 60 ? `${stats.artifactsCount}+` : '62+'}
              </div>
              <div className="text-xs text-[#FFF7E5]/75 font-medium">
                Artifacts
              </div>
            </div>
          </div>

          {/* Stat 4: Categories */}
          <div className="stat-pill-3d p-4 flex items-center justify-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-[#061B29] border border-[#D99A43]/50 flex items-center justify-center text-[#D99A43] shrink-0 shadow-sm">
              <Sparkles className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div>
              <div className="font-heading text-2xl sm:text-3xl font-bold text-[#FFF7E5]">
                {stats.categoriesCount || 10}
              </div>
              <div className="text-xs text-[#FFF7E5]/75 font-medium">
                Categories
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. FEATURED ARTIFACTS SECTION (Warm Ivory #FFF7E5 Background)  */}
      {/* ============================================================== */}
      <section className="bg-[#FFF7E5] py-16 px-4 sm:px-6 lg:px-8 border-b border-[#E8D1A0]">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header Row: Title & View All */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#10283A]">
                Featured Artifacts
              </h2>
              <span className="hidden sm:inline-block h-[1px] w-12 bg-[#D99A43]" />
            </div>

            <Link
              to="/artifacts"
              className="text-xs sm:text-sm font-semibold text-[#10283A] hover:text-[#D99A43] transition-colors inline-flex items-center gap-1 group"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* 4 Raised 3D Parchment Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredArtifacts.map((artifact) => {
              const IconComponent = getArtifactHeritageIcon(artifact);
              const meta = getFeaturedDisplayData(artifact);
              return (
                <ThreeDCard
                  key={artifact.id}
                  variant="parchment"
                  onClick={() => navigate(`/artifacts/${artifact.id}`)}
                  className="p-6 flex flex-col items-center text-center justify-between group cursor-pointer h-full"
                >
                  <div className="flex flex-col items-center w-full">
                    {/* 3D Gold Icon Stage */}
                    <div className="w-22 h-22 rounded-2xl bg-gradient-to-br from-[#FFF7E5] to-[#F2E4C4] border border-[#D99A43]/50 flex items-center justify-center mb-5 group-hover:scale-108 transition-all shadow-[0_4px_14px_rgba(217,154,67,0.2),inset_0_1px_0_#FFF]">
                      <IconComponent className="w-12 h-12 text-[#D99A43] group-hover:text-[#F2B34F] transition-colors" />
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-lg font-bold text-[#10283A] group-hover:text-[#D99A43] transition-colors mb-2 leading-snug">
                      {meta.title}
                    </h3>

                    {/* Classification details */}
                    <div className="text-xs text-[#526575] space-y-1 mb-4 font-body">
                      <div>
                        <span>{meta.type}</span> • <span>{meta.dynasty}</span>
                      </div>
                      <div className="text-[#10283A] font-medium text-[11px]">
                        {meta.location}
                      </div>
                    </div>
                  </div>

                  {/* View Details Link */}
                  <div className="pt-3 border-t border-[#E8D1A0] w-full flex justify-center mt-auto">
                    <span className="text-xs font-semibold text-[#10283A] group-hover:text-[#D99A43] inline-flex items-center gap-1 transition-all group-hover:translate-x-1">
                      <span>View Details</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#D99A43]" />
                    </span>
                  </div>
                </ThreeDCard>
              );
            })}
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. EXPLORE BY CATEGORY                                         */}
      {/* ============================================================== */}
      <section className="bg-[#FFF7E5] py-16 px-4 sm:px-6 lg:px-8 border-b border-[#E8D1A0]">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="flex items-center gap-3">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#10283A]">
              Explore by Category
            </h2>
            <span className="hidden sm:inline-block h-[1px] w-12 bg-[#D99A43]" />
          </div>

          {/* Grid of 9 Raised 3D Category Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4">
            {categoryDisplayList.map((cat) => {
              const IconComp = cat.icon;
              return (
                <Link
                  key={cat.name}
                  to={`/artifacts?category=${encodeURIComponent(cat.query)}`}
                  className="category-tile-3d p-4 flex flex-col items-center text-center justify-center group h-32"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#FFF7E5] border border-[#D99A43]/40 flex items-center justify-center mb-2.5 text-[#D99A43] group-hover:text-[#F2B34F] group-hover:scale-110 transition-all shadow-sm">
                    <IconComp className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-bold text-[#10283A] group-hover:text-[#D99A43] transition-colors leading-tight">
                    {cat.name}
                  </span>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. EXPLORE BY STATE (Matching Reference 10 State Grid)        */}
      {/* ============================================================== */}
      <section className="bg-[#FFF7E5] py-16 px-4 sm:px-6 lg:px-8 border-b border-[#E8D1A0]">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#10283A]">
                Explore by State
              </h2>
              <span className="hidden sm:inline-block h-[1px] w-12 bg-[#D99A43]" />
            </div>

            <Link
              to="/states"
              className="text-xs sm:text-sm font-semibold text-[#10283A] hover:text-[#D99A43] transition-colors inline-flex items-center gap-1 group"
            >
              <span>View All States</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Dynamic State Cards in Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {(states.length > 0 ? states.slice(0, 10) : homeStatesPreview).map((st) => (
              <ThreeDCard
                key={st.id}
                variant="parchment"
                onClick={() => navigate(`/states/${st.id}/districts`)}
                className="p-4 flex flex-col justify-between group cursor-pointer text-left h-36"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-8 h-8 rounded-lg bg-[#061B29] border border-[#D99A43]/50 flex items-center justify-center text-[#D99A43] shrink-0">
                      <TempleSmallIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-heading text-sm font-bold text-[#10283A] group-hover:text-[#D99A43] transition-colors leading-tight">
                        {st.name}
                      </h3>
                      <div className="text-[10px] font-semibold text-[#D99A43]">
                        {st.artifactCount !== undefined ? st.artifactCount : (st.count || 0)} artifacts
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#526575] line-clamp-2 mt-1">
                    {st.description || st.subtitle}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] font-mono text-[#D99A43]/80">
                    {st.districtCount ? `${st.districtCount} districts` : ''}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D99A43] group-hover:translate-x-1 transition-transform" />
                </div>
              </ThreeDCard>
            ))}
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. IMMERSIVE 3D HISTORICAL TIMELINE                            */}
      {/* ============================================================== */}
      <Timeline />

    </div>
  );
};

export default Home;
