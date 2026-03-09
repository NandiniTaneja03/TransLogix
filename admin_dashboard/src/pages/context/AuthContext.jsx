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

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('translogix_user');
    const savedToken = localStorage.getItem('translogix_token');
    
    if (savedUser && savedToken) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('translogix_user');
        localStorage.removeItem('translogix_token');
      }
    }
    setIsLoading(false);
  }, []);

  // Get user initials for avatar
  const getUserInitials = (userData) => {
    if (!userData) return 'U';
    
    if (userData.fullName) {
      const names = userData.fullName.trim().split(' ');
      if (names.length >= 2) {
        return (names[0][0] + names[1][0]).toUpperCase();
      }
      return names[0][0].toUpperCase();
    } else if (userData.businessName) {
      return userData.businessName.trim()[0].toUpperCase();
    } else if (userData.email) {
      return userData.email[0].toUpperCase();
    }
    
    return 'U';
  };

  // Get display name
  const getDisplayName = (userData) => {
    if (!userData) return 'User';
    
    if (userData.fullName) {
      return userData.fullName.split(' ')[0];
    } else if (userData.businessName) {
      return userData.businessName;
    } else if (userData.email) {
      return userData.email.split('@')[0];
    }
    
    return 'User';
  };

  // REGISTER NEW USER
  const register = async (userData, userType) => {
    try {
      setIsLoading(true);

      // Get existing users from localStorage
      const existingUsers = JSON.parse(localStorage.getItem('translogix_users') || '[]');
      
      // Check if user already exists
      const userExists = existingUsers.find(u => u.email === userData.email);
      
      if (userExists) {
        setIsLoading(false);
        return { 
          success: false, 
          error: 'User with this email already exists. Please login instead.' 
        };
      }

      // Create new user object
      const newUser = {
        id: `user_${Date.now()}`,
        ...userData,
        role: userType,
        createdAt: new Date().toISOString(),
        initials: getUserInitials(userData),
        displayName: getDisplayName(userData)
      };

      // Add to users list
      existingUsers.push(newUser);
      localStorage.setItem('translogix_users', JSON.stringify(existingUsers));

      // Generate simple token
      const token = btoa(JSON.stringify({ 
        userId: newUser.id, 
        role: userType, 
        timestamp: Date.now() 
      }));
      
      // Save session
      localStorage.setItem('translogix_user', JSON.stringify(newUser));
      localStorage.setItem('translogix_token', token);
      
      // Initialize wallet for drivers
      if (userType === 'driver') {
        localStorage.setItem('driver_wallet', JSON.stringify({
          balance: 0,
          transactions: []
        }));
      }
      
      setUser(newUser);
      setIsAuthenticated(true);
      setIsLoading(false);

      return { success: true, user: newUser };
    } catch (error) {
      console.error('Registration error:', error);
      setIsLoading(false);
      return { 
        success: false, 
        error: 'Registration failed. Please try again.' 
      };
    }
  };

  // LOGIN USER
  const login = async (email, password, role) => {
    try {
      setIsLoading(true);

      // Get all registered users
      const existingUsers = JSON.parse(localStorage.getItem('translogix_users') || '[]');
      
      // Find matching user
      const foundUser = existingUsers.find(u => 
        u.email === email && 
        u.password === password && 
        u.role === role
      );

      if (!foundUser) {
        setIsLoading(false);
        return { 
          success: false, 
          error: 'Invalid email, password, or user role. Please check your credentials.' 
        };
      }

      // Update user metadata
      const userWithMetadata = {
        ...foundUser,
        initials: getUserInitials(foundUser),
        displayName: getDisplayName(foundUser),
        lastLogin: new Date().toISOString()
      };

      // Generate token
      const token = btoa(JSON.stringify({ 
        userId: foundUser.id, 
        role: foundUser.role, 
        timestamp: Date.now() 
      }));
      
      // Save session
      localStorage.setItem('translogix_user', JSON.stringify(userWithMetadata));
      localStorage.setItem('translogix_token', token);
      
      setUser(userWithMetadata);
      setIsAuthenticated(true);
      setIsLoading(false);

      return { success: true, user: userWithMetadata };
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return { 
        success: false, 
        error: 'Login failed. Please try again.' 
      };
    }
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('translogix_user');
    localStorage.removeItem('translogix_token');
  };

  // UPDATE USER
  const updateUser = (updates) => {
    const updatedUser = {
      ...user,
      ...updates,
      initials: getUserInitials({ ...user, ...updates }),
      displayName: getDisplayName({ ...user, ...updates })
    };
    
    setUser(updatedUser);
    localStorage.setItem('translogix_user', JSON.stringify(updatedUser));

    // Update in users list
    const existingUsers = JSON.parse(localStorage.getItem('translogix_users') || '[]');
    const updatedUsers = existingUsers.map(u => 
      u.id === updatedUser.id ? updatedUser : u
    );
    localStorage.setItem('translogix_users', JSON.stringify(updatedUsers));
  };

  // CHECK AUTH STATUS
  const checkAuth = () => {
    const token = localStorage.getItem('translogix_token');
    const savedUser = localStorage.getItem('translogix_user');
    
    if (!token || !savedUser) {
      return false;
    }
    
    try {
      const tokenData = JSON.parse(atob(token));
      const now = Date.now();
      const tokenAge = now - tokenData.timestamp;
      
      // Token expires after 7 days
      const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
      
      if (tokenAge > SEVEN_DAYS) {
        logout();
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Token validation error:', error);
      logout();
      return false;
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    register,
    login,
    logout,
    updateUser,
    checkAuth,
    getUserInitials,
    getDisplayName
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;