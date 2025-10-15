import React, { useState, useEffect } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const HeroCarousel = () => {
  const { products } = useContext(ShopContext);
  // Get bestseller products from database
  const bestsellerProducts = products.filter(product => product.bestseller === true);

  // Create carousel images from database bestsellers
  const carouselImages = bestsellerProducts.map(product => ({
    image: product.image[0], // Use first image
    title: product.name,
    subtitle: product.description.length > 50 ?
      product.description.substring(0, 47) + "..." :
      product.description,
    category: `${product.category} - ${product.subCategory}`,
    productId: product._id
  }));

  // Fallback if no bestsellers found
  const fallbackImages = [
    {
      image: "/placeholder-image.jpg",
      title: "Featured Products",
      subtitle: "Coming Soon",
      category: "All Categories"
    }
  ];

  const displayImages = carouselImages.length > 0 ? carouselImages : fallbackImages;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % displayImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, displayImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % displayImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div 
      className='w-full sm:w-1/2 relative animate-fade-in-right group' 
      style={{animationDelay: '0.3s'}}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Main carousel container */}
      <div className='relative h-80 sm:h-96 md:h-full overflow-hidden rounded-br-2xl sm:rounded-r-2xl'>
        {/* Images */}
        {displayImages.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <img
              src={item.image}
              alt={item.title}
              className='w-full h-full object-cover'
            />
            {/* Gradient overlay */}
            <div className='absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-black/20'></div>
            
            {/* Image info overlay */}
            <div className='absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white animate-fade-in-up'>
              <div className='bg-white/20 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/30 max-w-[80%] sm:max-w-none'>
                <p className='text-[10px] sm:text-xs font-medium opacity-80'>{item.category}</p>
                <h3 className='text-base sm:text-lg font-bold'>{item.title}</h3>
                <p className='text-xs sm:text-sm opacity-90 hidden xs:block'>{item.subtitle}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows - Hidden on mobile */}
        <button
          onClick={prevSlide}
          className='absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 hidden xs:flex'
        >
          <svg className='w-4 h-4 sm:w-5 sm:h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
          </svg>
        </button>
        
        <button
          onClick={nextSlide}
          className='absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 hidden xs:flex'
        >
          <svg className='w-4 h-4 sm:w-5 sm:h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
          </svg>
        </button>

        {/* Decorative corner element - Hidden on mobile */}
        <div className='absolute top-2 right-2 sm:top-4 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center animate-bounce-slow hidden sm:flex'>
          <span className='text-accent-600 text-sm sm:text-lg'>✨</span>
        </div>
      </div>

      {/* Dots indicator */}
      <div className='absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-2'>
        {displayImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-accent-500 w-4 sm:w-6'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Auto-play indicator - Hidden on mobile */}
      <div className='absolute top-2 left-2 sm:top-4 sm:left-4 flex items-center gap-1 sm:gap-2 hidden sm:flex'>
        <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${isAutoPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
        <span className='text-[10px] sm:text-xs text-white/80 bg-black/30 backdrop-blur-sm px-1.5 py-0.5 sm:px-2 sm:py-1 rounded'>
          {isAutoPlaying ? 'Auto' : 'Manual'}
        </span>
      </div>

      {/* Progress bar - Hidden on mobile */}
      <div className='absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-black/20 hidden sm:block'>
        <div 
          className='h-full bg-gradient-to-r from-accent-500 to-primary-500 transition-all duration-100 ease-linear'
          style={{
            width: isAutoPlaying ? '100%' : '0%',
            animation: isAutoPlaying ? 'progress 4s linear infinite' : 'none'
          }}
        ></div>
      </div>

      {/* CSS for progress animation */}
      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  )
}

export default HeroCarousel