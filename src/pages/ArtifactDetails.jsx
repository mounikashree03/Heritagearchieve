import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ChevronRight,
  Share2,
  Check,
  Compass,
  Landmark,
  RotateCcw,
  AlertTriangle
} from 'lucide-react';
import ArtifactDetailsPanel from '../components/ArtifactDetailsPanel';
import ArtifactCard from '../components/ArtifactCard';
import Breadcrumbs from '../components/Breadcrumbs';
import { artifactService } from '../services/api';

const ArtifactDetails = () => {
  const { id } = useParams();
  const [artifact, setArtifact] = useState(null);
  const [relatedArtifacts, setRelatedArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const fetchDetails = useCallback(async () => {
    setLoading(true);
    setError(null);
    window.scrollTo(0, 0);
    try {
      const item = await artifactService.getArtifactById(id);
      if (!item) {
        setArtifact(null);
      } else {
        setArtifact(item);
        const related = await artifactService.getRelatedArtifacts(item.id, 4);
        setRelatedArtifacts(related || []);
      }
    } catch (err) {
      setError(err.message || 'Failed to connect to digital archive service');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="w-full py-28 flex flex-col items-center justify-center gap-4 text-center text-[#526575]">
        <div className="w-12 h-12 rounded-full border-3 border-[#E8D1A0] border-t-[#D99A43] animate-spin" />
        <span className="text-sm font-medium font-body">Loading artifact record from digital archives...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto my-24 p-8 card-3d-parchment rounded-2xl text-center space-y-4">
        <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
        <h2 className="font-heading text-2xl font-bold text-[#10283A]">
          Unable to Load Artifact
        </h2>
        <p className="text-xs text-[#526575]">
          {error}
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={fetchDetails}
            className="btn-gold-3d px-5 py-2.5 text-xs inline-flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retry Connection</span>
          </button>
          <Link
            to="/artifacts"
            className="btn-dark-3d px-5 py-2.5 text-xs inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Catalog</span>
          </Link>
        </div>
      </div>
    );
  }

  if (!artifact) {
    return (
      <div className="max-w-md mx-auto my-24 p-8 card-3d-parchment rounded-2xl text-center space-y-4">
        <h2 className="font-heading text-2xl font-bold text-[#10283A]">
          Artifact Record Not Located
        </h2>
        <p className="text-xs text-[#526575]">
          The accession ID <code className="text-[#D99A43] font-mono">{id}</code> does not exist in the digital repository.
        </p>
        <Link
          to="/artifacts"
          className="btn-gold-3d px-5 py-2.5 text-xs inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      
      {/* 1. DARK CINEMATIC SUB-HEADER WITH BREADCRUMBS */}
      <section className="bg-[#061B29] border-b border-[#D99A43]/30 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <Breadcrumbs
            theme="dark"
            items={[
              { label: 'Artifacts', to: '/artifacts' },
              { label: artifact.state, to: `/artifacts?stateId=${artifact.stateId || ''}` },
              { label: artifact.name }
            ]}
          />

          <Link
            to="/artifacts"
            className="btn-dark-3d !px-4 !py-1.5 !text-xs inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Catalog</span>
          </Link>
        </div>
      </section>

      {/* 2. MAIN 3D SHOWCASE SECTION */}
      <section className="bg-[#FFF7E5] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-14">
          
          {/* Main 3D Showcase Panel (Rotating Pedestal + Tabs) */}
          <ArtifactDetailsPanel
            artifact={artifact}
            onShare={handleShare}
            copied={copied}
          />

          {/* Related Artifacts 3D Section */}
          {relatedArtifacts.length > 0 && (
            <div className="space-y-6 pt-6 border-t border-[#E8D1A0]">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading text-2xl font-bold text-[#10283A]">
                    Related Archival Artifacts
                  </h3>
                  <p className="text-xs text-[#526575] mt-1">
                    Discover artifacts from the same dynasty, period, or geographical region.
                  </p>
                </div>

                <Link
                  to={`/artifacts?category=${encodeURIComponent(artifact.category)}`}
                  className="text-xs font-semibold text-[#10283A] hover:text-[#D99A43] transition-colors inline-flex items-center gap-1"
                >
                  <span>More in {artifact.category ? artifact.category.split(' ')[0] : 'Category'}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#D99A43]" />
                </Link>
              </div>

              {/* 4-Card Responsive Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedArtifacts.map((item) => (
                  <ArtifactCard key={item.id} artifact={item} />
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

    </div>
  );
};

export default ArtifactDetails;
