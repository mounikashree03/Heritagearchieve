import React from 'react';
import { Link } from 'react-router-dom';
import { 
  SealIcon, 
  StupaReliefIcon, 
  TempleSmallIcon, 
  NatarajaIcon, 
  WeaponIcon, 
  RomanCoinIcon 
} from './HeritageIcons';

export const timelinePeriods = [
  {
    id: 'indus',
    name: 'Indus Valley',
    span: '(3300–1300 BCE)',
    query: 'Harappan',
    icon: SealIcon,
    summary: 'Bronze Age urban civilization known for planned brick architecture and trade seals.'
  },
  {
    id: 'maurya',
    name: 'Mauryan',
    span: '(322–185 BCE)',
    query: 'Mauryan',
    icon: StupaReliefIcon,
    summary: 'Pan-Indian imperial power renowned for Ashokan rock edicts and polished stone stupas.'
  },
  {
    id: 'gupta',
    name: 'Gupta',
    span: '(320–550 CE)',
    query: 'Gupta',
    icon: TempleSmallIcon,
    summary: 'Classical Golden Age of Sanskrit literature, mathematics, astronomy, and temple sculpture.'
  },
  {
    id: 'chola',
    name: 'Chola',
    span: '(850–1279 CE)',
    query: 'Chola',
    icon: NatarajaIcon,
    summary: 'Maritime empire famous for magnificent Dravidian stone vimanas and lost-wax bronze icons.'
  },
  {
    id: 'medieval',
    name: 'Medieval',
    span: '(1200–1700 CE)',
    query: 'Medieval',
    icon: WeaponIcon,
    summary: 'Epoch of Vijayanagara, Delhi Sultanate, Mughals, and regional forts and weapon craft.'
  },
  {
    id: 'colonial',
    name: 'Colonial',
    span: '(1700–1947 CE)',
    query: 'Colonial',
    icon: RomanCoinIcon,
    summary: 'Maritime trade records, colonial cartography, mint numismatics, and early preservation.'
  }
];

const Timeline = ({ className = '' }) => {
  return (
    <section className={`relative bg-[#061B29] text-[#FFF7E5] py-16 px-4 sm:px-6 lg:px-8 overflow-hidden ${className}`}>
      
      {/* Decorative Gold Heritage Wave at top and bottom */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D99A43] to-transparent opacity-50" />
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#D99A43_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="relative max-w-7xl mx-auto">
        
        {/* Section Title with Decorative Gold Accent */}
        <div className="text-center space-y-2 mb-14">
          <div className="inline-flex items-center gap-3">
            <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#D99A43]" />
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#FFF7E5] tracking-tight">
              Journey Through History
            </h2>
            <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#D99A43]" />
          </div>
          <p className="text-xs sm:text-sm text-[#FFF7E5]/75 max-w-xl mx-auto font-body">
            Explore artifacts from different historical periods and civilizations.
          </p>
        </div>

        {/* Desktop / Tablet Timeline Horizontal Track */}
        <div className="relative">
          {/* Continuous Glowing Golden Horizon Line */}
          <div className="hidden md:block absolute top-[44px] left-[6%] right-[6%] h-[2px] bg-gradient-to-r from-[#D99A43]/20 via-[#F2B34F] to-[#D99A43]/20 shadow-[0_0_12px_rgba(217,154,67,0.5)] z-0" />

          {/* 6 Milestone Nodes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 relative z-10">
            {timelinePeriods.map((period) => {
              const IconComp = period.icon;
              return (
                <Link
                  key={period.id}
                  to={`/artifacts?period=${encodeURIComponent(period.query)}`}
                  className="group flex flex-col items-center text-center p-3 rounded-2xl transition-all duration-300 hover:bg-[#082C35]/60 hover:shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
                >
                  {/* 3D Elevated Circular Icon Node */}
                  <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full timeline-node-3d flex items-center justify-center text-[#D99A43] group-hover:text-[#F2B34F] mb-3.5 relative cursor-pointer">
                    <IconComp className="w-10 h-10 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:scale-110" />
                    
                    {/* Small pulse ring indicator */}
                    <div className="absolute -bottom-1 w-2 h-2 rounded-full bg-[#D99A43] group-hover:bg-[#F2B34F] shadow-[0_0_8px_#F2B34F]" />
                  </div>

                  {/* Era Name */}
                  <h3 className="font-heading text-sm sm:text-base font-bold text-[#FFF7E5] group-hover:text-[#F2B34F] transition-colors leading-tight">
                    {period.name}
                  </h3>

                  {/* Date Span */}
                  <span className="text-[11px] text-[#D99A43] font-medium tracking-tight mt-1">
                    {period.span}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D99A43] to-transparent opacity-50" />
    </section>
  );
};

export default Timeline;
