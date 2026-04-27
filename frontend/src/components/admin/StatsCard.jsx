import React from 'react';
import '../../styles/StatsCard.css';

const StatsCard = ({ title, value, change, trend, icon }) => {
  return (
    <div className="stats-card">
      <div className="stats-card-header">
        <div className="stats-icon">{icon || '📊'}</div>
        <span className={`trend-badge ${trend}`}>
          {trend === 'up' ? '↑' : '↓'} {change}
        </span>
      </div>
      <div className="stats-card-body">
        <h3 className="stats-title">{title}</h3>
        <h2 className="stats-value">{value}</h2>
      </div>
    </div>
  );
};

export default StatsCard;