'use client';

import { motion } from 'framer-motion';
import InitiativeCard from '@/components/sections/InitiativeCard';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { Initiative } from '@/lib/types';

interface InitiativesViewProps {
  items: Initiative[];
}

export default function InitiativesView({ items }: InitiativesViewProps) {
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
      {sortedItems.map((initiative) => (
        <motion.div key={initiative.id} variants={itemVariants}>
          <InitiativeCard initiative={initiative} />
        </motion.div>
      ))}
    </motion.div>
  );
}
