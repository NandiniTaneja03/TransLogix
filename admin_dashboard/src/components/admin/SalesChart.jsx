import React, { useState } from 'react';
import '../../styles/SalesChart.css';

const SalesChart = () => {
  const [activeTab, setActiveTab] = useState('12months');

  const tabs = [
    { id: '12months', label: '12 Months' },
    { id: '6months', label: '6 Months' },
    { id: '30days', label: '30 Days' },
    { id: '7days', label: '7 Days' }
  ];

  // Sample data points for the chart
  const dataPoints = [
    { month: 'Feb', value: 35000 },
    { month: 'Mar', value: 42000 },
    { month: 'Apr', value: 39000 },
    { month: 'May', value: 44000 },
    { month: 'Jun', value: 47000 },
    { month: 'Jul', value: 50000 },
    { month: 'Aug', value: 54000 },
    { month: 'Sep', value: 57000 },
    { month: 'Oct', value: 60000 },
    { month: 'Nov', value: 63000 },
    { month: 'Dec', value: 66000 },
    { month: 'Jan', value: 70000 }
  ];

  const maxValue = Math.max(...dataPoints.map(d => d.value));

  return (
    <div className="sales-chart-container">
      <div className="chart-header">
        <h3>Sales Report</h3>
        <div className="chart-controls">
          <div className="chart-tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`chart-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <button className="export-btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4.66675 6.66667L8.00008 10L11.3334 6.66667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 10V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Export PDF
          </button>
        </div>
      </div>

      <div className="chart-area">
        <div className="y-axis">
          <span>60000</span>
          <span>45000</span>
          <span>30000</span>
          <span>15000</span>
          <span>0</span>
        </div>
        <div className="chart-content">
          <svg className="line-chart" viewBox="0 0 800 300" preserveAspectRatio="none">
            {/* Grid lines */}
            <line x1="0" y1="75" x2="800" y2="75" stroke="#2d3142" strokeWidth="1" opacity="0.3"/>
            <line x1="0" y1="150" x2="800" y2="150" stroke="#2d3142" strokeWidth="1" opacity="0.3"/>
            <line x1="0" y1="225" x2="800" y2="225" stroke="#2d3142" strokeWidth="1" opacity="0.3"/>
            
            {/* Chart line */}
            <polyline
              fill="none"
              stroke="#6366f1"
              strokeWidth="3"
              points={dataPoints.map((d, i) => {
                const x = (i / (dataPoints.length - 1)) * 800;
                const y = 300 - ((d.value / maxValue) * 280);
                return `${x},${y}`;
              }).join(' ')}
            />
            
            {/* Data points */}
            {dataPoints.map((d, i) => {
              const x = (i / (dataPoints.length - 1)) * 800;
              const y = 300 - ((d.value / maxValue) * 280);
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="5"
                  fill="#6366f1"
                  className="data-point"
                />
              );
            })}
            
            {/* Gradient area under line */}
            <defs>
              <linearGradient id="lineGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2"/>
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <polygon
              fill="url(#lineGradient)"
              points={`0,300 ${dataPoints.map((d, i) => {
                const x = (i / (dataPoints.length - 1)) * 800;
                const y = 300 - ((d.value / maxValue) * 280);
                return `${x},${y}`;
              }).join(' ')} 800,300`}
            />
          </svg>
          <div className="x-axis">
            {dataPoints.map((d, i) => (
              <span key={i}>{d.month}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;