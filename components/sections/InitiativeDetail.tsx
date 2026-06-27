import Link from 'next/link';
import type { Initiative } from '@/lib/types';
import Rule from '../ui/Rule';
import Tag from '../ui/Tag';

interface InitiativeDetailProps {
  initiative: Initiative;
}

export default function InitiativeDetail({ initiative }: InitiativeDetailProps) {
  return (
    <article className="px-gutter-xs sm:px-gutter-sm md:px-gutter-md lg:px-gutter-lg py-8 sm:py-12 md:py-16">
      {/* Back Link */}
      <Link href="/" className="text-body-xs sm:text-body-sm text-accent hover:underline mb-6 sm:mb-8 inline-block">
        ← Back to Portfolio
      </Link>

      {/* Title */}
      <h1 className="text-display-md sm:text-display-lg font-display text-ink mb-4 sm:mb-6">{initiative.title}</h1>

      {/* Meta Row */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-rule">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center mb-4 sm:mb-0">
          <span className="text-body-sm sm:text-body-md font-medium text-ink">{initiative.year}</span>
          <div className="flex gap-2 flex-wrap">
            {initiative.tags.map((tag) => (
              <Tag key={tag} label={tag} variant="rule" />
            ))}
          </div>
        </div>
      </div>

      {/* One-Liner */}
      <p className="text-heading-sm sm:text-heading-md font-display text-mid mb-8 sm:mb-12">{initiative.oneLiner}</p>

      <Rule />

      {/* Content Sections */}
      <div className="grid grid-cols-12 gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-12">
        {/* Left Column */}
        <div className="col-span-12 md:col-span-7">
          {/* Context */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-heading-xs sm:text-heading-md font-display text-ink mb-3 sm:mb-4">Context</h2>
            <p className="text-body-sm sm:text-body-md text-ink leading-relaxed whitespace-pre-wrap">
              {initiative.context}
            </p>
          </section>

          {/* Approach */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-heading-xs sm:text-heading-md font-display text-ink mb-3 sm:mb-4">Approach</h2>
            <p className="text-body-sm sm:text-body-md text-ink leading-relaxed whitespace-pre-wrap">
              {initiative.approach}
            </p>
          </section>

          {/* Outcome */}
          <section className="mb-8 sm:mb-12">
            <h2 className="text-heading-xs sm:text-heading-md font-display text-ink mb-3 sm:mb-4">Outcome</h2>
            <p className="text-body-sm sm:text-body-md text-ink leading-relaxed whitespace-pre-wrap">
              {initiative.outcome}
            </p>
          </section>
        </div>

        {/* Right Column - Technologies (hidden on mobile, sticky on desktop) */}
        <div className="hidden md:block md:col-span-5">
          <section className="sticky top-24">
            <h2 className="text-heading-xs sm:text-heading-md font-display text-ink mb-4 sm:mb-6">Technologies & Tools</h2>
            <div className="space-y-2">
              {initiative.technologies.map((tech) => (
                <div key={tech} className="flex items-center gap-2">
                  <span className="text-body-sm text-ink">•</span>
                  <span className="text-body-sm text-ink">{tech}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Closing Rule */}
      <Rule className="mt-12 sm:mt-16" />
    </article>
  );
}
