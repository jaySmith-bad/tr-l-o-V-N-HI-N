import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AiAssistantPanel from './components/AiAssistantPanel';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Schedule from './pages/Schedule';
import Grades from './pages/Grades';
import AiChatPage from './pages/AiChatPage';
import Settings from './pages/Settings';
import BehaviorScore from './pages/BehaviorScore';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex h-screen bg-navy text-slate-light overflow-hidden font-sans">
        <Sidebar />
        <div className="flex-1 flex min-w-0"> {/* Wrapper for main content and AI panel */}
          <div className="flex-grow flex flex-col min-w-0 my-4 ml-4 rounded-2xl bg-navy-light overflow-hidden border border-slate-dark/20 shadow-2xl relative">
            <main className="flex-grow overflow-y-auto custom-scrollbar p-6 lg:p-8">
              <Routes>
                <Route path="/" element={<Navigate to="/profile" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/grades" element={<Grades />} />
                <Route path="/ai-assistant" element={<AiChatPage />} />
                <Route path="/behavior-score" element={<BehaviorScore />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>
          </div>
          <AiAssistantPanel />
        </div>
      </div>
    </HashRouter>
  );
};

export default App;