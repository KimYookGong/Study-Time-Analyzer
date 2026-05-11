import { format, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval, parseISO, differenceInMinutes } from 'date-fns';

const STORAGE_KEY = 'study_logs_v1';

export const getLogs = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveLog = (log) => {
  const logs = getLogs();
  const newLog = {
    ...log,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...logs, newLog]));
  return newLog;
};

export const deleteLog = (id) => {
  const logs = getLogs();
  const filtered = logs.filter(log => log.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

// Statistics Logic
export const aggregateData = (logs, period = 'all') => {
  let filteredLogs = [...logs];
  const now = new Date();

  if (period === 'today') {
    filteredLogs = logs.filter(log => format(parseISO(log.date), 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd'));
  } else if (period === 'week') {
    filteredLogs = logs.filter(log => isWithinInterval(parseISO(log.date), { start: startOfWeek(now), end: endOfWeek(now) }));
  } else if (period === 'month') {
    filteredLogs = logs.filter(log => isWithinInterval(parseISO(log.date), { start: startOfMonth(now), end: endOfMonth(now) }));
  }

  const totalMinutes = filteredLogs.reduce((acc, log) => acc + log.duration, 0);
  const subjectBreakdown = filteredLogs.reduce((acc, log) => {
    acc[log.subject] = (acc[log.subject] || 0) + log.duration;
    return acc;
  }, {});

  return {
    totalMinutes,
    totalHours: (totalMinutes / 60).toFixed(1),
    count: filteredLogs.length,
    subjectBreakdown,
    logs: filteredLogs
  };
};

export const getInsights = (logs) => {
  if (logs.length < 5) return ["데이터가 충분하지 않습니다. 최소 5개 이상의 공부 기록을 남겨주세요."];

  const insights = [];
  const subjectStats = logs.reduce((acc, log) => {
    acc[log.subject] = (acc[log.subject] || 0) + log.duration;
    return acc;
  }, {});

  // 1. Subject Balance Analysis
  const subjects = Object.keys(subjectStats);
  const total = Object.values(subjectStats).reduce((a, b) => a + b, 0);
  subjects.forEach(sub => {
    const ratio = (subjectStats[sub] / total) * 100;
    if (ratio < 15) {
      insights.push(`최근 ${sub} 공부 비중이 ${ratio.toFixed(0)}%로 낮습니다. 고른 학습 밸런스를 위해 ${sub} 학습 시간을 늘려보세요.`);
    }
  });

  // 2. Focus Analysis
  const avgFocus = logs.reduce((acc, log) => acc + Number(log.focus), 0) / logs.length;
  if (avgFocus > 4) {
    insights.push("전반적인 집중도가 매우 높습니다! 현재의 학습 페이스를 유지해 보세요.");
  } else if (avgFocus < 3) {
    insights.push("최근 집중도가 다소 낮아졌습니다. 50분 공부 후 10분 휴식하는 뽀모도로 기법을 적용해 보는 건 어떨까요?");
  }

  // 3. Time Slot Analysis (Simple version)
  const morningLogs = logs.filter(log => {
    const hour = parseInt(log.startTime.split(':')[0]);
    return hour >= 6 && hour < 12;
  });
  const morningFocus = morningLogs.length > 0 ? morningLogs.reduce((acc, l) => acc + Number(l.focus), 0) / morningLogs.length : 0;
  
  if (morningFocus >= 4) {
    insights.push("오전 시간대의 집중도가 가장 높습니다. 이 시간에 가장 어려운 과목이나 고난도 문제를 배치해 보세요.");
  }

  return insights;
};
