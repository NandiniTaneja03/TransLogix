import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../pages/context/AuthContext';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import '../../styles/DriverDashboard.css';

const DriverDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showConnectModal, setShowConnectModal] = useState(false);

  const displayName = user?.displayName || user?.fullName?.split(' ')[0] || 'Driver';

  const stats = [
    { title: 'Total Deliveries', value: '156', icon: '📦', color: '#6366f1' },
    { title: 'Earnings Today', value: '$245', icon: '💰', color: '#22c55e' },
    { title: 'Active Orders', value: '8', icon: '🚚', color: '#f59e0b' },
    { title: 'Rating', value: '4.8 ⭐', icon: '⭐', color: '#8b5cf6' }
  ];

  const recentOrders = [
    { id: '#ORD001', pickup: '123 Main St', delivery: '456 Oak Ave', status: 'In Transit', amount: '$45', date: '2026-03-02' },
    { id: '#ORD002', pickup: '789 Pine Rd', delivery: '321 Elm St', status: 'Delivered', amount: '$32', date: '2026-03-02' },
    { id: '#ORD003', pickup: '555 Maple Dr', delivery: '888 Birch Ln', status: 'Pending', amount: '$58', date: '2026-03-01' }
  ];

  const handleViewOrder = (orderId) => {
    navigate(`/driver/orders/${orderId}`);
  };

  const handleConnectAccount = () => {
    setShowConnectModal(true);
  };

  return (
    <div className="admin-layout">
      <Sidebar userRole="driver" onConnectAccount={handleConnectAccount} />
      <div className="main-content">
        <Header />
        <div className="dashboard-content">
          <div className="dashboard-header">
            <div>
              <h1>Hey, {displayName}! 👋</h1>
              <p className="subtitle">Here's your delivery overview for today</p>
            </div>
          </div>

          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stats-card driver-stat" style={{ borderLeft: `4px solid ${stat.color}` }}>
                <div className="stat-icon" style={{ background: `${stat.color}20` }}>
                  <span style={{ fontSize: '32px' }}>{stat.icon}</span>
                </div>
                <div className="stat-info">
                  <h3>{stat.title}</h3>
                  <h2>{stat.value}</h2>
                </div>
              </div>
            ))}
          </div>

          <div className="orders-section">
            <div className="section-header">
              <h2>Recent Orders</h2>
              <button className="btn-view-all" onClick={() => navigate('/driver/orders')}>
                View All Orders →
              </button>
            </div>

            <div className="orders-table">
              <table>
                <thead>
                  <tr>
                    <th>ORDER ID</th>
                    <th>PICKUP</th>
                    <th>DELIVERY</th>
                    <th>STATUS</th>
                    <th>AMOUNT</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id}>
                      <td className="order-id">{order.id}</td>
                      <td>{order.pickup}</td>
                      <td>{order.delivery}</td>
                      <td>
                        <span className={`status-badge status-${order.status.toLowerCase().replace(' ', '-')}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="amount">{order.amount}</td>
                      <td>
                        <button 
                          className="btn-view" 
                          onClick={() => handleViewOrder(order.id)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Connect Account Modal */}
      {showConnectModal && (
        <div className="modal-overlay" onClick={() => setShowConnectModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Connect New Account</h2>
            <p>Choose a platform to connect your account</p>
            <div className="connect-options">
              <button className="connect-btn">
                <span>🏦</span>
                Bank Account
              </button>
              <button className="connect-btn">
                <span>💳</span>
                PayPal
              </button>
              <button className="connect-btn">
                <span>📱</span>
                Venmo
              </button>
            </div>
            <button className="btn-close" onClick={() => setShowConnectModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverDashboard;