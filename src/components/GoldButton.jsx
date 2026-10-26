import React from 'react';
import { Link } from 'react-router-dom';

/**
 * GoldButton - Reusable 3D metallic button component
 * Follows the HeritageArchive 3D design language with physical press feedback and rim lighting.
 */
const GoldButton = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'parchment'
  size = 'md',        // 'sm' | 'md' | 'lg'
  to,
  href,
  onClick,
  icon: Icon,
  iconPosition = 'right',
  className = '',
  disabled = false,
  type = 'button',
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs gap-1.5',
    md: 'px-6 py-2.5 text-sm gap-2',
    lg: 'px-8 py-3.5 text-base gap-2.5'
  };

  const variantClasses = {
    primary: 'btn-gold-3d',
    secondary: 'btn-dark-3d',
    outline: 'border border-[#D99A43] text-[#FFF7E5] hover:bg-[#D99A43] hover:text-[#061B29] rounded-full transition-all duration-200 shadow-sm hover:shadow-[0_0_15px_rgba(217,154,67,0.4)]',
    parchment: 'btn-parchment-3d'
  };

  const combinedClasses = `inline-flex items-center justify-center font-semibold select-none cursor-pointer tracking-wide ${sizeClasses[size] || sizeClasses.md} ${variantClasses[variant] || variantClasses.primary} ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''} ${className}`;

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </>
  );

  if (to && !disabled) {
    return (
      <Link to={to} className={combinedClasses} {...props}>
        {content}
      </Link>
    );
  }

  if (href && !disabled) {
    return (
      <a href={href} className={combinedClasses} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      {...props}
    >
      {content}
    </button>
  );
};

export default GoldButton;
