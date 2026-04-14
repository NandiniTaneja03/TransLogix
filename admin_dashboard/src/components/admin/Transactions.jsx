import React from 'react';
import '../../styles/Transactions.css';

const Transactions = () => {
  const transactions = [
    { id: '#TXN001', date: '2026-02-19', customer: 'Alice Brown', amount: '$1,450', type: 'credit' },
    { id: '#TXN002', date: '2026-02-19', customer: 'Bob Wilson', amount: '$890', type: 'credit' },
    { id: '#TXN003', date: '2026-02-18', customer: 'Carol Davis', amount: '$2,340', type: 'credit' },
    { id: '#TXN004', date: '2026-02-18', customer: 'David Miller', amount: '$675', type: 'debit' }
  ];

  return (
    <div className="transactions-container">
      <h3>Recent Transactions</h3>
      <div className="transactions-list">
        {transactions.map(transaction => (
          <div key={transaction.id} className="transaction-item">
            <div className="transaction-icon">
              {transaction.type === 'credit' ? '↓' : '↑'}
            </div>
            <div className="transaction-details">
              <div className="transaction-header">
                <span className="transaction-id">{transaction.id}</span>
                <span className={`transaction-amount ${transaction.type}`}>
                  {transaction.type === 'credit' ? '+' : '-'}{transaction.amount}
                </span>
              </div>
              <div className="transaction-meta">
                <span className="transaction-customer">{transaction.customer}</span>
                <span className="transaction-date">{transaction.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;