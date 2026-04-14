import React from 'react';
import '../../styles/TrafficSources.css';

const TrafficSources = () => {
  const sources = [
    { name: 'Direct', value: 87974, color: '#6366f1', percentage: 40 },
    { name: 'Referral', value: 87974, color: '#8b5cf6', percentage: 30 },
    { name: 'Social Media', value: 45211, color: '#ec4899', percentage: 20 },
    { name: 'Twitter', value: 21893, color: '#06b6d4', percentage: 10 }
  ];

  return (
    <div className="traffic-sources-container">
      <h3>Traffic Sources</h3>
      <div className="traffic-list">
        {sources.map((source, index) => (
          <div key={index} className="traffic-item">
            <div className="traffic-info">
              <span className="traffic-name">{source.name}</span>
              <span className="traffic-value">{source.value.toLocaleString()}</span>
            </div>
            <div className="traffic-bar">
              <div 
                className="traffic-fill" 
                style={{ 
                  width: `${source.percentage}%`,
                  backgroundColor: source.color 
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrafficSources;