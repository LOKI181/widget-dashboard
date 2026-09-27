import { Dashboard } from './components/Dashboard';
import { DashboardProvider } from './context/DashboardContext';
import './App.css';

function App() {
  return (
    <DashboardProvider>
      <Dashboard />
    </DashboardProvider>
  );
}

export default App;
