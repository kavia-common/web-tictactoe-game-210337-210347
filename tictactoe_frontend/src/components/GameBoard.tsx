'use client';

import React from 'react';
import type { Board } from '@/lib/game/types';

type Props = {
  board: Board;
  onCellClick: (index: number) => void;
  disabled?: boolean;
  winningLine?: number[] | undefined;
};

/**
 * PUBLIC_INTERFACE
 * renderPiece
 * This helper maps game values ('X'/'O') to presentational chess icons with accessible labels.
 */
function renderPiece(cell: 'X' | 'O' | null) {
  if (cell === 'X') {
    // Knight for player X - primary color
    return (
      <span
        role="img"
        aria-label="Knight"
        className="select-none leading-none"
        style={{ color: 'var(--color-primary)' }}
      >
        <span className="text-5xl sm:text-6xl md:text-7xl">♞</span>
      </span>
    );
  }
  if (cell === 'O') {
    // Queen for player O - secondary color
    return (
      <span
        role="img"
        aria-label="Queen"
        className="select-none leading-none"
        style={{ color: 'var(--color-secondary)' }}
      >
        <span className="text-5xl sm:text-6xl md:text-7xl">♛</span>
      </span>
    );
  }
  return null;
}

export function GameBoard({ board, onCellClick, disabled, winningLine }: Props) {
  return (
    <div
      role="grid"
      aria-label="TicTacToe board"
      className="grid aspect-square w-full max-w-md grid-cols-3 gap-2 p-2"
    >
      {board.map((cell, idx) => {
        const isWinning = winningLine?.includes(idx);
        const baseColors = isWinning
          ? 'border-amber-400 bg-amber-50'
          : 'border-gray-200 bg-white';
        const interactivity = disabled
          ? 'cursor-not-allowed opacity-75'
          : 'hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400';

        return (
          <button
            key={idx}
            role="gridcell"
            aria-label={`Cell ${idx}${cell ? ` occupied by ${cell === 'X' ? 'Knight' : 'Queen'}` : ''}`}
            onClick={() => !disabled && onCellClick(idx)}
            className={`flex aspect-square items-center justify-center rounded-lg border transition-colors ${baseColors} ${interactivity}`}
          >
            {renderPiece(cell)}
          </button>
        );
      })}
    </div>
  );
}
