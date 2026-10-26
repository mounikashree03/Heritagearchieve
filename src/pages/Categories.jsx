import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { artifactService } from '../services/api';
import { HeritageIcons } from '../components/HeritageIcons';
import ThreeDCard from '../components/ThreeDCard';
import ThreeDButton from '../components/ThreeDButton';
import LoadingSpinner from '../components/LoadingSpinner';
import PageBackground from '../components/PageBackground';

import Breadcrumbs from '../components/Breadcrumbs';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await artifactService.getCategories();
      // Handle array returned directly from service or encapsulated in data object
      const categoriesArray = Array.isArray(res)
        ? res
        : (Array.isArray(res?.data) ? res.data : (Array.isArray(res?.items) ? res.items : []));

      if (categoriesArray && categoriesArray.length > 0) {
        setCategories(categoriesArray);
      } else if (res && !Array.isArray(res) && res.error) {
        setError(res.error);
      } else {
        setCategories([]);
      }
    } catch (err) {
      console.error('[Categories Page] Error loading categories:', err);
      setError(err.message || 'Unable to connect to the backend categories service.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const getCategoryIcon = (categoryName = '') => {
    const name = String(categoryName || '').toLowerCase();
    if (name.includes('sculpture') || name.includes('bronze') || name.includes('stone') || name.includes('icon')) return HeritageIcons.sculpture;
    if (name.includes('coin') || name.includes('numismatic')) return HeritageIcons.coin;
    if (name.includes('epigraph') || name.includes('inscription') || name.includes('scroll')) return HeritageIcons.scroll;
    if (name.includes('temple') || name.includes('monument') || name.includes('architecture')) return HeritageIcons.temple;
    if (name.includes('pottery') || name.includes('ceramic') || name.includes('vessel')) return HeritageIcons.pottery;
    if (name.includes('weapon') || name.includes('sword') || name.includes('shield') || name.includes('armor') || name.includes('tool')) return HeritageIcons.shield;
    if (name.includes('jewel') || name.includes('ornament')) return HeritageIcons.jewellery;
    if (name.includes('manuscript') || name.includes('palm') || name.includes('leaf')) return HeritageIcons.manuscript;
    if (name.includes('seal') || name.includes('trade')) return HeritageIcons.seal;
    return HeritageIcons.compass || HeritageIcons.temple;
  };

  return (
    <PageBackground className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-[#D99A43]/20 pb-3">
          <Breadcrumbs 
            theme="dark" 
            items={[{ label: 'Archaeological Categories' }]} 
          />
          <Link
            to="/artifacts"
            className="text-xs text-[#D99A43] hover:text-[#F2B34F] flex items-center gap-1 font-mono transition-colors"
          >
            <span>Browse All Relics</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#082C35]/80 border border-[#D99A43]/40 shadow-[0_0_20px_rgba(217,154,67,0.2)] mb-4">
            <Sparkles className="w-4 h-4 text-[#F2B34F]" />
            <span className="font-serif text-xs uppercase tracking-widest text-[#F2B34F] font-medium">
              Archaeological Classifications
            </span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-bold text-[#FFF7E5] tracking-tight">
            Heritage Categories
          </h1>
          <p className="font-serif text-sm sm:text-base text-[#D99A43] mt-3">
            Explore curated relics organized across classical Indian archaeological disciplines, from Chola bronze iconography to Ashokan rock edicts.
          </p>
        </div>

        {/* Content State */}
        {loading ? (
          <LoadingSpinner size="lg" text="Loading categories from MySQL historical database..." />
        ) : error ? (
          <div className="max-w-md mx-auto text-center p-8 rounded-2xl bg-red-950/40 border border-red-500/40 space-y-3">
            <AlertCircle className="w-8 h-8 text-red-400 mx-auto" />
            <p className="text-sm text-red-200">{error}</p>
            <ThreeDButton
              variant="gold"
              size="sm"
              onClick={fetchCategories}
              icon={<RefreshCw className="w-3.5 h-3.5" />}
            >
              Retry Connection
            </ThreeDButton>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => {
              const catName = cat.category_name || cat.name || '';
              const catId = cat.category_id || cat.id;
              const count = Number(cat.artifact_count ?? cat.artifactCount ?? 0);
              const IconFn = getCategoryIcon(catName);

              return (
                <ThreeDCard
                  key={catId}
                  variant="dark"
                  depth={12}
                  onClick={() => navigate(`/artifacts?category=${encodeURIComponent(catName)}`)}
                  className="p-6 rounded-2xl border border-[#D99A43]/30 hover:border-[#F2B34F] cursor-pointer group flex flex-col justify-between transition-all"
                >
                  <div>
                    {/* Header Icon + ID Badge + Count */}
                    <div className="flex items-start justify-between">
                      <div className="w-14 h-14 rounded-2xl bg-[#082C35] border border-[#D99A43]/40 flex items-center justify-center text-[#F2B34F] group-hover:scale-110 group-hover:border-[#F2B34F] group-hover:shadow-[0_0_16px_rgba(217,154,67,0.4)] transition-all">
                        {IconFn ? <IconFn className="w-7 h-7" /> : null}
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-[#082C35] border border-[#D99A43]/30 text-[#D99A43]">
                          CAT #{catId}
                        </span>
                        <span className="text-[11px] font-medium text-[#F2B34F]">
                          {count} {count === 1 ? 'relic' : 'relics'}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-heading text-xl font-bold text-[#FFF7E5] group-hover:text-[#F2B34F] transition-colors mt-4">
                      {catName}
                    </h3>

                    <p className="text-xs text-[#FFF7E5]/70 mt-2 line-clamp-3 font-sans leading-relaxed">
                      {cat.description || 'Prehistoric and medieval preserved relics representing classical Indian craftsmanship, metallurgy, and artistic traditions.'}
                    </p>
                  </div>

                  {/* Footer Action */}
                  <div className="pt-4 mt-6 border-t border-[#D99A43]/20 flex items-center justify-between text-xs font-semibold text-[#D99A43] group-hover:text-[#F2B34F]">
                    <span>View Preserved Relics</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </ThreeDCard>
              );
            })}
          </div>
        )}

      </div>
    </PageBackground>
  );
};

export default Categories;
