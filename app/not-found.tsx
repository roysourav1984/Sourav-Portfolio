import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="px-gutter-xs sm:px-gutter-sm md:px-gutter-md lg:px-gutter-lg py-16 text-center min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-display-md sm:text-display-lg font-display text-ink mb-4">
        404
      </h1>
      <p className="text-heading-sm sm:text-heading-md font-display text-mid mb-2">
        Page Not Found
      </p>
      <p className="text-body-md text-mid mb-8 max-w-2xl">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="text-accent hover:text-ink border-b-2 border-accent hover:border-ink transition-colors text-body-md"
      >
        ← Back to Portfolio
      </Link>
    </div>
  );
}
