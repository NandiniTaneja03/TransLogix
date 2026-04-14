import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showRegisterDropdown, setShowRegisterDropdown] = useState(false);

  return (
    <nav className="public-navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <span>TransLogix</span>
        </Link>

        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/features">Features</Link></li>
          <li><Link to="/#pricing">Pricing</Link></li>
          <li><Link to="/#about">About</Link></li>
          <li><Link to="/#contact">Contact</Link></li>
          
          <li className="dropdown" 
              onMouseEnter={() => setShowRegisterDropdown(true)}
              onMouseLeave={() => setShowRegisterDropdown(false)}>
            <button className="dropdown-btn">
              Register
              <svg width="12" height="12" viewBox="0 0 12 12" className={showRegisterDropdown ? 'rotate' : ''}>
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </button>
            {showRegisterDropdown && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/register-driver">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M13.5 13.5C13.5 11.0147 11.0899 9 8 9C4.91015 9 2.5 11.0147 2.5 13.5" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                    Register as Driver
                  </Link>
                </li>
                <li>
                  <Link to="/register-vendor">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 6L8 2L14 6V13C14 13.5304 13.7893 14.0391 13.4142 14.4142C13.0391 14.7893 12.5304 15 12 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V6Z" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                    Register as Vendor
                  </Link>
                </li>
              </ul>
            )}
          </li>
          
          <li className="login-item">
            <Link to="/login" className="login-btn">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;