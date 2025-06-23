import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ENV_File } from '../FilesPaths/all_path';

const SSSpecialCarousel = ({ products }) => {
  const scrollRef = useRef(null);
  const intervalRef = useRef(null);
  const interactionTimeout = useRef(null);

  const itemWidth = 273;
  const itemGap = 24;
  const scrollStep = itemWidth + itemGap;
  const extendedProducts = [...products, ...products];

  const startAutoSlide = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      const container = scrollRef.current;
      if (!container) return;

      const maxScroll = products.length * scrollStep;
      let newScrollLeft = container.scrollLeft + scrollStep;

      if (newScrollLeft >= maxScroll) {
        newScrollLeft = newScrollLeft - maxScroll;
      }

      container.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    }, 3000); // every 3 seconds
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleUserInteract = () => {
    stopAutoSlide();
    clearTimeout(interactionTimeout.current);
    interactionTimeout.current = setTimeout(() => {
      startAutoSlide();
    }, 3000); // resume after 3 sec
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) container.scrollLeft = products.length * scrollStep;

    startAutoSlide();

    return () => {
      stopAutoSlide();
      clearTimeout(interactionTimeout.current);
    };
  }, [products.length]);

  const scrollByAmount = (amount) => {
    const container = scrollRef.current;
    if (!container) return;

    const maxScroll = products.length * scrollStep;
    let newScrollLeft = container.scrollLeft + amount;

    if (newScrollLeft < 0) newScrollLeft += maxScroll;
    if (newScrollLeft >= maxScroll) newScrollLeft -= maxScroll;

    container.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
  };

  return (
    <section
      className="relative rounded-sm bg-gradient-to-br from-rose-50 via-white to-amber-50 border border-rose-200/40 px-4 md:px-10 pb-8 shadow-md select-none"
      onMouseEnter={handleUserInteract}
      onMouseLeave={handleUserInteract}
      onTouchStart={handleUserInteract}
      onWheel={handleUserInteract}
    >
      <div className="flex items-center justify-between mb-3 px-2">
        <h2 className="text-3xl font-extrabold pt-10 w-full text-center text-rose-700 tracking-tight drop-shadow-sm">
          SS Special Picks
        </h2>
        {/* <span className="text-sm text-amber-700 font-semibold bg-amber-100 px-4 py-1 rounded-full shadow-md hidden md:inline">
          Curated for You
        </span> */}
      </div>

      <div
        ref={scrollRef}
        className="flex space-x-6 overflow-x-auto scroll-smooth snap-x snap-mandatory  scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {extendedProducts.map((item, i) => (
          <motion.div
            key={i}
            className="relative snap-center flex-shrink-0 rounded-sm mt-5 shadow-lg border border-amber-300 bg-white cursor-pointer overflow-hidden"
            style={{ width: itemWidth, height: 420 }}
            whileHover={{ scale: 1.05 }}
            onMouseEnter={handleUserInteract}
            onTouchStart={handleUserInteract}
          >
            <Link to="/product" className="block w-full h-full">
              <img
                src={ENV_File.backendURL + item.images[0]}
                alt={item.header || `Special Product ${i}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
              />
            </Link>

            {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-5 flex flex-col justify-end h-24">
              <h3 className="text-white font-bold text-lg truncate drop-shadow-lg">
                {item.header || 'Special Product'}
              </h3>
            </div> */}

            {item.isFeatured && (
              <span className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md uppercase tracking-wide">
                Featured
              </span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Arrows */}
      <button
        aria-label="Scroll Left"
        onClick={() => {
          handleUserInteract();
          scrollByAmount(-scrollStep);
        }}
        className="hidden md:flex absolute top-1/2 left-3 -translate-y-1/2 items-center justify-center w-10 h-10 rounded-full bg-amber-400 text-white shadow-lg hover:bg-amber-500 transition"
      >
        ‹
      </button>
      <button
        aria-label="Scroll Right"
        onClick={() => {
          handleUserInteract();
          scrollByAmount(scrollStep);
        }}
        className="hidden md:flex absolute top-1/2 right-3 -translate-y-1/2 items-center justify-center w-10 h-10 rounded-full bg-amber-400 text-white shadow-lg hover:bg-amber-500 transition"
      >
        ›
      </button>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default SSSpecialCarousel;
