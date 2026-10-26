import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Crown, Calendar, MapPin } from 'lucide-react';
import { getArtifactHeritageIcon } from './HeritageIcons';
import ThreeDCard from './ThreeDCard';

const ArtifactCard = ({ artifact }) => {
  const navigate = useNavigate();
  if (!artifact) return null;

  const IconComp = getArtifactHeritageIcon(artifact);

  return (
    <ThreeDCard
      variant="parchment"
      onClick={() => navigate(`/artifacts/${artifact.id}`)}
      className="p-5 flex flex-col justify-between group cursor-pointer text-left h-full"
    >
      <div>
        {/* Top: 3D Emblem Stage & Accession ID Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FFF7E5] to-[#F2E4C4] border border-[#D99A43]/50 flex items-center justify-center text-[#D99A43] group-hover:text-[#F2B34F] group-hover:scale-105 transition-all shadow-[0_2px_8px_rgba(217,154,67,0.15),inset_0_1px_0_#FFF]">
            <IconComp className="w-8 h-8 drop-shadow-sm" />
          </div>

          <span className="text-[10px] font-mono font-bold tracking-wider text-[#D99A43] bg-[#061B29] px-2.5 py-1 rounded-full border border-[#D99A43]/30 shadow-sm">
            {artifact.id}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading text-base sm:text-lg font-bold text-[#10283A] group-hover:text-[#D99A43] transition-colors line-clamp-2 leading-snug mb-2.5">
          {artifact.name}
        </h3>

        {/* Metadata Badges */}
        <div className="text-[11px] text-[#526575] space-y-1.5 mb-3.5">
          <div className="flex items-center gap-1.5 truncate">
            <Crown className="w-3.5 h-3.5 text-[#D99A43] shrink-0" />
            <span className="font-semibold text-[#10283A]">Dynasty:</span>
            <span className="truncate">{artifact.dynasty || 'Classical'}</span>
          </div>
          
          <div className="flex items-center gap-1.5 truncate">
            <Calendar className="w-3.5 h-3.5 text-[#D99A43] shrink-0" />
            <span className="font-semibold text-[#10283A]">Period:</span>
            <span className="truncate">{artifact.historicalPeriod}</span>
          </div>

          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-[#D99A43] shrink-0" />
            <span className="font-semibold text-[#10283A]">Origin:</span>
            <span className="truncate">{artifact.district}, {artifact.state}</span>
          </div>
        </div>

        {/* Short description */}
        <p className="text-xs text-[#526575] leading-relaxed line-clamp-2 mb-4 font-body">
          {artifact.shortDescription || artifact.historicalDescription}
        </p>
      </div>

      {/* Card Footer: Material & View Details Button */}
      <div className="pt-3 border-t border-[#E8D1A0] flex items-center justify-between mt-auto">
        <span className="text-[11px] text-[#526575]/80 font-mono truncate max-w-[130px]">
          {artifact.material ? artifact.material.split('(')[0].trim() : 'Historical Artifact'}
        </span>
        
        <span className="text-xs font-semibold text-[#10283A] group-hover:text-[#D99A43] inline-flex items-center gap-1 transition-all group-hover:translate-x-1">
          <span>View Details</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#D99A43]" />
        </span>
      </div>
    </ThreeDCard>
  );
};

export default ArtifactCard;
