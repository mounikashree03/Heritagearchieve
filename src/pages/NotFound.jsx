import React from 'react';
import { Link } from 'react-router-dom';
import { Landmark, Home, Compass, ArrowRight } from 'lucide-react';
import GoldButton from '../components/GoldButton';

const NotFound = () => {
  return (
    <div className="w-full min-h-[75vh] flex items-center justify-center py-20 px-4 bg-[#061B29] relative overflow-hidden select-none">
      
      {/* Decorative Gold Heritage Mandala Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#D99A43_1px,transparent_1px)] [background-size:32px_32px]" />
      
      {/* Ambient Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[radial-gradient(circle,rgba(217,154,67,0.15)_0%,transparent_70%)] pointer-events-none blur-xl" />

      {/* 3D Elevated Dark Card */}
      <div className="relative z-10 max-w-lg w-full card-3d-dark rounded-3xl p-8 sm:p-12 text-center space-y-7 border border-[#D99A43]/40 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(217,154,67,0.3)]">
        
        {/* Dimensional Gold Temple Icon */}
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#0A343F] to-[#04141E] border-2 border-[#D99A43] flex items-center justify-center text-[#F2B34F] mx-auto shadow-[0_8px_20px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.4)]">
          <Landmark className="w-10 h-10 stroke-[1.8]" />
        </div>

        {/* 3D Dimensional Typography */}
        <div className="space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#D99A43] bg-[#082C35] px-3.5 py-1 rounded-full border border-[#D99A43]/40 inline-block">
            Error 404 • Missing Scroll
          </span>
          
          <h1 className="font-heading text-5xl sm:text-6xl font-black text-gold-gradient tracking-tight drop-shadow-md">
            404
          </h1>

          <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#FFF7E5]">
            Archival Record Not Located
          </h2>

          <p className="text-xs sm:text-sm text-[#FFF7E5]/80 leading-relaxed font-body max-w-sm mx-auto">
            The historical record, monument index, or artifact page you are searching for does not exist in the digital repository.
          </p>
        </div>

        {/* Raised 3D Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <GoldButton
            to="/"
            variant="primary"
            size="md"
            icon={Home}
            iconPosition="left"
          >
            Back to Home
          </GoldButton>

          <GoldButton
            to="/artifacts"
            variant="secondary"
            size="md"
            icon={Compass}
            iconPosition="left"
          >
            Explore Catalog
          </GoldButton>
        </div>

        <div className="pt-2 text-[11px] font-mono text-[#D99A43]/80">
          HeritageArchive • Civilizational Repository
        </div>

      </div>

    </div>
  );
};

export default NotFound;
