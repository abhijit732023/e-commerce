import React, { useState, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Link } from 'react-router-dom';
import bgimg from '../images/texture2.webp'

const SwipeableSecondSectionSlider = ({ images }) => {
  const [index, setIndex] = useState(1); // Start from 1 because 0 is the last clone
  const [isInteracting, setIsInteracting] = useState(false);
  const [transitioning, setTransitioning] = useState(true);
  const timeoutRef = useRef(null);
  const interactionTimeoutRef = useRef(null);

  const fullImages = [images[images.length - 1], ...images, images[0]]; // Clone last and first

  // Auto slide
  useEffect(() => {
    if (!isInteracting) {
      timeoutRef.current = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 3500);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [index, isInteracting]);

  // Reset after transition if at edge
  const handleTransitionEnd = () => {
    setTransitioning(false);
    if (index === fullImages.length - 1) {
      setIndex(1); // Loop to first real slide
    } else if (index === 0) {
      setIndex(fullImages.length - 2); // Loop to last real slide
    }
  };

  useEffect(() => {
    if (!transitioning) {
      // Temporarily disable transition to snap to the real image
      setTimeout(() => {
        setTransitioning(true);
      }, 50);
    }
  }, [transitioning]);

  // Handle swipe & interaction
  const handleUserInteraction = (action) => {
    clearTimeout(timeoutRef.current);
    clearTimeout(interactionTimeoutRef.current);
    setIsInteracting(true);

    action();

    interactionTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 3000);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleUserInteraction(() => setIndex((prev) => prev + 1)),
    onSwipedRight: () => handleUserInteraction(() => setIndex((prev) => prev - 1)),
    trackMouse: true,
  });

  return (
    <section className="rounded-sm mt-0.5 relative w-full pb-6 h-[60vh] flex justify-center items-end overflow-hidden bg-gray-200 backdrop-blur-2xl"
    style={
      {
          backgroundImage:`url(${bgimg}?v=1)`,
          backgroundSize:"cover",
          backgroundPosition:'center',
          backgroundRepeat:'no-repeat'
      }
  }
    >
      {/* Heading */}
      <div className="absolute top-10 text-center w-full z-10">
        <h2 className="text-2xl md:text-4xl font-semibold text-rose-900">New Arrivals</h2>
        <p className="text-sm md:text-base text-rose-700 mt-2">Fresh fashion just for you</p>
      </div>

      {/* Image slider */}
      <Link to={`/product/`}>
        <div
          className="flex w-full"
          style={{
            transform: `translateX(-${index * 100}%)`,
            transition: transitioning ? 'transform 0.5s ease-in-out' : 'none',
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
            />
          ))}
        </div>
      </Link>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => handleUserInteraction(() => setIndex(i + 1))} // +1 for clone offset
            className={`w-2 h-2 rounded-full ${i + 1 === index ? 'bg-rose-800' : 'bg-rose-300'}`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default SwipeableSecondSectionSlider;
