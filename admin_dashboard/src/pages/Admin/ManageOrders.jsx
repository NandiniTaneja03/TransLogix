import React from "react";
import Header from "../../components/layout/Header.jsx";
import Sidebar from "../../components/layout/Sidebar.jsx";
import "../../styles/Manageorders.css";

const ManageOrders = () => {
  const orders = [
    {
      id: "ORD-1001",
      vendor: "Fresh Mart",
      driver: "John Driver",
      status: "Delivered",
      amount: "$45",
    },
    {
      id: "ORD-1002",
      vendor: "City Restaurant",
      driver: "Mike Transport",
      status: "In Transit",
      amount: "$62",
    },
    {
      id: "ORD-1003",
      vendor: "Super Store",
      driver: "Sarah Delivery",
      status: "Pending",
      amount: "$28",
    },
  ];

  return (
    <div className="admin-layout">
      <Sidebar userRole="admin" />

      <div className="main-content">
        <Header />

        <div className="page-content">
          <div className="page-header">
            <h1>Manage Orders</h1>
          </div>

          <div className="orders-table">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Vendor</th>
                  <th>Driver</th>
                  <th>Status</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.vendor}</td>
                    <td>{order.driver}</td>
                    <td>
                      <span className={`status ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>{order.amount}</td>
                    <td>
                      <button className="btn-view">View</button>
                      <button className="btn-delete">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ManageOrders;