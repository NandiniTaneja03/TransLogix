import React from 'react';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import '../../styles/DriverDashboard.css';

const DriverDashboard = () => {
  const stats = [
    { title: 'Total Deliveries', value: '156', icon: '📦' },
    { title: 'Earnings Today', value: '$245', icon: '💰' },
    { title: 'Active Orders', value: '8', icon: '🚚' },
    { title: 'Rating', value: '4.8 ⭐', icon: '⭐' }
  ];

  const recentOrders = [
    { id: '#ORD001', pickup: '123 Main St', delivery: '456 Oak Ave', status: 'In Transit', amount: '$45' },
    { id: '#ORD002', pickup: '789 Pine Rd', delivery: '321 Elm St', status: 'Delivered', amount: '$32' },
    { id: '#ORD003', pickup: '555 Maple Dr', delivery: '888 Birch Ln', status: 'Pending', amount: '$58' }
  ];

  return (
    <div className="admin-layout">
      <Sidebar userRole="driver" />
      <div className="main-content">
        <Header />
        <div className="dashboard-content">
          <div className="dashboard-header">
            <h1>Driver Dashboard</h1>
            <p className="subtitle">Welcome back! Here's your delivery overview</p>
          </div>

          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stats-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-info">
                  <h3>{stat.title}</h3>
                  <h2>{stat.value}</h2>
                </div>
              </div>
            ))}
          </div>

          <div className="orders-section">
            <h2>Recent Orders</h2>
            <div className="orders-table">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Pickup</th>
                    <th>Delivery</th>
                    <th>Status</th>
                    <th>Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.pickup}</td>
                      <td>{order.delivery}</td>
                      <td><span className={`status-badge status-${order.status.toLowerCase().replace(' ', '-')}`}>{order.status}</span></td>
                      <td className="amount">{order.amount}</td>
                      <td>
                        <button className="btn-view">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;