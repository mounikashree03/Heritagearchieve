import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public Pages
import Home from './pages/Home';
import States from './pages/States';
import Districts from './pages/Districts';
import Categories from './pages/Categories';
import Artifacts from './pages/Artifacts';
import ArtifactDetails from './pages/ArtifactDetails';
import About from './pages/About';
import NotFound from './pages/NotFound';

// Auth & Protected Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';

// Scroll to top automatically on route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#FFF7E5] text-[#10283A]">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Catalog Routes (Open exploration without barriers) */}
              <Route path="/" element={<Home />} />
              <Route path="/states" element={<States />} />
              <Route path="/states/:stateId/districts" element={<Districts />} />
              <Route path="/districts" element={<Districts />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/artifacts" element={<Artifacts />} />
              <Route path="/artifacts/:id" element={<ArtifactDetails />} />
              <Route path="/about" element={<About />} />

              {/* Authentication Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes (Authentication Required) */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              {/* Admin Protected Route (Curator / Admin Role Required) */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* 404 Fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
