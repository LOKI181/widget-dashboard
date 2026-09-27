export interface Widget {
  id: string;
  type: WidgetType;
  title: string;
  config: Record<string, unknown>;
}

export type WidgetType = 'chart' | 'stats' | 'table' | 'list' | 'gauge' | 'text';

export interface Layout {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
}

export interface DashboardConfig {
  widgets: Widget[];
  layouts: Layout[];
}

export interface WidgetTemplate {
  type: WidgetType;
  title: string;
  icon: string;
  defaultConfig: Record<string, unknown>;
  defaultSize: { w: number; h: number };
}
