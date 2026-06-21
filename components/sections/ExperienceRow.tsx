import Link from 'next/link';
import type { ExperienceRole } from '@/lib/types';

interface ExperienceRowProps {
  role: ExperienceRole;
}

export default function ExperienceRow({ role }: ExperienceRowProps) {
  const dateRange = `${role.startDate} — ${role.endDate}`;

  return (
    <Link href={`/experience/${role.slug}`}>
      <div className="group flex gap-6 pb-8 cursor-pointer hover:bg-paper transition-colors">
        {/* Accent Bar */}
        <div className="w-1 bg-accent flex-shrink-0" />

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-baseline justify-between gap-4 mb-2">
            <h3 className="text-heading-md font-display text-ink">
              {role.title}
            </h3>
            <span className="text-body-sm text-mid flex-shrink-0">
              {dateRange}
            </span>
          </div>

          <p className="text-body-sm text-mid mb-2">
            {role.org}
          </p>

          <p className="text-body-md text-ink leading-relaxed">
            {role.summary}
          </p>
        </div>
      </div>
    </Link>
  );
}
