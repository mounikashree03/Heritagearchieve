import React from 'react';
import { Link } from 'react-router-dom';
import { TempleSmallIcon } from './HeritageIcons';
import { ArrowRight, MapPin } from 'lucide-react';
import ThreeDCard from './ThreeDCard';

const DistrictCard = ({ district, stateName }) => {
  if (!district) return null;

  return (
    <ThreeDCard
      variant="parchment"
      className="p-6 flex flex-col justify-between group hover:border-[#D99A43] transition-all text-center items-center h-full"
    >
      <div className="flex flex-col items-center w-full">
        {/* 3D Gold Architectural Temple Icon Stage */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FFF7E5] to-[#F2E4C4] border border-[#D99A43]/50 flex items-center justify-center text-[#D99A43] mb-4 group-hover:scale-110 group-hover:text-[#F2B34F] transition-all shadow-[0_4px_12px_rgba(217,154,67,0.18),inset_0_1px_0_#FFF]">
          <TempleSmallIcon className="w-9 h-9" />
        </div>

        {/* District Name */}
        <h3 className="font-heading text-lg sm:text-xl font-bold text-[#10283A] group-hover:text-[#D99A43] transition-colors mb-1">
          {district.name}
        </h3>

        {/* Artifact Count Badge */}
        <div className="inline-flex items-center gap-1 text-xs font-semibold text-[#D99A43] mb-3">
          <MapPin className="w-3 h-3" />
          <span>{district.artifactCount || district.count || 4} artifacts documented</span>
        </div>

        {/* Short Description */}
        <p className="text-xs text-[#526575] leading-relaxed line-clamp-3 mb-5 px-1 font-body">
          {district.description || `Historic region in ${stateName || 'India'} celebrated for its ancient temples, archaeological discoveries, and living traditions.`}
        </p>
      </div>

      {/* Button: View Artifacts -> */}
      <Link
        to={`/artifacts?stateId=${district.stateId}&districtId=${district.id}`}
        className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-[#061B29] text-[#FFF7E5] hover:bg-[#D99A43] hover:text-[#061B29] border border-[#D99A43]/40 transition-all inline-flex items-center justify-center gap-2 shadow-md hover:shadow-[0_0_15px_rgba(217,154,67,0.35)] group-hover:border-[#D99A43] active:translate-y-0.5"
      >
        <span>View Artifacts</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </Link>
    </ThreeDCard>
  );
};

export default DistrictCard;
