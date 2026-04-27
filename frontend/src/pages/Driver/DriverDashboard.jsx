import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import '../../styles/DriverDashboard.css';
import { FiPackage, FiDollarSign, FiTruck, FiStar } from "react-icons/fi";

const API_URL = "http://localhost:3000/api";

const DriverDashboard = () => {
  console.log("🔥 DRIVER DASHBOARD RENDERED");
  const { user } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const displayName =
    user?.displayName ||
    user?.fullName?.split(' ')[0] ||
    'Driver';

  // ✅ FETCH ORDERS (FIXED)
useEffect(() => {
  console.log("🔥 useEffect running");

  const fetchOrders = async () => {
    try {
      console.log("📡 calling API...");

      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("STATUS:", res.status);

      const data = await res.json();

      console.log("DATA:", data);

      setOrders(Array.isArray(data) ? data : []);

    } catch (error) {
      console.error("ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchOrders();
}, []);

 const handleStatusChange = async (id, status) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/order/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    const data = await res.json();
    alert(data.message);

    // update UI instantly
    setOrders(prev =>
      prev.map(o => o._id === id ? { ...o, status } : o)
    );

  } catch (error) {
    console.error(error);
  }
};

const completed = orders.filter(o => o.status === "Delivered").length;
const stats = [
  { title: 'Total Deliveries', value: completed, icon: <FiPackage />, color: '#6366f1' },
  { title: 'Earnings Today', value: '$245', icon: <FiDollarSign />, color: '#22c55e' },
  { title: 'Active Orders', value: orders.filter(o => o.status !== "Delivered").length, icon: <FiTruck />, color: '#f59e0b' },
  { title: 'Rating', value: '4.8', icon: <FiStar />, color: '#8b5cf6' }
];
  
return (
  <div className="admin-layout">
    <Sidebar userRole="driver" />

    <div className="main-content">
      <Header />

      <div className="dashboard-content">

        {/* HEADER */}
        <div className="dashboard-header">
          <h1>Hey, {displayName}!</h1>

          <p className="subtitle">
            You have {orders.filter(o => o.status !== "Delivered").length} active deliveries 🚚
          </p>
        </div>

        {/* STATS */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stats-card driver-stat">
              <div className="stat-icon">{stat.icon}</div>
              <div>
                <h3>{stat.title}</h3>
                <h2>{stat.value}</h2>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ RECENT ORDERS */}
        <div className="recent-orders">
          <h3>Recent Orders</h3>

          {orders.length === 0 ? (
            <p style={{ marginTop: "10px", opacity: 0.6 }}>No recent orders</p>
          ) : (
            orders.slice(0, 2).map(order => (
              <div key={order._id} className="recent-card">
                <p><b>ID:</b> {order._id.slice(-5)}</p>
                <p><b>{order.address}</b></p>
                <p>Status: {order.status}</p>
              </div>
            ))
          )}
        </div>

        {/* ✅ PROGRESS BAR FIXED */}
        <div className="progress">
          <p>Delivery Progress</p>

          <div className="bar">
            <div
              className="fill"
              style={{
                width: `${
                  orders.length === 0
                    ? 0
                    : (
                        orders.filter(o =>
                          o.status === "Picked" ||
                          o.status === "Reached" ||
                          o.status === "Delivered"
                        ).length / orders.length
                      ) * 100
                }%`
              }}
            />
          </div>
        </div>

        {/* ✅ BUTTON (ALIGNED) */}
        <div style={{ marginTop: "25px" }}>
          <button
            onClick={() => navigate("/driver/orders")}
            style={{
              padding: "10px 18px",
              background: "#6366f1",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "0.2s ease"
            }}
            onMouseOver={e => e.target.style.background = "#4f46e5"}
            onMouseOut={e => e.target.style.background = "#6366f1"}
          >
            View My Orders →
          </button>
        </div>

      </div>
    </div>
  </div>
);
};
export default DriverDashboard;