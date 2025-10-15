import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({id, image, name, price}) => {
    const {currency} = useContext(ShopContext)
    const [isHovered, setIsHovered] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)

    return (
        <Link 
            className='group block' 
            to={`/product/${id}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className='relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100 hover:border-accent-200'>
                {/* Image Container */}
                <div className='relative aspect-[4/5] overflow-hidden rounded-t-2xl bg-gray-100'>
                    {/* Loading skeleton */}
                    {!imageLoaded && (
                        <div className='absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse'></div>
                    )}
                    
                    <img 
                        src={image[0]} 
                        alt={name}
                        className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                            imageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                        onLoad={() => setImageLoaded(true)}
                    />
                    
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent transition-opacity duration-300 ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                    }`}></div>
                    
                    {/* Floating action button - Hidden on mobile */}
                    <div className={`absolute top-2 right-2 sm:top-4 sm:right-4 transition-all duration-300 ${
                        isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                    } hidden xs:block`}>
                        <button className='w-8 h-8 sm:w-10 sm:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors duration-200 group/btn'>
                            <svg className='w-4 h-4 sm:w-5 sm:h-5 text-gray-700 group-hover/btn:text-accent-600 transition-colors duration-200' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
                            </svg>
                        </button>
                    </div>
                    
                    {/* Quick view button - Hidden on mobile */}
                    <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 transition-all duration-300 ${
                        isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    } hidden xs:block`}>
                        <button className='px-3 py-1.5 sm:px-4 sm:py-2 bg-white/90 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium text-gray-800 hover:bg-white transition-colors duration-200 shadow-lg'>
                            Quick View
                        </button>
                    </div>
                </div>
                
                {/* Product Info */}
                <div className='p-3 sm:p-4 space-y-1.5 sm:space-y-2'>
                    <h3 className='font-semibold text-gray-900 text-sm md:text-base line-clamp-2 group-hover:text-accent-700 transition-colors duration-300 leading-snug'>
                        {name}
                    </h3>
                    
                    <div className='flex items-center justify-between'>
                        <p className='text-base sm:text-lg font-bold text-gray-900'>
                            <span className='text-xs sm:text-sm font-normal text-gray-500'>{currency}</span>
                            {price}
                        </p>
                        
                        {/* Rating stars */}
                        <div className='flex items-center gap-0.5 sm:gap-1'>
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${
                                    i < 4 ? 'text-yellow-400' : 'text-gray-300'
                                }`} fill='currentColor' viewBox='0 0 20 20'>
                                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                                </svg>
                            ))}
                        </div>
                    </div>
                    
                    {/* Product badge */}
                    <div className='flex items-center justify-between pt-1 sm:pt-2'>
                        <span className='px-1.5 py-0.5 sm:px-2 sm:py-1 bg-accent-100 text-accent-700 text-[10px] xs:text-xs font-medium rounded-full'>
                            New Arrival
                        </span>
                        
                        {/* Add to cart icon */}
                        <button className='p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200'>
                            <svg className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v4a2 2 0 11-4 0v-4m4 0V9a2 2 0 10-4 0v4z' />
                            </svg>
                        </button>
                    </div>
                </div>
                
                {/* Shine effect */}
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transition-transform duration-1000 ${
                    isHovered ? 'translate-x-full' : '-translate-x-full'
                }`}></div>
            </div>
        </Link>
    )
}

export default ProductItem