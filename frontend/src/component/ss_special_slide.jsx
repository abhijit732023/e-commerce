import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AppwriteService } from "../FilesPaths/all_path";

const SliderSection = ({ products }) => {
  const scrollRef = useRef(null);
  const autoSlideTimer = useRef(null);
  const interactionTimeoutRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  const slideToIndex = (index) => {
    const container = scrollRef.current;
    if (!container || !container.children.length) return;

    const child = container.children[index];
    if (!child) return;

    const scrollAmount =
      child.offsetLeft - (container.offsetWidth - child.offsetWidth) / 2;

      container.style.scrollBehavior = "auto"; // disable default smooth scroll temporarily
      container.style.transition = "scroll-left 3s easeInOut"; // not standard — won't work
      container.scrollTo({
        left: scrollAmount,
        behavior: "smooth", // keep this
      });
      
  };

  const startAutoSlide = () => {
    autoSlideTimer.current = setInterval(() => {
      if (!isUserInteracting) {
        setCurrentIndex((prev) => {
          const next = (prev + 1) % products.length;
          slideToIndex(next);
          return next;
        });
      }
    }, 5000);
  };

  const stopAutoSlideTemporarily = () => {
    setIsUserInteracting(true);
    clearInterval(autoSlideTimer.current);
    clearTimeout(interactionTimeoutRef.current);

    interactionTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
      startAutoSlide();
    }, 5000);
  };

  // Detect closest visible item and set it as active index
  const handleScroll = () => {
    stopAutoSlideTemporarily();
    const container = scrollRef.current;
    const children = Array.from(container.children);

    const center = container.scrollLeft + container.offsetWidth / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    children.forEach((child, index) => {
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const distance = Math.abs(center - childCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setCurrentIndex(closestIndex);
  };

  useEffect(() => {
    // Center on first load
    slideToIndex(0);
    startAutoSlide();

    return () => {
      clearInterval(autoSlideTimer.current);
      clearTimeout(interactionTimeoutRef.current);
    };
  }, [products]);

  return (
    <section
      className="bg-rose-100/20 border-t-2 border-rose-300/20 py-12 md:h-[50vh] px-4 md:px-16"
      style={{ aspectRatio: "2730 / 4096" }}
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-rose-800">💎 SS Special</h2>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        onMouseDown={stopAutoSlideTemporarily}
        onTouchStart={stopAutoSlideTemporarily}
        className="overflow-x-auto flex space-x-4 snap-x snap-mandatory scroll-smooth h-full"
      >
        {products.map((img, i) => (
          <motion.div
            key={i}
            className="bg-white shadow min-w-[80%] md:min-w-[30%] rounded snap-center overflow-hidden h-full flex items-center"
            initial={{ scale: 0.85 }}
            animate={{ scale: i === currentIndex ? 1.05 : 0.85 }}
            transition={{ ease: "easeInOut", duration: 0.6 }}
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

export default SliderSection;
