'use client';

import { motion } from 'framer-motion';
import React, { type ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface MotionSectionProps {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
}

export default function MotionSection({
  children,
  className = '',
  stagger = false,
}: MotionSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: stagger
        ? {
            staggerChildren: 0.1,
            delayChildren: 0.2,
          }
        : {
            duration: 0.6,
          },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  const childArray = React.Children.toArray(children);

  return (
    <motion.div
      className={className}
      variants={prefersReducedMotion ? {} : containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {stagger && !prefersReducedMotion ? (
        <>
          {childArray.map((child, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              {child}
            </motion.div>
          ))}
        </>
      ) : (
        children
      )}
    </motion.div>
  );
}
