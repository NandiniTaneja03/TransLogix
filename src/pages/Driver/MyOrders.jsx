import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../pages/context/AuthContext';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import '../../styles/MyOrders.css';

const MyOrders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('available');
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [otpInput, setOtpInput] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  // Load orders from vendor's localStorage
  const [availableOrders, setAvailableOrders] = useState([]);
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    // Get vendor orders that are pending (available for drivers)
    const vendorOrders = JSON.parse(localStorage.getItem('vendor_orders') || '[]');
    const pending = vendorOrders.filter(o => o.status === 'pending');
    setAvailableOrders(pending);

    // Get driver's accepted orders
    const driverAccepted = JSON.parse(localStorage.getItem('driver_accepted_orders') || '[]');
    setAcceptedOrders(driverAccepted);

    // Get driver's completed orders
    const driverCompleted = JSON.parse(localStorage.getItem('driver_completed_orders') || '[]');
    setCompletedOrders(driverCompleted);
  };

  // ACCEPT ORDER
  const handleAcceptOrder = (orderId) => {
    const order = availableOrders.find(o => o.id === orderId);
    if (!order) return;

    if (window.confirm(`Accept order ${orderId}?\n\nYou'll earn: $${order.deliveryFee}\nDistance: ${order.distance}`)) {
      // Remove from vendor's pending orders and update status
      const vendorOrders = JSON.parse(localStorage.getItem('vendor_orders') || '[]');
      const updatedVendorOrders = vendorOrders.map(o => 
        o.id === orderId 
          ? { 
              ...o, 
              status: 'in-transit', 
              driver: user.fullName || user.email,
              driverPhone: user.phone || '+1 (555) 000-0000',
              driverVehicle: `${user.vehicleType || 'Sedan'} - ${user.vehiclePlate || 'ABC 123'}`,
              acceptedAt: new Date().toISOString()
            } 
          : o
      );
      localStorage.setItem('vendor_orders', JSON.stringify(updatedVendorOrders));

      // Add to driver's accepted orders
      const driverAccepted = JSON.parse(localStorage.getItem('driver_accepted_orders') || '[]');
      const acceptedOrder = {
        ...order,
        status: 'in-transit',
        driver: user.fullName || user.email,
        driverPhone: user.phone || '+1 (555) 000-0000',
        driverVehicle: `${user.vehicleType || 'Sedan'} - ${user.vehiclePlate || 'ABC 123'}`,
        acceptedAt: new Date().toISOString(),
        earnings: parseFloat(order.deliveryFee || 12),
        otp: Math.floor(1000 + Math.random() * 9000).toString() // Generate 4-digit OTP
      };
      driverAccepted.push(acceptedOrder);
      localStorage.setItem('driver_accepted_orders', JSON.stringify(driverAccepted));

      loadOrders();
      setActiveTab('accepted');
      
      alert(`✓ Order ${orderId} accepted!\n\nOTP for delivery: ${acceptedOrder.otp}\n\nNavigate to pickup: ${order.pickup}\n\nCustomer will provide this OTP upon delivery confirmation.`);
    }
  };

  // REJECT ORDER
  const handleRejectOrder = (orderId) => {
    if (window.confirm(`Reject order ${orderId}?\n\nThis order will be offered to another driver.`)) {
      // Just remove from available list (it stays in vendor's pending)
      setAvailableOrders(prev => prev.filter(o => o.id !== orderId));
      alert(`Order ${orderId} rejected.`);
    }
  };

  // START DELIVERY COMPLETION (Ask for Payment Method First)
  const handleStartCompletion = (order) => {
    setSelectedOrder(order);
    setShowPaymentModal(true);
  };

  // PAYMENT METHOD SELECTED - Now Ask for OTP
  const handlePaymentMethodSelected = () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    setShowPaymentModal(false);
    setShowOTPModal(true);
  };

  // VERIFY OTP AND COMPLETE DELIVERY
  const handleVerifyOTP = () => {
    if (!selectedOrder) return;

    if (otpInput !== selectedOrder.otp) {
      alert('❌ Invalid OTP!\n\nPlease check the OTP with the customer.');
      return;
    }

    // OTP Verified - Complete the order
    const completedOrder = {
      ...selectedOrder,
      status: 'delivered',
      deliveredAt: new Date().toISOString(),
      paymentMethod: paymentMethod,
      paymentStatus: paymentMethod === 'cash' ? 'Cash Collected' : 'Paid Online',
      otpVerified: true,
      completedBy: user.fullName || user.email
    };

    // Remove from accepted orders
    const driverAccepted = JSON.parse(localStorage.getItem('driver_accepted_orders') || '[]');
    const updatedAccepted = driverAccepted.filter(o => o.id !== selectedOrder.id);
    localStorage.setItem('driver_accepted_orders', JSON.stringify(updatedAccepted));

    // Add to completed orders
    const driverCompleted = JSON.parse(localStorage.getItem('driver_completed_orders') || '[]');
    driverCompleted.push(completedOrder);
    localStorage.setItem('driver_completed_orders', JSON.stringify(driverCompleted));

    // Update vendor's order
    const vendorOrders = JSON.parse(localStorage.getItem('vendor_orders') || '[]');
    const updatedVendorOrders = vendorOrders.map(o => 
      o.id === selectedOrder.id ? completedOrder : o
    );
    localStorage.setItem('vendor_orders', JSON.stringify(updatedVendorOrders));

    // Add earnings to wallet
    const currentWallet = JSON.parse(localStorage.getItem('driver_wallet') || '{"balance": 0, "transactions": []}');
    const earnings = parseFloat(selectedOrder.earnings || selectedOrder.deliveryFee || 12);
    
    const newTransaction = {
      id: `TXN${Date.now()}`,
      orderId: selectedOrder.id,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'delivery',
      customer: selectedOrder.customerName,
      pickup: selectedOrder.pickup,
      delivery: selectedOrder.delivery,
      distance: selectedOrder.distance,
      baseFee: earnings,
      distanceBonus: 0,
      tip: 0,
      total: earnings,
      status: 'completed',
      paymentMethod: paymentMethod
    };
    
    currentWallet.balance += earnings;
    currentWallet.transactions.unshift(newTransaction);
    localStorage.setItem('driver_wallet', JSON.stringify(currentWallet));

    // Generate Report for Vendor
    generateReport(completedOrder);

    // Reset states
    setShowOTPModal(false);
    setOtpInput('');
    setPaymentMethod('');
    setSelectedOrder(null);
    
    loadOrders();
    setActiveTab('completed');
    
    alert(`✓ Delivery Completed!\n\nOrder: ${completedOrder.id}\nPayment: ${paymentMethod.toUpperCase()}\nEarnings: $${earnings.toFixed(2)} added to wallet\n\nGreat job!`);
  };

  // GENERATE REPORT FOR VENDOR
  const generateReport = (order) => {
    const reports = JSON.parse(localStorage.getItem('vendor_reports') || '[]');
    
    const report = {
      id: `RPT${Date.now()}`,
      orderId: order.id,
      customerName: order.customerName,
      deliveryDate: new Date().toLocaleDateString(),
      deliveryTime: new Date().toLocaleTimeString(),
      driver: order.driver,
      pickup: order.pickup,
      delivery: order.delivery,
      distance: order.distance,
      packageType: order.packageType,
      orderAmount: parseFloat(order.amount || 50),
      deliveryFee: parseFloat(order.deliveryFee),
      totalAmount: parseFloat(order.total),
      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
      status: 'delivered',
      createdAt: order.createdAt,
      completedAt: order.deliveredAt,
      duration: calculateDuration(order.createdAt, order.deliveredAt)
    };

    reports.push(report);
    localStorage.setItem('vendor_reports', JSON.stringify(reports));
  };

  const calculateDuration = (start, end) => {
    const diff = new Date(end) - new Date(start);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const getOrdersByTab = () => {
    switch(activeTab) {
      case 'available': return availableOrders;
      case 'accepted': return acceptedOrders;
      case 'completed': return completedOrders;
      default: return [];
    }
  };

  const orders = getOrdersByTab();

  return (
    <div className="admin-layout">
      <Sidebar userRole="driver" />
      <div className="main-content">
        <Header />
        <div className="page-content">
          <div className="page-header">
            <div>
              <h1> My Orders</h1>
              <p className="page-subtitle">Manage your delivery orders</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="orders-tabs">
            <button 
              className={`tab ${activeTab === 'available' ? 'active' : ''}`}
              onClick={() => setActiveTab('available')}
            >
              Available Orders
              <span className="tab-count">{availableOrders.length}</span>
            </button>
            <button 
              className={`tab ${activeTab === 'accepted' ? 'active' : ''}`}
              onClick={() => setActiveTab('accepted')}
            >
              My Active Orders
              <span className="tab-count">{acceptedOrders.length}</span>
            </button>
            <button 
              className={`tab ${activeTab === 'completed' ? 'active' : ''}`}
              onClick={() => setActiveTab('completed')}
            >
              Completed
              <span className="tab-count">{completedOrders.length}</span>
            </button>
          </div>

          {/* Orders Grid */}
          <div className="orders-grid">
            {orders.map((order) => (
              <div key={order.id} className={`order-card ${order.priority}`}>
                <div className="order-header">
                  <div>
                    <h3>{order.id}</h3>
                    <span className="vendor-name">{order.vendorName || 'Vendor'}</span>
                  </div>
                  {order.priority === 'express' && (
                    <span className="priority-badge">⚡ Express</span>
                  )}
                </div>

                <div className="order-customer">
                  <span className="customer-icon">👤</span>
                  <span>{order.customerName}</span>
                  {order.customerPhone && (
                    <span className="customer-phone">📞 {order.customerPhone}</span>
                  )}
                </div>

                <div className="order-route">
                  <div className="route-point pickup">
                    <span className="route-icon">📍</span>
                    <div>
                      <span className="route-label">Pickup</span>
                      <span className="route-address">{order.pickup}</span>
                    </div>
                  </div>
                  <div className="route-line"></div>
                  <div className="route-point delivery">
                    <span className="route-icon">🎯</span>
                    <div>
                      <span className="route-label">Delivery</span>
                      <span className="route-address">{order.delivery}</span>
                    </div>
                  </div>
                </div>

                <div className="order-details-grid">
                  <div className="detail-item">
                    <span className="detail-icon">📏</span>
                    <span>{order.distance}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">📦</span>
                    <span>{order.packageType}</span>
                  </div>
                  {order.weight && (
                    <div className="detail-item">
                      <span className="detail-icon">⚖️</span>
                      <span>{order.weight} kg</span>
                    </div>
                  )}
                </div>

               {activeTab !== 'completed' && (
  <div className="order-earnings">

    <span className="earnings-label">Payment Breakdown</span>

    <div className="earnings-row">
      <span>Order Value</span>
      <strong>${parseFloat(order.amount || 50).toFixed(2)}</strong>
    </div>

    <div className="earnings-row">
      <span>Delivery Fee</span>
      <strong>${parseFloat(order.deliveryFee || 12).toFixed(2)}</strong>
    </div>

    <div className="earnings-row total">
      <span>Your Earnings</span>
      <strong>${parseFloat(order.deliveryFee || order.earnings || 12).toFixed(2)}</strong>
    </div>

  </div>
)}

                {/* Action Buttons */}
                <div className="order-actions">
                  {activeTab === 'available' && (
                    <>
                      <button 
                        className="btn-reject"
                        onClick={() => handleRejectOrder(order.id)}
                      >
                        Reject
                      </button>
                      <button 
                        className="btn-accept"
                        onClick={() => handleAcceptOrder(order.id)}
                      >
                        Accept Order
                      </button>
                    </>
                  )}
                  
                  {activeTab === 'accepted' && (
                    <>
                      <button className="btn-navigate" onClick={() => alert(`Opening navigation to:\n${order.pickup}\n\nThen to:\n${order.delivery}`)}>
                        🗺️ Navigate
                      </button>
                      <button 
                        className="btn-complete"
                        onClick={() => handleStartCompletion(order)}
                      >
                        ✓ Complete Delivery
                      </button>
                    </>
                  )}

                  {activeTab === 'completed' && (
                    <div className="completed-info">
                      <span className="completed-badge">✓ Delivered</span>
                      <span className="completed-time">{new Date(order.deliveredAt).toLocaleString()}</span>
                      <span className="completed-amount">Earned: ${parseFloat(order.earnings || order.deliveryFee || 12).toFixed(2)}</span>
                      <span className="payment-method">💳 {order.paymentMethod?.toUpperCase()}</span>
                    </div>
                  )}
                </div>

                {/* Show OTP for accepted orders */}
                {activeTab === 'accepted' && order.otp && (
                  <div className="otp-display">
                    <span className="otp-label">Customer OTP:</span>
                    <span className="otp-code">{order.otp}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {orders.length === 0 && (
            <div className="no-orders">
              <span className="no-orders-icon">📭</span>
              <h3>No {activeTab} orders</h3>
              <p>
                {activeTab === 'available' && 'New delivery orders from vendors will appear here'}
                {activeTab === 'accepted' && 'Accept available orders to start earning'}
                {activeTab === 'completed' && 'Your completed deliveries will show here with earnings'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Payment Method Selection Modal */}
      {showPaymentModal && selectedOrder && (
        <div className="modal-overlay" onClick={() => setShowPaymentModal(false)}>
          <div className="modal-content payment-modal" onClick={(e) => e.stopPropagation()}>
            <h2>💳 Select Payment Method</h2>
            <p>How did the customer pay for this order?</p>
            
            <div className="payment-methods">
              <div 
                className={`payment-option ${paymentMethod === 'cash' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('cash')}
              >
                <div className="payment-icon">💵</div>
                <div className="payment-details">
                  <strong>Cash Payment</strong>
                  <span>Customer pays in cash</span>
                </div>
                <div className="payment-check">{paymentMethod === 'cash' ? '✓' : ''}</div>
              </div>

              <div 
                className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                <div className="payment-icon">💳</div>
                <div className="payment-details">
                  <strong>Card Payment</strong>
                  <span>Debit/Credit Card</span>
                </div>
                <div className="payment-check">{paymentMethod === 'card' ? '✓' : ''}</div>
              </div>

              <div 
                className={`payment-option ${paymentMethod === 'online' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('online')}
              >
                <div className="payment-icon">📱</div>
                <div className="payment-details">
                  <strong>Online Payment</strong>
                  <span>UPI / Net Banking / Wallet</span>
                </div>
                <div className="payment-check">{paymentMethod === 'online' ? '✓' : ''}</div>
              </div>

              <div 
                className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('cod')}
              >
                <div className="payment-icon">📦</div>
                <div className="payment-details">
                  <strong>Cash on Delivery</strong>
                  <span>Pay on delivery</span>
                </div>
                <div className="payment-check">{paymentMethod === 'cod' ? '✓' : ''}</div>
              </div>
            </div>

            <div className="order-summary-payment">
              <div className="summary-row">
                <span>Order Amount:</span>
                <strong>${selectedOrder.total}</strong>
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowPaymentModal(false)}>
                Cancel
              </button>
              <button 
                className="btn-confirm" 
                onClick={handlePaymentMethodSelected}
                disabled={!paymentMethod}
              >
                Continue to OTP
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OTP Verification Modal */}
      {showOTPModal && selectedOrder && (
        <div className="modal-overlay" onClick={() => setShowOTPModal(false)}>
          <div className="modal-content otp-modal" onClick={(e) => e.stopPropagation()}>
            <h2>🔐 Verify OTP</h2>
            <p>Ask customer for the 4-digit OTP to confirm delivery</p>
            
            <div className="otp-info-box">
              <div className="info-row">
                <span>Order ID:</span>
                <strong>{selectedOrder.id}</strong>
              </div>
              <div className="info-row">
                <span>Customer:</span>
                <strong>{selectedOrder.customerName}</strong>
              </div>
              <div className="info-row">
                <span>Payment:</span>
                <strong>{paymentMethod.toUpperCase()}</strong>
              </div>
              <div className="info-row">
                <span>Amount:</span>
                <strong>${selectedOrder.total}</strong>
              </div>
            </div>

            <div className="otp-input-section">
              <label>Enter OTP</label>
              <input
                type="text"
                placeholder="Enter 4-digit OTP"
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, '').slice(0, 4))}
                maxLength="4"
                className="otp-input"
                autoFocus
              />
              <span className="otp-hint">
                💡 The customer received this OTP when the order was created
              </span>
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => {
                setShowOTPModal(false);
                setOtpInput('');
              }}>
                Cancel
              </button>
              <button 
                className="btn-verify" 
                onClick={handleVerifyOTP}
                disabled={otpInput.length !== 4}
              >
                Verify & Complete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;