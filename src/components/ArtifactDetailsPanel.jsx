import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  getArtifactHeritageIcon, 
  TempleSmallIcon, 
  SealIcon, 
  NatarajaIcon 
} from './HeritageIcons';
import GoldButton from './GoldButton';
import { 
  Calendar, 
  MapPin, 
  Crown, 
  Layers, 
  Sparkles, 
  Share2, 
  Check, 
  RotateCw,
  Compass,
  BookOpen,
  Info,
  Bookmark
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/api';

const ArtifactDetailsPanel = ({ artifact, onShare, copied }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [rotation, setRotation] = useState({ x: 10, y: -15 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isAuthenticated && (artifact?.rawId || artifact?.id)) {
      const targetId = String(artifact.rawId || artifact.id);
      authService.getFavorites().then(res => {
        const list = Array.isArray(res?.data) ? res.data : (Array.isArray(res) ? res : []);
        const exists = list.some(f => String(f.id || f.artifact_id) === targetId);
        setIsSaved(exists);
      }).catch(() => {});
    }
  }, [isAuthenticated, artifact?.rawId, artifact?.id]);

  const handleToggleBookmark = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    const targetId = artifact?.rawId || artifact?.id;
    if (!targetId) return;

    setSaving(true);
    try {
      if (isSaved) {
        await authService.removeFavorite(targetId);
        setIsSaved(false);
      } else {
        await authService.addFavorite(targetId);
        setIsSaved(true);
      }
    } catch (err) {
      console.error('Bookmark error:', err);
    } finally {
      setSaving(false);
    }
  };

  if (!artifact) return null;

  const IconComp = getArtifactHeritageIcon(artifact);

  // Mouse drag 3D rotation for the museum artifact pedestal
  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    
    setRotation(prev => ({
      x: Math.max(-30, Math.min(30, prev.x - deltaY * 0.4)),
      y: (prev.y + deltaX * 0.5) % 360
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setRotation({ x: 10, y: -15 });
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Info },
    { id: 'history', label: 'Historical Background', icon: BookOpen },
    { id: 'materials', label: 'Materials & Origin', icon: Layers },
    { id: 'significance', label: 'Significance', icon: Sparkles },
    { id: 'cultural', label: 'Cultural Importance', icon: Compass },
  ];

  return (
    <div className="w-full space-y-10">
      
      {/* ============================================================== */}
      {/* 1. HERO 3D SHOWCASE PODIUM (Navy & Gold Feature Panel)         */}
      {/* ============================================================== */}
      <div className="relative card-3d-dark rounded-3xl p-6 sm:p-10 overflow-hidden border border-[#D99A43]/40 shadow-2xl">
        
        {/* Ambient Museum Spotlight Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[radial-gradient(circle,rgba(242,179,79,0.15)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none opacity-15 bg-[radial-gradient(#D99A43_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Interactive 3D Showcase Pedestal */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            {/* 3D Pedestal Stage */}
            <div 
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="relative w-72 h-72 sm:w-84 sm:h-84 flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
              style={{ perspective: '1000px' }}
            >
              {/* Outer Golden Halo Rings */}
              <div className="absolute inset-4 rounded-full border border-[#D99A43]/20 animate-pulse pointer-events-none" />
              <div className="absolute inset-10 rounded-full border border-[#F2B34F]/30 pointer-events-none" />

              {/* 3D Rotating Artifact Card Display */}
              <div
                style={{
                  transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                  transformStyle: 'preserve-3d',
                  transition: isDragging ? 'none' : 'transform 0.4s ease-out'
                }}
                className="w-56 h-56 sm:w-64 sm:h-64 rounded-2xl bg-gradient-to-b from-[#0A343F] to-[#04121C] border-2 border-[#D99A43] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(217,154,67,0.35)] flex flex-col items-center justify-center p-6 text-center relative"
              >
                {/* Metallic Bevel Corners */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#F2B34F]" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#F2B34F]" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#F2B34F]" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#F2B34F]" />

                {/* Central Emblem Vector */}
                <div 
                  className="w-28 h-28 sm:w-32 sm:h-32 text-[#F2B34F] drop-shadow-[0_10px_15px_rgba(0,0,0,0.6)] flex items-center justify-center"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <IconComp className="w-full h-full stroke-[1.6]" />
                </div>

                {/* Pedestal Bottom Plinth */}
                <div 
                  className="mt-3 text-[10px] font-mono tracking-widest uppercase text-[#D99A43] bg-[#061B29]/90 px-3 py-1 rounded-full border border-[#D99A43]/40"
                  style={{ transform: 'translateZ(20px)' }}
                >
                  {artifact.id}
                </div>
              </div>

              {/* Pedestal Shadow */}
              <div className="absolute -bottom-2 w-52 h-8 bg-black/60 rounded-full blur-md pointer-events-none" />
            </div>

            {/* Interaction Instruction & Reset */}
            <div className="flex items-center gap-3 mt-2 text-xs text-[#FFF7E5]/70">
              <span className="flex items-center gap-1.5 text-[11px]">
                <RotateCw className="w-3 h-3 text-[#D99A43]" />
                Click & drag to rotate in 3D
              </span>
              <button
                type="button"
                onClick={resetView}
                className="text-[11px] text-[#D99A43] hover:text-[#F2B34F] underline cursor-pointer"
              >
                Reset
              </button>
            </div>

          </div>

          {/* Right Column: Title & Key Metadata Matrix */}
          <div className="lg:col-span-7 space-y-5 text-left">
            
            {/* Identification & Share */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-[#D99A43] text-[#061B29] shadow-sm">
                  {artifact.id}
                </span>
                <span className="text-xs text-[#FFF7E5]/75 border border-[#D99A43]/40 px-3 py-1 rounded-full">
                  {artifact.category}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <GoldButton
                  variant={isSaved ? "primary" : "outline"}
                  size="sm"
                  onClick={handleToggleBookmark}
                  icon={Bookmark}
                  className="!py-1.5 !px-3 !text-xs"
                >
                  {saving ? 'Saving...' : isSaved ? 'Saved in Sanctuary' : 'Bookmark Relic'}
                </GoldButton>

                <GoldButton
                  variant="outline"
                  size="sm"
                  onClick={onShare}
                  icon={copied ? Check : Share2}
                  className="!py-1.5 !px-3 !text-xs"
                >
                  {copied ? 'Link Copied!' : 'Share Record'}
                </GoldButton>
              </div>
            </div>

            {/* Artifact Name */}
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FFF7E5] leading-tight">
              {artifact.name}
            </h1>

            {/* Short Introduction */}
            <p className="text-sm sm:text-base text-[#FFF7E5]/85 leading-relaxed font-body">
              {artifact.shortDescription || artifact.historicalDescription}
            </p>

            {/* Dimensional 2x3 Quick-Spec Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3">
              
              <div className="bg-[#082C35]/90 border border-[#D99A43]/30 rounded-xl p-3 shadow-inner">
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#D99A43] mb-1 flex items-center gap-1">
                  <Crown className="w-3 h-3" /> Dynasty
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#FFF7E5] truncate">
                  {artifact.dynasty || 'Classical'}
                </div>
              </div>

              <div className="bg-[#082C35]/90 border border-[#D99A43]/30 rounded-xl p-3 shadow-inner">
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#D99A43] mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Period
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#FFF7E5] truncate">
                  {artifact.historicalPeriod}
                </div>
              </div>

              <div className="bg-[#082C35]/90 border border-[#D99A43]/30 rounded-xl p-3 shadow-inner">
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#D99A43] mb-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> State & District
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#FFF7E5] truncate">
                  {artifact.district}, {artifact.state}
                </div>
              </div>

              <div className="bg-[#082C35]/90 border border-[#D99A43]/30 rounded-xl p-3 shadow-inner">
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#D99A43] mb-1 flex items-center gap-1">
                  <Layers className="w-3 h-3" /> Material
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#FFF7E5] truncate">
                  {artifact.material ? artifact.material.split('(')[0].trim() : 'Preserved Medium'}
                </div>
              </div>

              <div className="bg-[#082C35]/90 border border-[#D99A43]/30 rounded-xl p-3 shadow-inner">
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#D99A43] mb-1 flex items-center gap-1">
                  <Compass className="w-3 h-3" /> Age / Century
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#FFF7E5] truncate">
                  {artifact.approximateAge || 'Centuries Old'}
                </div>
              </div>

              <div className="bg-[#082C35]/90 border border-[#D99A43]/30 rounded-xl p-3 shadow-inner">
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#D99A43] mb-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Origin Findspot
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#FFF7E5] truncate">
                  {artifact.placeOfOrigin || artifact.district || 'India'}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ============================================================== */}
      {/* 2. RAISED SECTION TABS & PARCHMENT INFORMATION CARDS           */}
      {/* ============================================================== */}
      <div className="space-y-6">
        
        {/* 3D Tab Switcher Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'btn-gold-3d text-[#061B29] !shadow-[0_4px_16px_rgba(217,154,67,0.45)]'
                    : 'bg-[#F8EFD9] text-[#10283A] border border-[#E8D1A0] hover:border-[#D99A43] hover:bg-[#FFF7E5] shadow-sm'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#061B29]' : 'text-[#D99A43]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panels (Layered 3D Parchment Surfaces) */}
        <div className="card-3d-parchment rounded-2xl p-6 sm:p-10 text-left space-y-6">
          
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#10283A]">
                  Archival Overview
                </h3>
                <p className="text-sm sm:text-base text-[#10283A]/90 leading-relaxed font-body">
                  {artifact.historicalDescription || artifact.shortDescription}
                </p>
              </div>

              {/* Archival metadata bullet table */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#E8D1A0]">
                <div className="space-y-2 text-xs sm:text-sm text-[#526575]">
                  <p><strong className="text-[#10283A]">Current Conservation Status:</strong> Digitally Documented & Catalogued</p>
                  <p><strong className="text-[#10283A]">Primary Classification:</strong> {artifact.category}</p>
                  <p><strong className="text-[#10283A]">Geographical Provenance:</strong> {artifact.district}, {artifact.state}</p>
                </div>
                <div className="space-y-2 text-xs sm:text-sm text-[#526575]">
                  <p><strong className="text-[#10283A]">Material Medium:</strong> {artifact.material || 'Authentic historical medium'}</p>
                  <p><strong className="text-[#10283A]">Historical Epoch:</strong> {artifact.historicalPeriod}</p>
                  <p><strong className="text-[#10283A]">Ruler / Dynasty:</strong> {artifact.dynasty || 'Regional classical administration'}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#10283A]">
                Historical Context & Background
              </h3>
              <p className="text-sm sm:text-base text-[#10283A]/90 leading-relaxed font-body">
                {artifact.historicalDescription || 'This historical artifact represents an exceptional moment in the evolution of Indian art, architecture, and craftsmanship.'}
              </p>
              <div className="bg-[#FFF7E5] border border-[#E8D1A0] rounded-xl p-4 text-xs text-[#526575] leading-relaxed">
                <strong className="text-[#D99A43] block mb-1">Archival Note:</strong>
                Records indicate this piece played an integral role during the reign of the {artifact.dynasty || artifact.historicalPeriod}, serving as evidence of regional technological prowess and cultural continuity.
              </div>
            </div>
          )}

          {activeTab === 'materials' && (
            <div className="space-y-4">
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#10283A]">
                Composition, Materiality & Provenance
              </h3>
              <p className="text-sm sm:text-base text-[#10283A]/90 leading-relaxed font-body">
                Crafted using <span className="font-semibold text-[#10283A]">{artifact.material || 'stone, bronze or organic media'}</span>, this specimen showcases traditional Indian metallurgical and sculpting techniques passed down through specialized artisan guilds (shrenis).
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-[#FFF7E5] rounded-xl border border-[#E8D1A0]">
                  <h4 className="font-semibold text-xs text-[#10283A] mb-1">Findspot & Geography</h4>
                  <p className="text-xs text-[#526575]">{artifact.placeOfOrigin || artifact.district}, {artifact.state}</p>
                </div>
                <div className="p-4 bg-[#FFF7E5] rounded-xl border border-[#E8D1A0]">
                  <h4 className="font-semibold text-xs text-[#10283A] mb-1">Dating Method</h4>
                  <p className="text-xs text-[#526575]">Epigraphic, stylistic, and stratigraphic comparative analysis ({artifact.approximateAge || 'Centuries old'}).</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'significance' && (
            <div className="space-y-4">
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#10283A]">
                Historical Significance
              </h3>
              <p className="text-sm sm:text-base text-[#10283A]/90 leading-relaxed font-body">
                {artifact.historicalSignificance || artifact.significance || 'A cornerstone of regional identity and artistic mastery, this artifact provides invaluable insight into ancient societal hierarchies, trade networks, and philosophical systems.'}
              </p>
            </div>
          )}

          {activeTab === 'cultural' && (
            <div className="space-y-4">
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#10283A]">
                Cultural & Contemporary Importance
              </h3>
              <p className="text-sm sm:text-base text-[#10283A]/90 leading-relaxed font-body">
                {artifact.culturalImportance || 'Continues to inspire contemporary Indian arts, architecture, and scholarly discourse. It stands as an enduring emblem of civilizational pride and spiritual introspection.'}
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default ArtifactDetailsPanel;
