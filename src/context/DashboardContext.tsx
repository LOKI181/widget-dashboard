import React, { createContext, useContext, useReducer, useCallback } from 'react';
import type { Widget, Layout } from '../types';
import { WIDGET_TEMPLATES } from '../data/widgetTemplates';
import { v4 as uuidv4 } from 'uuid';

interface DashboardState {
  widgets: Widget[];
  layouts: Layout[];
  editMode: boolean;
}

type DashboardAction =
  | { type: 'ADD_WIDGET'; widgetType: string }
  | { type: 'REMOVE_WIDGET'; id: string }
  | { type: 'UPDATE_LAYOUTS'; layouts: Layout[] }
  | { type: 'TOGGLE_EDIT_MODE' }
  | { type: 'UPDATE_WIDGET_CONFIG'; id: string; config: Record<string, unknown> };

const defaultWidgets: Widget[] = [
  { id: 'w1', type: 'stats', title: 'Key Metrics', config: WIDGET_TEMPLATES[1].defaultConfig },
  { id: 'w2', type: 'chart', title: 'Revenue Chart', config: WIDGET_TEMPLATES[0].defaultConfig },
  { id: 'w3', type: 'gauge', title: 'Performance', config: WIDGET_TEMPLATES[2].defaultConfig },
  { id: 'w4', type: 'list', title: 'Activity', config: WIDGET_TEMPLATES[4].defaultConfig },
];

const defaultLayouts: Layout[] = [
  { i: 'w1', x: 0, y: 0, w: 6, h: 2 },
  { i: 'w2', x: 6, y: 0, w: 6, h: 4 },
  { i: 'w3', x: 0, y: 2, w: 3, h: 3 },
  { i: 'w4', x: 3, y: 2, w: 3, h: 4 },
];

const initialState: DashboardState = {
  widgets: defaultWidgets,
  layouts: defaultLayouts,
  editMode: false,
};

function dashboardReducer(state: DashboardState, action: DashboardAction): DashboardState {
  switch (action.type) {
    case 'ADD_WIDGET': {
      const template = WIDGET_TEMPLATES.find((t) => t.type === action.widgetType);
      if (!template) return state;
      const id = uuidv4();
      const newWidget: Widget = {
        id,
        type: template.type,
        title: template.title,
        config: { ...template.defaultConfig },
      };
      const newLayout: Layout = {
        i: id,
        x: 0,
        y: Infinity,
        w: template.defaultSize.w,
        h: template.defaultSize.h,
      };
      return {
        ...state,
        widgets: [...state.widgets, newWidget],
        layouts: [...state.layouts, newLayout],
      };
    }
    case 'REMOVE_WIDGET':
      return {
        ...state,
        widgets: state.widgets.filter((w) => w.id !== action.id),
        layouts: state.layouts.filter((l) => l.i !== action.id),
      };
    case 'UPDATE_LAYOUTS':
      return { ...state, layouts: action.layouts };
    case 'TOGGLE_EDIT_MODE':
      return { ...state, editMode: !state.editMode };
    case 'UPDATE_WIDGET_CONFIG':
      return {
        ...state,
        widgets: state.widgets.map((w) =>
          w.id === action.id ? { ...w, config: { ...w.config, ...action.config } } : w
        ),
      };
    default:
      return state;
  }
}

interface DashboardContextType extends DashboardState {
  addWidget: (type: string) => void;
  removeWidget: (id: string) => void;
  updateLayouts: (layouts: Layout[]) => void;
  toggleEditMode: () => void;
  updateWidgetConfig: (id: string, config: Record<string, unknown>) => void;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  const addWidget = useCallback((type: string) => {
    dispatch({ type: 'ADD_WIDGET', widgetType: type });
  }, []);

  const removeWidget = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_WIDGET', id });
  }, []);

  const updateLayouts = useCallback((layouts: Layout[]) => {
    dispatch({ type: 'UPDATE_LAYOUTS', layouts });
  }, []);

  const toggleEditMode = useCallback(() => {
    dispatch({ type: 'TOGGLE_EDIT_MODE' });
  }, []);

  const updateWidgetConfig = useCallback((id: string, config: Record<string, unknown>) => {
    dispatch({ type: 'UPDATE_WIDGET_CONFIG', id, config });
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        ...state,
        addWidget,
        removeWidget,
        updateLayouts,
        toggleEditMode,
        updateWidgetConfig,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) throw new Error('useDashboard must be used within DashboardProvider');
  return context;
}
