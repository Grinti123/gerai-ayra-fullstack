import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem';

const BestSeller = () => {

    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        const bestProduct = products.filter((item) => (item.bestseller));
        setBestSeller(bestProduct.slice(0, 5))
    }, [products])

  return (
    <div className='py-12 sm:py-16 px-4 sm:px-6'>
        <div className='text-center py-8 sm:py-12 animate-fade-in-up'>
            <Title text1={'BEST'} text2={'SELLERS'} />
            <p className='max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mt-3 sm:mt-4'>
            Jelajahi koleksi Best Sellers kami yang paling diminati pembeli! ⭐
            </p>
        </div>

        <div className='grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 animate-fade-in-up' style={{animationDelay: '0.2s'}}>
            {
                bestSeller.map((item, index) => (
                    <div 
                      key={index} 
                      className='transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 animate-fade-in-up group'
                      style={{animationDelay: `${0.1 * index}s`}}
                    >
                      {/* Best Seller Badge */}
                      <div className='relative'>
                        <div className='absolute -top-1 -right-1 sm:-top-2 sm:-right-2 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-[10px] xs:text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full shadow-lg animate-bounce-slow'>
                          🔥 Best
                        </div>
                        <ProductItem id={item._id} name={item.name} image={item.image} price={item.price} />
                      </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default BestSeller