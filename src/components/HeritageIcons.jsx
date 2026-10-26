import React from 'react';

/**
 * Dedicated Antique Gold Vector Line-Art Icons for Artifacts & Categories
 * Handcrafted to match the reference digital museum aesthetic.
 */

// 1. Chola Bronze Nataraja Icon
export const NatarajaIcon = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Outer Flaming Prabhamandala (Halo of Fire) */}
    <circle cx="32" cy="32" r="26" stroke="#D99A43" strokeWidth="2" strokeDasharray="3 2" />
    <circle cx="32" cy="32" r="23" stroke="#D99A43" strokeWidth="1" opacity="0.6" />
    {/* Dancing Torso & Head */}
    <circle cx="32" cy="18" r="4" fill="#D99A43" />
    <path d="M 32 22 L 32 34 L 28 42 M 32 34 L 38 46 L 43 45" stroke="#D99A43" strokeWidth="2" strokeLinecap="round" />
    {/* Lifted Left Leg (Kunchita Pada) */}
    <path d="M 32 34 L 24 38 L 30 35" stroke="#D99A43" strokeWidth="2" strokeLinecap="round" />
    {/* 4 Arms: Damaru (drum), Agni (fire), Abhaya mudra, Danda-hasta */}
    <path d="M 22 22 Q 27 26 32 26 Q 37 26 42 22" stroke="#D99A43" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M 18 28 Q 25 30 32 28 Q 39 30 46 28" stroke="#D99A43" strokeWidth="1.8" strokeLinecap="round" />
    {/* Little fire flames on ring */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
      <circle
        key={deg}
        cx={32 + 26 * Math.cos((deg * Math.PI) / 180)}
        cy={32 + 26 * Math.sin((deg * Math.PI) / 180)}
        r="1.5"
        fill="#D99A43"
      />
    ))}
    {/* Lotus Pedestal Base */}
    <path d="M 20 54 L 44 54 M 24 57 L 40 57" stroke="#D99A43" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 2. Ancient Roman Coin Icon
export const RomanCoinIcon = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Die-struck irregular edge */}
    <circle cx="32" cy="32" r="25" stroke="#D99A43" strokeWidth="2.5" />
    <circle cx="32" cy="32" r="21" stroke="#D99A43" strokeWidth="1" strokeDasharray="2 3" opacity="0.7" />
    {/* Classical Profile Laureate Head */}
    <path d="M 32 18 Q 38 18 38 24 Q 38 28 35 30 L 36 38 L 30 38 L 29 32 Q 26 30 26 25 Q 26 18 32 18 Z" stroke="#D99A43" strokeWidth="1.6" fill="#D99A43" fillOpacity="0.15" />
    {/* Laurel Wreath */}
    <path d="M 28 20 Q 32 16 36 20" stroke="#D99A43" strokeWidth="1.5" strokeLinecap="round" />
    {/* Ancient Numismatic Inscription Dots */}
    {[15, 60, 105, 150, 195, 240, 285, 330].map((deg) => (
      <circle
        key={deg}
        cx={32 + 18 * Math.cos((deg * Math.PI) / 180)}
        cy={32 + 18 * Math.sin((deg * Math.PI) / 180)}
        r="1.2"
        fill="#D99A43"
      />
    ))}
  </svg>
);

// 3. Amaravati Stupa Relief Icon
export const StupaReliefIcon = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Round Medallion border */}
    <circle cx="32" cy="32" r="26" stroke="#D99A43" strokeWidth="1.5" />
    {/* Stupa Hemispherical Dome (Anda) */}
    <path d="M 16 44 Q 16 22 32 22 Q 48 22 48 44 Z" stroke="#D99A43" strokeWidth="2" fill="#D99A43" fillOpacity="0.12" />
    {/* Harmika (Square Balcony) */}
    <rect x="28" y="16" width="8" height="6" stroke="#D99A43" strokeWidth="1.5" fill="#071B2A" />
    {/* Chhatravali (Three-tiered umbrella spindle) */}
    <line x1="32" y1="16" x2="32" y2="8" stroke="#D99A43" strokeWidth="1.8" />
    <line x1="26" y1="12" x2="38" y2="12" stroke="#D99A43" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="28" y1="9" x2="36" y2="9" stroke="#D99A43" strokeWidth="1.8" strokeLinecap="round" />
    {/* Vedika (Carved Railing Plinth) */}
    <path d="M 12 44 L 52 44 M 14 50 L 50 50" stroke="#D99A43" strokeWidth="2" strokeLinecap="round" />
    <line x1="20" y1="44" x2="20" y2="50" stroke="#D99A43" strokeWidth="1" />
    <line x1="32" y1="44" x2="32" y2="50" stroke="#D99A43" strokeWidth="1" />
    <line x1="44" y1="44" x2="44" y2="50" stroke="#D99A43" strokeWidth="1" />
  </svg>
);

