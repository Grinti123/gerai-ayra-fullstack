import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Wishlist = () => {
    const { products, wishlistItems, removeFromWishlist, token, navigate } = useContext(ShopContext);
    const [wishlistProducts, setWishlistProducts] = useState([]);

    useEffect(() => {
        const tempData = [];
        for (const itemId in wishlistItems) {
            const product = products.find((p) => p._id === itemId);
            if (product) {
                tempData.push(product);
            }
        }
        setWishlistProducts(tempData);
    }, [wishlistItems, products, token]);

    if (!token) {
        return (
            <div className='border-t pt-28 text-center'>
                <div className='text-3xl mb-8'>
                    <Title text1={'SILAKAN'} text2={'LOGIN'} />
                </div>
                <p className='text-gray-500 mb-8'>Anda harus login untuk melihat daftar wishlist Anda.</p>
                <button
                    onClick={() => navigate('/login')}
                    className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 transition-all rounded-full shadow-lg hover:shadow-xl'
                >
                    LOGIN SEKARANG
                </button>
            </div>
        )
    }

    return (
        <div className='border-t pt-14'>
            <div className='text-2xl mb-3'>
                <Title text1={'DAFTAR'} text2={'WISHLIST'} />
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    wishlistProducts.length > 0 ? (
                        wishlistProducts.map((item, index) => (
                            <div key={index} className='relative group'>
                                <ProductItem id={item._id} image={item.image} name={item.name} price={item.price} />
                                <button
                                    onClick={() => removeFromWishlist(item._id)}
                                    className='absolute top-2 right-2 bg-white/80 rounded-full p-1 shadow-sm hover:bg-red-50 text-gray-600 hover:text-red-500 transition-colors'
                                    title='Remove from wishlist'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className='col-span-full text-center py-20 text-gray-500'>
                            <p className='text-xl'>Wishlist Anda kosong.</p>
                            <p className='mt-2'>Simpan produk favorit Anda di sini.</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Wishlist
