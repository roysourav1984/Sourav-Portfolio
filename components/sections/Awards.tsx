'use client';

import Link from 'next/link';
import SectionHeader from '../ui/SectionHeader';
import type { Award } from '@/lib/types';

interface AwardsProps {
  data: Award[];
}

export default function Awards({ data }: AwardsProps) {
  const sortedData = [...data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const displayedAwards = sortedData.slice(0, 4);
  const hasMore = sortedData.length > 4;

  return (
    <section className="px-gutter-xs sm:px-gutter-sm md:px-gutter-md lg:px-gutter-lg py-8 sm:py-12 md:py-16 bg-paper">
      <SectionHeader eyebrow="RECOGNITION" title="Awards & Honors" />

      {sortedData && sortedData.length > 0 ? (
        <>
          <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {displayedAwards.map((award) => (
              <div key={award.id} className="border-l-4 border-accent pl-4 sm:pl-6">
                <h3 className="text-heading-xs sm:text-heading-sm font-display text-ink">
                  {award.title}
                </h3>
                <p className="text-body-xs sm:text-body-sm text-mid mt-1">
                  {award.org}
                </p>
                {award.description && (
                  <p className="text-body-xs sm:text-body-sm text-ink mt-2 leading-relaxed">
                    {award.description}
                  </p>
                )}
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="mt-8 sm:mt-12 flex justify-center">
              <Link
                href="/recognition"
                className="text-body-sm sm:text-body-md text-accent hover:text-accent/80 font-display underline"
              >
                View All Awards
              </Link>
            </div>
          )}
        </>
      ) : (
        <div className="mt-8 sm:mt-12 text-center text-body-md text-mid italic">
          No awards defined yet
        </div>
      )}
    </section>
  );
}
