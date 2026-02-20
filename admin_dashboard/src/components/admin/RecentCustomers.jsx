import React from 'react';
import '../../styles/RecentCustomers.css';

const RecentCustomers = () => {
  const customers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', amount: '$1,234', status: 'completed' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', amount: '$856', status: 'pending' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', amount: '$2,145', status: 'completed' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', amount: '$945', status: 'cancelled' }
  ];

  const getStatusClass = (status) => {
    switch(status) {
      case 'completed': return 'status-completed';
      case 'pending': return 'status-pending';
      case 'cancelled': return 'status-cancelled';
      default: return '';
    }
  };

  return (
    <div className="recent-customers-container">
      <h3>Recent Customers</h3>
      <div className="customers-table">
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id}>
                <td>
                  <div className="customer-cell">
                    <div className="customer-avatar">{customer.name[0]}</div>
                    <span>{customer.name}</span>
                  </div>
                </td>
                <td>{customer.email}</td>
                <td className="amount">{customer.amount}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(customer.status)}`}>
                    {customer.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentCustomers;