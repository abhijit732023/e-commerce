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
    <section className="relative w-full h-[60vh] flex justify-center items-end overflow-hidden  rounded-sm pb-6">
      {/* Heading */}
      <div className="absolute top-10 text-center w-full z-10">
        <h2 className="text-2xl md:text-4xl font-semibold text-rose-900">New Arrivals</h2>
        <p className="text-sm md:text-base text-rose-700 mt-2">Fresh fashion just for you</p>
      </div>

      {/* Image Slider */}
      <Link to="/product/">
        <div
          className={`flex w-full transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          style={{
            transform: `translateX(-${index * 100}%)`,
            transition: transitioning ? 'transform 0.6s ease-in-out' : 'none',
            willChange: 'transform',
          }}
          onTransitionEnd={handleTransitionEnd}
          {...handlers}
        >
          {fullImages.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Slide ${i}`}
              className="w-full h-[50vh] object-cover shrink-0"
              loading="lazy"
            />
          ))}
        </div>
      </Link>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => handleUserInteraction(() => setIndex(i + 1))}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i + 1 === index ? 'bg-rose-800 scale-125 shadow-md' : 'bg-rose-300'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default SwipeableSecondSectionSlider;
