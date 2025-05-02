import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { AppwriteService } from '../FilesPaths/all_path';

const SwipeImageViewer = ({ images, name }) => {
  const [current, setCurrent] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrent((prev) => (prev + 1) % images.length),
    onSwipedRight: () => setCurrent((prev) => (prev - 1 + images.length) % images.length),
    trackMouse: true,
  });

  return (
    <div className="relative w-full h-50 overflow-hidden rounded" {...handlers}>
      {/* Main Image */}
      <img
        src={AppwriteService.getFileViewUrl(images[current])}
        alt={`${name} - ${current + 1}`}
        className="w-full h-full object-cover transition-all duration-300 ease-in-out"
      />

      {/* Dots */}
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${index === current ? 'bg-black' : 'bg-gray-400'} transition-all`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SwipeImageViewer;
