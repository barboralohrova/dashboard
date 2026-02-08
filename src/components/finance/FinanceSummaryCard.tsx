import React from 'react';
import type { FinanceSummary } from '../../types';
import { Card } from '../ui';

interface FinanceSummaryCardProps {
  summary: FinanceSummary;
}

export const FinanceSummaryCard: React.FC<FinanceSummaryCardProps> = ({ summary }) => {
  const bilanceColor = summary.mesicniBilance >= 0 ? 'text-green-600' : 'text-red-600';
  const bilanceBg = summary.mesicniBilance >= 0 ? 'bg-green-50' : 'bg-red-50';
  
  return (
    <Card className={`${bilanceBg} border-2 ${summary.mesicniBilance >= 0 ? 'border-green-200' : 'border-red-200'}`}>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 Měsíční přehled</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Income */}
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-1">Příjmy</div>
          <div className="text-2xl font-bold text-green-600">
            +{summary.mesicniPrijmy.toLocaleString('cs-CZ')} Kč
          </div>
        </div>
        
        {/* Expenses */}
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-1">Výdaje</div>
          <div className="text-2xl font-bold text-red-600">
            -{summary.mesicniVydaje.toLocaleString('cs-CZ')} Kč
          </div>
        </div>
        
        {/* Balance */}
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-1">Bilance</div>
          <div className={`text-2xl font-bold ${bilanceColor}`}>
            {summary.mesicniBilance >= 0 ? '+' : ''}{summary.mesicniBilance.toLocaleString('cs-CZ')} Kč
          </div>
        </div>
      </div>
      
      {/* Visual indicator */}
      <div className="mt-4">
        <div className="flex h-3 rounded-full overflow-hidden bg-gray-200">
          {summary.mesicniPrijmy > 0 && (
            <div
              className="bg-green-500"
              style={{
                width: `${(summary.mesicniPrijmy / (summary.mesicniPrijmy + summary.mesicniVydaje)) * 100}%`,
              }}
            />
          )}
          {summary.mesicniVydaje > 0 && (
            <div
              className="bg-red-500"
              style={{
                width: `${(summary.mesicniVydaje / (summary.mesicniPrijmy + summary.mesicniVydaje)) * 100}%`,
              }}
            />
          )}
        </div>
      </div>
    </Card>
  );
};
