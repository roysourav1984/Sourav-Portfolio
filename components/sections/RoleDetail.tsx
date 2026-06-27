import Link from 'next/link';
import type { ExperienceRole } from '@/lib/types';
import Rule from '../ui/Rule';

interface RoleDetailProps {
  role: ExperienceRole;
}

function formatDate(dateStr: string): string {
  if (dateStr === 'Present') return 'Present';
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  } catch {
    return dateStr;
  }
}

export default function RoleDetail({ role }: RoleDetailProps) {
  return (
    <article className="px-gutter-xs sm:px-gutter-sm md:px-gutter-md lg:px-gutter-lg py-8 sm:py-12 md:py-16">
      {/* Back Link */}
      <Link href="/" className="text-body-xs sm:text-body-sm text-accent hover:underline mb-6 sm:mb-8 inline-block">
        ← Back to Portfolio
      </Link>

      {/* Title & Organization */}
      <div className="mb-4 sm:mb-6">
        <h1 className="text-display-md sm:text-display-lg font-display text-ink">{role.title}</h1>
        <p className="text-heading-sm sm:text-heading-md font-display text-mid mt-2">{role.org}</p>
      </div>

      {/* Meta Row */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-rule">
        <span className="text-body-sm sm:text-body-md font-medium text-ink">
          {formatDate(role.startDate)} – {formatDate(role.endDate)}
        </span>
      </div>

      {/* Summary */}
      <p className="text-heading-xs sm:text-heading-md font-display text-mid mb-8 sm:mb-12">{role.summary}</p>

      <Rule />

      {/* Key Responsibilities */}
      <section className="mt-8 sm:mt-12">
        <h2 className="text-heading-xs sm:text-heading-md font-display text-ink mb-6 sm:mb-8">Key Responsibilities</h2>

        <ul className="space-y-4 sm:space-y-6">
          {role.responsibilities.map((responsibility, idx) => (
            <li key={idx} className="flex gap-3 sm:gap-4">
              <span className="flex-shrink-0 w-1 bg-accent"></span>
              <p className="text-body-sm sm:text-body-md text-ink leading-relaxed">{responsibility}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Closing Rule */}
      <Rule className="mt-12 sm:mt-16" />
    </article>
  );
}
