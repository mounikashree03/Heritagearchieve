import React from 'react';

/**
 * TempleIllustration - Intricate Antique Gold Architectural SVG Line Art
 * Depicting classical Indian temple architecture (Gopuram / Shikhara, Mandapa, Kalasha, Pillars)
 * in antique gold (#D99A43) matching the reference design.
 */
export const TempleIllustration = ({ className = "w-full h-auto", variant = "hero" }) => {
  return (
    <div className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}>
      
      {/* Background Soft Antique Gold Ambient Glow */}
      <div className="absolute inset-0 bg-radial from-[#D99A43]/18 via-[#0B2C35]/10 to-transparent blur-2xl pointer-events-none" />

      <svg
        viewBox="0 0 600 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-[480px] drop-shadow-[0_0_24px_rgba(217,154,67,0.25)]"
      >
        <defs>
          <linearGradient id="goldGradientHero" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F7E3B5" />
            <stop offset="45%" stopColor="#D99A43" />
            <stop offset="100%" stopColor="#8C5C1B" />
          </linearGradient>
          <linearGradient id="templeGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D99A43" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#D99A43" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Celestial Mandala / Halo Behind Spire */}
        <circle cx="300" cy="230" r="190" stroke="url(#goldGradientHero)" strokeWidth="0.8" strokeDasharray="4 6" opacity="0.35" />
        <circle cx="300" cy="230" r="150" stroke="#D99A43" strokeWidth="0.6" opacity="0.25" />
        <circle cx="300" cy="230" r="110" stroke="url(#goldGradientHero)" strokeWidth="0.8" strokeDasharray="6 6" opacity="0.3" />

        {/* Delicate Sunburst Radiants */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
          <line
            key={deg}
            x1="300"
            y1="230"
            x2={300 + 195 * Math.cos((deg * Math.PI) / 180)}
            y2={230 + 195 * Math.sin((deg * Math.PI) / 180)}
            stroke="#D99A43"
            strokeWidth="0.5"
            strokeDasharray="2 6"
            opacity="0.25"
          />
        ))}

        {/* Base Steps (Adhisthana / Jagati Platform) */}
        <path d="M 40 495 L 560 495" stroke="url(#goldGradientHero)" strokeWidth="2.5" />
        <path d="M 65 480 L 535 480" stroke="#D99A43" strokeWidth="1.6" />
        <path d="M 85 465 L 515 465" stroke="url(#goldGradientHero)" strokeWidth="1.4" />
        <rect x="105" y="450" width="390" height="15" fill="url(#templeGlow)" stroke="#D99A43" strokeWidth="1.2" />

        {/* Pillar Colonnades (Mandapa Hall) */}
        {/* Leftmost Pillar */}
        <path d="M 135 450 L 135 325 L 150 325 L 150 450 Z" fill="#071B2A" stroke="url(#goldGradientHero)" strokeWidth="1.2" />
        <line x1="142.5" y1="325" x2="142.5" y2="450" stroke="#D99A43" strokeWidth="0.6" strokeDasharray="4 4" />
        <path d="M 130 325 L 155 325 L 142.5 312 Z" fill="#071B2A" stroke="#D99A43" strokeWidth="1" />

        {/* Left Inner Pillar */}
        <path d="M 205 450 L 205 325 L 220 325 L 220 450 Z" fill="#071B2A" stroke="url(#goldGradientHero)" strokeWidth="1.2" />
        <line x1="212.5" y1="325" x2="212.5" y2="450" stroke="#D99A43" strokeWidth="0.6" strokeDasharray="4 4" />
        <path d="M 200 325 L 225 325 L 212.5 312 Z" fill="#071B2A" stroke="#D99A43" strokeWidth="1" />

        {/* Right Inner Pillar */}
        <path d="M 380 450 L 380 325 L 395 325 L 395 450 Z" fill="#071B2A" stroke="url(#goldGradientHero)" strokeWidth="1.2" />
        <line x1="387.5" y1="325" x2="387.5" y2="450" stroke="#D99A43" strokeWidth="0.6" strokeDasharray="4 4" />
        <path d="M 375 325 L 400 325 L 387.5 312 Z" fill="#071B2A" stroke="#D99A43" strokeWidth="1" />

        {/* Rightmost Pillar */}
        <path d="M 450 450 L 450 325 L 465 325 L 465 450 Z" fill="#071B2A" stroke="url(#goldGradientHero)" strokeWidth="1.2" />
        <line x1="457.5" y1="325" x2="457.5" y2="450" stroke="#D99A43" strokeWidth="0.6" strokeDasharray="4 4" />
        <path d="M 445 325 L 470 325 L 457.5 312 Z" fill="#071B2A" stroke="#D99A43" strokeWidth="1" />

        {/* Central Sanctum Torana Archway */}
        <path d="M 240 450 L 240 340 Q 300 295 360 340 L 360 450" stroke="url(#goldGradientHero)" strokeWidth="2" fill="url(#templeGlow)" />
        <path d="M 252 450 L 252 350 Q 300 310 348 350 L 348 450" stroke="#D99A43" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="300" cy="355" r="18" stroke="url(#goldGradientHero)" strokeWidth="1.2" fill="#071B2A" />
        <path d="M 300 342 L 300 368 M 287 355 L 313 355" stroke="#D99A43" strokeWidth="1" />

        {/* Lower Roof Eaves (Chhajja Cornice) */}
        <path d="M 110 325 L 490 325 L 475 298 L 125 298 Z" fill="#071B2A" stroke="url(#goldGradientHero)" strokeWidth="1.6" />
        <line x1="120" y1="318" x2="480" y2="318" stroke="#D99A43" strokeWidth="0.8" />
        {/* Ornamental fringe */}
        {[135, 165, 195, 225, 255, 285, 315, 345, 375, 405, 435, 465].map((x) => (
          <path key={x} d={`M ${x} 325 Q ${x + 6} 333 ${x + 12} 325`} stroke="#D99A43" strokeWidth="0.8" />
        ))}

        {/* Left Sub-Tower (Urushringa) */}
        <path d="M 145 298 L 225 298 L 215 220 L 155 220 Z" fill="#071B2A" stroke="url(#goldGradientHero)" strokeWidth="1.2" />
        <path d="M 155 220 L 215 220 L 185 160 Z" fill="#071B2A" stroke="url(#goldGradientHero)" strokeWidth="1.2" />
        <path d="M 185 160 L 185 142" stroke="url(#goldGradientHero)" strokeWidth="1.5" />
        <circle cx="185" cy="139" r="3.5" fill="#F7E3B5" stroke="#D99A43" strokeWidth="0.8" />

        {/* Right Sub-Tower (Urushringa) */}
        <path d="M 375 298 L 455 298 L 445 220 L 385 220 Z" fill="#071B2A" stroke="url(#goldGradientHero)" strokeWidth="1.2" />
        <path d="M 385 220 L 445 220 L 415 160 Z" fill="#071B2A" stroke="url(#goldGradientHero)" strokeWidth="1.2" />
        <path d="M 415 160 L 415 142" stroke="url(#goldGradientHero)" strokeWidth="1.5" />
        <circle cx="415" cy="139" r="3.5" fill="#F7E3B5" stroke="#D99A43" strokeWidth="0.8" />

        {/* Central Gopuram / Shikhara Pyramidal Spire */}
        {/* Tier 1 */}
        <path d="M 210 298 L 390 298 L 380 240 L 220 240 Z" fill="#071B2A" stroke="url(#goldGradientHero)" strokeWidth="1.6" />
        <line x1="220" y1="268" x2="380" y2="268" stroke="#D99A43" strokeWidth="0.8" strokeDasharray="6 3" />
        <rect x="278" y="248" width="44" height="20" stroke="#D99A43" strokeWidth="1" fill="#0B2C35" />
        <path d="M 283 268 Q 300 250 317 268" stroke="url(#goldGradientHero)" strokeWidth="1" />

        {/* Tier 2 */}
        <path d="M 226 240 L 374 240 L 364 188 L 236 188 Z" fill="#071B2A" stroke="url(#goldGradientHero)" strokeWidth="1.5" />
        <line x1="236" y1="213" x2="364" y2="213" stroke="#D99A43" strokeWidth="0.8" strokeDasharray="5 3" />
        <circle cx="300" cy="213" r="8" stroke="url(#goldGradientHero)" strokeWidth="1" fill="#0B2C35" />

        {/* Tier 3 */}
        <path d="M 242 188 L 358 188 L 348 140 L 252 140 Z" fill="#071B2A" stroke="url(#goldGradientHero)" strokeWidth="1.5" />
        <line x1="252" y1="163" x2="348" y2="163" stroke="#D99A43" strokeWidth="0.8" strokeDasharray="4 2" />

        {/* Tier 4 */}
        <path d="M 258 140 L 342 140 L 330 98 L 270 98 Z" fill="#071B2A" stroke="url(#goldGradientHero)" strokeWidth="1.6" />
        <line x1="270" y1="118" x2="330" y2="118" stroke="#D99A43" strokeWidth="0.8" strokeDasharray="4 2" />

        {/* Neck (Griva) */}
        <rect x="280" y="85" width="40" height="13" fill="#0B2C35" stroke="url(#goldGradientHero)" strokeWidth="1.4" />

        {/* Amalaka (Ribbed Stone Ring) */}
        <ellipse cx="300" cy="78" rx="35" ry="11" fill="#071B2A" stroke="url(#goldGradientHero)" strokeWidth="1.8" />
        {[-26, -18, -10, 0, 10, 18, 26].map((offset) => (
          <path key={offset} d={`M ${300 + offset} 68 Q ${300 + offset * 1.1} 78 ${300 + offset} 88`} stroke="#D99A43" strokeWidth="0.8" />
        ))}

        {/* Kalasha (Sacred Golden Vase Finial) */}
        <path d="M 292 68 C 290 58, 310 58, 308 68 Z" fill="url(#goldGradientHero)" stroke="#D99A43" strokeWidth="1" />
        <path d="M 295 58 L 305 58 L 303 48 L 297 48 Z" fill="url(#goldGradientHero)" stroke="#D99A43" strokeWidth="1" />
        <line x1="300" y1="48" x2="300" y2="26" stroke="url(#goldGradientHero)" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="300" cy="22" r="3.5" fill="#F7E3B5" stroke="#D99A43" strokeWidth="1" />
        <path d="M 293 35 Q 300 30 307 35" stroke="#F7E3B5" strokeWidth="1.2" fill="none" />

        {/* Heritage Pennants (Dhwaja) */}
        <path d="M 95 450 L 95 360 L 65 372 L 95 384 Z" fill="url(#templeGlow)" stroke="url(#goldGradientHero)" strokeWidth="1" />
        <path d="M 505 450 L 505 360 L 535 372 L 505 384 Z" fill="url(#templeGlow)" stroke="url(#goldGradientHero)" strokeWidth="1" />
      </svg>
    </div>
  );
};

export default TempleIllustration;
