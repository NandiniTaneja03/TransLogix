import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import StatsCard from '../components/StatsCard';
import SalesChart from '../components/SalesChart';
import TrafficSources from '../components/TrafficSources';
import Transactions from '../components/Transactions';
import RecentCustomers from '../components/RecentCustomers';

const Dashboard = ({ user, onLogout }) => {
  // Extract first name for greeting
  const getFirstName = (fullName) => {
    if (!fullName) return 'User';
    return fullName.split(' ')[0];
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      
      <div className="main-content">
        <Header 
          userName={user?.name || 'User'}
          userEmail={user?.email || 'user@example.com'}
          onLogout={onLogout}
        />
        
        {/* Greeting */}
        <div className="greeting">
          <h1>Hey {getFirstName(user?.name || 'User')} -</h1>
          <p>here's what's happening with your store today</p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <StatsCard 
            label="Today's Sale" 
            value="$12,426" 
            change="+ 36%" 
            isPositive={true}
            delay={0.05}
          />
          <StatsCard 
            label="Total Sales" 
            value="$2,38,485" 
            change="+ 14%" 
            isPositive={false}
            delay={0.1}
          />
          <StatsCard 
            label="Total Orders" 
            value="84,382" 
            change="+ 36%" 
            isPositive={true}
            delay={0.15}
          />
          <StatsCard 
            label="Total Customers" 
            value="33,493" 
            change="+ 36%" 
            isPositive={true}
            delay={0.2}
          />
        </div>

        {/* Charts Row */}
        <div className="charts-row">
          <SalesChart />
          <TrafficSources />
        </div>

        {/* Bottom Section */}
        <div className="bottom-section">
          <Transactions />
          <RecentCustomers />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;