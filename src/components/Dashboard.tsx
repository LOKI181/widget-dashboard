import React, { useState, useCallback, Suspense } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { AddWidgetPanel } from './AddWidgetPanel';
import { WidgetRenderer } from '../widgets/WidgetRenderer';

export const Dashboard: React.FC = () => {
  const { widgets, editMode, addWidget, removeWidget, toggleEditMode, updateWidgetConfig } =
    useDashboard();
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [draggedWidget, setDraggedWidget] = useState<string | null>(null);

  const handleDragStart = useCallback((e: React.DragEvent, widgetId: string) => {
    e.dataTransfer.setData('text/plain', widgetId);
    setDraggedWidget(widgetId);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, targetId: string) => {
      e.preventDefault();
      const sourceId = e.dataTransfer.getData('text/plain');
      if (sourceId && sourceId !== targetId) {
        // swap positions
      }
      setDraggedWidget(null);
    },
    []
  );

  return (
    <div className="dashboard-app">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>WidgetBoard</h1>
          <span className="header-subtitle">Customizable Dashboard</span>
        </div>
        <div className="header-actions">
          {editMode && (
            <button className="btn-add-widget" onClick={() => setShowAddPanel(true)}>
              + Add Widget
            </button>
          )}
          <button className={`btn-edit ${editMode ? 'active' : ''}`} onClick={toggleEditMode}>
            {editMode ? '✓ Done' : '✏️ Edit'}
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="widget-grid">
          {widgets.map((widget) => (
            <div
              key={widget.id}
              className={`grid-item ${draggedWidget === widget.id ? 'dragging' : ''}`}
              draggable={editMode}
              onDragStart={(e) => handleDragStart(e, widget.id)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, widget.id)}
            >
              <Suspense fallback={<div className="widget-loading">Loading...</div>}>
                <WidgetRenderer
                  widget={widget}
                  editMode={editMode}
                  onRemove={removeWidget}
                  onUpdateConfig={updateWidgetConfig}
                />
              </Suspense>
            </div>
          ))}
        </div>
      </main>

      {showAddPanel && (
        <AddWidgetPanel
          onAdd={addWidget}
          onClose={() => setShowAddPanel(false)}
        />
      )}
    </div>
  );
};
