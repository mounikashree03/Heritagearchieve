import React from 'react';

/**
 * LoadingSpinner - 3D Heritage rotating metallic insignia spinner
 */
const LoadingSpinner = ({ size = 'md', text = 'Loading historical archives...' }) => {
  const sizeMap = {
    sm: { container: 'w-8 h-8', ring: 'border-2', icon: 16 },
    md: { container: 'w-14 h-14', ring: 'border-3', icon: 26 },
    lg: { container: 'w-20 h-20', ring: 'border-4', icon: 38 }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4" role="status" aria-label="Loading">
      <div className="relative flex items-center justify-center">
        {/* Outer glowing 3D depth disc */}
        <div className={`absolute ${currentSize.container} rounded-full bg-gradient-to-tr from-[#D99A43]/20 via-[#F2B34F]/30 to-transparent blur-md animate-pulse`} />

        {/* Outer rotating engraved ring */}
        <div 
          className={`${currentSize.container} rounded-full border-t-[#D99A43] border-r-[#F2B34F] border-b-[#9E6E24] border-l-transparent animate-spin`}
          style={{ animationDuration: '1.2s' }}
        />

        {/* Inner reverse-spinning mandala / star emblem */}
        <div 
          className="absolute rounded-full border-2 border-dashed border-[#F2B34F]/60 animate-spin"
          style={{ 
            width: size === 'lg' ? '48px' : size === 'sm' ? '20px' : '32px',
            height: size === 'lg' ? '48px' : size === 'sm' ? '20px' : '32px',
            animationDuration: '3s', 
            animationDirection: 'reverse' 
          }}
        />

        {/* Central golden core */}
        <div className="absolute w-2 h-2 rounded-full bg-[#F2B34F] shadow-[0_0_8px_#F2B34F]" />
      </div>

      {text && (
        <p className="font-serif text-sm tracking-wide text-[#F2B34F] animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
