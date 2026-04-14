import React from 'react';
import '../../styles/SalesChart.css';

const SalesChart = ({ data = { labels: [], data: [] } }) => {
  const { labels = [], data: revenues = [] } = data || { labels: [], data: [] };
  
  // If no data, show default
  if (revenues.length === 0) {
    return (
      <div className="sales-chart-container">
        <div className="chart-header">
          <h2>📈 Revenue Overview</h2>
          <p>Last 7 days performance</p>
        </div>
        <div className="no-chart-data">
          <span className="no-data-icon">📊</span>
          <p>No revenue data available yet</p>
          <span className="no-data-hint">Complete some orders to see revenue trends</span>
        </div>
      </div>
    );
  }

  const maxRevenue = Math.max(...revenues, 100);

  return (
    <div className="sales-chart-container">
      <div className="chart-header">
        <h2>📈 Revenue Overview</h2>
        <p>Last 7 days performance</p>
      </div>
      
      <div className="chart-content">
        <div className="chart-y-axis">
          {[maxRevenue, maxRevenue * 0.75, maxRevenue * 0.5, maxRevenue * 0.25, 0].map((val, i) => (
            <span key={i}>${val.toFixed(0)}</span>
          ))}
        </div>
        
        <div className="chart-area">
          <svg viewBox="0 0 600 300" className="chart-svg">
            {/* Grid lines */}
            <line x1="0" y1="60" x2="600" y2="60" stroke="#2d3142" strokeWidth="1" />
            <line x1="0" y1="120" x2="600" y2="120" stroke="#2d3142" strokeWidth="1" />
            <line x1="0" y1="180" x2="600" y2="180" stroke="#2d3142" strokeWidth="1" />
            <line x1="0" y1="240" x2="600" y2="240" stroke="#2d3142" strokeWidth="1" />

            {/* Line chart */}
            {revenues.length > 1 && (
              <polyline
                points={revenues.map((rev, i) => {
                  const x = (i * 600) / (revenues.length - 1);
                  const y = 280 - (rev / maxRevenue) * 260;
                  return `${x},${y}`;
                }).join(' ')}
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Area fill */}
            {revenues.length > 1 && (
              <polygon
                points={`0,280 ${revenues.map((rev, i) => {
                  const x = (i * 600) / (revenues.length - 1);
                  const y = 280 - (rev / maxRevenue) * 260;
                  return `${x},${y}`;
                }).join(' ')} 600,280`}
                fill="url(#areaGradient)"
              />
            )}

            {/* Data points */}
            {revenues.map((rev, i) => {
              const x = revenues.length > 1 ? (i * 600) / (revenues.length - 1) : 300;
              const y = 280 - (rev / maxRevenue) * 260;
              return (
                <g key={i}>
                  <circle
                    cx={x}
                    cy={y}
                    r="6"
                    fill="#6366f1"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <text
                    x={x}
                    y={y - 15}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="12"
                    fontWeight="600"
                  >
                    ${rev.toFixed(0)}
                  </text>
                </g>
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
            {labels.map((label, i) => (
              <span key={i}>{label}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="chart-summary">
        <div className="summary-item">
          <span>Total Revenue</span>
          <strong>${revenues.reduce((a, b) => a + b, 0).toFixed(2)}</strong>
        </div>
        <div className="summary-item">
          <span>Average/Day</span>
          <strong>${(revenues.reduce((a, b) => a + b, 0) / revenues.length).toFixed(2)}</strong>
        </div>
        <div className="summary-item">
          <span>Peak Day</span>
          <strong>${Math.max(...revenues).toFixed(2)}</strong>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;