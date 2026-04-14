import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../pages/context/AuthContext';
import '../../styles/Header.css';


const Header = () => {

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New order received", time: "2 min ago" },
    { id: 2, text: "Driver accepted order", time: "10 min ago" },
    { id: 3, text: "Order delivered", time: "1 hr ago" }
  ]);

  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {

      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }

      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }

      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }

    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);

  }, []);
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (query.trim().length < 2) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const results = [];
    const lowerQuery = query.toLowerCase();

    // Search in orders
    if (user.role === 'vendor') {
      const vendorOrders = JSON.parse(localStorage.getItem('vendor_orders') || '[]');
      const matchingOrders = vendorOrders.filter(order => 
        order.id.toLowerCase().includes(lowerQuery) ||
        order.customerName.toLowerCase().includes(lowerQuery) ||
        order.delivery.toLowerCase().includes(lowerQuery) ||
        order.status.toLowerCase().includes(lowerQuery)
      );

      matchingOrders.slice(0, 5).forEach(order => {
        results.push({
          type: 'order',
          id: order.id,
          title: order.id,
          subtitle: `${order.customerName} - ${order.status}`,
          route: `/vendor/orders/${order.id}`
        });
      });

      // Search in drafts
      const drafts = JSON.parse(localStorage.getItem('vendor_drafts') || '[]');
      const matchingDrafts = drafts.filter(draft => 
        draft.id.toLowerCase().includes(lowerQuery) ||
        draft.customerName.toLowerCase().includes(lowerQuery)
      );

      matchingDrafts.slice(0, 3).forEach(draft => {
        results.push({
          type: 'draft',
          id: draft.id,
          title: draft.id,
          subtitle: `Draft - ${draft.customerName}`,
          route: `/vendor/create-order?draft=${draft.id}`
        });
      });

      // Search in reports
      const reports = JSON.parse(localStorage.getItem('vendor_reports') || '[]');
      const matchingReports = reports.filter(report => 
        report.orderId.toLowerCase().includes(lowerQuery) ||
        report.customerName.toLowerCase().includes(lowerQuery)
      );

      matchingReports.slice(0, 3).forEach(report => {
        results.push({
          type: 'report',
          id: report.orderId,
          title: `Report - ${report.orderId}`,
          subtitle: `${report.customerName} - Delivered`,
          route: '/vendor/reports'
        });
      });
    }

    if (user.role === 'driver') {
      // Search in available orders
      const vendorOrders = JSON.parse(localStorage.getItem('vendor_orders') || '[]');
      const available = vendorOrders.filter(o => o.status === 'pending');
      const matchingAvailable = available.filter(order => 
        (order.id || "").toLowerCase().includes(lowerQuery) ||
        (order.customerName || "").toLowerCase().includes(lowerQuery) ||
        (order.delivery || "").toLowerCase().includes(lowerQuery)
      );

      matchingAvailable.slice(0, 3).forEach(order => {
        results.push({
          type: 'available',
          id: order.id,
          title: order.id,
          subtitle: `Available - ${order.customerName}`,
          route: '/driver/orders'
        });
      });

      // Search in accepted orders
      const accepted = JSON.parse(localStorage.getItem('driver_accepted_orders') || '[]');
      const matchingAccepted = accepted.filter(order => 
        (order.id || "").toLowerCase().includes(lowerQuery) ||
        (order.customerName || "").toLowerCase().includes(lowerQuery)
      );

      matchingAccepted.slice(0, 3).forEach(order => {
        results.push({
          type: 'active',
          id: order.id,
          title: order.id,
          subtitle: `Active - ${order.customerName}`,
          route: '/driver/orders'
        });
      });

      // Search in completed orders
      const completed = JSON.parse(localStorage.getItem('driver_completed_orders') || '[]');
      const matchingCompleted = completed.filter(order => 
        (order.id || "").toLowerCase().includes(lowerQuery) ||
        (order.customerName || "").toLowerCase().includes(lowerQuery)
      );

      matchingCompleted.slice(0, 3).forEach(order => {
        results.push({
          type: 'completed',
          id: order.id,
          title: order.id,
          subtitle: `Completed - ${order.customerName}`,
          route: '/driver/orders'
        });
      });

      // Search in transactions
      const wallet = JSON.parse(localStorage.getItem('driver_wallet') || '{"transactions": []}');
      const matchingTransactions = wallet.transactions.filter(txn => 
        (txn.orderId || "").toLowerCase().includes(lowerQuery) ||
        (txn.customer || "").toLowerCase().includes(lowerQuery)
      );

      matchingTransactions.slice(0, 2).forEach(txn => {
        results.push({
          type: 'transaction',
          id: txn.id,
          title: txn.orderId,
          subtitle: `Transaction - $${txn.total}`,
          route: '/driver/wallet'
        });
      });
    }

    // Add quick navigation items based on query
    const quickActions = [
      { keywords: ['create', 'new', 'order'], route: user.role === 'vendor' ? '/vendor/create-order' : null, title: 'Create New Order', icon: '➕' },
      { keywords: ['orders', 'all'], route: user.role === 'vendor' ? '/vendor/orders' : '/driver/orders', title: 'All Orders', icon: '📦' },
      { keywords: ['report', 'analytics', 'stats'], route: '/vendor/reports', title: 'Reports & Analytics', icon: '📊' },
      { keywords: ['wallet', 'earnings', 'balance'], route: '/driver/wallet', title: 'My Wallet', icon: '💰' },
      { keywords: ['dashboard', 'home'], route: user.role === 'vendor' ? '/vendor' : '/driver', title: 'Dashboard', icon: '🏠' },
    ];

    quickActions.forEach(action => {
      if (action.route && action.keywords.some(keyword => keyword.includes(lowerQuery))) {
        results.push({
          type: 'action',
          title: action.title,
          subtitle: 'Quick Action',
          route: action.route,
          icon: action.icon
        });
      }
    });

    setSearchResults(results);
    setShowSearchResults(results.length > 0);
  };

  const handleSearchResultClick = (route) => {
    navigate(route);
    setSearchQuery('');
    setSearchResults([]);
    setShowSearchResults(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      handleSearchResultClick(searchResults[0].route);
    }
  };

  const getResultIcon = (type) => {
    switch(type) {
      case 'order': return '📦';
      case 'draft': return '📝';
      case 'report': return '📊';
      case 'available': return '🆕';
      case 'active': return '🚚';
      case 'completed': return '✓';
      case 'transaction': return '💰';
      case 'action': return searchResults.find(r => r.type === 'action')?.icon || '⚡';
      default: return '🔍';
    }
  };
  return (
  <div className="header">

    {/* LEFT SPACE (for sidebar spacing) */}
    <div className="header-left"></div>

    {/* SEARCH */}
    <div className="search-bar" ref={searchRef}>
      <form onSubmit={handleSearchSubmit}>
        <span className="search-icon">🔍</span>

        <input
          type="text"
          placeholder="Search orders, customers, or navigate..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => searchQuery.length >= 2 && setShowSearchResults(true)}
        />

        {searchQuery && (
          <button
            type="button"
            className="clear-search"
            onClick={() => {
              setSearchQuery('');
              setSearchResults([]);
              setShowSearchResults(false);
            }}
          >
            ✕
          </button>
        )}
      </form>

      {/* SEARCH RESULTS */}
      {showSearchResults && searchResults.length > 0 && (
        <div className="search-results-dropdown">
          <div className="search-results-header">
            <span>Search Results</span>
            <span className="results-count">{searchResults.length} found</span>
          </div>

          <div className="search-results-list">
            {searchResults.map((result, index) => (
              <div
                key={index}
                className="search-result-item"
                onClick={() => handleSearchResultClick(result.route)}
              >
                <span className="result-icon">
                  {result.icon || getResultIcon(result.type)}
                </span>

                <div className="result-content">
                  <div className="result-title">{result.title}</div>
                  <div className="result-subtitle">{result.subtitle}</div>
                </div>

                <span className="result-arrow">→</span>
              </div>
            ))}
          </div>

          <div className="search-results-footer">
            Press Enter to open first result
          </div>
        </div>
      )}
    </div>

    {/* RIGHT ACTIONS */}
    <div className="header-right">

   <div className="notification-wrapper" ref={notificationRef}>

  <button
    className="icon-btn notification-btn"
    onClick={() => setShowNotifications(!showNotifications)}
  >
    🔔
    {notifications.length > 0 && (
      <span className="badge">{notifications.length}</span>
    )}
  </button>

  {showNotifications && (
    <div className="notification-dropdown">

      <div className="notification-header">
        Notifications
      </div>

      <div className="notification-list">

        {notifications.map((note) => (
          <div key={note.id} className="notification-item">
            <div>{note.text}</div>
            <span className="notification-time">{note.time}</span>
          </div>
        ))}

      </div>

    </div>
  )}

</div>
     
      <div className="user-menu" ref={dropdownRef}>
        <div
          className="user-avatar"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <span className="avatar-text">
            {user?.initials || 'U'}
          </span>
        </div>

        {showDropdown && (
          <div className="user-dropdown">

            <div className="dropdown-header">
              <div className="avatar-large">
                {user?.initials || 'U'}
              </div>

              <div>
                <h4>
                  {user?.displayName ||
                   user?.fullName ||
                   user?.businessName ||
                   'User'}
                </h4>
                <p>{user?.email}</p>
              </div>
            </div>

            <div className="dropdown-divider"></div>

            <button
              className="dropdown-item"
              onClick={() => {
                navigate(`/${user?.role}/profile`);
                setShowDropdown(false);
              }}
            >
              👤 My Profile
            </button>

            <button
              className="dropdown-item"
              onClick={() => {
                navigate(`/${user?.role}/settings`);
                setShowDropdown(false);
              }}
            >
              ⚙️ Settings
            </button>

            <button
              className="dropdown-item"
              onClick={() => {
                navigate(`/${user?.role}/notifications`);
                setShowDropdown(false);
              }}
            >
              🔔 Notifications
              <span className="notification-badge">3</span>
            </button>

            <div className="dropdown-divider"></div>

            <button
              className="dropdown-item logout-btn"
              onClick={handleLogout}
            >
              🚪 Logout
            </button>

          </div>
        )}
      </div>

    </div>

  </div>
);
};

export default Header;