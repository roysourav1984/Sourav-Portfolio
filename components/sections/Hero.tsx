'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Rule from '../ui/Rule';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { HeroContent, SummaryContent } from '@/lib/types';

interface HeroProps {
  data: HeroContent;
  summaryData?: SummaryContent;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Hero({ data, summaryData }: HeroProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      className="grid grid-cols-12 gap-6 px-gutter-xs sm:px-gutter-sm md:px-gutter-md lg:px-gutter-lg py-8 sm:py-12 md:py-16 bg-paper"
      variants={prefersReducedMotion ? {} : containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Name - Full Width, Large */}
      {data.name && (
        <motion.div className="col-span-12" variants={itemVariants}>
          <p className="text-heading-lg sm:text-display-sm font-display font-bold text-accent uppercase tracking-wide">
            {data.name}
          </p>
        </motion.div>
      )}

      {/* Headline */}
      <motion.div className="col-span-12" variants={itemVariants}>
        <h1 className="text-display-md sm:text-display-lg font-display font-bold text-ink leading-tight">
          {data.headline || 'Portfolio'}
        </h1>
      </motion.div>

      {/* Left Column: Subtitle, Location, Summary */}
      <motion.div className="col-span-12 md:col-span-6 flex flex-col gap-4" variants={itemVariants}>
        {/* Subtitle & Location */}
        <div className="space-y-2">
          <p className="text-heading-sm sm:text-heading-md text-mid">
            {data.subtitle || 'Your professional positioning'}
          </p>
          <p className="text-body-sm sm:text-body-md text-mid">
            {data.location || 'Location'}
          </p>
        </div>

        {/* Summary */}
        {data.summary && (
          <p className="text-body-md text-mid leading-relaxed">
            {data.summary}
          </p>
        )}

        {/* Professional Summary */}
        {summaryData && summaryData.paragraphs && summaryData.paragraphs.length > 0 && (
          <div className="mt-4 space-y-4 sm:space-y-6">
            {summaryData.paragraphs.map((para, idx) => (
              <p key={idx} className="text-body-md sm:text-body-lg text-ink leading-relaxed">
                {para}
              </p>
            ))}
            {summaryData.pullQuote && (
              <blockquote className="mt-8 sm:mt-12 pl-4 sm:pl-6 border-l-4 border-accent">
                <p className="text-heading-sm sm:text-heading-md font-display text-accent italic">
                  &ldquo;{summaryData.pullQuote}&rdquo;
                </p>
              </blockquote>
            )}
          </div>
        )}
      </motion.div>

      {/* Right Column: Portrait */}
      <motion.div className="col-span-12 md:col-span-6 flex justify-end items-start" variants={itemVariants}>
        {data.portraitUrl && (
          <div className="w-full md:w-96 aspect-square bg-rule overflow-hidden border-2 border-rule flex-shrink-0">
            <Image
              src={data.portraitUrl}
              alt={data.portraitAlt || 'Professional portrait'}
              width={500}
              height={500}
              className="w-full object-cover"
              priority
            />
          </div>
        )}
      </motion.div>

      {/* Horizontal Stats Section */}
      {data.stats && data.stats.length > 0 ? (
        <motion.div className="col-span-12" variants={itemVariants}>
          <div className="border-t border-rule mb-6" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {data.stats.map((stat, idx) => (
              <div key={idx} className="border-b-2 border-rule pb-4">
                <div className="text-display-xs sm:text-heading-md font-display text-accent">
                  {stat.label}
                </div>
                <div className="text-body-xs sm:text-body-sm text-mid mt-2">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ) : null}

      {/* Closing Rule */}
      <motion.div className="col-span-12" variants={itemVariants}>
        <Rule variant="default" />
      </motion.div>
    </motion.section>
  );
}
