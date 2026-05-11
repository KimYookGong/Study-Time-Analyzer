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

      <style jsx>{`
        .app-container {
          display: flex;
          width: 100%;
          min-height: 100vh;
        }

        .sidebar {
          width: 260px;
          height: 95vh;
          margin: 20px;
          padding: 32px 20px;
          display: flex;
          flex-direction: column;
          gap: 40px;
          position: sticky;
          top: 20px;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 12px;
        }

        .logo-text {
          font-size: 24px;
          font-weight: 700;
          letter-spacing: -1px;
        }

        .nav-menu {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border-radius: 12px;
          background: transparent;
          border: none;
          color: var(--text-muted);
          text-align: left;
          font-size: 15px;
          font-weight: 500;
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text);
        }

        .nav-item.active {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: white;
          box-shadow: 0 8px 20px var(--primary-glow);
        }

        .sidebar-footer {
          border-top: 1px solid var(--glass-border);
          padding-top: 20px;
        }

        .main-content {
          flex: 1;
          padding: 40px;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .main-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f43f5e, #fb923c);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
        }

        @media (max-width: 1024px) {
          .sidebar {
            width: 80px;
            padding: 32px 10px;
          }
          .logo-text, .nav-item span {
            display: none;
          }
          .nav-item {
            justify-content: center;
            padding: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default App;
