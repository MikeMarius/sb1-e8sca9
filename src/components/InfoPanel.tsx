import React from 'react';

interface InfoPanelProps {
  score: number;
  message: string;
  moves: number;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ score, message, moves }) => {
  return (
    <div className="bg-indigo-900 p-4 rounded-lg border-2 border-indigo-400">
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Score: {score}</h2>
        <p className="text-sm">Moves: {moves}</p>
      </div>
      {message && (
        <div className="mt-4 text-sm bg-indigo-800 p-2 rounded animate-fade-in">
          {message}
        </div>
      )}
    </div>
  );
};