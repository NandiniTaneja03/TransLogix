import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../pages/context/AuthContext';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import '../../styles/VendorOrders.css';

const VendorOrders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

const [allOrders, setAllOrders] = useState([]);

useEffect(() => {
  const savedOrders = JSON.parse(localStorage.getItem('vendor_orders') || '[]');

  // show only this vendor's orders
  const myOrders = savedOrders.filter(order => order.vendorId === user?.id);

  setAllOrders(myOrders);
}, [user]);

  const getOrdersByStatus = () => {
    switch(activeTab) {
      case 'pending':
        return allOrders.filter(o => o.status === 'pending');
      case 'in-transit':
        return allOrders.filter(o => o.status === 'in-transit');
      case 'delivered':
        return allOrders.filter(o => o.status === 'delivered');
      case 'cancelled':
        return allOrders.filter(o => o.status === 'cancelled');
      default:
        return allOrders;
    }
  };

  const handleCancelOrder = (orderId) => {
    if (window.confirm(`Cancel order ${orderId}?\n\nThis action cannot be undone.`)) {
      setAllOrders(prev => prev.map(order => 
        order.id === orderId ? { ...order, status: 'cancelled' } : order
      ));
      alert(`Order ${orderId} has been cancelled.`);
    }
  };

  const orders = getOrdersByStatus();

  return (
    <div className="admin-layout">
      <Sidebar userRole="vendor" />
      <div className="main-content">
        <Header />
        <div className="page-content">
          <div className="page-header">
            <div>
              <h1>📦 All Orders</h1>
              <p className="page-subtitle">Manage and track your delivery orders</p>
            </div>
            <button className="btn-create-order" onClick={() => navigate('/vendor/create-order')}>
              ➕ Create New Order
            </button>
          </div>

          {/* Tabs */}
          <div className="orders-tabs">
            <button 
              className={`tab ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Orders
              <span className="tab-count">{allOrders.length}</span>
            </button>
            <button 
              className={`tab ${activeTab === 'pending' ? 'active' : ''}`}
              onClick={() => setActiveTab('pending')}
            >
              Pending
              <span className="tab-count">{allOrders.filter(o => o.status === 'pending').length}</span>
            </button>
            <button 
              className={`tab ${activeTab === 'in-transit' ? 'active' : ''}`}
              onClick={() => setActiveTab('in-transit')}
            >
              In Transit
              <span className="tab-count">{allOrders.filter(o => o.status === 'in-transit').length}</span>
            </button>
            <button 
              className={`tab ${activeTab === 'delivered' ? 'active' : ''}`}
              onClick={() => setActiveTab('delivered')}
            >
              Delivered
              <span className="tab-count">{allOrders.filter(o => o.status === 'delivered').length}</span>
            </button>
          </div>

          {/* Orders Grid */}
          <div className="vendor-orders-grid">
            {orders.map(order => (
              <div key={order.id} className={`vendor-order-card ${order.priority}`}>
                <div className="order-header">
                  <div>
                    <h3>{order.id}</h3>
                    <span className="order-date">{order.createdAt}</span>
                  </div>
                  <span className={`status-badge status-${order.status}`}>
                    {order.status === 'in-transit' ? 'In Transit' : 
                     order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>

                <div className="order-customer-info">
                  <h4>👤 {order.customer}</h4>
                  <div className="customer-contact">
                    <span>📞 {order.customerPhone}</span>
                    <span>✉️ {order.customerEmail}</span>
                  </div>
                </div>

                <div className="order-route">
                  <div className="route-point">
                    <span className="route-icon">📍</span>
                    <div>
                      <span className="route-label">Pickup</span>
                      <span className="route-address">{order.pickup}</span>
                    </div>
                  </div>
                  <div className="route-line"></div>
                  <div className="route-point">
                    <span className="route-icon">🎯</span>
                    <div>
                      <span className="route-label">Delivery</span>
                      <span className="route-address">{order.delivery}</span>
                    </div>
                  </div>
                </div>

                <div className="order-details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Distance</span>
                    <span className="detail-value">{order.distance}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Package</span>
                    <span className="detail-value">{order.packageType}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Weight</span>
                    <span className="detail-value">{order.weight}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Priority</span>
                    <span className="detail-value">{order.priority === 'express' ? '⚡ Express' : 'Standard'}</span>
                  </div>
                </div>

                {order.driver !== 'Not Assigned' && (
                  <div className="driver-info">
                    <span className="driver-label">🚗 Driver:</span>
                    <span className="driver-name">{order.driver}</span>
                    <span className="driver-phone">{order.driverPhone}</span>
                  </div>
                )}

                <div className="order-pricing">
                  <div className="pricing-row">
                    <span>Order Amount:</span>
                    <strong>{order.amount}</strong>
                  </div>
                  <div className="pricing-row">
                    <span>Delivery Fee:</span>
                    <strong>{order.deliveryFee}</strong>
                  </div>
                  <div className="pricing-row total">
                    <span>Total:</span>
                    <strong>{order.total}</strong>
                  </div>
                </div>

                <div className="order-actions">
                  {order.status === 'pending' && (
                    <>
                      <button className="btn-cancel" onClick={() => handleCancelOrder(order.id)}>
                        Cancel Order
                      </button>
                   
                    </>
                  )}
                  {order.status === 'in-transit' && (
                    <button className="btn-track" onClick={() => alert('Opening real-time tracking...')}>
                      🗺️ Track Live
                    </button>
                  )}
                  {order.status === 'delivered' && (
                    <div className="delivered-info">
                      <span>✓ Delivered at {order.deliveredAt}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {orders.length === 0 && (
            <div className="no-orders">
              <span className="no-orders-icon">📭</span>
              <h3>No {activeTab} orders</h3>
              <p>Create your first order to get started with deliveries</p>
              <button className="btn-create" onClick={() => navigate('/vendor/create-order')}>
                Create Order
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorOrders;