# TicTacToe — Ocean Professional

A modern, accessible, GxP-friendly TicTacToe implemented with Next.js App Router and Tailwind CSS.

## Features
- Two modes: Player vs Player and Player vs Computer (simple AI).
- Core logic with winner/draw detection and move validation.
- Lightweight audit logging stubs capturing CREATE/UPDATE/DELETE with before/after and timestamps.
- ErrorBoundary for graceful failures.
- Accessible UI (ARIA roles, labels, focusable controls).
- Unit tests for logic, AI, and validation.
- Ocean Professional theme (primary #2563EB, secondary/success #F59E0B, error #EF4444, background #f9fafb, surface #ffffff, text #111827).

## Getting Started

Install dependencies and run the dev server:
```bash
npm install
npm run dev
```
Open http://localhost:3000.

## Tests
Run unit tests (Vitest):
```bash
# if not already installed (CI will install from devDependencies)
npm install
npm run test
```

## Structure
- src/lib/game/types.ts — Types and initial state
- src/lib/game/logic.ts — Winner/draw detection, applyMove, helpers
- src/lib/game/ai.ts — Simple AI
- src/lib/validation.ts — Input validators
- src/lib/audit/logger.ts — Audit log stubs
- src/lib/security/access.ts — Access control stub
- src/components/* — UI components
- src/app/page.tsx — Main UI
- tests/unit/* — Unit tests

## Audit Notes
- Logs include: userId (anonymous), actionType, details, before/after, timestampISO.
- Replace console-based logging with a secure sink for production.

## Accessibility
- Board uses role="grid" and role="gridcell".
- Buttons have aria-labels and focus outlines.

## Assumptions
- No backend or authentication; userId stubbed as "anonymous".
- State is in-memory for current session.
