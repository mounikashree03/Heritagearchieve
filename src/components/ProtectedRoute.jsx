import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-4 text-[#526575]">
        <div className="w-12 h-12 rounded-full border-3 border-[#E8D1A0] border-t-[#D99A43] animate-spin" />
        <span className="text-sm font-medium font-body">Verifying archival credentials...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 card-3d-parchment rounded-2xl text-center space-y-4">
        <ShieldAlert className="w-12 h-12 text-amber-500 mx-auto" />
        <h2 className="font-heading text-2xl font-bold text-[#10283A]">
          Curatorial Access Restricted
        </h2>
        <p className="text-xs text-[#526575] leading-relaxed">
          This archival section requires senior administrator privileges. Your current role does not have authorization.
        </p>
        <Link
          to="/dashboard"
          className="btn-gold-3d px-5 py-2.5 text-xs inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Dashboard</span>
        </Link>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
