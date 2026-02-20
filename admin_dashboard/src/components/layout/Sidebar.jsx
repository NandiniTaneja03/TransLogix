import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/Sidebar.css';

const Sidebar = ({ userRole = 'admin' }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const adminMenuItems = [
    { icon: '📊', label: 'Dashboard', path: '/admin', section: 'main' },
    { section: 'analytics', label: 'ANALYTICS' },
    { icon: '📈', label: 'Performance', path: '/admin/performance' },
    { icon: '🎯', label: 'Hotjar', path: '/admin/hotjar', badge: 'NEW' },
    { section: 'support', label: 'SUPPORT' },
    { icon: '🎫', label: 'Tickets', path: '/admin/tickets', badge: '13' },
    { icon: '👥', label: 'Agents', path: '/admin/agents' },
    { icon: '👤', label: 'Customers', path: '/admin/customers' },
    { section: 'shop', label: 'SHOP' },
    { icon: '📦', label: 'Products', path: '/admin/products' },
    { icon: '🛒', label: 'Orders', path: '/admin/orders' },
    { icon: '📄', label: 'Reports', path: '/admin/reports' }
  ];

  const driverMenuItems = [
    { icon: '📊', label: 'Dashboard', path: '/driver', section: 'main' },
    { icon: '📦', label: 'My Orders', path: '/driver/orders' },
    { icon: '💰', label: 'Wallet', path: '/driver/wallet' }
  ];

  const vendorMenuItems = [
    { icon: '📊', label: 'Dashboard', path: '/vendor', section: 'main' },
    { icon: '➕', label: 'Create Order', path: '/vendor/create-order' },
    { icon: '📊', label: 'Reports', path: '/vendor/reports' }
  ];

  const getMenuItems = () => {
    switch (userRole) {
      case 'driver': return driverMenuItems;
      case 'vendor': return vendorMenuItems;
      default: return adminMenuItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          {!collapsed && <span className="logo-text">TransLogix</span>}
        </div>
      </div>

      <button className="connect-btn">
        <span>+</span>
        {!collapsed && <span>Connect New Account</span>}
      </button>

      <nav className="sidebar-nav">
        {menuItems.map((item, index) => {
          if (item.section && !item.path) {
            return (
              <div key={index} className="nav-section-label">
                {!collapsed && item.label}
              </div>
            );
          }

          const isActive = location.pathname === item.path;

          return (
            <Link
              key={index}
              to={item.path}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {!collapsed && (
                <>
                  <span className="nav-label">{item.label}</span>
                  {item.badge && (
                    <span className={`nav-badge ${item.badge === 'NEW' ? 'new' : ''}`}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="weather-widget">
          <span className="weather-icon">☀️</span>
          {!collapsed && (
            <div className="weather-info">
              <span className="temperature">23°C</span>
              <span className="condition">Sunny</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;