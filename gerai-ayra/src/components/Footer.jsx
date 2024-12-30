import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
        
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

            <div>
                <img src={assets.logo} className='mb-4 w-40' alt="" />
                <p className='w-full md:w-2/3 text-gray-600 text-justify'>
                hadir sebagai destinasi fashion terpercaya untuk keluarga modern Indonesia. Dengan koleksi pakaian berkualitas yang mencakup berbagai usia dan gaya, kami berkomitmen menghadirkan pengalaman berbelanja yang menyenangkan dengan harga terjangkau. Setiap item di toko kami dipilih dengan teliti untuk memastikan kenyamanan dan kualitas terbaik bagi customer kami. Dari pakaian kasual hingga formal, Gerai Ayra adalah pilihan tepat untuk melengkapi kebutuhan fashion Anda.
                </p>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About Us</li>
                </ul>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Whatsapp: (+62) 857-7106-6789</li>
                    <li>mariaulfah@gmail.com</li>
                </ul>
            </div>

        </div>

        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2024@ geraiayra.com - All Right Reserved</p>
        </div>

    </div>
  )
}

export default Footer