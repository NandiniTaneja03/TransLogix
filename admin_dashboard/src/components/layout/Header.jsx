import React, { useState } from 'react';
import { useAuth } from '../../pages/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../styles/Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="search-box">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 19L14.65 14.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input type="text" placeholder="Type to search" />
        </div>
      </div>

      <div className="header-right">
        <button className="icon-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="badge">2</span>
        </button>

        <button className="icon-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="user-menu">
          <button 
            className="user-avatar" 
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <span className="avatar-text">U</span>
          </button>

          {showDropdown && (
            <div className="user-dropdown">
              <div className="dropdown-header">
                <div className="avatar-large">U</div>
                <div>
                  <h4>User</h4>
                  <p>user@example.com</p>
                </div>
              </div>
              <div className="dropdown-divider"></div>
              <a href="#profile" className="dropdown-item">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M15 15.75V14.25C15 13.4544 14.6839 12.6913 14.1213 12.1287C13.5587 11.5661 12.7956 11.25 12 11.25H6C5.20435 11.25 4.44129 11.5661 3.87868 12.1287C3.31607 12.6913 3 13.4544 3 14.25V15.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 8.25C10.6569 8.25 12 6.90685 12 5.25C12 3.59315 10.6569 2.25 9 2.25C7.34315 2.25 6 3.59315 6 5.25C6 6.90685 7.34315 8.25 9 8.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                My Profile
              </a>
              <a href="#settings" className="dropdown-item">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14.55 11.25C14.4613 11.4466 14.4311 11.6644 14.4631 11.8772C14.4951 12.0901 14.5878 12.2888 14.73 12.45L14.7825 12.5025C14.8947 12.6146 14.9835 12.7477 15.0439 12.8941C15.1043 13.0405 15.135 13.1975 15.135 13.3562C15.135 13.515 15.1043 13.672 15.0439 13.8184C14.9835 13.9648 14.8947 14.0979 14.7825 14.21C14.6704 14.3222 14.5373 14.411 14.3909 14.4714C14.2445 14.5318 14.0875 14.5625 13.9287 14.5625C13.77 14.5625 13.613 14.5318 13.4666 14.4714C13.3202 14.411 13.1871 14.3222 13.075 14.21L13.0225 14.1575C12.8613 14.0153 12.6626 13.9226 12.4497 13.8906C12.2369 13.8586 12.0191 13.8888 11.8225 13.9775C11.6296 14.0625 11.4644 14.2009 11.3459 14.3764C11.2274 14.5518 11.1604 14.7571 11.1525 14.9687V15.1875C11.1525 15.5062 11.026 15.8118 10.8003 16.0375C10.5747 16.2632 10.2691 16.3897 9.95025 16.3897C9.6314 16.3897 9.32578 16.2632 9.10015 16.0375C8.87451 15.8118 8.74801 15.5062 8.74801 15.1875V15.12C8.73535 14.9007 8.65983 14.6897 8.53038 14.5122C8.40093 14.3347 8.22307 14.1979 8.01751 14.1187C7.82096 14.03 7.60316 13.9998 7.39029 14.0318C7.17743 14.0638 6.97874 14.1566 6.81751 14.2987L6.76501 14.3512C6.65289 14.4635 6.5198 14.5522 6.37339 14.6126C6.22698 14.673 6.06999 14.7037 5.91126 14.7037C5.75253 14.7037 5.59554 14.673 5.44913 14.6126C5.30272 14.5522 5.16963 14.4635 5.05751 14.3512C4.94528 14.2391 4.85649 14.106 4.79609 13.9596C4.7357 13.8132 4.70498 13.6562 4.70498 13.4975C4.70498 13.3388 4.7357 13.1818 4.79609 13.0354C4.85649 12.889 4.94528 12.7559 5.05751 12.6437L5.11001 12.5912C5.25216 12.43 5.34489 12.2313 5.37689 12.0185C5.40889 11.8056 5.37878 11.5878 5.29001 11.3912C5.205 11.1984 5.06659 11.0332 4.89113 10.9146C4.71568 10.7961 4.51038 10.7291 4.29876 10.7212H4.08001C3.76116 10.7212 3.45554 10.5948 3.2299 10.3691C3.00427 10.1435 2.87776 9.83787 2.87776 9.51902C2.87776 9.20017 3.00427 8.89455 3.2299 8.66891C3.45554 8.44328 3.76116 8.31677 4.08001 8.31677H4.14751C4.36685 8.30411 4.5778 8.22859 4.75531 8.09914C4.93282 7.96969 5.06955 7.79183 5.14876 7.58627C5.23753 7.38972 5.26764 7.17192 5.23564 6.95905C5.20364 6.74619 5.11091 6.5475 4.96876 6.38627L4.91626 6.33377C4.80403 6.22165 4.71524 6.08856 4.65485 5.94215C4.59445 5.79574 4.56373 5.63875 4.56373 5.48002C4.56373 5.32129 4.59445 5.1643 4.65485 5.01789C4.71524 4.87148 4.80403 4.73839 4.91626 4.62627C5.02838 4.51404 5.16147 4.42525 5.30788 4.36486C5.45429 4.30446 5.61128 4.27374 5.77001 4.27374C5.92874 4.27374 6.08573 4.30446 6.23214 4.36486C6.37855 4.42525 6.51164 4.51404 6.62376 4.62627L6.67626 4.67877C6.83749 4.82092 7.03618 4.91365 7.24904 4.94565C7.46191 4.97765 7.67971 4.94754 7.87626 4.85877H7.95001C8.14285 4.77376 8.30808 4.63535 8.42661 4.45989C8.54514 4.28444 8.61211 4.07914 8.62001 3.86752V3.64877C8.62001 3.32992 8.74651 3.0243 8.97215 2.79866C9.19778 2.57303 9.5034 2.44652 9.82226 2.44652C10.1411 2.44652 10.4467 2.57303 10.6724 2.79866C10.898 3.0243 11.0245 3.32992 11.0245 3.64877V3.71627C11.0324 3.92789 11.0994 4.13319 11.2179 4.30864C11.3365 4.4841 11.5017 4.62251 11.6945 4.70752C11.8911 4.79629 12.1089 4.8264 12.3217 4.7944C12.5346 4.7624 12.7333 4.66967 12.8945 4.52752L12.947 4.47502C13.0592 4.36279 13.1923 4.274 13.3387 4.2136C13.4851 4.15321 13.6421 4.12249 13.8008 4.12249C13.9595 4.12249 14.1165 4.15321 14.2629 4.2136C14.4093 4.274 14.5424 4.36279 14.6545 4.47502C14.7668 4.58714 14.8555 4.72023 14.9159 4.86664C14.9763 5.01305 15.0071 5.17004 15.0071 5.32877C15.0071 5.4875 14.9763 5.64449 14.9159 5.7909C14.8555 5.93731 14.7668 6.0704 14.6545 6.18252L14.602 6.23502C14.4599 6.39625 14.3671 6.59494 14.3351 6.8078C14.3031 7.02067 14.3333 7.23847 14.422 7.43502V7.50877C14.507 7.70161 14.6454 7.86684 14.8209 7.98537C14.9963 8.1039 15.2016 8.17087 15.4133 8.17877H15.632C15.9509 8.17877 16.2565 8.30527 16.4821 8.53091C16.7078 8.75654 16.8343 9.06216 16.8343 9.38102C16.8343 9.69987 16.7078 10.0055 16.4821 10.2311C16.2565 10.4568 15.9509 10.5833 15.632 10.5833H15.5645C15.3529 10.5912 15.1476 10.6581 14.9721 10.7767C14.7967 10.8952 14.6583 11.0604 14.5733 11.2533V11.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Account Settings
              </a>
              <a href="#notifications" className="dropdown-item">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M13.5 6C13.5 4.80653 13.0259 3.66193 12.182 2.81802C11.3381 1.97411 10.1935 1.5 9 1.5C7.80653 1.5 6.66193 1.97411 5.81802 2.81802C4.97411 3.66193 4.5 4.80653 4.5 6C4.5 11.25 2.25 12.75 2.25 12.75H15.75C15.75 12.75 13.5 11.25 13.5 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10.2975 15.75C10.1779 15.9773 9.99803 16.1676 9.77862 16.3021C9.55921 16.4367 9.30761 16.5098 9.05 16.5098C8.79239 16.5098 8.54079 16.4367 8.32138 16.3021C8.10197 16.1676 7.92211 15.9773 7.8025 15.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Notifications
                <span className="notification-badge">3</span>
              </a>
              <a href="#activity" className="dropdown-item">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M16.5 9H13.5L11.25 15L6.75 3L4.5 9H1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Activity History
              </a>
              <a href="#help" className="dropdown-item">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6.81763 6.75C6.98824 6.23 7.32958 5.78364 7.78572 5.48C8.24186 5.17636 8.78598 5.03474 9.33052 5.07738C9.87506 5.12002 10.3906 5.34444 10.7945 5.71359C11.1984 6.08274 11.4677 6.57577 11.5601 7.11375C11.6526 7.65173 11.5631 8.20523 11.3053 8.68654C11.0474 9.16786 10.6354 9.5492 10.1376 9.7725C9.58513 10.02 9.00013 10.5 9.00013 11.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 13.5H9.0075" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Help & Support
              </a>
              <div className="dropdown-divider"></div>
              <button onClick={handleLogout} className="dropdown-item logout-btn">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M6.75 15.75H3.75C3.35218 15.75 2.97064 15.592 2.68934 15.3107C2.40804 15.0294 2.25 14.6478 2.25 14.25V3.75C2.25 3.35218 2.40804 2.97064 2.68934 2.68934C2.97064 2.40804 3.35218 2.25 3.75 2.25H6.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 12.75L15.75 9L12 5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15.75 9H6.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;