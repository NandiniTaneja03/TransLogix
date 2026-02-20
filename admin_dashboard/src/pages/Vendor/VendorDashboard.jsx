import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import '../../styles/VendorDashboard.css';

const VendorDashboard = () => {
  const stats = [
    { title: 'Total Orders', value: '1,234', icon: '📦', color: '#6366f1' },
    { title: 'Active Orders', value: '78', icon: '🚚', color: '#8b5cf6' },
    { title: 'Completed', value: '1,156', icon: '✅', color: '#22c55e' },
    { title: 'Revenue', value: '$45,678', icon: '💰', color: '#f59e0b' }
  ];

  const recentOrders = [
    { id: '#ORD001', customer: 'John Doe', pickup: '123 Main St', delivery: '456 Oak Ave', status: 'In Transit', date: '2026-02-19' },
    { id: '#ORD002', customer: 'Jane Smith', pickup: '789 Pine Rd', delivery: '321 Elm St', status: 'Pending', date: '2026-02-19' },
    { id: '#ORD003', customer: 'Mike Johnson', pickup: '555 Maple Dr', delivery: '888 Birch Ln', status: 'Completed', date: '2026-02-18' }
  ];

  return (
    <div className="admin-layout">
      <Sidebar userRole="vendor" />
      <div className="main-content">
        <Header />
        <div className="dashboard-content">
          <div className="dashboard-header">
            <div>
              <h1>Vendor Dashboard</h1>
              <p className="subtitle">Welcome back! Here's your business overview</p>
            </div>
            <Link to="/vendor/create-order" className="btn-create-order">
              <span>+</span> Create New Order
            </Link>
          </div>

          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stats-card vendor-stat">
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

          <div className="dashboard-grid">
            <div className="recent-orders-section">
              <div className="section-header">
                <h2>Recent Orders</h2>
                <Link to="/vendor/reports" className="view-all-link">View All →</Link>
              </div>
              <div className="orders-list">
                {recentOrders.map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <span className="order-id">{order.id}</span>
                      <span className={`status-badge status-${order.status.toLowerCase().replace(' ', '-')}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="order-details">
                      <div className="order-info">
                        <span className="label">Customer:</span>
                        <span className="value">{order.customer}</span>
                      </div>
                      <div className="order-route">
                        <div className="route-item">
                          <span className="route-icon">📍</span>
                          <span>{order.pickup}</span>
                        </div>
                        <div className="route-arrow">→</div>
                        <div className="route-item">
                          <span className="route-icon">🎯</span>
                          <span>{order.delivery}</span>
                        </div>
                      </div>
                      <div className="order-footer">
                        <span className="order-date">{order.date}</span>
                        <button className="btn-track">Track Order</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="quick-actions-section">
              <h2>Quick Actions</h2>
              <div className="actions-list">
                <Link to="/vendor/create-order" className="action-item">
                  <div className="action-icon" style={{ background: 'rgba(99, 102, 241, 0.1)' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5V19M5 12H19" stroke="#6366f1" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div>
                    <h4>Create Order</h4>
                    <p>Create a new delivery order</p>
                  </div>
                </Link>
                <Link to="/vendor/reports" className="action-item">
                  <div className="action-icon" style={{ background: 'rgba(139, 92, 246, 0.1)' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M9 11L12 14L22 4M21 12V19C21 19.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V19" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div>
                    <h4>View Reports</h4>
                    <p>Check your analytics</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;