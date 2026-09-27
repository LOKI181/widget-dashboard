import type { WidgetTemplate, WidgetType } from '../types';

export const WIDGET_TEMPLATES: WidgetTemplate[] = [
  {
    type: 'chart',
    title: 'Revenue Chart',
    icon: '📊',
    defaultConfig: {
      dataKey: 'revenue',
      color: '#667eea',
    },
    defaultSize: { w: 6, h: 4 },
  },
  {
    type: 'stats',
    title: 'Key Metrics',
    icon: '📈',
    defaultConfig: {
      metrics: [
        { label: 'Users', value: '12,845', change: '+12%' },
        { label: 'Revenue', value: '$48.2K', change: '+8%' },
        { label: 'Orders', value: '1,240', change: '+23%' },
      ],
    },
    defaultSize: { w: 6, h: 2 },
  },
  {
    type: 'gauge',
    title: 'Performance Gauge',
    icon: '🎯',
    defaultConfig: { value: 78, max: 100, label: 'CPU Usage' },
    defaultSize: { w: 3, h: 3 },
  },
  {
    type: 'table',
    title: 'Recent Orders',
    icon: '📋',
    defaultConfig: {
      columns: ['ID', 'Customer', 'Amount', 'Status'],
      rows: [
        ['#1024', 'Alice Johnson', '$256.00', 'Completed'],
        ['#1025', 'Bob Smith', '$189.50', 'Pending'],
        ['#1026', 'Charlie Brown', '$423.00', 'Processing'],
        ['#1027', 'Diana Prince', '$89.99', 'Completed'],
      ],
    },
    defaultSize: { w: 6, h: 4 },
  },
  {
    type: 'list',
    title: 'Activity Feed',
    icon: '🔔',
    defaultConfig: {
      items: [
        { text: 'New user registered', time: '2 min ago', type: 'success' },
        { text: 'Order #1024 shipped', time: '15 min ago', type: 'info' },
        { text: 'Payment failed for #1025', time: '1 hr ago', type: 'error' },
        { text: 'Server CPU spike detected', time: '3 hr ago', type: 'warning' },
      ],
    },
    defaultSize: { w: 3, h: 4 },
  },
  {
    type: 'text',
    title: 'Notes',
    icon: '📝',
    defaultConfig: {
      content: 'Click to edit this note widget. You can add any text here.',
    },
    defaultSize: { w: 3, h: 3 },
  },
];

export function getTemplate(type: WidgetType): WidgetTemplate | undefined {
  return WIDGET_TEMPLATES.find((t) => t.type === type);
}
