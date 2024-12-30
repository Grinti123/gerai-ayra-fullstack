import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
            <p>Distributor resmi aneka fashion anak dan dewasa. Kami membuka pluang usaha dirumah dengan menjadi reseller</p>
            <b className='text-gray-800'>Our Mission</b>
            <p>hadir sebagai destinasi fashion terpercaya untuk keluarga modern Indonesia. Dengan koleksi pakaian berkualitas yang mencakup berbagai usia dan gaya, kami berkomitmen menghadirkan pengalaman berbelanja yang menyenangkan dengan harga terjangkau. Setiap item di toko kami dipilih dengan teliti untuk memastikan kenyamanan dan kualitas terbaik bagi customer kami. Dari pakaian kasual hingga formal, Gerai Ayra adalah pilihan tepat untuk melengkapi kebutuhan fashion Anda.</p>
          </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US?'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 text-justify'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Kami menjamin setiap produk yang kami tawarkan memenuhi standar kualitas tertinggi. Setiap item melewati proses inspeksi ketat untuk memastikan jahitan yang rapi, bahan yang nyaman, dan ketahanan produk. Komitmen kami terhadap kualitas membuat Anda dapat berbelanja dengan penuh keyakinan di Gerai Ayra.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 text-justify'>
          <b>Convenience:</b>
          <p className='text-gray-600'>Nikmati pengalaman berbelanja yang mudah dan menyenangkan di Gerai Ayra. Dengan tampilan toko yang terorganisir, sistem kategorisasi yang jelas, dan layanan yang responsif, Anda dapat menemukan apa yang Anda cari dengan cepat dan efisien. Kami mengutamakan kenyamanan Anda dalam setiap aspek berbelanja</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 text-justify'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Kepuasan pelanggan adalah prioritas utama kami. Tim layanan pelanggan kami siap membantu Anda dengan ramah dan profesional untuk setiap pertanyaan dan kebutuhan. Dari pemilihan produk hingga layanan purna jual, kami berkomitmen memberikan pengalaman berbelanja yang memuaskan bagi setiap pelanggan.</p>
        </div>
      </div>

      <NewsLetterBox />

    </div>
  )
}

export default About