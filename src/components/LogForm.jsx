import React, { useState } from 'react';
import { Clock, BookOpen, Target, Sparkles } from 'lucide-react';

const LogForm = ({ onSave }) => {
  const [formData, setFormData] = useState({
    subject: '수학',
    title: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '11:00',
    focus: '4',
    type: '자습'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Calculate duration
    const start = new Date(`2000-01-01T${formData.startTime}`);
    const end = new Date(`2000-01-01T${formData.endTime}`);
    let diff = (end - start) / (1000 * 60);
    if (diff < 0) diff += 24 * 60; // Handle overnight

    onSave({
      ...formData,
      duration: diff
    });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="glass-card">
        <div className="form-grid">
          <div className="form-group full-width">
            <label><BookOpen size={16} /> 학습 주제</label>
            <input 
              type="text" 
              placeholder="무엇을 공부했나요?" 
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>과목</label>
            <select 
              value={formData.subject}
              onChange={e => setFormData({...formData, subject: e.target.value})}
            >
              <option>수학</option>
              <option>영어</option>
              <option>국어</option>
              <option>과학</option>
              <option>사회</option>
              <option>기타</option>
            </select>
          </div>

          <div className="form-group">
            <label>학습 방식</label>
            <select 
              value={formData.type}
              onChange={e => setFormData({...formData, type: e.target.value})}
            >
              <option>자습</option>
              <option>강의 수강</option>
              <option>문제 풀이</option>
              <option>복습</option>
            </select>
          </div>

          <div className="form-group">
            <label><Clock size={16} /> 시작 시간</label>
            <input 
              type="time" 
              value={formData.startTime}
              onChange={e => setFormData({...formData, startTime: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label><Clock size={16} /> 종료 시간</label>
            <input 
              type="time" 
              value={formData.endTime}
              onChange={e => setFormData({...formData, endTime: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label><Target size={16} /> 집중도 (1-5)</label>
            <div className="focus-selector">
              {[1, 2, 3, 4, 5].map(num => (
                <button
                  key={num}
                  type="button"
                  className={formData.focus === String(num) ? 'active' : ''}
                  onClick={() => setFormData({...formData, focus: String(num)})}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>날짜</label>
            <input 
              type="date" 
              value={formData.date}
              onChange={e => setFormData({...formData, date: e.target.value})}
            />
          </div>
        </div>

        <button type="submit" className="submit-btn">
          <Sparkles size={18} />
          기록 저장하기
        </button>
      </form>

      <style jsx>{`
        .form-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 32px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .full-width {
          grid-column: span 2;
        }

        label {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-muted);
          font-size: 14px;
          font-weight: 500;
        }

        input, select {
          padding: 14px 16px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          color: white;
          font-size: 15px;
          outline: none;
          transition: border-color 0.2s;
        }

        input:focus, select:focus {
          border-color: var(--primary);
        }

        .focus-selector {
          display: flex;
          gap: 8px;
        }

        .focus-selector button {
          flex: 1;
          padding: 10px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          color: var(--text-muted);
        }

        .focus-selector button.active {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
        }

        .submit-btn {
          width: 100%;
          padding: 16px;
          border-radius: 14px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: white;
          border: none;
          font-size: 16px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          box-shadow: 0 10px 25px var(--primary-glow);
        }

        @media (max-width: 600px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
          .full-width {
            grid-column: span 1;
          }
        }
      `}</style>
    </div>
  );
};

export default LogForm;
