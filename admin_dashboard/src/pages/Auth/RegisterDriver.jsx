import React from 'react';
import '../../styles/Login.css';

 const RegisterDriver = () => (
  <div className="auth-container">
    <div className="auth-box">
      <h1>Register as Driver</h1>
      <p className="subtitle">Join our delivery network</p>
      <form className="auth-form">
        <div className="input-group">
          <label>Full Name</label>
          <input type="text" placeholder="Enter your name" required />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" required />
        </div>
        <div className="input-group">
          <label>Phone</label>
          <input type="tel" placeholder="Enter your phone" required />
        </div>
        <div className="input-group">
          <label>Vehicle Type</label>
          <input type="text" placeholder="e.g. Sedan, SUV" required />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" placeholder="Create password" required />
        </div>
        <button type="submit" className="submit-btn">Register</button>
        <p className="signup-text">Already have an account? <a href="/login">Login</a></p>
      </form>
    </div>
  </div>
);

const RegisterVendor = () => (
  <div className="auth-container">
    <div className="auth-box">
      <h1>Register as Vendor</h1>
      <p className="subtitle">Start your business with us</p>
      <form className="auth-form">
        <div className="input-group">
          <label>Business Name</label>
          <input type="text" placeholder="Enter business name" required />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" required />
        </div>
        <div className="input-group">
          <label>Phone</label>
          <input type="tel" placeholder="Enter your phone" required />
        </div>
        <div className="input-group">
          <label>Business Address</label>
          <input type="text" placeholder="Enter address" required />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" placeholder="Create password" required />
        </div>
        <button type="submit" className="submit-btn">Register</button>
        <p className="signup-text">Already have an account? <a href="/login">Login</a></p>
      </form>
    </div>
  </div>
);
export default RegisterDriver;