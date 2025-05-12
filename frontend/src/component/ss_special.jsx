import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { AppwriteService } from '../FilesPaths/all_path';

const SSSpecialCarousel = ({ products }) => {
  const scrollRef = useRef(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const interactionTimeout = useRef(null);
  const autoScrollTimeout = useRef(null);

  const scrollAmount = 273 + 20; // Slight increase for better spacing feedback
  const scrollInterval = 3000; // More breathing room between scrolls (smooth pacing)

  // Cloning products to create the infinite loop effect
  const clonedProducts = [...products, ...products]; // Duplicate the product array

  const scrollToNext = () => {
    const container = scrollRef.current;
    if (!container) return;

    const maxScroll = container.scrollWidth - container.clientWidth;
    const currentScroll = container.scrollLeft;

    let targetScroll = currentScroll + scrollAmount;
    if (targetScroll > maxScroll) {
      // If we're at the end, reset scroll to the first image but without jump
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
    stopAutoScroll(); // Clear any existing timeouts
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
    stopAutoScroll(); // Stop auto-scroll during interaction

    clearTimeout(interactionTimeout.current); // Clear any existing interaction timeout
    interactionTimeout.current = setTimeout(() => {
      setIsInteracting(false); // Reset interaction state
      startAutoScroll(); // Resume auto-scroll after 3 seconds
    }, 3000); // Resume after 3 seconds of no interaction
  };

  useEffect(() => {
    // Start auto-scroll after 3 seconds of no interaction on mount
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
    <section className="rounded-sm bg-white border-rose-300/20 px-4 md:px-16">
      <div
        ref={scrollRef}
        className="overflow-x-auto flex space-x-4 overflow-y-hidden h-full scroll-smooth snap-x snap-mandatory"
        onWheel={handleInteraction}
        onTouchStart={handleInteraction}
        onMouseDown={handleInteraction}
      >
        {clonedProducts.map((img, i) => (
          <motion.div
            key={i}
            className="bg-cream shadow-lg rounded-md snap-center overflow-hidden flex-shrink-0 border border-mocha transition-transform duration-700 ease-in-out"
            style={{
              width: '273px',
              height: '410px',
              scrollSnapAlign: 'center',
            }}
            initial={{ opacity: 1, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 0.85 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }} // cubic bezier for natural motion
          >
            <img
              src={AppwriteService.getFileViewUrl(img.images[0])}
              alt={`SS Special ${i}`}
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-105"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SSSpecialCarousel;