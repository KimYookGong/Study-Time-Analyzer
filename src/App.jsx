import React, { useState, useEffect } from 'react';
import { LayoutDashboard, PlusCircle, History, BrainCircuit, BarChart3, Settings } from 'lucide-react';
import { getLogs, saveLog, deleteLog } from './data/store';
import Dashboard from './components/Dashboard';
import LogForm from './components/LogForm';
import HistoryView from './components/HistoryView';
import InsightView from './components/InsightView';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    setLogs(getLogs());
  }, []);

  const handleAddLog = (newLog) => {
    const saved = saveLog(newLog);
    setLogs(prev => [saved, ...prev]);
    setActiveTab('dashboard');
  };

  const handleDeleteLog = (id) => {
    deleteLog(id);
    setLogs(prev => prev.filter(l => l.id !== id));
  };

  const menuItems = [
    { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: '대시보드' },
    { id: 'logging', icon: <PlusCircle size={20} />, label: '공부 기록' },
    { id: 'history', icon: <History size={20} />, label: '학습 기록' },
    { id: 'insights', icon: <BrainCircuit size={20} />, label: 'AI 분석' },
  ];

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar glass">
        <div className="logo">
          <BarChart3 className="text-primary" size={32} />
          <span className="logo-text">Study<span className="text-primary">Flow</span></span>
        </div>
        
        <nav className="nav-menu">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item">
            <Settings size={20} />
            <span>설정</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="main-header">
          <h1>{menuItems.find(i => i.id === activeTab)?.label}</h1>
          <div className="user-profile">
            <div className="avatar">JS</div>
          </div>
        </header>

        <div className="content-area animate-fade-in">
          {activeTab === 'dashboard' && <Dashboard logs={logs} />}
          {activeTab === 'logging' && <LogForm onSave={handleAddLog} />}
          {activeTab === 'history' && <HistoryView logs={logs} onDelete={handleDeleteLog} />}
          {activeTab === 'insights' && <InsightView logs={logs} />}
        </div>
      </main>


    </div>
  );
};

export default App;
