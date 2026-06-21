'use client';

import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { FocusArea } from '@/lib/types';

interface FocusAreasViewProps {
  items: FocusArea[];
}

export default function FocusAreasView({ items }: FocusAreasViewProps) {
  const sortedItems = [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
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
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
      variants={prefersReducedMotion ? {} : containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {sortedItems.map((area) => (
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
  );
}
