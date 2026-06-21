'use client';

import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import Tag from '../ui/Tag';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { SkillCategory, FunctionalSkill } from '@/lib/types';

interface SkillsMatrixProps {
  categories: SkillCategory[];
  functionalSkills: FunctionalSkill[];
}

export default function SkillsMatrix({ categories, functionalSkills }: SkillsMatrixProps) {
  const sortedCategories = [...categories].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const sortedFunctional = [...functionalSkills].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const prefersReducedMotion = useReducedMotion();

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section className="px-gutter-xs sm:px-gutter-sm md:px-gutter-md lg:px-gutter-lg py-8 sm:py-12 md:py-16 bg-paper">
      <SectionHeader eyebrow="EXPERTISE" title="Skills Matrix" />

      <motion.div
        className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Technical Skills */}
        <motion.div variants={itemVariants}>
          <h3 className="text-heading-xs sm:text-heading-sm font-display text-ink mb-4 sm:mb-6 pb-3 border-b border-rule">
            TECHNICAL SKILLS
          </h3>
          {sortedCategories && sortedCategories.length > 0 ? (
            <div className="space-y-4 sm:space-y-6">
              {sortedCategories.map((category) => (
                <div key={category.id}>
                  <h4 className="text-body-md font-medium text-ink mb-3">
                    {category.categoryName}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Tag key={skill} label={skill} variant="rule" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-body-sm text-mid italic">No technical skills defined</p>
          )}
        </motion.div>

        {/* Functional Skills */}
        <motion.div variants={itemVariants}>
          <h3 className="text-heading-xs sm:text-heading-sm font-display text-ink mb-4 sm:mb-6 pb-3 border-b border-rule">
            FUNCTIONAL SKILLS
          </h3>
          {sortedFunctional && sortedFunctional.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {sortedFunctional.map((skill) => (
                <Tag key={skill.id} label={skill.label} variant="accent" />
              ))}
            </div>
          ) : (
            <p className="text-body-sm text-mid italic">No functional skills defined</p>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
