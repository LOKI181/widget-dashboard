import React, { useState } from 'react';
import { WIDGET_TEMPLATES } from '../data/widgetTemplates';

interface AddWidgetPanelProps {
  onAdd: (type: string) => void;
  onClose: () => void;
}

export const AddWidgetPanel: React.FC<AddWidgetPanelProps> = ({ onAdd, onClose }) => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="add-widget-overlay" onClick={onClose}>
      <div className="add-widget-panel" onClick={(e) => e.stopPropagation()}>
        <h3>Add New Widget</h3>
        <div className="widget-options">
          {WIDGET_TEMPLATES.map((template) => (
            <button
              key={template.type}
              className={`widget-option ${selected === template.type ? 'selected' : ''}`}
              onClick={() => setSelected(template.type)}
            >
              <span className="widget-option-icon">{template.icon}</span>
              <span className="widget-option-title">{template.title}</span>
            </button>
          ))}
        </div>
        <div className="panel-actions">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn-add"
            disabled={!selected}
            onClick={() => {
              if (selected) {
                onAdd(selected);
                onClose();
              }
            }}
          >
            Add Widget
          </button>
        </div>
      </div>
    </div>
  );
};