// 4. Palm-Leaf Manuscript Icon (Ola-chudi)
export const PalmLeafIcon = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Wooden Bound Protective Boards */}
    <rect x="8" y="20" width="48" height="24" rx="3" stroke="#D99A43" strokeWidth="2" fill="#D99A43" fillOpacity="0.1" />
    {/* Inner Leaf Slits */}
    <line x1="12" y1="26" x2="52" y2="26" stroke="#D99A43" strokeWidth="1" strokeDasharray="3 2" />
    <line x1="12" y1="32" x2="52" y2="32" stroke="#D99A43" strokeWidth="1" strokeDasharray="3 2" />
    <line x1="12" y1="38" x2="52" y2="38" stroke="#D99A43" strokeWidth="1" strokeDasharray="3 2" />
    {/* Binding Cord Holes and Thread */}
    <circle cx="20" cy="32" r="2.5" fill="#071B2A" stroke="#D99A43" strokeWidth="1.5" />
    <circle cx="44" cy="32" r="2.5" fill="#071B2A" stroke="#D99A43" strokeWidth="1.5" />
    {/* Silk Binding Cord Wrap */}
    <path d="M 20 16 L 20 48 M 44 16 L 44 48" stroke="#D99A43" strokeWidth="1.5" />
  </svg>
);

// 5. Inscription Epigraph Slab Icon
export const InscriptionIcon = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Rounded Stele / Epigraph Tablet */}
    <path d="M 16 18 Q 32 10 48 18 L 48 54 L 16 54 Z" stroke="#D99A43" strokeWidth="2" fill="#D99A43" fillOpacity="0.1" />
    {/* Ancient Brahmi / Grantha chiseled rows */}
    <line x1="22" y1="24" x2="42" y2="24" stroke="#D99A43" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="20" y1="30" x2="44" y2="30" stroke="#D99A43" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="22" y1="36" x2="42" y2="36" stroke="#D99A43" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="20" y1="42" x2="44" y2="42" stroke="#D99A43" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="24" y1="48" x2="40" y2="48" stroke="#D99A43" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

// 6. Pottery & Ceramics Icon (Harappan / Megalithic Urn)
export const PotteryIcon = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Vessel rim */}
    <ellipse cx="32" cy="16" rx="14" ry="4" stroke="#D99A43" strokeWidth="2" />
    {/* Kalasha Bulbous body */}
    <path d="M 18 16 Q 10 32 20 48 L 44 48 Q 54 32 46 16" stroke="#D99A43" strokeWidth="2" fill="#D99A43" fillOpacity="0.1" />
    {/* Plinth */}
    <rect x="24" y="48" width="16" height="4" stroke="#D99A43" strokeWidth="2" rx="1" />
    {/* Chevron / Band pattern */}
    <path d="M 15 32 Q 32 36 49 32" stroke="#D99A43" strokeWidth="1.5" />
    <path d="M 16 38 Q 32 42 48 38" stroke="#D99A43" strokeWidth="1.5" />
  </svg>
);

