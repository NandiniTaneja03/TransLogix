import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../pages/context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user, isLoading, checkAuth } = useAuth();

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        background: '#0f111a',
        color: '#ffffff',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    );
  }

  // Check if authenticated
  if (!isAuthenticated || !checkAuth()) {
    return <Navigate to="/login" replace />;
  }

  // Check role if required
  if (requiredRole && user?.role !== requiredRole) {
    // Redirect to appropriate dashboard based on actual role
    switch(user?.role) {
      case 'admin':
        return <Navigate to="/admin" replace />;
      case 'driver':
        return <Navigate to="/driver" replace />;
      case 'vendor':
        return <Navigate to="/vendor" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;