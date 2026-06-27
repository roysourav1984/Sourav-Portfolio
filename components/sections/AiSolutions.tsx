'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { AiSolutionsSection } from '@/lib/types';

interface AiSolutionsProps {
  data: AiSolutionsSection;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function AiSolutions({ data }: AiSolutionsProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="ai-solutions"
      className="bg-dark px-gutter-xs sm:px-gutter-sm md:px-gutter-md lg:px-gutter-lg py-12 sm:py-16 md:py-24"
    >
      <motion.div
        variants={prefersReducedMotion ? {} : containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* Eyebrow */}
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
          <span className="text-meta-md text-accent font-sans uppercase tracking-widest">
            AI · Solutions
          </span>
          <div className="flex-1 border-t border-accent opacity-40" />
        </motion.div>

        {/* Section title */}
        <motion.h2
          variants={itemVariants}
          className="text-display-sm sm:text-display-md font-display font-bold text-paper leading-tight mb-8 sm:mb-10"
        >
          {data.title}
        </motion.h2>

        {/* Intro paragraph — flagship initiative */}
        <motion.p
          variants={itemVariants}
          className="text-body-lg sm:text-heading-xs font-sans text-paper opacity-80 leading-relaxed max-w-4xl mb-12 sm:mb-16 border-l-4 border-accent pl-5 sm:pl-6"
        >
          {data.intro}
        </motion.p>

        {/* Divider label */}
        {data.items.length > 0 && (
          <motion.p
            variants={itemVariants}
            className="text-meta-md text-mid uppercase tracking-widest mb-6"
          >
            Driving strategic solutioning across
          </motion.p>
        )}

        {/* Items grid */}
        {data.items.length > 0 && (
          <motion.div
            variants={prefersReducedMotion ? {} : containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10"
          >
            {[...data.items]
              .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
              .map((item, idx) => (
                <motion.div
                  key={item.id ?? idx}
                  variants={itemVariants}
                  className="bg-dark p-6 sm:p-8 group hover:bg-white/5 transition-colors duration-200"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-display-sm font-display font-bold text-accent leading-none tabular-nums shrink-0">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-heading-xs sm:text-heading-sm font-sans font-semibold text-paper pt-1">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-body-sm sm:text-body-md text-mid leading-relaxed pl-10 sm:pl-12">
                    {item.description}
                  </p>
                </motion.div>
              ))}
          </motion.div>
        )}

        {/* Bottom rule */}
        <motion.div
          variants={itemVariants}
          className="mt-12 sm:mt-16 border-t border-white/10"
        />
      </motion.div>
    </section>
  );
}