// 7. Jewellery & Ornaments Icon
export const JewelleryIcon = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Gold Filigree Torque / Necklace */}
    <path d="M 16 20 C 16 40 48 40 48 20" stroke="#D99A43" strokeWidth="2.5" strokeLinecap="round" />
    {/* Pendant droplet */}
    <circle cx="32" cy="42" r="5" stroke="#D99A43" strokeWidth="2" fill="#D99A43" fillOpacity="0.2" />
    <path d="M 32 47 L 32 54" stroke="#D99A43" strokeWidth="2" strokeLinecap="round" />
    {/* Beads */}
    {[20, 26, 38, 44].map((x) => (
      <circle key={x} cx={x} cy={27 + (x === 26 || x === 38 ? 4 : 0)} r="2" fill="#D99A43" />
    ))}
  </svg>
);

// 8. Weapons & Tools Icon (Crossed Swords / Dagger)
export const WeaponIcon = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Sword 1 */}
    <line x1="14" y1="14" x2="48" y2="48" stroke="#D99A43" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M 44 52 L 52 44 M 46 50 L 50 46" stroke="#D99A43" strokeWidth="2" strokeLinecap="round" />
    {/* Sword 2 */}
    <line x1="50" y1="14" x2="16" y2="48" stroke="#D99A43" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M 12 44 L 20 52 M 14 46 L 18 50" stroke="#D99A43" strokeWidth="2" strokeLinecap="round" />
    {/* Central Boss / Shield */}
    <circle cx="32" cy="31" r="5" stroke="#D99A43" strokeWidth="2" fill="#071B2A" />
  </svg>
);

// 9. Others / Seals Icon (Steatite Harappan Seal)
export const SealIcon = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Square Stamp Border */}
    <rect x="14" y="14" width="36" height="36" rx="4" stroke="#D99A43" strokeWidth="2" fill="#D99A43" fillOpacity="0.1" />
    {/* Diamond rhombus emblem */}
    <polygon points="32,20 44,32 32,44 20,32" stroke="#D99A43" strokeWidth="1.8" />
    <circle cx="32" cy="32" r="3" fill="#D99A43" />
  </svg>
);

// 10. Architectural / Temple Motif
export const TempleSmallIcon = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Temple Spire */}
    <path d="M 24 6 L 34 26 L 14 26 Z" stroke="#D99A43" strokeWidth="1.6" fill="#D99A43" fillOpacity="0.15" />
    <line x1="24" y1="2" x2="24" y2="6" stroke="#D99A43" strokeWidth="2" />
    <rect x="12" y="26" width="24" height="14" stroke="#D99A43" strokeWidth="1.6" />
    <path d="M 20 40 L 20 32 Q 24 29 28 32 L 28 40" stroke="#D99A43" strokeWidth="1.4" />
    <line x1="8" y1="42" x2="40" y2="42" stroke="#D99A43" strokeWidth="2" />
  </svg>
);

// Helper to choose the best icon for an artifact
export const getArtifactHeritageIcon = (artifact) => {
  const cat = (artifact.category || '').toLowerCase();
  const name = (artifact.name || '').toLowerCase();

  if (name.includes('nataraja') || cat.includes('sculpture')) return NatarajaIcon;
  if (name.includes('coin') || cat.includes('coin')) return RomanCoinIcon;
  if (name.includes('stupa') || name.includes('relief') || name.includes('carving')) return StupaReliefIcon;
  if (name.includes('manuscript') || name.includes('leaf')) return PalmLeafIcon;
  if (cat.includes('inscription') || name.includes('epigraph')) return InscriptionIcon;
  if (cat.includes('pottery') || cat.includes('ceramic')) return PotteryIcon;
  if (cat.includes('jewellery') || cat.includes('ornament')) return JewelleryIcon;
  if (cat.includes('weapon') || cat.includes('sword') || cat.includes('dagger')) return WeaponIcon;
  return SealIcon;
};

export const HeritageIcons = {
  nataraja: NatarajaIcon,
  sculpture: NatarajaIcon,
  coin: RomanCoinIcon,
  stupa: StupaReliefIcon,
  manuscript: PalmLeafIcon,
  scroll: PalmLeafIcon,
  inscription: InscriptionIcon,
  pottery: PotteryIcon,
  jewellery: JewelleryIcon,
  weapon: WeaponIcon,
  shield: WeaponIcon,
  seal: SealIcon,
  temple: TempleSmallIcon,
  compass: TempleSmallIcon,
  crown: JewelleryIcon
};

export default HeritageIcons;
