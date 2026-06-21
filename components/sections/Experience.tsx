'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import ExperienceRow from './ExperienceRow';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { ExperienceRole } from '@/lib/types';

interface ExperienceProps {
  data: ExperienceRole[];
}

export default function Experience({ data }: ExperienceProps) {
  const MAX_DISPLAY = 3;
  const sortedRoles = [...data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const displayedRoles = sortedRoles.slice(0, MAX_DISPLAY);
  const hasMore = sortedRoles.length > MAX_DISPLAY;
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section id="experience" className="px-gutter-xs sm:px-gutter-sm md:px-gutter-md lg:px-gutter-lg py-8 sm:py-12 md:py-16 bg-paper">
      <SectionHeader eyebrow="CAREER" title="Experience Timeline" />

      {sortedRoles && sortedRoles.length > 0 ? (
        <>
          <motion.div
            className="mt-8 sm:mt-12 space-y-1 divide-y divide-rule"
            variants={prefersReducedMotion ? {} : containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {displayedRoles.map((role) => (
              <motion.div key={role.id} variants={itemVariants}>
                <ExperienceRow role={role} />
              </motion.div>
            ))}
          </motion.div>

          {hasMore && (
            <div className="mt-8 sm:mt-12 text-center">
              <Link
                href="/experience"
                className="text-body-sm sm:text-body-md text-accent hover:text-ink border-b-2 border-accent hover:border-ink transition-colors pb-1"
              >
                View All Experience
              </Link>
            </div>
          )}
        </>
      ) : (
        <div className="mt-8 sm:mt-12 text-center text-body-md text-mid italic">
          No experience entries defined yet
        </div>
      )}
    </section>
  );
}
