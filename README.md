# WidgetBoard - Customizable Dashboard

A micro-frontend inspired dashboard with plug-and-play widgets. Users can add, remove, and configure widgets to create personalized analytics views.

## Features

- **6 Widget Types**: Charts, Stats, Gauges, Tables, Activity Feeds, Notes
- **Add/Remove Widgets**: Dynamic widget management
- **Responsive Grid Layout**: CSS Grid-based adaptive layout
- **Editable Text Widgets**: Inline editing for notes
- **Visual Theming**: Each widget has its own visual style

## Tech Stack

- React 19 + TypeScript
- Recharts for data visualization
- Context API for state management
- CSS Grid for responsive layout

## Interview Highlights

- **Component Architecture**: Highly decoupled widget components with consistent interfaces
- **Context API**: Central dashboard state managed via `useReducer` + Context
- **Performance**: Lazy loading with `React.lazy` and `Suspense`
- **State Patterns**: Action-based state updates with typed reducers

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
