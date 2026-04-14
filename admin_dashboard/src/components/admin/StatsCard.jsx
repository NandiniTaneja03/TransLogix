import React from 'react';
import '../../styles/StatsCard.css';

const StatsCard = ({ title, value, change, trend }) => {
  return (
    <div className="stats-card">
      <div className="stats-header">
        <h3>{title}</h3>
      </div>
      <div className="stats-value">
        <h2>{value}</h2>
        <span className={`stats-change ${trend}`}>
          {trend === 'up' ? '↑' : '↓'} {change}
        </span>
      </div>
    </div>
  );
};

export default StatsCard;