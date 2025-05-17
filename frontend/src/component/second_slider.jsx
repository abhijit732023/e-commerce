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
  <section className="h-[70vh] min-h-[60vh] max-h-[80vh] relative w-full bg-gradient-to-br from-rose-50 via-white to-amber-50 flex flex-col justify-end items-center pb-[0.5vh] overflow-hidden rounded-xl shadow-lg border border-rose-100">
    {/* Responsive "New Arrival" Heading */}
    <div className="w-full flex justify-center z-20 pt-6 pb-2">
      <h2
        className="w-full max-w-[700px] text-center font-extrabold"
        style={{
          fontSize: 'clamp(1.5rem, 5vw, 3rem)',
          color: '#be123c',
          textShadow: '0 2px 8px rgba(255,255,255,0.7)',
          letterSpacing: '0.02em',
          pointerEvents: 'none',
        }}
      >
        New Arrival
      </h2>
    </div>
    <Link to="/product/" className="w-full flex-1 flex items-end">
      <div
        className={`flex w-full transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition: transitioning ? 'transform 0.6s cubic-bezier(0.4,0.2,0.2,1)' : 'none',
          willChange: 'transform',
        }}
        onTransitionEnd={handleTransitionEnd}
        {...handlers}
      >
        {fullImages.map((img, i) => (
          <div
            key={i}
            className="w-full flex-shrink-0 flex items-center justify-center px-[2vw]"
            style={{
              minHeight: '60vh',
              maxHeight: '80vh',
              height: '48vw',
              transition: 'height 0.3s',
            }}
          >
            <img
              src={img}
              alt={`Slide ${i}`}
              className="w-full h-full object-cover rounded-2xl shadow-lg border border-amber-100 transition-transform duration-700 ease-in-out hover:scale-105"
              loading="lazy"
              style={{
                maxHeight: '80vh',
                minHeight: '60vh',
                borderRadius: '2vw',
              }}
            />
          </div>
        ))}
      </div>
    </Link>

    {/* Dots */}
    <div className="absolute bottom-[4vh] left-1/2 transform -translate-x-1/2 flex gap-[2vw]">
      {images.map((_, i) => (
        <button
          key={i}
          onClick={() => handleUserInteraction(() => setIndex(i + 1))}
          className={`w-[2vw] h-[2vh]  min-w-[8px] min-h-[8px] max-w-[16px] max-h-[16px]  rounded-full border-2 border-rose-300 transition-all duration-300
            ${i + 1 === index
              ? 'bg-rose-700 border-rose-700 shadow-lg scale-155'
              : 'bg-white hover:bg-rose-200'
            }`}
          aria-label={`Go to slide ${i + 1}`}
          style={{
            width: 'clamp(8px,2vw,16px)',
            height: 'clamp(8px,2vw,16px)',
          }}
        />
      ))}
    </div>

    {/* Left/Right Arrows */}
    <button
      onClick={() => handleUserInteraction(() => setIndex(index - 1))}
      className="absolute left-[2vw] top-1/2 -translate-y-1/2 bg-white/80 hover:bg-rose-100 text-rose-700 rounded-full shadow p-[1vw] min-p-[8px] transition-all duration-200"
      aria-label="Previous Slide"
      style={{ width: 'clamp(28px,5vw,44px)', height: 'clamp(28px,5vw,44px)' }}
    >
      <svg width="100%" height="100%" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </button>
    <button
      onClick={() => handleUserInteraction(() => setIndex(index + 1))}
      className="absolute right-[2vw] top-1/2 -translate-y-1/2 bg-white/80 hover:bg-rose-100 text-rose-700 rounded-full shadow p-[1vw] min-p-[8px] transition-all duration-200"
      aria-label="Next Slide"
      style={{ width: 'clamp(28px,5vw,44px)', height: 'clamp(28px,5vw,44px)' }}
    >
      <svg width="100%" height="100%" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </button>
  </section>
);
};

export default SwipeableSecondSectionSlider;