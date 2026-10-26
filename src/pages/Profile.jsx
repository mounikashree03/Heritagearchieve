import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  ShieldCheck, 
  Calendar, 
  KeyRound, 
  CheckCircle2, 
  AlertCircle,
  Save,
  BookOpen
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/api';
import Sidebar from '../components/Sidebar';
import ThreeDCard from '../components/ThreeDCard';
import ThreeDButton from '../components/ThreeDButton';
import PageBackground from '../components/PageBackground';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [fullName, setFullName] = useState(user?.full_name || user?.fullName || '');
  const [bio, setBio] = useState(user?.bio || 'Specialist in ancient Indian metallurgy and temple epigraphy.');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');
    setLoading(true);

    try {
      const payload = {
        fullName: fullName.trim(),
        full_name: fullName.trim(),
        bio: bio.trim()
      };
      if (newPassword) {
        payload.current_password = currentPassword;
        payload.new_password = newPassword;
      }

      const res = await authService.updateProfile(payload);
      if (res && res.success) {
        setSuccessMsg('Archival credentials and scholar profile successfully updated.');
        setCurrentPassword('');
        setNewPassword('');
        if (res.user && updateUser) {
          updateUser(res.user);
        }
      } else {
        setErrorMsg(res?.message || 'Failed to update scholar dossier.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Error occurred communicating with the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageBackground className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Profile Header */}
        <div className="mb-8 card-3d-dark p-6 sm:p-8 rounded-3xl border border-[#D99A43]/40 shadow-[0_12px_40px_rgba(0,0,0,0.6)] flex items-center justify-between">
          <div className="flex items-center space-x-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D99A43] via-[#F2B34F] to-[#9E6E24] p-[2px] shadow-[0_4px_16px_rgba(217,154,67,0.3)] flex-shrink-0">
              <div className="w-full h-full bg-[#061B29] rounded-[14px] flex items-center justify-center font-serif font-bold text-2xl text-[#F2B34F]">
                {user?.full_name ? user.full_name.charAt(0).toUpperCase() : 'S'}
              </div>
            </div>
            <div>
              <h1 className="font-heading text-2xl font-bold text-[#FFF7E5]">
                Scholar Profile & Archival Credentials
              </h1>
              <p className="text-xs text-[#D99A43] font-serif mt-0.5">
                Manage your credentials, research affiliations, and security tokens
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <Sidebar activeTab="profile" />

          {/* Main Profile Form */}
          <main className="flex-1 min-w-0">
            <ThreeDCard
              variant="dark"
              depth={12}
              interactive={false}
              className="p-8 rounded-3xl border border-[#D99A43]/30 shadow-[0_16px_40px_rgba(0,0,0,0.6)]"
            >
              {successMsg && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/50 flex items-center space-x-3 text-emerald-300 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              {errorMsg && (
                <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-500/50 flex items-center space-x-3 text-red-200 text-xs">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Dossier Meta Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-[#082C35]/60 border border-[#D99A43]/30">
                  <p className="text-[10px] font-mono uppercase text-[#D99A43]">Designation</p>
                  <p className="text-sm font-semibold text-[#FFF7E5] mt-1 capitalize">{user?.role || 'Researcher'}</p>
                </div>
                <div className="p-4 rounded-xl bg-[#082C35]/60 border border-[#D99A43]/30">
                  <p className="text-[10px] font-mono uppercase text-[#D99A43]">Registered Email</p>
                  <p className="text-sm font-mono text-[#FFF7E5] mt-1 truncate">{user?.email}</p>
                </div>
                <div className="p-4 rounded-xl bg-[#082C35]/60 border border-[#D99A43]/30">
                  <p className="text-[10px] font-mono uppercase text-[#D99A43]">Credential Status</p>
                  <p className="text-sm font-mono text-emerald-400 mt-1 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Verified & Active
                  </p>
                </div>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#D99A43] mb-2 font-mono">
                    Full Scholar Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#082C35] border border-[#D99A43]/40 rounded-xl text-sm text-[#FFF7E5] focus:outline-none focus:border-[#F2B34F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#D99A43] mb-2 font-mono">
                    Academic Specialization / Biography
                  </label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#082C35] border border-[#D99A43]/40 rounded-xl text-sm text-[#FFF7E5] focus:outline-none focus:border-[#F2B34F]"
                  />
                </div>

                <div className="pt-4 border-t border-[#D99A43]/20">
                  <h4 className="font-heading text-base font-bold text-[#FFF7E5] mb-2 flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-[#D99A43]" />
                    <span>Change Archival Password (Optional)</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                    <div>
                      <label className="block text-xs font-mono text-[#D99A43] mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full px-3.5 py-2 bg-[#082C35] border border-[#D99A43]/40 rounded-xl text-xs text-[#FFF7E5]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-[#D99A43] mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Min 6 characters"
                        className="w-full px-3.5 py-2 bg-[#082C35] border border-[#D99A43]/40 rounded-xl text-xs text-[#FFF7E5]"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <ThreeDButton
                    type="submit"
                    variant="gold"
                    size="md"
                    loading={loading}
                    icon={<Save className="w-4 h-4" />}
                  >
                    Save Changes to Dossier
                  </ThreeDButton>
                </div>
              </form>
            </ThreeDCard>
          </main>
        </div>

      </div>
    </PageBackground>
  );
};

export default Profile;
