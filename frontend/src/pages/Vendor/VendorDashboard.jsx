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

const VendorDashboard = () => {

  const { user } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [drafts, setDrafts] = useState([]);

  const displayName = user?.displayName || user?.businessName || 'Vendor';

  /*
  LOAD ORDERS + DRAFTS
  Only show data belonging to the logged-in vendor
  */

  useEffect(() => {

    if (!user) return;

    const savedOrders =
      JSON.parse(localStorage.getItem('vendor_orders')) || [];

    const savedDrafts =
      JSON.parse(localStorage.getItem('vendor_drafts')) || [];

    const myOrders = savedOrders.filter(
      order => order.vendorId === user.id
    );

    const myDrafts = savedDrafts.filter(
      draft => draft.vendorId === user.id
    );

    setOrders(myOrders);
    setDrafts(myDrafts);

  }, [user]);


  /*
  DASHBOARD STATS
  */

  const stats = {
    totalOrders: orders.length,

    activeOrders: orders.filter(
      o => o.status === 'pending' || o.status === 'in-transit'
    ).length,

    completedOrders: orders.filter(
      o => o.status === 'delivered'
    ).length,

    revenue: orders
      .filter(o => o.status === 'delivered')
      .reduce((sum, o) => sum + parseFloat(o.total ?? 0), 0)
      .toFixed(2)
  };


  const statsCards = [
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: <FiPackage size={28} />,
      color: '#6366f1'
    },
    {
      title: 'Active Orders',
      value: stats.activeOrders,
      icon: <FiTruck size={28} />,
      color: '#f59e0b'
    },
    {
      title: 'Completed',
      value: stats.completedOrders,
      icon: <FiCheckCircle size={28} />,
      color: '#22c55e'
    },
    {
      title: 'Revenue',
      value: `$${stats.revenue}`,
      icon: <FiDollarSign size={28} />,
      color: '#8b5cf6'
    }
  ];


  /*
  LAST 5 ORDERS
  */

  const recentOrders = [...orders].slice(-5).reverse();


  const handleViewOrder = (orderId) => {
    navigate(`/vendor/orders`);
  };

  const handleEditDraft = (draftId) => {
    navigate(`/vendor/create-order?draft=${draftId}`);
  };


  return (

    <div className="admin-layout">

      <Sidebar userRole="vendor" />

      <div className="main-content">

        <Header />

        <div className="page-content">

          {/* HEADER */}

          <div className="page-header">
            <div>
              <h1>Hey, {displayName}!</h1>
              <p className="page-subtitle">
                Here's your business overview for today
              </p>
            </div>

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

              <div
                key={index}
                className="stats-card vendor-stat"
                style={{ borderLeft: `4px solid ${stat.color}` }}
              >

                <div
                  className="stat-icon"
                  style={{ background: `${stat.color}20` }}
                >
                  {stat.icon}
                </div>

                <div className="stat-info">
                  <h3>{stat.title}</h3>
                  <h2>{stat.value}</h2>
                </div>

              </div>

            ))}

          </div>


          {/* DRAFTS */}

          {drafts.length > 0 && (

            <div className="drafts-section">

              <div className="section-header">
                <h2>Draft Orders</h2>
                <span className="draft-count">
                  {drafts.length} drafts
                </span>
              </div>

              <div className="drafts-grid">

                {drafts.map(draft => (

                  <div key={draft.id} className="draft-card">

                    <div className="draft-header">
                      <h4>{draft.id}</h4>
                      <span className="draft-badge">Draft</span>
                    </div>

                    <div className="draft-info">
                      <p>Customer: {draft.customerName}</p>
                      <p>Delivery: {draft.deliveryAddress}</p>

                      <p className="draft-date">
                        Saved: {new Date(draft.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <div className="draft-actions">

                      <button
                        className="btn-edit-draft"
                        onClick={() => handleEditDraft(draft.id)}
                      >
                        Edit & Complete
                      </button>

                      <button
                        className="btn-delete-draft"
                        onClick={() => {

                          const updated =
                            drafts.filter(d => d.id !== draft.id);

                          localStorage.setItem(
                            'vendor_drafts',
                            JSON.stringify(updated)
                          );

                          setDrafts(updated);
                        }}
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          )}


          {/* RECENT ORDERS */}

          <div className="recent-orders-section">

            <div className="section-header">
              <h2>Recent Orders</h2>

              <button
                className="btn-view-all"
                onClick={() => navigate('/vendor/orders')}
              >
                View All Orders →
              </button>
            </div>


            {recentOrders.length > 0 ? (

              <div className="orders-table-wrapper">

                <table className="orders-table">

                  <thead>
                    <tr>
                      <th>ORDER ID</th>
                      <th>CUSTOMER</th>
                      <th>DELIVERY</th>
                      <th>STATUS</th>
                      <th>AMOUNT</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>

                  <tbody>

                    {recentOrders.map(order => (

                      <tr key={order.id}>

                        <td className="order-id">{order.id}</td>

                        <td>{order.customerName}</td>

                        <td>{order.delivery}</td>

                        <td>

                          <span className={`status-badge status-${order.status}`}>

                            {order.status === 'in-transit'
                              ? 'In Transit'
                              : order.status === 'delivered'
                              ? 'Delivered'
                              : order.status.charAt(0).toUpperCase() + order.status.slice(1)}

                          </span>

                        </td>

                        <td className="amount">
                          ${order.total}
                        </td>

                        <td>

                          <button
                            className="btn-action"
                            onClick={() => handleViewOrder(order.id)}
                          >
                            View
                          </button>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            ) : (

              <div className="no-orders-state">

                <span className="no-orders-icon">📦</span>

                <h3>No orders yet</h3>

                <p>Create your first order to get started</p>

                <button
                  className="btn-create"
                  onClick={() => navigate('/vendor/create-order')}
                >
                  Create Order
                </button>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>

  );
};

export default VendorDashboard;