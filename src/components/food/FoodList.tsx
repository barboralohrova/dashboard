import React, { useState } from 'react';
import { useFoodStore } from '../../stores/foodStore';
import { FoodCard } from './FoodCard';
import { FoodForm } from './FoodForm';
import { Button } from '../ui';
import type { MealType } from '../../types';

const MEAL_FILTERS: { value: MealType | 'vse'; emoji: string; label: string }[] = [
  { value: 'vse', emoji: '✨', label: 'Vše' },
  { value: 'snidane', emoji: '🌅', label: 'Snídaně' },
  { value: 'obed', emoji: '🍽️', label: 'Oběd' },
  { value: 'vecere', emoji: '🌙', label: 'Večeře' },
  { value: 'svacina', emoji: '🍎', label: 'Svačina' },
  { value: 'dezert', emoji: '🍰', label: 'Dezert' },
  { value: 'napoj', emoji: '☕', label: 'Nápoj' },
];

export const FoodList: React.FC = () => {
  const { recipes, addRecipe, deleteRecipe, toggleFavorite, isLoading } = useFoodStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [mealTypeFilter, setMealTypeFilter] = useState<MealType | 'vse'>('vse');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter recipes
  let filteredRecipes = recipes.filter((recipe) => {
    if (mealTypeFilter !== 'vse' && recipe.typ_jidla !== mealTypeFilter) return false;
    if (showOnlyFavorites && !recipe.oblibene) return false;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return recipe.nazev.toLowerCase().includes(query);
    }
    
    return true;
  });
  
  // Sort: favorites first, then by date
  filteredRecipes = [...filteredRecipes].sort((a, b) => {
    if (a.oblibene && !b.oblibene) return -1;
    if (!a.oblibene && b.oblibene) return 1;
    return new Date(b.datum_pridani).getTime() - new Date(a.datum_pridani).getTime();
  });
  
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-matcha-dark">🍳 Recepty &amp; Jídlo</h2>
        <Button onClick={() => setIsFormOpen(true)} variant="primary">
          + Nový recept
        </Button>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-kawaii p-4 mb-6 shadow-md">
        <div className="space-y-4">
          {/* Meal type filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Typ jídla</label>
            <div className="flex flex-wrap gap-2">
              {MEAL_FILTERS.map(({ value, emoji, label }) => (
                <button
                  key={value}
                  onClick={() => setMealTypeFilter(value)}
                  className={`px-3 py-1.5 rounded-kawaii text-sm flex items-center space-x-1 ${
                    mealTypeFilter === value
                      ? 'bg-matcha-dark text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{emoji}</span>
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Favorite toggle and search */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showOnlyFavorites}
                  onChange={(e) => setShowOnlyFavorites(e.target.checked)}
                  className="w-5 h-5 rounded border-2 border-matcha-dark"
                />
                <span className="text-sm">❤️ Pouze oblíbené</span>
              </label>
            </div>
            
            <div className="flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Hledat recept..."
                className="w-full px-4 py-2 rounded-kawaii border-2 border-gray-200 focus:border-matcha-dark focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Loading state */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Načítám recepty...</p>
        </div>
      )}
      
      {/* Recipes grid */}
      {!isLoading && filteredRecipes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRecipes.map((recipe) => (
            <FoodCard
              key={recipe.id}
              recipe={recipe}
              onDelete={deleteRecipe}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
      
      {/* Empty state */}
      {!isLoading && filteredRecipes.length === 0 && recipes.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🍽️</div>
          <p className="text-xl text-gray-600 mb-2">Zatím žádné recepty</p>
          <p className="text-gray-500 mb-6">Přidej své oblíbené recepty a získej +10 XP za každý!</p>
          <Button onClick={() => setIsFormOpen(true)} variant="primary">
            Přidat první recept
          </Button>
        </div>
      )}
      
      {/* Empty filter results */}
      {!isLoading && filteredRecipes.length === 0 && recipes.length > 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-xl text-gray-600 mb-2">Žádné recepty</p>
          <p className="text-gray-500">Zkus změnit filtr nebo hledaný výraz</p>
        </div>
      )}
      
      {/* Form Modal */}
      <FoodForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={addRecipe}
      />
    </div>
  );
};
