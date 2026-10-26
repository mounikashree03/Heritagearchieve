import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, MapPin } from 'lucide-react';
import { TempleSmallIcon } from './HeritageIcons';
import ThreeDCard from './ThreeDCard';

const StateCard = ({ state }) => {
  const navigate = useNavigate();
  if (!state) return null;

  const stateTargetId = state.id || state.state_id;

  const handleCardClick = () => {
    navigate(`/states/${stateTargetId}/districts`);
  };

  return (
    <ThreeDCard
      variant="parchment"
      onClick={handleCardClick}
      className="p-6 flex flex-col justify-between group hover:border-[#D99A43] transition-all text-left h-full cursor-pointer"
    >
      <div>
        {/* Top: 3D Gold Architectural Temple Icon & State Name */}
        <div className="flex items-center gap-3.5 mb-2.5">
          <div className="w-12 h-12 rounded-xl bg-[#061B29] border border-[#D99A43]/60 flex items-center justify-center text-[#D99A43] group-hover:text-[#F2B34F] group-hover:scale-105 transition-all shadow-[0_4px_12px_rgba(6,27,41,0.25),inset_0_1px_0_rgba(242,179,79,0.3)] shrink-0">
            <TempleSmallIcon className="w-7 h-7" />
          </div>

          <div>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-[#10283A] group-hover:text-[#D99A43] transition-colors leading-snug">
              {state.name || state.state_name}
            </h3>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-[#D99A43]">
              <MapPin className="w-3 h-3" />
              <span>{state.artifactCount ?? state.artifact_count ?? 0} artifacts documented</span>
            </div>
          </div>
        </div>

        {/* Short Heritage Description */}
        <p className="text-xs text-[#526575] leading-relaxed line-clamp-3 mb-5 mt-2 font-body">
          {state.description || 'Rich historical heritage, sacred architectures, and ancient artifacts.'}
        </p>
      </div>

      {/* Card Action Link: Explore Districts -> */}
      <div className="pt-3.5 border-t border-[#E8D1A0] flex items-center justify-between mt-auto">
        <span className="text-[11px] font-mono text-[#526575]/80">
          {state.districtCount ?? state.district_count ?? 0} Districts
        </span>

        <span
          className="text-xs font-semibold text-[#10283A] group-hover:text-[#D99A43] inline-flex items-center gap-1 transition-all group-hover:translate-x-1"
        >
          <span>Explore Districts</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#D99A43]" />
        </span>
      </div>
    </ThreeDCard>
  );
};

export default StateCard;
