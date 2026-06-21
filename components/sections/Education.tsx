import SectionHeader from '../ui/SectionHeader';
import type { EducationEntry } from '@/lib/types';

interface EducationProps {
  data: EducationEntry[];
}

export default function Education({ data }: EducationProps) {
  const sortedData = [...data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <section className="px-gutter-xs sm:px-gutter-sm md:px-gutter-md lg:px-gutter-lg py-8 sm:py-12 md:py-16 bg-paper">
      <SectionHeader eyebrow="EDUCATION" title="Academic Background" />

      {sortedData && sortedData.length > 0 ? (
        <div className="mt-8 sm:mt-12 space-y-4 sm:space-y-6">
          {sortedData.map((edu) => (
            <div key={edu.id} className="border-l-4 border-accent pl-4 sm:pl-6">
              <h3 className="text-heading-xs sm:text-heading-sm font-display text-ink">
                {edu.institution}
              </h3>
              <p className="text-body-xs sm:text-body-sm text-mid mt-1">
                {edu.degree}
              </p>
              <p className="text-body-xs text-mid mt-2 italic">
                {edu.year}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 sm:mt-12 text-center text-body-md text-mid italic">
          No education entries defined yet
        </div>
      )}
    </section>
  );
}
