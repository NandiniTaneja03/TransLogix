import React from 'react';
import Header from '../../components/layout/Header.jsx';
import Sidebar from '../../components/layout/Sidebar.jsx';

const Finance = () => (
  <div className="admin-layout">
    <Sidebar userRole="admin" />
    <div className="main-content">
      <Header />
      <div className="page-content">
        <h1>Finance Management</h1>
        <p>Finance dashboard content goes here...</p>
      </div>
    </div>
  </div>
);

export default Finance;