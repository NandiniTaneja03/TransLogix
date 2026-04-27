import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ LOAD USER ON REFRESH
  useEffect(() => {
    const savedUser = localStorage.getItem('translogix_user');
    const token = localStorage.getItem('token');

    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }

    setIsLoading(false);
  }, []);

  // ✅ LOGIN (REAL BACKEND)
  const login = async (email, password, role) => {
    try {
      setIsLoading(true);

      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password, role })
      });

      const data = await res.json();

      if (!res.ok) {
        setIsLoading(false);
        return { success: false, error: data.message };
      }

      // ✅ SAVE TOKEN
      localStorage.setItem("token", data.token);

      // ✅ SAVE USER
      const userData = {
        email,
        role,
        city: data.user?.city || "Panipat"
      };

      localStorage.setItem("translogix_user", JSON.stringify(userData));

      setUser(userData);
      setIsAuthenticated(true);
      setIsLoading(false);

      return { success: true };

    } catch (error) {
      setIsLoading(false);
      return { success: false, error: "Login failed" };
    }
  };

  // ✅ REGISTER (FRONTEND ONLY)
  const register = async (userData, role) => {
    try {
      setIsLoading(true);

      const newUser = {
        ...userData,
        role
      };

      localStorage.setItem("translogix_user", JSON.stringify(newUser));

      setUser(newUser);
      setIsAuthenticated(true);
      setIsLoading(false);

      return { success: true };

    } catch (error) {
      setIsLoading(false);
      return { success: false };
    }
  };

  // ✅ LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("translogix_user");
    setUser(null);
    setIsAuthenticated(false);
  };

  // ✅ SIMPLE AUTH CHECK (NO atob ❌)
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;