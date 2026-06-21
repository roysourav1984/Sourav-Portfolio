'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface InfiniteScrollProps<T> {
  items: T[];
  itemsPerLoad: number;
  maxItems: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  containerClassName?: string;
  renderGrid?: boolean;
  gridClassName?: string;
}

export default function InfiniteScroll<T>({
  items,
  itemsPerLoad,
  maxItems,
  renderItem,
  containerClassName = '',
  renderGrid = true,
  gridClassName = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6',
}: InfiniteScrollProps<T>) {
  const [displayedCount, setDisplayedCount] = useState(itemsPerLoad);
  const observerTarget = useRef<HTMLDivElement>(null);
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

  const loadMore = useCallback(() => {
    setDisplayedCount((prev) => Math.min(prev + itemsPerLoad, maxItems));
  }, [itemsPerLoad, maxItems]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayedCount < Math.min(items.length, maxItems)) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [displayedCount, items.length, maxItems, loadMore]);

  const displayedItems = items.slice(0, displayedCount);

  const content = (
    <motion.div
      className={renderGrid ? gridClassName : containerClassName}
      variants={prefersReducedMotion ? {} : containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {displayedItems.map((item, index) => (
        <motion.div key={index} variants={itemVariants}>
          {renderItem(item, index)}
        </motion.div>
      ))}
    </motion.div>
  );

  return (
    <>
      {content}
      {displayedCount < Math.min(items.length, maxItems) && (
        <div
          ref={observerTarget}
          className="w-full h-12 flex items-center justify-center mt-8"
        >
          <div className="animate-pulse text-body-sm text-mid">Loading more...</div>
        </div>
      )}
    </>
  );
}
