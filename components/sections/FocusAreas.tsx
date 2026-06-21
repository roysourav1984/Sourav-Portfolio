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
  const sortedData = [...data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
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
    hidden: { opacity: 0, y: 20, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section className="px-gutter-xs sm:px-gutter-sm md:px-gutter-md lg:px-gutter-lg py-8 sm:py-12 md:py-16 bg-paper">
      <SectionHeader eyebrow="CORE AREAS" title="Focus Areas" />

      {sortedData && sortedData.length > 0 ? (
        <motion.div
          className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          variants={prefersReducedMotion ? {} : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {sortedData.map((area, index) => (
            <motion.div key={area.id} variants={itemVariants}>
              <Card hoverable className="hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="flex items-start gap-4 mb-2">
                  <span className="text-display-lg font-display text-rule flex-shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-heading-md font-display text-ink">
                    {area.title}
                  </h3>
                </div>
                <p className="text-body-sm text-mid mb-4 ml-14">
                  {area.description}
                </p>
                {area.stat && (
                  <p className="text-body-sm text-accent font-medium border-t border-rule pt-3 mt-3 ml-14">
                    {area.stat}
                  </p>
                )}
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="mt-12 text-center text-body-md text-mid italic">
          No focus areas defined yet
        </div>
      )}
    </section>
  );
}
