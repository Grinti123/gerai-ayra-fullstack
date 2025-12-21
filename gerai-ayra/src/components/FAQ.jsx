import React, { useState } from 'react'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqData = [
    {
      question: "Bagaimana cara melakukan pemesanan?",
      answer: "Anda dapat melakukan pemesanan dengan mudah melalui website kami. Pilih produk yang diinginkan, tambahkan ke keranjang, lalu lanjutkan ke checkout. Isi data pengiriman dan pilih metode pembayaran yang tersedia."
    },
    {
      question: "Metode pembayaran apa saja yang tersedia?",
      answer: "Kami menyediakan berbagai metode pembayaran untuk kemudahan Anda: Cash on Delivery (COD), Transfer Bank, E-wallet (OVO, GoPay, DANA), dan Kartu Kredit/Debit melalui gateway pembayaran yang aman."
    },
    {
      question: "Berapa lama waktu pengiriman?",
      answer: "Waktu pengiriman bervariasi tergantung lokasi Anda. Untuk area Jabodetabek: 1-2 hari kerja, Pulau Jawa: 2-4 hari kerja, Luar Pulau Jawa: 3-7 hari kerja. Kami akan memberikan nomor resi untuk tracking pengiriman."
    },
    {
      question: "Apakah bisa melakukan retur atau tukar barang?",
      answer: "Ya, kami menerima retur dan tukar barang dalam waktu 7 hari setelah barang diterima dengan syarat: barang masih dalam kondisi baru, tidak rusak, dan masih memiliki tag/label. Biaya pengiriman retur ditanggung pembeli kecuali ada kesalahan dari pihak kami."
    },
    {
      question: "Bagaimana cara mengetahui ukuran yang tepat?",
      answer: "Setiap produk memiliki size chart yang dapat Anda lihat di halaman detail produk. Kami menyediakan panduan ukuran dalam cm untuk membantu Anda memilih size yang tepat. Jika masih ragu, Anda dapat menghubungi customer service kami."
    },
    {
      question: "Apakah produk yang dijual original?",
      answer: "Ya, semua produk yang kami jual adalah 100% original dan berkualitas tinggi. Kami bekerja sama langsung dengan supplier terpercaya dan memberikan garansi keaslian untuk setiap produk yang dijual."
    },
    {
      question: "Bagaimana cara menghubungi customer service?",
      answer: "Anda dapat menghubungi customer service kami melalui WhatsApp, email, atau live chat di website. Tim customer service kami siap membantu Anda setiap hari dari pukul 08.00 - 20.00 WIB."
    },
    {
      question: "Apakah ada program member atau diskon khusus?",
      answer: "Ya, kami memiliki program loyalitas untuk member setia dan sering memberikan promo menarik. Daftarkan diri Anda untuk mendapatkan notifikasi promo terbaru, diskon eksklusif, dan poin reward yang dapat ditukar dengan voucher belanja."
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className='my-16 sm:my-24'>
      <div className='text-center mb-12'>
        <h2 className='text-3xl sm:text-4xl font-bold text-gray-800 mb-4'>
          Pertanyaan yang Sering Diajukan
        </h2>
        <p className='text-gray-600 max-w-2xl mx-auto'>
          Temukan jawaban untuk pertanyaan umum tentang produk, pengiriman, dan layanan kami
        </p>
      </div>

      <div className='max-w-4xl mx-auto space-y-4'>
        {faqData.map((faq, index) => (
          <div 
            key={index} 
            className='bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg'
          >
            <button
              onClick={() => toggleFAQ(index)}
              className='w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset'
            >
              <span className='font-semibold text-gray-800 text-lg pr-4'>
                {faq.question}
              </span>
              <svg
                className={`w-6 h-6 text-gray-500 transform transition-transform duration-300 flex-shrink-0 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            </button>
            
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className='px-6 pb-5 pt-2'>
                <p className='text-gray-600 leading-relaxed'>
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='text-center mt-12'>
        <p className='text-gray-600 mb-4'>
          Masih ada pertanyaan lain?
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
          <a 
            href='/contact' 
            className='inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300'
          >
            Hubungi Kami
            <svg className='w-5 h-5 ml-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
            </svg>
          </a>
          <a 
            href='/terms-conditions' 
            className='inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-300'
          >
            Syarat & Ketentuan
            <svg className='w-5 h-5 ml-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

export default FAQ