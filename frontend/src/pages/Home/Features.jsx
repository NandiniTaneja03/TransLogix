import React from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import '../../styles/Features.css';

const Features = () => {
  return (
    <div style={{padding:"60px", background:"#0f111a", minHeight:"100vh", color:"#fff"}}>

      <h1 style={{textAlign:"center", fontSize:"42px", marginBottom:"20px"}}>
        Platform Features
      </h1>

      <p style={{textAlign:"center", color:"#a0a0a0", marginBottom:"50px"}}>
        Powerful tools to manage deliveries efficiently
      </p>

      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
        gap:"30px"
      }}>

        <div style={card}>
          <h3>📦 Order Management</h3>
          <p>Create and manage delivery orders easily with real-time status updates.</p>
        </div>

        <div style={card}>
          <h3>🚚 Driver Assignment</h3>
          <p>Drivers can view available deliveries and accept orders instantly.</p>
        </div>

        <div style={card}>
          <h3>📊 Analytics Dashboard</h3>
          <p>Vendors can monitor orders, deliveries, and performance metrics.</p>
        </div>

        <div style={card}>
          <h3>💰 Wallet System</h3>
          <p>Drivers can track earnings, payments, and transaction history.</p>
        </div>

        <div style={card}>
          <h3>🔎 Smart Search</h3>
          <p>Search orders, customers, or reports instantly with global search.</p>
        </div>

        <div style={card}>
          <h3>🔔 Notifications</h3>
          <p>Stay updated with delivery alerts and system notifications.</p>
        </div>

      </div>
    </div>
  );
};

const card = {
  background:"#1a1d29",
  padding:"25px",
  borderRadius:"12px",
  border:"1px solid #2d3142",
  lineHeight:"1.6",
  boxShadow:"0 8px 20px rgba(0,0,0,0.4)"
};

export default Features;