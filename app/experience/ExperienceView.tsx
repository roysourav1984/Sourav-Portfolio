'use client';

import { motion } from 'framer-motion';
import ExperienceRow from '@/components/sections/ExperienceRow';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { ExperienceRole } from '@/lib/types';

interface ExperienceViewProps {
  items: ExperienceRole[];
}

export default function ExperienceView({ items }: ExperienceViewProps) {
  const sortedItems = [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
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
    <motion.div
      className="space-y-1 divide-y divide-rule"
      variants={prefersReducedMotion ? {} : containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {sortedItems.map((role) => (
        <motion.div key={role.id} variants={itemVariants}>
          <ExperienceRow role={role} />
        </motion.div>
      ))}
    </motion.div>
  );
}
