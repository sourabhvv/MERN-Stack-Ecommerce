import React, { useEffect, useState } from 'react';

const ImageSlider = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => {
      clearInterval(interval); // Clean up the interval when the component unmounts
    };
  }, [images]);

  return (
    <div className="mt-6">
      <img
        src={images[currentImageIndex]}
        alt={`Carousel Image ${currentImageIndex + 1}`}
        className="rounded-lg shadow-md"
        style={{ maxWidth: '100%', maxHeight: '100%', width: '728px', height: '316px' }}
      />
    </div>
  );
};

export default ImageSlider;