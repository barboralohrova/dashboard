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
  }, [loadGameState, loadTasks, loadHabits, loadEntries, loadFinanceEntries, loadRecipes, loadRelationshipEntries, loadInsuranceEntries, loadTravelEntries]);
  
  const handleModuleChange = (module: string) => {
    setActiveModule(module);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-warm/20">
      <Header />
      
      <main className="pb-20 md:pb-0">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-matcha-dark to-matcha-light text-white py-8 px-6 shadow-md">
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
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          {activeModule === 'map' && (
            <div>
              <h3 className="text-2xl font-bold text-matcha-dark mb-6">
                🗺️ Mapa vesnice
              </h3>
              <EmeraldMap onBuildingClick={handleModuleChange} />
            </div>
          )}
          
          {activeModule === 'tasks' && <TaskList />}
          
          {activeModule === 'calendar' && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-2xl font-bold text-matcha-dark mb-2">Kalendář</h3>
              <p className="text-gray-600">Brzy k dispozici...</p>
            </div>
          )}
          
          {activeModule === 'habits' && <HabitList />}
          
          {activeModule === 'diary' && <DiaryList />}
          
          {activeModule === 'finance' && <FinanceList />}
          
          {activeModule === 'food' && <FoodList />}
          
          {activeModule === 'relationships' && <RelationshipList />}
          
          {activeModule === 'insurance' && <InsuranceList />}
          
          {activeModule === 'travel' && <TravelList />}
          
          {activeModule === 'more' && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">≡</div>
              <h3 className="text-2xl font-bold text-matcha-dark mb-2">Další moduly</h3>
              <p className="text-gray-600">Více modulů brzy k dispozici...</p>
            </div>
          )}
          
          {/* Other modules */}
          {['learning', 'home', 'health'].includes(activeModule) && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏗️</div>
              <h3 className="text-2xl font-bold text-matcha-dark mb-2">
                {activeModule.charAt(0).toUpperCase() + activeModule.slice(1)}
              </h3>
              <p className="text-gray-600">Tento modul je ve vývoji</p>
              <button
                onClick={() => setActiveModule('map')}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-matcha-dark to-[#8BAA7E] text-white rounded-kawaii hover:scale-105 hover:shadow-lg transition-all duration-200 active:scale-[0.98]"
              >
                Zpět na mapu
              </button>
            </div>
          )}
        </div>
      </main>
      
      {/* Bottom Navigation (Mobile) */}
      <BottomNav activeModule={activeModule} onModuleChange={handleModuleChange} />
    </div>
  );
};
