import React from 'react';
import Header from '../../components/layout/Header'
import Sidebar from '../../components/layout/Sidebar'

import StatsCard from  '../../components/admin/StatsCard.jsx';
import SalesChart from '../../components/admin/SalesChart.jsx';
import TrafficSources from '../../components/admin/TrafficSources.jsx';
import RecentCustomers from '../../components/admin/RecentCustomers.jsx';
import Transactions from '../../components/admin/Transactions.jsx';
import '../../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const stats = [
    { title: "TODAY'S SALE", value: '$12,426', change: '+36%', trend: 'up' },
    { title: 'TOTAL SALES', value: '$2,38,485', change: '+14%', trend: 'down' },
    { title: 'TOTAL ORDERS', value: '84,382', change: '+36%', trend: 'up' }
  ];

  return (
    <div className="admin-layout">
      <Sidebar userRole="admin" />
      <div className="main-content">
        <Header />
        <div className="dashboard-content">
          <div className="dashboard-header">
            <div>
              <h1>Hey User -</h1>
              <p className="subtitle">here's what's happening with your store today</p>
            </div>
          </div>

          <div className="stats-grid">
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>

          <div className="dashboard-grid">
            <div className="chart-section">
              <SalesChart />
            </div>
            <div className="traffic-section">
              <TrafficSources />
            </div>
          </div>

          <div className="dashboard-grid">
            <RecentCustomers />
            <Transactions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;