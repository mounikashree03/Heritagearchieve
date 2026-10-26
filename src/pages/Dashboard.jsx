import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Bookmark, 
  Trash2, 
  ExternalLink, 
  Compass, 
  MapPin, 
  Landmark, 
  Calendar, 
  Sparkles,
  BookOpen,
  Award,
  Layers
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { authService, artifactService } from '../services/api';
import Sidebar from '../components/Sidebar';
import ThreeDCard from '../components/ThreeDCard';
import ThreeDButton from '../components/ThreeDButton';
import LoadingSpinner from '../components/LoadingSpinner';
import PageBackground from '../components/PageBackground';

const Dashboard = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'overview';
  const [activeTab, setActiveTab] = useState(initialTab);

  const [favorites, setFavorites] = useState([]);
  const [loadingFavorites, setLoadingFavorites] = useState(true);
  const [stats, setStats] = useState({ totalStates: 15, totalArtifacts: 68, totalCategories: 10 });

  const fetchUserFavorites = async () => {
    setLoadingFavorites(true);
    try {
      const res = await authService.getFavorites();
      if (res && Array.isArray(res.data)) {
        setFavorites(res.data);
      } else if (res && Array.isArray(res)) {
        setFavorites(res);
      }
    } catch (err) {
      console.error('Failed to load favorites', err);
    } finally {
      setLoadingFavorites(false);
    }
  };

  useEffect(() => {
    fetchUserFavorites();
    // Load general counts
    Promise.all([
      artifactService.getStates(),
      artifactService.getCategories(),
      artifactService.getArtifacts()
    ]).then(([statesRes, catRes, artRes]) => {
      setStats({
        totalStates: Array.isArray(statesRes) ? statesRes.length : (statesRes?.data?.length || 15),
        totalCategories: Array.isArray(catRes) ? catRes.length : (catRes?.data?.length || 10),
        totalArtifacts: artRes?.totalCount || (Array.isArray(artRes?.items) ? artRes.items.length : 68)
      });
    }).catch(console.error);
  }, []);

  const handleRemoveFavorite = async (artifactId) => {
    try {
      const res = await authService.removeFavorite(artifactId);
      if (res && res.success) {
        setFavorites((prev) => prev.filter((item) => String(item.id || item.artifact_id) !== String(artifactId)));
      }
    } catch (err) {
      console.error('Failed to remove bookmark', err);
    }
  };

  return (
    <PageBackground className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header Banner */}
        <div className="mb-8 card-3d-dark p-6 sm:p-8 rounded-3xl border border-[#D99A43]/40 shadow-[0_12px_40px_rgba(0,0,0,0.6)] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center space-x-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#D99A43] via-[#F2B34F] to-[#9E6E24] p-[2px] shadow-[0_6px_20px_rgba(217,154,67,0.4)] flex-shrink-0">
              <div className="w-full h-full bg-[#061B29] rounded-[14px] flex items-center justify-center font-serif font-bold text-2xl sm:text-3xl text-[#F2B34F]">
                {user?.full_name ? user.full_name.charAt(0).toUpperCase() : 'S'}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-[#082C35] border border-[#D99A43]/50 text-[#F2B34F]">
                  Archival Scholar
                </span>
                <span className="text-xs text-[#FFF7E5]/60">• Academic Terminal</span>
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#FFF7E5] mt-1">
                Welcome back, {user?.full_name || 'Honored Scholar'}
              </h1>
              <p className="text-xs sm:text-sm text-[#D99A43] font-serif mt-0.5">
                Research Dossier & Preserved Artifacts Sanctuary
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/artifacts">
              <ThreeDButton variant="gold" size="sm" icon={<Compass className="w-4 h-4" />}>
                Explore Antiquities
              </ThreeDButton>
            </Link>
          </div>
        </div>

        {/* Main Content Layout with 3D Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8">
          <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} />

          {/* Right Main Panel */}
          <main className="flex-1 min-w-0 space-y-8">
            
            {/* 3D KPI Metrics Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <ThreeDCard variant="dark" depth={10} className="p-5 rounded-2xl border border-[#D99A43]/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase font-mono text-[#D99A43]">Saved Artifacts</p>
                    <h3 className="font-heading text-3xl font-bold text-[#FFF7E5] mt-1">
                      {favorites.length}
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#082C35] border border-[#D99A43]/40 flex items-center justify-center text-[#F2B34F]">
                    <Bookmark className="w-6 h-6 stroke-[1.8]" />
                  </div>
                </div>
                <p className="text-[11px] text-[#FFF7E5]/60 mt-3 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Synced with MySQL database
                </p>
              </ThreeDCard>

              <ThreeDCard variant="dark" depth={10} className="p-5 rounded-2xl border border-[#D99A43]/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase font-mono text-[#D99A43]">National Catalog</p>
                    <h3 className="font-heading text-3xl font-bold text-[#FFF7E5] mt-1">
                      {stats.totalArtifacts}
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#082C35] border border-[#D99A43]/40 flex items-center justify-center text-[#F2B34F]">
                    <Landmark className="w-6 h-6 stroke-[1.8]" />
                  </div>
                </div>
                <p className="text-[11px] text-[#FFF7E5]/60 mt-3">
                  Across {stats.totalStates} Indian States & Dynasties
                </p>
              </ThreeDCard>

              <ThreeDCard variant="dark" depth={10} className="p-5 rounded-2xl border border-[#D99A43]/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase font-mono text-[#D99A43]">Heritage Disciplines</p>
                    <h3 className="font-heading text-3xl font-bold text-[#FFF7E5] mt-1">
                      {stats.totalCategories}
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#082C35] border border-[#D99A43]/40 flex items-center justify-center text-[#F2B34F]">
                    <Layers className="w-6 h-6 stroke-[1.8]" />
                  </div>
                </div>
                <p className="text-[11px] text-[#FFF7E5]/60 mt-3">
                  Sculptures, Inscriptions, Temples, Coins
                </p>
              </ThreeDCard>
            </div>

            {/* Saved Antiquities Section */}
            <div className="card-3d-dark p-6 sm:p-8 rounded-3xl border border-[#D99A43]/30 shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#D99A43]/20">
                <div>
                  <h2 className="font-heading text-xl font-bold text-[#FFF7E5] flex items-center gap-2.5">
                    <Bookmark className="w-5 h-5 text-[#F2B34F]" />
                    <span>My Curated Artifacts Collection</span>
                  </h2>
                  <p className="text-xs text-[#FFF7E5]/70 mt-1">
                    Artifacts bookmarked for research and academic citation
                  </p>
                </div>
                <Link to="/artifacts" className="text-xs text-[#F2B34F] hover:underline font-serif flex items-center gap-1">
                  <span>Browse Catalog</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>

              {loadingFavorites ? (
                <LoadingSpinner size="md" text="Retrieving scholar bookmarks from MySQL..." />
              ) : favorites.length === 0 ? (
                /* 3D Empty State */
                <div className="text-center py-12 px-4 rounded-2xl bg-[#082C35]/30 border border-dashed border-[#D99A43]/30">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-[#082C35] border border-[#D99A43]/40 flex items-center justify-center text-[#D99A43] mb-4 shadow-inner">
                    <Bookmark className="w-8 h-8 opacity-60" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#FFF7E5]">
                    No Artifacts Bookmarked Yet
                  </h3>
                  <p className="text-xs text-[#FFF7E5]/70 max-w-sm mx-auto mt-1.5 mb-6">
                    While exploring states and catalog records, click the bookmark icon on any artifact to save it here for quick reference.
                  </p>
                  <Link to="/artifacts">
                    <ThreeDButton variant="gold" size="sm">
                      Explore 68+ Historical Relics
                    </ThreeDButton>
                  </Link>
                </div>
              ) : (
                /* Artifacts Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {favorites.map((artifact) => (
                    <ThreeDCard
                      key={artifact.artifact_id}
                      variant="dark"
                      depth={8}
                      className="p-5 rounded-2xl border border-[#D99A43]/30 hover:border-[#F2B34F]/70 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-[#082C35] text-[#F2B34F] border border-[#D99A43]/40">
                            {artifact.category_name || 'Historical Relic'}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveFavorite(artifact.artifact_id)}
                            title="Remove from favorites"
                            className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <h4 className="font-heading text-lg font-bold text-[#FFF7E5] mt-2 line-clamp-1">
                          {artifact.artifact_name}
                        </h4>

                        <div className="space-y-1.5 mt-3 text-xs text-[#FFF7E5]/75">
                          {artifact.dynasty && (
                            <p className="flex items-center gap-1.5">
                              <Landmark className="w-3.5 h-3.5 text-[#D99A43]" />
                              <span>Dynasty: <strong className="text-[#FFF7E5]">{artifact.dynasty}</strong></span>
                            </p>
                          )}
                          {artifact.state_name && (
                            <p className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-[#D99A43]" />
                              <span>{artifact.state_name} • {artifact.district_name || 'District'}</span>
                            </p>
                          )}
                          {artifact.period && (
                            <p className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-[#D99A43]" />
                              <span>{artifact.period}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="pt-4 mt-4 border-t border-[#D99A43]/20 flex items-center justify-between">
                        <span className="text-[10px] font-mono text-[#D99A43]">
                          Added {new Date(artifact.created_at).toLocaleDateString()}
                        </span>
                        <Link
                          to={`/artifacts/${artifact.artifact_id}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#F2B34F] hover:underline"
                        >
                          <span>Examine Relic</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </ThreeDCard>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Navigation Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Link to="/states" className="group">
                <ThreeDCard variant="glass" className="p-6 rounded-2xl group-hover:border-[#F2B34F] transition-all">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-[#082C35] border border-[#D99A43]/50 flex items-center justify-center text-[#F2B34F] group-hover:scale-110 transition-transform">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-base text-[#FFF7E5] group-hover:text-[#F2B34F]">
                        State-Wise Artifacts
                      </h4>
                      <p className="text-xs text-[#FFF7E5]/70 mt-0.5">
                        Explore relics preserved across Tamil Nadu, Karnataka, Odisha, and more.
                      </p>
                    </div>
                  </div>
                </ThreeDCard>
              </Link>

              <Link to="/categories" className="group">
                <ThreeDCard variant="glass" className="p-6 rounded-2xl group-hover:border-[#F2B34F] transition-all">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-[#082C35] border border-[#D99A43]/50 flex items-center justify-center text-[#F2B34F] group-hover:scale-110 transition-transform">
                      <Layers className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-base text-[#FFF7E5] group-hover:text-[#F2B34F]">
                        Archaeological Categories
                      </h4>
                      <p className="text-xs text-[#FFF7E5]/70 mt-0.5">
                        Filter by Stone Sculptures, Bronzes, Epigraphy, and Temple Architecture.
                      </p>
                    </div>
                  </div>
                </ThreeDCard>
              </Link>
            </div>

          </main>
        </div>

      </div>
    </PageBackground>
  );
};

export default Dashboard;
