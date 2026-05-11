import React, { useState } from 'react';
import { Search, Filter, Trash2, Calendar } from 'lucide-react';

const HistoryView = ({ logs, onDelete }) => {
  const [filter, setFilter] = useState('전체');
  const [sort, setSort] = useState('최신순');

  const filteredLogs = logs
    .filter(log => filter === '전체' || log.subject === filter)
    .sort((a, b) => {
      if (sort === '최신순') return new Date(b.date) - new Date(a.date);
      if (sort === '시간순') return b.duration - a.duration;
      if (sort === '집중도순') return b.focus - a.focus;
      return 0;
    });

  const subjects = ['전체', ...new Set(logs.map(l => l.subject))];

  return (
    <div className="history-view">
      <div className="controls glass-card">
        <div className="control-group">
          <label><Filter size={16} /> 과목 필터</label>
          <select value={filter} onChange={e => setFilter(e.target.value)}>
            {subjects.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="control-group">
          <label>정렬 기준</label>
          <select value={sort} onChange={e => setSort(e.target.value)}>
            <option>최신순</option>
            <option>시간순</option>
            <option>집중도순</option>
          </select>
        </div>
      </div>

      <div className="logs-list">
        {filteredLogs.length === 0 ? (
          <div className="empty-state glass-card">
            <Search size={48} className="text-muted" />
            <p>기록이 없습니다. 첫 공부를 시작해보세요!</p>
          </div>
        ) : (
          filteredLogs.map(log => (
            <div key={log.id} className="log-item glass-card animate-fade-in">
              <div className="log-info">
                <div className="log-date">
                  <Calendar size={14} />
                  {log.date}
                </div>
                <h4>{log.title || `${log.subject} 공부`}</h4>
                <div className="log-meta">
                  <span className="badge subject">{log.subject}</span>
                  <span className="badge type">{log.type}</span>
                  <span className="time">{log.startTime} - {log.endTime} ({log.duration}분)</span>
                </div>
              </div>
              <div className="log-actions">
                <div className="focus-badge">
                  <span>집중도</span>
                  <strong>{log.focus}</strong>
                </div>
                <button onClick={() => onDelete(log.id)} className="delete-btn">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <style jsx>{`
        .history-view {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .controls {
          display: flex;
          gap: 24px;
          padding: 16px 24px;
        }

        .control-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .control-group label {
          color: var(--text-muted);
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        select {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          color: white;
          padding: 8px 12px;
          border-radius: 8px;
          outline: none;
        }

        .logs-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .log-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
        }

        .log-date {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-muted);
          font-size: 12px;
          margin-bottom: 8px;
        }

        .log-info h4 {
          font-size: 18px;
          margin-bottom: 12px;
        }

        .log-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
        }

        .badge {
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
        }

        .badge.subject { background: rgba(99, 102, 241, 0.1); color: var(--primary); }
        .badge.type { background: rgba(255, 255, 255, 0.05); color: var(--text-muted); }

        .time { color: var(--text-muted); }

        .log-actions {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .focus-badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(255, 255, 255, 0.03);
          padding: 8px 16px;
          border-radius: 12px;
          border: 1px solid var(--glass-border);
        }

        .focus-badge span { font-size: 10px; color: var(--text-muted); text-transform: uppercase; }
        .focus-badge strong { font-size: 20px; color: var(--primary); }

        .delete-btn {
          background: transparent;
          border: none;
          color: #ef4444;
          opacity: 0.5;
          transition: opacity 0.2s;
        }

        .delete-btn:hover { opacity: 1; }

        .empty-state {
          padding: 80px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
};

export default HistoryView;
