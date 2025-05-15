import React, { useState, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Link } from 'react-router-dom';

const SwipeableSecondSectionSlider = ({ images }) => {
  const [index, setIndex] = useState(1);
  const [isInteracting, setIsInteracting] = useState(false);
  const [transitioning, setTransitioning] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const timeoutRef = useRef(null);
  const interactionTimeoutRef = useRef(null);

  const fullImages = [images[images.length - 1], ...images, images[0]];

  // Handle auto-slide
  useEffect(() => {
    setLoaded(true); // Prevent flicker on first load
  }, []);

  useEffect(() => {
    if (!isInteracting) {
      timeoutRef.current = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 4000);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [index, isInteracting]);

  // Snap logic after cloning
  const handleTransitionEnd = () => {
    if (index === fullImages.length - 1) {
      setTransitioning(false);
      setIndex(1);
    } else if (index === 0) {
      setTransitioning(false);
      setIndex(fullImages.length - 2);
    }
  };

  useEffect(() => {
    if (!transitioning) {
      // Re-enable transition after snapping
      setTimeout(() => setTransitioning(true), 50);
    }
  }, [transitioning]);

  // Swipe handler
  const handleUserInteraction = (action) => {
    clearTimeout(timeoutRef.current);
    clearTimeout(interactionTimeoutRef.current);
    setIsInteracting(true);
    action();
    interactionTimeoutRef.current = setTimeout(() => setIsInteracting(false), 3000);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleUserInteraction(() => setIndex((prev) => prev + 1)),
    onSwipedRight: () => handleUserInteraction(() => setIndex((prev) => prev - 1)),
    trackMouse: true,
  });

  return (
    <section className="h-[75vh]  relative w-full bg-gradient-to-br from-rose-50 via-white to-amber-50 flex justify-center items-end pb-30 overflow-hidden rounded-xl shadow-lg  border border-rose-100">
      {/* Image Slider */}
<h2 className="absolute w-full top-3 left-1/2 -translate-x-1/2 z-20 text-3xl md:text-5xl font-extrabold text-rose-700 text-center tracking-tight   px-6 py-2 ">
  New Arrival
</h2>
      <Link to="/product/" className="w-full">
        <div
          className={`flex w-full transition-opacity  duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          style={{
            transform: `translateX(-${index * 100}%)`,
            transition: transitioning ? 'transform 0.6s cubic-bezier(0.4,0.2,0.2,1)' : 'none',
            willChange: 'transform',
          }}
          onTransitionEnd={handleTransitionEnd}
          {...handlers}
        >
          {images.map((img, i) => (
            <div
              key={i}
              className="w-full flex-shrink-0 flex items-center justify-center px-2"
              style={{ minHeight: 260, maxHeight: 400 }}
            >
              <img
                src={img}
                alt={`Slide ${i}`}
                className="w-full object-cover rounded-2xl shadow-lg border border-amber-100 transition-transform duration-700 ease-in-out hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </Link>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => handleUserInteraction(() => setIndex(i + 1))}
            className={`w-1 h-1 mb-4 rounded-full border-2 border-rose-300 transition-all duration-300
              ${i + 1 === index
                ? 'bg-rose-700 border-rose-700 shadow-lg scale-250'
                : 'bg-white hover:bg-rose-200'
              }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Left/Right Arrows */}
      <button
        onClick={() => handleUserInteraction(() => setIndex(index - 1))}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-rose-100 text-rose-700 rounded-full shadow p-2 z-10 transition-all duration-200"
        aria-label="Previous Slide"
      >
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      <button
        onClick={() => handleUserInteraction(() => setIndex(index + 1))}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-rose-100 text-rose-700 rounded-full shadow p-2 z-10 transition-all duration-200"
        aria-label="Next Slide"
      >
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
    </section>
  );
};

export default SwipeableSecondSectionSlider;