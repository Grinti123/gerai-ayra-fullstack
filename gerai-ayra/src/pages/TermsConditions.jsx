import React from 'react'
import Title from '../components/Title'

const TermsConditions = () => {
  return (
    <div className='min-h-screen py-10 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-12'>
          <Title text1={'SYARAT &'} text2={'KETENTUAN'} />
          <p className='text-gray-600 mt-4 max-w-2xl mx-auto'>
            Syarat dan ketentuan penggunaan layanan Gerai Ayra. Mohon dibaca dengan seksama sebelum menggunakan layanan kami.
          </p>
          <p className='text-sm text-gray-500 mt-2'>
            Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Content */}
        <div className='bg-white rounded-lg shadow-lg p-8 space-y-8'>
          
          {/* Section 1 */}
          <section>
            <h2 className='text-2xl font-bold text-gray-800 mb-4'>1. Penerimaan Syarat</h2>
            <p className='text-gray-600 leading-relaxed mb-4'>
              Dengan mengakses dan menggunakan website Gerai Ayra, Anda menyetujui untuk terikat oleh syarat dan ketentuan ini. 
              Jika Anda tidak menyetujui syarat dan ketentuan ini, mohon untuk tidak menggunakan layanan kami.
            </p>
            <p className='text-gray-600 leading-relaxed'>
              Kami berhak untuk mengubah syarat dan ketentuan ini sewaktu-waktu tanpa pemberitahuan sebelumnya. 
              Perubahan akan berlaku efektif setelah dipublikasikan di website ini.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className='text-2xl font-bold text-gray-800 mb-4'>2. Definisi</h2>
            <ul className='text-gray-600 leading-relaxed space-y-2'>
              <li><strong>"Kami", "Gerai Ayra"</strong> - merujuk pada PT Gerai Ayra dan seluruh layanannya</li>
              <li><strong>"Anda", "Pengguna"</strong> - merujuk pada setiap individu yang mengakses website ini</li>
              <li><strong>"Produk"</strong> - merujuk pada semua barang yang dijual melalui platform kami</li>
              <li><strong>"Layanan"</strong> - merujuk pada semua fitur dan fungsi yang tersedia di website</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className='text-2xl font-bold text-gray-800 mb-4'>3. Pendaftaran Akun</h2>
            <div className='text-gray-600 leading-relaxed space-y-3'>
              <p>Untuk menggunakan layanan tertentu, Anda perlu membuat akun dengan memberikan informasi yang akurat dan lengkap:</p>
              <ul className='list-disc list-inside space-y-1 ml-4'>
                <li>Nama lengkap yang valid</li>
                <li>Alamat email yang aktif</li>
                <li>Nomor telepon yang dapat dihubungi</li>
                <li>Alamat pengiriman yang akurat</li>
              </ul>
              <p>Anda bertanggung jawab untuk menjaga kerahasiaan informasi akun dan password Anda.</p>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className='text-2xl font-bold text-gray-800 mb-4'>4. Pemesanan dan Pembayaran</h2>
            <div className='text-gray-600 leading-relaxed space-y-3'>
              <h3 className='font-semibold text-gray-800'>4.1 Proses Pemesanan</h3>
              <ul className='list-disc list-inside space-y-1 ml-4'>
                <li>Semua pesanan tunduk pada ketersediaan stok</li>
                <li>Kami berhak menolak atau membatalkan pesanan karena alasan tertentu</li>
                <li>Konfirmasi pesanan akan dikirim melalui email atau WhatsApp</li>
              </ul>
              
              <h3 className='font-semibold text-gray-800 mt-4'>4.2 Harga dan Pembayaran</h3>
              <ul className='list-disc list-inside space-y-1 ml-4'>
                <li>Semua harga dalam Rupiah (IDR) dan sudah termasuk pajak</li>
                <li>Harga dapat berubah sewaktu-waktu tanpa pemberitahuan</li>
                <li>Pembayaran dapat dilakukan melalui COD, transfer bank, e-wallet, atau kartu kredit</li>
                <li>Untuk pembayaran online, transaksi harus diselesaikan dalam 24 jam</li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className='text-2xl font-bold text-gray-800 mb-4'>5. Pengiriman</h2>
            <div className='text-gray-600 leading-relaxed space-y-3'>
              <ul className='list-disc list-inside space-y-1'>
                <li>Pengiriman dilakukan ke seluruh Indonesia melalui kurir terpercaya</li>
                <li>Estimasi waktu pengiriman adalah perkiraan dan dapat berubah</li>
                <li>Risiko kerusakan atau kehilangan selama pengiriman menjadi tanggung jawab kurir</li>
                <li>Pastikan alamat pengiriman yang Anda berikan akurat dan lengkap</li>
                <li>Biaya pengiriman akan dihitung otomatis berdasarkan lokasi tujuan</li>
              </ul>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className='text-2xl font-bold text-gray-800 mb-4'>6. Kebijakan Pengembalian</h2>
            <div className='text-gray-600 leading-relaxed space-y-3'>
              <h3 className='font-semibold text-gray-800'>6.1 Syarat Pengembalian</h3>
              <ul className='list-disc list-inside space-y-1 ml-4'>
                <li>Pengembalian dapat dilakukan dalam 7 hari setelah barang diterima</li>
                <li>Barang harus dalam kondisi baru, tidak rusak, dan masih memiliki tag</li>
                <li>Barang tidak boleh dicuci atau digunakan</li>
                <li>Kemasan asli harus disertakan</li>
              </ul>
              
              <h3 className='font-semibold text-gray-800 mt-4'>6.2 Proses Pengembalian</h3>
              <ul className='list-disc list-inside space-y-1 ml-4'>
                <li>Hubungi customer service untuk mendapatkan nomor RMA</li>
                <li>Kirim barang dengan mencantumkan nomor RMA</li>
                <li>Biaya pengiriman retur ditanggung pembeli (kecuali kesalahan dari kami)</li>
                <li>Refund akan diproses dalam 3-7 hari kerja setelah barang diterima</li>
              </ul>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className='text-2xl font-bold text-gray-800 mb-4'>7. Hak Kekayaan Intelektual</h2>
            <p className='text-gray-600 leading-relaxed'>
              Semua konten di website ini, termasuk namun tidak terbatas pada teks, gambar, logo, desain, 
              dan kode program adalah milik Gerai Ayra dan dilindungi oleh hukum hak cipta. 
              Dilarang menggunakan, menyalin, atau mendistribusikan konten tanpa izin tertulis dari kami.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className='text-2xl font-bold text-gray-800 mb-4'>8. Privasi dan Data Pribadi</h2>
            <div className='text-gray-600 leading-relaxed space-y-3'>
              <p>Kami menghormati privasi Anda dan berkomitmen untuk melindungi data pribadi Anda:</p>
              <ul className='list-disc list-inside space-y-1 ml-4'>
                <li>Data pribadi hanya digunakan untuk memproses pesanan dan komunikasi</li>
                <li>Kami tidak akan membagikan data Anda kepada pihak ketiga tanpa persetujuan</li>
                <li>Data disimpan dengan sistem keamanan yang memadai</li>
                <li>Anda berhak meminta penghapusan data pribadi Anda</li>
              </ul>
            </div>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className='text-2xl font-bold text-gray-800 mb-4'>9. Larangan Penggunaan</h2>
            <div className='text-gray-600 leading-relaxed'>
              <p className='mb-3'>Anda dilarang menggunakan website ini untuk:</p>
              <ul className='list-disc list-inside space-y-1 ml-4'>
                <li>Aktivitas yang melanggar hukum atau peraturan yang berlaku</li>
                <li>Mengirim spam, virus, atau kode berbahaya lainnya</li>
                <li>Mengakses sistem secara tidak sah atau merusak infrastruktur</li>
                <li>Menyebarkan informasi palsu atau menyesatkan</li>
                <li>Melanggar hak orang lain atau melakukan tindakan diskriminatif</li>
              </ul>
            </div>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className='text-2xl font-bold text-gray-800 mb-4'>10. Pembatasan Tanggung Jawab</h2>
            <p className='text-gray-600 leading-relaxed'>
              Gerai Ayra tidak bertanggung jawab atas kerugian langsung atau tidak langsung yang timbul 
              dari penggunaan website ini, termasuk namun tidak terbatas pada kehilangan data, 
              kerusakan sistem, atau kerugian finansial. Tanggung jawab kami terbatas pada nilai 
              produk yang dibeli.
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className='text-2xl font-bold text-gray-800 mb-4'>11. Hukum yang Berlaku</h2>
            <p className='text-gray-600 leading-relaxed'>
              Syarat dan ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia. 
              Setiap sengketa yang timbul akan diselesaikan melalui pengadilan yang berwenang di Jakarta, Indonesia.
            </p>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className='text-2xl font-bold text-gray-800 mb-4'>12. Kontak</h2>
            <div className='text-gray-600 leading-relaxed'>
              <p className='mb-3'>Jika Anda memiliki pertanyaan tentang syarat dan ketentuan ini, silakan hubungi kami:</p>
              <div className='bg-gray-50 p-4 rounded-lg'>
                <p><strong>Email:</strong> info@geraiayra.com</p>
                <p><strong>WhatsApp:</strong> +62 812-3456-7890</p>
                <p><strong>Alamat:</strong> Jl. Fashion Street No. 123, Jakarta 12345</p>
                <p><strong>Jam Operasional:</strong> Senin - Minggu, 08.00 - 20.00 WIB</p>
              </div>
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className='text-center mt-12 p-6 bg-gray-50 rounded-lg'>
          <p className='text-gray-600 mb-4'>
            Dengan melanjutkan penggunaan layanan kami, Anda menyatakan telah membaca, 
            memahami, dan menyetujui seluruh syarat dan ketentuan di atas.
          </p>
          <button 
            onClick={() => window.history.back()} 
            className='inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300'
          >
            <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
            </svg>
            Kembali
          </button>
        </div>
      </div>
    </div>
  )
}

export default TermsConditions