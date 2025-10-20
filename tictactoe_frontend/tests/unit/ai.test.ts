import { describe, it, expect } from 'vitest';
import { chooseComputerMove } from '@/lib/game/ai';

describe('AI Chooser', () => {
  it('wins when possible', () => {
    const board = ['O','O',null, null,null,null, null,null,null];
    const move = chooseComputerMove(board as any, 'O');
    expect(move).toBe(2);
  });

  it('blocks opponent winning move', () => {
    const board = ['X','X',null, null,null,null, null,null,null];
    const move = chooseComputerMove(board as any, 'O');
    expect(move).toBe(2);
  });

  it('takes center if available', () => {
    const board = [null,null,null, null,null,null, null,null,null];
    const move = chooseComputerMove(board as any, 'O');
    expect(move).toBe(4);
  });

  it('takes a corner if center not available', () => {
    const board = ['X', null, null, null, 'X', null, null, null, null];
    const move = chooseComputerMove(board as any, 'O');
    expect([0,2,6,8]).toContain(move);
  });

  it('returns null when no moves left', () => {
    const board = ['X','O','X','X','O','O','O','X','X'] as const;
    const move = chooseComputerMove([...board], 'O');
    expect(move).toBeNull();
  });
});
