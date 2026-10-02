import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { ToastContainer } from './components/common/ToastContainer';

import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { LogAnalyzer } from './pages/LogAnalyzer';
import { Explainability } from './pages/Explainability';
import { NetworkGraphView } from './pages/NetworkGraphView';
import { AiChatView } from './pages/AiChatView';

export const App: React.FC = () => {
  return (
    <NotificationProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-[#050505] text-slate-100 font-sans selection:bg-[#CCFF00] selection:text-black antialiased">
            <Routes>
              {/* Landing Page */}
              <Route path="/" element={<LandingPage />} />

              {/* Login */}
              <Route path="/login" element={<Login />} />

              {/* Main SOC Command Center */}
              <Route path="/dashboard" element={<Dashboard />} />

              {/* Security Log Analyzer */}
              <Route path="/log-analyzer" element={<LogAnalyzer />} />

              {/* ML Explainability */}
              <Route path="/explainability" element={<Explainability />} />

              {/* Threat Network Graph */}
              <Route
                path="/network-graph"
                element={<NetworkGraphView />}
              />

              {/* AI Security Analyst */}
              <Route path="/ai-chat" element={<AiChatView />} />

              {/* Fallback */}
              <Route
                path="*"
                element={<Navigate to="/" replace />}
              />
            </Routes>

            <ToastContainer />
          </div>
        </Router>
      </AuthProvider>
    </NotificationProvider>
  );
};

export default App;