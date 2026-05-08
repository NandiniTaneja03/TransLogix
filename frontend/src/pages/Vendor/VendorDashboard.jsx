import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import '../../styles/VendorDashboard.css';

import {
  FiPackage,
  FiTruck,
  FiCheckCircle,
  FiDollarSign
} from "react-icons/fi";

const API_URL = "http://localhost:3000/api";

const VendorDashboard = () => {

  const { user } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const displayName = user?.email || 'Vendor';

  // 🔥 FETCH FROM BACKEND (MAIN FIX)
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API_URL}/orders`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();

        console.log("📦 VENDOR ORDERS:", data);

        setOrders(Array.isArray(data) ? data : []);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // 📊 STATS
  const stats = {
    totalOrders: orders.length,

    activeOrders: orders.filter(
      o => o.status !== 'Delivered'
    ).length,

    completedOrders: orders.filter(
      o => o.status === 'Delivered'
    ).length,

    revenue: 0
  };

  const statsCards = [
    { title: 'Total Orders', value: stats.totalOrders, icon: <FiPackage size={28} />, color: '#6366f1' },
    { title: 'Active Orders', value: stats.activeOrders, icon: <FiTruck size={28} />, color: '#f59e0b' },
    { title: 'Completed', value: stats.completedOrders, icon: <FiCheckCircle size={28} />, color: '#22c55e' },
    { title: 'Revenue', value: `$${stats.revenue}`, icon: <FiDollarSign size={28} />, color: '#8b5cf6' }
  ];

  return (
    <div className="admin-layout">
      <Sidebar userRole="vendor" />

      <div className="main-content">
        <Header />

        <div className="page-content">

          <div className="page-header">
            <h1>Hey, {displayName}!</h1>

            <button
              className="btn-create-order"
              onClick={() => navigate('/vendor/create-order')}
            >
              Create New Order
            </button>
          </div>

          {/* STATS */}
          <div className="stats-grid">
            {statsCards.map((stat, index) => (
              <div key={index} className="stats-card vendor-stat">
                {stat.icon}
                <h3>{stat.title}</h3>
                <h2>{stat.value}</h2>
              </div>
            ))}
          </div>

          {/* ORDERS */}
          <div className="recent-orders-section">
            <h2>Your Orders</h2>

            {loading ? (
              <p>Loading...</p>
            ) : orders.length === 0 ? (
              <p>No orders found ❌</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>ADDRESS</th>
                    <th>STATUS</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map(order => (
                    <tr key={order._id}>
                      <td>{order._id.slice(-6)}</td>
                      <td>{order.address}</td>
                      <td>{order.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;