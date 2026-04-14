import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/RecentCustomers.css';

const RecentCustomers = ({ orders = [] }) => {
  const navigate = useNavigate();
  const ordersList = orders || [];

  const getStatusColor = (status) => {
    switch(status) {
      case 'delivered': return '#22c55e';
      case 'in-transit': return '#6366f1';
      case 'pending': return '#f59e0b';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'in-transit': return 'In Transit';
      case 'pending': return 'Pending';
      case 'delivered': return 'Delivered';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  return (
    <div className="recent-customers-container">
      <div className="customers-header">
        <h2>📦 Recent Orders</h2>
        <button className="btn-view-all" onClick={() => navigate('/admin/orders')}>
          View All →
        </button>
      </div>

      <div className="customers-list">
        {ordersList.length > 0 ? (
          ordersList.map((order, index) => (
            <div key={index} className="customer-item">
              <div className="customer-avatar">
                {order.customerName?.charAt(0)?.toUpperCase() || 'C'}
              </div>
              <div className="customer-info">
                <div className="customer-name">{order.customerName || 'Customer'}</div>
                <div className="customer-details">
                  <span className="order-id">{order.id}</span>
                  <span className="order-dot">•</span>
                  <span className="order-date">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="customer-stats">
                <div className="order-amount">${order.total || 0}</div>
                <div 
                  className="order-status"
                  style={{ 
                    color: getStatusColor(order.status),
                    background: `${getStatusColor(order.status)}20`
                  }}
                >
                  {getStatusText(order.status)}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-customers">
            <span className="no-data-icon">📭</span>
            <p>No recent orders</p>
            <span className="no-data-hint">Orders will appear here once created</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentCustomers;