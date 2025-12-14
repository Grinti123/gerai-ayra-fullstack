import React, { useEffect, useRef } from 'react'

const Testimonials = () => {
  const scrollRef = useRef(null)

  const testimonials = [
    {
      id: 1,
      name: "Sari Dewi",
      location: "Jakarta",
      rating: 5,
      comment: "Kualitas produk sangat bagus dan pengiriman cepat! Bahan pakaiannya nyaman dipakai dan sesuai dengan foto. Pasti akan belanja lagi di Gerai Ayra.",
      avatar: "SD",
      color: "from-pink-500 to-rose-500"
    },
    {
      id: 2,
      name: "Ahmad Rizki",
      location: "Bandung",
      rating: 5,
      comment: "Pelayanan customer service sangat ramah dan responsif. Ketika ada masalah dengan ukuran, langsung dibantu untuk tukar barang. Recommended banget!",
      avatar: "AR",
      color: "from-blue-500 to-indigo-500"
    },
    {
      id: 3,
      name: "Maya Putri",
      location: "Surabaya",
      rating: 5,
      comment: "Koleksi fashionnya trendy dan harga terjangkau. Sudah beberapa kali belanja di sini dan selalu puas dengan kualitas produknya. Love it!",
      avatar: "MP",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 4,
      name: "Budi Santoso",
      location: "Yogyakarta",
      rating: 5,
      comment: "Website mudah digunakan dan proses checkout sangat simple. Barang sampai dengan packaging yang rapi dan aman. Terima kasih Gerai Ayra!",
      avatar: "BS",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 5,
      name: "Rina Maharani",
      location: "Medan",
      rating: 5,
      comment: "Produknya berkualitas tinggi dengan harga yang sangat kompetitif. Pengiriman ke Medan juga cepat, hanya 3 hari sudah sampai. Sangat puas!",
      avatar: "RM",
      color: "from-orange-500 to-amber-500"
    },
    {
      id: 6,
      name: "Doni Pratama",
      location: "Makassar",
      rating: 5,
      comment: "Beli kemeja untuk kerja, kualitasnya premium dan fit di badan. Bahan tidak mudah kusut dan warnanya awet setelah dicuci berkali-kali.",
      avatar: "DP",
      color: "from-cyan-500 to-blue-500"
    }
  ]

  // Duplicate testimonials for infinite scroll effect
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials]

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  return (
    <div className='my-16 sm:my-24'>
      {/* Header - Centered */}
      <div className='text-center mb-12'>
        <h2 className='text-3xl sm:text-4xl font-bold text-gray-800 mb-4'>
          Apa Kata Pelanggan Kami
        </h2>
        <p className='text-gray-600 max-w-2xl mx-auto'>
          Kepuasan pelanggan adalah prioritas utama kami. Berikut testimoni dari pelanggan setia Gerai Ayra
        </p>
      </div>

      {/* Infinite Carousel Container - Full Width */}
      <div
        className='relative -mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw] overflow-x-hidden py-4'
      >
        {/* Gradient Overlays removed for transparent background */}

        {/* Scrolling Container */}
        <div
          ref={scrollRef}
          className='flex gap-6 animate-infinite-scroll'
          style={{
            width: 'fit-content'
          }}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              className='flex-shrink-0 w-[320px] sm:w-[380px]'
            >
              <div className='bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 h-full border border-gray-100 hover:scale-105 transform'>
                {/* Quote Icon */}
                <div className='flex justify-start mb-4'>
                  <svg className='w-10 h-10 text-gray-200' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z' />
                  </svg>
                </div>

                {/* Comment */}
                <p className='text-gray-700 text-sm leading-relaxed mb-4 line-clamp-4'>
                  "{testimonial.comment}"
                </p>

                {/* Rating */}
                <div className='flex mb-4'>
                  {renderStars(testimonial.rating)}
                </div>

                {/* Customer Info */}
                <div className='flex items-center space-x-3 pt-4 border-t border-gray-100'>
                  <div className={`w-12 h-12 bg-gradient-to-r ${testimonial.color} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-800'>{testimonial.name}</h4>
                    <p className='text-gray-500 text-sm flex items-center'>
                      <svg className='w-3 h-3 mr-1' fill='currentColor' viewBox='0 0 20 20'>
                        <path fillRule='evenodd' d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z' clipRule='evenodd' />
                      </svg>
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className='mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto'>
        <div className='text-center p-6 border border-gray-200 rounded-xl'>
          <div className='text-3xl font-bold text-blue-600 mb-2'>5,000+</div>
          <div className='text-gray-600 text-sm'>Pelanggan Puas</div>
        </div>
        <div className='text-center p-6 border border-gray-200 rounded-xl'>
          <div className='text-3xl font-bold text-green-600 mb-2'>4.9/5</div>
          <div className='text-gray-600 text-sm'>Rating Rata-rata</div>
        </div>
        <div className='text-center p-6 border border-gray-200 rounded-xl'>
          <div className='text-3xl font-bold text-purple-600 mb-2'>98%</div>
          <div className='text-gray-600 text-sm'>Repeat Customer</div>
        </div>
        <div className='text-center p-6 border border-gray-200 rounded-xl'>
          <div className='text-3xl font-bold text-orange-600 mb-2'>24/7</div>
          <div className='text-gray-600 text-sm'>Customer Support</div>
        </div>
      </div>

      {/* Call to Action */}
      <div className='text-center mt-12'>
        <p className='text-gray-600 mb-6'>
          Bergabunglah dengan ribuan pelanggan puas lainnya
        </p>
        <a
          href='/collection'
          className='inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl'
        >
          Mulai Belanja Sekarang
          <svg className='w-5 h-5 ml-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
          </svg>
        </a>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes infinite-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-320px * 6 - 1.5rem * 6));
          }
        }

        @media (min-width: 640px) {
          @keyframes infinite-scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-380px * 6 - 1.5rem * 6));
            }
          }
        }

        .animate-infinite-scroll {
          animation: infinite-scroll 30s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default Testimonials