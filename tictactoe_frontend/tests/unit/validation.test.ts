import { describe, it, expect } from 'vitest';
import { validateBoard, validateMoveIndex, validatePlayer, validateMode, safeParseMode } from '@/lib/validation';

describe('Validation', () => {
  it('validates correct board', () => {
    const board = [null,null,null,null,null,null,null,null,null] as any;
    expect(() => validateBoard(board)).not.toThrow();
  });

  it('throws for wrong board length', () => {
    const board = [null] as any;
    expect(() => validateBoard(board)).toThrow();
  });

  it('throws for invalid cell values', () => {
    const board = [null,null,null,null,'Z',null,null,null,null] as any;
    expect(() => validateBoard(board)).toThrow();
  });

  it('validates move index', () => {
    expect(() => validateMoveIndex(0)).not.toThrow();
    expect(() => validateMoveIndex(8)).not.toThrow();
    expect(() => validateMoveIndex(-1)).toThrow();
    expect(() => validateMoveIndex(9)).toThrow();
  });

  it('validates player', () => {
    expect(() => validatePlayer('X' as any)).not.toThrow();
    expect(() => validatePlayer('O' as any)).not.toThrow();
    expect(() => validatePlayer('Z' as any)).toThrow();
  });

  it('validates mode', () => {
    expect(() => validateMode('pvp')).not.toThrow();
    expect(() => validateMode('cpu')).not.toThrow();
    expect(() => validateMode('xyz' as any)).toThrow();
    expect(safeParseMode('cpu')).toBe('cpu');
    expect(safeParseMode('nope' as any, 'pvp')).toBe('pvp');
  });
});
