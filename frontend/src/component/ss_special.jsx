import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SSSpecialCarousel = ({ products }) => {
  const scrollRef = useRef(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const interactionTimeout = useRef(null);
  const autoScrollInterval = useRef(null);

  // Constants for sizing and spacing
  const itemWidth = 273;
  const itemGap = 24;
  const scrollStep = itemWidth + itemGap;
  const autoScrollDelay = 3500;

  // Double products for seamless infinite scroll
  const extendedProducts = [...products, ...products];

  // Start the auto-scroll interval
  const startAutoScroll = () => {
    if (autoScrollInterval.current) return; // avoid multiple intervals

    const container = scrollRef.current;
    if (!container) return;

    const maxScroll = products.length * scrollStep;
    let scrollPosition = container.scrollLeft;

    const step = 1; // pixels per frame
    const fps = 60;
    const interval = 1000 / fps;

    const smoothScroll = () => {
      scrollPosition += step;
      if (scrollPosition >= maxScroll) {
        scrollPosition -= maxScroll;
      }
      container.scrollLeft = scrollPosition;
      autoScrollInterval.current = requestAnimationFrame(smoothScroll);
    };

    autoScrollInterval.current = requestAnimationFrame(smoothScroll);
  };

  // Stop auto-scroll
  const stopAutoScroll = () => {
    if (autoScrollInterval.current) {
      cancelAnimationFrame(autoScrollInterval.current);
      autoScrollInterval.current = null;
    }
  };

  // Handle user interaction: pause auto-scroll, resume after 3s idle
  const onUserInteract = () => {
    // If you want to keep pausing on interaction, uncomment below:
    // setIsInteracting(true);
    // stopAutoScroll();

    // clearTimeout(interactionTimeout.current);
    // interactionTimeout.current = setTimeout(() => {
    //   setIsInteracting(false);
    //   startAutoScroll();
    // }, 3000);
  };

  // On mount: initialize scroll to the start of second half (to allow seamless scroll backward)
  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.scrollLeft = products.length * scrollStep; // Start at the duplicated half
    }
    startAutoScroll();

    return () => {
      stopAutoScroll();
      clearTimeout(interactionTimeout.current);
    };
  }, [products.length]);

  // Manual scroll by arrows (left or right)
  const scrollByAmount = (amount) => {
    const container = scrollRef.current;
    if (!container) return;

    const maxScroll = products.length * scrollStep;

    let newScrollLeft = container.scrollLeft + amount;

    // Loop scroll position for seamless effect
    if (newScrollLeft < 0) {
      newScrollLeft += maxScroll;
      container.scrollLeft = newScrollLeft;
    } else if (newScrollLeft >= maxScroll) {
      newScrollLeft -= maxScroll;
      container.scrollLeft = newScrollLeft;
    }

    container.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
  };

  return (
    <section className="relative rounded-xl bg-gradient-to-br from-rose-50 via-white to-amber-50 border border-rose-200/40 px-4 md:px-10 py-10 shadow-xl select-none">
      <div className="flex items-center justify-between mb-6 px-2">
        <h2 className="text-3xl font-extrabold text-rose-700 tracking-tight drop-shadow-sm">
          SS Special Picks
        </h2>
        <span className="text-sm text-amber-700 font-semibold bg-amber-100 px-4 py-1 rounded-full shadow-md hidden md:inline">
          Curated for You
        </span>
      </div>

      <div
        ref={scrollRef}
        className="flex space-x-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 scrollbar-hide"
        onWheel={onUserInteract}
        onTouchStart={onUserInteract}
        onMouseDown={onUserInteract}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {extendedProducts.map((item, i) => (
          <motion.div
            key={i}
            className="relative snap-center flex-shrink-0 rounded-3xl shadow-lg border border-amber-300 bg-white cursor-pointer overflow-hidden"
            style={{ width: itemWidth, height: 420 }}
            whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(255, 183, 77, 0.6)' }}
            onClick={() => window.scrollTo(0, 0)}
          >
            <Link to="/product" className="block w-full h-full">
              <img
                src={item.images[0]}
                alt={item.header || `Special Product ${i}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
              />
            </Link>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-5 flex flex-col justify-end h-24">
              <h3 className="text-white font-bold text-lg truncate drop-shadow-lg">
                {item.header || 'Special Product'}
              </h3>
            </div>

            {item.isFeatured && (
              <span className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md uppercase tracking-wide">
                Featured
              </span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        aria-label="Scroll Left"
        onClick={() => {
          onUserInteract();
          scrollByAmount(-scrollStep);
        }}
        className="hidden md:flex absolute top-1/2 left-3 -translate-y-1/2 items-center justify-center w-10 h-10 rounded-full bg-amber-400 text-white shadow-lg hover:bg-amber-500 transition"
      >
        ‹
      </button>
      <button
        aria-label="Scroll Right"
        onClick={() => {
          onUserInteract();
          scrollByAmount(scrollStep);
        }}
        className="hidden md:flex absolute top-1/2 right-3 -translate-y-1/2 items-center justify-center w-10 h-10 rounded-full bg-amber-400 text-white shadow-lg hover:bg-amber-500 transition"
      >
        ›
      </button>

      {/* Hide scrollbar */}
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
