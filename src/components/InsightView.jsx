import React from 'react';
import { Lightbulb, Brain, Zap, AlertTriangle } from 'lucide-react';
import { getInsights } from '../data/store';

const InsightView = ({ logs }) => {
  const insights = getInsights(logs);

  return (
    <div className="insight-view">
      <div className="insight-header">
        <Brain className="text-secondary" size={40} />
        <div>
          <h2>학습 패턴 분석 결과</h2>
          <p className="text-muted">누적된 데이터를 바탕으로 분석한 당신의 학습 습관입니다.</p>
        </div>
      </div>

      <div className="insights-grid">
        {insights.map((text, idx) => (
          <div key={idx} className="glass-card insight-card animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
            <div className="insight-icon">
              {text.includes('낮습니다') || text.includes('낮아졌습니다') ? 
                <AlertTriangle className="text-warning" size={24} /> : 
                <Zap className="text-primary" size={24} />
              }
            </div>
            <div className="insight-content">
              <p>{text}</p>
            </div>
          </div>
        ))}

        {logs.length > 0 && (
          <div className="glass-card insight-card action-card">
            <div className="insight-icon">
              <Lightbulb className="text-success" size={24} />
            </div>
            <div className="insight-content">
              <h3>오늘의 추천 학습 플랜</h3>
              <p>최근 수학 학습량이 부족합니다. 오늘은 집중도가 가장 높은 오전 10시경에 수학 고난도 기출 문제를 1시간 동안 풀어보는 것을 추천합니다.</p>
              <button className="action-btn">추천 플랜 적용하기</button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .insight-view {
          max-width: 900px;
          margin: 0 auto;
        }

        .insight-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 40px;
        }

        .insights-grid {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .insight-card {
          display: flex;
          gap: 24px;
          padding: 32px;
          align-items: flex-start;
        }

        .insight-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .insight-content h3 {
          font-size: 18px;
          margin-bottom: 12px;
        }

        .insight-content p {
          color: var(--text);
          line-height: 1.6;
          font-size: 16px;
        }

        .action-card {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(99, 102, 241, 0.1));
          border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .action-btn {
          margin-top: 20px;
          padding: 10px 20px;
          border-radius: 8px;
          background: var(--success);
          color: white;
          border: none;
          font-weight: 600;
          font-size: 14px;
        }

        .text-muted { color: var(--text-muted); }
      `}</style>
    </div>
  );
};

export default InsightView;
