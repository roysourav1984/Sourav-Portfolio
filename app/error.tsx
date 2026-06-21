'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Page error:', error);
  }, [error]);

  return (
    <div className="px-gutter-xs sm:px-gutter-sm md:px-gutter-md lg:px-gutter-lg py-16 text-center min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-display-md sm:text-display-lg font-display text-ink mb-4">
        Something went wrong
      </h1>
      <p className="text-body-md sm:text-body-lg text-mid mb-8 max-w-2xl">
        We encountered an unexpected error. Please try again or contact support if the problem persists.
      </p>
      <button
        onClick={reset}
        className="px-6 py-3 bg-accent text-paper font-medium rounded-xs hover:bg-ink transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
