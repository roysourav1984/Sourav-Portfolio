'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import InitiativeCard from './InitiativeCard';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { Initiative } from '@/lib/types';

interface InitiativesProps {
  data: Initiative[];
}

export default function Initiatives({ data }: InitiativesProps) {
  const MAX_DISPLAY = 6;
  const sortedData = [...data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const displayedInitiatives = sortedData.slice(0, MAX_DISPLAY);
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
    <section id="initiatives" className="px-gutter-xs sm:px-gutter-sm md:px-gutter-md lg:px-gutter-lg py-8 sm:py-12 md:py-16 bg-paper">
      <SectionHeader eyebrow="FEATURED" title="Initiatives" />

      {sortedData && sortedData.length > 0 ? (
        <>
          <motion.div
            className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            variants={prefersReducedMotion ? {} : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {displayedInitiatives.map((initiative) => (
              <motion.div key={initiative.id} variants={itemVariants}>
                <InitiativeCard initiative={initiative} />
              </motion.div>
            ))}
          </motion.div>

          {hasMore && (
            <div className="mt-8 sm:mt-12 text-center">
              <Link
                href="/initiatives"
                className="text-body-sm sm:text-body-md text-accent hover:text-ink border-b-2 border-accent hover:border-ink transition-colors pb-1"
              >
                View All Initiatives
              </Link>
            </div>
          )}
        </>
      ) : (
        <div className="mt-8 sm:mt-12 text-center text-body-md text-mid italic">
          No initiatives defined yet
        </div>
      )}
    </section>
  );
}
