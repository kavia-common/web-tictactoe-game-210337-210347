import React from 'react';
import type { GameOutcome } from '@/lib/game/types';

type Props = {
  outcome: GameOutcome | null;
};

export function OutcomeBanner({ outcome }: Props) {
  if (!outcome) return null;
  const text =
    outcome.winner ? `Winner: ${outcome.winner}` : outcome.isDraw ? 'Game ended in a draw' : '';

  const tone = outcome.winner ? 'bg-amber-50 text-amber-800 border-amber-200' : 'bg-blue-50 text-blue-800 border-blue-200';

  return (
    <div
      role="status"
      aria-live="polite"
      className={`mt-4 w-full rounded-md border ${tone} px-4 py-3`}
    >
      <span className="font-medium">{text}</span>
    </div>
  );
}
