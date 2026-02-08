import React, { useState } from 'react';
import { useGameStore } from '../../stores/gameStore';
import { useTaskStore } from '../../stores/taskStore';
import { useHabitStore } from '../../stores/habitStore';
import { useDiaryStore } from '../../stores/diaryStore';
import { useFinanceStore } from '../../stores/financeStore';
import { StatCard } from './StatCard';

type TimeRange = 'week' | 'month' | 'all';

export const StatsView: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('month');
  
  const { xp, level, xp_celkem, streak_aktualni, streak_nejdelsi } = useGameStore();
  const { tasks } = useTaskStore();
  const { habits, habitLogs } = useHabitStore();
  const { entries: diaryEntries } = useDiaryStore();
  const { entries: financeEntries } = useFinanceStore();
  
  // Calculate XP needed for next level
  const xpNeededForLevel = (lvl: number) => lvl * 100;
  const xpForNextLevel = xpNeededForLevel(level + 1);
  const xpProgress = (xp / xpForNextLevel) * 100;
  
  // Filter data by time range
  const getStartDate = () => {
    const now = new Date();
    if (timeRange === 'week') {
      const weekAgo = new Date(now);
      weekAgo.setDate(weekAgo.getDate() - 7);
      return weekAgo;
    } else if (timeRange === 'month') {
      const monthAgo = new Date(now);
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return monthAgo;
    }
    return new Date(0); // All time
  };
  
  const startDate = getStartDate();
  
  // Tasks stats
  const completedTasks = tasks.filter(t => 
    t.stav === 'splneno' && 
    (timeRange === 'all' || new Date(t.datum_splneni || '') >= startDate)
  );
  const taskCompletionRate = tasks.length > 0 
    ? Math.round((completedTasks.length / tasks.length) * 100) 
    : 0;
  
  // Calculate average tasks per day
  const daysInRange = timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : 365;
  const avgTasksPerDay = completedTasks.length > 0 
    ? (completedTasks.length / daysInRange).toFixed(1) 
    : '0';
  
  // Most productive module
  const moduleTaskCounts: Record<string, number> = {};
  completedTasks.forEach(task => {
    moduleTaskCounts[task.modul] = (moduleTaskCounts[task.modul] || 0) + 1;
  });
  const mostProductiveModule = Object.entries(moduleTaskCounts)
    .sort(([, a], [, b]) => b - a)[0]?.[0] || 'Žádný';
  
  // Habits stats
  const todayHabitLogs = habitLogs.filter(log => {
    const logDate = new Date(log.datum).toISOString().split('T')[0];
    const today = new Date().toISOString().split('T')[0];
    return logDate === today;
  });
  const todayCompletedHabits = todayHabitLogs.filter(log => log.splneno).length;
  const todayHabitCompletionRate = habits.length > 0 
    ? Math.round((todayCompletedHabits / habits.length) * 100) 
    : 0;
  
  // Best habit streak
  const habitStreaks = habits.map(habit => {
    const habitLogsFiltered = habitLogs
      .filter(log => log.navyk_id === habit.id && log.splneno)
      .sort((a, b) => new Date(b.datum).getTime() - new Date(a.datum).getTime());
    
    let streak = 0;
    const checkDate = new Date();
    checkDate.setHours(0, 0, 0, 0);
    
    for (const log of habitLogsFiltered) {
      const logDate = new Date(log.datum);
      logDate.setHours(0, 0, 0, 0);
      
      if (logDate.getTime() === checkDate.getTime()) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
    
    return streak;
  });
  const bestHabitStreak = Math.max(...habitStreaks, 0);
  
  // Diary stats
  const recentDiaryEntries = diaryEntries.filter(entry => 
    timeRange === 'all' || new Date(entry.datum) >= startDate
  );
  
  // Finance stats
  const recentFinanceEntries = financeEntries.filter(entry => 
    timeRange === 'all' || new Date(entry.datum) >= startDate
  );
  const income = recentFinanceEntries
    .filter(e => e.typ === 'prijem')
    .reduce((sum, e) => sum + e.castka, 0);
  const expenses = recentFinanceEntries
    .filter(e => e.typ === 'vydaj')
    .reduce((sum, e) => sum + e.castka, 0);
  const balance = income - expenses;
  
  // Activity heatmap (last 7 days)
  const getActivityForDay = (daysAgo: number) => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    const dateStr = date.toISOString().split('T')[0];
    
    const tasksCount = tasks.filter(t => 
      t.datum_splneni?.startsWith(dateStr)
    ).length;
    
    const habitsCount = habitLogs.filter(log => 
      log.datum.startsWith(dateStr) && log.splneno
    ).length;
    
    return tasksCount + habitsCount;
  };
  
  const activityData = Array.from({ length: 7 }, (_, i) => ({
    day: i,
    activity: getActivityForDay(6 - i),
  }));
  
  const maxActivity = Math.max(...activityData.map(d => d.activity), 1);
  
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-matcha-dark mb-4">📊 Statistiky</h2>
        
        {/* Time range selector */}
        <div className="flex gap-2">
          <button
            onClick={() => setTimeRange('week')}
            className={`px-4 py-2 rounded-kawaii border-2 transition-colors text-sm ${
              timeRange === 'week'
                ? 'border-matcha-dark bg-matcha-light text-matcha-dark'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            Tento týden
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-4 py-2 rounded-kawaii border-2 transition-colors text-sm ${
              timeRange === 'month'
                ? 'border-matcha-dark bg-matcha-light text-matcha-dark'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            Tento měsíc
          </button>
          <button
            onClick={() => setTimeRange('all')}
            className={`px-4 py-2 rounded-kawaii border-2 transition-colors text-sm ${
              timeRange === 'all'
                ? 'border-matcha-dark bg-matcha-light text-matcha-dark'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            Celkem
          </button>
        </div>
      </div>
      
      {/* Row 1 - XP & Level */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">⭐ XP & Level</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            icon="💎"
            label="Celkové XP"
            value={xp_celkem.toLocaleString()}
          />
          <StatCard
            icon="🎯"
            label="Aktuální level"
            value={level}
            subtitle={`${xp} / ${xpForNextLevel} XP`}
          />
          <StatCard
            icon="📈"
            label="Postup na další level"
            value={`${Math.round(xpProgress)}%`}
          />
          <StatCard
            icon="🔥"
            label="Aktuální série"
            value={streak_aktualni}
            subtitle={`Nejdelší: ${streak_nejdelsi} dní`}
          />
        </div>
      </div>
      
      {/* Row 2 - Tasks */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">✅ Úkoly</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            icon="✅"
            label="Dokončené úkoly"
            value={completedTasks.length}
            subtitle={timeRange === 'all' ? 'Celkem' : timeRange === 'week' ? 'Tento týden' : 'Tento měsíc'}
          />
          <StatCard
            icon="📊"
            label="Úspěšnost"
            value={`${taskCompletionRate}%`}
            subtitle={`${completedTasks.length} / ${tasks.length} úkolů`}
          />
          <StatCard
            icon="🏆"
            label="Nejproduktivnější modul"
            value={mostProductiveModule}
          />
          <StatCard
            icon="📅"
            label="Průměr na den"
            value={avgTasksPerDay}
            subtitle="úkolů/den"
          />
        </div>
      </div>
      
      {/* Row 3 - Habits */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">🏋️ Návyky</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            icon="✔️"
            label="Návyky dnes"
            value={`${todayHabitCompletionRate}%`}
            subtitle={`${todayCompletedHabits} / ${habits.length} splněno`}
          />
          <StatCard
            icon="🔥"
            label="Nejlepší série"
            value={bestHabitStreak}
            subtitle="dní v řadě"
          />
          <StatCard
            icon="📈"
            label="Celkem návyků"
            value={habits.length}
            subtitle="aktivních"
          />
        </div>
      </div>
      
      {/* Row 4 - Activity Overview */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">📊 Přehled aktivity</h3>
        
        {/* Weekly heatmap */}
        <div className="bg-white rounded-kawaii p-6 shadow-md mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Týdenní aktivita</h4>
          <div className="flex gap-2 items-end h-32">
            {activityData.map((data, index) => {
              const height = (data.activity / maxActivity) * 100;
              const dayNames = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'];
              const today = new Date();
              const dayIndex = (today.getDay() + 6 - (6 - index)) % 7;
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-gradient-to-t from-matcha-dark to-matcha-light rounded-t-kawaii transition-all"
                    style={{ height: `${Math.max(height, 5)}%` }}
                    title={`${data.activity} aktivit`}
                  />
                  <div className="text-xs text-gray-500 mt-2">{dayNames[dayIndex]}</div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StatCard
            icon="📔"
            label="Deníkové záznamy"
            value={recentDiaryEntries.length}
            subtitle={timeRange === 'all' ? 'Celkem' : timeRange === 'week' ? 'Tento týden' : 'Tento měsíc'}
          />
          <StatCard
            icon="💰"
            label="Finanční bilance"
            value={`${balance >= 0 ? '+' : ''}${balance.toLocaleString()} Kč`}
            subtitle={`${income.toLocaleString()} Kč příjmy - ${expenses.toLocaleString()} Kč výdaje`}
            trend={balance >= 0 ? 'up' : 'down'}
          />
        </div>
      </div>
    </div>
  );
};
