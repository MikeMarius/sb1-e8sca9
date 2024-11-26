import React from 'react';
import { Ghost, Key, Lock, Box } from 'lucide-react';

interface GameBoardProps {
  gameMap: number[][];
  playerPosition: [number, number];
}

export const GameBoard: React.FC<GameBoardProps> = ({ gameMap, playerPosition }) => {
  const getCellContent = (value: number, rowIndex: number, colIndex: number) => {
    const isPlayer = rowIndex === playerPosition[0] && colIndex === playerPosition[1];
    
    if (isPlayer) {
      return <Ghost className="w-6 h-6 text-yellow-400 animate-bounce" />;
    }

    switch (value) {
      case 1: // Wall
        return <div className="w-full h-full bg-indigo-700 rounded-sm" />;
      case 2: // Key
        return <Key className="w-6 h-6 text-yellow-300" />;
      case 3: // Lock
        return <Lock className="w-6 h-6 text-red-400" />;
      case 4: // Box
        return <Box className="w-6 h-6 text-brown-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-indigo-900 p-4 rounded-lg border-2 border-indigo-400">
      <div className="grid grid-cols-12 gap-1">
        {gameMap.map((row, rowIndex) => (
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="aspect-square flex items-center justify-center bg-indigo-800 rounded-sm transition-colors hover:bg-indigo-700"
            >
              {getCellContent(cell, rowIndex, colIndex)}
            </div>
          ))
        ))}
      </div>
    </div>
  );
};