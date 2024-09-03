import React, { useState } from 'react';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    { id: 1, image: 'https://voyado.com/wp-content/uploads/2022/08/beauty-ecommerce-products.jpg' },
    { id: 2, image: 'https://m.media-amazon.com/images/I/61zAjw4bqPL._SX3000_.jpg'},
    { id: 3, image: 'https://m.media-amazon.com/images/I/61lwJy4B8PL._SX3000_.jpg' },
    {id:4, image: "https://m.media-amazon.com/images/I/71Ie3JXGfVL._SX3000_.jpg"}
    
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Slides */}
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="min-w-full h-[450px] flex items-center justify-center text-white text-3xl font-bold"
          >
            <img src={slide.image} alt="background" className="object-cover object-center w-full h-full" />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2"
      >
        Prev
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2"
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
