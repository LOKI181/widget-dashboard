import React from 'react';

interface Metric {
  label: string;
  value: string;
  change: string;
}

interface StatsWidgetProps {
  config: Record<string, unknown>;
}

export const StatsWidget: React.FC<StatsWidgetProps> = ({ config }) => {
  const metrics = (config.metrics as Metric[]) || [];

  return (
    <div className="stats-grid">
      {metrics.map((metric, i) => {
        const isPositive = metric.change.startsWith('+');
        return (
          <div key={i} className="stat-card">
            <span className="stat-label">{metric.label}</span>
            <span className="stat-value">{metric.value}</span>
            <span className={`stat-change ${isPositive ? 'positive' : 'negative'}`}>
              {metric.change}
            </span>
          </div>
        );
      })}
    </div>
  );
};
