import React from 'react';

/**
 * PageBackground - Reusable 3D layered heritage background
 * Offers dark cinematic mode or warm ivory parchment mode with subtle depth.
 */
const PageBackground = ({
  children,
  variant = 'dark', // 'dark' | 'parchment'
  className = ''
}) => {
  if (variant === 'dark') {
    return (
      <div className={`relative min-h-[calc(100vh-80px)] bg-gradient-to-b from-[#061B29] via-[#082C35] to-[#04141E] text-[#FFF7E5] overflow-hidden ${className}`}>
        {/* Subtle Radial Heritage Pattern Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#D99A43_1px,transparent_1px)] [background-size:32px_32px]" />

        {/* Ambient Top Lighting Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[radial-gradient(ellipse_at_top,rgba(242,179,79,0.18)_0%,rgba(217,154,67,0.05)_50%,transparent_75%)] pointer-events-none blur-3xl" />

        {/* Bottom Ambient Vignette */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#020A0F] to-transparent pointer-events-none" />

        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative min-h-[calc(100vh-80px)] bg-[#FFF7E5] text-[#10283A] overflow-hidden ${className}`}>
      {/* Subtle Parchment Texture Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#061B29_1px,transparent_1px)] [background-size:28px_28px]" />

      {/* Warm Golden Glow Corner */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(217,154,67,0.1)_0%,transparent_70%)] pointer-events-none blur-2xl" />

      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default PageBackground;
