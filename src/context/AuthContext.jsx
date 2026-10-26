import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => authService.getUser());
  const [token, setToken] = useState(() => authService.getToken());
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage and verify session with backend
  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      const storedToken = authService.getToken();
      const storedUser = authService.getUser();

      if (storedToken) {
        if (isMounted) {
          setToken(storedToken);
          if (storedUser) setUser(storedUser);
        }

        try {
          // Verify token against live backend /api/auth/me
          const res = await authService.getMe();
          if (isMounted && res?.user) {
            setUser(res.user);
            localStorage.setItem('heritage_auth_user', JSON.stringify(res.user));
          }
        } catch (err) {
          // Only clear session if token is explicitly invalid or expired (HTTP 401)
          if (err.status === 401) {
            console.warn('[AuthContext] Session expired or invalid:', err.message);
            authService.logout();
            if (isMounted) {
              setToken(null);
              setUser(null);
            }
          } else {
            console.warn('[AuthContext] Server unreachable during verification, maintaining cached session:', err.message);
          }
        }
      }
      if (isMounted) {
        setLoading(false);
      }
    };

    initializeAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (email, password) => {
    const res = await authService.login(email, password);
    if (res?.token && res?.user) {
      setToken(res.token);
      setUser(res.user);
    }
    return {
      success: true,
      ...res
    };
  };

  const register = async (userData) => {
    const res = await authService.register(userData);
    if (res?.token && res?.user) {
      setToken(res.token);
      setUser(res.user);
    }
    return {
      success: true,
      ...res
    };
  };

  const logout = () => {
    authService.logout();
    setToken(null);
    setUser(null);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('heritage_auth_user', JSON.stringify(updatedUser));
  };

  // Immediate synchronous lookup avoids race condition during redirect navigation
  const currentToken = token || authService.getToken();
  const currentUser = user || authService.getUser();
  const isAuthenticated = Boolean(currentToken && currentUser);
  const isAdmin = currentUser?.role === 'admin';
  const isCurator = currentUser?.role === 'admin' || currentUser?.role === 'curator';

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        token: currentToken,
        loading,
        isAuthenticated,
        isAdmin,
        isCurator,
        login,
        register,
        logout,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
