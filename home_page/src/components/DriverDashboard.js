import React, { useState } from 'react';
import { Package, DollarSign, Star, Clock, CheckCircle, XCircle, Navigation } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const DriverDashboard = ({ user, onLogout }) => {
  const [orders, setOrders] = useState([
    { id: 1, pickup: '123 Main St', delivery: '456 Oak Ave', payment: '$15.00', distance: '3.2 km', status: 'pending', customer: 'John Doe' },
    { id: 2, pickup: '789 Pine Rd', delivery: '321 Elm St', payment: '$22.50', distance: '5.8 km', status: 'pending', customer: 'Jane Smith' },
    { id: 3, pickup: '555 Market St', delivery: '888 Broadway', payment: '$18.75', distance: '4.1 km', status: 'pending', customer: 'Mike Johnson' }
  ]);

  const deliveryHistory = [
    { id: 101, date: 'Feb 15, 2026', customer: 'Alice Brown', amount: '$20.00', rating: 5, status: 'completed' },
    { id: 102, date: 'Feb 15, 2026', customer: 'Bob Wilson', amount: '$15.50', rating: 5, status: 'completed' },
    { id: 103, date: 'Feb 14, 2026', customer: 'Carol Davis', amount: '$25.00', rating: 4, status: 'completed' },
    { id: 104, date: 'Feb 14, 2026', customer: 'David Miller', amount: '$18.00', rating: 5, status: 'completed' }
  ];

  const handleAcceptOrder = (orderId) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'accepted' } : order
    ));
    alert(`Order #${orderId} accepted!`);
  };

  const handleRejectOrder = (orderId) => {
    setOrders(orders.filter(order => order.id !== orderId));
    alert(`Order #${orderId} rejected`);
  };

  const getFirstName = (fullName) => {
    if (!fullName) return 'Driver';
    return fullName.split(' ')[0];
  };

  return (
    <div className="dashboard-container">
      <Sidebar userType="driver" />
      
      <div className="main-content">
        <Header 
          userName={user?.name || 'Driver'}
          userEmail={user?.email || 'driver@example.com'}
          onLogout={onLogout}
        />
        
        <div className="greeting">
          <h1>Welcome, {getFirstName(user?.name || 'Driver')}!</h1>
          <p>Here are your deliveries for today</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Today's Earnings</div>
            <div className="stat-value">$127.50</div>
            <div className="stat-change positive">+ 8 deliveries</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Wallet Balance</div>
            <div className="stat-value">$1,245.00</div>
            <div className="stat-change positive">Available for withdrawal</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Your Rating</div>
            <div className="stat-value">4.8 ⭐</div>
            <div className="stat-change positive">Based on 127 reviews</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total Deliveries</div>
            <div className="stat-value">1,234</div>
            <div className="stat-change positive">All time</div>
          </div>
        </div>

        <div className="chart-card" style={{ marginBottom: '32px' }}>
          <div className="chart-header">
            <h2 className="chart-title">Available Orders</h2>
            <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>
              {orders.filter(o => o.status === 'pending').length} pending orders
            </span>
          </div>
          <div className="orders-list">
            {orders.filter(o => o.status === 'pending').map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div>
                    <h3>Order #{order.id}</h3>
                    <p className="order-customer">{order.customer}</p>
                  </div>
                  <div className="order-payment">{order.payment}</div>
                </div>
                <div className="order-details">
                  <div className="order-location">
                    <div>
                      <span className="location-label">Pickup</span>
                      <p>{order.pickup}</p>
                    </div>
                    <span style={{ color: '#6366f1', margin: '0 12px' }}>→</span>
                    <div>
                      <span className="location-label">Delivery</span>
                      <p>{order.delivery}</p>
                    </div>
                  </div>
                  <div className="order-meta">{order.distance}</div>
                </div>
                <div className="order-actions">
                  <button className="order-btn accept-btn" onClick={() => handleAcceptOrder(order.id)}>
                    Accept
                  </button>
                  <button className="order-btn reject-btn" onClick={() => handleRejectOrder(order.id)}>
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h2 className="chart-title">Delivery History</h2>
            <button className="export-btn">View All</button>
          </div>
          <div className="history-list">
            {deliveryHistory.map(delivery => (
              <div key={delivery.id} className="history-item">
                <div className="history-info">
                  <h4>Order #{delivery.id}</h4>
                  <p>{delivery.customer}</p>
                  <span>{delivery.date}</span>
                </div>
                <div className="history-meta">
                  <div className="history-amount">{delivery.amount}</div>
                  <div className="history-rating">⭐ {delivery.rating}.0</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;