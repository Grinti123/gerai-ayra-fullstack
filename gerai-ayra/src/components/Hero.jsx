import React from 'react'
import { assets } from '../assets/assets'
import HeroCarousel from './HeroCarousel'

const Hero = () => {
  return (
    <div className='relative overflow-hidden bg-gradient-to-br from-accent-50 via-white to-primary-50 rounded-2xl shadow-2xl border border-accent-100 animate-fade-in-up' >
        {/* Background Pattern */}
        <div className='absolute inset-0 bg-hero-pattern opacity-30'></div>
        
        {/* Floating Decorative Elements */}
        <div className='absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-accent-200 to-accent-300 rounded-full opacity-20 animate-float'></div>
        <div className='absolute top-20 right-20 w-16 h-16 bg-gradient-to-br from-primary-200 to-primary-300 rounded-full opacity-20 animate-float' style={{animationDelay: '2s'}}></div>
        <div className='absolute bottom-10 left-20 w-12 h-12 bg-gradient-to-br from-accent-300 to-primary-300 rounded-full opacity-20 animate-float' style={{animationDelay: '4s'}}></div>
        
        <div className='flex flex-col sm:flex-row relative z-10' >
            {/* Hero Left Side */}
            <div className="w-full sm:w-1/2 flex items-center justify-center py-16 sm:py-20 px-6 sm:px-12">
                <div className='text-gray-800 space-y-6 animate-fade-in-left'>
                    {/* Badge */}
                    <div className='flex items-center gap-3 group' >
                        <div className='w-12 md:w-16 h-[3px] bg-gradient-to-r from-accent-400 to-primary-400 rounded-full group-hover:animate-glow transition-all duration-300' ></div>
                        <span className='font-bold text-sm md:text-base text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-primary-600 tracking-wider uppercase' >✨ Our Bestsellers</span>
                    </div>
                    
                    {/* Main Heading */}
                    <h1 className='prata-regular text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight text-gray-900' >
                        <span className='block animate-fade-in-up'>Koleksi Baju</span>
                        <span className='block text-transparent bg-clip-text bg-gradient-to-r from-accent-600 to-primary-600 animate-fade-in-up' style={{animationDelay: '0.2s'}}>Terbaik</span>
                        <span className='block text-lg md:text-xl lg:text-2xl font-light text-gray-600 animate-fade-in-up' style={{animationDelay: '0.4s'}}>untuk Wanita, Lelaki dan Anak-Anak</span>
                    </h1>
                    
                    {/* CTA Button */}
                    <div className='flex items-center gap-4 pt-4 animate-fade-in-up' style={{animationDelay: '0.6s'}}>
                        <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-accent-500 to-primary-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:from-accent-600 hover:to-primary-600">
                            <span className="relative z-10">Beli Sekarang!</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                        <div className='w-12 md:w-16 h-[3px] bg-gradient-to-r from-accent-400 to-primary-400 rounded-full animate-pulse-slow' ></div>
                    </div>
                    
                    {/* Stats or Features */}
                    <div className='flex gap-8 pt-6 text-sm text-gray-600 animate-fade-in-up' style={{animationDelay: '0.8s'}}>
                        <div className='text-center'>
                            <div className='font-bold text-2xl text-accent-600'>1000+</div>
                            <div>Produk</div>
                        </div>
                        <div className='text-center'>
                            <div className='font-bold text-2xl text-primary-600'>500+</div>
                            <div>Customer</div>
                        </div>
                        <div className='text-center'>
                            <div className='font-bold text-2xl text-accent-600'>4.9</div>
                            <div>Rating</div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Hero Right Side - Carousel */}
            <HeroCarousel />
        </div>
    </div>
  )
}

export default Hero