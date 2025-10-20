import { describe, it, expect } from 'vitest';
import { evaluateBoard, availableMoves, applyMove, nextPlayer, isLegalMove } from '@/lib/game/logic';
import { createEmptyBoard } from '@/lib/game/types';

describe('Game Logic', () => {
  it('detects no winner on empty board and not draw', () => {
    const board = createEmptyBoard();
    const outcome = evaluateBoard(board);
    expect(outcome.winner).toBeNull();
    expect(outcome.isDraw).toBe(false);
  });

  it('detects winner in a row', () => {
    const board = ['X','X','X', null, null, null, null, null, null] as const;
    const outcome = evaluateBoard([...board]);
    expect(outcome.winner).toBe('X');
    expect(outcome.isDraw).toBe(false);
    expect(outcome.line).toEqual([0,1,2]);
  });

  it('detects draw when full and no winner', () => {
    const board = ['X','O','X','X','O','O','O','X','X'] as const;
    const outcome = evaluateBoard([...board]);
    expect(outcome.winner).toBeNull();
    expect(outcome.isDraw).toBe(true);
  });

  it('lists available moves correctly', () => {
    const board = ['X', null, 'O', null, 'X', null, null, null, null];
    expect(availableMoves(board as any).sort()).toEqual([1,3,5,6,7,8]);
  });

  it('applies a legal move and throws for occupied', () => {
    const board = createEmptyBoard();
    const next = applyMove(board, { index: 0, player: 'X' });
    expect(next[0]).toBe('X');
    expect(() => applyMove(next, { index: 0, player: 'O' })).toThrow();
  });

  it('switches players', () => {
    expect(nextPlayer('X')).toBe('O');
    expect(nextPlayer('O')).toBe('X');
  });

  it('validates legal move check', () => {
    const board = createEmptyBoard();
    expect(isLegalMove(board, 4)).toBe(true);
    const next = applyMove(board, { index: 4, player: 'X' });
    expect(isLegalMove(next, 4)).toBe(false);
  });
});
