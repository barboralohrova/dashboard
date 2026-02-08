import React from 'react';
import { useGameStore } from '../../stores/gameStore';
import { Modal } from '../ui';

interface LevelUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({ isOpen, onClose }) => {
  const { level, odemnuta_stvoreni, odemnute_dekorace } = useGameStore();
  
  // Získat poslední odemčení pro tento level
  const newUnlocks = {
    creatures: odemnuta_stvoreni.slice(-1),
    decorations: odemnute_dekorace.slice(-1),
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <div className="text-center py-8">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-4xl font-bold text-matcha-dark mb-4">
          Level Up!
        </h2>
        <p className="text-2xl text-gray-700 mb-8">
          Gratulujeme! Dosáhli jste levelu <span className="font-bold text-matcha-dark">{level}</span>!
        </p>
        
        {(newUnlocks.creatures.length > 0 || newUnlocks.decorations.length > 0) && (
          <div className="bg-warm rounded-kawaii p-6 mb-6">
            <p className="font-semibold text-matcha-dark mb-4">Nově odemčeno:</p>
            <div className="space-y-2">
              {newUnlocks.creatures.map((creature) => (
                <div key={creature} className="text-lg">
                  ✨ {creature}
                </div>
              ))}
              {newUnlocks.decorations.map((decoration) => (
                <div key={decoration} className="text-lg">
                  ✨ {decoration}
                </div>
              ))}
            </div>
          </div>
        )}
        
        <button
          onClick={onClose}
          className="px-8 py-3 bg-matcha-dark text-white rounded-kawaii hover:scale-105 transition-transform"
        >
          Pokračovat
        </button>
      </div>
    </Modal>
  );
};
