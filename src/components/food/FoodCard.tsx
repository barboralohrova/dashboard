import React, { useState } from 'react';
import type { JidloEntry, MealType } from '../../types';
import { Card } from '../ui';

interface FoodCardProps {
  recipe: JidloEntry;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

const MEAL_TYPE_EMOJIS: Record<MealType, string> = {
  snidane: '🌅',
  obed: '🍽️',
  vecere: '🌙',
  svacina: '🍎',
  dezert: '🍰',
  napoj: '☕',
};

const MEAL_TYPE_LABELS: Record<MealType, string> = {
  snidane: 'Snídaně',
  obed: 'Oběd',
  vecere: 'Večeře',
  svacina: 'Svačina',
  dezert: 'Dezert',
  napoj: 'Nápoj',
};

export const FoodCard: React.FC<FoodCardProps> = ({ recipe, onDelete, onToggleFavorite }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <Card className="hover:shadow-lg transition-all">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-2xl">{MEAL_TYPE_EMOJIS[recipe.typ_jidla]}</span>
              <h3 className="text-xl font-semibold">{recipe.nazev}</h3>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <span className="flex items-center space-x-1">
                <span>⏱️</span>
                <span>{recipe.cas_pripravy} min</span>
              </span>
              <span className="flex items-center space-x-1">
                <span>🍽️</span>
                <span>{recipe.porce} {recipe.porce === 1 ? 'porce' : 'porce'}</span>
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onToggleFavorite(recipe.id)}
              className="text-2xl hover:scale-110 transition-transform"
            >
              {recipe.oblibene ? '❤️' : '🤍'}
            </button>
            <button
              onClick={() => {
                if (confirm('Opravdu chcete smazat tento recept?')) {
                  onDelete(recipe.id);
                }
              }}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              🗑️
            </button>
          </div>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-matcha-light text-matcha-dark rounded-kawaii text-xs">
            {MEAL_TYPE_LABELS[recipe.typ_jidla]}
          </span>
          {recipe.tagy.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-kawaii text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Expand button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-matcha-dark hover:underline"
        >
          {isExpanded ? '▼ Skrýt recept' : '▶ Zobrazit recept'}
        </button>
        
        {/* Expanded content */}
        {isExpanded && (
          <div className="space-y-4 pt-4 border-t">
            {/* Ingredients */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Ingredience:</h4>
              <ul className="list-disc list-inside space-y-1">
                {recipe.ingredience.map((ing, index) => (
                  <li key={index} className="text-gray-700 text-sm">{ing}</li>
                ))}
              </ul>
            </div>
            
            {/* Instructions */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Postup:</h4>
              <p className="text-gray-700 text-sm whitespace-pre-wrap">{recipe.postup}</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
