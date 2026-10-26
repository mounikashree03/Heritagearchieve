import React, { useRef, useState, useEffect } from 'react';

/**
 * ThreeDCard - A reusable interactive 3D container component.
 * Provides subtle realistic tilt and specular light highlight on mouse move,
 * with graceful fallback on touch devices or reduced motion preferences.
 */
const ThreeDCard = ({
  children,
  className = '',
  variant = 'parchment', // 'parchment' | 'dark' | 'glass'
  depth = 12,
  interactive = true,
  onClick,
  ...props
}) => {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0, active: false });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      const listener = (e) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', listener);
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  const handleMouseMove = (e) => {
    if (!interactive || prefersReducedMotion || isTouchDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Subtle max rotation: -6 to +6 degrees
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setCoords({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      rotateX,
      rotateY,
      active: true
    });
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0, rotateX: 0, rotateY: 0, active: false });
  };

  const variantClass = variant === 'dark' 
    ? 'card-3d-dark' 
    : variant === 'glass'
    ? 'bg-[#082C35]/90 border border-[#D99A43]/40 shadow-xl backdrop-blur-md'
    : 'card-3d-parchment';

  const dynamicStyle = coords.active && !prefersReducedMotion && !isTouchDevice
    ? {
        transform: `perspective(1000px) rotateX(${coords.rotateX}deg) rotateY(${coords.rotateY}deg) translateY(-6px) translateZ(${depth}px)`,
        transition: 'transform 0.1s ease-out'
      }
    : {};

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={dynamicStyle}
      className={`relative overflow-hidden ${variantClass} ${className}`}
      {...props}
    >
      {/* Specular Light Reflection Follower */}
      {coords.active && !prefersReducedMotion && !isTouchDevice && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: variant === 'dark'
              ? `radial-gradient(circle 180px at ${coords.x}% ${coords.y}%, rgba(242, 179, 79, 0.18), transparent 70%)`
              : `radial-gradient(circle 220px at ${coords.x}% ${coords.y}%, rgba(255, 255, 255, 0.5), transparent 70%)`
          }}
        />
      )}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default ThreeDCard;
