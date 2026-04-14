import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../pages/context/AuthContext';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import '../../styles/Wallet.css';
import { 
  FiDollarSign,
  FiTrendingUp,
  FiTarget,
  FiPackage,
  FiArrowUpRight,
  FiMapPin
} from "react-icons/fi";

const Wallet = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showBreakdownModal, setShowBreakdownModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  
  // Load wallet data from localStorage
  const [walletData, setWalletData] = useState(() => {
    const saved = localStorage.getItem('driver_wallet');
    return saved ? JSON.parse(saved) : {
      balance: 2450.75,
      transactions: [
        {
          id: 'TXN001',
          orderId: '#ORD001',
          date: new Date().toLocaleDateString(),
          time: '14:30',
          type: 'delivery',
          customer: 'John Doe',
          pickup: '123 Main St',
          delivery: '456 Oak Ave',
          distance: '5.2 km',
          baseFee: 45.00,
          distanceBonus: 8.50,
          tip: 5.00,
          total: 58.50,
          status: 'completed'
        }
      ]
    };
  });

  // Save to localStorage whenever wallet data changes
  useEffect(() => {
    localStorage.setItem('driver_wallet', JSON.stringify(walletData));
  }, [walletData]);

  // Calculate earnings breakdown
  const earningsBreakdown = walletData.transactions
    .filter(t => t.type === 'delivery')
    .reduce((acc, t) => ({
      baseDeliveryFee: acc.baseDeliveryFee + (t.baseFee || 0),
      distanceBonus: acc.distanceBonus + (t.distanceBonus || 0),
      peakHourBonus: acc.peakHourBonus + (t.peakBonus || 0),
      tipAmount: acc.tipAmount + (t.tip || 0),
      totalDeliveries: acc.totalDeliveries + 1
    }), { baseDeliveryFee: 0, distanceBonus: 0, peakHourBonus: 0, tipAmount: 0, totalDeliveries: 0 });

  const thisMonthTotal = walletData.transactions
    .filter(t => t.type === 'delivery')
    .reduce((sum, t) => sum + t.total, 0);

  // WITHDRAW MONEY - Deduct from balance
  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    
    if (!amount || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (amount < 10) {
      alert('Minimum withdrawal amount is $10.00');
      return;
    }

    if (amount > walletData.balance) {
      alert('Insufficient balance');
      return;
    }

    // Deduct from balance and add withdrawal transaction
    const newTransaction = {
      id: `WD${Date.now()}`,
      orderId: `WD${Date.now()}`,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'withdrawal',
      amount: -amount,
      method: 'Bank Transfer',
      accountLast4: '****1234',
      status: 'completed'
    };

    setWalletData(prev => ({
      balance: prev.balance - amount,
      transactions: [newTransaction, ...prev.transactions]
    }));

    alert(`✓ Withdrawal successful!\n\n$${amount.toFixed(2)} will be transferred to your bank account (****1234) within 1-2 business days.\n\nNew balance: $${(walletData.balance - amount).toFixed(2)}`);
    setShowWithdrawModal(false);
    setWithdrawAmount('');
  };

  return (
    <div className="admin-layout">
      <Sidebar userRole="driver" />
      <div className="main-content">
        <Header />
        <div className="page-content">
          <div className="page-header">
            <div>
            <h1><FiDollarSign /> My Wallet</h1>
              <p className="page-subtitle">Manage your earnings and withdrawals</p>
            </div>
          </div>

          {/* Balance Cards */}
          <div className="balance-cards">
            <div className="balance-card primary">
              <div className="balance-icon"><FiDollarSign /></div>
              <div className="balance-info">
                <span className="balance-label">Available Balance</span>
                <h2 className="balance-amount">${walletData.balance.toFixed(2)}</h2>
                <span className="balance-note">Ready to withdraw</span>
              </div>
              <button className="btn-withdraw" onClick={() => setShowWithdrawModal(true)}>
                Withdraw Now
              </button>
            </div>

            <div className="balance-card">
             <div className="balance-icon"><FiTrendingUp /></div>
              <div className="balance-info">
                <span className="balance-label">This Month</span>
                <h2 className="balance-amount">${thisMonthTotal.toFixed(2)}</h2>
                <span className="balance-note">{earningsBreakdown.totalDeliveries} deliveries</span>
              </div>
              <button className="btn-breakdown" onClick={() => setShowBreakdownModal(true)}>
                View Breakdown
              </button>
            </div>

            <div className="balance-card">
              <div className="balance-icon"><FiTarget /></div>
              <div className="balance-info">
                <span className="balance-label">Total Earnings</span>
                <h2 className="balance-amount">${thisMonthTotal.toFixed(2)}</h2>
                <span className="balance-note">All time earnings</span>
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="transactions-section">
            <div className="section-header">
              <h2>Transaction History</h2>
            </div>

            <div className="transactions-list">
              {walletData.transactions.map((transaction) => (
                <div key={transaction.id} className="transaction-item">
                  <div className="transaction-icon">
                    {transaction.type === 'delivery' ? <FiPackage /> : <FiArrowUpRight />}
                  </div>
                  
                  <div className="transaction-details">
                    {transaction.type === 'delivery' ? (
                      <>
                        <h4>{transaction.orderId} - {transaction.customer}</h4>
                        <div className="transaction-route">
                         <span><FiMapPin /> {transaction.pickup}</span>
                          <span>→</span>
                          <span><FiTarget /> {transaction.delivery}</span>
                          <span>({transaction.distance})</span>
                        </div>
                        <div className="transaction-breakdown">
                          <span>Base: ${transaction.baseFee.toFixed(2)}</span>
                          {transaction.distanceBonus > 0 && <span>+ Distance: ${transaction.distanceBonus.toFixed(2)}</span>}
                          {transaction.tip > 0 && <span className="tip">+ Tip: ${transaction.tip.toFixed(2)}</span>}
                        </div>
                        <span className="transaction-date">{transaction.date} at {transaction.time}</span>
                      </>
                    ) : (
                      <>
                        <h4>Withdrawal - {transaction.method}</h4>
                        <span>{transaction.accountLast4}</span>
                        <span className="transaction-date">{transaction.date} at {transaction.time}</span>
                      </>
                    )}
                  </div>

                  <div className="transaction-amount">
                    <span className={transaction.type === 'delivery' ? 'amount-positive' : 'amount-negative'}>
                      {transaction.type === 'delivery' ? `+$${transaction.total.toFixed(2)}` : `$${Math.abs(transaction.amount).toFixed(2)}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="modal-overlay" onClick={() => setShowWithdrawModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
           <h2><FiDollarSign /> Withdraw Funds</h2>
            <p>Available Balance: ${walletData.balance.toFixed(2)}</p>
            
            <div className="input-group">
              <label>Withdrawal Amount</label>
              <div className="amount-input-wrapper">
                <span className="currency-symbol">$</span>
                <input
                  type="number"
                  placeholder="0.00"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="amount-input"
                  step="0.01"
                  min="10"
                  max={walletData.balance}
                />
              </div>
              <span className="input-hint">Minimum: $10.00 • Maximum: ${walletData.balance.toFixed(2)}</span>
            </div>

            <div className="quick-amounts">
              <button onClick={() => setWithdrawAmount('100')}>$100</button>
              <button onClick={() => setWithdrawAmount('500')}>$500</button>
              <button onClick={() => setWithdrawAmount('1000')}>$1000</button>
              <button onClick={() => setWithdrawAmount(walletData.balance.toString())}>All</button>
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowWithdrawModal(false)}>
                Cancel
              </button>
              <button className="btn-confirm" onClick={handleWithdraw}>
                Withdraw ${withdrawAmount || '0.00'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Breakdown Modal */}
      {showBreakdownModal && (
        <div className="modal-overlay" onClick={() => setShowBreakdownModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2><FiTrendingUp /> Earnings Breakdown</h2>
            <div className="breakdown-items">
              <div className="breakdown-row">
                <span>Base Delivery Fees ({earningsBreakdown.totalDeliveries} deliveries)</span>
                <strong>${earningsBreakdown.baseDeliveryFee.toFixed(2)}</strong>
              </div>
              <div className="breakdown-row">
                <span>Distance Bonus</span>
                <strong>+${earningsBreakdown.distanceBonus.toFixed(2)}</strong>
              </div>
              <div className="breakdown-row">
                <span>Peak Hour Bonus</span>
                <strong>+${earningsBreakdown.peakHourBonus.toFixed(2)}</strong>
              </div>
              <div className="breakdown-row">
                <span>Customer Tips</span>
                <strong>+${earningsBreakdown.tipAmount.toFixed(2)}</strong>
              </div>
              <div className="breakdown-divider"></div>
              <div className="breakdown-row total">
                <span>Total This Month</span>
                <strong>${thisMonthTotal.toFixed(2)}</strong>
              </div>
            </div>
            <button className="btn-close-modal" onClick={() => setShowBreakdownModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;