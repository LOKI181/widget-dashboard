import React from 'react';

interface GaugeWidgetProps {
  config: Record<string, unknown>;
}

export const GaugeWidget: React.FC<GaugeWidgetProps> = ({ config }) => {
  const value = (config.value as number) || 0;
  const max = (config.max as number) || 100;
  const label = (config.label as string) || 'Metric';
  const percentage = (value / max) * 100;
  const getColor = () => {
    if (percentage < 50) return '#10b981';
    if (percentage < 75) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="gauge-widget">
      <div className="gauge-container">
        <svg viewBox="0 0 200 120" className="gauge-svg">
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke={getColor()}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${(percentage / 100) * 251.2} 251.2`}
            style={{ transition: 'stroke-dasharray 0.5s ease' }}
          />
          <text x="100" y="85" textAnchor="middle" className="gauge-value">
            {value}%
          </text>
          <text x="100" y="105" textAnchor="middle" className="gauge-label">
            {label}
          </text>
        </svg>
      </div>
    </div>
  );
};
