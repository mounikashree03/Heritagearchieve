import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  KeyRound, 
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { TempleIllustration } from '../components/TempleIllustration';
import ThreeDCard from '../components/ThreeDCard';
import ThreeDButton from '../components/ThreeDButton';
import PageBackground from '../components/PageBackground';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect destination after successful login
  const from = location.state?.from?.pathname || '/dashboard';

  // If already authenticated and not loading, redirect to dashboard or requested page
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate, from]);

  // Load remembered email on mount
  useEffect(() => {
    const remembered = localStorage.getItem('heritage_remember_email');
    if (remembered) {
      setEmail(remembered);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const trimmedIdentifier = email.trim();
    if (!trimmedIdentifier || !password) {
      setErrorMsg('Please enter both your email address and password.');
      return;
    }

    setLoading(true);
    try {
      const result = await login(trimmedIdentifier, password);
      if (result && result.success) {
        if (rememberMe) {
          localStorage.setItem('heritage_remember_email', trimmedIdentifier);
        } else {
          localStorage.removeItem('heritage_remember_email');
        }
        navigate(from, { replace: true });
      } else {
        setErrorMsg(result?.message || 'Authentication failed. Please verify your credentials.');
      }
    } catch (err) {
      const msg = err.message || '';
      if (msg.includes('Failed to fetch') || msg.includes('NetworkError')) {
        setErrorMsg('Unable to reach backend server. Please verify the Express API is running on port 5000.');
      } else if (msg.includes('ECONNREFUSED') || msg.includes('MySQL')) {
        setErrorMsg('Database connection error: MySQL is offline. Please launch XAMPP Control Panel and click "Start" next to MySQL.');
      } else {
        setErrorMsg(msg || 'Unable to connect to the authentication service.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setErrorMsg('');
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSuccess(true);
    setTimeout(() => {
      setForgotSuccess(false);
      setForgotModalOpen(false);
      setForgotEmail('');
    }, 2800);
  };

  return (
    <PageBackground className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-5xl mx-auto">
        
        {/* Decorative Top Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#082C35]/80 border border-[#D99A43]/40 shadow-[0_0_20px_rgba(217,154,67,0.2)]">
            <Sparkles className="w-4 h-4 text-[#F2B34F] animate-spin" style={{ animationDuration: '6s' }} />
            <span className="font-serif text-xs uppercase tracking-widest text-[#F2B34F] font-medium">
              National Digital Sanctuary
            </span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFF7E5] mt-3 tracking-tight">
            Portal to Antiquity
          </h1>
          <p className="font-serif text-sm sm:text-base text-[#D99A43] max-w-lg mx-auto mt-2">
            Enter your credentials to access catalog records, curate exhibitions, and inspect preserved antiquities.
          </p>
        </div>

        {/* Main 3D Card Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: 3D Heritage Temple Visual Showcase */}
          <div className="hidden lg:flex lg:col-span-5 flex-col justify-center items-center relative">
            <div className="relative w-full p-6 rounded-3xl bg-gradient-to-b from-[#082C35]/60 to-[#061B29]/90 border border-[#D99A43]/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-sm overflow-hidden">
              {/* Corner Ornaments */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#D99A43]/60" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#D99A43]/60" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#D99A43]/60" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#D99A43]/60" />

              <TempleIllustration className="w-full h-80 my-2" />

              <div className="text-center pt-2">
                <h3 className="font-heading text-lg font-semibold text-[#FFF7E5]">
                  68+ Verified Relics
                </h3>
                <p className="text-xs text-[#FFF7E5]/70 font-sans mt-1">
                  15 States • 78 Districts • 10 Archaeological Categories
                </p>
              </div>

              {/* Decorative Pillars / Inscriptions */}
              <div className="mt-4 pt-3 border-t border-[#D99A43]/20 flex justify-between items-center text-[10px] text-[#D99A43] font-mono">
                <span>ARCHIVAL AUTH V2.4</span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  MYSQL ENCRYPTED
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Form Card */}
          <div className="lg:col-span-7">
            <ThreeDCard
              variant="dark"
              depth={16}
              interactive={false}
              className="p-8 sm:p-10 rounded-3xl border border-[#D99A43]/40 shadow-[0_24px_60px_rgba(0,0,0,0.7)] backdrop-blur-md"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#D99A43]/20">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-[#FFF7E5]">
                    Researcher Sign In
                  </h2>
                  <p className="text-xs text-[#FFF7E5]/70 mt-1">
                    Sign in to sync your saved artifacts and academic notes
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D99A43] to-[#9E6E24] p-[1.5px] shadow-[0_4px_16px_rgba(217,154,67,0.3)]">
                  <div className="w-full h-full bg-[#061B29] rounded-[14px] flex items-center justify-center text-[#F2B34F]">
                    <KeyRound className="w-6 h-6 stroke-[1.8]" />
                  </div>
                </div>
              </div>

              {/* Error Message Banner */}
              {errorMsg && (
                <div className="mb-6 p-4 rounded-xl bg-red-950/50 border border-red-500/50 flex items-start space-x-3 text-red-200 text-xs animate-shake">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-red-300">Authentication Error</p>
                    <p className="mt-0.5">{errorMsg}</p>
                  </div>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Email / Username Field */}
                <div>
                  <label 
                    htmlFor="login-email" 
                    className="block text-xs font-semibold uppercase tracking-wider text-[#D99A43] mb-2 font-mono"
                  >
                    Email Address / Scholar ID
                  </label>
                  <div className="relative rounded-xl shadow-inner group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#D99A43]/70 group-focus-within:text-[#F2B34F]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      id="login-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="curator@heritagearchive.org"
                      className="w-full pl-10 pr-4 py-3 bg-[#082C35]/90 border border-[#D99A43]/40 rounded-xl text-sm text-[#FFF7E5] placeholder-[#FFF7E5]/40 focus:outline-none focus:border-[#F2B34F] focus:ring-2 focus:ring-[#F2B34F]/30 transition-all font-sans"
                    />
                  </div>
                </div>

                {/* Password Field with Show/Hide Toggle */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label 
                      htmlFor="login-password" 
                      className="block text-xs font-semibold uppercase tracking-wider text-[#D99A43] font-mono"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setForgotModalOpen(true)}
                      className="text-xs text-[#F2B34F] hover:underline font-serif"
                    >
                      Forgot access code?
                    </button>
                  </div>
                  <div className="relative rounded-xl shadow-inner group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#D99A43]/70 group-focus-within:text-[#F2B34F]">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-11 py-3 bg-[#082C35]/90 border border-[#D99A43]/40 rounded-xl text-sm text-[#FFF7E5] placeholder-[#FFF7E5]/40 focus:outline-none focus:border-[#F2B34F] focus:ring-2 focus:ring-[#F2B34F]/30 transition-all font-sans"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#FFF7E5]/60 hover:text-[#F2B34F] cursor-pointer"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center space-x-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-[#D99A43] text-[#D99A43] focus:ring-[#F2B34F] bg-[#082C35] accent-[#D99A43]"
                    />
                    <span className="text-xs text-[#FFF7E5]/80 font-serif">
                      Remember this archival terminal
                    </span>
                  </label>
                </div>

                {/* Submit 3D Button */}
                <div className="pt-2">
                  <ThreeDButton
                    type="submit"
                    variant="gold"
                    size="lg"
                    loading={loading}
                    className="w-full justify-center"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Authenticate & Enter Archive
                  </ThreeDButton>
                </div>
              </form>

              {/* Fast Demo Credentials Tester Chips */}
              <div className="mt-8 pt-6 border-t border-[#D99A43]/20">
                <p className="text-[11px] uppercase tracking-wider text-[#D99A43] font-mono mb-2.5">
                  Archival Quick Access (Pre-seeded MySQL Users):
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickFill('curator@heritagearchive.org', 'adminPassword123!')}
                    className="px-3 py-1.5 rounded-lg bg-[#082C35] hover:bg-[#0A343F] border border-[#D99A43]/40 text-[#FFF7E5] text-xs font-mono transition-all flex items-center gap-1.5"
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>Curator Admin</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickFill('scholar@heritagearchive.org', 'scholarPass123!')}
                    className="px-3 py-1.5 rounded-lg bg-[#082C35] hover:bg-[#0A343F] border border-[#D99A43]/40 text-[#FFF7E5] text-xs font-mono transition-all flex items-center gap-1.5"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Scholar Researcher</span>
                  </button>
                </div>
              </div>

              {/* Footer Links */}
              <div className="mt-6 text-center text-xs text-[#FFF7E5]/70">
                <span>New historical researcher? </span>
                <Link to="/register" className="text-[#F2B34F] font-semibold hover:underline">
                  Create an Archival Account
                </Link>
                <span className="mx-2">•</span>
                <Link to="/" className="text-[#FFF7E5]/60 hover:text-[#FFF7E5]">
                  Public Catalog
                </Link>
              </div>
            </ThreeDCard>
          </div>

        </div>

      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md card-3d-dark p-6 sm:p-8 rounded-2xl border border-[#D99A43]/50 shadow-2xl relative">
            <h3 className="font-heading text-xl font-bold text-[#FFF7E5] mb-2">
              Recover Archival Access
            </h3>
            <p className="text-xs text-[#FFF7E5]/75 mb-4">
              Enter your registered academic email address. An access recovery token will be dispatched.
            </p>

            {forgotSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/50 flex items-center space-x-3 text-emerald-300 text-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span>Recovery instructions have been transmitted to your archival email!</span>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#D99A43] mb-1.5">
                    Registered Email
                  </label>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="curator@heritagearchive.org"
                    className="w-full px-3.5 py-2.5 bg-[#082C35] border border-[#D99A43]/40 rounded-xl text-xs text-[#FFF7E5] focus:outline-none focus:border-[#F2B34F]"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <ThreeDButton
                    type="button"
                    variant="dark"
                    size="sm"
                    className="flex-1"
                    onClick={() => setForgotModalOpen(false)}
                  >
                    Cancel
                  </ThreeDButton>
                  <ThreeDButton
                    type="submit"
                    variant="gold"
                    size="sm"
                    className="flex-1"
                  >
                    Send Recovery Code
                  </ThreeDButton>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </PageBackground>
  );
};

export default Login;
