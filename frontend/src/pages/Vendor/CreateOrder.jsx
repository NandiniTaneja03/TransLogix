import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import '../../styles/CreateOrder.css';

const CreateOrder = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
    length: '',
    width: '',
    height: '',
    priority: 'standard',
    deliveryDate: '',
    preferredTime: '',
    fragile: false,
    insurance: false,
    specialInstructions: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const packageTypes = [
    'Documents',
    'Electronics',
    'Clothing',
    'Food',
    'Furniture',
    'Medical Supplies',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Customer Info
    if (!formData.customerName.trim()) newErrors.customerName = 'Customer name required';
    if (!formData.customerPhone.trim()) newErrors.customerPhone = 'Phone required';
    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'Email required';
    } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Invalid email';
    }

    // Pickup
    if (!formData.pickupAddress.trim()) newErrors.pickupAddress = 'Pickup address required';
    if (!formData.pickupCity.trim()) newErrors.pickupCity = 'City required';
    if (!formData.pickupZip.trim()) newErrors.pickupZip = 'ZIP required';

    // Delivery
    if (!formData.deliveryAddress.trim()) newErrors.deliveryAddress = 'Delivery address required';
    if (!formData.deliveryCity.trim()) newErrors.deliveryCity = 'City required';
    if (!formData.deliveryZip.trim()) newErrors.deliveryZip = 'ZIP required';

    // Package
    if (!formData.packageType) newErrors.packageType = 'Package type required';
    if (!formData.weight) newErrors.weight = 'Weight required';
    if (!formData.deliveryDate) newErrors.deliveryDate = 'Delivery date required';

    return newErrors;
  };

  const calculateDeliveryFee = () => {
    let baseFee = 10;
    const weight = parseFloat(formData.weight) || 0;
    
    // Weight-based fee
    baseFee += weight * 2;
    
    // Priority fee
    if (formData.priority === 'express') baseFee += 15;
    if (formData.priority === 'overnight') baseFee += 25;
    
    // Insurance
    if (formData.insurance) baseFee += 5;
    
    return baseFee.toFixed(2);
  };

  const handleSaveAsDraft = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert('Please fill all required fields before saving as draft');
      return;
    }

    // Get existing drafts
    const drafts = JSON.parse(localStorage.getItem('vendor_drafts') || '[]');
    
    const draftOrder = {
      id: `DRAFT${Date.now()}`,
      ...formData,
      vendorId: user.id,
      vendorName: user.businessName || user.email,
      status: 'draft',
      deliveryFee: calculateDeliveryFee(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    drafts.push(draftOrder);
    localStorage.setItem('vendor_drafts', JSON.stringify(drafts));

    alert('✓ Order saved as draft!\n\nYou can find it in your dashboard.');
    navigate('/vendor');
  };
const handleCreateOrder = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:3000/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        address: "Sector 17 Chandigarh"
      }),
    });

    const data = await res.json();

    console.log("ORDER CREATED:", data);

  } catch (error) {
    console.error(error);
  }
};
const handleSubmit = async (e) => {
  e.preventDefault();

  const newErrors = validateForm();
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  try {
    setIsLoading(true);

    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:3000/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        address: formData.deliveryAddress
      }),
    });

    const data = await res.json();

    console.log("ORDER CREATED:", data);

    alert("Order created successfully ✅");

    navigate("/vendor");

  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="admin-layout">
      <Sidebar userRole="vendor" />
      <div className="main-content">
        <Header />
        <div className="page-content">
          <div className="page-header">
            <div>
         
              <p className="page-subtitle">Fill in the details to create a delivery order</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="create-order-form">
            {/* Customer Information */}
            <div className="form-section">
              <h2 className="section-title">
                <span className="section-icon">👤</span>
                Customer Information
              </h2>
              <div className="form-grid">
                <div className="input-group">
                  <label>Customer Name *</label>
                  <input
                    type="text"
                    name="customerName"
                    placeholder="John Doe"
                    value={formData.customerName}
                    onChange={handleChange}
                    className={errors.customerName ? 'error' : ''}
                  />
                  {errors.customerName && <span className="error-text">{errors.customerName}</span>}
                </div>

                <div className="input-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="customerPhone"
                    placeholder="+1 (555) 000-0000"
                    value={formData.customerPhone}
                    onChange={handleChange}
                    className={errors.customerPhone ? 'error' : ''}
                  />
                  {errors.customerPhone && <span className="error-text">{errors.customerPhone}</span>}
                </div>

                <div className="input-group full-width">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="customerEmail"
                    placeholder="customer@example.com"
                    value={formData.customerEmail}
                    onChange={handleChange}
                    className={errors.customerEmail ? 'error' : ''}
                  />
                  {errors.customerEmail && <span className="error-text">{errors.customerEmail}</span>}
                </div>
              </div>
            </div>

            {/* Pickup Location */}
            <div className="form-section">
              <h2 className="section-title">
                <span className="section-icon">📍</span>
                Pickup Location
              </h2>
              <div className="form-grid">
                <div className="input-group full-width">
                  <label>Pickup Address *</label>
                  <input
                    type="text"
                    name="pickupAddress"
                    placeholder="123 Business Street"
                    value={formData.pickupAddress}
                    onChange={handleChange}
                    className={errors.pickupAddress ? 'error' : ''}
                  />
                  {errors.pickupAddress && <span className="error-text">{errors.pickupAddress}</span>}
                </div>

                <div className="input-group">
                  <label>City *</label>
                  <input
                    type="text"
                    name="pickupCity"
                    placeholder="City"
                    value={formData.pickupCity}
                    onChange={handleChange}
                    className={errors.pickupCity ? 'error' : ''}
                  />
                  {errors.pickupCity && <span className="error-text">{errors.pickupCity}</span>}
                </div>

                <div className="input-group">
                  <label>ZIP Code *</label>
                  <input
                    type="text"
                    name="pickupZip"
                    placeholder="12345"
                    value={formData.pickupZip}
                    onChange={handleChange}
                    className={errors.pickupZip ? 'error' : ''}
                  />
                  {errors.pickupZip && <span className="error-text">{errors.pickupZip}</span>}
                </div>
              </div>
            </div>

            {/* Delivery Location */}
            <div className="form-section">
              <h2 className="section-title">
                <span className="section-icon">🎯</span>
                Delivery Location
              </h2>
              <div className="form-grid">
                <div className="input-group full-width">
                  <label>Delivery Address *</label>
                  <input
                    type="text"
                    name="deliveryAddress"
                    placeholder="456 Customer Avenue"
                    value={formData.deliveryAddress}
                    onChange={handleChange}
                    className={errors.deliveryAddress ? 'error' : ''}
                  />
                  {errors.deliveryAddress && <span className="error-text">{errors.deliveryAddress}</span>}
                </div>

                <div className="input-group">
                  <label>City *</label>
                  <input
                    type="text"
                    name="deliveryCity"
                    placeholder="City"
                    value={formData.deliveryCity}
                    onChange={handleChange}
                    className={errors.deliveryCity ? 'error' : ''}
                  />
                  {errors.deliveryCity && <span className="error-text">{errors.deliveryCity}</span>}
                </div>

                <div className="input-group">
                  <label>ZIP Code *</label>
                  <input
                    type="text"
                    name="deliveryZip"
                    placeholder="12345"
                    value={formData.deliveryZip}
                    onChange={handleChange}
                    className={errors.deliveryZip ? 'error' : ''}
                  />
                  {errors.deliveryZip && <span className="error-text">{errors.deliveryZip}</span>}
                </div>
              </div>
            </div>

            {/* Package Details */}
            <div className="form-section">
              <h2 className="section-title">
                <span className="section-icon">📦</span>
                Package Details
              </h2>
              <div className="form-grid">
                <div className="input-group">
                  <label>Package Type *</label>
                  <select
                    name="packageType"
                    value={formData.packageType}
                    onChange={handleChange}
                    className={errors.packageType ? 'error' : ''}
                  >
                    <option value="">Select type</option>
                    {packageTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.packageType && <span className="error-text">{errors.packageType}</span>}
                </div>

                <div className="input-group">
                  <label>Weight (kg) *</label>
                  <input
                    type="number"
                    name="weight"
                    placeholder="0.0"
                    step="0.1"
                    value={formData.weight}
                    onChange={handleChange}
                    className={errors.weight ? 'error' : ''}
                  />
                  {errors.weight && <span className="error-text">{errors.weight}</span>}
                </div>

                <div className="input-group full-width">
                  <label>Dimensions (L × W × H cm)</label>
                  <input
                    type="text"
                    name="dimensions"
                    placeholder="30 × 20 × 15"
                    value={`${formData.length} × ${formData.width} × ${formData.height}`}
                    readOnly
                  />
                </div>

                <div className="input-group">
                  <label>Priority *</label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                  >
                    <option value="standard">Standard</option>
                    <option value="express">Express (+$15)</option>
                    <option value="overnight">Overnight (+$25)</option>
                  </select>
                </div>

                <div className="input-group">
                  <label>Delivery Date *</label>
                  <input
                    type="date"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleChange}
                    className={errors.deliveryDate ? 'error' : ''}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  {errors.deliveryDate && <span className="error-text">{errors.deliveryDate}</span>}
                </div>

                <div className="input-group">
                  <label>Preferred Time</label>
                  <input
                    type="time"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                  />
                </div>

                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="fragile"
                      checked={formData.fragile}
                      onChange={handleChange}
                    />
                    <span>Fragile - Handle with care</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="insurance"
                      checked={formData.insurance}
                      onChange={handleChange}
                    />
                    <span>Add insurance coverage (+$5)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="form-section">
              <h2 className="section-title">
                <span className="section-icon">📝</span>
                Additional Information
              </h2>
              <div className="input-group">
                <label>Special Instructions</label>
                <textarea
                  name="specialInstructions"
                  placeholder="Any special delivery instructions..."
                  rows="4"
                  value={formData.specialInstructions}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Delivery Fee Summary */}
            <div className="fee-summary">
              <div className="fee-row">
                <span>Delivery Fee:</span>
                <strong>${calculateDeliveryFee()}</strong>
              </div>
              {formData.priority === 'express' && (
                <div className="fee-row small">
                  <span>Express Delivery:</span>
                  <span>+$15.00</span>
                </div>
              )}
              {formData.priority === 'overnight' && (
                <div className="fee-row small">
                  <span>Overnight Delivery:</span>
                  <span>+$25.00</span>
                </div>
              )}
              {formData.insurance && (
                <div className="fee-row small">
                  <span>Insurance:</span>
                  <span>+$5.00</span>
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="form-actions">
              <button 
                type="button" 
                className="btn-draft"
                onClick={handleSaveAsDraft}
                disabled={isLoading}
              >
                Save as Draft
              </button>
              <button 
                type="submit" 
                className="btn-submit"
                disabled={isLoading}
              >
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