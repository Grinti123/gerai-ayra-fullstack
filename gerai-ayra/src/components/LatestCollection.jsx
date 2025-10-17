import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {

    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([])

    useEffect(() => {
        setLatestProducts(products.slice(0,10))
    }, [products])

  return (
    <div className="py-12 sm:py-16" >
        <div className='text-center py-8 sm:py-12 animate-fade-in-up'>
            <Title text1={'LATEST'} text2={'COLLECTIONS'} />
            <p className='max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mt-3 sm:mt-4 px-4' >
            Temukan koleksi terbaru kami yang telah dikurasi secara khusus, menampilkan berbagai pilihan pakaian yang serba guna untuk gaya hidup modern.
            </p>
        </div>

        {/* Rendering Product */}
        <div className='grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 px-4 animate-fade-in-up' style={{animationDelay: '0.2s'}}>
            {
              latestProducts.map((item, index) => (
                <div 
                  key={index} 
                  className='transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 animate-fade-in-up'
                  style={{animationDelay: `${0.1 * index}s`}}
                >
                  <ProductItem id={item._id} image={item.image} name={item.name} price={item.price}  />
                </div>
              ))
            }
        </div>        
    </div>
  )
}

export default LatestCollection