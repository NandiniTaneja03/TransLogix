import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './pages/context/AuthContext';
import ProtectedRoute from './pages/routes/ProtectedRoute';

// Auth Pages
import Login from './pages/Auth/Login';
import RegisterDriver from './pages/Auth/RegisterDriver';
import RegisterVendor from './pages/Auth/RegisterVendor';

// Home Pages
import Home from './pages/Home/Home';
import Features from './pages/Home/Features';
import Hero from './pages/Home/Hero';

// Admin Pages
import AdminDashboard from './pages/Admin/AdminDashboard';
import Drivers from './pages/Admin/Drivers';
import Finance from './pages/Admin/Finance';
import ManageOrders from './pages/Admin/ManageOrders';
import RecentCustomers from './components/admin/RecentCustomers';
import SalesChart from './components/admin/SalesChart';
import StatsCard from './components/admin/StatsCard';
import TrafficSources from './components/admin/TrafficSources';
import Transactions from './components/admin/Transactions';

// Driver Pages
import DriverDashboard from './pages/Driver/DriverDashboard';
import MyOrders from './pages/Driver/MyOrders';
import Wallet from './pages/Driver/Wallet';

// Vendor Pages
import VendorDashboard from './pages/Vendor/VendorDashboard';
import CreateOrder from './pages/Vendor/CreateOrder';
import Reports from './pages/Vendor/Reports';

// Layout
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';

import './styles/App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/hero" element={<Hero />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register-driver" element={<RegisterDriver />} />
          <Route path="/register-vendor" element={<RegisterVendor />} />
          
          {/* Protected Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/drivers" element={<ProtectedRoute><Drivers /></ProtectedRoute>} />
          <Route path="/admin/finance" element={<ProtectedRoute><Finance /></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute><ManageOrders /></ProtectedRoute>} />
          
          {/* Protected Driver Routes */}
          <Route path="/driver" element={<ProtectedRoute><DriverDashboard /></ProtectedRoute>} />
          <Route path="/driver/orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
          <Route path="/driver/wallet" element={<ProtectedRoute><Wallet /></ProtectedRoute>} />
          
          {/* Protected Vendor Routes */}
          <Route path="/vendor" element={<ProtectedRoute><VendorDashboard /></ProtectedRoute>} />
          <Route path="/vendor/create-order" element={<ProtectedRoute><CreateOrder /></ProtectedRoute>} />
          <Route path="/vendor/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;