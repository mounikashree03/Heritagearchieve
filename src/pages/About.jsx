import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight,
  Compass, 
  Sparkles, 
  Code2, 
  Rocket,
  Shield,
  BookOpen,
  Landmark,
  Layers,
  Cpu,
  ArrowRight
} from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import ThreeDCard from '../components/ThreeDCard';
import GoldButton from '../components/GoldButton';
import TempleIllustration from '../components/TempleIllustration';

const About = () => {
  const techStack = [
    {
      name: 'React 19 & Vite 8',
      desc: 'Blazing fast single-page architecture with sub-millisecond hot module reload and modular component structure.',
      icon: Cpu,
      badge: 'Core Engine'
    },
    {
      name: 'Tailwind CSS 4 & CSS 3D',
      desc: 'Modern utility tokens, physical 3D transforms (preserve-3d, perspective, translateZ), and layered lighting shadows.',
      icon: Layers,
      badge: '3D Styling System'
    },
    {
      name: 'React Router 7',
      desc: 'Declarative dynamic routing preserving filters, state selections, breadcrumb navigation, and scroll restoration.',
      icon: Compass,
      badge: 'Navigation Engine'
    },
    {
      name: 'Heritage Iconography',
      desc: 'Handcrafted vector SVG illustrations representing Nataraja, punch-marked coins, Ashokan stupas, and palm-leaf manuscripts.',
      icon: Sparkles,
      badge: 'Museum Art System'
    }
  ];

  const archivalProcess = [
    {
      step: '01',
      title: 'Field Survey & Discovery',
      desc: 'Documenting archaeological findspots, temple inscriptions, and museum antiquities across India’s 28 states and union territories.'
    },
    {
      step: '02',
      title: 'Epigraphic Deciphering',
      desc: 'Transcribing Brahmi, Grantha, Vatteluttu, Devanagari, and Persian epigraphs into standardized digital historical records.'
    },
    {
      step: '03',
      title: '3D Digital Museum Cataloguing',
      desc: 'Encoding artifact metadata with period, dynasty, material provenance, dimensions, and high-fidelity 3D visual showcases.'
    },
    {
      step: '04',
      title: 'Public & Scholarly Access',
      desc: 'Making civilizational heritage freely accessible to students, researchers, historians, and culture enthusiasts worldwide.'
    }
  ];

  return (
    <div className="w-full flex flex-col">
      
      {/* 1. CINEMATIC DARK HERO WITH LAYERED ARCHITECTURAL ART */}
      <section className="relative bg-[#061B29] text-[#FFF7E5] py-16 lg:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#D99A43]/30 overflow-hidden">
        
        {/* Heritage Pattern Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#D99A43_1px,transparent_1px)] [background-size:28px_28px]" />

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4 text-left">
              
              <Breadcrumbs 
                theme="dark" 
                items={[{ label: 'About HeritageArchive' }]} 
              />

              {/* Title & Accent */}
              <div>
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#D99A43] block mb-1">
                  Digital Humanities Initiative
                </span>
                <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FFF7E5]">
                  About HeritageArchive
                </h1>
              </div>

              {/* Tagline */}
              <div className="text-base sm:text-lg font-semibold text-gold-bright tracking-wide">
                Preserving India's Timeless Civilizational Legacy
              </div>

              {/* Subtitle Description */}
              <p className="text-sm sm:text-base text-[#FFF7E5]/85 leading-relaxed font-body max-w-xl">
                HeritageArchive is a curated digital museum platform dedicated to documenting and celebrating India's rich material culture, temple architecture, numismatics, and sacred epigraphy. Our mission is to make historical knowledge accessible, engaging, and unforgettable through tactile 3D design.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <GoldButton
                  to="/artifacts"
                  variant="primary"
                  size="md"
                  icon={ArrowRight}
                >
                  Explore Catalog
                </GoldButton>
                <GoldButton
                  to="/states"
                  variant="secondary"
                  size="md"
                >
                  Browse States
                </GoldButton>
              </div>

            </div>

            {/* Right Side: Temple Illustration & 3D Quote Podium */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end space-y-4">
              <div className="relative w-full max-w-[340px] card-3d-dark p-6 rounded-3xl border border-[#D99A43]/40 shadow-2xl text-center">
                <TempleIllustration className="w-full h-auto max-h-[220px] mx-auto mb-4" />
                
                {/* Framed Quote Box */}
                <div className="bg-[#082C35]/90 border border-[#D99A43]/50 rounded-xl p-4 text-center shadow-inner">
                  <p className="font-heading italic text-sm text-[#F7DEB0] leading-snug">
                    “The past is not dead; it lives in our sacred architecture, our bronzes, and our collective consciousness.”
                  </p>
                  <span className="text-[10px] font-mono text-[#D99A43] tracking-widest uppercase block mt-2">
                    HeritageArchive Preservation Manifesto
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. FOUR 3D RAISED PARCHMENT FEATURE CARDS */}
      <section className="bg-[#FFF7E5] py-16 px-4 sm:px-6 lg:px-8 border-b border-[#E8D1A0]">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#10283A]">
              Core Pillars of the Digital Archive
            </h2>
            <p className="text-xs sm:text-sm text-[#526575]">
              How we organize, preserve, and present thousands of years of Indian craftsmanship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            
            {/* Panel 1: Our Purpose */}
            <ThreeDCard variant="parchment" className="p-8 space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFF7E5] to-[#F2E4C4] border border-[#D99A43]/50 flex items-center justify-center text-[#D99A43] shadow-sm">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-[#10283A]">
                    Our Purpose & Mission
                  </h3>
                  <span className="text-[11px] font-mono text-[#D99A43]">Curatorial Integrity</span>
                </div>
              </div>
              <p className="text-sm text-[#526575] leading-relaxed font-body">
                To systematically structure India's archaeological and numismatic wealth into a clean, searchable taxonomy. Users can navigate fluidly across states, districts, categories, dynasties, and historical epochs.
              </p>
            </ThreeDCard>

            {/* Panel 2: Cultural Preservation */}
            <ThreeDCard variant="parchment" className="p-8 space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFF7E5] to-[#F2E4C4] border border-[#D99A43]/50 flex items-center justify-center text-[#D99A43] shadow-sm">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-[#10283A]">
                    Historical Preservation
                  </h3>
                  <span className="text-[11px] font-mono text-[#D99A43]">Material Antiquities</span>
                </div>
              </div>
              <p className="text-sm text-[#526575] leading-relaxed font-body">
                Many physical inscriptions, palm leaf records, and rock edicts are vulnerable to natural weathering and human encroachment. Digital documentation acts as an immortal archive for future generations.
              </p>
            </ThreeDCard>

            {/* Panel 3: Open Standards */}
            <ThreeDCard variant="parchment" className="p-8 space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFF7E5] to-[#F2E4C4] border border-[#D99A43]/50 flex items-center justify-center text-[#D99A43] shadow-sm">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-[#10283A]">
                    Scholarly Accessibility
                  </h3>
                  <span className="text-[11px] font-mono text-[#D99A43]">Open Humanities</span>
                </div>
              </div>
              <p className="text-sm text-[#526575] leading-relaxed font-body">
                All records conform to open digital humanities standards, enabling university students, teachers, researchers, and museum curators to cross-reference dates, materials, and findspots with confidence.
              </p>
            </ThreeDCard>

            {/* Panel 4: Immersive 3D Experience */}
            <ThreeDCard variant="parchment" className="p-8 space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFF7E5] to-[#F2E4C4] border border-[#D99A43]/50 flex items-center justify-center text-[#D99A43] shadow-sm">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-[#10283A]">
                    Immersive Museum Aesthetics
                  </h3>
                  <span className="text-[11px] font-mono text-[#D99A43]">Physical 3D Depth</span>
                </div>
              </div>
              <p className="text-sm text-[#526575] leading-relaxed font-body">
                Rather than flat, sterile databases, HeritageArchive uses a luxurious Indian heritage aesthetic — rich midnight navy, deep teal, antique gold, and raised parchment cards that make history feel alive and tangible.
              </p>
            </ThreeDCard>

          </div>

        </div>
      </section>

      {/* 3. LAYERED ARCHIVAL PROCESS DIAGRAM */}
      <section className="bg-[#082C35] py-16 px-4 sm:px-6 lg:px-8 border-b border-[#D99A43]/30 text-[#FFF7E5] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-15 bg-[radial-gradient(#D99A43_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="relative max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#FFF7E5]">
              Archival Curation Process
            </h2>
            <p className="text-xs sm:text-sm text-[#FFF7E5]/75">
              From archaeological field survey to interactive digital museum cataloguing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {archivalProcess.map((proc) => (
              <div 
                key={proc.step} 
                className="card-3d-dark p-6 rounded-2xl border border-[#D99A43]/30 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="text-2xl font-heading font-extrabold text-[#F2B34F] mb-3">
                    {proc.step}
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#FFF7E5] mb-2 leading-snug">
                    {proc.title}
                  </h3>
                  <p className="text-xs text-[#FFF7E5]/80 leading-relaxed font-body">
                    {proc.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#0A343F] flex items-center justify-between text-[11px] text-[#D99A43]">
                  <span>Phase {proc.step}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. 3D-STYLE TECHNOLOGY STACK SECTION */}
      <section className="bg-[#FFF7E5] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#10283A]">
              3D Architecture & Technology Stack
            </h2>
            <p className="text-xs sm:text-sm text-[#526575]">
              Engineered with modern web technologies, zero model bloat, and sub-millisecond responsiveness.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {techStack.map((tech) => {
              const Icon = tech.icon;
              return (
                <ThreeDCard key={tech.name} variant="parchment" className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#061B29] border border-[#D99A43]/50 flex items-center justify-center text-[#D99A43]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-[#061B29] bg-[#D99A43]/20 border border-[#D99A43]/40 px-2 py-0.5 rounded-full">
                        {tech.badge}
                      </span>
                    </div>

                    <h3 className="font-heading text-base font-bold text-[#10283A] mb-2">
                      {tech.name}
                    </h3>
                    
                    <p className="text-xs text-[#526575] leading-relaxed font-body">
                      {tech.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#E8D1A0] text-[11px] font-mono text-[#D99A43]">
                    Lightweight & Performant
                  </div>
                </ThreeDCard>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
};

export default About;
