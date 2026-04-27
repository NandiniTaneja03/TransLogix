import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showRegisterDropdown, setShowRegisterDropdown] = useState(false);

  return (
    <nav className="public-navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M3 9L12 2L21 9V20C21 21.1 20.1 22 19 22H5C3.9 22 3 21.1 3 20V9Z"
                stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <span>TransLogix</span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Menu */}
        <ul className={`navbar-menu ${isOpen ? "active" : ""}`}>

          <li>
            <Link to="/">Home</Link>
          </li>

          {/* Register Dropdown */}
          <li className="dropdown">

            <button
              className="dropdown-btn"
              onClick={() =>
                setShowRegisterDropdown(!showRegisterDropdown)
              }
            >
              Register
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                className={showRegisterDropdown ? "rotate" : ""}
              >
                <path
                  d="M3 4.5L6 7.5L9 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </button>

            {showRegisterDropdown && (
              <ul className="dropdown-menu">

                <li>
                  <Link
                    to="/register-driver"
                    onClick={() => {
                      setShowRegisterDropdown(false);
                      setIsOpen(false);
                    }}
                  >
                    Register as Driver
                  </Link>
                </li>

                <li>
                  <Link
                    to="/register-vendor"
                    onClick={() => {
                      setShowRegisterDropdown(false);
                      setIsOpen(false);
                    }}
                  >
                    Register as Vendor
                  </Link>
                </li>

              </ul>
            )}

          </li>

          <li className="login-item">
            <Link to="/login" className="login-btn">
              Login
            </Link>
          </li>

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;