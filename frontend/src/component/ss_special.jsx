import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { AppwriteService } from '../FilesPaths/all_path';

const SSSpecialCarousel = ({ products }) => {
  const scrollRef = useRef(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const interactionTimeout = useRef(null);
  const autoScrollTimeout = useRef(null);
  const [scrollX, setScrollX] = useState(0);

  const scrollAmount = 293; // 273 + 20 for spacing
  const scrollInterval = 3000;

  // Clone products for infinite loop effect
  const clonedProducts = [...products, ...products];

  const scrollToNext = () => {
    const container = scrollRef.current;
    if (!container) return;

    const maxScroll = container.scrollWidth - container.clientWidth;
    const currentScroll = container.scrollLeft;

    let targetScroll = currentScroll + scrollAmount;
    if (targetScroll > maxScroll) {
      container.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
      return;
    }

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    });
  };

  const startAutoScroll = () => {
    stopAutoScroll();
    autoScrollTimeout.current = setTimeout(function loop() {
      if (!isInteracting) {
        scrollToNext();
      }
      autoScrollTimeout.current = setTimeout(loop, scrollInterval);
    }, scrollInterval);
  };

  const stopAutoScroll = () => {
    clearTimeout(autoScrollTimeout.current);
  };

  const handleInteraction = () => {
    setIsInteracting(true);
    stopAutoScroll();

    clearTimeout(interactionTimeout.current);
    interactionTimeout.current = setTimeout(() => {
      setIsInteracting(false);
      startAutoScroll();
    }, 3000);
  };

  // Track scroll position for scaling effect
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const onScroll = () => setScrollX(container.scrollLeft);
    container.addEventListener('scroll', onScroll);
    return () => container.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    interactionTimeout.current = setTimeout(() => {
      setIsInteracting(false);
      startAutoScroll();
    }, 3000);

    return () => {
      stopAutoScroll();
      clearTimeout(interactionTimeout.current);
    };
  }, []);

  return (
    <section className="rounded-xl bg-gradient-to-br from-rose-50 via-white to-amber-50 border border-rose-200/40 px-2 md:px-10 py-8 shadow-lg ">
      <div className="flex items-center justify-between  px-2">
        <h2 className="text-2xl md:text-3xl font-bold text-rose-700  tracking-tight drop-shadow-sm">
          SS Special Picks
        </h2>
        <span className="text-sm text-amber-600 font-medium bg-amber-100 px-3 py-1 rounded-full shadow-sm hidden md:inline">
          Curated for You
        </span>
      </div>
      <div
        ref={scrollRef}
        className="overflow-x-auto flex space-x-6 overflow-y-hidden  h-full scroll-smooth snap-x snap-mandatory pb-4"
        onWheel={handleInteraction}
        onTouchStart={handleInteraction}
        onMouseDown={handleInteraction}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {clonedProducts.map((img, i) => {
          // --- SCALE CALCULATION BASED ON CENTER ---
          let scale = 0.92;
          const container = scrollRef.current;
          if (container) {
            const containerRect = container.getBoundingClientRect();
            const containerCenter = containerRect.left + containerRect.width / 2;
            const itemLeft = i * (273 + 24) - scrollX; // 273px width + 24px gap (space-x-6)
            const itemCenter = itemLeft + 273 / 2 + containerRect.left;
            const distance = Math.abs(containerCenter - itemCenter);
            const maxDistance = containerRect.width / 2;
            // Scale from 0.92 (edge) to 1.08 (center)
            scale = 0.92 + (1 - Math.min(distance / maxDistance, 1)) * 0.16;
          }
          // ------------------------------------------

          return (
            <motion.div
              key={i}
              className="bg-white shadow-xl mt-15 rounded-2xl snap-center overflow-hidden flex-shrink-0 border border-amber-200 hover:shadow-2xl transition-all duration-500 group relative"
              style={{
                width: '273px',
                height: '410px',
                scrollSnapAlign: 'center',
                scale,
              }}
              initial={false}
              animate={false}
            >
              <img
                src={AppwriteService.getFileViewUrl(img.images[0])}
                alt={`SS Special ${i}`}
                className="w-full h-full object-cover transition-transform duration-700 ease-in-out  group-hover:scale-105"
                loading="lazy"
              />
              {/* Overlay for product name or badge */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3">
                <span className="text-white font-semibold text-lg drop-shadow">
                  {img.header || 'Special Product'}
                </span>
              </div>
              {/* Optional: Add a badge for new/featured */}
              {img.isFeatured && (
                <span className="absolute top-3 left-3 bg-rose-600 text-white text-xs font-bold px-2 py-1 rounded shadow">
                  Featured
                </span>
              )}
            </motion.div>
          );
        })}
      </div>
      {/* Custom scrollbar hide for webkit */}
      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </section>
  );
};

export default SSSpecialCarousel;