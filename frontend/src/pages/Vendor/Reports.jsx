import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import '../../styles/Reports.css';
import { FiPackage, FiDollarSign, FiClock, FiTruck, FiTrendingUp } from "react-icons/fi";

const Reports = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState('this-month');
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    completedOrders: 0,
    pendingOrders: 0,
    averageDeliveryTime: '0h 0m',
    averageOrderValue: 0
  });

  useEffect(() => {
    loadReports();
  }, [dateRange]);

  const loadReports = () => {
    // Load reports from localStorage
    const savedReports = JSON.parse(localStorage.getItem('vendor_reports') || '[]');
    const vendorOrders = JSON.parse(localStorage.getItem('vendor_orders') || '[]');
    
    // Filter by date range
    const filtered = filterByDateRange(savedReports);
    setReports(filtered);

    // Calculate statistics
    const completed = filtered.filter(r => r.status === 'delivered');
    const pending = vendorOrders.filter(o => o.status === 'pending' || o.status === 'in-transit');
    
    const totalRevenue = completed.reduce((sum, r) => sum + r.totalAmount, 0);
    const avgOrderValue = completed.length > 0 ? totalRevenue / completed.length : 0;
    
    // Calculate average delivery time
    const totalMinutes = completed.reduce((sum, r) => {
      const duration = r.duration || '0h 0m';
      const match = duration.match(/(\d+)h (\d+)m/);
      if (match) {
        return sum + (parseInt(match[1]) * 60) + parseInt(match[2]);
      }
      return sum;
    }, 0);
    
    const avgMinutes = completed.length > 0 ? totalMinutes / completed.length : 0;
    const avgHours = Math.floor(avgMinutes / 60);
    const avgMins = Math.floor(avgMinutes % 60);

    setStats({
      totalOrders: filtered.length,
      totalRevenue: totalRevenue,
      completedOrders: completed.length,
      pendingOrders: pending.length,
      averageDeliveryTime: `${avgHours}h ${avgMins}m`,
      averageOrderValue: avgOrderValue
    });
  };

  const filterByDateRange = (reports) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    return reports.filter(report => {
      const reportDate = new Date(report.completedAt);
      
      switch(dateRange) {
        case 'today':
          return reportDate >= today;
        
        case 'this-week':
          const weekStart = new Date(today);
          weekStart.setDate(today.getDate() - today.getDay());
          return reportDate >= weekStart;
        
        case 'this-month':
          const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
          return reportDate >= monthStart;
        
        case 'last-month':
          const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
          const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
          return reportDate >= lastMonthStart && reportDate <= lastMonthEnd;
        
        case 'this-year':
          const yearStart = new Date(now.getFullYear(), 0, 1);
          return reportDate >= yearStart;
        
        default:
          return true;
      }
    });
  };

  const exportReport = () => {
    const csvContent = generateCSV();
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TransLogix_Report_${dateRange}_${Date.now()}.csv`;
    a.click();
    alert('✓ Report exported successfully!');
  };

  const generateCSV = () => {
    const headers = ['Order ID', 'Customer', 'Date', 'Driver', 'Status', 'Amount', 'Payment Method', 'Duration'];
    const rows = reports.map(r => [
      r.orderId,
      r.customerName,
      new Date(r.completedAt).toLocaleString(),
      r.driver,
      r.status,
      `$${r.totalAmount}`,
      r.paymentMethod,
      r.duration
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };

  // Chart data for delivery trend
  const getChartData = () => {
    const last7Days = [];
    const counts = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      last7Days.push(dateStr);
      
      const count = reports.filter(r => {
        const reportDate = new Date(r.completedAt);
        return reportDate.toDateString() === date.toDateString();
      }).length;
      
      counts.push(count);
    }
    
    return { labels: last7Days, data: counts };
  };

  const chartData = getChartData();
  const maxCount = Math.max(...chartData.data, 1);

  return (
    <div className="admin-layout">
      <Sidebar userRole="vendor" />
      <div className="main-content">
        <Header />
        <div className="page-content">
          <div className="page-header">
            <div>
              <h1>Reports & Analytics</h1>
              <p className="page-subtitle">Track your business performance</p>
            </div>
            <button className="btn-export" onClick={exportReport}>
               Export Report
            </button>
          </div>

          {/* Date Range Selector */}
          <div className="date-range-selector">
            <button 
              className={`range-btn ${dateRange === 'today' ? 'active' : ''}`}
              onClick={() => setDateRange('today')}
            >
              Today
            </button>
            <button 
              className={`range-btn ${dateRange === 'this-week' ? 'active' : ''}`}
              onClick={() => setDateRange('this-week')}
            >
              This Week
            </button>
            <button 
              className={`range-btn ${dateRange === 'this-month' ? 'active' : ''}`}
              onClick={() => setDateRange('this-month')}
            >
              This Month
            </button>
            <button 
              className={`range-btn ${dateRange === 'last-month' ? 'active' : ''}`}
              onClick={() => setDateRange('last-month')}
            >
              Last Month
            </button>
            <button 
              className={`range-btn ${dateRange === 'this-year' ? 'active' : ''}`}
              onClick={() => setDateRange('this-year')}
            >
              This Year
            </button>
          </div>

          {/* Stats Grid */}
<div className="stats-grid">

  <div className="stat-card">
    <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.1)' }}>
      <FiPackage size={26} />
    </div>

    <div className="stat-info">
      <h3>Total Orders</h3>
      <h2>{stats.totalOrders}</h2>
      <span className="stat-change positive">
        +{stats.completedOrders} completed
      </span>
    </div>
  </div>


  <div className="stat-card">
    <div className="stat-icon" style={{ background: 'rgba(34, 197, 94, 0.1)' }}>
      <FiDollarSign size={26} />
    </div>

    <div className="stat-info">
      <h3>Total Revenue</h3>
      <h2>${stats.totalRevenue.toFixed(2)}</h2>
      <span className="stat-change positive">
        Avg: ${stats.averageOrderValue.toFixed(2)}/order
      </span>
    </div>
  </div>


  <div className="stat-card">
    <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.1)' }}>
      <FiClock size={26} />
    </div>

    <div className="stat-info">
      <h3>Avg Delivery Time</h3>
      <h2>{stats.averageDeliveryTime}</h2>
      <span className="stat-change">
        Per delivery
      </span>
    </div>
  </div>


  <div className="stat-card">
    <div className="stat-icon" style={{ background: 'rgba(139, 92, 246, 0.1)' }}>
      <FiTruck size={26} />
    </div>

    <div className="stat-info">
      <h3>Pending Orders</h3>
      <h2>{stats.pendingOrders}</h2>
      <span className="stat-change">
        In progress
      </span>
    </div>
  </div>

</div>
          {/* Delivery Trend Chart */}
          <div className="chart-section">
           <h2 style={{display:"flex",alignItems:"center",gap:"8px"}}>
  <FiTrendingUp />
  Delivery Trend (Last 7 Days)
</h2>
            <div className="chart-container">
              <div className="chart-y-axis">
                {[maxCount, Math.floor(maxCount * 0.66), Math.floor(maxCount * 0.33), 0].map((val, i) => (
                  <span key={i}>{val}</span>
                ))}
              </div>
              <div className="chart-content">
                <svg viewBox="0 0 600 300" className="trend-chart">
                  {/* Grid lines */}
                  <line x1="0" y1="75" x2="600" y2="75" stroke="#2d3142" strokeWidth="1" />
                  <line x1="0" y1="150" x2="600" y2="150" stroke="#2d3142" strokeWidth="1" />
                  <line x1="0" y1="225" x2="600" y2="225" stroke="#2d3142" strokeWidth="1" />
                  
                  {/* Line chart */}
                  <polyline
                    points={chartData.data.map((count, i) => {
                      const x = (i * 600) / (chartData.data.length - 1 || 1);
                      const y = 280 - (count / maxCount) * 260;
                      return `${x},${y}`;
                    }).join(' ')}
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  
                  {/* Area fill */}
                  <polygon
                    points={`0,280 ${chartData.data.map((count, i) => {
                      const x = (i * 600) / (chartData.data.length - 1 || 1);
                      const y = 280 - (count / maxCount) * 260;
                      return `${x},${y}`;
                    }).join(' ')} 600,280`}
                    fill="url(#areaGradient)"
                  />
                  
                  {/* Data points */}
                  {chartData.data.map((count, i) => {
                    const x = (i * 600) / (chartData.data.length - 1 || 1);
                    const y = 280 - (count / maxCount) * 260;
                    return (
                      <circle
                        key={i}
                        cx={x}
                        cy={y}
                        r="5"
                        fill="#6366f1"
                        stroke="#ffffff"
                        strokeWidth="2"
                        className="data-point"
                      />
                    );
                  })}
                  
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                    <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
                
                <div className="chart-x-axis">
                  {chartData.labels.map((label, i) => (
                    <span key={i}>{label}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Reports Table */}
          <div className="reports-table-section">
            <h2>📋 Detailed Reports</h2>
            
            {reports.length > 0 ? (
              <div className="reports-table-wrapper">
                <table className="reports-table">
                  <thead>
                    <tr>
                      <th>ORDER ID</th>
                      <th>CUSTOMER</th>
                      <th>DATE & TIME</th>
                      <th>DRIVER</th>
                      <th>DURATION</th>
                      <th>PAYMENT</th>
                      <th>AMOUNT</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.slice().reverse().map(report => (
                      <tr key={report.id}>
                        <td className="order-id-cell">{report.orderId}</td>
                        <td>{report.customerName}</td>
                        <td className="date-cell">
                          <div>{new Date(report.completedAt).toLocaleDateString()}</div>
                          <div className="time-sub">{new Date(report.completedAt).toLocaleTimeString()}</div>
                        </td>
                        <td>{report.driver}</td>
                        <td>{report.duration}</td>
                        <td>
                          <span className="payment-badge">{report.paymentMethod?.toUpperCase()}</span>
                        </td>
                        <td className="amount-cell">${report.totalAmount.toFixed(2)}</td>
                        <td>
                          <span className={`status-badge status-${report.status}`}>
                            {report.status === 'delivered' ? '✓ Delivered' : report.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="no-reports">
                <span className="no-reports-icon">📊</span>
                <h3>No reports for this period</h3>
                <p>Complete deliveries to see analytics and reports here</p>
              </div>
            )}
          </div>

          {/* Payment Methods Breakdown */}
          {reports.length > 0 && (
            <div className="payment-breakdown-section">
              <h2>💳 Payment Methods Breakdown</h2>
              <div className="payment-stats-grid">
                {['cash', 'card', 'online', 'cod'].map(method => {
                  const count = reports.filter(r => r.paymentMethod === method).length;
                  const percentage = reports.length > 0 ? (count / reports.length) * 100 : 0;
                  const amount = reports
                    .filter(r => r.paymentMethod === method)
                    .reduce((sum, r) => sum + r.totalAmount, 0);
                  
                  return (
                    <div key={method} className="payment-stat-card">
                      <div className="payment-stat-header">
                        <h4>{method === 'cod' ? 'COD' : method.toUpperCase()}</h4>
                        <span className="payment-percentage">{percentage.toFixed(1)}%</span>
                      </div>
                      <div className="payment-stat-details">
                        <span className="payment-count">{count} orders</span>
                        <span className="payment-amount">${amount.toFixed(2)}</span>
                      </div>
                      <div className="payment-progress-bar">
                        <div 
                          className="payment-progress-fill"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;