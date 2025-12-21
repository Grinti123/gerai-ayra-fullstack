import React from 'react';
import { motion } from 'framer-motion';
import Title from '../components/Title';

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "1. Informasi yang Kami Kumpulkan",
      content: [
        {
          subtitle: "1.1 Informasi Pribadi",
          text: "Kami mengumpulkan informasi pribadi yang Anda berikan secara langsung kepada kami, termasuk namun tidak terbatas pada:"
        },
        {
          list: [
            "Nama lengkap",
            "Alamat email",
            "Nomor telepon",
            "Alamat pengiriman dan penagihan",
            "Informasi pembayaran (diproses melalui gateway pembayaran yang aman)",
            "Riwayat pembelian dan preferensi produk"
          ]
        },
        {
          subtitle: "1.2 Informasi Otomatis",
          text: "Ketika Anda mengunjungi situs web kami, kami secara otomatis mengumpulkan informasi tertentu tentang perangkat Anda, termasuk:"
        },
        {
          list: [
            "Alamat IP",
            "Jenis browser dan versi",
            "Sistem operasi",
            "Halaman yang Anda kunjungi",
            "Waktu dan tanggal kunjungan",
            "Sumber rujukan"
          ]
        }
      ]
    },
    {
      title: "2. Bagaimana Kami Menggunakan Informasi Anda",
      content: [
        {
          text: "Kami menggunakan informasi yang kami kumpulkan untuk berbagai tujuan, termasuk:"
        },
        {
          list: [
            "Memproses dan mengelola pesanan Anda",
            "Mengirimkan konfirmasi pesanan dan update pengiriman",
            "Meningkatkan layanan pelanggan dan pengalaman pengguna",
            "Mengirimkan newsletter dan promosi (dengan persetujuan Anda)",
            "Mencegah penipuan dan meningkatkan keamanan",
            "Menganalisis tren penggunaan untuk meningkatkan situs web kami",
            "Mematuhi kewajiban hukum"
          ]
        }
      ]
    },
    {
      title: "3. Berbagi Informasi",
      content: [
        {
          text: "Kami tidak menjual atau menyewakan informasi pribadi Anda kepada pihak ketiga. Kami hanya membagikan informasi Anda dalam situasi berikut:"
        },
        {
          list: [
            "Dengan penyedia layanan pihak ketiga yang membantu kami mengoperasikan bisnis (misalnya, pemroses pembayaran, layanan pengiriman)",
            "Untuk mematuhi hukum, peraturan, atau proses hukum",
            "Untuk melindungi hak, properti, atau keselamatan kami atau orang lain",
            "Dalam hal merger, akuisisi, atau penjualan aset perusahaan"
          ]
        }
      ]
    },
    {
      title: "4. Keamanan Data",
      content: [
        {
          text: "Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang sesuai untuk melindungi informasi pribadi Anda dari akses, penggunaan, atau pengungkapan yang tidak sah, termasuk:"
        },
        {
          list: [
            "Enkripsi SSL untuk transmisi data sensitif",
            "Firewall dan sistem deteksi intrusi",
            "Akses terbatas ke informasi pribadi hanya untuk karyawan yang memerlukan",
            "Audit keamanan berkala",
            "Penyimpanan data yang aman"
          ]
        },
        {
          text: "Namun, tidak ada metode transmisi melalui internet atau penyimpanan elektronik yang 100% aman. Kami berusaha menggunakan cara yang dapat diterima secara komersial untuk melindungi informasi pribadi Anda."
        }
      ]
    },
    {
      title: "5. Cookie dan Teknologi Pelacakan",
      content: [
        {
          text: "Kami menggunakan cookie dan teknologi pelacakan serupa untuk meningkatkan pengalaman Anda di situs web kami. Cookie adalah file kecil yang disimpan di perangkat Anda yang membantu kami:"
        },
        {
          list: [
            "Mengingat preferensi dan pengaturan Anda",
            "Memahami bagaimana Anda menggunakan situs web kami",
            "Menyediakan konten yang dipersonalisasi",
            "Menganalisis kinerja situs web"
          ]
        },
        {
          text: "Anda dapat mengatur browser Anda untuk menolak semua cookie atau untuk memberi tahu Anda ketika cookie dikirim. Namun, beberapa fitur situs web mungkin tidak berfungsi dengan baik tanpa cookie."
        }
      ]
    },
    {
      title: "6. Hak Anda",
      content: [
        {
          text: "Anda memiliki hak-hak tertentu terkait informasi pribadi Anda, termasuk:"
        },
        {
          list: [
            "Hak untuk mengakses informasi pribadi yang kami miliki tentang Anda",
            "Hak untuk meminta koreksi informasi yang tidak akurat",
            "Hak untuk meminta penghapusan informasi pribadi Anda",
            "Hak untuk menolak pemrosesan informasi pribadi Anda",
            "Hak untuk meminta pembatasan pemrosesan",
            "Hak portabilitas data",
            "Hak untuk menarik persetujuan kapan saja"
          ]
        },
        {
          text: "Untuk menggunakan hak-hak ini, silakan hubungi kami melalui informasi kontak yang tercantum di bawah."
        }
      ]
    },
    {
      title: "7. Penyimpanan Data",
      content: [
        {
          text: "Kami akan menyimpan informasi pribadi Anda hanya selama diperlukan untuk tujuan yang ditetapkan dalam kebijakan privasi ini, kecuali periode penyimpanan yang lebih lama diperlukan atau diizinkan oleh hukum."
        }
      ]
    },
    {
      title: "8. Privasi Anak-anak",
      content: [
        {
          text: "Layanan kami tidak ditujukan untuk anak-anak di bawah usia 13 tahun. Kami tidak secara sengaja mengumpulkan informasi pribadi dari anak-anak di bawah 13 tahun. Jika Anda adalah orang tua atau wali dan mengetahui bahwa anak Anda telah memberikan informasi pribadi kepada kami, silakan hubungi kami."
        }
      ]
    },
    {
      title: "9. Tautan ke Situs Web Lain",
      content: [
        {
          text: "Situs web kami mungkin berisi tautan ke situs web pihak ketiga. Kami tidak bertanggung jawab atas praktik privasi atau konten situs web tersebut. Kami mendorong Anda untuk membaca kebijakan privasi dari setiap situs web yang Anda kunjungi."
        }
      ]
    },
    {
      title: "10. Perubahan pada Kebijakan Privasi",
      content: [
        {
          text: "Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu untuk mencerminkan perubahan dalam praktik kami atau untuk alasan operasional, hukum, atau peraturan lainnya. Kami akan memberi tahu Anda tentang perubahan material dengan memposting kebijakan privasi yang diperbarui di situs web kami dan memperbarui tanggal 'Terakhir Diperbarui' di bagian atas halaman ini."
        }
      ]
    },
    {
      title: "11. Hubungi Kami",
      content: [
        {
          text: "Jika Anda memiliki pertanyaan, kekhawatiran, atau permintaan terkait kebijakan privasi ini atau praktik privasi kami, silakan hubungi kami di:"
        },
        {
          contact: {
            company: "Gerai Ayra",
            email: "privacy@geraiayra.com",
            phone: "+62 812-3456-7890",
            address: "Jl. Contoh No. 123, Jakarta, Indonesia"
          }
        }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <Title text1={'KEBIJAKAN'} text2={'PRIVASI'} />
          <p className="text-gray-600 mt-4 text-sm">
            Terakhir Diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-200"
        >
          <p className="text-gray-700 leading-relaxed">
            Selamat datang di Gerai Ayra. Kami menghargai kepercayaan Anda dan berkomitmen untuk melindungi privasi dan keamanan informasi pribadi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, membagikan, dan melindungi informasi Anda ketika Anda menggunakan situs web dan layanan kami.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Dengan menggunakan layanan kami, Anda menyetujui pengumpulan dan penggunaan informasi sesuai dengan kebijakan ini. Jika Anda tidak setuju dengan kebijakan ini, mohon untuk tidak menggunakan layanan kami.
          </p>
        </motion.div>

        {/* Sections */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {sections.map((section, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="w-2 h-8 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full mr-3"></span>
                {section.title}
              </h2>
              
              <div className="space-y-4">
                {section.content.map((item, idx) => (
                  <div key={idx}>
                    {item.subtitle && (
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        {item.subtitle}
                      </h3>
                    )}
                    
                    {item.text && (
                      <p className="text-gray-600 leading-relaxed mb-3">
                        {item.text}
                      </p>
                    )}
                    
                    {item.list && (
                      <ul className="space-y-2 ml-6">
                        {item.list.map((listItem, listIdx) => (
                          <li key={listIdx} className="text-gray-600 flex items-start">
                            <span className="inline-block w-2 h-2 bg-indigo-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                            <span>{listItem}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {item.contact && (
                      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mt-4 border border-indigo-100">
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <svg className="w-5 h-5 text-indigo-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <span className="font-semibold text-gray-800">{item.contact.company}</span>
                          </div>
                          <div className="flex items-center">
                            <svg className="w-5 h-5 text-indigo-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <a href={`mailto:${item.contact.email}`} className="text-indigo-600 hover:text-indigo-700 transition-colors">
                              {item.contact.email}
                            </a>
                          </div>
                          <div className="flex items-center">
                            <svg className="w-5 h-5 text-indigo-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span className="text-gray-700">{item.contact.phone}</span>
                          </div>
                          <div className="flex items-start">
                            <svg className="w-5 h-5 text-indigo-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-gray-700">{item.contact.address}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-8 text-white text-center"
        >
          <h3 className="text-xl font-bold mb-3">Komitmen Kami terhadap Privasi Anda</h3>
          <p className="text-indigo-100 leading-relaxed">
            Di Gerai Ayra, privasi Anda adalah prioritas utama kami. Kami terus memperbarui praktik keamanan kami untuk memastikan informasi Anda tetap aman dan terlindungi.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
