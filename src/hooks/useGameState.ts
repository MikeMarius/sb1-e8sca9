import { useState, useCallback } from 'react';
import { GameMap, Position, GameItem } from '../types/game';

const INITIAL_MAP: GameMap = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 2, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1],
  [1, 2, 0, 0, 1, 0, 0, 0, 0, 0, 3, 1],
  [1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 4, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

export const useGameState = () => {
  const [playerPosition, setPlayerPosition] = useState<Position>([1, 1]);
  const [gameMap, setGameMap] = useState<GameMap>(INITIAL_MAP);
  const [inventory, setInventory] = useState<GameItem[]>([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('Welcome to Spectrum Quest!');
  const [gameComplete, setGameComplete] = useState(false);
  const [moves, setMoves] = useState(0);

  const showMessage = (text: string, duration = 3000) => {
    setMessage(text);
    setTimeout(() => setMessage(''), duration);
  };

  const addScore = (points: number, reason: string) => {
    setScore(prev => prev + points);
    showMessage(`${reason} (+${points} points)`);
  };

  const collectItem = useCallback((itemType: number, position: Position) => {
    const [row, col] = position;
    
    if (itemType === 2) { // Key
      setInventory(prev => [...prev, 'key']);
      setGameMap(prev => {
        const newMap = [...prev];
        newMap[row][col] = 0;
        return newMap;
      });
      addScore(100, 'You found a key!');
    }
  }, []);

  const movePlayer = useCallback((deltaRow: number, deltaCol: number) => {
    if (gameComplete) return;

    setPlayerPosition(([row, col]) => {
      const newRow = row + deltaRow;
      const newCol = col + deltaCol;
      
      // Check bounds and walls
      if (
        newRow >= 0 && newRow < gameMap.length &&
        newCol >= 0 && newCol < gameMap[0].length &&
        gameMap[newRow][newCol] !== 1
      ) {
        const targetCell = gameMap[newRow][newCol];
        setMoves(prev => prev + 1);

        // Handle different cell types
        switch (targetCell) {
          case 2: // Key
            collectItem(2, [newRow, newCol]);
            return [newRow, newCol];
          
          case 3: // Lock
            if (inventory.includes('key')) {
              setInventory(prev => prev.filter((_, idx) => idx !== 0));
              setGameMap(prev => {
                const newMap = [...prev];
                newMap[newRow][newCol] = 0;
                return newMap;
              });
              addScore(200, 'Door unlocked!');
              return [newRow, newCol];
            } else {
              showMessage('You need a key to unlock this door!');
              return [row, col];
            }
          
          case 4: // Exit
            setGameComplete(true);
            addScore(500 + Math.max(0, 1000 - moves * 10), 'Level Complete!');
            return [newRow, newCol];
          
          default:
            return [newRow, newCol];
        }
      }
      return [row, col];
    });
  }, [gameMap, inventory, collectItem, gameComplete, moves]);

  return {
    playerPosition,
    inventory,
    gameMap,
    score,
    movePlayer,
    collectItem,
    message,
    gameComplete,
    moves
  };
};