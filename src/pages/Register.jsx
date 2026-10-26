import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  User, 
  BookOpen, 
  ArrowRight, 
  AlertCircle, 
  Sparkles,
  Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { TempleIllustration } from '../components/TempleIllustration';
import ThreeDCard from '../components/ThreeDCard';
import ThreeDButton from '../components/ThreeDButton';
import PageBackground from '../components/PageBackground';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('researcher');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName || !email || !password || !confirmPassword) {
      setErrorMsg('Please complete all registration fields.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const result = await register({
        fullName: fullName.trim(),
        full_name: fullName.trim(),
        email: email.trim().toLowerCase(),
        password,
        role
      });

      if (result.success) {
        navigate('/dashboard', { replace: true });
      } else {
        setErrorMsg(result.message || 'Registration failed. Email may already be registered.');
      }
    } catch (err) {
      const msg = err.message || '';
      if (msg.includes('Failed to fetch') || msg.includes('NetworkError')) {
        setErrorMsg('Unable to reach backend server. Please verify the Express API is running on port 5000.');
      } else if (msg.includes('ECONNREFUSED') || msg.includes('MySQL')) {
        setErrorMsg('Database connection error: MySQL is offline. Please launch XAMPP Control Panel and click "Start" next to MySQL.');
      } else {
        setErrorMsg(msg || 'Server error encountered during account creation.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageBackground className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-5xl mx-auto">
        
        {/* Decorative Top Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#082C35]/80 border border-[#D99A43]/40 shadow-[0_0_20px_rgba(217,154,67,0.2)]">
            <Sparkles className="w-4 h-4 text-[#F2B34F] animate-spin" style={{ animationDuration: '6s' }} />
            <span className="font-serif text-xs uppercase tracking-widest text-[#F2B34F] font-medium">
              Scholar Enrollment
            </span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFF7E5] mt-3 tracking-tight">
            Join the Heritage Archive
          </h1>
          <p className="font-serif text-sm sm:text-base text-[#D99A43] max-w-lg mx-auto mt-2">
            Establish your academic identity to bookmark antiquities, track dynasties, and collaborate with curators.
          </p>
        </div>

        {/* 3D Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Visual Column */}
          <div className="hidden lg:flex lg:col-span-5 flex-col justify-center items-center">
            <div className="relative w-full p-6 rounded-3xl bg-gradient-to-b from-[#082C35]/60 to-[#061B29]/90 border border-[#D99A43]/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-sm overflow-hidden text-center">
              <TempleIllustration className="w-full h-72 my-2" />

              <div className="mt-4 pt-4 border-t border-[#D99A43]/20 text-left space-y-3">
                <div className="flex items-start space-x-3 text-xs text-[#FFF7E5]/90">
                  <Award className="w-4 h-4 text-[#F2B34F] flex-shrink-0 mt-0.5" />
                  <span>Personalized artifact collections saved to your MySQL database.</span>
                </div>
                <div className="flex items-start space-x-3 text-xs text-[#FFF7E5]/90">
                  <BookOpen className="w-4 h-4 text-[#F2B34F] flex-shrink-0 mt-0.5" />
                  <span>Comprehensive architectural, dynasty, and material classifications.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <ThreeDCard
              variant="dark"
              depth={16}
              interactive={false}
              className="p-8 sm:p-10 rounded-3xl border border-[#D99A43]/40 shadow-[0_24px_60px_rgba(0,0,0,0.7)] backdrop-blur-md"
            >
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#D99A43]/20">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-[#FFF7E5]">
                    Researcher Registration
                  </h2>
                  <p className="text-xs text-[#FFF7E5]/70 mt-1">
                    Complete the dossier to receive an accredited archival pass
                  </p>
                </div>
              </div>

              {errorMsg && (
                <div className="mb-6 p-4 rounded-xl bg-red-950/50 border border-red-500/50 flex items-start space-x-3 text-red-200 text-xs animate-shake">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-300">Enrollment Error</p>
                    <p className="mt-0.5">{errorMsg}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#D99A43] mb-1.5 font-mono">
                    Full Name / Title
                  </label>
                  <div className="relative rounded-xl group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#D99A43]/70 group-focus-within:text-[#F2B34F]">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Dr. Rajeshwari Sharma"
                      className="w-full pl-10 pr-4 py-2.5 bg-[#082C35]/90 border border-[#D99A43]/40 rounded-xl text-sm text-[#FFF7E5] placeholder-[#FFF7E5]/40 focus:outline-none focus:border-[#F2B34F] focus:ring-2 focus:ring-[#F2B34F]/30 transition-all font-sans"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#D99A43] mb-1.5 font-mono">
                    Institutional / Academic Email
                  </label>
                  <div className="relative rounded-xl group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#D99A43]/70 group-focus-within:text-[#F2B34F]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="scholar@university.edu"
                      className="w-full pl-10 pr-4 py-2.5 bg-[#082C35]/90 border border-[#D99A43]/40 rounded-xl text-sm text-[#FFF7E5] placeholder-[#FFF7E5]/40 focus:outline-none focus:border-[#F2B34F] focus:ring-2 focus:ring-[#F2B34F]/30 transition-all font-sans"
                    />
                  </div>
                </div>

                {/* Role / Designation Selector */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#D99A43] mb-1.5 font-mono">
                    Academic Focus / Role
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'researcher', label: 'Archaeologist' },
                      { id: 'scholar', label: 'Historian' },
                      { id: 'curator', label: 'Conservator' }
                    ].map((item) => (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => setRole(item.id)}
                        className={`py-2 px-2 text-xs rounded-xl font-medium border transition-all text-center ${
                          role === item.id
                            ? 'bg-[#D99A43]/20 border-[#F2B34F] text-[#F2B34F] shadow-[0_0_12px_rgba(217,154,67,0.3)]'
                            : 'bg-[#082C35]/60 border-[#D99A43]/30 text-[#FFF7E5]/70 hover:border-[#D99A43]'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Password Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#D99A43] mb-1.5 font-mono">
                      Access Password
                    </label>
                    <div className="relative rounded-xl group">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#D99A43]/70 group-focus-within:text-[#F2B34F]">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Min 6 characters"
                        className="w-full pl-10 pr-10 py-2.5 bg-[#082C35]/90 border border-[#D99A43]/40 rounded-xl text-sm text-[#FFF7E5] placeholder-[#FFF7E5]/40 focus:outline-none focus:border-[#F2B34F] font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#D99A43] mb-1.5 font-mono">
                      Confirm Password
                    </label>
                    <div className="relative rounded-xl group">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#D99A43]/70 group-focus-within:text-[#F2B34F]">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter password"
                        className="w-full pl-10 pr-10 py-2.5 bg-[#082C35]/90 border border-[#D99A43]/40 rounded-xl text-sm text-[#FFF7E5] placeholder-[#FFF7E5]/40 focus:outline-none focus:border-[#F2B34F] font-sans"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#FFF7E5]/60 hover:text-[#F2B34F]"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-3">
                  <ThreeDButton
                    type="submit"
                    variant="gold"
                    size="lg"
                    loading={loading}
                    className="w-full justify-center"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Complete Enrollment & Login
                  </ThreeDButton>
                </div>
              </form>

              <div className="mt-6 text-center text-xs text-[#FFF7E5]/70">
                <span>Already possess credentials? </span>
                <Link to="/login" className="text-[#F2B34F] font-semibold hover:underline">
                  Sign In to Terminal
                </Link>
              </div>
            </ThreeDCard>
          </div>

        </div>

      </div>
    </PageBackground>
  );
};

export default Register;
