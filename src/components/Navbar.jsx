import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  Landmark, 
  Search, 
  Menu, 
  X,
  Compass,
  User,
  LogOut,
  ShieldCheck,
  Bookmark,
  Layers,
  ChevronDown
} from 'lucide-react';
import { artifactService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [navSearchQuery, setNavSearchQuery] = useState('');
  const [dbStatus, setDbStatus] = useState('checking'); // 'checking' | 'connected' | 'pending-import' | 'offline'
  
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const verifyHealth = async () => {
    try {
      const health = await artifactService.checkHealth();
      if (health.ok && health.data?.success) {
        setDbStatus('connected');
      } else if (health.ok && !health.data?.success) {
        setDbStatus('pending-import');
      } else {
        setDbStatus('offline');
      }
    } catch {
      setDbStatus('offline');
    }
  };

  useEffect(() => {
    verifyHealth();
    const interval = setInterval(verifyHealth, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (navSearchQuery.trim()) {
      navigate(`/artifacts?search=${encodeURIComponent(navSearchQuery.trim())}`);
      setSearchOpen(false);
      setNavSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    logout();
    navigate('/login');
  };

  const navLinks = [
    { to: '/', label: 'Home', end: true },
    { to: '/states', label: 'States' },
    { to: '/categories', label: 'Categories' },
    { to: '/artifacts', label: 'Explore Artifacts' },
    { to: '/about', label: 'About' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#061B29]/95 backdrop-blur-md border-b border-[#D99A43]/30 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      
      {/* Top Gold Thin Accent Line */}
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#F2B34F] to-transparent opacity-75" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Dimensional Gold Temple Logo & Brand Identity */}
          <Link to="/" className="flex items-center gap-3.5 group text-left select-none">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0A343F] to-[#04141E] border border-[#D99A43]/70 flex items-center justify-center text-[#D99A43] shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(242,179,79,0.4)] transition-all duration-300 group-hover:scale-105 group-hover:border-[#F2B34F] group-hover:shadow-[0_0_20px_rgba(217,154,67,0.5)]">
              <Landmark className="w-6 h-6 stroke-[1.8] group-hover:text-[#F2B34F] transition-colors" />
            </div>
            <div>
              <span className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-[#FFF7E5] group-hover:text-[#F2B34F] transition-colors block">
                HeritageArchive
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#D99A43] font-mono hidden sm:block">
                Digital Museum of India
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `text-sm font-medium transition-all duration-200 relative py-1.5 ${
                    isActive
                      ? 'text-[#F2B34F] font-semibold after:content-[""] after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-gradient-to-r after:from-[#F2B34F] after:to-[#D99A43] after:rounded-full after:shadow-[0_0_8px_#F2B34F]'
                      : 'text-[#FFF7E5]/80 hover:text-[#F2B34F]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Action: Search Control & User Authentication */}
          <div className="flex items-center gap-3">
            
            {/* 3D Search Control */}
            {searchOpen ? (
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <input
                  type="text"
                  autoFocus
                  value={navSearchQuery}
                  onChange={(e) => setNavSearchQuery(e.target.value)}
                  placeholder="Search 68+ artifacts..."
                  className="w-40 sm:w-60 px-3.5 py-1.5 bg-[#082C35] text-xs text-[#FFF7E5] border border-[#D99A43] rounded-full focus:outline-none focus:ring-2 focus:ring-[#D99A43]/40 shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="p-1.5 ml-1 text-[#FFF7E5]/70 hover:text-[#F2B34F] cursor-pointer"
                  aria-label="Close search"
                >
                  <X className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="w-9 h-9 rounded-full bg-[#082C35] border border-[#D99A43]/50 flex items-center justify-center text-[#FFF7E5]/80 hover:text-[#F2B34F] hover:border-[#F2B34F] hover:shadow-[0_0_12px_rgba(217,154,67,0.35)] transition-all cursor-pointer"
                aria-label="Search Archive"
              >
                <Search className="w-4 h-4" />
              </button>
            )}

            {/* Database Connection Status Badge */}
            {dbStatus === 'connected' && (
              <div 
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono font-medium bg-[#042822] border border-emerald-500/50 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.15)]"
                title="Connected to MySQL database (historical_artifact_db)"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34D399]" />
                <span>MySQL Connected</span>
              </div>
            )}

            {/* User Account / Login State */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#082C35] to-[#061B29] border border-[#D99A43]/60 hover:border-[#F2B34F] text-[#FFF7E5] shadow-[0_2px_8px_rgba(0,0,0,0.4)] transition-all"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#D99A43] to-[#F2B34F] flex items-center justify-center text-[#061B29] font-bold text-xs shadow-sm">
                    {user?.full_name ? user.full_name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="text-xs font-medium max-w-[100px] truncate hidden sm:inline">
                    {user?.full_name?.split(' ')[0] || 'Scholar'}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#D99A43]" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#061B29] border border-[#D99A43]/40 shadow-[0_12px_36px_rgba(0,0,0,0.8)] py-2 z-50 animate-in fade-in slide-in-from-top-2"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-[#D99A43]/20">
                      <p className="text-xs font-semibold text-[#FFF7E5] truncate">{user?.full_name}</p>
                      <p className="text-[11px] text-[#D99A43] truncate">{user?.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#082C35] border border-[#D99A43]/40 text-[#F2B34F]">
                        {user?.role || 'scholar'}
                      </span>
                    </div>

                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-[#FFF7E5]/90 hover:text-[#F2B34F] hover:bg-[#082C35]/60 transition-colors"
                    >
                      <Bookmark className="w-4 h-4 text-[#D99A43]" />
                      <span>My Sanctuary & Favorites</span>
                    </Link>

                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-amber-300 hover:text-amber-200 hover:bg-amber-950/40 transition-colors"
                      >
                        <ShieldCheck className="w-4 h-4 text-amber-400" />
                        <span>Curator Administration</span>
                      </Link>
                    )}

                    <Link
                      to="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-[#FFF7E5]/90 hover:text-[#F2B34F] hover:bg-[#082C35]/60 transition-colors"
                    >
                      <User className="w-4 h-4 text-[#D99A43]" />
                      <span>Profile & Settings</span>
                    </Link>

                    <div className="border-t border-[#D99A43]/20 mt-1 pt-1">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-red-300 hover:text-red-200 hover:bg-red-950/30 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4 text-red-400" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-xs font-semibold rounded-full btn-gold-3d flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 rounded-lg bg-[#082C35] border border-[#D99A43]/40 flex items-center justify-center text-[#FFF7E5] hover:text-[#F2B34F] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#061B29] border-t border-[#D99A43]/30 px-4 pt-4 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top-4">
          <form onSubmit={handleSearchSubmit} className="relative mb-3">
            <Search className="w-4 h-4 text-[#D99A43] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={navSearchQuery}
              onChange={(e) => setNavSearchQuery(e.target.value)}
              placeholder="Search artifacts, states, dynasties..."
              className="w-full pl-10 pr-4 py-2 bg-[#082C35] border border-[#D99A43]/40 rounded-full text-xs text-[#FFF7E5] placeholder-[#FFF7E5]/50 focus:outline-none focus:ring-1 focus:ring-[#D99A43]"
            />
          </form>

          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#082C35] text-[#F2B34F] border border-[#D99A43]/50 font-semibold'
                    : 'text-[#FFF7E5]/80 hover:bg-[#082C35]/50 hover:text-[#F2B34F]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {/* Mobile Auth Actions */}
          <div className="pt-3 border-t border-[#D99A43]/30">
            {isAuthenticated ? (
              <div className="space-y-2">
                <div className="px-3 py-1.5 text-xs text-[#D99A43]">
                  Signed in as <span className="text-[#FFF7E5] font-semibold">{user?.full_name}</span>
                </div>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 rounded-xl text-sm text-[#FFF7E5] bg-[#082C35]/60 hover:bg-[#082C35]"
                >
                  🏛️ Scholar Sanctuary
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 rounded-xl text-sm text-amber-300 bg-amber-950/40 border border-amber-500/30"
                  >
                    ⚙️ Curator Admin
                  </Link>
                )}
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 rounded-xl text-sm text-[#FFF7E5] bg-[#082C35]/60 hover:bg-[#082C35]"
                >
                  👤 Profile & Settings
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 rounded-xl text-sm text-red-300 bg-red-950/20 hover:bg-red-950/40"
                >
                  🚪 Sign Out
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2.5 text-xs font-semibold rounded-xl btn-gold-3d"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2.5 text-xs font-semibold rounded-xl bg-[#082C35] text-[#FFF7E5] border border-[#D99A43]/50 hover:border-[#F2B34F]"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

    </header>
  );
};

export default Navbar;
