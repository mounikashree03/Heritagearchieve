import React from 'react';

/**
 * ThreeDButton - Reusable 3D tactile button with metallic gold highlights,
 * realistic depth, and interactive states.
 * Supports icon as either a component (e.g. icon={ArrowRight}) or an element (e.g. icon={<ArrowRight />}).
 */
const ThreeDButton = ({
  children,
  onClick,
  type = 'button',
  variant = 'gold', // 'gold' | 'dark' | 'outline' | 'danger'
  size = 'md', // 'sm' | 'md' | 'lg'
  disabled = false,
  loading = false,
  icon = null,
  iconPosition = 'left',
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
    md: 'px-5 py-2.5 text-xs sm:text-sm rounded-xl gap-2',
    lg: 'px-7 py-3.5 text-sm sm:text-base rounded-2xl gap-2.5'
  }[size] || 'px-5 py-2.5 text-xs sm:text-sm rounded-xl gap-2';

  const variantClasses = {
    gold: 'btn-gold-3d text-[#061B29]',
    dark: 'btn-dark-3d text-[#FFF7E5]',
    outline: 'bg-transparent text-[#10283A] border-2 border-[#D99A43] hover:bg-[#D99A43]/10 shadow-[0_2px_8px_rgba(217,154,67,0.15)] active:translate-y-0.5',
    danger: 'bg-gradient-to-b from-[#8B1E1E] to-[#5A1212] text-white border border-[#D9534F]/50 shadow-[0_4px_12px_rgba(139,30,30,0.35)] hover:shadow-[0_6px_16px_rgba(139,30,30,0.5)] active:translate-y-0.5'
  }[variant] || 'btn-gold-3d text-[#061B29]';

  const renderIcon = (pos) => {
    if (loading || !icon || iconPosition !== pos) return null;
    if (React.isValidElement(icon)) {
      return icon;
    }
    const IconComp = icon;
    return <IconComp className="w-4 h-4 shrink-0" />;
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center font-heading font-bold select-none cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
      ) : (
        renderIcon('left')
      )}
      <span>{children}</span>
      {renderIcon('right')}
    </button>
  );
};

export default ThreeDButton;
