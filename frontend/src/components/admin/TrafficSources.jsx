import React from 'react';
import '../../styles/TrafficSources.css';

const TrafficSources = ({ data = [] }) => {
  const trafficData = data || [];
  const totalCount = trafficData.reduce((sum, item) => sum + (item.count || 0), 0);

  return (
    <div className="traffic-sources-container">
      <div className="traffic-header">
        <h2>💳 Payment Methods</h2>
        <p>Distribution across all orders</p>
      </div>

      <div className="traffic-chart">
        {trafficData.length > 0 ? (
          <>
            {trafficData.map((item, index) => (
              <div key={index} className="traffic-item">
                <div className="traffic-info">
                  <div className="traffic-label">
                    <span className="traffic-dot" style={{ background: item.color }}></span>
                    <span className="traffic-name">{item.source}</span>
                  </div>
                  <div className="traffic-stats">
                    <span className="traffic-count">{item.count} orders</span>
                    <span className="traffic-percentage">{item.percentage}%</span>
                  </div>
                </div>
                <div className="traffic-bar">
                  <div 
                    className="traffic-bar-fill" 
                    style={{ 
                      width: `${item.percentage}%`,
                      background: item.color
                    }}
                  ></div>
                </div>
              </div>
            ))}

            <div className="traffic-summary">
              <div className="summary-row">
                <span>Total Transactions:</span>
                <strong>{totalCount}</strong>
              </div>
              <div className="summary-row">
                <span>Most Used:</span>
                <strong>{trafficData[0]?.source || 'N/A'}</strong>
              </div>
            </div>
          </>
        ) : (
          <div className="no-traffic-data">
            <span className="no-data-icon">📊</span>
            <p>No payment data available yet</p>
            <span className="no-data-hint">Data will appear once orders are completed</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrafficSources;