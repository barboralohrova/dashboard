import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { useGameStore } from '../../stores/gameStore';
import { useTaskStore } from '../../stores/taskStore';
import { useHabitStore } from '../../stores/habitStore';
import { useDiaryStore } from '../../stores/diaryStore';
import { useFinanceStore } from '../../stores/financeStore';
import { useFoodStore } from '../../stores/foodStore';
import { useRelationshipStore } from '../../stores/relationshipStore';
import { useInsuranceStore } from '../../stores/insuranceStore';
import { useTravelStore } from '../../stores/travelStore';
import { useHealthStore } from '../../stores/healthStore';
import { useLearningStore } from '../../stores/learningStore';
import { useHomeStore } from '../../stores/homeStore';
import { useCalendarStore } from '../../stores/calendarStore';
import { getGreeting } from '../../utils/helpers';
import { Header } from '../layout/Header';
import { StatusBar } from '../layout/StatusBar';
import { BottomNav } from '../layout/BottomNav';
import { EmeraldMap } from '../map/EmeraldMap';
import { TaskList } from '../tasks/TaskList';
import { HabitList } from '../habits/HabitList';
import { DiaryList } from '../diary/DiaryList';
import { FinanceList } from '../finance/FinanceList';
import { FoodList } from '../food/FoodList';
import { RelationshipList } from '../relationships/RelationshipList';
import { InsuranceList } from '../insurance/InsuranceList';
import { TravelList } from '../travel/TravelList';
import { HealthList } from '../health/HealthList';
import { LearningList } from '../learning/LearningList';
import { HomeList } from '../home/HomeList';
import { CalendarView } from '../calendar/CalendarView';
import { StatsView } from '../stats/StatsView';

export const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { loadGameState } = useGameStore();
  const { loadTasks } = useTaskStore();
  const { loadHabits } = useHabitStore();
  const { loadEntries } = useDiaryStore();
  const { loadEntries: loadFinanceEntries } = useFinanceStore();
  const { loadRecipes } = useFoodStore();
  const { loadEntries: loadRelationshipEntries } = useRelationshipStore();
  const { loadEntries: loadInsuranceEntries } = useInsuranceStore();
  const { loadEntries: loadTravelEntries } = useTravelStore();
  const { loadEntries: loadHealthEntries } = useHealthStore();
  const { loadSubjects } = useLearningStore();
  const { loadEntries: loadHomeEntries } = useHomeStore();
  const { loadEvents } = useCalendarStore();
  const [activeModule, setActiveModule] = useState<string>('map');
  
  useEffect(() => {
    // Load initial data
    loadGameState();
    loadTasks();
    loadHabits();
    loadEntries();
    loadFinanceEntries();
    loadRecipes();
    loadRelationshipEntries();
    loadInsuranceEntries();
    loadTravelEntries();
    loadHealthEntries();
    loadSubjects();
    loadHomeEntries();
    loadEvents();
  }, [loadGameState, loadTasks, loadHabits, loadEntries, loadFinanceEntries, loadRecipes, loadRelationshipEntries, loadInsuranceEntries, loadTravelEntries, loadHealthEntries, loadSubjects, loadHomeEntries, loadEvents]);
  
  const handleModuleChange = (module: string) => {
    setActiveModule(module);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-warm/20">
      <Header />
      
      <main className="pb-20 md:pb-0">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-matcha-dark to-matcha-light text-white py-8 px-6 md:px-8 shadow-md">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-2">
              {getGreeting()}, {user?.name?.split(' ')[0] || 'Cestovateli'}!
            </h2>
            <p className="text-lg opacity-90">
              Vítej zpět v lese Emerald 🌿
            </p>
          </div>
        </div>
        
        {/* Status Bar */}
        <StatusBar />
        
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          {activeModule === 'map' && (
            <div>
              <h3 className="text-2xl font-bold text-matcha-dark mb-6">
                🗺️ Mapa vesnice
              </h3>
              <EmeraldMap onBuildingClick={handleModuleChange} />
            </div>
          )}
          
          {activeModule === 'tasks' && <TaskList />}
          
          {activeModule === 'calendar' && <CalendarView />}
          
          {activeModule === 'habits' && <HabitList />}
          
          {activeModule === 'diary' && <DiaryList />}
          
          {activeModule === 'finance' && <FinanceList />}
          
          {activeModule === 'food' && <FoodList />}
          
          {activeModule === 'relationships' && <RelationshipList />}
          
          {activeModule === 'insurance' && <InsuranceList />}
          
          {activeModule === 'travel' && <TravelList />}
          
          {activeModule === 'health' && <HealthList />}
          
          {activeModule === 'learning' && <LearningList />}
          
          {activeModule === 'home' && <HomeList />}
          
          {activeModule === 'stats' && <StatsView />}
          
          {activeModule === 'more' && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">≡</div>
              <h3 className="text-2xl font-bold text-matcha-dark mb-2">Další moduly</h3>
              <div className="max-w-md mx-auto space-y-4 mt-6">
                <button
                  onClick={() => setActiveModule('stats')}
                  className="w-full px-6 py-4 bg-gradient-to-r from-matcha-dark to-[#8BAA7E] text-white rounded-kawaii hover:scale-105 hover:shadow-lg transition-all duration-200 active:scale-[0.98] text-lg font-medium"
                >
                  📊 Statistiky
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      {/* Bottom Navigation (Mobile) */}
      <BottomNav activeModule={activeModule} onModuleChange={handleModuleChange} />
    </div>
  );
};
