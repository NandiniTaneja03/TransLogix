import React, { useState, useRef, useEffect } from 'react';
import { User, Settings, Clock, LogOut, HelpCircle, Bell } from 'lucide-react';

const UserDropdown = ({ userName, userEmail, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Get first letter of name
  const getInitials = (name) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="user-dropdown-container" ref={dropdownRef}>
      <div 
        className="user-avatar-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        {getInitials(userName)}
      </div>

      {isOpen && (
        <div className="dropdown-menu">
          {/* User Info Section */}
          <div className="dropdown-header">
            <div className="dropdown-avatar">
              {getInitials(userName)}
            </div>
            <div className="dropdown-user-info">
              <h4>{userName || 'User'}</h4>
              <p>{userEmail || 'user@example.com'}</p>
            </div>
          </div>

          <div className="dropdown-divider"></div>

          {/* Menu Items */}
          <div className="dropdown-section">
            <button className="dropdown-item">
              <User size={18} />
              <span>My Profile</span>
            </button>
            <button className="dropdown-item">
              <Settings size={18} />
              <span>Account Settings</span>
            </button>
            <button className="dropdown-item">
              <Bell size={18} />
              <span>Notifications</span>
              <span className="dropdown-badge">3</span>
            </button>
          </div>

          <div className="dropdown-divider"></div>

          <div className="dropdown-section">
            <button className="dropdown-item">
              <Clock size={18} />
              <span>Activity History</span>
            </button>
            <button className="dropdown-item">
              <HelpCircle size={18} />
              <span>Help & Support</span>
            </button>
          </div>

          <div className="dropdown-divider"></div>

          {/* Logout */}
          <div className="dropdown-section">
            <button 
              className="dropdown-item logout-item"
              onClick={() => {
                setIsOpen(false);
                if (onLogout) onLogout();
              }}
            >
              <LogOut size={18} />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;