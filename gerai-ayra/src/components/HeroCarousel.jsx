import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'

// Import some product images for the carousel
import p_img1 from '../assets/p_img1.png'
import p_img5 from '../assets/p_img5.png'
import p_img13 from '../assets/p_img13.png'
import p_img21 from '../assets/p_img21.png'
import p_img26 from '../assets/p_img26.png'

const HeroCarousel = () => {
  const carouselImages = [
    {
      image: assets.hero_img,
      title: "Fashion Collection",
      subtitle: "Premium Quality",
      category: "All Categories"
    },
    {
      image: p_img1,
      title: "Women's Fashion",
      subtitle: "Elegant & Stylish",
      category: "Women"
    },
    {
      image: p_img5,
      title: "Trendy Tops",
      subtitle: "Comfortable Wear",
      category: "Women"
    },
    {
      image: p_img13,
      title: "Casual Collection",
      subtitle: "Everyday Style",
      category: "Women"
    },
    {
      image: p_img21,
      title: "Winter Collection",
      subtitle: "Cozy & Warm",
      category: "Winterwear"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, carouselImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
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
      <div className='relative h-96 sm:h-full overflow-hidden rounded-br-2xl sm:rounded-r-2xl'>
        {/* Images */}
        {carouselImages.map((item, index) => (
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
            <div className='absolute bottom-6 left-6 text-white animate-fade-in-up'>
              <div className='bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30'>
                <p className='text-xs font-medium opacity-80'>{item.category}</p>
                <h3 className='text-lg font-bold'>{item.title}</h3>
                <p className='text-sm opacity-90'>{item.subtitle}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className='absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0'
        >
          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
          </svg>
        </button>
        
        <button
          onClick={nextSlide}
          className='absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0'
        >
          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
          </svg>
        </button>

        {/* Decorative corner element */}
        <div className='absolute top-4 right-4 w-8 h-8 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center animate-bounce-slow'>
          <span className='text-accent-600 text-lg'>✨</span>
        </div>
      </div>

      {/* Dots indicator */}
      <div className='absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2'>
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-accent-500 w-6' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className='absolute top-4 left-4 flex items-center gap-2'>
        <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
        <span className='text-xs text-white/80 bg-black/30 backdrop-blur-sm px-2 py-1 rounded'>
          {isAutoPlaying ? 'Auto' : 'Manual'}
        </span>
      </div>

      {/* Progress bar */}
      <div className='absolute bottom-0 left-0 w-full h-1 bg-black/20'>
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