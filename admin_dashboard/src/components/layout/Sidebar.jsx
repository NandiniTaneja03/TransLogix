import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/Sidebar.css';

const Sidebar = ({ userRole = 'admin', onConnectAccount }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = {
    admin: [
      { path: '/admin', label: 'Dashboard', icon: '📊' },
      { path: '/admin/drivers', label: 'Drivers', icon: '🚗' },
      { path: '/admin/orders', label: 'Manage Orders', icon: '📦' },
      { path: '/admin/finance', label: 'Finance', icon: '💰' }
    ],
    driver: [
      { path: '/driver', label: 'Dashboard', icon: '📊' },
      { path: '/driver/orders', label: 'My Orders', icon: '📦' },
      { path: '/driver/wallet', label: 'Wallet', icon: '💰' }
    ],
    vendor: [
      { path: '/vendor', label: 'Dashboard', icon: '📊' },
      { path: '/vendor/create-order', label: 'Create Order', icon: '➕' },
      { path: '/vendor/reports', label: 'Reports', icon: '📈' }
    ]
  };

  const currentMenu = menuItems[userRole] || menuItems.admin;

  const handleConnectClick = () => {
    if (onConnectAccount) {
      onConnectAccount();
    } else {
      alert('Connect your payment account to receive earnings');
    }
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <Link to="/" className="logo">
          <div className="logo-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          {!isCollapsed && <span>TransLogix</span>}
        </Link>
        <button className="toggle-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      <button className="connect-btn" onClick={handleConnectClick}>
        <span className="btn-icon">+</span>
        {!isCollapsed && <span className="btn-text">Connect New Account</span>}
      </button>

      <nav className="sidebar-nav">
        {currentMenu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            {!isCollapsed && <span className="nav-label">{item.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="weather-widget">
          <span className="weather-icon">🌤️</span>
          {!isCollapsed && (
            <div className="weather-info">
              <span className="weather-temp">23°C</span>
              <span className="weather-desc">Sunny</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;