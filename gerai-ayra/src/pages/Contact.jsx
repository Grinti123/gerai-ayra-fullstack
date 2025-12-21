import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img src={assets.contact_img} className='w-full md:max-w-[480px]' alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
            <p className='fonst-semibold text-xl text-gray-600'>Toko Kami</p>
            <p className='text-gray-500'>RT.03/RW.01, <br /> Kp. Parung Jambu, Margajaya <br />Kec. Bogor Bar., <br />Kota Bogor, Jawa Barat</p>
            <p className='text-gray-500'>Whatsapp: (+62) 857-7106-6789 <br />Email: admin@gmail.com </p>
            <p className='font-semibold text-xl text-gray-600'>Our Social Media</p>
            <p className='text-gray-500'>Instagram: <br /> @bajuanak_geraiayraa <br />@tas.fashion_geraiayraa <br />@gamisanak_geraiayraa</p>
            <button className='border rounded-md border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 ease-in-out'>Explore Jobs</button>
        </div>
      </div>

    <NewsletterBox />

    </div>
  )
}

export default Contact