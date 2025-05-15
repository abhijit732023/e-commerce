import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { AppwriteService } from '../FilesPaths/all_path';

const SSSpecialCarousel = ({ products }) => {
  const scrollRef = useRef(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const interactionTimeout = useRef(null);
  const autoScrollTimeout = useRef(null);

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
      <div className="flex items-center justify-between mb-4 px-2">
        <h2 className="text-2xl md:text-3xl font-bold text-rose-700  tracking-tight drop-shadow-sm">
          SS Special Picks
        </h2>
        <span className="text-sm text-amber-600 font-medium bg-amber-100 px-3 py-1 rounded-full shadow-sm hidden md:inline">
          Curated for You
        </span>
      </div>
      <div
        ref={scrollRef}
        className="overflow-x-auto flex space-x-6 overflow-y-hidden h-full scroll-smooth snap-x snap-mandatory pb-4"
        onWheel={handleInteraction}
        onTouchStart={handleInteraction}
        onMouseDown={handleInteraction}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {clonedProducts.map((img, i) => (
          <motion.div
            key={i}
            className="bg-white shadow-xl rounded-2xl snap-center overflow-hidden flex-shrink-0 border border-amber-200 hover:shadow-2xl transition-all duration-500 group relative"
            style={{
              width: '273px',
              height: '410px',
              scrollSnapAlign: 'center',
            }}
            initial={{ opacity: 0.7, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(0,0,0,0.15)' }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <img
              src={AppwriteService.getFileViewUrl(img.images[0])}
              alt={`SS Special ${i}`}
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
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
        ))}
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