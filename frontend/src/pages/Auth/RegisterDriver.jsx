import React, { useState } from 'react'; 
import { useNavigate, Link } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext'; 
import '../../styles/Login.css';

const RegisterDriver = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    dateOfBirth: '',
    licenseNumber: '',
    licenseExpiry: '',
    vehicleType: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    vehiclePlate: '',
    insuranceNumber: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const vehicleTypes = [
    'Sedan',
    'SUV',
    'Van',
    'Pickup Truck',
    'Motorcycle',
    'Bicycle',
    'Other'
  ];
// Validation patterns
// Validation patterns
const nameRegex = /^[A-Za-z\s]+$/;
const phoneRegex = /^(\+91)?[6-9]\d{9}$/; // ✅ supports +91 & normal
const zipRegex = /^\d{6}$/;
const licenseRegex = /^[A-Z]{2}[0-9]{13}$/i;

// ✅ UPDATED (allows spaces)
const plateRegex = /^[A-Z]{2}\s?\d{2}\s?[A-Z]{1,2}\s?\d{4}$/;


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

const validateForm = () => {
  const newErrors = {};

  // FULL NAME
  if (!formData.fullName.trim()) {
    newErrors.fullName = "Full name is required";
  } 

  else if (!nameRegex.test(formData.fullName)) {
    newErrors.fullName = "Name should contain only letters";
  }

  // EMAIL
  if (!formData.email) {
    newErrors.email = "Email is required";
  } 
  else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = "Enter a valid email";
  }

  // PHONE (INDIAN)
  if (!formData.phone) {
  newErrors.phone = "Phone number is required";
}
else if (!/^(\+91)?[6-9]\d{9}$/.test(formData.phone)) {
  newErrors.phone = "Enter valid Indian mobile number";
}

  // ADDRESS
  if (!formData.address.trim()) {
    newErrors.address = "Address is required";
  }

  // CITY
  if (!formData.city.trim()) {
    newErrors.city = "City is required";
  } 
  else if (!nameRegex.test(formData.city)) {
    newErrors.city = "City should contain letters only";
  }

  // PINCODE
  if (!formData.zipCode) {
    newErrors.zipCode = "PIN code required";
  } 
  else if (!zipRegex.test(formData.zipCode)) {
    newErrors.zipCode = "Enter valid 6 digit PIN code";
  }

  // AGE VALIDATION
  if (!formData.dateOfBirth) {
    newErrors.dateOfBirth = "Date of birth required";
  } 
  else {
    const birth = new Date(formData.dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();

    if (age < 18) {
      newErrors.dateOfBirth = "Driver must be at least 18";
    }
  }

  // LICENSE NUMBER
  if (!formData.licenseNumber.trim()) {
    newErrors.licenseNumber = "License number required";
  } 
  else if (!licenseRegex.test(formData.licenseNumber)) {
    newErrors.licenseNumber = "Invalid driving license format";
  }

  // LICENSE EXPIRY
  if (!formData.licenseExpiry) {
    newErrors.licenseExpiry = "Expiry date required";
  } 
  else {
    const expiry = new Date(formData.licenseExpiry);
    const today = new Date();

    if (expiry < today) {
      newErrors.licenseExpiry = "License expired";
    }
  }

  // VEHICLE TYPE
  if (!formData.vehicleType) {
    newErrors.vehicleType = "Vehicle type required";
  }

  // VEHICLE MAKE
  if (!formData.vehicleMake.trim()) {
    newErrors.vehicleMake = "Vehicle make required";
  }

  // VEHICLE MODEL
  if (!formData.vehicleModel.trim()) {
    newErrors.vehicleModel = "Vehicle model required";
  }

  // VEHICLE YEAR
  const year = Number(formData.vehicleYear);
  const currentYear = new Date().getFullYear();

  if (!year) {
    newErrors.vehicleYear = "Vehicle year required";
  } 
  else if (year < 2000 || year > currentYear + 1) {
    newErrors.vehicleYear = "Enter valid vehicle year";
  }

  // NUMBER PLATE
  if (!formData.vehiclePlate.trim()) {
    newErrors.vehiclePlate = "License plate required";
  } 
  else if (!plateRegex.test(formData.vehiclePlate)) {
    newErrors.vehiclePlate = "Invalid Indian number plate";
  }

  // INSURANCE
  if (!formData.insuranceNumber.trim()) {
    newErrors.insuranceNumber = "Insurance number required";
  }

  // PASSWORD
  if (!formData.password) {
    newErrors.password = "Password required";
  } 
  else if (formData.password.length < 8) {
    newErrors.password = "Minimum 8 characters";
  }

  // CONFIRM PASSWORD
  if (formData.password !== formData.confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match";
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

  
    // Register using AuthContext
const formattedData = {
  ...formData,
  phone: "+91" + formData.phone,
  vehiclePlate: formData.vehiclePlate.replace(/\s+/g, ""),
  city: formData.city.toLowerCase().trim()   // 🔥 ADD THIS
};

const result = await register(formattedData, 'driver');    
    setIsLoading(false);

    if (result.success) {
      alert('✓ Registration successful! Welcome to TransLogix.');
      navigate('/driver');
    } else {
      setErrors({ submit: result.error || 'Registration failed. Please try again.' });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box register-box">
        <div className="logo-section">
          <div className="logo-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2>TransLogix</h2>
        </div>

        <h1>Register as Driver</h1>
        <p className="subtitle">Join our delivery network today</p>

        {errors.submit && (
          <div className="error-message">
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-section-title">Personal Information</div>
          
          <div className="input-group">
            <label>Full Name *</label>
           <input
type="text"
name="fullName"
placeholder="John Doe"
value={formData.fullName}
onChange={(e)=>{
  const value = e.target.value;
  if(/^[A-Za-z\s]*$/.test(value)){
    handleChange(e);
  }
}}
/>
            {errors.fullName && <span className="error-text">{errors.fullName}</span>}
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                placeholder="driver@example.com"
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
  placeholder="9876543210"
  maxLength="10"
  value={formData.phone}
  onChange={(e) => {
    let value = e.target.value;

    // allow only digits
    if (/^\d*$/.test(value)) {
      setFormData(prev => ({ ...prev, phone: value }));

      if (errors.phone) {
        setErrors(prev => ({ ...prev, phone: '' }));
      }
    }
  }}
/>
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>
          </div>

          <div className="input-group">
            <label>Address *</label>
            <input
              type="text"
              name="address"
              placeholder="123 Main Street, Apt 4B"
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
              <label>ZIP Code *</label>
              <input
                type="text"
                name="zipCode"
                placeholder="12345"
                value={formData.zipCode}
                onChange={handleChange}
                className={errors.zipCode ? 'error' : ''}
              />
              {errors.zipCode && <span className="error-text">{errors.zipCode}</span>}
            </div>
          </div>

          <div className="input-group">
            <label>Date of Birth *</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className={errors.dateOfBirth ? 'error' : ''}
            />
            {errors.dateOfBirth && <span className="error-text">{errors.dateOfBirth}</span>}
          </div>

          <div className="form-section-title">Driver's License</div>

          <div className="form-row">
            <div className="input-group">
              <label>License Number *</label>
              <input
                type="text"
                name="licenseNumber"
                placeholder="DL123456789"
                value={formData.licenseNumber}
                onChange={handleChange}
                className={errors.licenseNumber ? 'error' : ''}
              />
              {errors.licenseNumber && <span className="error-text">{errors.licenseNumber}</span>}
            </div>

            <div className="input-group">
              <label>License Expiry *</label>
              <input
                type="date"
                name="licenseExpiry"
                value={formData.licenseExpiry}
                onChange={handleChange}
                className={errors.licenseExpiry ? 'error' : ''}
              />
              {errors.licenseExpiry && <span className="error-text">{errors.licenseExpiry}</span>}
            </div>
          </div>

          <div className="form-section-title">Vehicle Information</div>

          <div className="form-row">
            <div className="input-group">
              <label>Vehicle Type *</label>
              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                className={errors.vehicleType ? 'error' : ''}
              >
                <option value="">Select type</option>
                {vehicleTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.vehicleType && <span className="error-text">{errors.vehicleType}</span>}
            </div>

            <div className="input-group">
              <label>Vehicle Make *</label>
              <input
                type="text"
                name="vehicleMake"
                placeholder="Toyota, Honda..."
                value={formData.vehicleMake}
                onChange={handleChange}
                className={errors.vehicleMake ? 'error' : ''}
              />
              {errors.vehicleMake && <span className="error-text">{errors.vehicleMake}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Vehicle Model *</label>
              <input
                type="text"
                name="vehicleModel"
                placeholder="Camry, Civic..."
                value={formData.vehicleModel}
                onChange={handleChange}
                className={errors.vehicleModel ? 'error' : ''}
              />
              {errors.vehicleModel && <span className="error-text">{errors.vehicleModel}</span>}
            </div>

            <div className="input-group">
              <label>Vehicle Year *</label>
              <input
                type="number"
                name="vehicleYear"
                placeholder="2020"
                min="1990"
                max={new Date().getFullYear() + 1}
                value={formData.vehicleYear}
                onChange={handleChange}
                className={errors.vehicleYear ? 'error' : ''}
              />
              {errors.vehicleYear && <span className="error-text">{errors.vehicleYear}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>License Plate *</label>
            <input
  type="text"
  name="vehiclePlate"
  placeholder="WB 06F 2028"
  value={formData.vehiclePlate}
  onChange={(e) => {
    let value = e.target.value.toUpperCase();

    // remove special characters
    value = value.replace(/[^A-Z0-9\s]/g, "");

    setFormData(prev => ({ ...prev, vehiclePlate: value }));

    if (errors.vehiclePlate) {
      setErrors(prev => ({ ...prev, vehiclePlate: '' }));
    }
  }}
/>
              {errors.vehiclePlate && <span className="error-text">{errors.vehiclePlate}</span>}
            </div>

            <div className="input-group">
              <label>Insurance Number *</label>
              <input
                type="text"
                name="insuranceNumber"
                placeholder="INS-123456"
                value={formData.insuranceNumber}
                onChange={handleChange}
                className={errors.insuranceNumber ? 'error' : ''}
              />
              {errors.insuranceNumber && <span className="error-text">{errors.insuranceNumber}</span>}
            </div>
          </div>

          <div className="form-section-title">Account Security</div>

          <div className="form-row">
            <div className="input-group">
              <label>Password *</label>
              <input
                type="password"
                name="password"
                placeholder="Min 8 characters"
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
            {isLoading ? 'Creating Account...' : 'Create Driver Account'}
          </button>

          <p className="signup-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterDriver;
