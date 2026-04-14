import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './pages/context/AuthContext'; 
import ProtectedRoute from './components/layout/ProtectedRoute';

// Auth Pages
import Login from './pages/Auth/Login';
import RegisterDriver from './pages/Auth/RegisterDriver';
import RegisterVendor from './pages/Auth/RegisterVendor';

// Public Pages
import Home from './pages/Home/Home';
import Features from './pages/Home/Features';
import About from './pages/Home/About';
import Contact from './pages/Home/Contact';

// Admin Pages
import AdminDashboard from './pages/Admin/AdminDashboard'; 
import Drivers from './pages/Admin/Drivers'; 
import Finance from './pages/Admin/Finance'; 
import ManageOrders from './pages/Admin/ManageOrders'; 

// Driver Pages
import DriverDashboard from './pages/Driver/DriverDashboard';
import MyOrders from './pages/Driver/MyOrders';
import Wallet from './pages/Driver/Wallet';

// Vendor Pages
import VendorDashboard from './pages/Vendor/VendorDashboard';
import CreateOrder from './pages/Vendor/CreateOrder';
import Reports from './pages/Vendor/Reports';
import VendorOrderDetails from './pages/Vendor/VendorOrderDetails';
import VendorOrders from './pages/Vendor/VendorOrders';

// Terms Page
import TermsConditions from './pages/TermsConditions';

import './styles/App.css';

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/Features" element={<Features />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/terms" element={<TermsConditions />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register-driver" element={<RegisterDriver />} />
          <Route path="/register-vendor" element={<RegisterVendor />} />

          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />

          <Route path="/admin/drivers" element={
            <ProtectedRoute requiredRole="admin">
              <Drivers />
            </ProtectedRoute>
          } />

          <Route path="/admin/orders" element={
            <ProtectedRoute requiredRole="admin">
              <ManageOrders />
            </ProtectedRoute>
          } />

          <Route path="/admin/finance" element={
            <ProtectedRoute requiredRole="admin">
              <Finance />
            </ProtectedRoute>
          } />

          {/* Driver Routes */}
          <Route path="/driver" element={
            <ProtectedRoute requiredRole="driver">
              <DriverDashboard />
            </ProtectedRoute>
          } />

          <Route path="/driver/orders" element={
            <ProtectedRoute requiredRole="driver">
              <MyOrders />
            </ProtectedRoute>
          } />

          <Route path="/driver/wallet" element={
            <ProtectedRoute requiredRole="driver">
              <Wallet />
            </ProtectedRoute>
          } />

          {/* Vendor Routes */}
          <Route path="/vendor" element={
            <ProtectedRoute requiredRole="vendor">
              <VendorDashboard />
            </ProtectedRoute>
          } />

          <Route path="/vendor/create-order" element={
            <ProtectedRoute requiredRole="vendor">
              <CreateOrder />
            </ProtectedRoute>
          } />

          <Route path="/vendor/orders" element={
            <ProtectedRoute requiredRole="vendor">
              <VendorOrders />
            </ProtectedRoute>
          } />

          <Route path="/vendor/orders/:orderId" element={
            <ProtectedRoute requiredRole="vendor">
              <VendorOrderDetails />
            </ProtectedRoute>
          } />

          <Route path="/vendor/reports" element={
            <ProtectedRoute requiredRole="vendor">
              <Reports />
            </ProtectedRoute>
          } />

          {/* Catch All Route */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;