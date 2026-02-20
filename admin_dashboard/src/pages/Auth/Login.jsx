import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../../styles/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [role, setRole] = useState('admin');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ ...formData, role });
    
    // Navigate based on role
    switch(role) {
      case 'admin': navigate('/admin'); break;
      case 'driver': navigate('/driver'); break;
      case 'vendor': navigate('/vendor'); break;
      default: navigate('/');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="logo-section">
          <div className="logo-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <h2>TransLogix</h2>
        </div>

        <h1>Welcome Back</h1>
        <p className="subtitle">Please login to your account</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label>Login As</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="role-select">
              <option value="admin">Admin</option>
              <option value="driver">Driver</option>
              <option value="vendor">Vendor</option>
            </select>
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#forgot" className="link">Forgot Password?</a>
          </div>

          <button type="submit" className="submit-btn">Login</button>

          <p className="signup-text">
            Don't have an account? <a href="/register-driver">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;