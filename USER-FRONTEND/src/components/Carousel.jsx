import React, { useState, useEffect } from "react";

import Image1 from "../assets/images/pic1.jpg";
import Image2 from "../assets/images/pic2.jfif";
import Image3 from "../assets/images/pic4.jpg";
import Image4 from "../assets/images/pic5.jpg";

const images = [Image1, Image2, Image3, Image4];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Next slide function
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Previous slide function
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="relative w-full h-screen mt-16">
      <div className="overflow-hidden w-full h-full rounded-xl">
        <div
          className="flex transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <img
                src={image}
                alt={`carousel-${index}`}
                className="w-full h-full object-cover opacity-0 transition-opacity duration-1000 ease-in-out"
                style={{
                  opacity: currentIndex === index ? 1 : 0, // Fading effect
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Prev and Next Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-8 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 rounded-full shadow-lg hover:bg-opacity-70 transition-all duration-300 ease-in-out"
      >
        &#8592;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-8 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 rounded-full shadow-lg hover:bg-opacity-70 transition-all duration-300 ease-in-out"
      >
        &#8594;
      </button>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-4 h-4 rounded-full cursor-pointer transition-all duration-300 ease-in-out ${
              currentIndex === index
                ? "bg-blue-600 scale-125"
                : "bg-gray-400 hover:bg-blue-600"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
