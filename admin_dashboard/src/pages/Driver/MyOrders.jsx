import React from 'react';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';

const MyOrders = () => (
  <div className="admin-layout">
    <Sidebar userRole="driver" />
    <div className="main-content">
      <Header />
      <div className="page-content">
        <h1>My Orders</h1>
        <p>Your delivery orders will appear here...</p>
      </div>
    </div>
  </div>
);

 const Wallet = () => (
  <div className="admin-layout">
    <Sidebar userRole="driver" />
    <div className="main-content">
      <Header />
      <div className="page-content">
        <h1>My Wallet</h1>
        <div className="wallet-balance">
          <h2>Available Balance</h2>
          <h1>$1,245.50</h1>
        </div>
      </div>
    </div>
  </div>
);
export default MyOrders;