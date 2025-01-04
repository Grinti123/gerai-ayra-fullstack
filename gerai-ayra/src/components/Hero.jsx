import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400 rounded-lg' >
        {/* Hero Left Side */}
        <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
            <div className='text-[#414141]'>
                <div className='flex items-center gap-2' >
                    <p className='w-8 md:w-11 h-[2px] bg-[#f9a8d4]' ></p>
                    <p className='font-medium text-md sm:text-xs md:text-base' >OUR BESTSELLERS</p>
                </div>
                <h1 className='prata-regular lg:text-2xl sm:py-3 min-[320px]:text-[16px] lg:text-xl-5xl leading-relaxed ' >Koleksi Baju Terbaik <br /> untuk Wanita, Lelaki dan Anak-Anak</h1>
                <div className='flex items-center gap-2' >
                    <p className="font-semibold text-sm md:text-base sm:text-sm">Beli Sekarang!</p>
                    <p className='w-8 md:w-11 h-[2px] bg-[#f9a8d4]' ></p>
                </div>
            </div>
        </div>
        {/* Hero Right Side */}
        <img className='w-full sm:w-1/2 sm:rounded-b-md rounded-r-md' src={assets.hero_img} alt="" />
    </div>
  )
}

export default Hero