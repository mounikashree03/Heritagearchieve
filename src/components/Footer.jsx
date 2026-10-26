import React from 'react';
import { Link } from 'react-router-dom';
import { Landmark, Mail, MapPin, Globe, Compass, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-auto bg-[#061B29] text-[#FFF7E5] border-t border-[#D99A43]/30 relative overflow-hidden">
      
      {/* Decorative Gold Heritage Wave */}
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#F2B34F] to-transparent opacity-70" />
      <div className="absolute inset-0 pointer-events-none opacity-15 bg-[radial-gradient(#D99A43_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#082C35]">
          
          {/* Col 1: Brand & Identity */}
          <div className="md:col-span-1 space-y-4 text-left">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0A343F] to-[#04141E] border border-[#D99A43]/60 flex items-center justify-center text-[#D99A43] shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                <Landmark className="w-5 h-5 stroke-[1.8]" />
              </div>
              <span className="font-heading text-xl font-bold tracking-tight text-[#FFF7E5]">
                HeritageArchive
              </span>
            </Link>
            
            <p className="text-xs text-[#D99A43] font-semibold tracking-wide">
              Preserving India's Timeless Heritage Digitally.
            </p>
            
            <p className="text-xs text-[#FFF7E5]/75 leading-relaxed font-body">
              An open digital museum cataloguing the material culture, sacred epigraphy, numismatics, and temple architecture of India across dynasties and centuries.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="text-left space-y-3.5">
            <h4 className="font-heading text-sm font-bold text-[#F2B34F] uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D99A43]" />
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FFF7E5]/80 font-body">
              <li>
                <Link to="/" className="hover:text-[#F2B34F] transition-colors">
                  Museum Home
                </Link>
              </li>
              <li>
                <Link to="/states" className="hover:text-[#F2B34F] transition-colors">
                  Browse by State (15 States)
                </Link>
              </li>
              <li>
                <Link to="/artifacts" className="hover:text-[#F2B34F] transition-colors">
                  Explore Artifacts (68+ Records)
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#F2B34F] transition-colors">
                  About Digital Heritage
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Curated Collections */}
          <div className="text-left space-y-3.5">
            <h4 className="font-heading text-sm font-bold text-[#F2B34F] uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D99A43]" />
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FFF7E5]/80 font-body">
              <li>
                <Link to="/artifacts?category=Sculptures%20and%20Bronze%20Icons" className="hover:text-[#F2B34F] transition-colors">
                  Sculptures & Bronze Icons
                </Link>
              </li>
              <li>
                <Link to="/artifacts?category=Ancient%20Coins" className="hover:text-[#F2B34F] transition-colors">
                  Ancient Numismatics & Coins
                </Link>
              </li>
              <li>
                <Link to="/artifacts?category=Temple%20Inscriptions" className="hover:text-[#F2B34F] transition-colors">
                  Temple Epigraphs & Edicts
                </Link>
              </li>
              <li>
                <Link to="/artifacts?category=Manuscripts%20and%20Palm-Leaf%20Records" className="hover:text-[#F2B34F] transition-colors">
                  Palm-Leaf & Scribe Records
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Archival Standards & Contact */}
          <div className="text-left space-y-3.5">
            <h4 className="font-heading text-sm font-bold text-[#F2B34F] uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D99A43]" />
              Archival Standards
            </h4>
            <p className="text-xs text-[#FFF7E5]/75 leading-relaxed font-body">
              Curated under open digital humanities guidelines for students, historians, and culture enthusiasts worldwide.
            </p>
            <div className="pt-2 text-xs space-y-1.5 text-[#FFF7E5]/70">
              <div className="flex items-center gap-2 text-[#D99A43]">
                <Mail className="w-3.5 h-3.5" />
                <span>info@heritagearchive.in</span>
              </div>
              <div className="flex items-center gap-2 text-[#FFF7E5]/60">
                <Globe className="w-3.5 h-3.5 text-[#D99A43]" />
                <span>Digital Humanities Initiative, India</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FFF7E5]/60 gap-4">
          <p>© {new Date().getFullYear()} HeritageArchive. Dedicated to Indian Civilizational Heritage & Preservation.</p>
          <div className="flex items-center gap-4 text-[#D99A43]">
            <Link to="/about" className="hover:underline">Documentation</Link>
            <span>•</span>
            <Link to="/states" className="hover:underline">Geographical Index</Link>
            <span>•</span>
            <Link to="/artifacts" className="hover:underline">Catalog</Link>
          </div>
        </div>

      </div>

    </footer>
  );
};

export default Footer;
