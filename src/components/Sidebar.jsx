import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HeritageIcons } from './HeritageIcons';

const Sidebar = ({ activeTab, onSelectTab, isAdmin = false }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userNavItems = [
    { id: 'overview', label: 'My Sanctuary', icon: 'temple', path: '/dashboard' },
    { id: 'favorites', label: 'Saved Artifacts', icon: 'scroll', path: '/dashboard?tab=favorites' },
    { id: 'browse', label: 'Explore Catalog', icon: 'compass', path: '/artifacts' },
    { id: 'profile', label: 'Scholar Profile', icon: 'shield', path: '/profile' },
  ];

  const adminNavItems = [
    { id: 'admin-overview', label: 'Curator Overview', icon: 'temple', path: '/admin' },
    { id: 'manage-artifacts', label: 'Artifact Records', icon: 'sculpture', path: '/admin?tab=artifacts' },
    { id: 'manage-users', label: 'Researchers & Users', icon: 'crown', path: '/admin?tab=users' },
    { id: 'system-status', label: 'System Health', icon: 'shield', path: '/admin?tab=system' },
  ];

  const items = isAdmin ? adminNavItems : userNavItems;

  return (
    <aside className="w-full lg:w-72 flex-shrink-0">
      <div className="card-3d-dark p-6 rounded-2xl border border-[#D99A43]/30 sticky top-28 shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
        {/* User Card Header */}
        <div className="flex items-center space-x-3.5 pb-6 border-b border-[#D99A43]/20">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D99A43] via-[#F2B34F] to-[#9E6E24] p-[2px] shadow-[0_4px_12px_rgba(217,154,67,0.3)]">
            <div className="w-full h-full bg-[#061B29] rounded-[10px] flex items-center justify-center font-serif font-bold text-lg text-[#F2B34F]">
              {user?.full_name ? user.full_name.charAt(0).toUpperCase() : 'A'}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-serif text-[#FFF7E5] font-semibold text-sm truncate">
              {user?.full_name || 'Valued Scholar'}
            </h4>
            <div className="flex items-center space-x-1.5 mt-0.5">
              <span className={`inline-block w-2 h-2 rounded-full ${user?.role === 'admin' ? 'bg-amber-400' : 'bg-emerald-400'} animate-pulse`} />
              <span className="text-xs uppercase tracking-wider text-[#D99A43] font-medium">
                {user?.role || 'Researcher'}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="mt-6 space-y-2">
          {items.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (onSelectTab) onSelectTab(item.id);
                  if (item.path) navigate(item.path);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 text-sm font-medium ${
                  isActive
                    ? 'bg-gradient-to-r from-[#D99A43]/25 to-[#F2B34F]/10 border border-[#D99A43]/60 text-[#F2B34F] shadow-[0_4px_14px_rgba(217,154,67,0.2)] translate-x-1'
                    : 'text-[#FFF7E5]/80 hover:text-[#FFF7E5] hover:bg-[#082C35]/60 hover:border hover:border-[#D99A43]/20 hover:translate-x-1'
                }`}
              >
                <span className="text-base text-[#D99A43]">
                  {HeritageIcons[item.icon] ? HeritageIcons[item.icon]({ className: 'w-5 h-5' }) : '🏛️'}
                </span>
                <span className="flex-1">{item.label}</span>
                {isActive && (
                  <span className="w-1.5 h-4 bg-[#F2B34F] rounded-full shadow-[0_0_8px_#F2B34F]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Separator & Quick Actions */}
        <div className="pt-6 mt-6 border-t border-[#D99A43]/20 space-y-2">
          <NavLink
            to="/"
            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-medium text-[#FFF7E5]/70 hover:text-[#F2B34F] hover:bg-[#082C35]/40 transition-colors"
          >
            <span>🏛️</span>
            <span>Return to Archive Homepage</span>
          </NavLink>

          {user?.role === 'admin' && !isAdmin && (
            <NavLink
              to="/admin"
              className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-medium text-amber-300 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 transition-colors"
            >
              <span>⚙️</span>
              <span>Open Curator Admin Panel</span>
            </NavLink>
          )}

          {isAdmin && (
            <NavLink
              to="/dashboard"
              className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-medium text-[#D99A43] bg-[#D99A43]/10 border border-[#D99A43]/30 hover:bg-[#D99A43]/20 transition-colors"
            >
              <span>👤</span>
              <span>Switch to User View</span>
            </NavLink>
          )}

          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-medium text-red-300 hover:text-red-200 hover:bg-red-500/10 transition-colors"
          >
            <span>🚪</span>
            <span>Sign Out of Archive</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
