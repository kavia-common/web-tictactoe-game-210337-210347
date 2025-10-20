'use client';

import React from 'react';
import type { Board } from '@/lib/game/types';

type Props = {
  board: Board;
  onCellClick: (index: number) => void;
  disabled?: boolean;
  winningLine?: number[] | undefined;
};

export function GameBoard({ board, onCellClick, disabled, winningLine }: Props) {
  return (
    <div
      role="grid"
      aria-label="TicTacToe board"
      className="grid aspect-square w-full max-w-md grid-cols-3 gap-2 p-2"
    >
      {board.map((cell, idx) => {
        const isWinning = winningLine?.includes(idx);
        return (
          <button
            key={idx}
            role="gridcell"
            aria-label={`Cell ${idx}`}
            onClick={() => !disabled && onCellClick(idx)}
            className={`flex aspect-square items-center justify-center rounded-lg border text-4xl font-semibold transition-colors
              ${isWinning ? 'border-amber-400 bg-amber-50 text-amber-700' : 'border-gray-200 bg-white text-gray-900'}
              ${disabled ? 'cursor-not-allowed opacity-75' : 'hover:bg-blue-50'}
            `}
          >
            {cell ?? ''}
          </button>
        );
      })}
    </div>
  );
}
