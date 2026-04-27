import React from 'react';
import Header from '../../components/layout/Header.jsx';
import Sidebar from '../../components/layout/Sidebar.jsx';
import '../../styles/Drivers.css';

const Drivers = () => {
  const drivers = [
    { id: 1, name: 'John Driver', phone: '+1234567890', vehicle: 'Toyota Camry', status: 'active', orders: 45 },
    { id: 2, name: 'Mike Transport', phone: '+1234567891', vehicle: 'Honda Civic', status: 'active', orders: 38 },
    { id: 3, name: 'Sarah Delivery', phone: '+1234567892', vehicle: 'Ford Focus', status: 'offline', orders: 52 }
  ];

  return (
    <div className="admin-layout">
      <Sidebar userRole="admin" />
      <div className="main-content">
        <Header />
        <div className="page-content">
          <div className="page-header">
            <h1>Drivers Management</h1>
            <button className="primary-btn">+ Add Driver</button>
          </div>

          <div className="drivers-grid">
            {drivers.map(driver => (
              <div key={driver.id} className="driver-card">
                <div className="driver-avatar">{driver.name[0]}</div>
                <h3>{driver.name}</h3>
                <p className="driver-phone">{driver.phone}</p>
                <p className="driver-vehicle">{driver.vehicle}</p>
                <div className="driver-stats">
                  <span>Orders: {driver.orders}</span>
                  <span className={`status ${driver.status}`}>{driver.status}</span>
                </div>
                <div className="driver-actions">
                  <button className="btn-edit">Edit</button>
                  <button className="btn-delete">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drivers;