import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

/**
 * Breadcrumbs - Reusable 3D navigation trail
 * Supports both dark navy headers and light parchment backgrounds.
 */
const Breadcrumbs = ({ items = [], theme = 'dark', className = '' }) => {
  const isDark = theme === 'dark';

  return (
    <nav 
      aria-label="Breadcrumb"
      className={`flex items-center text-xs sm:text-sm font-medium py-2 overflow-x-auto whitespace-nowrap ${className}`}
    >
      <ol className="flex items-center space-x-2">
        {/* Home Root */}
        <li>
          <Link
            to="/"
            className={`flex items-center gap-1.5 transition-colors ${
              isDark 
                ? 'text-[#FFF7E5]/70 hover:text-[#F2B34F]' 
                : 'text-[#10283A]/70 hover:text-[#D99A43]'
            }`}
          >
            <Home className="w-3.5 h-3.5 text-[#D99A43]" />
            <span>Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center space-x-2">
              <ChevronRight className="w-3 h-3 text-[#D99A43]/60 shrink-0" />
              {isLast || !item.to ? (
                <span 
                  className={`font-semibold truncate max-w-[200px] sm:max-w-xs ${
                    isDark ? 'text-[#F2B34F]' : 'text-[#D99A43]'
                  }`} 
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.to}
                  className={`transition-colors ${
                    isDark 
                      ? 'text-[#FFF7E5]/70 hover:text-[#F2B34F]' 
                      : 'text-[#526575] hover:text-[#D99A43]'
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
