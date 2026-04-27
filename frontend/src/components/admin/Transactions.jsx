import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Transactions.css';

const Transactions = ({ transactions = [] }) => {
  const navigate = useNavigate();
  const txnList = transactions || [];

  const getTransactionIcon = (type) => {
    switch(type) {
      case 'delivery': return '📦';
      case 'withdrawal': return '💰';
      case 'bonus': return '🎁';
      default: return '💳';
    }
  };

  return (
    <div className="transactions-container">
      <div className="transactions-header">
        <h2>💵 Recent Transactions</h2>
        <button className="btn-view-all" onClick={() => navigate('/admin/finance')}>
          View All →
        </button>
      </div>

      <div className="transactions-list">
        {txnList.length > 0 ? (
          txnList.map((txn, index) => (
            <div key={index} className="transaction-item">
              <div className="transaction-icon">
                {getTransactionIcon(txn.type)}
              </div>
              <div className="transaction-info">
                <div className="transaction-title">
                  {txn.type === 'delivery' ? `Delivery - ${txn.orderId}` : 'Withdrawal'}
                </div>
                <div className="transaction-details">
                  <span>{txn.customer || 'Driver Withdrawal'}</span>
                  <span className="tx-dot">•</span>
                  <span>{txn.date} {txn.time}</span>
                </div>
              </div>
              <div className={`transaction-amount ${txn.type === 'delivery' ? 'positive' : 'negative'}`}>
                {txn.type === 'delivery' ? '+' : '-'}${Math.abs(txn.total || 0).toFixed(2)}
              </div>
            </div>
          ))
        ) : (
          <div className="no-transactions">
            <span className="no-data-icon">💳</span>
            <p>No recent transactions</p>
            <span className="no-data-hint">Transactions will appear here once orders are completed</span>
          </div>
        )}
      </div>

      {txnList.length > 0 && (
        <div className="transactions-summary">
          <div className="summary-row">
            <span>Total Volume:</span>
            <strong className="positive">
              ${txnList.reduce((sum, t) => sum + Math.abs(t.total || 0), 0).toFixed(2)}
            </strong>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;