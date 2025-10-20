'use client';

import React from 'react';

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
  message?: string;
};

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: unknown): State {
    return { hasError: true, message: error instanceof Error ? error.message : 'An unexpected error occurred' };
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    console.error('UI ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto my-8 max-w-xl rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-red-600">Something went wrong</h2>
          <p className="mt-2 text-sm text-gray-700">{this.state.message}</p>
          <p className="mt-4 text-xs text-gray-500">Please try refreshing the page.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
