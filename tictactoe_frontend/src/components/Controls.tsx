'use client';

import React from 'react';
import type { GameMode, Player } from '@/lib/game/types';
import { safeParseMode } from '@/lib/validation';

type Props = {
  mode: GameMode;
  currentPlayer: Player;
  started: boolean;
  onModeChange: (mode: GameMode) => void;
  onStart: () => void;
  onReset: () => void;
};

export function Controls({
  mode,
  currentPlayer,
  started,
  onModeChange,
  onStart,
  onReset,
}: Props) {
  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = safeParseMode(e.target.value, mode);
    onModeChange(next);
  };

  return (
    <div className="flex w-full flex-col items-center gap-3 rounded-lg bg-white p-4 shadow-sm md:flex-row md:justify-between">
      <div className="flex items-center gap-3">
        <label htmlFor="mode" className="text-sm font-medium text-gray-700">
          Mode
        </label>
        <select
          id="mode"
          aria-label="Game mode selection"
          value={mode}
          onChange={handleModeChange}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="pvp">Player vs Player</option>
          <option value="cpu">Player vs Computer</option>
        </select>
      </div>

      <div className="flex items-center gap-3">
        <span
          aria-live="polite"
          className="text-sm text-gray-700"
        >
          Current Player: <span className="font-semibold text-gray-900">{currentPlayer}</span>
        </span>
        {!started ? (
          <button
            aria-label="Start game"
            onClick={onStart}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Start
          </button>
        ) : (
          <button
            aria-label="Reset game"
            onClick={onReset}
            className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 shadow hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
