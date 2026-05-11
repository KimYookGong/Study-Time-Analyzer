import React, { useMemo } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement,
  Filler
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { aggregateData } from '../data/store';
import { Flame, Clock, Calendar, TrendingUp } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = ({ logs }) => {
  const stats = useMemo(() => aggregateData(logs), [logs]);

  const lineData = {
    labels: ['월', '화', '수', '목', '금', '토', '일'],
    datasets: [
      {
        label: '학습 시간 (분)',
        data: [120, 240, 180, 300, 150, 420, 210], // Sample data if logs are empty
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ]
  };

  const donutData = {
    labels: Object.keys(stats.subjectBreakdown).length > 0 ? Object.keys(stats.subjectBreakdown) : ['수학', '영어', '국어', '기타'],
    datasets: [
      {
        data: Object.values(stats.subjectBreakdown).length > 0 ? Object.values(stats.subjectBreakdown) : [40, 30, 20, 10],
        backgroundColor: ['#6366f1', '#a855f7', '#f43f5e', '#10b981', '#f59e0b'],
        borderWidth: 0,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
      x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
    }
  };

  return (
    <div className="dashboard">
      <div className="kpi-grid">
        <div className="glass-card kpi">
          <div className="kpi-icon bg-primary-soft"><Clock size={24} className="text-primary" /></div>
          <div>
            <p className="kpi-label">총 공부 시간</p>
            <h3 className="kpi-value">{stats.totalHours}h</h3>
          </div>
        </div>
        <div className="glass-card kpi">
          <div className="kpi-icon bg-secondary-soft"><Flame size={24} className="text-secondary" /></div>
          <div>
            <p className="kpi-label">최장 스트릭</p>
            <h3 className="kpi-value">5일</h3>
          </div>
        </div>
        <div className="glass-card kpi">
          <div className="kpi-icon bg-success-soft"><TrendingUp size={24} className="text-success" /></div>
          <div>
            <p className="kpi-label">목표 달성률</p>
            <h3 className="kpi-value">85%</h3>
          </div>
        </div>
        <div className="glass-card kpi">
          <div className="kpi-icon bg-accent-soft"><Calendar size={24} className="text-accent" /></div>
          <div>
            <p className="kpi-label">이번 주 세션</p>
            <h3 className="kpi-value">{stats.count}회</h3>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="glass-card chart-container main-chart">
          <h3>학습 추이</h3>
          <div className="chart-wrapper">
            <Line data={lineData} options={chartOptions} />
          </div>
        </div>
        <div className="glass-card chart-container side-chart">
          <h3>과목별 비중</h3>
          <div className="chart-wrapper">
            <Doughnut data={donutData} options={{ ...chartOptions, scales: undefined }} />
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        .kpi {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px;
        }

        .kpi-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bg-primary-soft { background: rgba(99, 102, 241, 0.1); }
        .bg-secondary-soft { background: rgba(168, 85, 247, 0.1); }
        .bg-success-soft { background: rgba(16, 185, 129, 0.1); }
        .bg-accent-soft { background: rgba(244, 63, 94, 0.1); }

        .kpi-label {
          color: var(--text-muted);
          font-size: 14px;
          margin-bottom: 4px;
        }

        .kpi-value {
          font-size: 24px;
          font-weight: 700;
        }

        .charts-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
        }

        .chart-container h3 {
          margin-bottom: 24px;
          font-size: 18px;
        }

        .chart-wrapper {
          height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 900px) {
          .charts-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
