import React from 'react';
import { Key } from 'lucide-react';

interface InventoryProps {
  inventory: string[];
}

export const Inventory: React.FC<InventoryProps> = ({ inventory }) => {
  return (
    <div className="bg-indigo-900 p-4 rounded-lg border-2 border-indigo-400">
      <h2 className="text-xl font-bold mb-2">Inventory</h2>
      <div className="flex gap-2 flex-wrap">
        {inventory.map((item, index) => (
          <div
            key={index}
            className="w-10 h-10 bg-indigo-800 rounded-lg flex items-center justify-center"
          >
            {item === 'key' && <Key className="w-6 h-6 text-yellow-300" />}
          </div>
        ))}
        {inventory.length === 0 && (
          <p className="text-sm text-indigo-400">No items collected</p>
        )}
      </div>
    </div>
  );
};