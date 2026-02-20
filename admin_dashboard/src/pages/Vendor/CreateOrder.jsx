import React, { useState } from 'react';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import '../../styles/CreateOrder.css';

const CreateOrder = () => {
  const [orderData, setOrderData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    pickupAddress: '',
    pickupCity: '',
    pickupZip: '',
    deliveryAddress: '',
    deliveryCity: '',
    deliveryZip: '',
    packageType: '',
    weight: '',
    dimensions: '',
    deliveryDate: '',
    deliveryTime: '',
    priority: 'standard',
    fragile: false,
    insurance: false,
    specialInstructions: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const packageTypes = [
    'Document',
    'Small Package',
    'Medium Package',
    'Large Package',
    'Fragile Item',
    'Perishable',
    'Electronics'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setOrderData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      console.log('Order created:', orderData);
      alert('Order created successfully!');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="admin-layout">
      <Sidebar userRole="vendor" />
      <div className="main-content">
        <Header />
        <div className="page-content">
          <div className="page-header">
            <div>
              <h1>Create New Order</h1>
              <p className="page-subtitle">Fill in the details to create a delivery order</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="create-order-form">
            <div className="form-section">
              <h2 className="section-title">
                <span className="section-icon">👤</span>
                Customer Information
              </h2>
              <div className="form-grid">
                <div className="input-group">
                  <label>Customer Name *</label>
                  <input type="text" name="customerName" placeholder="John Doe" value={orderData.customerName} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <label>Phone Number *</label>
                  <input type="tel" name="customerPhone" placeholder="+1 (555) 000-0000" value={orderData.customerPhone} onChange={handleChange} required />
                </div>
                <div className="input-group full-width">
                  <label>Email (Optional)</label>
                  <input type="email" name="customerEmail" placeholder="customer@example.com" value={orderData.customerEmail} onChange={handleChange} />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2 className="section-title">
                <span className="section-icon">📍</span>
                Pickup Location
              </h2>
              <div className="form-grid">
                <div className="input-group full-width">
                  <label>Pickup Address *</label>
                  <input type="text" name="pickupAddress" placeholder="123 Pickup Street" value={orderData.pickupAddress} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <label>City *</label>
                  <input type="text" name="pickupCity" placeholder="City" value={orderData.pickupCity} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <label>ZIP Code *</label>
                  <input type="text" name="pickupZip" placeholder="12345" value={orderData.pickupZip} onChange={handleChange} required />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2 className="section-title">
                <span className="section-icon">🚚</span>
                Delivery Location
              </h2>
              <div className="form-grid">
                <div className="input-group full-width">
                  <label>Delivery Address *</label>
                  <input type="text" name="deliveryAddress" placeholder="456 Delivery Avenue" value={orderData.deliveryAddress} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <label>City *</label>
                  <input type="text" name="deliveryCity" placeholder="City" value={orderData.deliveryCity} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <label>ZIP Code *</label>
                  <input type="text" name="deliveryZip" placeholder="12345" value={orderData.deliveryZip} onChange={handleChange} required />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2 className="section-title">
                <span className="section-icon">📦</span>
                Package Details
              </h2>
              <div className="form-grid">
                <div className="input-group">
                  <label>Package Type *</label>
                  <select name="packageType" value={orderData.packageType} onChange={handleChange} required>
                    <option value="">Select package type</option>
                    {packageTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div className="input-group">
                  <label>Weight (kg) *</label>
                  <input type="number" name="weight" placeholder="5.0" step="0.1" value={orderData.weight} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <label>Dimensions (L x W x H cm)</label>
                  <input type="text" name="dimensions" placeholder="30 x 20 x 15" value={orderData.dimensions} onChange={handleChange} />
                </div>
                <div className="input-group">
                  <label>Priority *</label>
                  <select name="priority" value={orderData.priority} onChange={handleChange} required>
                    <option value="standard">Standard</option>
                    <option value="express">Express</option>
                    <option value="overnight">Overnight</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>Delivery Date *</label>
                  <input type="date" name="deliveryDate" value={orderData.deliveryDate} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <label>Preferred Time</label>
                  <input type="time" name="deliveryTime" value={orderData.deliveryTime} onChange={handleChange} />
                </div>
              </div>

              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input type="checkbox" name="fragile" checked={orderData.fragile} onChange={handleChange} />
                  <span>Fragile - Handle with care</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" name="insurance" checked={orderData.insurance} onChange={handleChange} />
                  <span>Add insurance coverage</span>
                </label>
              </div>
            </div>

            <div className="form-section">
              <h2 className="section-title">
                <span className="section-icon">📝</span>
                Additional Information
              </h2>
              <div className="input-group">
                <label>Special Instructions</label>
                <textarea name="specialInstructions" placeholder="Any special delivery instructions..." value={orderData.specialInstructions} onChange={handleChange} rows="4" />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-secondary">Save as Draft</button>
              <button type="submit" className="btn-primary" disabled={isLoading}>
                {isLoading ? 'Creating Order...' : 'Create Order'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;