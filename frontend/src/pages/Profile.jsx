import React from "react";
import { useAuth } from '../pages/context/AuthContext';


import "../styles/Profile.css";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="profile-page">

      <h1 className="profile-title">My Profile 👤</h1>

      {/* PROFILE CARD */}
      <div className="profile-card">

        <div className="profile-header">
          <div className="avatar">
            {user?.name?.charAt(0) || "U"}
          </div>

          <div>
            <h2>{user?.name || "User"}</h2>
            <p>{user?.email}</p>
          </div>
        </div>

        <div className="profile-info">

          <div className="info-row">
            <span>Role</span>
            <span>{user?.role}</span>
          </div>

          <div className="info-row">
            <span>City</span>
            <span>{user?.city}</span>
          </div>

        </div>

        <button className="edit-btn">Edit Profile</button>

      </div>

      {/* STATS */}
      <div className="profile-stats">

        <div className="stat-box">
          <h3>12</h3>
          <p>Total Deliveries</p>
        </div>

        <div className="stat-box">
          <h3>₹2,450</h3>
          <p>Total Earnings</p>
        </div>

        <div className="stat-box">
          <h3>4.8 ⭐</h3>
          <p>Rating</p>
        </div>

      </div>

    </div>
  );
};

export default Profile;