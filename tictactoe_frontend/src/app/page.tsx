'use client';

import React, { useMemo, useReducer } from 'react';
import { GameBoard } from '@/components/GameBoard';
import { Controls } from '@/components/Controls';
import { OutcomeBanner } from '@/components/OutcomeBanner';
import ErrorBoundary from '@/components/ErrorBoundary';
import type { GameMode, GameState, Player } from '@/lib/game/types';
import { initialGameState } from '@/lib/game/types';
import { applyMove, evaluateBoard, nextPlayer } from '@/lib/game/logic';
import { chooseComputerMove } from '@/lib/game/ai';
import { validateMode } from '@/lib/validation';
import { safeLogAction } from '@/lib/audit/logger';

type Action =
  | { type: 'SET_MODE'; mode: GameMode }
  | { type: 'START' }
  | { type: 'RESET' }
  | { type: 'PLAYER_MOVE'; index: number }
  | { type: 'CPU_MOVE' };

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'SET_MODE': {
      try {
        validateMode(action.mode);
        safeLogAction({
          userId: 'anonymous',
          actionType: 'UPDATE',
          details: { operation: 'setMode', mode: action.mode },
          before: state,
          after: { ...state, mode: action.mode },
          timestampISO: new Date().toISOString(),
        });
      } catch {
        /* ignore audit failures */
      }
      return { ...state, mode: action.mode };
    }
    case 'START': {
      const next = { ...state, started: true, outcome: null, currentPlayer: 'X' as Player };
      safeLogAction({
        userId: 'anonymous',
        actionType: 'CREATE',
        details: { operation: 'startGame', mode: state.mode },
        before: state,
        after: next,
        timestampISO: new Date().toISOString(),
      });
      return next;
    }
    case 'RESET': {
      const reset = initialGameState(state.mode);
      safeLogAction({
        userId: 'anonymous',
        actionType: 'DELETE/RESET',
        details: { operation: 'resetGame' },
        before: state,
        after: reset,
        timestampISO: new Date().toISOString(),
      });
      return reset;
    }
    case 'PLAYER_MOVE': {
      if (!state.started || state.outcome) return state;
      if (state.board[action.index] !== null) return state;

      const board = applyMove(state.board, { index: action.index, player: state.currentPlayer });
      const outcome = evaluateBoard(board);
      if (outcome.winner || outcome.isDraw) {
        return { ...state, board, outcome };
      }
      return { ...state, board, currentPlayer: nextPlayer(state.currentPlayer) };
    }
    case 'CPU_MOVE': {
      if (!state.started || state.outcome || state.mode !== 'cpu') return state;
      // computer plays as 'O' by design; human starts as 'X'
      if (state.currentPlayer !== 'O') return state;

      const idx = chooseComputerMove(state.board, 'O');
      if (idx === null) return state;
      const board = applyMove(state.board, { index: idx, player: 'O' });
      const outcome = evaluateBoard(board);
      if (outcome.winner || outcome.isDraw) {
        return { ...state, board, outcome };
      }
      return { ...state, board, currentPlayer: 'X' };
    }
    default:
      return state;
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialGameState('pvp'));

  const winningLine = useMemo(() => state.outcome?.line, [state.outcome]);

  const handleCellClick = (index: number) => {
    if (!state.started || state.outcome) return;
    if (state.board[index] !== null) return;
    if (state.mode === 'cpu' && state.currentPlayer === 'O') return; // prevent clicking during CPU turn
    dispatch({ type: 'PLAYER_MOVE', index });

    // After human move in CPU mode, schedule AI if game not ended
    setTimeout(() => {
      // After user's move, trigger CPU if applicable; reducer will validate latest state.
      if (state.mode === 'cpu') {
        dispatch({ type: 'CPU_MOVE' });
      }
    }, 50);
  };

  const handleModeChange = (mode: GameMode) => {
    dispatch({ type: 'SET_MODE', mode });
  };

  const handleStart = () => {
    dispatch({ type: 'START' });
  };

  const handleReset = () => {
    dispatch({ type: 'RESET' });
  };

  const disabledBoard = !state.started || !!state.outcome;

  return (
    <ErrorBoundary>
      <main className="min-h-screen">
        <section className="container-narrow">
          <header className="my-8">
            <h1 className="text-3xl font-semibold text-gray-900">TicTacToe</h1>
            <p className="mt-1 text-sm text-gray-600">Ocean Professional — Play vs Player or Computer</p>
          </header>

          <div className="card-surface p-4">
            <Controls
              mode={state.mode}
              currentPlayer={state.currentPlayer}
              started={state.started}
              onModeChange={handleModeChange}
              onStart={handleStart}
              onReset={handleReset}
            />

            <div className="mt-6 flex flex-col items-center">
              <GameBoard
                board={state.board}
                onCellClick={handleCellClick}
                disabled={disabledBoard}
                winningLine={winningLine}
              />
              <OutcomeBanner outcome={state.outcome} />
            </div>
          </div>

          <footer className="my-8 text-center text-xs text-gray-500">
            Built with Next.js 15 and TailwindCSS 4 — Demo only, no external services.
          </footer>
        </section>
      </main>
    </ErrorBoundary>
  );
}
