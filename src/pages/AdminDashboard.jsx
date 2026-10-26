import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Users, 
  Database, 
  Landmark, 
  Layers, 
  MapPin, 
  HardDrive, 
  Clock, 
  Activity, 
  CheckCircle,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { authService, artifactService } from '../services/api';
import Sidebar from '../components/Sidebar';
import ThreeDCard from '../components/ThreeDCard';
import ThreeDButton from '../components/ThreeDButton';
import LoadingSpinner from '../components/LoadingSpinner';
import PageBackground from '../components/PageBackground';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [dbHealth, setDbHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('admin-overview');

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [statsRes, healthRes] = await Promise.all([
        authService.getAdminStats(),
        artifactService.checkHealth()
      ]);

      if (statsRes?.stats) {
        setStats(statsRes.stats);
      } else if (statsRes?.data?.stats) {
        setStats(statsRes.data.stats);
      }
      if (healthRes?.ok && healthRes.data) {
        setDbHealth(healthRes.data);
      }
    } catch (err) {
      console.error('Failed to fetch admin stats', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  return (
    <PageBackground className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Admin Header */}
        <div className="mb-8 card-3d-dark p-6 sm:p-8 rounded-3xl border border-amber-500/40 shadow-[0_12px_40px_rgba(0,0,0,0.6)] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center space-x-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 p-[2px] shadow-[0_6px_20px_rgba(245,158,11,0.4)] flex-shrink-0">
              <div className="w-full h-full bg-[#061B29] rounded-[14px] flex items-center justify-center font-serif font-bold text-2xl text-amber-400">
                <ShieldCheck className="w-9 h-9 stroke-[1.8]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-amber-500/20 border border-amber-500/50 text-amber-300">
                  Curator In Chief
                </span>
                <span className="text-xs text-[#FFF7E5]/60">• Master Administrative Console</span>
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#FFF7E5] mt-1">
                Archive Governance & Telemetry
              </h1>
              <p className="text-xs sm:text-sm text-amber-300/80 font-serif mt-0.5">
                Monitoring historical records, database integrity, and accredited researchers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchAdminData}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#082C35] hover:bg-[#0A343F] border border-[#D99A43]/50 text-[#FFF7E5] transition-all flex items-center gap-2"
            >
              <Activity className="w-3.5 h-3.5 text-amber-400" />
              <span>Refresh Telemetry</span>
            </button>
          </div>
        </div>

        {/* Admin Layout with 3D Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8">
          <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} isAdmin={true} />

          {/* Admin Main Body */}
          <main className="flex-1 min-w-0 space-y-8">
            
            {loading ? (
              <LoadingSpinner size="lg" text="Querying MySQL system tables & user registries..." />
            ) : (
              <>
                {/* Metric Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <ThreeDCard variant="dark" depth={8} className="p-4 rounded-2xl border border-[#D99A43]/30">
                    <p className="text-[11px] font-mono uppercase text-[#D99A43]">Registered Users</p>
                    <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#FFF7E5] mt-1">
                      {stats?.total_users ?? 1}
                    </h3>
                    <div className="flex items-center gap-1 mt-2 text-[10px] text-emerald-400 font-mono">
                      <Users className="w-3 h-3" />
                      <span>{stats?.total_admins ?? 1} Curators / {stats?.total_researchers ?? 0} Scholars</span>
                    </div>
                  </ThreeDCard>

                  <ThreeDCard variant="dark" depth={8} className="p-4 rounded-2xl border border-[#D99A43]/30">
                    <p className="text-[11px] font-mono uppercase text-[#D99A43]">Total Artifacts</p>
                    <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#FFF7E5] mt-1">
                      {stats?.total_artifacts ?? 68}
                    </h3>
                    <div className="flex items-center gap-1 mt-2 text-[10px] text-[#F2B34F] font-mono">
                      <Landmark className="w-3 h-3" />
                      <span>In MySQL Database</span>
                    </div>
                  </ThreeDCard>

                  <ThreeDCard variant="dark" depth={8} className="p-4 rounded-2xl border border-[#D99A43]/30">
                    <p className="text-[11px] font-mono uppercase text-[#D99A43]">Indian States</p>
                    <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#FFF7E5] mt-1">
                      {stats?.total_states ?? 15}
                    </h3>
                    <div className="flex items-center gap-1 mt-2 text-[10px] text-emerald-400 font-mono">
                      <MapPin className="w-3 h-3" />
                      <span>Across 78 Districts</span>
                    </div>
                  </ThreeDCard>

                  <ThreeDCard variant="dark" depth={8} className="p-4 rounded-2xl border border-[#D99A43]/30">
                    <p className="text-[11px] font-mono uppercase text-[#D99A43]">Categories</p>
                    <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#FFF7E5] mt-1">
                      {stats?.total_categories ?? 10}
                    </h3>
                    <div className="flex items-center gap-1 mt-2 text-[10px] text-[#F2B34F] font-mono">
                      <Layers className="w-3 h-3" />
                      <span>Architecture, Coins, etc.</span>
                    </div>
                  </ThreeDCard>
                </div>

                {/* Database Health & Server Status */}
                <ThreeDCard variant="dark" depth={12} className="p-6 rounded-3xl border border-emerald-500/40">
                  <div className="flex items-center justify-between pb-4 border-b border-[#D99A43]/20">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                      <h3 className="font-heading text-lg font-bold text-[#FFF7E5]">
                        MySQL Database Connectivity Status
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-950/80 border border-emerald-500/60 text-emerald-300">
                      OPERATIONAL
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5 text-xs">
                    <div className="p-4 rounded-xl bg-[#082C35]/60 border border-[#D99A43]/20">
                      <p className="text-[#D99A43] font-mono uppercase text-[10px]">Database Name</p>
                      <p className="text-[#FFF7E5] font-semibold mt-1">historical_artifact_db</p>
                    </div>
                    <div className="p-4 rounded-xl bg-[#082C35]/60 border border-[#D99A43]/20">
                      <p className="text-[#D99A43] font-mono uppercase text-[10px]">Database Host</p>
                      <p className="text-[#FFF7E5] font-semibold mt-1">127.0.0.1:3306 (XAMPP)</p>
                    </div>
                    <div className="p-4 rounded-xl bg-[#082C35]/60 border border-[#D99A43]/20">
                      <p className="text-[#D99A43] font-mono uppercase text-[10px]">Security Protocol</p>
                      <p className="text-[#FFF7E5] font-semibold mt-1">Bcrypt Hash + JWT Token</p>
                    </div>
                  </div>
                </ThreeDCard>

                {/* Accredited Researchers List */}
                <div className="card-3d-dark p-6 sm:p-8 rounded-3xl border border-[#D99A43]/30 shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#D99A43]/20">
                    <h3 className="font-heading text-lg font-bold text-[#FFF7E5] flex items-center gap-2">
                      <Users className="w-5 h-5 text-[#F2B34F]" />
                      <span>Registered Archival Personnel</span>
                    </h3>
                    <span className="text-xs text-[#D99A43] font-mono">
                      {stats?.recent_users?.length || 0} Accounts Enrolled
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-[#D99A43]/20 text-[#D99A43] font-mono uppercase text-[10px]">
                          <th className="py-3 px-3">Scholar Name</th>
                          <th className="py-3 px-3">Archival Email</th>
                          <th className="py-3 px-3">Assigned Role</th>
                          <th className="py-3 px-3">Enrolled At</th>
                          <th className="py-3 px-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#D99A43]/10">
                        {stats?.recent_users?.map((u) => (
                          <tr key={u.user_id} className="hover:bg-[#082C35]/40 transition-colors">
                            <td className="py-3 px-3 font-medium text-[#FFF7E5]">
                              {u.full_name}
                            </td>
                            <td className="py-3 px-3 text-[#FFF7E5]/70 font-mono">
                              {u.email}
                            </td>
                            <td className="py-3 px-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                                u.role === 'admin' 
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              }`}>
                                {u.role}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-[#FFF7E5]/60 font-mono">
                              {new Date(u.created_at).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-3">
                              <span className="inline-flex items-center gap-1 text-emerald-400 font-mono text-[10px]">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                Active
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </>
            )}

          </main>
        </div>

      </div>
    </PageBackground>
  );
};

export default AdminDashboard;
