import React, { useState, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Link } from 'react-router-dom';
import { ENV_File } from '../FilesPaths/all_path';

const SwipeableSecondSectionSlider = ({ images }) => {
  const [index, setIndex] = useState(1);
  const [transitioning, setTransitioning] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  const timeoutRef = useRef(null);
  const interactionTimeoutRef = useRef(null);

  // Add first and last image for infinite effect
  const fullImages = [images[images.length - 1], ...images, images[0]];

  // Set loaded state on mount
  useEffect(() => {
    setLoaded(true);
  }, []);

  // Autoplay effect
  useEffect(() => {
    if (isInteracting) return;
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, 4000);
    return () => clearTimeout(timeoutRef.current);
  }, [index, isInteracting]);

  // Handle infinite loop effect
  const handleTransitionEnd = () => {
    if (index === fullImages.length - 1) {
      setTransitioning(false);
      setIndex(1);
    } else if (index === 0) {
      setTransitioning(false);
      setIndex(fullImages.length - 2);
    }
  };

  // Re-enable transition after jump
  useEffect(() => {
    if (!transitioning) {
      setTimeout(() => setTransitioning(true), 50);
    }
  }, [transitioning]);

  // Handle user interaction (pause autoplay)
  const handleUserInteraction = (action) => {
    clearTimeout(timeoutRef.current);
    clearTimeout(interactionTimeoutRef.current);
    setIsInteracting(true);
    action();
    interactionTimeoutRef.current = setTimeout(() => setIsInteracting(false), 3000);
  };

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => handleUserInteraction(() => setIndex((prev) => prev + 1)),
    onSwipedRight: () => handleUserInteraction(() => setIndex((prev) => prev - 1)),
    trackMouse: true,
  });

  return (
    <section className="relative w-full bg-gradient-to-br from-rose-50 via-white to-amber-50 flex flex-col justify-end items-center overflow-hidden rounded-xl border border-rose-100 md:py-8">
      {/* Heading */}
      <div className="w-full flex justify-center z-20 pt-15 pb-4 md:pb-4">
        <h2
          className="text-center font-extrabold tracking-wide"
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            color: '#be123c',
            textShadow: '0 2px 8px rgba(255,255,255,0.7)',
            pointerEvents: 'none',
          }}
        >
          New Arrival
        </h2>
      </div>

      {/* Slider Container */}
      <Link to="/product/" className="w-full flex-1 flex items-end">
        <div
          className={`flex w-full ${loaded ? 'opacity-100' : 'opacity-0'}`}
          style={{
            transform: `translateX(-${index * 100}%)`,
            transition: transitioning ? 'transform 0.6s ease-in-out' : 'none',
            willChange: 'transform',
          }}
          onTransitionEnd={handleTransitionEnd}
          {...handlers}
        >
          {fullImages.map((img, i) => (
            <div
              key={i}
              className="w-full flex-shrink-0 flex items-center justify-center md:px-4 lg:px-12"
              style={{
                minHeight: '60vh',
                height: 'clamp(50vh, 70vw, 80vh)',
                maxHeight: '90vh',
              }}
            >
              <img
                src={ENV_File.backendURL + img}
                alt={`Slide ${i}`}
                className="w-full h-full object-cover lg:object-contain rounded-sm border border-amber-100"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </Link>

      {/* Dots */}
      <div className="absolute bottom-[3vh] left-1/2 transform -translate-x-1/2 flex gap-3 md:gap-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => handleUserInteraction(() => setIndex(i + 1))}
            className={`rounded-full border-2 border-rose-300/20 ${
              i + 1 === index
                ? 'bg-rose-700 border-rose-700'
                : 'bg-white hover:bg-rose-200'
            }`}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: 'clamp(2px, 6px, 8px)',
              height: 'clamp(2px, 6px, 8px)',
            }}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={() => handleUserInteraction(() => setIndex(index - 1))}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 hover:bg-rose-100 text-rose-700 rounded-full border border-rose-200 p-2 md:p-3"
        aria-label="Previous Slide"
        style={{ width: 'clamp(28px, 4vw, 48px)', height: 'clamp(28px, 4vw, 48px)' }}
      >
        <svg width="100%" height="100%" fill="none" viewBox="0 0 24 24">
          <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button
        onClick={() => handleUserInteraction(() => setIndex(index + 1))}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 hover:bg-rose-100 text-rose-700 rounded-full border border-rose-200 p-2 md:p-3"
        aria-label="Next Slide"
        style={{ width: 'clamp(28px, 4vw, 48px)', height: 'clamp(28px, 4vw, 48px)' }}
      >
        <svg width="100%" height="100%" fill="none" viewBox="0 0 24 24">
          <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </section>
  );
};

export default SwipeableSecondSectionSlider;