import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../pages/context/AuthContext';
import '../../styles/Login.css';

const RegisterVendor = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    businessType: '',
    taxId: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const businessTypes = [
    'Restaurant',
    'Retail Store',
    'E-commerce',
    'Wholesale',
    'Manufacturing',
    'Other'
  ];

  const handleChange = (e) => {
  const { name, value } = e.target;
  let newValue = value;

  if (name === "businessName" || name === "fullName" || name === "city") {
    newValue = value.replace(/[^A-Za-z\s]/g, "");
  }

  if (name === "phone") {
    newValue = value.replace(/[^0-9+]/g, "");
  }

  if (name === "zipCode") {
    newValue = value.replace(/[^0-9]/g, "");
  }

  if (name === "vehicleYear") {
    newValue = value.replace(/[^0-9]/g, "");
  }

  if (name === "vehiclePlate" || name === "licenseNumber") {
    newValue = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
  }

  if (name === "password" || name === "confirmPassword") {
    newValue = value.replace(/\s/g, "");
  }

  if (name === "email") {
    newValue = value.toLowerCase();
  }

  setFormData(prev => ({
    ...prev,
    [name]: newValue
  }));

  if (errors[name]) {
    setErrors(prev => ({ ...prev, [name]: "" }));
  }
};

  const validateForm = () => {
    const newErrors = {};


    if (/\s/.test(formData.password)) {
  newErrors.password = "Password cannot contain spaces";
}

    // Business Name
   if (!/^[A-Za-z\s]{3,}$/.test(formData.businessName)) {
  newErrors.businessName = "Business name must contain only letters";
}

    // Email
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Phone (India only)
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^(\+91|91)[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Enter valid Indian phone number starting with +91';
    }

    // Address
    if (!formData.address.trim()) {
      newErrors.address = 'Business address is required';
    } else if (formData.address.length < 10) {
      newErrors.address = 'Address must be at least 10 characters';
    }

    // City
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    } else if (!/^[A-Za-z\s]{2,}$/.test(formData.city)) {
      newErrors.city = 'City must contain only letters';
    }

    // PIN Code
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (!/^[1-9][0-9]{5}$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Enter a valid 6 digit Indian PIN code';
    }

    // Business Type
    if (!formData.businessType) {
      newErrors.businessType = 'Business type is required';
    }

    // Tax ID (optional)
    if (formData.taxId && !/^[A-Z0-9]{5,15}$/.test(formData.taxId)) {
      newErrors.taxId = 'Enter valid Tax ID';
    }

    // Password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(formData.password)) {
      newErrors.password =
        'Password must contain uppercase, lowercase, number & special character';
    }


    if (!/^[A-Za-z\s]{3,}$/.test(formData.fullName)) {
  newErrors.fullName = "Name must contain only letters";
}

if (!/^[A-Za-z\s]{2,}$/.test(formData.city)) {
  newErrors.city = "City must contain only letters";
}
    // Confirm Password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    const result = await register(formData, 'vendor');

    setIsLoading(false);

    if (result.success) {
      alert('✓ Registration successful! Welcome to TransLogix.');
      navigate('/vendor');
    } else {
      setErrors({ submit: result.error || 'Registration failed. Please try again.' });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box register-box">

        <h1>Register as Vendor</h1>
        <p className="subtitle">Start your business with us today</p>

        {errors.submit && (
          <div className="error-message">
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">

          <div className="form-row">

            <div className="input-group">
              <label>Business Name *</label>
              <input
                type="text"
                name="businessName"
                placeholder="Enter business name"
                value={formData.businessName}
                onChange={handleChange}
                className={errors.businessName ? 'error' : ''}
              />
              {errors.businessName && <span className="error-text">{errors.businessName}</span>}
            </div>

            <div className="input-group">
              <label>Business Type *</label>
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                className={errors.businessType ? 'error' : ''}
              >
                <option value="">Select type</option>
                {businessTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.businessType && <span className="error-text">{errors.businessType}</span>}
            </div>

          </div>

          <div className="form-row">

            <div className="input-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                placeholder="business@example.com"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="input-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                name="phone"
                placeholder="+919876543210"
                value={formData.phone}
                onChange={handleChange}
                maxLength="13"
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>

          </div>

          <div className="input-group">
            <label>Business Address *</label>
            <input
              type="text"
              name="address"
              placeholder="123 Business Street"
              value={formData.address}
              onChange={handleChange}
              className={errors.address ? 'error' : ''}
            />
            {errors.address && <span className="error-text">{errors.address}</span>}
          </div>

          <div className="form-row">

            <div className="input-group">
              <label>City *</label>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className={errors.city ? 'error' : ''}
              />
              {errors.city && <span className="error-text">{errors.city}</span>}
            </div>

            <div className="input-group">
              <label>PIN Code *</label>
              <input
                type="text"
                name="zipCode"
                placeholder="122001"
                value={formData.zipCode}
                onChange={handleChange}
                maxLength="6"
                className={errors.zipCode ? 'error' : ''}
              />
              {errors.zipCode && <span className="error-text">{errors.zipCode}</span>}
            </div>

          </div>

          <div className="input-group">
            <label>Tax ID (Optional)</label>
            <input
              type="text"
              name="taxId"
              placeholder="GST / TAX ID"
              value={formData.taxId}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">

            <div className="input-group">
              <label>Password *</label>
              <input
                type="password"
                name="password"
                placeholder="Strong password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <div className="input-group">
              <label>Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
            </div>

          </div>

          <div className="terms-checkbox">
            <label className="checkbox-label">
              <input type="checkbox" required />
              <span>
I agree to the <Link to="/terms" className="link">Terms and Conditions</Link>
</span>
            </label>
          </div>

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Vendor Account'}
          </button>

          <p className="signup-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default RegisterVendor;