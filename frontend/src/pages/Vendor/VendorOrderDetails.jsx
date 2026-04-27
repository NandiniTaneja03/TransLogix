import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import '../../styles/VendorOrderDetails.css';

const VendorOrderDetails = () => {
  const { orderId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Load order from localStorage
    const orders = JSON.parse(localStorage.getItem('vendor_orders') || '[]');
    const found = orders.find(o => o.id === orderId);
    
    if (found) {
      setOrder(found);
    } else {
      alert('Order not found');
      navigate('/vendor/orders');
    }
  }, [orderId, navigate]);

  const handleCancelOrder = () => {
    if (window.confirm(`Cancel order ${orderId}?\n\nThis action cannot be undone.`)) {
      const orders = JSON.parse(localStorage.getItem('vendor_orders') || '[]');
      const updated = orders.map(o => 
        o.id === orderId ? { ...o, status: 'cancelled' } : o
      );
      localStorage.setItem('vendor_orders', JSON.stringify(updated));
      alert('Order cancelled successfully');
      navigate('/vendor/orders');
    }
  };

  if (!order) {
    return (
      <div className="admin-layout">
        <Sidebar userRole="vendor" />
        <div className="main-content">
          <Header />
          <div className="page-content">
            <div className="loading">Loading order details...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <Sidebar userRole="vendor" />
      <div className="main-content">
        <Header />
        <div className="page-content">
          <div className="page-header">
            <div>
              <button className="btn-back" onClick={() => navigate('/vendor/orders')}>
                ← Back to Orders
              </button>
              <h1>Order Details - {order.id}</h1>
              <p className="page-subtitle">Complete information about this order</p>
            </div>
            <span className={`status-badge-large status-${order.status}`}>
              {order.status === 'in-transit' ? 'In Transit' : 
               order.status === 'delivered' ? 'Delivered' :
               order.status === 'pending' ? 'Pending Assignment' :
               order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>

          <div className="order-details-container">
            {/* Order Timeline */}
            <div className="order-timeline">
              <h3>Order Status</h3>
              <div className="timeline">
                <div className={`timeline-item ${order.status !== 'cancelled' ? 'completed' : ''}`}>
                  <div className="timeline-icon">✓</div>
                  <div className="timeline-content">
                    <strong>Order Created</strong>
                    <span>{new Date(order.createdAt).toLocaleString()}</span>
                  </div>
                </div>
                
                <div className={`timeline-item ${order.driver !== 'Not Assigned' ? 'completed' : order.status === 'cancelled' ? '' : 'active'}`}>
                  <div className="timeline-icon">{order.driver !== 'Not Assigned' ? '✓' : '○'}</div>
                  <div className="timeline-content">
                    <strong>Driver Assigned</strong>
                    {order.driver !== 'Not Assigned' ? (
                      <span>{order.driver} accepted the order</span>
                    ) : (
                      <span>Waiting for driver...</span>
                    )}
                  </div>
                </div>

                <div className={`timeline-item ${order.status === 'in-transit' ? 'active' : order.status === 'delivered' ? 'completed' : ''}`}>
                  <div className="timeline-icon">{order.status === 'delivered' ? '✓' : '○'}</div>
                  <div className="timeline-content">
                    <strong>In Transit</strong>
                    <span>Package is on the way</span>
                  </div>
                </div>

                <div className={`timeline-item ${order.status === 'delivered' ? 'completed' : ''}`}>
                  <div className="timeline-icon">{order.status === 'delivered' ? '✓' : '○'}</div>
                  <div className="timeline-content">
                    <strong>Delivered</strong>
                    {order.deliveredAt ? (
                      <>
                        <span>{new Date(order.deliveredAt).toLocaleString()}</span>
                        {order.paymentMethod && (
                          <span className="payment-info">
                            Payment: {order.paymentMethod} - {order.paymentStatus}
                          </span>
                        )}
                      </>
                    ) : (
                      <span>Not yet delivered</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="details-card">
              <h3>👤 Customer Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Name</span>
                  <span className="info-value">{order.customerName}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Phone</span>
                  <span className="info-value">{order.customerPhone}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Email</span>
                  <span className="info-value">{order.customerEmail}</span>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="details-card">
              <h3>🚚 Delivery Information</h3>
              <div className="route-details">
                <div className="route-point-detail">
                  <span className="route-icon">📍</span>
                  <div>
                    <strong>Pickup Location</strong>
                    <p>{order.pickup}</p>
                  </div>
                </div>
                <div className="route-arrow">→</div>
                <div className="route-point-detail">
                  <span className="route-icon">🎯</span>
                  <div>
                    <strong>Delivery Location</strong>
                    <p>{order.delivery}</p>
                  </div>
                </div>
              </div>
              <div className="info-grid" style={{ marginTop: '20px' }}>
                <div className="info-item">
                  <span className="info-label">Distance</span>
                  <span className="info-value">{order.distance}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Priority</span>
                  <span className="info-value">{order.priority === 'express' ? '⚡ Express' : 'Standard'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Estimated Delivery</span>
                  <span className="info-value">{order.estimatedDelivery}</span>
                </div>
              </div>
            </div>

            {/* Package Information */}
            <div className="details-card">
              <h3>📦 Package Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Package Type</span>
                  <span className="info-value">{order.packageType}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Weight</span>
                  <span className="info-value">{order.weight} kg</span>
                </div>
                {order.fragile && (
                  <div className="info-item">
                    <span className="info-label">Special Handling</span>
                    <span className="info-value warning">⚠️ Fragile</span>
                  </div>
                )}
                {order.insurance && (
                  <div className="info-item">
                    <span className="info-label">Insurance</span>
                    <span className="info-value success">✓ Covered</span>
                  </div>
                )}
              </div>
              {order.specialInstructions && (
                <div className="special-instructions">
                  <strong>Special Instructions:</strong>
                  <p>{order.specialInstructions}</p>
                </div>
              )}
            </div>

            {/* Driver Information */}
            {order.driver !== 'Not Assigned' && (
              <div className="details-card">
                <h3>🚗 Driver Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Driver Name</span>
                    <span className="info-value">{order.driver}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Contact</span>
                    <span className="info-value">{order.driverPhone || '+1 (555) 000-0000'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Vehicle</span>
                    <span className="info-value">{order.driverVehicle || 'Sedan - ABC 123'}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Information */}
            <div className="details-card">
              <h3>💰 Payment Information</h3>
              <div className="pricing-breakdown">
                <div className="pricing-row">
                  <span>Order Amount</span>
                  <strong>${order.amount || '50.00'}</strong>
                </div>
                <div className="pricing-row">
                  <span>Delivery Fee</span>
                  <strong>${order.deliveryFee}</strong>
                </div>
                {order.insurance && (
                  <div className="pricing-row">
                    <span>Insurance</span>
                    <strong>$5.00</strong>
                  </div>
                )}
                <div className="pricing-divider"></div>
                <div className="pricing-row total">
                  <span>Total Amount</span>
                  <strong>${order.total}</strong>
                </div>
                {order.paymentMethod && (
                  <div className="payment-method-info">
                    <span>Payment Method: <strong>{order.paymentMethod}</strong></span>
                    <span className={`payment-status ${order.paymentStatus?.toLowerCase()}`}>
                      {order.paymentStatus || 'Pending'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="order-actions-bottom">
              {order.status === 'pending' && (
                <>
                  <button className="btn-cancel-order" onClick={handleCancelOrder}>
                    Cancel Order
                  </button>
                  <button className="btn-edit-order" onClick={() => navigate(`/vendor/edit-order/${order.id}`)}>
                    Edit Order
                  </button>
                </>
              )}
              {order.status === 'in-transit' && (
                <button className="btn-track-live" onClick={() => alert('Opening live tracking...')}>
                  🗺️ Track Live Location
                </button>
              )}
              {order.status === 'delivered' && (
                <button className="btn-download-invoice" onClick={() => alert('Downloading invoice...')}>
                  📄 Download Invoice
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorOrderDetails;