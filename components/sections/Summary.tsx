import SectionHeader from '../ui/SectionHeader';
import type { SummaryContent } from '@/lib/types';

interface SummaryProps {
  data: SummaryContent;
}

export default function Summary({ data }: SummaryProps) {
  return (
    <section id="summary" className="px-gutter-xs sm:px-gutter-sm md:px-gutter-md lg:px-gutter-lg py-8 sm:py-12 md:py-16 bg-paper">
      <SectionHeader eyebrow="ABOUT" title="Professional Summary" />

      <div className="mt-8 sm:mt-12 max-w-3xl space-y-4 sm:space-y-6">
        {data.paragraphs && data.paragraphs.length > 0 ? (
          <>
            {data.paragraphs.map((para, idx) => (
              <p key={idx} className="text-body-md sm:text-body-lg text-ink leading-relaxed">
                {para}
              </p>
            ))}

            {data.pullQuote && (
              <blockquote className="mt-8 sm:mt-12 pl-4 sm:pl-6 border-l-4 border-accent">
                <p className="text-heading-sm sm:text-heading-md font-display text-accent italic">
                  "{data.pullQuote}"
                </p>
              </blockquote>
            )}
          </>
        ) : (
          <p className="text-body-md text-mid italic">No summary content provided</p>
        )}
      </div>
    </section>
  );
}
