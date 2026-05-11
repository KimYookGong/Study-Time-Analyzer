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


    </div>
  );
};

export default HistoryView;
