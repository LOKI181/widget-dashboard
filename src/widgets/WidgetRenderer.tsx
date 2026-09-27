import React from 'react';
import type { Widget } from '../types';
import { ChartWidget } from './ChartWidget';
import { StatsWidget } from './StatsWidget';
import { GaugeWidget } from './GaugeWidget';
import { TableWidget } from './TableWidget';
import { ListWidget } from './ListWidget';
import { TextWidget } from './TextWidget';

interface WidgetRendererProps {
  widget: Widget;
  editMode: boolean;
  onRemove: (id: string) => void;
  onUpdateConfig?: (id: string, config: Record<string, unknown>) => void;
}

export const WidgetRenderer: React.FC<WidgetRendererProps> = ({
  widget,
  editMode,
  onRemove,
  onUpdateConfig,
}) => {
  const renderWidget = () => {
    switch (widget.type) {
      case 'chart':
        return <ChartWidget config={widget.config} />;
      case 'stats':
        return <StatsWidget config={widget.config} />;
      case 'gauge':
        return <GaugeWidget config={widget.config} />;
      case 'table':
        return <TableWidget config={widget.config} />;
      case 'list':
        return <ListWidget config={widget.config} />;
      case 'text':
        return (
          <TextWidget
            config={widget.config}
            editMode={editMode}
            onUpdateConfig={(cfg) => onUpdateConfig?.(widget.id, cfg)}
          />
        );
      default:
        return <div>Unknown widget type</div>;
    }
  };

  return (
    <div className={`widget-wrapper ${editMode ? 'editable' : ''}`}>
      <div className="widget-header">
        <span className="widget-title">{widget.title}</span>
        {editMode && (
          <button className="widget-remove" onClick={() => onRemove(widget.id)}>
            ✕
          </button>
        )}
      </div>
      <div className="widget-body">{renderWidget()}</div>
    </div>
  );
};
