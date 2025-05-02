import { motion } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';

const SecondSectionSlider = ({ images }) => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  // Automatically advance to next image after delay
  useEffect(() => {
    const startAutoSlide = () => {
      timeoutRef.current = setTimeout(() => {
        setIndex((prev) => (prev + 1) % images.length);
      }, 3800); // ~2.5s animation + 1.2s pause
    };

    startAutoSlide();
    return () => clearTimeout(timeoutRef.current);
  }, [index, images.length]);

  const handleDragEnd = (_, info) => {
    if (info.offset.x < -50) {
      setIndex((prev) => (prev + 1) % images.length);
    } else if (info.offset.x > 50) {
      setIndex((prev) => (prev - 1 + images.length) % images.length);
    }
    clearTimeout(timeoutRef.current);
  };

  return (
    <section className="relative w-full h-screen flex justify-center items-center overflow-hidden bg-rose-100">
      <div className="absolute top-10 text-center w-full z-10">
        <h2 className="text-2xl md:text-4xl font-semibold text-rose-900">New Arrivals</h2>
        <p className="text-sm md:text-base text-rose-700 mt-2">Fresh fashion just for you</p>
      </div>

      <motion.div
        className="flex gap-6"
        animate={{ x: `calc(50vw - ${(75 / 2)}vw - ${index * (75 + 6)}vw)` }}
        transition={{ duration: 2.6, ease: 'easeInOut' }} // Slowed down
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
      >
        {images.map((img, i) => {
          const distanceFromCenter = Math.abs(i - index);
          const scale = Math.max(0.7, 1 - distanceFromCenter * 0.2); // Gradually decrease scale as image moves away

          return (
            <motion.img
              key={i}
              src={img}
              alt={`Slide ${i}`}
              className="w-[75vw] h-[80vh] object-cover rounded-xl shadow-lg shrink-0"
              style={{
                transform: `scale(${scale})`,  // Scaling effect
                transition: 'transform 0.3s ease-in-out', // Smooth transition for scaling
              }}
            />
          );
        })}
      </motion.div>
    </section>
  );
};

export default SecondSectionSlider;
