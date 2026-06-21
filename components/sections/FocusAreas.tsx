'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import Card from '../ui/Card';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { FocusArea } from '@/lib/types';

interface FocusAreasProps {
  data: FocusArea[];
}

export default function FocusAreas({ data }: FocusAreasProps) {
  const MAX_DISPLAY = 6;
  const sortedData = [...data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const displayedAreas = sortedData.slice(0, MAX_DISPLAY);
  const hasMore = sortedData.length > MAX_DISPLAY;
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section className="px-gutter-xs sm:px-gutter-sm md:px-gutter-md lg:px-gutter-lg py-8 sm:py-12 md:py-16 bg-paper">
      <SectionHeader eyebrow="CORE AREAS" title="Focus Areas" />

      {sortedData && sortedData.length > 0 ? (
        <>
          <motion.div
            className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            variants={prefersReducedMotion ? {} : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {displayedAreas.map((area) => (
              <motion.div key={area.id} variants={itemVariants}>
                <Card hoverable>
                  <h3 className="text-heading-md font-display text-ink mb-3">
                    {area.title}
                  </h3>
                  <p className="text-body-sm text-mid mb-4">
                    {area.description}
                  </p>
                  {area.stat && (
                    <p className="text-body-sm text-accent font-medium border-t border-rule pt-3 mt-3">
                      {area.stat}
                    </p>
                  )}
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {hasMore && (
            <div className="mt-8 sm:mt-12 text-center">
              <Link
                href="/focus-areas"
                className="text-body-sm sm:text-body-md text-accent hover:text-ink border-b-2 border-accent hover:border-ink transition-colors pb-1"
              >
                View All Focus Areas
              </Link>
            </div>
          )}
        </>
      ) : (
        <div className="mt-12 text-center text-body-md text-mid italic">
          No focus areas defined yet
        </div>
      )}
    </section>
  );
}
