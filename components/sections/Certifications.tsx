'use client';

import Link from 'next/link';
import SectionHeader from '../ui/SectionHeader';
import type { Certification } from '@/lib/types';

interface CertificationsProps {
  data: Certification[];
}

export default function Certifications({ data }: CertificationsProps) {
  const sortedData = [...data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const displayedCerts = sortedData.slice(0, 4);
  const hasMore = sortedData.length > 4;

  return (
    <section className="px-gutter-xs sm:px-gutter-sm md:px-gutter-md lg:px-gutter-lg py-8 sm:py-12 md:py-16 bg-paper">
      <SectionHeader eyebrow="CREDENTIALS" title="Certifications" />

      {sortedData && sortedData.length > 0 ? (
        <>
          <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {displayedCerts.map((cert) => (
              <div key={cert.id} className="border-l-4 border-accent pl-4 sm:pl-6">
                <h3 className="text-heading-xs sm:text-heading-sm font-display text-ink">
                  {cert.name}
                </h3>
                <p className="text-body-xs sm:text-body-sm text-mid mt-1">
                  {cert.issuer}
                </p>
                {cert.year && (
                  <p className="text-body-xs text-mid mt-2 italic">
                    {cert.year}
                  </p>
                )}
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="mt-8 sm:mt-12 flex justify-center">
              <Link
                href="/credentials"
                className="text-body-sm sm:text-body-md text-accent hover:text-accent/80 font-display underline"
              >
                View All Certifications
              </Link>
            </div>
          )}
        </>
      ) : (
        <div className="mt-8 sm:mt-12 text-center text-body-md text-mid italic">
          No certifications defined yet
        </div>
      )}
    </section>
  );
}
