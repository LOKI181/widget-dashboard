import React from 'react';

interface ActivityItem {
  text: string;
  time: string;
  type: 'success' | 'info' | 'error' | 'warning';
}

interface ListWidgetProps {
  config: Record<string, unknown>;
}

export const ListWidget: React.FC<ListWidgetProps> = ({ config }) => {
  const items = (config.items as ActivityItem[]) || [];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      default:
        return 'ℹ️';
    }
  };

  return (
    <div className="list-widget">
      {items.map((item, i) => (
        <div key={i} className={`list-item ${item.type}`}>
          <span className="list-icon">{getTypeIcon(item.type)}</span>
          <div className="list-content">
            <span className="list-text">{item.text}</span>
            <span className="list-time">{item.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
