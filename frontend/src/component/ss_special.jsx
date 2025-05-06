import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { AppwriteService } from '../FilesPaths/all_path';

const SSSpecialCarousel = ({ products }) => {
  const scrollRef = useRef(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const interactionTimeout = useRef(null);
  const autoScrollTimeout = useRef(null);

  const scrollAmount = 273 + 16; // item width + space-x-4 gap (16px)
  const scrollInterval = 1100; // total time: 0.6s scroll + 0.5s pause

  const scrollToNext = () => {
    const container = scrollRef.current;
    if (!container) return;

    const maxScroll = container.scrollWidth - container.clientWidth;
    const currentScroll = container.scrollLeft;

    let targetScroll = currentScroll + scrollAmount;
    if (targetScroll > maxScroll) {
      targetScroll = 0; // Loop back to start
    }

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    });
  };

  const startAutoScroll = () => {
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
    }, 3000); // Resume after 3s of no interaction
  };

  useEffect(() => {
    startAutoScroll();

    return () => {
      stopAutoScroll();
      clearTimeout(interactionTimeout.current);
    };
  }, []);

  return (
    <section className="rounded-xl mt-1 bg-rose-100/20 border-t-2 border-rose-300/20 py-12 px-4 md:px-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-rose-800">💎 SS Special</h2>

      <div
        ref={scrollRef}
        className="overflow-x-auto flex space-x-4 overflow-y-hidden h-full scroll-smooth snap-x snap-mandatory"
        onWheel={handleInteraction}
        onTouchStart={handleInteraction}
        onMouseDown={handleInteraction}
      >
        {products.map((img, i) => (
          <motion.div
            key={i}
            className="bg-white shadow rounded snap-center overflow-hidden flex-shrink-0"
            style={{
              width: '273px',
              height: '410px',
              scrollSnapAlign: 'center',
            }}
            initial={{ scale: 0.85 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 0.8, type: 'tween' }}
          >
            <img
              src={AppwriteService.getFileViewUrl(img.images[0])}
              alt={`SS Special ${i}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SSSpecialCarousel;
