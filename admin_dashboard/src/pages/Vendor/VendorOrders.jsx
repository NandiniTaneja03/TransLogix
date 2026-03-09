import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../pages/context/AuthContext';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import '../../styles/VendorOrders.css';

const VendorOrders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  const [allOrders, setAllOrders] = useState([
    {
      id: '#ORD101',
      customer: 'Sarah Johnson',
      customerPhone: '+1 555-0101',
      customerEmail: 'sarah@email.com',
      pickup: 'Your Store - 123 Main St',
      delivery: '456 Oak Ave, Apt 5B',
      distance: '5.2 km',
      packageType: 'Electronics',
      weight: '2.5 kg',
      priority: 'standard',
      status: 'in-transit',
      driver: 'John Smith',
      driverPhone: '+1 555-0202',
      amount: '$125.00',
      deliveryFee: '$12.00',
      total: '$137.00',
      createdAt: '2026-03-09 14:30',
      estimatedDelivery: '2026-03-09 16:00'
    },
    {
      id: '#ORD102',
      customer: 'Mike Wilson',
      customerPhone: '+1 555-0102',
      customerEmail: 'mike@email.com',
      pickup: 'Your Store - 123 Main St',
      delivery: '789 Pine Rd',
      distance: '3.8 km',
      packageType: 'Clothing',
      weight: '1.2 kg',
      priority: 'standard',
      status: 'delivered',
      driver: 'Emma Davis',
      driverPhone: '+1 555-0203',
      amount: '$89.50',
      deliveryFee: '$8.50',
      total: '$98.00',
      createdAt: '2026-03-09 12:15',
      deliveredAt: '2026-03-09 13:45'
    },
    {
      id: '#ORD103',
      customer: 'Lisa Brown',
      customerPhone: '+1 555-0103',
      customerEmail: 'lisa@email.com',
      pickup: 'Your Store - 123 Main St',
      delivery: '321 Elm St',
      distance: '7.5 km',
      packageType: 'Food',
      weight: '3.0 kg',
      priority: 'express',
      status: 'pending',
      driver: 'Not Assigned',
      amount: '$156.75',
      deliveryFee: '$15.00',
      total: '$171.75',
      createdAt: '2026-03-09 16:00',
      estimatedDelivery: '2026-03-09 17:30'
    }
  ]);

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
                      <button className="btn-edit" onClick={() => navigate(`/vendor/edit-order/${order.id}`)}>
                        Edit Order
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