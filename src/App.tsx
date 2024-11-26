import React, { useEffect } from 'react';
import { Ghost, Key, Lock, Boxes } from 'lucide-react';
import { GameBoard } from './components/GameBoard';
import { Inventory } from './components/Inventory';
import { InfoPanel } from './components/InfoPanel';
import { useGameState } from './hooks/useGameState';

function App() {
  const {
    playerPosition,
    inventory,
    gameMap,
    score,
    movePlayer,
    message,
    gameComplete,
    moves
  } = useGameState();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const moves: Record<string, [number, number]> = {
        'arrowup': [-1, 0],
        'arrowdown': [1, 0],
        'arrowleft': [0, -1],
        'arrowright': [0, 1],
        'w': [-1, 0],
        's': [1, 0],
        'a': [0, -1],
        'd': [0, 1]
      };
      
      if (key in moves && !gameComplete) {
        e.preventDefault();
        movePlayer(moves[key][0], moves[key][1]);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [movePlayer, gameComplete]);

  return (
    <div className="min-h-screen bg-indigo-950 text-green-400 p-4 font-mono">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold animate-pulse mb-2">
            Spectrum Quest
          </h1>
          <p className="text-green-500">A Retro Puzzle Adventure</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <GameBoard
              gameMap={gameMap}
              playerPosition={playerPosition}
            />
          </div>
          
          <div className="space-y-6">
            <InfoPanel 
              score={score} 
              message={message} 
              moves={moves}
            />
            <Inventory inventory={inventory} />
            
            {gameComplete && (
              <div className="bg-green-900 p-4 rounded-lg border-2 border-green-400 animate-bounce">
                <h2 className="text-xl font-bold mb-2">🎉 Level Complete!</h2>
                <p className="mb-2">Final Score: {score}</p>
                <p className="text-sm">Completed in {moves} moves</p>
              </div>
            )}
            
            <div className="bg-indigo-900 p-4 rounded-lg border-2 border-indigo-400">
              <h2 className="text-xl font-bold mb-2">How to Play</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Use arrow keys or WASD to move</li>
                <li>Collect keys to unlock doors</li>
                <li>Reach the exit to win</li>
                <li>Less moves = Higher score!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;