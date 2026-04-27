import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Header from '../../components/layout/Header.jsx';
import Sidebar from '../../components/layout/Sidebar.jsx';
import StatsCard from '../../components/admin/StatsCard.jsx';
import SalesChart from '../../components/admin/SalesChart.jsx';
import TrafficSources from '../../components/admin/TrafficSources.jsx';
import RecentCustomers from '../../components/admin/RecentCustomers.jsx';
import Transactions from '../../components/admin/Transactions.jsx';
import '../../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [chartData, setChartData] = useState({ labels: [], data: [] });
  const [trafficData, setTrafficData] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    // Load all data from localStorage
    const users = JSON.parse(localStorage.getItem('translogix_users') || '[]');
    const vendorOrders = JSON.parse(localStorage.getItem('vendor_orders') || '[]');
    const driverCompleted = JSON.parse(localStorage.getItem('driver_completed_orders') || '[]');
    const driverWallets = JSON.parse(localStorage.getItem('driver_wallet') || '{"balance": 0, "transactions": []}');
    const reports = JSON.parse(localStorage.getItem('vendor_reports') || '[]');

    // Calculate statistics
    const vendors = users.filter(u => u.role === 'vendor').length;
    const drivers = users.filter(u => u.role === 'driver').length;
    
    const allOrders = [...vendorOrders];
    const completedOrders = allOrders.filter(o => o.status === 'delivered');
    const activeOrders = allOrders.filter(o => o.status === 'pending' || o.status === 'in-transit');
    
    const totalRevenue = completedOrders.reduce((sum, o) => sum + parseFloat(o.total || 0), 0);
    const todayRevenue = getTodayRevenue(completedOrders);
    
    // Calculate changes (mock percentages for demo)
    const revenueChange = '+24%';
    const ordersChange = '+12%';
    const driversChange = `${drivers} active`;

    // Set stats cards
    setStats([
      { 
        title: "TODAY'S REVENUE", 
        value: `$${todayRevenue.toFixed(2)}`, 
        change: revenueChange, 
        trend: 'up',
        icon: '💰'
      },
      { 
        title: 'TOTAL REVENUE', 
        value: `$${totalRevenue.toFixed(2)}`, 
        change: ordersChange, 
        trend: 'up',
        icon: '📊'
      },
      { 
        title: 'TOTAL ORDERS', 
        value: allOrders.length.toString(), 
        change: `${completedOrders.length} completed`, 
        trend: 'up',
        icon: '📦'
      },
      { 
        title: 'ACTIVE DRIVERS', 
        value: drivers.toString(), 
        change: driversChange, 
        trend: 'up',
        icon: '🚗'
      },
      { 
        title: 'TOTAL VENDORS', 
        value: vendors.toString(), 
        change: `${activeOrders.length} active orders`, 
        trend: 'up',
        icon: '🏪'
      },
      { 
        title: 'PENDING ORDERS', 
        value: activeOrders.length.toString(), 
        change: 'Needs attention', 
        trend: activeOrders.length > 5 ? 'down' : 'up',
        icon: '⏳'
      }
    ]);

    // Generate chart data (last 7 days)
    const chartInfo = generateChartData(completedOrders);
    setChartData(chartInfo);

    // Generate traffic sources (payment methods)
    const trafficInfo = generateTrafficData(completedOrders);
    setTrafficData(trafficInfo);

    // Get recent orders
    const recent = allOrders
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
    setRecentOrders(recent);

    // Get recent transactions
    const allTransactions = driverWallets.transactions || [];
    const recentTxns = allTransactions.slice(0, 5);
    setRecentTransactions(recentTxns);
  };

  const getTodayRevenue = (orders) => {
    const today = new Date().toDateString();
    return orders
      .filter(o => {
        const orderDate = new Date(o.deliveredAt || o.createdAt).toDateString();
        return orderDate === today;
      })
      .reduce((sum, o) => sum + parseFloat(o.total || 0), 0);
  };

  const generateChartData = (orders) => {
    const last7Days = [];
    const revenues = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      last7Days.push(dateStr);

      const dayRevenue = orders
        .filter(o => {
          const orderDate = new Date(o.deliveredAt || o.createdAt);
          return orderDate.toDateString() === date.toDateString();
        })
        .reduce((sum, o) => sum + parseFloat(o.total || 0), 0);

      revenues.push(dayRevenue);
    }

    return { labels: last7Days, data: revenues };
  };

  const generateTrafficData = (orders) => {
    const paymentMethods = ['cash', 'card', 'online', 'cod'];
    const colors = ['#6366f1', '#8b5cf6', '#22c55e', '#f59e0b'];
    
    return paymentMethods.map((method, index) => {
      const count = orders.filter(o => o.paymentMethod === method).length;
      const percentage = orders.length > 0 ? (count / orders.length) * 100 : 0;
      
      return {
        source: method.toUpperCase(),
        percentage: percentage.toFixed(1),
        count: count,
        color: colors[index]
      };
    }).filter(item => item.count > 0);
  };

  return (
    <div className="admin-layout">
      <Sidebar userRole="admin" />
      <div className="main-content">
        <Header />
        <div className="dashboard-content">
          <div className="dashboard-header">
            <div>
              <h1>Hey {user?.displayName || 'Admin'} 👋</h1>
              <p className="subtitle">Here's what's happening with your platform today</p>
            </div>
            <div className="header-actions">
              <button className="btn-refresh" onClick={loadDashboardData}>
                🔄 Refresh
              </button>
              <button className="btn-primary" onClick={() => navigate('/admin/orders')}>
                📋 View All Orders
              </button>
            </div>
          </div>

          <div className="stats-grid">
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>

          <div className="dashboard-grid">
            <div className="chart-section">
              <SalesChart data={chartData} />
            </div>
            <div className="traffic-section">
              <TrafficSources data={trafficData} />
            </div>
          </div>

          <div className="dashboard-grid">
            <RecentCustomers orders={recentOrders} />
            <Transactions transactions={recentTransactions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;